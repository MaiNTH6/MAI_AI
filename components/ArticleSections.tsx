"use client";
import { useState } from "react";
import Link from "next/link";
import type {
  ArticleIntro,
  ComparisonRow,
  FAQItem,
  PromptExample,
  SetupStep,
  VisualFeature,
} from "@/lib/types";

/* ---------------- INTRO (Mở bài + Giới thiệu trợ lý) ---------------- */

export function IntroBox({ intro }: { intro: ArticleIntro }) {
  if (!intro || (!intro.problem && !intro.whatIs && !intro.whyThis)) return null;
  return (
    <section className="not-prose my-8 space-y-6">
      {intro.problem && (
        <div className="rounded-2xl border-l-4 border-amber-500 bg-amber-50/60 p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-500 text-white text-sm font-bold">
              📌
            </span>
            <h2 className="font-bold text-lg text-slate-900 m-0">
              Đặt vấn đề
            </h2>
          </div>
          <p className="text-slate-700 leading-relaxed m-0">{intro.problem}</p>
        </div>
      )}
      {(intro.whatIs || intro.whyThis) && (
        <div className="rounded-2xl border-l-4 border-brand-500 bg-brand-50/40 p-6 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white text-sm font-bold">
              🤖
            </span>
            <h2 className="font-bold text-lg text-slate-900 m-0">
              Giới thiệu &ldquo;Trợ lý&rdquo;
            </h2>
          </div>
          {intro.whatIs && (
            <p className="text-slate-700 leading-relaxed m-0">{intro.whatIs}</p>
          )}
          {intro.whyThis && (
            <p className="text-slate-700 leading-relaxed m-0">
              <strong className="text-brand-700">Vì sao chọn nó?</strong>{" "}
              {intro.whyThis}
            </p>
          )}
        </div>
      )}
    </section>
  );
}

/* ---------------- TLDR ---------------- */

