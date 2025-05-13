import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, JWTPayload } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

// 🔍 **Mapeamento das Rotas e Logins Correspondentes**
const rolePaths: Record<string, { path: string; login: string }> = {
  ADMIN: { path: "/admin", login: "/login/administrador" },
  PROVIDER: { path: "/provider", login: "/login/prestadordeservico_usuario" },
  USER: { path: "/user", login: "/login/prestadordeservico_usuario" },
};

// ✅ **Definição do Tipo do Payload do JWT**
interface CustomJWTPayload extends JWTPayload {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "PROVIDER" | "USER";
}

// ✅ **Função para Verificar o JWT**
async function verifyJWT(token: string): Promise<CustomJWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as CustomJWTPayload; // 🔥 Fazemos um casting para o tipo correto
  } catch (error) {
    console.error("Erro ao verificar JWT:", (error as Error).message);
    return null;
  }
}

// ✅ **Função para Redirecionar de Forma Unificada**
function redirectToLogin(role: string | null, req: NextRequest) {
  const targetLogin = role ? rolePaths[role]?.login : "/login/administrador";
  console.log(`⛔️ Redirecionando para ${targetLogin}`);
  return NextResponse.redirect(new URL(targetLogin, req.url));
}

// ✅ **Middleware Principal**
export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // 🔐 **Caso não tenha um token, redireciona para o login correspondente**
  if (!token) {
    console.log("⛔️ Token não encontrado.");
    if (req.nextUrl.pathname.startsWith("/provider")) {
      return redirectToLogin("PROVIDER", req);
    }
    if (req.nextUrl.pathname.startsWith("/user")) {
      return redirectToLogin("USER", req);
    }
    return redirectToLogin("ADMIN", req);
  }

  // 🔓 **Verificação do JWT**
  const decoded = await verifyJWT(token);

  if (!decoded) {
    console.log("⛔️ Token inválido.");
    return redirectToLogin(null, req);
  }

  // ✅ **Mapeamento de Role e Rota**
  const roleData = Object.values(rolePaths).find((r) =>
    req.nextUrl.pathname.startsWith(r.path)
  );

  if (roleData && decoded.role !== Object.keys(rolePaths).find((k) => rolePaths[k] === roleData)) {
    console.log(`⛔️ Acesso negado para a role ${decoded.role}`);
    return redirectToLogin(decoded.role, req);
  }

  console.log(`✅ Acesso autorizado para ${decoded.role}`);
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/register/administrador/:path*",
    "/admin/:path*",
    "/provider/:path*",
    "/user/:path*",
  ],
};
