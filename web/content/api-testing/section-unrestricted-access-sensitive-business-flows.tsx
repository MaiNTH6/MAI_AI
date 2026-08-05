import { TermGlossary } from "@/components/TermGlossary";
import { ApiChecklistTable } from "@/components/ApiChecklistTable";

/** Nội dung mục 4.6 — Unrestricted Access to Sensitive Business Flows. */
export function SectionUnrestrictedAccessSensitiveBusinessFlows() {
  return (
    <>
      <div className="badge">🔐 API Testing · Chương 4 · Mục 4.6 · OWASP #6</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Unrestricted Access to Sensitive Business Flows
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          hiểu rủi ro khi 1 luồng nghiệp vụ (không sai kỹ thuật gì cả) bị{" "}
          <strong>tự động hoá lạm dụng</strong> ở quy mô lớn, gây thiệt hại
          thực tế cho doanh nghiệp.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Rủi ro là gì
      </h2>
      <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
        Khác các hạng mục trước (lỗi kỹ thuật), đây là rủi ro ở{" "}
        <strong className="text-[color:var(--ink)]">tầng nghiệp vụ</strong>:
        API hoạt động đúng như thiết kế, nhưng vì không có giới hạn hành vi
        (rate limit theo tài khoản, captcha, phát hiện bot), 1 luồng nhạy
        cảm (mua hàng số lượng giới hạn, áp mã giảm giá, đăng ký khuyến
        mãi...) bị bot khai thác hàng loạt.
      </p>
      <pre className="mt-4 overflow-x-auto rounded-xl bg-[#0b0f16] p-4 text-xs md:text-sm text-emerald-200 ring-1 ring-white/10">
        {`Ví dụ: sản phẩm giới hạn 100 suất giảm giá 90%.
Qua UI web, người dùng thao tác tay → tốc độ tự nhiên, công bằng.
Qua API trực tiếp, 1 bot gọi POST /v1/orders hàng nghìn lần/giây
→ vét sạch 100 suất trong &lt;1 giây, người dùng thật không kịp mua.`}
      </pre>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Checklist kiểm tra
      </h2>
      <ApiChecklistTable
        groups={[
          {
            group: "Cách kiểm tra",
            cases: [
              { id: "TC-FLOW-SEC-01", content: "Gọi API của 1 luồng nhạy cảm (đặt hàng, áp mã giảm giá) liên tục với tốc độ cao từ 1 tài khoản", expected: "Có cơ chế giới hạn theo hành vi (không chỉ theo IP), phát hiện và chặn bất thường" },
              { id: "TC-FLOW-SEC-02", content: "Kiểm tra luồng nhạy cảm có yêu cầu xác thực bổ sung (captcha, xác nhận OTP) khi qua API trực tiếp không, so với luồng qua UI bình thường", expected: "Không được để API 'lỏng lẻo hơn' UI chỉ vì ít người nghĩ tới việc gọi thẳng API" },
            ],
          },
        ]}
      />

      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">📌 Ghi nhớ</h3>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          Câu hỏi cần tự đặt ra khi test hạng mục này:{" "}
          <strong className="text-[color:var(--ink)]">
            &quot;Nếu ai đó viết 1 con bot gọi thẳng API này hàng nghìn lần,
            doanh nghiệp có thiệt hại gì không?&quot;
          </strong>{" "}
          — nếu câu trả lời là có, cần kiểm tra xem đã có giới hạn phù hợp
          chưa.
        </p>
      </div>

      <TermGlossary
        terms={[
          ["Sensitive business flow", "Luồng nghiệp vụ nhạy cảm — có thể gây thiệt hại tài chính/uy tín nếu bị lạm dụng"],
          ["Bot mitigation", "Các biện pháp phát hiện và chặn hành vi tự động hoá bất thường"],
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
