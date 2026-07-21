"use client";
import { useState } from "react";
import type { PromptTopic } from "@/lib/prompts";

function CopyablePrompt({ title, prompt }: { title: string; prompt: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard bị chặn — bỏ qua */
    }
  }

  return (
    <div className="rounded-2xl bg-[color:var(--bg2)] ring-1 ring-white/10 shadow-lg shadow-black/20 overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-[color:var(--line)] bg-[color:var(--bg3)] px-5 py-3">
        <div className="font-semibold text-[color:var(--ink)]">{title}</div>
        <button
          type="button"
          onClick={copy}
          className="shrink-0 rounded-md bg-[color:var(--bg2)] px-3 py-1.5 text-xs font-semibold text-[color:var(--muted)] ring-1 ring-[color:var(--line2)] hover:ring-brand-400 hover:text-brand-300"
        >
          {copied ? "✓ Đã copy" : "📋 Copy"}
        </button>
      </div>
      <pre className="px-5 py-4 text-sm text-[color:var(--ink)] leading-relaxed whitespace-pre-wrap font-mono">
        {prompt}
      </pre>
    </div>
  );
}

export function PromptLibrary({ topics }: { topics: PromptTopic[] }) {
  const total = topics.reduce((n, t) => n + t.prompts.length, 0);

  return (
    <div className="container-content py-10">
      {/* Mục lục nhảy nhanh */}
      <div className="mb-8 flex flex-wrap gap-2">
        <span className="text-sm text-[color:var(--faint)] py-1.5">
          {total} prompt · nhảy tới:
        </span>
        {topics.map((t) => (
          <a
            key={t.slug}
            href={`#${t.slug}`}
            className="rounded-full bg-white/10 px-3 py-1.5 text-sm text-slate-200 ring-1 ring-white/20 backdrop-blur hover:ring-brand-300 hover:text-white"
          >
            {t.emoji} {t.title}
          </a>
        ))}
      </div>

      <div className="space-y-12">
        {topics.map((t) => (
          <section key={t.slug} id={t.slug} className="scroll-mt-20">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span>{t.emoji}</span> {t.title}
              </h2>
              <p className="mt-1 text-[color:var(--faint)] text-sm">{t.description}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {t.prompts.map((p, i) => (
                <CopyablePrompt key={i} title={p.title} prompt={p.prompt} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
