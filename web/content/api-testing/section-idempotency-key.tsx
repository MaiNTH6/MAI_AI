import { TermGlossary } from "@/components/TermGlossary";
import { ApiChecklistTable } from "@/components/ApiChecklistTable";

/** Nội dung mục 5.4 — Idempotency key & chống trùng request. */
export function SectionIdempotencyKey() {
  return (
    <>
      <div className="badge">⚡ API Testing · Chương 5 · Mục 5.4</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Idempotency key &amp; chống trùng request
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          hiểu giải pháp thực tế cho vấn đề đã nhắc nhiều lần — POST không
          idempotent (Mục 2.3), double-submit (Mục 3.1) — bằng 1 cơ chế cụ
          thể: idempotency key.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Cách hoạt động
      </h2>
      <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
        Client tự sinh 1 khoá duy nhất (thường là UUID) cho mỗi &quot;ý định
        giao dịch&quot;, gửi kèm request qua header. Server lưu lại khoá này
        cùng kết quả xử lý — nếu nhận request với khoá đã xử lý trước đó,
        trả lại đúng kết quả cũ thay vì xử lý lại từ đầu.
      </p>
      <pre className="mt-4 overflow-x-auto rounded-xl bg-[#0b0f16] p-4 text-xs md:text-sm text-emerald-200 ring-1 ring-white/10">
        {`POST /v1/orders
Idempotency-Key: 3f29a1c4-88b2-4e11-9c3a-1a2b3c4d5e6f
Body: { "customerId": "CUS1001", "items": [...] }

→ Lần 1: server xử lý bình thường, tạo ORD1003, lưu lại kết quả gắn với key trên
→ Lần 2 (client gửi lại do mất mạng, cùng key): server KHÔNG tạo đơn mới,
  trả lại đúng kết quả ORD1003 đã tạo ở lần 1`}
      </pre>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Checklist kiểm tra
      </h2>
      <ApiChecklistTable
        groups={[
          {
            group: "Cách kiểm tra",
            cases: [
              { id: "TC-IDEM-01", content: "Gửi 2 request giống hệt nhau kèm cùng 1 Idempotency-Key", expected: "Chỉ 1 bản ghi được tạo; request thứ 2 trả về đúng kết quả của request đầu tiên (không lỗi, không tạo mới)" },
              { id: "TC-IDEM-02", content: "Gửi 2 request với body khác nhau nhưng dùng cùng 1 Idempotency-Key", expected: "Cần xác nhận rule với dev: từ chối do key đã dùng cho request khác, hay vẫn trả kết quả cũ — không được âm thầm xử lý theo body mới" },
              { id: "TC-IDEM-03", content: "Gửi 2 request khác Idempotency-Key nhưng cùng nội dung", expected: "Tạo 2 bản ghi riêng biệt bình thường — key khác nhau nghĩa là 2 ý định giao dịch khác nhau" },
              { id: "TC-IDEM-04", content: "Kiểm tra key có thời hạn lưu trữ hợp lý không (vd 24h) trước khi bị dọn dẹp", expected: "Đủ dài để chống được các trường hợp retry thực tế (mất mạng, timeout), nhưng không lưu vĩnh viễn gây tốn tài nguyên" },
            ],
          },
        ]}
      />

      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">📌 Ghi nhớ</h3>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          Idempotency key là giải pháp{" "}
          <strong className="text-[color:var(--ink)]">phía thiết kế API</strong>{" "}
          — không phải API nào cũng có sẵn cơ chế này. Nếu phát hiện API
          quan trọng (thanh toán, tạo đơn) chưa hỗ trợ, đây là rủi ro cần báo
          lại cho dev, không chỉ đơn thuần là 1 test case fail.
        </p>
      </div>

      <TermGlossary
        terms={[
          ["Idempotency key", "Khoá do client sinh ra để server nhận diện và chặn xử lý trùng request"],
          ["UUID", "Universally Unique Identifier — chuỗi định danh gần như không bao giờ trùng lặp"],
          ["Deduplication", "Loại bỏ trùng lặp — cơ chế đảm bảo 1 hành động chỉ được thực hiện đúng 1 lần"],
        ]}
      />

      <p className="mt-8 text-xs italic text-[color:var(--faint)] leading-relaxed border-t border-[color:var(--line)] pt-4">
        📎 Nội dung do maiqai.com biên soạn — ví dụ minh hoạ, không thuộc hệ
        thống thật nào.
      </p>
    </>
  );
}
