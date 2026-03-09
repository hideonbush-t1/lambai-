import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bỏ qua middleware cho các route public (đăng nhập, trang chủ, public file)
  if (
    pathname.startsWith('/api/auth') || 
    pathname === '/login' || 
    pathname.startsWith('/_next') || 
    pathname.startsWith('/public')
  ) {
    return NextResponse.next();
  }

  // 1. Lấy token từ cookie
  const token = request.cookies.get('auth_token')?.value;

  if (!token) {
    // Chưa đăng nhập -> đá về trang login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. Giải mã token để lấy thông tin User (gồm role)
  const session = await verifyToken(token);

  if (!session) {
    // Token hết hạn hoặc không hợp lệ
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const userRole = session.role; // SUPER_ADMIN, CONTENT_ADMIN, MEMBER, GUEST

  // ==========================================
  // 3. LOGIC PHÂN QUYỀN (RBAC - 4 CẤP ĐỘ)
  // ==========================================

  // --- CẤP 1: Chặn route Admin ---
  if (pathname.startsWith('/admin')) {
    // Guest và Member KHÔNG được vào thư mục admin
    if (userRole === 'GUEST' || userRole === 'MEMBER') {
      return NextResponse.redirect(new URL('/403', request.url)); // Đá về trang Từ chối truy cập
    }

    // Content Admin KHÔNG được vào phần quản lý User của Admin
    if (pathname.startsWith('/admin/users') && userRole === 'CONTENT_ADMIN') {
      return NextResponse.redirect(new URL('/admin', request.url)); 
    }
    
    // Super Admin thì đi đâu cũng được trong /admin
  }

  // --- CẤP 2: Chặn route Làm bài thi ---
  // Ví dụ: Guest chỉ được làm bài thi Free (định nghĩa URL là /exam/free/...)
  // Nếu Guest cố vào bài thi nội bộ (/exam/internal/...) thì chặn
  if (pathname.startsWith('/exam/internal') && userRole === 'GUEST') {
     return NextResponse.redirect(new URL('/exam/free', request.url));
  }

  // Mọi thứ qua ải kiểm tra -> Cho đi tiếp
  // (Tùy chọn) Gắn thêm thông tin user vào header để các Route Handlers đọc được
  const response = NextResponse.next();
  response.headers.set('x-user-id', session.userId.toString());
  response.headers.set('x-user-role', session.role);
  
  return response;
}

// Khai báo middleware sẽ chạy trên những route nào
export const config = {
  matcher: [
    '/admin/:path*', 
    '/exam/:path*', 
    '/dashboard/:path*'
  ],
};