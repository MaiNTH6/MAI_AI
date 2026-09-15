import { CodeBlock, TerminalBlock, ResultBlock, ExplainTable, ConceptBox } from "@/components/BookBlocks";

/** Nội dung mục 1.4 — Viết script đầu tiên: biến và kiểu dữ liệu. */
export function SectionVietScriptDauTien() {
  return (
    <>
      <div className="badge">🐍 Automation Testing · Chương 1 · Mục 1.4</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Viết script đầu tiên — biến và kiểu dữ liệu
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Biến (variable) là tên bạn đặt để lưu và dùng lại 1 giá trị. 4 kiểu dữ
        liệu cơ bản:
      </p>

      <ExplainTable
        headers={["Kiểu", "Ý nghĩa", "Ví dụ"]}
        rows={[
          ["str", "Chuỗi văn bản, để trong nháy", '"Lan"'],
          ["int", "Số nguyên", "25"],
          ["float", "Số thực", "1.6"],
          ["bool", "Đúng/sai", "True"],
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Tạo file: chuột phải vào tên thư mục ở Explorer →{" "}
        <strong className="text-[color:var(--ink)]">New File</strong> → gõ{" "}
        <code>hello.py</code>.
      </p>

      <CodeBlock
        filename="hello.py"
        code={`"""Script dau tien - lam quen voi bien va kieu du lieu trong Python."""

ten = "Lan"
tuoi = 25
chieu_cao = 1.6
la_tester = True

print("Ten:", ten)
print("Tuoi:", tuoi)
print("Chieu cao (m):", chieu_cao)
print("La tester:", la_tester)`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Giải thích từng dòng lệnh:
      </p>
      <ExplainTable
        rows={[
          ['"""..."""', "Docstring — mô tả file, không ảnh hưởng khi chạy"],
          ['ten = "Lan"', 'Tạo biến ten kiểu str. Dấu = là gán giá trị, không phải so sánh'],
          ["tuoi = 25", "Biến tuoi kiểu int — không có nháy vì là số"],
          ["chieu_cao = 1.6", "Biến kiểu float"],
          ["la_tester = True", "Biến kiểu bool — True/False viết hoa chữ đầu"],
          ['print("Ten:", ten)', "In ra màn hình; nhiều giá trị cách nhau dấu phẩy"],
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">Chạy:</p>
      <TerminalBlock cmd="python hello.py" />
      <ResultBlock
        text={`Ten: Lan
Tuoi: 25
Chieu cao (m): 1.6
La tester: True`}
        okLines={[]}
      />

      <ConceptBox
        items={[
          <span key="1">
            <strong className="text-[color:var(--ink)]">Biến</strong>: tên
            lưu và tái sử dụng giá trị.
          </span>,
          <span key="2">
            <strong className="text-[color:var(--ink)]">Kiểu dữ liệu</strong>:{" "}
            <code>str</code>, <code>int</code>, <code>float</code>,{" "}
            <code>bool</code>.
          </span>,
          <span key="3">
            <code>print()</code>: in giá trị ra màn hình.
          </span>,
          <span key="4">
            <strong className="text-[color:var(--ink)]">Docstring</strong>:
            mô tả trong <code>&quot;&quot;&quot;...&quot;&quot;&quot;</code>,
            ở đầu file/hàm.
          </span>,
          <span key="5">
            <strong className="text-[color:var(--ink)]">Comment</strong>:
            dòng bắt đầu <code>#</code>, Python bỏ qua khi chạy.
          </span>,
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Chương sau: hàm (function), list/dict, và đọc-ghi{" "}
        <strong className="text-[color:var(--ink)]">JSON</strong> — định dạng
        mọi API trả về.
      </p>
    </>
  );
}
