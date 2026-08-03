import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 3.1.2 — Quy trình (workflow) phát triển ML. */
export function SectionQuyTrinhMl() {
  return (
    <>
      <div className="badge">🤖 CT-AI · Chương 3 · Mục 3.1.2</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Quy trình phát triển mô hình ML từ A đến Z
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-3.1.2 · mức K2 – Hiểu): <em>tóm tắt</em>{" "}quy trình (workflow)
          phát triển mô hình ML.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}quy
            trình đi từ <strong>hiểu mục tiêu → chuẩn bị dữ liệu → sinh &amp; test
            mô hình → triển khai → giám sát</strong>, và{" "}
            <strong>lặp đi lặp lại</strong>{" "}chứ không tuyến tính một chiều.
          </p>
        </div>
      </div>

      {/* Bảng các bước */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Các bước trong quy trình
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["#", "Bước", "Làm gì"].map((h) => (
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
              ["1", "Hiểu mục tiêu", "Chốt mục đích với các bên; định tiêu chí chấp nhận + thước đo hiệu năng (mục 3.3)."],
              ["2", "Chọn framework", "Chọn framework ML phù hợp mục tiêu, tiêu chí, ưu tiên kinh doanh (mục 1.1.7)."],
              ["3", "Chọn & dựng thuật toán", "Chọn thuật toán theo mục tiêu, tiêu chí, dữ liệu; code tay hoặc lấy từ thư viện."],
              ["4", "Chuẩn bị & test dữ liệu", "Thu thập, tiền xử lý, feature engineering, EDA (mục 3.2). Dữ liệu phải đại diện cho dữ liệu vận hành."],
              ["5", "Huấn luyện (train)", "Dùng training data; truyền model hyperparameter (cấu trúc) & algorithm hyperparameter (điều khiển train)."],
              ["6", "Đánh giá (evaluate)", "Đo trên validation dataset theo thước đo đã chốt; thường thử nhiều mô hình rồi chọn tốt nhất."],
              ["7", "Tinh chỉnh (tune)", "Điều chỉnh hyperparameter rồi train lại. (Train + Evaluate + Tune = 'model generation'.)"],
              ["8", "Test mô hình", "Dùng test dataset độc lập; nếu kết quả kém hơn hẳn evaluate → quay lại bước trước."],
              ["9", "Triển khai (deploy)", "Tái cấu trúc mô hình + data pipeline cho nền tảng đích (embedded, cloud qua web API); test lại."],
              ["10", "Sử dụng (use)", "Tích hợp vào hệ lớn; chạy batch định kỳ hoặc real-time theo yêu cầu."],
              ["11", "Giám sát & tinh chỉnh", "Theo dõi drift (mục 6.1.7); train lại khi cần; so mô hình mới bằng A/B testing (mục 6.1.9)."],
            ].map((r) => (
              <tr key={r[0]} className="even:bg-white/[0.04]">
                <td className="border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)]">
                  {r[0]}
                </td>
                <td className="border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)] whitespace-nowrap">
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
      <p className="mt-3 text-sm text-[color:var(--muted)]">
        Quy trình trên là <strong>trình tự logic</strong>, thực tế{" "}
        <strong>lặp lại</strong>. Mô hình ML hiếm khi chạy đơn lẻ — thường phải{" "}
        <strong>tích hợp với phần không-ML</strong>{" "}(vd data pipeline làm sạch dữ
        liệu trước khi đưa vào mô hình) → có thể cần test tích hợp, hệ thống, chấp
        nhận.
      </p>

      {/* Phân biệt 2 loại hyperparameter */}
      <div className="mt-6 rounded-xl border border-sky-400/30 bg-sky-500/10 p-4 text-sm text-[color:var(--muted)] leading-relaxed">
        <p className="m-0">
          🔑 <strong className="text-[color:var(--ink)]">Hai loại hyperparameter:</strong>
        </p>
        <p className="m-0 mt-1.5 border-l-2 border-sky-400/50 pl-3">
          <strong className="text-sky-300">Model hyperparameter</strong>{" "}— định{" "}
          <em>cấu trúc</em>{" "}mô hình (số lớp mạng nơ-ron, độ sâu cây quyết định).
        </p>
        <p className="m-0 mt-1 border-l-2 border-sky-400/50 pl-3">
          <strong className="text-sky-300">Algorithm hyperparameter</strong>{" "}—{" "}
          <em>điều khiển quá trình train</em>{" "}(số vòng lặp khi huấn luyện).
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
            &quot;Evaluate và Test dùng chung một tập dữ liệu&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: evaluate dùng{" "}
            <strong>validation dataset</strong>, test dùng{" "}
            <strong>test dataset độc lập</strong>.
          </li>
          <li>
            &quot;Quy trình ML là tuyến tính một chiều&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: thực tế{" "}
            <strong>lặp</strong>, có thể quay lại bước trước.
          </li>
          <li>
            Nhầm <strong>model hyperparameter</strong>{" "}(cấu trúc) với{" "}
            <strong>algorithm hyperparameter</strong>{" "}(điều khiển train).
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
            <strong className="text-[color:var(--metal)]">Model generation</strong>{" "}
            = train + evaluate + tune
          </p>
          <p className="m-0">
            <strong className="text-[color:var(--metal)]">3 tập dữ liệu:</strong>{" "}
            train (huấn luyện) · validation (đánh giá/tune) · test (test độc lập)
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}mỗi
          bước có <strong>hoạt động test riêng</strong>, và lỗi thường{" "}
          <strong>bắt nguồn từ bước sớm</strong>{" "}(chuẩn bị dữ liệu, chọn mô
          hình). Hiểu workflow giúp biết đặt test ở đâu và truy ngược lỗi về gốc.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["ML workflow", "Quy trình phát triển mô hình ML"],
          ["Acceptance criteria", "Tiêu chí chấp nhận"],
          ["Training dataset", "Tập huấn luyện — để train mô hình"],
          ["Validation dataset", "Tập kiểm định — để đánh giá & tinh chỉnh"],
          ["Test dataset", "Tập kiểm thử độc lập (còn gọi holdout)"],
          ["Model generation", "Sinh mô hình = train + evaluate + tune"],
          ["Model hyperparameter", "Siêu tham số mô hình — định cấu trúc (số lớp, độ sâu)"],
          ["Algorithm hyperparameter", "Siêu tham số thuật toán — điều khiển train (số vòng lặp)"],
          ["Tuning", "Tinh chỉnh — điều chỉnh hyperparameter rồi train lại"],
          ["Data pipeline", "Đường ống dữ liệu — xử lý & biến đổi dữ liệu thô"],
          ["Drift", "Trôi — mô hình lệch dần khỏi hiệu năng mong muốn"],
          ["A/B testing", "So sánh 2 phiên bản mô hình trên dữ liệu thật"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          Which dataset is used to <strong>test the tuned model</strong>{" "}to verify
          the agreed performance criteria are met?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}The training dataset.
          </li>
          <li>
            <strong>b)</strong>{" "}The validation dataset.
          </li>
          <li>
            <strong>c)</strong>{" "}An independent test dataset.
          </li>
          <li>
            <strong>d)</strong>{" "}The operational (production) dataset.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Tập dữ liệu nào dùng để <strong>test mô hình đã tinh chỉnh</strong>{" "}
              nhằm xác nhận đạt tiêu chí hiệu năng đã chốt?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}Tập huấn luyện.
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}Tập kiểm định (validation).
            </p>
            <p className="m-0">
              <strong>c)</strong>{" "}Tập kiểm thử độc lập.
            </p>
            <p className="m-0">
              <strong>d)</strong>{" "}Tập dữ liệu vận hành (production).
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
              <strong>c</strong>{" "}— Test dùng tập kiểm thử độc lập (holdout).
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong>{" "}sai — training dataset để train, không để test.
              </p>
              <p className="m-0">
                <strong>b</strong>{" "}sai — validation để evaluate/tune, không phải
                bước test cuối.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — dữ liệu vận hành dùng khi đã chạy thật,
                không phải bước test trước triển khai.
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
        📎 Nguồn: Chương 3 – Machine Learning, mục 3.1.2 &quot;Machine Learning
        Workflow&quot;, trang 28–29 — ISTQB® Certified Tester AI Testing Syllabus
        v2.0 (© International Software Testing Qualifications Board). Nội dung biên
        soạn/dịch ý lại bằng tiếng Việt, không sao chép nguyên văn.
      </p>
    </>
  );
}
