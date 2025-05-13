import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { title, description, duration, providerId } = await req.json();

    // 🚩 Verificação simples dos dados recebidos
    if (!title || !description || !duration || !providerId) {
      console.error("Dados faltando para criar o serviço");
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios." },
        { status: 400 }
      );
    }

    // 🚩 Verificação se o Provider existe
    const providerExists = await prisma.user.findUnique({
      where: {
        id: providerId,
      },
    });

    if (!providerExists) {
      console.error("Prestador de serviço não encontrado");
      return NextResponse.json(
        { error: "Prestador de serviço não encontrado" },
        { status: 404 }
      );
    }

    // ✅ Criação do serviço no banco
    const service = await prisma.service.create({
      data: {
        title,
        description,
        duration: parseInt(duration),
        providerId,
      },
    });

    console.log("Serviço criado com sucesso:", service);

    return NextResponse.json({ service }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar o serviço:", (error as Error).message);
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}
