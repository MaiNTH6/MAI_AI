import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 3.1.1 — Các dạng Machine Learning. */
export function SectionCacDangMl() {
  return (
    <>
      <div className="badge">🤖 CT-AI · Chương 3 · Mục 3.1.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        3 dạng Machine Learning và bài toán của mỗi dạng
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-3.1.1 · mức K2 – Hiểu): <em>phân biệt</em> supervised,
          unsupervised và reinforcement learning cùng loại bài toán của chúng.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong> chọn
            dạng ML theo <strong>bản chất dữ liệu</strong> (có nhãn hay không) và{" "}
            <strong>loại việc</strong> cần làm.
          </p>
        </div>
      </div>

      {/* Bảng 3 dạng + bài toán con */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Ba dạng &amp; bài toán con
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Dạng học", "Dữ liệu / cách học", "Bài toán con + ví dụ"].map(
                (h) => (
                  <th
                    key={h}
                    className="border border-[color:var(--line2)] px-3 py-2 text-left font-semibold"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {[
              [
                "Supervised (có giám sát)",
                "Dữ liệu có nhãn (mỗi đầu vào có đáp án).",
                "Classification: gán vào lớp định sẵn (spam / không spam, nhận diện ảnh). ML regression: dự đoán số liên tục (tuổi, giá cổ phiếu).",
              ],
              [
                "Unsupervised (không giám sát)",
                "Dữ liệu không nhãn, tự tìm cấu trúc.",
                "Clustering: gom nhóm theo tương đồng (phân khúc khách hàng). Association: tìm quan hệ giữa thuộc tính (gợi ý sản phẩm theo hành vi mua).",
              ],
              [
                "Reinforcement (tăng cường)",
                "Agent tương tác môi trường, nhận thưởng/phạt theo hành động.",
                "Robotics, xe tự lái, chatbot thích ứng. Thách thức: dựng môi trường, thiết kế hàm thưởng, chọn chiến lược.",
              ],
            ].map((r) => (
              <tr key={r[0]} className="even:bg-white/[0.04]">
                <td className="border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)]">
                  {r[0]}
                </td>
                <td className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)]">
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

      {/* Lưu ý thuật ngữ */}
      <div className="mt-6 rounded-xl border border-sky-400/30 bg-sky-500/10 p-4 text-sm text-[color:var(--muted)] leading-relaxed">
        <p className="m-0">
          ⚠️ <strong className="text-[color:var(--ink)]">Chú ý thuật ngữ:</strong>{" "}
          &quot;<strong>ML regression</strong>&quot; ở đây là{" "}
          <strong>dự đoán giá trị số liên tục</strong> — khác hẳn{" "}
          &quot;regression testing&quot; (kiểm thử hồi quy) trong các syllabus
          ISTQB khác. Đừng nhầm hai khái niệm.
        </p>
      </div>

      {/* Chỗ dễ ra đề */}
      <div className="mt-8 rounded-2xl border-2 border-dashed border-amber-500/40 bg-amber-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-amber-200">📝 Bẫy hay gặp</h3>
        <p className="mt-1 mb-2 text-sm text-[color:var(--muted)]">
          Đề hay cho một phát biểu <em>nghe hợp lý nhưng sai</em> — nhớ mấy chỗ
          gài sau:
        </p>
        <ul className="mt-0 mb-0 space-y-1.5 text-[color:var(--muted)]">
          <li>
            &quot;Clustering là supervised learning&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: clustering &amp;
            association thuộc <strong>unsupervised</strong> (dữ liệu không nhãn).
          </li>
          <li>
            &quot;Dự đoán giá cổ phiếu là bài toán classification&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: dự đoán{" "}
            <strong>số liên tục</strong> là <strong>ML regression</strong>;
            classification là gán vào lớp rời rạc.
          </li>
          <li>
            &quot;Reinforcement học từ một tập dữ liệu có sẵn&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: nó học từ{" "}
            <strong>tương tác + thưởng/phạt</strong> với môi trường.
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
            <strong className="text-[color:var(--metal)]">Supervised</strong> = có
            nhãn → classification (lớp) · ML regression (số)
          </p>
          <p className="m-0">
            <strong className="text-[color:var(--metal)]">Unsupervised</strong> =
            không nhãn → clustering (gom) · association (quan hệ)
          </p>
          <p className="m-0">
            <strong className="text-[color:var(--metal)]">Reinforcement</strong> =
            agent + thưởng/phạt
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong> biết
          dạng ML để chọn đúng <strong>thước đo</strong> và cách test — hệ{" "}
          <strong>classification</strong> dùng confusion matrix &amp;
          accuracy/precision/recall (mục 3.3.1); hệ <strong>ML regression</strong>{" "}
          dùng error rate.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Supervised learning", "Học có giám sát — dữ liệu có nhãn"],
          ["Unsupervised learning", "Học không giám sát — dữ liệu không nhãn"],
          ["Reinforcement learning", "Học tăng cường — agent học qua thưởng/phạt"],
          ["Labeled data", "Dữ liệu có nhãn (đã gắn đáp án)"],
          ["Classification", "Phân loại — gán đầu vào vào lớp định sẵn"],
          ["ML regression", "Hồi quy ML — dự đoán giá trị số liên tục (khác regression testing)"],
          ["Clustering", "Gom cụm — nhóm dữ liệu giống nhau"],
          ["Association", "Kết hợp — tìm quan hệ/phụ thuộc giữa các thuộc tính"],
          ["Intelligent agent", "Tác tử thông minh — thực thể học qua tương tác"],
          ["Reward", "Phần thưởng (phản hồi tích cực)"],
          ["Penalty", "Hình phạt (phản hồi tiêu cực)"],
          ["Reward function", "Hàm thưởng — định nghĩa cách chấm điểm hành động"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          A model must predict a person’s <strong>age</strong> (a continuous
          number) from lifestyle data. Which type of ML problem is this?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong> Classification (supervised).
          </li>
          <li>
            <strong>b)</strong> ML regression (supervised).
          </li>
          <li>
            <strong>c)</strong> Clustering (unsupervised).
          </li>
          <li>
            <strong>d)</strong> Reinforcement learning.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Một mô hình phải dự đoán <strong>tuổi</strong> (số liên tục) của một
              người từ dữ liệu lối sống. Đây là loại bài toán ML nào?
            </p>
            <p className="m-0">
              <strong>a)</strong> Phân loại (supervised).
            </p>
            <p className="m-0">
              <strong>b)</strong> ML regression (supervised).
            </p>
            <p className="m-0">
              <strong>c)</strong> Gom cụm (unsupervised).
            </p>
            <p className="m-0">
              <strong>d)</strong> Học tăng cường.
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
              <strong>b</strong> — Dự đoán số liên tục (tuổi) là ML regression.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong> sai — classification gán vào lớp rời rạc, không
                phải số liên tục.
              </p>
              <p className="m-0">
                <strong>c</strong> sai — clustering là unsupervised, không dự đoán
                giá trị cụ thể.
              </p>
              <p className="m-0">
                <strong>d</strong> sai — reinforcement học qua thưởng/phạt, không
                hợp bài toán này.
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
        📎 Nguồn: Chương 3 – Machine Learning, mục 3.1.1 &quot;Different Forms of
        Machine Learning&quot;, trang 27 — ISTQB® Certified Tester AI Testing
        Syllabus v2.0 (© International Software Testing Qualifications Board). Nội
        dung biên soạn/dịch ý lại bằng tiếng Việt, không sao chép nguyên văn.
      </p>
    </>
  );
}
