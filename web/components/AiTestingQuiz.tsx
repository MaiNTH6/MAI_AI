"use client";

import { useMemo, useState } from "react";
import type { ExamQuestion } from "@/lib/ai-testing-exam-data";

type ChoiceAnswers = Record<string, string[]>; // qid -> selected option keys
type FieldAnswers = Record<string, Record<string, string>>; // qid -> optionKey -> value (category or position)

function isChoiceCorrect(q: ExamQuestion, picked: string[]): boolean {
  const expected = [...q.correctKeys].sort().join(",");
  const got = [...picked].sort().join(",");
  return expected === got && picked.length > 0;
}

function isMatchingCorrect(q: ExamQuestion, picked: Record<string, string>): boolean {
  for (const ck of q.correctKeys) {
    const [key, category] = ck.split(":");
    if (picked[key] !== category) return false;
  }
  return true;
}

function isOrderingCorrect(q: ExamQuestion, picked: Record<string, string>): boolean {
  const entries = Object.entries(picked);
  if (entries.length !== q.options.length) return false;
  const order = entries
    .map(([key, pos]) => [key, Number(pos)] as const)
    .sort((a, b) => a[1] - b[1])
    .map(([key]) => key);
  return order.join(",") === q.correctKeys.join(",");
}

function questionIsCorrect(
  q: ExamQuestion,
  choice: ChoiceAnswers,
  field: FieldAnswers
): boolean {
  if (q.type === "matching") return isMatchingCorrect(q, field[q.id] ?? {});
  if (q.type === "ordering") return isOrderingCorrect(q, field[q.id] ?? {});
  return isChoiceCorrect(q, choice[q.id] ?? []);
}

