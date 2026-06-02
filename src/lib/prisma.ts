import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Append connection_limit=1 to prevent Prisma from reusing connections that
// MySQL's wait_timeout has already killed ("PANIC: timer has gone away").
function buildUrl() {
  const base = process.env.DATABASE_URL ?? "";
  return base.includes("connection_limit") ? base : base + (base.includes("?") ? "&" : "?") + "connection_limit=1&connect_timeout=30&pool_timeout=30";
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query"] : [],
    datasourceUrl: buildUrl(),
  });

globalForPrisma.prisma = prisma;
