import Link from "next/link";
import { automationChapters } from "@/lib/automation-testing";

export const metadata = {
  title: "Automation Testing — Tự động hoá kiểm thử với Python + Playwright",
  description:
    "Tài liệu tiếng Việt tự học automation testing từ số 0: Python cơ bản, Playwright cho UI lẫn API, viết test bằng pytest, chuẩn hoá framework — chuyển thể từ Sách 4 của maiqai.com, có dự án thật trên GitHub.",
};

export default function Page() {
  const totalSections = automationChapters.reduce((n, c) => n + c.sections.length, 0);

  return (
    <div className="container-content py-10 md:py-14">
      <nav className="text-sm text-[color:var(--faint)] mb-4">
        <Link href="/" className="hover:text-brand-300">
          Trang chủ
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-200">Automation Testing</span>
      </nav>

      <div className="max-w-4xl">
        <div className="badge">🤖 Automation Testing</div>
        <h1 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-[color:var(--ink)]">
          Tự động hoá kiểm thử với Python + Playwright — cơ bản cho người
          chưa biết code
        </h1>
        <p className="mt-4 text-lg text-[color:var(--muted)] leading-relaxed">
          Tài liệu miễn phí dành cho Tester/QA chưa biết viết code — dạy lại
          Python từ đầu, rồi dùng Playwright để tự động hoá cả kiểm thử giao
          diện (UI) lẫn API, viết test bằng <code>pytest</code>, và chuẩn hoá
          thành 1 framework nhỏ.
        </p>
        <p className="mt-3 text-sm text-[color:var(--faint)]">
          Toàn bộ code thực hành:{" "}
          <a
            href="https://github.com/mmai99/book4-api-automation"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color:var(--metal)] hover:underline"
          >
            github.com/mmai99/book4-api-automation
          </a>
        </p>
      </div>

      <h2 className="mt-10 text-2xl font-bold text-[color:var(--ink)]">
        16 chương ({totalSections} mục)
      </h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {automationChapters.map((ch) => (
          <Link
            key={ch.slug}
            href={`/automation-testing/${ch.slug}`}
            className="rounded-2xl bg-[color:var(--bg2)] p-5 ring-1 ring-white/10 shadow-lg shadow-black/20 hover:ring-brand-400/40 hover:shadow-xl transition"
          >
            <div className="flex items-baseline gap-2">
              <span className="text-2xl">{ch.emoji}</span>
              <span className="text-sm font-semibold text-[color:var(--faint)]">
                Chương {ch.num}
              </span>
            </div>
            <div className="mt-1 text-lg font-bold text-[color:var(--ink)]">
              {ch.title}
            </div>
            <p className="mt-1.5 text-sm text-[color:var(--muted)] leading-relaxed">
              {ch.summary}
            </p>
            <div className="mt-3 text-xs text-[color:var(--faint)]">
              {ch.minutes} phút · {ch.sections.length} mục
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-10 max-w-4xl text-xs italic text-[color:var(--faint)] leading-relaxed">
        📎 Nội dung do maiqai.com tự biên soạn, chuyển thể từ Sách 4 "Automation
        API với Python + Playwright" — mọi code, lệnh chạy và kết quả đều đã
        tự tay chạy thật để xác nhận trước khi đưa vào bài, không bịa output.
      </p>
    </div>
  );
}
