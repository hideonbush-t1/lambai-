// src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// [GET] Lấy danh sách User (Đã nâng cấp Phân trang & Tìm kiếm)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const groupId = searchParams.get('groupId');
  const search = searchParams.get('search') || '';
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;
  const skip = (page - 1) * limit;

  try {
    const whereClause: any = {
      ...(groupId ? { groupId: Number(groupId) } : {}),
      ...(search ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } }
        ]
      } : {})
    };

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: whereClause,
        select: {
          id: true, name: true, email: true, role: true, createdAt: true,
          group: { select: { name: true } } // Không trả về password
        },
        orderBy: { createdAt: 'desc' },
        skip,       // Cắt bỏ các trang trước
        take: limit // Chỉ lấy đúng số lượng giới hạn
      }),
      prisma.user.count({ where: whereClause })
    ]);

    // Trả về cả dữ liệu và meta data cho Frontend làm nút bấm phân trang
    return NextResponse.json({
      data: users,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}


// [POST] Thêm mới một User/Intern (Đã vá lỗ hổng leo quyền)
export async function POST(request: Request) {
  const requesterRole = request.headers.get('x-user-role');

  // 1. Chặn người lạ (GUEST/MEMBER không được phép thêm user)
  if (requesterRole !== 'SUPER_ADMIN' && requesterRole !== 'CONTENT_ADMIN') {
    return NextResponse.json({ error: 'Không có quyền thêm tài khoản' }, { status: 403 });
  }

  try {
    const { name, email, password, role, groupId } = await request.json();

    if (role === 'SUPER_ADMIN' && requesterRole !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Bạn không có quyền tạo tài khoản cấp Super Admin' }, { status: 403 });
    }

    const hashedPassword = await bcrypt.hash(password || '123456', 10); // Mật khẩu mặc định

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || 'MEMBER',
        groupId: groupId ? Number(groupId) : null,
      },
      select: { id: true, name: true, email: true, role: true } // Trả về thông tin an toàn
    });
    
    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') return NextResponse.json({ error: 'Email đã tồn tại' }, { status: 400 });
    return NextResponse.json({ error: 'Lỗi thêm user' }, { status: 500 });
  }
}