import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 6.1.10 — Back-to-back testing. */
export function SectionBackToBackTesting() {
  return (
    <>
      <div className="badge">🧩 CT-AI · Chương 6 · Mục 6.1.10</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Back-to-back testing: mượn một hệ khác làm &quot;đáp án tạm&quot;
      </h1>

      {/* Mục tiêu + ý cốt lõi */}
      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học</strong>{" "}
          (LO AI-6.1.10 · mức K2 – Hiểu): <em>giải thích</em>{" "}cách dùng
          back-to-back testing trong bối cảnh hệ thống ML.
        </p>
        <div className="text-[color:var(--muted)]">
          <p className="m-0">
            💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}
            back-to-back testing dùng một{" "}
            <strong>phiên bản hệ thống khác</strong>{" "}làm điểm tham chiếu
            (pseudo-oracle) và so sánh output của nó với hệ đang test trên
            cùng input — một giải pháp thực tế cho test oracle problem.
          </p>
        </div>
      </div>

      {/* Nội dung cốt lõi */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Pseudo-oracle nên như thế nào
      </h2>
      <p className="mt-3 text-sm text-[color:var(--muted)] leading-relaxed">
        Pseudo-oracle có thể là một hệ có sẵn, hoặc được xây riêng cho mục
        đích test (tốn kém hơn). Lý tưởng nhất, pseudo-oracle và hệ đang test{" "}
        <strong>không nên chia sẻ chung thành phần phần mềm</strong>{" "}— nếu
        không, cả hai có thể mang cùng một lỗi, khiến output khớp nhau dù cả
        hai đều sai. Đây là vấn đề đặc biệt đáng lo với MLS vì{" "}
        <strong>dùng lại rộng rãi các thành phần AI mã nguồn mở</strong>. Vì
        vậy, pseudo-oracle thường được phát triển bởi{" "}
        <strong>một đội khác, lý tưởng là độc lập</strong>{" "}— có thể dùng
        framework, thuật toán, hoặc cấu hình model khác. Đôi khi, một phần
        mềm truyền thống (không phải ML) cũng có thể làm pseudo-oracle nếu nó
        giải quyết cùng bài toán.
      </p>
      <p className="mt-3 text-sm text-[color:var(--muted)] leading-relaxed">
        Khi làm <strong>functional back-to-back testing</strong>, pseudo-
        oracle chỉ cần khớp <strong>hành vi chức năng</strong>{" "}— không cần đáp
        ứng cùng yêu cầu phi chức năng như hệ đang test, nên có thể rẻ hơn để
        xây dựng.
      </p>
      <p className="mt-3 text-sm text-[color:var(--muted)] leading-relaxed">
        Cách tiếp cận này chỉ cần <strong>sinh test input</strong>, không cần
        sinh expected result, vì pseudo-oracle đã cung cấp điểm so sánh. Input
        có thể lấy từ test case có sẵn (như bộ test hồi quy), hoặc tự động
        sinh từ dữ liệu huấn luyện — cho phép chạy số lượng lớn test nếu có hỗ
        trợ thực thi test tự động.
      </p>

      <div className="mt-6 rounded-xl border border-sky-400/30 bg-sky-500/10 p-4 text-sm text-[color:var(--muted)] leading-relaxed">
        <p className="m-0">
          🔗 <strong className="text-[color:var(--ink)]">Giá trị đặc biệt:
          </strong>{" "}back-to-back testing hữu ích khi{" "}
          <strong>di trú MLS sang môi trường mới</strong>{" "}(vd từ dev sang
          production) và khi so sánh kết quả test giữa các môi trường. Cũng
          có thể lộ ra <strong>lỗi tinh vi</strong>{" "}trong hành vi model — đặc
          biệt khi so sánh phản hồi trên nhiều edge case hoặc input bất
          thường.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Khác biệt với A/B testing
      </h2>
      <p className="mt-3 text-sm text-[color:var(--muted)] leading-relaxed">
        A/B testing dùng để{" "}
        <strong>so sánh hai biến thể của cùng một MLS</strong>{" "}bằng thước đo
        hiệu năng chức năng ML &amp; kỹ thuật thống kê. Back-to-back testing
        dùng để <strong>phát hiện lỗi (defect)</strong>{" "}bằng cách so output
        với một pseudo-oracle độc lập.
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
            &quot;Pseudo-oracle nên dùng chung thành phần với hệ đang test
            để đảm bảo tương thích&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: nên{" "}
            <strong>không chia sẻ</strong>{" "}thành phần chung, tránh cùng mang
            một lỗi khiến output khớp nhau dù cả hai sai.
          </li>
          <li>
            &quot;Functional back-to-back testing yêu cầu pseudo-oracle đáp
            ứng cùng yêu cầu phi chức năng&quot; →{" "}
            <strong className="text-amber-200">SAI</strong>: chỉ cần{" "}
            <strong>khớp hành vi chức năng</strong>, không cần đáp ứng yêu cầu
            phi chức năng.
          </li>
          <li>
            &quot;Back-to-back testing và A/B testing là một, chỉ khác
            tên&quot; → <strong className="text-amber-200">SAI</strong>: A/B{" "}
            <strong>so sánh hai biến thể</strong>{" "}bằng thống kê; back-to-back{" "}
            <strong>phát hiện lỗi</strong>{" "}qua pseudo-oracle.
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
              Back-to-back
            </strong>{" "}
            = pseudo-oracle (độc lập) + cùng input → so output, tìm lỗi. Chỉ
            cần sinh input, không cần expected result.
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}khi
          di trú một MLS sang môi trường mới, đừng chỉ smoke test — hãy chạy{" "}
          <strong>back-to-back</strong>{" "}giữa hệ cũ và hệ mới trên cùng bộ
          input để tự tin lỗi tinh vi không lọt qua.
        </p>
      </div>

      {/* Thuật ngữ Anh–Việt */}
      <TermGlossary
        terms={[
          ["Back-to-back testing", "So sánh output của nhiều phiên bản hệ thống với cùng đầu vào"],
          ["Pseudo-oracle", "Oracle giả — hệ thống tham chiếu dùng để so sánh thay vì expected result"],
          ["Functional back-to-back testing", "Back-to-back testing chỉ so sánh hành vi chức năng"],
          ["Regression test suite", "Bộ test hồi quy"],
          ["Open-source AI component", "Thành phần AI mã nguồn mở"],
          ["Migration", "Di trú — chuyển hệ thống sang môi trường mới"],
        ]}
      />

      {/* Câu hỏi minh họa */}
      <div className="mt-8 rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-6">
        <h3 className="mt-0 text-lg font-bold text-indigo-300">
          🎯 Câu hỏi minh họa (phong cách đề CT-AI · K2)
        </h3>
        <p className="mt-3 mb-0 text-[color:var(--ink)]">
          Why should a pseudo-oracle ideally be built by a different,
          independent team using different frameworks or algorithms than the
          system under test?
        </p>
        <ul className="mt-3 mb-0 space-y-1.5 text-[color:var(--muted)] list-none pl-0">
          <li>
            <strong>a)</strong>{" "}To reduce the cost of test input generation.
          </li>
          <li>
            <strong>b)</strong>{" "}To avoid both systems sharing the same defect,
            which would make outputs match even when both are wrong.
          </li>
          <li>
            <strong>c)</strong>{" "}Because pseudo-oracles must meet the same
            non-functional requirements as the system under test.
          </li>
          <li>
            <strong>d)</strong>{" "}Because A/B testing requires it.
          </li>
        </ul>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-slate-100">
            Xem bản dịch tiếng Việt
          </summary>
          <div className="mt-2 text-sm text-[color:var(--muted)] space-y-1">
            <p className="m-0">
              Vì sao pseudo-oracle lý tưởng nên được xây bởi một đội khác,
              độc lập, dùng framework hoặc thuật toán khác với hệ đang test?
            </p>
            <p className="m-0">
              <strong>a)</strong>{" "}Để giảm chi phí sinh test input.
            </p>
            <p className="m-0">
              <strong>b)</strong>{" "}Để tránh cả hai hệ mang cùng một lỗi, khiến
              output khớp nhau dù cả hai đều sai.
            </p>
            <p className="m-0">
              <strong>c)</strong>{" "}Vì pseudo-oracle phải đáp ứng cùng yêu cầu
              phi chức năng với hệ đang test.
            </p>
            <p className="m-0">
              <strong>d)</strong>{" "}Vì A/B testing yêu cầu điều đó.
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
              <strong>b</strong>{" "}— lý do chính là tránh cả hai hệ chia sẻ
              cùng lỗi, đặc biệt quan trọng vì MLS hay dùng chung thành phần
              mã nguồn mở.
            </p>
            <div className="space-y-1 text-[color:var(--muted)]">
              <p className="m-0">
                <strong>a</strong>{" "}sai — không liên quan mục đích chính của
                việc chọn đội độc lập.
              </p>
              <p className="m-0">
                <strong>c</strong>{" "}sai — thực tế pseudo-oracle{" "}
                <strong>không cần</strong>{" "}đáp ứng yêu cầu phi chức năng
                giống hệ đang test.
              </p>
              <p className="m-0">
                <strong>d</strong>{" "}sai — đây là khái niệm của back-to-back
                testing, không phải yêu cầu từ A/B testing.
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
        📎 Nguồn: Chương 6 – Kiểm thử mô hình cho hệ thống ML, mục 6.1.10
        &quot;Back-to-Back Testing&quot;, trang 62 — ISTQB® Certified Tester
        AI Testing Syllabus v2.0 (© International Software Testing
        Qualifications Board). Nội dung biên soạn/dịch ý lại bằng tiếng Việt,
        không sao chép nguyên văn.
      </p>
    </>
  );
}
