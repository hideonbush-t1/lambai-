import React from 'react';

export const InternTable = () => {
  const data = [
    { id: 1, name: 'Nguyễn Văn A', group: 'Batch 2026', status: 'Đang thi' },
    { id: 2, name: 'Trần Thị B', group: 'React Group', status: 'Hoàn thành' },
  ];
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
        {data.map((item) => (
          <tr key={item.id} className="hover:bg-indigo-50/30">
            <td className="px-6 py-4 font-medium">{item.name}</td>
            <td className="px-6 py-4 text-gray-500">{item.group}</td>
            <td className="px-6 py-4">
              <span className={`px-2 py-1 rounded text-xs ${item.status === 'Hoàn thành' ? 'bg-secondary/10 text-secondary' : 'bg-warning/10 text-warning'}`}>
                {item.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};