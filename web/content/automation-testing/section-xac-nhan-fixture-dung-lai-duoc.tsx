import { CodeBlock, TerminalBlock, ResultBlock } from "@/components/BookBlocks";

/** Nội dung mục 11.4 — Xác nhận fixture auth_token dùng lại được. */
export function SectionXacNhanFixtureDungLaiDuoc() {
  return (
    <>
      <div className="badge">🔐 Automation Testing · Chương 11 · Mục 11.4</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Xác nhận fixture <code>auth_token</code> dùng lại được
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Thêm test cuối cùng, dùng fixture <code>auth_token</code> ở mục
        11.1:
      </p>

      <CodeBlock
        code={`def test_auth_token_dung_lai_duoc_o_cac_test_khac(auth_token):
    """Xac nhan fixture auth_token (dung chung ca phien) tra ve 1 chuoi token khong rong."""
    assert isinstance(auth_token, str)  # token phai la kieu chuoi
    assert len(auth_token) > 0  # token khong duoc rong`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Chạy toàn bộ file:
      </p>
      <TerminalBlock cmd="pytest tests/test_03_auth.py -v" />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">Kết quả:</p>
      <ResultBlock
        text={`tests/test_03_auth.py::test_auth_01_dung_username_va_password PASSED
tests/test_03_auth.py::test_auth_02_sai_password PASSED
tests/test_03_auth.py::test_auth_03_sai_username PASSED
tests/test_03_auth.py::test_auth_04_thieu_password PASSED
tests/test_03_auth.py::test_auth_05_thieu_username PASSED
tests/test_03_auth.py::test_auth_token_dung_lai_duoc_o_cac_test_khac PASSED

============================== 6 passed in 2.64s ==============================`}
        okLines={["PASSED", "passed"]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Đến đây, bạn đã hoàn thành{" "}
        <strong className="text-[color:var(--ink)]">Checkpoint 4</strong> —
        khớp với commit <code>3991013</code> trên GitHub.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Chương sau: viết bộ test CRUD đầy đủ cho <code>/booking</code> — sẽ
        phát hiện 2 hành vi thật thú vị của API khi gọi thử trước khi viết
        test.
      </p>
    </>
  );
}
