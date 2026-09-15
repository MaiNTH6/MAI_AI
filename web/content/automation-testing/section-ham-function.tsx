import { CodeBlock, ExplainTable, ResultBlock } from "@/components/BookBlocks";

/** Nội dung mục 2.1 — Hàm (function). */
export function SectionHamFunction() {
  return (
    <>
      <div className="badge">🧩 Automation Testing · Chương 2 · Mục 2.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Hàm (function)
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Hàm là 1 đoạn code được đặt tên, gói lại để gọi ra dùng nhiều lần.
        Khai báo bằng từ khoá <code>def</code>.
      </p>

      <CodeBlock
        filename="hello2.py"
        code={`def chao_hoi(ten):
    """Tra ve loi chao co ten nguoi dung."""
    return f"Xin chao, {ten}!"

print(chao_hoi("Lan"))
print(chao_hoi("Nam"))`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Giải thích từng dòng lệnh:
      </p>
      <ExplainTable
        headers={["Dòng", "Giải thích", "In ra dòng nào ở Kết quả"]}
        rows={[
          ["def chao_hoi(ten):", "Khai báo hàm tên chao_hoi, nhận vào 1 tham số ten", "—"],
          ['"""..."""', "Docstring — mô tả hàm làm gì", "—"],
          ['return f"..."', 'Trả kết quả về cho nơi gọi hàm. f"..." là f-string — chuỗi cho phép chèn biến trực tiếp bằng {ten}', "—"],
          ['print(chao_hoi("Lan"))', 'Gọi hàm, truyền "Lan" vào tham số ten', "dòng 1"],
          ['print(chao_hoi("Nam"))', 'Gọi hàm, truyền "Nam"', "dòng 2"],
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">Kết quả:</p>
      <ResultBlock
        text={`Xin chao, Lan!
Xin chao, Nam!`}
        okLines={[]}
      />
    </>
  );
}
