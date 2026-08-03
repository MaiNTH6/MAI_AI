import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 6.1.1 — Rủi ro mô hình ML & giảm thiểu. */
export function SectionRuiRoMoHinh() {
  return (
    <>
      <div className="badge">🧩 CT-AI · Chương 6 · Mục 6.1.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Bản đồ rủi ro của mô hình ML — và bộ kỹ thuật test tương ứng
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-6.1.1 · mức K2 – Hiểu): <em>nêu ví dụ</em>{" "}các cách tiếp cận
          test dùng để giảm thiểu rủi ro của model ML.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}
            model testing giải quyết cả{" "}
            <strong>rủi ro chức năng</strong>{" "}(bias, overfitting, dễ bị tấn
            công adversarial) lẫn{" "}
            <strong>rủi ro phi chức năng</strong>{" "}(thiếu AI robustness, hiệu
            năng) và <strong>rủi ro triển khai</strong>.
          </p>
        </div>
      </div>

      {/* Bảng rủi ro → giảm thiểu */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Rủi ro model thường gặp
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
              ["Model thiên lệch/bất công", "Kiểm thử thiên lệch (5.1.2)"],
              ["Model phi đạo đức", "Ethical system testing (kiểm thử đạo đức hệ thống)"],
              ["Adversarial example", "Adversarial testing (6.1.4)"],
              ["Model overfit", "Test overfitting (6.1.8)"],
              ["Model underfit", "Test underfitting (6.1.8)"],
              ["Data drift / concept drift không chấp nhận được", "Drift testing (6.1.7)"],
              ["Model gây tác dụng phụ (side-effects)", "Side-effects testing"],
              ["Model bị \"reward hacking\"", "Reward hacking testing"],
              ["Lỗi API của model", "API testing (7.1.2)"],
              ["Không đạt thước đo hiệu năng ML yêu cầu (vd thiếu accuracy, recall)", "ML functional performance testing (6.1.3)"],
              ["Sai chức năng / lỗi phi chức năng / test oracle problem", "Metamorphic testing (6.1.5) · Back-to-back testing (6.1.10) · A/B testing (6.1.9)"],
              ["Yêu cầu hệ thống kém", "Requirements review · Red teaming (4.2.2) · Exploratory testing"],
              ["Thiếu AI robustness do input bất ngờ", "Adversarial testing (6.1.4) · Fuzz testing"],
              ["Hiệu năng model chưa đạt", "Performance testing"],
              ["Tài liệu model kém (chức năng, độ chính xác, giao diện)", "Review tài liệu model (6.1.2)"],
              ["Cập nhật model gây lỗi", "Back-to-back testing (6.1.10)"],
              ["Cập nhật model làm giảm hiệu năng chức năng ML", "A/B testing (6.1.9)"],
              ["Triển khai model mới gây lỗi ngay lập tức", "Smoke testing"],
              ["Triển khai model mới gây hồi quy (regression)", "Regression testing"],
              ["Lỗ hổng bảo mật/an toàn, vi phạm riêng tư, output có hại", "Red teaming (4.2.2)"],
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
        Đây là <strong>bản đồ tổng quan Chương 6</strong>{" "}— các mục 6.1.2 đến
        6.1.10 sẽ đào sâu từng kỹ thuật riêng lẻ trong bảng trên.
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
            &quot;Test oracle problem chỉ giải quyết được bằng metamorphic
            testing&quot; → <strong className="text-amber-200">SAI</strong>:
            còn có thể dùng <strong>back-to-back testing</strong>{" "}và{" "}
            <strong>A/B testing</strong>.
          </li>
          <li>
            &quot;Rủi ro model chỉ gồm rủi ro chức năng&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: còn có{" "}
            <strong>rủi ro phi chức năng</strong>{" "}(AI robustness, hiệu năng)
            và <strong>rủi ro triển khai</strong>.
          </li>
          <li>
            &quot;Cập nhật model gây lỗi và cập nhật model làm giảm hiệu năng
            dùng chung một kỹ thuật test&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: gây lỗi dùng{" "}
            <strong>back-to-back testing</strong>; giảm hiệu năng dùng{" "}
            <strong>A/B testing</strong>{" "}— hai kỹ thuật khác nhau.
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
            3 nhóm rủi ro model:{" "}
            <strong className="text-[color:var(--metal)]">chức năng</strong>{" "}
            (bias, overfitting, adversarial) ·{" "}
            <strong className="text-[color:var(--metal)]">phi chức năng</strong>{" "}
            (robustness, hiệu năng) ·{" "}
            <strong className="text-[color:var(--metal)]">triển khai</strong>
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}
          dùng bảng này như checklist khi lập kế hoạch test cho một model —
          mỗi rủi ro có một (hoặc vài) kỹ thuật tương ứng, không có kỹ thuật
          nào &quot;phủ hết&quot; mọi rủi ro.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["ML model testing", "Kiểm thử mô hình ML"],
          ["Ethical system testing", "Kiểm thử đạo đức hệ thống"],
          ["Side-effects testing", "Kiểm thử tác dụng phụ"],
          ["Reward hacking", "Model \"lách luật\" hàm thưởng để đạt điểm cao mà không đạt mục tiêu thật"],
          ["AI robustness", "Độ bền vững của AI trước input bất thường"],
          ["Fuzz testing", "Kiểm thử bằng dữ liệu ngẫu nhiên/bất thường"],
          ["Smoke testing", "Kiểm thử khói — kiểm tra chức năng cơ bản trước"],
          ["Regression testing", "Kiểm thử hồi quy — đảm bảo thay đổi không phá vỡ chức năng cũ"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          A model consistently games its reward function to maximize its
          score without actually achieving the intended goal. Which risk
          mitigation technique specifically targets this risk?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}Reward hacking testing.
          </li>
          <li>
            <strong>b)</strong>{" "}Drift testing.
          </li>
          <li>
            <strong>c)</strong>{" "}Smoke testing.
          </li>
          <li>
            <strong>d)</strong>{" "}API testing.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Một model liên tục &quot;lách&quot; hàm thưởng để tối đa điểm số
              mà không thực sự đạt mục tiêu đề ra. Kỹ thuật giảm thiểu rủi ro
              nào nhắm đúng vào rủi ro này?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}Reward hacking testing.
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}Drift testing.
            </p>
            <p className="m-0">
              <strong>c)</strong>{" "}Smoke testing.
            </p>
            <p className="m-0">
              <strong>d)</strong>{" "}API testing.
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
              <strong>a</strong>{" "}— reward hacking testing đúng là kỹ thuật
              nhắm vào rủi ro model &quot;lách&quot; hàm thưởng.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>b</strong>{" "}sai — drift testing nhắm vào thay đổi phân
                phối dữ liệu/khái niệm theo thời gian.
              </p>
              <p className="m-0">
                <strong>c</strong>{" "}sai — smoke testing kiểm tra lỗi ngay sau
                triển khai, không liên quan hàm thưởng.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — API testing nhắm vào lỗi giao diện
                lập trình, không liên quan hành vi học của model.
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
        📎 Nguồn: Chương 6 – Kiểm thử mô hình cho hệ thống ML, mục 6.1.1
        &quot;Machine Learning Model Risks and Mitigations&quot;, trang
        55–56 — ISTQB® Certified Tester AI Testing Syllabus v2.0 (©
        International Software Testing Qualifications Board). Nội dung biên
        soạn/dịch ý lại bằng tiếng Việt, không sao chép nguyên văn.
      </p>
    </>
  );
}
