import { TermGlossary } from "@/components/TermGlossary";

// Tô màu ký hiệu khớp confusion matrix: TP/TN (đúng) xanh, FP/FN (sai) đỏ.
function colorTokens(formula: string) {
  return formula.split(/(TP|TN|FP|FN)/).map((part, i) => {
    if (part === "TP" || part === "TN")
      return (
        <span key={i} className="text-emerald-300 font-semibold">
          {part}
        </span>
      );
    if (part === "FP" || part === "FN")
      return (
        <span key={i} className="text-rose-300 font-semibold">
          {part}
        </span>
      );
    return part;
  });
}

/** Nội dung mục 3.3.1 — Tính thước đo hiệu năng ML (phân loại). K3. */
export function SectionTinhMetricMl() {
  return (
    <>
      <div className="badge">🤖 CT-AI · Chương 3 · Mục 3.3.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Confusion matrix &amp; cách tính Accuracy, Precision, Recall, F1
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-3.3.1 · mức <strong>K3 – Vận dụng</strong>):{" "}
          <em>tính</em>{" "}các thước đo hiệu năng ML cho bài toán phân loại. Đây là
          mục <strong>duy nhất phải làm tính toán</strong>{" "}— cần thuộc công thức.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}từ{" "}
            <strong>confusion matrix</strong>{" "}(TP, TN, FP, FN) suy ra 4 thước đo:
            accuracy, precision, recall, F1-score.
          </p>
        </div>
      </div>

      {/* Confusion matrix */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Confusion matrix (ma trận nhầm lẫn)
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full max-w-lg text-sm border-collapse text-center">
          <thead>
            <tr>
              <th className="border border-[color:var(--line2)] px-3 py-2" colSpan={2} rowSpan={2}></th>
              <th className="border border-[color:var(--line2)] px-3 py-2 bg-[color:var(--bg3)] font-semibold" colSpan={2}>
                Thực tế (Actual)
              </th>
            </tr>
            <tr>
              <th className="border border-[color:var(--line2)] px-3 py-2 bg-[color:var(--bg3)] font-semibold">
                Positive (P)
              </th>
              <th className="border border-[color:var(--line2)] px-3 py-2 bg-[color:var(--bg3)] font-semibold">
                Negative (N)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="border border-[color:var(--line2)] px-3 py-2 bg-[color:var(--bg3)] font-semibold" rowSpan={2}>
                Dự đoán
                <br />
                (Predicted)
              </th>
              <th className="border border-[color:var(--line2)] px-3 py-2 bg-[color:var(--bg3)] font-semibold">
                Positive
              </th>
              <td className="border border-[color:var(--line)] px-3 py-2 text-emerald-300 font-semibold">
                TP (True Positive)
              </td>
              <td className="border border-[color:var(--line)] px-3 py-2 text-rose-300 font-semibold">
                FP (False Positive)
              </td>
            </tr>
            <tr>
              <th className="border border-[color:var(--line2)] px-3 py-2 bg-[color:var(--bg3)] font-semibold">
                Negative
              </th>
              <td className="border border-[color:var(--line)] px-3 py-2 text-rose-300 font-semibold">
                FN (False Negative)
              </td>
              <td className="border border-[color:var(--line)] px-3 py-2 text-emerald-300 font-semibold">
                TN (True Negative)
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-3 rounded-xl border border-sky-400/30 bg-sky-500/10 p-4 text-sm text-[color:var(--muted)] leading-relaxed">
        <p className="m-0">
          🧭 <strong className="text-[color:var(--ink)]">Đọc bảng:</strong>{" "}
          <strong>Positive</strong>{" "}= lớp cần phát hiện (vd &quot;có lỗi&quot;),{" "}
          <strong>Negative</strong>{" "}= lớp còn lại (&quot;không lỗi&quot;). Chữ{" "}
          <strong>T/F</strong>{" "}= dự đoán Đúng/Sai; <strong>P/N</strong>{" "}= mô hình
          đoán là Positive/Negative.
        </p>
        <p className="m-0 mt-1.5">
          Vậy: <strong className="text-rose-300">FP</strong>{" "}= đoán Positive nhưng
          sai (báo động giả); <strong className="text-rose-300">FN</strong>{" "}= đoán
          Negative nhưng sai (bỏ sót ca Positive).
        </p>
      </div>
      <p className="mt-2 text-sm text-[color:var(--muted)]">
        Ma trận có thể trình bày khác đi (đảo dự đoán/thực tế), nhưng luôn cho 4
        giá trị <strong>TP · TN · FP · FN</strong>.
      </p>

      {/* Công thức */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        4 công thức phải thuộc
      </h2>
      <div className="mt-4 space-y-2 text-sm">
        {[
          ["Accuracy", "(TP + TN) / (TP + TN + FP + FN) × 100%", "% tổng số phân loại đúng."],
          ["Precision", "TP / (TP + FP) × 100%", "Trong các ca báo dương, bao nhiêu đúng — độ chắc chắn của dự đoán dương."],
          ["Recall (sensitivity)", "TP / (TP + FN) × 100%", "Trong các ca dương thật, bắt được bao nhiêu — mức không bỏ sót."],
          ["F1-score", "2 × (Precision × Recall) / (Precision + Recall)", "Trung bình điều hòa của precision & recall (0–100). Gần 100 = cân bằng tốt cả hai."],
        ].map(([name, formula, desc]) => (
          <div key={name} className="rounded-lg border border-[color:var(--line2)] bg-[color:var(--bg2)] p-3">
            <p className="m-0">
              <strong className="text-[color:var(--metal)]">{name}</strong>{" "}
              <code className="text-[color:var(--ink)]">= {colorTokens(formula)}</code>
            </p>
            <p className="m-0 mt-1 text-[color:var(--muted)]">{desc}</p>
          </div>
        ))}
      </div>

      {/* Ví dụ tính */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Ví dụ tính (hệ dự đoán lỗi)
      </h2>
      <div className="mt-4 rounded-xl border border-sky-400/30 bg-sky-500/10 p-4 text-sm text-[color:var(--muted)] leading-relaxed">
        <p className="m-0">
          Giả sử test 200 ca, được:{" "}
          <strong className="text-emerald-300">TP = 80</strong>,{" "}
          <strong className="text-rose-300">FP = 20</strong>,{" "}
          <strong className="text-rose-300">FN = 10</strong>,{" "}
          <strong className="text-emerald-300">TN = 90</strong>.
        </p>
        <div className="mt-2 space-y-1">
          <p className="m-0">
            <strong className="text-[color:var(--ink)]">Accuracy</strong>{" "}={" "}
            (80 + 90) / 200 = <strong>85%</strong>
          </p>
          <p className="m-0">
            <strong className="text-[color:var(--ink)]">Precision</strong>{" "}={" "}
            80 / (80 + 20) = 80 / 100 = <strong>80%</strong>
          </p>
          <p className="m-0">
            <strong className="text-[color:var(--ink)]">Recall</strong>{" "}={" "}
            80 / (80 + 10) = 80 / 90 ≈ <strong>88,9%</strong>
          </p>
          <p className="m-0">
            <strong className="text-[color:var(--ink)]">F1</strong>{" "}={" "}
            2 × (0,8 × 0,889) / (0,8 + 0,889) ≈ <strong>84,2</strong>
          </p>
        </div>
      </div>

      {/* Chỗ dễ ra đề */}
      <div className="mt-8 rounded-2xl border-2 border-dashed border-amber-500/40 bg-amber-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-amber-200">📝 Bẫy hay gặp</h3>
        <ul className="mt-2 mb-0 space-y-1.5 text-[color:var(--muted)]">
          <li>
            Nhầm mẫu số: <strong>Precision</strong>{" "}chia cho{" "}
            <strong>({colorTokens("TP + FP")})</strong>{" "}(theo cột dự đoán dương);{" "}
            <strong>Recall</strong>{" "}chia cho <strong>({colorTokens("TP + FN")})</strong>{" "}
            (theo hàng thực tế dương).
          </li>
          <li>
            <strong>Accuracy dễ đánh lừa</strong>{" "}khi dữ liệu mất cân bằng — nên
            xét thêm precision/recall/F1.
          </li>
          <li>
            F1 là <strong>trung bình điều hòa</strong>{" "}
            (harmonic mean), không phải trung bình cộng của precision &amp;
            recall.
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
            <strong className="text-[color:var(--metal)]">Precision</strong>{" "}= độ
            chắc dự đoán dương (TP/TP+FP) · <strong className="text-[color:var(--metal)]">Recall</strong>{" "}
            = không bỏ sót (TP/TP+FN)
          </p>
          <p className="m-0">
            <strong className="text-[color:var(--metal)]">F1</strong>{" "}= cân bằng cả
            hai (harmonic mean)
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}chọn
          thước đo theo <strong>rủi ro của việc bỏ sót vs báo nhầm</strong>. Vd hệ
          phát hiện bệnh/gian lận → ưu tiên <strong>recall</strong>{" "}(đừng bỏ sót);
          hệ lọc thư/chặn nội dung → coi trọng <strong>precision</strong>{" "}(đừng
          chặn nhầm). Đây là kỹ năng tính tay <strong>bắt buộc</strong>{" "}cho đề K3.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Confusion matrix", "Ma trận nhầm lẫn — bảng TP/TN/FP/FN"],
          ["True Positive (TP)", "Đúng dương — dự đoán dương và thực tế dương"],
          ["True Negative (TN)", "Đúng âm — dự đoán âm và thực tế âm"],
          ["False Positive (FP)", "Dương giả — báo dương nhưng thực tế âm (báo nhầm)"],
          ["False Negative (FN)", "Âm giả — báo âm nhưng thực tế dương (bỏ sót)"],
          ["Accuracy", "Độ chính xác — % phân loại đúng trên tổng"],
          ["Precision", "Độ chuẩn xác — TP/(TP+FP)"],
          ["Recall", "Độ bao phủ (sensitivity) — TP/(TP+FN)"],
          ["Sensitivity", "Độ nhạy — tên khác của recall"],
          ["F1-score", "Trung bình điều hòa của precision & recall"],
          ["Harmonic mean", "Trung bình điều hòa"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K3)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          A confusion matrix gives <strong>TP = 40, FP = 10, FN = 20, TN = 30</strong>.
          What is the <strong>precision</strong>?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}40% (= 40 / 100)
          </li>
          <li>
            <strong>b)</strong>{" "}66,7% (= 40 / 60)
          </li>
          <li>
            <strong>c)</strong>{" "}80% (= 40 / 50)
          </li>
          <li>
            <strong>d)</strong>{" "}70% (= 70 / 100)
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Ma trận nhầm lẫn cho <strong>TP = 40, FP = 10, FN = 20, TN = 30</strong>.
              Precision bằng bao nhiêu?
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
              <strong>c</strong>{" "}— Precision = TP/(TP+FP) = 40/(40+10) = 40/50 =
              80%.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>b</strong>{" "}sai — 40/(40+20) là <em>recall</em>, không phải
                precision.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — 70/100 là <em>accuracy</em>{" "}(TP+TN trên
                tổng).
              </p>
              <p className="m-0">
                <strong>a</strong>{" "}sai — chia nhầm mẫu số.
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
        📎 Nguồn: Chương 3 – Machine Learning, mục 3.3.1 &quot;Calculation of
        Machine Learning Functional Performance Metrics&quot;, trang 33–34 —
        ISTQB® Certified Tester AI Testing Syllabus v2.0 (© International Software
        Testing Qualifications Board). Nội dung biên soạn/dịch ý lại bằng tiếng
        Việt, không sao chép nguyên văn.
      </p>
    </>
  );
}
