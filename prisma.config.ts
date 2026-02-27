import { defineConfig } from '@prisma/config';

export default defineConfig({
  datasource: {
    // Thảo viết trực tiếp địa chỉ vào đây để Prisma bản 7 đọc được luôn nhé
    url: "postgresql://postgres:123456@localhost:5432/exam_system?schema=public",
  },
});