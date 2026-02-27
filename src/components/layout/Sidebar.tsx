import React from 'react';
import { LayoutDashboard, Users, FileText, Settings, LogOut } from 'lucide-react';

export const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-primary text-white flex flex-col shadow-xl sticky top-0">
      <div className="p-6 text-2xl font-bold border-b border-white/10 text-secondary">EXAM SYS</div>
      <nav className="flex-1 p-4 space-y-2">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary text-white cursor-pointer">
          <LayoutDashboard size={20}/> <span className="font-medium">Dashboard</span>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 cursor-pointer text-gray-200">
          <Users size={20}/> <span className="font-medium">Quản lý Intern</span>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 cursor-pointer text-gray-200">
          <FileText size={20}/> <span className="font-medium">Soạn thảo đề</span>
        </div>
      </nav>
      <div className="p-4 border-t border-white/10">
        <button className="flex items-center gap-3 p-3 w-full hover:bg-danger/20 text-red-200 rounded-lg transition-colors">
          <LogOut size={20}/> <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
};