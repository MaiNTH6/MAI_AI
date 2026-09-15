import { CodeBlock, TerminalBlock, ResultBlock } from "@/components/BookBlocks";

/** Nội dung mục 6.2 — Thêm bài test thứ 2. */
export function SectionThemBaiTestThu2() {
  return (
    <>
      <div className="badge">✅ Automation Testing · Chương 6 · Mục 6.2</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Thêm bài test thứ 2
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Sửa file <code>tests/test_01_lien_he_co_ban.py</code> thành đầy đủ
        (thêm hàm thứ 2 kiểm tra trường hợp lỗi validate):
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

    expect(page.get_by_text("Thanks for getting in touch Nguyen Van A!")).to_be_visible()


def test_gui_lien_he_thieu_so_dien_thoai(page: Page):
    """So dien thoai qua ngan (9 chu so) -> trang bao loi validate ro rang, khong gui duoc."""
    page.goto(BASE_URL)
    page.locator("#name").fill("Nguyen Van A")
    page.locator("#email").fill("test@example.com")
    page.locator("#phone").fill("091234567")
    page.locator("#subject").fill("Hoi ve phong Suite")
    page.locator("#description").fill("Toi muon hoi ve gia phong Suite trong thang toi, xin cam on.")
    page.get_by_role("button", name="Submit").click()

    expect(page.get_by_text("Phone must be between 11 and 21 characters.")).to_be_visible()`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Hàm thứ 2 giống hệt cấu trúc hàm 1, chỉ khác: số điện thoại cố tình
        để ngắn (9 chữ số thay vì đủ 11-21), và kiểm tra đúng dòng chữ báo
        lỗi validate hiển thị trên trang.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Chạy toàn bộ file:
      </p>
      <TerminalBlock cmd="pytest tests/test_01_lien_he_co_ban.py -v" />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">Kết quả:</p>
      <ResultBlock
        text={`tests/test_01_lien_he_co_ban.py::test_gui_lien_he_thanh_cong[chromium] PASSED [ 50%]
tests/test_01_lien_he_co_ban.py::test_gui_lien_he_thieu_so_dien_thoai[chromium] PASSED [100%]

============================== 2 passed in 7.78s ==============================`}
        okLines={["PASSED", "passed"]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Đến đây, bạn đã hoàn thành{" "}
        <strong className="text-[color:var(--ink)]">Checkpoint 2</strong> —
        khớp với commit <code>67665ae</code> trên GitHub.
      </p>
    </>
  );
}
