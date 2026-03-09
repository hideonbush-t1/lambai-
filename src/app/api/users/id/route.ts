import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// [PATCH] Cập nhật User (Đổi nhóm, đổi quyền, hoặc reset mật khẩu)
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const updateData: any = { ...body };

    // Nếu có gửi password mới lên thì mã hóa lại
    if (body.password) {
      updateData.password = await bcrypt.hash(body.password, 10);
    }
    // Ép kiểu groupId
    if (body.groupId !== undefined) {
      updateData.groupId = body.groupId ? Number(body.groupId) : null;
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(params.id) },
      data: updateData,
      select: { id: true, name: true, role: true, groupId: true }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: 'Cập nhật thất bại' }, { status: 400 });
  }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: Number(params.id) },
    select: { id: true, name: true, email: true, role: true, groupId: true }
  });
  if (!user) return NextResponse.json({ error: 'Không tìm thấy user' }, { status: 404 });
  return NextResponse.json(user);
}

// [DELETE] Xóa User
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const role = request.headers.get('x-user-role');
  if (role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Chỉ Super Admin mới được xóa user' }, { status: 403 });
  }

  try {
    await prisma.user.delete({
      where: { id: Number(params.id) }
    });
    return NextResponse.json({ message: 'Xóa user thành công' });
  } catch (error) {
    return NextResponse.json({ error: 'Không thể xóa user' }, { status: 500 });
  }
}