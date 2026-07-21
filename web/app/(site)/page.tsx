import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ArticleCard } from "@/components/ArticleCard";
import { getLatestArticles } from "@/lib/articles";

const entries = [
  {
    href: "/ai-qa",
    emoji: "🧪",
    title: "Hướng dẫn AI cho QA",
    desc: "Đọc & phân tích requirement, đọc code, hiểu hệ thống — từng bước, có prompt sẵn.",
    cta: "Xem hướng dẫn →",
  },
  {
    href: "/kho-template-qa",
    emoji: "🧩",
    title: "Kho Template QA",
    desc: "Test Scenario, Test Case, Checklist, Bug Report, RTM... — tải Excel, có dropdown sẵn.",
    cta: "Tải template →",
  },
  {
    href: "/kho-prompt",
    emoji: "📚",
    title: "Kho Prompt",
    desc: "Câu lệnh AI cho dân QA & văn phòng — copy là dùng, miễn phí.",
    cta: "Lấy prompt →",
  },
];

const roadmap = [
  {
    href: "/bai-viet/claude-code-doc-phan-tich-requirement-cho-qa",
    step: "1",
    title: "Đọc & hiểu yêu cầu",
    desc: "Dùng AI bóc tách requirement: tóm tắt, tìm điểm mơ hồ & mâu thuẫn trước khi test.",
  },
  {
    href: "/bai-viet/ai-viet-test-case-tu-user-story",
    step: "2",
    title: "Viết bộ test case",
    desc: "Sinh test case theo từng màn hình, phủ đủ kỹ thuật thiết kế test — không sót case.",
  },
  {
    href: "/bai-viet/quy-trinh-review-test-case",
    step: "3",
    title: "Review để không lọt case",
    desc: "Soát lại bộ test case theo checklist 7 nhóm tiêu chí, có AI hỗ trợ rà soát vòng đầu.",
  },
];

export default function HomePage() {
  const latest = getLatestArticles(6);

  return (
    <>
      <Hero />

      {/* 3 lối vào chính */}
      <section className="container-content py-12">
        <div className="text-center mb-8">
          <div className="badge">🎯 Bắt đầu ở đây</div>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-white">
            Ứng dụng AI vào công việc kiểm thử
          </h2>
          <p className="mt-2 text-slate-400 max-w-2xl mx-auto">
            Hướng dẫn thực chiến + bộ template & prompt sẵn dùng cho dân QA.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              className="group card-surface p-6 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40"
            >
              <div className="text-3xl">{e.emoji}</div>
              <div className="mt-3 font-bold text-lg text-[color:var(--ink)] group-hover:text-[color:var(--metal)]">
                {e.title}
              </div>
              <p className="mt-1 text-sm text-[color:var(--muted)] line-clamp-3">
                {e.desc}
              </p>
              <div className="mt-3 text-sm font-semibold text-[color:var(--metal)] font-mono">
                {e.cta}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Lộ trình cho người mới */}
      <section className="container-content pb-4">
        <div className="rounded-3xl bg-white/[0.03] ring-1 ring-[color:var(--line)] p-6 md:p-8">
          <div className="mb-5">
            <div className="badge">🧭 Mới bắt đầu? Đi theo thứ tự này</div>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight text-white">
              Lộ trình 3 bước cho dân QA
            </h2>
            <p className="mt-2 text-slate-400 text-sm">
              Đúng mạch công việc thật: hiểu yêu cầu → viết case → soát case.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {roadmap.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group relative card-surface p-5 transition hover:-translate-y-0.5"
              >
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[#fbefcb] via-[#e6ce93] to-[#c6a25c] text-sm font-extrabold text-[#1b1608]">
                  {r.step}
                </div>
                <div className="mt-3 font-bold text-[color:var(--ink)] group-hover:text-[color:var(--metal)]">
                  {r.title}
                </div>
                <p className="mt-1 text-sm text-[color:var(--muted)]">{r.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bài mới */}
      <section className="container-content py-12">
        <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
          <div>
            <div className="badge">🔥 Hướng dẫn mới nhất</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-white">
              Bài mới — Làm được ngay hôm nay
            </h2>
            <p className="mt-2 text-slate-400">
              Mỗi bài kèm prompt copy-paste sẵn + lưu ý khi AI &quot;bịa&quot;.
              Làm theo là xong.
            </p>
          </div>
          <Link href="/ai-qa" className="btn-outline-dark !py-2 text-sm">
            Xem tất cả →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
    </>
  );
}
