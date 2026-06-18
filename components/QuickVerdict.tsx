import type { Article } from "@/lib/types";
import { AffiliateButton } from "./AffiliateButton";

export function QuickVerdict({ article }: { article: Article }) {
  if (!article.rating) return null;
  const biggestPro = article.pros?.[0];
  const biggestCon = article.cons?.[0];

  return (
    <aside className="not-prose my-8 overflow-hidden rounded-3xl border-2 border-brand-200 bg-gradient-to-br from-brand-50 to-amber-50">
      <div className="grid md:grid-cols-[auto_1fr_auto] gap-6 p-6 md:p-8 items-center">
        <div className="text-center">
          <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
            Tóm tắt nhanh
          </div>
          <div className="mt-1 flex items-baseline gap-1 justify-center">
            <span className="text-6xl font-black text-brand-700">
              {article.rating.toFixed(1)}
            </span>
            <span className="text-xl text-slate-500 font-bold">/10</span>
          </div>
        </div>

        <div className="space-y-3 md:border-l md:border-r md:border-brand-200/70 md:px-6">
          {biggestPro && (
            <div className="flex gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700 font-bold">
                ✓
              </span>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                  Ưu điểm lớn nhất
                </div>
                <div className="text-slate-800">{biggestPro}</div>
              </div>
            </div>
          )}
          {biggestCon && (
            <div className="flex gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-rose-100 text-rose-700 font-bold">
                !
              </span>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-rose-700">
                  Nhược điểm lớn nhất
                </div>
                <div className="text-slate-800">{biggestCon}</div>
              </div>
            </div>
          )}
        </div>

        <div className="text-center md:text-left">
          {article.affiliateUrl && (
            <>
              <AffiliateButton
                href={article.affiliateUrl}
                size="lg"
                label="Dùng thử miễn phí"
              />
              <div className="mt-2 text-xs text-slate-500">
                Liên kết affiliate — không tốn thêm tiền của bạn
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
