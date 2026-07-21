import Link from "next/link";
import { StarfieldHero } from "./StarfieldHero";

const popularQueries = [
  "AI đọc requirement",
  "AI viết test case",
  "AI sinh test data",
  "AI đọc code",
  "Template bug report",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--line)]">
      <StarfieldHero />

      <div className="container-content relative py-20 md:py-28 text-center">
        <div className="badge">
          🇻🇳 Ứng dụng AI vào công việc kiểm thử — bằng tiếng Việt
        </div>

        <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight text-[color:var(--ink)]">
          Biến AI thành{" "}
          <span className="metal-text">trợ lý đắc lực</span>
          <br className="hidden sm:block" /> cho dân QA / Kiểm thử.
        </h1>

        <p className="mt-5 max-w-2xl mx-auto text-lg text-[color:var(--muted)]">
          Hướng dẫn thực chiến cho dân QA/Kiểm thử: đọc requirement, đọc code,
          viết test case, sinh test data — làm theo từng bước, có prompt &amp;
          template sẵn, kèm lưu ý khi AI &quot;bịa&quot;. Không lý thuyết suông.
        </p>

        <form
          action="/tim-kiem"
          className="mt-8 max-w-xl mx-auto flex items-center gap-2 rounded-2xl bg-[color:var(--bg2)] p-2 ring-1 ring-[color:var(--line2)] shadow-2xl shadow-black/40"
        >
          <span className="pl-3 text-[color:var(--faint)]" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.2-3.2" />
            </svg>
          </span>
          <input
            name="q"
            type="text"
            placeholder='Bạn cần AI giúp việc gì? Ví dụ: "AI viết test case"'
            className="flex-1 min-w-0 bg-transparent px-2 py-3 text-base text-[color:var(--ink)] outline-none placeholder:text-[color:var(--faint)]"
          />
          <button type="submit" className="btn-cta !py-2.5 !px-5 text-sm">
            Tìm
          </button>
        </form>

        <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
          <span className="text-[color:var(--faint)] font-mono">Mọi người đang tìm:</span>
          {popularQueries.map((q) => (
            <Link
              key={q}
              href={`/tim-kiem?q=${encodeURIComponent(q)}`}
              className="rounded-full px-3 py-1 font-medium text-[color:var(--metal)] border border-[color:var(--line2)] bg-[color-mix(in_srgb,var(--metal)_10%,transparent)] hover:bg-[color-mix(in_srgb,var(--metal)_22%,transparent)] hover:border-[color:var(--metal)] transition"
            >
              {q}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
