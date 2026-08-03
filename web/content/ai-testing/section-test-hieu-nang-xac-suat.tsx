import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 6.1.3 — Test hiệu năng mô hình xác suất. */
export function SectionTestHieuNangXacSuat() {
  return (
    <>
      <div className="badge">🧩 CT-AI · Chương 6 · Mục 6.1.3</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        &quot;Model đạt 98% accuracy&quot; — nhưng đạt với độ tin cậy nào?
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-6.1.3 · mức K2 – Hiểu): <em>giải thích</em>{" "}cách thực hiện
          test hiệu năng chức năng ML cho hệ ML mang tính xác suất.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}
            với MLS xác suất, test hiệu năng không dừng ở{" "}
            <strong>pass/fail đơn giản</strong>{" "}— mà đo hiệu năng bằng{" "}
            <strong>thống kê</strong>{" "}so với tiêu chí chấp nhận, để xử lý tính
            không xác định vốn có (xem 4.1.2).
          </p>
        </div>
      </div>

      {/* Nội dung cốt lõi */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Tiêu chí chấp nhận kiểu thống kê
      </h2>
      <p className="mt-3 text-sm text-[color:var(--muted)] leading-relaxed">
        ML functional performance testing đo các thước đo như{" "}
        <strong>accuracy, recall, precision, F1-score</strong>{" "}(xem 3.3) rồi
        so với tiêu chí chấp nhận. Thay vì một mục tiêu đơn giản, yêu cầu nên
        gồm: một thước đo hiệu năng, một{" "}
        <strong>margin of error (MoE — biên độ sai số)</strong>, và một{" "}
        <strong>confidence level (CL — mức độ tin cậy)</strong>. Yêu cầu kiểu
        này dùng để tính{" "}
        <strong>số lượng test case tối thiểu</strong>{" "}cần chạy. Khi tăng số
        test:
      </p>
      <ul className="mt-3 space-y-1.5 text-[color:var(--muted)] list-disc pl-5">
        <li>
          Giữ cố định <strong>CL</strong>{" "}→ <strong>MoE giảm</strong>: kết
          quả test chính xác hơn.
        </li>
        <li>
          Giữ cố định <strong>MoE</strong>{" "}→ <strong>CL tăng</strong>: kết
          quả test chắc chắn hơn.
        </li>
      </ul>

      <div className="mt-6 rounded-xl border border-sky-400/30 bg-sky-500/10 p-4 text-sm text-[color:var(--muted)] leading-relaxed">
        <p className="m-0 mb-2">
          🔢 <strong className="text-[color:var(--ink)]">Ví dụ minh họa</strong>{" "}
          (theo syllabus — chỉ để hiểu ý tưởng, đề thi{" "}
          <strong>không yêu cầu</strong>{" "}tự tính công thức thống kê):
        </p>
        <p className="m-0">
          Tiêu chí: &quot;98% accuracy với MoE ±4% ở CL 95%&quot;. Để xác nhận
          điều này, cần <strong>601 test case</strong>{" "}— trong đó ít nhất{" "}
          <strong>589 ca phải pass</strong>{" "}để đạt mục tiêu 98%. Nếu chạy đủ
          601 ca và accuracy đo được đúng 98%, MoE thực tế sẽ hẹp hơn nhiều
          (khoảng ±1.1%) vì phương sai thấp hơn ở mức accuracy cao. Với hệ{" "}
          <strong>an toàn - tới hạn</strong>, yêu cầu có thể chặt hơn, ví dụ
          &quot;99% reliability với 95% confidence&quot; cần{" "}
          <strong>299 test case</strong>, tất cả đều phải pass.
        </p>
        <p className="m-0 mt-2">
          <strong className="text-[color:var(--ink)]">
            Sequential testing
          </strong>{" "}
          (test tuần tự) cho phép dừng sớm hơn: nếu accuracy quan sát được
          luôn cao (ví dụ không dưới 98%), độ chắc chắn thống kê tăng nhanh
          hơn khi chạy thêm test — trong ví dụ trên, MoE ±4% ở CL 95% có thể
          đạt được chỉ sau khoảng <strong>170 test case</strong>{" "}thay vì đủ
          601.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Điều kiện &amp; cách báo cáo
      </h2>
      <p className="mt-3 text-sm text-[color:var(--muted)] leading-relaxed">
        Để xác nhận các tiêu chí này, cần một{" "}
        <strong>tập test lớn, hoàn toàn độc lập</strong>{" "}với tập huấn luyện và
        validation — và phải là mẫu <strong>đại diện</strong>{" "}cho miền dữ liệu
        vận hành (xem 5.1.4). Test case được chạy trên model trong một
        framework phát triển ML có khả năng phân tích thống kê. Cuối cùng, kết
        quả tổng hợp được diễn giải &amp; báo cáo{" "}
        <strong>kèm độ tin cậy thống kê</strong>, không phải tỉ lệ pass/fail
        đơn giản — ví dụ: &quot;Model đạt accuracy 94% ±4% ở CL 95%&quot;, giúp
        các bên liên quan hiểu khoảng hiệu năng kỳ vọng khi vận hành thực tế và
        ra quyết định có chấp nhận model để triển khai hay không.
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
            &quot;Tăng số test case luôn làm cả MoE giảm và CL tăng cùng
            lúc&quot; → <strong className="text-amber-200">SAI</strong>: phải{" "}
            <strong>chọn một trong hai</strong>{" "}để giữ cố định — giữ CL thì
            MoE giảm, giữ MoE thì CL tăng.
          </li>
          <li>
            &quot;Kết quả cuối nên báo cáo dạng pass/fail đơn giản&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: nên báo cáo{" "}
            <strong>kèm độ tin cậy thống kê</strong>{" "}(vd &quot;94% ±4% ở CL
            95%&quot;).
          </li>
          <li>
            &quot;Có thể dùng lại tập validation để làm tập test hiệu
            năng&quot; → <strong className="text-amber-200">SAI</strong>: tập
            test phải <strong>hoàn toàn độc lập</strong>{" "}với tập huấn luyện và
            validation.
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
            Tiêu chí thống kê ={" "}
            <strong className="text-[color:var(--metal)]">
              thước đo + MoE + CL
            </strong>{" "}
            → cố định 1, cái còn lại tự đổi khi tăng số test
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}khi
          nhận yêu cầu kiểu &quot;model phải đạt 95% accuracy&quot;, hãy hỏi
          ngược lại: <strong>với MoE và CL bao nhiêu?</strong>{" "}Thiếu hai con số
          này, tiêu chí chấp nhận chưa đủ rõ để tính được cần chạy bao nhiêu
          test case.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["ML functional performance testing", "Kiểm thử hiệu năng chức năng ML"],
          ["Margin of error (MoE)", "Biên độ sai số"],
          ["Confidence level (CL)", "Mức độ tin cậy"],
          ["Acceptance criteria", "Tiêu chí chấp nhận"],
          ["Sequential testing", "Kiểm thử tuần tự — cho phép dừng sớm khi đủ bằng chứng thống kê"],
          ["Sample size", "Cỡ mẫu"],
          ["Reliability", "Độ tin cậy"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          A team runs more test cases than the fixed sample size required and
          keeps the confidence level fixed at 95%. What happens to the margin
          of error?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}It increases, making the result less precise.
          </li>
          <li>
            <strong>b)</strong>{" "}It decreases, making the result more precise.
          </li>
          <li>
            <strong>c)</strong>{" "}It stays exactly the same regardless of
            sample size.
          </li>
          <li>
            <strong>d)</strong>{" "}It becomes irrelevant once testing starts.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Một nhóm chạy nhiều test case hơn cỡ mẫu cố định yêu cầu, và giữ
              cố định mức độ tin cậy ở 95%. Điều gì xảy ra với biên độ sai số?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}Tăng lên, kết quả kém chính xác hơn.
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}Giảm xuống, kết quả chính xác hơn.
            </p>
            <p className="m-0">
              <strong>c)</strong>{" "}Giữ nguyên bất kể cỡ mẫu.
            </p>
            <p className="m-0">
              <strong>d)</strong>{" "}Không còn liên quan khi đã bắt đầu test.
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
              <strong>b</strong>{" "}— khi giữ cố định CL và tăng số test, MoE
              giảm, kết quả chính xác hơn.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong>{" "}sai — ngược lại với quan hệ đúng giữa số
                test, CL và MoE.
              </p>
              <p className="m-0">
                <strong>c</strong>{" "}sai — MoE thay đổi theo số test khi CL giữ
                cố định.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — MoE vẫn là một phần cốt lõi của cách
                báo cáo kết quả.
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
        📎 Nguồn: Chương 6 – Kiểm thử mô hình cho hệ thống ML, mục 6.1.3 &quot;ML
        Functional Performance Testing of Probabilistic Machine Learning
        Systems&quot;, trang 57–58 — ISTQB® Certified Tester AI Testing
        Syllabus v2.0 (© International Software Testing Qualifications
        Board). Nội dung biên soạn/dịch ý lại bằng tiếng Việt, không sao chép
        nguyên văn.
      </p>
    </>
  );
}
