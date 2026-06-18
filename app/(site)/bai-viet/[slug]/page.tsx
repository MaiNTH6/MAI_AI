import Link from "next/link";
import { notFound } from "next/navigation";
import { listArticles, getArticleBySlug } from "@/lib/db";
import { getCategory } from "@/lib/categories";
import { QuickVerdict } from "@/components/QuickVerdict";
import { PricingTable } from "@/components/PricingTable";
import { AffiliateButton } from "@/components/AffiliateButton";
import {
  IntroBox,
  TldrBox,
  VideoBox,
  StepsBox,
  PromptsBox,
  VisualFeaturesBox,
  FaqBox,
} from "@/components/ArticleSections";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Không tìm thấy bài viết" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const cat = getCategory(article.category);
  const articles = listArticles();

  return (
    <div className="container-content py-10 md:py-14">
      <nav className="text-sm text-slate-400 mb-4 max-w-4xl mx-auto">
        <Link href="/" className="hover:text-brand-300">
          Trang chủ
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/${article.category}`} className="hover:text-brand-300">
          {cat.title}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-200">Bài viết</span>
      </nav>

      <article className="mx-auto max-w-4xl rounded-3xl bg-white text-slate-900 px-6 py-10 md:px-12 md:py-14 ring-1 ring-white/10 shadow-2xl shadow-black/40">
        <div className="badge !bg-brand-100 !text-brand-700 !ring-brand-200">
          {cat.emoji} {cat.shortTitle}
        </div>

        <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug text-slate-900">
          {article.title}
        </h1>

        <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
          <time>{article.publishedAt}</time>
          <span>•</span>
          <span>{article.readingTime} phút đọc</span>
          <span>•</span>
          <span>Tác giả: Mai.tools</span>
        </div>

        <p className="mt-6 text-xl text-slate-700 leading-relaxed">
          {article.excerpt}
        </p>

        {/* Quick Verdict — 10s value */}
        {article.rating !== undefined && <QuickVerdict article={article} />}

        {/* Intro: Đặt vấn đề + Giới thiệu trợ lý */}
        {article.intro && <IntroBox intro={article.intro} />}

        {/* TLDR — 30s value */}
        {article.tldr && <TldrBox items={article.tldr} />}

        {/* Video hướng dẫn */}
        {article.videoUrl && (
          <VideoBox url={article.videoUrl} title={article.videoTitle} />
        )}

        {/* Setup steps */}
        {article.steps && <StepsBox steps={article.steps} />}

        {/* Prompt copy-paste */}
        {article.prompts && <PromptsBox prompts={article.prompts} />}

        {/* Bonus: Visual features (Mind Map, Blueprint, Audio, Video Overview) */}
        {article.visualFeatures && (
          <VisualFeaturesBox features={article.visualFeatures} />
        )}

        {/* Use case (story dài) */}
        {article.useCase && (
          <section className="prose prose-slate max-w-none mt-10">
            <h2 className="text-2xl md:text-3xl font-bold">
              🧪 Quá trình test thực tế
            </h2>
            <h3 className="text-lg md:text-xl text-slate-700">
              {article.useCase.title}
            </h3>
            {article.useCase.paragraphs.map((p, i) => (
              <p key={i} className="text-slate-700 leading-relaxed">
                {p}
              </p>
            ))}
          </section>
        )}

        {/* Pros / Cons */}
        {(article.pros || article.cons) && (
          <section className="mt-10 grid gap-5 md:grid-cols-2">
            {article.pros && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6">
                <h3 className="font-bold text-lg text-emerald-800 flex items-center gap-2">
                  <span>✓</span> Ưu điểm
                </h3>
                <ul className="mt-3 space-y-2 text-slate-700">
                  {article.pros.map((p, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-emerald-600 font-bold">+</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {article.cons && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-6">
                <h3 className="font-bold text-lg text-rose-800 flex items-center gap-2">
                  <span>!</span> Nhược điểm
                </h3>
                <ul className="mt-3 space-y-2 text-slate-700">
                  {article.cons.map((p, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-rose-600 font-bold">-</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* Bugs */}
        {article.bugs && (
          <section className="mt-10 rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/40 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-amber-900 flex items-center gap-2">
              🐞 Góc nhìn Tester — Hạn chế & lỗi thường gặp
            </h2>
            <p className="mt-2 text-slate-700">
              Các hạn chế thường gặp khi dùng — biết trước để chủ động kiểm lại,
              đừng tin kết quả AI 100%.
            </p>
            <ul className="mt-4 space-y-3">
              {article.bugs.map((b, i) => (
                <li key={i} className="flex gap-3 text-slate-800">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-amber-500 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Pricing */}
        {article.pricing && (
          <section className="mt-12">
            <h2 className="text-2xl md:text-3xl font-bold">
              💰 Bảng giá & Ai nên dùng gói nào
            </h2>
            <p className="mt-2 text-slate-600">
              Phân tích trung thực — không phải bản nào đắt nhất cũng đáng.
            </p>
            <PricingTable plans={article.pricing} />
          </section>
        )}

        {/* FAQ */}
        {article.faq && <FaqBox items={article.faq} />}

        {/* Final thought — H2 đổi theo có/không affiliate */}
        {article.finalThought && (
          <section className="mt-12 rounded-3xl bg-slate-900 text-white p-8 md:p-10">
            <h2 className="text-2xl font-bold">
              {article.affiliateUrl ? "🎯 Tôi khuyên gì?" : "📌 Tóm lại"}
            </h2>
            <p className="mt-3 text-lg text-slate-200 leading-relaxed">
              {article.finalThought}
            </p>
            {article.affiliateUrl && (
              <div className="mt-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <AffiliateButton
                  href={article.affiliateUrl}
                  size="lg"
                  label="Dùng thử miễn phí"
                />
                <div className="text-sm text-slate-400">
                  Bạn dùng qua link này → chúng tôi nhận hoa hồng (nếu có), giá
                  bạn trả không đổi.
                </div>
              </div>
            )}
          </section>
        )}
      </article>

      {/* Bài liên quan trong cùng chuyên mục */}
      <section className="mt-14 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-4 text-white">Bài viết liên quan</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {articles
            .filter(
              (a) => a.category === article.category && a.slug !== article.slug
            )
            .slice(0, 2)
            .map((a) => (
              <Link
                key={a.slug}
                href={`/bai-viet/${a.slug}`}
                className="rounded-2xl bg-white p-5 ring-1 ring-white/10 shadow-lg shadow-black/20 hover:shadow-xl hover:ring-brand-400/40 transition"
              >
                <div className="text-2xl">{a.cover}</div>
                <div className="mt-2 font-bold leading-snug text-slate-900">
                  {a.title}
                </div>
                <div className="mt-2 text-sm text-slate-500">
                  {a.readingTime} phút đọc
                </div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
