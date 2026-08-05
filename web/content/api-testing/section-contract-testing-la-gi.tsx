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
