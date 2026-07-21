"use client";
import { useState } from "react";
import Link from "next/link";
import type {
  ArticleIntro,
  ArticleReference,
  ComparisonRow,
  ContentTable,
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
        <div className="rounded-2xl border-l-4 border-amber-500 bg-amber-500/10 p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-500 text-white text-sm font-bold">
              📌
            </span>
            <h2 className="font-bold text-lg text-[color:var(--ink)] m-0">
              Đặt vấn đề
            </h2>
          </div>
          <p className="text-[color:var(--muted)] leading-relaxed m-0">{intro.problem}</p>
        </div>
      )}
      {(intro.whatIs || intro.whyThis) && (
        <div className="rounded-2xl border-l-4 border-brand-500 bg-brand-500/10 p-6 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white text-sm font-bold">
              🤖
            </span>
            <h2 className="font-bold text-lg text-[color:var(--ink)] m-0">
              Giới thiệu &ldquo;Trợ lý&rdquo;
            </h2>
          </div>
          {intro.whatIs && (
            <p className="text-[color:var(--muted)] leading-relaxed m-0">{intro.whatIs}</p>
          )}
          {intro.whyThis && (
            <p className="text-[color:var(--muted)] leading-relaxed m-0">
              <strong className="text-brand-300">Vì sao chọn nó?</strong>{" "}
              {intro.whyThis}
            </p>
          )}
        </div>
      )}
    </section>
  );
}

/* ---------------- LEAD (mở bài dạng prose, không hộp màu) ---------------- */

export function LeadBox({ text }: { text: string }) {
  if (!text) return null;
  return (
    <div className="not-prose my-6 space-y-3 text-lg leading-relaxed text-[color:var(--muted)]">
      {text.split("\n\n").map((p, i) => (
        <p key={i} className="m-0">
          {p}
        </p>
      ))}
    </div>
  );
}

/* ---------------- TLDR ---------------- */

