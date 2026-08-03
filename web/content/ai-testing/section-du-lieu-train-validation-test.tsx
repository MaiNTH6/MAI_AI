import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 3.2.3 — Tập Training, Validation, Test. */
export function SectionDuLieuTrainValidationTest() {
  return (
    <>
      <div className="badge">🤖 CT-AI · Chương 3 · Mục 3.2.3</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        3 tập dữ liệu cho ML — và cách xoay xở khi dữ liệu ít
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-3.2.3 · mức K2 – Hiểu): <em>đối chiếu</em>{" "}cách dùng tập
          training, validation, và test trong phát triển model ML.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}
            cần <strong>3 tập dữ liệu tương đương</strong>{" "}(lấy ngẫu nhiên từ
            cùng một tập đại diện) để phát triển model — mỗi tập một vai trò
            riêng, không dùng lẫn cho nhau.
          </p>
        </div>
      </div>

      {/* Bảng 3 tập */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        3 tập dữ liệu &amp; vai trò
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Tập", "Vai trò"].map((h) => (
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
              ["Training dataset", "Dùng để huấn luyện (train) model."],
              ["Validation dataset", "Dùng để đánh giá rồi tinh chỉnh (tune) model — chọn hyperparameter."],
              ["Test dataset (holdout dataset)", "Dùng để test model đã tinh chỉnh xong — đánh giá cuối cùng, không dùng lại cho tinh chỉnh."],
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
        Nếu có <strong>đủ dữ liệu</strong>, lượng dữ liệu dành cho mỗi tập
        thường phụ thuộc: <strong>độ phức tạp kỳ vọng</strong>{" "}của model,{" "}
        <strong>thuật toán</strong>{" "}dùng để huấn luyện, mức{" "}
        <strong>tài nguyên sẵn có</strong>{" "}(RAM, ổ đĩa, năng lực tính toán,
        băng thông mạng, thời gian), và{" "}
        <strong>độ tin cậy mong muốn</strong>{" "}ở model kết quả.
      </p>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Khi dữ liệu hạn chế: k-fold cross-validation
      </h2>
      <p className="mt-3 text-sm text-[color:var(--muted)] leading-relaxed">
        Khi dữ liệu ít, chia 3 phần (train/validation/test) có thể khiến phần
        dành cho huấn luyện <strong>không đủ</strong>, làm tăng nguy cơ{" "}
        <strong>underfitting</strong>. Chiến lược phổ biến: nếu khả thi, tách
        riêng một tập <strong>hold-out test</strong>{" "}nhỏ để dành đánh giá
        cuối; phần dữ liệu còn lại (gộp train + validation) dùng cho{" "}
        <strong>k-fold cross-validation</strong>{" "}(k là số nguyên tự chọn,
        thường 5 hoặc 10).
      </p>
      <ul className="mt-3 space-y-1.5 text-[color:var(--muted)] list-disc pl-5">
        <li>Chia dữ liệu (train+validation) thành <strong>k phần (fold)</strong>.</li>
        <li>
          Ở mỗi vòng: huấn luyện trên <strong>k-1 fold</strong>, validate trên{" "}
          <strong>fold còn lại</strong>. Lặp lại <strong>k lần</strong>, mỗi
          fold lần lượt đóng vai trò tập validation một lần.
        </li>
        <li>
          Dữ liệu thường được gán ngẫu nhiên vào các fold, hay dùng{" "}
          <strong>stratified sampling</strong>{" "}để mỗi fold đại diện tốt —
          đặc biệt quan trọng khi dữ liệu mất cân bằng hoặc tập nhỏ.
        </li>
        <li>
          Thước đo hiệu năng (accuracy, F1-score...) của mỗi fold được{" "}
          <strong>lấy trung bình</strong>{" "}để ước lượng đáng tin cậy hơn về khả
          năng khái quát hóa của model.
        </li>
        <li>
          Sau khi tìm được <strong>hyperparameter tối ưu</strong>{" "}qua cross-
          validation, model cuối thường được huấn luyện lại trên{" "}
          <strong>toàn bộ pool train+validation</strong>{" "}(mọi dữ liệu trừ
          hold-out test) với hyperparameter đó, rồi đánh giá{" "}
          <strong>một lần duy nhất</strong>{" "}trên tập hold-out test để có đánh
          giá cuối cùng, không thiên lệch.
        </li>
      </ul>

      <div className="mt-6 rounded-xl border border-sky-400/30 bg-sky-500/10 p-4 text-sm text-[color:var(--muted)] leading-relaxed">
        <p className="m-0">
          ⚠️ <strong className="text-[color:var(--ink)]">Lưu ý:</strong>{" "}nếu{" "}
          <strong>không thể</strong>{" "}tách được tập hold-out test do dữ liệu
          quá khan hiếm, thì hiệu năng trung bình từ cross-validation mang
          tính <strong>lạc quan thiên lệch</strong>{" "}(optimistically biased) —{" "}
          <strong>không</strong>{" "}thể dùng làm ước lượng không thiên lệch.
        </p>
      </div>

      <p className="mt-4 text-sm text-[color:var(--muted)] leading-relaxed">
        Ngoài k-fold, còn có các phương pháp resampling khác cho dữ liệu hạn
        chế:{" "}
        <strong>leave-one-out cross-validation</strong>{" "}(trường hợp đặc biệt
        của k-fold khi k bằng đúng số mẫu dữ liệu) và{" "}
        <strong>kỹ thuật bootstrap</strong>.
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
            &quot;Tập validation và tập test dùng thay thế nhau được&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: validation dùng
            để <strong>tinh chỉnh</strong>{" "}model; test (holdout) dùng để{" "}
            <strong>đánh giá cuối</strong>, không được dùng để tinh chỉnh.
          </li>
          <li>
            &quot;Không có hold-out test set thì kết quả cross-validation vẫn
            là ước lượng không thiên lệch&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: khi đó kết quả
            mang tính <strong>lạc quan thiên lệch</strong>, không phải ước
            lượng không thiên lệch.
          </li>
          <li>
            &quot;Trong k-fold, model cuối cùng được lấy từ một trong các fold
            đã huấn luyện&quot; → <strong className="text-amber-200">SAI</strong>
            : model cuối được{" "}
            <strong>huấn luyện lại trên toàn bộ pool train+validation</strong>{" "}
            với hyperparameter tối ưu tìm được, không phải giữ lại model của
            một fold.
          </li>
          <li>
            &quot;Leave-one-out là một kỹ thuật khác hẳn k-fold&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: đây là{" "}
            <strong>trường hợp đặc biệt</strong>{" "}của k-fold khi k bằng số
            mẫu.
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
            <strong className="text-[color:var(--metal)]">Training</strong>{" "}=
            huấn luyện ·{" "}
            <strong className="text-[color:var(--metal)]">Validation</strong>{" "}
            = tinh chỉnh ·{" "}
            <strong className="text-[color:var(--metal)]">Test/holdout</strong>{" "}
            = đánh giá cuối
          </p>
          <p className="m-0">
            Dữ liệu ít →{" "}
            <strong className="text-[color:var(--metal)]">
              k-fold cross-validation
            </strong>{" "}
            trên pool train+validation, giữ riêng hold-out test nếu khả thi
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}khi
          review kết quả đánh giá model, hỏi ngay: con số này đến từ tập nào?
          Nếu chỉ là trung bình cross-validation mà{" "}
          <strong>không có hold-out test riêng</strong>, kết quả có thể bị
          thổi phồng — đừng vội tin đó là hiệu năng thực tế khi vận hành.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Training dataset", "Tập dữ liệu huấn luyện"],
          ["Validation dataset", "Tập dữ liệu kiểm định — dùng để tinh chỉnh model"],
          ["Test dataset / Holdout dataset", "Tập dữ liệu kiểm thử — đánh giá cuối cùng"],
          ["k-fold cross-validation", "Kiểm định chéo k-lần"],
          ["Fold", "Phần dữ liệu con trong k-fold cross-validation"],
          ["Stratified sampling", "Lấy mẫu phân tầng — đảm bảo mọi nhóm con đều được đại diện"],
          ["Leave-one-out cross-validation", "Kiểm định chéo bỏ-một — trường hợp đặc biệt của k-fold"],
          ["Bootstrap", "Kỹ thuật lấy mẫu lặp lại có hoàn lại để ước lượng"],
          ["Optimistically biased", "Thiên lệch theo hướng lạc quan — kết quả cao hơn thực tế"],
          ["Hyperparameter", "Siêu tham số — cấu hình đặt trước khi huấn luyện"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          A team has extremely limited data and cannot set aside a separate
          hold-out test set, so they rely only on the average performance
          across k-fold cross-validation. How should this reported
          performance be interpreted?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}As an unbiased estimate of real-world
            performance.
          </li>
          <li>
            <strong>b)</strong>{" "}As an optimistically biased estimate, not an
            unbiased one.
          </li>
          <li>
            <strong>c)</strong>{" "}As proof the model is underfitting.
          </li>
          <li>
            <strong>d)</strong>{" "}As equivalent to a leave-one-out result.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Một nhóm có dữ liệu cực kỳ hạn chế, không thể tách riêng tập
              hold-out test, nên chỉ dựa vào hiệu năng trung bình từ k-fold
              cross-validation. Kết quả hiệu năng này nên được hiểu thế nào?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}Là ước lượng không thiên lệch của hiệu năng
              thực tế.
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}Là ước lượng mang tính lạc quan thiên lệch,
              không phải ước lượng không thiên lệch.
            </p>
            <p className="m-0">
              <strong>c)</strong>{" "}Là bằng chứng model đang underfit.
            </p>
            <p className="m-0">
              <strong>d)</strong>{" "}Tương đương kết quả leave-one-out.
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
              <strong>b</strong>{" "}— không có hold-out test set, kết quả trung
              bình cross-validation mang tính lạc quan thiên lệch.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong>{" "}sai — đây chính xác là điều{" "}
                <em>không</em>{" "}nên kết luận khi thiếu hold-out test.
              </p>
              <p className="m-0">
                <strong>c</strong>{" "}sai — không có thông tin liên quan
                underfitting trong tình huống này.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — leave-one-out chỉ tương đương khi k
                bằng số mẫu, không liên quan đến việc thiếu hold-out set.
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
        📎 Nguồn: Chương 3 – Machine Learning, mục 3.2.3 &quot;Training,
        Validation, and Test Datasets&quot;, trang 32–33 — ISTQB® Certified
        Tester AI Testing Syllabus v2.0 (© International Software Testing
        Qualifications Board). Nội dung biên soạn/dịch ý lại bằng tiếng Việt,
        không sao chép nguyên văn.
      </p>
    </>
  );
}
