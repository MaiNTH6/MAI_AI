import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 4.2.2 — Red Teaming. */
export function SectionRedTeaming() {
  return (
    <>
      <div className="badge">🧪 CT-AI · Chương 4 · Mục 4.2.2</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Red Teaming: chủ động &quot;tấn công&quot; hệ AI trước khi kẻ xấu làm điều đó
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-4.2.2 · mức K3 – Áp dụng): <em>triển khai</em>{" "}Red Teaming cho
          hệ GenAI.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}
            Red Teaming (RT) là hình thức &quot;fault attack&quot; có hệ thống
            — cố tình khiến hệ AI sinh ra kết quả{" "}
            <strong>có hại hoặc không mong muốn</strong>, để tìm ra và vá lỗ
            hổng trước khi triển khai thật.
          </p>
        </div>
      </div>

      {/* Bảng nội dung cốt lõi */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Red Teaming là gì, nhắm vào đâu
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Khía cạnh", "Nội dung"].map((h) => (
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
                "Định nghĩa",
                "Một dạng \"fault attack\" có hệ thống, thường theo kiểu black-box, dò xét hệ AI để tìm khả năng gây hại — đặc biệt qua output. Ý tưởng lấy cảm hứng từ wargaming quân sự và \"tiger team\" của NASA.",
              ],
              [
                "Phạm vi gây hại cần tìm",
                "Không chỉ bảo mật/an toàn — còn cả độ tin cậy (reliability), quyền riêng tư, tính công bằng, thiên lệch (bias) và khả năng sinh thông tin sai lệch. Có thể áp dụng cho toàn hệ thống đầu-cuối hoặc chỉ riêng model.",
              ],
              [
                "Vì sao quan trọng với GenAI",
                "GenAI có \"không gian tấn công\" (attack space) cực lớn do đầu vào/đầu ra quá đa dạng. RT ngày càng là yêu cầu bắt buộc trong một số khung pháp lý, ví dụ EU AI Act.",
              ],
              [
                "Tính chất",
                "Là một đánh giá động, thích ứng — prompt có thể được điều chỉnh ngay theo output nhận được, giúp bổ sung cho các cách tiếp cận tĩnh như benchmark, bằng cách thử hệ ở điều kiện cực đoan/bất ngờ.",
              ],
              [
                "RT bảo mật vs RT an toàn",
                "RT cho bảo mật: tìm lỗ hổng trước tấn công từ ngoài, gồm cả yếu tố AI-specific (indirect prompt injection, giấu nội dung độc hại trong tài liệu dùng cho RAG). RT cho an toàn & các mục tiêu khác: xem hệ có thể tạo output có hại ngay trong tình huống sử dụng bình thường hay không (vd lời khuyên y tế không an toàn), không cần ý đồ tấn công từ người dùng.",
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

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Quy trình 5 bước
      </h2>
      <p className="mt-2 text-sm text-[color:var(--muted)] leading-relaxed">
        RT hiệu quả nhất khi thực hiện <strong>trước khi triển khai</strong>,
        sau khi đã hoàn tất đánh giá chất lượng nội bộ ban đầu. Hoạt động cốt
        lõi thường là <strong>interactive prompting</strong>{" "}— đối thoại nhiều
        lượt (ví dụ 15–20 lượt) để khơi ra hành vi lỗi hoặc vi phạm chính
        sách.
      </p>
      <div className="mt-4 space-y-4 text-[color:var(--muted)]">
        {[
          [
            "Tập hợp một đội đa dạng",
            "Gồm nhiều vai trò khác nhau — an ninh, đạo đức, pháp lý, chuyên gia miền, thậm chí người ngoài ngành — để bao quát nhiều góc nhìn và hướng tấn công. Đội càng đa dạng, càng ít lỗ hổng bị bỏ sót vì mỗi người thử theo cách khác nhau.",
          ],
          [
            "Cấp quyền truy cập trong môi trường test an toàn",
            "Đội RT được cấp quyền thử nghiệm trên hệ thống (hoặc bản gần giống thật) trong môi trường cách ly, không ảnh hưởng người dùng thật — để có thể chủ động \"tấn công\" mạnh tay mà không gây rủi ro thật.",
          ],
          [
            "Prompt hệ để tìm lỗ hổng",
            "Có thể khám phá tự do (thử ngẫu nhiên, sáng tạo, mô phỏng cách kẻ xấu thật sự thử) hoặc theo checklist đã chuẩn bị sẵn (đảm bảo phủ đủ các loại rủi ro đã biết trước). Trong thực tế thường kết hợp cả hai để vừa có độ phủ vừa có tính sáng tạo.",
          ],
          [
            "Phân tích các lỗi phát hiện được",
            "Không chỉ ghi nhận \"hệ trả lời sai\" — cần hiểu rõ nguyên nhân (lỗi do prompt nào, điều kiện nào) và mức độ nguy hiểm của từng lỗi để đội phát triển ưu tiên xử lý đúng chỗ.",
          ],
          [
            "Tạo tập dữ liệu từ những nguy cơ này",
            "Gom các ca lỗi đã phân tích thành một bộ dữ liệu có cấu trúc, dùng để hỗ trợ khắc phục (đội phát triển sửa lỗi), làm bộ test hồi quy cho các đợt RT sau, và cải thiện hệ thống lâu dài.",
          ],
        ].map(([title, detail], i) => (
          <div key={title}>
            <p className="m-0">
              <strong className="text-[color:var(--metal)]">
                Bước {i + 1}: {title}
              </strong>
            </p>
            <p className="m-0 mt-1">{detail}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-[color:var(--muted)] leading-relaxed">
        Để mở rộng độ bao phủ ngoài một đội chuyên gia nhỏ, tổ chức có thể kết
        hợp: cách thủ công (crowd-sourced prompt generation — huy động đông
        người tạo prompt), cách tự động (dùng một LLM sinh hàng loạt prompt tấn
        công, rồi một LLM khác kiểm tra output), hoặc{" "}
        <strong>hybrid</strong>{" "}— kết hợp sự sáng tạo của con người với khả
        năng mở rộng của tự động hóa.
      </p>

      <div className="mt-6 rounded-xl border border-sky-400/30 bg-sky-500/10 p-4 text-sm text-[color:var(--muted)] leading-relaxed">
        <p className="m-0">
          🔗 <strong className="text-[color:var(--ink)]">Red Teaming vs
          Blue Teaming:</strong>{" "}RT chủ động, tập trung trước triển khai. Blue
          Teaming là giám sát &amp; lọc phòng thủ <strong>liên tục, thời gian
          thực</strong>{" "}cho hệ đang vận hành. Hai bên bổ sung nhau — kết quả RT
          giúp cải thiện bộ lọc &amp; giám sát của Blue Teaming.
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
            &quot;Red Teaming chỉ nhắm vào lỗ hổng bảo mật&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: còn nhắm vào{" "}
            <strong>reliability, privacy, fairness, bias, thông tin sai
            lệch</strong>.
          </li>
          <li>
            &quot;Red Teaming là hoạt động tĩnh, chạy một lần theo bộ prompt
            cố định&quot; → <strong className="text-amber-200">SAI</strong>:
            RT là <strong>đánh giá động, thích ứng</strong>{" "}— prompt được cập
            nhật ngay theo output.
          </li>
          <li>
            &quot;Red Teaming thay thế hoàn toàn cho Blue Teaming&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: RT (trước triển
            khai) <strong>bổ sung</strong>{" "}cho Blue Teaming (giám sát liên tục
            lúc vận hành), không thay thế.
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
            <strong className="text-[color:var(--metal)]">RT</strong>{" "}= chủ
            động tấn công để tìm khả năng gây hại — bảo mật, an toàn, fairness,
            bias, misinformation
          </p>
          <p className="m-0">
            5 bước: <strong className="text-[color:var(--metal)]">
              đội đa dạng → môi trường an toàn → prompt tìm lỗ hổng → phân
              tích → tạo dataset khắc phục
            </strong>
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}khi
          test một chatbot/GenAI trước khi ra mắt, chủ động thử{" "}
          <strong>đối thoại nhiều lượt</strong>{" "}để &quot;dụ&quot; hệ ra hành vi
          sai chính sách, thay vì chỉ hỏi một câu rồi kết luận. Ghi lại mọi lỗi
          tìm được thành dataset để đội phát triển vá.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Red Teaming (RT)", "Chủ động tấn công có hệ thống để tìm khả năng gây hại của hệ AI"],
          ["Blue Teaming", "Giám sát & phòng thủ liên tục cho hệ AI đang vận hành"],
          ["Attack space", "Không gian tấn công — tập hợp mọi cách có thể khai thác hệ thống"],
          ["Fault attack", "Tấn công lỗi — cố tình gây lỗi để phát hiện điểm yếu"],
          ["CBRN", "Vũ khí hóa học, sinh học, phóng xạ, hạt nhân"],
          ["Indirect prompt injection", "Chèn lệnh gián tiếp qua dữ liệu/tài liệu để thao túng AI"],
          ["Interactive prompting", "Đối thoại nhiều lượt để khơi ra hành vi lỗi"],
          ["Crowd-sourced", "Huy động đông người cùng đóng góp (ở đây: tạo prompt)"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K3)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          A team wants comprehensive Red Teaming coverage for a new chatbot
          before launch, beyond what a small expert team can achieve alone.
          Which approach best combines human creativity with automated scale?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}Rely only on Blue Teaming after launch.
          </li>
          <li>
            <strong>b)</strong>{" "}A hybrid approach: crowd-sourced prompts plus
            an LLM generating and another LLM checking attack prompts.
          </li>
          <li>
            <strong>c)</strong>{" "}Run one benchmark suite and skip interactive
            prompting.
          </li>
          <li>
            <strong>d)</strong>{" "}Only test the AI model in isolation, never the
            end-to-end system.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Một nhóm muốn Red Teaming bao phủ toàn diện cho chatbot mới
              trước khi ra mắt, vượt ngoài khả năng của một đội chuyên gia nhỏ.
              Cách tiếp cận nào kết hợp tốt nhất sự sáng tạo của con người với
              quy mô tự động hóa?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}Chỉ dựa vào Blue Teaming sau khi ra mắt.
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}Cách hybrid: crowd-sourced prompt cộng với
              một LLM sinh và một LLM khác kiểm tra prompt tấn công.
            </p>
            <p className="m-0">
              <strong>c)</strong>{" "}Chỉ chạy một bộ benchmark và bỏ qua
              interactive prompting.
            </p>
            <p className="m-0">
              <strong>d)</strong>{" "}Chỉ test riêng model AI, không bao giờ test
              hệ thống đầu-cuối.
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
              <strong>b</strong>{" "}— hybrid kết hợp crowd-sourced (con người) và
              LLM sinh/kiểm tra prompt (tự động) đúng theo cách mở rộng độ bao
              phủ RT nêu trong syllabus.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong>{" "}sai — Blue Teaming là phòng thủ lúc vận
                hành, không thay được RT trước triển khai.
              </p>
              <p className="m-0">
                <strong>c</strong>{" "}sai — benchmark là đánh giá tĩnh; interactive
                prompting là hoạt động cốt lõi của RT.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — RT có thể áp dụng cho toàn hệ đầu-cuối
                lẫn riêng model, không chỉ giới hạn ở model.
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
        📎 Nguồn: Chương 4 – Kiểm thử hệ thống dựa trên AI, mục 4.2.2 &quot;Red
        Teaming&quot;, trang 42–43 — ISTQB® Certified Tester AI Testing
        Syllabus v2.0 (© International Software Testing Qualifications Board).
        Nội dung biên soạn/dịch ý lại bằng tiếng Việt, không sao chép nguyên
        văn.
      </p>
    </>
  );
}
