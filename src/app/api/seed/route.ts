// src/app/api/seed/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Gọi Prisma từ file dùng chung
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    // Mã hóa mật khẩu "12345"
    const hashedPassword = await bcrypt.hash('12345', 10);

    // Tạo user
    const user = await prisma.user.upsert({
      where: { email: 'admin@exam.com' },
      update: {}, 
      create: {
        name: 'Super Admin',
        email: 'admin@exam.com',
        password: hashedPassword,
        role: 'SUPER_ADMIN',
      },
    });

    return NextResponse.json({ message: 'Tạo tài khoản Admin thành công!', user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}