import { CodeBlock, ResultBlock, ExplainTable, ConceptBox } from "@/components/BookBlocks";

/** Nội dung mục 8.3 — Đọc lỗi test khi FAILED. */
export function SectionDocLoiTestKhiFailed() {
  return (
    <>
      <div className="badge">🔍 Automation Testing · Chương 8 · Mục 8.3</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Đọc lỗi test khi FAILED
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Thử gọi 1 đường dẫn không tồn tại nhưng lại kiểm tra bằng{" "}
        <code>to_be_ok()</code>:
      </p>

      <CodeBlock
        code={`def test_goi_endpoint_khong_ton_tai(api_context):
    response = api_context.get("/duong-dan-khong-ton-tai")
    expect(response).to_be_ok()`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Chạy, kết quả FAILED (đã lược bớt phần header chi tiết cho gọn):
      </p>
      <ResultBlock
        text={`AssertionError: Response status expected to be within [200..299] range, was '404'
Call log:
→ GET https://restful-booker.herokuapp.com/duong-dan-khong-ton-tai
← 404 Not Found`}
        okLines={[]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        3 phần cần đọc khi 1 test FAILED:
      </p>
      <ExplainTable
        headers={["Phần", "Ý nghĩa"]}
        rows={[
          [
            "AssertionError: ...",
            "Câu tóm tắt: kỳ vọng gì, thực tế là gì — ở đây kỳ vọng 200-299 nhưng thực tế là 404",
          ],
          ["Call log: → GET ...", "Request thật đã gửi — kiểm tra có gọi đúng đường dẫn không"],
          ["← 404 Not Found", "Response thật nhận về"],
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Chỉ cần đọc dòng <code>AssertionError</code> là đủ hiểu sai ở đâu
        trong hầu hết trường hợp — phần <code>Call log</code> hữu ích khi
        cần kiểm tra request có gửi đúng tham số hay không.
      </p>

      <ConceptBox
        items={[
          <span key="1">
            <code>to_be_ok()</code> / <code>not_to_be_ok()</code>: 2
            assertion duy nhất của <code>expect(response)</code>, kiểm tra
            chung là thành công hay thất bại.
          </span>,
          <span key="2">
            <code>response.status</code>: mã HTTP thật (200, 404...), dùng
            với <code>assert</code> thường khi cần kiểm tra đúng 1 mã cụ
            thể.
          </span>,
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Chương sau: fixture — vì sao <code>api_context</code> không cần tự
        tạo lại ở mỗi test, và cách các fixture dùng lại lẫn nhau.
      </p>
    </>
  );
}
