import { ExplainTable, ConceptBox } from "@/components/BookBlocks";

/** Nội dung mục 6.3 — Vài assertion hay dùng khác. */
export function SectionVaiAssertionHayDungKhac() {
  return (
    <>
      <div className="badge">✅ Automation Testing · Chương 6 · Mục 6.3</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Vài assertion hay dùng khác
      </h1>

      <ExplainTable
        headers={["Assertion", "Kiểm tra gì"]}
        rows={[
          ["expect(locator).to_be_visible()", "Phần tử hiển thị trên trang"],
          ['expect(locator).to_have_text("...")', "Nội dung chữ khớp CHÍNH XÁC"],
          [
            'expect(locator).to_contain_text("...")',
            "Nội dung chữ CHỨA đoạn chỉ định (không cần khớp hết)",
          ],
          ['expect(page).to_have_title("...")', "Tiêu đề trang (đã dùng ở Chương 3)"],
        ]}
      />

      <ConceptBox
        items={[
          <span key="1">
            <strong className="text-[color:var(--ink)]">
              Web-first assertion
            </strong>
            : cách kiểm tra tự chờ điều kiện đúng trong 1 khoảng thời gian,
            thay vì kiểm tra 1 lần ngay lập tức như <code>assert</code>{" "}
            thường.
          </span>,
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Chương sau: bắt đầu Phần 3 — Playwright cho API testing, dùng{" "}
        <code>APIRequestContext</code> để gọi thẳng API không cần mở trình
        duyệt.
      </p>
    </>
  );
}
