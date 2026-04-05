"use client";
import { Button } from "@/components/shared/Button";

export default function CreateExam() {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold mb-6">Tạo bài thi mới</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tên bài kiểm tra</label>
          <input type="text" className="w-full mt-1 p-2 border rounded-md outline-primary" placeholder="Ví dụ: Final Test React Group" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Thời gian (phút)</label>
            <input type="number" className="w-full mt-1 p-2 border rounded-md outline-primary" defaultValue={60} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Điểm Pass (Dừng ở Rank D)</label>
            <input type="number" className="w-full mt-1 p-2 border rounded-md outline-primary" defaultValue={50} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Gán cho nhóm (Batch/Group)</label>
          <select className="w-full mt-1 p-2 border rounded-md outline-primary">
            <option>Batch 2026 - React Group</option>
            <option>Batch 2026 - Java Group</option>
          </select>
        </div>
        <Button className="w-full mt-4">Lưu cấu hình & Kích hoạt bài thi</Button>
      </div>
    </div>
  );
}