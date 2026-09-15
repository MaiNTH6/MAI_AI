import { TerminalBlock, ResultBlock, ConceptBox, ExplainTable } from "@/components/BookBlocks";

/** Nội dung mục 3.4 — Chạy test. */
export function SectionChayTest() {
  return (
    <>
      <div className="badge">🧪 Automation Testing · Chương 3 · Mục 3.4</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Chạy test
      </h1>

      <TerminalBlock cmd="pytest -v" />
      <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
        <code>-v</code> (verbose) để hiện chi tiết từng test thay vì chỉ hiện
        tổng kết.
      </p>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Kết quả (đã lược bớt vài dòng thông tin hệ thống ở đầu cho gọn):
      </p>
      <ResultBlock
        text={`collected 1 item

tests/test_00_environment.py::test_mo_trang_restful_booker[chromium] PASSED [100%]

============================== 1 passed in 4.03s ==============================`}
        okLines={["PASSED", "passed"]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        <code>[chromium]</code> là tên trình duyệt test vừa chạy —{" "}
        <code>pytest-playwright</code> tự thêm vào tên test, vì 1 test có thể
        chạy trên nhiều trình duyệt khác nhau. <code>PASSED</code> nghĩa là{" "}
        <code>expect(...)</code>{" "}
        ở trên đúng như mong đợi — trang thật đã mở và có đúng tiêu đề
        &quot;Welcome to Restful-Booker&quot;.
      </p>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Vài biến thể lệnh <code>pytest</code> khác cũng hay dùng:
      </p>
      <ExplainTable
        headers={["Lệnh", "Tác dụng"]}
        rows={[
          ["pytest tests/test_00_environment.py", "Chỉ chạy 1 file cụ thể"],
          ['pytest -k "chao_hoi"', "Chỉ chạy các test có tên chứa từ khoá"],
          ["pytest -x", "Dừng ngay khi gặp test đầu tiên FAILED"],
        ]}
      />

      <ConceptBox
        items={[
          <span key="1">
            <code>pytest</code>: công cụ chạy test, tự tìm và báo
            PASSED/FAILED.
          </span>,
          <span key="2">
            <strong className="text-[color:var(--ink)]">Type hint</strong> (
            <code>page: Page</code>): ghi chú kiểu dữ liệu cho tham số, chỉ để
            hỗ trợ đọc code và gợi ý trong VS Code.
          </span>,
          <span key="3">
            <strong className="text-[color:var(--ink)]">Fixture</strong>: dữ
            liệu/tài nguyên pytest tự động cấp sẵn cho test (ở đây là{" "}
            <code>page</code> — 1 trình duyệt đang mở), không cần tự tạo.
          </span>,
          <span key="4">
            <strong className="text-[color:var(--ink)]">
              Web-first assertion
            </strong>{" "}
            (<code>expect(...)</code>): cách kiểm tra riêng của Playwright, tự
            chờ trang sẵn sàng trước khi so sánh.
          </span>,
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Chương sau: Playwright cơ bản cho UI — kiến trúc Browser/Context/Page,
        locator, thao tác click/điền form.
      </p>
    </>
  );
}
