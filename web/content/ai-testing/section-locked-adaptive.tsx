import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 4.1.1 — Hệ AI khóa (locked) và thích ứng (adaptive). */
export function SectionLockedAdaptive() {
  return (
    <>
      <div className="badge">🧪 CT-AI · Chương 4 · Mục 4.1.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Hệ AI &quot;khóa&quot; và hệ AI &quot;thích ứng&quot; — vì sao độ khó test khác hẳn nhau
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-4.1.1 · mức K2 – Hiểu): <em>so sánh</em>{" "}khả năng kiểm thử
          (testability) của hệ AI locked và hệ AI adaptive.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}
            hệ <strong>locked</strong>{" "}không đổi hành vi sau triển khai → dễ
            test hơn nhiều so với hệ <strong>adaptive</strong>{" "}— hệ tự thay đổi
            hành vi khi đang chạy.
          </p>
        </div>
      </div>

      {/* Bảng so sánh */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Locked vs Adaptive
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["", "Locked AI-based system", "Adaptive AI-based system"].map(
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
                "Hành vi sau triển khai",
                "Cố định — trọng số (weights/biases) của mô hình chỉ đổi nếu retrain rồi triển khai lại.",
                "Có thể tự thay đổi — ví dụ hệ reinforcement learning cập nhật theo hàm thưởng hoặc theo môi trường mới.",
              ],
              [
                "Ví dụ",
                "Mô hình DNN nhận diện biển báo/làn đường trong xe tự lái (tác vụ an toàn thường dùng hệ locked).",
                "Hệ gợi ý sản phẩm thương mại điện tử, tự điều chỉnh theo hành vi & sở thích đang thay đổi của người dùng.",
              ],
              [
                "Độ khó kiểm thử",
                "Dễ hơn — về cơ bản gần như deterministic nên kết quả mong đợi không đổi.",
                "Khó hơn nhiều — hành vi mới không đoán trước được, thậm chí có thể đổi ngay trong lúc đang test hoặc do chính việc test gây ra.",
              ],
              [
                "Khi cập nhật/thay đổi",
                "Bản cập nhật được xem là một hệ thống MỚI → phải test lại từ đầu.",
                "Test trước triển khai bằng cách mô phỏng thay đổi môi trường, test cơ chế học, test khả năng thích ứng trong kịch bản có kiểm soát.",
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

      <p className="mt-4 text-sm text-[color:var(--muted)] leading-relaxed">
        Nhiều hệ GenAI (như chatbot dựa trên LLM) nằm{" "}
        <strong>ở giữa hai thái cực</strong>: hành vi cố định trong lúc chạy
        (locked tại runtime) nhưng được cập nhật định kỳ. Nói chung, hệ AI trải
        dài trên một <strong>continuum</strong>{" "}— từ deterministic hoàn toàn
        đến tự học/tự đổi hoàn toàn.
      </p>

      <p className="mt-3 text-sm text-[color:var(--muted)] leading-relaxed">
        Với hệ adaptive, vì không đoán trước được mọi hành vi mới nên không
        thể chuẩn bị sẵn test case cho chúng. Cách làm thực tế: xây bộ test tự
        động tập trung vào <strong>chức năng cốt lõi</strong>, chạy lại mỗi khi
        hệ có thay đổi lớn để xác nhận việc thích ứng vẫn an toàn; đồng thời
        theo dõi để phát hiện hiệu năng suy giảm quá một ngưỡng nhất định —
        việc này có thể làm sau một thay đổi lớn hoặc như một phần của giám
        sát liên tục (monitoring).
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
            &quot;Hệ locked luôn 100% deterministic&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: mạng nơ-ron lớn
            vẫn có thể cho kết quả khác nhau do{" "}
            <strong>giới hạn dấu phẩy động</strong>{" "}và cách phần cứng thực thi
            song song (GPU).
          </li>
          <li>
            &quot;Cập nhật một hệ locked thì không cần test lại toàn bộ&quot;
            → <strong className="text-amber-200">SAI</strong>: hệ sau cập nhật
            được coi là <strong>một hệ thống mới</strong>, cần vòng test mới.
          </li>
          <li>
            &quot;Chatbot LLM luôn là hệ adaptive vì nó &apos;học&apos; trong
            lúc trò chuyện&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: phần lớn chatbot
            GenAI <strong>locked khi đang chạy</strong>, chỉ được cập nhật
            theo đợt — nằm giữa hai thái cực.
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
            <strong className="text-[color:var(--metal)]">Locked</strong>{" "}= hành
            vi cố định sau triển khai → dễ test hơn
          </p>
          <p className="m-0">
            <strong className="text-[color:var(--metal)]">Adaptive</strong>{" "}=
            tự thay đổi hành vi khi đang chạy → khó test hơn, cần giám sát
            liên tục
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}
          gặp hệ locked, cứ test như phần mềm gần-deterministic bình thường; gặp
          hệ adaptive, không cố viết hết test case cho &quot;mọi hành vi tương
          lai&quot; — thay vào đó dựng bộ test tự động cho chức năng cốt lõi và
          theo dõi ngưỡng suy giảm hiệu năng sau mỗi lần hệ thích ứng.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Locked AI-based system", "Hệ AI khóa — hành vi cố định sau triển khai"],
          ["Adaptive AI-based system", "Hệ AI thích ứng — tự thay đổi hành vi sau triển khai"],
          ["Deterministic", "Xác định — cùng đầu vào luôn ra cùng đầu ra"],
          ["Non-deterministic", "Không xác định — cùng đầu vào có thể ra đầu ra khác nhau"],
          ["Reward function", "Hàm thưởng — quy tắc chấm điểm hành động trong reinforcement learning"],
          ["Reinforcement learning", "Học tăng cường — agent tự thích ứng qua thưởng/phạt"],
          ["Retrain", "Huấn luyện lại mô hình"],
          ["Continuum", "Dải liên tục (từ locked hoàn toàn đến adaptive hoàn toàn)"],
          ["Monitoring", "Giám sát liên tục hệ thống sau triển khai"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          A deployed DNN model for traffic-sign recognition in a self-driving
          car keeps fixed weights until it is retrained and redeployed. How
          should this system be classified, and why is it easier to test than
          a reinforcement-learning recommender?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}Adaptive — because DNNs always learn during
            inference.
          </li>
          <li>
            <strong>b)</strong>{" "}Locked — its behavior is fixed post-deployment,
            so expected results stay stable, unlike a system that keeps
            changing based on a reward function.
          </li>
          <li>
            <strong>c)</strong>{" "}Locked — because it never produces
            non-deterministic output under any condition.
          </li>
          <li>
            <strong>d)</strong>{" "}Adaptive — because GPUs process it in
            parallel.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Một mô hình DNN nhận diện biển báo giao thông trong xe tự lái
              giữ nguyên trọng số cho đến khi được huấn luyện lại và triển
              khai lại. Hệ này nên được xếp loại thế nào, và vì sao nó dễ test
              hơn một hệ gợi ý dùng reinforcement learning?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}Adaptive — vì DNN luôn học trong lúc suy
              luận.
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}Locked — hành vi cố định sau triển khai nên
              kết quả mong đợi ổn định, khác với hệ liên tục thay đổi theo hàm
              thưởng.
            </p>
            <p className="m-0">
              <strong>c)</strong>{" "}Locked — vì nó không bao giờ cho kết quả
              non-deterministic trong bất kỳ điều kiện nào.
            </p>
            <p className="m-0">
              <strong>d)</strong>{" "}Adaptive — vì GPU xử lý song song.
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
              <strong>b</strong>{" "}— locked vì trọng số cố định sau triển khai,
              nên dễ test hơn hệ adaptive vốn tự đổi theo hàm thưởng.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong>{" "}sai — DNN đã triển khai không tự học trong
                lúc suy luận trừ khi được retrain.
              </p>
              <p className="m-0">
                <strong>c</strong>{" "}sai — mạng lớn vẫn có thể non-deterministic
                do dấu phẩy động/song song hóa, dù về cơ bản coi là locked.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — chạy trên GPU không quyết định hệ là
                adaptive hay không; yếu tố quyết định là hệ có tự thay đổi
                hành vi sau triển khai hay không.
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
        📎 Nguồn: Chương 4 – Kiểm thử hệ thống dựa trên AI, mục 4.1.1
        &quot;Locked and Adaptive AI-Based Systems&quot;, trang 39–40 — ISTQB®
        Certified Tester AI Testing Syllabus v2.0 (© International Software
        Testing Qualifications Board). Nội dung biên soạn/dịch ý lại bằng
        tiếng Việt, không sao chép nguyên văn.
      </p>
    </>
  );
}
