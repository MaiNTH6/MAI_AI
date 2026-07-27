// Cấu trúc chuyên mục AI Testing (ISTQB CT-AI v2.0) — dùng cho hub nhiều tầng.
// 7 chương → các mục con. Nội dung từng mục để ở content/ai-testing (registry).

export interface AiSection {
  slug: string;
  code: string; // mã theo syllabus, vd "1.1.1"
  title: string;
  hasContent?: boolean; // đã viết nội dung chưa
}

export interface AiChapter {
  slug: string;
  num: number;
  title: string;
  emoji: string;
  minutes: number;
  summary: string;
  sections: AiSection[];
}

export const aiChapters: AiChapter[] = [
  {
    slug: "gioi-thieu-ai",
    num: 1,
    title: "Giới thiệu AI",
    emoji: "🧠",
    minutes: 120,
    summary:
      "Khái niệm nền: hệ AI khác gì phần mềm thường, các loại AI & công nghệ, GenAI, phần cứng, framework, quy định.",
    sections: [
      { slug: "he-ai-vs-truyen-thong", code: "1.1.1", title: "Hệ thống AI và hệ thống truyền thống", hasContent: true },
      { slug: "narrow-general-super-ai", code: "1.1.2", title: "Narrow AI, General AI, Super AI", hasContent: true },
      { slug: "cac-loai-cong-nghe-ai", code: "1.1.3", title: "Các loại công nghệ AI", hasContent: true },
      { slug: "generative-ai", code: "1.1.4", title: "Generative AI" },
      { slug: "phan-cung-ml", code: "1.1.5", title: "Phần cứng cho hệ thống ML" },
      { slug: "phat-trien-hosting-mo-hinh", code: "1.1.6", title: "Phát triển & lưu trữ mô hình AI" },
      { slug: "ml-framework", code: "1.1.7", title: "Framework phát triển ML" },
      { slug: "quy-dinh-tieu-chuan", code: "1.1.8", title: "Quy định & tiêu chuẩn cho AI" },
    ],
  },
  {
    slug: "dac-tinh-chat-luong",
    num: 2,
    title: "Đặc tính chất lượng của hệ thống AI",
    emoji: "🎯",
    minutes: 45,
    summary:
      "Các đặc tính chất lượng riêng của AI (theo ISO/IEC 25059), an toàn, và tiêu chí chấp nhận.",
    sections: [
      { slug: "dac-tinh-chat-luong-ai", code: "2.1.1", title: "Đặc tính chất lượng riêng của AI" },
      { slug: "ai-va-an-toan", code: "2.1.2", title: "AI và an toàn (safety)" },
      { slug: "tieu-chi-chap-nhan", code: "2.2.1", title: "Tiêu chí chấp nhận cho hệ thống AI" },
    ],
  },
  {
    slug: "machine-learning",
    num: 3,
    title: "Machine Learning",
    emoji: "🤖",
    minutes: 375,
    summary:
      "Nền tảng ML: các dạng học, quy trình, chuẩn bị dữ liệu, thước đo hiệu năng, mạng nơ-ron.",
    sections: [
      { slug: "cac-dang-ml", code: "3.1.1", title: "Các dạng Machine Learning" },
      { slug: "quy-trinh-ml", code: "3.1.2", title: "Quy trình ML (workflow)" },
      { slug: "pretrained-finetuning-rag", code: "3.1.4", title: "Pretrained, Fine-tuning, RAG" },
      { slug: "chuan-bi-du-lieu", code: "3.2.1", title: "Các hoạt động chuẩn bị dữ liệu" },
      { slug: "tinh-metric-ml", code: "3.3.1", title: "Tính thước đo hiệu năng ML (phân loại)" },
      { slug: "mang-no-ron-sau", code: "3.4.1", title: "Cấu trúc & hoạt động mạng nơ-ron sâu" },
      { slug: "coverage-mang-no-ron", code: "3.4.3", title: "Coverage cho mạng nơ-ron" },
    ],
  },
  {
    slug: "kiem-thu-he-ai",
    num: 4,
    title: "Kiểm thử hệ thống AI",
    emoji: "🧪",
    minutes: 195,
    summary:
      "Đặc thù kiểm thử hệ AI: locked vs adaptive, cách tiếp cận thống kê, test oracle, kiểm thử GenAI/LLM, test level.",
    sections: [
      { slug: "locked-adaptive", code: "4.1.1", title: "Hệ AI khóa (locked) và thích ứng (adaptive)" },
      { slug: "cach-tiep-can-thong-ke", code: "4.1.2", title: "Vì sao cần cách tiếp cận thống kê" },
      { slug: "test-oracle-ai", code: "4.1.3", title: "Test oracle cho hệ AI" },
      { slug: "kiem-thu-genai", code: "4.2.1", title: "Kiểm thử Generative AI" },
      { slug: "red-teaming", code: "4.2.2", title: "Red Teaming" },
      { slug: "test-level-ml", code: "4.3.1", title: "Test level cho hệ thống ML" },
      { slug: "risk-based-testing", code: "4.3.2", title: "Risk-based testing cho hệ thống ML" },
    ],
  },
  {
    slug: "kiem-thu-du-lieu-dau-vao",
    num: 5,
    title: "Kiểm thử dữ liệu đầu vào cho ML",
    emoji: "📥",
    minutes: 180,
    summary:
      "Rủi ro dữ liệu đầu vào, kiểm thử thiên lệch (bias), data pipeline, tính đại diện, ràng buộc & nhãn dữ liệu.",
    sections: [
      { slug: "rui-ro-du-lieu-dau-vao", code: "5.1.1", title: "Rủi ro dữ liệu đầu vào & giảm thiểu" },
      { slug: "kiem-thu-bias", code: "5.1.2", title: "Kiểm thử thiên lệch (bias)" },
      { slug: "data-pipeline-testing", code: "5.1.3", title: "Kiểm thử data pipeline" },
      { slug: "tinh-dai-dien-du-lieu", code: "5.1.4", title: "Tính đại diện của dữ liệu" },
      { slug: "rang-buoc-tap-du-lieu", code: "5.1.5", title: "Ràng buộc tập dữ liệu" },
      { slug: "dung-dan-nhan", code: "5.1.6", title: "Đúng đắn của nhãn (label)" },
    ],
  },
  {
    slug: "kiem-thu-mo-hinh",
    num: 6,
    title: "Kiểm thử mô hình cho ML",
    emoji: "🧩",
    minutes: 225,
    summary:
      "Kỹ thuật kiểm thử mô hình: adversarial, metamorphic, drift, overfitting/underfitting, A/B, back-to-back.",
    sections: [
      { slug: "rui-ro-mo-hinh", code: "6.1.1", title: "Rủi ro mô hình & giảm thiểu" },
      { slug: "tai-lieu-review-mo-hinh", code: "6.1.2", title: "Tài liệu & review mô hình" },
      { slug: "test-hieu-nang-xac-suat", code: "6.1.3", title: "Test hiệu năng mô hình xác suất" },
      { slug: "adversarial-testing", code: "6.1.4", title: "Adversarial testing" },
      { slug: "metamorphic-testing", code: "6.1.5", title: "Metamorphic testing" },
      { slug: "drift-testing", code: "6.1.7", title: "Drift testing" },
      { slug: "overfitting-underfitting", code: "6.1.8", title: "Overfitting & Underfitting" },
      { slug: "ab-testing", code: "6.1.9", title: "A/B testing" },
      { slug: "back-to-back-testing", code: "6.1.10", title: "Back-to-back testing" },
    ],
  },
  {
    slug: "kiem-thu-phat-trien-ml",
    num: 7,
    title: "Kiểm thử trong phát triển ML",
    emoji: "🚀",
    minutes: 30,
    summary: "Rủi ro trong phát triển ML và kiểm thử triển khai (deployment) hệ thống ML.",
    sections: [
      { slug: "rui-ro-phat-trien-ml", code: "7.1.1", title: "Rủi ro trong phát triển ML & giảm thiểu" },
      { slug: "deployment-testing", code: "7.1.2", title: "Kiểm thử triển khai (deployment)" },
    ],
  },
];

export function getChapter(slug: string): AiChapter | undefined {
  return aiChapters.find((c) => c.slug === slug);
}

export function getSection(chapterSlug: string, sectionSlug: string) {
  const chapter = getChapter(chapterSlug);
  const section = chapter?.sections.find((s) => s.slug === sectionSlug);
  if (!chapter || !section) return undefined;
  return { chapter, section };
}

// Danh sách phẳng mọi mục (theo thứ tự) để tính Trước/Sau.
export function flatSections() {
  return aiChapters.flatMap((c) =>
    c.sections.map((s) => ({ chapter: c, section: s }))
  );
}

export function adjacentSections(chapterSlug: string, sectionSlug: string) {
  const flat = flatSections();
  const i = flat.findIndex(
    (x) => x.chapter.slug === chapterSlug && x.section.slug === sectionSlug
  );
  return {
    prev: i > 0 ? flat[i - 1] : undefined,
    next: i >= 0 && i < flat.length - 1 ? flat[i + 1] : undefined,
  };
}
