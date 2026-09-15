import { CodeBlock } from "@/components/BookBlocks";

/** Nội dung mục 11.3 — AUTH-02 → AUTH-05: các trường hợp sai/thiếu. */
export function SectionAuth02Den05SaiThieu() {
  return (
    <>
      <div className="badge">🔐 Automation Testing · Chương 11 · Mục 11.3</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        AUTH-02 → AUTH-05: các trường hợp sai/thiếu
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Cả 4 trường hợp đều cùng 1 khuôn kết quả (HTTP 200 +{" "}
        <code>Bad credentials</code>, đã xác nhận thật ở Chương 10) — chỉ
        khác dữ liệu gửi lên. Thêm vào cuối file:
      </p>

      <CodeBlock
        filename="tests/test_03_auth.py"
        code={`def test_auth_02_sai_password(api_context):
    """AUTH-02: sai password -> van HTTP 200 (khong phai 401), body {"reason": "Bad credentials"}."""
    response = api_context.post("/auth", data={"username": "admin", "password": "sai-mat-khau"})
    assert response.status == 200  # sai mat khau van tra 200, khong phai 401
    body = response.json()
    assert "token" not in body  # khong duoc cap token
    assert body.get("reason") == "Bad credentials"  # body phai bao dung ly do


def test_auth_03_sai_username(api_context):
    """AUTH-03: sai username -> giong AUTH-02, van 200 + Bad credentials."""
    response = api_context.post("/auth", data={"username": "khong-ton-tai", "password": "password123"})
    assert response.status == 200  # sai username van tra 200, khong phai 401
    body = response.json()
    assert "token" not in body  # khong duoc cap token
    assert body.get("reason") == "Bad credentials"  # body phai bao dung ly do


def test_auth_04_thieu_password(api_context):
    """AUTH-04: thieu han field password -> van 200 + Bad credentials, khong bi loi 500."""
    response = api_context.post("/auth", data={"username": "admin"})
    assert response.status == 200  # thieu password van tra 200, khong bi loi 500
    assert response.json().get("reason") == "Bad credentials"  # body phai bao dung ly do


def test_auth_05_thieu_username(api_context):
    """AUTH-05: thieu han field username -> van 200 + Bad credentials."""
    response = api_context.post("/auth", data={"password": "password123"})
    assert response.status == 200  # thieu username van tra 200
    assert response.json().get("reason") == "Bad credentials"  # body phai bao dung ly do`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        4 hàm khá giống nhau — Chương 13 sẽ gộp lại bằng{" "}
        <code>@pytest.mark.parametrize</code> để đỡ lặp code. Ở đây viết
        riêng từng hàm trước, vì cần thấy rõ từng trường hợp trước khi biết
        cách gộp.
      </p>
    </>
  );
}
