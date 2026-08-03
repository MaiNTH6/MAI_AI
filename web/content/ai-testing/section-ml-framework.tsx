import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 1.1.7 — Framework phát triển ML. */
export function SectionMlFramework() {
  return (
    <>
      <div className="badge">🧠 CT-AI · Chương 1 · Mục 1.1.7</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Framework ML làm gì? 5 nhóm chức năng cần nhớ
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-1.1.7 · mức K2 – Hiểu): <em>tóm tắt</em>{" "}chức năng của một
          framework phát triển ML.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}
            framework ML là <strong>bộ công cụ</strong>{" "}để xây và huấn luyện mô
            hình — lo trọn vòng đời từ <strong>dữ liệu → mô hình → triển
            khai</strong>.
          </p>
        </div>
      </div>

      {/* Bảng 5 nhóm chức năng */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        5 nhóm chức năng (thứ tự theo vòng đời)
      </h2>
      <p className="mt-1 text-[color:var(--muted)]">Thuộc bảng này là đủ ý để thi.</p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["#", "Chức năng", "Làm gì"].map((h) => (
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
                "1",
                "Data Handling (xử lý dữ liệu)",
                "Nạp, tiền xử lý, làm sạch, định dạng, biến đổi dữ liệu để hợp mô hình.",
              ],
              [
                "2",
                "Model Building (dựng mô hình)",
                "Thư viện thuật toán + thiết kế kiến trúc (loại mô hình, số lớp, kết nối, phép tính).",
              ],
              [
                "3",
                "Training & Optimization (huấn luyện & tối ưu)",
                "Lặp điều chỉnh tham số để tối ưu; có thể hỗ trợ huấn luyện phân tán, fine-tune.",
              ],
              [
                "4",
                "Evaluation (đánh giá)",
                "Đo trên dữ liệu chưa thấy: accuracy/precision/recall (phân loại), error rate (regression).",
              ],
              [
                "5",
                "Deployment (triển khai)",
                "Đóng gói mô hình để tích hợp web / mobile / edge / hệ nhúng.",
              ],
            ].map((r) => (
              <tr key={r[0]} className="even:bg-white/[0.04]">
                <td className="border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)]">
                  {r[0]}
                </td>
                <td className="border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)]">
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

      {/* Giải thích thêm */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Mức trừu tượng &amp; cách chọn framework
      </h2>
      <div className="mt-4 space-y-4 text-[color:var(--muted)] leading-relaxed">
        <p className="m-0">
          Framework có <strong>mức trừu tượng khác nhau</strong>:{" "}
          <strong>API cấp thấp</strong>{" "}(nhiều quyền kiểm soát nhưng cần code
          giỏi) ↔ <strong>API cấp cao</strong>{" "}(dễ dùng nhưng ít tùy biến). Có
          loại đa dụng, có loại chuyên biệt (nhận diện ảnh, giọng nói, dịch
          thuật).
        </p>
        <p className="m-0">
          <strong>Chọn theo:</strong>{" "}lĩnh vực ứng dụng · nhu cầu prototyping
          nhanh · khả năng cấu hình cho mô hình phức tạp · trình độ người dùng ·
          ràng buộc triển khai (môi trường ít tài nguyên) · mức hỗ trợ cộng đồng ·
          độ chín của hệ sinh thái.
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
            &quot;Framework ML chỉ để huấn luyện mô hình&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: nó lo cả{" "}
            <strong>dữ liệu, dựng, đánh giá và triển khai</strong>, không chỉ
            train.
          </li>
          <li>
            &quot;API cấp cao luôn tốt hơn API cấp thấp&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: cấp cao dễ dùng nhưng{" "}
            <strong>ít tùy biến</strong>; tùy nhu cầu mà chọn.
          </li>
          <li>
            Nhầm khâu: &quot;Evaluation là để nạp và làm sạch dữ liệu&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: đó là{" "}
            <strong>Data Handling</strong>; Evaluation là <strong>đo hiệu
            năng</strong>{" "}mô hình.
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
            <strong className="text-[color:var(--metal)]">5 chức năng:</strong>{" "}
            Dữ liệu → Dựng → Huấn luyện/Tối ưu → Đánh giá → Triển khai
          </p>
          <p className="m-0">
            <strong className="text-[color:var(--metal)]">Mức API:</strong>{" "}thấp
            (kiểm soát) ↔ cao (dễ dùng)
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}khâu{" "}
          <strong>Evaluation</strong>{" "}chính là nơi framework cung cấp sẵn thước đo
          (accuracy/precision/recall...) — tester tận dụng để{" "}
          <strong>kiểm hiệu năng mô hình</strong>. Hiểu 5 khâu giúp biết{" "}
          <strong>test ở đâu</strong>: dữ liệu (Chương 5), mô hình (Chương 6),
          triển khai (Chương 7).
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["ML development framework", "Framework phát triển ML — bộ công cụ xây & huấn luyện mô hình"],
          ["Data handling", "Xử lý dữ liệu — nạp, làm sạch, định dạng, biến đổi"],
          ["Model building", "Dựng mô hình — chọn thuật toán & thiết kế kiến trúc"],
          ["Training", "Huấn luyện — điều chỉnh tham số theo dữ liệu"],
          ["Optimization", "Tối ưu — lặp để mô hình đạt kết quả tốt nhất"],
          ["Distributed training", "Huấn luyện phân tán — chia nhiều máy chạy song song"],
          ["Fine-tuning", "Tinh chỉnh — huấn luyện thêm mô hình sẵn cho việc cụ thể"],
          ["Evaluation", "Đánh giá — đo hiệu năng trên dữ liệu chưa thấy"],
          ["Accuracy", "Độ chính xác (thước đo phân loại)"],
          ["Precision", "Độ chuẩn xác — trong số dự đoán dương, bao nhiêu đúng"],
          ["Recall", "Độ bao phủ — trong số ca dương thật, bắt được bao nhiêu"],
          ["Error rate", "Tỷ lệ lỗi (thước đo cho bài toán regression)"],
          ["Deployment", "Triển khai — đưa mô hình vào dùng thật"],
          ["API (application programming interface)", "Giao diện lập trình — cấp thấp (kiểm soát) hoặc cấp cao (dễ dùng)"],
          ["Abstraction level", "Mức trừu tượng của framework"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          Within an ML development framework, which function measures{" "}
          <strong>accuracy, precision and recall on unseen data</strong>?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}Data Handling.
          </li>
          <li>
            <strong>b)</strong>{" "}Model Building.
          </li>
          <li>
            <strong>c)</strong>{" "}Evaluation.
          </li>
          <li>
            <strong>d)</strong>{" "}Deployment.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Trong một framework phát triển ML, chức năng nào đo{" "}
              <strong>accuracy, precision và recall trên dữ liệu chưa thấy</strong>?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}Xử lý dữ liệu (Data Handling).
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}Dựng mô hình (Model Building).
            </p>
            <p className="m-0">
              <strong>c)</strong>{" "}Đánh giá (Evaluation).
            </p>
            <p className="m-0">
              <strong>d)</strong>{" "}Triển khai (Deployment).
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
              <strong>c</strong>{" "}— Evaluation đo hiệu năng (accuracy/precision/
              recall) trên dữ liệu chưa thấy.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong>{" "}sai — Data Handling lo nạp/làm sạch/biến đổi dữ
                liệu.
              </p>
              <p className="m-0">
                <strong>b</strong>{" "}sai — Model Building lo chọn thuật toán &amp;
                kiến trúc.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — Deployment lo đóng gói để triển khai.
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
        📎 Nguồn: Chương 1 – Giới thiệu AI, mục 1.1.7 &quot;Machine Learning
        Development Frameworks&quot;, trang 19–20 — ISTQB® Certified Tester AI
        Testing Syllabus v2.0 (© International Software Testing Qualifications
        Board). Nội dung biên soạn/dịch ý lại bằng tiếng Việt, không sao chép
        nguyên văn.
      </p>
    </>
  );
}
