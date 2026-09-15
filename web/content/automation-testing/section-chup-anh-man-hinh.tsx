import { CodeBlock, ExplainTable, ConceptBox } from "@/components/BookBlocks";

/** Nội dung mục 4.3 — Chụp ảnh màn hình. */
export function SectionChupAnhManHinh() {
  return (
    <>
      <div className="badge">🌐 Automation Testing · Chương 4 · Mục 4.3</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Chụp ảnh màn hình
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Thêm 1 dòng trước <code>browser.close()</code>:
      </p>

      <CodeBlock
        code={`from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    context = browser.new_context()
    page = context.new_page()

    page.goto("https://automationintesting.online/")
    print(page.title())

    page.screenshot(path="anh_trang_chu.png")

    browser.close()`}
      />

      <ExplainTable
        rows={[
          [
            'page.screenshot(path="anh_trang_chu.png")',
            "Chụp ảnh trang đang hiển thị, lưu vào file anh_trang_chu.png cùng thư mục",
          ],
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Chạy lại <code>python mo_trinh_duyet.py</code>, mở file{" "}
        <code>anh_trang_chu.png</code> vừa xuất hiện trong thư mục — đúng ảnh
        trang <code>automationintesting.online</code> lúc đó.
      </p>

      <ConceptBox
        items={[
          <span key="1">
            <strong className="text-[color:var(--ink)]">
              Browser / Context / Page
            </strong>
            : 3 lớp kiến trúc của Playwright, lồng nhau theo thứ tự Browser →
            Context → Page.
          </span>,
          <span key="2">
            <code>sync_playwright()</code>: cách khởi động Playwright thủ
            công, không qua pytest — dùng để hiểu rõ những gì fixture{" "}
            <code>page</code> ở Chương 3 đã làm sẵn.
          </span>,
          <span key="3">
            <code>headless</code>: <code>True</code> (mặc định) chạy ẩn,{" "}
            <code>False</code> hiện cửa sổ thật.
          </span>,
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Chương sau: locator — cách Playwright tìm phần tử trên trang, và các
        thao tác cơ bản như click, điền form.
      </p>
    </>
  );
}
