import { TermGlossary } from "@/components/TermGlossary";
import { ApiChecklistTable } from "@/components/ApiChecklistTable";

/** Nội dung mục 5.3 — Race condition & lost update. */
export function SectionRaceConditionLostUpdate() {
  return (
    <>
      <div className="badge">⚡ API Testing · Chương 5 · Mục 5.3</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Race condition &amp; lost update
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          hiểu vì sao 2 request &quot;đúng logic&quot; khi test riêng lẻ vẫn
          có thể gây sai kết quả nếu chạy đồng thời — loại lỗi khó phát hiện
          nhất vì không xảy ra ổn định mỗi lần test.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Ví dụ minh hoạ: lost update khi trừ tồn kho
      </h2>
      <pre className="mt-4 overflow-x-auto rounded-xl bg-[#0b0f16] p-4 text-xs md:text-sm text-emerald-200 ring-1 ring-white/10">
        {`Tồn kho SKU001 hiện còn: 1

Request A (t=0ms): đọc tồn kho → thấy 1 → cho phép đặt hàng → ghi tồn kho = 0
Request B (t=1ms): đọc tồn kho → thấy 1 (A CHƯA KỊP GHI XONG) → cho phép đặt hàng → ghi tồn kho = 0

Kết quả: CẢ 2 request đều "đặt hàng thành công" dù chỉ còn đúng 1 sản phẩm
→ bán vượt tồn kho (oversell), tồn kho cuối cùng bị sai (đáng lẽ phải là -1
nhưng lại hiển thị 0, một request bị "mất" hoàn toàn — đây là lost update).`}
      </pre>
      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Đây là hệ quả trực tiếp của việc thiếu kiểm soát khi nhiều request
        cùng đọc-sửa-ghi (read-modify-write) trên cùng 1 dữ liệu — đúng chủ
        đề &quot;đồng thời&quot; đã nhắc ở test GET/PUT (Chương 2) nhưng giờ
        xét ở góc độ hiệu năng/tải cao.
      </p>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Checklist kiểm tra
      </h2>
      <ApiChecklistTable
        groups={[
          {
            group: "Cách kiểm tra",
            cases: [
              { id: "TC-RACE-01", content: "Gửi đồng thời N request (vd 20 request cùng lúc) vào cùng 1 tài nguyên có giới hạn số lượng (vd chỉ còn 1 tồn kho)", expected: "Tổng số request được xử lý 'thành công' không được vượt quá giới hạn thực tế (chỉ đúng 1 trong N request thắng)" },
              { id: "TC-RACE-02", content: "Kiểm tra cơ chế khoá dữ liệu (locking) hoặc kiểm soát phiên bản (optimistic concurrency, vd version field) có được áp dụng ở thao tác ghi quan trọng không", expected: "Có cơ chế rõ ràng ngăn 2 request ghi đè lên nhau mất dữ liệu" },
              { id: "TC-RACE-03", content: "Chạy lại cùng 1 kịch bản race condition nhiều lần (vd 10 lượt)", expected: "Kết quả nhất quán ở mọi lượt chạy — nếu lúc đúng lúc sai, đây là dấu hiệu rõ ràng của race condition chưa được xử lý" },
            ],
          },
        ]}
      />

      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">📌 Ghi nhớ</h3>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          Test race condition <strong className="text-[color:var(--ink)]">không thể chỉ chạy 1 lần</strong>{" "}
          — vì bản chất phụ thuộc vào thời điểm (timing) của các request, cần
          chạy lặp lại nhiều lượt để tăng khả năng &quot;bắt được&quot; lỗi,
          giống hệt nguyên tắc đã áp dụng ở test đồng thời của GET/PUT.
        </p>
      </div>

      <TermGlossary
        terms={[
          ["Race condition", "Điều kiện tranh chấp — kết quả phụ thuộc vào thứ tự/thời điểm thực thi không kiểm soát được"],
          ["Lost update", "Cập nhật bị mất — 1 thay đổi bị ghi đè mất do 2 request cùng đọc-sửa-ghi chồng lên nhau"],
          ["Optimistic concurrency", "Kiểm soát tương tranh lạc quan — dùng version/timestamp để phát hiện xung đột khi ghi"],
          ["Oversell", "Bán vượt tồn kho — hệ quả kinh doanh thực tế của lost update trong quản lý kho"],
        ]}
      />

      <p className="mt-8 text-xs italic text-[color:var(--faint)] leading-relaxed border-t border-[color:var(--line)] pt-4">
        📎 Nội dung do maiqai.com biên soạn — ví dụ minh hoạ, không thuộc hệ
        thống thật nào.
      </p>
    </>
  );
}
