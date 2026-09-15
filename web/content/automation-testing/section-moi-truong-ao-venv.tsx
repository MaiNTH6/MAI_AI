import { TerminalBlock, ResultBlock, ExplainTable, NoteBox } from "@/components/BookBlocks";

/** Nội dung mục 1.3 — Vì sao cần "môi trường ảo" (venv). */
export function SectionMoiTruongAoVenv() {
  return (
    <>
      <div className="badge">🐍 Automation Testing · Chương 1 · Mục 1.3</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Cài đặt môi trường ảo (venv)
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Mỗi dự án Python nên có một &quot;hộp&quot; thư viện riêng, tách biệt
        với Python hệ thống và các dự án khác — tránh dự án này cần bản thư
        viện cũ, dự án kia cần bản mới, cài chung sẽ giẫm chân nhau.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Đứng trong thư mục dự án (đã mở ở VS Code), tạo venv:
      </p>
      <TerminalBlock cmd="python -m venv .venv" />

      <ExplainTable
        headers={["Thành phần", "Ý nghĩa"]}
        rows={[
          ["-m venv", "Chạy module có sẵn venv — công cụ tạo môi trường ảo"],
          [".venv", "Tên thư mục chứa môi trường ảo"],
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Lệnh này chạy xong không in ra dòng chữ nào — đó là bình thường, không
        phải lỗi. Mở khung Explorer bên trái VS Code, thấy thư mục{" "}
        <code>.venv</code> mới xuất hiện trong dự án là đã tạo thành công.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Kích hoạt (làm lại mỗi khi mở terminal mới):
      </p>
      <TerminalBlock cmd=".venv\Scripts\activate" />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Thành công khi đầu dòng lệnh có thêm <code>(.venv)</code>:
      </p>
      <ResultBlock text="(.venv) PS D:\thuc-hanh-python>" okLines={[]} />

      <NoteBox>
        Nếu báo lỗi <code>running scripts is disabled on this system</code>:
        PowerShell đang chặn chạy script vì lý do bảo mật (mặc định trên
        nhiều máy Windows). Gõ 1 lần để nới lỏng:
      </NoteBox>
      <TerminalBlock cmd="Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned" />

      <ul className="mt-4 space-y-2 text-[color:var(--muted)] leading-relaxed">
        <li className="flex gap-2">
          <span className="text-[color:var(--faint)]">–</span>
          <span>
            <code>-Scope CurrentUser</code>: chỉ nới cho riêng tài khoản
            Windows đang dùng (không đụng tới máy tính chung), nên không cần
            quyền quản trị.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-[color:var(--faint)]">–</span>
          <span>
            <code>-ExecutionPolicy RemoteSigned</code>: cho phép chạy script
            tự tạo trên máy (như <code>activate</code>), còn script tải từ
            nơi khác vẫn phải có chữ ký tin cậy mới chạy được — không mở toang
            mọi thứ.
          </span>
        </li>
      </ul>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Gõ <code>Y</code> xác nhận, rồi thử <code>activate</code> lại.
      </p>
    </>
  );
}
