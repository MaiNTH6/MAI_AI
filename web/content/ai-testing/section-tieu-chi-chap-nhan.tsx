import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 2.2.1 — Tiêu chí chấp nhận cho hệ thống AI. */
export function SectionTieuChiChapNhan() {
  return (
    <>
      <div className="badge">🎯 CT-AI · Chương 2 · Mục 2.2.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Tiêu chí chấp nhận cho hệ AI: đo bằng ngưỡng, không phải đúng/sai
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-2.2.1 · mức K2 – Hiểu): <em>nêu ví dụ</em>{" "}về tiêu chí chấp nhận
          cho hệ AI.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}với
            hệ AI, tiêu chí chấp nhận thường phải mang tính{" "}
            <strong>thống kê / xác suất / theo ngưỡng</strong>{" "}— không phải
            &quot;đúng hay sai&quot; (binary) như phần mềm thường.
          </p>
          <p className="m-0 mt-1.5">
            Xét cả <strong>chức năng</strong>{" "}lẫn <strong>phi chức năng</strong>,
            gắn với các đặc tính chất lượng ISO/IEC 25059 (mục 2.1.1) và an toàn
            (mục 2.1.2).
          </p>
        </div>
      </div>

      {/* Bảng ví dụ tiêu chí chấp nhận */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Ví dụ tiêu chí chấp nhận theo từng đặc tính
      </h2>
      <p className="mt-1 text-[color:var(--muted)]">
        Điểm chung: đều <strong>đo được, có con số / ngưỡng / thời gian</strong>.
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Đặc tính", "Ví dụ tiêu chí chấp nhận"].map((h) => (
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
                "AI functional correctness",
                "Accuracy ≥ 95% cho hệ nhận diện ảnh; recall ≥ 90% cho hệ dự đoán lỗi.",
              ],
              [
                "Functional adaptability",
                "Hệ quản lý động cơ thích ứng trong ≤ 20 giây khi vượt ngưỡng độ cao đã định.",
              ],
              [
                "User controllability",
                "Giám sát viên giành quyền điều khiển drone trong 0,5 giây khi nó phát tín hiệu mất GPS.",
              ],
              [
                "Transparency",
                "Cung cấp đủ thông tin về mô hình ML bên thứ ba và nguồn gốc dữ liệu huấn luyện; API trả về mã phiên bản mô hình đang chạy + link tài liệu.",
              ],
              [
                "AI robustness",
                "Thời gian phản hồi vẫn < 1 giây khi mất kết nối CSDL trung tâm trong 30 giây; thiết bị edge chuyển sang chế độ suy luận điện thấp (thay vì sập) khi nhiệt độ > 85°C liên tục 10 giây.",
              ],
              [
                "Intervenability",
                "Dây chuyền dừng được trong 0,5 giây khi robot vượt vùng an toàn; lưới điện có cửa sổ xác nhận 30 giây để kỹ sư phủ quyết hành động 'nghiêm trọng' do AI đề xuất.",
              ],
              [
                "Societal & ethical risk mitigation",
                "Hệ tuyên án không phân biệt theo nhóm sắc tộc (theo metric công bằng đã định); chatbot đạt ≥ 95% trong đánh giá red teaming về từ chối tạo nội dung bạo lực/tự hại/thù ghét.",
              ],
              [
                "Safety (an toàn)",
                "Thành phần không-AI tuân ISO 26262-6 mức ASIL C; tín hiệu điều khiển vượt giới hạn an toàn > 10% được xử lý trong 0,15 giây.",
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

      {/* Chỗ dễ ra đề */}
      <div className="mt-8 rounded-2xl border-2 border-dashed border-amber-500/40 bg-amber-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-amber-200">📝 Bẫy hay gặp</h3>
        <p className="mt-1 mb-2 text-sm text-[color:var(--muted)]">
          Đề hay cho một phát biểu <em>nghe hợp lý nhưng sai</em>{" "}— nhớ mấy chỗ
          gài sau:
        </p>
        <ul className="mt-0 mb-0 space-y-1.5 text-[color:var(--muted)]">
          <li>
            &quot;Tiêu chí chấp nhận hệ AI nên là đúng/sai (binary)&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: thường phải{" "}
            <strong>thống kê / theo ngưỡng</strong>{" "}
            (accuracy ≥ 95%, phản hồi &lt; 1s...).
          </li>
          <li>
            &quot;Chỉ cần xét đặc tính chức năng&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: xét cả{" "}
            <strong>phi chức năng</strong>{" "}(robustness, transparency, an toàn...).
          </li>
          <li>
            Một tiêu chí chấp nhận tốt phải <strong>đo được</strong>{" "}— &quot;hệ
            phải đủ chính xác&quot; là <strong className="text-amber-200">chưa
            đạt</strong>{" "}(thiếu con số/ngưỡng).
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
            <strong className="text-[color:var(--metal)]">Kiểu tiêu chí:</strong>{" "}
            thống kê · xác suất · theo ngưỡng (không binary)
          </p>
          <p className="m-0">
            <strong className="text-[color:var(--metal)]">Gắn với:</strong>{" "}
            đặc tính 25059 + an toàn; xét cả chức năng &amp; phi chức năng
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}đây là
          việc rất thực tế — tester phải biến yêu cầu mơ hồ thành{" "}
          <strong>tiêu chí đo được</strong>{" "}
          (accuracy ≥ 95%, phản hồi &lt; 1s, dừng trong 0,5s...). Có con số rõ thì
          mới <strong>test và phán pass/fail</strong>{" "}
          được cho hệ AI vốn không có &quot;một đáp án đúng duy nhất&quot;.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Acceptance criteria", "Tiêu chí chấp nhận — điều kiện để hệ được coi là đạt"],
          ["Threshold-based", "Theo ngưỡng — đạt/không dựa trên mốc số cụ thể"],
          ["Statistical", "Thống kê — dựa trên số liệu tổng hợp"],
          ["Probabilistic", "Xác suất"],
          ["Binary", "Nhị phân — chỉ đúng hoặc sai"],
          ["Functional (characteristic)", "Đặc tính chức năng"],
          ["Non-functional (characteristic)", "Đặc tính phi chức năng"],
          ["Accuracy", "Độ chính xác (thước đo phân loại)"],
          ["Recall", "Độ bao phủ — bắt được bao nhiêu ca dương thật"],
          ["Fairness metric", "Thước đo công bằng"],
          ["Red teaming", "Đánh giá tấn công thử để tìm điểm yếu/rủi ro"],
          ["ASIL (automotive safety integrity level)", "Mức toàn vẹn an toàn ô tô (theo ISO 26262)"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          Which of the following is the <strong>most appropriate</strong>{" "}
          acceptance criterion for the AI functional correctness of an image
          recognition system?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}The system should be accurate enough.
          </li>
          <li>
            <strong>b)</strong>{" "}The system must never make a mistake.
          </li>
          <li>
            <strong>c)</strong>{" "}The system shall achieve an accuracy of at least
            95%.
          </li>
          <li>
            <strong>d)</strong>{" "}The system should feel fast to users.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Đâu là tiêu chí chấp nhận <strong>phù hợp nhất</strong>{" "}cho tính đúng
              đắn chức năng AI của một hệ nhận diện ảnh?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}Hệ nên đủ chính xác.
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}Hệ không bao giờ được sai.
            </p>
            <p className="m-0">
              <strong>c)</strong>{" "}Hệ phải đạt accuracy tối thiểu 95%.
            </p>
            <p className="m-0">
              <strong>d)</strong>{" "}Hệ nên tạo cảm giác nhanh với người dùng.
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
              <strong>c</strong>{" "}— Có <strong>ngưỡng đo được</strong>{" "}(accuracy ≥
              95%) nên test được.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong>{" "}và <strong>d</strong>{" "}sai — mơ hồ, không đo
                được (&quot;đủ chính xác&quot;, &quot;cảm giác nhanh&quot;).
              </p>
              <p className="m-0">
                <strong>b</strong>{" "}sai — hệ AI xác suất không thể &quot;không bao
                giờ sai&quot;.
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
        📎 Nguồn: Chương 2 – Đặc tính chất lượng, mục 2.2.1 &quot;Acceptance
        Criteria for AI-Based Systems&quot;, trang 23–25 — ISTQB® Certified Tester
        AI Testing Syllabus v2.0 (© International Software Testing Qualifications
        Board). Nội dung biên soạn/dịch ý lại bằng tiếng Việt, không sao chép
        nguyên văn.
      </p>
    </>
  );
}
