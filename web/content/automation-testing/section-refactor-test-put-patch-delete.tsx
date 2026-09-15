import { CodeBlock } from "@/components/BookBlocks";

/** Nội dung mục 13.4 — Refactor các test PUT/PATCH/DELETE. */
export function SectionRefactorTestPutPatchDelete() {
  return (
    <>
      <div className="badge">🏗️ Automation Testing · Chương 13 · Mục 13.4</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Refactor các test PUT/PATCH/DELETE
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Sửa lại <code>tests/test_04_crud_booking.py</code>, thay{" "}
        <code>api_context.put(...)</code> kèm header thủ công bằng{" "}
        <code>client.sua_toan_bo_booking(...)</code>:
      </p>

      <CodeBlock
        filename="tests/test_04_crud_booking.py"
        code={`def test_put_01_sua_booking_co_token(client, booking_tao_moi):
    """PUT-01: sua toan bo booking, co token hop le -> HTTP 200, du lieu duoc cap nhat dung."""
    bookingid, _ = booking_tao_moi  # chi can id, bo qua du_lieu
    du_lieu_moi = {
        "firstname": "Da Sua",
        "lastname": "Roi",
        "totalprice": 999,
        "depositpaid": False,
        "bookingdates": {"checkin": "2026-11-01", "checkout": "2026-11-02"},
    }
    response = client.sua_toan_bo_booking(bookingid, du_lieu_moi)
    assert response.status == 200  # co token, sua thanh cong
    assert response.json()["firstname"] == "Da Sua"  # du lieu tra ve dung nhu da sua


def test_put_02_sua_khong_co_token(client_khong_token, booking_tao_moi):
    """PUT-02: sua booking bang client KHONG co token -> HTTP 403, khong sua duoc."""
    bookingid, _ = booking_tao_moi  # chi can id, bo qua du_lieu
    response = client_khong_token.sua_toan_bo_booking(
        bookingid,
        {
            "firstname": "Hack",
            "lastname": "Er",
            "totalprice": 0,
            "depositpaid": False,
            "bookingdates": {"checkin": "2026-01-01", "checkout": "2026-01-02"},
        },
    )
    assert response.status == 403  # khong co token phai bi tu choi`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Test ngắn hơn hẳn — không còn dòng gán header <code>Cookie</code>{" "}
        lặp lại, và <code>test_put_02</code> giờ tự nói lên ý định qua tên
        fixture <code>client_khong_token</code>, không cần đọc kỹ mới biết
        đây là trường hợp thiếu token.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        <code>test_patch_01</code>, <code>test_del_01</code>,{" "}
        <code>test_del_02</code> refactor tương tự — đổi{" "}
        <code>api_context.patch(...)</code>/<code>api_context.delete(...)</code>{" "}
        thành <code>client.sua_1_phan_booking(...)</code>/
        <code>client.xoa_booking(...)</code>.
      </p>
    </>
  );
}
