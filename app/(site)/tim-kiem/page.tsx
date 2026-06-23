import Link from "next/link";
import { listArticles } from "@/lib/db";
import { matchScore } from "@/lib/normalize";
import { ArticleCard } from "@/components/ArticleCard";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps) {
  const { q = "" } = await searchParams;
  return {
    title: q ? `Kết quả tìm: "${q}"` : "Tìm kiếm",
    description: "Tìm bài review AI theo nhu cầu sử dụng.",
  };
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q = "" } = await searchParams;
  const all = listArticles();

  const results = q
    ? all
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

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute -top-20 left-1/3 -z-10 h-72 w-72 rounded-full bg-brand-600/30 blur-3xl" />
        <div className="absolute -bottom-20 right-1/3 -z-10 h-64 w-64 rounded-full bg-cta-500/20 blur-3xl" />
        <div className="container-content py-12 md:py-16">
          <div className="text-4xl">🔍</div>
          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {q ? <>Kết quả cho: <span className="text-brand-300">&ldquo;{q}&rdquo;</span></> : "Tìm kiếm bài review"}
          </h1>

          <form
            action="/tim-kiem"
            className="mt-6 max-w-xl flex items-center gap-2 rounded-2xl bg-slate-950/70 p-2 ring-1 ring-white/15 backdrop-blur"
          >
            <span className="pl-3 text-slate-400" aria-hidden>
              🔍
            </span>
            <input
              name="q"
              type="text"
              defaultValue={q}
              placeholder='Ví dụ: "AI làm slide", "Canva"...'
              className="flex-1 bg-transparent px-2 py-3 text-base text-white outline-none placeholder:text-slate-500"
            />
            <button type="submit" className="btn-cta !py-2.5 !px-5 text-sm">
              Tìm
            </button>
          </form>
        </div>
      </section>

      <section className="container-content py-12">
        {!q ? (
          <div className="rounded-2xl border-2 border-dashed border-white/15 p-10 text-center text-slate-400">
            Gõ từ khóa vào ô trên để bắt đầu. Vd: <em>&ldquo;slide&rdquo;</em>,{" "}
            <em>&ldquo;Canva&rdquo;</em>, <em>&ldquo;PDF&rdquo;</em>.
          </div>
        ) : results.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-white/15 p-10 text-center text-slate-400">
            Không tìm thấy bài viết nào khớp với &ldquo;{q}&rdquo;. Thử từ khóa
            ngắn hơn hoặc bỏ dấu.
          </div>
        ) : (
          <>
            <div className="mb-5 text-sm text-slate-400">
              Tìm thấy <strong className="text-white">{results.length}</strong>{" "}
              bài viết khớp tương đối.
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {results.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
