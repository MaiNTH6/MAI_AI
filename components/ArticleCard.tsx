import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/lib/types";
import { getCategory } from "@/lib/categories";

const categoryGradient: Record<string, string> = {
  "ai-qa": "from-violet-600 via-brand-700 to-indigo-800",
  "db-testing": "from-cyan-600 via-blue-700 to-slate-800",
  "kho-prompt": "from-amber-500 via-orange-600 to-rose-700",
};

export function ArticleCard({ article }: { article: Article }) {
  const cat = getCategory(article.category);
  const href = `/bai-viet/${article.slug}`;
  const gradient = categoryGradient[article.category] ?? "from-brand-600 via-brand-700 to-brand-900";

  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl bg-white ring-1 ring-white/10 shadow-lg shadow-black/20 overflow-hidden transition hover:shadow-2xl hover:shadow-brand-900/30 hover:-translate-y-0.5 hover:ring-brand-400/40"
    >
      {article.coverImage ? (
        <div className="aspect-[16/9] relative overflow-hidden">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover transition group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className={`aspect-[16/9] grid place-items-center bg-gradient-to-br ${gradient} relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px" }}
          />
          <span className="relative text-6xl drop-shadow-lg">{article.cover}</span>
        </div>
      )}
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
