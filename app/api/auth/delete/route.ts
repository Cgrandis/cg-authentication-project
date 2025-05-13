import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function DELETE(req: Request) {
  try {
    const cookie = req.headers.get("cookie");
    const token = cookie?.split("token=")[1]?.split(";")[0];

    if (!token) return NextResponse.json({ error: "Token ausente" }, { status: 401 });

    const decoded = verify(token, process.env.JWT_SECRET as string) as any;

    await prisma.user.delete({
      where: { id: decoded.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar conta" }, { status: 500 });
  }
}