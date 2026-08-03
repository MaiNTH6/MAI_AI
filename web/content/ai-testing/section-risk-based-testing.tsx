import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 4.3.2 — Risk-based testing cho hệ thống ML. */
export function SectionRiskBasedTesting() {
  return (
    <>
      <div className="badge">🧪 CT-AI · Chương 4 · Mục 4.3.2</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Risk-based testing cho MLS: 3 vùng rủi ro cần soi
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-4.3.2 · mức K2 – Hiểu): <em>giải thích</em>{" "}cách áp dụng
          risk-based testing cho hệ thống machine learning.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}
            risk-based testing áp dụng cho{" "}
            <strong>mọi hệ thống</strong>, có AI hay không; nhưng hệ AI có rủi
            ro riêng, thường được chia theo{" "}
            <strong>3 vùng của quy trình ML</strong>: development, input data,
            model.
          </p>
        </div>
      </div>

      {/* Bảng 3 vùng rủi ro */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        3 vùng rủi ro theo quy trình ML
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Vùng", "Liên quan đến", "Ví dụ rủi ro", "Xem thêm"].map(
                (h) => (
                  <th
                    key={h}
                    className="border border-[color:var(--line2)] px-3 py-2 text-left font-semibold"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {[
              [
                "Development (project risk)",
                "Thuật toán ML, việc phát triển model, framework phát triển ML.",
                "Chọn thuật toán chưa tối ưu, chọn cách đánh giá kém phù hợp, lỗ hổng bảo mật trong framework.",
                "Chương 7",
              ],
              [
                "Input data (product risk)",
                "Việc cung cấp dữ liệu huấn luyện cho ML và dữ liệu sản xuất mà model dùng trong môi trường vận hành.",
                "Dữ liệu huấn luyện thiên lệch, lỗi trong data pipeline, dữ liệu huấn luyện không đại diện.",
                "Chương 5",
              ],
              [
                "Model (product risk)",
                "Model ML được tạo ra — sản phẩm cuối của quy trình ML.",
                "Không đạt thước đo hiệu năng chức năng ML yêu cầu, model bị overfit, dễ bị đánh lừa bởi adversarial example.",
                "Chương 6",
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
                <td className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)] whitespace-nowrap">
                  {r[3]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-[color:var(--muted)] leading-relaxed">
        Không có <strong>một cách chuẩn duy nhất</strong>{" "}để phân loại rủi ro
        ML. Cách chia theo 3 vùng ở trên chỉ là một hướng — syllabus còn nêu
        cách khác: phân loại theo{" "}
        <strong>các đặc tính chất lượng trong ISO/IEC 25059</strong>{" "}(xem
        Chương 2). Nhiều hình thức kiểm thử được thiết kế riêng để giải quyết
        các rủi ro này, ví dụ: <strong>data pipeline testing</strong>,{" "}
        <strong>adversarial testing</strong>, và{" "}
        <strong>review sự phù hợp của thuật toán/model</strong>{" "}— được trình
        bày rải rác ở các Chương 5, 6, 7.
      </p>

      {/* Chỗ dễ ra đề */}
      <div className="mt-8 rounded-2xl border-2 border-dashed border-amber-500/40 bg-amber-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-amber-200">📝 Bẫy hay gặp</h3>
        <p className="mt-1 mb-2 text-sm text-[color:var(--muted)]">
          Đề hay cho một phát biểu <em>nghe hợp lý nhưng sai</em>{" "}— nhớ mấy chỗ
          gài sau:
        </p>
        <ul className="mt-0 mb-0 space-y-1.5 text-[color:var(--muted)]">
          <li>
            &quot;Risk-based testing chỉ áp dụng cho hệ thống có AI&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: áp dụng cho{" "}
            <strong>mọi hệ thống</strong>, có AI hay không.
          </li>
          <li>
            &quot;Chỉ có một cách chuẩn để phân loại rủi ro ML&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: syllabus nêu rõ{" "}
            <strong>không có cách chuẩn duy nhất</strong>{" "}— có thể chia theo 3
            vùng workflow hoặc theo ISO/IEC 25059.
          </li>
          <li>
            &quot;Rủi ro ở vùng Development là product risk&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: đây là{" "}
            <strong>project risk</strong>{" "}(liên quan quá trình phát triển);
            input data và model mới là <strong>product risk</strong>.
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
            <strong className="text-[color:var(--metal)]">
              3 vùng:
            </strong>{" "}
            Development (project risk) · Input data (product risk) · Model
            (product risk)
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}khi
          ưu tiên test cho một dự án ML, đừng chỉ nhìn vào &quot;model có chạy
          đúng không&quot; — hãy rà cả 3 vùng: quy trình phát triển có chọn sai
          thuật toán/framework không, dữ liệu đầu vào có thiên lệch/thiếu đại
          diện không, và bản thân model có overfit hay dễ bị tấn công
          adversarial không.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Risk-based testing", "Kiểm thử theo mức độ rủi ro"],
          ["Project risk", "Rủi ro dự án — liên quan quá trình phát triển"],
          ["Product risk", "Rủi ro sản phẩm — liên quan bản thân hệ thống"],
          ["ML workflow", "Quy trình machine learning"],
          ["Overfitting", "Quá khớp — model học thuộc dữ liệu huấn luyện, kém khái quát hóa"],
          ["Adversarial example", "Đầu vào bị chỉnh sửa có chủ đích để đánh lừa model"],
          ["Data pipeline testing", "Kiểm thử đường ống xử lý dữ liệu"],
          ["Adversarial testing", "Kiểm thử bằng cách cố tình đánh lừa model"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          A project selected a sub-optimal ML algorithm and an inappropriate
          evaluation approach during development. Which risk category and
          type does this best represent?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}Model — product risk.
          </li>
          <li>
            <strong>b)</strong>{" "}Input data — product risk.
          </li>
          <li>
            <strong>c)</strong>{" "}Development — project risk.
          </li>
          <li>
            <strong>d)</strong>{" "}Development — product risk.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Một dự án chọn thuật toán ML chưa tối ưu và cách đánh giá không
              phù hợp trong quá trình phát triển. Đây thuộc vùng rủi ro và
              loại rủi ro nào?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}Model — product risk.
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}Input data — product risk.
            </p>
            <p className="m-0">
              <strong>c)</strong>{" "}Development — project risk.
            </p>
            <p className="m-0">
              <strong>d)</strong>{" "}Development — product risk.
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
              <strong>c</strong>{" "}— chọn thuật toán/cách đánh giá thuộc vùng
              Development, và đây là project risk (rủi ro trong quá trình phát
              triển).
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong>{" "}sai — vùng Model gắn với rủi ro như overfit,
                không đạt hiệu năng, không phải chọn thuật toán.
              </p>
              <p className="m-0">
                <strong>b</strong>{" "}sai — vùng Input data gắn với dữ liệu thiên
                lệch/lỗi pipeline, không liên quan chọn thuật toán.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — vùng Development gắn với{" "}
                <strong>project risk</strong>, không phải product risk.
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
        📎 Nguồn: Chương 4 – Kiểm thử hệ thống dựa trên AI, mục 4.3.2
        &quot;Risk-Based Testing of Machine Learning Systems&quot;, trang
        44–45 — ISTQB® Certified Tester AI Testing Syllabus v2.0 (©
        International Software Testing Qualifications Board). Nội dung biên
        soạn/dịch ý lại bằng tiếng Việt, không sao chép nguyên văn.
      </p>
    </>
  );
}
