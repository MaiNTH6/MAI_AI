import { CodeBlock, ResultBlock, ConceptBox } from "@/components/BookBlocks";

/** Nội dung mục 9.4 — Đọc lỗi khi gõ sai tên fixture. */
export function SectionDocLoiKhiGoSaiTenFixture() {
  return (
    <>
      <div className="badge">🔁 Automation Testing · Chương 9 · Mục 9.4</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Đọc lỗi khi gõ sai tên fixture
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Vì fixture được &quot;tiêm&quot; vào theo đúng TÊN tham số, gõ sai
        chính tả là lỗi rất hay gặp. Thử đặt tên sai <code>api_kontext</code>{" "}
        thay vì <code>api_context</code>:
      </p>

      <CodeBlock
        code={`def test_go_nham_ten_fixture(api_kontext):
    response = api_kontext.get("/ping")`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Chạy, kết quả (đã lược bớt danh sách fixture có sẵn cho gọn):
      </p>
      <ResultBlock
        text={`E       fixture 'api_kontext' not found
>       available fixtures: ..., api_context, ..., mot_booking_id_co_that, ...
>       use 'pytest --fixtures [testpath]' for help on them.`}
        okLines={[]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        pytest báo rõ tên fixture không tồn tại, kèm liệt kê mọi fixture
        đang có sẵn — thường chỉ cần liếc qua danh sách này là thấy ngay tên
        đúng bị gõ nhầm thành gì.
      </p>

      <ConceptBox
        items={[
          <span key="1">
            <strong className="text-[color:var(--ink)]">Fixture</strong>:
            hàm được <code>pytest</code> tự động cung cấp cho test cần, viết
            1 lần dùng nhiều nơi.
          </span>,
          <span key="2">
            <strong className="text-[color:var(--ink)]">Setup/teardown</strong>:
            phần code trước/sau <code>yield</code> trong fixture — chuẩn bị
            và dọn dẹp tài nguyên.
          </span>,
          <span key="3">
            <code>scope</code>: quyết định fixture được tạo mới bao lâu 1
            lần (<code>&quot;session&quot;</code>/<code>&quot;function&quot;</code>
            ...).
          </span>,
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Đến đây, bạn đã hoàn thành{" "}
        <strong className="text-[color:var(--ink)]">Checkpoint 3</strong> —
        khớp với commit <code>fdf2bde</code> trên GitHub. Chương sau bắt đầu
        Phần 4 — thực chiến đầy đủ với API thật: lập test case và test luồng
        đăng nhập.
      </p>
    </>
  );
}
