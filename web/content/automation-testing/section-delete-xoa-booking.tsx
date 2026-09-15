import { CodeBlock, TerminalBlock, ResultBlock, ConceptBox } from "@/components/BookBlocks";

/** Nội dung mục 12.4 — DELETE: xoá booking, cần token. */
export function SectionDeleteXoaBooking() {
  return (
    <>
      <div className="badge">🗂️ Automation Testing · Chương 12 · Mục 12.4</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        DELETE — xoá booking, cần token
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Thêm vào cuối file:
      </p>

      <CodeBlock
        filename="tests/test_04_crud_booking.py"
        code={`def test_del_01_xoa_co_token(api_context, auth_token, booking_tao_moi):
    """DEL-01: xoa co token -> HTTP 201, GET lai id do phai tra 404."""
    bookingid, _ = booking_tao_moi  # chi can id, "_" nghia la bo qua gia tri du_lieu khong dung toi
    response = api_context.delete(f"/booking/{bookingid}", headers={"Cookie": f"token={auth_token}"})
    assert response.status == 201  # xoa thanh cong tra 201 (khong phai 200/204)

    response_get_lai = api_context.get(f"/booking/{bookingid}")
    assert response_get_lai.status == 404  # goi lai id vua xoa phai khong con


def test_del_02_xoa_khong_co_token(api_context, booking_tao_moi):
    """DEL-02: xoa khong co token -> HTTP 403, booking van con nguyen."""
    bookingid, _ = booking_tao_moi  # chi can id, bo qua du_lieu
    response = api_context.delete(f"/booking/{bookingid}")
    assert response.status == 403  # khong co token phai bi tu choi

    response_get_lai = api_context.get(f"/booking/{bookingid}")
    assert response_get_lai.status == 200  # booking phai con nguyen, chua bi xoa`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Chú ý <code>test_del_01</code>: xoá thành công trả{" "}
        <strong className="text-[color:var(--ink)]">HTTP 201</strong> (không
        phải 200 hay 204 như thường gặp ở API khác) — một quirk nhỏ nhưng dễ
        viết sai assertion nếu không tự gọi thử trước.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">Kết quả:</p>
      <ResultBlock
        text={`tests/test_04_crud_booking.py::test_del_01_xoa_co_token PASSED
tests/test_04_crud_booking.py::test_del_02_xoa_khong_co_token PASSED

======================= 2 passed in 3.00s =======================`}
        okLines={["PASSED", "passed"]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Chạy toàn bộ file:
      </p>
      <TerminalBlock cmd="pytest tests/test_04_crud_booking.py -v" />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">Kết quả:</p>
      <ResultBlock text="============================= 11 passed in 6.86s ==============================" okLines={["passed"]} />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Đến đây, bạn đã hoàn thành{" "}
        <strong className="text-[color:var(--ink)]">Checkpoint 5</strong> —
        khớp với commit <code>08a3fa3</code> trên GitHub.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Chương sau: chuẩn hoá lại toàn bộ code đã viết thành 1 framework
        nhỏ — tách <code>api_client.py</code>, gộp các test giống khuôn
        bằng <code>@pytest.mark.parametrize</code>.
      </p>
    </>
  );
}
