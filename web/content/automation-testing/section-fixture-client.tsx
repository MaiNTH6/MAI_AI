import { CodeBlock } from "@/components/BookBlocks";

/** Nội dung mục 13.3 — Fixture client. */
export function SectionFixtureClient() {
  return (
    <>
      <div className="badge">🏗️ Automation Testing · Chương 13 · Mục 13.3</div>

      <h1 className="mt-3 text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
        Fixture <code>client</code>
      </h1>

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        Tệp <code>tests/conftest.py</code> (thêm <code>import</code> ở đầu
        file và 2 fixture ở cuối):
      </p>
      <CodeBlock filename="tests/conftest.py" code={`from utils.api_client import RestfulBookerClient`} />

      <CodeBlock
        code={`@pytest.fixture
def client(api_context, auth_token):
    """RestfulBookerClient da gan san token - dung cho test can quyen sua/xoa."""
    return RestfulBookerClient(api_context, token=auth_token)


@pytest.fixture
def client_khong_token(api_context):
    """RestfulBookerClient KHONG co token - dung rieng cho cac test kiem tra tu choi truy cap."""
    return RestfulBookerClient(api_context, token=None)`}
      />

      <p className="mt-6 text-[color:var(--muted)] leading-relaxed">
        2 fixture này tận dụng luôn <code>api_context</code>/<code>auth_token</code>{" "}
        đã có — đúng ý &quot;fixture dùng lại fixture khác&quot; ở Chương 9.
      </p>
    </>
  );
}
