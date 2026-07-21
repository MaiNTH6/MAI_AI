import { PromptLibrary } from "@/components/PromptLibrary";
import { promptTopics } from "@/lib/prompts";

export const metadata = {
  title: "Kho Prompt (Câu lệnh) thực chiến cho người Việt",
  description:
    "Thư viện câu lệnh AI miễn phí cho dân QA/Kiểm thử và dân văn phòng. Copy là dùng, không cần đăng ký.",
};

export default function Page() {
  const total = promptTopics.reduce((n, t) => n + t.prompts.length, 0);

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute -top-20 left-1/3 -z-10 h-72 w-72 rounded-full bg-brand-600/30 blur-3xl" />
        <div className="absolute -bottom-20 right-1/3 -z-10 h-64 w-64 rounded-full bg-cta-500/20 blur-3xl" />
        <div className="container-content py-12 md:py-16 text-center">
          <div className="text-5xl">📚</div>
          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Kho Prompt (Câu lệnh) thực chiến
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-300">
            {total} câu lệnh đã chạy thử cho dân QA/Kiểm thử &amp; văn phòng.
            Bấm <strong className="text-white">Copy</strong> là dùng được ngay.
            Hoàn toàn miễn phí, không cần đăng ký.
          </p>
        </div>
      </section>

      <PromptLibrary topics={promptTopics} />
    </>
  );
}
