import { TerminalBlock, CodeBlock, ExplainTable } from "@/components/BookBlocks";

/** Nội dung mục 16.2 — Nâng cấp: báo cáo trực quan hơn với Allure Report. */
export function SectionNangCapAllureReport() {
  return (
    <>
      <div className="badge">📊 Automation Testing · Chương 16 · Mục 16.2</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Nâng cấp: báo cáo trực quan hơn với Allure Report
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        <code>pytest-html</code> đủ dùng cơ bản, nhưng nếu muốn báo cáo đẹp
        và trực quan hơn — biểu đồ tổng quan, phân loại theo tính năng,
        dòng thời gian chạy test — dùng{" "}
        <strong className="text-[color:var(--ink)]">Allure Report</strong>,
        công cụ báo cáo rất phổ biến trong ngành kiểm thử. Đánh đổi: cần
        cài thêm 2 công cụ ngoài Python.
      </p>

      <h3 className="mt-8 text-base font-bold text-[color:var(--ink)]">
        a) Kiểm tra Java
      </h3>
      <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
        Allure command-line cần Java để chạy (bản thân Allure viết bằng
        Java, không phải Python).
      </p>
      <TerminalBlock cmd="java -version" />
      <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
        Nếu đã thấy số phiên bản là dùng được ngay, không cần cài gì thêm.
        Nếu chưa có, tải Java tại{" "}
        <strong className="text-[color:var(--ink)]">adoptium.net</strong>,
        chọn bản JRE (Java Runtime Environment) LTS mới nhất, cài như phần
        mềm bình thường.
      </p>

      <h3 className="mt-8 text-base font-bold text-[color:var(--ink)]">
        b) Cài thư viện <code>allure-pytest</code>
      </h3>
      <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
        Thêm vào <code>requirements.txt</code>:
      </p>
      <CodeBlock lang="plain" code={`allure-pytest==2.16.0`} />
      <TerminalBlock cmd="pip install -r requirements.txt" />

      <h3 className="mt-8 text-base font-bold text-[color:var(--ink)]">
        c) Cài công cụ dòng lệnh Allure
      </h3>
      <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
        Tải bản mới nhất tại{" "}
        <strong className="text-[color:var(--ink)]">
          github.com/allure-framework/allure2/releases
        </strong>{" "}
        (file <code>allure-x.x.x.zip</code> — sách kiểm thử với bản
        2.18.1). Giải nén vào 1 thư mục cố định, ví dụ <code>C:\allure</code>,
        rồi thêm thư mục con <code>bin</code> bên trong (vd{" "}
        <code>C:\allure\allure-2.18.1\bin</code>) vào biến môi trường{" "}
        <code>PATH</code> — vào Windows Settings, tìm &quot;Edit environment
        variables&quot;, thêm đường dẫn đó vào mục <code>Path</code>.
      </p>
      <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
        Kiểm tra đã cài đúng:
      </p>
      <TerminalBlock cmd="allure --version" />

      <h3 className="mt-8 text-base font-bold text-[color:var(--ink)]">
        Xuất và xem báo cáo
      </h3>
      <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
        Khác <code>pytest-html</code> xuất thẳng 1 file HTML, Allure tách 2
        bước: xuất dữ liệu{" "}
        <strong className="text-[color:var(--ink)]">thô</strong> trước, rồi
        mới dựng thành báo cáo xem được.
      </p>
      <TerminalBlock cmd="pytest --alluredir=allure-results" />
      <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
        <code>--alluredir=allure-results</code> lưu kết quả thô (nhiều file
        JSON) vào thư mục đó — chưa phải trang xem được.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Dựng báo cáo từ dữ liệu thô, rồi mở:
      </p>
      <TerminalBlock
        cmd={`allure generate allure-results -o allure-report --clean
allure open allure-report`}
      />

      <ExplainTable
        headers={["Thành phần", "Ý nghĩa"]}
        rows={[
          [
            "allure generate allure-results -o allure-report",
            "Dựng báo cáo HTML từ dữ liệu thô, xuất vào thư mục allure-report",
          ],
          ["--clean", "Xoá báo cáo cũ trước khi dựng lại, tránh lẫn kết quả cũ"],
          [
            "allure open allure-report",
            "Mở báo cáo bằng 1 server nhỏ tự chạy — Allure cần tải dữ liệu qua mạng nội bộ nên không mở trực tiếp file HTML bằng trình duyệt được như pytest-html",
          ],
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Kết quả thật khi mở: trang tổng quan hiện{" "}
        <strong className="text-[color:var(--ink)]">
          23 test cases, 100%
        </strong>{" "}
        thành công, cùng các tab Overview/Suites/Graphs/Timeline/Behaviors ở
        menu bên trái — mỗi tab 1 góc nhìn khác nhau về cùng bộ kết quả, bấm
        vào 1 test cụ thể xem được log từng bước.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Thêm <code>allure-results/</code> và <code>allure-report/</code>{" "}
        vào <code>.gitignore</code> — đây là kết quả sinh ra mỗi lần chạy,
        không phải mã nguồn, không commit vào repo.
      </p>
    </>
  );
}
