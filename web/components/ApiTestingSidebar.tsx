"use client";

import { useState } from "react";
import Link from "next/link";
import { apiChapters } from "@/lib/api-testing";

/** Sidebar điều hướng hub API Testing: đóng/mở được; 6 chương (gấp/mở) → các mục. */
export function ApiTestingSidebar({
  activeChapter,
  activeSection,
}: {
  activeChapter?: string;
  activeSection?: string;
}) {
  const [open, setOpen] = useState(true);

  return (
    <nav className="text-sm lg:sticky lg:top-24 rounded-2xl bg-[color:var(--bg2)] ring-1 ring-white/10 p-4">
      <div className="flex items-center justify-between gap-2">
        <Link
          href="/api-testing"
          className="font-bold text-[color:var(--metal)] hover:text-brand-300"
        >
          🧭 API Testing
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="shrink-0 rounded-md px-2 py-1 text-xs text-[color:var(--muted)] ring-1 ring-[color:var(--line2)] hover:text-[color:var(--ink)] hover:ring-brand-400"
        >
          {open ? "Ẩn mục lục ▴" : "Hiện mục lục ▾"}
        </button>
      </div>

      {open && (
        <ul className="mt-3 space-y-1">
          {apiChapters.map((ch) => (
            <li key={ch.slug}>
              <details open={ch.slug === activeChapter}>
                <summary className="cursor-pointer py-1 font-semibold text-[color:var(--ink)] hover:text-brand-300 list-none marker:content-none">
                  {ch.num}. {ch.title}
                </summary>
                <ul className="mt-1 ml-1 space-y-0.5 border-l border-[color:var(--line)] pl-3">
                  {ch.sections.map((s) => {
                    const active =
                      ch.slug === activeChapter && s.slug === activeSection;
                    return (
                      <li key={s.slug}>
                        <Link
                          href={`/api-testing/${ch.slug}/${s.slug}`}
                          className={
                            active
                              ? "block py-0.5 text-brand-300 font-semibold"
                              : "block py-0.5 text-[color:var(--muted)] hover:text-brand-300"
                          }
                        >
                          <span className="text-[color:var(--faint)]">
                            {s.code}
                          </span>{" "}
                          {s.title}
                          {!s.hasContent && (
                            <span className="text-[color:var(--faint)]">
                              {" "}
                              · sắp có
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </details>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
