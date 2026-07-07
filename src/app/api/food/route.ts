import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    const items = await prisma.foodItem.findMany({
      where: {
        ...(category && category !== "ALL" ? { category: category as never } : {}),
        ...(featured === "true" ? { isFeatured: true } : {}),
        isAvailable: true,
      },
      orderBy: [{ order: "asc" }, { name: "asc" }],
    });

    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error("GET /api/food error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch food items" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const item = await prisma.foodItem.create({ data: body });
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error) {
    console.error("POST /api/food error:", error);
    return NextResponse.json({ success: false, error: "Failed to create food item" }, { status: 500 });
  }
}
