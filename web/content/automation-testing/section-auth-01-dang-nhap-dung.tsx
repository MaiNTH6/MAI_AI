import { CodeBlock } from "@/components/BookBlocks";

/** Nội dung mục 11.2 — AUTH-01: đăng nhập đúng. */
export function SectionAuth01DangNhapDung() {
  return (
    <>
      <div className="badge">🔐 Automation Testing · Chương 11 · Mục 11.2</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        AUTH-01: đăng nhập đúng
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Tạo file <code>tests/test_03_auth.py</code>:
      </p>

      <CodeBlock
        filename="tests/test_03_auth.py"
        code={`"""Bo test day du cho POST /auth - theo bang test case AUTH-01..05 o docs/test-cases-restful-booker.md."""


def test_auth_01_dung_username_va_password(api_context):
    """AUTH-01: dung username + password -> HTTP 200, body co token."""
    response = api_context.post("/auth", data={"username": "admin", "password": "password123"})
    assert response.status == 200  # dang nhap dung phai tra HTTP 200
    assert "token" in response.json()  # body phai co token`}
      />
    </>
  );
}
