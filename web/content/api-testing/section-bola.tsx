import { TermGlossary } from "@/components/TermGlossary";
import { ApiChecklistTable } from "@/components/ApiChecklistTable";

/** Nội dung mục 4.1 — Broken Object Level Authorization (BOLA/IDOR). */
export function SectionBola() {
  return (
    <>
      <div className="badge">🔐 API Testing · Chương 4 · Mục 4.1 · OWASP #1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Broken Object Level Authorization (BOLA/IDOR)
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          hiểu vì sao đây là hạng mục #1 trong OWASP API Security Top 10 —
          lỗi phổ biến nhất và dễ khai thác nhất trong thực tế.
        </p>
        <p className="m-0 text-[color:var(--muted)]">
          🔗 <strong className="text-[color:var(--ink)]">Liên hệ với Chương 2:</strong>{" "}
          toàn bộ Chương 4 là phần đào sâu của{" "}
          <strong>Nhóm 6 — Bảo mật &amp; phân quyền</strong>{" "}
          trong khung 7 nhóm kịch bản đã học ở Mục 2.1. Nhóm đó chỉ có 1
          dòng gợi ý ngắn; 10 mục của chương này chính là 10 cách cụ thể để
          trả lời câu hỏi &quot;có truy cập/thao tác được dữ liệu của người
          khác không&quot;.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Rủi ro là gì
      </h2>
      <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
        API nhận 1 ID tài nguyên (trên URL, query param, hoặc body) nhưng{" "}
        <strong className="text-[color:var(--ink)]">không kiểm tra người
        gọi có thực sự sở hữu/được phép truy cập đúng tài nguyên đó không</strong>{" "}
        — chỉ kiểm tra &quot;đã đăng nhập&quot; là đủ. Đây chính là khái niệm
        <strong className="text-[color:var(--ink)]"> IDOR</strong> đã nhắc
        tới nhiều lần ở Chương 2 (Mục 2.2, 2.4, 2.5) — giờ formal hoá thành
        1 hạng mục rủi ro riêng.
      </p>

      <pre className="mt-4 overflow-x-auto rounded-xl bg-[#0b0f16] p-4 text-xs md:text-sm text-emerald-200 ring-1 ring-white/10">
        {`# Khách hàng CUS1001 đăng nhập, có token hợp lệ
GET https://api.example.com/v1/orders/ORD1003
Authorization: Bearer <token của CUS1001>

# Đơn hàng ORD1003 thực ra thuộc CUS1002 — nếu server chỉ check
# "token hợp lệ" mà không check "orderId này có thuộc CUS1001 không"
# → CUS1001 vẫn xem được đơn hàng của người khác`}
      </pre>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Checklist kiểm tra
      </h2>
      <ApiChecklistTable
        groups={[
          {
            group: "Cách kiểm tra",
            cases: [
              { id: "TC-BOLA-01", content: "Đổi ID tài nguyên trên URL/path param sang ID không thuộc quyền sở hữu của token đang dùng", expected: "Bị từ chối (403/404), không trả về dữ liệu của người khác" },
              { id: "TC-BOLA-02", content: "Nếu ID là số nguyên tuần tự, thử tăng/giảm dần (ORD1001, ORD1002...) để dò tài nguyên khác", expected: "Mỗi ID không thuộc quyền sở hữu đều bị chặn nhất quán, không lộ dù chỉ 1 phần dữ liệu" },
              { id: "TC-BOLA-03", content: "Kiểm tra ở MỌI hành động, không chỉ GET (bao gồm cả PUT/PATCH/DELETE tới ID của người khác)", expected: "Tất cả hành động ghi/xoá đều bị chặn tương tự, không chỉ riêng đọc dữ liệu" },
            ],
          },
        ]}
      />

      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">📌 Ghi nhớ</h3>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          BOLA là lỗi <strong className="text-[color:var(--ink)]">dễ tìm nhất</strong>{" "}
          (chỉ cần đổi 1 ID trên URL) nhưng cũng{" "}
          <strong className="text-[color:var(--ink)]">hay bị bỏ sót nhất</strong>{" "}
          vì happy-path test luôn dùng đúng ID của chính tài khoản đang test.
          Luôn chủ động test với ID KHÔNG thuộc về mình.
        </p>
      </div>

      <TermGlossary
        terms={[
          ["BOLA", "Broken Object Level Authorization — không kiểm tra quyền sở hữu tài nguyên theo ID"],
          ["IDOR", "Insecure Direct Object Reference — tên gọi khác quen thuộc hơn của BOLA"],
          ["Object ownership", "Quyền sở hữu tài nguyên — xác nhận đúng người dùng đúng dữ liệu của mình"],
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
