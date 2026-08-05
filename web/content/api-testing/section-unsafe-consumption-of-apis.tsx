import { TermGlossary } from "@/components/TermGlossary";
import { ApiChecklistTable } from "@/components/ApiChecklistTable";

/** Nội dung mục 4.10 — Unsafe Consumption of APIs. */
export function SectionUnsafeConsumptionOfApis() {
  return (
    <>
      <div className="badge">🔐 API Testing · Chương 4 · Mục 4.10 · OWASP #10</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Unsafe Consumption of APIs
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          hạng mục cuối, góc nhìn ngược lại 9 mục trước — rủi ro không nằm ở
          API của mình, mà ở cách hệ thống mình{" "}
          <strong>tin tưởng mù quáng</strong> dữ liệu từ service/API bên
          thứ 3 mà không kiểm tra lại.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Rủi ro là gì
      </h2>
      <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
        Nhiều team dồn toàn bộ công sức bảo mật cho API mình cung cấp ra
        ngoài, nhưng lại tin tưởng tuyệt đối dữ liệu nhận về từ service đối
        tác/bên thứ 3 — trong khi service đó cũng có thể bị tấn công, trả về
        dữ liệu sai định dạng, hoặc đơn giản là có bug.
      </p>
      <pre className="mt-4 overflow-x-auto rounded-xl bg-[#0b0f16] p-4 text-xs md:text-sm text-emerald-200 ring-1 ring-white/10">
        {`Order Service gọi Pricing Service (bên đối tác) để lấy giá sản phẩm:
GET https://partner.example.com/price?sku=SKU001
Response: { "price": -50000 }   ← giá âm bất thường

Nếu Order Service lưu thẳng giá trị này vào đơn hàng mà không kiểm tra
lại tính hợp lý (giá phải > 0) → tạo ra đơn hàng có tổng tiền âm.`}
      </pre>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Checklist kiểm tra
      </h2>
      <ApiChecklistTable
        groups={[
          {
            group: "Cách kiểm tra",
            cases: [
              { id: "TC-CONSUME-01", content: "Giả lập service bên thứ 3 trả dữ liệu bất thường (giá âm, field thiếu, sai kiểu dữ liệu)", expected: "Hệ thống của mình validate lại trước khi dùng, không lưu thẳng dữ liệu chưa kiểm chứng vào DB nghiệp vụ chính" },
              { id: "TC-CONSUME-02", content: "Giả lập service bên thứ 3 timeout/không phản hồi — liên kết trực tiếp với Mục 3.2 (test tích hợp giữa các service)", expected: "Có xử lý timeout hợp lý, không để lỗi từ bên ngoài lan thành lỗi hệ thống chính không kiểm soát được" },
              { id: "TC-CONSUME-03", content: "Kiểm tra dữ liệu redirect/link nhận từ service bên thứ 3 trước khi hệ thống mình tự động follow theo", expected: "Không mù quáng tin theo URL từ bên thứ 3 — liên quan tới rủi ro SSRF (Mục 4.8) nếu dữ liệu đó lại được dùng để gọi tiếp ra ngoài" },
            ],
          },
        ]}
      />

      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">📌 Ghi nhớ</h3>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          Nguyên tắc chung: <strong className="text-[color:var(--ink)]">
            đừng tin dữ liệu chỉ vì nó tới từ 1 service &quot;đáng tin
            cậy&quot;
          </strong>{" "}
          — luôn validate dữ liệu nhận từ bên ngoài giống hệt như validate
          dữ liệu nhận từ client (Chương 2), bất kể nguồn gốc.
        </p>
      </div>

      <TermGlossary
        terms={[
          ["Third-party API", "API/service do bên thứ 3 (đối tác, nhà cung cấp) vận hành"],
          ["Trust boundary", "Ranh giới tin cậy — điểm mà dữ liệu chuyển từ hệ thống ngoài sang hệ thống mình, cần validate lại"],
          ["Input validation", "Kiểm tra tính hợp lệ của dữ liệu đầu vào, kể cả khi đầu vào tới từ hệ thống khác"],
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
