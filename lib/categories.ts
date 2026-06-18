import type { Category, CategorySlug } from "./types";

export const categories: Category[] = [
  {
    slug: "ai-qa",
    title: "AI cho QA / Kiểm thử",
    shortTitle: "QA / Test",
    description:
      "Ứng dụng AI vào công việc kiểm thử: đọc & phân tích requirement, đọc code, viết test case, sinh test data, tự động hóa.",
    emoji: "🧪",
  },
  {
    slug: "kho-prompt",
    title: "Kho Prompt (Câu lệnh)",
    shortTitle: "Kho Prompt",
    description:
      "Thư viện câu lệnh chuẩn cho dân QA & dân văn phòng — copy là dùng, miễn phí.",
    emoji: "📚",
  },
];

export function getCategory(slug: CategorySlug): Category {
  const c = categories.find((x) => x.slug === slug);
  if (!c) throw new Error(`Unknown category: ${slug}`);
  return c;
}
