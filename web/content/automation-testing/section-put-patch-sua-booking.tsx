import { CodeBlock, ResultBlock } from "@/components/BookBlocks";

/** Nội dung mục 12.3 — PUT/PATCH: sửa booking, cần token. */
export function SectionPutPatchSuaBooking() {
  return (
    <>
      <div className="badge">🗂️ Automation Testing · Chương 12 · Mục 12.3</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        PUT/PATCH — sửa booking, cần token
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Thêm vào cuối file:
      </p>

      <CodeBlock
        filename="tests/test_04_crud_booking.py"
        code={`def test_put_01_sua_booking_co_token(api_context, auth_token, booking_tao_moi):
    """PUT-01: sua toan bo booking, co token hop le (Cookie: token=..) -> HTTP 200, du lieu duoc cap nhat dung."""
    bookingid, _ = booking_tao_moi  # chi can id, "_" nghia la bo qua gia tri du_lieu khong dung toi
    du_lieu_moi = {
        "firstname": "Da Sua",
        "lastname": "Roi",
        "totalprice": 999,
        "depositpaid": False,
        "bookingdates": {"checkin": "2026-11-01", "checkout": "2026-11-02"},
    }
    response = api_context.put(
        f"/booking/{bookingid}",
        data=du_lieu_moi,
        headers={"Cookie": f"token={auth_token}"},
    )
    assert response.status == 200  # co token, sua thanh cong
    assert response.json()["firstname"] == "Da Sua"  # du lieu tra ve dung nhu da sua


def test_put_02_sua_khong_co_token(api_context, booking_tao_moi):
    """PUT-02: sua booking nhung KHONG gui token -> HTTP 403, khong sua duoc."""
    bookingid, _ = booking_tao_moi  # chi can id, bo qua du_lieu
    response = api_context.put(
        f"/booking/{bookingid}",
        data={
            "firstname": "Hack",
            "lastname": "Er",
            "totalprice": 0,
            "depositpaid": False,
            "bookingdates": {"checkin": "2026-01-01", "checkout": "2026-01-02"},
        },
    )
    assert response.status == 403  # khong co token phai bi tu choi


def test_patch_01_sua_1_field_giu_nguyen_field_khac(api_context, auth_token, booking_tao_moi):
    """PATCH-01: chi gui totalprice -> HTTP 200, chi totalprice doi, cac field khac giu nguyen."""
    bookingid, du_lieu_goc = booking_tao_moi  # giu du_lieu_goc de doi chieu field khong doi ben duoi
    response = api_context.patch(
        f"/booking/{bookingid}",
        data={"totalprice": 250},
        headers={"Cookie": f"token={auth_token}"},
    )
    assert response.status == 200  # co token, sua thanh cong
    body = response.json()
    assert body["totalprice"] == 250  # field vua gui phai doi
    assert body["firstname"] == du_lieu_goc["firstname"]  # field khong gui phai giu nguyen
    assert body["lastname"] == du_lieu_goc["lastname"]  # field khong gui phai giu nguyen`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Gán token vào header <code>Cookie</code> (dạng{" "}
        <code>token=&lt;auth_token&gt;</code>) — Restful-Booker nhận diện
        đăng nhập qua header <code>Cookie</code>, không phải header{" "}
        <code>Authorization</code> thường gặp ở API khác.{" "}
        <code>test_put_02</code> cố tình KHÔNG gửi header này để xác nhận bị
        từ chối (403).
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">Kết quả:</p>
      <ResultBlock
        text={`tests/test_04_crud_booking.py::test_put_01_sua_booking_co_token PASSED
tests/test_04_crud_booking.py::test_put_02_sua_khong_co_token PASSED
tests/test_04_crud_booking.py::test_patch_01_sua_1_field_giu_nguyen_field_khac PASSED

======================= 3 passed in 3.16s =======================`}
        okLines={["PASSED", "passed"]}
      />
    </>
  );
}
