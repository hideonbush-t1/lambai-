import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// [PATCH] Sửa tên nhóm
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { name } = await request.json();
    const updatedGroup = await prisma.group.update({
      where: { id: Number(params.id) },
      data: { name }
    });
    return NextResponse.json(updatedGroup);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi cập nhật' }, { status: 400 });
  }
}

// [DELETE] Xóa nhóm (Chỉ cho xóa nếu nhóm chưa có Intern nào)
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const role = request.headers.get('x-user-role');
  if (role !== 'SUPER_ADMIN') return NextResponse.json({ error: 'Chỉ Super Admin mới được xóa' }, { status: 403 });

  try {
    const groupId = Number(params.id);
    
    // Kiểm tra xem nhóm có user không
    const usersInGroup = await prisma.user.count({ where: { groupId } });
    if (usersInGroup > 0) {
      return NextResponse.json({ error: 'Nhóm đang có thành viên, không thể xóa!' }, { status: 400 });
    }

    await prisma.group.delete({ where: { id: groupId } });
    return NextResponse.json({ message: 'Đã xóa nhóm' });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi xóa' }, { status: 500 });
  }
}