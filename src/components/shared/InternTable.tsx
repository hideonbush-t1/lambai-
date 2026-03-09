import React from 'react';

// Khai báo để TypeScript hiểu component này sẽ nhận vào một mảng data
interface InternTableProps {
  data: any[];
}

// Bổ sung { data } vào tham số để nhận dữ liệu truyền từ page.tsx
export const InternTable = ({ data = [] }: InternTableProps) => {
  return (
    <table className="w-full text-left mt-4">
      <thead className="bg-surface text-primary text-xs font-bold uppercase">
        <tr>
          <th className="px-6 py-4">Họ tên</th>
          <th className="px-6 py-4">Nhóm</th>
          <th className="px-6 py-4">Trạng thái</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 bg-white">
        {/* Kiểm tra nếu không có dữ liệu thì báo trống */}
        {data.length === 0 ? (
          <tr>
            <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
              Chưa có Intern nào tham gia.
            </td>
          </tr>
        ) : (
          data.map((item) => (
            <tr key={item.id} className="hover:bg-indigo-50/30">
              <td className="px-6 py-4 font-medium">{item.name}</td>
              
              {/* Lấy tên nhóm từ DB, nếu user chưa có nhóm thì báo 'Chưa phân nhóm' */}
              <td className="px-6 py-4 text-gray-500">
                {item.group?.name || 'Chưa phân nhóm'}
              </td>
              
              <td className="px-6 py-4">
                {/* Tạm thời hiển thị trạng thái mặc định. Sau này bạn có thể logic check xem user đã có điểm trong bảng ExamAttempt chưa để đổi chữ */}
                <span className="px-2 py-1 rounded text-xs bg-secondary/10 text-secondary font-medium">
                  Đã tham gia
                </span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};