import { TermGlossary } from "@/components/TermGlossary";
import { ApiChecklistTable } from "@/components/ApiChecklistTable";

/** Nội dung mục 4.2 — Broken Authentication. */
export function SectionBrokenAuthentication() {
  return (
    <>
      <div className="badge">🔐 API Testing · Chương 4 · Mục 4.2 · OWASP #2</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Broken Authentication
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          hiểu các điểm yếu thường gặp trong cơ chế xác thực (đăng nhập, cấp
          token, đặt lại mật khẩu) — khác với BOLA (kiểm tra quyền trên từng
          tài nguyên), đây là lỗi ở chính bước xác định &quot;bạn là ai&quot;.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Rủi ro là gì
      </h2>
      <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
        Cơ chế xác thực yếu ở bất kỳ khâu nào cũng làm sập toàn bộ hệ thống
        phân quyền phía sau — vì mọi kiểm tra quyền (BOLA, BFLA...) đều dựa
        trên giả định &quot;token/session này đúng là của người dùng đó&quot;.
        Vài dạng phổ biến: token không có hạn dùng, đăng nhập không giới hạn
        số lần thử sai, endpoint đặt lại mật khẩu không xác thực đủ chặt.
      </p>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Checklist kiểm tra
      </h2>
      <ApiChecklistTable
        groups={[
          {
            group: "Cách kiểm tra",
            cases: [
              { id: "TC-AUTH-01", content: "Kiểm tra token có hạn sử dụng rõ ràng không (JWT có claim exp, hoặc session có thời gian hết hạn phía server)", expected: "Token/session hết hạn sau khoảng thời gian hợp lý, không dùng được vĩnh viễn" },
              { id: "TC-AUTH-02", content: "Đăng nhập sai mật khẩu liên tục 20-30 lần cho cùng 1 tài khoản", expected: "Tài khoản bị khoá tạm thời hoặc yêu cầu xác thực thêm (captcha), không cho brute-force vô hạn" },
              { id: "TC-AUTH-03", content: "Với JWT: thử sửa payload (vd đổi userId) rồi gửi lại mà không ký lại chữ ký", expected: "Server phải từ chối do chữ ký không khớp — nếu vẫn chấp nhận là lỗi nghiêm trọng" },
              { id: "TC-AUTH-04", content: "Endpoint quên mật khẩu/đặt lại mật khẩu: kiểm tra mã OTP/link có giới hạn số lần thử và thời gian hết hạn không", expected: "Mã/link chỉ dùng được 1 lần, hết hạn sau thời gian ngắn, giới hạn số lần nhập sai" },
            ],
          },
        ]}
      />

      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">📌 Ghi nhớ</h3>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          Test authentication không chỉ là &quot;đăng nhập đúng thì vào
          được&quot; — trọng tâm thực sự là test các{" "}
          <strong className="text-[color:var(--ink)]">đường vòng</strong>{" "}
          (brute-force, token giả mạo, quên giới hạn OTP) mà một luồng đăng
          nhập &quot;nhìn có vẻ ổn&quot; vẫn có thể mắc phải.
        </p>
      </div>

      <TermGlossary
        terms={[
          ["JWT", "JSON Web Token — định dạng token phổ biến, gồm header/payload/chữ ký"],
          ["Brute-force", "Tấn công dò mật khẩu bằng cách thử liên tục nhiều lần"],
          ["Token expiration", "Thời hạn sử dụng của token trước khi bị coi là không hợp lệ"],
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
