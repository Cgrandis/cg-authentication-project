import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    console.error("Erro ao verificar JWT:", (error as Error).message);
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  
  if (!token) {
    console.log("⛔️ Token não encontrado. Redirecionando para login.");
    return NextResponse.redirect(new URL("/login/administrador", req.url));
  }

  const decoded = await verifyJWT(token);

  if (!decoded) {
    console.log("⛔️ Token inválido. Redirecionando para login.");
    return NextResponse.redirect(new URL("/login/administrador", req.url));
  }


  if (req.nextUrl.pathname.startsWith("/admin") && decoded.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/login/administrador", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/provider") && decoded.role !== "PROVIDER") {
    return NextResponse.redirect(new URL("/login/prestadordeservico_usuario", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/user") && decoded.role !== "USER") {
    return NextResponse.redirect(new URL("/login/prestadordeservico_usuario", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/register/administrador/:path*",
    "/admin/:path*",
    "/provider/:path*",
    "/user/:path*"
  ],
};
