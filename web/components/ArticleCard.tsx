import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/lib/types";
import { getCategory } from "@/lib/categories";

const categoryGradient: Record<string, string> = {
  "ai-qa": "from-[#e6ce93] via-[#8a6a34] to-[#221e17]",
  "db-testing": "from-[#c9b47a] via-[#5f4a24] to-[#1a1712]",
  "kho-prompt": "from-[#fbefcb] via-[#a9843f] to-[#221e17]",
};

export function ArticleCard({ article }: { article: Article }) {
  const cat = getCategory(article.category);
  const href = `/bai-viet/${article.slug}`;
  const gradient = categoryGradient[article.category] ?? "from-[#e6ce93] via-[#87672f] to-[#221e17]";

  return (
    <Link
      href={href}
      className="group card-surface flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-black/40"
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
          <div className="absolute inset-0 opacity-[0.08]"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px" }}
          />
          <span className="relative text-6xl drop-shadow-lg">{article.cover}</span>
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs text-[color:var(--faint)]">
          <span className="badge">
            {cat.emoji} {cat.shortTitle}
          </span>
          <span>•</span>
          <span className="font-mono">{article.readingTime} phút đọc</span>
        </div>
        <h3 className="mt-3 font-bold text-lg leading-snug text-[color:var(--ink)] group-hover:text-[color:var(--metal)]">
          {article.title}
        </h3>
        <p className="mt-2 text-sm text-[color:var(--muted)] line-clamp-3 flex-1">
          {article.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between text-xs text-[color:var(--faint)] font-mono">
          <time>{article.publishedAt}</time>
          {article.rating && (
            <span className="font-bold text-[color:var(--metal)]">
              {article.rating.toFixed(1)}/10
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
