import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateBooking } from "@/lib/validations";
import { sendBookingConfirmation, sendAdminBookingNotification } from "@/lib/email";

// ─────────────────────────────────────────────
// POST /api/bookings — create new booking
// ─────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateBooking(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", errors: validation.errors },
        { status: 400 }
      );
    }

    const { name, email, phone, gameId, date, startTime, duration, foodItems, specialRequest } = validation.data;

    // Fetch game to calculate price
    const game = await prisma.game.findUnique({ where: { id: gameId } });
    if (!game) {
      return NextResponse.json({ success: false, error: "Selected game not found" }, { status: 404 });
    }
    if (!game.isAvailable) {
      return NextResponse.json({ success: false, error: "This game station is currently unavailable" }, { status: 409 });
    }

    // Calculate end time
    const [startHour, startMin] = startTime.split(":").map(Number);
    const endHour = startHour + duration;
    const endTime = `${String(endHour).padStart(2, "0")}:${String(startMin).padStart(2, "0")}`;

    // Check for double booking — same game, same date, overlapping time
    const bookingDate = new Date(date);
    bookingDate.setHours(0, 0, 0, 0);
    const nextDay = new Date(bookingDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        gameId,
        status: { notIn: ["CANCELLED"] },
        date: { gte: bookingDate, lt: nextDay },
        OR: [
          // New booking starts during existing booking
          { startTime: { lte: startTime }, endTime: { gt: startTime } },
          // New booking ends during existing booking
          { startTime: { lt: endTime }, endTime: { gte: endTime } },
          // New booking fully contains existing booking
          { startTime: { gte: startTime }, endTime: { lte: endTime } },
        ],
      },
    });

    if (conflictingBooking) {
      return NextResponse.json(
        { success: false, error: "This time slot is already booked. Please choose a different time." },
        { status: 409 }
      );
    }

    // Calculate food total
    let foodTotal = 0;
    const validFoodItems: { foodId: string; quantity: number; price: number }[] = [];

    if (foodItems && foodItems.length > 0) {
      for (const fi of foodItems) {
        if (fi.quantity > 0) {
          const foodItem = await prisma.foodItem.findUnique({ where: { id: fi.foodId } });
          if (foodItem && foodItem.isAvailable) {
            const itemTotal = Number(foodItem.price) * fi.quantity;
            foodTotal += itemTotal;
            validFoodItems.push({ foodId: fi.foodId, quantity: fi.quantity, price: Number(foodItem.price) });
          }
        }
      }
    }

    const gameTotal = Number(game.pricePerHour) * duration;
    const totalAmount = gameTotal + foodTotal;

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        name,
        email,
        phone,
        gameId,
        date: new Date(date),
        startTime,
        endTime,
        duration,
        totalAmount,
        specialRequest,
        status: "CONFIRMED",
        foodItems: validFoodItems.length > 0
          ? { create: validFoodItems }
          : undefined,
      },
      include: { game: true },
    });

    // Send emails (non-blocking — don't fail booking if email fails)
    try {
      await Promise.all([
        sendBookingConfirmation(booking as never),
        sendAdminBookingNotification(booking as never),
      ]);
    } catch (emailErr) {
      console.error("Email sending failed (booking still created):", emailErr);
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          bookingId: booking.bookingId,
          id: booking.id,
          name: booking.name,
          game: game.name,
          date: booking.date,
          startTime: booking.startTime,
          endTime: booking.endTime,
          duration: booking.duration,
          totalAmount: booking.totalAmount,
          status: booking.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/bookings error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create booking. Please try again." },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────────
// GET /api/bookings — admin only
// ─────────────────────────────────────────────
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const date = searchParams.get("date");
    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 20);

    const bookings = await prisma.booking.findMany({
      where: {
        ...(status ? { status: status as never } : {}),
        ...(date ? { date: { gte: new Date(date), lt: new Date(new Date(date).getTime() + 86400000) } } : {}),
      },
      include: { game: { select: { name: true, category: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.booking.count({
      where: {
        ...(status ? { status: status as never } : {}),
        ...(date ? { date: { gte: new Date(date), lt: new Date(new Date(date).getTime() + 86400000) } } : {}),
      },
    });

    return NextResponse.json({ success: true, data: bookings, total, page, limit });
  } catch (error) {
    console.error("GET /api/bookings error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch bookings" }, { status: 500 });
  }
}
