import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 3.4 — Test theo môi trường: mock, sandbox, staging. */
export function SectionTestTheoMoiTruong() {
  return (
    <>
      <div className="badge">🔗 API Testing · Chương 3 · Mục 3.4</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Test theo môi trường: mock, sandbox, staging
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          hiểu sự khác biệt giữa các môi trường khi test tích hợp, và rủi ro
          nếu chỉ test ở 1 môi trường duy nhất rồi coi như đã đủ.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        So sánh 3 môi trường thường dùng khi test tích hợp
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Môi trường", "Đặc điểm", "Khi nào dùng", "Rủi ro nếu chỉ test ở đây"].map((h) => (
                <th key={h} className="border border-[color:var(--line2)] px-3 py-2 text-left font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Mock", "Giả lập hoàn toàn service phụ thuộc bằng code/tool riêng", "Test nhanh, không phụ thuộc service ngoài còn hoạt động hay không", "Không phát hiện được lỗi hợp đồng thật (contract mismatch) — mock luôn trả đúng như mình lập trình sẵn"],
              ["Sandbox", "Môi trường thử nghiệm do bên thứ 3 cung cấp (vd cổng thanh toán)", "Test hành vi gần thật của service bên ngoài mà không tốn phí/rủi ro thật", "Có thể có giới hạn (rate limit, dữ liệu giả định) khác với production, dễ tạo cảm giác an toàn giả"],
              ["Staging", "Môi trường nội bộ cấu hình gần giống production nhất", "Test tích hợp toàn diện trước khi release, dùng dữ liệu gần thật", "Chi phí duy trì cao; nếu cấu hình lệch production dù nhỏ vẫn có thể bỏ sót lỗi"],
            ].map((r) => (
              <tr key={r[0]} className="even:bg-white/[0.04]">
                <td className="border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)] whitespace-nowrap">{r[0]}</td>
                <td className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)]">{r[1]}</td>
                <td className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)]">{r[2]}</td>
                <td className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)]">{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Nguyên tắc khi phối hợp cả 3 môi trường
      </h2>
      <div className="mt-4 space-y-3 text-[color:var(--muted)] leading-relaxed">
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">1. Mock cho vòng lặp phát triển nhanh</strong>{" "}
          — chạy hàng chục/hàng trăm lần mỗi ngày trong lúc code, không cần
          chờ service ngoài phản hồi.
        </p>
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">2. Sandbox cho case liên quan bên thứ 3</strong>{" "}
          — xác nhận hành vi thật của cổng thanh toán, dịch vụ vận chuyển...
          trước khi tin vào mock.
        </p>
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">3. Staging cho bộ test quan trọng nhất trước khi release</strong>{" "}
          — không cần chạy lại toàn bộ, nhưng bắt buộc chạy lại các case rủi
          ro cao (thanh toán, luồng đa bước ở Mục 3.1) ở môi trường gần thật
          nhất có thể.
        </p>
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">4. Không bao giờ trộn lẫn cấu hình môi trường</strong>{" "}
          — luôn kiểm tra kỹ URL/credentials đang trỏ đúng môi trường, tránh
          rủi ro gọi nhầm sang production khi đang test.
        </p>
      </div>

      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">📌 Ghi nhớ</h3>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          Test case PASS ở mock{" "}
          <strong className="text-[color:var(--ink)]">không đảm bảo</strong>{" "}
          nó cũng đúng ở sandbox/staging — vì mock luôn phản hồi đúng như
          mình lập trình sẵn, không mô phỏng được lỗi/độ trễ thật. Luôn dành
          ít nhất 1 vòng chạy lại ở môi trường gần thật hơn trước khi release.
        </p>
      </div>

      <TermGlossary
        terms={[
          ["Mock", "Giả lập hành vi của 1 service phụ thuộc, dùng để test không phụ thuộc service thật"],
          ["Sandbox", "Môi trường thử nghiệm do bên thứ 3 cung cấp, mô phỏng gần giống hành vi thật"],
          ["Staging", "Môi trường nội bộ cấu hình gần giống production nhất trước khi release"],
          ["Contract mismatch", "Sai lệch hợp đồng dữ liệu — response thực tế khác với những gì đã thống nhất/mock"],
        ]}
      />

      <p className="mt-8 text-xs italic text-[color:var(--faint)] leading-relaxed border-t border-[color:var(--line)] pt-4">
        📎 Nội dung do maiqai.com biên soạn dựa trên thực hành phổ biến khi
        test tích hợp, không sao chép nguyên văn từ nguồn nào.
      </p>
    </>
  );
}
