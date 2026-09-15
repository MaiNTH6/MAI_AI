import { CodeBlock, ExplainTable, TerminalBlock, ResultBlock, ConceptBox } from "@/components/BookBlocks";

/** Nội dung mục 7.4 — Đọc dữ liệu từ response. */
export function SectionDocDuLieuTuResponse() {
  return (
    <>
      <div className="badge">🔌 Automation Testing · Chương 7 · Mục 7.4</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Đọc dữ liệu từ response
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Thêm fixture lấy 1 id booking có thật (vì dữ liệu Restful-Booker tự
        reset định kỳ, không được đoán đại 1 id cố định):
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Tệp <code>tests/conftest.py</code> (thêm bên dưới <code>api_context</code>):
      </p>
      <CodeBlock
        filename="tests/conftest.py"
        code={`@pytest.fixture
def mot_booking_id_co_that(api_context):
    """Lay 1 bookingid dang ton tai that trong he thong.

    KHONG duoc doan dai mot id co dinh (vd id=1) vi du lieu Restful-Booker
    tu dong reset dinh ky, danh sach id con lai thay doi lien tuc.
    """
    response = api_context.get("/booking")
    danh_sach = response.json()
    return danh_sach[0]["bookingid"]`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        <code>response.json()</code> chuyển response (dạng JSON, học ở
        Chương 2) thành list/dict Python để dùng trực tiếp — ở đây{" "}
        <code>/booking</code> trả về 1 list các dict{" "}
        <code>{'{"bookingid": ...}'}</code>, lấy phần tử đầu tiên.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Thêm test dùng fixture này, đọc chi tiết 1 booking:
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Tệp <code>tests/test_02_api_co_ban.py</code> (thêm bên dưới hàm{" "}
        <code>test_ping...</code>):
      </p>
      <CodeBlock
        filename="tests/test_02_api_co_ban.py"
        code={`def test_lay_chi_tiet_1_booking_dung_cau_truc(api_context, mot_booking_id_co_that):
    """GET /booking/{id} voi id co that phai tra ve du cac field theo dung 'hop dong' cua API."""
    response = api_context.get(f"/booking/{mot_booking_id_co_that}")
    expect(response).to_be_ok()

    body = response.json()
    assert "firstname" in body  # co du field firstname
    assert "lastname" in body  # co du field lastname
    assert "totalprice" in body  # co du field totalprice
    assert "bookingdates" in body  # co du field bookingdates
    assert isinstance(body["totalprice"], (int, float))  # totalprice dung kieu so, khong phai chuoi`}
      />

      <ExplainTable
        rows={[
          ["f\"/booking/{mot_booking_id_co_that}\"", "f-string (Chương 2) ghép id thật vào đường dẫn"],
          ["body = response.json()", "Chuyển response thành dict"],
          [
            'assert "firstname" in body',
            "assert thường của Python — kiểm tra dict có đúng field mong đợi, không cần web-first assertion vì đây không phải giao diện có độ trễ render",
          ],
          [
            'isinstance(body["totalprice"], (int, float))',
            "Kiểm tra kiểu dữ liệu đúng là số, không phải chuỗi",
          ],
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Chạy toàn bộ file:
      </p>
      <TerminalBlock cmd="pytest tests/test_02_api_co_ban.py -v" />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">Kết quả:</p>
      <ResultBlock
        text={`tests/test_02_api_co_ban.py::test_ping_xac_nhan_api_con_song PASSED      [ 50%]
tests/test_02_api_co_ban.py::test_lay_chi_tiet_1_booking_dung_cau_truc PASSED [100%]

============================== 2 passed in 2.96s ==============================`}
        okLines={["PASSED", "passed"]}
      />

      <ConceptBox
        items={[
          <span key="1">
            <code>APIRequestContext</code>: gửi thẳng HTTP request, không cần
            mở trình duyệt — nhanh hơn <code>Page</code>.
          </span>,
          <span key="2">
            <code>base_url</code>: địa chỉ gốc gán sẵn cho context, các lệnh
            gọi sau chỉ cần ghi đường dẫn ngắn.
          </span>,
          <span key="3">
            <code>conftest.py</code>: file đặc biệt chứa fixture dùng chung,
            pytest tự nhận diện không cần <code>import</code>.
          </span>,
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Chương sau: <code>expect(response)</code> — các cách kiểm tra
        response hay dùng.
      </p>
    </>
  );
}
