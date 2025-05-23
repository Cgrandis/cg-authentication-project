import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const secret = process.env.NEXTAUTH_SECRET!;

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "10 s"),
  analytics: true,
});

const rolePaths: Record<string, { path: string; login: string }> = {
  ADMIN: { path: "/admin", login: "/login/administrador" },
  PROVIDER: { path: "/provider", login: "/login/prestadordeservico_usuario" },
  USER: { path: "/user", login: "/login/prestadordeservico_usuario" },
};

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname === "/api/auth/callback/credentials") {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

    const { success, limit, remaining, reset } = await ratelimit.limit(ip);

    if (!success) {
      return new NextResponse(
        JSON.stringify({
          error: "Muitas tentativas de login. Tente novamente em instantes.",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(reset),
          },
        }
      );
    }

    return NextResponse.next();
  }

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret });

  if (!token) {
    if (pathname.startsWith("/provider")) {
      return NextResponse.redirect(new URL(rolePaths.PROVIDER.login, req.url));
    }
    if (pathname.startsWith("/user")) {
      return NextResponse.redirect(new URL(rolePaths.USER.login, req.url));
    }

    return NextResponse.redirect(new URL(rolePaths.ADMIN.login, req.url));
  }

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