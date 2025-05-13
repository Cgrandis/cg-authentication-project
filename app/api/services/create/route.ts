import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const {
      title,
      description,
      duration,
      photos,
      instagramLink,
      contactNumber,
      email,
      availability,
      providerId,
    } = await req.json();

    if (!title || !description || !duration || !providerId || !Array.isArray(photos)) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
    }

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

    const service = await prisma.service.create({
      data: {
        title,
        description,
        duration,
        photos,
        instagramLink,
        contactNumber,
        email,
        availability,
        providerId,
      },
    });
    
    return NextResponse.json({ service }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar o serviço:", (error as Error).message);
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}
