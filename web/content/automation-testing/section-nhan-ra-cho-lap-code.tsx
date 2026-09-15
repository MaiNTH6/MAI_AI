/** Nội dung mục 13.1 — Nhận ra chỗ lặp code. */
export function SectionNhanRaChoLapCode() {
  return (
    <>
      <div className="badge">🏗️ Automation Testing · Chương 13 · Mục 13.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Nhận ra chỗ lặp code
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Nhìn lại Chương 12, dòng gán header <code>Cookie</code> chứa token
        lặp lại ở mọi test cần token (PUT, PATCH, DELETE). Nếu sau này
        Restful-Booker đổi cách xác thực, phải sửa ở TẤT CẢ các test đó.
        Tách ra 1 chỗ duy nhất để sau này chỉ sửa 1 nơi.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Đây là lúc hợp lý để làm việc này — sau khi đã viết đủ test để{" "}
        <strong className="text-[color:var(--ink)]">thấy rõ</strong> chỗ
        nào lặp, thay vì đoán trước và tạo cấu trúc thừa từ đầu (Chương
        4-12 cố tình viết đơn giản trước).
      </p>
    </>
  );
}
