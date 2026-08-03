import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 4.2.1 — Kiểm thử Generative AI. */
export function SectionKiemThuGenai() {
  return (
    <>
      <div className="badge">🧪 CT-AI · Chương 4 · Mục 4.2.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Kiểm thử Generative AI: khi &quot;đúng/sai&quot; không còn rạch ròi
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-4.2.1 · mức K2 – Hiểu): <em>giải thích</em>{" "}cách kiểm thử một
          hệ Generative AI (GenAI).
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}
            test GenAI phải đánh giá cả{" "}
            <strong>tính đúng đắn, mạch lạc lẫn sáng tạo</strong>{" "}của output —
            và phải đối phó với &quot;input explosion problem&quot; do đầu vào
            quá đa dạng.
          </p>
        </div>
      </div>

      {/* Bảng nội dung cốt lõi */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Những điểm cần nắm
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Chủ đề", "Nội dung"].map((h) => (
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
                "Đánh giá cái gì",
                "Tính đúng đắn (correctness), mạch lạc (coherence) và sáng tạo (creativity) của output — kể cả độ độc đáo/mới mẻ (originality, novelty); đồng thời xác nhận yêu cầu chức năng lẫn phi chức năng. GenAI sinh nhiều dạng nội dung (văn bản, ảnh, video, âm thanh) nên chiến lược test phải điều chỉnh theo từng loại.",
              ],
              [
                "Black-box testing",
                "Cách phổ biến nhất: đưa nhiều loại input (prompt, ảnh, dữ liệu một phần...) vào hệ và đánh giá kết quả — xem thêm Red Teaming (4.2.2). Chú ý độ rõ ràng, độ độc đáo, mức tuân thủ quy tắc riêng của lĩnh vực. Có thể làm thủ công hoặc tự động; hữu ích nhất cho ứng dụng người dùng cuối như chatbot, công cụ thiết kế — nơi sự hài lòng phụ thuộc vào việc nội dung sinh ra có hữu ích & hợp lý.",
              ],
              [
                "Input explosion problem",
                "Thách thức lớn: input quá đa dạng, khó kiểm soát hết. Có system prompt (tùy chọn) và user prompt (có thể chứa lượng dữ liệu khổng lồ, đa dạng), truy cập qua API; nhiều tham số ảnh hưởng output như temperature, max tokens; context window (giữ lại phần trước của hội thoại) cũng ảnh hưởng kết quả sinh ra.",
              ],
              [
                "Cách chấm kết quả",
                "Nhiều trường hợp cần đánh giá thủ công — pass/fail phụ thuộc tiêu chí định tính (qualitative) nêu trong yêu cầu. Cách khác: dùng một hệ GenAI thứ hai để tự động chấm (vd hệ nhận diện ảnh kiểm tra ảnh do GenAI sinh ra) — cần cẩn trọng vì hệ chấm cũng có thể lặp lại thiên lệch/lỗi tương tự.",
              ],
              [
                "Kiểm thử phi chức năng",
                "Quan trọng không kém kiểm thử chức năng: đánh giá mức sử dụng tài nguyên lúc inference lẫn training để xác nhận vận hành hiệu quả, tiết kiệm chi phí — gồm CPU/GPU, bộ nhớ, băng thông mạng, thời gian phản hồi.",
              ],
              [
                "Benchmark suite",
                "Bộ dữ liệu & tác vụ chuẩn hóa giúp so sánh nhất quán giữa các model — đo từ khả năng hiểu ngôn ngữ đến suy luận, lập trình... Đối chiếu với benchmark giúp phát hiện điểm cần cải thiện một cách hệ thống, có thể lặp lại.",
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

      {/* Chỗ dễ ra đề */}
      <div className="mt-8 rounded-2xl border-2 border-dashed border-amber-500/40 bg-amber-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-amber-200">📝 Bẫy hay gặp</h3>
        <p className="mt-1 mb-2 text-sm text-[color:var(--muted)]">
          Đề hay cho một phát biểu <em>nghe hợp lý nhưng sai</em>{" "}— nhớ mấy chỗ
          gài sau:
        </p>
        <ul className="mt-0 mb-0 space-y-1.5 text-[color:var(--muted)]">
          <li>
            &quot;Test GenAI chỉ cần kiểm tra output đúng/sai như phần mềm
            thường&quot; → <strong className="text-amber-200">SAI</strong>:
            phải đánh giá thêm <strong>mạch lạc &amp; sáng tạo</strong>, và
            tiêu chí thường mang tính <strong>định tính</strong>.
          </li>
          <li>
            &quot;Input explosion chỉ do user prompt dài&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: còn do{" "}
            <strong>system prompt, tham số (temperature, max tokens), context
            window</strong>{" "}và việc truy cập qua API.
          </li>
          <li>
            &quot;Dùng GenAI khác để tự động chấm luôn khách quan, không cần
            cẩn trọng&quot; → <strong className="text-amber-200">SAI</strong>:
            hệ chấm cũng có thể{" "}
            <strong>lặp lại thiên lệch/lỗi tương tự</strong>{" "}hệ được chấm.
          </li>
          <li>
            &quot;Kiểm thử GenAI chỉ cần quan tâm chức năng, bỏ qua phi chức
            năng&quot; → <strong className="text-amber-200">SAI</strong>: phi
            chức năng (tài nguyên, chi phí, thời gian phản hồi) quan trọng
            ngang chức năng.
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
            <strong className="text-[color:var(--metal)]">Đánh giá:</strong>{" "}
            đúng đắn · mạch lạc · sáng tạo — cả chức năng lẫn phi chức năng
          </p>
          <p className="m-0">
            <strong className="text-[color:var(--metal)]">
              Input explosion:
            </strong>{" "}
            prompt + tham số + context window khiến input khó kiểm soát hết
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}khi
          test chatbot hay công cụ sinh nội dung, đừng chỉ soi &quot;output có
          hợp lý không&quot; — thử đổi <strong>temperature</strong>, độ dài
          hội thoại (context window), và cả prompt hệ thống lẫn prompt người
          dùng để xem output biến động ra sao; đồng thời đối chiếu qua{" "}
          <strong>benchmark</strong>{" "}để có con số so sánh khách quan.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Generative AI (GenAI)", "AI tạo sinh — sinh nội dung mới (văn bản, ảnh, video, âm thanh)"],
          ["Large language model (LLM)", "Mô hình ngôn ngữ lớn"],
          ["Black-box testing", "Kiểm thử hộp đen — chỉ dựa vào input/output, không biết cấu trúc bên trong"],
          ["Input explosion problem", "Vấn đề bùng nổ đầu vào — input quá đa dạng, khó kiểm soát hết"],
          ["System prompt", "Prompt hệ thống — chỉ dẫn nền do nhà phát triển đặt"],
          ["User prompt", "Prompt người dùng nhập"],
          ["Temperature", "Tham số điều chỉnh mức ngẫu nhiên/sáng tạo của output"],
          ["Context window", "Cửa sổ ngữ cảnh — phần hội thoại trước được mô hình \"nhớ\""],
          ["Benchmark suite", "Bộ chuẩn đánh giá — dữ liệu & tác vụ chuẩn hóa để so sánh model"],
          ["Non-functional testing", "Kiểm thử phi chức năng (hiệu năng, tài nguyên, chi phí...)"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          Which factor is a key contributor to the &quot;input explosion
          problem&quot; when testing a GenAI chatbot?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}The chatbot only accepts a single fixed input
            format.
          </li>
          <li>
            <strong>b)</strong>{" "}Parameters like temperature and the context
            window can change the output for the same prompt.
          </li>
          <li>
            <strong>c)</strong>{" "}GenAI systems never use system prompts.
          </li>
          <li>
            <strong>d)</strong>{" "}Benchmarks eliminate the need to consider
            prompt variability.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Yếu tố nào là nguyên nhân chính gây ra &quot;input explosion
              problem&quot; khi test một chatbot GenAI?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}Chatbot chỉ nhận một định dạng input cố
              định.
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}Các tham số như temperature và context
              window có thể làm thay đổi output dù cùng một prompt.
            </p>
            <p className="m-0">
              <strong>c)</strong>{" "}Hệ GenAI không bao giờ dùng system prompt.
            </p>
            <p className="m-0">
              <strong>d)</strong>{" "}Benchmark loại bỏ hoàn toàn nhu cầu xét đến
              sự biến thiên của prompt.
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
              <strong>b</strong>{" "}— tham số &amp; context window là hai trong
              các yếu tố khiến input/khả năng ảnh hưởng đến output trở nên rất
              đa dạng.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong>{" "}sai — thực tế GenAI thường nhận nhiều dạng
                input đa dạng, không cố định.
              </p>
              <p className="m-0">
                <strong>c</strong>{" "}sai — hệ GenAI thường có cả system prompt
                lẫn user prompt.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — benchmark giúp so sánh chuẩn hóa,
                không loại bỏ được vấn đề input đa dạng trong thực tế sử dụng.
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
        📎 Nguồn: Chương 4 – Kiểm thử hệ thống dựa trên AI, mục 4.2.1
        &quot;Testing Generative AI&quot;, trang 41–42 — ISTQB® Certified
        Tester AI Testing Syllabus v2.0 (© International Software Testing
        Qualifications Board). Nội dung biên soạn/dịch ý lại bằng tiếng Việt,
        không sao chép nguyên văn.
      </p>
    </>
  );
}
