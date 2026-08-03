import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 1.1.6 — Phát triển & lưu trữ (hosting) mô hình AI. */
export function SectionPhatTrienHostingMoHinh() {
  return (
    <>
      <div className="badge">🧠 CT-AI · Chương 1 · Mục 1.1.6</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Nguồn mô hình &amp; nơi triển khai AI
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-1.1.6 · mức K2 – Hiểu): <em>so sánh</em>{" "}các lựa chọn phát triển
          và lưu trữ (hosting) mô hình AI.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}có{" "}
            <strong>2 quyết định tách biệt</strong>{" "}— (1) làm mô hình thế nào và
            (2) lưu/chạy nó ở đâu.
          </p>
          <p className="m-0 mt-1.5">
            •{" "}
            <strong className="text-[color:var(--ink)]">Nguồn mô hình:</strong>{" "}
            mua sẵn (pretrained / AIaaS) ↔ tự phát triển
          </p>
          <p className="m-0 mt-1">
            •{" "}
            <strong className="text-[color:var(--ink)]">Nơi đặt:</strong>{" "}local
            (tại chỗ) ↔ đám mây (public / private) ↔ hybrid
          </p>
        </div>
      </div>

      {/* Bảng mua vs tự làm */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Nguồn mô hình: mua sẵn hay tự phát triển?
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Lựa chọn", "Được gì", "Đánh đổi"].map((h) => (
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
                "Mua bên thứ ba (pretrained / AIaaS)",
                "Triển khai nhanh, ra thị trường sớm.",
                "Ít tùy biến, phụ thuộc nhà cung cấp.",
              ],
              [
                "Tự phát triển (on-premises / cloud tùy biến)",
                "Hợp yêu cầu riêng, kiểm soát cao.",
                "Cần kỹ năng chuyên sâu (nội bộ hoặc thuê ngoài).",
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

      {/* Bảng nơi đặt */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Nơi phát triển &amp; lưu trữ
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Nơi đặt", "Ưu điểm", "Nhược điểm"].map((h) => (
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
                "Local (tại chỗ)",
                "Riêng tư, kiểm soát, không phí license đám mây.",
                "Phần cứng hạn chế; mô hình lớn cần cụm server (điện, làm mát, chi phí).",
              ],
              [
                "Public cloud (đám mây công cộng)",
                "Mở rộng dễ, trả theo dùng, khỏi lo bảo trì; hợp tải biến động.",
                "Ít riêng tư hơn, phụ thuộc nhà cung cấp.",
              ],
              [
                "Private cloud (đám mây riêng)",
                "Bảo mật &amp; tùy biến cao.",
                "Đầu tư ban đầu / chi phí lớn hơn.",
              ],
              [
                "Hybrid (lai)",
                "Prototype local → mở rộng cloud; giữ dữ liệu nhạy cảm tại chỗ.",
                "Kiến trúc phức tạp hơn.",
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
      <p className="mt-3 text-sm text-[color:var(--muted)]">
        <strong className="text-[color:var(--ink)]">Phần cứng tăng theo quy mô:</strong>{" "}
        mô hình nhỏ (cây quyết định, mạng nơ-ron gọn) chạy được trên máy cá nhân →
        mô hình vừa cần GPU riêng → mô hình lớn cần cụm server hiệu năng cao (kèm
        điện, làm mát, chi phí phần cứng).
      </p>
      <p className="mt-3 text-sm text-[color:var(--muted)]">
        Chọn dựa trên: <strong>kích thước &amp; độ phức tạp mô hình</strong>, yêu
        cầu hiệu năng, ngân sách, bảo mật/riêng tư dữ liệu, nhu cầu triển khai và
        yêu cầu pháp lý. Quyết định <em>phát triển</em>{" "}và <em>hosting</em>{" "}thường
        cân nhắc riêng.
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
            &quot;Mua mô hình pretrained/AIaaS luôn tốt hơn tự phát triển&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: mỗi bên có đánh đổi
            (nhanh nhưng ít tùy biến ↔ hợp yêu cầu nhưng cần kỹ năng).
          </li>
          <li>
            &quot;Public cloud luôn kém an toàn hơn nên đừng dùng&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: tùy nhu cầu; private
            cloud/hybrid bù được, và cloud tiện mở rộng.
          </li>
          <li>
            &quot;Quyết định phát triển và hosting là một&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: đây là{" "}
            <strong>hai quyết định tách biệt</strong>.
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
            <strong className="text-[color:var(--metal)]">Nguồn:</strong>{" "}mua sẵn
            (nhanh) ↔ tự làm (tùy biến)
          </p>
          <p className="m-0">
            <strong className="text-[color:var(--metal)]">Nơi đặt:</strong>{" "}local ·
            public cloud · private cloud · hybrid
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}mua mô
          hình ngoài → phải <strong>test như hộp đen</strong>, phụ thuộc bản cập
          nhật của nhà cung cấp; tự phát triển → kiểm soát và test sâu hơn. Nơi
          hosting quyết định <strong>dữ liệu test đặt ở đâu</strong>{" "}— dữ liệu nhạy
          cảm nên giữ tại chỗ (bảo mật, tuân thủ).
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Pretrained model", "Mô hình huấn luyện sẵn — dùng ngay, khỏi train từ đầu"],
          ["AIaaS (AI as a Service)", "AI dạng dịch vụ — thuê qua đám mây"],
          ["Third-party vendor", "Nhà cung cấp bên thứ ba"],
          ["On-premises", "Tại chỗ — đặt trên hạ tầng của chính tổ chức"],
          ["Time-to-market", "Thời gian ra thị trường"],
          ["Public cloud", "Đám mây công cộng — trả theo dùng, mở rộng dễ"],
          ["Private cloud", "Đám mây riêng — bảo mật/tùy biến cao, đắt hơn"],
          ["Hybrid", "Lai — kết hợp local và cloud"],
          ["Server cluster", "Cụm máy chủ — cho mô hình lớn"],
          ["Data privacy", "Riêng tư dữ liệu"],
          ["Scalability", "Khả năng mở rộng"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          A startup wants to add an AI feature as fast as possible and has{" "}
          <strong>no in-house ML expertise</strong>. Which option best fits?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}Build a custom model from scratch on on-premises
            server clusters.
          </li>
          <li>
            <strong>b)</strong>{" "}Use a pretrained model / AIaaS from a third-party
            vendor.
          </li>
          <li>
            <strong>c)</strong>{" "}Hire a large ML research team first, then train
            everything locally.
          </li>
          <li>
            <strong>d)</strong>{" "}Avoid AI because there is no perfectly secure
            option.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Một startup muốn thêm tính năng AI <strong>càng nhanh càng tốt</strong>{" "}
              và <strong>không có chuyên môn ML nội bộ</strong>. Lựa chọn nào phù
              hợp nhất?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}Tự xây mô hình từ đầu trên cụm server tại chỗ.
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}Dùng mô hình pretrained / AIaaS của bên thứ ba.
            </p>
            <p className="m-0">
              <strong>c)</strong>{" "}Tuyển đội nghiên cứu ML lớn trước rồi tự train
              tất cả tại chỗ.
            </p>
            <p className="m-0">
              <strong>d)</strong>{" "}Tránh AI vì không có lựa chọn nào an toàn tuyệt
              đối.
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
              <strong>b</strong>{" "}— Pretrained / AIaaS cho triển khai nhanh, không
              cần chuyên môn sâu.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong>{" "}và <strong>c</strong>{" "}sai — tự phát triển cần
                kỹ năng chuyên sâu và thời gian, ngược mục tiêu &quot;nhanh&quot;.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — có nhiều lựa chọn bảo mật (private
                cloud/hybrid); không cần né tránh.
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
        📎 Nguồn: Chương 1 – Giới thiệu AI, mục 1.1.6 &quot;Development and
        Hosting of AI Models&quot;, trang 18–19 — ISTQB® Certified Tester AI
        Testing Syllabus v2.0 (© International Software Testing Qualifications
        Board). Nội dung biên soạn/dịch ý lại bằng tiếng Việt, không sao chép
        nguyên văn.
      </p>
    </>
  );
}
