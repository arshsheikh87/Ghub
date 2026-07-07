import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    const plans = await prisma.pricingPlan.findMany({
      where: {
        isActive: true,
        ...(type ? { type: type as never } : {}),
      },
      orderBy: [{ order: "asc" }, { price: "asc" }],
    });

    return NextResponse.json({ success: true, data: plans });
  } catch (error) {
    console.error("GET /api/pricing error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch pricing" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const plan = await prisma.pricingPlan.create({ data: body });
    return NextResponse.json({ success: true, data: plan }, { status: 201 });
  } catch (error) {
    console.error("POST /api/pricing error:", error);
    return NextResponse.json({ success: false, error: "Failed to create plan" }, { status: 500 });
  }
}
