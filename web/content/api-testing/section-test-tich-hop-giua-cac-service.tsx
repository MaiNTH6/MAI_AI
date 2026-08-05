import { TermGlossary } from "@/components/TermGlossary";
import { ApiChecklistTable } from "@/components/ApiChecklistTable";

/** Nội dung mục 3.2 — Test tích hợp giữa các service (service-to-service). */
export function SectionTestTichHopGiuaCacService() {
  return (
    <>
      <div className="badge">🔗 API Testing · Chương 3 · Mục 3.2</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Test tích hợp giữa các service (service-to-service)
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          hiểu rủi ro nằm ở &quot;đường nối&quot; giữa 2 service (nội bộ hoặc
          bên thứ 3) — nơi thường bị bỏ sót vì mỗi service khi test riêng đều
          báo PASS.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Ví dụ minh hoạ
      </h2>
      <pre className="mt-4 overflow-x-auto rounded-xl bg-[#0b0f16] p-4 text-xs md:text-sm text-emerald-200 ring-1 ring-white/10">
        {`Order Service (API chính)
   │  POST /v1/orders
   ├──► Inventory Service   (trừ tồn kho theo sku)
   └──► Payment Gateway     (xử lý thanh toán, service bên thứ 3)`}
      </pre>
      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Order Service phải gọi cả 2 service phụ thuộc trước khi trả kết quả
        cuối về client. Test tích hợp tập trung vào việc: nếu 1 trong 2 service
        phụ thuộc &quot;có vấn đề&quot;, Order Service có xử lý đúng không.
      </p>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Checklist test tích hợp service-to-service
      </h2>
      <ApiChecklistTable
        groups={[
          {
            group: "Service phụ thuộc phản hồi chậm/timeout",
            cases: [
              { id: "TC-INT-01", content: "Inventory Service không phản hồi trong thời gian chờ (timeout)", expected: "Order Service phải có ngưỡng chờ (timeout) hợp lý, trả lỗi rõ ràng cho client — không treo vô thời hạn" },
            ],
          },
          {
            group: "Service phụ thuộc trả lỗi",
            cases: [
              { id: "TC-INT-02", content: "Payment Gateway trả lỗi 500 hoặc từ chối giao dịch", expected: "Order Service rollback đúng phần đã xử lý (vd hoàn tồn kho đã trừ), không để đơn hàng ở trạng thái nửa vời" },
            ],
          },
          {
            group: "Service phụ thuộc sai hợp đồng dữ liệu",
            cases: [
              { id: "TC-INT-03", content: "Inventory Service đổi cấu trúc response mà không báo trước (vd đổi tên field)", expected: "Order Service phát hiện được sai hợp đồng thay vì crash âm thầm — liên quan Contract Testing (Chương 6)" },
            ],
          },
          {
            group: "Retry logic & idempotency giữa các service",
            cases: [
              { id: "TC-INT-04", content: "Order Service tự động retry gọi Inventory Service khi timeout lần 1", expected: "Lần retry không được trừ tồn kho 2 lần — Inventory Service cần hỗ trợ idempotency key" },
            ],
          },
          {
            group: "Ngưỡng timeout có hợp lý",
            cases: [
              { id: "TC-INT-05", content: "Đo thời gian phản hồi thực tế của Payment Gateway trong điều kiện bình thường", expected: "Ngưỡng timeout cấu hình phải lớn hơn đáng kể thời gian phản hồi bình thường, tránh fail oan" },
            ],
          },
        ]}
      />

      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">📌 Ghi nhớ</h3>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          Test tích hợp không phải là test lại logic của service phụ thuộc
          (đó là việc của team sở hữu service đó) — mà là test{" "}
          <strong className="text-[color:var(--ink)]">
            cách service chính phản ứng khi service phụ thuộc &quot;không như
            mong đợi&quot;
          </strong>{" "}
          (chậm, lỗi, sai hợp đồng).
        </p>
      </div>

      <TermGlossary
        terms={[
          ["Downstream service", "Service phụ thuộc — service được gọi tới bởi service chính"],
          ["Timeout threshold", "Ngưỡng thời gian chờ tối đa trước khi coi là thất bại"],
          ["Retry logic", "Cơ chế tự động gọi lại khi request thất bại"],
          ["Rollback", "Hoàn tác các thay đổi đã thực hiện khi có bước sau đó thất bại"],
        ]}
      />

      <p className="mt-8 text-xs italic text-[color:var(--faint)] leading-relaxed border-t border-[color:var(--line)] pt-4">
        📎 Nội dung do maiqai.com biên soạn — tên service và luồng trong ví
        dụ chỉ mang tính minh hoạ, không thuộc hệ thống thật nào.
      </p>
    </>
  );
}
