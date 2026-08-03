import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 7.1.2 — Kiểm thử triển khai (deployment) hệ thống ML. */
export function SectionDeploymentTesting() {
  return (
    <>
      <div className="badge">🚀 CT-AI · Chương 7 · Mục 7.1.2</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        7 kiểu test khi đưa một model ML lên production
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-7.1.2 · mức K2 – Hiểu): <em>giải thích</em>{" "}các hình thức
          kiểm thử triển khai hệ thống ML.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}
            triển khai MLS gồm nhiều hoạt động test nhằm xác nhận hệ AI hoạt
            động đúng, đáng tin cậy trong{" "}
            <strong>môi trường đích</strong>{" "}(cloud, thiết bị biên, di
            động...) — mỗi kỹ thuật nhắm vào một rủi ro triển khai cụ thể.
          </p>
        </div>
      </div>

      {/* Bảng 7 kỹ thuật */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        7 kỹ thuật kiểm thử triển khai
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Kỹ thuật", "Mục đích"].map((h) => (
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
                "Installability testing",
                "Xác nhận MLS có thể cài đặt, cấu hình, và gỡ cài đặt thành công trên mọi môi trường được hỗ trợ. Gồm test các phụ thuộc hệ thống (vd driver GPU), tương thích framework, và chạy đúng script cài đặt.",
              ],
              [
                "Rollback testing",
                "Xác nhận hệ có thể quay lại trạng thái ổn định trước đó sau một lần triển khai bị lỗi/suy giảm. Có thể chỉ áp dụng cho model hoặc cả hệ (kể cả data pipeline). Lưu ý: phải thực hiện TRƯỚC khi triển khai để xác nhận sẵn sàng rollback.",
              ],
              [
                "Canary testing",
                "Xác nhận bản triển khai mới bằng cách phát hành model cập nhật cho một phần nhỏ traffic thật (vd 5% người dùng). Theo dõi các chỉ số thời gian thực (độ trễ, độ chính xác, tỉ lệ lỗi) để phát hiện hồi quy trước khi rollout toàn bộ.",
              ],
              [
                "Shadow testing",
                "Chạy model mới song song với model production hiện tại theo thời gian thực, định tuyến cùng request đến cả hai mà không ảnh hưởng phản hồi thực tế cho người dùng. Cho phép so sánh model mới và cũ trên dữ liệu sống trong môi trường ít rủi ro, có kiểm soát — có thể phát hiện lỗi như suy giảm hiệu năng hay data drift trước khi triển khai đầy đủ.",
              ],
              [
                "Model conversion testing",
                "Xác nhận model vẫn giữ độ chính xác dự đoán chấp nhận được, hành vi nhất quán, và hiệu quả vận hành (vd tốc độ suy luận, dung lượng bộ nhớ) sau khi được chuyển từ định dạng huấn luyện gốc sang định dạng triển khai phù hợp môi trường production đích.",
              ],
              [
                "Cross-device testing",
                "Xác nhận MLS hoạt động đúng trên toàn dải mục tiêu triển khai dự kiến — từ thiết bị di động, thiết bị biên (edge), đến máy chủ cloud.",
              ],
              [
                "API testing",
                "Xác nhận MLS cung cấp giao diện rõ ràng, tuân chuẩn. Kiểm tra xử lý đúng input/output, thông báo lỗi, và luồng tích hợp với hệ thống ngoài như nguồn dữ liệu, client, và pipeline.",
              ],
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

      {/* Chỗ dễ ra đề */}
      <div className="mt-8 rounded-2xl border-2 border-dashed border-amber-500/40 bg-amber-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-amber-200">📝 Bẫy hay gặp</h3>
        <p className="mt-1 mb-2 text-sm text-[color:var(--muted)]">
          Đề hay cho một phát biểu <em>nghe hợp lý nhưng sai</em>{" "}— nhớ mấy chỗ
          gài sau:
        </p>
        <ul className="mt-0 mb-0 space-y-1.5 text-[color:var(--muted)]">
          <li>
            &quot;Rollback testing có thể thực hiện sau khi triển khai xong
            cũng được&quot; → <strong className="text-amber-200">SAI</strong>:
            phải thực hiện <strong>trước khi triển khai</strong>{" "}để xác nhận
            sẵn sàng rollback.
          </li>
          <li>
            &quot;Canary testing và Shadow testing giống nhau — đều gửi cùng
            request đến model mới&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: Canary{" "}
            <strong>định tuyến traffic thật</strong>{" "}(ảnh hưởng người dùng
            thật) đến một phần nhỏ; Shadow chạy{" "}
            <strong>song song</strong>, không ảnh hưởng phản hồi thực tế cho
            người dùng.
          </li>
          <li>
            &quot;Model conversion testing chỉ quan tâm độ chính xác dự
            đoán&quot; → <strong className="text-amber-200">SAI</strong>: còn
            quan tâm <strong>hành vi nhất quán</strong>{" "}và{" "}
            <strong>hiệu quả vận hành</strong>{" "}(tốc độ, bộ nhớ).
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
            7 kỹ thuật: Installability · Rollback · Canary · Shadow · Model
            conversion · Cross-device · API testing
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}
          phân biệt rõ <strong>Canary</strong>{" "}(traffic thật, rủi ro thấp
          nhưng có) và <strong>Shadow</strong>{" "}(song song, không ảnh hưởng
          người dùng, rủi ro thấp hơn) — đây là cặp dễ gây nhầm nhất trong
          Chương 7.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["MLS deployment testing", "Kiểm thử triển khai hệ thống ML"],
          ["Installability testing", "Kiểm thử khả năng cài đặt"],
          ["Rollback testing", "Kiểm thử khả năng quay lại trạng thái ổn định trước đó"],
          ["Canary testing", "Kiểm thử canary — phát hành cho một phần nhỏ traffic thật"],
          ["Shadow testing", "Kiểm thử bóng — chạy song song với hệ production, không ảnh hưởng người dùng"],
          ["Model conversion testing", "Kiểm thử chuyển đổi định dạng model"],
          ["Cross-device testing", "Kiểm thử đa thiết bị"],
          ["API testing", "Kiểm thử giao diện lập trình ứng dụng"],
          ["Edge device", "Thiết bị biên"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          A team routes the same live requests to both the current production
          model and a new candidate model in real time, without letting the
          new model's output affect what users actually see. Which technique
          is this?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}Canary testing.
          </li>
          <li>
            <strong>b)</strong>{" "}Shadow testing.
          </li>
          <li>
            <strong>c)</strong>{" "}Rollback testing.
          </li>
          <li>
            <strong>d)</strong>{" "}Model conversion testing.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Một nhóm định tuyến cùng request thực tế đến cả model production
              hiện tại và một model ứng viên mới theo thời gian thực, mà
              không để output của model mới ảnh hưởng đến những gì người dùng
              thực sự thấy. Đây là kỹ thuật nào?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}Canary testing.
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}Shadow testing.
            </p>
            <p className="m-0">
              <strong>c)</strong>{" "}Rollback testing.
            </p>
            <p className="m-0">
              <strong>d)</strong>{" "}Model conversion testing.
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
              <strong>b</strong>{" "}— chạy song song, không ảnh hưởng phản hồi
              thực tế cho người dùng chính là định nghĩa của Shadow testing.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong>{" "}sai — Canary testing thực sự định tuyến
                traffic thật (ảnh hưởng một phần người dùng) đến model mới.
              </p>
              <p className="m-0">
                <strong>c</strong>{" "}sai — Rollback testing xác nhận khả năng
                quay lại trạng thái cũ, không liên quan chạy song song.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — Model conversion testing liên quan
                chuyển đổi định dạng model, không liên quan chạy song song.
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
        📎 Nguồn: Chương 7 – Kiểm thử trong phát triển ML, mục 7.1.2
        &quot;Machine Learning System Deployment Testing&quot;, trang 65–66 —
        ISTQB® Certified Tester AI Testing Syllabus v2.0 (© International
        Software Testing Qualifications Board). Nội dung biên soạn/dịch ý lại
        bằng tiếng Việt, không sao chép nguyên văn.
      </p>
    </>
  );
}
