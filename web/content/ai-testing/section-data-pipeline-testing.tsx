import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 5.1.3 — Kiểm thử data pipeline. */
export function SectionDataPipelineTesting() {
  return (
    <>
      <div className="badge">📥 CT-AI · Chương 5 · Mục 5.1.3</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Kiểm thử data pipeline: đi theo từng lớp, từ thiết kế đến production
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-5.1.3 · mức K2 – Hiểu): <em>tóm tắt</em>{" "}các hình thức kiểm
          thử data pipeline.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}
            test data pipeline theo{" "}
            <strong>cách tiếp cận nhiều lớp</strong>{" "}— từ review thiết kế, đến
            component, tích hợp, hệ thống, tích hợp hệ thống, và cả khi đã lên
            production.
          </p>
        </div>
      </div>

      {/* Bảng các lớp test */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        6 lớp kiểm thử data pipeline
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Lớp", "Nội dung"].map((h) => (
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
                "Design review",
                "Review thiết kế pipeline ngay từ giai đoạn thiết kế — bước khởi đầu của cách tiếp cận nhiều lớp.",
              ],
              [
                "Component testing",
                "Test thành phần thu nạp dữ liệu (data ingestion), script biến đổi dữ liệu, giao diện cảm biến (sensor) — dùng code review, phân tích tĩnh, test đặc thù phần cứng để xác nhận việc thu dữ liệu đáng tin cậy. Cũng xác nhận logic biến đổi dữ liệu, quy tắc validate, xử lý lỗi vững chắc, và lỗ hổng có thể bị khai thác để chèn mã độc/dữ liệu bị đầu độc.",
              ],
              [
                "Component integration testing",
                "Xác nhận luồng dữ liệu chảy trơn tru qua các giao diện nội bộ và được diễn giải đúng khi đi qua pipeline; phát hiện lỗi do giao diện không khớp hoặc giả định sai giữa các thành phần.",
              ],
              [
                "System testing",
                "Đánh giá toàn bộ pipeline đã lắp ráp — bắt đầu bằng smoke testing để xác nhận chức năng cơ bản; functional testing xác nhận tuân thủ yêu cầu (biến đổi & định tuyến dữ liệu); non-functional testing đánh giá hiệu năng dưới tải, khả năng mở rộng, bảo mật; fault injection testing đo độ vững bằng cách mô phỏng dữ liệu lỗi; back-to-back testing (6.1.10) so sánh pipeline vận hành với pipeline huấn luyện để xác nhận tính nhất quán.",
              ],
              [
                "System integration testing",
                "Xác nhận tương tác đúng giữa data pipeline với hệ thống/dịch vụ bên ngoài — nguồn dữ liệu, nền tảng lưu trữ, công cụ giám sát, và các bên tiêu thụ dữ liệu như model ML.",
              ],
              [
                "Testing in production",
                "Thực hiện trên hệ vận hành thật. Back-to-back testing xác nhận hiệu năng ổn định/cải thiện so với phiên bản trước. A/B testing (6.1.9) so sánh phiên bản pipeline mới với baseline, xác nhận cải thiện và không suy giảm trên luồng dữ liệu thực. Có thể tích hợp công cụ giám sát liên tục hành vi, hiệu năng, lỗi tiềm ẩn của model theo thời gian thực.",
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
        Ngoài 6 lớp trên, cần thêm{" "}
        <strong>review quản lý cấu hình (configuration management)</strong>{" "}
        để xác nhận đúng phiên bản code pipeline, cấu hình, và tập dữ liệu
        được dùng nhất quán qua các môi trường huấn luyện, test, production.
      </p>

      <div className="mt-6 rounded-xl border border-sky-400/30 bg-sky-500/10 p-4 text-sm text-[color:var(--muted)] leading-relaxed">
        <p className="m-0">
          ⚠️ <strong className="text-[color:var(--ink)]">Chiến lược test
          phải khớp mục đích pipeline:</strong>{" "}pipeline huấn luyện (thường
          mang tính thử nghiệm, exploratory) có ưu tiên khác pipeline vận
          hành (production). Test pipeline huấn luyện tập trung vào{" "}
          <strong>tính toàn vẹn dữ liệu</strong>; test pipeline vận hành ưu
          tiên <strong>độ tin cậy, hiệu năng, khả năng bảo trì</strong>.
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
            &quot;Data pipeline testing chỉ cần làm ở giai đoạn code
            (component testing)&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: phải theo{" "}
            <strong>nhiều lớp</strong>, từ design review đến production.
          </li>
          <li>
            &quot;Pipeline huấn luyện và pipeline vận hành nên test với cùng
            ưu tiên như nhau&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: pipeline huấn
            luyện ưu tiên <strong>tính toàn vẹn dữ liệu</strong>; pipeline vận
            hành ưu tiên <strong>độ tin cậy/hiệu năng/khả năng bảo trì</strong>.
          </li>
          <li>
            &quot;Fault injection testing chỉ dùng ở component testing&quot;
            → <strong className="text-amber-200">SAI</strong>: fault injection
            thuộc <strong>system testing</strong>, mô phỏng dữ liệu đầu vào
            lỗi để đo độ vững của toàn pipeline.
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
            6 lớp:{" "}
            <strong className="text-[color:var(--metal)]">
              design review → component → component integration → system →
              system integration → production
            </strong>
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}
          đừng chỉ test pipeline &quot;xong là chạy đúng&quot; một lần — hãy
          lên kế hoạch theo từng lớp, và luôn kiểm tra thêm{" "}
          <strong>quản lý cấu hình</strong>{" "}để chắc chắn code/cấu hình/dữ
          liệu đang khớp giữa các môi trường.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Data pipeline", "Đường ống xử lý dữ liệu"],
          ["Data ingestion", "Thu nạp dữ liệu"],
          ["Fault injection testing", "Kiểm thử bằng cách chèn lỗi/dữ liệu lỗi có chủ đích"],
          ["Smoke testing", "Kiểm thử khói — kiểm tra chức năng cơ bản trước"],
          ["Configuration management", "Quản lý cấu hình"],
          ["Back-to-back testing", "So sánh output của nhiều phiên bản hệ thống với cùng đầu vào"],
          ["A/B testing", "So sánh hai phiên bản để chọn phiên bản tốt hơn"],
          ["Training pipeline", "Đường ống dữ liệu phục vụ huấn luyện"],
          ["Operational pipeline", "Đường ống dữ liệu phục vụ vận hành thực tế"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          A team simulates corrupted sensor readings entering a fully
          assembled data pipeline to check whether data integrity is
          maintained. Which test level and technique does this describe?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}Component testing, using code review.
          </li>
          <li>
            <strong>b)</strong>{" "}System testing, using fault injection testing.
          </li>
          <li>
            <strong>c)</strong>{" "}System integration testing, using API
            testing.
          </li>
          <li>
            <strong>d)</strong>{" "}Testing in production, using A/B testing.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Một nhóm mô phỏng dữ liệu cảm biến bị hỏng đưa vào một pipeline
              đã lắp ráp hoàn chỉnh, để kiểm tra tính toàn vẹn dữ liệu có được
              duy trì không. Đây là test level và kỹ thuật nào?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}Component testing, dùng code review.
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}System testing, dùng fault injection
              testing.
            </p>
            <p className="m-0">
              <strong>c)</strong>{" "}System integration testing, dùng API
              testing.
            </p>
            <p className="m-0">
              <strong>d)</strong>{" "}Testing in production, dùng A/B testing.
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
              <strong>b</strong>{" "}— mô phỏng dữ liệu lỗi trên pipeline đã lắp
              ráp hoàn chỉnh chính là fault injection testing ở system
              testing.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong>{" "}sai — component testing xảy ra sớm hơn,
                chưa có pipeline đã lắp ráp hoàn chỉnh.
              </p>
              <p className="m-0">
                <strong>c</strong>{" "}sai — system integration testing tập trung
                giao tiếp với hệ ngoài, không phải mô phỏng lỗi nội bộ.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — testing in production diễn ra trên
                hệ thật đang chạy, không phải mô phỏng dữ liệu lỗi có kiểm
                soát.
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
        5.1.3 &quot;Data Pipeline Testing&quot;, trang 49–50 — ISTQB®
        Certified Tester AI Testing Syllabus v2.0 (© International Software
        Testing Qualifications Board). Nội dung biên soạn/dịch ý lại bằng
        tiếng Việt, không sao chép nguyên văn.
      </p>
    </>
  );
}
