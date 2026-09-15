import { CodeBlock, ExplainTable, TerminalBlock, ResultBlock } from "@/components/BookBlocks";

/** Nội dung mục 4.2 — Tự mở trình duyệt bằng code. */
export function SectionTuMoTrinhDuyetBangCode() {
  return (
    <>
      <div className="badge">🌐 Automation Testing · Chương 4 · Mục 4.2</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Tự mở trình duyệt bằng code
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Tạo file mới <code>mo_trinh_duyet.py</code>:
      </p>

      <CodeBlock
        code={`from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    context = browser.new_context()
    page = context.new_page()

    page.goto("https://automationintesting.online/")
    print(page.title())

    browser.close()`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Giải thích từng dòng lệnh:
      </p>
      <ExplainTable
        rows={[
          ["from playwright.sync_api import sync_playwright", "Nạp hàm khởi động Playwright"],
          [
            "with sync_playwright() as p:",
            "Khởi động Playwright, gán vào biến p. with đảm bảo dọn dẹp đúng cách khi xong (giống with open(...) ở Chương 2)",
          ],
          [
            "p.chromium.launch(headless=False)",
            "Mở 1 Browser Chromium. headless=False để hiện cửa sổ thật lên màn hình — mặc định Playwright chạy ẩn (headless=True), như test ở Chương 3",
          ],
          ["browser.new_context()", "Tạo 1 Context mới"],
          ["context.new_page()", "Tạo 1 Page (tab) mới trong context đó"],
          ["page.goto(...)", "Điều hướng tab tới địa chỉ"],
          [
            "page.title()",
            "Lấy tiêu đề trang hiện tại (khác expect(page).to_have_title(...) ở Chương 3 — đây trả về chuỗi để bạn tự dùng, không tự kiểm tra đúng/sai)",
          ],
          ["browser.close()", "Đóng trình duyệt"],
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">Chạy:</p>
      <TerminalBlock cmd="python mo_trinh_duyet.py" />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Bạn sẽ thấy 1 cửa sổ Chromium thật mở lên, load trang, rồi tự đóng
        lại. Kết quả in ra:
      </p>
      <ResultBlock text="Restful-booker-platform demo" okLines={[]} />
    </>
  );
}