export function AiTestingQuiz({
  questions,
  chapterNum,
  chapterTitle,
}: {
  questions: ExamQuestion[];
  chapterNum: number;
  chapterTitle: string;
}) {
  const [choice, setChoice] = useState<ChoiceAnswers>({});
  const [field, setField] = useState<FieldAnswers>({});
  const [submitted, setSubmitted] = useState(false);

  const totalPoints = useMemo(
    () => questions.reduce((s, q) => s + q.points, 0),
    [questions]
  );
  const earnedPoints = useMemo(() => {
    if (!submitted) return 0;
    return questions.reduce(
      (s, q) => s + (questionIsCorrect(q, choice, field) ? q.points : 0),
      0
    );
  }, [submitted, questions, choice, field]);
  const answeredCount = useMemo(() => {
    return questions.filter((q) => {
      if (q.type === "matching" || q.type === "ordering") {
        return Object.keys(field[q.id] ?? {}).length === q.options.length;
      }
      return (choice[q.id] ?? []).length > 0;
    }).length;
  }, [questions, choice, field]);

  function toggleChoice(q: ExamQuestion, key: string) {
    if (submitted) return;
    setChoice((prev) => {
      const cur = prev[q.id] ?? [];
      let next: string[];
      if (q.selectCount === 1) {
        next = [key];
      } else if (cur.includes(key)) {
        next = cur.filter((k) => k !== key);
      } else if (cur.length >= q.selectCount) {
        next = [...cur.slice(1), key];
      } else {
        next = [...cur, key];
      }
      return { ...prev, [q.id]: next };
    });
  }

  function setFieldValue(qid: string, optionKey: string, value: string) {
    if (submitted) return;
    setField((prev) => ({
      ...prev,
      [qid]: { ...(prev[qid] ?? {}), [optionKey]: value },
    }));
  }

  function handleSubmit() {
    setSubmitted(true);
    document
      .getElementById("quiz-score-summary")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleRetry() {
    setChoice({});
    setField({});
    setSubmitted(false);
  }

  return (
    <div>
      <div className="rounded-xl border border-sky-400/30 bg-sky-500/10 p-4 text-sm text-[color:var(--muted)] leading-relaxed">
        📎 <strong className="text-[color:var(--ink)]">Nguồn:</strong>{" "}
        {questions.length}{" "}câu hỏi dưới đây trích nguyên văn từ bộ đề mẫu
        chính thức{" "}
        <strong>
          ISTQB® Certified Tester AI Testing — Sample Exam Set A v2.1
        </strong>{" "}
        (© International Software Testing Qualifications Board), dùng cho
        mục đích học tập/luyện tập phi thương mại, có ghi rõ nguồn. Đề &amp;
        đáp án giữ nguyên tiếng Anh như bản gốc để sát với đề thi thật.
        <br className="hidden sm:block" />
        <span className="text-xs text-[color:var(--faint)]">
          Tác giả bộ đề: Klaudia Dussa-Zieger, Stuart Reid, Vipul Koch, Kyle
          Siemens, Qin Liu, Werner Henschelchen, Jarosław Hryszko (theo mục
          Acknowledgements của tài liệu gốc).
        </span>
      </div>

      {submitted && (
        <div
          id="quiz-score-summary"
          className="mt-6 rounded-2xl border-2 border-emerald-500/40 bg-emerald-500/10 p-6"
        >
          <h3 className="mt-0 text-lg font-bold text-emerald-200">
            Kết quả — Chương {chapterNum}: {chapterTitle}
          </h3>
          <p className="mt-2 mb-0 text-2xl font-extrabold text-[color:var(--ink)]">
            {earnedPoints}/{totalPoints}{" "}điểm{" "}
            <span className="ml-2 text-base font-normal text-[color:var(--muted)]">
              ({Math.round((earnedPoints / totalPoints) * 100)}%)
            </span>
          </p>
          <button
            type="button"
            onClick={handleRetry}
            className="mt-4 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            ↺ Làm lại từ đầu
          </button>
        </div>
      )}

      <div className="mt-6 space-y-6">
        {questions.map((q, qi) => {
          const correct = submitted ? questionIsCorrect(q, choice, field) : null;
          const categories =
            q.type === "matching"
              ? [...new Set(q.correctKeys.map((c) => c.split(":")[1]))]
              : [];
          return (
            <div
              key={q.id}
              className={
                "rounded-2xl border p-6 " +
                (submitted
                  ? correct
                    ? "border-emerald-500/40 bg-emerald-500/5"
                    : "border-rose-500/40 bg-rose-500/5"
                  : "border-[color:var(--line)] card-surface")
              }
            >
              <div className="flex flex-wrap items-center gap-2 text-xs text-[color:var(--faint)]">
                <span className="font-bold text-[color:var(--metal)]">
                  Câu {qi + 1}/{questions.length} (#{q.id})
                </span>
                <span>· {q.points} điểm</span>
                <span>· LO {q.lo}</span>
                <span>· mức {q.kLevel}</span>
                {submitted && (
                  <span
                    className={
                      "ml-auto rounded-full px-2 py-0.5 font-bold " +
                      (correct
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-rose-500/20 text-rose-300")
                    }
                  >
                    {correct ? "✅ Đúng" : "❌ Sai"}
                  </span>
                )}
              </div>

              <p className="mt-3 mb-0 whitespace-pre-line text-[color:var(--ink)] leading-relaxed">
                {q.stem}
              </p>

              <details className="mt-2">
                <summary className="cursor-pointer text-xs font-semibold text-slate-300 hover:text-slate-100">
                  🇻🇳 Xem bản dịch tiếng Việt
                </summary>
                <div className="mt-2 rounded-lg bg-black/20 p-3">
                  <p className="m-0 whitespace-pre-line text-sm text-[color:var(--muted)] leading-relaxed">
                    {q.stemVi}
                  </p>
                  <ul className="mt-2 mb-0 space-y-1 list-none pl-0">
                    {q.options.map((o) => (
                      <li key={o.key} className="text-sm text-[color:var(--muted)]">
                        <strong className="text-[color:var(--ink)]">{o.key})</strong>{" "}
                        {o.textVi}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>

              {q.type === "matching" ? (
                <div className="mt-4 space-y-2">
                  {q.options.map((o) => {
                    const picked = field[q.id]?.[o.key];
                    const expected = q.correctKeys
                      .find((c) => c.startsWith(o.key + ":"))
                      ?.split(":")[1];
                    return (
                      <div key={o.key}>
                        <div className="flex flex-wrap items-start gap-2">
                          <span className="min-w-0 flex-1 text-sm text-[color:var(--muted)]">
                            <strong className="text-[color:var(--ink)]">
                              {o.key})
                            </strong>{" "}
                            {o.text}
                          </span>
                          <select
                            disabled={submitted}
                            value={picked ?? ""}
                            onChange={(e) =>
                              setFieldValue(q.id, o.key, e.target.value)
                            }
                            className="shrink-0 rounded-md border border-[color:var(--line2)] bg-[color:var(--bg2)] px-2 py-1 text-sm text-[color:var(--ink)]"
                          >
                            <option value="">-- chọn --</option>
                            {categories.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                          {submitted && (
                            <span
                              className={
                                "shrink-0 text-xs font-semibold " +
                                (picked === expected
                                  ? "text-emerald-300"
                                  : "text-rose-300")
                              }
                            >
                              {picked === expected ? "✓ đúng" : `✗ đúng là: ${expected}`}
                            </span>
                          )}
                        </div>
                        {submitted && (
                          <p className="mt-1 mb-0 pl-2 text-xs leading-relaxed text-[color:var(--muted)]">
                            {o.rationale}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : q.type === "ordering" ? (
                <div className="mt-4 space-y-2">
                  {q.options.map((o) => {
                    const picked = field[q.id]?.[o.key];
                    const expectedPos = q.correctKeys.indexOf(o.key) + 1;
                    return (
                      <div key={o.key}>
                        <div className="flex flex-wrap items-start gap-2">
                          <span className="min-w-0 flex-1 text-sm text-[color:var(--muted)]">
                            <strong className="text-[color:var(--ink)]">
                              {o.key})
                            </strong>{" "}
                            {o.text}
                          </span>
                          <select
                            disabled={submitted}
                            value={picked ?? ""}
                            onChange={(e) =>
                              setFieldValue(q.id, o.key, e.target.value)
                            }
                            className="shrink-0 rounded-md border border-[color:var(--line2)] bg-[color:var(--bg2)] px-2 py-1 text-sm text-[color:var(--ink)]"
                          >
                            <option value="">-- vị trí --</option>
                            {q.options.map((_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </select>
                          {submitted && (
                            <span
                              className={
                                "shrink-0 text-xs font-semibold " +
                                (Number(picked) === expectedPos
                                  ? "text-emerald-300"
                                  : "text-rose-300")
                              }
                            >
                              {Number(picked) === expectedPos
                                ? "✓ đúng"
                                : `✗ đúng là vị trí ${expectedPos}`}
                            </span>
                          )}
                        </div>
                        {submitted && (
                          <p className="mt-1 mb-0 pl-2 text-xs leading-relaxed text-[color:var(--muted)]">
                            {o.rationale}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <ul className="mt-4 space-y-2 list-none pl-0">
                  {q.options.map((o) => {
                    const isPicked = (choice[q.id] ?? []).includes(o.key);
                    const isRight = q.correctKeys.includes(o.key);
                    return (
                      <li key={o.key}>
                        <label
                          className={
                            "flex cursor-pointer items-start gap-2 rounded-lg border px-3 py-2 text-sm " +
                            (submitted
                              ? isRight
                                ? "border-emerald-500/40 bg-emerald-500/10"
                                : isPicked
                                ? "border-rose-500/40 bg-rose-500/10"
                                : "border-[color:var(--line)]"
                              : isPicked
                              ? "border-brand-400/60 bg-brand-500/10"
                              : "border-[color:var(--line)] hover:border-brand-400/40")
                          }
                        >
                          <input
                            type={q.selectCount === 1 ? "radio" : "checkbox"}
                            name={`q-${q.id}`}
                            checked={isPicked}
                            disabled={submitted}
                            onChange={() => toggleChoice(q, o.key)}
                            className="mt-1 shrink-0"
                          />
                          <span className="text-[color:var(--muted)]">
                            <strong className="text-[color:var(--ink)]">
                              {o.key})
                            </strong>{" "}
                            {o.text}
                          </span>
                        </label>
                        {submitted && (
                          <p className="mt-1 mb-0 pl-8 text-xs leading-relaxed text-[color:var(--muted)]">
                            {isRight ? "✅" : "—"} {o.rationale}
                          </p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}

              {submitted && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-xs font-semibold text-sky-300 hover:text-sky-200">
                    🇻🇳 Xem giải thích tiếng Việt
                  </summary>
                  <ul className="mt-2 space-y-2 list-none pl-0">
                    {q.options.map((o) => (
                      <li key={o.key} className="text-xs leading-relaxed text-[color:var(--faint)]">
                        <strong className="text-[color:var(--muted)]">{o.key})</strong>{" "}
                        {o.rationaleVi}
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          );
        })}
      </div>

      {!submitted ? (
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-6 w-full rounded-xl bg-brand-500 py-3 text-sm font-bold text-white hover:bg-brand-600 md:w-auto md:px-8"
        >
          Nộp bài ({answeredCount}/{questions.length} câu đã trả lời)
        </button>
      ) : (
        <button
          type="button"
          onClick={handleRetry}
          className="mt-6 w-full rounded-xl bg-[color:var(--bg2)] py-3 text-sm font-bold text-[color:var(--ink)] ring-1 ring-[color:var(--line2)] hover:ring-brand-400 md:w-auto md:px-8"
        >
          ↺ Làm lại từ đầu
        </button>
      )}
    </div>
  );
}
