import { CodeBlock, ExplainTable } from "@/components/BookBlocks";

/** Nội dung mục 8.1 — expect(response) chỉ có 2 việc. */
export function SectionExpectResponseChiCo2Viec() {
  return (
    <>
      <div className="badge">🔍 Automation Testing · Chương 8 · Mục 8.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        2 assertion của <code>expect(response)</code>
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Gọi API xong, việc đầu tiên cần biết là:{" "}
        <strong className="text-[color:var(--ink)]">
          request vừa rồi có thành công không?
        </strong>{" "}
        <code>expect(response)</code> trả lời đúng 1 câu hỏi đó — không hơn.
      </p>

      <CodeBlock
        code={`response = api_context.get("/ping")
expect(response).to_be_ok()   # PASS neu status la 200-299, FAIL neu khong`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Chỉ có đúng 2 cách kiểm tra — không nhiều lựa chọn để phải nhớ:
      </p>
      <ExplainTable
        headers={["Assertion", "Kiểm tra gì"]}
        rows={[
          ["expect(response).to_be_ok()", "Status nằm trong khoảng 200-299 (thành công)"],
          ["expect(response).not_to_be_ok()", "Status KHÔNG nằm trong khoảng đó (thất bại)"],
        ]}
      />
    </>
  );
}
