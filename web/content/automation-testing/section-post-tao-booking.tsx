import { CodeBlock, ResultBlock } from "@/components/BookBlocks";

/** Nội dung mục 12.2 — POST: tạo booking, và 2 phát hiện thật. */
export function SectionPostTaoBooking() {
  return (
    <>
      <div className="badge">🗂️ Automation Testing · Chương 12 · Mục 12.2</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        POST — tạo booking, và 2 phát hiện thật
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Thêm vào cuối file:
      </p>

      <CodeBlock
        filename="tests/test_04_crud_booking.py"
        code={`def test_post_01_tao_booking_hop_le(api_context):
    """POST-01: tao booking du field, khong can token -> HTTP 200, tra ve bookingid + dung du lieu da gui."""
    du_lieu = {
        "firstname": "Nguyen",
        "lastname": "Van A",
        "totalprice": 350000,
        "depositpaid": True,
        "bookingdates": {"checkin": "2026-10-01", "checkout": "2026-10-05"},
    }
    response = api_context.post("/booking", data=du_lieu)
    assert response.status == 200  # tao thanh cong
    body = response.json()
    assert "bookingid" in body  # phai tra ve id booking moi
    assert body["booking"]["firstname"] == "Nguyen"  # du lieu tra ve dung nhu da gui
    assert body["booking"]["totalprice"] == 350000  # gia tri so dung nhu da gui


def test_post_02_thieu_field_bat_buoc(api_context):
    """GOC SOI LOI (POST-02): thieu han firstname -> khong bao loi validate ro rang ma
    trả ve HTTP 500 Internal Server Error. API khong xu ly graceful cho du lieu thieu."""
    du_lieu = {
        "lastname": "User",
        "totalprice": 100,
        "depositpaid": True,
        "bookingdates": {"checkin": "2026-09-01", "checkout": "2026-09-05"},
    }
    response = api_context.post("/booking", data=du_lieu)
    assert response.status == 500  # xac nhan API loi 500 khi thieu field bat buoc


def test_post_03_totalprice_sai_kieu_du_lieu(api_context):
    """GOC SOI LOI (POST-03): gui totalprice la chuoi "mot-tram" thay vi so ->
    API KHONG tu choi (van 200) ma am tham luu totalprice thanh null. Day la loi
    thieu validate kieu du lieu, de gay sai lech du lieu that neu khong test truoc."""
    du_lieu = {
        "firstname": "Test",
        "lastname": "User",
        "totalprice": "mot-tram",
        "depositpaid": True,
        "bookingdates": {"checkin": "2026-09-01", "checkout": "2026-09-05"},
    }
    response = api_context.post("/booking", data=du_lieu)
    assert response.status == 200  # API van chap nhan, khong tu choi
    assert response.json()["booking"]["totalprice"] is None  # gia tri sai kieu bi luu thanh null`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        2 phát hiện thật khi tự gọi thử trước khi viết test (không có trong
        tài liệu):
      </p>
      <ul className="mt-3 space-y-2 text-[color:var(--muted)] leading-relaxed">
        <li className="flex gap-2">
          <span className="text-[color:var(--faint)]">–</span>
          <span>
            <strong className="text-[color:var(--ink)]">POST-02</strong>:
            thiếu field bắt buộc <code>firstname</code> → API trả{" "}
            <strong className="text-[color:var(--ink)]">HTTP 500</strong>{" "}
            (Internal Server Error), không phải lỗi validate rõ ràng như
            mong đợi.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="text-[color:var(--faint)]">–</span>
          <span>
            <strong className="text-[color:var(--ink)]">POST-03</strong>:
            gửi <code>totalprice</code> sai kiểu (chuỗi thay vì số) → API{" "}
            <strong className="text-[color:var(--ink)]">
              không từ chối
            </strong>
            , vẫn trả 200 nhưng âm thầm lưu field đó thành{" "}
            <code>null</code>.
          </span>
        </li>
      </ul>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Cả 2 đều là ví dụ thật về lỗi thiếu validate dữ liệu đầu vào — loại
        lỗi rất đáng tìm khi kiểm thử API.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">Kết quả:</p>
      <ResultBlock
        text={`tests/test_04_crud_booking.py::test_post_01_tao_booking_hop_le PASSED
tests/test_04_crud_booking.py::test_post_02_thieu_field_bat_buoc PASSED
tests/test_04_crud_booking.py::test_post_03_totalprice_sai_kieu_du_lieu PASSED

======================= 3 passed in 2.19s =======================`}
        okLines={["PASSED", "passed"]}
      />
    </>
  );
}
