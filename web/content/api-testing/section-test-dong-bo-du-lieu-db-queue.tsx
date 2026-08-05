import { TermGlossary } from "@/components/TermGlossary";
import { ApiChecklistTable } from "@/components/ApiChecklistTable";

/** Nội dung mục 3.3 — Test đồng bộ dữ liệu giữa API, DB và message queue. */
export function SectionTestDongBoDuLieuDbQueue() {
  return (
    <>
      <div className="badge">🔗 API Testing · Chương 3 · Mục 3.3</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Test đồng bộ dữ liệu giữa API, DB và message queue
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          nhiều hệ thống xử lý bất đồng bộ qua message queue — API trả kết
          quả ngay, nhưng dữ liệu thực sự &quot;ổn định&quot; sau đó vài giây
          hoặc lâu hơn. Test kiểu này cần cách tiếp cận khác hẳn so với gọi
          xong assert ngay.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Ví dụ minh hoạ
      </h2>
      <pre className="mt-4 overflow-x-auto rounded-xl bg-[#0b0f16] p-4 text-xs md:text-sm text-emerald-200 ring-1 ring-white/10">
        {`POST /v1/orders  →  Response 201 ngay lập tức (status: PENDING)
                     →  đồng thời đẩy message "order.created" vào queue

Queue "order.created"  →  Email Service tiêu thụ message, gửi email xác nhận
                       →  Inventory Service tiêu thụ message, cập nhật tồn kho`}
      </pre>
      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Nếu Tester chỉ gọi API rồi lập tức kiểm tra email đã gửi/kho đã trừ,
        test sẽ FAIL giả (flaky) vì message có thể chưa được xử lý xong —
        đây không phải bug, mà là đặc thù bất đồng bộ cần test đúng cách.
      </p>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Checklist test đồng bộ dữ liệu bất đồng bộ
      </h2>
      <ApiChecklistTable
        groups={[
          {
            group: "Độ trễ xử lý bất đồng bộ",
            cases: [
              { id: "TC-SYNC-01", content: "Gọi API tạo đơn, sau đó chờ/poll (không assert ngay) tới khi tồn kho được cập nhật", expected: "API trả response nhanh (không chờ xử lý xong); dữ liệu cuối cùng đúng sau khoảng thời gian hợp lý" },
            ],
          },
          {
            group: "Message xử lý lỗi",
            cases: [
              { id: "TC-SYNC-02", content: "Email Service lỗi khi xử lý message 'order.created'", expected: "Đơn hàng vẫn giữ đúng trạng thái nghiệp vụ chính (PENDING/PAID) — lỗi ở service phụ (gửi email) không được làm hỏng luồng chính" },
              { id: "TC-SYNC-03", content: "Message rơi vào dead-letter queue sau nhiều lần retry thất bại", expected: "Có cơ chế giám sát/cảnh báo, không để message 'mất tích' âm thầm" },
            ],
          },
          {
            group: "Message bị xử lý trùng (at-least-once delivery)",
            cases: [
              { id: "TC-SYNC-04", content: "Message 'order.created' được deliver 2 lần cho cùng 1 order (hành vi phổ biến của nhiều message queue)", expected: "Không gửi 2 email, không trừ tồn kho 2 lần — consumer phải tự xử lý idempotency theo orderId" },
            ],
          },
          {
            group: "Thứ tự xử lý message",
            cases: [
              { id: "TC-SYNC-05", content: "2 message cập nhật trạng thái liên tiếp của cùng 1 đơn hàng (vd PAID rồi SHIPPED) tới không đúng thứ tự", expected: "Nếu nghiệp vụ yêu cầu thứ tự, hệ thống phải đảm bảo xử lý đúng tuần tự hoặc phát hiện được message tới sai thứ tự" },
            ],
          },
        ]}
      />

      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">📌 Ghi nhớ</h3>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          Với hệ thống bất đồng bộ, luôn dùng{" "}
          <strong className="text-[color:var(--ink)]">chờ có điều kiện (poll/retry với timeout)</strong>{" "}
          thay vì assert ngay sau khi gọi API — nếu không, test tự tạo ra lỗi
          giả (flaky test) chứ không phản ánh bug thật.
        </p>
      </div>

      <TermGlossary
        terms={[
          ["Message queue", "Hàng đợi tin nhắn — cơ chế truyền dữ liệu bất đồng bộ giữa các service (vd Kafka, RabbitMQ)"],
          ["Eventual consistency", "Nhất quán cuối cùng — dữ liệu sẽ đúng sau một khoảng thời gian, không nhất thiết ngay lập tức"],
          ["At-least-once delivery", "Đảm bảo message được xử lý ít nhất 1 lần — nhưng có thể bị gửi trùng nhiều lần"],
          ["Dead-letter queue", "Hàng đợi chứa message xử lý thất bại nhiều lần, không đưa được vào luồng chính"],
          ["Flaky test", "Test không ổn định — lúc pass lúc fail dù code không đổi, thường do race condition/thời gian chờ sai"],
        ]}
      />

      <p className="mt-8 text-xs italic text-[color:var(--faint)] leading-relaxed border-t border-[color:var(--line)] pt-4">
        📎 Nội dung do maiqai.com biên soạn — luồng xử lý trong ví dụ chỉ
        mang tính minh hoạ, không thuộc hệ thống thật nào.
      </p>
    </>
  );
}
