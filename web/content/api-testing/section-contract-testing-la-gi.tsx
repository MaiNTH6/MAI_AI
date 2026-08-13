import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 6.1 — Contract testing là gì, khác gì Integration testing. */
export function SectionContractTestingLaGi() {
  return (
    <>
      <div className="badge">📜 API Testing · Chương 6 · Mục 6.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Contract testing là gì, khác gì Integration testing
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          hiểu vì sao khảo sát ngành xếp contract testing vào nhóm ít được
          dùng nhất (17%) dù được đánh giá là khoảng trống quan trọng — và
          khi nào nó thực sự cần thiết.
        </p>
        <p className="m-0 text-[color:var(--muted)]">
          🔗 <strong className="text-[color:var(--ink)]">Liên hệ với Chương 2:</strong>{" "}
          Chương 6 là phần mở rộng có hệ thống của{" "}
          <strong>Nhóm 7 — Response contract</strong>{" "}
          trong khung Mục 2.1. Ở Chương 2, kiểm tra contract chỉ là 1 case
          đơn lẻ trong checklist (vd &quot;response đúng cấu trúc
          không&quot;); Chương 6 biến việc đó thành 1 quy trình tự động hoá
          lặp lại được cho toàn bộ API, thay vì kiểm tra thủ công từng lần.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Contract testing là gì
      </h2>
      <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
        Contract testing kiểm tra <strong className="text-[color:var(--ink)]">
        &quot;hợp đồng&quot;</strong> — cấu trúc request/response đã thống
        nhất — giữa bên tiêu thụ API (consumer) và bên cung cấp API
        (provider), <strong className="text-[color:var(--ink)]">mà không
        cần chạy cả 2 hệ thống cùng lúc</strong>. Đây chính là điểm khác biệt
        cốt lõi so với Integration testing (Chương 3), vốn luôn cần cả 2 phía
        chạy thật để test.
      </p>

      <div className="mt-5 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">
          💡 Hiểu &quot;hợp đồng&quot; bằng ví dụ cụ thể
        </h3>
        <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
          Hãy hình dung đội Frontend và đội Backend cùng ngồi thống nhất
          trước: khi gọi <code className="text-emerald-300">GET
          /v1/orders/&#123;orderId&#125;</code>, response sẽ luôn có đúng các
          field này, đúng kiểu này. Bản thống nhất đó — thường được viết ra
          thành 1 file schema (OpenAPI/Swagger, hoặc file Pact) — chính là
          &quot;hợp đồng&quot;:
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xl bg-[#0b0f16] p-4 text-xs md:text-sm text-emerald-200 ring-1 ring-white/10">
          {`// "Hợp đồng" cho GET /v1/orders/{orderId} — cả 2 đội cùng đồng ý
{
  "orderId": "string",       // bắt buộc có
  "customerId": "string",    // bắt buộc có
  "status": "PAID | PENDING | CANCELLED",  // chỉ 1 trong 3 giá trị này
  "total": "number"          // bắt buộc là số, không phải chuỗi "350000"
}`}
        </pre>
        <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
          Từ bản hợp đồng này, mỗi bên tự kiểm tra phần của mình{" "}
          <strong className="text-[color:var(--ink)]">tách rời nhau, không
          cần chạy cùng lúc</strong>:
        </p>
        <ul className="mt-3 space-y-2 text-[color:var(--muted)] leading-relaxed list-disc pl-5">
          <li>
            <strong className="text-[color:var(--ink)]">Phía Consumer</strong>{" "}
            (frontend, hoặc service khác gọi API này): viết test khẳng định
            &quot;tôi trông đợi response đúng như hợp đồng&quot; — chạy được
            ngay cả khi Backend chưa code xong, vì không gọi API thật.
          </li>
          <li>
            <strong className="text-[color:var(--ink)]">Phía Provider</strong>{" "}
            (backend cung cấp API): sau khi code xong, tự gọi API thật của
            mình 1 lần rồi so response thực tế với đúng hợp đồng đó — nếu
            sau này backend lỡ đổi <code>total</code> từ số thành chuỗi, hoặc
            đổi tên field, test sẽ báo đỏ ngay lập tức.
          </li>
        </ul>
        <p className="mt-4 mb-0 text-[color:var(--muted)] leading-relaxed">
          Cả hai không cần đứng chờ nhau chạy chung một lúc — chỉ cần cùng
          nhìn vào một bản hợp đồng làm &quot;trọng tài&quot;. Đây là lý do
          contract test chạy nhanh như unit test (Tầng 1 — Chương 7), trong
          khi Integration testing (Chương 3) bắt buộc phải khởi động cả 2 hệ
          thống thật rồi mới gọi thử được.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        So sánh Contract testing vs. Integration testing
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              {["Tiêu chí", "Contract testing", "Integration testing"].map((h) => (
                <th key={h} className="border border-[color:var(--line2)] px-3 py-2 text-left font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Cần chạy cả 2 hệ thống?", "Không — chỉ cần bản mô tả hợp đồng (schema/spec)", "Có — cả consumer và provider phải chạy thật"],
              ["Tốc độ chạy", "Nhanh, có thể chạy như unit test (Tầng 1 — Chương 7)", "Chậm hơn, cần môi trường đầy đủ (Tầng 2 — Chương 7)"],
              ["Phát hiện lỗi gì", "Sai cấu trúc dữ liệu, thiếu field, sai kiểu — lỗi 'hợp đồng'", "Lỗi hành vi thực tế: timeout, rollback, dữ liệu tham chiếu sai (Chương 3)"],
              ["Phát hiện sớm tới đâu", "Ngay khi provider đổi API, trước khi merge/deploy", "Chỉ phát hiện khi cả 2 hệ thống thực sự chạy cùng nhau"],
            ].map((r) => (
              <tr key={r[0]} className="even:bg-white/[0.04]">
                <td className="border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)]">{r[0]}</td>
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
          Contract testing không thay thế Integration testing — 2 loại{" "}
          <strong className="text-[color:var(--ink)]">bổ sung cho nhau</strong>
          : contract testing bắt lỗi &quot;sai cấu trúc&quot; sớm và rẻ,
          integration testing bắt lỗi &quot;sai hành vi&quot; toàn diện hơn
          nhưng tốn kém hơn.
        </p>
      </div>

      <TermGlossary
        terms={[
          ["Contract", "Hợp đồng — cấu trúc request/response đã thống nhất giữa 2 hệ thống"],
          ["Consumer", "Bên tiêu thụ API — hệ thống gọi API của bên khác"],
          ["Provider", "Bên cung cấp API — hệ thống cung cấp API cho bên khác gọi"],
        ]}
      />

      <p className="mt-8 text-xs italic text-[color:var(--faint)] leading-relaxed border-t border-[color:var(--line)] pt-4">
        📎 Nội dung do maiqai.com biên soạn dựa trên thực hành phổ biến về
        contract testing, không sao chép nguyên văn từ nguồn nào.
      </p>
    </>
  );
}
