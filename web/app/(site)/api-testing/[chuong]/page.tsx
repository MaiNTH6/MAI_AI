import Link from "next/link";
import { notFound } from "next/navigation";
import { getChapter } from "@/lib/api-testing";
import { ApiTestingSidebar } from "@/components/ApiTestingSidebar";

interface PageProps {
  params: Promise<{ chuong: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { chuong } = await params;
  const ch = getChapter(chuong);
  if (!ch) return { title: "Không tìm thấy chương" };
  return {
    title: `Chương ${ch.num}: ${ch.title} — API Testing`,
    description: ch.summary,
  };
}

export default async function ChapterPage({ params }: PageProps) {
  const { chuong } = await params;
  const ch = getChapter(chuong);
  if (!ch) notFound();

  return (
    <div className="container-content py-8 md:py-12">
      <nav className="text-sm text-[color:var(--faint)] mb-4">
        <Link href="/" className="hover:text-brand-300">
          Trang chủ
        </Link>
        <span className="mx-2">/</span>
        <Link href="/api-testing" className="hover:text-brand-300">
          API Testing
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-200">Chương {ch.num}</span>
      </nav>

      <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-8">
        <aside className="mb-6 lg:mb-0">
          <ApiTestingSidebar activeChapter={ch.slug} />
        </aside>

        <div className="min-w-0">
          <div className="badge">
            {ch.emoji} Chương {ch.num}
          </div>
          <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug text-[color:var(--ink)]">
            {ch.title}
          </h1>
          <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
            {ch.summary}
          </p>
          <div className="mt-2 text-sm text-[color:var(--faint)]">
            {ch.minutes} phút · {ch.sections.length} mục
          </div>

          <ul className="mt-6 space-y-3">
            {ch.sections.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/api-testing/${ch.slug}/${s.slug}`}
                  className="flex items-start gap-3 rounded-xl border border-[color:var(--line)] bg-[color:var(--bg2)] p-4 hover:ring-1 hover:ring-brand-400/40 transition"
                >
                  <span className="text-sm font-bold text-[color:var(--metal)] whitespace-nowrap">
                    {s.code}
                  </span>
                  <span className="text-[color:var(--ink)] font-semibold">
                    {s.title}
                    {!s.hasContent && (
                      <span className="ml-2 text-xs font-normal text-[color:var(--faint)]">
                        · đang biên soạn
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
