import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 3.4.1 — Cấu trúc & hoạt động mạng nơ-ron sâu. */
export function SectionMangNoRonSau() {
  return (
    <>
      <div className="badge">🤖 CT-AI · Chương 3 · Mục 3.4.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Mạng nơ-ron sâu hoạt động thế nào?
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-3.4.1 · mức K2 – Hiểu): <em>giải thích</em>{" "}cấu trúc và cách hoạt
          động của một mạng nơ-ron sâu.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}mạng
            nơ-ron sâu = nhiều lớp nơ-ron nhân tạo; học bằng cách{" "}
            <strong>điều chỉnh trọng số (weights) &amp; bias</strong>{" "}để giảm sai
            số qua từng <strong>epoch</strong>.
          </p>
        </div>
      </div>

      {/* Bảng 3 loại lớp */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Ba loại lớp
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Lớp", "Vai trò"].map((h) => (
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
              ["Input layer (lớp vào)", "Nhận đầu vào, vd giá trị điểm ảnh từ camera."],
              ["Hidden layers (lớp ẩn)", "Gồm các nơ-ron (nodes) tính toán, biến đầu vào thành biểu diễn ngày càng trừu tượng. Mạng fully connected: mỗi nơ-ron nối với mọi nơ-ron lớp kế."],
              ["Output layer (lớp ra)", "Đưa kết quả ra ngoài, vd xác suất ảnh là con mèo."],
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
      <p className="mt-3 text-sm text-[color:var(--muted)]">
        <strong>Single-layer perceptron</strong>{" "}(1 lớp) là ví dụ sớm nhất — phân
        loại nhị phân cho bài toán <em>tách được bằng đường thẳng</em>{" "}(vd spam vs
        không spam). Đa số mạng hiện nay là <strong>mạng sâu</strong>{" "}(nhiều lớp),
        có thể coi là multi-layer perceptron.
      </p>

      {/* Cách một nơ-ron tính */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Một nơ-ron tính gì? Mạng học ra sao?
      </h2>
      <div className="mt-4 space-y-4 text-[color:var(--muted)] leading-relaxed">
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">Giá trị kích hoạt
          (activation value)</strong>{" "}của mỗi nơ-ron ={" "}
          <strong>tổng có trọng số</strong>{" "}các giá trị kích hoạt từ nơ-ron lớp
          trước (mỗi kết nối có <strong>weight</strong>{" "}riêng){" "}
          <strong>+ bias</strong>{" "}của nơ-ron, rồi đưa qua một{" "}
          <strong>hàm kích hoạt (activation function) phi tuyến</strong>. (Bias ở
          đây khác với &quot;bias&quot; thiên lệch dữ liệu ở mục 5.1.2.)
        </p>
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">Cách học:</strong>{" "}
          weights &amp; bias khởi tạo bằng số ngẫu nhiên nhỏ. Đưa dữ liệu qua mạng → ra
          đầu ra → so với đáp án đúng → tính <strong>sai số (loss)</strong>{" "}→ dội
          ngược để <strong>điều chỉnh weights &amp; bias</strong>{" "}cho sai số nhỏ
          dần. Mỗi lần chạy hết tập huấn luyện là một{" "}
          <strong>epoch</strong>; qua nhiều epoch mạng học dần đến khi đầu ra đủ
          tốt thì dừng.
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
            &quot;Mạng học bằng cách thay đổi kiến trúc lớp&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: mạng học bằng cách{" "}
            <strong>điều chỉnh weights &amp; bias</strong>, kiến trúc do
            hyperparameter định.
          </li>
          <li>
            &quot;Hàm kích hoạt là tuyến tính&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: nó{" "}
            <strong>phi tuyến</strong>{" "}— nhờ đó mạng học được quan hệ phức tạp.
          </li>
          <li>
            &quot;1 epoch = 1 mẫu dữ liệu&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: 1 epoch ={" "}
            <strong>một lượt qua toàn bộ</strong>{" "}tập huấn luyện.
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
            <strong className="text-[color:var(--metal)]">3 lớp:</strong>{" "}input ·
            hidden (nơ-ron) · output
          </p>
          <p className="m-0">
            <strong className="text-[color:var(--metal)]">Nơ-ron:</strong>{" "}tổng có
            trọng số + bias → hàm kích hoạt phi tuyến
          </p>
          <p className="m-0">
            <strong className="text-[color:var(--metal)]">Học:</strong>{" "}loss dội
            ngược → chỉnh weights/bias qua từng epoch
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}mạng
          nơ-ron <strong>không có đường code tường minh</strong>{" "}— hành vi nằm ở
          weights/bias/activation đã học. Đây là gốc rễ khiến phải có{" "}
          <strong>coverage riêng cho mạng nơ-ron</strong>{" "}(mục 3.4.3) thay vì phủ
          nhánh code như phần mềm thường.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Neural network", "Mạng nơ-ron — mô phỏng mạng nơ-ron não"],
          ["Deep neural network", "Mạng nơ-ron sâu — nhiều lớp"],
          ["Perceptron", "Perceptron — nơ-ron/đơn vị mạng đơn giản nhất"],
          ["Single-layer perceptron", "Perceptron một lớp — phân loại nhị phân tuyến tính"],
          ["Input layer", "Lớp vào"],
          ["Hidden layer", "Lớp ẩn"],
          ["Output layer", "Lớp ra"],
          ["Neuron", "Nơ-ron (node) — đơn vị tính toán"],
          ["Weight", "Trọng số — độ quan trọng của một kết nối"],
          ["Bias (nơ-ron)", "Độ lệch cộng thêm cho nơ-ron (khác bias thiên lệch dữ liệu)"],
          ["Activation value", "Giá trị kích hoạt — đầu ra của một nơ-ron"],
          ["Activation function", "Hàm kích hoạt — phi tuyến"],
          ["Loss", "Sai số/hàm mất mát — chênh giữa đầu ra và đáp án"],
          ["Epoch", "Một lượt chạy hết toàn bộ tập huấn luyện"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          During training, how does a deep neural network primarily{" "}
          <strong>learn</strong>?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}By adjusting its weights and bias values to
            minimise the loss.
          </li>
          <li>
            <strong>b)</strong>{" "}By adding new hidden layers automatically each
            epoch.
          </li>
          <li>
            <strong>c)</strong>{" "}By rewriting explicit if-then rules.
          </li>
          <li>
            <strong>d)</strong>{" "}By changing the activation function to a linear
            one.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Khi huấn luyện, mạng nơ-ron sâu <strong>học</strong>{" "}chủ yếu bằng
              cách nào?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}Điều chỉnh weights &amp; bias để giảm loss.
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}Tự thêm lớp ẩn mới mỗi epoch.
            </p>
            <p className="m-0">
              <strong>c)</strong>{" "}Viết lại các luật if-then tường minh.
            </p>
            <p className="m-0">
              <strong>d)</strong>{" "}Đổi hàm kích hoạt sang tuyến tính.
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
              <strong>a</strong>{" "}— Mạng điều chỉnh weights &amp; bias để giảm sai
              số (loss).
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>b</strong>{" "}sai — số lớp do hyperparameter định, không tự
                thêm mỗi epoch.
              </p>
              <p className="m-0">
                <strong>c</strong>{" "}sai — mạng nơ-ron không dùng luật if-then tường
                minh.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — hàm kích hoạt cần phi tuyến.
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
        📎 Nguồn: Chương 3 – Machine Learning, mục 3.4.1 &quot;Structure and
        Working of a Deep Neural Network&quot;, trang 36 — ISTQB® Certified Tester
        AI Testing Syllabus v2.0 (© International Software Testing Qualifications
        Board). Nội dung biên soạn/dịch ý lại bằng tiếng Việt, không sao chép
        nguyên văn.
      </p>
    </>
  );
}
