import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID do provedor não informado." }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        contactNumber: true,
        instagramLink: true,
        linkedin: true,
        city: true,
        country: true,
        bio: true,
        specialties: true,
        profilePhoto: true,
        portfolioPhotos: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Prestador não encontrado." }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar perfil público:", error);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}
