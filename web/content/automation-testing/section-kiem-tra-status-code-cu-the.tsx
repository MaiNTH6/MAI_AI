import { CodeBlock, ResultBlock } from "@/components/BookBlocks";

/** Nội dung mục 8.2 — Kiểm tra 1 status code cụ thể. */
export function SectionKiemTraStatusCodeCuThe() {
  return (
    <>
      <div className="badge">🔍 Automation Testing · Chương 8 · Mục 8.2</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Kiểm tra 1 status code cụ thể
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Muốn kiểm tra ĐÚNG 1 mã cụ thể (vd phải là 404, không phải &quot;bất
        kỳ mã lỗi nào&quot;), <code>expect(response)</code> không có sẵn
        cách làm — dùng <code>assert</code> thường của Python với{" "}
        <code>response.status</code>:
      </p>

      <CodeBlock
        code={`def test_id_khong_ton_tai_tra_404(api_context):
    response = api_context.get("/booking/999999999")
    assert response.status == 404  # xac nhan dung ma loi 404, khong phai ma khac`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">Kết quả:</p>
      <ResultBlock
        text="tests/zz_temp_check3.py::test_id_khong_ton_tai_tra_404 PASSED            [100%]"
        okLines={["PASSED"]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Cách dùng trong sách từ đây: <code>expect(response).to_be_ok()</code>{" "}
        khi chỉ cần biết &quot;có thành công không&quot;,{" "}
        <code>assert response.status == &lt;mã cụ thể&gt;</code> khi cần
        đúng 1 mã chính xác — cả 2 sẽ dùng xen kẽ ở Phần 4.
      </p>
    </>
  );
}
