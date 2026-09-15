import { TerminalBlock, ResultBlock } from "@/components/BookBlocks";

/** Nội dung mục 1.2 — Cài VS Code và mở Terminal. */
export function SectionCaiVscodeMoTerminal() {
  return (
    <>
      <div className="badge">🐍 Automation Testing · Chương 1 · Mục 1.2</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Cài VS Code và mở Terminal
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Đây là nơi bạn gõ mọi lệnh trong sách. Tải{" "}
        <strong className="text-[color:var(--ink)]">VS Code</strong> tại
        code.visualstudio.com, cài như phần mềm thường.
      </p>

      <ol className="mt-4 space-y-2.5 text-[color:var(--muted)] leading-relaxed list-decimal pl-5">
        <li>
          Tạo 1 thư mục trống, ví dụ <code>D:\thuc-hanh-python</code>.
        </li>
        <li>
          Mở VS Code → <strong className="text-[color:var(--ink)]">File → Open Folder...</strong>{" "}
          → chọn thư mục đó.
        </li>
        <li>
          Mở terminal: <strong className="text-[color:var(--ink)]">Ctrl + `</strong>{" "}
          (phím dấu huyền, trên phím Tab), hoặc menu{" "}
          <strong className="text-[color:var(--ink)]">Terminal → New Terminal</strong>.
        </li>
      </ol>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Trong terminal, kiểm tra version của Python:
      </p>

      <TerminalBlock cmd="python --version" />
      <ResultBlock text="Python 3.13.7" okLines={[]} />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Thấy số phiên bản (từ 3.10 trở lên) là Python đã sẵn sàng.
      </p>
    </>
  );
}
