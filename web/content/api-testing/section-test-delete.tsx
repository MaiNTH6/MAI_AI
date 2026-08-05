import { TermGlossary } from "@/components/TermGlossary";
import { ApiChecklistTable } from "@/components/ApiChecklistTable";

/** Nội dung mục 2.5 — Test API loại DELETE. */
export function SectionTestApiDelete() {
  return (
    <>
      <div className="badge">🧭 API Testing · Chương 2 · Mục 2.5</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Test API loại DELETE — xoá thật, và xử lý khi gọi lại
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          xác nhận dữ liệu thực sự bị xoá (hoặc chuyển đúng trạng thái nếu là
          soft-delete), và test đúng hành vi khi gọi lại DELETE lần 2 trên
          cùng tài nguyên.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Ví dụ minh hoạ
      </h2>
      <pre className="mt-4 overflow-x-auto rounded-xl bg-[#0b0f16] p-4 text-xs md:text-sm text-emerald-200 ring-1 ring-white/10">
        {`DELETE https://api.example.com/v1/orders/ORD1003
Response: 204 No Content

Gọi lại DELETE lần 2 trên cùng orderId:
Response kỳ vọng: 404 Not Found
(không phải 204 "thành công" lần nữa — nếu API vẫn trả 204 ở lần gọi thứ 2,
đây là dấu hiệu hệ thống không kiểm tra tài nguyên còn tồn tại trước khi xoá)`}
      </pre>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Checklist test cho DELETE — nhóm theo 7 kịch bản (xem Mục 2.1)
      </h2>
      <ApiChecklistTable
        groups={[
          { group: "1. Happy path", cases: [
            { id: "TC-DEL-01", content: "Xoá thành công 1 orderId hợp lệ đang tồn tại", expected: "Trả 204; gọi GET lại tài nguyên đó trả 404" },
          ]},
          { group: "2. Dữ liệu bắt buộc", cases: [
            { id: "TC-DEL-02", content: "Không áp dụng — DELETE thường không có body, chỉ có orderId trên path (đã xét ở nhóm 3)", expected: "—" },
          ]},
          { group: "3. Định dạng & kiểu dữ liệu", cases: [
            { id: "TC-DEL-03", content: "orderId trên path sai định dạng (vd chứa ký tự đặc biệt, không đúng pattern ORDxxxx)", expected: "Trả lỗi 400, không crash 500" },
          ]},
          { group: "4. Quy tắc nghiệp vụ & dữ liệu tham chiếu", cases: [
            { id: "TC-DEL-04", content: "Xoá orderId không tồn tại từ đầu", expected: "Trả 404" },
            { id: "TC-DEL-05", content: "Xoá đơn hàng đang ở trạng thái COMPLETED (đã hoàn tất)", expected: "Có thể cần trả lỗi nghiệp vụ (409 Conflict) thay vì cho xoá tuỳ tiện — xác nhận rule này với BA" },
          ]},
          { group: "5. Đặc thù DELETE (idempotent)", cases: [
            { id: "TC-DEL-06", content: "Gọi DELETE lần 2 trên ID vừa xoá ở TC-DEL-01", expected: "Trả 404 — không phải 204 'thành công' giả như đang xoá thêm lần nữa" },
          ]},
          { group: "6. Bảo mật & phân quyền", cases: [
            { id: "TC-DEL-07", content: "Xoá orderId thuộc khách hàng khác", expected: "Bị từ chối, đơn hàng của khách khác không bị xoá" },
          ]},
          { group: "7. Response contract", cases: [
            { id: "TC-DEL-08", content: "Kiểm tra response khi xoá thành công", expected: "Đúng 204 No Content, không kèm body; nếu hệ thống trả 200 thì phải có body rõ ràng, không để trống mập mờ" },
          ]},
        ]}
      />

      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">📌 Ghi nhớ</h3>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          Test DELETE không dừng ở &quot;response trả về thành công&quot; —
          luôn gọi thêm GET để xác nhận tài nguyên biến mất, và gọi lại
          DELETE lần 2 để xem hệ thống phản ứng đúng chuẩn hay không.
        </p>
      </div>

      <TermGlossary
        terms={[
          ["Soft delete", "Xoá mềm — đánh dấu trạng thái đã xoá thay vì xoá vật lý khỏi DB"],
          ["204 No Content", "Status code chuẩn cho thao tác thành công nhưng không có nội dung trả về"],
          ["409 Conflict", "Status code cho biết request hợp lệ nhưng xung đột với trạng thái hiện tại của tài nguyên"],
        ]}
      />

      <p className="mt-8 text-xs italic text-[color:var(--faint)] leading-relaxed border-t border-[color:var(--line)] pt-4">
        📎 Nội dung do maiqai.com biên soạn — endpoint và dữ liệu trong ví dụ
        chỉ mang tính minh hoạ, không thuộc hệ thống thật nào.
      </p>
    </>
  );
}
