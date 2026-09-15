import { CodeBlock, ExplainTable } from "@/components/BookBlocks";

/** Nội dung mục 9.1 — Setup/teardown với yield. */
export function SectionSetupTeardownVoiYield() {
  return (
    <>
      <div className="badge">🔁 Automation Testing · Chương 9 · Mục 9.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Setup/teardown với <code>yield</code>
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Chương này không viết thêm code mới — dùng lại đúng 2 fixture đã có ở
        Chương 7 (<code>api_context</code>, <code>mot_booking_id_co_that</code>)
        để giải thích cơ chế, hoàn thiện{" "}
        <strong className="text-[color:var(--ink)]">Checkpoint 3</strong>.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Chương 7 đã giải thích <strong className="text-[color:var(--ink)]">vì sao</strong>{" "}
        cần fixture (tránh lặp code tạo context ở mỗi test) — chương này đi
        sâu vào <strong className="text-[color:var(--ink)]">cơ chế</strong>{" "}
        fixture hoạt động ra sao.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Nhìn lại <code>api_context</code>:
      </p>
      <CodeBlock
        code={`@pytest.fixture(scope="session")
def api_context(playwright):
    """Tao 1 APIRequestContext dung chung cho ca phien test, gan san base_url."""
    context = playwright.request.new_context(base_url=RESTFUL_BOOKER_URL)
    yield context
    context.dispose()`}
      />

      <ExplainTable
        headers={["Phần", "Chạy khi nào"]}
        rows={[
          ["Trước yield", "Setup — chạy 1 lần trước khi test dùng fixture này bắt đầu"],
          ["yield context", "Trả context cho test dùng"],
          ["Sau yield", "Teardown — chạy sau khi test (hoặc mọi test dùng chung fixture này) đã xong"],
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        <code>mot_booking_id_co_that</code> không có <code>yield</code>, chỉ{" "}
        <code>return</code> — vì không có gì cần dọn dẹp sau khi dùng xong
        (chỉ là 1 con số, không phải tài nguyên như context):
      </p>
      <CodeBlock
        code={`@pytest.fixture
def mot_booking_id_co_that(api_context):
    """Lay 1 bookingid dang ton tai that trong he thong."""
    response = api_context.get("/booking")
    danh_sach = response.json()
    return danh_sach[0]["bookingid"]`}
      />
    </>
  );
}
