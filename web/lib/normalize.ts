/**
 * Bỏ dấu tiếng Việt + lowercase để search/match tương đối.
 * "Tôi đã thử Gamma AI" → "toi da thu gamma ai"
 */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // bỏ dấu combining marks
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s]/g, " ") // bỏ ký tự đặc biệt
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Trả về điểm match cho query vs text. Càng cao càng khớp.
 * - Match nguyên cụm: 100 điểm.
 * - Match từng TỪ (nguyên từ, không tính chuỗi con — để "ai" không dính vào "tài liệu"):
 *   cộng điểm theo độ dài từ (tối đa 12) → từ đặc thù như "requirement" (11)
 *   được ưu tiên hơn từ ngắn/phổ biến như "ai" (2), "đọc" (3).
 */
export function matchScore(query: string, text: string): number {
  const q = normalize(query);
  const t = normalize(text);
  if (!q) return 0;
  if (t.includes(q)) return 100;
  const textWords = new Set(t.split(" ").filter(Boolean));
  const qWords = q.split(" ").filter(Boolean);
  return qWords.reduce(
    (acc, w) => acc + (textWords.has(w) ? Math.min(w.length, 12) : 0),
    0
  );
}
