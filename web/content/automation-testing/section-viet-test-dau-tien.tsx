import { CodeBlock, ExplainTable } from "@/components/BookBlocks";

/** Nội dung mục 3.3 — Viết test đầu tiên. */
export function SectionVietTestDauTien() {
  return (
    <>
      <div className="badge">🧪 Automation Testing · Chương 3 · Mục 3.3</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Viết test đầu tiên
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Tạo file <code>pytest.ini</code> để khai báo test nằm ở đâu:
      </p>
      <CodeBlock
        filename="pytest.ini"
        lang="plain"
        code={`[pytest]
testpaths = tests`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Tạo thư mục <code>tests</code>, bên trong tạo file{" "}
        <code>test_00_environment.py</code>:
      </p>
      <CodeBlock
        filename="tests/test_00_environment.py"
        code={`"""Test dau tien - xac nhan Playwright + pytest da cai dat va chay dung."""
from playwright.sync_api import Page, expect


def test_mo_trang_restful_booker(page: Page):
    """Mo trang chu Restful-Booker va kiem tra tieu de trang hien thi dung."""
    page.goto("https://restful-booker.herokuapp.com/")
    expect(page).to_have_title("Welcome to Restful-Booker")`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Giải thích từng dòng lệnh:
      </p>
      <ExplainTable
        rows={[
          [
            "from playwright.sync_api import Page, expect",
            "Nạp 2 thứ cần dùng từ thư viện Playwright: kiểu dữ liệu Page và hàm kiểm tra expect",
          ],
          [
            "def test_mo_trang_restful_booker(page: Page):",
            "Tên hàm bắt đầu bằng test_ để pytest tự nhận diện. page: Page là type hint — ghi chú page sẽ có kiểu Page, giúp VS Code gợi ý code chính xác hơn, không ảnh hưởng lúc chạy",
          ],
          [
            "page (tham số)",
            "Không do bạn tạo ra — plugin pytest-playwright tự động cấp sẵn 1 trình duyệt đang mở, gọi là fixture. Học kỹ hơn ở Chương 9",
          ],
          ["page.goto(...)", "Điều hướng trình duyệt tới địa chỉ chỉ định"],
          [
            "expect(page).to_have_title(...)",
            "Kiểm tra tiêu đề trang đúng như mong đợi. Đây là web-first assertion của Playwright — tự động chờ trang tải xong trước khi so sánh, khác assert thường của Python (Chương 8 sẽ so sánh kỹ hơn)",
          ],
        ]}
      />
    </>
  );
}
