import { TermGlossary } from "@/components/TermGlossary";
import { ApiChecklistTable } from "@/components/ApiChecklistTable";

/** Nội dung mục 3.1 — Test luồng nghiệp vụ đa bước (multi-step workflow). */
export function SectionTestLuongNghiepVuDaBuoc() {
  return (
    <>
      <div className="badge">🔗 API Testing · Chương 3 · Mục 3.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Test luồng nghiệp vụ đa bước (multi-step workflow)
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          hiểu vì sao test từng API riêng lẻ (Chương 2) là chưa đủ — nhiều
          lỗi chỉ xuất hiện khi 1 chuỗi API được gọi liên tiếp theo đúng luồng
          nghiệp vụ thật.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Ví dụ minh hoạ: luồng &quot;Đặt hàng hoàn chỉnh&quot;
      </h2>
      <pre className="mt-4 overflow-x-auto rounded-xl bg-[#0b0f16] p-4 text-xs md:text-sm text-emerald-200 ring-1 ring-white/10">
        {`Bước 1: POST /v1/cart/items        → thêm sản phẩm vào giỏ hàng
Bước 2: POST /v1/orders             → tạo đơn hàng từ giỏ (status: PENDING)
Bước 3: POST /v1/payments           → thanh toán đơn hàng vừa tạo
Bước 4: GET  /v1/orders/{orderId}   → xác nhận status đã chuyển PENDING → PAID`}
      </pre>
      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Từng API ở trên có thể PASS khi test riêng lẻ (đúng chuẩn Chương 2),
        nhưng luồng vẫn có thể sai nếu — ví dụ — Bước 3 thất bại mà Bước 2 đã
        trừ tồn kho, để lại dữ liệu &quot;rác&quot; không nhất quán.
      </p>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Checklist test cho luồng đa bước
      </h2>
      <ApiChecklistTable
        groups={[
          {
            group: "Luồng chạy đúng (happy path đa bước)",
            cases: [
              { id: "TC-FLOW-01", content: "Chạy tuần tự đủ 4 bước với dữ liệu hợp lệ", expected: "Mỗi bước trả đúng kết quả; trạng thái cuối cùng của đơn hàng là PAID" },
            ],
          },
          {
            group: "Một bước giữa chừng thất bại",
            cases: [
              { id: "TC-FLOW-02", content: "Bước 3 (thanh toán) thất bại (vd thẻ bị từ chối)", expected: "Đơn hàng ở Bước 2 phải được rollback hoặc chuyển sang trạng thái rõ ràng (vd PAYMENT_FAILED), không treo mãi ở PENDING" },
              { id: "TC-FLOW-03", content: "Bước 3 thất bại, sau đó kiểm tra tồn kho", expected: "Tồn kho đã trừ ở Bước 2 phải được hoàn lại (compensating action), không bị mất hàng oan" },
            ],
          },
          {
            group: "Gọi sai thứ tự hoặc bỏ bước",
            cases: [
              { id: "TC-FLOW-04", content: "Gọi thẳng Bước 3 (thanh toán) khi chưa có đơn hàng (bỏ qua Bước 2)", expected: "Bị từ chối với lỗi rõ ràng, không tạo giao dịch thanh toán 'mồ côi'" },
            ],
          },
          {
            group: "Gọi lại 1 bước giữa luồng",
            cases: [
              { id: "TC-FLOW-05", content: "Gọi lại Bước 3 (thanh toán) 2 lần cho cùng 1 đơn hàng", expected: "Không bị trừ tiền 2 lần — liên quan trực tiếp tới tính không-idempotent của POST (Mục 2.3)" },
            ],
          },
          {
            group: "Timeout/hết hạn giữa các bước",
            cases: [
              { id: "TC-FLOW-06", content: "Giỏ hàng/đơn hàng hết hạn giữa lúc người dùng đang ở Bước 3", expected: "Bước 3 phải từ chối hợp lý (vd 409 Conflict), không cho thanh toán vào đơn đã hết hạn" },
            ],
          },
        ]}
      />

      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">📌 Ghi nhớ</h3>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          Test đơn lẻ trả lời câu hỏi &quot;API này đúng không&quot;. Test luồng
          đa bước trả lời câu hỏi khác hẳn:{" "}
          <strong className="text-[color:var(--ink)]">
            khi 1 bước ở giữa thất bại, hệ thống có giữ được dữ liệu nhất
            quán không
          </strong>
          . Đây là loại lỗi chỉ xuất hiện ở tầng integration, không bao giờ
          bắt được nếu chỉ test từng API tách rời.
        </p>
      </div>

      <TermGlossary
        terms={[
          ["Multi-step workflow", "Luồng nghiệp vụ nhiều bước — chuỗi API được gọi tuần tự để hoàn thành 1 tác vụ"],
          ["Compensating action", "Hành động bù trừ — hoàn tác một bước đã xử lý khi bước sau đó thất bại"],
          ["Data inconsistency", "Dữ liệu không nhất quán — trạng thái dữ liệu giữa các bước bị lệch nhau"],
        ]}
      />

      <p className="mt-8 text-xs italic text-[color:var(--faint)] leading-relaxed border-t border-[color:var(--line)] pt-4">
        📎 Nội dung do maiqai.com biên soạn — luồng nghiệp vụ và dữ liệu
        trong ví dụ chỉ mang tính minh hoạ, không thuộc hệ thống thật nào.
      </p>
    </>
  );
}
