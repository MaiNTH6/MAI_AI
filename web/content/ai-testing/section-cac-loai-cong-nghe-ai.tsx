import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 1.1.3 — Các loại công nghệ AI. */
export function SectionCacLoaiCongNgheAi() {
  return (
    <>
      <div className="badge">🧠 CT-AI · Chương 1 · Mục 1.1.3</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Bản đồ công nghệ AI: ML, Deep Learning, GenAI và các nhánh liên quan
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-1.1.3 · mức K2 – Hiểu): <em>giải thích</em> các loại công nghệ
          AI khác nhau.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}
            AI là một &quot;ô lớn&quot; gồm nhiều công nghệ. Cần nhớ đúng{" "}
            <strong>quan hệ bao hàm</strong> giữa chúng.
          </p>

          {/* Bố cục 2 cột: hình bên trái, chú giải bên phải (màn nhỏ xếp dọc) */}
          <div className="mt-3 flex flex-col items-center justify-center gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
            {/* Sơ đồ vòng tròn đồng tâm — trong vòng chỉ ghi tên tắt */}
            <svg
              viewBox="0 0 300 300"
              role="img"
              aria-label="Vòng tròn đồng tâm: AI chứa ML, chứa DL, chứa GenAI và LLM"
              className="block h-auto w-full shrink-0"
              style={{ maxWidth: "200px" }}
            >
              {/* AI — vòng ngoài cùng */}
              <circle cx="150" cy="150" r="145" fill="rgba(148,163,184,0.12)" stroke="rgba(148,163,184,0.85)" strokeWidth="1.5" />
              {/* ML */}
              <circle cx="150" cy="150" r="110" fill="rgba(56,189,248,0.14)" stroke="rgba(56,189,248,0.85)" strokeWidth="1.5" />
              {/* DL */}
              <circle cx="150" cy="150" r="75" fill="rgba(167,139,250,0.16)" stroke="rgba(167,139,250,0.9)" strokeWidth="1.5" />
              {/* GenAI / LLM — lõi trong cùng */}
              <circle cx="150" cy="150" r="42" fill="rgba(232,121,249,0.22)" stroke="rgba(232,121,249,0.95)" strokeWidth="1.5" />

              {/* Chỉ ghi tên tắt ở đỉnh mỗi vòng */}
              <text x="150" y="27" textAnchor="middle" fontSize="15" fontWeight="800" fill="#e2e8f0">AI</text>
              <text x="150" y="62" textAnchor="middle" fontSize="15" fontWeight="800" fill="#bae6fd">ML</text>
              <text x="150" y="97" textAnchor="middle" fontSize="15" fontWeight="800" fill="#ddd6fe">DL</text>
              <text x="150" y="155" textAnchor="middle" fontSize="14" fontWeight="800" fill="#fdf4ff">GenAI / LLM</text>
            </svg>

            {/* Chú giải tên đầy đủ — cột bên phải */}
            <div className="min-w-0">
              <ul className="space-y-1.5 text-sm text-[color:var(--muted)] list-none pl-0 m-0">
                <li className="flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: "rgba(148,163,184,0.9)" }} />
                  <span><strong className="text-[color:var(--ink)]">AI</strong> — Trí tuệ nhân tạo</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: "rgba(56,189,248,0.9)" }} />
                  <span><strong className="text-[color:var(--ink)]">ML</strong> — Machine Learning (Học máy)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: "rgba(167,139,250,0.95)" }} />
                  <span><strong className="text-[color:var(--ink)]">DL</strong> — Deep Learning (Học sâu)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: "rgba(232,121,249,0.95)" }} />
                  <span><strong className="text-[color:var(--ink)]">GenAI / LLM</strong> — AI tạo sinh / Mô hình ngôn ngữ lớn</span>
                </li>
              </ul>
              <p className="m-0 mt-3 text-xs text-[color:var(--muted)]">
                Ký hiệu: AI ⊃ ML ⊃ DL ⊃ (GenAI / LLM) — dấu ⊃ nghĩa là
                &quot;chứa&quot;.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bảng 3 dạng ML */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Ba dạng Machine Learning (hay ra đề nhất)
      </h2>
      <p className="mt-1 text-[color:var(--muted)]">
        Phân biệt theo <strong>dữ liệu có nhãn hay không</strong> và{" "}
        <strong>cách học</strong>.
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Dạng học", "Dữ liệu", "Học kiểu gì", "Ví dụ / thuật toán"].map(
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
                "Có nhãn",
                "Học từ cặp (đầu vào → đáp án) để dự đoán / phân loại",
                "Linear regression, decision tree",
              ],
              [
                "Unsupervised (không giám sát)",
                "Không nhãn",
                "Tự tìm cụm / mẫu ẩn trong dữ liệu",
                "Clustering (gom cụm)",
              ],
              [
                "Reinforcement (tăng cường)",
                "Không có sẵn đáp án",
                "Agent học qua thử–sai, nhận thưởng/phạt từ môi trường",
                "Điều khiển robot, chơi game",
              ],
            ].map((r) => (
              <tr key={r[0]} className="even:bg-white/[0.04]">
                <td className="border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)]">
                  {r[0]}
                </td>
                {r.slice(1).map((c, i) => (
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
      <p className="mt-2 text-sm text-[color:var(--muted)]">
        Thuật toán ML tiêu biểu khác: <strong>neural network</strong>,{" "}
        <strong>Bayesian</strong>, <strong>SVM</strong>,{" "}
        <strong>random forest</strong>.
      </p>

      {/* Giải thích các tầng công nghệ */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Đi từ ML xuống Deep Learning, GenAI
      </h2>
      <div className="mt-4 space-y-4 text-[color:var(--muted)] leading-relaxed">
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">① Machine Learning (ML).</strong>{" "}
          Nhánh cốt lõi của AI: <strong>học từ dữ liệu</strong>, xây mô hình mà
          không cần lập trình tường minh. Có mô hình <em>tự học liên tục</em> khi
          có dữ liệu mới; có mô hình chỉ giữ những gì đã học,{" "}
          <strong>muốn cập nhật phải huấn luyện lại (retrain)</strong>.
        </p>
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">② Deep Learning (DL).</strong>{" "}
          Một <em>tập con</em> của ML, dùng <strong>mạng nơ-ron sâu</strong> (deep
          neural network) để xử lý bài toán phức tạp. Ba kiến trúc cần nhớ:
        </p>
        <ul className="m-0 ml-5 list-disc space-y-1">
          <li>
            <strong>CNN</strong> (Convolutional Neural Network — mạng nơ-ron tích
            chập) → nhận diện ảnh, phát hiện vật thể.
          </li>
          <li>
            <strong>RNN</strong> (Recurrent Neural Network — mạng nơ-ron hồi tiếp)
            → dữ liệu tuần tự (văn bản, chuỗi thời gian).
          </li>
          <li>
            <strong>Transformer</strong> → bắt phụ thuộc xa trong chuỗi; nền của{" "}
            NLP và vision transformer.
          </li>
        </ul>
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">③ GenAI &amp; LLM.</strong>{" "}
          Xây trên các công nghệ trên để <strong>tạo nội dung mới</strong> (mục
          1.1.4). <strong>LLM</strong> kết hợp mạng nơ-ron sâu (DNN) với xử lý
          ngôn ngữ tự nhiên (NLP) để hiểu và sinh ngôn ngữ giống người.
        </p>
      </div>

      {/* Công nghệ chuyên biệt + agentic */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Các công nghệ AI chuyên biệt khác
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Công nghệ", "Dùng để làm gì"].map((h) => (
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
              ["NLP (xử lý ngôn ngữ tự nhiên)", "Phân tích cảm xúc, dịch máy..."],
              ["Computer vision (thị giác máy)", "Nhận diện khuôn mặt, robotics..."],
              ["Fuzzy logic (logic mờ)", "Suy luận khi thông tin bất định"],
              ["Search algorithms (thuật toán tìm kiếm)", "Tối ưu hóa: định tuyến, ra quyết định chiến lược"],
              ["Rule-based / Expert system (hệ chuyên gia)", "Hỗ trợ quyết định theo luật có cấu trúc"],
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
      <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
        <strong className="text-[color:var(--ink)]">Agentic AI</strong> mở rộng
        các công nghệ trên bằng <strong>agent tự chủ</strong>: tự lập kế hoạch,
        suy luận và hành động độc lập để đạt mục tiêu trong{" "}
        <strong>môi trường động</strong>. Việc tích hợp trọn vẹn nhiều công nghệ
        AI vẫn còn hạn chế, nhưng LLM cho thấy tiềm năng gộp chúng thành hệ thống
        thông minh thống nhất.
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
            &quot;ML là tập con của Deep Learning&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: ngược lại,{" "}
            <strong>DL là tập con của ML</strong> (AI ⊃ ML ⊃ DL).
          </li>
          <li>
            &quot;Supervised học từ dữ liệu không nhãn&quot; (hoặc
            &quot;unsupervised cần dữ liệu có nhãn&quot;) →{" "}
            <strong className="text-amber-200">SAI</strong>: đúng phải là{" "}
            <strong>supervised = có nhãn</strong>,{" "}
            <strong>unsupervised = không nhãn</strong>.
          </li>
          <li>
            Đảo kiến trúc — &quot;CNN chuyên xử lý chuỗi văn bản&quot; hoặc
            &quot;RNN chuyên nhận diện ảnh&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: đúng là{" "}
            <strong>CNN ↔ ảnh</strong>, <strong>RNN ↔ chuỗi</strong>.
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
            <strong className="text-[color:var(--metal)]">Bao hàm:</strong> AI ⊃
            ML ⊃ DL ⊃ (GenAI / LLM)
          </p>
          <p className="m-0">
            <strong className="text-[color:var(--metal)]">3 dạng ML:</strong> có
            giám sát · không giám sát · tăng cường
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong> biết hệ
          dùng công nghệ gì để chọn đúng cách test — mô hình{" "}
          <strong>supervised</strong> cần soi <strong>chất lượng nhãn</strong>{" "}
          (Chương 5); mô hình <strong>DL hộp đen</strong>{" "}
          cần cách tiếp cận thống kê và test oracle riêng (Chương 4). Không có &quot;một chiêu&quot; test
          chung cho mọi loại AI.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Machine learning (ML)", "Học máy — học từ dữ liệu, không lập trình tường minh"],
          ["Supervised learning", "Học có giám sát — dữ liệu có nhãn"],
          ["Unsupervised learning", "Học không giám sát — dữ liệu không nhãn, tự tìm cụm/mẫu"],
          ["Reinforcement learning", "Học tăng cường — agent học qua thử–sai với môi trường"],
          ["Labeled data", "Dữ liệu có nhãn (đã gắn đáp án đúng)"],
          ["Clustering", "Gom cụm — nhóm dữ liệu giống nhau lại"],
          ["Decision tree", "Cây quyết định — mô hình phân nhánh if/else học từ dữ liệu"],
          ["Neural network", "Mạng nơ-ron"],
          ["Support vector machine (SVM)", "Máy vector hỗ trợ — thuật toán phân loại"],
          ["Random forest", "Rừng ngẫu nhiên — tổ hợp nhiều cây quyết định"],
          ["Deep learning (DL)", "Học sâu — tập con của ML, dùng mạng nơ-ron sâu"],
          ["Deep neural network (DNN)", "Mạng nơ-ron sâu — nhiều lớp ẩn"],
          ["Convolutional neural network (CNN)", "Mạng tích chập — mạnh về ảnh"],
          ["Recurrent neural network (RNN)", "Mạng hồi tiếp — mạnh về dữ liệu tuần tự"],
          ["Transformer", "Kiến trúc self-attention — nền của LLM"],
          ["Large language model (LLM)", "Mô hình ngôn ngữ lớn"],
          ["Natural language processing (NLP)", "Xử lý ngôn ngữ tự nhiên"],
          ["Computer vision", "Thị giác máy tính — phân tích dữ liệu hình ảnh"],
          ["Fuzzy logic", "Logic mờ — suy luận khi thông tin bất định"],
          ["Expert system", "Hệ chuyên gia — ra quyết định theo luật có cấu trúc"],
          ["Agentic AI", "AI tác tử — agent tự chủ lập kế hoạch, suy luận, hành động"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          A marketing team has a large set of customer records with{" "}
          <strong>no predefined labels</strong> and wants the system to
          automatically group similar customers into segments. Which type of
          machine learning fits best?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong> Supervised learning, using linear regression.
          </li>
          <li>
            <strong>b)</strong> Unsupervised learning, using clustering.
          </li>
          <li>
            <strong>c)</strong> Reinforcement learning, using trial-and-error with
            an environment.
          </li>
          <li>
            <strong>d)</strong> Deep learning, using a convolutional neural network
            (CNN).
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Một nhóm marketing có tập lớn hồ sơ khách hàng{" "}
              <strong>không có nhãn định sẵn</strong> và muốn hệ thống tự động gom
              các khách hàng giống nhau thành từng nhóm. Dạng học máy nào phù hợp
              nhất?
            </p>
            <p className="m-0">
              <strong>a)</strong> Học có giám sát, dùng linear regression.
            </p>
            <p className="m-0">
              <strong>b)</strong> Học không giám sát, dùng clustering (gom cụm).
            </p>
            <p className="m-0">
              <strong>c)</strong> Học tăng cường, dùng thử–sai với môi trường.
            </p>
            <p className="m-0">
              <strong>d)</strong> Học sâu, dùng mạng tích chập (CNN).
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
              <strong>b</strong> — Dữ liệu không nhãn + tự gom nhóm →
              unsupervised learning, kỹ thuật clustering.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong> sai — supervised cần dữ liệu{" "}
                <em>có nhãn</em> để học.
              </p>
              <p className="m-0">
                <strong>c</strong> sai — reinforcement hợp bài toán học hành vi qua
                tương tác môi trường, không phải gom nhóm dữ liệu tĩnh.
              </p>
              <p className="m-0">
                <strong>d</strong> sai — CNN chuyên về ảnh; đây không phải bài toán
                thị giác.
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
        📎 Nguồn: Chương 1 – Giới thiệu AI, mục 1.1.3 &quot;Different Types of AI
        Technologies&quot;, trang 16–17 — ISTQB® Certified Tester AI Testing
        Syllabus v2.0 (© International Software Testing Qualifications Board). Nội
        dung biên soạn/dịch ý lại bằng tiếng Việt, không sao chép nguyên văn.
      </p>
    </>
  );
}
