import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { title, description } = await req.json();

  if (!title || !description) {
    return NextResponse.json({ error: "Título e descrição são obrigatórios." }, { status: 400 });
  }

  const created = await prisma.techDescription.create({
    data: { title, description },
  });

  return NextResponse.json(created);
}

export async function GET() {
  const techs = await prisma.techDescription.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(techs);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { title, description } = await req.json();

  if (!title || !description) {
    return NextResponse.json({ error: "Dados incompletos." }, { status: 400 });
  }

  try {
    const updated = await prisma.techDescription.update({
      where: { id },
      data: { title, description },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar." }, { status: 500 });
  }
}
