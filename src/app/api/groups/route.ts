import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// [GET] Lấy danh sách nhóm (Kèm số lượng Intern bên trong)
export async function GET() {
  try {
    const groups = await prisma.group.findMany({
      include: {
        _count: { select: { users: true } } // Đếm số user trong nhóm
      },
      orderBy: { name: 'asc' }
    });
    return NextResponse.json(groups);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}

// [POST] Tạo nhóm mới (Yêu cầu quyền CONTENT_ADMIN hoặc SUPER_ADMIN)
export async function POST(request: Request) {
  const role = request.headers.get('x-user-role');
  if (role !== 'SUPER_ADMIN' && role !== 'CONTENT_ADMIN') {
    return NextResponse.json({ error: 'Không có quyền tạo nhóm' }, { status: 403 });
  }

  try {
    const { name } = await request.json();
    if (!name) return NextResponse.json({ error: 'Tên nhóm không được để trống' }, { status: 400 });

    const newGroup = await prisma.group.create({ data: { name } });
    return NextResponse.json(newGroup, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') return NextResponse.json({ error: 'Tên nhóm đã tồn tại' }, { status: 400 });
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}