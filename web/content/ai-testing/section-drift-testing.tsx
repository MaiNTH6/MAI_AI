import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 6.1.7 — Drift testing. */
export function SectionDriftTesting() {
  return (
    <>
      <div className="badge">🧩 CT-AI · Chương 6 · Mục 6.1.7</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Drift testing: model không đổi, nhưng thế giới đã đổi
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-6.1.7 · mức K2 – Hiểu): <em>giải thích</em>{" "}cách dùng drift
          testing cho hệ ML đang vận hành.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}
            drift testing phát hiện 2 dạng &quot;trôi dạt&quot; theo thời gian
            — <strong>data drift</strong>{" "}(dữ liệu đổi) và{" "}
            <strong>concept drift</strong>{" "}(ý nghĩa/quan hệ đổi).
          </p>
        </div>
      </div>

      {/* Bảng 2 dạng drift */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        2 dạng drift
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Dạng", "Là gì", "Ví dụ"].map((h) => (
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
                "Data drift",
                "Đặc tính thống kê của dữ liệu đầu vào vận hành thay đổi theo thời gian — dữ liệu hiện tại khác đáng kể so với dữ liệu huấn luyện, do các yếu tố như thay đổi hành vi người dùng hoặc tính mùa vụ.",
                "Bộ lọc spam gặp các dạng tấn công phishing mới chưa từng có lúc huấn luyện.",
              ],
              [
                "Concept drift",
                "Mối quan hệ giữa dữ liệu đầu vào và output đúng thay đổi theo thời gian — mẫu hình/quy tắc model học ban đầu không còn phản ánh thực tế hiện tại.",
                "Quy định tài chính mới khiến một loại giao dịch trước đây coi là 'rủi ro thấp' nay bị xếp 'rủi ro cao' — ranh giới quyết định model học trở nên lỗi thời, độ chính xác dự đoán giảm.",
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
        2 cách test drift
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Cách", "Dựa vào", "Cách làm"].map((h) => (
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
                "Dynamic drift testing",
                "Phản hồi từ người dùng (ground truth hiện tại)",
                "So sánh output model với ground truth hiện tại (từ phản hồi trực tiếp như đánh giá của người dùng, hoặc gián tiếp như hành vi xem/dùng thực tế); tính chênh lệch và so với ngưỡng.",
              ],
              [
                "Static drift testing",
                "Không cần ground truth hiện tại",
                "So sánh đặc tính thống kê của phân phối dữ liệu đầu vào và output dự đoán, dùng kiểm định như Kolmogorov-Smirnov; khác biệt đáng kể ở một trong hai phân phối là dấu hiệu đã có drift.",
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

      {/* Chỗ dễ ra đề */}
      <div className="mt-8 rounded-2xl border-2 border-dashed border-amber-500/40 bg-amber-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-amber-200">📝 Bẫy hay gặp</h3>
        <p className="mt-1 mb-2 text-sm text-[color:var(--muted)]">
          Đề hay cho một phát biểu <em>nghe hợp lý nhưng sai</em>{" "}— nhớ mấy chỗ
          gài sau:
        </p>
        <ul className="mt-0 mb-0 space-y-1.5 text-[color:var(--muted)]">
          <li>
            &quot;Concept drift là khi dữ liệu đầu vào thay đổi phân
            phối&quot; → <strong className="text-amber-200">SAI</strong>: đó
            là <strong>data drift</strong>. Concept drift là khi{" "}
            <strong>mối quan hệ input–output đúng</strong>{" "}thay đổi.
          </li>
          <li>
            &quot;Static drift testing cần có ground truth hiện tại&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: static drift
            testing <strong>không cần</strong>{" "}ground truth — chỉ so sánh
            phân phối thống kê.
          </li>
          <li>
            &quot;Phản hồi người dùng chỉ có thể là trực tiếp (rating)&quot;
            → <strong className="text-amber-200">SAI</strong>: còn có{" "}
            <strong>phản hồi gián tiếp</strong>, ví dụ suy ra từ dữ liệu hành
            vi xem phim thực tế.
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
            <strong className="text-[color:var(--metal)]">Data drift</strong>{" "}
            = dữ liệu đổi ·{" "}
            <strong className="text-[color:var(--metal)]">
              Concept drift
            </strong>{" "}
            = ý nghĩa/quan hệ đổi
          </p>
          <p className="m-0">
            <strong className="text-[color:var(--metal)]">Dynamic</strong>{" "}=
            cần ground truth ·{" "}
            <strong className="text-[color:var(--metal)]">Static</strong>{" "}=
            chỉ so phân phối thống kê
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}khi
          không có phản hồi người dùng đáng tin cậy (ground truth), đừng bỏ
          cuộc — vẫn có thể phát hiện drift bằng cách so sánh phân phối thống
          kê của dữ liệu đầu vào và output theo thời gian (static drift
          testing).
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Drift testing", "Kiểm thử trôi dạt"],
          ["Data drift", "Trôi dạt dữ liệu — phân phối dữ liệu đầu vào thay đổi"],
          ["Concept drift", "Trôi dạt khái niệm — quan hệ input-output đúng thay đổi"],
          ["Dynamic drift testing", "Kiểm thử trôi dạt động — dựa trên phản hồi/ground truth hiện tại"],
          ["Static drift testing", "Kiểm thử trôi dạt tĩnh — dựa trên so sánh phân phối thống kê"],
          ["Ground truth", "Sự thật nền — dữ liệu/nhãn được coi là chuẩn đúng"],
          ["Direct feedback", "Phản hồi trực tiếp (vd người dùng đánh giá)"],
          ["Indirect feedback", "Phản hồi gián tiếp (suy ra từ hành vi thực tế)"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          A team has no reliable current ground truth for their MLS, but they
          compare the statistical distribution of the current operational
          input data against the training data distribution using a
          Kolmogorov-Smirnov test. Which approach are they using?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}Dynamic drift testing.
          </li>
          <li>
            <strong>b)</strong>{" "}Static drift testing.
          </li>
          <li>
            <strong>c)</strong>{" "}A/B testing.
          </li>
          <li>
            <strong>d)</strong>{" "}Adversarial testing.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Một nhóm không có ground truth hiện tại đáng tin cậy cho MLS của
              họ, nhưng họ so sánh phân phối thống kê của dữ liệu đầu vào vận
              hành hiện tại với phân phối dữ liệu huấn luyện bằng kiểm định
              Kolmogorov-Smirnov. Họ đang dùng cách tiếp cận nào?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}Kiểm thử trôi dạt động.
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}Kiểm thử trôi dạt tĩnh.
            </p>
            <p className="m-0">
              <strong>c)</strong>{" "}A/B testing.
            </p>
            <p className="m-0">
              <strong>d)</strong>{" "}Adversarial testing.
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
              <strong>b</strong>{" "}— so sánh phân phối thống kê mà không cần
              ground truth hiện tại chính là static drift testing.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong>{" "}sai — dynamic drift testing cần ground
                truth hiện tại từ phản hồi người dùng.
              </p>
              <p className="m-0">
                <strong>c</strong>{" "}sai — A/B testing so sánh hai biến thể hệ
                thống, không phải so sánh phân phối theo thời gian.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — adversarial testing tạo input đánh
                lừa model, không liên quan drift.
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
        📎 Nguồn: Chương 6 – Kiểm thử mô hình cho hệ thống ML, mục 6.1.7
        &quot;Drift Testing&quot;, trang 60 — ISTQB® Certified Tester AI
        Testing Syllabus v2.0 (© International Software Testing
        Qualifications Board). Nội dung biên soạn/dịch ý lại bằng tiếng Việt,
        không sao chép nguyên văn.
      </p>
    </>
  );
}
