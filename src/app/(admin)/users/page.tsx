import { Button } from "@/components/shared/Button";
import { Table } from "@/components/shared/Table";
import { Plus, Filter, Download } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data cho Thành tham khảo
const mockUsers = [
  { id: "1", name: "Nguyễn Văn A", email: "a@gmail.com", role: "Member", batch: "Batch 2026", group: "React Group" },
  { id: "2", name: "Trần Thị B", email: "b@gmail.com", role: "Member", batch: "Batch 2026", group: "Java Group" },
  { id: "3", name: "Lê Văn C", email: "c@gmail.com", role: "Content Admin", batch: "-", group: "-" },
];

export default function UsersManager() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Intern</h1>
          <p className="text-gray-500 text-sm">Quản lý danh sách sinh viên thực tập và phân nhóm.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download size={18} /> Xuất Excel
          </Button>
          <Button className="gap-2">
            <Plus size={18} /> Thêm Intern
          </Button>
        </div>
      </div>

      {/* Bộ lọc nhanh (Filter) */}
      <div className="flex gap-4 p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
        <div className="flex-1 flex gap-4">
          <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg p-2.5 focus:ring-primary focus:border-primary outline-none">
            <option>Tất cả các đợt (Batch)</option>
            <option>Batch 2026</option>
            <option>Batch 2025</option>
          </select>
          <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg p-2.5 focus:ring-primary focus:border-primary outline-none">
            <option>Tất cả nhóm</option>
            <option>React Group</option>
            <option>Java Group</option>
          </select>
        </div>
      </div>

      {/* Bảng hiển thị */}
      <Table headers={["Tên Intern", "Email", "Vai trò", "Batch / Nhóm", "Thao tác"]}>
        {mockUsers.map((user) => (
          <tr key={user.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
            <td className="px-6 py-4 text-gray-600">{user.email}</td>
            <td className="px-6 py-4">
              <span className={cn(
                "px-2 py-1 text-xs font-semibold rounded-full",
                user.role === 'Member' ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
              )}>
                {user.role}
              </span>
            </td>
            <td className="px-6 py-4 text-gray-600 text-sm">
              {user.batch} <span className="text-gray-300 mx-1">|</span> {user.group}
            </td>
            <td className="px-6 py-4">
              <button className="text-primary hover:underline text-sm font-medium">Chỉnh sửa</button>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}