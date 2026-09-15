import { CodeBlock, ExplainTable, ResultBlock } from "@/components/BookBlocks";

/** Nội dung mục 2.2 — List (danh sách) và vòng lặp for. */
export function SectionListVongLapFor() {
  return (
    <>
      <div className="badge">🧩 Automation Testing · Chương 2 · Mục 2.2</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        List (danh sách) và vòng lặp <code>for</code>
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        List lưu nhiều giá trị theo thứ tự, đặt trong dấu <code>[]</code>.
        Dùng vòng lặp <code>for</code> để lần lượt xử lý từng phần tử.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Sửa lại toàn bộ nội dung file <code>hello2.py</code> thành (giữ hàm{" "}
        <code>chao_hoi</code>, thay 2 dòng <code>print</code> cuối bằng đoạn
        list + <code>for</code>):
      </p>

      <CodeBlock
        code={`def chao_hoi(ten):
    """Tra ve loi chao co ten nguoi dung."""
    return f"Xin chao, {ten}!"

danh_sach_ten = ["Lan", "Nam", "Hoa"]

for ten in danh_sach_ten:
    print(chao_hoi(ten))`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Giải thích từng dòng lệnh:
      </p>
      <ExplainTable
        rows={[
          ["danh_sach_ten = [...]", "Tạo list gồm 3 chuỗi"],
          ["for ten in danh_sach_ten:", "Lặp qua từng phần tử, mỗi lần gán vào biến ten"],
          [
            "print(chao_hoi(ten))",
            "Gọi lại hàm ở mục 2.1 cho từng tên — chạy 3 lần vì list có 3 phần tử, tương ứng 3 dòng ở Kết quả",
          ],
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">Kết quả:</p>
      <ResultBlock
        text={`Xin chao, Lan!
Xin chao, Nam!
Xin chao, Hoa!`}
        okLines={[]}
      />
    </>
  );
}
