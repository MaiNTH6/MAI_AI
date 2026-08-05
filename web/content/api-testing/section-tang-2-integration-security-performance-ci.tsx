import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 7.2 — Tầng 2: Integration/security/performance test trong CI/CD. */
export function SectionTang2IntegrationSecurityPerformanceCi() {
  return (
    <>
      <div className="badge">🤖 API Testing · Chương 7 · Mục 7.2</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Tầng 2: Integration/security/performance test trong CI/CD
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          hiểu tầng chạy trong pipeline CI/CD (vd sau khi push code hoặc mở
          pull request) — nơi chạy các loại test tốn thời gian hơn Tầng 1
          nhưng vẫn cần chạy trước khi merge/deploy.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Đặc điểm Tầng 2
      </h2>
      <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
        Chạy trên hệ thống CI (GitHub Actions, GitLab CI, Jenkins...), có
        môi trường đầy đủ hơn máy dev — kết nối được DB test, gọi được các
        service phụ thuộc (thật hoặc mock/sandbox theo Mục 3.4). Ở tầng này
        chạy: integration test (Chương 3), quét bảo mật tự động (dựa theo
        checklist Chương 4), và 1 phần nhỏ performance test (không phải full
        load test, chỉ đủ để phát hiện suy giảm hiệu năng rõ rệt).
      </p>
      <pre className="mt-4 overflow-x-auto rounded-xl bg-[#0b0f16] p-4 text-xs md:text-sm text-emerald-200 ring-1 ring-white/10">
        {`# Ví dụ cấu trúc pipeline CI đơn giản (dạng YAML rút gọn)
jobs:
  test:
    steps:
      - run: pytest tests/unit tests/contract      # nhắc lại Tầng 1 cho chắc
      - run: pytest tests/integration               # Chương 3
      - run: security-scan --checklist owasp-top10  # Chương 4
      - run: k6 run smoke-performance.js             # bản rút gọn của Chương 5
    # Chỉ merge/deploy được nếu TOÀN BỘ bước trên pass`}
      </pre>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Nguyên tắc quan trọng
      </h2>
      <div className="mt-4 space-y-3 text-[color:var(--muted)] leading-relaxed">
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">Không lặp lại y hệt Tầng 1</strong>{" "}
          — Tầng 2 nên tập trung vào những gì Tầng 1 không làm được (cần môi
          trường thật), tránh lãng phí thời gian chạy lại.
        </p>
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">Chạy song song khi có thể</strong>{" "}
          — integration, security, performance thường độc lập nhau, chạy
          song song rút ngắn đáng kể thời gian chờ merge.
        </p>
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">Test performance ở đây chỉ là &quot;smoke&quot;</strong>{" "}
          — full load/stress test (Mục 5.2) thường tốn thời gian và tài
          nguyên, không phù hợp chạy mỗi lần có pull request.
        </p>
      </div>

      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">📌 Ghi nhớ</h3>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          Tầng 2 là &quot;cổng chặn&quot; chính trước khi code vào production
          — nguyên tắc vàng:{" "}
          <strong className="text-[color:var(--ink)]">
            không merge/deploy nếu bất kỳ bước nào ở Tầng 2 fail
          </strong>
          , dù áp lực thời gian release lớn tới đâu.
        </p>
      </div>

      <TermGlossary
        terms={[
          ["CI/CD pipeline", "Chuỗi bước tự động chạy khi có thay đổi code, gồm build/test/deploy"],
          ["Smoke test", "Bộ test rút gọn, chạy nhanh để xác nhận chức năng cơ bản không bị hỏng"],
          ["Merge gate", "Điều kiện bắt buộc phải thoả trước khi code được merge vào nhánh chính"],
        ]}
      />

      <p className="mt-8 text-xs italic text-[color:var(--faint)] leading-relaxed border-t border-[color:var(--line)] pt-4">
        📎 Nội dung do maiqai.com biên soạn dựa trên mô hình 3 tầng test phổ
        biến trong thực hành CI/CD, không sao chép nguyên văn từ nguồn nào.
      </p>
    </>
  );
}
