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
import { SectionCacDangMl } from "./section-cac-dang-ml";
import { SectionQuyTrinhMl } from "./section-quy-trinh-ml";
import { SectionPretrainedFinetuningRag } from "./section-pretrained-finetuning-rag";
import { SectionChuanBiDuLieu } from "./section-chuan-bi-du-lieu";
import { SectionDuLieuTrainValidationTest } from "./section-du-lieu-train-validation-test";
import { SectionTinhMetricMl } from "./section-tinh-metric-ml";
import { SectionMangNoRonSau } from "./section-mang-no-ron-sau";
import { SectionCoverageMangNoRon } from "./section-coverage-mang-no-ron";
import { SectionLockedAdaptive } from "./section-locked-adaptive";
import { SectionCachTiepCanThongKe } from "./section-cach-tiep-can-thong-ke";
import { SectionTestOracleAi } from "./section-test-oracle-ai";
import { SectionKiemThuGenai } from "./section-kiem-thu-genai";
import { SectionRedTeaming } from "./section-red-teaming";
import { SectionTestLevelMl } from "./section-test-level-ml";
import { SectionRiskBasedTesting } from "./section-risk-based-testing";
import { SectionRuiRoDuLieuDauVao } from "./section-rui-ro-du-lieu-dau-vao";
import { SectionKiemThuBias } from "./section-kiem-thu-bias";
import { SectionDataPipelineTesting } from "./section-data-pipeline-testing";
import { SectionTinhDaiDienDuLieu } from "./section-tinh-dai-dien-du-lieu";
import { SectionRangBuocTapDuLieu } from "./section-rang-buoc-tap-du-lieu";
import { SectionDungDanNhan } from "./section-dung-dan-nhan";
import { SectionRuiRoMoHinh } from "./section-rui-ro-mo-hinh";
import { SectionTaiLieuReviewMoHinh } from "./section-tai-lieu-review-mo-hinh";
import { SectionTestHieuNangXacSuat } from "./section-test-hieu-nang-xac-suat";
import { SectionAdversarialTesting } from "./section-adversarial-testing";
import { SectionMetamorphicTesting } from "./section-metamorphic-testing";
import { SectionDriftTesting } from "./section-drift-testing";
import { SectionOverfittingUnderfitting } from "./section-overfitting-underfitting";
import { SectionAbTesting } from "./section-ab-testing";
import { SectionBackToBackTesting } from "./section-back-to-back-testing";
import { SectionRuiRoPhatTrienMl } from "./section-rui-ro-phat-trien-ml";
import { SectionDeploymentTesting } from "./section-deployment-testing";

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
  "machine-learning/cac-dang-ml": SectionCacDangMl,
  "machine-learning/quy-trinh-ml": SectionQuyTrinhMl,
  "machine-learning/pretrained-finetuning-rag": SectionPretrainedFinetuningRag,
  "machine-learning/chuan-bi-du-lieu": SectionChuanBiDuLieu,
  "machine-learning/du-lieu-train-validation-test": SectionDuLieuTrainValidationTest,
  "machine-learning/tinh-metric-ml": SectionTinhMetricMl,
  "machine-learning/mang-no-ron-sau": SectionMangNoRonSau,
  "machine-learning/coverage-mang-no-ron": SectionCoverageMangNoRon,
  "kiem-thu-he-ai/locked-adaptive": SectionLockedAdaptive,
  "kiem-thu-he-ai/cach-tiep-can-thong-ke": SectionCachTiepCanThongKe,
  "kiem-thu-he-ai/test-oracle-ai": SectionTestOracleAi,
  "kiem-thu-he-ai/kiem-thu-genai": SectionKiemThuGenai,
  "kiem-thu-he-ai/red-teaming": SectionRedTeaming,
  "kiem-thu-he-ai/test-level-ml": SectionTestLevelMl,
  "kiem-thu-he-ai/risk-based-testing": SectionRiskBasedTesting,
  "kiem-thu-du-lieu-dau-vao/rui-ro-du-lieu-dau-vao": SectionRuiRoDuLieuDauVao,
  "kiem-thu-du-lieu-dau-vao/kiem-thu-bias": SectionKiemThuBias,
  "kiem-thu-du-lieu-dau-vao/data-pipeline-testing": SectionDataPipelineTesting,
  "kiem-thu-du-lieu-dau-vao/tinh-dai-dien-du-lieu": SectionTinhDaiDienDuLieu,
  "kiem-thu-du-lieu-dau-vao/rang-buoc-tap-du-lieu": SectionRangBuocTapDuLieu,
  "kiem-thu-du-lieu-dau-vao/dung-dan-nhan": SectionDungDanNhan,
  "kiem-thu-mo-hinh/rui-ro-mo-hinh": SectionRuiRoMoHinh,
  "kiem-thu-mo-hinh/tai-lieu-review-mo-hinh": SectionTaiLieuReviewMoHinh,
  "kiem-thu-mo-hinh/test-hieu-nang-xac-suat": SectionTestHieuNangXacSuat,
  "kiem-thu-mo-hinh/adversarial-testing": SectionAdversarialTesting,
  "kiem-thu-mo-hinh/metamorphic-testing": SectionMetamorphicTesting,
  "kiem-thu-mo-hinh/drift-testing": SectionDriftTesting,
  "kiem-thu-mo-hinh/overfitting-underfitting": SectionOverfittingUnderfitting,
  "kiem-thu-mo-hinh/ab-testing": SectionAbTesting,
  "kiem-thu-mo-hinh/back-to-back-testing": SectionBackToBackTesting,
  "kiem-thu-phat-trien-ml/rui-ro-phat-trien-ml": SectionRuiRoPhatTrienMl,
  "kiem-thu-phat-trien-ml/deployment-testing": SectionDeploymentTesting,
};
