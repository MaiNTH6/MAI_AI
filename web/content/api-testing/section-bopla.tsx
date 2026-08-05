import { TermGlossary } from "@/components/TermGlossary";
import { ApiChecklistTable } from "@/components/ApiChecklistTable";

/** Nội dung mục 4.3 — Broken Object Property Level Authorization (BOPLA). */
export function SectionBopla() {
  return (
    <>
      <div className="badge">🔐 API Testing · Chương 4 · Mục 4.3 · OWASP #3</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Broken Object Property Level Authorization (BOPLA)
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          hiểu 2 dạng rủi ro ở cấp độ <em>field/property</em> (khác BOLA là ở
          cấp độ toàn bộ object) — gộp lại từ 2 hạng mục cũ: Excessive Data
          Exposure và Mass Assignment.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        2 dạng rủi ro
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Dạng", "Rủi ro", "Ví dụ"].map((h) => (
                <th key={h} className="border border-[color:var(--line2)] px-3 py-2 text-left font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="even:bg-white/[0.04]">
              <td className="border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)]">Excessive Data Exposure</td>
              <td className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)]">Response trả về nhiều field hơn mức client cần, để lộ dữ liệu nội bộ/nhạy cảm</td>
              <td className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)]">GET /v1/orders/&#123;id&#125; trả kèm field internalCostPrice (giá vốn nội bộ) dù UI không hiển thị</td>
            </tr>
            <tr className="even:bg-white/[0.04]">
              <td className="border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)]">Mass Assignment</td>
              <td className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)]">Client gửi thêm field không được phép sửa, nhưng server vẫn áp dụng vì tự động map toàn bộ body vào object</td>
              <td className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)]">PATCH /v1/orders/&#123;id&#125; gửi thêm &#123; &quot;status&quot;: &quot;PAID&quot; &#125; dù field này lẽ ra chỉ hệ thống thanh toán mới được đổi</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Checklist kiểm tra
      </h2>
      <ApiChecklistTable
        groups={[
          {
            group: "Excessive Data Exposure",
            cases: [
              { id: "TC-BOPLA-01", content: "Rà soát toàn bộ field trong response, đối chiếu với những gì UI/tài liệu thực sự cần hiển thị", expected: "Không có field nội bộ/nhạy cảm (giá vốn, ghi chú nội bộ, hash mật khẩu...) bị lộ ra ngoài" },
            ],
          },
          {
            group: "Mass Assignment",
            cases: [
              { id: "TC-BOPLA-02", content: "Gửi thêm field không có trong tài liệu API vào body (vd status, isAdmin, role) khi tạo/cập nhật", expected: "Server bỏ qua field không được phép, không áp dụng theo giá trị client tự gửi" },
            ],
          },
        ]}
      />

      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">📌 Ghi nhớ</h3>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          BOPLA khác BOLA ở chỗ: <strong className="text-[color:var(--ink)]">dù bạn đang thao tác đúng tài nguyên của chính mình</strong>{" "}
          (không vi phạm BOLA), vẫn có thể lộ field không nên thấy, hoặc sửa
          field không nên sửa được.
        </p>
      </div>

      <TermGlossary
        terms={[
          ["Excessive Data Exposure", "Lộ dữ liệu thừa — response chứa field nhạy cảm không cần thiết"],
          ["Mass Assignment", "Gán hàng loạt — server tự động áp dụng mọi field client gửi mà không lọc"],
          ["Allowlist field", "Danh sách field được phép nhận/trả — cách phòng chống chuẩn cho cả 2 rủi ro trên"],
        ]}
      />

      <p className="mt-8 text-xs italic text-[color:var(--faint)] leading-relaxed border-t border-[color:var(--line)] pt-4">
        📎 Nội dung do maiqai.com biên soạn dựa trên OWASP API Security Top
        10 (2023, CC BY-SA 4.0), diễn giải lại bằng tiếng Việt kèm ví dụ minh
        hoạ riêng.
      </p>
    </>
  );
}
