import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 4.3.1 — Test level cho hệ thống ML. */
export function SectionTestLevelMl() {
  return (
    <>
      <div className="badge">🧪 CT-AI · Chương 4 · Mục 4.3.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Hệ thống ML cần thêm 2 test level mà phần mềm thường không có
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-4.3.1 · mức K2 – Hiểu): <em>tóm tắt</em>{" "}các test level dùng
          để phát triển hệ thống machine learning (MLS).
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}
            MLS cần <strong>2 test level chuyên biệt</strong>{" "}(input data
            testing, ML model testing) để xử lý rủi ro riêng của ML —{" "}
            <strong>cộng thêm</strong>, chứ không thay thế, các test level
            truyền thống.
          </p>
        </div>
      </div>

      {/* Bảng test level */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        7 test level của một MLS
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Nhóm", "Test level", "Tập trung vào"].map((h) => (
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
                "Chuyên biệt cho ML",
                "Input data testing",
                "Dữ liệu huấn luyện dùng để train model, và dữ liệu sản xuất mà MLS dùng để sinh dự đoán trong môi trường vận hành. Chi tiết ở Chương 5.",
              ],
              [
                "Chuyên biệt cho ML",
                "ML model testing",
                "Bản thân các ML model — sản phẩm cuối cùng của quy trình ML (workflow, xem 3.1.2). Chi tiết ở Chương 6.",
              ],
              [
                "Truyền thống",
                "Component Testing",
                "Các thành phần không phải AI — giao diện người dùng, data pipeline, thành phần giao tiếp.",
              ],
              [
                "Truyền thống",
                "Component Integration Testing",
                "Input từ data pipeline có được model nhận đúng như kỳ vọng không; dự đoán của model có được trao đổi đúng với các thành phần liên quan (vd giao diện người dùng) và được dùng đúng cách không. Nếu AI được cung cấp dạng dịch vụ (1.1.6), việc test API của dịch vụ đó nằm ở đây.",
              ],
              [
                "Truyền thống",
                "System Testing",
                "Confirmation testing — xác nhận hiệu năng chức năng ML từ giai đoạn model testing ban đầu không bị ảnh hưởng xấu khi model được nhúng vào hệ hoàn chỉnh; đặc biệt quan trọng khi model bị thay đổi chủ đích (vd nén DNN để giảm kích thước). Cũng gồm test phi chức năng, ví dụ thời gian trả kết quả dự đoán.",
              ],
              [
                "Truyền thống",
                "System Integration Testing",
                "Xác nhận giao diện & trao đổi dữ liệu giữa hệ AI với các hệ thống/dịch vụ bên ngoài, dùng môi trường đại diện cho điều kiện vận hành thực tế.",
              ],
              [
                "Truyền thống",
                "Acceptance Testing",
                "Khi AI được dùng như một dịch vụ, cần xác định dịch vụ đó có phù hợp cho hệ đích hay không — ví dụ có đạt các tiêu chí hiệu năng chức năng ML yêu cầu hay không.",
              ],
            ].map((r, i, arr) => {
              const showGroup = i === 0 || arr[i - 1][0] !== r[0];
              const groupSpan = arr.filter((x) => x[0] === r[0]).length;
              return (
                <tr key={r[1]} className="even:bg-white/[0.04]">
                  {showGroup && (
                    <td
                      rowSpan={groupSpan}
                      className="border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)]"
                    >
                      {r[0]}
                    </td>
                  )}
                  <td className="border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)] whitespace-nowrap">
                    {r[1]}
                  </td>
                  <td className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)]">
                    {r[2]}
                  </td>
                </tr>
              );
            })}
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
            &quot;Chỉ cần 2 test level chuyên biệt (input data + model) là đủ
            cho MLS&quot; → <strong className="text-amber-200">SAI</strong>:
            các test level <strong>truyền thống</strong>{" "}(component,
            integration, system, acceptance) vẫn cần dùng song song.
          </li>
          <li>
            &quot;Component Integration Testing chỉ kiểm tra giao diện người
            dùng&quot; → <strong className="text-amber-200">SAI</strong>: còn
            gồm kiểm tra <strong>data pipeline → model</strong>{" "}và{" "}
            <strong>model → thành phần khác</strong>, kể cả API nếu AI cung cấp
            dạng dịch vụ.
          </li>
          <li>
            &quot;System Testing chỉ quan tâm hiệu năng chức năng ML, bỏ qua
            phi chức năng&quot; → <strong className="text-amber-200">SAI</strong>:
            System Testing gồm cả <strong>test phi chức năng</strong>{" "}như thời
            gian trả kết quả.
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
            <strong className="text-[color:var(--metal)]">
              2 level chuyên biệt:
            </strong>{" "}
            input data testing (Chương 5) · ML model testing (Chương 6)
          </p>
          <p className="m-0">
            <strong className="text-[color:var(--metal)]">
              5 level truyền thống:
            </strong>{" "}
            component · component integration · system · system integration ·
            acceptance
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}khi
          lập kế hoạch test cho một hệ có ML, đừng chỉ nghĩ tới việc test model
          — hãy vẽ lại đủ 7 lớp, đặc biệt đừng bỏ sót{" "}
          <strong>Component Integration Testing</strong>{" "}(điểm nối giữa data
          pipeline, model và các thành phần khác), nơi rất dễ phát sinh lỗi
          &quot;âm thầm&quot;.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Machine learning system (MLS)", "Hệ thống machine learning"],
          ["Input data testing", "Kiểm thử dữ liệu đầu vào (huấn luyện & sản xuất)"],
          ["ML model testing", "Kiểm thử mô hình ML"],
          ["Component testing", "Kiểm thử thành phần"],
          ["Component integration testing", "Kiểm thử tích hợp thành phần"],
          ["System testing", "Kiểm thử hệ thống"],
          ["System integration testing", "Kiểm thử tích hợp hệ thống"],
          ["Acceptance testing", "Kiểm thử chấp nhận"],
          ["Confirmation testing", "Kiểm thử xác nhận — kiểm tra lại sau thay đổi"],
          ["AI as a Service (AIaaS)", "AI cung cấp dưới dạng dịch vụ"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          A DNN model is compressed to reduce its size, then embedded into the
          complete system. Which test level specifically confirms that its ML
          functional performance has not degraded after this embedding?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}Component Testing.
          </li>
          <li>
            <strong>b)</strong>{" "}System Testing.
          </li>
          <li>
            <strong>c)</strong>{" "}Input Data Testing.
          </li>
          <li>
            <strong>d)</strong>{" "}Acceptance Testing.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Một mô hình DNN được nén để giảm kích thước, sau đó nhúng vào hệ
              thống hoàn chỉnh. Test level nào xác nhận cụ thể rằng hiệu năng
              chức năng ML không bị suy giảm sau khi nhúng?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}Kiểm thử thành phần.
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}Kiểm thử hệ thống.
            </p>
            <p className="m-0">
              <strong>c)</strong>{" "}Kiểm thử dữ liệu đầu vào.
            </p>
            <p className="m-0">
              <strong>d)</strong>{" "}Kiểm thử chấp nhận.
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
              <strong>b</strong>{" "}— System Testing gồm confirmation testing cho
              trường hợp model bị thay đổi chủ đích (như nén DNN) khi nhúng
              vào hệ hoàn chỉnh.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong>{" "}sai — Component Testing chỉ áp dụng cho
                thành phần không phải AI.
              </p>
              <p className="m-0">
                <strong>c</strong>{" "}sai — Input Data Testing liên quan dữ liệu,
                không phải việc nhúng model vào hệ.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — Acceptance Testing dùng khi AI là một
                dịch vụ, để xác định sự phù hợp cho hệ đích.
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
        📎 Nguồn: Chương 4 – Kiểm thử hệ thống dựa trên AI, mục 4.3.1 &quot;Test
        Levels for Machine Learning Systems&quot;, trang 43–44 — ISTQB®
        Certified Tester AI Testing Syllabus v2.0 (© International Software
        Testing Qualifications Board). Nội dung biên soạn/dịch ý lại bằng
        tiếng Việt, không sao chép nguyên văn.
      </p>
    </>
  );
}
