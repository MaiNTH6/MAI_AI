import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 5.1.2 — Kiểm thử thiên lệch (bias). */
export function SectionKiemThuBias() {
  return (
    <>
      <div className="badge">📥 CT-AI · Chương 5 · Mục 5.1.2</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Kiểm thử thiên lệch (bias): tìm bất công &quot;ẩn&quot; trong hệ AI
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-5.1.2 · mức K2 – Hiểu): <em>giải thích</em>{" "}cách test thiên
          lệch (bias) cho hệ thống ML.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}
            bias là sự đối xử <strong>không công bằng, phi ngẫu nhiên</strong>{" "}
            dựa trên thuộc tính nhạy cảm (giới tính, tuổi, chủng tộc...) —
            thường vi phạm pháp luật. Bias có thể đến từ{" "}
            <strong>dữ liệu</strong>{" "}hoặc từ{" "}
            <strong>thuật toán/model</strong>.
          </p>
        </div>
      </div>

      {/* Bảng nguồn gốc + cách phát hiện */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        2 nguồn gốc của bias
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Loại", "Là gì", "Ví dụ"].map((h) => (
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
                "Data bias",
                "Lỗi trong dữ liệu huấn luyện — không đại diện, lệch theo lịch sử, hoặc bị đầu độc có chủ đích.",
                "Dữ liệu duyệt hồ sơ vay trong quá khứ vốn đã thiên vị một nhóm nhân khẩu học.",
              ],
              [
                "Algorithmic bias",
                "Lỗi trong thuật toán, model, hoặc framework phát triển gây bất công mang tính hệ thống.",
                "Thuật toán dùng một ngưỡng quyết định (decision threshold) cho điểm tín dụng trong hệ duyệt vay.",
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

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Các cách tiếp cận phát hiện bias
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Cách làm", "Mô tả"].map((h) => (
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
                "Review quy trình ML",
                "Rà lại toàn bộ ML workflow, đặc biệt bước chuẩn bị dữ liệu, để tìm khả năng phát sinh bias.",
              ],
              [
                "Review tài liệu tập dữ liệu",
                "Xem lại cách dữ liệu được thu thập, gán nhãn, và nhóm dân số nào được đại diện để tìm & giảm nguồn gốc bất công.",
              ],
              [
                "Phân tích tĩnh",
                "Soát code chuẩn bị dữ liệu và code cài đặt model để tìm anti-pattern hoặc cách xử lý sai thuộc tính nhạy cảm.",
              ],
              [
                "EDA dữ liệu huấn luyện",
                "Dùng trực quan hóa & phân cụm để lộ ra dữ liệu mất cân bằng, phân phối lệch, hoặc nhóm bất thường theo từng thuộc tính nhạy cảm.",
              ],
              [
                "Test động (dynamic testing)",
                "Đưa một tập dữ liệu đã biết là không thiên lệch, đại diện tốt vào hệ, rồi phân tích dự đoán xem có khác biệt có ý nghĩa thống kê giữa các nhóm nhạy cảm không — phát hiện bias dù nó đến từ dữ liệu hay từ model.",
              ],
              [
                "Label correctness testing",
                "Tìm lỗi gán nhãn khiến hệ học sai mối liên hệ giữa thuộc tính và kết quả cho một nhóm nhạy cảm cụ thể (xem 5.1.6).",
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
        Disparate Impact Analysis (phân tích tác động chênh lệch)
      </h2>
      <ol className="mt-4 space-y-2 text-[color:var(--muted)] list-decimal pl-5">
        <li>Xác định các thuộc tính nhạy cảm của model.</li>
        <li>
          Tạo các <strong>counterfactual</strong>{" "}(kịch bản giả định) cho
          thuộc tính đó — ví dụ đổi giới tính từ nam sang nữ trong hồ sơ vay.
        </li>
        <li>Cho model chạy trên các counterfactual để lấy kết quả.</li>
        <li>
          Phân tích kết quả của nhiều lần test để đạt ý nghĩa thống kê, xác
          định việc đổi thuộc tính nhạy cảm có làm thay đổi kết quả model hay
          không — nếu có, đó là dấu hiệu của bias.
        </li>
      </ol>
      <p className="mt-3 text-sm text-[color:var(--muted)] leading-relaxed">
        Kỹ thuật này cũng có thể áp dụng cho{" "}
        <strong>tổ hợp nhiều thuộc tính nhạy cảm</strong>{" "}để tìm bias ẩn.
        Nhưng cần cẩn thận: phải đảm bảo các counterfactual{" "}
        <strong>không phi thực tế</strong>{" "}— nếu không, model có thể phản ứng
        với sự phi lý của dữ liệu giả định thay vì với bias thật sự.
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
            &quot;Bias chỉ đến từ dữ liệu huấn luyện&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: còn có{" "}
            <strong>algorithmic bias</strong>{" "}— lỗi trong thuật toán/model/
            framework.
          </li>
          <li>
            &quot;Test động chỉ phát hiện được bias có nguồn gốc từ dữ
            liệu&quot; → <strong className="text-amber-200">SAI</strong>: test
            động phát hiện bias trong <strong>output model</strong>, bất kể
            nó đến từ dữ liệu hay từ quá trình phát triển model.
          </li>
          <li>
            &quot;Counterfactual càng phi thực tế càng tốt vì tạo khác biệt
            rõ&quot; → <strong className="text-amber-200">SAI</strong>: phải{" "}
            <strong>tránh phi thực tế</strong>, nếu không model có thể phản
            ứng với sự bất thường của dữ liệu, không phải với bias thật.
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
              2 nguồn bias:
            </strong>{" "}
            data bias (dữ liệu) · algorithmic bias (thuật toán/model)
          </p>
          <p className="m-0">
            <strong className="text-[color:var(--metal)]">
              Disparate impact analysis:
            </strong>{" "}
            đổi thuộc tính nhạy cảm → xem kết quả model có đổi theo không
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}khi
          nghi ngờ một hệ AI thiên vị, đừng chỉ nhìn dữ liệu huấn luyện — hãy
          thử luôn <strong>disparate impact analysis</strong>: đổi một thuộc
          tính nhạy cảm và xem output model có đổi theo một cách có ý nghĩa
          thống kê hay không.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Bias", "Thiên lệch — đối xử bất công phi ngẫu nhiên theo thuộc tính nhạy cảm"],
          ["Data bias", "Thiên lệch bắt nguồn từ dữ liệu huấn luyện"],
          ["Algorithmic bias", "Thiên lệch bắt nguồn từ thuật toán/model/framework"],
          ["Sensitive attribute", "Thuộc tính nhạy cảm (giới tính, tuổi, chủng tộc...)"],
          ["Disparate impact analysis", "Phân tích tác động chênh lệch"],
          ["Counterfactual", "Kịch bản giả định — đổi một thuộc tính để so sánh kết quả"],
          ["EDA (Exploratory Data Analysis)", "Phân tích dữ liệu khám phá"],
          ["Static analysis", "Phân tích tĩnh (không chạy chương trình)"],
          ["Dynamic testing", "Kiểm thử động (chạy hệ thống thật)"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          A tester changes the gender field in a set of loan applications from
          male to female, re-runs them through the model, and analyzes
          whether the approval outcomes change with statistical significance.
          Which technique is being applied?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}Data pipeline testing.
          </li>
          <li>
            <strong>b)</strong>{" "}Disparate impact analysis.
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
              Một tester đổi trường giới tính trong một tập hồ sơ vay từ nam
              sang nữ, chạy lại qua model, và phân tích xem kết quả duyệt có
              thay đổi có ý nghĩa thống kê hay không. Đây là kỹ thuật nào?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}Kiểm thử data pipeline.
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}Phân tích tác động chênh lệch.
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
              <strong>b</strong>{" "}— đổi thuộc tính nhạy cảm để tạo counterfactual
              rồi so sánh kết quả đúng là quy trình disparate impact analysis.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong>{" "}sai — không liên quan đường ống xử lý dữ
                liệu.
              </p>
              <p className="m-0">
                <strong>c</strong>{" "}sai — không kiểm tra ràng buộc/kiểu dữ
                liệu.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — không liên quan đến việc gán nhãn có
                đúng hay không.
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
        5.1.2 &quot;Testing for Bias&quot;, trang 48–49 — ISTQB® Certified
        Tester AI Testing Syllabus v2.0 (© International Software Testing
        Qualifications Board). Nội dung biên soạn/dịch ý lại bằng tiếng Việt,
        không sao chép nguyên văn.
      </p>
    </>
  );
}
