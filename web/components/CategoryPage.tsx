import type { ReactNode } from "react";
import type { CategorySlug } from "@/lib/types";
import { getCategory } from "@/lib/categories";
import { getArticlesByCategory } from "@/lib/articles";
import { ArticleCard } from "./ArticleCard";

export function CategoryPage({
  slug,
  banner,
}: {
  slug: CategorySlug;
  banner?: ReactNode;
}) {
  const cat = getCategory(slug);
  const articles = getArticlesByCategory(slug);

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute -top-20 left-1/3 -z-10 h-72 w-72 rounded-full bg-brand-600/30 blur-3xl" />
        <div className="absolute -bottom-20 right-1/3 -z-10 h-64 w-64 rounded-full bg-cta-500/20 blur-3xl" />
        <div className="container-content py-12 md:py-16">
          <div className="text-5xl">{cat.emoji}</div>
          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            {cat.title}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-300">
            {cat.description}
          </p>
        </div>
      </section>

      {banner && <div className="container-content pt-8">{banner}</div>}

      {/* Bài viết trong chuyên mục */}
      <section className="container-content py-12">
        <h2 className="text-2xl font-bold mb-5 text-white">Bài hướng dẫn mới nhất</h2>
        {articles.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-white/15 p-10 text-center text-[color:var(--faint)]">
            Chưa có bài viết trong chuyên mục này. Đăng ký nhận thông báo khi có
            bài mới.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
