import Link from "next/link";
import { listArticles } from "@/lib/db";
import { templateGroups } from "@/lib/templates";
import { matchScore } from "@/lib/normalize";
import { ArticleCard } from "@/components/ArticleCard";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps) {
  const { q = "" } = await searchParams;
  return {
    title: q ? `Kết quả tìm: "${q}"` : "Tìm kiếm",
    description: "Tìm bài hướng dẫn và template QA theo nhu cầu sử dụng.",
  };
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q = "" } = await searchParams;

  // --- Bài viết ---
  const articleResults = q
    ? listArticles()
        .map((a) => ({
          article: a,
          score: Math.max(
            matchScore(q, a.title),
            matchScore(q, a.excerpt ?? "") * 0.5
          ),
        }))
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((r) => r.article)
    : [];

  // --- Template (Kho Template QA) ---
  const allTemplates = templateGroups.flatMap((g) =>
    g.templates.map((t) => ({ ...t, groupEmoji: g.emoji, groupTitle: g.title }))
  );
  const templateResults = q
    ? allTemplates
        .map((t) => ({
          tpl: t,
          score: Math.max(
            matchScore(q, t.title),
            matchScore(q, t.whenToUse) * 0.6,
            matchScore(q, t.groupTitle) * 0.4
          ),
        }))
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((r) => r.tpl)
    : [];

  const total = articleResults.length + templateResults.length;

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute -top-20 left-1/3 -z-10 h-72 w-72 rounded-full bg-brand-600/30 blur-3xl" />
        <div className="absolute -bottom-20 right-1/3 -z-10 h-64 w-64 rounded-full bg-cta-500/20 blur-3xl" />
        <div className="container-content py-12 md:py-16">
          <div className="text-4xl">🔍</div>
          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {q ? (
              <>
                Kết quả cho:{" "}
                <span className="text-brand-300">&ldquo;{q}&rdquo;</span>
              </>
            ) : (
              "Tìm kiếm bài hướng dẫn & template"
            )}
          </h1>

          <form
            action="/tim-kiem"
            className="mt-6 max-w-xl flex items-center gap-2 rounded-2xl bg-[color:var(--bg2)]/70 p-2 ring-1 ring-white/15 backdrop-blur"
          >
            <span className="pl-3 text-[color:var(--faint)]" aria-hidden>
              🔍
            </span>
            <input
              name="q"
              type="text"
              defaultValue={q}
              placeholder='Ví dụ: "test case", "bug report", "SQL"...'
              className="flex-1 bg-transparent px-2 py-3 text-base text-white outline-none placeholder:text-[color:var(--faint)]"
            />
            <button type="submit" className="btn-cta !py-2.5 !px-5 text-sm">
              Tìm
            </button>
          </form>
        </div>
      </section>

      <section className="container-content py-12 space-y-12">
        {!q ? (
          <div className="rounded-2xl border-2 border-dashed border-white/15 p-10 text-center text-[color:var(--faint)]">
            Gõ từ khóa vào ô trên để bắt đầu. Vd: <em>&ldquo;test case&rdquo;</em>,{" "}
            <em>&ldquo;bug report&rdquo;</em>, <em>&ldquo;SQL&rdquo;</em>.
          </div>
        ) : total === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-white/15 p-10 text-center text-[color:var(--faint)]">
            Không tìm thấy nội dung nào khớp với &ldquo;{q}&rdquo;. Thử từ khóa
            ngắn hơn hoặc bỏ dấu.
          </div>
        ) : (
          <>
            {articleResults.length > 0 && (
              <div>
                <div className="mb-5 text-sm text-[color:var(--faint)]">
                  📄 Bài hướng dẫn —{" "}
                  <strong className="text-white">{articleResults.length}</strong>{" "}
                  bài khớp
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {articleResults.map((a) => (
                    <ArticleCard key={a.slug} article={a} />
                  ))}
                </div>
              </div>
            )}

            {templateResults.length > 0 && (
              <div>
                <div className="mb-5 text-sm text-[color:var(--faint)]">
                  🧩 Template —{" "}
                  <strong className="text-white">{templateResults.length}</strong>{" "}
                  mẫu khớp
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {templateResults.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/kho-template-qa#${t.slug}`}
                      className="group rounded-2xl bg-white/5 ring-1 ring-white/10 p-5 hover:ring-brand-300/60 hover:bg-white/[0.07] transition"
                    >
                      <div className="text-2xl">{t.groupEmoji}</div>
                      <div className="mt-2 font-semibold text-white">
                        {t.title}
                      </div>
                      <div className="mt-1 text-sm text-[color:var(--faint)] line-clamp-2">
                        {t.whenToUse}
                      </div>
                      <div className="mt-3 text-sm font-semibold text-brand-300 group-hover:text-brand-200">
                        Xem ở Kho Template →
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
