import { CodeBlock, ExplainTable } from "@/components/BookBlocks";

/** Nội dung mục 16.3 — Chạy tự động bằng GitHub Actions (CI). Mục cuối cùng của sách. */
export function SectionChayTuDongGithubActionsCi() {
  return (
    <>
      <div className="badge">📊 Automation Testing · Chương 16 · Mục 16.3</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Chạy tự động bằng GitHub Actions (CI)
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        <strong className="text-[color:var(--ink)]">CI</strong> (Continuous
        Integration) nghĩa là: mỗi khi có code mới đẩy lên GitHub, 1 máy
        chủ tự động tải code về và chạy toàn bộ test — không cần tự mở
        máy, tự gõ <code>pytest</code>. Nếu có test FAILED, biết ngay mà
        không phải đợi ai đó phát hiện.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Tạo file <code>.github/workflows/tests.yml</code>:
      </p>

      <CodeBlock
        filename=".github/workflows/tests.yml"
        lang="plain"
        code={`name: Chay test tu dong

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Lay code ve
        uses: actions/checkout@v4

      - name: Cai Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.13"

      - name: Cai thu vien Python
        run: pip install -r requirements.txt

      - name: Cai trinh duyet cho Playwright
        run: playwright install --with-deps chromium

      - name: Chay toan bo test, xuat bao cao HTML
        run: pytest --html=report.html --self-contained-html

      - name: Luu bao cao HTML lam artifact
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: bao-cao-test
          path: report.html`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Giải thích các phần chính (file này viết bằng YAML — định dạng cấu
        hình dùng thụt lề để phân cấp, khác Python nhưng nguyên tắc thụt lề
        tương tự):
      </p>
      <ExplainTable
        headers={["Phần", "Ý nghĩa"]}
        rows={[
          ["on: push: branches: [main]", "Tự chạy mỗi khi có code mới đẩy lên nhánh main"],
          ["runs-on: ubuntu-latest", "Máy chủ chạy trên Linux (GitHub cấp miễn phí)"],
          [
            "steps:",
            "Danh sách các bước chạy tuần tự, giống các lệnh terminal đã gõ tay ở Chương 3",
          ],
          ["uses: actions/checkout@v4", "Bước có sẵn của GitHub: tải code về máy chủ"],
          [
            "run: pip install -r requirements.txt",
            "Chạy đúng lệnh terminal đã quen thuộc từ Chương 3",
          ],
          [
            "if: always()",
            "Vẫn lưu báo cáo dù test FAILED (mặc định GitHub bỏ qua bước sau khi có lỗi)",
          ],
          [
            "uses: actions/upload-artifact@v4",
            "Lưu file report.html để tải về xem sau, từ tab Actions trên GitHub",
          ],
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Đẩy code lên GitHub (<code>git push</code>), vào tab{" "}
        <strong className="text-[color:var(--ink)]">Actions</strong> của
        repo — thấy quy trình tự chạy, và tải được <code>report.html</code>{" "}
        từ đó.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Đến đây, bạn đã hoàn thành{" "}
        <strong className="text-[color:var(--ink)]">Checkpoint 8</strong> —
        checkpoint cuối, khớp với commit <code>8f808ae</code> trên GitHub
        (phần Allure Report ở mục 16.2 là 1 commit bổ sung riêng,{" "}
        <code>15f986a</code>, không bắt buộc để có CI chạy được).
      </p>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        📌 Tổng kết cả cuốn sách
      </h2>
      <ExplainTable
        headers={["Checkpoint", "Chương", "Commit"]}
        rows={[
          ["1", "1-3", "6f21220"],
          ["2", "4-6", "67665ae"],
          ["3", "7-9", "fdf2bde"],
          ["4", "10-11", "3991013"],
          ["5", "12", "08a3fa3"],
          ["6", "13", "07f8aba"],
          ["7", "14-15", "e76c97b"],
          ["8", "16", "8f808ae"],
          ["(bổ sung)", "16.2 — Allure Report", "15f986a"],
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Toàn bộ dự án:{" "}
        <a
          href="https://github.com/mmai99/book4-api-automation"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[color:var(--metal)] hover:underline"
        >
          github.com/mmai99/book4-api-automation
        </a>{" "}
        — 23 test, dùng Python + Playwright test cả UI lẫn API trên 2 dịch
        vụ luyện tập thật, có CI tự động.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Bước tiếp theo, nếu muốn đi xa hơn: thử áp dụng đúng quy trình này
        (đọc tài liệu → gọi thử xác nhận hành vi thật → lập test case →
        viết test → chuẩn hoá framework) cho 1 API thật khác — của công ty
        bạn đang làm, hoặc 1 API luyện tập công khai khác. Quy trình quan
        trọng hơn bất kỳ đoạn code cụ thể nào trong sách.
      </p>
    </>
  );
}
