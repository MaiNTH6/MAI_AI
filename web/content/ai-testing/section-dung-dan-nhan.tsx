import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 5.1.6 — Đúng đắn của nhãn (label correctness testing). */
export function SectionDungDanNhan() {
  return (
    <>
      <div className="badge">📥 CT-AI · Chương 5 · Mục 5.1.6</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Nhãn sai — lỗi âm thầm nhưng gây hại cho cả model
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-5.1.6 · mức K2 – Hiểu): <em>giải thích</em>{" "}label correctness
          testing.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}
            với supervised learning, độ đúng đắn của nhãn là{" "}
            <strong>sống còn</strong>{" "}— nhãn sai hoặc không nhất quán làm suy
            yếu trực tiếp hiệu năng và khả năng khái quát hóa của model.
          </p>
        </div>
      </div>

      {/* Bảng 7 cách tiếp cận */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        7 cách kiểm tra độ đúng đắn của nhãn
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
                "Expert Review",
                "Chuyên gia miền hoặc người chú thích đã qua đào tạo review thủ công một mẫu dữ liệu đã gán nhãn, đánh giá độ chính xác theo kiến thức chuyên môn và hướng dẫn gán nhãn.",
              ],
              [
                "Multiple Annotation",
                "Nhiều người chú thích gán nhãn độc lập cho cùng dữ liệu, rồi so sánh theo kiểu back-to-back testing (6.1.10). Bất đồng ý kiến chỉ ra lỗi cần điều tra. Đo mức đồng thuận (inter-annotator agreement — IAA) bằng Cohen's Kappa hoặc tỉ lệ đồng thuận đơn giản. IAA thấp báo hiệu lỗi ở hướng dẫn gán nhãn, dữ liệu mơ hồ, hoặc chú thích kém.",
              ],
              [
                "Risk-Based Prioritization",
                "Ưu tiên review/gán nhãn nhiều lần theo rủi ro — tập trung vào mẫu có khả năng gán sai cao (dữ liệu mơ hồ, gần ranh giới giữa các lớp) và dữ liệu ảnh hưởng lớn đến thành công/an toàn của ứng dụng.",
              ],
              [
                "Data Distribution Analysis",
                "Khi có tập dữ liệu tương đương để so sánh, đối chiếu phân phối nhãn của tập đang test với tập tương tự để lộ ra bất thường và khả năng nhãn sai.",
              ],
              [
                "Automated Rule-Based Tests",
                "Test tự động dựa trên quy tắc/ràng buộc nhãn đã định nghĩa trước cho một số tác vụ nhất định — ví dụ xác nhận bounding box (khung xác định vật thể trong ảnh) không chồng lấn hoặc vượt ra ngoài biên ảnh.",
              ],
              [
                "Model Loss Analysis",
                "Những điểm dữ liệu có loss cao trong lúc huấn luyện — nghĩa là dự đoán của model lệch đáng kể so với nhãn thật — có thể báo hiệu nhãn sai. Loss cao phản ánh model gặp khó khăn học nhãn đó, gợi ý khả năng có lỗi.",
              ],
              [
                "Model Confidence Score Analysis",
                "Điểm dữ liệu có độ tự tin dự đoán thấp từ model đã huấn luyện có thể bị gán nhãn sai, mơ hồ, hoặc nằm ngoài phân phối dữ liệu huấn luyện.",
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
        Cách hiệu quả nhất thường là <strong>kết hợp nhiều phương pháp</strong>:
        expert review giúp thiết lập hướng dẫn gán nhãn rõ ràng từ đầu; điểm
        IAA từ multiple annotation giúp tinh chỉnh quy trình gán nhãn; sau đó
        các phương pháp dựa trên model (loss, confidence) tiếp tục phát hiện
        thêm lỗi nhãn khi model được phát triển dần.
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
            &quot;IAA cao nghĩa là nhãn chắc chắn đúng&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: IAA cao chỉ nói
            lên người gán nhãn <strong>đồng thuận với nhau</strong>, không
            đảm bảo nhãn đúng về mặt khách quan — họ có thể cùng sai.
          </li>
          <li>
            &quot;Model loss cao luôn nghĩa là nhãn sai&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: loss cao{" "}
            <strong>báo hiệu khả năng</strong>{" "}nhãn sai (hoặc mẫu khó/nằm
            ngoài phân phối), cần điều tra thêm chứ không kết luận ngay.
          </li>
          <li>
            &quot;Chỉ cần một phương pháp (vd expert review) là đủ&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: syllabus khuyến
            nghị <strong>kết hợp nhiều phương pháp</strong>{" "}để hiệu quả nhất.
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
            7 cách: Expert Review · Multiple Annotation (IAA) · Risk-Based
            Prioritization · Data Distribution Analysis · Automated
            Rule-Based Tests · Model Loss Analysis · Model Confidence Score
            Analysis
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}
          đừng chỉ tin vào việc &quot;dữ liệu đã có nhãn&quot; — nhãn cũng là
          dữ liệu, và cần test như mọi loại dữ liệu khác. Nếu model học kém
          bất thường ở một số điểm dữ liệu, hãy nghi ngờ nhãn trước khi nghi
          ngờ thuật toán.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Label correctness testing", "Kiểm thử đúng đắn của nhãn"],
          ["Annotator", "Người chú thích/gán nhãn"],
          ["Inter-annotator agreement (IAA)", "Mức đồng thuận giữa những người gán nhãn"],
          ["Cohen's Kappa", "Thước đo thống kê mức đồng thuận có tính đến yếu tố ngẫu nhiên"],
          ["Bounding box", "Khung giới hạn xác định vị trí vật thể trong ảnh"],
          ["Model loss", "Giá trị đo mức sai lệch giữa dự đoán và nhãn thật khi huấn luyện"],
          ["Confidence score", "Điểm tự tin của dự đoán model"],
          ["Risk-based prioritization", "Ưu tiên theo mức độ rủi ro"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          Two annotators independently label the same dataset, and their
          Cohen's Kappa score comes back very low. What does this most
          directly indicate?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}The model is overfitting.
          </li>
          <li>
            <strong>b)</strong>{" "}Possible issues in labelling guidelines,
            ambiguous data, or poor annotation.
          </li>
          <li>
            <strong>c)</strong>{" "}The dataset violates a range constraint.
          </li>
          <li>
            <strong>d)</strong>{" "}The data pipeline has a performance defect.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Hai người chú thích gán nhãn độc lập cho cùng một tập dữ liệu,
              và điểm Cohen&#39;s Kappa của họ rất thấp. Điều này chỉ ra trực
              tiếp điều gì?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}Model đang overfitting.
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}Có thể có vấn đề ở hướng dẫn gán nhãn, dữ
              liệu mơ hồ, hoặc chú thích kém.
            </p>
            <p className="m-0">
              <strong>c)</strong>{" "}Tập dữ liệu vi phạm ràng buộc khoảng giá
              trị.
            </p>
            <p className="m-0">
              <strong>d)</strong>{" "}Data pipeline có lỗi hiệu năng.
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
              <strong>b</strong>{" "}— IAA (Cohen&#39;s Kappa) thấp là dấu hiệu
              trực tiếp của lỗi hướng dẫn gán nhãn, dữ liệu mơ hồ, hoặc chú
              thích kém.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong>{" "}sai — overfitting liên quan hiệu năng model
                trên tập test, không liên quan mức đồng thuận gán nhãn.
              </p>
              <p className="m-0">
                <strong>c</strong>{" "}sai — đây là chủ đề của dataset constraint
                testing, không phải label correctness testing.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — không liên quan hiệu năng pipeline.
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
        5.1.6 &quot;Label Correctness Testing&quot;, trang 52–53 — ISTQB®
        Certified Tester AI Testing Syllabus v2.0 (© International Software
        Testing Qualifications Board). Nội dung biên soạn/dịch ý lại bằng
        tiếng Việt, không sao chép nguyên văn.
      </p>
    </>
  );
}
