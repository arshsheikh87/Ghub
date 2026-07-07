import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const game = await prisma.game.findUnique({ where: { id } });
    if (!game) return NextResponse.json({ success: false, error: "Game not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: game });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to fetch game" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const game = await prisma.game.update({ where: { id }, data: body });
    return NextResponse.json({ success: true, data: game });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to update game" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.game.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to delete game" }, { status: 500 });
  }
}
