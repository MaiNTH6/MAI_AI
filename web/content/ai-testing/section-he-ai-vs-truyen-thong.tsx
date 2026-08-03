import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 1.1.1 — Hệ thống AI vs hệ thống truyền thống. */
export function SectionHeAiVsTruyenThong() {
  return (
    <>
      <div className="badge">🧠 CT-AI · Chương 1 · Mục 1.1.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Hệ thống AI khác phần mềm truyền thống ở đâu?
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-1.1.1 · mức K2 – Hiểu): <em>phân biệt</em>{" "}hệ thống dựa trên AI
          với hệ thống truyền thống.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}vì
            sao phải kiểm thử khác?
          </p>
          <p className="m-0 mt-1.5">
            •{" "}
            <strong className="text-[color:var(--ink)]">Phần mềm thường</strong>{" "}→
            chạy theo <strong>luật người viết sẵn</strong>
          </p>
          <p className="m-0 mt-1">
            • <strong className="text-[color:var(--ink)]">Hệ AI</strong>{" "}→ chạy
            theo <strong>mẫu học từ dữ liệu</strong>
          </p>
        </div>
      </div>

      {/* Bảng phân loại */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Phân loại: 3 khác biệt cốt lõi
      </h2>
      <p className="mt-1 text-[color:var(--muted)]">Thuộc bảng này là đủ ý để thi.</p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["#", "Tiêu chí", "Phần mềm truyền thống", "Hệ thống AI (ML)"].map(
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
                "1",
                "Cách ra kết quả",
                "Luật tường minh (if-then-else) → tất định, dễ đoán",
                "Học mẫu từ dữ liệu, suy luận xác suất → khó đoán",
              ],
              [
                "2",
                "Giải thích được không",
                "Minh bạch, lần ra được lý do",
                "Hộp đen (hàng tỉ tham số), khó biết vì sao",
              ],
              [
                "3",
                "Thích ứng",
                "Tĩnh — đổi hành vi phải sửa code",
                "Tự học theo dữ liệu mới → cần giám sát liên tục",
              ],
            ].map((r) => (
              <tr key={r[0]} className="even:bg-white/[0.04]">
                {r.map((c, i) => (
                  <td
                    key={i}
                    className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)]"
                  >
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Giải thích từng khác biệt */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Giải thích nhanh từng khác biệt
      </h2>
      <div className="mt-4 space-y-4 text-[color:var(--muted)] leading-relaxed">
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">
            ① Tất định vs Xác suất.
          </strong>{" "}
          Phần mềm thường: cùng một đầu vào luôn cho cùng đầu ra. Hệ AI giải quyết
          vấn đề bằng <strong>bộ ba</strong>: suy luận xác suất (probabilistic
          reasoning), suy luận thống kê (statistical inference) và nhận dạng mẫu
          (pattern recognition). Nhờ đó AI{" "}
          <strong>xử lý được sự bất định (uncertainty) và mơ hồ (ambiguity)</strong>{" "}
          phức tạp tốt hơn — đánh đổi là đầu ra{" "}
          <em>không phải lúc nào cũng đoán trước được</em>.{" "}
          <em>
            Ví dụ: nhận diện mèo — hệ thường cần mô tả luật (&quot;tai nhọn, có
            ria&quot;); hệ AI học từ hàng nghìn ảnh rồi tự rút đặc trưng.
          </em>
        </p>
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">
            ② Minh bạch vs Hộp đen.
          </strong>{" "}
          Mô hình học sâu có thể chứa <strong>hàng tỉ tham số</strong>{" "}→ khó biết
          vì sao nó ra quyết định. Nguy hiểm ở lĩnh vực hệ trọng: y tế, tài chính,
          quốc phòng, giao thông. Vì vậy tính minh bạch (transparency) và giải
          thích được (explainability) đang là{" "}
          <strong>trọng tâm của các quy định về AI</strong>{" "}(xem thêm mục 2.1.1).
        </p>
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">③ Tĩnh vs Tự học.</strong>{" "}
          Hệ thường tĩnh, muốn đổi hành vi phải cập nhật thủ công. Hệ AI tự học,
          liên tục cải thiện khi gặp dữ liệu mới →{" "}
          <strong>đặc biệt mạnh trong môi trường động</strong>, thay đổi liên tục.
          Đổi lại, phải <strong>giám sát liên tục</strong>{" "}để nó không
          &quot;trôi&quot; khỏi yêu cầu ban đầu.
        </p>
      </div>

      {/* Chỗ dễ ra đề */}
      <div className="mt-8 rounded-2xl border-2 border-dashed border-amber-500/40 bg-amber-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-amber-200">
          📝 Bẫy hay gặp
        </h3>
        <ul className="mt-2 mb-0 space-y-1.5 text-[color:var(--muted)]">
          <li>
            Nhớ đúng cặp đối lập: <strong>tất định ↔ xác suất</strong>,{" "}
            <strong>minh bạch ↔ hộp đen</strong>, <strong>tĩnh ↔ tự học</strong>.
          </li>
          <li>
            Đề hay gài: &quot;hệ AI luôn cho cùng kết quả với cùng input&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>{" "}(đó là hệ truyền
            thống).
          </li>
        </ul>
      </div>

      {/* Ghi nhớ (gộp: nhớ nhanh + vì sao tester quan tâm) */}
      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">
          📌 Ghi nhớ
        </h3>
        <div className="mt-3 space-y-2 text-[color:var(--ink)] leading-relaxed">
          <p className="m-0">
            <strong className="text-[color:var(--metal)]">Phần mềm thường</strong>{" "}
            = luật + tất định + minh bạch + tĩnh
          </p>
          <p className="m-0">
            <strong className="text-[color:var(--metal)]">Hệ AI</strong>{" "}= dữ liệu
            + xác suất + hộp đen + tự học
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}đầu ra
          xác suất + hộp đen + tự trôi →{" "}
          <strong>không có &quot;một đáp án đúng duy nhất&quot;</strong>{" "}để so —
          gốc rễ khiến các phần sau phải dùng cách tiếp cận{" "}
          <strong>thống kê</strong>, <strong>test oracle riêng cho AI</strong>, và{" "}
          <strong>kiểm thử drift</strong>.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Artificial intelligence (AI)", "Trí tuệ nhân tạo"],
          ["AI-based system", "Hệ thống dựa trên AI"],
          ["Conventional system", "Hệ thống truyền thống (lập trình luật tường minh)"],
          ["Machine learning (ML)", "Học máy — nhánh AI học từ dữ liệu, không lập trình tường minh"],
          ["Deep learning", "Học sâu — dùng mạng nơ-ron nhiều lớp"],
          ["Imperative language", "Ngôn ngữ mệnh lệnh — viết từng bước if-then-else"],
          ["Deterministic", "Tất định — cùng đầu vào luôn cho cùng đầu ra"],
          ["Probabilistic reasoning", "Suy luận xác suất"],
          ["Statistical inference", "Suy luận thống kê"],
          ["Pattern recognition", "Nhận dạng mẫu"],
          ["Uncertainty", "Sự bất định"],
          ["Ambiguity", "Sự mơ hồ"],
          ["Explainability", "Khả năng giải thích (vì sao AI ra quyết định đó)"],
          ["Transparency", "Tính minh bạch"],
          ["Black-box", "Hộp đen — không nhìn được bên trong"],
          ["Adaptability", "Khả năng thích ứng"],
          ["Self-learning", "Tự học — cải thiện khi có dữ liệu mới"],
          ["Dynamic environment", "Môi trường động — thay đổi liên tục"],
          ["Continuous monitoring", "Giám sát liên tục (theo dõi AI sau khi triển khai)"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          A team replaces a fixed if-then-else credit-scoring module with a
          machine learning model trained on historical data. Compared with the
          old module, which statement <strong>correctly describes</strong>{" "}the new
          system?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}Given the same input record, it always returns the
            same score in a deterministic way.
          </li>
          <li>
            <strong>b)</strong>{" "}Its results are based on patterns learned from data
            and are probabilistic, so they are not always predictable.
          </li>
          <li>
            <strong>c)</strong>{" "}The way it makes decisions is always more
            transparent and easier to explain than the old module.
          </li>
          <li>
            <strong>d)</strong>{" "}It needs no monitoring after deployment because its
            behaviour is fixed.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Một nhóm phát triển thay module tính điểm tín dụng bằng luật
              if-then-else cố định bằng một mô hình học máy huấn luyện từ dữ liệu
              lịch sử. So với module cũ, phát biểu nào{" "}
              <strong>mô tả đúng</strong>{" "}hệ thống mới?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}Cùng một hồ sơ đầu vào luôn cho cùng một điểm số
              một cách tất định.
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}Kết quả dựa trên mẫu học từ dữ liệu và mang tính
              xác suất, không phải lúc nào cũng đoán trước được.
            </p>
            <p className="m-0">
              <strong>c)</strong>{" "}Cách hệ ra quyết định luôn minh bạch và dễ giải
              thích hơn module cũ.
            </p>
            <p className="m-0">
              <strong>d)</strong>{" "}Hệ không cần giám sát sau khi triển khai vì hành
              vi đã cố định.
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
              <strong>b</strong>{" "}— Mô hình ML học mẫu từ dữ liệu và suy luận theo
              xác suất → đầu ra không tất định.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong>{" "}sai — tất định là đặc điểm của hệ luật cũ.
              </p>
              <p className="m-0">
                <strong>c</strong>{" "}sai — mô hình ML thường là hộp đen, khó giải
                thích hơn.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — hệ tự học cần giám sát liên tục để không
                bị trôi.
              </p>
            </div>
          </div>
        </details>
        <p className="mt-3 mb-0 text-xs italic text-[color:var(--faint)]">
          Đề để tiếng Anh cho sát đề thi thật; phần giải thích để tiếng Việt cho
          dễ hiểu. Câu hỏi do maiqai.com tự soạn theo phong cách đề — trong đề mẫu
          chính thức, LO AI-1.1.1 tương ứng với Câu 1 (Sample Exam Set A).
        </p>
      </div>

      {/* Ghi chú nguồn */}
      <p className="mt-8 text-xs italic text-[color:var(--faint)] leading-relaxed border-t border-[color:var(--line)] pt-4">
        📎 Nguồn: Chương 1 – Giới thiệu AI, mục 1.1.1 &quot;AI-Based and
        Conventional Systems&quot;, trang 15 — ISTQB® Certified Tester AI Testing
        Syllabus v2.0 (© International Software Testing Qualifications Board). Nội
        dung biên soạn/dịch ý lại bằng tiếng Việt, không sao chép nguyên văn.
      </p>
    </>
  );
}
