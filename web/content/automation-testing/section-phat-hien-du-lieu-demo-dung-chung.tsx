import { CodeBlock, ExplainTable, TerminalBlock, ResultBlock, ConceptBox } from "@/components/BookBlocks";

/** Nội dung mục 15.3 — Phát hiện: dữ liệu demo công khai dùng chung. */
export function SectionPhatHienDuLieuDemoDungChung() {
  return (
    <>
      <div className="badge">🧵 Automation Testing · Chương 15 · Mục 15.3</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Phát hiện: dữ liệu demo công khai dùng chung
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Lần chạy thử đầu tiên, bài test còn có thêm 1 dòng so{" "}
        <strong className="text-[color:var(--ink)]">tổng số phòng</strong>{" "}
        giữa UI và API:
      </p>
      <CodeBlock code={`expect(the_phong).to_have_count(len(danh_sach_phong_api))  # so tong so the phong UI voi tong so phong API`} />

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Chạy lên bị <strong className="text-[color:var(--ink)]">FAILED</strong>{" "}
        — 2 con số lệch nhau ngay trong cùng 1 lần chạy:
      </p>
      <ExplainTable
        headers={["Nguồn", "Số phòng đếm được"]}
        rows={[
          ["API — gọi lúc bắt đầu test", "4"],
          ["UI — vừa page.goto() xong", "3"],
        ]}
      />

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        <strong className="text-[color:var(--ink)]">Vì sao lệch:</strong>{" "}
        trang demo công khai cho cả thế giới luyện tập — đúng lúc test đang
        chạy, có người khác vừa tạo thêm 1 phòng qua API. Không phải bug ứng
        dụng, mà là rủi ro khi assert trên dữ liệu dùng chung, không kiểm
        soát được.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        <strong className="text-[color:var(--ink)]">Cách sửa:</strong> bỏ
        dòng <code>to_have_count(...)</code>, chỉ giữ{" "}
        <code>expect(the_phong.first).to_be_visible()</code> (chờ có ít
        nhất 1 phòng) — để vòng lặp ở mục 15.2 tự đối chiếu từng phòng đang
        hiển thị, dù lúc đó là 3 hay 4 phòng cũng không sao.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">Chạy:</p>
      <TerminalBlock cmd="pytest tests/test_05_ket_hop_ui_api.py -v" />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">Kết quả:</p>
      <ResultBlock
        text={`tests/test_05_ket_hop_ui_api.py::test_gia_va_ten_phong_tren_trang_chu_khop_voi_api[chromium] PASSED [100%]

============================== 1 passed in 5.79s ==============================`}
        okLines={["PASSED", "passed"]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Đến đây, bạn đã hoàn thành{" "}
        <strong className="text-[color:var(--ink)]">Checkpoint 7</strong> —
        khớp với commit <code>e76c97b</code> trên GitHub.
      </p>

      <ConceptBox
        items={[
          <span key="1">
            <strong className="text-[color:var(--ink)]">
              Dict comprehension
            </strong>
            : <code>{"{key: value for x in list}"}</code> — cách viết gọn
            tạo dict từ 1 list.
          </span>,
          <span key="2">
            <strong className="text-[color:var(--ink)]">Regex</strong> (
            <code>re.search</code>, <code>\d+</code>, <code>.group()</code>
            ): tìm mẫu chữ/số trong 1 chuỗi văn bản.
          </span>,
          <span key="3">
            <strong className="text-[color:var(--ink)]">
              Flaky test do dữ liệu dùng chung
            </strong>
            : khác với bug thật của ứng dụng — cần nhận diện đúng để sửa
            CÁCH TEST, không đi tìm bug không tồn tại.
          </span>,
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Chương sau — chương cuối: xuất báo cáo kết quả test và chạy tự động
        bằng CI.
      </p>
    </>
  );
}
