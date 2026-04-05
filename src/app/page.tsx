"use client";
import { Button } from "@/components/shared/Button";
import Link from "next/link"; 

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8">
      <h1 className="text-4xl font-extrabold text-primary tracking-tight italic">
        Hệ thống Kiểm tra Năng lực Intern
      </h1>
      <p className="text-gray-600 text-lg max-w-md text-center">
        Chào mừng Thảo đến với dự án.
      </p>
      
      <div className="flex gap-4">
        <Link href="/login">
          <Button>Bắt đầu ngay</Button>
        </Link>

        {/* Đổi thành /user cho khớp với thư mục app/(admin)/user */}
        <Link href="/users">
          <Button variant="outline">Quản trị hệ thống</Button>
        </Link>
      </div>
    </div>
  );
}