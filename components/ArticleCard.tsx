import Link from "next/link";
import type { Article } from "@/lib/types";
import { getCategory } from "@/lib/categories";

export function ArticleCard({ article }: { article: Article }) {
  const cat = getCategory(article.category);
  const href = `/bai-viet/${article.slug}`;

  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl bg-white ring-1 ring-white/10 shadow-lg shadow-black/20 overflow-hidden transition hover:shadow-2xl hover:shadow-brand-900/30 hover:-translate-y-0.5 hover:ring-brand-400/40"
    >
      <div className="aspect-[16/9] grid place-items-center bg-gradient-to-br from-brand-50 to-amber-50 text-6xl">
        {article.cover}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="badge !bg-slate-100 !text-slate-700">
            {cat.emoji} {cat.shortTitle}
          </span>
          <span>•</span>
          <span>{article.readingTime} phút đọc</span>
        </div>
        <h3 className="mt-3 font-bold text-lg leading-snug text-slate-900 group-hover:text-brand-700">
          {article.title}
        </h3>
        <p className="mt-2 text-sm text-slate-600 line-clamp-3 flex-1">
          {article.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <time>{article.publishedAt}</time>
          {article.rating && (
            <span className="font-bold text-brand-700">
              {article.rating.toFixed(1)}/10
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
