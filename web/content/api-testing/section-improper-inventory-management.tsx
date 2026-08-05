import { TermGlossary } from "@/components/TermGlossary";
import { ApiChecklistTable } from "@/components/ApiChecklistTable";

/** Nội dung mục 4.7 — Improper Inventory Management. */
export function SectionImproperInventoryManagement() {
  return (
    <>
      <div className="badge">🔐 API Testing · Chương 4 · Mục 4.7 · OWASP #7</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Improper Inventory Management
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          hiểu rủi ro khi tổ chức không nắm rõ hết mình đang có bao nhiêu API,
          phiên bản nào còn chạy — &quot;bạn không thể bảo vệ thứ bạn không
          biết là đang tồn tại&quot;.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Rủi ro là gì
      </h2>
      <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
        Hệ thống phát triển qua nhiều năm thường tích luỹ: API version cũ
        (v1) vẫn chạy song song v2 mới nhưng ít được vá lỗi bảo mật hơn; môi
        trường staging/test vô tình public ra internet; API nội bộ (dùng
        giữa các service) không có tài liệu chính thức nhưng vẫn truy cập
        được từ ngoài nếu biết đúng URL.
      </p>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Checklist kiểm tra
      </h2>
      <ApiChecklistTable
        groups={[
          {
            group: "Cách kiểm tra",
            cases: [
              { id: "TC-INV-01", content: "Rà soát xem các version API cũ hơn (vd /v1/... khi hệ thống đã có /v2/...) có còn hoạt động không", expected: "Version cũ hoặc đã bị tắt hẳn, hoặc được bảo trì/bảo mật tương đương version mới — không bị bỏ quên" },
              { id: "TC-INV-02", content: "Thử truy cập các domain/subdomain môi trường test-staging (vd staging-api.example.com) từ internet công khai", expected: "Không truy cập được từ ngoài, hoặc yêu cầu xác thực riêng — môi trường test không nên public" },
              { id: "TC-INV-03", content: "Rà soát danh sách endpoint thực tế (qua log truy cập, hoặc quét theo pattern) đối chiếu với tài liệu API chính thức", expected: "Không có endpoint nào tồn tại và hoạt động mà không có trong tài liệu/không ai chịu trách nhiệm quản lý" },
            ],
          },
        ]}
      />

      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">📌 Ghi nhớ</h3>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          Đây là hạng mục duy nhất trong 10 hạng mục OWASP không nằm ở 1
          request cụ thể, mà ở{" "}
          <strong className="text-[color:var(--ink)]">việc quản lý tổng thể</strong>{" "}
          — Tester nên định kỳ rà soát lại toàn bộ danh sách API đang chạy,
          không chỉ test API được giao.
        </p>
      </div>

      <TermGlossary
        terms={[
          ["API inventory", "Danh mục toàn bộ API đang tồn tại và hoạt động trong hệ thống"],
          ["Shadow API", "API tồn tại và hoạt động nhưng không được ghi nhận/quản lý chính thức"],
          ["Deprecated version", "Phiên bản API cũ đã ngừng khuyến khích dùng nhưng có thể vẫn còn chạy"],
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
