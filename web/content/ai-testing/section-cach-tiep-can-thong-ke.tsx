import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 4.1.2 — Vì sao cần cách tiếp cận thống kê khi kiểm thử AI. */
export function SectionCachTiepCanThongKe() {
  return (
    <>
      <div className="badge">🧪 CT-AI · Chương 4 · Mục 4.1.2</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Vì sao một test case không đủ để &quot;chốt&quot; hệ AI đúng hay sai
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-4.1.2 · mức K2 – Hiểu): <em>giải thích</em>{" "}vì sao kiểm thử hệ
          AI thường cần cách tiếp cận thống kê.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}
            hệ AI mang bản chất{" "}
            <strong>xác suất &amp; phụ thuộc dữ liệu</strong>{" "}— một vài ví dụ
            đúng/sai không nói lên chất lượng tổng thể; cần một{" "}
            <strong>tập test đủ lớn, đủ ý nghĩa thống kê</strong>{" "}mới kết luận
            được.
          </p>
        </div>
      </div>

      {/* Bảng 4 lý do */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        4 lý do cần tiếp cận thống kê
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Lý do", "Vì sao"].map((h) => (
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
                "Non-Determinism (không xác định)",
                "Hệ AI vốn mang tính xác suất nên cùng đầu vào có thể không luôn cho cùng đầu ra (do yếu tố ngẫu nhiên trong kiến trúc, hoặc do ánh xạ xác suất học được từ dữ liệu huấn luyện). Một lần model nhận nhầm mèo thành chó không phản ánh đúng chất lượng tổng thể — cần tập test đủ lớn để kết quả có ý nghĩa thống kê.",
              ],
              [
                "Distributional Performance Evaluation (đánh giá theo phân phối)",
                "Model được huấn luyện trên một phân phối dữ liệu nhất định, không khớp hoàn toàn với môi trường vận hành thực tế. Muốn biết model chạy tốt trong thực tế, phải test trên một mẫu đủ lớn, đại diện cho phân phối dữ liệu vận hành — mới bắt được sự biến thiên thật của dữ liệu & hành vi model.",
              ],
              [
                "Handling Uncertainty and Bias (xử lý sự không chắc chắn & thiên lệch)",
                "Hệ AI dễ bị ảnh hưởng bởi thiên lệch dữ liệu và có thể đưa ra dự đoán sai nhưng rất tự tin. Test thống kê giúp định lượng & phân tích độ chính xác, tính công bằng, độ bền của model qua các thước đo như khoảng tin cậy, kiểm định giả thuyết, phân tích lỗi.",
              ],
              [
                "Regulatory and Safety Context (bối cảnh pháp lý & an toàn)",
                "Ở các ngành có quản lý chặt (y tế, giao thông...), cần chứng minh hệ AI đạt ngưỡng an toàn/công bằng với độ tin cậy cao. Phương pháp thống kê giúp đưa ra bằng chứng cho độ tin cậy của model trên diện rộng kịch bản, thay vì chỉ vài ví dụ cụ thể.",
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

      <div className="mt-6 rounded-xl border border-sky-400/30 bg-sky-500/10 p-4 text-sm text-[color:var(--muted)] leading-relaxed">
        <p className="m-0">
          🔗 <strong className="text-[color:var(--ink)]">Liên hệ:</strong>{" "}cách
          áp dụng cụ thể của tiếp cận thống kê cho kiểm thử MLS xác suất được
          nói kỹ ở mục <strong>6.1.3</strong>{" "}(Test hiệu năng mô hình xác
          suất).
        </p>
      </div>

      {/* Chỗ dễ ra đề */}
      <div className="mt-8 rounded-2xl border-2 border-dashed border-amber-500/40 bg-amber-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-amber-200">📝 Bẫy hay gặp</h3>
        <p className="mt-1 mb-2 text-sm text-[color:var(--muted)]">
          Đề hay cho một phát biểu <em>nghe hợp lý nhưng sai</em>{" "}— nhớ mấy chỗ
          gài sau:
        </p>
        <ul className="mt-0 mb-0 space-y-1.5 text-[color:var(--muted)]">
          <li>
            &quot;Một test case model đoán sai đã đủ kết luận model kém&quot;
            → <strong className="text-amber-200">SAI</strong>: một lần sai
            không đại diện cho toàn bộ; cần bộ test{" "}
            <strong>đủ lớn về mặt thống kê</strong>.
          </li>
          <li>
            &quot;Dữ liệu huấn luyện đại diện tốt thì không cần test thêm
            trên dữ liệu vận hành thực tế&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: phân phối huấn
            luyện thường <strong>không khớp hoàn toàn</strong>{" "}với phân phối
            vận hành — vẫn cần mẫu test đại diện cho dữ liệu thực tế.
          </li>
          <li>
            &quot;Dự đoán có độ tự tin cao nghĩa là đúng&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: hệ AI có thể{" "}
            <strong>tự tin nhưng sai</strong>{" "}— đây chính là lý do cần thước đo
            thống kê như khoảng tin cậy, không chỉ nhìn điểm confidence.
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
            4 lý do:{" "}
            <strong className="text-[color:var(--metal)]">
              Non-determinism
            </strong>{" "}
            ·{" "}
            <strong className="text-[color:var(--metal)]">
              phân phối huấn luyện ≠ vận hành
            </strong>{" "}
            ·{" "}
            <strong className="text-[color:var(--metal)]">
              bias &amp; tự tin sai
            </strong>{" "}
            ·{" "}
            <strong className="text-[color:var(--metal)]">
              yêu cầu pháp lý/an toàn
            </strong>
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}
          đừng đánh giá hệ AI qua vài ví dụ &quot;bắt lỗi&quot; đơn lẻ như test
          phần mềm truyền thống — hãy nghĩ theo{" "}
          <strong>tập mẫu đủ lớn, đủ đại diện</strong>{" "}và báo cáo bằng thước đo
          thống kê (tỉ lệ đúng, khoảng tin cậy...) thay vì &quot;pass/fail&quot;
          của một ca đơn lẻ.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Statistical approach", "Cách tiếp cận thống kê"],
          ["Non-determinism", "Tính không xác định — cùng đầu vào có thể ra kết quả khác nhau"],
          ["Stochastic", "Ngẫu nhiên (có yếu tố xác suất)"],
          ["Distributional performance evaluation", "Đánh giá hiệu năng theo phân phối dữ liệu"],
          ["Operational data distribution", "Phân phối dữ liệu trong môi trường vận hành thực tế"],
          ["Confidence interval", "Khoảng tin cậy"],
          ["Hypothesis testing", "Kiểm định giả thuyết"],
          ["Error analysis", "Phân tích lỗi"],
          ["Statistical significance", "Ý nghĩa thống kê"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          A regulator requires evidence that a medical-imaging AI meets a
          safety threshold with high confidence before approval. Which reason
          for using a statistical testing approach does this best illustrate?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}Non-Determinism.
          </li>
          <li>
            <strong>b)</strong>{" "}Distributional Performance Evaluation.
          </li>
          <li>
            <strong>c)</strong>{" "}Regulatory and Safety Context.
          </li>
          <li>
            <strong>d)</strong>{" "}Handling Uncertainty and Bias.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Một cơ quan quản lý yêu cầu bằng chứng rằng một hệ AI chẩn đoán
              hình ảnh y tế đạt ngưỡng an toàn với độ tin cậy cao trước khi
              phê duyệt. Đây minh họa rõ nhất cho lý do nào?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}Non-Determinism.
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}Đánh giá theo phân phối.
            </p>
            <p className="m-0">
              <strong>c)</strong>{" "}Bối cảnh pháp lý &amp; an toàn.
            </p>
            <p className="m-0">
              <strong>d)</strong>{" "}Xử lý sự không chắc chắn &amp; thiên lệch.
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
              <strong>c</strong>{" "}— yêu cầu &quot;độ tin cậy cao&quot; trước khi
              phê duyệt trong ngành có quản lý chặt là đặc trưng của Regulatory
              and Safety Context.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong>{" "}sai — non-determinism nói về việc cùng đầu
                vào ra kết quả khác nhau, không phải về yêu cầu pháp lý.
              </p>
              <p className="m-0">
                <strong>b</strong>{" "}sai — liên quan phân phối dữ liệu huấn
                luyện vs vận hành, không phải yêu cầu phê duyệt.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — liên quan bias &amp; dự đoán tự tin
                sai, không phải bối cảnh quản lý.
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
        📎 Nguồn: Chương 4 – Kiểm thử hệ thống dựa trên AI, mục 4.1.2
        &quot;Rationale for a Statistical Approach to Testing AI-Based
        Systems&quot;, trang 40 — ISTQB® Certified Tester AI Testing Syllabus
        v2.0 (© International Software Testing Qualifications Board). Nội dung
        biên soạn/dịch ý lại bằng tiếng Việt, không sao chép nguyên văn.
      </p>
    </>
  );
}
