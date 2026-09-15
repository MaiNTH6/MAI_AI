import { CodeBlock, ExplainTable, TerminalBlock, ResultBlock, ConceptBox } from "@/components/BookBlocks";

/** Nội dung mục 13.5 — Gộp AUTH-02 → AUTH-05 bằng parametrize. */
export function SectionGopAuthBangParametrize() {
  return (
    <>
      <div className="badge">🏗️ Automation Testing · Chương 13 · Mục 13.5</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Gộp AUTH-02 → AUTH-05 bằng <code>parametrize</code>
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        4 hàm ở Chương 11 giống hệt nhau về cấu trúc, chỉ khác dữ liệu đầu
        vào — gộp thành 1 test chạy 4 lần với 4 bộ dữ liệu khác nhau:
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Sửa <code>tests/test_03_auth.py</code>, thay 4 hàm{" "}
        <code>test_auth_02...05</code> bằng:
      </p>

      <CodeBlock
        filename="tests/test_03_auth.py"
        code={`import pytest


@pytest.mark.parametrize(
    "ten_case, username, password",
    [
        ("AUTH-02 sai password", "admin", "sai-mat-khau"),
        ("AUTH-03 sai username", "khong-ton-tai", "password123"),
        ("AUTH-04 thieu password", "admin", None),
        ("AUTH-05 thieu username", None, "password123"),
    ],
)
def test_auth_dang_nhap_that_bai(api_context, ten_case, username, password):
    """AUTH-02..05: moi truong hop sai/thieu deu cung 1 khuon HTTP 200 + Bad credentials -
    gop thanh 1 test tham so hoa thay vi lap 4 ham gan giong het nhau."""
    du_lieu = {}
    if username is not None:
        du_lieu["username"] = username
    if password is not None:
        du_lieu["password"] = password

    response = api_context.post("/auth", data=du_lieu)

    assert response.status == 200, ten_case  # moi truong hop sai/thieu van tra 200
    body = response.json()
    assert "token" not in body, ten_case  # khong duoc cap token
    assert body.get("reason") == "Bad credentials", ten_case  # body phai bao dung ly do`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Giải thích từng dòng lệnh:
      </p>
      <ExplainTable
        rows={[
          [
            '@pytest.mark.parametrize("ten_case, username, password", [...])',
            "Danh sách tham số — mỗi dòng trong list là 1 lần chạy test, với 3 giá trị gán vào đúng 3 tên đã khai báo",
          ],
          [
            "def test_auth_dang_nhap_that_bai(api_context, ten_case, username, password):",
            "3 tham số cuối khớp tên với parametrize ở trên — pytest tự truyền từng bộ giá trị vào",
          ],
          [
            "if username is not None:",
            'Bỏ qua field nếu giá trị là None (mô phỏng "thiếu field" ở AUTH-04/05)',
          ],
          [
            "assert ..., ten_case",
            "Thêm ten_case sau dấu phẩy — nếu assert sai, pytest in kèm tên case, dễ biết đang FAIL ở bộ dữ liệu nào",
          ],
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">Chạy:</p>
      <TerminalBlock cmd="pytest tests/test_03_auth.py -v" />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Kết quả (mỗi bộ dữ liệu hiện thành 1 dòng riêng trong tên test):
      </p>
      <ResultBlock
        text={`tests/test_03_auth.py::test_auth_01_dung_username_va_password PASSED
tests/test_03_auth.py::test_auth_dang_nhap_that_bai[AUTH-02 sai password-admin-sai-mat-khau] PASSED
tests/test_03_auth.py::test_auth_dang_nhap_that_bai[AUTH-03 sai username-khong-ton-tai-password123] PASSED
tests/test_03_auth.py::test_auth_dang_nhap_that_bai[AUTH-04 thieu password-admin-None] PASSED
tests/test_03_auth.py::test_auth_dang_nhap_that_bai[AUTH-05 thieu username-None-password123] PASSED
tests/test_03_auth.py::test_auth_token_dung_lai_duoc_o_cac_test_khac PASSED

============================== 6 passed in 3.01s ==============================`}
        okLines={["PASSED", "passed"]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Vẫn 6 kết quả như Chương 11 — chỉ khác 4 hàm rời rạc giờ gộp thành 1
        test có 4 lần chạy.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Chạy lại toàn bộ dự án để chắc chắn không phá gì sau khi refactor:
      </p>
      <TerminalBlock cmd="pytest -v" />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Kết quả: <strong className="text-[color:var(--ink)]">22 passed</strong>.
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Đến đây, bạn đã hoàn thành{" "}
        <strong className="text-[color:var(--ink)]">Checkpoint 6</strong> —
        khớp với commit <code>07f8aba</code> trên GitHub.
      </p>

      <ConceptBox
        items={[
          <span key="1">
            <strong className="text-[color:var(--ink)]">Class</strong>: gói
            dữ liệu + hành vi liên quan vào 1 chỗ (ở đây:{" "}
            <code>RestfulBookerClient</code>).
          </span>,
          <span key="2">
            <code>@pytest.mark.parametrize</code>: chạy 1 test nhiều lần
            với nhiều bộ dữ liệu khác nhau, thay vì viết nhiều hàm gần
            giống nhau.
          </span>,
        ]}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Chương sau bắt đầu Phần 5 — kết hợp UI và API trong cùng 1 test,
        trên Restful-Booker Platform.
      </p>
    </>
  );
}
