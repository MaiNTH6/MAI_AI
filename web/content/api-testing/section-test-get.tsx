import { TermGlossary } from "@/components/TermGlossary";
import { ApiChecklistTable } from "@/components/ApiChecklistTable";

/** Nội dung mục 2.2 — Test API loại GET. */
export function SectionTestApiGet() {
  return (
    <>
      <div className="badge">🧭 API Testing · Chương 2 · Mục 2.2</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Test API loại GET — query param, phân trang, không side-effect
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          test đúng trọng tâm của GET — tham số truy vấn, phân trang, và đảm
          bảo việc gọi API không làm thay đổi bất kỳ dữ liệu nào.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Ví dụ minh hoạ
      </h2>
      <pre className="mt-4 overflow-x-auto rounded-xl bg-[#0b0f16] p-4 text-xs md:text-sm text-emerald-200 ring-1 ring-white/10">
        {`GET https://api.example.com/v1/orders?customerId=CUS1001&page=1&limit=20

Response 200 OK:
{
  "data": [
    { "orderId": "ORD1001", "customerId": "CUS1001", "status": "PAID", "total": 350000 },
    { "orderId": "ORD1002", "customerId": "CUS1001", "status": "PENDING", "total": 120000 }
  ],
  "page": 1,
  "limit": 20,
  "totalItems": 2
}`}
      </pre>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Checklist test cho GET — nhóm theo 7 kịch bản (xem Mục 2.1)
      </h2>
      <ApiChecklistTable
        groups={[
          {
            group: "1. Happy path",
            cases: [
              { id: "TC-GET-01", content: "customerId, page, limit hợp lệ", expected: "Trả đúng dữ liệu, đúng totalItems" },
            ],
          },
          {
            group: "2. Dữ liệu bắt buộc",
            cases: [
              { id: "TC-GET-02", content: "Gọi hoàn toàn không có customerId (nếu đây là tham số bắt buộc)", expected: "Trả lỗi rõ ràng, hoặc mặc định lọc theo user đang đăng nhập — tuỳ thiết kế, cần xác nhận với dev" },
            ],
          },
          {
            group: "3. Định dạng & kiểu dữ liệu",
            cases: [
              { id: "TC-GET-03", content: "limit âm hoặc bằng 0", expected: "Trả lỗi validate rõ ràng, không mặc định trả toàn bộ dữ liệu" },
              { id: "TC-GET-04", content: "page không phải số (vd page=abc)", expected: "Trả lỗi 400, không crash 500" },
            ],
          },
          {
            group: "4. Quy tắc nghiệp vụ & dữ liệu tham chiếu",
            cases: [
              { id: "TC-GET-05", content: "page vượt quá tổng số trang thực tế", expected: "Trả data rỗng (mảng []), không lỗi 500" },
              { id: "TC-GET-06", content: "Filter theo status không tồn tại trong hệ thống (vd status=HELLO)", expected: "Trả data rỗng hoặc lỗi rõ ràng, không trả nhầm toàn bộ dữ liệu" },
            ],
          },
          {
            group: "5. Đặc thù GET (safe, idempotent)",
            cases: [
              { id: "TC-GET-07", content: "Gọi liên tiếp 5 lần cùng tham số", expected: "Dữ liệu trả về không đổi, không phát sinh side-effect nào ở DB" },
            ],
          },
          {
            group: "6. Bảo mật & phân quyền",
            cases: [
              { id: "TC-GET-08", content: "Đổi customerId trên query param sang của khách hàng khác", expected: "Chỉ trả đơn hàng của đúng khách đang đăng nhập (theo token), không theo customerId tuỳ ý truyền vào" },
            ],
          },
          {
            group: "7. Response contract",
            cases: [
              { id: "TC-GET-09", content: "Kiểm tra response ở mọi case trên", expected: "Luôn có đủ data/page/limit/totalItems kể cả khi data rỗng; Content-Type luôn application/json" },
            ],
          },
        ]}
      />

      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">📌 Ghi nhớ</h3>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          Test GET không chỉ dừng ở &quot;dữ liệu có đúng không&quot; — case dễ
          bỏ sót nhất trong 7 nhóm với GET thường là{" "}
          <strong className="text-[color:var(--ink)]">nhóm 6 (bảo mật qua query param)</strong>{" "}
          vì tester hay nghĩ &quot;chỉ xem thôi không nguy hiểm&quot;.
        </p>
      </div>

      <TermGlossary
        terms={[
          ["Query parameter", "Tham số truy vấn — dữ liệu truyền qua URL sau dấu ?"],
          ["Pagination", "Phân trang — chia nhỏ danh sách kết quả thành nhiều trang"],
          ["IDOR", "Insecure Direct Object Reference — lỗi truy cập được dữ liệu của người khác qua ID/tham số"],
          ["Filter", "Bộ lọc — điều kiện thu hẹp kết quả trả về"],
        ]}
      />

      <p className="mt-8 text-xs italic text-[color:var(--faint)] leading-relaxed border-t border-[color:var(--line)] pt-4">
        📎 Nội dung do maiqai.com biên soạn — endpoint và dữ liệu trong ví dụ
        chỉ mang tính minh hoạ, không thuộc hệ thống thật nào.
      </p>
    </>
  );
}
