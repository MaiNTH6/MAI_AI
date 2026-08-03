import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 5.1.5 — Ràng buộc tập dữ liệu (dataset constraint testing). */
export function SectionRangBuocTapDuLieu() {
  return (
    <>
      <div className="badge">📥 CT-AI · Chương 5 · Mục 5.1.5</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Dataset constraint testing: đặt &quot;schema&quot; cho dữ liệu ML
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-5.1.5 · mức K3 – Áp dụng): <em>áp dụng</em>{" "}dataset constraint
          testing.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}
            giống database có schema, tập dữ liệu ML cũng có thể định nghĩa{" "}
            <strong>tập ràng buộc</strong>{" "}đóng vai trò &quot;mô hình
            logic&quot; của dữ liệu — dữ liệu đúng phải thỏa mãn các ràng buộc
            này.
          </p>
        </div>
      </div>

      {/* Bảng các loại ràng buộc */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        3 nhóm ràng buộc
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Nhóm", "Loại ràng buộc", "Ý nghĩa / ví dụ"].map((h) => (
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
                "Single-value (trên 1 giá trị/bản ghi)",
                "Missing",
                "Test giá trị/thuộc tính bị thiếu.",
              ],
              [
                "Single-value (trên 1 giá trị/bản ghi)",
                "Range",
                "Test một giá trị có nằm trong khoảng cho phép không.",
              ],
              [
                "Single-value (trên 1 giá trị/bản ghi)",
                "Type",
                "Test giá trị có đúng kiểu khai báo không (vd thuộc tính khai integer mà lại là chuỗi/số thực).",
              ],
              [
                "Multi-value (trên nhiều giá trị của 1 thuộc tính)",
                "Sum",
                "Tổng các giá trị bằng/vượt/không vượt một mốc cho trước (vd tổng điểm một chặng đua F1 không vượt 102, phải trên 50.5).",
              ],
              [
                "Multi-value (trên nhiều giá trị của 1 thuộc tính)",
                "Count",
                "Số lượng giá trị/bản ghi khác null bằng/vượt/không vượt một mốc cho trước.",
              ],
              [
                "Multi-value (trên nhiều giá trị của 1 thuộc tính)",
                "Duplicate",
                "Test giá trị/bản ghi trùng lặp (giống hệt hoặc gần giống), giới hạn số lượng cho phép (thường là 0).",
              ],
              [
                "Multi-value (trên nhiều giá trị của 1 thuộc tính)",
                "Useful",
                "Test một thuộc tính có giá trị lặp lại ở mức hợp lý — nếu mọi giá trị đều duy nhất (như ID, timestamp) thì thường không mang lại mẫu hình hữu ích để model học.",
              ],
              [
                "Multi-value (trên nhiều giá trị của 1 thuộc tính)",
                "Outlier",
                "Nhận diện các giá trị có thể coi là ngoại lai (outlier) về mặt thống kê.",
              ],
              [
                "Comparison (so sánh giữa 2 thuộc tính)",
                "Greater Than",
                "Test giá trị một thuộc tính lớn hơn giá trị thuộc tính khác (vd số dòng code lớn hơn số dòng code có lỗi).",
              ],
              [
                "Comparison (so sánh giữa 2 thuộc tính)",
                "Correlate",
                "Test giá trị một thuộc tính có tương quan với giá trị thuộc tính khác (vd điểm số cao hơn 1.33 độ lệch chuẩn so với trung bình thì luôn có xếp loại 'A').",
              ],
            ].map((r, i, arr) => {
              const showGroup = i === 0 || arr[i - 1][0] !== r[0];
              const groupSpan = arr.filter((x) => x[0] === r[0]).length;
              return (
                <tr key={r[1]} className="even:bg-white/[0.04]">
                  {showGroup && (
                    <td
                      rowSpan={groupSpan}
                      className="border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)]"
                    >
                      {r[0]}
                    </td>
                  )}
                  <td className="border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)] whitespace-nowrap">
                    {r[1]}
                  </td>
                  <td className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)]">
                    {r[2]}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-[color:var(--muted)] leading-relaxed">
        Test theo các ràng buộc trên có thể làm{" "}
        <strong>thủ công</strong>, nhưng do quy mô hoạt động và kích thước tập
        dữ liệu ML thường rất lớn, thực tế cần{" "}
        <strong>tự động hóa như một phần của data pipeline</strong>. Khi được
        cài đặt trong pipeline, công cụ constraint testing có thể xuất báo cáo
        cho data scientist (bất thường trong dữ liệu huấn luyện) hoặc cho đội
        vận hành (vấn đề dữ liệu vận hành).
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
            &quot;Useful constraint kiểm tra giá trị có &apos;hữu ích&apos;
            về mặt kinh doanh&quot; → <strong className="text-amber-200">SAI</strong>
            : &quot;Useful&quot; kiểm tra thuộc tính có{" "}
            <strong>giá trị lặp lại</strong>{" "}— nếu mọi giá trị đều duy nhất
            (như ID) thì thường <strong>không cung cấp mẫu hình hữu ích</strong>{" "}
            cho model học.
          </li>
          <li>
            &quot;Correlate và Greater Than đều là single-value
            constraint&quot; → <strong className="text-amber-200">SAI</strong>
            : cả hai là <strong>comparison constraint</strong>, so sánh giữa
            hai thuộc tính.
          </li>
          <li>
            &quot;Dataset constraint testing luôn nên làm thủ công để chính
            xác hơn&quot; → <strong className="text-amber-200">SAI</strong>:
            do quy mô dữ liệu lớn, thực tế nên{" "}
            <strong>tự động hóa trong pipeline</strong>.
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
            3 nhóm ràng buộc:{" "}
            <strong className="text-[color:var(--metal)]">
              single-value
            </strong>{" "}
            (Missing/Range/Type) ·{" "}
            <strong className="text-[color:var(--metal)]">multi-value</strong>{" "}
            (Sum/Count/Duplicate/Useful/Outlier) ·{" "}
            <strong className="text-[color:var(--metal)]">comparison</strong>{" "}
            (Greater Than/Correlate)
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}
          nghĩ về dataset constraint testing như việc{" "}
          <strong>viết schema cho dữ liệu ML</strong>{" "}— và vì dữ liệu ML
          thường rất lớn, nên tự động hóa các ràng buộc này thành một bước
          trong pipeline, không chờ kiểm tra thủ công.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Dataset constraint testing", "Kiểm thử ràng buộc tập dữ liệu"],
          ["Single-value constraint", "Ràng buộc trên một giá trị (một thuộc tính, một bản ghi)"],
          ["Multi-value constraint", "Ràng buộc trên nhiều giá trị (một thuộc tính, nhiều bản ghi)"],
          ["Comparison constraint", "Ràng buộc so sánh giữa hai thuộc tính"],
          ["Outlier", "Giá trị ngoại lai"],
          ["Duplicate", "Trùng lặp"],
          ["Database schema", "Lược đồ cơ sở dữ liệu"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K3)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          A dataset has an attribute where every value is unique, like a
          timestamp, offering the model no learnable pattern. Which
          constraint type identifies this issue?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}Range constraint.
          </li>
          <li>
            <strong>b)</strong>{" "}Useful constraint.
          </li>
          <li>
            <strong>c)</strong>{" "}Correlate constraint.
          </li>
          <li>
            <strong>d)</strong>{" "}Type constraint.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Một tập dữ liệu có thuộc tính mà mọi giá trị đều duy nhất, như
              timestamp, không cung cấp mẫu hình nào để model học. Loại ràng
              buộc nào phát hiện vấn đề này?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}Ràng buộc Range.
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}Ràng buộc Useful.
            </p>
            <p className="m-0">
              <strong>c)</strong>{" "}Ràng buộc Correlate.
            </p>
            <p className="m-0">
              <strong>d)</strong>{" "}Ràng buộc Type.
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
              <strong>b</strong>{" "}— Useful constraint đúng là kiểm tra thuộc
              tính có giá trị lặp lại đủ để hữu ích cho model học hay không.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong>{" "}sai — Range kiểm tra giá trị nằm trong
                khoảng cho phép, không liên quan tính duy nhất.
              </p>
              <p className="m-0">
                <strong>c</strong>{" "}sai — Correlate so sánh tương quan giữa hai
                thuộc tính, không kiểm tra tính lặp lại của một thuộc tính.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — Type kiểm tra đúng kiểu dữ liệu,
                không liên quan tính lặp lại.
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
        5.1.5 &quot;Dataset Constraint Testing&quot;, trang 51–52 — ISTQB®
        Certified Tester AI Testing Syllabus v2.0 (© International Software
        Testing Qualifications Board). Nội dung biên soạn/dịch ý lại bằng
        tiếng Việt, không sao chép nguyên văn.
      </p>
    </>
  );
}
