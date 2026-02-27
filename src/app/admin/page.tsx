import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getStats() {
  // Đếm tổng số Intern trong bảng User (role MEMBER)
  const totalInterns = await prisma.user.count({
    where: { role: 'MEMBER' }
  });

  // Lấy danh sách 5 Intern mới nhất để hiện lên bảng
  const recentInterns = await prisma.user.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { group: true } // Lấy luôn thông tin nhóm (Batch)
  });

  return { totalInterns, recentInterns };
}