import { CodeBlock, ExplainTable } from "@/components/BookBlocks";

/** Nội dung mục 5.1 — Locator là gì. */
export function SectionLocatorLaGi() {
  return (
    <>
      <div className="badge">🎯 Automation Testing · Chương 5 · Mục 5.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Locator là gì
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Từ chương này quay lại dùng dự án <code>book4-api-automation</code>{" "}
        và <code>pytest</code> (như Chương 3), không còn viết script{" "}
        <code>sync_playwright</code> thủ công như Chương 4.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Locator là 1 &quot;công thức tìm&quot; phần tử trên trang — không tìm
        ngay lúc gọi, mà tìm LẠI mỗi lần bạn thao tác (<code>fill</code>,{" "}
        <code>click</code>...). Nhờ vậy nếu trang đang tải hay phần tử chưa
        xuất hiện kịp, Playwright tự tìm lại thay vì báo lỗi ngay.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Cách tạo locator theo id của phần tử HTML:
      </p>
      <CodeBlock code={`page.locator("#name")`} />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        <code>#name</code> là CSS selector — dấu <code>#</code> nghĩa là tìm
        theo thuộc tính <code>id=&quot;name&quot;</code>.
      </p>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Ngoài CSS selector, Playwright còn có nhóm hàm <code>get_by_*</code>{" "}
        — tìm theo cách người dùng thật nhìn thấy trang (vai trò, chữ hiển
        thị...) thay vì phụ thuộc cấu trúc HTML. Vài locator hay dùng nhất:
      </p>
      <ExplainTable
        headers={["Locator", "Tìm theo gì"]}
        rows={[
          ['page.locator("#id" hoặc ".class")', "CSS selector — id, class, thẻ HTML"],
          ['page.get_by_role("button", name="Submit")', "Vai trò (role) + tên hiển thị — cách được khuyến khích nhất"],
          ['page.get_by_text("Xin chào")', "Đoạn chữ hiển thị trên trang"],
          ['page.get_by_label("Email")', 'Nhãn <label> gắn với ô nhập'],
          ['page.get_by_placeholder("Nhập email")', "Chữ gợi ý (placeholder) trong ô nhập"],
          ['page.get_by_test_id("submit-btn")', 'Thuộc tính data-testid — ổn định nhất, không đổi khi sửa giao diện'],
        ]}
      />
      <p className="mt-3 text-sm text-[color:var(--faint)] leading-relaxed">
        Thứ tự ưu tiên Playwright khuyến nghị:{" "}
        <code>get_by_role</code> / <code>get_by_test_id</code> trước tiên (ổn
        định, gần với người dùng thật) — CSS selector theo id/class chỉ nên
        dùng khi trang không có role hoặc test id rõ ràng.
      </p>
    </>
  );
}
