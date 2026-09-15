import { CodeBlock, ExplainTable, ResultBlock, ConceptBox } from "@/components/BookBlocks";

/** Nội dung mục 2.4 — JSON, cầu nối giữa Python và API. */
export function SectionJsonCauNoiPythonApi() {
  return (
    <>
      <div className="badge">🧩 Automation Testing · Chương 2 · Mục 2.4</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Làm việc với JSON trong Python
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        JSON là định dạng văn bản trao đổi dữ liệu, gần giống hệt dict Python
        — mọi API (kể cả Restful-Booker từ Chương 7) đều dùng JSON.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Thư viện <code>json</code> có sẵn giúp chuyển qua lại giữa dict và
        JSON. Trước hết là cặp <code>dumps</code>/<code>loads</code> — làm
        việc với <strong className="text-[color:var(--ink)]">chuỗi</strong>{" "}
        JSON, dùng khi gửi dữ liệu lên API hoặc đọc dữ liệu API trả về:
      </p>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[color:var(--bg3)]">
              <th className="border border-[color:var(--line2)] px-3 py-2 text-left font-semibold" />
              <th className="border border-[color:var(--line2)] px-3 py-2 text-left font-semibold">
                <code>json.dumps()</code>
              </th>
              <th className="border border-[color:var(--line2)] px-3 py-2 text-left font-semibold">
                <code>json.loads()</code>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="even:bg-white/[0.04]">
              <td className="border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)] whitespace-nowrap">
                Chiều chuyển
              </td>
              <td className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)]">
                dict → chuỗi JSON
              </td>
              <td className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)]">
                chuỗi JSON → dict
              </td>
            </tr>
            <tr className="even:bg-white/[0.04]">
              <td className="border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)] whitespace-nowrap">
                Nghĩa tên
              </td>
              <td className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)]">
                &quot;dump <strong className="text-[color:var(--ink)]">s</strong>tring&quot; — xuất ra chuỗi
              </td>
              <td className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)]">
                &quot;load <strong className="text-[color:var(--ink)]">s</strong>tring&quot; — nạp từ chuỗi vào
              </td>
            </tr>
            <tr className="even:bg-white/[0.04]">
              <td className="border border-[color:var(--line)] px-3 py-2 align-top font-semibold text-[color:var(--ink)] whitespace-nowrap">
                Dùng khi nào
              </td>
              <td className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)]">
                Chuẩn bị dữ liệu để{" "}
                <strong className="text-[color:var(--ink)]">gửi lên API</strong>
              </td>
              <td className="border border-[color:var(--line)] px-3 py-2 align-top text-[color:var(--muted)]">
                Đọc dữ liệu{" "}
                <strong className="text-[color:var(--ink)]">nhận về</strong> từ
                API
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-[color:var(--faint)] leading-relaxed">
        Cặp <code>json.dump()</code>/<code>json.load()</code>{" "}
        (không có &quot;s&quot;) làm y hệt vậy nhưng với{" "}
        <strong className="text-[color:var(--muted)]">file</strong> thay vì
        chuỗi.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Tạo file <code>json_demo.py</code> — hàm <code>tao_booking</code> chỉ
        để có dict mẫu, dùng lại từ 2.3:
      </p>

      <CodeBlock
        code={`import json


def tao_booking(firstname, lastname, totalprice):
    """Tao 1 dict du lieu booking theo dung cau truc can gui cho API."""
    return {
        "firstname": firstname,
        "lastname": lastname,
        "totalprice": totalprice,
    }


booking_moi = tao_booking("Lan", "Nguyen", 350000)

booking_json = json.dumps(booking_moi)
print(booking_json)

du_lieu = json.loads(booking_json)
print(du_lieu["firstname"])

with open("booking.json", "w") as f:
    json.dump(booking_moi, f)

with open("booking.json", "r") as f:
    du_lieu_doc_lai = json.load(f)

print(du_lieu_doc_lai)`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Giải thích từng dòng lệnh:
      </p>
      <ExplainTable
        headers={["Dòng", "Giải thích", "In ra dòng nào ở Kết quả"]}
        rows={[
          ["import json", "Nạp thư viện json có sẵn trong Python", "—"],
          ["booking_moi = tao_booking(...)", "Tạo dict booking, giống hệt mục 2.3", "—"],
          ["booking_json = json.dumps(booking_moi)", 'Chuyển dict thành chuỗi JSON (dumps = "dump string")', "—"],
          ["print(booking_json)", "In chuỗi JSON vừa tạo", "dòng 1"],
          ["du_lieu = json.loads(booking_json)", 'Chuyển ngược chuỗi JSON thành dict (loads = "load string")', "—"],
          ['print(du_lieu["firstname"])', 'Lấy key "firstname" từ dict vừa chuyển', "dòng 2: Lan"],
          [
            'with open("booking.json", "w") as f:',
            'Mở (hoặc tạo mới) file, chế độ ghi ("w"), gán vào biến f. with tự động đóng file lại sau khi dùng xong (kể cả khi có lỗi) — không cần tự gọi f.close()',
            "—",
          ],
          ["json.dump(booking_moi, f)", 'Ghi dict thẳng vào file dưới dạng JSON (không có "s" — khác dumps trả về chuỗi)', "—"],
          ['with open("booking.json", "r") as f:', 'Mở lại file, chế độ đọc ("r"), cũng tự đóng khi xong', "—"],
          ["du_lieu_doc_lai = json.load(f)", "Đọc file, chuyển thành dict", "—"],
          ["print(du_lieu_doc_lai)", "In dict vừa đọc", "dòng 3"],
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">Kết quả:</p>
      <ResultBlock
        text={`{"firstname": "Lan", "lastname": "Nguyen", "totalprice": 350000}
Lan
{'firstname': 'Lan', 'lastname': 'Nguyen', 'totalprice': 350000}`}
        okLines={[]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Để ý dòng đầu và dòng cuối: dict Python in bằng nháy đơn{" "}
        <code>&apos;...&apos;</code>, còn JSON luôn dùng nháy kép{" "}
        <code>&quot;...&quot;</code> — khác biệt nhỏ này là lý do cần{" "}
        <code>json.dumps</code>/<code>json.loads</code> để chuyển đổi đúng
        chuẩn, thay vì coi 2 thứ là một.
      </p>

      <ConceptBox
        items={[
          <span key="1">
            <strong className="text-[color:var(--ink)]">Hàm (def)</strong>:
            gói code để dùng lại, có thể nhận tham số và <code>return</code>{" "}
            kết quả.
          </span>,
          <span key="2">
            <strong className="text-[color:var(--ink)]">f-string</strong>:
            chuỗi <code>f&quot;...&quot;</code> cho phép chèn biến bằng{" "}
            <code>{"{ten_bien}"}</code>.
          </span>,
          <span key="3">
            <strong className="text-[color:var(--ink)]">List</strong>: danh
            sách có thứ tự, đặt trong <code>[]</code>, duyệt bằng{" "}
            <code>for</code>.
          </span>,
          <span key="4">
            <strong className="text-[color:var(--ink)]">Dict</strong>: dữ
            liệu dạng key: value, đặt trong <code>{"{}"}</code>, lấy giá trị
            bằng <code>dict[&quot;key&quot;]</code>.
          </span>,
          <span key="5">
            <strong className="text-[color:var(--ink)]">JSON</strong>: định
            dạng trao đổi dữ liệu của API. <code>json.dumps</code>/
            <code>json.loads</code> chuyển đổi dict ↔ chuỗi JSON;{" "}
            <code>json.dump</code>/<code>json.load</code> ghi/đọc thẳng ra
            file.
          </span>,
          <span key="6">
            <code>with ... as ...:</code> mở file (hoặc tài nguyên khác) an
            toàn — tự động đóng lại sau khi dùng xong, kể cả khi code bên
            trong bị lỗi giữa chừng.
          </span>,
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Chương sau: cài Playwright, chạy test <code>pytest</code> đầu tiên —
        và bắt đầu dùng chính dự án thật trên GitHub từ đây.
      </p>
    </>
  );
}
