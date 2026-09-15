import { TerminalBlock, CodeBlock, ExplainTable } from "@/components/BookBlocks";

/** Nội dung mục 3.1 — Tạo dự án và cài đặt. */
export function SectionTaoDuAnCaiDat() {
  return (
    <>
      <div className="badge">🧪 Automation Testing · Chương 3 · Mục 3.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Tạo dự án và cài đặt
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Từ chương này, bạn dùng dự án thật trên GitHub:{" "}
        <a
          href="https://github.com/mmai99/book4-api-automation"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[color:var(--metal)] hover:underline"
        >
          github.com/mmai99/book4-api-automation
        </a>
        . Mỗi chương thực hành ứng với 1 lần commit trong repo, gọi là 1{" "}
        <strong className="text-[color:var(--ink)]">Checkpoint</strong> — nếu
        code bạn gõ không chạy đúng, mở đúng commit đó trên GitHub để đối
        chiếu. Chương này ứng với{" "}
        <strong className="text-[color:var(--ink)]">Checkpoint 1</strong>.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Tạo 1 thư mục mới (khác thư mục luyện tập Chương 1-2), ví dụ{" "}
        <code>D:\book4-api-automation</code>, mở bằng VS Code, mở Terminal. Có
        3 việc cần cài: môi trường ảo, thư viện Python, trình duyệt cho
        Playwright.
      </p>

      <h3 className="mt-8 text-base font-bold text-[color:var(--ink)]">
        a) Tạo môi trường ảo (như Chương 1)
      </h3>
      <TerminalBlock
        cmd={`python -m venv .venv
.venv\\Scripts\\activate`}
      />

      <h3 className="mt-8 text-base font-bold text-[color:var(--ink)]">
        b) Cài thư viện Python
      </h3>
      <CodeBlock
        filename="requirements.txt"
        lang="plain"
        code={`playwright==1.62.0
pytest==9.1.1
pytest-playwright==0.9.0
pytest-html==4.2.0`}
      />

      <ExplainTable
        headers={["Thư viện", "Dùng để làm gì"]}
        rows={[
          ["playwright", "Thư viện chính, điều khiển trình duyệt và gọi API"],
          ["pytest", "Công cụ chạy test (mục 3.2)"],
          ["pytest-playwright", "Plugin nối Playwright với pytest"],
          ["pytest-html", "Xuất báo cáo kết quả — dùng ở Chương 16"],
        ]}
      />

      <TerminalBlock cmd="pip install -r requirements.txt" />

      <h3 className="mt-8 text-base font-bold text-[color:var(--ink)]">
        c) Cài trình duyệt cho Playwright
      </h3>
      <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
        Chỉ cần làm 1 lần, mất vài phút tuỳ mạng:
      </p>
      <TerminalBlock cmd="playwright install chromium" />
    </>
  );
}
