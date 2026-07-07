import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const images = await prisma.galleryImage.findMany({
      where: {
        isActive: true,
        ...(category && category !== "ALL" ? { category: category as never } : {}),
      },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    console.error("GET /api/gallery error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch gallery" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const image = await prisma.galleryImage.create({ data: body });
    return NextResponse.json({ success: true, data: image }, { status: 201 });
  } catch (error) {
    console.error("POST /api/gallery error:", error);
    return NextResponse.json({ success: false, error: "Failed to add gallery image" }, { status: 500 });
  }
}
