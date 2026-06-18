export type CategorySlug = "ai-qa" | "kho-prompt";

export interface Category {
  slug: CategorySlug;
  title: string;
  shortTitle: string;
  description: string;
  emoji: string;
}

export interface Tool {
  slug: string;
  name: string;
  tagline: string;
  category: CategorySlug;
  rating: number; // 0-10
  priceFrom: string; // e.g. "Miễn phí" hoặc "199k/tháng"
  bestFor: string;
  affiliateUrl: string;
  highlight?: string; // ribbon label
}

export interface PricingPlan {
  name: string;
  price: string;
  forWho: string;
  features: string[];
  recommended?: boolean;
}

export interface ComparisonRow {
  label: string;
  before: string;
  after: string;
}

export interface SetupStep {
  title: string;
  body: string;
  image?: string; // đường dẫn ảnh dưới /public, vd: /images/xxx.png
  imageAlt?: string; // chú thích ảnh
  linkSlug?: string; // slug bài viết liên quan → hiện link bấm được
  linkLabel?: string; // chữ hiển thị cho link
}

export interface ResultGroup {
  group: string; // tên nhóm, vd "NHÓM 1 — UI / Hiển thị"
  columns: string[];
  rows: string[][];
}

export interface PromptExample {
  title: string;
  prompt: string;
  result: string; // text kết quả (hoặc caption ngắn nếu dùng resultGroups)
  exampleInput?: string; // "Đầu vào dùng cho ví dụ" — hiện trước kết quả để output truy ngược được
  resultGroups?: ResultGroup[]; // nếu có → render bảng theo cột thay vì text
  goal?: string; // "Mục tiêu" — hiển thị trước prompt
  testerNote?: string; // "🔍 Góc soi lỗi của Tester" — hiển thị sau result, kiểu warning box
}

export interface ArticleIntro {
  problem?: string; // Mở bài: Đặt vấn đề
  whatIs?: string; // Giới thiệu trợ lý là gì
  whyThis?: string; // Vì sao chọn cái này (vd: vs ChatGPT)
}

export interface VisualFeature {
  name: string; // "Mind Map"
  emoji?: string; // "🗺️"
  description: string; // What it does
  howTo: string[]; // Numbered step-by-step
  useCase: string; // Khi nào dùng
  tip?: string; // Mẹo bổ sung
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: CategorySlug;
  toolSlug?: string; // nếu là bài review một tool cụ thể
  readingTime: number; // phút
  publishedAt: string; // YYYY-MM-DD
  cover: string; // emoji placeholder, đổi sang ảnh thật sau
  rating?: number;
  pros?: string[];
  cons?: string[];
  affiliateUrl?: string;
  useCase?: {
    title: string;
    paragraphs: string[];
  };
  bugs?: string[];
  pricing?: PricingPlan[];
  finalThought?: string;

  // === Phần value-first (đặt sau Quick Verdict, trước Use-case) ===
  intro?: ArticleIntro; // Mở bài: vấn đề + giới thiệu trợ lý + vì sao chọn cái này
  tldr?: string[]; // 3-5 bullet siêu ngắn "Đọc 30 giây"
  comparisonTable?: ComparisonRow[]; // bảng trước/sau
  videoUrl?: string; // YouTube watch URL hoặc embed URL
  videoTitle?: string;
  steps?: SetupStep[]; // 3-5 bước thiết lập tool
  prompts?: PromptExample[]; // prompt copy-paste sẵn + kết quả mẫu + tester note
  visualFeatures?: VisualFeature[]; // hướng dẫn tính năng visual (Mind Map, Blueprint, Audio, Video Overview)
  faq?: FAQItem[]; // câu hỏi phụ huynh / người đọc hay hỏi
}
