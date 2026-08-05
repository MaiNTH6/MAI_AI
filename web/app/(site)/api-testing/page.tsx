import Link from "next/link";
import { apiChapters } from "@/lib/api-testing";

export const metadata = {
  title: "API Testing — Phương pháp kiểm thử API cho Tester",
  description:
    "Tài liệu tiếng Việt về phương pháp test API: test đúng theo từng loại HTTP Method, validate dữ liệu, bảo mật, hiệu năng và automation — kèm ví dụ endpoint/response thực tế.",
};

export default function Page() {
  const totalSections = apiChapters.reduce((n, c) => n + c.sections.length, 0);

  return (
    <div className="container-content py-10 md:py-14">
      <nav className="text-sm text-[color:var(--faint)] mb-4">
        <Link href="/" className="hover:text-brand-300">
          Trang chủ
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-200">API Testing</span>
      </nav>

      <div className="max-w-4xl">
        <div className="badge">🧭 API Testing</div>
        <h1 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-[color:var(--ink)]">
          Test API đúng bản chất — không dùng chung 1 checklist
        </h1>
        <p className="mt-4 text-lg text-[color:var(--muted)] leading-relaxed">
          Tài liệu tự biên soạn dành cho Tester/QA — trình bày phương pháp
          kiểm thử API theo đúng ngữ nghĩa từng loại HTTP method, cách validate
          dữ liệu, bảo mật, hiệu năng và viết automation. Mỗi mục có ví dụ
          endpoint/response thực tế (minh hoạ) và bảng thuật ngữ Anh–Việt có
          nút đọc phát âm.
        </p>

      </div>

      <h2 className="mt-10 text-2xl font-bold text-[color:var(--ink)]">
        7 chương ({totalSections} mục)
      </h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {apiChapters.map((ch) => (
          <Link
            key={ch.slug}
            href={`/api-testing/${ch.slug}`}
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
        📎 Nội dung do maiqai.com biên soạn — khung chương tham khảo số liệu
        từ Postman State of the API Report và danh mục OWASP API Security Top
        10 (2023), diễn giải lại bằng tiếng Việt, không sao chép nguyên văn
        từ nguồn nào.
      </p>
    </div>
  );
}
