import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId, serviceId, date } = await req.json();

    const booking = await prisma.booking.create({
      data: {
        userId,
        serviceId,
        date: new Date(date),
      },
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Booking creation failed" }, { status: 500 });
  }
}
