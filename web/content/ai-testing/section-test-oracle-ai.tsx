import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 4.1.3 — Test oracle cho hệ thống AI. */
export function SectionTestOracleAi() {
  return (
    <>
      <div className="badge">🧪 CT-AI · Chương 4 · Mục 4.1.3</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        &quot;Test oracle problem&quot; — khi không biết đâu là kết quả đúng
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-4.1.3 · mức K2 – Hiểu): <em>giải thích</em>{" "}các thách thức và
          hướng giải quyết liên quan đến test oracle cho hệ AI.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}
            với phần mềm truyền thống, spec rõ ràng giúp biết ngay kết quả nào
            là đúng. Với AI, việc <strong>xác định kết quả mong đợi</strong>{" "}có
            thể rất khó — thậm chí bất khả thi trong nhiều trường hợp.
          </p>
        </div>
      </div>

      {/* Bảng thách thức */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        5 nguyên nhân khiến test oracle của AI khó
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Nguyên nhân", "Vì sao khó"].map((h) => (
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
                "Bản chất xác suất, không xác định",
                "Cùng đầu vào có thể ra đầu ra khác nhau. Nhiều bài toán có một giá trị đích đúng (như supervised learning) nhưng output vẫn mang tính xác suất — muốn có oracle pass/fail rõ ràng thường phải đặt ngưỡng (threshold) hoặc khoảng dung sai.",
              ],
              [
                "Phát triển mang tính khám phá, spec chưa đủ",
                "Phát triển AI thường thử-sai (exploratory). Yêu cầu hệ thống có thể thay đổi, chưa đầy đủ, hoặc còn thiếu — không đủ chi tiết để suy ra kết quả mong đợi chính xác.",
              ],
              [
                "Độ phức tạp của tác vụ",
                "Hệ AI thường xử lý những việc quá phức tạp để con người kiểm tra thủ công một cách khả thi.",
              ],
              [
                "Tính chủ quan của hành vi",
                "Đúng/sai đôi khi mang tính chủ quan — kỳ vọng người dùng với một trợ lý ảo, ví dụ, rất khác nhau giữa người này với người khác, khó thống nhất một chuẩn chung.",
              ],
              [
                "Hệ tự học (self-learning)",
                "Hệ liên tục cập nhật mô hình nội bộ theo dữ liệu mới sau triển khai — khiến khái niệm \"đúng\" thay đổi theo thời gian; một bộ kết quả mong đợi ban đầu có thể nhanh chóng hết hiệu lực.",
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

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        5 hướng giải quyết
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Cách làm", "Ý tưởng"].map((h) => (
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
                "Defining Output Boundaries",
                "Thống nhất khoảng chấp nhận, phân phối, giới hạn hoặc dung sai — ví dụ xe tự lái phải dừng trong một khoảng cách tối đa cho phép.",
              ],
              [
                "Defining Environmental Boundaries",
                "Chốt các giá trị điều kiện môi trường test (ánh sáng, nhiệt độ, độ trễ mạng...) để đầu ra có thể dự đoán được và lặp lại được.",
              ],
              [
                "Expert Consultation",
                "Nhờ chuyên gia miền xác định kết quả mong đợi — lưu ý ý kiến chuyên gia có thể khác nhau hoặc không phải lúc nào cũng đúng.",
              ],
              [
                "Specialized Testing",
                "Dùng các kỹ thuật như A/B testing, back-to-back testing, metamorphic testing... để đánh giá bằng cách so sánh hành vi hoặc kiểm tra một thuộc tính bất biến, không cần expected output rõ ràng cho từng ca.",
              ],
              [
                "Proxy Oracles",
                "Dùng một hệ thống/mô hình phụ (có thể là một AI khác) để đánh giá kết quả khi không có expected result trực tiếp — ví dụ huấn luyện một proxy model trên dữ liệu có nhãn để dự đoán cho các ca test chưa có nhãn.",
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

      {/* Chỗ dễ ra đề */}
      <div className="mt-8 rounded-2xl border-2 border-dashed border-amber-500/40 bg-amber-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-amber-200">📝 Bẫy hay gặp</h3>
        <p className="mt-1 mb-2 text-sm text-[color:var(--muted)]">
          Đề hay cho một phát biểu <em>nghe hợp lý nhưng sai</em>{" "}— nhớ mấy chỗ
          gài sau:
        </p>
        <ul className="mt-0 mb-0 space-y-1.5 text-[color:var(--muted)]">
          <li>
            &quot;Test oracle problem chỉ xảy ra vì hệ AI xác suất&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: còn do phát triển
            kiểu khám phá/spec thiếu, tác vụ quá phức tạp để người kiểm chứng,
            hành vi mang tính chủ quan, và hệ tự học khiến &quot;đúng&quot; đổi
            theo thời gian.
          </li>
          <li>
            &quot;Proxy oracle nghĩa là bỏ qua việc đánh giá&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: proxy oracle là
            dùng <strong>một hệ/mô hình khác</strong>{" "}để đánh giá thay, không
            phải bỏ qua kiểm chứng.
          </li>
          <li>
            &quot;A/B testing, back-to-back, metamorphic testing cần expected
            output đầy đủ cho mọi ca&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: đây chính là các
            kỹ thuật giúp <strong>né được</strong>{" "}yêu cầu đó, bằng cách so
            sánh hành vi hoặc kiểm tra thuộc tính bất biến.
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
              Test oracle problem
            </strong>{" "}
            = khó xác định kết quả đúng cho một input.
          </p>
          <p className="m-0">
            5 giải pháp:{" "}
            <strong className="text-[color:var(--metal)]">
              khoảng chấp nhận
            </strong>{" "}
            ·{" "}
            <strong className="text-[color:var(--metal)]">
              giới hạn môi trường
            </strong>{" "}
            ·{" "}
            <strong className="text-[color:var(--metal)]">chuyên gia</strong>{" "}
            ·{" "}
            <strong className="text-[color:var(--metal)]">
              test chuyên biệt
            </strong>{" "}
            · <strong className="text-[color:var(--metal)]">proxy oracle</strong>
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}khi
          không thể viết được expected result rõ ràng, đừng bỏ cuộc — chọn một
          trong 5 hướng trên thay vì cố ép hệ AI vào khuôn &quot;pass/fail&quot;
          cứng nhắc kiểu phần mềm truyền thống.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Test oracle", "Nguồn xác định kết quả mong đợi để so sánh với kết quả thực tế"],
          ["Test oracle problem", "Bài toán khó xác định kết quả đúng cho hệ AI"],
          ["Ground truth", "Sự thật nền — dữ liệu/nhãn được coi là chuẩn đúng"],
          ["Output boundary", "Giới hạn/khoảng chấp nhận của đầu ra"],
          ["Environmental boundary", "Giới hạn điều kiện môi trường test"],
          ["Domain expert", "Chuyên gia miền (lĩnh vực)"],
          ["Proxy oracle", "Oracle thay thế — dùng hệ/mô hình phụ để đánh giá"],
          ["A/B testing", "So sánh hai phiên bản để chọn phiên bản tốt hơn"],
          ["Back-to-back testing", "So sánh output của nhiều phiên bản hệ thống với cùng đầu vào"],
          ["Metamorphic testing", "Kiểm tra quan hệ bất biến giữa các đầu vào/đầu ra liên quan"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          A team has no ground truth for many production inputs, so they train
          a secondary model on labeled data and use it to judge outputs for
          the unlabeled test cases. Which test oracle solution is this?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}Defining Output Boundaries.
          </li>
          <li>
            <strong>b)</strong>{" "}Expert Consultation.
          </li>
          <li>
            <strong>c)</strong>{" "}Proxy Oracles.
          </li>
          <li>
            <strong>d)</strong>{" "}Defining Environmental Boundaries.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Một nhóm không có ground truth cho nhiều input thực tế, nên họ
              huấn luyện một mô hình phụ trên dữ liệu có nhãn và dùng nó để
              chấm kết quả cho các ca test chưa có nhãn. Đây là giải pháp test
              oracle nào?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}Xác định khoảng chấp nhận đầu ra.
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}Tham vấn chuyên gia.
            </p>
            <p className="m-0">
              <strong>c)</strong>{" "}Proxy Oracle.
            </p>
            <p className="m-0">
              <strong>d)</strong>{" "}Xác định giới hạn môi trường.
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
              <strong>c</strong>{" "}— dùng một mô hình phụ để đánh giá thay khi
              không có expected result trực tiếp chính là Proxy Oracle.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong>{" "}sai — đây là đặt ngưỡng/khoảng dung sai cho
                đầu ra, không liên quan mô hình phụ.
              </p>
              <p className="m-0">
                <strong>b</strong>{" "}sai — đây là hỏi ý kiến người, không phải
                dùng một hệ thống khác để đánh giá.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — đây là cố định điều kiện môi trường
                test, không liên quan việc đánh giá kết quả bằng mô hình phụ.
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
        📎 Nguồn: Chương 4 – Kiểm thử hệ thống dựa trên AI, mục 4.1.3
        &quot;Test Oracles for AI-Based Systems&quot;, trang 40–41 — ISTQB®
        Certified Tester AI Testing Syllabus v2.0 (© International Software
        Testing Qualifications Board). Nội dung biên soạn/dịch ý lại bằng
        tiếng Việt, không sao chép nguyên văn.
      </p>
    </>
  );
}
