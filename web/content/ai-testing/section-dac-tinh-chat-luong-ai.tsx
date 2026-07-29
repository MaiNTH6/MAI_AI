import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 2.1.1 — Đặc tính chất lượng riêng của AI (ISO/IEC 25059). */
export function SectionDacTinhChatLuongAi() {
  return (
    <>
      <div className="badge">🎯 CT-AI · Chương 2 · Mục 2.1.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        7 đặc tính chất lượng riêng của hệ AI (ISO/IEC 25059)
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-2.1.1 · mức K2 – Hiểu): <em>phân loại</em> hành vi của hệ AI theo
          các đặc tính chất lượng trong <strong>ISO/IEC 25059</strong>.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}
            <strong>ISO/IEC 25059</strong> mở rộng mô hình chất lượng phần mềm{" "}
            <strong>ISO/IEC 25010</strong> để thêm các đặc tính riêng cho AI.
          </p>
          <p className="m-0 mt-1.5">
            Đánh giá theo <strong>2 góc</strong>: chất lượng sản phẩm (product
            quality) và chất lượng khi sử dụng (quality in use).
          </p>
        </div>
      </div>

      {/* Bảng 7 đặc tính */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Bảy đặc tính mới / điều chỉnh cho AI
      </h2>
      <p className="mt-1 text-[color:var(--muted)]">Thuộc bảng này là đủ ý để thi.</p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Đặc tính", "Thuộc nhóm", "Là gì"].map((h) => (
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
                "AI functional correctness (đúng đắn chức năng AI)",
                "Product quality",
                "Hệ AI xác suất không thể đúng tuyệt đối → chấp nhận có tỷ lệ lỗi, đặt ngưỡng cho kết quả sai.",
              ],
              [
                "Functional adaptability (khả năng thích ứng)",
                "Product quality",
                "Tự thích ứng với thay đổi của môi trường vận hành sau khi triển khai.",
              ],
              [
                "User controllability (người dùng kiểm soát được)",
                "Product quality",
                "Con người / tác nhân bên ngoài can thiệp kịp thời vào hoạt động của hệ.",
              ],
              [
                "Transparency (minh bạch)",
                "Product quality + Quality in use",
                "Mức thông tin phù hợp về hệ AI được truyền đạt cho các bên liên quan.",
              ],
              [
                "AI robustness (độ bền vững)",
                "Product quality",
                "Giữ được độ đúng đắn dù gặp dữ liệu thiên lệch/đối kháng/không hợp lệ, nhiễu ngoài, môi trường xấu, người dùng sai.",
              ],
              [
                "Intervenability (can thiệp được)",
                "Product quality",
                "Mức người vận hành can thiệp kịp thời để ngăn tổn hại / nguy hiểm.",
              ],
              [
                "Societal & ethical risk mitigation (giảm rủi ro xã hội & đạo đức)",
                "Quality in use",
                "Bao trùm: trách nhiệm giải trình, công bằng/không phân biệt, riêng tư, an toàn, kiểm soát của con người, bền vững môi trường...",
              ],
            ].map((r) => (
              <tr key={r[0]} className="even:bg-white/[0.04]">
                <td className="border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)]">
                  {r[0]}
                </td>
                <td className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)] whitespace-nowrap">
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
      <p className="mt-3 text-sm text-[color:var(--muted)]">
        Ghi chú: mỗi đặc tính là <em>sub-characteristic</em> mới/điều chỉnh của
        một nhóm trong ISO/IEC 25010 — vd robustness thuộc{" "}
        <strong>reliability</strong>, intervenability thuộc{" "}
        <strong>security</strong>, user controllability &amp; transparency thuộc{" "}
        <strong>interaction capability</strong> (tên mới thay cho{" "}
        <em>usability</em> ở bản 2023).
      </p>

      {/* Chỗ dễ ra đề */}
      <div className="mt-8 rounded-2xl border-2 border-dashed border-amber-500/40 bg-amber-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-amber-200">📝 Bẫy hay gặp</h3>
        <p className="mt-1 mb-2 text-sm text-[color:var(--muted)]">
          Đề hay cho một phát biểu <em>nghe hợp lý nhưng sai</em> — nhớ mấy chỗ
          gài sau:
        </p>
        <ul className="mt-0 mb-0 space-y-1.5 text-[color:var(--muted)]">
          <li>
            &quot;Hệ AI phải đúng 100%, không được có lỗi&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: AI xác suất{" "}
            <strong>chấp nhận tỷ lệ lỗi</strong> trong ngưỡng —{" "}
            <strong>AI functional correctness</strong>.
          </li>
          <li>
            Nhầm cặp <strong>user controllability</strong> (nhóm interaction
            capability) với <strong>intervenability</strong> (nhóm security) →{" "}
            cả hai đều &quot;can thiệp&quot; nhưng <strong>khác nhóm chất
            lượng</strong>.
          </li>
          <li>
            &quot;25059 thay thế hoàn toàn 25010&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: nó{" "}
            <strong>mở rộng</strong> 25010, không thay thế.
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
            <strong className="text-[color:var(--metal)]">25059</strong> = mở rộng{" "}
            <strong>25010</strong> cho AI · 2 góc: product quality + quality in use
          </p>
          <p className="m-0">
            <strong className="text-[color:var(--metal)]">7 đặc tính:</strong>{" "}
            đúng đắn · thích ứng · người dùng kiểm soát · minh bạch · bền vững ·
            can thiệp · giảm rủi ro xã hội-đạo đức
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong> các đặc
          tính này <strong>định hình mục tiêu kiểm thử</strong>: cách đặt{" "}
          <strong>tiêu chí chấp nhận</strong> (mục 2.2.1) và cách{" "}
          <strong>diễn giải kết quả test</strong>. Biết một hành vi thuộc đặc tính
          nào giúp chọn đúng kỹ thuật ở các chương sau.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["ISO/IEC 25059", "Tiêu chuẩn chất lượng riêng cho hệ AI (mở rộng 25010)"],
          ["ISO/IEC 25010", "Mô hình chất lượng phần mềm truyền thống"],
          ["Product quality", "Chất lượng sản phẩm — đo trên chính hệ thống"],
          ["Quality in use", "Chất lượng khi sử dụng — đo khi người dùng dùng thật"],
          ["AI functional correctness", "Đúng đắn chức năng AI — chấp nhận tỷ lệ lỗi trong ngưỡng"],
          ["Functional adaptability", "Khả năng thích ứng — tự thích ứng môi trường sau triển khai"],
          ["Functional suitability", "Tính phù hợp chức năng (nhóm cha của adaptability)"],
          ["User controllability", "Người dùng kiểm soát được — can thiệp kịp thời"],
          ["Interaction capability", "Năng lực tương tác (tên mới thay cho usability)"],
          ["Transparency", "Tính minh bạch — truyền đạt thông tin cho các bên"],
          ["AI robustness", "Độ bền vững — giữ đúng đắn dù dữ liệu/môi trường xấu"],
          ["Reliability", "Độ tin cậy (nhóm cha của robustness)"],
          ["Intervenability", "Khả năng can thiệp — ngăn tổn hại kịp thời"],
          ["Security", "An ninh (nhóm cha của intervenability)"],
          ["Societal and ethical risk mitigation", "Giảm rủi ro xã hội & đạo đức"],
          ["Freedom from risk", "Không có rủi ro (nhóm cha, thuộc quality in use)"],
          ["Fairness", "Tính công bằng — không phân biệt đối xử"],
          ["Accountability", "Trách nhiệm giải trình"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          An AI-based system must{" "}
          <strong>keep working correctly even when it receives biased,
          adversarial or invalid input data</strong>. Which ISO/IEC 25059 quality
          characteristic does this describe?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong> Functional adaptability.
          </li>
          <li>
            <strong>b)</strong> AI robustness.
          </li>
          <li>
            <strong>c)</strong> Transparency.
          </li>
          <li>
            <strong>d)</strong> User controllability.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Một hệ AI phải <strong>vẫn chạy đúng ngay cả khi nhận dữ liệu thiên
              lệch, đối kháng hoặc không hợp lệ</strong>. Đây là đặc tính chất
              lượng nào theo ISO/IEC 25059?
            </p>
            <p className="m-0">
              <strong>a)</strong> Khả năng thích ứng.
            </p>
            <p className="m-0">
              <strong>b)</strong> Độ bền vững (AI robustness).
            </p>
            <p className="m-0">
              <strong>c)</strong> Minh bạch.
            </p>
            <p className="m-0">
              <strong>d)</strong> Người dùng kiểm soát được.
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
              <strong>b</strong> — Giữ đúng đắn dù dữ liệu xấu/đối kháng chính là{" "}
              AI robustness.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong> sai — adaptability là tự thích ứng khi{" "}
                <em>môi trường thay đổi</em>, không phải chịu dữ liệu xấu.
              </p>
              <p className="m-0">
                <strong>c</strong> sai — transparency là truyền đạt thông tin cho
                các bên.
              </p>
              <p className="m-0">
                <strong>d</strong> sai — user controllability là con người can
                thiệp được.
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
        📎 Nguồn: Chương 2 – Đặc tính chất lượng, mục 2.1.1 &quot;AI-Specific
        Quality Characteristics&quot;, trang 21–22 — ISTQB® Certified Tester AI
        Testing Syllabus v2.0 (© International Software Testing Qualifications
        Board). Nội dung biên soạn/dịch ý lại bằng tiếng Việt, không sao chép
        nguyên văn.
      </p>
    </>
  );
}
