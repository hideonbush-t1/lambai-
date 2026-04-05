"use client";
import React, { useState } from 'react';
import Editor, { OnChange } from '@monaco-editor/react';
import { Loader2 } from 'lucide-react'; // Icon loading đẹp mắt

interface CodeEditorProps {
  language?: 'java' | 'javascript' | 'typescript'; // Javascript/Typescript cho React
  defaultValue?: string;
  onChange?: (value: string | undefined) => void;
}

const CodeEditor = ({ 
  language = 'javascript', 
  defaultValue = '// Viết code của bạn ở đây...', 
  onChange 
}: CodeEditorProps) => {
  const [value, setValue] = useState<string | undefined>(defaultValue);

  const handleEditorChange: OnChange = (newValue) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue); // Gửi code về cho trang Exam xử lý
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-inner bg-white">
      {/* Header của Editor */}
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
        <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
          {language === 'java' ? 'Java Editor' : 'React (TSX) Editor'}
        </span>
        <span className="text-xs text-gray-500 font-mono">VS Code Engine</span>
      </div>

      {/* Trình soạn thảo Monaco */}
      <Editor
        height="400px" // Độ cao vừa phải cho khung thi
        language={language}
        value={value}
        onChange={handleEditorChange}
        theme="vs" // Theme sáng cho đồng nhất với UI hiện tại
        options={{
          minimap: { enabled: false }, // Ẩn bản đồ thu nhỏ cho đỡ rối
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: true,
          scrollBeyondLastLine: false,
          automaticLayout: true, // Tự động fit khi resize cửa sổ
          padding: { top: 16, bottom: 16 }
        }}
        loading={<div className="flex items-center justify-center h-[400px] gap-2 text-primary">
          <Loader2 className="animate-spin" /> Đang tải Editor...
        </div>}
      />
    </div>
  );
};

export default CodeEditor;