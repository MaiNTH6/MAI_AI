import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 6.1.8 — Overfitting & Underfitting. */
export function SectionOverfittingUnderfitting() {
  return (
    <>
      <div className="badge">🧩 CT-AI · Chương 6 · Mục 6.1.8</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Overfitting và Underfitting: học &quot;quá kỹ&quot; hay học &quot;chưa tới&quot;
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-6.1.8 · mức K2 – Hiểu): <em>giải thích</em>{" "}cách phát hiện
          overfitting và underfitting bằng test.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}
            model ML có 3 khả năng: <strong>overfit</strong>,{" "}
            <strong>underfit</strong>, hoặc &quot;right-fit&quot; (khớp vừa
            đủ) — test cho cả hai lỗi cần thực hiện xuyên suốt huấn luyện,
            đánh giá, và tinh chỉnh.
          </p>
        </div>
      </div>

      {/* Bảng so sánh */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Overfitting vs Underfitting
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["", "Overfitting", "Underfitting"].map((h) => (
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
                "Nguyên nhân",
                "Model học dữ liệu huấn luyện quá kỹ — bắt luôn cả nhiễu (noise) thay vì chỉ học mẫu hình cốt lõi.",
                "Model quá đơn giản để nắm bắt cấu trúc dữ liệu, hoặc dữ liệu huấn luyện thiếu đặc trưng phản ánh mối quan hệ quan trọng giữa input và output.",
              ],
              [
                "Hệ quả",
                "Khái quát hóa kém trên dữ liệu mới, chưa từng thấy.",
                "Hiệu năng chức năng ML kém trên CẢ tập huấn luyện lẫn tập validation.",
              ],
              [
                "Cách phát hiện qua test",
                "Đánh giá hiệu năng model trên tập test riêng biệt (không dùng lúc huấn luyện), nên có một số ví dụ ít gặp/khó xuất hiện trong huấn luyện. Model có thể đang overfit nếu hiệu năng trên tập test kém hơn đáng kể so với tập validation.",
                "Đánh giá các thước đo hiệu năng (accuracy, precision, recall, F1) — nếu các chỉ số này thấp một cách nhất quán trên CẢ tập huấn luyện và validation, đó là dấu hiệu underfit. Quan sát trực quan learning curve: nếu lỗi huấn luyện & validation đều cao và gần nhau, không cải thiện đáng kể theo thời gian huấn luyện, đó cũng là dấu hiệu underfit.",
              ],
            ].map((r) => (
              <tr key={r[0]} className="even:bg-white/[0.04]">
                <td className="border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)] whitespace-nowrap">
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

      <p className="mt-4 text-sm text-[color:var(--muted)] leading-relaxed">
        Tóm lại, phát hiện overfitting/underfitting trong lúc test gồm 3 việc:
        đánh giá hiệu năng chức năng ML trên dữ liệu validation, phân tích
        các thước đo hiệu năng, và xem xét learning curve.
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
            &quot;Overfitting và underfitting là hai tên gọi khác nhau cho
            cùng một vấn đề&quot; → <strong className="text-amber-200">SAI</strong>
            : là <strong>hai vấn đề đối lập</strong>{" "}— cùng với &quot;right-
            fitting&quot; tạo thành 3 kết quả có thể xảy ra.
          </li>
          <li>
            &quot;Underfitting chỉ thể hiện qua hiệu năng kém trên tập
            validation&quot; → <strong className="text-amber-200">SAI</strong>
            : underfitting thể hiện hiệu năng kém trên{" "}
            <strong>cả tập huấn luyện lẫn validation</strong>.
          </li>
          <li>
            &quot;Model overfit sẽ có hiệu năng kém ngay cả trên tập huấn
            luyện&quot; → <strong className="text-amber-200">SAI</strong>:
            model overfit thường có hiệu năng{" "}
            <strong>tốt trên tập huấn luyện</strong>{" "}nhưng kém trên dữ liệu
            mới chưa từng thấy.
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
            <strong className="text-[color:var(--metal)]">Overfit</strong>{" "}=
            học quá kỹ, kém trên dữ liệu mới ·{" "}
            <strong className="text-[color:var(--metal)]">Underfit</strong>{" "}=
            học chưa tới, kém trên cả 2 tập
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}
          luôn so sánh hiệu năng trên <strong>3 tập</strong>{" "}(huấn luyện,
          validation, test) thay vì chỉ nhìn một con số — chênh lệch giữa
          chúng chính là manh mối để phân biệt overfit hay underfit.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Overfitting", "Quá khớp — model học thuộc dữ liệu huấn luyện, kém khái quát hóa"],
          ["Underfitting", "Chưa khớp — model quá đơn giản, học chưa đủ mẫu hình"],
          ["Right-fitting", "Khớp vừa đủ — kết quả lý tưởng"],
          ["Generalization", "Khả năng khái quát hóa trên dữ liệu mới"],
          ["Training dataset", "Tập dữ liệu huấn luyện"],
          ["Validation dataset", "Tập dữ liệu kiểm định"],
          ["Test dataset", "Tập dữ liệu kiểm thử"],
          ["Learning curve", "Đường cong học tập — biểu diễn lỗi theo quá trình huấn luyện"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          A model shows consistently low accuracy, precision, and recall on
          BOTH the training and validation datasets, and its learning curves
          show high, closely matched errors with little improvement over
          time. What does this indicate?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}Overfitting.
          </li>
          <li>
            <strong>b)</strong>{" "}Underfitting.
          </li>
          <li>
            <strong>c)</strong>{" "}Data drift.
          </li>
          <li>
            <strong>d)</strong>{" "}Adversarial vulnerability.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Một model có accuracy, precision, recall thấp một cách nhất
              quán trên CẢ tập huấn luyện và validation, và learning curve
              cho thấy lỗi cao, gần nhau, ít cải thiện theo thời gian. Điều
              này cho thấy điều gì?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}Overfitting.
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}Underfitting.
            </p>
            <p className="m-0">
              <strong>c)</strong>{" "}Data drift.
            </p>
            <p className="m-0">
              <strong>d)</strong>{" "}Dễ bị tấn công adversarial.
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
              <strong>b</strong>{" "}— hiệu năng thấp nhất quán trên cả hai tập
              cộng với learning curve như mô tả là dấu hiệu điển hình của
              underfitting.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong>{" "}sai — overfitting thường có hiệu năng tốt
                trên tập huấn luyện nhưng kém trên dữ liệu mới, không phải
                kém trên cả hai tập.
              </p>
              <p className="m-0">
                <strong>c</strong>{" "}sai — data drift liên quan thay đổi dữ liệu
                vận hành theo thời gian, không liên quan learning curve lúc
                huấn luyện.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — không liên quan đến input bị chỉnh
                sửa có chủ đích.
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
        📎 Nguồn: Chương 6 – Kiểm thử mô hình cho hệ thống ML, mục 6.1.8
        &quot;Testing for Overfitting and Underfitting&quot;, trang 60–61 —
        ISTQB® Certified Tester AI Testing Syllabus v2.0 (© International
        Software Testing Qualifications Board). Nội dung biên soạn/dịch ý lại
        bằng tiếng Việt, không sao chép nguyên văn.
      </p>
    </>
  );
}
