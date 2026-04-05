export interface Exam {
  id: string;
  title: string;
  duration: number; // phút
  passScore: number;
  totalQuestions: number;
}

export interface Question {
  id: string;
  type: 'MULTIPLE_CHOICE' | 'CODE';
  content: string;
  options?: string[];
  correctAnswer?: string;
  language?: string; // Cho Monaco Editor
}