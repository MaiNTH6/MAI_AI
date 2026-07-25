"use client";

/**
 * Nút loa đọc phát âm tiếng Anh bằng Web Speech API (SpeechSynthesis) của trình duyệt.
 * Dùng cho box "Thuật ngữ Anh–Việt" — click để nghe cách đọc term.
 */
export function SpeakButton({ text }: { text: string }) {
  function speak() {
    try {
      const synth = window.speechSynthesis;
      if (!synth) return;
      synth.cancel(); // dừng câu đang đọc (nếu có)
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      u.rate = 0.9;
      synth.speak(u);
    } catch {
      /* trình duyệt không hỗ trợ — bỏ qua */
    }
  }

  return (
    <button
      type="button"
      onClick={speak}
      aria-label={`Nghe phát âm "${text}"`}
      title="Nghe phát âm"
      className="mr-1.5 inline-flex align-middle text-sky-300 hover:text-sky-100 focus:outline-none focus:text-sky-100"
    >
      🔊
    </button>
  );
}
