import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 2.1.2 — AI và an toàn (safety). */
export function SectionAiVaAnToan() {
  return (
    <>
      <div className="badge">🎯 CT-AI · Chương 2 · Mục 2.1.2</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        AI trong hệ an toàn: 5 thách thức đặc thù
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-2.1.2 · mức K2 – Hiểu): <em>giải thích</em> những cân nhắc đặc
          biệt khi dùng AI trong hệ thống liên quan an toàn.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}
            <strong>hệ liên quan an toàn (safety-related)</strong> là hệ có thể
            gây <strong>thương tích/tổn hại cho người, tài sản, môi trường</strong>.
          </p>
          <p className="m-0 mt-1.5">
            Kiểm thử hệ an toàn <em>không dùng AI</em> đã khó nhưng khả thi; đưa{" "}
            <strong>AI vào thì phát sinh thêm 5 thách thức</strong>.
          </p>
        </div>
      </div>

      {/* Bảng 5 thách thức */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        5 thách thức khi đưa AI vào hệ an toàn
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Thách thức", "Vấn đề"].map((h) => (
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
                "Đặc tả (specifications)",
                "Hệ thường: yêu cầu định nghĩa rõ rồi chuyển thành code. Hệ AI: bắt đầu từ mục tiêu mơ hồ, ẩn trong dữ liệu huấn luyện → khó truy vết yêu cầu → cài đặt (traceability kém).",
              ],
              [
                "Phi tất định (non-determinism)",
                "Khó bảo đảm hành vi chính xác. Mô hình đã test kỹ vẫn có thể cho kết quả bất ngờ (số ngẫu nhiên, đầu vào lệch nhẹ).",
              ],
              [
                "Tự học (self-learning)",
                "Test trước triển khai chứng minh an toàn; nhưng hệ tự học dần lệch khỏi hành vi đã test. Cần quản lý cách học & dữ liệu, hoặc đặt safety guard (vd bộ lọc nội dung).",
              ],
              [
                "Giải thích & minh bạch",
                "Hệ an toàn cần hiểu vì sao ra quyết định, nhưng AI thường là hộp đen. Kỹ thuật XAI như LIME giúp soi, nhưng chưa phổ biến và có thể giảm hiệu năng.",
              ],
              [
                "Quy định đang thay đổi",
                "Chuẩn an toàn chức năng hiện chưa gồm AI, có chuẩn còn cấm dùng. EU AI Act xếp AI làm thành phần an toàn (hàng không, thiết bị y tế, ô tô) là rủi ro cao → yêu cầu ngặt.",
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
          Đề hay cho một phát biểu <em>nghe hợp lý nhưng sai</em> — nhớ mấy chỗ
          gài sau:
        </p>
        <ul className="mt-0 mb-0 space-y-1.5 text-[color:var(--muted)]">
          <li>
            &quot;Test kỹ một lần trước khi triển khai là đủ bảo đảm an toàn cho
            hệ AI tự học&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: hệ tự học{" "}
            <strong>dần lệch</strong> khỏi hành vi đã test → cần giám sát/safety
            guard.
          </li>
          <li>
            &quot;Chuẩn an toàn chức năng quốc tế đã bao gồm đầy đủ AI&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: hiện{" "}
            <strong>chưa</strong>, có chuẩn còn cấm dùng AI.
          </li>
          <li>
            &quot;XAI (vd LIME) luôn có sẵn và miễn phí về hiệu năng&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: chưa phổ biến và có
            thể <strong>giảm hiệu năng</strong>.
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
            <strong className="text-[color:var(--metal)]">Safety-related</strong> =
            có thể gây hại cho người / tài sản / môi trường
          </p>
          <p className="m-0">
            <strong className="text-[color:var(--metal)]">5 thách thức:</strong>{" "}
            đặc tả mơ hồ · phi tất định · tự học · khó giải thích · quy định đổi
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong> những
          thách thức này làm <strong>bảo đảm an toàn kiểu truyền thống mất
          hiệu lực</strong>. Tester cần: dùng <strong>safety guard</strong>, kỹ
          thuật <strong>XAI</strong>, giám sát liên tục hành vi tự học, và tuân
          thủ yêu cầu ngặt cho hệ <strong>rủi ro cao</strong> theo EU AI Act (mục
          1.1.8).
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Safety-related system", "Hệ liên quan an toàn — có thể gây hại cho người/tài sản/môi trường"],
          ["Safety integrity", "Mức toàn vẹn an toàn — độ tin cậy về an toàn"],
          ["Specification", "Đặc tả — mô tả yêu cầu hệ thống phải làm"],
          ["Traceability", "Khả năng truy vết — lần từ yêu cầu tới cài đặt"],
          ["Non-determinism", "Phi tất định — cùng đầu vào có thể ra khác nhau"],
          ["Self-learning", "Tự học — hệ tự cải thiện, hành vi thay đổi theo thời gian"],
          ["Safety guard", "Cơ chế chặn an toàn (vd bộ lọc nội dung)"],
          ["Explainability", "Khả năng giải thích quyết định của AI"],
          ["Transparency", "Tính minh bạch"],
          ["LIME", "Kỹ thuật XAI giải thích cục bộ, độc lập mô hình"],
          ["Explainable AI (XAI)", "AI giải thích được — kỹ thuật soi lý do AI ra quyết định"],
          ["Functional safety", "An toàn chức năng — lĩnh vực chuẩn an toàn kỹ thuật"],
          ["High-risk system", "Hệ rủi ro cao (theo EU AI Act)"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          Why does <strong>self-learning</strong> make it hard to assure the
          safety of an AI-based system after deployment?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong> The system’s behaviour progressively moves away
            from the behaviour that was originally tested.
          </li>
          <li>
            <strong>b)</strong> Self-learning models never change their behaviour.
          </li>
          <li>
            <strong>c)</strong> Self-learning removes all need for monitoring.
          </li>
          <li>
            <strong>d)</strong> Self-learning guarantees perfectly deterministic
            outputs.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Vì sao <strong>tự học</strong> khiến khó bảo đảm an toàn cho hệ AI
              sau khi triển khai?
            </p>
            <p className="m-0">
              <strong>a)</strong> Hành vi của hệ dần lệch khỏi hành vi đã test ban
              đầu.
            </p>
            <p className="m-0">
              <strong>b)</strong> Mô hình tự học không bao giờ đổi hành vi.
            </p>
            <p className="m-0">
              <strong>c)</strong> Tự học bỏ được mọi nhu cầu giám sát.
            </p>
            <p className="m-0">
              <strong>d)</strong> Tự học bảo đảm đầu ra tất định tuyệt đối.
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
              <strong>a</strong> — Hệ tự học dần lệch khỏi hành vi đã test → bảo
              đảm an toàn ban đầu không còn giá trị.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>b</strong> sai — ngược lại, tự học chính là <em>đổi</em>{" "}
                hành vi.
              </p>
              <p className="m-0">
                <strong>c</strong> sai — càng cần giám sát liên tục.
              </p>
              <p className="m-0">
                <strong>d</strong> sai — nhiều hệ AI vốn phi tất định.
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
        📎 Nguồn: Chương 2 – Đặc tính chất lượng, mục 2.1.2 &quot;AI and
        Safety&quot;, trang 22–23 — ISTQB® Certified Tester AI Testing Syllabus
        v2.0 (© International Software Testing Qualifications Board). Nội dung biên
        soạn/dịch ý lại bằng tiếng Việt, không sao chép nguyên văn.
      </p>
    </>
  );
}
