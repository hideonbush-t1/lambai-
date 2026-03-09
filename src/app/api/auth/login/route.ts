// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signToken } from '@/lib/jwt';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 1. Kiểm tra User có tồn tại không
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'Sai email hoặc mật khẩu' }, { status: 401 });
    }

    // 2. So sánh mật khẩu (Khi tạo user nhớ dùng bcrypt.hash để lưu password nhé)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Sai email hoặc mật khẩu' }, { status: 401 });
    }

    // 3. Tạo JWT Token
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role, // Sẽ là SUPER_ADMIN, CONTENT_ADMIN, MEMBER, hoặc GUEST
    };
    const token = await signToken(payload);

    // 4. Lưu Token vào Cookie
    (await cookies()).set('auth_token', token, {
      httpOnly: true, // Trình duyệt không lấy được bằng JS -> Bảo mật cao
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 ngày
      path: '/',
    });

    return NextResponse.json({ message: 'Đăng nhập thành công', role: user.role });

  } catch (error) {
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}