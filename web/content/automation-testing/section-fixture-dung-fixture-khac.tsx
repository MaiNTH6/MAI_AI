import { CodeBlock } from "@/components/BookBlocks";

/** Nội dung mục 9.3 — Fixture dùng fixture khác. */
export function SectionFixtureDungFixtureKhac() {
  return (
    <>
      <div className="badge">🔁 Automation Testing · Chương 9 · Mục 9.3</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Fixture dùng fixture khác
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Để ý tham số của <code>mot_booking_id_co_that</code>:
      </p>

      <CodeBlock code={`def mot_booking_id_co_that(api_context):`} />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        <code>api_context</code> ở đây không phải biến tự đặt — là{" "}
        <strong className="text-[color:var(--ink)]">tên của fixture khác</strong>.
        pytest tự nhận ra và chạy <code>api_context</code> trước, rồi truyền
        kết quả vào. Fixture có thể dùng lại fixture khác theo chuỗi như
        vậy, không giới hạn ở test.
      </p>
    </>
  );
}
