import type { ReactNode } from "react";
import { SectionHeAiVsTruyenThong } from "./section-he-ai-vs-truyen-thong";
import { SectionNarrowGeneralSuperAi } from "./section-narrow-general-super-ai";
import { SectionCacLoaiCongNgheAi } from "./section-cac-loai-cong-nghe-ai";
import { SectionGenerativeAi } from "./section-generative-ai";
import { SectionPhanCungMl } from "./section-phan-cung-ml";
import { SectionPhatTrienHostingMoHinh } from "./section-phat-trien-hosting-mo-hinh";
import { SectionMlFramework } from "./section-ml-framework";
import { SectionQuyDinhTieuChuan } from "./section-quy-dinh-tieu-chuan";
import { SectionDacTinhChatLuongAi } from "./section-dac-tinh-chat-luong-ai";
import { SectionAiVaAnToan } from "./section-ai-va-an-toan";
import { SectionTieuChiChapNhan } from "./section-tieu-chi-chap-nhan";

// Map "chapterSlug/sectionSlug" → component nội dung của mục đó.
// Mục nào chưa có ở đây → trang mục hiển thị "đang biên soạn".
export const sectionContent: Record<string, () => ReactNode> = {
  "gioi-thieu-ai/he-ai-vs-truyen-thong": SectionHeAiVsTruyenThong,
  "gioi-thieu-ai/narrow-general-super-ai": SectionNarrowGeneralSuperAi,
  "gioi-thieu-ai/cac-loai-cong-nghe-ai": SectionCacLoaiCongNgheAi,
  "gioi-thieu-ai/generative-ai": SectionGenerativeAi,
  "gioi-thieu-ai/phan-cung-ml": SectionPhanCungMl,
  "gioi-thieu-ai/phat-trien-hosting-mo-hinh": SectionPhatTrienHostingMoHinh,
  "gioi-thieu-ai/ml-framework": SectionMlFramework,
  "gioi-thieu-ai/quy-dinh-tieu-chuan": SectionQuyDinhTieuChuan,
  "dac-tinh-chat-luong/dac-tinh-chat-luong-ai": SectionDacTinhChatLuongAi,
  "dac-tinh-chat-luong/ai-va-an-toan": SectionAiVaAnToan,
  "dac-tinh-chat-luong/tieu-chi-chap-nhan": SectionTieuChiChapNhan,
};
