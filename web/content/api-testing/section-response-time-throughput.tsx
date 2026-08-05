import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 5.1 — Response time & throughput cơ bản. */
export function SectionResponseTimeThroughput() {
  return (
    <>
      <div className="badge">⚡ API Testing · Chương 5 · Mục 5.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Response time &amp; throughput cơ bản
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          hiểu 2 chỉ số nền tảng của performance testing, và vì sao đo bằng
          percentile chính xác hơn nhiều so với đo giá trị trung bình.
        </p>
        <p className="m-0 text-[color:var(--muted)]">
          🔗 <strong className="text-[color:var(--ink)]">Liên hệ với Chương 2:</strong>{" "}
          khác 6 nhóm còn lại trong khung Mục 2.1 (vốn kiểm tra 1 request
          đơn lẻ), Chương 5 nhìn ở góc độ khác — hệ thống phản ứng ra sao
          dưới TẢI và khi nhiều request chạy ĐỒNG THỜI, cắt ngang qua mọi
          HTTP method chứ không riêng 1 nhóm. Riêng Mục 5.3-5.4 mở rộng trực
          tiếp từ <strong>Nhóm 5 — Đặc thù ngữ nghĩa method (idempotent)</strong>{" "}
          đã học ở Mục 2.1, xét dưới điều kiện tải cao.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        2 chỉ số cốt lõi
      </h2>
      <div className="mt-4 space-y-3 text-[color:var(--muted)] leading-relaxed">
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">Response time</strong>{" "}
          (thời gian phản hồi) — khoảng thời gian từ lúc gửi request tới lúc
          nhận đủ response, tính cho 1 request.
        </p>
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">Throughput</strong>{" "}
          (thông lượng) — số lượng request hệ thống xử lý được trong 1 đơn vị
          thời gian, thường đo bằng RPS (requests/second) hoặc TPS
          (transactions/second).
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Vì sao phải đo bằng percentile, không phải trung bình
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Chỉ số", "Ý nghĩa", "Vấn đề nếu chỉ nhìn số này"].map((h) => (
                <th key={h} className="border border-[color:var(--line2)] px-3 py-2 text-left font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Trung bình (average)", "Cộng tất cả chia số lượng", "Bị 'kéo lệch' bởi vài request cực nhanh, che giấu việc 1 nhóm nhỏ người dùng chờ rất lâu"],
              ["p50 (median)", "50% request nhanh hơn giá trị này", "Chỉ phản ánh trải nghiệm 'người dùng điển hình', bỏ qua nhóm gặp chậm"],
              ["p95", "95% request nhanh hơn giá trị này", "Thường dùng làm SLA — phản ánh gần đúng trải nghiệm của đa số, kể cả nhóm chậm hơn"],
              ["p99", "99% request nhanh hơn giá trị này", "Phản ánh nhóm người dùng gặp trải nghiệm tệ nhất — quan trọng với hệ thống quy mô lớn"],
            ].map((r) => (
              <tr key={r[0]} className="even:bg-white/[0.04]">
                <td className="border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)] whitespace-nowrap">{r[0]}</td>
                <td className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)]">{r[1]}</td>
                <td className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)]">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Ví dụ: 100 request có response time trung bình 200ms nghe rất tốt —
        nhưng nếu p99 là 8000ms, nghĩa là cứ 100 người dùng thì có 1 người
        phải chờ 8 giây. Con số trung bình đã che giấu hoàn toàn vấn đề này.
      </p>

      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">📌 Ghi nhớ</h3>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          Khi báo cáo kết quả performance test, luôn báo cáo{" "}
          <strong className="text-[color:var(--ink)]">p95/p99</strong>{" "}
          cùng với trung bình — và luôn thống nhất trước với team ngưỡng SLA
          chấp nhận được (vd &quot;p95 &lt; 500ms&quot;) trước khi bắt đầu
          test, tránh tranh cãi sau khi có số liệu.
        </p>
      </div>

      <TermGlossary
        terms={[
          ["Response time", "Thời gian phản hồi của 1 request, từ lúc gửi tới lúc nhận đủ response"],
          ["Throughput", "Thông lượng — số request/giao dịch xử lý được trong 1 đơn vị thời gian"],
          ["RPS / TPS", "Requests per second / Transactions per second — đơn vị đo throughput phổ biến"],
          ["Percentile (p95, p99)", "Điểm phân vị — giá trị mà N% số request nằm dưới ngưỡng đó"],
          ["SLA", "Service Level Agreement — cam kết về mức độ dịch vụ (thường gồm ngưỡng response time)"],
        ]}
      />

      <p className="mt-8 text-xs italic text-[color:var(--faint)] leading-relaxed border-t border-[color:var(--line)] pt-4">
        📎 Nội dung do maiqai.com biên soạn dựa trên thực hành phổ biến khi
        đo hiệu năng API, không sao chép nguyên văn từ nguồn nào.
      </p>
    </>
  );
}
