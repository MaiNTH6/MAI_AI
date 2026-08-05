import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 1.3 — Status code: phân nhóm và ý nghĩa. */
export function SectionStatusCodePhanNhom() {
  return (
    <>
      <div className="badge">🌐 API Testing · Chương 1 · Mục 1.3</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Status code — phân nhóm và ý nghĩa
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          nắm 5 nhóm status code và ý nghĩa, để biết chính xác kết quả mong
          đợi khi viết test case — thay vì chỉ nhớ &quot;200 là tốt, còn lại
          là xấu&quot;.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        5 nhóm status code
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Nhóm", "Ý nghĩa chung", "Mã hay gặp khi test API"].map((h) => (
                <th key={h} className="border border-[color:var(--line2)] px-3 py-2 text-left font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["1xx", "Thông tin — hiếm gặp khi test API REST thông thường", "100 Continue"],
              ["2xx", "Thành công", "200 OK · 201 Created · 204 No Content"],
              ["3xx", "Chuyển hướng — dữ liệu ở nơi khác", "301/302 Redirect · 304 Not Modified"],
              ["4xx", "Lỗi phía client — request sai/thiếu dữ liệu, không có quyền", "400 Bad Request · 401 Unauthorized · 403 Forbidden · 404 Not Found · 409 Conflict · 422 Unprocessable Entity · 429 Too Many Requests"],
              ["5xx", "Lỗi phía server — hệ thống gặp sự cố không do client", "500 Internal Server Error · 502 Bad Gateway · 503 Service Unavailable"],
            ].map((r) => (
              <tr key={r[0]} className="even:bg-white/[0.04]">
                <td className="border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)] whitespace-nowrap">{r[0]}</td>
                <td className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)]">{r[1]}</td>
                <td className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)]">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">📌 Ghi nhớ</h3>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">4xx</strong> = lỗi do
          client (dữ liệu gửi lên sai). <strong className="text-[color:var(--ink)]">5xx</strong>{" "}
          = lỗi do server. Khi viết test case, luôn ghi rõ status code kỳ
          vọng — không chỉ ghi &quot;trả lỗi&quot; chung chung.
        </p>
      </div>

      <TermGlossary
        terms={[
          ["400 Bad Request", "Request sai cú pháp hoặc thiếu dữ liệu bắt buộc"],
          ["401 Unauthorized", "Chưa xác thực được — token thiếu/sai/hết hạn"],
          ["403 Forbidden", "Đã xác thực nhưng không có quyền thực hiện"],
          ["404 Not Found", "Không tìm thấy tài nguyên được yêu cầu"],
          ["409 Conflict", "Request hợp lệ nhưng xung đột với trạng thái hiện tại"],
          ["422 Unprocessable Entity", "Cú pháp đúng nhưng dữ liệu không hợp lệ về nghiệp vụ"],
          ["429 Too Many Requests", "Vượt giới hạn số lần gọi (rate limit)"],
          ["500 Internal Server Error", "Lỗi không xác định phía server"],
        ]}
      />

      <p className="mt-8 text-xs italic text-[color:var(--faint)] leading-relaxed border-t border-[color:var(--line)] pt-4">
        📎 Nội dung do maiqai.com biên soạn dựa trên chuẩn HTTP status code
        phổ biến, không sao chép nguyên văn từ nguồn nào.
      </p>
    </>
  );
}
