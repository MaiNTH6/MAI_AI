import { TermGlossary } from "@/components/TermGlossary";
import { ApiChecklistTable } from "@/components/ApiChecklistTable";

/** Nội dung mục 2.3 — Test API loại POST. */
export function SectionTestApiPost() {
  return (
    <>
      <div className="badge">🧭 API Testing · Chương 2 · Mục 2.3</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Test API loại POST — validate input, chống tạo trùng
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          test đúng trọng tâm của POST — validate dữ liệu đầu vào và hành vi
          &quot;tạo mới&quot; đặc trưng, vốn không bắt buộc idempotent.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Ví dụ minh hoạ
      </h2>
      <pre className="mt-4 overflow-x-auto rounded-xl bg-[#0b0f16] p-4 text-xs md:text-sm text-emerald-200 ring-1 ring-white/10">
        {`POST https://api.example.com/v1/orders
Body:
{
  "customerId": "CUS1001",
  "items": [{ "sku": "SKU001", "qty": 2 }],
  "note": "Giao giờ hành chính"
}

Response 201 Created (Location: /v1/orders/ORD1003):
{
  "orderId": "ORD1003",
  "customerId": "CUS1001",
  "status": "PENDING",
  "total": 250000,
  "createdAt": "2026-08-04T10:15:00Z"
}`}
      </pre>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Checklist test cho POST — nhóm theo 7 kịch bản (xem Mục 2.1)
      </h2>
      <ApiChecklistTable
        groups={[
          {
            group: "1. Happy path",
            cases: [
              { id: "TC-POST-01", content: "Tạo thành công với dữ liệu hợp lệ", expected: "Trả 201, có orderId và createdAt" },
            ],
          },
          {
            group: "2. Dữ liệu bắt buộc",
            cases: [
              { id: "TC-POST-02", content: "Thiếu customerId", expected: "Trả lỗi validate rõ ràng" },
              { id: "TC-POST-03", content: "items rỗng ([])", expected: "Trả lỗi, không tạo đơn hàng 0 sản phẩm" },
            ],
          },
          {
            group: "3. Định dạng & kiểu dữ liệu",
            cases: [
              { id: "TC-POST-04", content: "qty là số âm hoặc không phải số nguyên (vd 1.5)", expected: "Trả lỗi validate, không tạo đơn với số lượng vô lý" },
              { id: "TC-POST-05", content: "customerId sai định dạng (vd không đúng pattern CUSxxxx)", expected: "Trả lỗi rõ ràng thay vì lỗi hệ thống chung chung" },
            ],
          },
          {
            group: "4. Quy tắc nghiệp vụ & dữ liệu tham chiếu",
            cases: [
              { id: "TC-POST-06", content: "sku không tồn tại trong kho", expected: "Trả lỗi nghiệp vụ, không tạo đơn hàng với sản phẩm không có thật" },
              { id: "TC-POST-07", content: "customerId không tồn tại trong hệ thống", expected: "Trả lỗi rõ ràng (vd 404/422), không tạo đơn 'mồ côi'" },
            ],
          },
          {
            group: "5. Đặc thù POST (không bắt buộc idempotent)",
            cases: [
              {
                id: "TC-POST-08",
                content: "Gọi lại đúng request giống hệt 2 lần liên tiếp (mô phỏng double-submit)",
                expected: "Xác nhận có tạo ra 2 bản ghi khác nhau, hay hệ thống có cơ chế chặn trùng (idempotency key)",
              },
            ],
          },
          {
            group: "6. Bảo mật & phân quyền",
            cases: [
              { id: "TC-POST-09", content: "Token thuộc khách hàng A nhưng body gửi customerId của khách hàng B", expected: "Bị từ chối, hoặc hệ thống tự lấy customerId từ token — không tin theo giá trị client tự khai" },
              { id: "TC-POST-10", content: "Payload SQL injection/script trong field note", expected: "Dữ liệu được lưu như chuỗi thường hoặc bị từ chối, không thực thi injection" },
            ],
          },
          {
            group: "7. Response contract",
            cases: [
              { id: "TC-POST-11", content: "Kiểm tra response khi tạo thành công", expected: "Đúng status 201 (không phải 200), có header Location trỏ đúng /v1/orders/{orderId} vừa tạo" },
            ],
          },
        ]}
      />

      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">📌 Ghi nhớ</h3>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          Response thành công của POST nên trả đúng mã{" "}
          <strong className="text-[color:var(--ink)]">201</strong> kèm thông
          tin tài nguyên vừa tạo (id, thời gian tạo) — nhiều API trả nhầm 200
          hoặc thiếu id, gây khó khăn cho phía client khi cần dùng lại id đó
          ngay sau đó.
        </p>
      </div>

      <TermGlossary
        terms={[
          ["Double-submit", "Gửi trùng request — do người dùng bấm 2 lần hoặc client tự động retry"],
          ["201 Created", "Status code chuẩn cho việc tạo mới thành công"],
          ["Location header", "Header trỏ tới URL của tài nguyên vừa được tạo"],
          ["Idempotency key", "Khoá gửi kèm request để server nhận biết và chặn xử lý trùng lặp"],
        ]}
      />

      <p className="mt-8 text-xs italic text-[color:var(--faint)] leading-relaxed border-t border-[color:var(--line)] pt-4">
        📎 Nội dung do maiqai.com biên soạn — endpoint và dữ liệu trong ví dụ
        chỉ mang tính minh hoạ, không thuộc hệ thống thật nào.
      </p>
    </>
  );
}
