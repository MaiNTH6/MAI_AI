import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 3.2.1 — Các hoạt động chuẩn bị dữ liệu. */
export function SectionChuanBiDuLieu() {
  return (
    <>
      <div className="badge">🤖 CT-AI · Chương 3 · Mục 3.2.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Chuẩn bị dữ liệu: khâu tốn công nhất của ML
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-3.2.1 · mức K2 – Hiểu): <em>tóm tắt</em>{" "}các hoạt động chuẩn bị
          dữ liệu cho ML.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}chuẩn
            bị dữ liệu là khâu <strong>quan trọng &amp; tốn nguồn lực nhất</strong>{" "}
            trong quy trình ML — gồm <strong>3 nhóm hoạt động</strong>{" "}+ EDA song
            song.
          </p>
        </div>
      </div>

      {/* Bảng 3 nhóm hoạt động */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Ba nhóm hoạt động chính
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Nhóm", "Gồm gì"].map((h) => (
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
                "Data acquisition (thu thập)",
                "Xác định loại dữ liệu cần (số, phân loại, ảnh, văn bản...); thu từ nhiều nguồn (CSDL, API, cảm biến thời gian thực); gắn nhãn cho supervised, kiểm độ chính xác & nhất quán. Dữ liệu thu được có thể ở nhiều dạng: số (numerical), phân loại (categorical), ảnh, dạng bảng (tabular), văn bản, chuỗi thời gian (time series), cảm biến, không gian địa lý (geospatial), video, và âm thanh.",
              ],
              [
                "Data preprocessing (tiền xử lý)",
                "Làm sạch (bỏ lỗi/trùng/ngoại lai; điền khuyết bằng mean/median/mode; ẩn danh/bỏ thông tin cá nhân); biến đổi định dạng, scaling, chuẩn hóa; tăng cường dữ liệu (thêm mẫu, ví dụ đối kháng, dữ liệu tổng hợp); lấy mẫu con để giảm thời gian/chi phí.",
              ],
              [
                "Feature engineering (kỹ thuật đặc trưng)",
                "Chọn đặc trưng liên quan (đóng góp cho hiệu năng); trích tập đặc trưng gọn, nhiều thông tin, không dư thừa → giảm thời gian/chi phí train.",
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

      {/* EDA + operational match */}
      <div className="mt-6 space-y-4 text-[color:var(--muted)] leading-relaxed">
        <p className="m-0">
          Song song, thường làm <strong>EDA (phân tích dữ liệu khám phá)</strong>:
          phát hiện xu hướng, mẫu, bất thường; trực quan hóa bằng biểu đồ để hiểu
          dữ liệu.
        </p>
        <p className="m-0">
          Chuẩn bị dữ liệu là quá trình <strong>lặp</strong>, thường{" "}
          <strong>làm thủ công</strong>; có thể đảo thứ tự hoặc bỏ bớt bước tùy
          dự án. Quan trọng: <strong>dữ liệu vận hành phải khớp đặc điểm dữ liệu
          huấn luyện</strong>{" "}(phân phối, khoảng giá trị đặc trưng) để mô hình
          chạy đúng như kỳ vọng khi lên production.
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
            &quot;Chuẩn bị dữ liệu là khâu nhẹ, nhanh nhất&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: đây là khâu{" "}
            <strong>tốn nguồn lực nhất</strong>, chiếm phần lớn công sức.
          </li>
          <li>
            &quot;Dữ liệu vận hành khác dữ liệu huấn luyện cũng không sao&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: lệch nhau thì hiệu
            năng &amp; giả định an toàn <strong>mất giá trị</strong>.
          </li>
          <li>
            Nhầm khâu: điền giá trị khuyết (mean/median/mode) thuộc{" "}
            <strong>preprocessing</strong>, không phải feature engineering.
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
            <strong className="text-[color:var(--metal)]">3 nhóm:</strong>{" "}thu thập
            · tiền xử lý · feature engineering (+ EDA song song)
          </p>
          <p className="m-0">
            <strong className="text-[color:var(--metal)]">Nguyên tắc vàng:</strong>{" "}
            dữ liệu vận hành phải <em>khớp</em>{" "}đặc điểm dữ liệu huấn luyện
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}lỗi mô
          hình rất hay <strong>bắt nguồn từ dữ liệu</strong>{" "}— nhãn sai, thiên
          lệch, lệch phân phối train/production. Bản thân dữ liệu và các bước
          chuẩn bị tự động <strong>đều phải được test</strong>{" "}(Chương 5).
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Data preparation", "Chuẩn bị dữ liệu"],
          ["Data acquisition", "Thu thập dữ liệu"],
          ["Data preprocessing", "Tiền xử lý dữ liệu"],
          ["Feature engineering", "Kỹ thuật đặc trưng — chọn/trích đặc trưng"],
          ["Feature", "Đặc trưng — thuộc tính đầu vào cho mô hình"],
          ["Data cleaning", "Làm sạch dữ liệu"],
          ["Outlier", "Ngoại lai — điểm dữ liệu bất thường"],
          ["Imputation", "Điền khuyết — bù giá trị thiếu (mean/median/mode)"],
          ["Normalization", "Chuẩn hóa — đưa dữ liệu về cùng thang"],
          ["Data augmentation", "Tăng cường dữ liệu — thêm mẫu/biến thể"],
          ["Adversarial example", "Ví dụ đối kháng — đầu vào cố tình gây sai"],
          ["Synthetic data", "Dữ liệu tổng hợp — do máy tạo"],
          ["Exploratory data analysis (EDA)", "Phân tích dữ liệu khám phá"],
          ["Data pipeline", "Đường ống dữ liệu"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          Imputing missing values using the mean or median belongs to which data
          preparation activity?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}Data acquisition.
          </li>
          <li>
            <strong>b)</strong>{" "}Data preprocessing (cleaning).
          </li>
          <li>
            <strong>c)</strong>{" "}Feature engineering.
          </li>
          <li>
            <strong>d)</strong>{" "}Model deployment.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Điền giá trị khuyết bằng mean hoặc median thuộc hoạt động chuẩn bị
              dữ liệu nào?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}Thu thập dữ liệu.
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}Tiền xử lý (làm sạch).
            </p>
            <p className="m-0">
              <strong>c)</strong>{" "}Feature engineering.
            </p>
            <p className="m-0">
              <strong>d)</strong>{" "}Triển khai mô hình.
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
              <strong>b</strong>{" "}— Điền khuyết là bước làm sạch trong tiền xử lý.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong>{" "}sai — acquisition là thu thập &amp; gắn nhãn.
              </p>
              <p className="m-0">
                <strong>c</strong>{" "}sai — feature engineering là chọn/trích đặc
                trưng.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — deployment là triển khai, không liên
                quan.
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
        📎 Nguồn: Chương 3 – Machine Learning, mục 3.2.1 &quot;Activities in Data
        Preparation&quot;, trang 31–32 — ISTQB® Certified Tester AI Testing
        Syllabus v2.0 (© International Software Testing Qualifications Board). Nội
        dung biên soạn/dịch ý lại bằng tiếng Việt, không sao chép nguyên văn.
      </p>
    </>
  );
}
