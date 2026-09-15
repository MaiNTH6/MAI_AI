import { CodeBlock } from "@/components/BookBlocks";

/** Nội dung mục 11.1 — Fixture auth_token. */
export function SectionFixtureAuthToken() {
  return (
    <>
      <div className="badge">🔐 Automation Testing · Chương 11 · Mục 11.1</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Fixture <code>auth_token</code>
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Các chương sau (12-13) cần token để sửa/xoá booking — thêm fixture
        đăng nhập sẵn 1 lần, dùng lại nhiều nơi (giống cách{" "}
        <code>api_context</code> dùng chung cả phiên, Chương 9):
      </p>

      <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
        Tệp <code>tests/conftest.py</code> (thêm bên dưới các fixture đã
        có):
      </p>
      <CodeBlock
        filename="tests/conftest.py"
        code={`@pytest.fixture(scope="session")
def auth_token(api_context):
    """Dang nhap 1 lan dau phien test, dung lai token nay cho cac test can quyen sua/xoa."""
    response = api_context.post("/auth", data={"username": "admin", "password": "password123"})
    assert response.ok  # dang nhap phai thanh cong moi lay duoc token
    return response.json()["token"]`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        <code>scope=&quot;session&quot;</code> — chỉ đăng nhập 1 lần cho cả
        phiên chạy test, không đăng nhập lại ở mỗi test cần token.
      </p>
    </>
  );
}
