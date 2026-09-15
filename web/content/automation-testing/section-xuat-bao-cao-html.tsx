import { TerminalBlock, ExplainTable, ResultBlock } from "@/components/BookBlocks";

/** Nội dung mục 16.1 — Xuất báo cáo HTML. */
export function SectionXuatBaoCaoHtml() {
  return (
    <>
      <div className="badge">📊 Automation Testing · Chương 16 · Mục 16.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Xuất báo cáo HTML
      </h1>

      <TerminalBlock cmd="pytest --html=report.html --self-contained-html" />

      <ExplainTable
        headers={["Thành phần", "Ý nghĩa"]}
        rows={[
          ["--html=report.html", "Xuất báo cáo ra file report.html"],
          [
            "--self-contained-html",
            "Gói toàn bộ CSS/hình ảnh vào 1 file duy nhất — mở được ngay cả khi gửi file này cho người khác, không cần kèm thư mục phụ",
          ],
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">Kết quả:</p>
      <ResultBlock
        text={`--- Generated html report: file:///D:/MAI/book4-api-automation/report.html ----
23 passed in 19.26s`}
        okLines={["passed"]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Mở <code>report.html</code> bằng trình duyệt — thấy bảng tổng hợp
        PASSED/FAILED của từng test, thời gian chạy, và log chi tiết khi
        bấm vào 1 test cụ thể. Dễ đọc hơn nhiều so với cuộn lại terminal.
      </p>
    </>
  );
}
