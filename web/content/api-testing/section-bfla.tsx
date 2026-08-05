import { TermGlossary } from "@/components/TermGlossary";
import { ApiChecklistTable } from "@/components/ApiChecklistTable";

/** Nội dung mục 4.9 — Broken Function Level Authorization (BFLA). */
export function SectionBfla() {
  return (
    <>
      <div className="badge">🔐 API Testing · Chương 4 · Mục 4.9 · OWASP #9</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Broken Function Level Authorization (BFLA)
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          phân biệt rõ với BOLA (Mục 4.1) — BOLA kiểm tra quyền theo{" "}
          <em>từng tài nguyên cụ thể</em>, còn BFLA kiểm tra quyền theo{" "}
          <em>chức năng/vai trò (role)</em>.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Rủi ro là gì
      </h2>
      <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
        Hệ thống có các API chỉ dành cho vai trò cao hơn (admin, nhân viên
        vận hành...) nhưng server chỉ kiểm tra &quot;đã đăng nhập hợp lệ
        chưa&quot; mà quên kiểm tra &quot;đúng vai trò được phép gọi chức
        năng này không&quot;. Kết quả: user thường vẫn gọi được API dành
        riêng cho admin nếu biết đúng endpoint.
      </p>
      <pre className="mt-4 overflow-x-auto rounded-xl bg-[#0b0f16] p-4 text-xs md:text-sm text-emerald-200 ring-1 ring-white/10">
        {`DELETE /v1/orders/ORD1003
Authorization: Bearer <token của user thường, role = "customer">

# Theo tài liệu, chức năng xoá đơn hàng chỉ dành cho role "admin".
# Nếu server chỉ check "token hợp lệ" mà quên check role
# → user thường vẫn xoá được đơn hàng, vượt quyền được cấp.`}
      </pre>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Checklist kiểm tra
      </h2>
      <ApiChecklistTable
        groups={[
          {
            group: "Cách kiểm tra",
            cases: [
              { id: "TC-BFLA-01", content: "Dùng token của user role thấp gọi thử API dành riêng cho role cao hơn (theo tài liệu phân quyền)", expected: "Bị từ chối (403 Forbidden), không thực hiện được hành động vượt quyền" },
              { id: "TC-BFLA-02", content: "Rà soát toàn bộ API quản trị (tạo/sửa/xoá dữ liệu nhạy cảm), liệt kê đúng role nào được phép gọi", expected: "Mọi API quản trị đều có kiểm tra role rõ ràng, không có API nào 'lọt lưới'" },
              { id: "TC-BFLA-03", content: "Kiểm tra API ẩn (không hiển thị trên UI của role thấp nhưng vẫn tồn tại ở tầng API)", expected: "Việc ẩn ở UI không thay thế được kiểm tra quyền ở tầng API — API vẫn phải tự chặn dù UI không cho bấm" },
            ],
          },
        ]}
      />

      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">📌 Ghi nhớ</h3>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          &quot;UI không hiển thị nút đó cho user thường&quot; hoàn toàn{" "}
          <strong className="text-[color:var(--ink)]">không phải bằng chứng</strong>{" "}
          API đã chặn đúng — phân quyền phải kiểm chứng trực tiếp ở tầng API,
          không tin vào việc ẩn trên giao diện.
        </p>
      </div>

      <TermGlossary
        terms={[
          ["BFLA", "Broken Function Level Authorization — thiếu kiểm tra quyền theo vai trò/chức năng"],
          ["Role-based access control (RBAC)", "Kiểm soát truy cập dựa trên vai trò người dùng"],
          ["Privilege escalation", "Leo thang đặc quyền — thực hiện được hành động vượt quá quyền được cấp"],
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
