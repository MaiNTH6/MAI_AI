import Link from "next/link";
import { notFound } from "next/navigation";
import { getSection, adjacentSections } from "@/lib/api-testing";
import { ApiTestingSidebar } from "@/components/ApiTestingSidebar";
import { sectionContent } from "@/content/api-testing/registry";

interface PageProps {
  params: Promise<{ chuong: string; muc: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { chuong, muc } = await params;
  const res = getSection(chuong, muc);
  if (!res) return { title: "Không tìm thấy mục" };
  return {
    title: `${res.section.code} ${res.section.title} — API Testing`,
  };
}

export default async function SectionPage({ params }: PageProps) {
  const { chuong, muc } = await params;
  const res = getSection(chuong, muc);
  if (!res) notFound();
  const { chapter, section } = res;

  const Content = sectionContent[`${chapter.slug}/${section.slug}`];
  const { prev, next } = adjacentSections(chapter.slug, section.slug);

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
        <Link
          href={`/api-testing/${chapter.slug}`}
          className="hover:text-brand-300"
        >
          Chương {chapter.num}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-200">Mục {section.code}</span>
      </nav>

      <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-8">
        <aside className="mb-6 lg:mb-0">
          <ApiTestingSidebar
            activeChapter={chapter.slug}
            activeSection={section.slug}
          />
        </aside>

        <div className="min-w-0">
          <article className="rounded-3xl bg-[color:var(--bg2)] text-[color:var(--ink)] px-6 py-8 md:px-10 md:py-10 ring-1 ring-white/10 shadow-2xl shadow-black/40">
            {Content ? (
              <Content />
            ) : (
              <div>
                <div className="badge">
                  {chapter.emoji} API Testing · Chương {chapter.num} · Mục{" "}
                  {section.code}
                </div>
                <h1 className="mt-3 text-2xl md:text-3xl font-extrabold tracking-tight leading-snug">
                  {section.title}
                </h1>
                <p className="mt-6 text-[color:var(--muted)]">
                  📝 Nội dung mục này đang được biên soạn. Vui lòng quay lại sau.
                </p>
              </div>
            )}
          </article>

          {/* Trước / Sau */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/api-testing/${prev.chapter.slug}/${prev.section.slug}`}
                className="rounded-xl border border-[color:var(--line)] bg-[color:var(--bg2)] p-4 hover:ring-1 hover:ring-brand-400/40 transition"
              >
                <div className="text-xs text-[color:var(--faint)]">← Mục trước</div>
                <div className="mt-1 text-sm font-semibold text-[color:var(--ink)]">
                  {prev.section.code} {prev.section.title}
                </div>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/api-testing/${next.chapter.slug}/${next.section.slug}`}
                className="rounded-xl border border-[color:var(--line)] bg-[color:var(--bg2)] p-4 text-right hover:ring-1 hover:ring-brand-400/40 transition"
              >
                <div className="text-xs text-[color:var(--faint)]">Mục sau →</div>
                <div className="mt-1 text-sm font-semibold text-[color:var(--ink)]">
                  {next.section.code} {next.section.title}
                </div>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
