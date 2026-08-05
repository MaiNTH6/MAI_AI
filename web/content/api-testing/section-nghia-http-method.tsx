import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 2.1 — Ngữ nghĩa HTTP Method: Idempotent, Safe, Side-effect. */
export function SectionNguNghiaHttpMethod() {
  return (
    <>
      <div className="badge">🧭 API Testing · Chương 2 · Mục 2.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Ngữ nghĩa HTTP Method: Idempotent, Safe, Side-effect
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          hiểu 3 khái niệm nền quyết định cách test một API —{" "}
          <strong>Safe</strong> (an toàn), <strong>Idempotent</strong> (bất
          biến khi lặp) và <strong>Side-effect</strong> (tác dụng phụ ngoài ý
          muốn) — trước khi liệt kê bất kỳ test case cụ thể nào.
        </p>
        <p className="m-0 text-[color:var(--muted)]">
          💡 <strong className="text-[color:var(--ink)]">Ý cốt lõi:</strong>{" "}
          HTTP method không đơn thuần là &quot;cách gọi API&quot; — mỗi loại
          mang một cam kết riêng theo chuẩn REST. Test đúng theo cam kết này
          giúp phát hiện đúng loại lỗi thường gặp trong thực tế, thay vì chỉ
          dừng ở &quot;API có chạy không&quot;.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        5 loại HTTP Method và cam kết ngữ nghĩa
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Method", "Safe? (không đổi dữ liệu)", "Idempotent? (gọi nhiều lần = 1 lần)", "Thường có body?"].map(
                (h) => (
                  <th
                    key={h}
                    className="border border-[color:var(--line2)] px-3 py-2 text-left font-semibold"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {[
              ["GET", "Có", "Có", "Không"],
              ["POST", "Không", "Không", "Có"],
              ["PUT", "Không", "Có", "Có"],
              ["PATCH", "Không", "Không (theo chuẩn)", "Có"],
              ["DELETE", "Không", "Có", "Tuỳ hệ thống"],
            ].map((r) => (
              <tr key={r[0]} className="even:bg-white/[0.04]">
                {r.map((c, ci) => (
                  <td
                    key={ci}
                    className={
                      ci === 0
                        ? "border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)]"
                        : "border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)]"
                    }
                  >
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Khung 7 nhóm kịch bản — dùng để tự suy ra checklist đầy đủ cho bất kỳ API nào
      </h2>
      <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
        Thay vì nhớ từng ví dụ test case rời rạc, hãy nhớ 7 nhóm kịch bản
        dưới đây — với bất kỳ API nào (không riêng ví dụ trong bài), lần lượt
        đi qua từng nhóm sẽ giúp checklist bao phủ đầy đủ thay vì bỏ sót theo
        cảm tính. 4 mục tiếp theo (2.2–2.5) đều tổ chức checklist theo đúng 7
        nhóm này.
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["#", "Nhóm kịch bản", "Câu hỏi cần tự đặt ra"].map((h) => (
                <th key={h} className="border border-[color:var(--line2)] px-3 py-2 text-left font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["1", "Happy path", "Với dữ liệu hợp lệ, đúng luồng, kết quả có đúng như mong đợi không?"],
              ["2", "Dữ liệu bắt buộc", "Field/tham số bắt buộc mà thiếu, rỗng, hoặc null thì sao?"],
              ["3", "Định dạng & kiểu dữ liệu", "Sai kiểu (số thay chuỗi...), sai định dạng, vượt biên độ dài thì sao?"],
              ["4", "Quy tắc nghiệp vụ & dữ liệu tham chiếu", "Tham chiếu tới dữ liệu không tồn tại, hoặc vi phạm ràng buộc nghiệp vụ thì sao?"],
              ["5", "Đặc thù ngữ nghĩa của method đó", "Có đúng safe/idempotent như cam kết ở bảng trên không? (xem riêng từng method)"],
              ["6", "Bảo mật & phân quyền", "Có truy cập/thao tác được dữ liệu của người khác không? Có injection được không?"],
              ["7", "Response contract", "Status code, header, cấu trúc body trả về có đúng chuẩn đã thống nhất không?"],
            ].map((r) => (
              <tr key={r[0]} className="even:bg-white/[0.04]">
                <td className="border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)]">{r[0]}</td>
                <td className="border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)] whitespace-nowrap">{r[1]}</td>
                <td className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)]">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">
          📌 Ghi nhớ
        </h3>
        <div className="mt-3 space-y-2 text-[color:var(--ink)] leading-relaxed">
          <p className="m-0">
            <strong className="text-[color:var(--metal)]">Safe</strong> = gọi
            không làm thay đổi dữ liệu (chỉ GET/HEAD)
          </p>
          <p className="m-0">
            <strong className="text-[color:var(--metal)]">Idempotent</strong>{" "}
            = gọi nhiều lần cho cùng 1 kết quả cuối (GET, PUT, DELETE — không
            gồm POST)
          </p>
        </div>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          <strong className="text-[color:var(--ink)]">Với tester:</strong>{" "}
          trước khi test bất kỳ API nào, xác định đúng method và đối chiếu
          hành vi thật của hệ thống với bảng trên — nếu lệch, đó tự thân đã là
          một phát hiện đáng báo lại cho dev.
        </p>
      </div>

      <TermGlossary
        terms={[
          ["Safe method", "Phương thức an toàn — không gây thay đổi dữ liệu phía server"],
          ["Idempotent", "Bất biến khi lặp — gọi nhiều lần cho cùng 1 kết quả cuối"],
          ["Side-effect", "Tác dụng phụ — thay đổi ngoài ý muốn xảy ra khi gọi API"],
          ["Resource", "Tài nguyên — đối tượng dữ liệu mà API thao tác lên (vd 1 đơn hàng)"],
          ["REST", "Representational State Transfer — kiểu kiến trúc API phổ biến dựa trên HTTP method"],
        ]}
      />

      <p className="mt-8 text-xs italic text-[color:var(--faint)] leading-relaxed border-t border-[color:var(--line)] pt-4">
        📎 Nội dung do maiqai.com biên soạn dựa trên nguyên tắc REST phổ biến
        (tham khảo tinh thần RFC 7231/RFC 9110) và kinh nghiệm test API thực
        tế — không phải chương trình chứng chỉ chính thức.
      </p>
    </>
  );
}
