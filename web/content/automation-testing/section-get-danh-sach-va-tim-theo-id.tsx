import { CodeBlock, ResultBlock } from "@/components/BookBlocks";

/** Nội dung mục 12.1 — GET: danh sách và tìm theo id. */
export function SectionGetDanhSachVaTimTheoId() {
  return (
    <>
      <div className="badge">🗂️ Automation Testing · Chương 12 · Mục 12.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        GET — danh sách và tìm theo id
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Tạo file <code>tests/test_04_crud_booking.py</code>.
      </p>

      <CodeBlock
        filename="tests/test_04_crud_booking.py"
        code={`"""Bo test CRUD day du cho /booking - theo bang test case o docs/test-cases-restful-booker.md.

GET-03 (GET /booking/{id} dung cau truc) da co san o tests/test_02_api_co_ban.py,
khong lap lai o day.
"""


def test_get_01_danh_sach_booking(api_context):
    """GET-01: GET /booking khong tham so -> HTTP 200, tra ve mang cac {bookingid}."""
    response = api_context.get("/booking")
    assert response.status == 200  # goi thanh cong
    body = response.json()
    assert isinstance(body, list)  # ket qua phai la 1 danh sach
    assert len(body) > 0  # danh sach khong duoc rong
    assert "bookingid" in body[0]  # moi phan tu phai co field bookingid


def test_get_02_loc_theo_ten(api_context, booking_tao_moi):
    """GET-02: GET /booking?firstname=..&lastname=.. -> chi tra ve id khop bo loc."""
    bookingid, du_lieu = booking_tao_moi  # tach 2 gia tri fixture tra ve: id va du lieu goc
    response = api_context.get(
        "/booking",
        params={"firstname": du_lieu["firstname"], "lastname": du_lieu["lastname"]},  # loc theo ten qua query string
    )
    assert response.status == 200  # goi thanh cong
    ids_tra_ve = [item["bookingid"] for item in response.json()]  # lay list bookingid tu ket qua tra ve
    assert bookingid in ids_tra_ve  # id vua tao phai nam trong ket qua loc


def test_get_04_id_khong_ton_tai(api_context):
    """GET-04: GET /booking/{id} voi id chac chan khong ton tai -> HTTP 404."""
    response = api_context.get("/booking/999999999")
    assert response.status == 404  # id khong ton tai phai tra 404`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        <code>test_get_02_loc_theo_ten</code> dùng fixture{" "}
        <code>booking_tao_moi</code> — thêm vào <code>conftest.py</code>{" "}
        trước khi chạy được:
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Tệp <code>tests/conftest.py</code> (thêm bên dưới các fixture đã
        có):
      </p>
      <CodeBlock
        filename="tests/conftest.py"
        code={`@pytest.fixture
def booking_tao_moi(api_context):
    """Tao rieng 1 booking moi cho tung test can PUT/PATCH/DELETE.

    Khong dung chung id voi test khac de tranh 1 test xoa mat du lieu
    ma test kia dang can.
    """
    du_lieu = {
        "firstname": "Test",
        "lastname": "User",
        "totalprice": 100,
        "depositpaid": True,
        "bookingdates": {"checkin": "2026-09-01", "checkout": "2026-09-05"},
        "additionalneeds": "Breakfast",
    }
    response = api_context.post("/booking", data=du_lieu)
    bookingid = response.json()["bookingid"]  # lay id vua duoc tao ra
    return bookingid, du_lieu  # goi 2 gia tri thanh 1 tuple de tra ve cung luc`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Fixture trả về 1 <strong className="text-[color:var(--ink)]">tuple</strong>{" "}
        <code>(bookingid, du_lieu)</code> — 2 giá trị gói chung, lấy ra bằng
        cách gán <code>bookingid, du_lieu = booking_tao_moi</code> như trong
        test.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">Kết quả:</p>
      <ResultBlock
        text={`tests/test_04_crud_booking.py::test_get_01_danh_sach_booking PASSED
tests/test_04_crud_booking.py::test_get_02_loc_theo_ten PASSED
tests/test_04_crud_booking.py::test_get_04_id_khong_ton_tai PASSED

======================= 3 passed in 2.78s =======================`}
        okLines={["PASSED", "passed"]}
      />
    </>
  );
}
