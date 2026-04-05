import { Button } from "@/components/shared/Button";
import { CheckCircle, XCircle, Award } from "lucide-react";

export default function ResultPage() {
  const score = 85;
  const rank = "A";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl p-10 text-center">
        <Award className="mx-auto text-yellow-500 mb-4" size={80} />
        <h1 className="text-3xl font-bold text-gray-800">Kết quả bài thi</h1>
        <p className="text-gray-500 mt-2">Chúc mừng Thảo đã hoàn thành bài kiểm tra!</p>

        <div className="grid grid-cols-2 gap-6 my-8">
          <div className="bg-primary/5 p-6 rounded-2xl">
            <p className="text-sm text-gray-500 uppercase">Điểm số</p>
            <p className="text-4xl font-black text-primary">{score}/100</p>
          </div>
          <div className="bg-success/5 p-6 rounded-2xl">
            <p className="text-sm text-gray-500 uppercase">Xếp hạng</p>
            <p className="text-4xl font-black text-success">Rank {rank}</p>
          </div>
        </div>

        <div className="space-y-4 text-left">
          <h3 className="font-semibold border-b pb-2">Xem lại câu hỏi:</h3>
          {[1, 2, 3].map((q) => (
            <div key={q} className="flex justify-between items-center p-3 border rounded-lg">
              <span className="text-gray-700 font-medium">Câu hỏi {q}</span>
              {q === 2 ? (
                <span className="flex items-center text-danger gap-1 text-sm"><XCircle size={16}/> Sai</span>
              ) : (
                <span className="flex items-center text-success gap-1 text-sm"><CheckCircle size={16}/> Đúng</span>
              )}
            </div>
          ))}
          <p className="text-xs text-gray-400 italic text-center">* Theo quy định, đáp án đúng sẽ không được hiển thị.</p>
        </div>

        <Button className="w-full mt-8 py-4" onClick={() => window.location.href = '/'}>Quay về trang chủ</Button>
      </div>
    </div>
  );
}