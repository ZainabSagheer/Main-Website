import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Append connection_limit=1 to prevent Prisma from reusing connections that
// MySQL's wait_timeout has already killed ("PANIC: timer has gone away").
function buildUrl(): string | undefined {
  const base = process.env.DATABASE_URL;
  if (!base) return undefined;
  if (base.includes("connection_limit")) return base;
  return base + (base.includes("?") ? "&" : "?") + "connection_limit=1&connect_timeout=30&pool_timeout=30";
}

const _url = buildUrl();

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query"] : [],
    ...(_url ? { datasourceUrl: _url } : {}),
  });

globalForPrisma.prisma = prisma;
