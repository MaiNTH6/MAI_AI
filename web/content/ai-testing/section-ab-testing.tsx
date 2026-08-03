import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 6.1.9 — A/B testing. */
export function SectionAbTesting() {
  return (
    <>
      <div className="badge">🧩 CT-AI · Chương 6 · Mục 6.1.9</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        A/B testing: để dữ liệu thật quyết định phiên bản nào tốt hơn
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-6.1.9 · mức K2 – Hiểu): <em>giải thích</em>{" "}cách dùng A/B
          testing trong bối cảnh hệ thống ML.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}
            A/B testing so sánh phản hồi của{" "}
            <strong>hai biến thể (A và B)</strong>{" "}với cùng input để xác định
            biến thể nào tốt hơn — một cách tiếp cận{" "}
            <strong>thống kê</strong>, dùng chính hệ hiện tại làm test oracle
            một phần.
          </p>
        </div>
      </div>

      {/* Nội dung cốt lõi */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Cách hoạt động &amp; ứng dụng
      </h2>
      <p className="mt-3 text-sm text-[color:var(--muted)] leading-relaxed">
        Ví dụ đơn giản: gửi hai loại ưu đãi khuyến mãi (A và B) tới hai nửa
        danh sách marketing; hiệu quả của mỗi ưu đãi giúp quyết định dùng cái
        nào trong tương lai. Nhiều công ty thương mại điện tử &amp; web dùng
        A/B testing trong production, chuyển hướng người dùng khác nhau đến
        chức năng khác nhau để tìm hiểu sở thích người dùng.
      </p>
      <p className="mt-3 text-sm text-[color:var(--muted)] leading-relaxed">
        A/B testing là một cách giải quyết{" "}
        <strong>test oracle problem</strong>{" "}— dùng hệ thống hiện có như một{" "}
        <strong>oracle một phần</strong>. A/B testing{" "}
        <strong>không tự sinh test case</strong>{" "}và không hướng dẫn cách thiết
        kế test, dù input vận hành thực tế thường được đưa vào test.
      </p>
      <p className="mt-3 text-sm text-[color:var(--muted)] leading-relaxed">
        A/B testing dùng để test bản cập nhật cho hệ AI, với điều kiện có{" "}
        <strong>tiêu chí chấp nhận đã thống nhất</strong>, ví dụ thước đo hiệu
        năng chức năng ML (3.3). Mỗi khi hệ được cập nhật, A/B testing xác
        định biến thể mới có hiệu năng bằng hoặc tốt hơn biến thể trước không.
        Có thể áp dụng cho bộ phân loại đơn giản lẫn hệ phức tạp hơn nhiều —
        ví dụ so sánh thời gian di chuyển trung bình giữa hai biến thể của một
        hệ định tuyến giao thông thông minh trong hai tuần liên tiếp.
      </p>
      <p className="mt-3 text-sm text-[color:var(--muted)] leading-relaxed">
        A/B testing cũng dùng được cho hệ tự học (self-learning): khi hệ có
        thay đổi, test tự động được chạy, và đặc tính hệ sau thay đổi được so
        với trước thay đổi — nếu tốt hơn, thay đổi được chấp nhận; nếu không,
        hệ quay lại trạng thái trước.
      </p>

      <div className="mt-6 rounded-xl border border-sky-400/30 bg-sky-500/10 p-4 text-sm text-[color:var(--muted)] leading-relaxed">
        <p className="m-0">
          🔢 <strong className="text-[color:var(--ink)]">Kỹ thuật thống kê
          phổ biến</strong>{" "}cho A/B testing: t-test, z-test, chi-squared
          test, và Mann-Whitney U test.
        </p>
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
            &quot;A/B testing tự sinh test case và hướng dẫn thiết kế
            test&quot; → <strong className="text-amber-200">SAI</strong>: A/B
            testing <strong>không sinh test case</strong>, chỉ so sánh phản
            hồi giữa hai biến thể với input có sẵn.
          </li>
          <li>
            &quot;A/B testing chỉ dùng được cho hệ đơn giản như bộ phân
            loại&quot; → <strong className="text-amber-200">SAI</strong>:
            cũng dùng được cho hệ <strong>phức tạp</strong>{" "}(định tuyến giao
            thông) và cả <strong>hệ tự học</strong>.
          </li>
          <li>
            &quot;A/B testing không liên quan gì đến test oracle
            problem&quot; → <strong className="text-amber-200">SAI</strong>:
            A/B testing là <strong>một cách giải quyết</strong>{" "}test oracle
            problem, dùng hệ hiện có làm oracle một phần.
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
            <strong className="text-[color:var(--metal)]">A/B testing</strong>{" "}
            = so sánh 2 biến thể trên cùng input → chọn cái tốt hơn, cần tiêu
            chí chấp nhận rõ ràng
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}khi
          cập nhật một hệ AI đang chạy production, A/B testing là cách phổ
          biến để xác nhận &quot;không tệ hơn&quot; trước khi rollout toàn bộ
          — nhớ phân biệt với back-to-back testing (6.1.10): A/B dùng thước đo
          hiệu năng &amp; thống kê để{" "}
          <strong>so sánh hai biến thể</strong>, còn back-to-back dùng để{" "}
          <strong>phát hiện lỗi</strong>{" "}qua pseudo-oracle.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["A/B testing", "So sánh hai biến thể để chọn phiên bản tốt hơn"],
          ["Test oracle problem", "Bài toán khó xác định kết quả đúng cho hệ AI"],
          ["Partial test oracle", "Oracle một phần — không xác nhận đúng tuyệt đối, chỉ so sánh"],
          ["t-test / z-test", "Kiểm định thống kê so sánh trung bình hai nhóm"],
          ["Chi-squared test", "Kiểm định Chi-bình phương"],
          ["Mann-Whitney U test", "Kiểm định phi tham số so sánh hai nhóm độc lập"],
          ["Self-learning system", "Hệ tự học — tự cập nhật model theo dữ liệu mới"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          After a self-learning MLS makes a change, automated tests compare
          the resulting system characteristics with those before the change.
          If performance is not better, the system reverts. Which technique
          does this describe?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}Metamorphic testing.
          </li>
          <li>
            <strong>b)</strong>{" "}A/B testing.
          </li>
          <li>
            <strong>c)</strong>{" "}Adversarial testing.
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
              Sau khi một MLS tự học có thay đổi, test tự động so sánh đặc
              tính hệ thống sau thay đổi với trước thay đổi. Nếu hiệu năng
              không tốt hơn, hệ quay lại trạng thái cũ. Đây là kỹ thuật nào?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}Metamorphic testing.
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}A/B testing.
            </p>
            <p className="m-0">
              <strong>c)</strong>{" "}Adversarial testing.
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
              <strong>b</strong>{" "}— so sánh trước/sau thay đổi rồi giữ hoặc
              revert theo kết quả tốt hơn chính là ứng dụng A/B testing cho
              hệ tự học.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong>{" "}sai — metamorphic testing kiểm tra quan hệ
                input/output, không so sánh hai phiên bản hệ thống.
              </p>
              <p className="m-0">
                <strong>c</strong>{" "}sai — adversarial testing tạo input đánh
                lừa, không so sánh trước/sau thay đổi.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — drift testing theo dõi thay đổi dữ
                liệu/khái niệm theo thời gian, không phải so sánh hai biến
                thể hệ thống.
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
        📎 Nguồn: Chương 6 – Kiểm thử mô hình cho hệ thống ML, mục 6.1.9
        &quot;A/B Testing&quot;, trang 61 — ISTQB® Certified Tester AI
        Testing Syllabus v2.0 (© International Software Testing
        Qualifications Board). Nội dung biên soạn/dịch ý lại bằng tiếng Việt,
        không sao chép nguyên văn.
      </p>
    </>
  );
}
