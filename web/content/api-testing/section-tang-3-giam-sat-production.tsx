import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 7.3 — Tầng 3: Giám sát liên tục (synthetic monitoring) ở production. */
export function SectionTang3GiamSatProduction() {
  return (
    <>
      <div className="badge">🤖 API Testing · Chương 7 · Mục 7.3</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Tầng 3: Giám sát liên tục (synthetic monitoring) ở production
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          hiểu vì sao việc test không dừng lại sau khi release — 1 tập nhỏ
          test case tiếp tục chạy định kỳ nhắm thẳng vào production thật.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Đặc điểm Tầng 3
      </h2>
      <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
        Sau khi code đã qua Tầng 1 và Tầng 2, được deploy lên production —
        rủi ro vẫn chưa hết: cấu hình production có thể khác staging,
        service bên thứ 3 thật có thể khác sandbox (Mục 3.4), hoặc đơn giản
        là hệ thống có thể gặp sự cố bất kỳ lúc nào sau khi release.{" "}
        <strong className="text-[color:var(--ink)]">Synthetic
        monitoring</strong> giải quyết việc này bằng cách chạy lại 1 tập nhỏ
        test case (health check) đều đặn, giống hệt cách người dùng thật gọi
        API.
      </p>
      <pre className="mt-4 overflow-x-auto rounded-xl bg-[#0b0f16] p-4 text-xs md:text-sm text-emerald-200 ring-1 ring-white/10">
        {`# Ví dụ: cron job chạy mỗi 5 phút, gọi vài API quan trọng nhất
*/5 * * * *  curl -f https://api.example.com/v1/health
*/5 * * * *  pytest tests/synthetic/critical_flows.py --env=production

# Nếu FAIL → cảnh báo ngay cho team trực (on-call), không đợi
# người dùng thật báo lỗi trước.`}
      </pre>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Nguyên tắc chọn test case cho Tầng 3
      </h2>
      <div className="mt-4 space-y-3 text-[color:var(--muted)] leading-relaxed">
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">Chỉ chọn luồng thực sự quan trọng</strong>{" "}
          — không chạy lại toàn bộ bộ test, chỉ những luồng nếu hỏng sẽ ảnh
          hưởng nghiêm trọng tới nghiệp vụ (vd luồng đặt hàng ở Mục 3.1).
        </p>
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">Không gây tác động phụ lên dữ liệu thật</strong>{" "}
          — test case chạy trên production cần thiết kế cẩn thận (dùng tài
          khoản test riêng, tự dọn dẹp dữ liệu) để không ảnh hưởng người
          dùng thật.
        </p>
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">Kết nối trực tiếp với cảnh báo (alerting)</strong>{" "}
          — chạy mà không ai xem kết quả thì vô nghĩa; phải tự động báo cho
          đúng người khi fail.
        </p>
      </div>

      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">📌 Ghi nhớ</h3>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          Tầng 1 và 2 trả lời &quot;code có đúng trước khi release
          không&quot;. Tầng 3 trả lời câu hỏi khác:{" "}
          <strong className="text-[color:var(--ink)]">
            &quot;hệ thống có còn đúng NGAY BÂY GIỜ, sau khi đã release
            không&quot;
          </strong>{" "}
          — 2 câu hỏi không thể thay thế cho nhau.
        </p>
      </div>

      <TermGlossary
        terms={[
          ["Synthetic monitoring", "Giám sát tổng hợp — chạy test tự động định kỳ mô phỏng hành vi người dùng thật trên production"],
          ["Health check", "API/endpoint đơn giản dùng để xác nhận hệ thống đang hoạt động bình thường"],
          ["On-call", "Đội trực sẵn sàng xử lý sự cố khi có cảnh báo"],
        ]}
      />

      <p className="mt-8 text-xs italic text-[color:var(--faint)] leading-relaxed border-t border-[color:var(--line)] pt-4">
        📎 Nội dung do maiqai.com biên soạn dựa trên mô hình 3 tầng test phổ
        biến trong thực hành CI/CD, không sao chép nguyên văn từ nguồn nào.
      </p>
    </>
  );
}
