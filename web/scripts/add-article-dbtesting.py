# -*- coding: utf-8 -*-
"""Bài: DB Testing cho QA — dùng AI viết SQL kiểm dữ liệu, soi chỗ SQL sai.
Ví dụ SQL trong bài ĐÃ CHẠY THẬT trên DB mẫu SQLite (bắt được 2 lỗi).
Chạy: python -X utf8 scripts/add-article-dbtesting.py
"""
import json, io

P = "data/articles.json"
a = json.load(io.open(P, encoding="utf-8"))
SLUG = "db-testing-cho-qa-voi-ai"

RESULT_P1 = """AI trả về (các câu SQL — đã chạy thật trên DB mẫu):

-- 1) Đơn có total KHÔNG khớp tổng tiền các dòng hàng:
SELECT o.id, o.total AS total_don, SUM(oi.qty*oi.price) AS tong_item
FROM orders o JOIN order_items oi ON oi.order_id = o.id
GROUP BY o.id
HAVING o.total <> SUM(oi.qty*oi.price);

-- 2) order_items mồ côi (order_id không tồn tại trong orders):
SELECT oi.id, oi.order_id
FROM order_items oi LEFT JOIN orders o ON o.id = oi.order_id
WHERE o.id IS NULL;

--- Kết quả chạy thật ---
Q1 → Đơn 1: total_don = 350000 nhưng tong_item = 500000   ⚠️ lệch tổng (lỗi thật)
Q2 → item 3 trỏ tới order_id 99 (không tồn tại)            ⚠️ bản ghi mồ côi (lỗi thật)"""

RESULT_P2 = """AI trả về (ví dụ minh họa, suy từ lược đồ trên):

RÀNG BUỘC / HỢP LỆ
- products.stock không được âm → kiểm có dòng nào stock < 0.
- orders.status chỉ nhận tập giá trị hợp lệ (paid / pending / ...) → cần xác nhận danh sách với BA.

TOÀN VẸN THAM CHIẾU
- order_items.order_id phải tồn tại trong orders (bắt bản ghi mồ côi).
- order_items.product_id phải tồn tại trong products.

QUY TẮC NGHIỆP VỤ (cần xác nhận với BA)
- orders.total có bằng tổng (qty*price) của order_items không?
- Khi đơn ở trạng thái 'paid', stock sản phẩm đã bị trừ tương ứng chưa?"""

