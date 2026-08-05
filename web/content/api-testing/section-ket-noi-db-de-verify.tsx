import { TermGlossary } from "@/components/TermGlossary";

/** Nội dung mục 7.4 — Kết nối DB để verify kết quả trong automation. */
export function SectionKetNoiDbDeVerify() {
  return (
    <>
      <div className="badge">🤖 API Testing · Chương 7 · Mục 7.4</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Kết nối DB để verify kết quả trong automation
      </h1>

      <div className="mt-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 space-y-2">
        <p className="m-0 text-[color:var(--muted)]">
          🎯 <strong className="text-[color:var(--ink)]">Mục tiêu học:</strong>{" "}
          hiểu vì sao chỉ kiểm tra response trả về là chưa đủ tin cậy — cần
          tự tay xác nhận dữ liệu đã thực sự đổi đúng trong database.
        </p>
      </div>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Vì sao cần verify cả DB, không chỉ response
      </h2>
      <p className="mt-3 text-[color:var(--muted)] leading-relaxed">
        Response &quot;thành công&quot; không phải lúc nào cũng đồng nghĩa
        dữ liệu đã đổi đúng — API có thể trả nhầm 200 trong khi transaction
        DB thất bại âm thầm, hoặc do đặc thù bất đồng bộ (Mục 3.3) mà dữ
        liệu cần thêm thời gian mới ổn định. Automation đáng tin cậy nên
        luôn có bước verify trực tiếp trong DB cho các case liên quan tới
        thay đổi dữ liệu.
      </p>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Ví dụ minh hoạ (Python + pytest)
      </h2>
      <pre className="mt-4 overflow-x-auto rounded-xl bg-[#0b0f16] p-4 text-xs md:text-sm text-emerald-200 ring-1 ring-white/10">
        {`def test_create_order_updates_inventory(api_client, db_conn, valid_sku):
    # 1) Gọi API — tầng "response contract" (nhóm 7 ở Chương 2)
    resp = api_client.post("/v1/orders", json={
        "customerId": "CUS1001",
        "items": [{"sku": valid_sku, "qty": 1}],
    })
    assert resp.status_code == 201
    order_id = resp.json()["orderId"]

    # 2) Verify trực tiếp trong DB — không chỉ tin vào response
    row = db_conn.execute(
        "SELECT status, qty_reserved FROM inventory WHERE sku = %s",
        (valid_sku,),
    ).fetchone()
    assert row is not None, "Không tìm thấy bản ghi tồn kho sau khi tạo đơn"
    assert row["qty_reserved"] >= 1, "Tồn kho chưa được trừ/giữ chỗ đúng"

    # 3) Dọn dẹp dữ liệu sau khi test — để chạy lại nhiều lần không bị lệch
    db_conn.execute("DELETE FROM orders WHERE order_id = %s", (order_id,))
    db_conn.commit()`}
      </pre>

      <h2 className="mt-10 text-xl md:text-2xl font-bold text-[color:var(--metal)]">
        Nguyên tắc khi kết nối DB trong automation
      </h2>
      <div className="mt-4 space-y-3 text-[color:var(--muted)] leading-relaxed">
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">1. Đọc cấu hình kết nối từ biến môi trường</strong>{" "}
          — không hardcode host/user/password trong code, tránh commit nhầm
          thông tin nhạy cảm.
        </p>
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">2. Dùng tài khoản DB chỉ có quyền cần thiết</strong>{" "}
          — trên môi trường test, không dùng tài khoản có toàn quyền
          production.
        </p>
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">3. Luôn tự dọn dẹp dữ liệu sau test</strong>{" "}
          — để mỗi lần chạy lại không bị ảnh hưởng bởi dữ liệu của lần chạy
          trước, đặc biệt quan trọng khi chạy tự động trong Tầng 2 (Mục 7.2).
        </p>
        <p className="m-0">
          <strong className="text-[color:var(--ink)]">4. Với hệ thống bất đồng bộ, verify có chờ (poll)</strong>{" "}
          — như đã nói ở Mục 3.3, không assert ngay lập tức nếu dữ liệu được
          cập nhật qua message queue.
        </p>
      </div>

      <div className="mt-8 rounded-2xl card-surface p-6">
        <h3 className="mt-0 text-lg font-bold text-[color:var(--metal)]">📌 Ghi nhớ</h3>
        <p className="mt-3 mb-0 text-[color:var(--muted)] leading-relaxed">
          Đây là điểm khác biệt giữa automation &quot;chỉ gọi API cho có
          coverage&quot; và automation{" "}
          <strong className="text-[color:var(--ink)]">
            thực sự đáng tin cậy
          </strong>
          — verify tận gốc dữ liệu, không chỉ tin vào những gì API tự báo
          cáo về chính nó.
        </p>
      </div>

      <TermGlossary
        terms={[
          ["Database verification", "Xác nhận trực tiếp trong DB thay vì chỉ dựa vào response API"],
          ["Test data cleanup", "Dọn dẹp dữ liệu test sau khi chạy, để không ảnh hưởng lần chạy sau"],
          ["Environment variable", "Biến môi trường — cách lưu cấu hình nhạy cảm tách khỏi source code"],
        ]}
      />

      <p className="mt-8 text-xs italic text-[color:var(--faint)] leading-relaxed border-t border-[color:var(--line)] pt-4">
        📎 Nội dung do maiqai.com biên soạn — ví dụ minh hoạ, không thuộc hệ
        thống thật nào.
      </p>
    </>
  );
}
