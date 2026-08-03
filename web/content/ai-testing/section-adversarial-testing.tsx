import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 6.1.4 — Adversarial testing. */
export function SectionAdversarialTesting() {
  return (
    <>
      <div className="badge">🧩 CT-AI · Chương 6 · Mục 6.1.4</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Adversarial testing: thay đổi nhỏ xíu, model đoán sai hoàn toàn
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-6.1.4 · mức K2 – Hiểu): <em>tóm tắt</em>{" "}adversarial testing
          cho hệ thống ML.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}
            adversarial testing cố tình đưa vào dữ liệu bị{" "}
            <strong>nhiễu nhỏ</strong>{" "}(thường mắt người không nhận ra) để
            khiến model dự đoán sai — nếu thành công, gọi là{" "}
            <strong>adversarial example</strong>.
          </p>
        </div>
      </div>

      {/* Bảng nội dung */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        2 cách tiếp cận: Black-box và White-box
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Cách tiếp cận", "Mô tả"].map((h) => (
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
                "Black-box",
                "Chỉ dựa vào input/output của model, không cần biết cấu trúc bên trong. Một cách làm: xây một model tương đương mà ta biết rõ nội tại, tạo adversarial input từ model tương đương đó, rồi áp dụng lên model gốc — dựa trên giả định các model tương đương chia sẻ ranh giới phân loại (transferability). Cách khác: brute force — thử số lượng lớn test với hy vọng một số ngẫu nhiên trùng với adversarial example.",
              ],
              [
                "White-box",
                "Hiểu rõ nội tại model (kiến trúc, tham số, quá trình huấn luyện) — thường giúp tạo adversarial example dễ hơn.",
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

      <p className="mt-4 text-sm text-[color:var(--muted)] leading-relaxed">
        Adversarial testing có thể làm{" "}
        <strong>thủ công</strong>{" "}(tự tay tạo các adversarial example cụ thể)
        hoặc bằng <strong>thuật toán tự động</strong>{" "}sinh số lượng lớn biến
        thể để tìm input hiệu quả. Việc phát hiện lỗ hổng qua adversarial
        testing giúp developer bổ sung biện pháp bảo vệ, làm model bền vững
        hơn — dù đó là adversarial example gặp{" "}
        <strong>tình cờ</strong>{" "}hay do{" "}
        <strong>tấn công có chủ đích</strong>{" "}(adversarial attack). Việc tạo
        test input hiệu quả khá phức tạp về mặt kỹ thuật, và cập nhật theo kịp
        các kỹ thuật tấn công đang tiến hoá là thách thức liên tục.
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
            &quot;Adversarial testing chỉ có thể làm khi biết nội tại
            model&quot; → <strong className="text-amber-200">SAI</strong>: có
            thể làm bằng <strong>black-box</strong>{" "}(dùng model tương đương
            hoặc brute force) mà không cần biết nội tại.
          </li>
          <li>
            &quot;Adversarial example luôn là kết quả của tấn công cố
            ý&quot; → <strong className="text-amber-200">SAI</strong>: có thể
            là <strong>tình cờ gặp phải</strong>, không nhất thiết do tấn
            công có chủ đích.
          </li>
          <li>
            &quot;Chiến lược black-box &apos;dùng model tương đương&apos; dựa
            trên việc hai model có cùng kiến trúc&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: dựa trên giả
            định các model chia sẻ <strong>ranh giới phân loại</strong>{" "}
            (transferability), không nhất thiết cùng kiến trúc.
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
              Adversarial example
            </strong>{" "}
            = input bị nhiễu nhỏ khiến model đoán sai
          </p>
          <p className="m-0">
            2 cách:{" "}
            <strong className="text-[color:var(--metal)]">
              black-box
            </strong>{" "}
            (model tương đương / brute force) ·{" "}
            <strong className="text-[color:var(--metal)]">white-box</strong>{" "}
            (biết nội tại)
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}khi
          không có quyền truy cập nội bộ model (thường gặp khi test dịch vụ
          AI của bên thứ ba), vẫn có thể adversarial test bằng cách xây model
          tương đương hoặc dùng brute force — không nhất thiết cần &quot;mở
          hộp đen&quot;.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Adversarial testing", "Kiểm thử bằng cách cố tình đánh lừa model"],
          ["Adversarial example", "Input bị chỉnh sửa nhỏ khiến model dự đoán sai"],
          ["Adversarial attack", "Tấn công có chủ đích dùng adversarial example"],
          ["Perturbation", "Nhiễu/thay đổi nhỏ trên dữ liệu đầu vào"],
          ["Black-box testing", "Kiểm thử hộp đen — chỉ dựa input/output"],
          ["White-box testing", "Kiểm thử hộp trắng — biết rõ cấu trúc nội tại"],
          ["Transferability", "Tính chuyển giao — các model tương đương chia sẻ điểm yếu tương tự"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          A tester has no access to a deployed model's internals, so they
          build a surrogate model, craft adversarial inputs against it, and
          then apply those inputs to the original model, assuming shared
          classification boundaries. What is this approach called?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}White-box adversarial testing.
          </li>
          <li>
            <strong>b)</strong>{" "}Black-box adversarial testing using
            transferability.
          </li>
          <li>
            <strong>c)</strong>{" "}Metamorphic testing.
          </li>
          <li>
            <strong>d)</strong>{" "}Back-to-back testing.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Một tester không có quyền truy cập nội tại của model đã triển
              khai, nên xây một model thay thế (surrogate), tạo input
              adversarial nhắm vào nó, rồi áp dụng các input đó lên model gốc,
              dựa trên giả định hai model chia sẻ ranh giới phân loại. Đây là
              cách tiếp cận nào?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}Adversarial testing white-box.
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}Adversarial testing black-box dùng
              transferability.
            </p>
            <p className="m-0">
              <strong>c)</strong>{" "}Metamorphic testing.
            </p>
            <p className="m-0">
              <strong>d)</strong>{" "}Back-to-back testing.
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
              <strong>b</strong>{" "}— dùng model tương đương và giả định chia sẻ
              ranh giới phân loại đúng là adversarial testing black-box theo
              nguyên lý transferability.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong>{" "}sai — white-box yêu cầu biết nội tại model
                gốc, ở đây tester không có quyền truy cập đó.
              </p>
              <p className="m-0">
                <strong>c</strong>{" "}sai — metamorphic testing dựa trên quan hệ
                bất biến giữa input/output, không liên quan model thay thế.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — back-to-back testing so sánh output
                với một pseudo-oracle, không phải tạo input đánh lừa.
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
        📎 Nguồn: Chương 6 – Kiểm thử mô hình cho hệ thống ML, mục 6.1.4
        &quot;Adversarial Testing of Machine Learning Systems&quot;, trang
        58–59 — ISTQB® Certified Tester AI Testing Syllabus v2.0 (©
        International Software Testing Qualifications Board). Nội dung biên
        soạn/dịch ý lại bằng tiếng Việt, không sao chép nguyên văn.
      </p>
    </>
  );
}
