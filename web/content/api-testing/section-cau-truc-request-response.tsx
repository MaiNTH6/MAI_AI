import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 1.2 — Cấu trúc 1 HTTP Request/Response. */
export function SectionCauTrucRequestResponse() {
  return (
    <>
      <div className="badge">🌐 API Testing · Chương 1 · Mục 1.2</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Cấu trúc 1 HTTP Request/Response
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          nắm rõ từng thành phần của request và response — vì mỗi thành phần
          là 1 nơi có thể xảy ra lỗi và cần được test riêng, không chỉ nhìn
          vào phần Body.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">Ví dụ minh hoạ</h2>
      <pre className="mt-4 overflow-x-auto rounded-xl bg-[#0b0f16] p-4 text-xs md:text-sm text-emerald-200 ring-1 ring-white/10">
        {`POST https://api.example.com/v1/orders          ← Method + URL (endpoint)
Content-Type: application/json                   ← Header
Authorization: Bearer eyJhbGciOi...               ← Header

{ "customerId": "CUS1001", "items": [...] }        ← Body

────────────────────────────────────────

HTTP/1.1 201 Created                              ← Status code
Content-Type: application/json                    ← Header
Location: /v1/orders/ORD1003                       ← Header

{ "orderId": "ORD1003", "status": "PENDING" }       ← Body`}
      </pre>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        4 thành phần cần kiểm tra riêng
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Thành phần", "Thuộc Request/Response", "Vì sao cần test riêng"].map((h) => (
                <th key={h} className="border border-[color:var(--line2)] px-3 py-2 text-left font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Method + URL", "Request", "Sai method/URL dẫn tới gọi nhầm hành động (xem Chương 2)"],
              ["Headers", "Cả 2", "Quyết định xác thực, định dạng dữ liệu — hay bị bỏ quên khi chỉ nhìn Body"],
              ["Body", "Cả 2 (Body response có thể rỗng)", "Chứa dữ liệu nghiệp vụ chính, nơi hay được test nhất"],
              ["Status code", "Response", "Cho biết kết quả xử lý — xem chi tiết ở Mục 1.3"],
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
          Test API đầy đủ = kiểm tra cả{" "}
          <strong className="text-[color:var(--ink)]">4 thành phần</strong>{" "}
          (method/URL, headers, body, status code), không chỉ dừng ở &quot;Body
          trả đúng dữ liệu&quot;.
        </p>
      </div>

      <TermGlossary
        terms={[
          ["Header", "Phần siêu dữ liệu đi kèm request/response (vd Content-Type, Authorization)"],
          ["Body", "Phần nội dung/dữ liệu chính của request hoặc response"],
          ["Payload", "Tên gọi khác của Body — dữ liệu thực sự được gửi/nhận"],
          ["Endpoint", "URL đại diện cho 1 resource hoặc hành động cụ thể"],
        ]}
      />

      <p className="mt-8 text-xs italic text-[color:var(--faint)] leading-relaxed border-t border-[color:var(--line)] pt-4">
        📎 Nội dung do maiqai.com biên soạn — endpoint và dữ liệu trong ví dụ
        chỉ mang tính minh hoạ, không thuộc hệ thống thật nào.
      </p>
    </>
  );
}
