import Link from "next/link";
import { aiChapters } from "@/lib/ai-testing";

export const metadata = {
  title: "AI Testing (ISTQB CT-AI) — Tìm hiểu kiểm thử hệ thống AI",
  description:
    "Tài liệu tiếng Việt dễ hiểu về kiểm thử hệ thống AI/ML theo khung ISTQB CT-AI v2.0: 7 chương, câu hỏi minh họa, thuật ngữ Anh–Việt. Giúp mọi người nắm khái niệm và tham khảo.",
};

export default function Page() {
  const totalSections = aiChapters.reduce((n, c) => n + c.sections.length, 0);

  return (
    <div className="container-content py-10 md:py-14">
      <nav className="text-sm text-[color:var(--faint)] mb-4">
        <Link href="/" className="hover:text-brand-300">
          Trang chủ
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-200">AI Testing (ISTQB CT-AI)</span>
      </nav>

      <div className="max-w-4xl">
        <div className="badge">🧠 AI Testing (CT-AI)</div>
        <h1 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-[color:var(--ink)]">
          Kiểm thử hệ thống AI — theo khung ISTQB CT-AI
        </h1>
        <p className="mt-4 text-lg text-[color:var(--muted)] leading-relaxed">
          Tài liệu tự đúc kết theo giáo trình CT-AI v2.0, trình bày bằng tiếng
          Việt dễ hiểu — giúp mọi người nắm được cách kiểm thử các hệ thống
          AI/ML. Cũng là tài liệu tham khảo hữu ích cho ai đang tìm hiểu chứng
          chỉ CT-AI. Mỗi mục gồm: nội dung cô đọng, câu hỏi minh họa (đề tiếng
          Anh + bản dịch), và bảng thuật ngữ Anh–Việt có nút đọc phát âm.
        </p>

        {/* Thông tin kỳ thi */}
        <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5">
          <h2 className="mt-0 mb-2 text-lg font-bold text-[color:var(--metal)]">
            📋 Kỳ thi CT-AI v2.0
          </h2>
          <ul className="m-0 grid gap-1.5 sm:grid-cols-2 text-sm text-[color:var(--muted)] list-none pl-0">
            <li>• 40 câu hỏi · 44 điểm</li>
            <li>• Đạt: 29/44 (≈ 65%)</li>
            <li>• Thời lượng: 60 phút (75 phút nếu thi bằng ngoại ngữ)</li>
            <li>• Điều kiện: đã có ISTQB Foundation (CTFL)</li>
          </ul>
        </div>
      </div>

      {/* Danh sách 7 chương */}
      <h2 className="mt-10 text-2xl font-bold text-[color:var(--ink)]">
        7 chương ({totalSections} mục)
      </h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {aiChapters.map((ch) => (
          <Link
            key={ch.slug}
            href={`/ai-testing/${ch.slug}`}
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
        📎 Nội dung biên soạn/dịch ý lại bằng tiếng Việt dựa trên ISTQB®
        Certified Tester AI Testing Syllabus v2.0 (© International Software
        Testing Qualifications Board), có ghi rõ nguồn ở từng mục. Không sao chép
        nguyên văn.
      </p>
    </div>
  );
}
