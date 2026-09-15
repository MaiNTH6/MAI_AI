import { TerminalBlock, ResultBlock, ExplainTable } from "@/components/BookBlocks";

/** Nội dung mục 10.2 — Gọi thử bằng curl để xác nhận hành vi thật. */
export function SectionGoiThuBangCurl() {
  return (
    <>
      <div className="badge">📋 Automation Testing · Chương 10 · Mục 10.2</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Gọi thử bằng <code>curl</code> để xác nhận hành vi thật
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Tài liệu mô tả API nên hoạt động ra sao, nhưng{" "}
        <strong className="text-[color:var(--ink)]">
          hành vi thật đôi khi khác
        </strong>{" "}
        — cách chắc chắn nhất là tự gọi thử. <code>curl</code> là công cụ
        gọi API từ dòng lệnh, có sẵn trên Windows 10/11, không cần cài
        thêm.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Ví dụ: gọi <code>POST /auth</code> với mật khẩu sai:
      </p>
      <TerminalBlock cmd={`curl -s -X POST https://restful-booker.herokuapp.com/auth -H "Content-Type: application/json" -d "{\\"username\\":\\"admin\\",\\"password\\":\\"sai-mat-khau\\"}"`} />

      <ExplainTable
        headers={["Thành phần", "Ý nghĩa"]}
        rows={[
          ["-s", "Chạy im lặng, không hiện thanh tiến trình tải"],
          ["-X POST", "Gửi phương thức POST"],
          ['-H "Content-Type: application/json"', "Báo cho server biết dữ liệu gửi lên là JSON"],
          ['-d "{...}"', "Nội dung gửi lên (body)"],
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">Kết quả:</p>
      <ResultBlock text='{"reason":"Bad credentials"}' okLines={[]} />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Xem thêm mã trạng thái HTTP thật (curl mặc định không hiện):
      </p>
      <TerminalBlock cmd={`curl -s -o /dev/null -w "HTTP status: %{http_code}\\n" -X POST https://restful-booker.herokuapp.com/auth -H "Content-Type: application/json" -d "{\\"username\\":\\"admin\\",\\"password\\":\\"sai-mat-khau\\"}"`} />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">Kết quả:</p>
      <ResultBlock text="HTTP status: 200" okLines={[]} />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        <strong className="text-[color:var(--ink)]">Phát hiện quan trọng</strong>:
        tài liệu không hề nói rõ điều này — sai mật khẩu vẫn trả về{" "}
        <strong className="text-[color:var(--ink)]">HTTP 200</strong> (không
        phải 401 như trực giác thường nghĩ), chỉ khác ở nội dung body. Nếu
        không tự gọi thử, rất dễ viết test sai (kiểm tra status 401 và
        không bao giờ thấy nó xảy ra).
      </p>
    </>
  );
}
