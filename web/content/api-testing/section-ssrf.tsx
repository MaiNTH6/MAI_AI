import { TermGlossary } from "@/components/TermGlossary";
import { ApiChecklistTable } from "@/components/ApiChecklistTable";

/** Nội dung mục 4.8 — Server-Side Request Forgery (SSRF). */
export function SectionSsrf() {
  return (
    <>
      <div className="badge">🔐 API Testing · Chương 4 · Mục 4.8 · OWASP #8</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Server-Side Request Forgery (SSRF)
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          hiểu rủi ro khi API nhận 1 URL/địa chỉ từ client rồi tự gọi tới đó
          ở phía server — kẻ tấn công có thể lợi dụng để &quot;mượn&quot;
          server làm bàn đạp truy cập tài nguyên nội bộ.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Rủi ro là gì
      </h2>
      <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
        Nhiều API có tính năng nhận URL từ client (webhook, tải ảnh từ link,
        xem trước liên kết...) rồi server tự gọi HTTP request tới URL đó.
        Nếu không kiểm soát, kẻ tấn công đưa vào URL nội bộ (localhost, IP
        private, hoặc endpoint metadata của nhà cung cấp cloud) để server vô
        tình truy cập tài nguyên đáng lẽ không thể truy cập từ bên ngoài.
      </p>
      <pre className="mt-4 overflow-x-auto rounded-xl bg-[#0b0f16] p-4 text-xs md:text-sm text-emerald-200 ring-1 ring-white/10">
        {`POST /v1/webhooks/validate
Body: { "callbackUrl": "https://doi-tac.com/hook" }   ← trường hợp bình thường

Body: { "callbackUrl": "http://169.254.169.254/latest/meta-data/" }
   ← địa chỉ metadata nội bộ của nhà cung cấp cloud — nếu server tự GET
     tới đây, có thể lộ thông tin/quyền truy cập nội bộ nhạy cảm`}
      </pre>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Checklist kiểm tra
      </h2>
      <ApiChecklistTable
        groups={[
          {
            group: "Cách kiểm tra",
            cases: [
              { id: "TC-SSRF-01", content: "Với mọi field nhận URL từ client, thử đưa vào địa chỉ nội bộ (localhost, 127.0.0.1, địa chỉ IP private 10.x/172.16.x/192.168.x)", expected: "Bị từ chối, không cho server gọi tới địa chỉ nội bộ" },
              { id: "TC-SSRF-02", content: "Thử đưa vào địa chỉ metadata service của nhà cung cấp cloud (nếu biết hệ thống host ở đâu)", expected: "Bị chặn — đây là mục tiêu tấn công SSRF phổ biến và nguy hiểm nhất" },
              { id: "TC-SSRF-03", content: "Thử redirect: URL hợp lệ ban đầu nhưng chuyển hướng (301/302) sang địa chỉ nội bộ", expected: "Server không tự động theo redirect tới địa chỉ nội bộ" },
            ],
          },
        ]}
      />

      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">📌 Ghi nhớ</h3>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          SSRF chỉ xuất hiện ở những API có tính năng{" "}
          <strong className="text-[color:var(--ink)]">
            &quot;nhận URL từ client và tự gọi tới đó&quot;
          </strong>{" "}
          — không phải API nào cũng có rủi ro này, nhưng cần rà soát kỹ mọi
          field nhận URL/link/callback trong toàn bộ hệ thống.
        </p>
      </div>

      <TermGlossary
        terms={[
          ["SSRF", "Server-Side Request Forgery — server bị lợi dụng để gọi request tới địa chỉ ngoài ý muốn"],
          ["Metadata service", "Dịch vụ nội bộ của nhà cung cấp cloud chứa thông tin cấu hình/quyền truy cập của máy chủ"],
          ["Private IP range", "Dải địa chỉ IP nội bộ (10.x, 172.16.x, 192.168.x) không nên truy cập được từ bên ngoài"],
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