export function TldrBox({ items }: { items: string[] }) {
  if (!items?.length) return null;
  return (
    <aside className="not-prose my-8 rounded-2xl border-2 border-brand-500/40 bg-brand-500/10 p-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white text-sm font-bold">
          ⚡
        </span>
        <h3 className="font-bold text-lg text-[color:var(--ink)]">Đọc 30 giây — Bài này nói gì?</h3>
      </div>
      <ul className="space-y-2 text-[color:var(--ink)]">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-brand-300 font-bold">→</span>
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
      <h2 className="text-2xl font-bold text-[color:var(--ink)] mb-1">
        📊 So sánh trước & sau
      </h2>
      <p className="text-[color:var(--muted)] mb-5 text-sm">
        Đặt 2 cách cạnh nhau để bạn tự so sánh.
      </p>
      <div className="overflow-hidden rounded-2xl ring-1 ring-[color:var(--line)] shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-[color:var(--bg3)] text-[color:var(--muted)]">
            <tr>
              <th className="px-4 py-3 text-left font-semibold w-2/5">Tiêu chí</th>
              <th className="px-4 py-3 text-left font-semibold">
                <span className="text-rose-300">Trước</span>
              </th>
              <th className="px-4 py-3 text-left font-semibold">
                <span className="text-emerald-300">Sau</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[color:var(--line)] bg-[color:var(--bg2)]">
            {rows.map((r, i) => (
              <tr key={i} className="hover:bg-[color:var(--bg3)]">
                <td className="px-4 py-3 font-semibold text-[color:var(--ink)]">
                  {r.label}
                </td>
                <td className="px-4 py-3 text-[color:var(--muted)]">{r.before}</td>
                <td className="px-4 py-3 text-[color:var(--ink)] font-medium">
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
      <h2 className="text-2xl font-bold text-[color:var(--ink)] mb-1">
        🎬 Video hướng dẫn (3 phút)
      </h2>
      {title && <p className="text-[color:var(--muted)] mb-4 text-sm">{title}</p>}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl ring-1 ring-[color:var(--line)] shadow-sm bg-[color:var(--bg3)]">
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

export function StepsBox({
  steps,
  title,
  subtitle,
}: {
  steps: SetupStep[];
  title?: string;
  subtitle?: string;
}) {
  if (!steps?.length) return null;
  const sub =
    subtitle ?? "Mất khoảng 10-15 phút lần đầu, sau đó chỉ việc dùng.";
  return (
    <section className="not-prose my-10">
      <h2 className="text-2xl font-bold text-[color:var(--ink)] mb-1">
        {title || `🚀 Thiết lập trong ${steps.length} bước`}
      </h2>
      {sub && <p className="text-[color:var(--muted)] mb-5 text-sm">{sub}</p>}
      <ol className="space-y-3">
        {steps.map((s, i) => (
          <li
            key={i}
            className="flex gap-4 rounded-xl border border-[color:var(--line)] bg-[color:var(--bg2)] p-4"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-600 text-white font-bold">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="font-bold text-[color:var(--ink)]">{s.title}</div>
              <div className="mt-1 text-[color:var(--muted)] text-sm leading-relaxed whitespace-pre-line">
                {s.body}
              </div>
              {s.code && (
                <pre className="mt-3 overflow-x-auto rounded-lg bg-[#0a0e15] px-4 py-3 text-xs leading-relaxed text-slate-100 font-mono">
                  {s.code}
                </pre>
              )}
              {s.tip && (
                <div className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200 leading-relaxed">
                  {s.tip}
                </div>
              )}
              {s.image && (
                <figure className="mt-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.image}
                    alt={s.imageAlt || s.title}
                    loading="lazy"
                    className="rounded-lg ring-1 ring-[color:var(--line)] max-w-full h-auto"
                  />
                  {s.imageAlt && (
                    <figcaption className="mt-1.5 text-xs text-[color:var(--faint)]">
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
    <div className="rounded-2xl ring-1 ring-[color:var(--line)] bg-[color:var(--bg2)] overflow-hidden shadow-sm">
      <div className="flex items-center justify-between border-b border-[color:var(--line)] bg-[color:var(--bg3)] px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-brand-600 text-white text-xs font-bold">
            {index + 1}
          </span>
          <div className="font-semibold text-[color:var(--ink)]">{p.title}</div>
        </div>
        <button
          type="button"
          onClick={copy}
          className="rounded-md bg-[color:var(--bg2)] px-3 py-1.5 text-xs font-semibold text-[color:var(--muted)] ring-1 ring-[color:var(--line2)] hover:ring-brand-400 hover:text-brand-300"
        >
          {copied ? "✓ Đã copy" : "📋 Copy prompt"}
        </button>
      </div>

      {p.goal && (
        <div className="px-5 py-3 border-b border-[color:var(--line)] bg-brand-500/10">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-300">
            Mục tiêu
          </span>
          <p className="mt-1 text-sm text-[color:var(--muted)] m-0">{p.goal}</p>
        </div>
      )}

      <pre className="px-5 py-4 text-sm text-[color:var(--ink)] leading-relaxed whitespace-pre-wrap font-mono bg-[color:var(--bg2)] border-l-4 border-brand-400 my-0">
        {p.prompt}
      </pre>

      <div className="border-t border-[color:var(--line)] bg-white/[0.04]">
        <button
          type="button"
          onClick={() => setShowResult((v) => !v)}
          className="w-full text-left px-5 py-3 text-sm font-semibold text-[color:var(--muted)] hover:bg-[color:var(--bg3)] flex items-center justify-between"
        >
          <span>
            {showResult ? "▼" : "▶"} Kết quả AI trả ra (ví dụ minh họa)
          </span>
        </button>
        {showResult && (
          <div className="px-5 pb-5 border-t border-[color:var(--line)] bg-[color:var(--bg2)] pt-4">
            {p.exampleInput && (
              <div className="mb-4">
                <div className="text-xs font-bold uppercase tracking-wider text-[color:var(--faint)] mb-1.5">
                  📥 Đầu vào dùng cho ví dụ
                </div>
                <pre className="text-xs text-[color:var(--muted)] leading-relaxed whitespace-pre-wrap font-mono bg-[color:var(--bg3)] border border-[color:var(--line)] rounded-lg px-3 py-2.5 m-0">
                  {p.exampleInput}
                </pre>
              </div>
            )}
            {p.resultGroups ? (
              <div className="space-y-5">
                {p.result && (
                  <p className="text-sm text-[color:var(--muted)] m-0">{p.result}</p>
                )}
                {p.resultGroups.map((g, gi) => (
                  <div key={gi}>
                    {g.group && (
                      <div className="text-sm font-semibold text-[color:var(--ink)] mb-1.5 flex items-center gap-2">
                        <span className="inline-block h-3 w-1 rounded bg-brand-500" />
                        {g.group}
                      </div>
                    )}
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr className="bg-[color:var(--bg3)]">
                            {g.columns.map((c, ci) => (
                              <th
                                key={ci}
                                className="border border-[color:var(--line2)] px-2.5 py-1.5 text-left font-semibold text-[color:var(--ink)] whitespace-nowrap"
                              >
                                {c}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {g.rows.map((r, ri) => (
                            <tr key={ri} className="even:bg-white/[0.04]">
                              {r.map((cell, ci) => (
                                <td
                                  key={ci}
                                  className="border border-[color:var(--line)] px-2.5 py-1.5 align-top text-[color:var(--muted)]"
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
              <div className="text-sm text-[color:var(--muted)] leading-relaxed whitespace-pre-wrap">
                {p.result}
              </div>
            )}
          </div>
        )}
      </div>

      {p.testerNote && (
        <div className="border-t border-amber-500/30 bg-amber-500/10 px-5 py-4">
          <div className="flex items-start gap-3">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-amber-500 text-white text-sm font-bold">
              🔍
            </span>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Góc soi lỗi của Tester
              </div>
              <p className="mt-1 text-sm text-[color:var(--ink)] leading-relaxed m-0">
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
      <h2 className="text-2xl font-bold text-[color:var(--ink)] mb-1">
        🔍 {prompts.length} prompt — kèm chỗ AI hay sai cần bắt
      </h2>
      <p className="text-[color:var(--muted)] mb-5 text-sm">
        AI sinh kết quả chỉ trong vài giây — việc của bạn là <strong>kiểm lại</strong>.
        Mỗi prompt kèm ví dụ kết quả và <strong>🔍 Góc soi lỗi của Tester</strong> (chỗ
        AI hay sai, nên xem trước khi dùng). Bấm <strong>Copy</strong> → dán vào Claude
        Code / ChatGPT.
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
      <h2 className="text-2xl font-bold text-[color:var(--ink)] mb-1">
        🎨 Bonus — {features.length} tính năng Visual của NotebookLM
      </h2>
      <p className="text-[color:var(--muted)] mb-5 text-sm">
        Ngoài 3 prompt văn bản, NotebookLM còn 4 nút tạo output trực quan
        (sơ đồ, infographic, podcast, video). Hướng dẫn dùng từng cái.
      </p>
      <div className="space-y-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="rounded-2xl ring-1 ring-[color:var(--line)] bg-[color:var(--bg2)] overflow-hidden shadow-sm"
          >
            {/* Header */}
            <div className="flex items-start gap-4 border-b border-[color:var(--line)] bg-gradient-to-r from-brand-50 to-amber-50 px-5 py-4">
              <span className="text-3xl shrink-0" aria-hidden>
                {f.emoji || "✨"}
              </span>
              <div>
                <div className="font-bold text-lg text-[color:var(--ink)]">{f.name}</div>
                <p className="mt-1 text-sm text-[color:var(--muted)] m-0">
                  {f.description}
                </p>
              </div>
            </div>

            {/* HowTo */}
            <div className="px-5 py-4 border-b border-[color:var(--line)]">
              <div className="text-xs font-bold uppercase tracking-wider text-brand-300 mb-3">
                Cách tạo (bấm theo thứ tự)
              </div>
              <ol className="space-y-2">
                {f.howTo.map((step, si) => (
                  <li key={si} className="flex gap-3 text-sm text-[color:var(--muted)]">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-600 text-white text-xs font-bold">
                      {si + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* UseCase */}
            <div className="px-5 py-4 bg-emerald-500/10 border-b border-emerald-500/25">
              <div className="flex items-start gap-2">
                <span className="text-emerald-300 font-bold text-sm shrink-0">
                  ✓ Khi nào dùng:
                </span>
                <span className="text-sm text-[color:var(--ink)]">{f.useCase}</span>
              </div>
            </div>

            {/* Tip */}
            {f.tip && (
              <div className="px-5 py-4 bg-amber-500/10">
                <div className="flex items-start gap-2">
                  <span className="text-amber-300 font-bold text-sm shrink-0">
                    💡 Mẹo:
                  </span>
                  <span className="text-sm text-[color:var(--ink)]">{f.tip}</span>
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
    <div className="rounded-xl border border-[color:var(--line)] bg-[color:var(--bg2)] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-[color:var(--bg3)]"
      >
        <span className="font-semibold text-[color:var(--ink)]">{q.question}</span>
        <span className="text-[color:var(--faint)] shrink-0">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-5 pb-4 text-[color:var(--muted)] leading-relaxed border-t border-[color:var(--line)] pt-3">
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
      <h2 className="text-2xl font-bold text-[color:var(--ink)] mb-1">
        ❓ Câu hỏi thường gặp
      </h2>
      <p className="text-[color:var(--muted)] mb-5 text-sm">
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

/* ---------------- CONTENT TABLES (bảng nội dung trong thân bài) ---------------- */

export function ContentTablesBox({ tables }: { tables: ContentTable[] }) {
  if (!tables?.length) return null;
  return (
    <section className="not-prose my-10 space-y-8">
      {tables.map((t, ti) => (
        <div key={ti}>
          {t.title && (
            <h2 className="text-2xl font-bold text-[color:var(--ink)] mb-1">{t.title}</h2>
          )}
          {t.intro && <p className="text-[color:var(--muted)] mb-4 text-sm">{t.intro}</p>}
          <div className="overflow-x-auto rounded-xl ring-1 ring-[color:var(--line)]">
            <table className="w-full text-sm border-collapse bg-[color:var(--bg2)]">
              <thead>
                <tr className="bg-[color:var(--bg3)]">
                  {t.columns.map((c, ci) => (
                    <th
                      key={ci}
                      className="border border-[color:var(--line)] px-3 py-2 text-left font-semibold text-[color:var(--ink)]"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.rows.map((r, ri) => (
                  <tr key={ri} className="even:bg-white/[0.04]">
                    {r.map((cell, ci) => (
                      <td
                        key={ci}
                        className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)]"
                      >
                        {cell || <span className="text-slate-300">—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {t.note && (
            <div className="mt-3 rounded-lg bg-brand-500/10 ring-1 ring-brand-100 px-4 py-3 text-sm text-[color:var(--muted)]">
              {t.note}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

/* ---------------- REFERENCES (Tài liệu tham khảo) ---------------- */

export function ReferencesBox({ items }: { items: ArticleReference[] }) {
  if (!items?.length) return null;
  return (
    <section className="not-prose my-10 rounded-2xl border border-[color:var(--line)] bg-white/[0.04] p-6">
      <h2 className="text-lg font-bold text-[color:var(--ink)] mb-3">
        📚 Tài liệu tham khảo
      </h2>
      <ul className="space-y-2 text-sm text-[color:var(--muted)]">
        {items.map((r, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-[color:var(--faint)]">•</span>
            {r.url ? (
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-300 hover:underline"
              >
                {r.label}
              </a>
            ) : (
              <span>{r.label}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
