import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

const rolePaths: Record<string, { path: string; login: string }> = {
  ADMIN: { path: "/admin", login: "/login/administrador" },
  PROVIDER: { path: "/provider", login: "/login/prestadordeservico_usuario" },
  USER: { path: "/user", login: "/login/prestadordeservico_usuario" },
};

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (!token) {
    console.log("⛔️ Token NextAuth não encontrado.");
    const pathname = req.nextUrl.pathname;

    if (pathname.startsWith("/provider")) {
      return NextResponse.redirect(new URL(rolePaths.PROVIDER.login, req.url));
    }
    if (pathname.startsWith("/user")) {
      return NextResponse.redirect(new URL(rolePaths.USER.login, req.url));
    }
    return NextResponse.redirect(new URL(rolePaths.ADMIN.login, req.url));
  }

  console.log(`✅ Acesso autorizado para ${token.role}`);
  return NextResponse.next();
}

export const config = {
  matcher: ["/register/administrador/:path*", "/admin/:path*", "/provider/:path*", "/user/:path*"],
};
