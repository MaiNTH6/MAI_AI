import { CodeBlock, ExplainTable } from "@/components/BookBlocks";

/** Nội dung mục 7.2 — Tạo APIRequestContext bằng fixture. */
export function SectionTaoApirequestcontextBangFixture() {
  return (
    <>
      <div className="badge">🔌 Automation Testing · Chương 7 · Mục 7.2</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Tạo <code>APIRequestContext</code> bằng fixture
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        <strong className="text-[color:var(--ink)]">
          Vì sao cần fixture ở đây?
        </strong>{" "}
        Nếu không dùng fixture, mỗi test muốn gọi API đều phải tự viết lại
        dòng tạo context:
      </p>

      <CodeBlock
        code={`def test_khong_dung_fixture(playwright):
    context = playwright.request.new_context(base_url="https://restful-booker.herokuapp.com")
    response = context.get("/ping")
    # ... dung xong con phai tu goi context.dispose()`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Có 10 test thì lặp lại đoạn này 10 lần. Fixture cho phép viết đúng 1
        lần, pytest tự &quot;tiêm&quot; (inject) vào bất kỳ test nào khai báo
        tên tham số trùng tên fixture — chỉ cần viết{" "}
        <code>def test_x(api_context):</code> là có sẵn context dùng ngay,
        không cần tạo lại.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        <strong className="text-[color:var(--ink)]">
          Khi nào nên tách 1 đoạn thành fixture?
        </strong>{" "}
        Khi thấy nhiều test cùng cần chung 1 thứ để chuẩn bị trước — 1 kết
        nối, 1 lần đăng nhập, 1 dữ liệu mẫu. Dấu hiệu rõ nhất: bạn thấy mình
        sắp copy-paste cùng 1 đoạn setup sang test thứ 2, thứ 3.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Tệp <code>tests/conftest.py</code>:
      </p>
      <CodeBlock
        filename="tests/conftest.py"
        code={`"""Fixture dung chung cho cac test API tren Restful-Booker."""
import pytest

RESTFUL_BOOKER_URL = "https://restful-booker.herokuapp.com"


@pytest.fixture(scope="session")
def api_context(playwright):
    """Tao 1 APIRequestContext dung chung cho ca phien test, gan san base_url."""
    context = playwright.request.new_context(base_url=RESTFUL_BOOKER_URL)
    yield context
    context.dispose()`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Giải thích từng dòng lệnh:
      </p>
      <ExplainTable
        rows={[
          [
            '@pytest.fixture(scope="session")',
            'Đánh dấu hàm bên dưới là 1 fixture — tự động cấp cho test nào cần. scope="session" nghĩa là chỉ tạo 1 lần cho cả phiên chạy test, không tạo lại mỗi test. Giải thích kỹ hơn ở Chương 9',
          ],
          [
            "def api_context(playwright):",
            "playwright cũng là 1 fixture có sẵn từ pytest-playwright — điểm khởi đầu để tạo mọi thứ khác",
          ],
          [
            "playwright.request.new_context(base_url=...)",
            "Tạo 1 APIRequestContext mới, gán sẵn địa chỉ gốc — các lệnh gọi sau chỉ cần ghi đường dẫn ngắn (vd /ping)",
          ],
          ["yield context", "Trả context cho test dùng. Code sau yield sẽ chạy sau khi test xong"],
          ["context.dispose()", "Giải phóng context khi hết phiên test"],
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        File <code>conftest.py</code> là tên đặc biệt pytest tự nhận diện —
        mọi fixture khai báo ở đây dùng được cho toàn bộ file test trong cùng
        thư mục, không cần <code>import</code>.
      </p>
    </>
  );
}
