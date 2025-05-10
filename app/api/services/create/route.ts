import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { title, description, duration, providerId } = await req.json();

    const service = await prisma.service.create({
      data: {
        title,
        description,
        duration,
        providerId,
      },
    });

    return NextResponse.json({ service }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Service creation failed" }, { status: 500 });
  }
}
