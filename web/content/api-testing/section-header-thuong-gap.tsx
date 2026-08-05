import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 1.4 — Header thường gặp. */
export function SectionHeaderThuongGap() {
  return (
    <>
      <div className="badge">🌐 API Testing · Chương 1 · Mục 1.4</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Header thường gặp (Content-Type, Authorization...)
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          nhận diện các header phổ biến ảnh hưởng trực tiếp tới hành vi API,
          để biết khi nào cần thêm test case riêng cho header thay vì chỉ tập
          trung vào Body.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Các header hay gặp khi test
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Header", "Vai trò", "Case nên test"].map((h) => (
                <th key={h} className="border border-[color:var(--line2)] px-3 py-2 text-left font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Content-Type", "Khai báo định dạng dữ liệu gửi lên (vd application/json)", "Gửi sai định dạng (text/plain) xem server có từ chối rõ ràng không"],
              ["Authorization", "Mang thông tin xác thực (thường dạng Bearer token)", "Thiếu, sai định dạng, token hết hạn"],
              ["Accept", "Client khai báo định dạng response mong muốn nhận về", "Gửi Accept không được hỗ trợ, xem server trả lỗi hay mặc định JSON"],
              ["Location", "Trỏ tới URL tài nguyên vừa tạo (đi kèm 201 Created)", "Kiểm tra có đúng trỏ tới id vừa tạo không"],
              ["Retry-After", "Cho biết sau bao lâu nên gọi lại (thường đi kèm 429/503)", "Xác nhận giá trị hợp lý, không phải số âm hay 0"],
              ["X-Request-Id", "Mã định danh riêng cho từng request, phục vụ tra log", "Xác nhận mỗi request có id khác nhau, dùng để đối chiếu khi debug"],
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
          Header không chỉ là &quot;thủ tục đính kèm&quot; — nhiều header
          (Content-Type, Authorization) trực tiếp quyết định API xử lý request
          như thế nào. Luôn có ít nhất vài test case dành riêng cho header,
          không gộp chung với test Body.
        </p>
      </div>

      <TermGlossary
        terms={[
          ["Content-Type", "Header khai báo định dạng dữ liệu của Body"],
          ["Bearer token", "Chuỗi token xác thực gửi kèm header Authorization"],
          ["Rate limit", "Giới hạn số lần gọi API trong 1 khoảng thời gian"],
          ["Idempotency key", "Header/khoá client gửi kèm để chống xử lý trùng request"],
        ]}
      />

      <p className="mt-8 text-xs italic text-[color:var(--faint)] leading-relaxed border-t border-[color:var(--line)] pt-4">
        📎 Nội dung do maiqai.com biên soạn dựa trên các header HTTP phổ
        biến, không sao chép nguyên văn từ nguồn nào.
      </p>
    </>
  );
}
