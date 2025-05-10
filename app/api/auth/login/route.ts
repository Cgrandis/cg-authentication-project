import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findFirst({
      where: {
        email
      }
    });

    if (!user) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json({ message: "Login bem-sucedido", token, role: user.role });

    response.headers.append(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
      })
    );

    return response;
  } catch (error) {
    console.error("Erro durante o login:", error);
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}
