import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateContact } from "@/lib/validations";
import { sendContactNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateContact(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", errors: validation.errors },
        { status: 400 }
      );
    }

    const message = await prisma.contactMessage.create({
      data: validation.data,
    });

    // Send email notification (non-blocking)
    try {
      await sendContactNotification(validation.data);
    } catch (emailErr) {
      console.error("Contact email failed:", emailErr);
    }

    return NextResponse.json({ success: true, data: { id: message.id } }, { status: 201 });
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to fetch messages" }, { status: 500 });
  }
}
