import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.count({
      where: { role: "USER" },
    });

    const providers = await prisma.user.count({
      where: { role: "PROVIDER" },
    });

    const services = await prisma.service.count();

    return NextResponse.json({ users, providers, services });
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);
    return NextResponse.json({ error: "Erro ao buscar estatísticas" }, { status: 500 });
  }
}
