import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const booking = await prisma.booking.findUnique({
      where: { bookingId: id },
      include: { game: true, foodItems: { include: { food: true } } },
    });
    if (!booking) return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to fetch booking" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const booking = await prisma.booking.update({
      where: { id },
      data: { status: body.status, paymentStatus: body.paymentStatus },
      include: { game: true },
    });
    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to update booking" }, { status: 500 });
  }
}
