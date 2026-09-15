import { CodeBlock, ExplainTable, TerminalBlock, ResultBlock, ConceptBox } from "@/components/BookBlocks";

/** Nội dung mục 5.3 — Viết bài test UI đầu tiên. */
export function SectionVietBaiTestUiDauTien() {
  return (
    <>
      <div className="badge">🎯 Automation Testing · Chương 5 · Mục 5.3</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Viết bài test UI đầu tiên
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Trang &quot;Send Us a Message&quot; của{" "}
        <code>automationintesting.online</code> có form liên hệ — dùng làm
        bài thực hành đầu tiên vì không cần đăng nhập.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Tạo thư mục <code>tests</code>, file{" "}
        <code>tests/test_01_lien_he_co_ban.py</code>:
      </p>

      <CodeBlock
        filename="tests/test_01_lien_he_co_ban.py"
        code={`"""Demo Playwright UI co ban: locator theo id, dien form, click, va web-first assertion expect(page)."""
from playwright.sync_api import Page, expect

BASE_URL = "https://automationintesting.online/"


def test_gui_lien_he_thanh_cong(page: Page):
    """Dien du va dung dinh dang -> trang hien thi loi cam on dung ten nguoi gui."""
    page.goto(BASE_URL)
    page.locator("#name").fill("Nguyen Van A")
    page.locator("#email").fill("test@example.com")
    page.locator("#phone").fill("0912345678901")
    page.locator("#subject").fill("Hoi ve phong Suite")
    page.locator("#description").fill("Toi muon hoi ve gia phong Suite trong thang toi, xin cam on.")
    page.get_by_role("button", name="Submit").click()

    expect(page.get_by_text("Thanks for getting in touch Nguyen Van A!")).to_be_visible()`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Giải thích từng dòng lệnh:
      </p>
      <ExplainTable
        rows={[
          ['BASE_URL = "..."', "Hằng số lưu địa chỉ trang, tránh gõ lại nhiều lần"],
          ["page.goto(BASE_URL)", "Mở trang"],
          ['page.locator("#name").fill("...")', "Tìm ô nhập theo id name, điền giá trị vào"],
          [
            'page.locator("#email") ... .locator("#description")',
            "Tương tự, điền các ô Email/Phone/Subject/Message theo đúng id",
          ],
          [
            'page.get_by_role("button", name="Submit")',
            'Tìm nút bấm theo vai trò (button) và tên hiển thị ("Submit") — cách tìm được Playwright khuyến khích, vì gần với cách người dùng thật nhìn thấy trang, không phụ thuộc cấu trúc HTML bên trong',
          ],
          [".click()", "Bấm vào nút vừa tìm được"],
          [
            "expect(...).to_be_visible()",
            "Kiểm tra dòng chữ cảm ơn xuất hiện — chi tiết về expect sẽ học kỹ ở Chương 6",
          ],
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">Chạy:</p>
      <TerminalBlock cmd="pytest tests/test_01_lien_he_co_ban.py -v" />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">Kết quả:</p>
      <ResultBlock
        text={`tests/test_01_lien_he_co_ban.py::test_gui_lien_he_thanh_cong[chromium] PASSED [100%]

============================== 1 passed in 8.37s ==============================`}
        okLines={["PASSED", "passed"]}
      />

      <ConceptBox
        items={[
          <span key="1">
            <strong className="text-[color:var(--ink)]">Locator</strong>:
            công thức tìm phần tử, tự tìm lại mỗi lần thao tác thay vì tìm 1
            lần rồi lưu cố định.
          </span>,
          <span key="2">
            <strong className="text-[color:var(--ink)]">Auto-wait</strong>:
            Playwright tự chờ phần tử sẵn sàng trước khi thao tác, không cần
            tự viết <code>sleep()</code>.
          </span>,
          <span key="3">
            <code>get_by_role</code>: tìm phần tử theo vai trò + tên hiển thị
            — cách tìm được khuyến khích hơn CSS selector khi có thể dùng
            được.
          </span>,
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Chương sau: thêm bài test thứ 2 (trường hợp lỗi) và tìm hiểu kỹ{" "}
        <code>expect()</code> — web-first assertion của Playwright, hoàn
        thiện Checkpoint 2.
      </p>
    </>
  );
}
