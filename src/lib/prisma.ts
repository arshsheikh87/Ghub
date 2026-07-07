import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

// ─────────────────────────────────────────────
// Prisma 7 requires a driver adapter for MySQL.
// PrismaMariaDb accepts a connection string or PoolConfig.
// ─────────────────────────────────────────────

function createClient(): PrismaClient {
  const url = process.env.DATABASE_URL;

  if (!url) {
    // No DB URL at build time — adapter uses empty string and will
    // fail at query time (not at module load time).
    const adapter = new PrismaMariaDb("");
    return new PrismaClient({ adapter });
  }

  const adapter = new PrismaMariaDb(url);
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
