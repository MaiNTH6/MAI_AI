import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 6.3 — Consumer-driven contract (khái niệm, ví dụ Pact). */
export function SectionConsumerDrivenContract() {
  return (
    <>
      <div className="badge">📜 API Testing · Chương 6 · Mục 6.3</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Consumer-driven contract (khái niệm, ví dụ Pact)
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          hiểu 1 bước tiến xa hơn so với Mục 6.2 — thay vì provider tự viết
          đặc tả rồi hy vọng đúng ý consumer, để chính{" "}
          <strong>consumer định nghĩa kỳ vọng của mình</strong>.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Cách hoạt động
      </h2>
      <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
        Với OpenAPI (Mục 6.2), provider là bên viết đặc tả — rủi ro là đặc tả
        có thể không phản ánh đúng những gì consumer thực sự cần.
        Consumer-driven contract đảo ngược quy trình: consumer tự viết ra 1
        file mô tả chính xác những gì mình mong đợi (request nào, response
        cấu trúc ra sao), rồi provider chạy test để xác nhận đáp ứng đúng
        file đó trước khi được phép release.
      </p>
      <pre className="mt-4 overflow-x-auto rounded-xl bg-[#0b0f16] p-4 text-xs md:text-sm text-emerald-200 ring-1 ring-white/10">
        {`1. Consumer (vd Web App) viết 1 "pact" — mô tả: "khi tôi gọi
   GET /v1/orders/ORD1003, tôi mong đợi response có field orderId
   (string), status (string), total (number)."

2. Pact được lưu lại (thường ở 1 "Pact Broker" trung tâm).

3. Provider (Order Service), TRƯỚC KHI deploy phiên bản mới, tự động
   chạy lại toàn bộ pact đã có từ mọi consumer đang dùng API của mình.

4. Nếu provider đổi API làm vỡ 1 pact nào đó → build FAIL ngay lập tức,
   provider biết chính xác consumer nào sẽ bị ảnh hưởng trước khi release.`}
      </pre>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Lợi ích so với chỉ dùng OpenAPI
      </h2>
      <div className="mt-4 space-y-3 text-[color:var(--muted)] leading-relaxed">
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">1. Phản ánh đúng nhu cầu thực tế</strong>{" "}
          — pact do chính consumer viết, không phải provider tự đoán.
        </p>
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">2. Biết chính xác ai bị ảnh hưởng</strong>{" "}
          — khi có nhiều consumer (web, mobile app, service nội bộ khác),
          provider biết ngay thay đổi này làm vỡ pact của consumer nào.
        </p>
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">3. Tích hợp trực tiếp vào CI/CD</strong>{" "}
          — provider không thể merge/deploy nếu làm vỡ bất kỳ pact nào đang
          tồn tại, biến việc &quot;giữ tương thích&quot; thành quy tắc bắt
          buộc thay vì phụ thuộc vào việc dev có nhớ đọc tài liệu hay không.
        </p>
      </div>

      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">📌 Ghi nhớ</h3>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          Consumer-driven contract phù hợp nhất khi hệ thống có{" "}
          <strong className="text-[color:var(--ink)]">nhiều consumer nội bộ</strong>{" "}
          gọi cùng 1 API (kiến trúc microservices) — với API public cho bên
          ngoài không kiểm soát được, cách tiếp cận OpenAPI (Mục 6.2) thường
          thực tế hơn.
        </p>
      </div>

      <TermGlossary
        terms={[
          ["Consumer-driven contract", "Hợp đồng do bên tiêu thụ API định nghĩa, provider phải đáp ứng đúng"],
          ["Pact", "Tên 1 công cụ/framework phổ biến để triển khai consumer-driven contract testing"],
          ["Pact Broker", "Nơi lưu trữ trung tâm các pact đã được consumer và provider xác nhận"],
        ]}
      />

      <p className="mt-8 text-xs italic text-[color:var(--faint)] leading-relaxed border-t border-[color:var(--line)] pt-4">
        📎 Nội dung do maiqai.com biên soạn dựa trên khái niệm phổ biến của
        Pact/consumer-driven contract testing, không sao chép nguyên văn từ
        nguồn nào.
      </p>
    </>
  );
}
