import React from 'react';
import { Bell, UserCircle } from 'lucide-react';

export const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
      <div className="text-gray-500 text-sm">Trang chủ / <span className="text-primary font-bold">Dashboard</span></div>
      <div className="flex items-center gap-6">
        <Bell size={20} className="text-gray-400" />
        <div className="flex items-center gap-3 border-l pl-6 border-gray-100">
          <div className="text-right">
            <p className="text-sm font-bold text-gray-800">Thảo (Dev)</p>
            <p className="text-xs text-secondary font-medium">Admin hệ thống</p>
          </div>
          <UserCircle size={32} className="text-primary" />
        </div>
      </div>
    </header>
  );
};