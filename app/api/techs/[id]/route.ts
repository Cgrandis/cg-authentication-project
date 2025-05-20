import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.techDescription.delete({ where: { id } });
    return NextResponse.json({ message: "Deletado com sucesso" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar" }, { status: 500 });
  }
}
