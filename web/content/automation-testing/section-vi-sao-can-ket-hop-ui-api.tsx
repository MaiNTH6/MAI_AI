/** Nội dung mục 14.1 — Vì sao cần kết hợp UI + API. */
export function SectionViSaoCanKetHopUiApi() {
  return (
    <>
      <div className="badge">🔗 Automation Testing · Chương 14 · Mục 14.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Vì sao cần kết hợp UI + API
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Trong công việc thật, có 2 lý do hay gặp:
      </p>
      <ul className="mt-4 space-y-3 text-[color:var(--muted)] leading-relaxed">
        <li className="flex gap-2">
          <span className="text-[color:var(--faint)]">–</span>
          <span>
            <strong className="text-[color:var(--ink)]">
              Dùng API dựng dữ liệu nhanh, rồi kiểm tra qua UI
            </strong>{" "}
            — thay vì bấm chuột qua nhiều bước để tạo dữ liệu test, gọi
            thẳng API tạo trong vài trăm mili giây, rồi mở UI xác nhận hiển
            thị đúng.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-[color:var(--faint)]">–</span>
          <span>
            <strong className="text-[color:var(--ink)]">
              Dùng API làm &quot;nguồn sự thật&quot;
            </strong>{" "}
            — gọi API lấy dữ liệu gốc, đối chiếu với những gì UI đang hiển
            thị, để phát hiện UI hiển thị sai lệch với dữ liệu thật.
          </span>
        </li>
      </ul>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Từ chương này, đổi sang{" "}
        <strong className="text-[color:var(--ink)]">
          Restful-Booker Platform
        </strong>{" "}
        (<code>automationintesting.online</code>) — trang có UI thật (đã
        dùng ở Chương 4-6), chạy trên API thật riêng của chính nó (khác hẳn
        Restful-Booker ở Chương 7-13).
      </p>
    </>
  );
}
