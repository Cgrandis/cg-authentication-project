import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (!token || !token.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: token.id as string },
  });

  if (!user) {
    return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
  }

  return NextResponse.json(
    {
      id: token.id,
      name: token.name,
      email: token.email,
      role: token.role,
    },
    { status: 200 }
  );
}
