import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Prisma 7: runtime connects via a driver adapter (pooled URL).
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

// Singleton — avoid exhausting DB connections during dev hot-reload.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
