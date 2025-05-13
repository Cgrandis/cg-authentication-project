import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get("cookie");
    const token = cookie?.split("token=")[1]?.split(";")[0];

    if (!token) return NextResponse.json({ error: "Token não encontrado" }, { status: 401 });

    const decoded = verify(token, process.env.JWT_SECRET as string) as any;

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });

    const { password, ...safeUser } = user;
    return NextResponse.json(safeUser);
  } catch (error) {
    return NextResponse.json({ error: "Erro na autenticação" }, { status: 500 });
  }
}