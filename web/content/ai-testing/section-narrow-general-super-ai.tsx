import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 1.1.2 — Narrow AI, General AI, Super AI. */
export function SectionNarrowGeneralSuperAi() {
  return (
    <>
      <div className="badge">🧠 CT-AI · Chương 1 · Mục 1.1.2</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        3 cấp độ AI: Narrow, General, Super
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-1.1.2 · mức K2 – Hiểu): <em>phân biệt</em>{" "}ba cấp độ trí tuệ của
          hệ thống AI.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}AI
            được phân cấp theo <strong>phạm vi năng lực</strong>{" "}so với con
            người.
          </p>
          <p className="m-0 mt-1.5">
            •{" "}
            <strong className="text-[color:var(--ink)]">Hôm nay</strong>{" "}→ toàn
            bộ AI đang dùng là <strong>Narrow AI</strong>
          </p>
          <p className="m-0 mt-1">
            •{" "}
            <strong className="text-[color:var(--ink)]">General &amp; Super AI</strong>{" "}
            → mới là <strong>lý thuyết / tương lai</strong>
          </p>
        </div>
      </div>

      {/* Bảng 3 cấp độ */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Ba cấp độ AI
      </h2>
      <p className="mt-1 text-[color:var(--muted)]">Thuộc bảng này là đủ ý để thi.</p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Cấp độ", "Năng lực", "Trạng thái hiện nay"].map((h) => (
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
                "Narrow AI (AI hẹp / weak AI)",
                "Làm tốt MỘT loại việc cụ thể (nhận diện ảnh, giọng nói, dịch...). Không tự khái quát sang việc khác nếu không huấn luyện lại.",
                "Là TOÀN BỘ AI đang dùng thực tế hôm nay.",
              ],
              [
                "General AI (AI tổng quát / strong AI)",
                "Làm được hầu hết việc trí tuệ như con người, không cần huấn luyện lại cho từng việc.",
                "Chưa tồn tại.",
              ],
              [
                "Super AI (siêu trí tuệ)",
                "Tự cải thiện không cần con người, vượt trí tuệ con người ở mọi mặt.",
                "Giả thuyết — nhiều người xem là rủi ro sống còn.",
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

      {/* Giải thích từng cấp độ */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Giải thích nhanh
      </h2>
      <div className="mt-4 space-y-4 text-[color:var(--muted)] leading-relaxed">
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">① Narrow AI.</strong>{" "}Mọi
          hệ AI bạn từng gặp — trợ lý giọng nói, gợi ý phim, lọc thư rác, chatbot,
          xe tự lái — đều là narrow AI: giỏi <strong>một miền việc</strong>, ra
          khỏi miền đó thì &quot;mù&quot;. Nhánh narrow AI{" "}
          <strong>tiên tiến nhất</strong>{" "}hiện nay gọi là{" "}
          <strong>frontier AI</strong>{" "}(các mô hình GenAI rất lớn, mức tự chủ
          cao) — nhưng dù mạnh đến đâu, chúng vẫn gắn với{" "}
          <strong>những tác vụ cụ thể</strong>, chưa phải trí tuệ tổng quát.
        </p>
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">② General AI.</strong>{" "}Một
          hệ có thể học và làm <em>bất kỳ</em>{" "}việc trí tuệ nào con người làm
          được, linh hoạt chuyển giữa các việc mà không cần lập trình/huấn luyện
          lại. Đây là mục tiêu dài hạn của ngành,{" "}
          <strong>hiện chưa có hệ nào đạt tới</strong>.
        </p>
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">③ Super AI.</strong>{" "}Vượt
          xa trí tuệ con người và <strong>tự cải thiện</strong>{" "}mà không cần con
          người can thiệp. Về mặt kỹ thuật, Super AI{" "}
          <strong>không bắt buộc phải kết nối Internet</strong>{" "}mới tồn tại được
          — nhưng nếu có, khả năng &amp; tầm ảnh hưởng của nó có thể{" "}
          <strong>mở rộng đáng kể</strong>. Mốc (giả định) khi AI chuyển từ mức
          general sang super gọi là{" "}
          <strong>điểm kỳ dị công nghệ (technological singularity)</strong>{" "}—
          thời điểm ta không còn dự đoán được diễn tiến của AI.
        </p>
      </div>

      {/* Chỗ dễ ra đề */}
      <div className="mt-8 rounded-2xl border-2 border-dashed border-amber-500/40 bg-amber-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-amber-200">📝 Bẫy hay gặp</h3>
        <ul className="mt-2 mb-0 space-y-1.5 text-[color:var(--muted)]">
          <li>
            Đề gài: gọi một chatbot/LLM mạnh là <strong>General AI</strong>{" "}→{" "}
            <strong className="text-amber-200">SAI</strong>. Dù ấn tượng đến đâu,
            nó vẫn là <strong>narrow AI</strong>{" "}(frontier AI).
          </li>
          <li>
            Nhớ ánh xạ tên khác:{" "}
            <strong>narrow = weak AI</strong>,{" "}
            <strong>general = strong AI</strong>.
          </li>
          <li>
            <strong>Technological singularity</strong>{" "}gắn với bước chuyển sang{" "}
            <strong>super AI</strong>, không phải narrow hay general.
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
            <strong className="text-[color:var(--metal)]">Narrow AI</strong>{" "}= một
            việc cụ thể · <em>đang có, dùng khắp nơi</em>
          </p>
          <p className="m-0">
            <strong className="text-[color:var(--metal)]">General AI</strong>{" "}=
            như con người · <em>chưa tồn tại</em>
          </p>
          <p className="m-0">
            <strong className="text-[color:var(--metal)]">Super AI</strong>{" "}= vượt
            con người, tự cải thiện · <em>giả thuyết</em>
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}hệ bạn
          kiểm thử luôn là <strong>narrow AI</strong>{" "}— giỏi trong phạm vi hẹp,
          nên phải xác định rõ <strong>ranh giới miền hoạt động</strong>. Ngoài
          ranh giới đó, đầu ra dễ sai/vô lý; kiểm thử phải nhắm thẳng vào các{" "}
          <strong>ca ngoài phạm vi huấn luyện</strong>{" "}(out-of-distribution).
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Narrow AI", "AI hẹp — chỉ làm tốt một loại việc cụ thể"],
          ["Weak AI", "Tên gọi khác của narrow AI"],
          ["General AI", "AI tổng quát — làm được hầu hết việc trí tuệ như con người"],
          ["Strong AI", "Tên gọi khác của general AI"],
          ["Super AI", "Siêu trí tuệ — vượt con người và tự cải thiện"],
          ["Frontier AI", "Nhánh narrow AI tiên tiến nhất (GenAI lớn, tự chủ cao)"],
          [
            "Technological singularity",
            "Điểm kỳ dị công nghệ — mốc (giả định) AI chuyển từ general sang super",
          ],
          ["Autonomy", "Mức tự chủ — hệ tự hành động ít cần con người"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          A vendor markets a very capable large language model as being able to
          write code, translate languages and answer questions. Which category
          does this system belong to according to the CT-AI syllabus?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}General AI, because it can perform many different
            tasks like a human.
          </li>
          <li>
            <strong>b)</strong>{" "}Super AI, because it improves itself without human
            help.
          </li>
          <li>
            <strong>c)</strong>{" "}Narrow AI (frontier AI), because it is still tied
            to specific trained tasks.
          </li>
          <li>
            <strong>d)</strong>{" "}It marks the technological singularity.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Một nhà cung cấp quảng bá mô hình ngôn ngữ lớn (LLM) rất mạnh, có
              thể viết code, dịch ngôn ngữ và trả lời câu hỏi. Theo syllabus
              CT-AI, hệ thống này thuộc loại nào?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}General AI, vì nó làm được nhiều việc khác nhau
              như con người.
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}Super AI, vì nó tự cải thiện không cần con
              người.
            </p>
            <p className="m-0">
              <strong>c)</strong>{" "}Narrow AI (frontier AI), vì vẫn gắn với những
              tác vụ cụ thể đã được huấn luyện.
            </p>
            <p className="m-0">
              <strong>d)</strong>{" "}Nó đánh dấu điểm kỳ dị công nghệ.
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
              <strong>c</strong>{" "}— Dù làm được nhiều việc, LLM vẫn được huấn luyện
              cho các tác vụ cụ thể → là narrow AI ở mức tiên tiến (frontier AI).
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong>{" "}sai — general AI phải làm được{" "}
                <em>bất kỳ</em>{" "}việc trí tuệ nào mà không cần huấn luyện lại;{" "}
                hiện chưa tồn tại.
              </p>
              <p className="m-0">
                <strong>b</strong>{" "}sai — super AI tự cải thiện vượt con người, chỉ
                là giả thuyết.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — singularity là mốc chuyển sang super AI,
                không phải một loại hệ thống.
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
        📎 Nguồn: Chương 1 – Giới thiệu AI, mục 1.1.2 &quot;Narrow, General and
        Super AI&quot;, trang 15 — ISTQB® Certified Tester AI Testing Syllabus
        v2.0 (© International Software Testing Qualifications Board). Nội dung
        biên soạn/dịch ý lại bằng tiếng Việt, không sao chép nguyên văn.
      </p>
    </>
  );
}
