import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 1.1.4 — Generative AI (GenAI). */
export function SectionGenerativeAi() {
  return (
    <>
      <div className="badge">🧠 CT-AI · Chương 1 · Mục 1.1.4</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Generative AI: tạo nội dung mới và các tác động
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-1.1.4 · mức K2 – Hiểu): <em>giải thích</em> Generative AI là gì,
          công nghệ nền và các tác động đi kèm.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}
            GenAI là AI chuyên <strong>tạo ra nội dung mới</strong> (văn bản, ảnh,
            video, nhạc, dữ liệu phức tạp) trông giống dữ liệu nó đã học.
          </p>
          <p className="m-0 mt-1.5">
            Học từ <strong>lượng dữ liệu khổng lồ</strong> → sinh đầu ra{" "}
            <strong>tương tự dữ liệu huấn luyện</strong> (nhiều mô hình cũng làm
            phân loại/dự đoán).
          </p>
        </div>
      </div>

      {/* Bảng 3 công nghệ nền */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Ba công nghệ nền của GenAI
      </h2>
      <p className="mt-1 text-[color:var(--muted)]">
        Đề hay hỏi &quot;công nghệ nào làm việc gì&quot; — nhớ đúng 3 cái này.
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Công nghệ", "Cách hoạt động", "Ghi nhớ"].map((h) => (
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
                "GANs (mạng đối sinh)",
                "Hai mạng nơ-ron cạnh tranh nhau: một bên tạo dữ liệu giả, một bên phân biệt thật/giả.",
                "2 mạng đấu nhau → dữ liệu giả rất thật",
              ],
              [
                "Diffusion model (mô hình khuếch tán)",
                "Thêm nhiễu vào dữ liệu rồi học cách khử nhiễu dần để tạo nội dung chất lượng cao.",
                "Thêm nhiễu → khử nhiễu",
              ],
              [
                "Transformer",
                "Dùng cơ chế self-attention để sinh văn bản mạch lạc, đúng ngữ cảnh; là nền của LLM, ngày càng dùng cho đa phương thức.",
                "Self-attention → nền của LLM",
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

      {/* Ví von 3 công nghệ nền — gộp 1 mục */}
      <div className="mt-4 rounded-xl border border-[color:var(--line2)] bg-[color:var(--bg2)] p-5 text-sm leading-relaxed">
        <p className="m-0 font-bold text-[color:var(--ink)]">
          💡 Hiểu nhanh 3 công nghệ nền
        </p>
        <div className="mt-3 space-y-4 text-[color:var(--muted)]">
          <div className="border-l-2 border-sky-400/60 pl-3">
            <span className="inline-block rounded-md bg-sky-500/20 px-2 py-0.5 text-sky-200 font-bold">
              GANs — 2 mạng đấu nhau
            </span>
            <p className="m-0 mt-1.5">
              Tưởng tượng một <strong>thợ làm tiền giả</strong> (Generator) và một{" "}
              <strong>cảnh sát</strong> (Discriminator). Thợ càng làm tinh vi để
              qua mặt, cảnh sát càng soi kỹ để bắt bài — hai bên{" "}
              <strong>ép nhau giỏi dần lên</strong>, tới lúc &quot;tiền giả&quot;
              gần như không phân biệt được với thật. Đó là lý do GANs tạo được
              ảnh/deepfake rất sống động.
            </p>
          </div>
          <div className="border-l-2 border-sky-400/60 pl-3">
            <span className="inline-block rounded-md bg-sky-500/20 px-2 py-0.5 text-sky-200 font-bold">
              Diffusion — thêm nhiễu → khử nhiễu
            </span>
            <p className="m-0 mt-1.5">
              Lúc học, mô hình xem ảnh thật bị <strong>rắc nhiễu dần</strong> tới
              khi thành mớ hạt như <strong>màn hình TV mất sóng</strong>, rồi tập{" "}
              <strong>gột nhiễu ngược lại</strong>. Lúc tạo ảnh mới, nó bắt đầu từ
              một màn nhiễu và khử nhiễu dần từng bước — như tấm ảnh đầy hạt{" "}
              <strong>từ từ hiện rõ nét</strong>. Chỉ <strong>1 quy trình</strong>{" "}
              (không đấu 2 mạng như GANs), thường cho ảnh chất lượng cao.
            </p>
          </div>
          <div className="border-l-2 border-sky-400/60 pl-3">
            <span className="inline-block rounded-md bg-sky-500/20 px-2 py-0.5 text-sky-200 font-bold">
              Transformer — self-attention
            </span>
            <p className="m-0 mt-1.5">
              Khi xử lý mỗi từ, mô hình <strong>nhìn tất cả các từ khác</strong>{" "}
              trong câu và cân xem từ nào <strong>liên quan nhất</strong>{" "}
              (kể cả từ ở xa). Ví dụ &quot;con <strong>chuột</strong>{" "}
              cắn đứt dây&quot; và &quot;con <strong>chuột</strong>{" "}
              máy tính bị hỏng&quot; — hiểu đúng nhờ nhìn từ xung quanh. Nhờ vậy
              Transformer bắt được quan hệ xa, sinh văn bản mạch lạc →{" "}
              <strong>nền của các LLM</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Foundation model + multimodal */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Thực tế dùng: foundation model → fine-tune
      </h2>
      <div className="mt-4 space-y-4 text-[color:var(--muted)] leading-relaxed">
        <p className="m-0">
          Đa số công cụ GenAI hôm nay dựng trên một{" "}
          <strong>foundation model</strong> (mô hình nền, huấn luyện sẵn trên dữ
          liệu khổng lồ) rồi <strong>fine-tune</strong> (tinh chỉnh) cho ứng dụng
          cụ thể — thay vì huấn luyện lại từ đầu.
        </p>
        <p className="m-0">
          Xu hướng tiến tới <strong>đa phương thức (multimodal)</strong>: một mô
          hình xử lý và sinh được cả văn bản, ảnh lẫn âm thanh → linh hoạt hơn.
          Khung pháp lý như <strong>EU AI Act</strong> đang dần định hình để quản
          lý việc phát triển và sử dụng có trách nhiệm.
        </p>
      </div>

      {/* Mặt trái / rủi ro */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Mặt trái cần nhớ (3 nhóm lo ngại)
      </h2>
      <div className="mt-4 space-y-4 text-sm text-[color:var(--muted)] leading-relaxed">
        <div className="border-l-2 border-sky-400/60 pl-3">
          <span className="inline-block rounded-md bg-sky-500/20 px-2 py-0.5 text-sky-200 font-bold">
            ① Lạm dụng &amp; xói mòn niềm tin
          </span>
          <p className="m-0 mt-1.5">
            Vì GenAI tạo được nội dung <strong>giả mà rất thật</strong>, nó dễ bị
            lợi dụng: <strong>deepfake</strong> (video/giọng nói giả mặt sếp hay
            người thân để lừa chuyển tiền), <strong>tin giả</strong> và bình luận
            ảo sinh hàng loạt để thao túng dư luận, nội dung lừa đảo tinh vi. Hệ
            quả: người xem <strong>khó phân biệt thật–giả</strong>, mất niềm tin
            vào ảnh/video/tin trên mạng; kèm theo rủi ro về{" "}
            <strong>riêng tư, bảo mật và thao túng</strong>.
          </p>
        </div>
        <div className="border-l-2 border-sky-400/60 pl-3">
          <span className="inline-block rounded-md bg-sky-500/20 px-2 py-0.5 text-sky-200 font-bold">
            ② Tác động tới việc làm
          </span>
          <p className="m-0 mt-1.5">
            Ảnh hưởng rõ nhất tới <strong>lao động tri thức (white-collar)</strong>:
            AI tự viết bài, dịch, thiết kế cơ bản, sinh code, cả soạn tài liệu
            pháp lý/y tế → một số công việc lặp lại bị thu hẹp, dấy lên tranh luận
            về <strong>mất việc</strong>. Đổi lại, nó tăng năng suất và{" "}
            <strong>sinh ra việc mới</strong>{" "}
            (viết prompt, kiểm duyệt &amp; đánh giá đầu ra AI, tinh chỉnh mô
            hình) → buộc người lao động{" "}
            <strong>học lại kỹ năng mới</strong>.
          </p>
        </div>
        <div className="border-l-2 border-sky-400/60 pl-3">
          <span className="inline-block rounded-md bg-sky-500/20 px-2 py-0.5 text-sky-200 font-bold">
            ③ Tính bền vững (môi trường)
          </span>
          <p className="m-0 mt-1.5">
            Huấn luyện và vận hành mô hình lớn <strong>ngốn rất nhiều tài
            nguyên tính toán</strong>: trung tâm dữ liệu tốn lượng điện khổng lồ
            và cả nước để làm mát → <strong>tiêu thụ điện cao, dấu chân carbon
            lớn</strong>. Vì vậy có xu hướng đẩy mạnh{" "}
            <strong>mô hình gọn/hiệu quả hơn</strong> và{" "}
            <strong>hạ tầng dùng năng lượng sạch hơn</strong>.
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm text-[color:var(--muted)]">
        Đổi lại, GenAI cũng mở ra cơ hội đổi mới trong giải trí, marketing, giáo
        dục và nghiên cứu — không phủ nhận lợi ích, nhưng phải nhìn cả hai mặt.
      </p>

      {/* Chỗ dễ ra đề */}
      <div className="mt-8 rounded-2xl border-2 border-dashed border-amber-500/40 bg-amber-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-amber-200">📝 Bẫy hay gặp</h3>
        <p className="mt-1 mb-2 text-sm text-[color:var(--muted)]">
          Đề hay cho một phát biểu <em>nghe hợp lý nhưng sai</em> — nhớ mấy chỗ
          gài sau:
        </p>
        <ul className="mt-0 mb-0 space-y-1.5 text-[color:var(--muted)]">
          <li>
            &quot;GenAI chỉ sinh nội dung, không làm gì khác&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: nhiều mô hình còn làm
            phân loại/dự đoán.
          </li>
          <li>
            Đảo ngược cơ chế — &quot;GANs thêm rồi khử nhiễu&quot; hoặc
            &quot;Diffusion dùng 2 mạng đấu nhau&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: đúng phải là{" "}
            <strong>GANs = 2 mạng đấu</strong>, <strong>Diffusion = nhiễu</strong>.
          </li>
          <li>
            &quot;Self-attention (Transformer) là nền của GANs&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: nó là nền của{" "}
            <strong>LLM</strong>.
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
            <strong className="text-[color:var(--metal)]">GenAI</strong> = tạo nội
            dung mới giống dữ liệu đã học
          </p>
          <p className="m-0">
            <strong className="text-[color:var(--metal)]">3 nền:</strong> GANs ·
            Diffusion · Transformer
          </p>
          <p className="m-0">
            <strong className="text-[color:var(--metal)]">3 lo ngại:</strong> niềm
            tin · việc làm · bền vững
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong> đầu ra
          GenAI <strong>mở, đa dạng, không có một đáp án đúng duy nhất</strong> →
          không thể so khớp chính xác như phần mềm thường. Phải kiểm theo tiêu chí
          (đúng ngữ cảnh, an toàn, không thiên lệch, không bịa) và dùng kỹ thuật
          riêng — <strong>kiểm thử GenAI</strong> và{" "}
          <strong>red teaming</strong> (xem mục 4.2).
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Generative AI (GenAI)", "AI tạo sinh — chuyên tạo nội dung mới"],
          ["Generative adversarial networks (GANs)", "Mạng đối sinh — 2 mạng cạnh tranh tạo dữ liệu giả rất thật"],
          ["Diffusion model", "Mô hình khuếch tán — thêm rồi khử nhiễu dần để tạo nội dung"],
          ["Transformer", "Kiến trúc self-attention — nền của LLM"],
          ["Self-attention", "Cơ chế tự chú ý — bắt quan hệ giữa các phần trong chuỗi"],
          ["Large language model (LLM)", "Mô hình ngôn ngữ lớn"],
          ["Foundation model", "Mô hình nền — huấn luyện sẵn trên dữ liệu khổng lồ, dùng làm gốc"],
          ["Fine-tuning", "Tinh chỉnh — huấn luyện thêm mô hình nền cho việc cụ thể"],
          ["Multimodal", "Đa phương thức — xử lý cả văn bản, ảnh, âm thanh"],
          ["Synthetic data", "Dữ liệu tổng hợp — do máy tạo ra, không phải thu thập thật"],
          ["Deepfake", "Ảnh/video giả mạo do AI tạo, trông như thật"],
          ["Misinformation", "Thông tin sai lệch, tin giả"],
          ["Carbon footprint", "Dấu chân carbon — lượng khí thải phát sinh"],
          ["EU AI Act", "Đạo luật AI của EU — khung pháp lý theo mức rủi ro"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          Which generative technology creates content by{" "}
          <strong>gradually adding and then removing noise</strong> from data to
          produce high-quality outputs?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong> Generative adversarial networks (GANs).
          </li>
          <li>
            <strong>b)</strong> Diffusion models.
          </li>
          <li>
            <strong>c)</strong> Decision trees.
          </li>
          <li>
            <strong>d)</strong> Reinforcement learning agents.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Công nghệ tạo sinh nào tạo nội dung bằng cách{" "}
              <strong>thêm nhiễu rồi khử nhiễu dần</strong> khỏi dữ liệu để cho ra
              đầu ra chất lượng cao?
            </p>
            <p className="m-0">
              <strong>a)</strong> Mạng đối sinh (GANs).
            </p>
            <p className="m-0">
              <strong>b)</strong> Mô hình khuếch tán (diffusion).
            </p>
            <p className="m-0">
              <strong>c)</strong> Cây quyết định.
            </p>
            <p className="m-0">
              <strong>d)</strong> Agent học tăng cường.
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
              <strong>b</strong> — Diffusion model tạo nội dung bằng cách thêm rồi
              khử nhiễu dần.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong> sai — GANs dùng hai mạng cạnh tranh nhau, không
                phải cơ chế nhiễu.
              </p>
              <p className="m-0">
                <strong>c</strong> sai — decision tree là thuật toán ML phân
                loại/dự đoán, không phải công nghệ tạo sinh.
              </p>
              <p className="m-0">
                <strong>d</strong> sai — reinforcement learning học hành vi qua
                thử–sai, không phải sinh nội dung theo kiểu này.
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
        📎 Nguồn: Chương 1 – Giới thiệu AI, mục 1.1.4 &quot;Generative AI&quot;,
        trang 17 — ISTQB® Certified Tester AI Testing Syllabus v2.0 (©
        International Software Testing Qualifications Board). Nội dung biên
        soạn/dịch ý lại bằng tiếng Việt, không sao chép nguyên văn.
      </p>
    </>
  );
}
