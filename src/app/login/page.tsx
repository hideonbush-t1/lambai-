"use client";
import { Button } from "@/components/shared/Button";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Gửi data cho Thành BE:", { email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleLogin} className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl space-y-6 border border-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary">Đăng nhập Hệ thống</h1>
          <p className="text-gray-500 text-sm mt-2">Dành cho Intern và Quản trị viên</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700">Email công ty</label>
            <input 
              type="email" 
              required
              className="w-full mt-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              placeholder="dst.thao.ptt@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">Mật khẩu</label>
            <input 
              type="password" 
              required
              className="w-full mt-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <Button type="submit" className="w-full py-3 shadow-lg shadow-primary/20">Xác nhận Đăng nhập</Button>
      </form>
    </div>
  );
}