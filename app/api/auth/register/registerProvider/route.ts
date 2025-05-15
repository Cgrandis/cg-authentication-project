import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nome, email e senha são obrigatórios." },
        { status: 400 }
      );
    }
  
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Este e-mail já está em uso." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "PROVIDER",
        contactNumber: null,
        instagramLink: null,
        profilePhoto: null,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Erro ao registrar prestador:", error);
    return NextResponse.json(
      { error: "Erro interno ao registrar usuário." },
      { status: 500 }
    );
  }
}
