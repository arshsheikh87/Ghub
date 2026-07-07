import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { createSession, deleteSession, SESSION_COOKIE } from "@/lib/auth";
import { validateAdminLogin } from "@/lib/validations";

// Simple password comparison (passwords stored as plain text in dev,
// replace with bcrypt in production)
function comparePassword(plain: string, stored: string): boolean {
  return plain === stored;
}

// POST /api/admin/auth — login
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateAdminLogin(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials", errors: validation.errors },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin || !comparePassword(password, admin.password)) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = await createSession(admin.id);
    const cookieStore = await cookies();

    cookieStore.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return NextResponse.json({
      success: true,
      data: { id: admin.id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (error) {
    console.error("POST /api/admin/auth error:", error);
    return NextResponse.json({ success: false, error: "Authentication failed" }, { status: 500 });
  }
}

// DELETE /api/admin/auth — logout
export async function DELETE() {
  try {
    await deleteSession();
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/auth error:", error);
    return NextResponse.json({ success: false, error: "Logout failed" }, { status: 500 });
  }
}

// GET /api/admin/auth — check session
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    if (!token) return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });

    const record = await prisma.siteSetting.findUnique({ where: { key: `session_${token}` } });
    if (!record) return NextResponse.json({ success: false, error: "Session expired" }, { status: 401 });

    const session = JSON.parse(record.value) as { adminId: string; expiresAt: number };
    if (session.expiresAt < Date.now()) {
      return NextResponse.json({ success: false, error: "Session expired" }, { status: 401 });
    }

    const admin = await prisma.admin.findUnique({
      where: { id: session.adminId },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!admin) return NextResponse.json({ success: false, error: "Admin not found" }, { status: 401 });
    return NextResponse.json({ success: true, data: admin });
  } catch (error) {
    console.error("GET /api/admin/auth error:", error);
    return NextResponse.json({ success: false, error: "Auth check failed" }, { status: 500 });
  }
}
