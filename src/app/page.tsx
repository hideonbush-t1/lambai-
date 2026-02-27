import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/shared/StatCard';
import { InternTable } from '@/components/shared/InternTable';
import { Users, FileText, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard title="Tổng Intern" value="45" icon={<Users size={24}/>} trend="+5 mới" />
            <StatCard title="Bài thi" value="12" icon={<FileText size={24}/>} />
            <StatCard title="Tỷ lệ đạt" value="85%" icon={<CheckCircle size={24}/>} />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-4 text-gray-700">Danh sách quản lý</h2>
            <InternTable />
          </div>
        </main>
      </div>
    </div>
  );
}