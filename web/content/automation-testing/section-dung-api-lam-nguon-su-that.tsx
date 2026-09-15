import { CodeBlock, TerminalBlock, ResultBlock } from "@/components/BookBlocks";

/** Nội dung mục 14.2 — Dùng API làm nguồn sự thật. */
export function SectionDungApiLamNguonSuThat() {
  return (
    <>
      <div className="badge">🔗 Automation Testing · Chương 14 · Mục 14.2</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Dùng API làm nguồn sự thật
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Trang chủ hiển thị danh sách phòng (Single/Double/Suite) kèm giá —
        dữ liệu này lấy từ 1 API công khai, không cần đăng nhập. Mở DevTools
        của trình duyệt (F12 → tab Network) khi tải trang chủ, thấy lời gọi:
      </p>

      <CodeBlock lang="plain" code={`GET https://automationintesting.online/api/room`} />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Gọi thử bằng <code>curl</code> (Chương 10) để xem cấu trúc response:
      </p>
      <TerminalBlock cmd="curl -s https://automationintesting.online/api/room" />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Kết quả (rút gọn 1 phòng):
      </p>
      <ResultBlock
        text={`{"rooms":[{"roomName":"101","roomPrice":100,"roomid":1,"type":"Single", ...}]}`}
        okLines={[]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Đây chính là dữ liệu{" "}
        <strong className="text-[color:var(--ink)]">gốc</strong> — Chương
        15 sẽ đối chiếu nó với những gì trang chủ thực sự hiển thị.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Chương sau: viết test đối chiếu UI với API, và 1 phát hiện thú vị
        khác xảy ra ngay trong lúc viết test.
      </p>
    </>
  );
}
