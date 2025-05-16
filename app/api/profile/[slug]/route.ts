import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const user = await prisma.user.findUnique({
    where: { slug: params.slug },
    select: {
      name: true,
      profilePhoto: true,
      bio: true,
      city: true,
      country: true,
      specialties: true,
      instagramLink: true,
      linkedin: true,
      portfolioPhotos: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 });
  }

  return NextResponse.json(user);
}
