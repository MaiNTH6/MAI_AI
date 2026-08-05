import { TermGlossary } from "@/components/TermGlossary";
import { ApiChecklistTable } from "@/components/ApiChecklistTable";

/** Nội dung mục 2.4 — Test API loại PUT & PATCH. */
export function SectionTestApiPutPatch() {
  return (
    <>
      <div className="badge">🧭 API Testing · Chương 2 · Mục 2.4</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Test API loại PUT &amp; PATCH — phân biệt rõ, không gộp chung
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          phân biệt rõ PUT (thay toàn bộ, bắt buộc idempotent) và PATCH (cập
          nhật một phần) — 2 khái niệm rất hay bị test giống hệt nhau dù bản
          chất khác nhau.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Ví dụ minh hoạ
      </h2>
      <pre className="mt-4 overflow-x-auto rounded-xl bg-[#0b0f16] p-4 text-xs md:text-sm text-emerald-200 ring-1 ring-white/10">
        {`PUT https://api.example.com/v1/orders/ORD1003
Body: { "customerId": "CUS1001", "items": [{ "sku": "SKU002", "qty": 1 }], "note": "Đổi lại địa chỉ giao" }
Response 200 OK — toàn bộ đơn hàng được thay bằng dữ liệu mới.

PATCH https://api.example.com/v1/orders/ORD1003
Body: { "status": "CANCELLED" }
Response 200 OK — chỉ field status đổi, các field khác (customerId, items, note) giữ nguyên.`}
      </pre>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Checklist test cho PUT — nhóm theo 7 kịch bản (xem Mục 2.1)
      </h2>
      <ApiChecklistTable
        groups={[
          { group: "1. Happy path", cases: [
            { id: "TC-PUT-01", content: "Gửi đủ body hợp lệ (customerId, items, note)", expected: "Toàn bộ đơn hàng được thay bằng dữ liệu mới, trả 200" },
          ]},
          { group: "2. Dữ liệu bắt buộc", cases: [
            { id: "TC-PUT-02", content: "Body PUT thiếu field 'note'", expected: "Xác nhận field này bị xoá về rỗng hay giữ nguyên giá trị cũ — điểm hay gây tranh cãi, phải hỏi dev" },
          ]},
          { group: "3. Định dạng & kiểu dữ liệu", cases: [
            { id: "TC-PUT-03", content: "items chứa qty là chuỗi thay vì số", expected: "Trả lỗi validate rõ ràng" },
          ]},
          { group: "4. Quy tắc nghiệp vụ & dữ liệu tham chiếu", cases: [
            { id: "TC-PUT-04", content: "Gọi PUT với orderId không tồn tại", expected: "Trả 404, không được tạo mới nhầm (khác với 1 số API cho phép PUT tạo mới nếu ID chưa có — cần xác nhận rule)" },
            { id: "TC-PUT-05", content: "items chứa sku không tồn tại trong kho", expected: "Trả lỗi nghiệp vụ, không cập nhật đơn với sản phẩm không có thật" },
          ]},
          { group: "5. Đặc thù PUT (bắt buộc idempotent)", cases: [
            { id: "TC-PUT-06", content: "Gọi 2 lần liên tiếp cùng body", expected: "Kết quả lần 2 giống hệt lần 1, không phát sinh thêm thay đổi" },
          ]},
          { group: "6. Bảo mật & phân quyền", cases: [
            { id: "TC-PUT-07", content: "PUT vào orderId thuộc khách hàng khác", expected: "Bị từ chối, đơn hàng của khách khác không bị thay đổi" },
          ]},
          { group: "7. Response contract", cases: [
            { id: "TC-PUT-08", content: "Kiểm tra response khi cập nhật thành công", expected: "Trả 200, body trả về đúng dữ liệu đã cập nhật đầy đủ (không thiếu field)" },
          ]},
        ]}
      />

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Checklist test cho PATCH — nhóm theo 7 kịch bản
      </h2>
      <ApiChecklistTable
        groups={[
          { group: "1. Happy path", cases: [
            { id: "TC-PATCH-01", content: "Chỉ gửi field status", expected: "Đúng field status đổi, trả 200" },
          ]},
          { group: "2. Dữ liệu bắt buộc", cases: [
            { id: "TC-PATCH-02", content: "Gửi body rỗng {}", expected: "Trả lỗi hoặc không làm gì — cần xác nhận hành vi mong muốn với dev, không để mặc định lỗi 500" },
          ]},
          { group: "3. Định dạng & kiểu dữ liệu", cases: [
            { id: "TC-PATCH-03", content: "Gửi status với giá trị không nằm trong enum hợp lệ (vd 'HELLO')", expected: "Trả lỗi validate rõ ràng, không lưu giá trị rác vào DB" },
          ]},
          { group: "4. Quy tắc nghiệp vụ & dữ liệu tham chiếu", cases: [
            { id: "TC-PATCH-04", content: "Gọi với orderId không tồn tại", expected: "Trả 404" },
            { id: "TC-PATCH-05", content: "Đổi status từ COMPLETED ngược về PENDING", expected: "Nếu vi phạm state machine nghiệp vụ, phải trả lỗi 409 Conflict, không cho đổi tuỳ tiện" },
          ]},
          { group: "5. Đặc thù PATCH (chỉ đổi phần được gửi)", cases: [
            { id: "TC-PATCH-06", content: "Sau khi PATCH chỉ status, kiểm tra lại các field khác", expected: "customerId, items, note phải giữ nguyên như trước, không bị null hoá" },
          ]},
          { group: "6. Bảo mật & phân quyền", cases: [
            { id: "TC-PATCH-07", content: "PATCH vào orderId thuộc khách hàng khác", expected: "Bị từ chối, đơn hàng của khách khác không bị thay đổi" },
          ]},
          { group: "7. Response contract", cases: [
            { id: "TC-PATCH-08", content: "Kiểm tra response khi cập nhật thành công", expected: "Xác nhận trả về toàn bộ object hay chỉ field vừa đổi — cần nhất quán và khớp tài liệu, không đổi qua lại giữa các lần deploy" },
          ]},
        ]}
      />

      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">📌 Ghi nhớ</h3>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">PUT</strong> = thay
          toàn bộ, bắt buộc idempotent.{" "}
          <strong className="text-[color:var(--ink)]">PATCH</strong> = chỉ
          đổi phần được gửi, các field khác phải giữ nguyên.
        </p>
      </div>

      <TermGlossary
        terms={[
          ["Full replacement", "Thay toàn bộ tài nguyên bằng dữ liệu mới (hành vi chuẩn của PUT)"],
          ["Partial update", "Cập nhật một phần dữ liệu (hành vi chuẩn của PATCH)"],
          ["Idempotent", "Bất biến khi lặp — gọi nhiều lần cho cùng 1 kết quả cuối"],
        ]}
      />

      <p className="mt-8 text-xs italic text-[color:var(--faint)] leading-relaxed border-t border-[color:var(--line)] pt-4">
        📎 Nội dung do maiqai.com biên soạn — endpoint và dữ liệu trong ví dụ
        chỉ mang tính minh hoạ, không thuộc hệ thống thật nào.
      </p>
    </>
  );
}
