"use client";
import { useState } from "react";
import type { TemplateContent, TemplateGroup } from "@/lib/templates";

function useCopy() {
  const [copied, setCopied] = useState(false);
  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard bị chặn */
    }
  }
  return { copied, copy };
}

function CopyTextButton({
  text,
  label,
}: {
  text: string;
  label: string;
}) {
  const { copied, copy } = useCopy();
  return (
    <button
      type="button"
      onClick={() => copy(text)}
      className="rounded-md bg-[color:var(--bg2)] px-3 py-1.5 text-xs font-semibold text-[color:var(--muted)] ring-1 ring-[color:var(--line2)] hover:ring-brand-400 hover:text-brand-300"
    >
      {copied ? "✓ Đã copy" : label}
    </button>
  );
}

function tableToTSV(columns: string[], rows: string[][]): string {
  return [columns.join("\t"), ...rows.map((r) => r.join("\t"))].join("\n");
}

function TableView({
  columns,
  rows,
}: {
  columns: string[];
  rows: string[][];
}) {
  // Gộp ô cột đầu (nhóm) khi các dòng liền nhau trùng giá trị → chỉ hiện 1 lần.
  const firstColSpan = rows.map((r, ri) => {
    const val = r[0];
    if (ri > 0 && rows[ri - 1][0] === val) return 0; // đã gộp vào dòng trên
    let span = 1;
    for (let k = ri + 1; k < rows.length && rows[k][0] === val; k++) span++;
    return span;
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="bg-[color:var(--bg3)]">
            {columns.map((c, i) => (
              <th
                key={i}
                className="border border-[color:var(--line2)] px-3 py-2 text-left font-semibold text-[color:var(--ink)] whitespace-nowrap"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri} className="hover:bg-[color:var(--bg3)]">
              {r.map((cell, ci) => {
                if (ci === 0) {
                  if (firstColSpan[ri] === 0) return null; // ô đã gộp
                  return (
                    <td
                      key={ci}
                      rowSpan={firstColSpan[ri]}
                      className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--ink)] font-medium bg-white/[0.04] whitespace-nowrap"
                    >
                      {cell || <span className="text-slate-300">—</span>}
                    </td>
                  );
                }
                return (
                  <td
                    key={ci}
                    className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)]"
                  >
                    {cell || <span className="text-slate-300">—</span>}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function HeaderActions({
  slug,
  title,
  whenToUse,
  content,
}: {
  slug: string;
  title: string;
  whenToUse: string;
  content: TemplateContent;
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-[color:var(--line)] bg-[color:var(--bg3)] px-5 py-3">
      <div>
        <div className="font-semibold text-[color:var(--ink)]">{title}</div>
        <div className="mt-0.5 text-xs text-[color:var(--faint)]">{whenToUse}</div>
      </div>
      <div className="shrink-0 flex flex-wrap gap-2 justify-end">
        {content.kind === "table" ? (
          <>
            <a
              href={`/templates/${slug}.xlsx`}
              download
              className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700"
            >
              ⬇ Tải Excel
            </a>
            <CopyTextButton
              text={tableToTSV(content.columns, content.rows)}
              label="📋 Copy"
            />
          </>
        ) : (
          <CopyTextButton text={content.body} label="📋 Copy mẫu" />
        )}
      </div>
    </div>
  );
}

function TemplateCard({
  slug,
  title,
  whenToUse,
  content,
  aiPrompt,
}: {
  slug: string;
  title: string;
  whenToUse: string;
  content: TemplateContent;
  aiPrompt?: string;
}) {
  const [showPrompt, setShowPrompt] = useState(false);
  const { copied, copy } = useCopy();

  return (
    <div
      id={slug}
      className="scroll-mt-24 rounded-2xl bg-[color:var(--bg2)] ring-1 ring-white/10 shadow-lg shadow-black/20 overflow-hidden"
    >
      <HeaderActions
        slug={slug}
        title={title}
        whenToUse={whenToUse}
        content={content}
      />

      <div className="px-5 py-4">
        {content.kind === "table" ? (
          <>
            {content.context && (
              <div className="mb-3 text-xs text-[color:var(--muted)]">
                {content.context}
              </div>
            )}
            <TableView columns={content.columns} rows={content.rows} />
            {content.note && (
              <div className="mt-3 text-xs text-[color:var(--faint)]">{content.note}</div>
            )}
          </>
        ) : (
          <pre className="text-xs text-[color:var(--ink)] leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto">
            {content.body}
          </pre>
        )}
      </div>

      {aiPrompt && (
        <div className="border-t border-[color:var(--line)] bg-white/[0.04]">
          <button
            type="button"
            onClick={() => setShowPrompt((v) => !v)}
            className="w-full text-left px-5 py-3 text-sm font-semibold text-[color:var(--muted)] hover:bg-[color:var(--bg3)] flex items-center justify-between"
          >
            <span>
              {showPrompt ? "▼" : "▶"} Prompt để AI tự điền template từ tài liệu
            </span>
          </button>
          {showPrompt && (
            <div className="px-5 pb-5 border-t border-[color:var(--line)] bg-[color:var(--bg2)] pt-3">
              <div className="mb-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => copy(aiPrompt)}
                  className="rounded-md bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-700"
                >
                  {copied ? "✓ Đã copy" : "📋 Copy prompt"}
                </button>
              </div>
              <pre className="text-xs text-[color:var(--ink)] leading-relaxed whitespace-pre-wrap font-mono">
                {aiPrompt}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function TemplateLibrary({ groups }: { groups: TemplateGroup[] }) {
  const total = groups.reduce((n, g) => n + g.templates.length, 0);

  return (
    <div className="container-content py-10">
      <div className="mb-8 flex flex-wrap gap-2">
        <span className="text-sm text-[color:var(--faint)] py-1.5">
          {total} template · nhảy tới:
        </span>
        {groups.map((g) => (
          <a
            key={g.slug}
            href={`#${g.slug}`}
            className="rounded-full bg-white/10 px-3 py-1.5 text-sm text-slate-200 ring-1 ring-white/20 backdrop-blur hover:ring-brand-300 hover:text-white"
          >
            {g.emoji} {g.title}
          </a>
        ))}
      </div>

      {/* Ghi chú chung — thay vì lặp ở mỗi template */}
      <div className="mb-8 rounded-xl bg-white/5 ring-1 ring-white/10 px-4 py-3 text-sm text-slate-300 leading-relaxed">
        💡 Mỗi template: bấm{" "}
        <strong className="text-emerald-300">⬇ Tải Excel</strong> để lấy file
        .xlsx có sẵn header định dạng + cột Kết quả / Trạng thái / Ưu tiên có
        dropdown chọn sẵn (tick ngay trong Excel). Hoặc bấm{" "}
        <strong className="text-white">📋 Copy</strong> để dán nhanh vào file
        Excel sẵn có — mỗi cột tự vào đúng ô.
      </div>

      <div className="space-y-12">
        {groups.map((g) => (
          <section key={g.slug} id={g.slug} className="scroll-mt-20">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span>{g.emoji}</span> {g.title}
              </h2>
              <p className="mt-1 text-[color:var(--faint)] text-sm">{g.description}</p>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {g.templates.map((t) => (
                <TemplateCard
                  key={t.slug}
                  slug={t.slug}
                  title={t.title}
                  whenToUse={t.whenToUse}
                  content={t.content}
                  aiPrompt={t.aiPrompt}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
