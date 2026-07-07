import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");

    const games = await prisma.game.findMany({
      where: {
        ...(category && category !== "ALL" ? { category: category as never } : {}),
        ...(search ? { name: { contains: search } } : {}),
        ...(featured === "true" ? { isFeatured: true } : {}),
      },
      orderBy: [{ order: "asc" }, { name: "asc" }],
    });

    return NextResponse.json({ success: true, data: games });
  } catch (error) {
    console.error("GET /api/games error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch games" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const game = await prisma.game.create({ data: body });
    return NextResponse.json({ success: true, data: game }, { status: 201 });
  } catch (error) {
    console.error("POST /api/games error:", error);
    return NextResponse.json({ success: false, error: "Failed to create game" }, { status: 500 });
  }
}
