import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 5.1.1 — Rủi ro dữ liệu đầu vào & giảm thiểu. */
export function SectionRuiRoDuLieuDauVao() {
  return (
    <>
      <div className="badge">📥 CT-AI · Chương 5 · Mục 5.1.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Bản đồ rủi ro dữ liệu đầu vào — và cách test tương ứng cho từng loại
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-5.1.1 · mức K2 – Hiểu): <em>nêu ví dụ</em>{" "}các cách tiếp cận
          test dùng để giảm thiểu rủi ro dữ liệu đầu vào cho hệ thống ML.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}
            mục tiêu của input data testing là xác nhận dữ liệu dùng để huấn
            luyện, test và dự đoán có{" "}
            <strong>chất lượng đủ tốt</strong>{" "}— gồm review, kỹ thuật thống kê
            (test thiên lệch), EDA, và test tĩnh/động của data pipeline.
          </p>
        </div>
      </div>

      {/* Bảng rủi ro → cách giảm thiểu */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Rủi ro dữ liệu đầu vào thường gặp
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Rủi ro tiềm ẩn", "Cách giảm thiểu (test)"].map((h) => (
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
                "Lỗi trong dữ liệu huấn luyện gây thiên lệch; lỗi thuật toán/model/framework gây bất công hệ thống",
                "Kiểm thử thiên lệch (bias) — mục 5.1.2",
              ],
              [
                "Dữ liệu huấn luyện lấy từ nguồn không đáng tin; dữ liệu quản lý kém",
                "Data provenance testing (kiểm tra nguồn gốc dữ liệu)",
              ],
              [
                "Dữ liệu huấn luyện bị đầu độc (poisoned)",
                "A/B testing (6.1.9) · Data provenance testing · EDA (3.2.1) · Tấn công trong red teaming (4.2.2)",
              ],
              [
                "Tập dữ liệu không nhất quán nội bộ; dữ liệu ngoài phạm vi; sai kiểu dữ liệu",
                "Dataset constraint testing — mục 5.1.5",
              ],
              [
                "Chọn đặc trưng (feature) chưa tối ưu",
                "Feature testing (kiểm thử đặc trưng)",
              ],
              [
                "Tập dữ liệu mất cân bằng do thiếu bao phủ các lớp mục tiêu; tập dữ liệu lệch do tăng cường dữ liệu; thiếu dữ liệu; dữ liệu chỉ tập trung vào một nhóm use case; chưa bao phủ đủ khoảng giá trị",
                "Data representativeness testing (kiểm thử tính đại diện) — mục 5.1.4",
              ],
              [
                "Hướng dẫn gán nhãn kém; dữ liệu mơ hồ; chú thích kém dẫn đến nhãn sai/không nhất quán",
                "Label correctness testing (kiểm thử đúng đắn nhãn) — mục 5.1.6",
              ],
              [
                "Thiết kế/tích hợp kém gây lỗi pipeline; lỗi chất lượng dữ liệu làm hỏng output pipeline; hiệu năng suy giảm khi vận hành; sự cố bảo mật hoặc thay đổi không kiểm soát ảnh hưởng pipeline",
                "Data pipeline testing (kiểm thử đường ống dữ liệu) — mục 5.1.3",
              ],
            ].map((r) => (
              <tr key={r[0]} className="even:bg-white/[0.04]">
                <td className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--ink)]">
                  {r[0]}
                </td>
                <td className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)] whitespace-nowrap">
                  {r[1]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-[color:var(--muted)] leading-relaxed">
        Đây là <strong>bản đồ tổng quan</strong>{" "}của cả Chương 5 — mỗi hàng
        trong bảng trên tương ứng với một mục con sẽ được đào sâu riêng
        (5.1.2 → 5.1.6). Ý nghĩa của mục 5.1.1 là giúp tester{" "}
        <strong>nhìn toàn cảnh</strong>{" "}trước khi đi vào chi tiết từng kỹ
        thuật.
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
            &quot;Dữ liệu mất cân bằng giữa các lớp chỉ liên quan đến kiểm
            thử thiên lệch (bias)&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: mất cân bằng lớp
            (do thiếu bao phủ, tăng cường dữ liệu lệch...) thuộc phạm vi{" "}
            <strong>data representativeness testing</strong>.
          </li>
          <li>
            &quot;Dataset constraint testing dùng để phát hiện dữ liệu bị
            gán nhãn sai&quot; → <strong className="text-amber-200">SAI</strong>:
            nhãn sai thuộc <strong>label correctness testing</strong>;
            constraint testing kiểm tra tính nhất quán/kiểu dữ liệu/khoảng
            giá trị.
          </li>
          <li>
            &quot;Dữ liệu huấn luyện bị đầu độc (poisoned) chỉ phát hiện được
            qua EDA&quot; → <strong className="text-amber-200">SAI</strong>:
            còn có thể phát hiện qua <strong>A/B testing</strong>, data
            provenance testing, hoặc qua <strong>red teaming</strong>.
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
            Mỗi loại rủi ro dữ liệu đầu vào có{" "}
            <strong className="text-[color:var(--metal)]">
              một kỹ thuật test tương ứng
            </strong>{" "}
            — không có một phép test &quot;vạn năng&quot;.
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}khi
          nhận một tập dữ liệu ML để kiểm thử, hãy dùng bảng trên như{" "}
          <strong>checklist rà soát nhanh</strong>{" "}— hỏi lần lượt: có thiên
          lệch không? nguồn gốc có tin cậy không? có nhất quán không? có đại
          diện không? nhãn có đúng không? pipeline có ổn định không?
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Input data testing", "Kiểm thử dữ liệu đầu vào"],
          ["Data provenance testing", "Kiểm tra nguồn gốc dữ liệu"],
          ["Poisoned training data", "Dữ liệu huấn luyện bị đầu độc (chèn dữ liệu độc hại có chủ đích)"],
          ["Feature testing", "Kiểm thử đặc trưng (thuộc tính dùng để học)"],
          ["Dataset constraint testing", "Kiểm thử ràng buộc tập dữ liệu"],
          ["Data representativeness testing", "Kiểm thử tính đại diện của dữ liệu"],
          ["Label correctness testing", "Kiểm thử đúng đắn của nhãn"],
          ["Data pipeline testing", "Kiểm thử đường ống xử lý dữ liệu"],
          ["EDA (Exploratory Data Analysis)", "Phân tích dữ liệu khám phá"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          A dataset contains records where an attribute specified as an
          integer sometimes holds text values, and some records duplicate
          each other exactly. Which test approach targets this risk?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}Testing for bias.
          </li>
          <li>
            <strong>b)</strong>{" "}Data representativeness testing.
          </li>
          <li>
            <strong>c)</strong>{" "}Dataset constraint testing.
          </li>
          <li>
            <strong>d)</strong>{" "}Label correctness testing.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Một tập dữ liệu có bản ghi mà thuộc tính khai báo kiểu số
              nguyên nhưng đôi khi chứa giá trị chữ, và một số bản ghi trùng
              lặp hoàn toàn với nhau. Cách tiếp cận test nào nhắm đúng rủi ro
              này?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}Kiểm thử thiên lệch.
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}Kiểm thử tính đại diện.
            </p>
            <p className="m-0">
              <strong>c)</strong>{" "}Kiểm thử ràng buộc tập dữ liệu.
            </p>
            <p className="m-0">
              <strong>d)</strong>{" "}Kiểm thử đúng đắn của nhãn.
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
              <strong>c</strong>{" "}— sai kiểu dữ liệu và bản ghi trùng lặp là
              đúng phạm vi của dataset constraint testing.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong>{" "}sai — bias liên quan đối xử bất công theo
                thuộc tính nhạy cảm, không phải kiểu dữ liệu/trùng lặp.
              </p>
              <p className="m-0">
                <strong>b</strong>{" "}sai — representativeness liên quan mức độ
                khớp với dữ liệu thực tế, không phải tính hợp lệ của giá trị.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — label correctness liên quan độ chính
                xác của nhãn, không phải kiểu dữ liệu hay trùng lặp bản ghi.
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
        📎 Nguồn: Chương 5 – Kiểm thử dữ liệu đầu vào cho hệ thống ML, mục
        5.1.1 &quot;Input Data Risks and Mitigations&quot;, trang 47–48 —
        ISTQB® Certified Tester AI Testing Syllabus v2.0 (© International
        Software Testing Qualifications Board). Nội dung biên soạn/dịch ý lại
        bằng tiếng Việt, không sao chép nguyên văn.
      </p>
    </>
  );
}
