import { CodeBlock, ExplainTable, TerminalBlock, ResultBlock } from "@/components/BookBlocks";

/** Nội dung mục 7.3 — Gọi GET đơn giản. */
export function SectionGoiGetDonGian() {
  return (
    <>
      <div className="badge">🔌 Automation Testing · Chương 7 · Mục 7.3</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Gọi GET đơn giản
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Tệp <code>tests/test_02_api_co_ban.py</code>:
      </p>
      <CodeBlock
        filename="tests/test_02_api_co_ban.py"
        code={`"""Demo Playwright cho API testing: APIRequestContext, request.get/post, expect(response), fixture."""
from playwright.sync_api import expect


def test_ping_xac_nhan_api_con_song(api_context):
    """GET /ping phai tra ve trang thai OK (201) - buoc kiem tra suc khoe co ban truoc khi test sau."""
    response = api_context.get("/ping")
    expect(response).to_be_ok()`}
      />

      <ExplainTable
        rows={[
          [
            "def test_ping_xac_nhan_api_con_song(api_context):",
            "api_context là fixture vừa tạo ở mục 7.2 — pytest tự truyền vào",
          ],
          ['api_context.get("/ping")', "Gửi HTTP GET tới /ping (ghép với base_url đã gán sẵn)"],
          [
            "expect(response).to_be_ok()",
            "Kiểm tra response có status thành công (2xx). Chi tiết về expect(response) sẽ học kỹ ở Chương 8",
          ],
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Để ý: docstring ghi &quot;phải trả 201&quot;, nhưng{" "}
        <code>to_be_ok()</code> chỉ kiểm tra status nằm trong khoảng 200-299
        nói chung —{" "}
        <strong className="text-[color:var(--ink)]">không</strong>{" "}
        khẳng định đúng con số 201 cụ thể (200 hay 204 cũng sẽ PASS). Ở đây
        chỉ cần
        biết &quot;API còn sống&quot;, nên dùng kiểm tra lỏng là đủ. Muốn
        khẳng định đúng chính xác mã 201, phải dùng{" "}
        <code>assert response.status == 201</code> — cách làm này học ở
        Chương 8.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">Chạy:</p>
      <TerminalBlock cmd="pytest tests/test_02_api_co_ban.py::test_ping_xac_nhan_api_con_song -v" />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">Kết quả:</p>
      <ResultBlock
        text={`tests/test_02_api_co_ban.py::test_ping_xac_nhan_api_con_song PASSED      [100%]

============================== 1 passed in 1.58s ==============================`}
        okLines={["PASSED", "passed"]}
      />
    </>
  );
}
