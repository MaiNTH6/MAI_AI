import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 6.1.2 — Tài liệu & review mô hình ML. */
export function SectionTaiLieuReviewMoHinh() {
  return (
    <>
      <div className="badge">🧩 CT-AI · Chương 6 · Mục 6.1.2</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Tài liệu mô hình: công cụ thay thế cho việc &quot;đọc code&quot;
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-6.1.2 · mức K2 – Hiểu): <em>giải thích</em>{" "}mục đích và trọng
          tâm của việc review tài liệu model ML.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}
            model ML mang tính <strong>hộp đen</strong>, phụ thuộc dữ liệu, và
            thường xuyên được cập nhật — nên{" "}
            <strong>tài liệu là công cụ chính</strong>{" "}để developer, tester,
            cơ quan quản lý hiểu, đánh giá và tin tưởng hệ thống.
          </p>
        </div>
      </div>

      {/* Vì sao quan trọng + 2 khung tài liệu */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Vì sao tài liệu quan trọng, và 2 khung phổ biến
      </h2>
      <p className="mt-3 text-sm text-[color:var(--muted)] leading-relaxed">
        Không giống hệ thống mà source code có thể đọc trực tiếp, MLS gặp
        thách thức riêng: code do máy sinh ra khó hiểu, model mang tính hộp
        đen, và phụ thuộc dữ liệu. Tài liệu chuẩn hóa giúp cải thiện giao
        tiếp, hỗ trợ ra quyết định, xác nhận chất lượng &amp; khả năng bảo
        trì. Nó ngày càng quan trọng cho{" "}
        <strong>tuân thủ pháp lý</strong>{" "}— ví dụ EU AI Act yêu cầu minh bạch
        về quyết định, hạn chế, và khả năng diễn giải của model. Với hệ{" "}
        <strong>rủi ro cao</strong>, vượt qua audit tài liệu thường là điều
        kiện tiên quyết để triển khai.
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Khung tài liệu", "Nội dung chính"].map((h) => (
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
                "Model Cards",
                "Tổng quan ngắn gọn về mục đích sử dụng, kết quả đánh giá, và các cân nhắc đạo đức của model.",
              ],
              [
                "Datasheets for Datasets",
                "Định dạng chuẩn hóa mô tả tập dữ liệu — động lực, thành phần, quy trình thu thập, và mục đích sử dụng.",
              ],
            ].map((r) => (
              <tr key={r[0]} className="even:bg-white/[0.04]">
                <td className="border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)] whitespace-nowrap">
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
        8 nhóm nội dung nên có (checklist)
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Nhóm", "Gồm"].map((h) => (
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
              ["General", "Định danh, mô tả, nhà phát triển, phiên bản, ngày, liên hệ, giấy phép, yêu cầu phần cứng."],
              ["Design", "Giả định, quyết định kỹ thuật, thuật toán ML."],
              ["Usage", "Mục đích dùng, cách dùng chính/phụ, người dùng, cách tự học, bias, đạo đức, an toàn, minh bạch, ngưỡng, nền tảng, data drift, concept drift."],
              ["Datasets", "Đặc trưng, nguồn, thu thập, khả năng sử dụng, tiền xử lý, mục đích dùng, nội dung, nhãn, kích thước, quyền riêng tư, bảo mật, bias/công bằng, hạn chế."],
              ["Testing", "Chi tiết tập test, tính độc lập của việc test, kết quả test, hoạt động test (vd chức năng, adversarial)."],
              ["Functional", "Thước đo, tập dữ liệu validation, ngưỡng, hiệu năng thực tế."],
              ["Non-Functional", "Khả năng mở rộng, độ tin cậy, tính khả dụng, hiệu năng (độ trễ, tài nguyên), khả năng bảo trì, AI robustness."],
              ["Operational", "Kế hoạch triển khai, môi trường triển khai, tài nguyên tính toán, chỉ số/cảnh báo giám sát, chiến lược retrain, kế hoạch cập nhật/rollback model, kế hoạch ngừng sử dụng, bảo mật (rủi ro adversarial), phương pháp giải thích (explainability)."],
            ].map((r) => (
              <tr key={r[0]} className="even:bg-white/[0.04]">
                <td className="border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)] whitespace-nowrap">
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

      <p className="mt-4 text-sm text-[color:var(--muted)] leading-relaxed">
        Review tài liệu theo checklist này là một{" "}
        <strong>hoạt động test cốt lõi</strong>, nhằm: tìm thông tin thiếu/sai
        lệch/không nhất quán; cải thiện độ rõ ràng &amp; dễ đọc; tăng khả năng
        bảo trì; cung cấp đủ thông tin cho hoạt động test &amp; triển khai; và
        xác nhận đã đáp ứng yêu cầu quản lý liên quan.
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
            &quot;Tài liệu model chỉ là hình thức, không phải hoạt động
            test&quot; → <strong className="text-amber-200">SAI</strong>:
            review tài liệu là <strong>hoạt động test cốt lõi</strong>.
          </li>
          <li>
            &quot;Model Cards mô tả tập dữ liệu, còn Datasheets for Datasets
            mô tả model&quot; → <strong className="text-amber-200">SAI</strong>
            : ngược lại — Model Cards mô tả{" "}
            <strong>model</strong>, Datasheets for Datasets mô tả{" "}
            <strong>tập dữ liệu</strong>.
          </li>
          <li>
            &quot;Chỉ hệ AI rủi ro cao mới cần review tài liệu&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: hệ rủi ro cao cần
            đạt audit tài liệu trước triển khai, nhưng{" "}
            <strong>mọi hệ thống</strong>{" "}đều nên được review tài liệu để xác
            nhận chất lượng.
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
            <strong className="text-[color:var(--metal)]">Model Cards</strong>{" "}
            = tài liệu về model ·{" "}
            <strong className="text-[color:var(--metal)]">
              Datasheets for Datasets
            </strong>{" "}
            = tài liệu về dữ liệu
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}khi
          không thể &quot;đọc code&quot; của model như phần mềm thường, hãy
          dùng checklist 8 nhóm ở trên để review tài liệu — đây thường là cách
          duy nhất để hiểu model &quot;đúng là để làm gì&quot; và{" "}
          <strong>giới hạn thật sự</strong>{" "}của nó.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Model documentation", "Tài liệu mô hình"],
          ["Model Cards", "Khung tài liệu tóm tắt về model"],
          ["Datasheets for Datasets", "Khung tài liệu chuẩn hóa mô tả tập dữ liệu"],
          ["Black-box nature", "Bản chất hộp đen — khó nhìn thấy logic bên trong"],
          ["Transparency", "Tính minh bạch"],
          ["Explainability", "Khả năng giải thích"],
          ["Retraining strategy", "Chiến lược huấn luyện lại"],
          ["Deprecation plan", "Kế hoạch ngừng sử dụng"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          A regulator requires clear documentation of a high-risk AI system's
          decisions, limitations, and interpretability before it can be
          deployed. Which activity most directly supports this requirement?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}Adversarial testing.
          </li>
          <li>
            <strong>b)</strong>{" "}Reviewing model documentation against a
            checklist.
          </li>
          <li>
            <strong>c)</strong>{" "}A/B testing.
          </li>
          <li>
            <strong>d)</strong>{" "}Drift testing.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Một cơ quan quản lý yêu cầu tài liệu rõ ràng về quyết định, hạn
              chế, và khả năng diễn giải của một hệ AI rủi ro cao trước khi
              triển khai. Hoạt động nào hỗ trợ trực tiếp nhất yêu cầu này?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}Adversarial testing.
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}Review tài liệu model theo checklist.
            </p>
            <p className="m-0">
              <strong>c)</strong>{" "}A/B testing.
            </p>
            <p className="m-0">
              <strong>d)</strong>{" "}Drift testing.
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
              <strong>b</strong>{" "}— review tài liệu model đúng là hoạt động
              xác nhận các yêu cầu minh bạch (quyết định, hạn chế, khả năng
              diễn giải) đã được đáp ứng.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong>{" "}sai — adversarial testing nhắm vào độ bền
                trước input bị chỉnh sửa, không phải yêu cầu tài liệu.
              </p>
              <p className="m-0">
                <strong>c</strong>{" "}sai — A/B testing so sánh hai biến thể, không
                trực tiếp xác nhận tài liệu minh bạch.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — drift testing theo dõi thay đổi dữ
                liệu/khái niệm, không liên quan yêu cầu tài liệu.
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
        📎 Nguồn: Chương 6 – Kiểm thử mô hình cho hệ thống ML, mục 6.1.2
        &quot;Machine Learning Model Documentation and Review&quot;, trang
        56–57 — ISTQB® Certified Tester AI Testing Syllabus v2.0 (©
        International Software Testing Qualifications Board). Nội dung biên
        soạn/dịch ý lại bằng tiếng Việt, không sao chép nguyên văn.
      </p>
    </>
  );
}
