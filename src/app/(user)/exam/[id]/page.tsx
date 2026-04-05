"use client";
import { Button } from "@/components/shared/Button";
import { useState } from "react";
import { Clock, AlertTriangle } from "lucide-react";
// 1. Import Component CodeEditor vừa tạo
import CodeEditor from "@/components/exam/CodeEditor"; 

export default function ExamPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const totalQuestions = 5; // Giảm xuống cho dễ test

  // 2. Giả lập dữ liệu câu hỏi (sau này Thành BE sẽ trả về qua API)
  const mockQuestions = [
    { type: 'MULTIPLE_CHOICE', content: 'Câu hỏi trắc nghiệm 1?' },
    { type: 'CODE', content: 'Viết một hàm React Component hiển thị "Hello Intern".', language: 'typescript' },
    { type: 'MULTIPLE_CHOICE', content: 'Câu hỏi trắc nghiệm 3?' },
    { type: 'CODE', content: 'Viết hàm Java tính tổng số chẵn từ 1 đến N.', language: 'java' },
    { type: 'MULTIPLE_CHOICE', content: 'Câu hỏi trắc nghiệm 5?' },
  ];

  const currentQData = mockQuestions[currentQuestion];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Cột trái: Nội dung câu hỏi */}
      <div className="flex-1 flex flex-col p-6 overflow-y-auto">
        <div className="bg-white rounded-xl shadow-sm p-8 flex-1">
          <div className="flex justify-between items-center mb-6">
            <span className="text-primary font-bold">Câu hỏi {currentQuestion + 1} / {totalQuestions}</span>
            <div className="flex items-center gap-2 text-warning font-mono bg-warning/10 px-3 py-1 rounded-full">
              <Clock size={18} /> <span>44:55</span>
            </div>
          </div>
          
          <h2 className="text-xl font-medium mb-8 text-gray-800">
            {currentQData.content}
          </h2>

          {/* 3. Logic hiển thị loại câu hỏi */}
          {currentQData.type === 'MULTIPLE_CHOICE' ? (
            <div className="space-y-4">
              {['Đáp án A', 'Đáp án B', 'Đáp án C', 'Đáp án D'].map((opt, i) => (
                <label key={i} className="flex items-center p-4 border rounded-xl hover:bg-primary/5 cursor-pointer transition-all border-gray-200">
                  <input type="radio" name="answer" className="w-4 h-4 text-primary" />
                  <span className="ml-3 text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          ) : (
            // Hiển thị Monaco Editor cho câu hỏi Code
            <div className="mt-6">
              <CodeEditor 
                language={currentQData.language as any} 
                onChange={(code) => {
                  console.log("Code của Intern:", code); 
                  // Sau này Thành BE sẽ xử lý cục code này
                }} 
              />
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-between">
          <Button variant="outline" disabled={currentQuestion === 0} onClick={() => setCurrentQuestion(v => v - 1)}>Câu trước</Button>
          <Button disabled={currentQuestion === totalQuestions - 1} onClick={() => setCurrentQuestion(v => v + 1)}>Câu tiếp theo</Button>
        </div>
      </div>

      {/* Cột phải: Danh sách câu hỏi (Sidebar) - GIỮ NGUYÊN */}
      {/* ... Phần code Sidebar y hệt như lượt trước, Thảo giữ lại nhé ... */}
    </div>
  );
}