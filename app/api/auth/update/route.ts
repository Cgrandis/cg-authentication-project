import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
  try {
    const cookie = req.headers.get("cookie");
    const token = cookie?.split("token=")[1]?.split(";")[0];

    if (!token) return NextResponse.json({ error: "Token ausente" }, { status: 401 });

    const decoded = verify(token, process.env.JWT_SECRET as string) as any;
    const body = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: decoded.id },
      data: {
        name: body.name,
        contactNumber: body.contactNumber,
        instagramLink: body.instagramLink,
        profilePhoto: body.profilePhoto,
      },
    });

    return NextResponse.json({ success: true, updatedUser });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar perfil" }, { status: 500 });
  }
}