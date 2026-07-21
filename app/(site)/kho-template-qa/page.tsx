import Link from "next/link";
import { TemplateLibrary } from "@/components/TemplateLibrary";
import { templateGroups } from "@/lib/templates";

export const metadata = {
  title: "Kho Template QA — Test Scenario, Test Case, Checklist mẫu",
  description:
    "Thư viện template chuẩn cho dân QA/Kiểm thử: Test Scenario, các loại Test Case (step-based, BDD, data-driven), Checklist. Copy mẫu hoặc để AI tự điền từ tài liệu.",
};

export default function Page() {
  const total = templateGroups.reduce((n, g) => n + g.templates.length, 0);

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute -top-20 left-1/3 -z-10 h-72 w-72 rounded-full bg-brand-600/30 blur-3xl" />
        <div className="absolute -bottom-20 right-1/3 -z-10 h-64 w-64 rounded-full bg-cta-500/20 blur-3xl" />
        <div className="container-content py-12 md:py-16">
          <nav className="text-sm text-[color:var(--faint)] mb-4">
            <Link href="/ai-qa" className="hover:text-brand-300">
              AI cho QA / Kiểm thử
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-200">Kho Template</span>
          </nav>
          <div className="text-5xl">🧩</div>
          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Kho Template QA
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-300">
            {total} template chuẩn cho dân tester: Test Scenario, các loại Test
            Case, Checklist. Mỗi template có{" "}
            <strong className="text-white">2 nút</strong>: copy mẫu trống để tự
            điền, hoặc copy prompt để AI tự sinh tài liệu từ requirement của bạn.
          </p>
          <div className="mt-4 rounded-xl bg-white/5 ring-1 ring-white/10 px-4 py-3 text-sm text-slate-300 max-w-2xl">
            💡 Quy trình gợi ý: dùng{" "}
            <Link
              href="/bai-viet/claude-code-doc-phan-tich-requirement-cho-qa"
              className="text-brand-300 hover:text-brand-200 font-semibold"
            >
              Claude Code đọc &amp; phân tích requirement
            </Link>{" "}
            → rồi dán prompt template ở đây để AI sinh tài liệu đúng định dạng.
          </div>
        </div>
      </section>

      <TemplateLibrary groups={templateGroups} />
    </>
  );
}
