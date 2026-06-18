import Link from "next/link";

const popularQueries = [
  "AI đọc requirement",
  "AI viết test case",
  "AI sinh test data",
  "AI đọc code",
  "Template bug report",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      {/* Banner image — đổi bằng cách thay file public/images/hero-bg.{svg,jpg,png} */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/hero-bg.svg)" }}
      />
      {/* Overlay nhẹ để chữ vẫn đọc được — không phủ đè ảnh */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950/20 via-slate-950/30 to-slate-950/55"
      />

      <div className="container-content py-20 md:py-28 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-brand-100 backdrop-blur ring-1 ring-white/20">
          🇻🇳 Ứng dụng AI vào công việc kiểm thử — bằng tiếng Việt
        </div>

        <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)]">
          Biến AI thành{" "}
          <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-violet-200 bg-clip-text text-transparent">
            trợ lý đắc lực
          </span>
          <br className="hidden sm:block" /> cho dân QA / Kiểm thử.
        </h1>

        <p className="mt-5 max-w-2xl mx-auto text-lg text-slate-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
          Hướng dẫn thực chiến cho dân QA/Kiểm thử: đọc requirement, đọc code,
          viết test case, sinh test data — làm theo từng bước, có prompt &amp;
          template sẵn, kèm lưu ý khi AI &quot;bịa&quot;. Không lý thuyết suông.
        </p>

        <form
          action="/tim-kiem"
          className="mt-8 max-w-xl mx-auto flex items-center gap-2 rounded-2xl bg-slate-950/70 p-2 shadow-2xl shadow-black/50 ring-1 ring-white/15 backdrop-blur"
        >
          <span className="pl-3 text-slate-400" aria-hidden>
            🔍
          </span>
          <input
            name="q"
            type="text"
            placeholder='Bạn cần AI giúp việc gì? Ví dụ: "AI viết test case"'
            className="flex-1 bg-transparent px-2 py-3 text-base text-white outline-none placeholder:text-slate-500"
          />
          <button type="submit" className="btn-cta !py-2.5 !px-5 text-sm">
            Tìm
          </button>
        </form>

        <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
          <span className="text-slate-300">Mọi người đang tìm:</span>
          {popularQueries.map((q) => (
            <Link
              key={q}
              href={`/tim-kiem?q=${encodeURIComponent(q)}`}
              className="rounded-full bg-white/10 px-3 py-1 text-slate-200 ring-1 ring-white/20 backdrop-blur hover:ring-brand-300 hover:text-white"
            >
              {q}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
