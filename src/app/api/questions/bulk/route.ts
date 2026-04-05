import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  // 1. Bảo mật: Chỉ người có quyền mới được đưa đề thi lên
  const role = request.headers.get('x-user-role');
  if (role !== 'SUPER_ADMIN' && role !== 'CONTENT_ADMIN') {
    return NextResponse.json({ error: 'Từ chối truy cập. Chỉ Admin mới được import đề thi.' }, { status: 403 });
  }

  try {
    const body = await request.json();
    
    const { examId, questions } = body; 

    if (!examId) {
      return NextResponse.json({ error: 'Thiếu ID của đề thi (examId).' }, { status: 400 });
    }
    const examExists = await prisma.exam.findUnique({ where: { id: Number(examId) } });
    if (!examExists) {
      return NextResponse.json({ error: 'Không tìm thấy Đề thi này trong Database.' }, { status: 404 });
    }

    // 2. Kiểm tra dữ liệu thô ban đầu
    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json({ error: 'Dữ liệu gửi lên phải là một mảng câu hỏi và không được rỗng.' }, { status: 400 });
    }

    // 3. Khâu Validation (Kiểm duyệt gắt gao từng câu hỏi)
    const validQuestions = [];
    const errorLog = [];

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const questionNumber = i + 1; // Số thứ tự câu hỏi để báo lỗi cho dễ nhìn

      // Bắt buộc phải có nội dung và loại câu hỏi
      if (!q.content || !q.type) {
        errorLog.push(`Câu ${questionNumber}: Thiếu nội dung (content) hoặc loại câu hỏi (type).`);
        continue; 
      }

      // Loại câu hỏi chỉ được phép là 1 trong 2 loại đã định nghĩa
      if (q.type !== 'MULTIPLE_CHOICE' && q.type !== 'SCRIPTING') {
        errorLog.push(`Câu ${questionNumber}: Loại câu hỏi '${q.type}' không hợp lệ.`);
        continue;
      }

      // Logic riêng cho Trắc nghiệm: Phải có mảng các lựa chọn và đáp án đúng
      if (q.type === 'MULTIPLE_CHOICE') {
        if (!q.options || !Array.isArray(q.options) || q.options.length < 2) {
          errorLog.push(`Câu ${questionNumber}: Câu hỏi trắc nghiệm phải có ít nhất 2 lựa chọn (options).`);
          continue;
        }
        if (!q.correctAnswer) {
          errorLog.push(`Câu ${questionNumber}: Câu hỏi trắc nghiệm thiếu đáp án đúng (correctAnswer).`);
          continue;
        }
      }

      // Nếu pass hết các bài test, đưa vào mảng hợp lệ
      validQuestions.push({
        content: q.content,
        type: q.type,
        options: q.type === 'MULTIPLE_CHOICE' ? q.options : null, 
        correctAnswer: q.type === 'MULTIPLE_CHOICE' ? q.correctAnswer : null,
        codeTemplate: q.type === 'SCRIPTING' ? q.codeTemplate : null,
        
        examId: Number(examId), 
      });
    }

    // 4. Quyết định sinh tử: Có lỗi thì chặn toàn bộ, không cho lưu nửa vời
    if (errorLog.length > 0) {
      return NextResponse.json({ 
        error: 'Có lỗi trong cấu trúc đề thi. Vui lòng sửa và thử lại.', 
        details: errorLog 
      }, { status: 400 });
    }

    // 5. Bulk Insert: Lưu hàng loạt vào Database bằng 1 lệnh duy nhất
    const result = await prisma.question.createMany({
      data: validQuestions,
      skipDuplicates: true, 
    });

    return NextResponse.json({ 
      message: 'Import thành công!', 
      totalImported: result.count 
    }, { status: 201 });

  } catch (error: any) {
    console.error("Lỗi import bulk:", error);
    return NextResponse.json({ error: 'Lỗi server trong quá trình xử lý.' }, { status: 500 });
  }
}