import json, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data", "articles.json")
a = json.load(open(DATA, encoding="utf-8"))
art = next(x for x in a if x["slug"] == "claude-code-ket-noi-confluence-doc-tai-lieu-du-an")

art["tldr"][0] = "Kết nối 1 lần: bật connector Atlassian trong app + đăng nhập (đơn giản nhất), hoặc 1 lệnh CLI. Sau đó chỉ cần gõ prompt để hỏi đáp tài liệu."

art["steps"] = [
    {
        "title": "Bật connector Confluence trong App (cách đơn giản nhất — không cần dòng lệnh)",
        "body": "Ngay trong app bạn đang dùng:\n1. Mở mục Connectors (Kết nối).\n2. Tìm 'Atlassian Rovo' (truy cập Jira & Confluence) → bật lên.\n3. Trình duyệt mở → đăng nhập tài khoản Atlassian của bạn → bấm 'Accept' (cấp quyền).\n\nXong khi connector hiện nút 'Disconnect' (như hình) — Claude đã đọc được Confluence + Jira.\n\n⚠️ Bước đăng nhập Atlassian bạn phải tự làm (bảo mật tài khoản của bạn) — không prompt nào thay được. Nhưng làm đúng 1 lần là xong.",
        "image": "/images/confluence-connector.png",
        "imageAlt": "Connector Atlassian Rovo đã bật — hiện nút Disconnect + danh sách công cụ Confluence/Jira",
    },
    {
        "title": "Kiểm tra đã kết nối",
        "body": "Gõ ngay trong khung chat: 'Liệt kê các space Confluence tôi có quyền xem'. Nếu ra đúng danh sách space của bạn → kết nối thành công, sẵn sàng hỏi đáp tài liệu.",
    },
    {
        "title": "Hỏi đáp tài liệu bằng 3 prompt (bên dưới)",
        "body": "Từ đây mọi thứ chỉ là gõ prompt bình thường. Dán lần lượt 3 prompt: tổng hợp 1 chủ đề → trả lời câu hỏi xuyên trang → tìm điểm thiếu/mâu thuẫn. Luôn bấm link trang gốc Claude dẫn ra để kiểm chứng.",
    },
    {
        "title": "Cách 2 (nâng cao): kết nối qua dòng lệnh — cho ai dùng Claude Code CLI",
        "body": "Nếu bạn dùng Claude Code bản dòng lệnh (terminal): cài Node.js (nodejs.org) + Claude Code (npm install -g @anthropic-ai/claude-code), kiểm tra bằng 'claude --version'. Sau đó ở Terminal gõ:\n\n    claude mcp add --transport sse atlassian https://mcp.atlassian.com/v1/sse\n\nRồi gõ 'claude' để mở → gõ '/mcp' → chọn 'atlassian' → Authenticate → đăng nhập Atlassian. Kết quả tương đương cách bật trong App.",
        "image": "/images/confluence-terminal.png",
        "imageAlt": "Terminal: claude --version ra 2.1.178, rồi claude mcp add thành công",
    },
]

json.dump(a, open(DATA, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
print("Done. Steps:")
for i, s in enumerate(art["steps"], 1):
    print(f"  {i}. {s['title'][:55]}  [img: {s.get('image','-')}]")
