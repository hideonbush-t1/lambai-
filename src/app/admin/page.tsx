import { prisma } from '@/lib/prisma';
import { StatCard } from '@/components/shared/StatCard';
import { InternTable } from '@/components/shared/InternTable';
import { Users, BookOpen, CheckCircle } from 'lucide-react'; 

// Hàm lấy dữ liệu (Bạn đã viết)
async function getStats() {
  const totalInterns = await prisma.user.count({
    where: { role: 'MEMBER' }
  });

  const recentInterns = await prisma.user.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { group: true } 
  });

  return { totalInterns, recentInterns };
}

// BỔ SUNG: Phần giao diện (UI) của trang Admin
export default async function AdminDashboard() {
  // Lấy dữ liệu thật từ DB
  const { totalInterns, recentInterns } = await getStats();

  return (
    <div className="p-6 space-y-8">
      {/* Tiêu đề trang */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tổng quan hệ thống</h1>
        <p className="text-gray-500 mt-1">Xin chào Admin, dưới đây là số liệu mới nhất.</p>
      </div>

      {/* Khu vực 3 Thẻ thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Tổng số Intern" 
          value={totalInterns} 
          icon={<Users size={24} />} 
        />
        <StatCard 
          title="Đề thi đang mở" 
          value="3" // Tạm thời hardcode, sau này bạn có thể query thêm
          icon={<BookOpen size={24} />} 
        />
        <StatCard 
          title="Lượt nộp bài" 
          value="15" // Tạm thời hardcode
          icon={<CheckCircle size={24} />} 
        />
      </div>

      {/* Khu vực Bảng dữ liệu Intern */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">Intern mới tham gia</h2>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
            Xem tất cả
          </button>
        </div>
        
        {/* Truyền cục dữ liệu recentInterns lấy từ hàm getStats() vào bảng */}
        <InternTable data={recentInterns} />
      </div>
    </div>
  );
}