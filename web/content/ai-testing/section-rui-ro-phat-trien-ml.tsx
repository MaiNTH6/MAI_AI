import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 7.1.1 — Rủi ro trong phát triển ML & giảm thiểu. */
export function SectionRuiRoPhatTrienMl() {
  return (
    <>
      <div className="badge">🚀 CT-AI · Chương 7 · Mục 7.1.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Không chỉ model mới có lỗi — công cụ &amp; framework phát triển ML cũng vậy
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-7.1.1 · mức K2 – Hiểu): <em>nêu ví dụ</em>{" "}các cách tiếp cận
          test dùng để giảm thiểu rủi ro trong phát triển ML.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}
            chương này nhắm vào rủi ro từ{" "}
            <strong>công cụ phát triển ML, lựa chọn cấu hình, và cơ chế
            triển khai</strong>{" "}— chứ không phải từ chính bản thân model ML.
          </p>
        </div>
      </div>

      {/* Bảng rủi ro → giảm thiểu */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Rủi ro phát triển ML thường gặp
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
              ["Dùng sai/không đúng ý API của thư viện hay framework (vd TensorFlow, PyTorch)", "API testing (7.1.2)"],
              ["Chọn framework chưa tối ưu", "Framework suitability review"],
              ["Lỗi thuật toán/model/framework gây bất công hệ thống", "Kiểm thử thiên lệch (5.1.2)"],
              ["Cài đặt/build framework bị lỗi", "Smoke testing"],
              ["Cài đặt sai phần đánh giá (evaluation) của framework", "Review code đánh giá của framework · Đối chiếu chéo kết quả đánh giá (vd với benchmark thủ công)"],
              ["Hiệu năng kém (vd framework phản hồi chậm)", "Performance testing"],
              ["Framework khó dùng", "Usability testing"],
              ["Lỗi trong thư viện được framework dùng (vd lỗi trong PyTorch); lỗi cài đặt thuật toán", "ML functional performance testing (6.1.3) · Back-to-back testing (6.1.10)"],
              ["Lỗ hổng bảo mật trong framework", "Security testing"],
              ["Tài liệu người dùng của framework kém", "Review tài liệu framework"],
              ["Chọn thuật toán chưa tối ưu", "Algorithm suitability review · A/B testing (6.1.9)"],
              ["Chọn hyperparameter chưa tối ưu (vd cấu trúc mạng, learning rate)", "ML functional performance testing (6.1.3) · A/B testing (6.1.9)"],
              ["Phân bổ dữ liệu sai vào tập huấn luyện/validation/test", "Review phân bổ dữ liệu"],
              ["Chọn cách đánh giá kém (vd k-fold cross-validation)", "ML functional performance testing (6.1.3)"],
              ["Diễn giải sai kết quả test do bản chất ngẫu nhiên của quá trình học", "ML functional performance testing (6.1.3)"],
              ["Lỗi triển khai (vd khi tạo bản chỉnh sửa cho nền tảng đích)", "Smoke testing · ML functional performance testing (6.1.3) · A/B testing (6.1.9)"],
              ["Model triển khai không tương thích môi trường vận hành", "Smoke testing · MLS deployment testing (7.1.2)"],
              ["Model triển khai không cải thiện so với model hiện tại", "Shadow testing (7.1.2)"],
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

      {/* Chỗ dễ ra đề */}
      <div className="mt-8 rounded-2xl border-2 border-dashed border-amber-500/40 bg-amber-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-amber-200">📝 Bẫy hay gặp</h3>
        <p className="mt-1 mb-2 text-sm text-[color:var(--muted)]">
          Đề hay cho một phát biểu <em>nghe hợp lý nhưng sai</em>{" "}— nhớ mấy chỗ
          gài sau:
        </p>
        <ul className="mt-0 mb-0 space-y-1.5 text-[color:var(--muted)]">
          <li>
            &quot;Chương 7 nói về rủi ro của chính model ML&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: Chương 7 nói về
            rủi ro từ <strong>công cụ, cấu hình, và cơ chế triển khai</strong>{" "}
            — rủi ro model đã nói ở Chương 6.
          </li>
          <li>
            &quot;Model không cải thiện so với hiện tại thì chỉ có thể phát
            hiện bằng A/B testing&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: có thể phát hiện
            bằng <strong>Shadow testing</strong>{" "}(xem 7.1.2).
          </li>
          <li>
            &quot;Diễn giải sai kết quả test do tính ngẫu nhiên của việc học
            không phải rủi ro cần test&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: đây{" "}
            <strong>là một rủi ro thật</strong>, giảm thiểu bằng ML functional
            performance testing.
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
            Chương 7 = rủi ro từ{" "}
            <strong className="text-[color:var(--metal)]">
              công cụ/framework
            </strong>{" "}
            ·{" "}
            <strong className="text-[color:var(--metal)]">
              lựa chọn cấu hình
            </strong>{" "}
            · <strong className="text-[color:var(--metal)]">triển khai</strong>
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}
          đừng chỉ nghi ngờ dữ liệu hoặc model khi hệ AI có vấn đề — hãy hỏi
          thêm: framework chọn có phù hợp không? hyperparameter có tối ưu
          không? cách đánh giá (evaluation) có đúng không?
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["ML development testing", "Kiểm thử phát triển ML"],
          ["Framework suitability review", "Review sự phù hợp của framework"],
          ["Algorithm suitability review", "Review sự phù hợp của thuật toán"],
          ["Hyperparameter", "Siêu tham số — cấu hình đặt trước khi huấn luyện (vd learning rate)"],
          ["k-fold cross-validation", "Kiểm định chéo k-lần"],
          ["Data allocation review", "Review phân bổ dữ liệu"],
          ["Usability testing", "Kiểm thử tính khả dụng/dễ dùng"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          A team selects a network structure and learning rate that turn out
          to be sub-optimal for their model. Which test approaches could help
          mitigate this risk?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}Smoke testing and installability testing.
          </li>
          <li>
            <strong>b)</strong>{" "}ML functional performance testing and A/B
            testing.
          </li>
          <li>
            <strong>c)</strong>{" "}Canary testing and rollback testing.
          </li>
          <li>
            <strong>d)</strong>{" "}Cross-device testing only.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Một nhóm chọn cấu trúc mạng và learning rate hóa ra chưa tối ưu
              cho model của họ. Cách tiếp cận test nào có thể giúp giảm thiểu
              rủi ro này?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}Smoke testing và installability testing.
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}ML functional performance testing và A/B
              testing.
            </p>
            <p className="m-0">
              <strong>c)</strong>{" "}Canary testing và rollback testing.
            </p>
            <p className="m-0">
              <strong>d)</strong>{" "}Chỉ cross-device testing.
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
              <strong>b</strong>{" "}— chọn hyperparameter chưa tối ưu được giảm
              thiểu bằng ML functional performance testing và A/B testing
              theo syllabus.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong>{" "}sai — smoke/installability testing nhắm
                vào lỗi cài đặt/triển khai, không phải chọn hyperparameter.
              </p>
              <p className="m-0">
                <strong>c</strong>{" "}sai — canary/rollback testing thuộc rủi ro
                triển khai (7.1.2), không phải chọn hyperparameter.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — cross-device testing nhắm vào tương
                thích thiết bị, không liên quan hyperparameter.
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
        📎 Nguồn: Chương 7 – Kiểm thử trong phát triển ML, mục 7.1.1
        &quot;Machine Learning Development Risks and Mitigations&quot;, trang
        64–65 — ISTQB® Certified Tester AI Testing Syllabus v2.0 (©
        International Software Testing Qualifications Board). Nội dung biên
        soạn/dịch ý lại bằng tiếng Việt, không sao chép nguyên văn.
      </p>
    </>
  );
}
