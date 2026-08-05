import { TermGlossary } from "@/components/TermGlossary";
import { ApiChecklistTable } from "@/components/ApiChecklistTable";

/** Nội dung mục 6.2 — Validate theo đặc tả OpenAPI/Swagger. */
export function SectionValidateTheoOpenapiSwagger() {
  return (
    <>
      <div className="badge">📜 API Testing · Chương 6 · Mục 6.2</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Validate theo đặc tả OpenAPI/Swagger
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          biết cách dùng đặc tả OpenAPI (Swagger) có sẵn để tự động kiểm tra
          request/response có đúng &quot;hợp đồng&quot; đã khai báo hay
          không, thay vì đọc tài liệu rồi so sánh bằng mắt.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        OpenAPI là gì
      </h2>
      <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
        OpenAPI (trước đây gọi là Swagger) là 1 định dạng chuẩn (thường viết
        bằng YAML/JSON) để mô tả API: có những endpoint nào, mỗi endpoint
        nhận tham số gì, response trả về cấu trúc ra sao. Vì đây là định
        dạng máy đọc được, có thể dùng tool tự động validate response thật
        khớp với đặc tả.
      </p>
      <pre className="mt-4 overflow-x-auto rounded-xl bg-[#0b0f16] p-4 text-xs md:text-sm text-emerald-200 ring-1 ring-white/10">
        {`# Trích đoạn OpenAPI mô tả response của GET /v1/orders/{orderId}
responses:
  '200':
    content:
      application/json:
        schema:
          type: object
          required: [orderId, customerId, status, total]
          properties:
            orderId: { type: string }
            customerId: { type: string }
            status: { type: string, enum: [PENDING, PAID, CANCELLED] }
            total: { type: number, minimum: 0 }`}
      </pre>
      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Với schema này, 1 tool validate tự động sẽ báo lỗi ngay nếu response
        thật thiếu field <code>total</code>, hoặc trả <code>status</code>{" "}
        với giá trị ngoài 3 giá trị enum đã khai báo, hoặc <code>total</code>{" "}
        là số âm.
      </p>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Checklist kiểm tra
      </h2>
      <ApiChecklistTable
        groups={[
          {
            group: "Cách kiểm tra",
            cases: [
              { id: "TC-OAS-01", content: "Chạy tool validate response thực tế (vd thư viện openapi-validator hoặc plugin Postman/Schemathesis) đối chiếu với file OpenAPI đã khai báo", expected: "Response khớp đúng schema: đủ field bắt buộc, đúng kiểu dữ liệu, giá trị enum hợp lệ" },
              { id: "TC-OAS-02", content: "Khi dev đổi cấu trúc response (thêm/bớt/đổi tên field) mà quên cập nhật file OpenAPI", expected: "Có bước kiểm tra tự động phát hiện được sự sai lệch này (breaking change), không để phát hiện muộn khi consumer đã bị lỗi" },
              { id: "TC-OAS-03", content: "Kiểm tra file OpenAPI có được đưa vào quy trình review/cập nhật mỗi khi API thay đổi không", expected: "File đặc tả luôn phản ánh đúng hành vi thật — đặc tả lỗi thời còn nguy hiểm hơn không có đặc tả" },
            ],
          },
        ]}
      />

      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">📌 Ghi nhớ</h3>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          Validate theo OpenAPI chỉ có giá trị nếu file đặc tả{" "}
          <strong className="text-[color:var(--ink)]">luôn được cập nhật đúng thực tế</strong>{" "}
          — nếu không, việc validate chỉ đang xác nhận API khớp với 1 tài
          liệu đã lỗi thời, không còn ý nghĩa.
        </p>
      </div>

      <TermGlossary
        terms={[
          ["OpenAPI", "Đặc tả chuẩn (trước đây gọi Swagger) mô tả cấu trúc API dưới dạng máy đọc được"],
          ["Schema", "Cấu trúc dữ liệu được định nghĩa — kiểu, field bắt buộc, ràng buộc giá trị"],
          ["Breaking change", "Thay đổi API làm hỏng khả năng tương thích với consumer đang dùng"],
        ]}
      />

      <p className="mt-8 text-xs italic text-[color:var(--faint)] leading-relaxed border-t border-[color:var(--line)] pt-4">
        📎 Nội dung do maiqai.com biên soạn — ví dụ minh hoạ, không thuộc hệ
        thống thật nào.
      </p>
    </>
  );
}
