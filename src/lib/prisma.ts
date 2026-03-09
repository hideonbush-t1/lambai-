// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = "postgresql://postgres:123456@localhost:5432/exam_system?schema=public";

// Khởi tạo Adapter kết nối cho Prisma 7
const adapter = new PrismaPg({ connectionString });

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Truyền trực tiếp adapter vào constructor thay vì datasources
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;