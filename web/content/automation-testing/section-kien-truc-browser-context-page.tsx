import { ExplainTable } from "@/components/BookBlocks";

/** Nội dung mục 4.1 — Kiến trúc Browser → Context → Page. */
export function SectionKienTrucBrowserContextPage() {
  return (
    <>
      <div className="badge">🌐 Automation Testing · Chương 4 · Mục 4.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Kiến trúc Browser → Context → Page
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Ở Chương 3, tham số <code>page</code> trong test đã được{" "}
        <code>pytest-playwright</code> tự động tạo sẵn — bạn chưa thấy nó
        thực ra gồm 3 lớp lồng nhau:
      </p>

      <ExplainTable
        headers={["Lớp", "Là gì"]}
        rows={[
          ["Browser", "1 trình duyệt đang chạy (Chromium, Firefox, hoặc WebKit)"],
          [
            "Context",
            '1 "phiên duyệt web ẩn danh" riêng biệt trong Browser đó — có cookie, session riêng, không liên quan tới context khác',
          ],
          ["Page", "1 tab cụ thể bên trong 1 Context"],
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        1 Browser có thể chứa nhiều Context (nhiều phiên ẩn danh độc lập),
        mỗi Context có thể chứa nhiều Page (nhiều tab).
      </p>
    </>
  );
}
