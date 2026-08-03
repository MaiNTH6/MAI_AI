import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 5.1.4 — Tính đại diện của dữ liệu. */
export function SectionTinhDaiDienDuLieu() {
  return (
    <>
      <div className="badge">📥 CT-AI · Chương 5 · Mục 5.1.4</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Dữ liệu huấn luyện có &quot;giống&quot; thế giới thật không?
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-5.1.4 · mức K2 – Hiểu): <em>giải thích</em>{" "}cách test tính
          đại diện của dữ liệu.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}
            kiểm thử tính đại diện là đo mức độ{" "}
            <strong>khớp giữa dữ liệu huấn luyện/validation/test</strong>{" "}với
            dữ liệu thực tế mà model sẽ gặp khi vận hành.
          </p>
        </div>
      </div>

      {/* 3 bước */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        3 bước kiểm thử tính đại diện
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Bước", "Việc cần làm"].map((h) => (
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
                "1. Xác định tập đối tượng mục tiêu (target population)",
                "Hiểu use case & bối cảnh vận hành của MLS; phân tích đặc điểm người dùng cuối & môi trường vận hành; xác định phân phối dữ liệu vận hành kỳ vọng và các edge case quan trọng — bằng cách tham vấn chuyên gia miền, phân tích dữ liệu từ hệ hiện có/ứng dụng tương tự, hoặc dùng benchmark dataset từ nguồn tin cậy (NIST, cơ sở dữ liệu ngành...). Sau đó áp dụng stratified sampling trên dữ liệu tham chiếu để tạo baseline bao phủ mọi nhóm con liên quan.",
              ],
              [
                "2. Phân tích đặc điểm dữ liệu",
                "Áp dụng EDA (3.2.1) cho cả tập huấn luyện/test đang đánh giá và tập tham chiếu đại diện cho vận hành thực tế; trực quan hóa phân phối bằng histogram, scatter plot...; xem xét mối quan hệ & tương quan giữa các đặc trưng cần được giữ nguyên; tìm bất thường, khoảng trống hoặc điểm tập trung bất thường trong dữ liệu.",
              ],
              [
                "3. Áp dụng kỹ thuật đánh giá thống kê",
                "Dùng phép kiểm định thống kê hình thức như Chi-squared và Kolmogorov-Smirnov để so sánh phân phối; kiểm tra mất cân bằng dữ liệu (đặc biệt bài toán phân loại); xác nhận bao phủ đủ cả kịch bản điển hình lẫn edge/boundary case.",
              ],
            ].map((r) => (
              <tr key={r[0]} className="even:bg-white/[0.04]">
                <td className="border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)]">
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
        Kiểm thử tính đại diện nên được thực hiện{" "}
        <strong>trước khi huấn luyện model</strong>, để tránh xây model trên
        dữ liệu không đại diện. Sau khi triển khai, cần{" "}
        <strong>giám sát liên tục</strong>{" "}đặc điểm dữ liệu vận hành thực tế để
        phát hiện thay đổi có thể báo hiệu <strong>data drift</strong>{" "}so với
        phân phối dữ liệu huấn luyện ban đầu (xem mục 6.1.7 — drift testing).
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
            &quot;Kiểm thử tính đại diện chỉ cần làm sau khi model đã huấn
            luyện xong&quot; → <strong className="text-amber-200">SAI</strong>
            : nên làm <strong>trước khi huấn luyện</strong>{" "}để tránh xây model
            trên dữ liệu không đại diện.
          </li>
          <li>
            &quot;Sau khi triển khai, không cần theo dõi thêm dữ liệu vận
            hành&quot; → <strong className="text-amber-200">SAI</strong>: cần{" "}
            <strong>giám sát liên tục</strong>{" "}để phát hiện data drift.
          </li>
          <li>
            &quot;Chỉ cần xem histogram là đủ kết luận dữ liệu đại diện hay
            không&quot; → <strong className="text-amber-200">SAI</strong>: cần
            thêm <strong>phép kiểm định thống kê hình thức</strong>{" "}(Chi-
            squared, Kolmogorov-Smirnov), không chỉ quan sát trực quan.
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
            3 bước:{" "}
            <strong className="text-[color:var(--metal)]">
              xác định target population → phân tích đặc điểm (EDA) → đánh
              giá thống kê
            </strong>
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}khi
          đánh giá một tập dữ liệu, đừng chỉ hỏi &quot;đủ nhiều chưa&quot; —
          hãy hỏi &quot;có <strong>giống thế giới thật</strong>{" "}mà hệ sẽ vận
          hành hay không&quot;, và đối chiếu bằng phép kiểm định thống kê thay
          vì cảm tính.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Data representativeness testing", "Kiểm thử tính đại diện của dữ liệu"],
          ["Target population", "Tập đối tượng mục tiêu"],
          ["Stratified sampling", "Lấy mẫu phân tầng — đảm bảo mọi nhóm con đều được đại diện"],
          ["Benchmark dataset", "Tập dữ liệu chuẩn tham chiếu"],
          ["Chi-squared test", "Kiểm định Chi-bình phương"],
          ["Kolmogorov-Smirnov test", "Kiểm định Kolmogorov-Smirnov — so sánh hai phân phối"],
          ["Edge case", "Trường hợp biên/hiếm gặp"],
          ["Data drift", "Trôi dạt dữ liệu — phân phối dữ liệu vận hành đổi khác so với lúc huấn luyện"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          Which activity belongs to the FIRST step of data representativeness
          testing, before any statistical comparison is performed?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}Running a Kolmogorov-Smirnov test on the
            training and reference datasets.
          </li>
          <li>
            <strong>b)</strong>{" "}Defining the target population by analyzing
            end users, operational context, and consulting domain experts.
          </li>
          <li>
            <strong>c)</strong>{" "}Monitoring operational data for drift after
            deployment.
          </li>
          <li>
            <strong>d)</strong>{" "}Visualizing feature correlations with scatter
            plots.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Hoạt động nào thuộc bước ĐẦU TIÊN của kiểm thử tính đại diện,
              trước khi thực hiện bất kỳ so sánh thống kê nào?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}Chạy kiểm định Kolmogorov-Smirnov trên tập
              huấn luyện và tập tham chiếu.
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}Xác định tập đối tượng mục tiêu bằng cách
              phân tích người dùng cuối, bối cảnh vận hành, tham vấn chuyên
              gia miền.
            </p>
            <p className="m-0">
              <strong>c)</strong>{" "}Giám sát dữ liệu vận hành để tìm drift sau
              triển khai.
            </p>
            <p className="m-0">
              <strong>d)</strong>{" "}Trực quan hóa tương quan đặc trưng bằng
              scatter plot.
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
              <strong>b</strong>{" "}— xác định target population là bước 1, diễn
              ra trước khi phân tích đặc điểm dữ liệu và đánh giá thống kê.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong>{" "}sai — đây là hoạt động thuộc bước 3 (đánh
                giá thống kê).
              </p>
              <p className="m-0">
                <strong>c</strong>{" "}sai — đây là hoạt động sau triển khai, liên
                quan drift testing chứ không phải bước 1.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — đây thuộc bước 2 (phân tích đặc điểm
                dữ liệu qua EDA).
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
        5.1.4 &quot;Testing for Data Representativeness&quot;, trang 50–51 —
        ISTQB® Certified Tester AI Testing Syllabus v2.0 (© International
        Software Testing Qualifications Board). Nội dung biên soạn/dịch ý lại
        bằng tiếng Việt, không sao chép nguyên văn.
      </p>
    </>
  );
}
