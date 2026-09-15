import { CodeBlock, ExplainTable } from "@/components/BookBlocks";

/** Nội dung mục 15.1 — Fixture cho Restful-Booker Platform. */
export function SectionFixtureRestfulBookerPlatform() {
  return (
    <>
      <div className="badge">🧵 Automation Testing · Chương 15 · Mục 15.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Fixture cho Restful-Booker Platform
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        <strong className="text-[color:var(--ink)]">Vì sao cần fixture mới,
        không dùng lại <code>api_context</code>?</strong> Từ Chương 7 tới
        giờ, mọi test đều gọi API của <code>restful-booker.herokuapp.com</code>{" "}
        qua fixture <code>api_context</code>. Nhưng trang UI dùng ở Chương
        4-6 (<code>automationintesting.online</code>) là{" "}
        <strong className="text-[color:var(--ink)]">một ứng dụng hoàn
        toàn khác</strong>, có API riêng của nó. <code>api_context</code> cũ
        đã gắn cứng địa chỉ <code>restful-booker.herokuapp.com</code> nên
        không gọi được sang trang kia — cần tạo 1 fixture mới, trỏ đúng địa
        chỉ mới.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Tệp <code>tests/conftest.py</code> (thêm hằng số và fixture):
      </p>
      <CodeBlock
        filename="tests/conftest.py"
        code={`RESTFUL_BOOKER_PLATFORM_URL = "https://automationintesting.online"`}
      />
      <CodeBlock
        code={`@pytest.fixture(scope="session")
def rbp_api_context(playwright):
    """APIRequestContext rieng cho Restful-Booker Platform (automationintesting.online) -
    day la 1 app KHAC voi Restful-Booker, dung cho phan ket hop UI + API."""
    context = playwright.request.new_context(base_url=RESTFUL_BOOKER_PLATFORM_URL)
    yield context
    context.dispose()`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Giải thích từng dòng lệnh:
      </p>
      <ExplainTable
        rows={[
          [
            'RESTFUL_BOOKER_PLATFORM_URL = "..."',
            "Khai báo địa chỉ gốc của trang UI thành 1 hằng số, để không phải gõ lại chuỗi này nhiều lần",
          ],
          [
            '@pytest.fixture(scope="session")',
            'Đánh dấu đây là fixture, chỉ tạo 1 lần dùng chung cho cả phiên chạy test (khái niệm scope đã học ở Chương 9)',
          ],
          [
            "def rbp_api_context(playwright):",
            "Tên hàm = tên fixture. Nhận playwright — fixture gốc có sẵn, điểm khởi đầu để tạo mọi context (đã học ở Chương 7)",
          ],
          [
            "playwright.request.new_context(base_url=...)",
            "Tạo 1 context gọi API mới, gắn sẵn địa chỉ gốc là trang UI — y hệt cách tạo api_context ở Chương 7, chỉ khác địa chỉ",
          ],
          [
            "yield context",
            "Trả context cho test nào cần dùng (khai báo tham số rbp_api_context)",
          ],
          ["context.dispose()", "Dọn dẹp context sau khi hết phiên test"],
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Nói ngắn gọn: đây chỉ là{" "}
        <strong className="text-[color:var(--ink)]">
          bản sao của kỹ thuật tạo fixture <code>api_context</code> ở Chương 7
        </strong>
        , áp dụng cho 1 trang web khác — đặt tên <code>rbp_api_context</code>{" "}
        (rbp = Restful-Booker <strong className="text-[color:var(--ink)]">P</strong>latform)
        để phân biệt rõ với <code>api_context</code> cũ, tránh nhầm lẫn gọi
        nhầm API.
      </p>
    </>
  );
}
