import Link from "next/link";
import { notFound } from "next/navigation";
import { getChapter } from "@/lib/ai-testing";
import { examQuestions } from "@/lib/ai-testing-exam-data";
import { AiTestingSidebar } from "@/components/AiTestingSidebar";
import { AiTestingQuiz } from "@/components/AiTestingQuiz";

interface PageProps {
  params: Promise<{ chuong: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { chuong } = await params;
  const ch = getChapter(chuong);
  if (!ch) return { title: "Không tìm thấy chương" };
  return {
    title: `Luyện đề Chương ${ch.num}: ${ch.title} — AI Testing (CT-AI)`,
    description: `Luyện đề trắc nghiệm theo bộ đề mẫu chính thức ISTQB CT-AI cho Chương ${ch.num}.`,
  };
}

export default async function ChapterQuizPage({ params }: PageProps) {
  const { chuong } = await params;
  const ch = getChapter(chuong);
  if (!ch) notFound();

  const questions = examQuestions.filter((q) => q.chapterNum === ch.num);

  return (
    <div className="container-content py-8 md:py-12">
      <nav className="text-sm text-[color:var(--faint)] mb-4">
        <Link href="/" className="hover:text-brand-300">
          Trang chủ
        </Link>
        <span className="mx-2">/</span>
        <Link href="/ai-testing" className="hover:text-brand-300">
          AI Testing
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/ai-testing/${ch.slug}`} className="hover:text-brand-300">
          Chương {ch.num}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-200">Luyện đề</span>
      </nav>

      <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-8">
        <aside className="mb-6 lg:mb-0">
          <AiTestingSidebar activeChapter={ch.slug} />
        </aside>

        <div className="min-w-0">
          <div className="badge">
            {ch.emoji} Chương {ch.num} · Luyện đề
          </div>
          <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug text-[color:var(--ink)]">
            Luyện đề: {ch.title}
          </h1>
          <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
            {questions.length}{" "}câu hỏi trắc nghiệm bám sát đề thi thật CT-AI.
            Trả lời hết rồi bấm &quot;Nộp bài&quot; để xem điểm và giải thích
            từng câu.
          </p>

          <div className="mt-6">
            {questions.length > 0 ? (
              <AiTestingQuiz
                questions={questions}
                chapterNum={ch.num}
                chapterTitle={ch.title}
              />
            ) : (
              <p className="text-[color:var(--muted)]">
                Chương này chưa có câu hỏi luyện tập.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
