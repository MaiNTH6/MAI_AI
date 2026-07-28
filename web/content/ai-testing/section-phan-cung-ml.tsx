import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 1.1.5 — Phần cứng cho hệ thống ML. */
export function SectionPhanCungMl() {
  return (
    <>
      <div className="badge">🧠 CT-AI · Chương 1 · Mục 1.1.5</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Phần cứng cho ML: vì sao GPU thắng CPU?
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-1.1.5 · mức K2 – Hiểu): <em>so sánh</em> các lựa chọn phần cứng
          cho hệ thống ML.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong> ML
            cần phần cứng <strong>tính song song ồ ạt</strong>, không cần độ chính
            xác cao — nên GPU/chip chuyên dụng hợp hơn CPU thường.
          </p>
          <p className="m-0 mt-1.5">
            Phần cứng để <strong>huấn luyện (training)</strong> và{" "}
            <strong>chạy suy luận (inference)</strong> có thể khác nhau — ví dụ mô
            hình nhận giọng nói <em>chạy</em> trên điện thoại yếu, nhưng{" "}
            <em>huấn luyện</em> cần sức mạnh đám mây.
          </p>
        </div>
      </div>

      {/* Bảng ML cần gì ở phần cứng */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        ML cần gì ở phần cứng?
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Yêu cầu", "Ý nghĩa"].map((h) => (
                <th
                  key={h}
                  className="border border-[color:var(--line2)] px-3 py-2 text-left font-semibold"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              [
                "Xử lý cấu trúc dữ liệu lớn",
                "Làm việc với ma trận / khối dữ liệu khổng lồ.",
              ],
              [
                "Tính song song ồ ạt",
                "Chạy nhiều phép tính cùng lúc (vd nhân ma trận) — thứ ML làm liên tục.",
              ],
              [
                "Số học độ chính xác thấp (quantization)",
                "Dùng ít bit hơn (vd 4 bit thay 32 bit) → nhanh hơn, ít điện hơn, chip nhỏ/rẻ hơn, ít băng thông.",
              ],
            ].map((r) => (
              <tr key={r[0]} className="even:bg-white/[0.04]">
                <td className="border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)]">
                  {r[0]}
                </td>
                <td className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)]">
                  {r[1]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bảng loại phần cứng */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Các loại phần cứng
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Phần cứng", "Đặc điểm", "Hợp với"].map((h) => (
                <th
                  key={h}
                  className="border border-[color:var(--line2)] px-3 py-2 text-left font-semibold"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              [
                "CPU",
                "Ít lõi, độ chính xác cao (ML không cần), xung nhịp cao.",
                "Kém hiệu quả cho ML.",
              ],
              [
                "GPU",
                "Hàng nghìn lõi, tính song song ồ ạt (dù xung nhịp thấp hơn CPU).",
                "Thường tốt nhất cho ML quy mô nhỏ.",
              ],
              [
                "ASIC / SoC (chip chuyên AI)",
                "Nhiều lõi, quản lý dữ liệu chuyên biệt, xử lý ngay trong bộ nhớ.",
                "Edge computing (chạy tại thiết bị); huấn luyện thì làm trên đám mây.",
              ],
              [
                "Neuromorphic (mới nổi)",
                "Không theo kiến trúc von Neumann — mô phỏng cấu trúc nơ-ron não.",
                "Đang phát triển, hướng tương lai.",
              ],
            ].map((r) => (
              <tr key={r[0]} className="even:bg-white/[0.04]">
                <td className="border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)]">
                  {r[0]}
                </td>
                <td className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)]">
                  {r[1]}
                </td>
                <td className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)]">
                  {r[2]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chỗ dễ ra đề */}
      <div className="mt-8 rounded-2xl border-2 border-dashed border-amber-500/40 bg-amber-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-amber-200">📝 Bẫy hay gặp</h3>
        <p className="mt-1 mb-2 text-sm text-[color:var(--muted)]">
          Đề hay cho một phát biểu <em>nghe hợp lý nhưng sai</em> — nhớ mấy chỗ
          gài sau:
        </p>
        <ul className="mt-0 mb-0 space-y-1.5 text-[color:var(--muted)]">
          <li>
            &quot;CPU hợp cho ML hơn GPU vì xung nhịp cao hơn&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: ML cần{" "}
            <strong>nhiều lõi chạy song song</strong> (GPU), không phải xung nhịp
            cao.
          </li>
          <li>
            &quot;Huấn luyện và suy luận luôn dùng cùng một phần cứng&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: thường khác nhau
            (train trên đám mây, chạy trên thiết bị yếu).
          </li>
          <li>
            &quot;ML cần độ chính xác số học rất cao&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: ngược lại, dùng ít
            bit (<strong>quantization</strong>) vẫn tốt mà còn nhanh, tiết kiệm.
          </li>
        </ul>
      </div>

      {/* Ghi nhớ */}
      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">
          📌 Ghi nhớ
        </h3>
        <div className="mt-3 space-y-2 text-[color:var(--ink)] leading-relaxed">
          <p className="m-0">
            <strong className="text-[color:var(--metal)]">ML cần:</strong> dữ liệu
            lớn · song song ồ ạt · ít bit (quantization)
          </p>
          <p className="m-0">
            <strong className="text-[color:var(--metal)]">Thứ tự hợp ML:</strong>{" "}
            GPU &gt; CPU; chip chuyên AI (ASIC/SoC) cho edge; train ở cloud
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong> phần
          cứng ảnh hưởng <strong>hiệu năng &amp; độ trễ</strong> — cùng mô hình
          nhưng chạy trên điện thoại hay đám mây cho tốc độ khác nhau. Đặc biệt{" "}
          <strong>quantization</strong> (nén số) có thể làm{" "}
          <strong>đổi nhẹ kết quả</strong> → cần kiểm thử lại trên đúng phần cứng
          sẽ triển khai, không chỉ trên máy huấn luyện.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Training", "Huấn luyện — dạy mô hình từ dữ liệu"],
          ["Inference", "Suy luận — mô hình đã học đưa ra dự đoán khi dùng thật"],
          ["Massively parallel processing", "Xử lý song song ồ ạt — nhiều phép tính cùng lúc"],
          ["Matrix multiplication", "Nhân ma trận — phép tính lõi của ML"],
          ["Quantization", "Lượng tử hóa — dùng ít bit hơn để tính (vd 4 bit thay 32 bit)"],
          ["Low-precision arithmetic", "Số học độ chính xác thấp"],
          ["CPU", "Bộ xử lý trung tâm — ít lõi, chính xác cao"],
          ["GPU", "Bộ xử lý đồ họa — hàng nghìn lõi, hợp ML"],
          ["Core", "Lõi xử lý — càng nhiều lõi càng chạy song song tốt"],
          ["Clock speed", "Xung nhịp — tốc độ mỗi lõi (CPU thường cao hơn GPU)"],
          ["ASIC", "Mạch tích hợp chuyên dụng — chip làm riêng cho AI"],
          ["System-on-a-Chip (SoC)", "Hệ thống trên một chip"],
          ["Edge computing", "Điện toán biên — xử lý ngay tại thiết bị, không gửi lên đám mây"],
          ["Neuromorphic processor", "Chip mô phỏng nơ-ron não (kiến trúc mới)"],
          ["von Neumann architecture", "Kiến trúc máy tính truyền thống (tách CPU–bộ nhớ)"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          For small-scale machine learning work, why do GPUs generally outperform
          CPUs?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong> GPUs run at a much higher clock speed than CPUs.
          </li>
          <li>
            <strong>b)</strong> GPUs have thousands of cores for massively
            parallel processing, which ML relies on.
          </li>
          <li>
            <strong>c)</strong> GPUs perform arithmetic with much higher precision
            than CPUs.
          </li>
          <li>
            <strong>d)</strong> GPUs do not need any cooling or power.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Với công việc ML quy mô nhỏ, vì sao GPU thường vượt trội hơn CPU?
            </p>
            <p className="m-0">
              <strong>a)</strong> GPU chạy xung nhịp cao hơn CPU nhiều.
            </p>
            <p className="m-0">
              <strong>b)</strong> GPU có hàng nghìn lõi để xử lý song song ồ ạt —
              thứ ML dựa vào.
            </p>
            <p className="m-0">
              <strong>c)</strong> GPU tính toán chính xác hơn CPU nhiều.
            </p>
            <p className="m-0">
              <strong>d)</strong> GPU không cần làm mát hay nguồn điện.
            </p>
          </div>
        </details>

        <details className="mt-3 group">
          <summary className="cursor-pointer text-sm font-semibold text-indigo-300 hover:text-indigo-200">
            Xem đáp án &amp; giải thích
          </summary>
          <div className="mt-2 text-sm space-y-2">
            <p className="m-0 rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-3 py-2 text-emerald-200 font-medium">
              ✅ <span className="font-bold text-white">Đáp án đúng:</span>{" "}
              <strong>b</strong> — GPU có hàng nghìn lõi, hợp phép tính song song
              ồ ạt của ML.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong> sai — CPU mới thường có xung nhịp cao hơn; đó
                không phải yếu tố quyết định cho ML.
              </p>
              <p className="m-0">
                <strong>c</strong> sai — ML không cần độ chính xác cao (còn dùng
                quantization để giảm bit).
              </p>
              <p className="m-0">
                <strong>d</strong> sai — GPU vẫn tốn điện và cần làm mát.
              </p>
            </div>
          </div>
        </details>
        <p className="mt-3 mb-0 text-xs italic text-[color:var(--faint)]">
          Đề để tiếng Anh cho sát đề thi thật; phần giải thích để tiếng Việt cho
          dễ hiểu. Câu hỏi do maiqai.com tự soạn theo phong cách đề.
        </p>
      </div>

      {/* Ghi chú nguồn */}
      <p className="mt-8 text-xs italic text-[color:var(--faint)] leading-relaxed border-t border-[color:var(--line)] pt-4">
        📎 Nguồn: Chương 1 – Giới thiệu AI, mục 1.1.5 &quot;Hardware for Machine
        Learning Systems&quot;, trang 18 — ISTQB® Certified Tester AI Testing
        Syllabus v2.0 (© International Software Testing Qualifications Board). Nội
        dung biên soạn/dịch ý lại bằng tiếng Việt, không sao chép nguyên văn.
      </p>
    </>
  );
}
