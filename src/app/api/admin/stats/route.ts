import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [
      totalBookings,
      todayBookings,
      pendingBookings,
      totalGames,
      totalMessages,
      unreadMessages,
      revenueResult,
    ] = await Promise.all([
      prisma.booking.count(),
      prisma.booking.count({ where: { date: { gte: today, lt: tomorrow } } }),
      prisma.booking.count({ where: { status: "PENDING" } }),
      prisma.game.count(),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { isRead: false } }),
      prisma.booking.aggregate({
        where: { status: { notIn: ["CANCELLED"] } },
        _sum: { totalAmount: true },
      }),
    ]);

    const totalRevenue = Number(revenueResult._sum.totalAmount ?? 0);

    // Revenue this month
    const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthRevenueResult = await prisma.booking.aggregate({
      where: { status: { notIn: ["CANCELLED"] }, createdAt: { gte: firstOfMonth } },
      _sum: { totalAmount: true },
    });
    const monthRevenue = Number(monthRevenueResult._sum.totalAmount ?? 0);

    // Upcoming bookings (next 7 days)
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const upcomingBookings = await prisma.booking.findMany({
      where: { date: { gte: today, lt: nextWeek }, status: { notIn: ["CANCELLED"] } },
      include: { game: { select: { name: true, category: true } } },
      orderBy: [{ date: "asc" }, { startTime: "asc" }],
      take: 10,
    });

    return NextResponse.json({
      success: true,
      data: {
        totalBookings,
        todayBookings,
        pendingBookings,
        totalGames,
        totalMessages,
        unreadMessages,
        totalRevenue,
        monthRevenue,
        upcomingBookings,
      },
    });
  } catch (error) {
    console.error("GET /api/admin/stats error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch stats" }, { status: 500 });
  }
}
