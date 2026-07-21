import Link from "next/link";
import { CategoryPage } from "@/components/CategoryPage";
import { getCategory } from "@/lib/categories";

export const metadata = {
  title: getCategory("ai-qa").title,
  description: getCategory("ai-qa").description,
};

export default function Page() {
  return (
    <CategoryPage
      slug="ai-qa"
      banner={
        <Link
          href="/kho-template-qa"
          className="group flex items-center gap-4 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-800 p-5 ring-1 ring-white/10 shadow-lg shadow-black/20 transition hover:shadow-xl"
        >
          <span className="text-3xl">🧩</span>
          <div className="flex-1">
            <div className="font-bold text-white">
              Kho Template QA — Test Scenario, Test Case, Checklist mẫu
            </div>
            <div className="text-sm text-brand-100">
              Copy mẫu trống hoặc để AI tự điền từ requirement của bạn.
            </div>
          </div>
          <span className="text-white text-xl group-hover:translate-x-1 transition">
            →
          </span>
        </Link>
      }
    />
  );
}