art = {
    "slug": SLUG,
    "title": "DB Testing cho QA: dùng AI viết SQL kiểm dữ liệu — và soi chỗ SQL nó sai",
    "excerpt": (
        "Test trên giao diện thấy 'thành công', nhưng dữ liệu lưu xuống database có đúng không lại là chuyện khác. "
        "Bài này dùng AI viết câu SQL kiểm dữ liệu (đối chiếu tổng tiền, bắt bản ghi mồ côi...) — ví dụ chạy thật bắt "
        "được 2 lỗi — kèm những chỗ SQL của AI hay sai mà bạn phải soi."
    ),
    "category": "db-testing",
    "readingTime": 10,
    "publishedAt": "2026-06-20",
    "cover": "🗄️",
    "intro": {
        "problem": (
            "Test trên giao diện thấy 'thành công', nhưng dữ liệu thật sự lưu xuống database có đúng không lại là chuyện khác: "
            "tổng tiền đơn lệch với các dòng hàng, bản ghi con trỏ tới cha không tồn tại, trạng thái không khớp. Nhiều QA biết "
            "cần kiểm ở tầng DB nhưng ngại viết SQL, hoặc kiểm tay không xuể. AI viết SQL rất nhanh — nhưng một câu SQL hỏi sai "
            "sẽ cho kết luận sai mà vẫn trông gọn gàng."
        ),
        "whatIs": (
            "DB testing (kiểm thử ở tầng cơ sở dữ liệu) là đối chiếu dữ liệu thực trong DB sau các thao tác, ngoài những gì giao "
            "diện hiển thị: tính đúng đắn của dữ liệu, ràng buộc, toàn vẹn tham chiếu, quy tắc nghiệp vụ. AI (ChatGPT, Claude, "
            "Claude Code) có thể đọc mô tả hoặc lược đồ bảng rồi sinh câu SQL kiểm — bạn chạy và đối chiếu."
        ),
        "whyThis": (
            "AI viết SQL nhanh và đúng cú pháp, nhưng 'đúng cú pháp' không phải 'hỏi đúng cái cần hỏi'. Giá trị của tester là biết "
            "cần kiểm gì và soi xem câu SQL có thật sự trả lời câu hỏi đó không (JOIN có nhân dòng không, có quên điều kiện "
            "soft-delete không, NULL xử lý đúng chưa). Mọi ví dụ trong bài đều đã chạy thật trên một DB mẫu (SQLite) và bắt được lỗi thật."
        ),
    },
    "tldr": [
        "Giao diện báo 'thành công' chưa chắc dữ liệu trong DB đã đúng — phải kiểm ở tầng DB.",
        "AI viết SQL kiểm rất nhanh từ mô tả; việc của bạn là soi câu SQL có hỏi đúng không.",
        "Ví dụ trong bài chạy thật trên DB mẫu, bắt được 2 lỗi: lệch tổng tiền và bản ghi mồ côi.",
        "SQL của AI hay sai: JOIN nhân dòng, quên điều kiện, so sánh NULL bằng =, đoán sai tên cột.",
        "⚠️ Chỉ chạy SELECT để kiểm; câu sửa dữ liệu (UPDATE/DELETE) phải cực kỳ cẩn thận, không chạy trên DB thật.",
    ],
    "steps": [
        {
            "title": "Nhóm 1 — Đúng dữ liệu sau thao tác (CRUD)",
            "body": (
                "Sau khi tạo / sửa / xóa trên giao diện, bản ghi trong DB có đúng giá trị mong đợi không. Ví dụ: tạo đơn xong, "
                "trong bảng orders có đúng một dòng với đúng user, đúng trạng thái, đúng tổng tiền; sửa hồ sơ xong, cột tương ứng "
                "đã đổi. Đây là kiểm cơ bản nhất mà giao diện không cho thấy trực tiếp."
            ),
        },
        {
            "title": "Nhóm 2 — Ràng buộc & hợp lệ",
            "body": (
                "Kiểm các ràng buộc ở mức dữ liệu: trường bắt buộc (NOT NULL), giá trị duy nhất (UNIQUE), kiểu dữ liệu, độ dài, "
                "giá trị mặc định, tập giá trị hợp lệ của cột trạng thái. Mục tiêu: tìm bản ghi 'lọt' qua giao diện nhưng sai ở DB."
            ),
        },
        {
            "title": "Nhóm 3 — Toàn vẹn tham chiếu",
            "body": (
                "Kiểm khóa ngoại và bản ghi mồ côi: dòng con trỏ tới cha không tồn tại (order_items trỏ tới order đã bị xóa), "
                "hành vi khi xóa cha (cascade hay chặn). Đây là chỗ dữ liệu hay 'rác' dần theo thời gian mà không ai để ý."
            ),
        },
        {
            "title": "Nhóm 4 — Quy tắc nghiệp vụ ở mức dữ liệu",
            "body": (
                "Đối chiếu các quy tắc nghiệp vụ ngay trên dữ liệu: tổng tiền đơn = tổng các dòng hàng, số dư không âm, trạng thái "
                "chuyển hợp lệ, đơn 'paid' thì kho đã trừ. Lưu ý: phần lớn quy tắc này là giả định — phải xác nhận với BA trước khi "
                "biến thành phép kiểm."
            ),
            "linkSlug": "kiem-chung-output-ai-cho-qa",
            "linkLabel": "Soi output AI có hệ thống: xem bài Kiểm chứng output AI",
        },
        {
            "title": "Nhóm 5 — Sau migration / đồng bộ dữ liệu",
            "body": (
                "Khi có chuyển đổi/đồng bộ dữ liệu: đối chiếu số lượng bản ghi trước và sau, kiểm dữ liệu không bị méo (ngày tháng, "
                "dấu tiếng Việt, số thập phân), không phát sinh trùng. Đây là lúc lỗi dữ liệu dễ xảy ra hàng loạt nhất."
            ),
        },
    ],
    "prompts": [
        {
            "title": "Prompt 1 — Viết SQL kiểm dữ liệu sau khi đặt hàng",
            "goal": "Từ mô tả cần kiểm + lược đồ bảng, để AI viết câu SQL đối chiếu dữ liệu thật trong DB.",
            "prompt": (
                "Đây là lược đồ các bảng và việc cần kiểm. Viết các câu SQL (CHỈ SELECT) để kiểm, mỗi câu kèm một dòng giải thích "
                "nó khẳng định điều gì. Ưu tiên trả về CHÍNH các bản ghi vi phạm để tôi soi, không chỉ đếm số. Chỉ dùng cột/bảng "
                "có trong lược đồ; cột nào không chắc thì hỏi lại, đừng đoán.\n\n"
                "[DÁN LƯỢC ĐỒ BẢNG + VIỆC CẦN KIỂM VÀO ĐÂY]"
            ),
            "exampleInput": (
                "Lược đồ:\n"
                "  orders(id, user_id, status, total)\n"
                "  order_items(id, order_id, product_id, qty, price)\n\n"
                "Cần kiểm sau khi đặt hàng:\n"
                "  1) Tổng tiền mỗi đơn (orders.total) phải bằng tổng (qty*price) của các dòng hàng.\n"
                "  2) Không có dòng hàng nào trỏ tới đơn không tồn tại (mồ côi)."
            ),
            "result": RESULT_P1,
            "testerNote": (
                "Hai câu này bắt đúng 2 lỗi cài sẵn trong DB mẫu. Nhưng cẩn thận: nếu hệ thống dùng soft-delete (đơn bị xóa mềm "
                "vẫn còn dòng order_items), câu 2 sẽ báo nhầm là 'mồ côi' — phải thêm điều kiện. Luôn kiểm câu SQL có khớp đúng "
                "quy tắc thật của hệ thống không, đừng chạy xong thấy 'có kết quả' là tin."
            ),
        },
        {
            "title": "Prompt 2 — Đọc lược đồ → gợi ý danh sách kiểm dữ liệu",
            "goal": "Đưa AI lược đồ bảng (DDL) để nó gợi ý các phép kiểm dữ liệu nên làm — ràng buộc, toàn vẹn, quy tắc nghiệp vụ.",
            "prompt": (
                "Đây là lược đồ (DDL) các bảng. Liệt kê các phép kiểm dữ liệu nên làm khi test, nhóm theo: ràng buộc/hợp lệ, toàn "
                "vẹn tham chiếu, quy tắc nghiệp vụ. Mỗi mục nói rõ kiểm gì và rủi ro nếu sai. Chỉ dựa trên lược đồ; chỗ nào suy "
                "đoán quy tắc nghiệp vụ thì ghi rõ 'cần xác nhận'.\n\n"
                "[DÁN DDL CÁC BẢNG VÀO ĐÂY]"
            ),
            "exampleInput": (
                "CREATE TABLE products (id, name, stock);\n"
                "CREATE TABLE orders (id, user_id, status, total);\n"
                "CREATE TABLE order_items (id, order_id, product_id, qty, price);"
            ),
            "result": RESULT_P2,
            "testerNote": (
                "Danh sách AI gợi ý là điểm khởi đầu tốt để khỏi sót khía cạnh. Nhưng các quy tắc nghiệp vụ (total = tổng item, "
                "trừ kho khi 'paid') là GIẢ ĐỊNH của AI dựa trên tên cột — phải hỏi BA xác nhận trước khi biến thành test, đừng "
                "coi là chân lý."
            ),
        },
    ],
    "pros": [
        "Bắt lỗi dữ liệu mà test giao diện không thấy (tổng lệch, bản ghi mồ côi, trạng thái sai).",
        "AI viết SQL nhanh, kể cả khi bạn chưa thạo SQL.",
        "Trả về chính bản ghi vi phạm để soi, không chỉ đếm số.",
        "Đọc lược đồ rồi gợi ý phép kiểm — đỡ sót khía cạnh.",
    ],
    "cons": [
        "Cần quyền truy cập DB (hoặc bản sao) và biết đọc kết quả.",
        "SQL của AI có thể sai logic dù đúng cú pháp — vẫn phải hiểu để soi.",
        "Quy tắc nghiệp vụ AI chỉ đoán từ tên cột; phải xác nhận với BA.",
    ],
    "bugs": [
        "JOIN thiếu điều kiện → nhân bản dòng → COUNT/SUM sai mà nhìn vẫn 'có số'.",
        "Quên điều kiện thực tế (soft-delete is_deleted=0, chỉ tính đơn 'paid') → kết quả sai lệch.",
        "So sánh NULL bằng = thay vì IS NULL → bỏ sót bản ghi.",
        "AI đoán tên cột/bảng không có thật → query lỗi, hoặc tệ hơn là chạy nhầm sang cột khác.",
        "⚠️ NGUY HIỂM NHẤT: chạy UPDATE/DELETE do AI sinh trên DB thật (thiếu WHERE, sai điều kiện) → mất/hỏng dữ liệu. Chỉ chạy SELECT để kiểm; mọi câu sửa dữ liệu phải review kỹ, chạy trên môi trường test, có backup.",
    ],
    "faq": [
        {
            "question": "Không biết SQL thì có làm theo được không?",
            "answer": (
                "Bắt đầu được vì AI viết câu lệnh. Nhưng để soi câu SQL có hỏi đúng chưa, bạn cần đọc hiểu cơ bản — nên học "
                "SELECT, JOIN, GROUP BY, WHERE. Không cần giỏi, nhưng phải đủ để biết câu lệnh đang đếm/lọc cái gì."
            ),
        },
        {
            "question": "Bài demo chạy trên DB nào, tôi áp vào hệ thống thật thế nào?",
            "answer": (
                "Bài dùng SQLite cho dễ chạy lại, nhưng cú pháp SELECT gần như giống nhau ở MySQL, PostgreSQL, SQL Server (chỉ vài "
                "hàm khác). Trỏ câu lệnh vào bản sao hoặc môi trường test của hệ thống bạn — TUYỆT ĐỐI không kiểm trực tiếp trên production."
            ),
        },
        {
            "question": "Có nên dùng SQL của AI để SỬA dữ liệu không?",
            "answer": (
                "Hạn chế tối đa. Để kiểm thì chỉ dùng SELECT. Nếu buộc phải sửa (dọn dữ liệu test), review từng câu, chạy trên môi "
                "trường test, có backup, và luôn có mệnh đề WHERE — một câu UPDATE/DELETE thiếu WHERE có thể quét sạch cả bảng."
            ),
        },
        {
            "question": "Lấy lược đồ (DDL) ở đâu để đưa cho AI?",
            "answer": (
                "Từ tài liệu thiết kế DB, export schema bằng công cụ (DBeaver, phpMyAdmin, pgAdmin...), hoặc nhờ dev. Có lược đồ thật "
                "thì AI viết SQL chính xác hơn nhiều so với để nó đoán tên cột."
            ),
        },
    ],
    "finalThought": (
        "AI viết được mọi câu SQL bạn cần, nhưng 'chạy ra số' không có nghĩa là 'số đúng'. Người tester quyết định cần kiểm gì và "
        "soi xem câu SQL có thật sự trả lời câu hỏi đó — đó là phần AI không làm thay được. Và nhớ: ở tầng dữ liệu, một câu lệnh "
        "sai không chỉ cho kết quả sai mà còn có thể làm hỏng dữ liệu thật."
    ),
}

if any(x["slug"] == SLUG for x in a):
    a = [x for x in a if x["slug"] != SLUG]
a.insert(0, art)

json.dump(a, io.open(P, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
print("Đã thêm bài:", SLUG)
print("Tổng số bài:", len(a), "| Steps:", len(art["steps"]), "| Prompts:", len(art["prompts"]), "| FAQ:", len(art["faq"]))
