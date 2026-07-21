# -*- coding: utf-8 -*-
"""Bài: Kết nối Claude Code với MySQL — QA truy vấn dữ liệu bằng câu hỏi thường.
Chạy: python -X utf8 scripts/add-article-claude-mysql.py
"""
import json, io

P = "data/articles.json"
a = json.load(io.open(P, encoding="utf-8"))
SLUG = "claude-code-ket-noi-mysql-lab-qa"

art = {
    "slug": SLUG,
    "title": "Kết nối Claude Code với MySQL: QA truy vấn dữ liệu bằng câu hỏi thường thay vì SQL thuần",
    "category": "db-testing",
    "readingTime": 7,
    "publishedAt": "2026-06-23",
    "cover": "🔌",
    "problem": (
        "QA thường phải kiểm tra dữ liệu trong cơ sở dữ liệu để xác nhận test case — "
        "nhưng quy trình hiện tại khá rời rạc: mở MySQL Workbench, gõ câu SQL, "
        "sao chép kết quả, rồi quay lại màn hình đang làm việc để đối chiếu. "
        "Lặp đi lặp lại như vậy mỗi khi cần kiểm tra thêm một điều kiện.\n\n"
        "MCP (Model Context Protocol) là cơ chế cho phép Claude Code kết nối trực tiếp "
        "với các công cụ bên ngoài — trong đó có MySQL. Sau khi thiết lập, bạn chỉ cần "
        "hỏi Claude bằng tiếng Việt: 'Có đơn hàng nào trạng thái paid mà thiếu bản ghi thanh toán không?' "
        "— Claude tự dịch sang SQL, truy vấn DB, và trả kết quả ngay trong terminal."
    ),
    "tldr": [
        "MCP là cầu nối giúp Claude Code giao tiếp trực tiếp với MySQL — không cần mở Workbench riêng.",
        "Cần cài một package: @benborla29/mcp-server-mysql (chạy qua npx, không cần cài global).",
        "Cấu hình một file JSON duy nhất: ~/.claude/settings.json — thêm host, port, user, password.",
        "Sau khi restart Claude Code, hỏi bằng tiếng Việt là được — Claude hiểu schema và tự viết SQL.",
    ],
    "tables": [
        {
            "title": "Làm việc với DB: cách cũ vs kết nối qua Claude",
            "intro": "Sự khác biệt thực tế khi dùng Claude như một lớp truy vấn thay vì gõ SQL thủ công:",
            "columns": ["Tiêu chí", "Cách cũ (Workbench)", "Qua Claude Code + MCP"],
            "rows": [
                ["Cách đặt câu hỏi", "Viết SQL đúng cú pháp", "Hỏi bằng tiếng Việt thường"],
                ["Biết tên bảng/cột?", "Phải nhớ hoặc tra schema trước", "Claude tự đọc schema khi kết nối"],
                ["Luồng làm việc", "Switch qua lại giữa 2 cửa sổ", "Hỏi thẳng trong terminal đang dùng"],
                ["Phân tích kết quả", "Tự đọc và diễn giải số liệu", "Claude giải thích luôn ý nghĩa"],
                ["Phù hợp với", "Truy vấn phức tạp, cần kiểm soát", "Kiểm tra nhanh, xác nhận test data"],
            ],
            "note": "⚠️ Claude qua MCP phù hợp để đọc dữ liệu (SELECT). Không nên dùng để thay đổi dữ liệu hoặc kết nối vào DB production.",
        }
    ],
    "stepsTitle": "🔌 Kết nối Claude Code với MySQL trong 3 bước",
    "stepsSubtitle": "Từ lúc chưa có gì đến khi hỏi được Claude về dữ liệu trong DB — toàn bộ mất khoảng 10 phút.",
    "steps": [
        {
            "title": "Bước 1 — Kiểm tra package bằng cách chạy thử",
            "body": (
                "Trước khi cấu hình, xác nhận package tồn tại và chạy được trên máy bằng cách mở CMD "
                "và chạy lệnh sau. npx sẽ tự tải về nếu chưa có:\n"
            ),
            "code": "npx -y @benborla29/mcp-server-mysql",
            "tip": (
                "💡 Thấy cảnh báo 'npm warn deprecated node-domexception' là bình thường — "
                "đây chỉ là thông báo của một thư viện phụ, không ảnh hưởng đến hoạt động. "
                "Lệnh chạy xong và không báo lỗi đỏ là đạt."
            ),
        },
        {
            "title": "Bước 2 — Thêm cấu hình vào settings.json",
            "body": (
                "Mở file cấu hình toàn cục của Claude Code tại đường dẫn: "
                "C:\\Users\\<tên_user>\\.claude\\settings.json\n\n"
                "Thêm khối mcpServers vào trong file (giữ nguyên các nội dung đã có, chỉ thêm phần mới):"
            ),
            "code": (
                '{\n'
                '  "mcpServers": {\n'
                '    "mysql-local": {\n'
                '      "command": "npx",\n'
                '      "args": ["-y", "@benborla29/mcp-server-mysql"],\n'
                '      "env": {\n'
                '        "MYSQL_HOST": "127.0.0.1",\n'
                '        "MYSQL_PORT": "3306",\n'
                '        "MYSQL_USER": "root",\n'
                '        "MYSQL_PASS": "",\n'
                '        "MYSQL_DB": ""\n'
                '      }\n'
                '    }\n'
                '  }\n'
                '}'
            ),
            "tip": (
                "✅ MYSQL_PASS để trống nếu bạn dùng --initialize-insecure khi cài MySQL (không đặt mật khẩu root). "
                "MYSQL_DB để trống để Claude có thể truy cập tất cả database — "
                "hoặc điền tên DB cụ thể nếu muốn giới hạn phạm vi."
            ),
        },
        {
            "title": "Bước 3 — Restart Claude Code và kiểm tra kết nối",
            "body": (
                "Đóng hẳn cửa sổ Claude Code desktop rồi mở lại — không chỉ đóng tab. "
                "Bước này bắt buộc vì Claude Code chỉ đọc cấu hình MCP một lần khi khởi động.\n\n"
                "Sau khi mở lại, vào project và thử hỏi:"
            ),
            "code": (
                "Show all databases in MySQL\n\n"
                "-- hoặc hỏi cụ thể hơn:\n"
                "Trong database test_db có những bảng nào?"
            ),
            "tip": (
                "🎉 Nếu Claude liệt kê được danh sách database hoặc bảng — kết nối đã thành công. "
                "Nếu Claude báo không tìm thấy công cụ MySQL, kiểm tra lại file settings.json "
                "có đúng cú pháp JSON không (dùng jsonlint.com để kiểm tra nhanh)."
            ),
        },
    ],
    "prompts": [
        {
            "goal": "Kiểm tra tính toàn vẹn dữ liệu sau khi chạy test",
            "prompt": (
                "Trong database [tên_db], kiểm tra bảng orders và bảng payments. "
                "Tìm các order có status = 'completed' nhưng không có bản ghi tương ứng trong bảng payments. "
                "Nếu có, liệt kê order_id và created_at của từng trường hợp."
            ),
            "exampleInput": (
                "Database: shop_test\n"
                "Bảng orders: order_id, user_id, status, created_at\n"
                "Bảng payments: payment_id, order_id, amount, paid_at\n"
                "Có 3 order status='completed', trong đó 1 order không có payment record"
            ),
            "result": (
                "Tìm thấy 1 order không có bản ghi thanh toán:\n\n"
                "order_id: 1042\n"
                "created_at: 2026-06-20 14:32:11\n\n"
                "Câu SQL đã dùng:\n"
                "SELECT o.order_id, o.created_at\n"
                "FROM orders o\n"
                "LEFT JOIN payments p ON o.order_id = p.order_id\n"
                "WHERE o.status = 'completed' AND p.payment_id IS NULL;"
            ),
            "testerNote": (
                "Kết quả minh họa dựa trên cấu trúc bảng trong ví dụ đầu vào. "
                "Khi chạy thật, Claude sẽ tự đọc schema của DB bạn đang kết nối — "
                "tên cột có thể khác, nhưng logic LEFT JOIN vẫn áp dụng tương tự."
            ),
        },
        {
            "goal": "Thống kê nhanh để xác nhận test data đã seed đúng",
            "prompt": (
                "Trong database [tên_db], đếm số lượng bản ghi trong bảng users theo trường role. "
                "Hiển thị dạng bảng: role | số lượng. "
                "Thêm một dòng tổng cộng ở cuối."
            ),
            "exampleInput": (
                "Database: qa_testdata\n"
                "Bảng users có cột: user_id, email, role, created_at\n"
                "Dữ liệu đã seed: 10 admin, 50 member, 5 guest"
            ),
            "result": (
                "Kết quả thống kê bảng users:\n\n"
                "role     | số lượng\n"
                "---------|----------\n"
                "admin    | 10\n"
                "member   | 50\n"
                "guest    | 5\n"
                "---------|----------\n"
                "Tổng     | 65\n\n"
                "Xác nhận: dữ liệu seed khớp với kế hoạch (10 admin, 50 member, 5 guest)."
            ),
            "testerNote": (
                "Prompt này phù hợp để kiểm tra nhanh sau bước seed data — "
                "đặc biệt hữu ích trước khi chạy regression test để đảm bảo môi trường đúng. "
                "Kết quả ví dụ là minh họa theo đầu vào mô tả."
            ),
        },
        {
            "goal": "Tìm dữ liệu bất thường để viết bug report",
            "prompt": (
                "Trong bảng [tên_bảng], tìm các bản ghi có giá trị bất thường: "
                "email không chứa ký tự @, số điện thoại không đủ 10 chữ số, "
                "hoặc trường created_at ở tương lai (sau ngày hôm nay). "
                "Liệt kê ID và mô tả lỗi cụ thể cho từng bản ghi."
            ),
            "exampleInput": (
                "Bảng: customers\n"
                "Cột: customer_id, name, email, phone, created_at\n"
                "Có 2 bản ghi lỗi: email thiếu @, và 1 bản ghi created_at = 2027-01-01"
            ),
            "result": (
                "Tìm thấy 2 bản ghi có dữ liệu bất thường:\n\n"
                "customer_id: 88 — email 'nguyenvangmail.com' thiếu ký tự @\n"
                "customer_id: 201 — created_at '2027-01-01' là ngày trong tương lai\n\n"
                "Gợi ý: Đây có thể là lỗi validation ở tầng backend — "
                "cần kiểm tra lại rule kiểm tra đầu vào trước khi lưu vào DB."
            ),
            "testerNote": (
                "Kết quả ví dụ là minh họa theo dữ liệu mô tả trong đầu vào. "
                "Claude sẽ tự sinh SQL phù hợp với cấu trúc bảng thực của bạn — "
                "kết quả thực tế phụ thuộc vào dữ liệu trong DB đang kết nối."
            ),
        },
    ],
    "finalThought": (
        "Kết nối Claude Code với MySQL không thay thế Workbench hay kỹ năng SQL — "
        "nó thêm một lớp tiện lợi cho những tác vụ kiểm tra nhanh trong quá trình test. "
        "Khi cần xác nhận một điều kiện dữ liệu cụ thể mà không muốn gián đoạn luồng làm việc, "
        "hỏi thẳng trong terminal nhanh hơn switch cửa sổ. "
        "Còn với những truy vấn phức tạp quan trọng, vẫn nên kiểm tra lại SQL được sinh ra trước khi tin vào kết quả."
    ),
}

if any(x["slug"] == SLUG for x in a):
    a = [x for x in a if x["slug"] != SLUG]
a.insert(0, art)

json.dump(a, io.open(P, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
print("Đã thêm:", SLUG)
print("Sections:", [k for k in ["tldr", "tables", "steps", "prompts", "pros", "cons", "faq", "finalThought"] if k in art])
