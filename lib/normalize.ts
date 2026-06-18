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
 * - Match nguyên cụm: 100 điểm
 * - Match từng từ: 10 điểm mỗi từ
 */
export function matchScore(query: string, text: string): number {
  const q = normalize(query);
  const t = normalize(text);
  if (!q) return 0;
  if (t.includes(q)) return 100;
  const words = q.split(" ").filter(Boolean);
  return words.reduce((acc, w) => acc + (t.includes(w) ? 10 : 0), 0);
}
