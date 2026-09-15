/** Nội dung mục 10.1 — Đọc tài liệu API chính thức. */
export function SectionDocTaiLieuApiChinhThuc() {
  return (
    <>
      <div className="badge">📋 Automation Testing · Chương 10 · Mục 10.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Đọc tài liệu API chính thức
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Tài liệu Restful-Booker nằm tại{" "}
        <a
          href="https://restful-booker.herokuapp.com/apidoc/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[color:var(--metal)] hover:underline"
        >
          restful-booker.herokuapp.com/apidoc/index.html
        </a>{" "}
        — liệt kê từng endpoint kèm method (GET/POST/PUT/PATCH/DELETE), tham
        số cần gửi, và ví dụ response.
      </p>
    </>
  );
}
