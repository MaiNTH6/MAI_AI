// Bộ khối hiển thị dùng chung cho nội dung chuyển thể từ sách (Automation Testing) —
// mô phỏng lại đúng các khối đã dùng trong bản PDF (FILE/TERMINAL/KẾT QUẢ, bảng
// "Giải thích từng dòng lệnh", box "Khái niệm mới"/ghi chú) bằng Tailwind cho web.

const PY_KEYWORDS = new Set([
  "def", "return", "import", "from", "as", "with", "if", "elif", "else",
  "for", "in", "while", "class", "pass", "break", "continue", "None",
  "True", "False", "and", "or", "not", "is", "lambda", "yield", "raise",
  "try", "except", "finally", "assert", "global", "async", "await",
]);

function highlightPythonLine(line: string, key: number) {
  const tokens: { text: string; cls?: string }[] = [];
  let i = 0;
  while (i < line.length) {
    const rest = line.slice(i);
    const commentMatch = rest.match(/^#.*/);
    if (commentMatch) {
      tokens.push({ text: commentMatch[0], cls: "text-slate-500" });
      break;
    }
    const strMatch = rest.match(/^("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/);
    if (strMatch) {
      tokens.push({ text: strMatch[0], cls: "text-lime-400" });
      i += strMatch[0].length;
      continue;
    }
    const wordMatch = rest.match(/^[A-Za-z_][A-Za-z0-9_]*/);
    if (wordMatch) {
      const w = wordMatch[0];
      const isCall = line[i + w.length] === "(";
      tokens.push({
        text: w,
        cls: PY_KEYWORDS.has(w)
          ? "text-sky-300"
          : isCall
          ? "text-blue-300"
          : undefined,
      });
      i += w.length;
      continue;
    }
    tokens.push({ text: line[i] });
    i += 1;
  }
  return (
    <div key={key}>
      {tokens.length === 0
        ? " "
        : tokens.map((t, idx) => (
            <span key={idx} className={t.cls}>
              {t.text}
            </span>
          ))}
    </div>
  );
}

function CodeLines({ text, lang, okLines }: { text: string; lang?: "python" | "plain"; okLines?: string[] }) {
  const lines = text.replace(/\n$/, "").split("\n");
  return (
    <pre className="m-0 overflow-x-auto whitespace-pre text-[13px] leading-[1.55] font-mono">
      {lines.length === 0 ? (
        " "
      ) : lang === "python" ? (
        lines.map((l, i) => highlightPythonLine(l, i))
      ) : (
        lines.map((l, i) => (
          <div
            key={i}
            className={okLines?.some((ok) => l.includes(ok)) ? "text-emerald-400" : undefined}
          >
            {l === "" ? " " : l}
          </div>
        ))
      )}
    </pre>
  );
}

function BoxLabel({ children, tone }: { children: React.ReactNode; tone: "file" | "terminal" | "result" }) {
  const styles = {
    file: "bg-white/[0.04] text-[color:var(--muted)]",
    terminal: "bg-emerald-500/10 text-emerald-300",
    result: "bg-white/[0.04] text-[color:var(--muted)]",
  }[tone];
  return (
    <div className={`rounded-t-xl px-4 py-2 text-xs font-bold tracking-wide ${styles}`}>
      {children}
    </div>
  );
}

/** Khối "FILE tên_file" + nội dung code (có tô màu cú pháp Python cơ bản). */
export function CodeBlock({ filename, code, lang = "python" }: { filename?: string; code: string; lang?: "python" | "plain" }) {
  return (
    <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-white/10">
      {filename && (
        <BoxLabel tone="file">
          FILE <span className="font-mono font-normal">{filename}</span>
        </BoxLabel>
      )}
      <div className="bg-[#11151d] px-4 py-3 text-slate-200">
        <CodeLines text={code} lang={lang} />
      </div>
    </div>
  );
}

/** Khối "TERMINAL" — lệnh gõ vào terminal. */
export function TerminalBlock({ cmd }: { cmd: string }) {
  return (
    <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-white/10">
      <BoxLabel tone="terminal">TERMINAL</BoxLabel>
      <div className="bg-[#0a0d13] px-4 py-3 text-slate-200">
        <CodeLines text={cmd} lang="plain" />
      </div>
    </div>
  );
}

/** Khối "KẾT QUẢ" — output thật (dòng khớp okLines tô xanh, vd PASSED). */
export function ResultBlock({ text, okLines = ["PASSED", "passed"] }: { text: string; okLines?: string[] }) {
  return (
    <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-white/10">
      <BoxLabel tone="result">KẾT QUẢ</BoxLabel>
      <div className="bg-[#0a0d13] px-4 py-3 text-slate-200">
        <CodeLines text={text} lang="plain" okLines={okLines} />
      </div>
    </div>
  );
}

/** Bảng "Giải thích từng dòng lệnh" — cột trái code (mono), các cột sau văn xuôi. */
export function ExplainTable({
  headers = ["Dòng", "Giải thích"],
  rows,
}: {
  headers?: string[];
  rows: string[][];
}) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-[color:var(--bg3)]">
            {headers.map((h) => (
              <th key={h} className="border border-[color:var(--line2)] px-3 py-2 text-left font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="even:bg-white/[0.04]">
              {r.map((c, j) => (
                <td
                  key={j}
                  className={
                    "border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)]" +
                    (j === 0 ? " font-mono text-[12.5px] text-[color:var(--ink)] whitespace-pre-wrap" : "")
                  }
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Box "Ghi nhớ nhanh" — tóm tắt thuật ngữ mới trong chương. */
export function ConceptBox({ items }: { items: React.ReactNode[] }) {
  return (
    <div className="mt-8 rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] p-5">
      <div className="text-xs font-bold tracking-wide text-amber-300">⚡ GHI NHỚ NHANH</div>
      <ul className="mt-3 space-y-2 text-[color:var(--muted)] leading-relaxed">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-amber-400">–</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Ghi chú nhỏ in nghiêng, viền trái — dùng cho lưu ý ngắn. */
export function NoteBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 border-l-2 border-amber-500/50 bg-white/[0.03] pl-4 py-2 text-[color:var(--muted)] italic leading-relaxed">
      {children}
    </div>
  );
}

/** Box "Tóm tắt chương" — đầu mỗi trang chương/mục. */
export function SummaryBox({ items }: { items: React.ReactNode[] }) {
  return (
    <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5">
      <div className="text-xs font-bold tracking-wide text-[color:var(--metal)]">
        🎯 SAU MỤC NÀY BẠN SẼ
      </div>
      <ul className="mt-3 space-y-2 text-[color:var(--muted)] leading-relaxed">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-[color:var(--metal)]">–</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
