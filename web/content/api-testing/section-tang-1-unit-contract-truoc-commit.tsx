import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 7.1 — Tầng 1: Unit & contract test trước khi commit. */
export function SectionTang1UnitContractTruocCommit() {
  return (
    <>
      <div className="badge">🤖 API Testing · Chương 7 · Mục 7.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Tầng 1: Unit &amp; contract test trước khi commit
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          hiểu tầng đầu tiên trong mô hình 3 tầng test thực tế — chạy cục bộ,
          cực nhanh, trước cả khi code được đẩy lên hệ thống chung.
        </p>
        <p className="m-0 text-[color:var(--muted)]">
          🔗 <strong className="text-[color:var(--ink)]">Liên hệ với các chương trước:</strong>{" "}
          Chương 7 không phải 1 nhóm kịch bản test mới — đây là cách{" "}
          <strong>tổ chức và tự động hoá</strong> toàn bộ những gì đã học ở
          Chương 1-6 (checklist theo method, integration, bảo mật OWASP,
          hiệu năng, contract) thành 1 quy trình chạy được lặp lại, thay vì
          làm thủ công từng lần.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Đặc điểm Tầng 1
      </h2>
      <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
        Chạy ngay trên máy dev, thường qua{" "}
        <strong className="text-[color:var(--ink)]">pre-commit hook</strong>{" "}
        — tự động chạy trước khi lệnh <code>git commit</code> hoàn tất. Ở
        tầng này chỉ nên có: unit test cho logic xử lý (validate, tính toán),
        và chạy lại contract test đã có (Chương 6) — KHÔNG chạy integration
        test đầy đủ vì cần môi trường/service phụ thuộc chưa chắc có sẵn
        trên máy dev.
      </p>
      <pre className="mt-4 overflow-x-auto rounded-xl bg-[#0b0f16] p-4 text-xs md:text-sm text-emerald-200 ring-1 ring-white/10">
        {`# Ví dụ pre-commit hook đơn giản (.git/hooks/pre-commit hoặc qua tool
# như pre-commit/husky)
#!/bin/sh
pytest tests/unit/ -q          # unit test logic, chạy trong vài giây
pytest tests/contract/ -q      # xác nhận vẫn khớp hợp đồng đã có (Chương 6)
# KHÔNG chạy tests/integration/ ở đây — quá chậm cho vòng lặp mỗi lần commit`}
      </pre>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Vì sao tầng này quan trọng
      </h2>
      <div className="mt-4 space-y-3 text-[color:var(--muted)] leading-relaxed">
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">Phản hồi tức thì</strong>{" "}
          — dev biết ngay lỗi trong vài giây, thay vì chờ pipeline CI/CD chạy
          xong (có thể mất nhiều phút).
        </p>
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">Chặn lỗi rẻ nhất có thể</strong>{" "}
          — sửa lỗi ngay lúc code còn &quot;nóng&quot; trong đầu dev luôn rẻ
          hơn nhiều so với phát hiện ở Tầng 2 hay Tầng 3.
        </p>
      </div>

      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">📌 Ghi nhớ</h3>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          Nguyên tắc chọn test cho Tầng 1: nếu 1 test case cần môi trường
          phức tạp, gọi service ngoài, hoặc chạy quá vài giây —{" "}
          <strong className="text-[color:var(--ink)]">nó không thuộc Tầng 1</strong>
          , hãy đẩy xuống Tầng 2 (Mục 7.2).
        </p>
      </div>

      <TermGlossary
        terms={[
          ["Pre-commit hook", "Script tự động chạy trước khi hoàn tất lệnh commit trong Git"],
          ["Unit test", "Kiểm thử đơn vị — test 1 phần nhỏ logic độc lập, không phụ thuộc hệ thống ngoài"],
          ["Fast feedback loop", "Vòng phản hồi nhanh — phát hiện lỗi càng sớm càng tốt trong quá trình phát triển"],
        ]}
      />

      <p className="mt-8 text-xs italic text-[color:var(--faint)] leading-relaxed border-t border-[color:var(--line)] pt-4">
        📎 Nội dung do maiqai.com biên soạn dựa trên mô hình 3 tầng test phổ
        biến trong thực hành CI/CD, không sao chép nguyên văn từ nguồn nào.
      </p>
    </>
  );
}
