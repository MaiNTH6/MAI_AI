import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 5.2 — Load test vs. Stress test. */
export function SectionLoadTestVsStressTest() {
  return (
    <>
      <div className="badge">⚡ API Testing · Chương 5 · Mục 5.2</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Load test vs. Stress test — khác nhau ra sao
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          phân biệt rõ 4 loại test hiệu năng hay bị gộp chung — mỗi loại trả
          lời 1 câu hỏi khác nhau, không thể dùng lẫn cho nhau.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        4 loại test hiệu năng
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Loại", "Cách tạo tải", "Câu hỏi trả lời"].map((h) => (
                <th key={h} className="border border-[color:var(--line2)] px-3 py-2 text-left font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Load test", "Tải ở mức kỳ vọng thực tế (bình thường hoặc cao điểm dự kiến)", "Hệ thống có đáp ứng đúng SLA ở tải thực tế không?"],
              ["Stress test", "Tăng tải vượt xa mức bình thường, tới khi hệ thống bắt đầu lỗi", "Điểm giới hạn (breaking point) của hệ thống ở đâu, và nó 'gãy' như thế nào?"],
              ["Spike test", "Tăng tải đột ngột trong thời gian ngắn (vd gấp 10 lần trong vài giây)", "Hệ thống có chịu được đợt tải tăng vọt bất ngờ không (vd sự kiện flash sale)?"],
              ["Soak test", "Duy trì tải ổn định trong thời gian dài (nhiều giờ tới vài ngày)", "Có memory leak, rò rỉ tài nguyên, hay suy giảm hiệu năng dần theo thời gian không?"],
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

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Nguyên tắc khi thực hiện
      </h2>
      <div className="mt-4 space-y-3 text-[color:var(--muted)] leading-relaxed">
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">1. Mô phỏng đúng traffic pattern thực tế</strong>{" "}
          — không chỉ tăng tải đều đặn theo đường thẳng; traffic thật thường
          có đỉnh (giờ cao điểm), đáy (ban đêm), và tăng đột biến (khuyến
          mãi).
        </p>
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">2. Theo dõi cả tài nguyên hệ thống</strong>{" "}
          — không chỉ nhìn response time, còn phải theo dõi CPU, memory,
          connection pool tới DB, để biết chính xác &quot;nút thắt cổ
          chai&quot; nằm ở đâu khi hệ thống bắt đầu chậm.
        </p>
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">3. Stress test cần biết điểm dừng an toàn</strong>{" "}
          — nếu chạy trên môi trường chia sẻ với hệ thống thật (không phải
          môi trường test riêng), cần thống nhất trước ngưỡng dừng để tránh
          ảnh hưởng người dùng thật.
        </p>
      </div>

      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">📌 Ghi nhớ</h3>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          Load test trả lời &quot;hệ thống có ổn ở mức tải bình thường
          không&quot;. Stress test trả lời &quot;hệ thống gãy ở đâu và gãy
          như thế nào&quot;. Hai câu hỏi khác nhau hoàn toàn — không thể chỉ
          chạy 1 loại rồi kết luận cho cả 2.
        </p>
      </div>

      <TermGlossary
        terms={[
          ["Load test", "Kiểm thử tải ở mức kỳ vọng thực tế"],
          ["Stress test", "Kiểm thử tăng tải vượt mức bình thường để tìm điểm giới hạn"],
          ["Breaking point", "Điểm giới hạn — mức tải mà hệ thống bắt đầu lỗi/không đáp ứng được"],
          ["Spike test", "Kiểm thử tải tăng đột ngột trong thời gian ngắn"],
          ["Soak test", "Kiểm thử duy trì tải trong thời gian dài để phát hiện rò rỉ tài nguyên"],
        ]}
      />

      <p className="mt-8 text-xs italic text-[color:var(--faint)] leading-relaxed border-t border-[color:var(--line)] pt-4">
        📎 Nội dung do maiqai.com biên soạn dựa trên thực hành phổ biến khi
        test hiệu năng, không sao chép nguyên văn từ nguồn nào.
      </p>
    </>
  );
}
