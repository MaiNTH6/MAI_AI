import { CodeBlock } from "@/components/BookBlocks";

/** Nội dung mục 6.1 — assert thường vs expect(). */
export function SectionAssertThuongVsExpect() {
  return (
    <>
      <div className="badge">✅ Automation Testing · Chương 6 · Mục 6.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Phân biệt <code>assert</code> và <code>expect</code>
      </h1>

      <CodeBlock
        code={`# Cach 1: assert thuong - kiem tra dung ngay thoi diem goi
assert page.get_by_text("Thanks for getting in touch Nguyen Van A!").is_visible()

# Cach 2: expect() - tu cho toi khi dieu kien dung, trong gioi han thoi gian
expect(page.get_by_text("Thanks for getting in touch Nguyen Van A!")).to_be_visible()`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Cách 1 kiểm tra <strong className="text-[color:var(--ink)]">ngay lập tức</strong>:
        vừa bấm Submit xong, dòng chữ cảm ơn có thể chưa kịp hiển thị (chỉ
        chậm vài chục mili giây do trang xử lý) — <code>assert</code> kiểm
        tra đúng lúc đó sẽ báo sai, dù thực ra chỉ là chưa kịp render.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Cách 2 (<code>expect</code>) tự kiểm tra lại liên tục trong 1 khoảng
        thời gian giới hạn (mặc định 5 giây), tới khi đúng hoặc hết giờ mới
        báo lỗi thật. Đây gọi là{" "}
        <strong className="text-[color:var(--ink)]">web-first assertion</strong>{" "}
        — thiết kế riêng cho việc kiểm tra trên web, nơi giao diện luôn có độ
        trễ cập nhật.
      </p>
    </>
  );
}
