import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 6.1.5 — Metamorphic testing. */
export function SectionMetamorphicTesting() {
  return (
    <>
      <div className="badge">🧩 CT-AI · Chương 6 · Mục 6.1.5</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Metamorphic testing: không biết đáp án đúng, vẫn test được
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-6.1.5 · mức K3 – Áp dụng): <em>dùng</em>{" "}metamorphic testing
          để suy ra test case cho một kịch bản cho trước.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}
            metamorphic testing (MT) sinh test case{" "}
            <strong>follow-up</strong>{" "}từ một test case gốc đã pass, dựa trên{" "}
            <strong>metamorphic relation (MR)</strong>{" "}— kiểm tra{" "}
            <strong>quan hệ giữa các output</strong>{" "}thay vì giá trị output
            tuyệt đối.
          </p>
        </div>
      </div>

      {/* Nội dung cốt lõi */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Metamorphic Relation (MR) là gì
      </h2>
      <p className="mt-3 text-sm text-[color:var(--muted)] leading-relaxed">
        MR dựa trên một <strong>thuộc tính của chức năng</strong>{" "}cần có ở đối
        tượng test, và mô tả một thay đổi ở input của test case sẽ phản ánh
        thế nào ở kết quả mong đợi của chính test case đó. Tester thường
        kiểm tra 3 loại mục tiêu:
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Mục tiêu", "Ý nghĩa", "Ví dụ"].map((h) => (
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
                "Consistency (nhất quán)",
                "Output khớp nhau giữa các input liên quan.",
                "Đổi thứ tự các câu trong một đoạn văn không nên đổi kết quả phân loại chủ đề.",
              ],
              [
                "Monotonicity (đơn điệu)",
                "Output đổi theo một hướng nhất định khi input đổi theo hướng đó.",
                "Model rủi ro dự đoán tuổi thọ: tăng số điếu thuốc hút mỗi ngày phải làm giảm tuổi thọ dự đoán.",
              ],
              [
                "Invariance (bất biến)",
                "Output giữ nguyên dù input bị nhiễu nhẹ.",
                "Xoay nhẹ một bức ảnh không nên đổi kết quả nhận diện vật thể trong ảnh.",
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

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Khi nào nên chọn MT thay vì test dựa trên oracle truyền thống
      </h2>
      <ul className="mt-3 space-y-1.5 text-[color:var(--muted)] list-disc pl-5">
        <li>Không có expected output đáng tin cậy do model mờ đục (opacity) hoặc dữ liệu quá lớn để người kiểm tra thủ công.</li>
        <li>Hệ thống là black-box.</li>
        <li>Chỉ cần kiểm tra thuộc tính quan hệ (không cần giá trị tuyệt đối) là đủ để tạo niềm tin.</li>
      </ul>
      <p className="mt-3 text-sm text-[color:var(--muted)] leading-relaxed">
        MT thường dựa trên một test case gốc <strong>đã pass</strong>, nhưng
        cũng hữu ích ngay cả khi <strong>không thể tạo expected result</strong>{" "}
        — ví dụ chương trình cài đặt một hàm quá phức tạp để người test tự tay
        làm oracle, như một số MLS phức tạp. Trong tình huống này, MT sinh ra
        các test case mà quan hệ giữa các output (không phải giá trị thực
        của chúng) được kiểm tra tính hợp lệ — nếu quan hệ đó đúng, ta có thêm
        niềm tin vào chương trình. MT từng được dùng để test nhận diện ảnh,
        công cụ tìm kiếm, tối ưu tuyến đường, và nhận diện giọng nói.
      </p>
      <p className="mt-3 text-sm text-[color:var(--muted)] leading-relaxed">
        Tester rút ra MR từ kiến thức miền, yêu cầu, hoặc thuộc tính lĩnh vực
        (vd định luật vật lý). MR có thể được xác thực bằng review chuyên gia,
        chạy thử trên model tham chiếu, và kiểm tra độ bao phủ edge case.
      </p>

      <div className="mt-6 rounded-xl border border-sky-400/30 bg-sky-500/10 p-4 text-sm text-[color:var(--muted)] leading-relaxed">
        <p className="m-0">
          ⚠️ <strong className="text-[color:var(--ink)]">Giới hạn:</strong>{" "}MR
          sai (vd bỏ sót tương tác phức tạp giữa các biến) hoặc bộ MR chưa đầy
          đủ có thể dẫn đến <strong>niềm tin sai lệch</strong>{" "}(false
          confidence). MT phát hiện được lỗi về quan hệ nhưng{" "}
          <strong>không phát hiện được mọi lỗi tuyệt đối</strong>{" "}— nên cần
          kết hợp cùng các kỹ thuật test khác.
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
            &quot;MT luôn cần biết giá trị expected output tuyệt đối&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: MT kiểm tra{" "}
            <strong>quan hệ giữa các output</strong>, đặc biệt hữu ích khi
            không thể tạo expected result.
          </li>
          <li>
            &quot;MT phát hiện được mọi loại lỗi&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: MT phát hiện{" "}
            <strong>lỗi về quan hệ</strong>, không phải mọi lỗi tuyệt đối —
            cần dùng kết hợp với kỹ thuật khác.
          </li>
          <li>
            &quot;Tăng số cua thăng dự đoán tuổi thọ khi hút thuốc nhiều hơn
            là ví dụ của Invariance&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: đây là{" "}
            <strong>Monotonicity</strong>{" "}(output đổi theo hướng nhất định),
            không phải Invariance (output giữ nguyên).
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
            <strong className="text-[color:var(--metal)]">MT</strong>{" "}= test
            case gốc (đã pass) + MR → test case follow-up, kiểm tra quan hệ
            output
          </p>
          <p className="m-0">
            3 mục tiêu:{" "}
            <strong className="text-[color:var(--metal)]">
              Consistency
            </strong>{" "}
            ·{" "}
            <strong className="text-[color:var(--metal)]">
              Monotonicity
            </strong>{" "}
            · <strong className="text-[color:var(--metal)]">Invariance</strong>
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}khi
          không biết đâu là &quot;đáp án đúng&quot; cho một output ML (test
          oracle problem — 4.1.3), đừng bó tay — hỏi &quot;nếu tôi đổi input
          theo cách X, output nên đổi (hoặc không đổi) theo cách nào?&quot;.
          Đó chính là cách xây một MR.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Metamorphic testing (MT)", "Kiểm thử biến hình — suy test case từ quan hệ input/output"],
          ["Metamorphic relation (MR)", "Quan hệ biến hình — quy tắc mô tả thay đổi input phản ánh ở output"],
          ["Source test case", "Test case gốc (đã pass)"],
          ["Follow-up test case", "Test case suy ra từ test case gốc qua MR"],
          ["Consistency", "Tính nhất quán — output khớp nhau ở các input liên quan"],
          ["Monotonicity", "Tính đơn điệu — output đổi theo hướng nhất định"],
          ["Invariance", "Tính bất biến — output không đổi dù input bị nhiễu nhẹ"],
          ["Model opacity", "Tính mờ đục của model — khó hiểu logic bên trong"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K3)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          For an image-classification model, a tester rotates a passed test
          image slightly and expects the classification output to remain the
          same. Which metamorphic testing objective is being verified?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}Consistency.
          </li>
          <li>
            <strong>b)</strong>{" "}Monotonicity.
          </li>
          <li>
            <strong>c)</strong>{" "}Invariance.
          </li>
          <li>
            <strong>d)</strong>{" "}Transferability.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Với một model phân loại ảnh, tester xoay nhẹ một ảnh test đã
              pass và kỳ vọng kết quả phân loại không đổi. Mục tiêu metamorphic
              testing nào đang được kiểm tra?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}Consistency.
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}Monotonicity.
            </p>
            <p className="m-0">
              <strong>c)</strong>{" "}Invariance.
            </p>
            <p className="m-0">
              <strong>d)</strong>{" "}Transferability.
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
              <strong>c</strong>{" "}— kỳ vọng output giữ nguyên dù input bị nhiễu
              nhẹ (xoay ảnh) chính là Invariance.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong>{" "}sai — Consistency là khớp nhau giữa các
                input liên quan, không phải giữ nguyên khi nhiễu.
              </p>
              <p className="m-0">
                <strong>b</strong>{" "}sai — Monotonicity là output đổi theo hướng
                nhất định, không phải giữ nguyên.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — Transferability là khái niệm của
                adversarial testing (6.1.4), không phải mục tiêu MT.
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
        📎 Nguồn: Chương 6 – Kiểm thử mô hình cho hệ thống ML, mục 6.1.5
        &quot;Metamorphic Testing&quot;, trang 59–60 — ISTQB® Certified
        Tester AI Testing Syllabus v2.0 (© International Software Testing
        Qualifications Board). Nội dung biên soạn/dịch ý lại bằng tiếng Việt,
        không sao chép nguyên văn.
      </p>
    </>
  );
}
