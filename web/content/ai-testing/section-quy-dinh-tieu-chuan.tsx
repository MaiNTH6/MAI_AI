import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 1.1.8 — Quy định & tiêu chuẩn cho AI. */
export function SectionQuyDinhTieuChuan() {
  return (
    <>
      <div className="badge">🧠 CT-AI · Chương 1 · Mục 1.1.8</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Quy định &amp; tiêu chuẩn cho AI — tester cần biết gì?
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-1.1.8 · mức K2 – Hiểu): <em>giải thích</em> các quy định &amp;
          tiêu chuẩn ảnh hưởng tới phát triển và kiểm thử AI.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong> mục
            tiêu là <strong>tạo niềm tin</strong> vào AI — phát huy lợi ích trong
            khi <strong>giảm thiểu tác hại</strong>; hướng tới AI an toàn, công
            bằng, minh bạch, bền vững, có trách nhiệm giải trình, đạo đức.
          </p>
        </div>
      </div>

      {/* Bảng 3 tầng */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        3 tầng quản trị AI
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Tầng", "Là gì", "Ví dụ"].map((h) => (
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
                "Soft law (quốc tế)",
                "Nguyên tắc định hướng, không bắt buộc — kim chỉ nam cho các nước.",
                "OECD AI Principles; báo cáo UN “Governing AI for Humanity” (lấy con người làm trung tâm, đạo đức, hợp tác quốc tế).",
              ],
              [
                "Luật cứng (bắt buộc)",
                "Quy định pháp lý có chế tài, tiếp cận theo mức rủi ro.",
                "EU AI Act: phân loại rủi ro từ tối thiểu → không chấp nhận; hệ rủi ro cao phải test nghiêm ngặt, quản trị dữ liệu, có giám sát của con người; phạt nặng theo % doanh thu toàn cầu.",
              ],
              [
                "Tiêu chuẩn kỹ thuật",
                "Biến mục tiêu cao thành thực hành cụ thể (ISO / IEEE).",
                "ISO/IEC TR 29119-11 (hướng dẫn kiểm thử hệ AI); ISO/IEC 42119 (đang xây); quy định theo ngành (y tế, tài chính).",
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
      <p className="mt-3 text-sm text-[color:var(--muted)]">
        Ngoài EU, nhiều nước chọn cách <strong>nới lỏng hơn</strong> để khuyến
        khích đổi mới. Quản trị AI hiệu quả cần{" "}
        <strong>đối thoại &amp; hợp tác liên tục</strong> giữa nhà nước, doanh
        nghiệp, giới học thuật và xã hội; và vì AI thay đổi nhanh, quy định &amp;
        tiêu chuẩn phải được <strong>rà soát, cập nhật thường xuyên</strong>.
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
            &quot;EU AI Act quản mọi hệ AI như nhau&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: nó theo{" "}
            <strong>mức rủi ro</strong> — chỉ hệ <strong>rủi ro cao</strong> mới
            bị yêu cầu ngặt nghèo.
          </li>
          <li>
            &quot;OECD/UN là luật bắt buộc có chế tài&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: đó là{" "}
            <strong>soft law</strong> (định hướng); EU AI Act mới là luật cứng có
            phạt.
          </li>
          <li>
            &quot;Tiêu chuẩn hướng dẫn kiểm thử hệ AI là ISO 9001&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: đúng là{" "}
            <strong>ISO/IEC TR 29119-11</strong> (và ISO/IEC 42119 đang xây).
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
            <strong className="text-[color:var(--metal)]">3 tầng:</strong> soft law
            (OECD/UN) · luật cứng (EU AI Act) · tiêu chuẩn kỹ thuật (ISO/IEEE)
          </p>
          <p className="m-0">
            <strong className="text-[color:var(--metal)]">EU AI Act:</strong> tiếp
            cận theo <strong>mức rủi ro</strong>
          </p>
          <p className="m-0">
            <strong className="text-[color:var(--metal)]">Chuẩn test AI:</strong>{" "}
            ISO/IEC TR 29119-11
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong> đây là
          mục gần tester nhất. <strong>ISO/IEC TR 29119-11</strong> hướng dẫn cách
          kiểm thử hệ AI; hệ <strong>rủi ro cao</strong> theo EU AI Act bắt buộc{" "}
          <strong>test nghiêm ngặt + có con người giám sát</strong> → tester là
          mắt xích chứng minh tuân thủ, không chỉ là &quot;bắt bug&quot;.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Regulation", "Quy định (mang tính pháp lý, có thể có chế tài)"],
          ["Standard", "Tiêu chuẩn (thực hành kỹ thuật thống nhất)"],
          ["Soft law", "Luật mềm — định hướng, không bắt buộc"],
          ["OECD AI Principles", "Bộ nguyên tắc AI của OECD"],
          ["EU AI Act", "Đạo luật AI của EU — khung pháp lý theo mức rủi ro"],
          ["Risk-based approach", "Tiếp cận theo mức rủi ro"],
          ["High-risk system", "Hệ AI rủi ro cao (ảnh hưởng quyền cơ bản/an toàn)"],
          ["Data governance", "Quản trị dữ liệu"],
          ["Human oversight", "Sự giám sát của con người"],
          ["Accountability", "Trách nhiệm giải trình"],
          ["Transparency", "Tính minh bạch"],
          ["Human-centric AI", "AI lấy con người làm trung tâm"],
          ["ISO/IEC TR 29119-11", "Tiêu chuẩn hướng dẫn kiểm thử hệ thống AI"],
          ["ISO/IEC 42119", "Bộ tiêu chuẩn kiểm thử hệ AI (đang xây dựng)"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          Which statement about AI regulations and standards is{" "}
          <strong>correct</strong>?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong> The EU AI Act applies identical requirements to
            every AI system regardless of risk.
          </li>
          <li>
            <strong>b)</strong> The EU AI Act uses a risk-based approach; high-risk
            systems face stringent testing and human oversight.
          </li>
          <li>
            <strong>c)</strong> OECD AI Principles are binding law with financial
            penalties.
          </li>
          <li>
            <strong>d)</strong> No standard gives guidance on testing AI-based
            systems.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Phát biểu nào về quy định &amp; tiêu chuẩn AI là <strong>đúng</strong>?
            </p>
            <p className="m-0">
              <strong>a)</strong> EU AI Act áp dụng yêu cầu giống hệt cho mọi hệ
              AI bất kể rủi ro.
            </p>
            <p className="m-0">
              <strong>b)</strong> EU AI Act tiếp cận theo mức rủi ro; hệ rủi ro cao
              phải test nghiêm ngặt và có con người giám sát.
            </p>
            <p className="m-0">
              <strong>c)</strong> OECD AI Principles là luật bắt buộc, có phạt tiền.
            </p>
            <p className="m-0">
              <strong>d)</strong> Không có tiêu chuẩn nào hướng dẫn kiểm thử hệ AI.
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
              <strong>b</strong> — EU AI Act theo mức rủi ro; hệ rủi ro cao bị yêu
              cầu ngặt (test + giám sát con người).
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong> sai — không áp dụng như nhau; phân theo rủi ro.
              </p>
              <p className="m-0">
                <strong>c</strong> sai — OECD là soft law (định hướng), không phạt.
              </p>
              <p className="m-0">
                <strong>d</strong> sai — ISO/IEC TR 29119-11 hướng dẫn kiểm thử hệ
                AI.
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
        📎 Nguồn: Chương 1 – Giới thiệu AI, mục 1.1.8 &quot;Regulations and
        Standards for AI&quot;, trang 20–21 — ISTQB® Certified Tester AI Testing
        Syllabus v2.0 (© International Software Testing Qualifications Board). Nội
        dung biên soạn/dịch ý lại bằng tiếng Việt, không sao chép nguyên văn.
      </p>
    </>
  );
}
