import type { ReactNode } from "react";
import { SectionHeAiVsTruyenThong } from "./section-he-ai-vs-truyen-thong";

// Map "chapterSlug/sectionSlug" → component nội dung của mục đó.
// Mục nào chưa có ở đây → trang mục hiển thị "đang biên soạn".
export const sectionContent: Record<string, () => ReactNode> = {
  "gioi-thieu-ai/he-ai-vs-truyen-thong": SectionHeAiVsTruyenThong,
};
