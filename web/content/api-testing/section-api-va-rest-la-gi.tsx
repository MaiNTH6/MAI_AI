import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 1.1 — API và REST là gì. */
export function SectionApiVaRestLaGi() {
  return (
    <>
      <div className="badge">🌐 API Testing · Chương 1 · Mục 1.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        API và REST là gì
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          hiểu API, resource, endpoint là gì, và REST khác gì với việc chỉ
          &quot;dùng HTTP + JSON&quot; — nền tảng bắt buộc trước khi học cách
          test.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Khái niệm cốt lõi
      </h2>
      <div className="mt-4 space-y-3 text-[color:var(--muted)] leading-relaxed">
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">API</strong> (Application
          Programming Interface) là tập hợp quy tắc cho phép 2 hệ thống giao
          tiếp với nhau — ví dụ ứng dụng bán hàng gọi tới hệ thống kho để kiểm
          tra tồn kho.
        </p>
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">Resource</strong> (tài
          nguyên) là một đối tượng dữ liệu mà API thao tác lên — ví dụ{" "}
          <em>1 đơn hàng</em>, <em>1 khách hàng</em>. Mỗi resource thường có 1{" "}
          <strong className="text-[color:var(--ink)]">endpoint</strong> riêng
          — ví dụ <code>/v1/orders/ORD1003</code> đại diện cho đúng 1 đơn hàng.
        </p>
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">REST</strong>{" "}
          (Representational State Transfer) là kiểu kiến trúc phổ biến nhất
          hiện nay để thiết kế API, dựa trên các ràng buộc: giao tiếp qua HTTP,
          mỗi resource có URL riêng, dùng đúng HTTP method theo ngữ nghĩa (xem
          Chương 2), và <strong className="text-[color:var(--ink)]">stateless</strong>{" "}
          — mỗi request phải chứa đủ thông tin để server xử lý, server không
          lưu trạng thái phiên làm việc giữa các request.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        So sánh nhanh 3 kiểu API phổ biến
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Kiểu", "Đặc điểm chính", "Khi test cần chú ý"].map((h) => (
                <th key={h} className="border border-[color:var(--line2)] px-3 py-2 text-left font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["REST", "Mỗi resource 1 URL, dùng HTTP method theo ngữ nghĩa", "Test theo từng method (Chương 2), theo status code chuẩn"],
              ["GraphQL", "1 endpoint duy nhất, client tự chọn field cần lấy trong query", "Test theo query/mutation gửi lên, không theo URL path"],
              ["SOAP", "Dùng XML, có chuẩn WSDL mô tả nghiêm ngặt", "Test theo đúng schema XML, ít gặp trong hệ thống mới"],
            ].map((r) => (
              <tr key={r[0]} className="even:bg-white/[0.04]">
                <td className="border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)] whitespace-nowrap">{r[0]}</td>
                <td className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)]">{r[1]}</td>
                <td className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)]">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">📌 Ghi nhớ</h3>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">API</strong> = cách 2 hệ
          thống giao tiếp. <strong className="text-[color:var(--ink)]">Resource</strong>{" "}
          = đối tượng dữ liệu, mỗi resource có 1{" "}
          <strong className="text-[color:var(--ink)]">endpoint</strong>.{" "}
          <strong className="text-[color:var(--ink)]">REST</strong> = kiểu
          kiến trúc phổ biến nhất, không phải cứ HTTP+JSON là REST.
        </p>
      </div>

      <TermGlossary
        terms={[
          ["API", "Application Programming Interface — quy tắc cho 2 hệ thống giao tiếp"],
          ["REST", "Representational State Transfer — kiểu kiến trúc API phổ biến dựa trên HTTP"],
          ["Resource", "Tài nguyên — đối tượng dữ liệu API thao tác lên (vd 1 đơn hàng)"],
          ["Endpoint", "Địa chỉ URL đại diện cho 1 resource hoặc 1 hành động"],
          ["Stateless", "Không lưu trạng thái — mỗi request phải tự chứa đủ thông tin để xử lý"],
          ["Client-server", "Mô hình client gửi request, server xử lý và trả response"],
        ]}
      />

      <p className="mt-8 text-xs italic text-[color:var(--faint)] leading-relaxed border-t border-[color:var(--line)] pt-4">
        📎 Nội dung do maiqai.com biên soạn dựa trên nguyên tắc REST phổ biến,
        không sao chép nguyên văn từ nguồn nào.
      </p>
    </>
  );
}