export function TldrBox({ items }: { items: string[] }) {
  if (!items?.length) return null;
  return (
    <aside className="not-prose my-8 rounded-2xl border-2 border-brand-200 bg-brand-50/40 p-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white text-sm font-bold">
          ⚡
        </span>
        <h3 className="font-bold text-lg text-slate-900">Đọc 30 giây — Bài này nói gì?</h3>
      </div>
      <ul className="space-y-2 text-slate-800">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-brand-600 font-bold">→</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/* ---------------- COMPARISON TABLE (Before/After) ---------------- */

export function ComparisonTableBox({ rows }: { rows: ComparisonRow[] }) {
  if (!rows?.length) return null;
  return (
    <section className="not-prose my-10">
      <h2 className="text-2xl font-bold text-slate-900 mb-1">
        📊 So sánh trước & sau
      </h2>
      <p className="text-slate-600 mb-5 text-sm">
        Đặt 2 cách cạnh nhau để bạn tự so sánh.
      </p>
      <div className="overflow-hidden rounded-2xl ring-1 ring-slate-200 shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="px-4 py-3 text-left font-semibold w-2/5">Tiêu chí</th>
              <th className="px-4 py-3 text-left font-semibold">
                <span className="text-rose-700">Trước</span>
              </th>
              <th className="px-4 py-3 text-left font-semibold">
                <span className="text-emerald-700">Sau</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {rows.map((r, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-semibold text-slate-900">
                  {r.label}
                </td>
                <td className="px-4 py-3 text-slate-700">{r.before}</td>
                <td className="px-4 py-3 text-slate-900 font-medium">
                  {r.after}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ---------------- VIDEO EMBED ---------------- */

function toEmbedUrl(url: string): string {
  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  return url; // assume already embed-ready
}

export function VideoBox({ url, title }: { url: string; title?: string }) {
  if (!url) return null;
  const embedUrl = toEmbedUrl(url);
  return (
    <section className="not-prose my-10">
      <h2 className="text-2xl font-bold text-slate-900 mb-1">
        🎬 Video hướng dẫn (3 phút)
      </h2>
      {title && <p className="text-slate-600 mb-4 text-sm">{title}</p>}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl ring-1 ring-slate-200 shadow-sm bg-slate-100">
        <iframe
          src={embedUrl}
          title={title || "Video hướng dẫn"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </section>
  );
}

/* ---------------- SETUP STEPS ---------------- */

export function StepsBox({ steps }: { steps: SetupStep[] }) {
  if (!steps?.length) return null;
  return (
    <section className="not-prose my-10">
      <h2 className="text-2xl font-bold text-slate-900 mb-1">
        🚀 Thiết lập trong {steps.length} bước
      </h2>
      <p className="text-slate-600 mb-5 text-sm">
        Mất khoảng 10-15 phút lần đầu, sau đó chỉ việc dùng.
      </p>
      <ol className="space-y-3">
        {steps.map((s, i) => (
          <li
            key={i}
            className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-600 text-white font-bold">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="font-bold text-slate-900">{s.title}</div>
              <div className="mt-1 text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                {s.body}
              </div>
              {s.image && (
                <figure className="mt-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.image}
                    alt={s.imageAlt || s.title}
                    loading="lazy"
                    className="rounded-lg ring-1 ring-slate-200 max-w-full h-auto"
                  />
                  {s.imageAlt && (
                    <figcaption className="mt-1.5 text-xs text-slate-500">
                      {s.imageAlt}
                    </figcaption>
                  )}
                </figure>
              )}
              {s.linkSlug && (
                <Link
                  href={
                    s.linkSlug.startsWith("/")
                      ? s.linkSlug
                      : `/bai-viet/${s.linkSlug}`
                  }
                  className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-700"
                >
                  {s.linkLabel || "Xem hướng dẫn"} <span aria-hidden>→</span>
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------------- PROMPTS (copy-paste + sample result) ---------------- */

function PromptCard({ p, index }: { p: PromptExample; index: number }) {
  const [copied, setCopied] = useState(false);
  const [showResult, setShowResult] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(p.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard có thể bị chặn — bỏ qua */
    }
  }

  return (
    <div className="rounded-2xl ring-1 ring-slate-200 bg-white overflow-hidden shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-brand-600 text-white text-xs font-bold">
            {index + 1}
          </span>
          <div className="font-semibold text-slate-900">{p.title}</div>
        </div>
        <button
          type="button"
          onClick={copy}
          className="rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-slate-300 hover:ring-brand-400 hover:text-brand-700"
        >
          {copied ? "✓ Đã copy" : "📋 Copy prompt"}
        </button>
      </div>

      {p.goal && (
        <div className="px-5 py-3 border-b border-slate-100 bg-brand-50/30">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-700">
            Mục tiêu
          </span>
          <p className="mt-1 text-sm text-slate-700 m-0">{p.goal}</p>
        </div>
      )}

      <pre className="px-5 py-4 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-mono bg-white border-l-4 border-brand-400 my-0">
        {p.prompt}
      </pre>

      <div className="border-t border-slate-200 bg-slate-50/60">
        <button
          type="button"
          onClick={() => setShowResult((v) => !v)}
          className="w-full text-left px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 flex items-center justify-between"
        >
          <span>
            {showResult ? "▼" : "▶"} Kết quả AI trả ra (ví dụ minh họa)
          </span>
        </button>
        {showResult && (
          <div className="px-5 pb-5 border-t border-slate-200 bg-white pt-4">
            {p.exampleInput && (
              <div className="mb-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  📥 Đầu vào dùng cho ví dụ
                </div>
                <pre className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap font-mono bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 m-0">
                  {p.exampleInput}
                </pre>
              </div>
            )}
            {p.resultGroups ? (
              <div className="space-y-5">
                {p.result && (
                  <p className="text-sm text-slate-600 m-0">{p.result}</p>
                )}
                {p.resultGroups.map((g, gi) => (
                  <div key={gi}>
                    {g.group && (
                      <div className="text-sm font-semibold text-slate-900 mb-1.5 flex items-center gap-2">
                        <span className="inline-block h-3 w-1 rounded bg-brand-500" />
                        {g.group}
                      </div>
                    )}
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-100">
                            {g.columns.map((c, ci) => (
                              <th
                                key={ci}
                                className="border border-slate-300 px-2.5 py-1.5 text-left font-semibold text-slate-900 whitespace-nowrap"
                              >
                                {c}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {g.rows.map((r, ri) => (
                            <tr key={ri} className="even:bg-slate-50/60">
                              {r.map((cell, ci) => (
                                <td
                                  key={ci}
                                  className="border border-slate-200 px-2.5 py-1.5 align-top text-slate-700"
                                >
                                  {cell || (
                                    <span className="text-slate-300">—</span>
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                {p.result}
              </div>
            )}
          </div>
        )}
      </div>

      {p.testerNote && (
        <div className="border-t border-amber-200 bg-amber-50/60 px-5 py-4">
          <div className="flex items-start gap-3">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-amber-500 text-white text-sm font-bold">
              🔍
            </span>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Góc soi lỗi của Tester
              </div>
              <p className="mt-1 text-sm text-slate-800 leading-relaxed m-0">
                {p.testerNote}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function PromptsBox({ prompts }: { prompts: PromptExample[] }) {
  if (!prompts?.length) return null;
  return (
    <section className="not-prose my-10">
      <h2 className="text-2xl font-bold text-slate-900 mb-1">
        💬 {prompts.length} Prompt copy-paste sẵn cho bạn
      </h2>
      <p className="text-slate-600 mb-5 text-sm">
        Bấm <strong>Copy prompt</strong> → dán vào trợ lý AI bạn đang dùng
        (Claude Code, ChatGPT, Claude...) → nhấn Enter. Xong.
      </p>
      <div className="space-y-5">
        {prompts.map((p, i) => (
          <PromptCard key={i} p={p} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ---------------- VISUAL FEATURES (Mind Map, Blueprint, Audio, Video Overview) ---------------- */

export function VisualFeaturesBox({
  features,
}: {
  features: VisualFeature[];
}) {
  if (!features?.length) return null;
  return (
    <section className="not-prose my-10">
      <h2 className="text-2xl font-bold text-slate-900 mb-1">
        🎨 Bonus — {features.length} tính năng Visual của NotebookLM
      </h2>
      <p className="text-slate-600 mb-5 text-sm">
        Ngoài 3 prompt văn bản, NotebookLM còn 4 nút tạo output trực quan
        (sơ đồ, infographic, podcast, video). Hướng dẫn dùng từng cái.
      </p>
      <div className="space-y-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="rounded-2xl ring-1 ring-slate-200 bg-white overflow-hidden shadow-sm"
          >
            {/* Header */}
            <div className="flex items-start gap-4 border-b border-slate-200 bg-gradient-to-r from-brand-50 to-amber-50 px-5 py-4">
              <span className="text-3xl shrink-0" aria-hidden>
                {f.emoji || "✨"}
              </span>
              <div>
                <div className="font-bold text-lg text-slate-900">{f.name}</div>
                <p className="mt-1 text-sm text-slate-700 m-0">
                  {f.description}
                </p>
              </div>
            </div>

            {/* HowTo */}
            <div className="px-5 py-4 border-b border-slate-100">
              <div className="text-xs font-bold uppercase tracking-wider text-brand-700 mb-3">
                Cách tạo (bấm theo thứ tự)
              </div>
              <ol className="space-y-2">
                {f.howTo.map((step, si) => (
                  <li key={si} className="flex gap-3 text-sm text-slate-700">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-600 text-white text-xs font-bold">
                      {si + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* UseCase */}
            <div className="px-5 py-4 bg-emerald-50/40 border-b border-emerald-100">
              <div className="flex items-start gap-2">
                <span className="text-emerald-700 font-bold text-sm shrink-0">
                  ✓ Khi nào dùng:
                </span>
                <span className="text-sm text-slate-800">{f.useCase}</span>
              </div>
            </div>

            {/* Tip */}
            {f.tip && (
              <div className="px-5 py-4 bg-amber-50/60">
                <div className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold text-sm shrink-0">
                    💡 Mẹo:
                  </span>
                  <span className="text-sm text-slate-800">{f.tip}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

function FaqItem({ q, index }: { q: FAQItem; index: number }) {
  const [open, setOpen] = useState(index === 0); // mở câu đầu sẵn
  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-slate-50"
      >
        <span className="font-semibold text-slate-900">{q.question}</span>
        <span className="text-slate-400 shrink-0">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-5 pb-4 text-slate-700 leading-relaxed border-t border-slate-100 pt-3">
          {q.answer}
        </div>
      )}
    </div>
  );
}

export function FaqBox({ items }: { items: FAQItem[] }) {
  if (!items?.length) return null;
  return (
    <section className="not-prose my-10">
      <h2 className="text-2xl font-bold text-slate-900 mb-1">
        ❓ Câu hỏi thường gặp
      </h2>
      <p className="text-slate-600 mb-5 text-sm">
        Câu trả lời thẳng, không vòng vo.
      </p>
      <div className="space-y-3">
        {items.map((q, i) => (
          <FaqItem key={i} q={q} index={i} />
        ))}
      </div>
    </section>
  );
}
