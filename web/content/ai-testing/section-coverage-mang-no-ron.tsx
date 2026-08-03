import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 3.4.3 — Coverage cho mạng nơ-ron. */
export function SectionCoverageMangNoRon() {
  return (
    <>
      <div className="badge">🤖 CT-AI · Chương 3 · Mục 3.4.3</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Đo coverage cho mạng nơ-ron
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-3.4.3 · mức K2 – Hiểu): <em>giải thích</em> các thước đo coverage
          cho mạng nơ-ron.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong> mạng
            nơ-ron <strong>không có nhánh code</strong> để phủ — hành vi nằm ở
            weights/bias/activation → cần <strong>coverage riêng</strong> đo xem
            test đã &quot;chạm&quot; tới các phần nào của mạng.
          </p>
        </div>
      </div>

      {/* Bảng 3 loại coverage */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Ba thước đo coverage tiêu biểu
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Thước đo", "Đo gì"].map((h) => (
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
                "Neuron Coverage",
                "Tỷ lệ nơ-ron có đầu ra vượt một ngưỡng cho trước trong khi test.",
              ],
              [
                "k-Multisection Neuron Coverage (kMNC)",
                "Chia khoảng đầu ra của mỗi nơ-ron thành k phần; đo tỷ lệ các phần được kích hoạt khi test.",
              ],
              [
                "Neuron Boundary Coverage (NBC)",
                "Tỷ lệ nơ-ron có đầu ra vượt mức tối đa (hoặc dưới mức tối thiểu) từng đạt trong huấn luyện.",
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

      {/* Ví von dễ hiểu */}
      <div className="mt-6 rounded-xl border border-sky-400/30 bg-sky-500/10 p-4 text-sm text-[color:var(--muted)] leading-relaxed">
        <p className="m-0">
          💡 <strong className="text-[color:var(--ink)]">Hình dung dễ hơn:</strong>{" "}
          coi mạng nơ-ron như một <strong>tòa nhà nhiều phòng</strong>, mỗi phòng
          (nơ-ron) có một <strong>đèn chỉnh sáng được</strong>{" "}
          (từ mờ tới chói).
          Mỗi ca test là một &quot;lượt đi&quot; qua tòa nhà.
        </p>
        <div className="mt-2 space-y-1.5 border-l-2 border-sky-400/50 pl-3">
          <p className="m-0">
            <strong className="text-sky-300">Neuron Coverage</strong> — bao nhiêu{" "}
            <strong>phòng có đèn sáng</strong> (vượt ngưỡng) khi test? Vd mạng có{" "}
            <strong>10 nơ-ron, test làm 6 nơ-ron sáng → coverage = 60%</strong>;
            4 phòng chưa bao giờ sáng = chưa được test, có thể ẩn lỗi.
          </p>
          <p className="m-0">
            <strong className="text-sky-300">kMNC</strong> — chia độ sáng mỗi đèn
            thành <strong>k nấc</strong> (mờ → chói). Test đã làm đèn chạy qua{" "}
            <strong>bao nhiêu nấc</strong>? Nếu đèn chỉ luôn ở mức mờ, các nấc
            sáng hơn <strong>chưa được kiểm</strong>.
          </p>
          <p className="m-0">
            <strong className="text-sky-300">NBC</strong> — có đèn nào{" "}
            <strong>sáng hơn mức chói nhất</strong> (hoặc tối hơn mức tối nhất){" "}
            <strong>từng thấy lúc học</strong> không? Nếu có → mạng đang ở{" "}
            <strong>tình huống lạ, vượt vùng quen thuộc</strong> → đáng soi kỹ.
          </p>
        </div>
      </div>

      {/* Ích lợi + giới hạn */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Ích lợi &amp; giới hạn
      </h2>
      <div className="mt-4 space-y-4 text-[color:var(--muted)] leading-relaxed">
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">Ích lợi:</strong> lộ ra{" "}
          <strong>vùng chưa được test</strong> — nếu một số nơ-ron/lớp không bao
          giờ kích hoạt khi test, hiệu năng ở các ranh giới quyết định liên quan
          đáng ngờ → giúp tester thiết kế thêm ca test cho phần ít được khám phá.
          (Công cụ thương mại hỗ trợ các thước đo này hiện còn hạn chế.)
        </p>
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">Giới hạn:</strong> coverage
          cấu trúc <strong>một mình không bảo đảm</strong> mạng khái quát tốt hay
          xử lý được biến thể thực tế. Mạng có thể học{" "}
          <strong>tương quan giả</strong> → kích hoạt đúng nhưng vì lý do sai. Nên{" "}
          phải dùng kèm <strong>adversarial testing</strong> và{" "}
          <strong>metamorphic testing</strong> (Chương 5, 6, 7).
        </p>
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
            &quot;Đạt 100% neuron coverage là mạng chắc chắn tốt&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: coverage cấu trúc{" "}
            <strong>không bảo đảm</strong> khái quát tốt (có thể học tương quan
            giả).
          </li>
          <li>
            &quot;Coverage mạng nơ-ron giống hệt phủ nhánh code&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: mạng không có nhánh
            code, coverage đo <strong>mức kích hoạt nơ-ron</strong>.
          </li>
          <li>
            Nhầm định nghĩa: <strong>NBC</strong> xét vượt biên min/max từng đạt
            khi <em>huấn luyện</em>; <strong>kMNC</strong> chia khoảng thành{" "}
            <strong>k phần</strong>.
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
            <strong className="text-[color:var(--metal)]">3 thước đo:</strong>{" "}
            Neuron Coverage (vượt ngưỡng) · kMNC (k phần) · NBC (vượt biên
            min/max)
          </p>
          <p className="m-0">
            <strong className="text-[color:var(--metal)]">Nhớ:</strong> coverage
            cao ≠ mạng tốt
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong> dùng
          coverage để <strong>phát hiện vùng mạng chưa được test</strong>, nhưng{" "}
          <strong>đừng coi là bằng chứng đủ</strong>. Luôn kết hợp với adversarial
          &amp; metamorphic testing để bắt lỗi &quot;đúng vì lý do sai&quot;.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Structural coverage", "Coverage cấu trúc — đo mức test chạm tới bên trong"],
          ["Neuron coverage", "Coverage nơ-ron — tỷ lệ nơ-ron vượt ngưỡng"],
          ["k-Multisection Neuron Coverage (kMNC)", "Chia khoảng đầu ra thành k phần, đo phần được kích hoạt"],
          ["Neuron Boundary Coverage (NBC)", "Tỷ lệ nơ-ron vượt biên min/max từng đạt khi train"],
          ["Threshold", "Ngưỡng — mốc để coi nơ-ron là 'kích hoạt'"],
          ["Activation", "Kích hoạt — đầu ra nơ-ron khi có đầu vào test"],
          ["Decision boundary", "Ranh giới quyết định — nơi mô hình đổi kết luận"],
          ["Spurious correlation", "Tương quan giả — mối liên hệ vô nghĩa mà mô hình học nhầm"],
          ["Adversarial testing", "Kiểm thử đối kháng — đầu vào cố tình gây sai"],
          ["Metamorphic testing", "Kiểm thử biến hình — dùng quan hệ giữa các đầu vào/ra"],
          ["Generalization", "Khả năng khái quát — chạy đúng trên dữ liệu mới"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          Which statement about neural network structural coverage is{" "}
          <strong>correct</strong>?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong> Achieving high coverage guarantees the network
            generalises well.
          </li>
          <li>
            <strong>b)</strong> It can reveal parts of the network never activated
            by tests, but does not on its own guarantee good generalisation.
          </li>
          <li>
            <strong>c)</strong> It replaces the need for adversarial and
            metamorphic testing.
          </li>
          <li>
            <strong>d)</strong> Neural networks follow explicit code paths, so
            branch coverage is enough.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Phát biểu nào về coverage cấu trúc mạng nơ-ron là{" "}
              <strong>đúng</strong>?
            </p>
            <p className="m-0">
              <strong>a)</strong> Coverage cao bảo đảm mạng khái quát tốt.
            </p>
            <p className="m-0">
              <strong>b)</strong> Lộ ra phần mạng chưa được test kích hoạt, nhưng
              một mình không bảo đảm khái quát tốt.
            </p>
            <p className="m-0">
              <strong>c)</strong> Nó thay thế được adversarial &amp; metamorphic
              testing.
            </p>
            <p className="m-0">
              <strong>d)</strong> Mạng nơ-ron theo nhánh code tường minh nên phủ
              nhánh là đủ.
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
              <strong>b</strong> — Coverage lộ vùng chưa test nhưng không bảo đảm
              khái quát tốt.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong> sai — coverage cao ≠ khái quát tốt (có tương
                quan giả).
              </p>
              <p className="m-0">
                <strong>c</strong> sai — vẫn cần adversarial &amp; metamorphic
                testing.
              </p>
              <p className="m-0">
                <strong>d</strong> sai — mạng không theo nhánh code tường minh.
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
        📎 Nguồn: Chương 3 – Machine Learning, mục 3.4.3 &quot;Coverage Measures
        for Neural Networks&quot;, trang 37 — ISTQB® Certified Tester AI Testing
        Syllabus v2.0 (© International Software Testing Qualifications Board). Nội
        dung biên soạn/dịch ý lại bằng tiếng Việt, không sao chép nguyên văn.
      </p>
    </>
  );
}
