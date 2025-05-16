import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
    }

    const body = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: body.name,
        contactNumber: body.contactNumber,
        instagramLink: body.instagramLink,
        linkedin: body.linkedin,
        city: body.city,
        country: body.country,
        bio: body.bio,
        specialties: body.specialties,
        profilePhoto: body.profilePhoto,
        portfolioPhotos: body.portfolioPhotos,
      },
    });

    return NextResponse.json({ success: true, updatedUser });
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    return NextResponse.json({ error: "Erro ao atualizar perfil" }, { status: 500 });
  }
}
