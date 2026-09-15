import { CodeBlock, ExplainTable, ResultBlock } from "@/components/BookBlocks";

/** Nội dung mục 2.3 — Dict (từ điển) — kiểu dữ liệu quan trọng nhất cho API. */
export function SectionDictTuDien() {
  return (
    <>
      <div className="badge">🧩 Automation Testing · Chương 2 · Mục 2.3</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Dict (từ điển) trong Python
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Dict lưu dữ liệu theo cặp{" "}
        <strong className="text-[color:var(--ink)]">khoá: giá trị</strong>{" "}
        (key: value), đặt trong dấu <code>{"{}"}</code>. Đây là kiểu dữ liệu
        bạn sẽ dùng nhiều nhất từ Chương 7 trở đi, vì mọi dữ liệu API gửi/nhận
        đều có cấu trúc y hệt dict.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Viết 1 hàm trả về dict — mẫu bạn sẽ dùng lại nhiều lần khi soạn dữ
        liệu gửi cho API. Tạo file mới <code>dict_booking.py</code>:
      </p>

      <CodeBlock
        code={`def tao_booking(firstname, lastname, totalprice):
    """Tao 1 dict du lieu booking theo dung cau truc can gui cho API."""
    return {
        "firstname": firstname,
        "lastname": lastname,
        "totalprice": totalprice,
    }


booking_moi = tao_booking("Lan", "Nguyen", 350000)

print(booking_moi)
print(booking_moi["firstname"])
print(booking_moi["totalprice"])`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Giải thích từng dòng lệnh:
      </p>
      <ExplainTable
        headers={["Dòng", "Giải thích", "In ra dòng nào ở Kết quả"]}
        rows={[
          ["return {...}", 'Cú pháp tạo dict: các cặp "key": value, đặt trong {}', "(không in, chỉ trả về)"],
          ["booking_moi = tao_booking(...)", "Gọi hàm, kết quả trả về là 1 dict, gán vào booking_moi", "(không in, chỉ gán)"],
          ["print(booking_moi)", "In cả dict", "dòng 1"],
          ['print(booking_moi["firstname"])', 'Lấy giá trị theo key "firstname"', "dòng 2: Lan"],
          ['print(booking_moi["totalprice"])', 'Lấy giá trị theo key "totalprice"', "dòng 3: 350000"],
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">Kết quả:</p>
      <ResultBlock
        text={`{'firstname': 'Lan', 'lastname': 'Nguyen', 'totalprice': 350000}
Lan
350000`}
        okLines={[]}
      />
    </>
  );
}
