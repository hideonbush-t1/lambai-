"use client";
import { useState } from "react";
import { Button } from "@/components/shared/Button";
import { Table } from "@/components/shared/Table";
import * as XLSX from "xlsx"; // Thư viện Thảo đã cài

export default function ImportExam() {
  const [data, setData] = useState<any[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const json = XLSX.utils.sheet_to_json(ws);
      setData(json); // Lưu dữ liệu để Preview
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Import Đề thi từ Excel</h1>
      
      <div className="p-8 border-2 border-dashed border-gray-300 rounded-xl text-center bg-white">
        <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} className="hidden" id="excel-upload" />
        <label htmlFor="excel-upload" className="cursor-pointer text-primary hover:underline">
          Nhấn để tải lên file Excel hoặc CSV
        </label>
        <p className="text-sm text-gray-500 mt-2">Dữ liệu sẽ được hiển thị xem trước bên dưới</p>
      </div>

      {data.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">Xem trước dữ liệu ({data.length} câu hỏi)</h2>
          <Table headers={["Câu hỏi", "Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D", "Đúng"]}>
            {data.map((row, index) => (
              <tr key={index}>
                <td className="px-6 py-4">{row.question || row["Câu hỏi"]}</td>
                <td className="px-6 py-4">{row.A}</td>
                <td className="px-6 py-4">{row.B}</td>
                <td className="px-6 py-4">{row.C}</td>
                <td className="px-6 py-4">{row.D}</td>
                <td className="px-6 py-4 text-success font-bold">{row.correct || row["Đáp án đúng"]}</td>
              </tr>
            ))}
          </Table>
          <Button className="w-full py-4">Xác nhận Lưu vào Hệ thống</Button>
        </div>
      )}
    </div>
  );
}