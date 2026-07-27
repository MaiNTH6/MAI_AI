"use client";

import { useRef, useState } from "react";
import { SpeakButton } from "@/components/SpeakButton";

/**
 * Box "Thuật ngữ Anh–Việt" có:
 *  - Nút loa từng từ (đọc tiếng Anh).
 *  - Nút "Đọc tất cả": lần lượt đọc term (Anh) → chờ vài giây → đọc nghĩa (Việt) → từ kế tiếp.
 * Dùng Web Speech API của trình duyệt.
 */
// Hằng số thuần — đặt ở module scope để không tạo lại mỗi lần render.
// Các cụm viết tắt tiếng Anh cần đọc theo giọng Anh (dài đứng trước để khớp đúng).
const EN_ABBR = [
  "AIaaS", "LLM", "RAG", "GANs", "CNN", "RNN", "NLP", "ASIC", "SVM", "IoT",
  "GAN", "GPU", "CPU", "SoC", "API", "AI", "ML", "DL",
];
const EN_SET = new Set(EN_ABBR);
const EN_SPLIT = new RegExp("\\b(" + EN_ABBR.join("|") + ")\\b");

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Đọc một chuỗi bằng giọng ngôn ngữ chỉ định; resolve khi đọc xong (hoặc lỗi). */
function speakOnce(text: string, lang: string): Promise<void> {
  return new Promise((resolve) => {
    const synth = window.speechSynthesis;
    if (!synth) return resolve();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = 0.9;
    u.onend = () => resolve();
    u.onerror = () => resolve();
    synth.speak(u);
  });
}

export function TermGlossary({ terms }: { terms: [string, string][] }) {
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(-1);
  const stopRef = useRef(false);

  // Đọc chuỗi tiếng Việt nhưng viết tắt tiếng Anh (AI, ML...) đọc bằng giọng Anh
  async function speakMixed(text: string) {
    for (const part of text.split(EN_SPLIT)) {
      if (stopRef.current) break;
      if (!part.trim()) continue;
      await speakOnce(part, EN_SET.has(part) ? "en-US" : "vi-VN");
    }
  }

  async function playAll() {
    const synth = window.speechSynthesis;
    if (!synth || playing) return;
    setPlaying(true);
    stopRef.current = false;
    synth.cancel();
    for (let i = 0; i < terms.length; i++) {
      if (stopRef.current) break;
      setCurrent(i);
      await speakOnce(terms[i][0], "en-US"); // đọc tiếng Anh
      if (stopRef.current) break;
      await delay(1000); // chờ 1 giây
      if (stopRef.current) break;
      await speakMixed(terms[i][1]); // đọc nghĩa tiếng Việt (viết tắt EN đọc giọng Anh)
      if (stopRef.current) break;
      await delay(900);
    }
    setPlaying(false);
    setCurrent(-1);
  }

  function stopAll() {
    stopRef.current = true;
    window.speechSynthesis?.cancel();
    setPlaying(false);
    setCurrent(-1);
  }

  return (
    <div className="mt-8 rounded-2xl border border-sky-400/30 bg-sky-500/10 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="mt-0 mb-0 text-lg font-bold text-sky-300">
          📖 Thuật ngữ Anh–Việt (mục này)
        </h3>
        {!playing ? (
          <button
            type="button"
            onClick={playAll}
            className="rounded-md bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-700"
          >
            ▶ Đọc tất cả (Anh → Việt)
          </button>
        ) : (
          <button
            type="button"
            onClick={stopAll}
            className="rounded-md bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700"
          >
            ⏹ Dừng
          </button>
        )}
      </div>
      <p className="mt-1 mb-3 text-sm text-[color:var(--muted)]">
        Đề thi dùng thuật ngữ tiếng Anh — nhớ đúng cụm bên trái. Bấm 🔊 để nghe
        từng từ, hoặc &quot;Đọc tất cả&quot; để nghe lần lượt Anh → (vài giây) →
        Việt.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              <th className="border border-[color:var(--line2)] px-3 py-2 text-left font-semibold whitespace-nowrap">
                Thuật ngữ (EN)
              </th>
              <th className="border border-[color:var(--line2)] px-3 py-2 text-left font-semibold">
                Nghĩa &amp; ghi nhớ nhanh
              </th>
            </tr>
          </thead>
          <tbody>
            {terms.map(([en, vi], i) => (
              <tr
                key={en}
                className={
                  current === i ? "bg-sky-400/20" : "even:bg-white/[0.04]"
                }
              >
                <td className="border border-[color:var(--line)] px-3 py-1.5 align-top font-semibold text-sky-200 whitespace-nowrap">
                  <SpeakButton text={en} />
                  {en}
                </td>
                <td className="border border-[color:var(--line)] px-3 py-1.5 align-top text-[color:var(--muted)]">
                  {vi}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
