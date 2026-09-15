import { CodeBlock, ResultBlock } from "@/components/BookBlocks";

/** Nội dung mục 3.2 — Vì sao dùng pytest. */
export function SectionViSaoDungPytest() {
  return (
    <>
      <div className="badge">🧪 Automation Testing · Chương 3 · Mục 3.2</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Vì sao dùng <code>pytest</code>
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Ở Chương 1-2, muốn biết code đúng hay sai, bạn phải tự nhìn output rồi
        so sánh bằng mắt:
      </p>

      <CodeBlock
        code={`def chao_hoi(ten):
    """Tra ve loi chao co ten nguoi dung."""
    return f"Xin chao, {ten}!"


ket_qua = chao_hoi("Lan")
print(ket_qua)`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Chạy ra <code>Xin chao, Lan!</code> — bạn tự đọc, tự đối chiếu xem
        đúng chưa. Với vài dòng thì ổn, nhưng hàng trăm bài kiểm tra thì không
        ai rảnh ngồi đọc từng dòng để so sánh bằng mắt.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        <code>pytest</code> giải quyết bằng <code>assert</code> — viết thẳng
        điều kiện đúng phải là gì, không cần <code>print()</code> rồi tự nhìn:
      </p>

      <CodeBlock
        code={`def chao_hoi(ten):
    """Tra ve loi chao co ten nguoi dung."""
    return f"Xin chao, {ten}!"


def test_chao_hoi():
    assert chao_hoi("Lan") == "Xin chao, Lan!"  # kiem tra ham tra dung chuoi mong doi`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Chạy <code>pytest</code>, kết quả tự động:
      </p>
      <ResultBlock text="PASSED" okLines={["PASSED"]} />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Nếu code sai (ví dụ hàm trả nhầm nội dung), <code>pytest</code> tự báo{" "}
        <code>FAILED</code> kèm lý do rõ ràng — không cần tự dò tìm chỗ sai.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Ngoài ra <code>pytest</code> còn tự tìm mọi file <code>test_*.py</code>{" "}
        và hàm <code>test_*</code> để chạy, không cần tự gọi từng hàm, và
        chạy được hàng trăm test cùng lúc.
      </p>
    </>
  );
}
