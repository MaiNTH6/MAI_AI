/** Nội dung mục 7.1 — APIRequestContext là gì. */
export function SectionApirequestcontextLaGi() {
  return (
    <>
      <div className="badge">🔌 Automation Testing · Chương 7 · Mục 7.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        <code>APIRequestContext</code> là gì
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Từ chương này, dự án chuyển hướng thực hành: dùng{" "}
        <strong className="text-[color:var(--ink)]">Restful-Booker</strong> (
        <code>restful-booker.herokuapp.com</code>) thay vì Restful-Booker
        Platform ở Chương 4-6 — đây là API luyện tập riêng, có endpoint đăng
        nhập và quản lý booking.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Ở Chương 4-6, <code>Page</code> mở cả 1 trình duyệt: tải HTML, CSS,
        JS, render giao diện — rồi mới thao tác được. <code>APIRequestContext</code>{" "}
        bỏ qua hết phần đó, chỉ gửi thẳng 1 HTTP request và nhận response —
        nhanh hơn nhiều vì không cần trình duyệt.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        So sánh thời gian chạy thật: 1 test UI đơn giản ở Chương 3 mất{" "}
        <strong className="text-[color:var(--ink)]">4.03 giây</strong>; 1 test
        gọi thẳng API (mục 7.3) chỉ mất{" "}
        <strong className="text-[color:var(--ink)]">1.58 giây</strong>.
      </p>
    </>
  );
}
