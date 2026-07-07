import { cookies } from "next/headers";
import { prisma } from "./prisma";

const SESSION_COOKIE = "nexusplay_admin_session";
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

// ─────────────────────────────────────────────
// Simple session-based auth (no external deps)
// ─────────────────────────────────────────────

export async function createSession(adminId: string): Promise<string> {
  const token = crypto.randomUUID();
  // Store token in a SiteSetting as a simple session store
  await prisma.siteSetting.upsert({
    where: { key: `session_${token}` },
    create: {
      key: `session_${token}`,
      value: JSON.stringify({ adminId, expiresAt: Date.now() + SESSION_DURATION }),
      label: "Admin Session",
      group: "sessions",
    },
    update: {
      value: JSON.stringify({ adminId, expiresAt: Date.now() + SESSION_DURATION }),
    },
  });
  return token;
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const record = await prisma.siteSetting.findUnique({
      where: { key: `session_${token}` },
    });
    if (!record) return null;

    const session = JSON.parse(record.value) as { adminId: string; expiresAt: number };
    if (session.expiresAt < Date.now()) {
      await prisma.siteSetting.delete({ where: { key: `session_${token}` } });
      return null;
    }

    const admin = await prisma.admin.findUnique({
      where: { id: session.adminId },
      select: { id: true, name: true, email: true, role: true },
    });
    return admin;
  } catch {
    return null;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    try {
      await prisma.siteSetting.delete({ where: { key: `session_${token}` } });
    } catch {
      // ignore
    }
  }
}

export { SESSION_COOKIE };
