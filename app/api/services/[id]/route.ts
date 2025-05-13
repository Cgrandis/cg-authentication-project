import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const service = await prisma.service.findUnique({
      where: { id: params.id },
    });

    if (!service) {
      return NextResponse.json({ error: "Serviço não encontrado" }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar o serviço" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();

    const updatedService = await prisma.service.update({
      where: { id: params.id },
      data: {
        title: body.title,
        description: body.description,
        duration: body.duration,
        photos: body.photos,
        instagramLink: body.instagramLink,
        contactNumber: body.contactNumber,
        email: body.email,
        availability: body.availability,
      },
    });

    return NextResponse.json(updatedService);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar serviço" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.service.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar serviço" }, { status: 500 });
  }
}
