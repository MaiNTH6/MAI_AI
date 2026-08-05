import { TermGlossary } from "@/components/TermGlossary";
import { ApiChecklistTable } from "@/components/ApiChecklistTable";

/** Nội dung mục 4.5 — Security Misconfiguration. */
export function SectionSecurityMisconfiguration() {
  return (
    <>
      <div className="badge">🔐 API Testing · Chương 4 · Mục 4.5 · OWASP #5</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Security Misconfiguration
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          nhận diện các lỗi cấu hình phổ biến — thường không nằm ở logic
          code, mà ở cách hệ thống được triển khai/thiết lập.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Các dạng cấu hình sai thường gặp
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Dạng", "Ví dụ"].map((h) => (
                <th key={h} className="border border-[color:var(--line2)] px-3 py-2 text-left font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Lộ thông tin debug", "Response lỗi 500 trả về đầy đủ stack trace, tên bảng DB, đường dẫn file nội bộ"],
              ["CORS quá lỏng lẻo", "Header Access-Control-Allow-Origin: * cho phép mọi domain gọi API kèm cookie/credential"],
              ["Thiếu security header", "Không có Content-Security-Policy, X-Content-Type-Options, Strict-Transport-Security"],
              ["Method HTTP thừa được bật", "API chỉ cần GET/POST nhưng vẫn bật PUT/DELETE/TRACE không dùng tới, mở rộng bề mặt tấn công"],
              ["Môi trường test lộ ra ngoài", "Endpoint /admin, /debug, /swagger-ui chỉ nên dùng nội bộ nhưng truy cập được từ internet"],
            ].map((r) => (
              <tr key={r[0]} className="even:bg-white/[0.04]">
                <td className="border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)] whitespace-nowrap">{r[0]}</td>
                <td className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)]">{r[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Checklist kiểm tra
      </h2>
      <ApiChecklistTable
        groups={[
          {
            group: "Cách kiểm tra",
            cases: [
              { id: "TC-MISCONFIG-01", content: "Cố tình gây lỗi 500 (vd gửi sai kiểu dữ liệu, dữ liệu cực đoan) rồi đọc kỹ nội dung response trả về", expected: "Không lộ stack trace, tên bảng/cột DB, đường dẫn hệ thống — chỉ trả message chung chung" },
              { id: "TC-MISCONFIG-02", content: "Kiểm tra header Access-Control-Allow-Origin trên response", expected: "Không phải '*' nếu API có dùng credential/cookie; chỉ cho phép domain thực sự cần" },
              { id: "TC-MISCONFIG-03", content: "Thử truy cập các endpoint quản trị/tài liệu nội bộ (vd /admin, /actuator, /swagger-ui) từ môi trường ngoài", expected: "Bị chặn hoặc yêu cầu xác thực riêng, không public hoàn toàn" },
            ],
          },
        ]}
      />

      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">📌 Ghi nhớ</h3>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          Cách nhanh nhất để phát hiện Security Misconfiguration:{" "}
          <strong className="text-[color:var(--ink)]">
            cố tình gây lỗi rồi đọc kỹ response
          </strong>{" "}
          — nhiều hệ thống vô tình &quot;hào phóng&quot; tiết lộ chi tiết kỹ
          thuật ngay trong thông báo lỗi.
        </p>
      </div>

      <TermGlossary
        terms={[
          ["CORS", "Cross-Origin Resource Sharing — cơ chế kiểm soát domain nào được gọi API từ trình duyệt"],
          ["Stack trace", "Chuỗi thông tin kỹ thuật mô tả chính xác nơi xảy ra lỗi trong code"],
          ["Security header", "Các header HTTP giúp tăng cường bảo mật phía trình duyệt/client"],
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
