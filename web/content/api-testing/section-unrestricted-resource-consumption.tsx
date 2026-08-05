import { TermGlossary } from "@/components/TermGlossary";
import { ApiChecklistTable } from "@/components/ApiChecklistTable";

/** Nội dung mục 4.4 — Unrestricted Resource Consumption. */
export function SectionUnrestrictedResourceConsumption() {
  return (
    <>
      <div className="badge">🔐 API Testing · Chương 4 · Mục 4.4 · OWASP #4</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Unrestricted Resource Consumption
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          hiểu vì sao thiếu giới hạn (rate limit, kích thước dữ liệu) khiến
          API dễ bị lạm dụng, gây tốn tài nguyên hoặc từ chối dịch vụ
          (DoS) — trước đây gọi là &quot;Lack of Resources &amp; Rate
          Limiting&quot;.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Rủi ro là gì
      </h2>
      <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
        API không giới hạn: số lần gọi trong 1 khoảng thời gian, kích thước
        payload gửi lên, số lượng bản ghi trả về (limit phân trang). Kẻ tấn
        công (hoặc đơn giản là 1 client lỗi) có thể khai thác để làm chậm
        hoặc sập hệ thống, hay kéo toàn bộ dữ liệu chỉ bằng 1 request.
      </p>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Checklist kiểm tra
      </h2>
      <ApiChecklistTable
        groups={[
          {
            group: "Rate limiting",
            cases: [
              { id: "TC-URC-01", content: "Gọi liên tục cùng 1 API hàng trăm lần trong vài giây", expected: "Sau ngưỡng nhất định, API trả 429 Too Many Requests kèm header Retry-After, không cho gọi vô hạn" },
            ],
          },
          {
            group: "Giới hạn kích thước dữ liệu",
            cases: [
              { id: "TC-URC-02", content: "Gửi body request cực lớn (vd vài MB text trong 1 field)", expected: "Bị từ chối với lỗi rõ ràng (413 Payload Too Large), không làm treo server" },
              { id: "TC-URC-03", content: "Gửi limit phân trang cực lớn (vd limit=999999) như đã đề cập ở Mục 2.2", expected: "Server tự giới hạn ở mức tối đa hợp lý (vd 100), không trả toàn bộ dữ liệu trong 1 lần" },
            ],
          },
        ]}
      />

      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">📌 Ghi nhớ</h3>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          Đây là hạng mục liên kết trực tiếp với{" "}
          <strong className="text-[color:var(--ink)]">Chương 5 (Performance Testing)</strong>{" "}
          — Load/Stress test không chỉ đo &quot;hệ thống chịu được bao nhiêu
          tải&quot; mà còn phải xác nhận có cơ chế TỪ CHỐI hợp lý khi vượt
          ngưỡng, thay vì cứ cố xử lý tới khi sập.
        </p>
      </div>

      <TermGlossary
        terms={[
          ["Rate limiting", "Giới hạn tần suất gọi API trong 1 khoảng thời gian"],
          ["429 Too Many Requests", "Status code chuẩn khi client vượt quá giới hạn tần suất"],
          ["DoS (Denial of Service)", "Từ chối dịch vụ — hệ thống không thể phục vụ do bị quá tải"],
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
