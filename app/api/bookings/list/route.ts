import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: true,
        service: true,
      },
    });

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
