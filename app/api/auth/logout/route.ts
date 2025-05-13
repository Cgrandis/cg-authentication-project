import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function GET() {
  const response = NextResponse.json({ message: "Logout bem-sucedido" });

  response.headers.append(
    "Set-Cookie",
    serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(0),
    })
  );

  return response;
}
