# -*- coding: utf-8 -*-
"""Bài kiến thức (DB Testing): Thứ tự viết SQL khác thứ tự máy chạy.
Dạng GỌN — bỏ khuôn bài AI (không Prompt / Góc soi lỗi / FAQ). Chỉ: giải thích + bảng + ví dụ dễ + tóm lại + tham khảo.
Chạy: python -X utf8 scripts/add-article-sql-order.py
"""
import json, io

P = "data/articles.json"
a = json.load(io.open(P, encoding="utf-8"))
SLUG = "sql-thu-tu-chay-khac-thu-tu-viet"

art = {
    "slug": SLUG,
    "title": "Thứ tự viết SQL khác thứ tự thực thi — kiến thức nền cho QA",
    "excerpt": (
        "Bạn hay nghĩ SQL thực thi từ SELECT xuống. Thực ra FROM được thực thi trước. Hiểu thứ tự này, "
        "bạn đọc và viết câu lệnh không còn bị loạn."
    ),
    "category": "db-testing",
    "readingTime": 5,
    "publishedAt": "2026-06-21",
    "cover": "🔀",
    "tldr": [
        "Thứ tự VIẾT (SELECT đầu) khác thứ tự CHẠY (FROM đầu, SELECT gần cuối).",
        "Máy chạy: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.",
        "Mẹo: đọc một câu SQL hãy bắt đầu từ FROM, đừng đọc từ SELECT.",
    ],
    "tables": [
        {
            "title": "Thứ tự VIẾT so với thứ tự CHẠY",
            "intro": "Cùng một câu lệnh, đây là khác biệt giữa thứ tự bạn gõ và thứ tự máy thực thi:",
            "columns": ["Thứ tự bạn VIẾT", "Thứ tự SQL CHẠY", "Ý nghĩa (dễ hiểu)"],
            "rows": [
                ["1. SELECT", "1. FROM / JOIN", "Lấy dữ liệu từ bảng nào, gộp lại."],
                ["2. FROM / JOIN", "2. WHERE", "Lọc bỏ những dòng không cần."],
                ["3. WHERE", "3. GROUP BY", "Gom các dòng thành nhóm."],
                ["4. GROUP BY", "4. HAVING", "Lọc tiếp trên các nhóm vừa gom."],
                ["5. HAVING", "5. SELECT", "Chọn cột để hiển thị ra."],
                ["6. ORDER BY", "6. ORDER BY", "Sắp xếp kết quả."],
            ],
            "note": "💡 Mẹo nhớ: đọc và viết câu SQL hãy bắt đầu từ FROM — bạn sẽ không bị loạn khi gặp câu phức tạp.",
        }
    ],
    "stepsTitle": "🧠 Vận dụng tư duy: 2 ví dụ áp dụng ngay",
    "stepsSubtitle": "Áp thứ tự thực thi vào hai tình huống hay gặp.",
    "steps": [
        {
            "title": "Ví dụ cơ bản — câu SQL 4 bước",
            "body": (
                "Câu SQL đơn giản nhất chỉ có 4 thành phần. Dù bạn gõ SELECT lên đầu, máy không đọc theo thứ tự đó — hãy thử đọc "
                "theo số trong ngoặc bên dưới:"
            ),
            "code": (
                "SELECT name, email       -- (3) chọn cột hiển thị\n"
                "FROM customers           -- (1) lấy dữ liệu gốc\n"
                "WHERE city = 'HCM'       -- (2) lọc dữ liệu\n"
                "ORDER BY name;           -- (4) sắp xếp kết quả"
            ),
        },
        {
            "title": "Ví dụ nâng cao — câu SQL 6 bước",
            "body": (
                "Khi câu lệnh có thêm GROUP BY và HAVING, thứ tự đọc dài hơn — nhưng quy tắc vẫn như cũ: luôn bắt đầu từ FROM, "
                "không bao giờ từ SELECT:"
            ),
            "code": (
                "SELECT user_id, COUNT(*) AS so_don   -- (5) chọn cột hiển thị\n"
                "FROM orders                          -- (1) lấy dữ liệu gốc\n"
                "WHERE status = 'paid'                -- (2) lọc dữ liệu thô\n"
                "GROUP BY user_id                     -- (3) gom nhóm\n"
                "HAVING COUNT(*) > 5                  -- (4) lọc nhóm\n"
                "ORDER BY so_don DESC;                -- (6) sắp xếp"
            ),
            "tip":"💡 Mẹo đọc nhanh cho QA: Khi gặp một câu SQL dài, hãy dùng \"Chiến thuật Đọc Ngược\": lướt mắt xuống tìm FROM trước để biết gốc dữ liệu nằm ở đâu, sau đó dò ngược lên các điều kiện bên trên.",
        },
    ],
    "references": [
        {
            "label": "Kiến thức nền tảng về hệ quản trị cơ sở dữ liệu quan hệ (RDBMS) và chuẩn ANSI SQL.",
        },
        {
            "label": "Microsoft Learn — SELECT (Transact-SQL): mục \"Logical processing order of the SELECT statement\".",
            "url": "https://learn.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql",
        },
        {
            "label": "PostgreSQL Documentation — SELECT (mô tả thứ tự xử lý truy vấn).",
            "url": "https://www.postgresql.org/docs/current/sql-select.html",
        },
        {
            "label": "GeeksforGeeks — Order of Execution of SQL Queries.",
            "url": "https://www.geeksforgeeks.org/order-of-execution-of-sql-queries/",
        },
    ],
    "finalThought": (
        "Mọi người thường nghĩ SELECT chạy đầu tiên, nhưng theo chuẩn ANSI SQL, FROM mới là bước khởi đầu. Nhớ một điều đơn giản "
        "này, bạn sẽ đọc và viết câu SQL rõ ràng hơn hẳn."
    ),
}

if any(x["slug"] == SLUG for x in a):
    a = [x for x in a if x["slug"] != SLUG]
a.insert(0, art)

json.dump(a, io.open(P, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
print("Đã viết lại (gọn):", SLUG)
print("Có prompts?", "prompts" in art, "| Có bugs?", "bugs" in art, "| Có faq?", "faq" in art)
print("Giữ:", [k for k in ['intro','tldr','tables','steps','references','finalThought'] if k in art])
