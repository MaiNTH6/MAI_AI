import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 3.1.4 — Pretrained Models, Fine-Tuning, RAG. */
export function SectionPretrainedFinetuningRag() {
  return (
    <>
      <div className="badge">🤖 CT-AI · Chương 3 · Mục 3.1.4</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Không train từ đầu: Fine-tuning và RAG
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-3.1.4 · mức K2 – Hiểu): <em>giải thích</em> mô hình pretrained,
          fine-tuning và retrieval-augmented generation (RAG).
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong> train
            mô hình từ đầu rất tốn kém → tận dụng <strong>mô hình huấn luyện
            sẵn (pretrained)</strong> rồi <strong>fine-tune</strong> hoặc{" "}
            <strong>RAG</strong> để hợp việc mới.
          </p>
        </div>
      </div>

      {/* Bảng Fine-tuning vs RAG */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Fine-tuning vs RAG
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["", "Fine-tuning", "RAG"].map((h) => (
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
                "Cách làm",
                "Train thêm mô hình pretrained bằng dữ liệu của việc mới.",
                "Cấp nguồn dữ liệu riêng cho LLM, chuyển thành dạng tra cứu được; tìm tài liệu liên quan → ghép vào prompt → đưa cho LLM.",
              ],
              [
                "Đổi mô hình?",
                "Có — cập nhật trọng số (toàn bộ mạng, vài lớp gần đầu ra, hoặc lớp thêm).",
                "Không — mô hình pretrained giữ nguyên.",
              ],
              [
                "Điểm mạnh",
                "Cần ít dữ liệu/công sức hơn train từ đầu; hiệu quả khi việc mới gần việc cũ.",
                "Bổ sung thông tin cập nhật → câu trả lời chính xác hơn, không phải train lại.",
              ],
            ].map((r) => (
              <tr key={r[0]} className="even:bg-white/[0.04]">
                <td className="border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)] whitespace-nowrap">
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
      <p className="mt-3 text-sm text-[color:var(--muted)]">
        Một mô hình pretrained có thể dùng <strong>RAG</strong>,{" "}
        <strong>fine-tuning</strong>, hoặc <strong>cả hai</strong>.
      </p>

      {/* Fine-tuning phụ thuộc độ giống */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Fine-tuning ăn thua ở &quot;độ giống nhau&quot;
      </h2>
      <div className="mt-4 space-y-3 text-[color:var(--muted)] leading-relaxed">
        <p className="m-0">
          Mức thành công của fine-tuning phụ thuộc{" "}
          <strong>độ giống giữa việc cũ và việc mới</strong>:
        </p>
        <ul className="m-0 ml-5 list-disc space-y-1">
          <li>
            Khác biệt <strong>nhỏ</strong> → rất hiệu quả. Vd: chỉnh bộ phân loại{" "}
            <em>giống mèo</em> sang nhận <em>giống chó</em> → chạy tốt.
          </li>
          <li>
            Khác biệt <strong>lớn</strong> → kém hiệu quả. Vd: chỉnh từ nhận ảnh
            sang nhận <em>giọng nói vùng miền</em> → khó.
          </li>
          <li>
            Fine-tune một <strong>LLM</strong> cho phân tích giá trị biên (BVA)
            theo ISTQB → thay đổi nhỏ, dễ đạt nếu dữ liệu tốt.
          </li>
        </ul>
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
            &quot;RAG thay đổi trọng số của mô hình pretrained&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: RAG{" "}
            <strong>không đổi mô hình</strong> — chỉ bổ sung dữ liệu vào prompt.
          </li>
          <li>
            &quot;Fine-tuning cần nhiều dữ liệu hơn train từ đầu&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: ngược lại, cần{" "}
            <strong>ít</strong> hơn nhiều.
          </li>
          <li>
            &quot;Mô hình pretrained sạch nên khỏi test lại&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: thiên lệch/lỗ hổng
            của mô hình gốc <strong>di truyền sang</strong> → phải test lại.
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
            <strong className="text-[color:var(--metal)]">Fine-tuning</strong> =
            train thêm, <em>đổi mô hình</em>, hiệu quả khi việc mới gần việc cũ
          </p>
          <p className="m-0">
            <strong className="text-[color:var(--metal)]">RAG</strong> = cấp thêm
            tài liệu vào prompt, <em>không đổi mô hình</em>
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong> điểm
          then chốt — <strong>thiên lệch &amp; lỗ hổng của mô hình gốc di truyền
          sang mô hình mới</strong>. Dù chỉ fine-tune/RAG, vẫn phải test để xác
          nhận hoạt động <strong>tin cậy và công bằng</strong> trên việc mới.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Pretrained model", "Mô hình huấn luyện sẵn"],
          ["Fine-tuning", "Tinh chỉnh — train thêm mô hình sẵn cho việc mới"],
          ["Retrieval-Augmented Generation (RAG)", "Sinh có tăng cường truy hồi — cấp tài liệu vào prompt"],
          ["LLM", "Mô hình ngôn ngữ lớn"],
          ["Prompt", "Câu lệnh/đầu vào đưa cho LLM"],
          ["Enhanced prompt", "Prompt được bổ sung tài liệu liên quan"],
          ["Weights", "Trọng số — tham số mô hình học được"],
          ["Layer", "Lớp trong mạng nơ-ron"],
          ["Bias (mô hình)", "Thiên lệch — xu hướng sai lệch bất công của mô hình"],
          ["Vulnerability", "Lỗ hổng — điểm yếu có thể bị khai thác"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          Which statement about <strong>RAG</strong> is correct?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong> RAG retrains the whole model from scratch.
          </li>
          <li>
            <strong>b)</strong> RAG provides task-specific data to the LLM via an
            enhanced prompt, without changing the pretrained model.
          </li>
          <li>
            <strong>c)</strong> RAG permanently changes the model’s weights.
          </li>
          <li>
            <strong>d)</strong> RAG can only be used instead of, never together
            with, fine-tuning.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Phát biểu nào về <strong>RAG</strong> là đúng?
            </p>
            <p className="m-0">
              <strong>a)</strong> RAG train lại toàn bộ mô hình từ đầu.
            </p>
            <p className="m-0">
              <strong>b)</strong> RAG cấp dữ liệu riêng cho LLM qua prompt bổ
              sung, không đổi mô hình pretrained.
            </p>
            <p className="m-0">
              <strong>c)</strong> RAG thay đổi vĩnh viễn trọng số của mô hình.
            </p>
            <p className="m-0">
              <strong>d)</strong> RAG chỉ dùng thay cho fine-tuning, không bao giờ
              dùng chung.
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
              <strong>b</strong> — RAG bổ sung dữ liệu vào prompt, không đổi mô
              hình.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong> và <strong>c</strong> sai — RAG{" "}
                <em>không</em> train lại hay đổi trọng số.
              </p>
              <p className="m-0">
                <strong>d</strong> sai — có thể dùng RAG, fine-tuning, hoặc cả
                hai.
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
        📎 Nguồn: Chương 3 – Machine Learning, mục 3.1.4 &quot;Pretrained Models,
        Fine-Tuning, and Retrieval-Augmented Generation&quot;, trang 30 — ISTQB®
        Certified Tester AI Testing Syllabus v2.0 (© International Software Testing
        Qualifications Board). Nội dung biên soạn/dịch ý lại bằng tiếng Việt,
        không sao chép nguyên văn.
      </p>
    </>
  );
}
