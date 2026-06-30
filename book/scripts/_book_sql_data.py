# -*- coding: utf-8 -*-
"""Dữ liệu 50 câu lệnh SQL + bài tập — schema ecommerce_test (15 bug cài sẵn).
Bộ dữ liệu đầy đủ ở book/sql/ecommerce_test_setup.sql (file companion tải kèm sách)."""

# ===========================================================================
# PARTS — 6 chương
# ===========================================================================
PARTS = [
    ("PHẦN 1", "Toàn vẹn và trùng lặp dữ liệu",
     "Lỗi dữ liệu kinh điển nhất mà QA bắt gặp: bản ghi nhân đôi, ô bắt buộc bị "
     "bỏ trống, khóa ngoại trỏ vào nơi không tồn tại. Nhóm câu lệnh này giúp bạn "
     "soi nhanh sức khỏe của một bảng trước khi đi sâu kiểm thử nghiệp vụ."),
    ("PHẦN 2", "Ràng buộc nghiệp vụ",
     "Mỗi hệ thống đều có những quy tắc bất thành văn: tổng tiền không thể âm, "
     "tồn kho không thể dưới không, trạng thái phải nằm trong danh sách cho phép. "
     "Khi tầng ứng dụng quên kiểm tra, dữ liệu sai sẽ lặng lẽ trôi vào database. "
     "Nhóm này cũng trang bị hai công cụ nền tảng: đọc schema một hệ thống lạ khi "
     "chưa có tài liệu, và xác minh ràng buộc đã khai báo có thực sự tồn tại không."),
    ("PHẦN 3", "Đối soát và tính toán",
     "Phần lớn bug tài chính không nằm ở một bản ghi đơn lẻ mà ở chỗ hai con số "
     "đáng lẽ bằng nhau lại lệch nhau. Nhóm này tập trung vào kỹ thuật đối soát: "
     "tổng header so với tổng detail, tồn kho so với lượng đã bán."),
    ("PHẦN 4", "Biên và dữ liệu bất thường",
     "Người dùng thật luôn nhập những thứ ngoài dự đoán: chuỗi quá dài, ký tự lạ, "
     "số âm, ngày tháng vô lý. Đây là nhóm câu lệnh để tìm những outlier mà "
     "form nhập liệu lẽ ra phải chặn từ đầu."),
    ("PHẦN 5", "Audit, log và dấu vết",
     "Cột thời gian và mối quan hệ giữa các bảng là nơi kể lại lịch sử dữ liệu. "
     "Khi chúng mâu thuẫn — sản phẩm bị xóa vẫn còn trong đơn, khách hàng không "
     "tồn tại vẫn có giao dịch — đó là dấu hiệu của bug logic hoặc lỗ hổng dữ liệu."),
    ("PHẦN 6", "Truy vấn nâng cao cho QA",
     "Năm câu lệnh cuối dùng tới window function, CTE và UNION. Chúng giải quyết "
     "những bài toán kiểm thử khó: lấy bản ghi mới nhất mỗi nhóm, phân hạng "
     "khách hàng, tổng hợp nhiều loại lỗi trong một báo cáo duy nhất."),
]

# ===========================================================================
# ENTRIES — 50 câu lệnh
# ===========================================================================
ENTRIES = [

# ============================================================
# PHẦN 1 — Toàn vẹn và trùng lặp dữ liệu
# ============================================================
{
 "part": 0, "id": 1,
 "title": "Tìm email bị trùng",
 "situation":
   "Hệ thống đăng ký yêu cầu mỗi email chỉ thuộc về một tài khoản. Tuy nhiên "
   "do thiếu ràng buộc <b>UNIQUE</b> trên cột email, hai bản ghi C004 và C005 "
   "đã lọt vào bảng với cùng một địa chỉ. Hậu quả: gửi email nhầm người, "
   "đăng nhập nhập nhằng, chiến dịch marketing tính trùng người dùng.",
 "before_label": "Bảng Customers — dòng đỏ: email bị trùng (Bug-D):",
 "before_cols": ["customer_id", "customer_name", "email", "status"],
 "before_rows": [
   ["C001", "Nguyen Van A",      "a.nguyen@email.com",    "ACTIVE"],
   ["C002", "Tran Van B",        "b.tran@email.com",      "ACTIVE"],
   ["C003", "Le Thi C",          "c.le@email.com",        "ACTIVE"],
   ["C004", "Khach Hang Ao Bug", "trung_email@email.com", "ACTIVE"],
   ["C005", "Khach Hang Trung",  "trung_email@email.com", "ACTIVE"],
   ["C006", "Pham Van X",        "(NULL)",                "ACTIVE"],
   ["C007", "Nguyen Thi Y",      "",                      "ACTIVE"],
   ["C008", "  Pham Van D  ",    "d.pham@email.com",      "ACTIVE"],
   ["C009", "Nguyen Van A (2)",  "A.NGUYEN@EMAIL.COM",    "ACTIVE"],
   ["C010", "Khach Test VIP",    "vip@email.com",         "ACTIVE"],
 ],
 "before_bugs": [3, 4],
 # col_widths: customer_id=55 | customer_name=145 | email=225 | status=68 = 493
 "before_col_widths": [55, 145, 225, 68],
 "sql": (
   "SELECT email,\n"
   "       COUNT(*) AS so_lan\n"
   "FROM   Customers\n"
   "GROUP  BY email\n"
   "HAVING COUNT(*) > 1\n"
   "ORDER  BY so_lan DESC;"
 ),
 "clauses": [
   ("FROM Customers",
    "MySQL bắt đầu từ đây: tải toàn bộ bảng <b>Customers</b> "
    "vào vùng xử lý — 10 dòng trong dữ liệu mẫu."),
   ("GROUP BY email",
    "<b>Gom nhóm</b> tất cả dòng có cùng giá trị email lại với nhau. "
    "NULL và chuỗi rỗng mỗi loại thành một nhóm riêng."),
   ("HAVING COUNT(*) > 1",
    "<b>Lọc nhóm</b>: chỉ giữ nhóm có nhiều hơn 1 bản ghi — "
    "tức là email xuất hiện từ 2 lần trở lên. "
    "HAVING khác WHERE ở chỗ nó lọc SAU khi gom nhóm."),
   ("SELECT email, COUNT(*) AS so_lan",
    "Chỉ đến bước này MySQL mới <b>chiếu kết quả</b>: "
    "lấy email và đặt tên cột đếm là <b>so_lan</b>."),
   ("ORDER BY so_lan DESC",
    "<b>Sắp xếp</b> kết quả cuối cùng: email trùng nhiều nhất nổi lên đầu."),
 ],
 "explain":
   "Kỹ thuật dùng ở đây là <b>GROUP BY + HAVING COUNT</b>: gom nhóm theo giá trị cần kiểm tra, "
   "rồi lọc những nhóm vi phạm tính duy nhất.<br/>"
   "Đây là mẫu truy vấn nền tảng để phát hiện mọi loại trùng lặp trong bất kỳ cột nào.",
 "result_table": (
   ["email", "so_lan"],
   [["a.nguyen@email.com",    2],
    ["trung_email@email.com", 2]],
 ),
 "result_note":
   "2 cặp trùng: <b>trung_email@email.com</b> (C004 + C005 — Bug-D) và "
   "<b>a.nguyen@email.com</b> (C001 + C009 — trùng case-insensitive). "
   "Cần xử lý cả hai và thêm ràng buộc UNIQUE trước khi đưa lên production.",
 "note":
   "Kết quả của câu này phụ thuộc vào <b>collation</b> của cột email:<br/>"
   "(1) <b>Trùng khác hoa/thường</b>: trên DB mẫu (collation <b>utf8mb4_0900_ai_ci</b> — không phân "
   "biệt hoa/thường), câu này đã gộp luôn 'A.NGUYEN@EMAIL.COM' với 'a.nguyen@email.com'. Nhưng nếu "
   "cột dùng collation phân biệt hoa/thường (vd <b>utf8mb4_bin</b>), câu này sẽ BỎ SÓT cặp đó "
   "→ khi ấy cần Câu 6.<br/>"
   "(2) <b>Trùng do khoảng trắng thừa</b> — '  test@mail.com' khác 'test@mail.com' "
   "→ dùng Câu 4 để phát hiện.",
},


# ─────────────────────────────────────────────────────────
{
 "part": 0, "id": 2,
 "title": "Tìm trùng theo nhiều cột (composite key)",
 "situation":
   "Quy tắc nghiệp vụ: mỗi đơn hàng không được chứa cùng một sản phẩm "
   "ở hai dòng riêng biệt. Tổ hợp <b>(order_id, product_id)</b> phải là "
   "duy nhất trong Order_Items. Nếu app bị double-submit hoặc thiếu kiểm "
   "tra, một sản phẩm có thể lọt vào hai lần.",
 "before_label": "Bảng Order_Items — dòng đỏ: cặp (order_id, product_id) xuất hiện lần 2:",
 "before_cols": ["item_id","order_id","product_id","quantity","price"],
 "before_rows": [
   [1,"ORD_001","PROD_001",1,"30.000.000"],
   [2,"ORD_001","PROD_002",1, "2.000.000"],
   [4,"ORD_002","PROD_001",1,"30.000.000"],
   [5,"ORD_002","PROD_004",1, "1.000.000"],
   [6,"ORD_003","PROD_003",1, "8.000.000"],
   [7,"ORD_001","PROD_001",1,"30.000.000"],
   [8,"ORD_005","PROD_004",1,"1.000.000"],
   [9,"ORD_005","PROD_002",1,"2.000.000"],
 ],
 "before_bugs": [5],
 "sql": (
   "SELECT order_id,\n"
   "       product_id,\n"
   "       COUNT(*) AS so_lan\n"
   "FROM   Order_Items\n"
   "GROUP  BY order_id, product_id\n"
   "HAVING COUNT(*) > 1;"
 ),
 "clauses": [
   ("FROM Order_Items",
    "MySQL tải toàn bộ bảng <b>Order_Items</b> — 8 dòng trong ví dụ."),
   ("GROUP BY order_id, product_id",
    "<b>Gom nhóm</b> theo tổ hợp hai cột. Mỗi nhóm đại diện "
    "cho một cặp (đơn hàng, sản phẩm) duy nhất."),
   ("HAVING COUNT(*) > 1",
    "<b>Lọc nhóm</b>: chỉ giữ những tổ hợp xuất hiện nhiều hơn "
    "1 lần — vi phạm tính duy nhất nghiệp vụ."),
   ("SELECT order_id, product_id,\n       COUNT(*) AS so_lan",
    "Chiếu kết quả: tên đơn, tên sản phẩm và số lần trùng."),
 ],
 "explain":
   "Mẫu <b>GROUP BY + HAVING COUNT</b> áp dụng cho khóa tổ hợp.<br/>"
   "Thay vì GROUP BY một cột như email, ta GROUP BY nhiều cột để "
   "đại diện cho quy tắc duy nhất phức tạp hơn.<br/>"
   "Thêm bớt cột trong GROUP BY tùy theo quy tắc nghiệp vụ cần kiểm tra.",
 "result_table": (
   ["order_id","product_id","so_lan"],
   [["ORD_001","PROD_001",2]],
 ),
 "result_note":
   "1 dòng: sản phẩm PROD_001 bị thêm hai lần vào ORD_001. "
   "Cần xóa dòng trùng và thêm UNIQUE(order_id, product_id) vào bảng.",
 "note":
   "Trước khi xóa dòng trùng, hãy kiểm tra:<br/>"
   "(1) Hai dòng có item_id khác nhau không?<br/>"
   "(2) Dòng nào được tạo sau — đó mới là dòng lỗi cần xóa.<br/>"
   "Đừng xóa dựa trên giả định — sai item_id sẽ phá vỡ các bảng liên kết.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 0, "id": 3,
 "title": "Tìm NULL ở cột bắt buộc",
 "situation":
   "Cột email được quy định là bắt buộc trên giao diện đăng ký, nhưng "
   "luồng import dữ liệu cũ hoặc API nội bộ lại không kiểm tra. Kết quả: "
   "một số tài khoản không có email — không thể gửi thông báo, không "
   "thể reset mật khẩu, chiến dịch CRM bị lỗi.",
 "before_label": "Bảng Customers — dòng đỏ: email NULL hoặc chuỗi rỗng:",
 "before_cols": ["customer_id","customer_name","email","status"],
 "before_rows": [
   ["C001","Nguyen Van A",      "a.nguyen@email.com",   "ACTIVE"],
   ["C002","Tran Van B",        "b.tran@email.com",     "ACTIVE"],
   ["C003","Le Thi C",          "c.le@email.com",       "ACTIVE"],
   ["C004","Khach Hang Ao Bug", "trung_email@email.com","ACTIVE"],
   ["C005","Khach Hang Trung",  "trung_email@email.com","ACTIVE"],
   ["C006","Pham Van X",        "(NULL)",               "ACTIVE"],
   ["C007","Nguyen Thi Y",      "",                     "ACTIVE"],
   ["C008","  Pham Van D  ",    "d.pham@email.com",     "ACTIVE"],
   ["C009","Nguyen Van A (2)",  "A.NGUYEN@EMAIL.COM",   "ACTIVE"],
   ["C010","Khach Test VIP",    "vip@email.com",        "ACTIVE"],
 ],
 "before_bugs": [5, 6],
 "before_col_widths": [55, 145, 225, 68],
 "sql": (
   "SELECT customer_id,\n"
   "       customer_name,\n"
   "       email\n"
   "FROM   Customers\n"
   "WHERE  email IS NULL\n"
   "   OR  TRIM(email) = '';"
 ),
 "clauses": [
   ("FROM Customers",
    "MySQL tải toàn bộ bảng <b>Customers</b>."),
   ("WHERE email IS NULL\n   OR  TRIM(email) = ''",
    "Lọc hai kiểu rỗng: <b>IS NULL</b> bắt giá trị chưa có, "
    "<b>TRIM(email) = ''</b> bắt chuỗi rỗng hoặc chỉ có khoảng trắng. "
    "Thiếu một trong hai điều kiện sẽ bỏ sót một kiểu lỗi."),
   ("SELECT customer_id, customer_name, email",
    "Chiếu ra các cột để QA xác minh và báo cáo số lượng bị ảnh hưởng."),
 ],
 "explain":
   "Có <b>hai kiểu rỗng</b> hoàn toàn khác nhau trong SQL:<br/>"
   "(1) <b>NULL</b> — chưa có giá trị, hệ thống không biết email là gì.<br/>"
   "(2) <b>Chuỗi rỗng ''</b> — có giá trị nhưng là rỗng, biết email nhưng không có nội dung.<br/>"
   "Điều kiện <b>email != ''</b> sẽ KHÔNG lọc được NULL vì mọi phép so sánh "
   "với NULL đều trả về UNKNOWN.",
 "result_table": (
   ["customer_id","customer_name","email"],
   [["C006","Pham Van X","(NULL)"],
    ["C007","Nguyen Thi Y",""]],
 ),
 "result_note":
   "Số dòng trả về = quy mô dữ liệu thiếu. Dùng con số này để "
   "viết defect report mức độ ảnh hưởng.",
 "note":
   "Đừng chỉ kiểm tra <b>IS NULL</b> — đó chỉ là một nửa bức tranh.<br/>"
   "(1) <b>Chuỗi rỗng</b>: hệ thống cũ thường lưu '' thay cho NULL "
   "→ cần thêm điều kiện <b>TRIM(email) = ''</b>.<br/>"
   "(2) <b>Khoảng trắng thừa</b>: '  test@email.com' vẫn được lưu nhưng "
   "sau TRIM mới lộ ra là chuỗi rỗng → kết hợp cả hai điều kiện vào một câu lệnh.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 0, "id": 4,
 "title": "Phát hiện khoảng trắng thừa và ký tự ẩn",
 "situation":
   "Người dùng copy-paste tên từ Excel hoặc nhập trên điện thoại dễ "
   "kéo theo dấu cách thừa ở đầu/cuối. Kết quả: 'Tran Van B' và "
   "'  Tran Van B  ' bị coi là hai người khác nhau — trùng lặp logic "
   "nhưng không bị bắt bởi kiểm tra UNIQUE thông thường.",
 "before_label": "Bảng Customers — dòng đỏ: tên có khoảng trắng thừa:",
 "before_cols": ["customer_id","customer_name","status"],
 "before_rows": [
   ["C001","Nguyen Van A",      "ACTIVE"],
   ["C002","Tran Van B",        "ACTIVE"],
   ["C003","Le Thi C",          "ACTIVE"],
   ["C004","Khach Hang Ao Bug", "ACTIVE"],
   ["C005","Khach Hang Trung",  "ACTIVE"],
   ["C006","Pham Van X",        "ACTIVE"],
   ["C007","Nguyen Thi Y",      "ACTIVE"],
   ["C008","  Pham Van D  ",    "ACTIVE"],
   ["C009","Nguyen Van A (2)",  "ACTIVE"],
   ["C010","Khach Test VIP",    "ACTIVE"],
 ],
 "before_bugs": [7],
 "before_col_widths": [55, 310, 128],
 "sql": (
   "SELECT customer_id,\n"
   "       customer_name,\n"
   "       CHAR_LENGTH(customer_name)          AS do_dai_goc,\n"
   "       CHAR_LENGTH(TRIM(customer_name))     AS do_dai_sau_trim\n"
   "FROM   Customers\n"
   "WHERE  customer_name != TRIM(customer_name);"
 ),
 "clauses": [
   ("FROM Customers",
    "MySQL tải toàn bộ bảng <b>Customers</b>."),
   ("WHERE customer_name\n  != TRIM(customer_name)",
    "Lọc dòng mà độ dài gốc khác độ dài sau khi cắt trắng — "
    "tức là tồn tại khoảng trắng thừa ở đầu hoặc cuối."),
   ("SELECT ...,\n       CHAR_LENGTH(customer_name),\n       CHAR_LENGTH(TRIM(...))",
    "Hiển thị độ dài gốc và sau trim để thấy <b>chênh lệch bao nhiêu ký tự</b>."),
 ],
 "explain":
   "<b>TRIM</b> chỉ cắt khoảng trắng ở hai đầu, không xóa khoảng trắng ở giữa tên.<br/>"
   "So sánh CHAR_LENGTH trước và sau TRIM để đo chính xác có bao nhiêu ký tự thừa.<br/>"
   "Nếu cần bắt cả tab (\\t) hay xuống dòng (\\n), dùng thêm REPLACE hoặc REGEXP.",
 "result_table": (
   ["customer_id","customer_name","do_dai_goc","do_dai_sau_trim"],
   [["C008","  Pham Van D  ","14","10"]],
 ),
 "result_note":
   "Mỗi dòng trả về cần được chuẩn hóa bằng UPDATE ... SET customer_name = TRIM(customer_name).",
 "note":
   "<b>TRIM</b> trong MySQL chỉ cắt dấu cách thường (ASCII 32).<br/>"
   "Nếu dữ liệu nhập từ Excel, có thể tồn tại ký tự "
   "<b>non-breaking space</b> (\\u00a0) — TRIM sẽ không bắt được.<br/>"
   "Xử lý bổ sung bằng: <b>REPLACE(customer_name, CHAR(160), '')</b> "
   "trước khi so sánh hoặc chuẩn hóa.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 0, "id": 5,
 "title": "Kiểm tra bản ghi mồ côi (foreign key orphan)",
 "situation":
   "Bảng Orders có cột customer_id liên kết sang Customers. Nếu "
   "FK constraint bị tắt hoặc dữ liệu được import thủ công, có thể "
   "xuất hiện đơn hàng với customer_id không tồn tại — orphan record. "
   "Báo cáo doanh thu sẽ sai vì không join được thông tin khách.",
 "before_label": "Bảng Orders — dòng đỏ: customer_id không có trong Customers:",
 "before_cols": ["order_id","customer_id","total_amount","status"],
 "before_rows": [
   ["ORD_001","C001","32.000.000","COMPLETED"],
   ["ORD_002","C002","20.000.000","COMPLETED"],
   ["ORD_003","C003"," 8.000.000","CANCELLED"],
   ["ORD_004","C999"," 5.000.000","PENDING"],
   ["ORD_005","C001","15.000.000","CANCELLED"],
 ],
 "before_bugs": [3],
 "sql": (
   "SELECT o.order_id,\n"
   "       o.customer_id\n"
   "FROM   Orders o\n"
   "  LEFT JOIN Customers c ON o.customer_id = c.customer_id\n"
   "WHERE  c.customer_id IS NULL;"
 ),
 "clauses": [
   ("FROM Orders o\n  LEFT JOIN Customers c\n    ON o.customer_id = c.customer_id",
    "<b>LEFT JOIN</b> giữ lại TẤT CẢ dòng trong Orders — kể cả dòng "
    "không khớp với bất kỳ dòng nào trong Customers. "
    "Với INNER JOIN, dòng orphan sẽ biến mất và không phát hiện được."),
   ("WHERE c.customer_id IS NULL",
    "Sau LEFT JOIN, những dòng Orders không khớp sẽ có "
    "c.customer_id = NULL. Lọc đúng các dòng đó."),
   ("SELECT o.order_id, o.customer_id",
    "Chiếu ra order_id và customer_id để xác định đơn hàng nào bị mồ côi."),
 ],
 "explain":
   "Kỹ thuật <b>LEFT JOIN + WHERE IS NULL</b> là cách chuẩn để tìm orphan record.<br/>"
   "Nguyên lý: LEFT JOIN giữ nguyên tất cả dòng bên trái. "
   "Những dòng không có cặp bên phải sẽ có giá trị NULL ở mọi cột của bảng phải.<br/>"
   "Ta lọc đúng điều kiện đó để xác định bản ghi mồ côi.",
 "result_table": (
   ["order_id","customer_id"],
   [["ORD_004","C999"]],
 ),
 "result_note":
   "ORD_004 không có chủ. Cần xác minh: customer C999 có thực tồn tại "
   "nhưng bị xóa nhầm, hay đây là đơn hàng được tạo bởi bug?",
 "note":
   "Câu lệnh này kiểm tra chiều <b>Orders → Customers</b> (đơn hàng không có khách hàng).<br/>"
   "Cần kiểm tra thêm các chiều khác:<br/>"
   "(1) <b>Order_Items → Products</b>: item có product_id không tồn tại — phát hiện bằng "
   "cùng kỹ thuật LEFT JOIN ... IS NULL (hoặc NOT EXISTS), chỉ đổi cặp bảng.<br/>"
   "(2) <b>Order_Items → Orders</b>: item thuộc order_id không tồn tại.<br/>"
   "Cả hai đều là orphan nhưng ở tầng bảng khác nhau.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 0, "id": 6,
 "title": "Tìm trùng không phân biệt hoa/thường",
 "situation":
   "Database lưu email theo kiểu người dùng nhập — 'Test@Mail.com' và "
   "'test@mail.com' là cùng một địa chỉ nhưng MySQL mặc định phân biệt "
   "hoa/thường trong một số collation. Kiểm tra UNIQUE trên cột gốc "
   "sẽ bỏ qua dạng trùng này.",
 "before_label": "Bảng Customers — dòng đỏ: email trùng khi so sánh không phân biệt hoa/thường:",
 "before_cols": ["customer_id","customer_name","email","status"],
 "before_rows": [
   ["C001","Nguyen Van A",      "a.nguyen@email.com",   "ACTIVE"],
   ["C002","Tran Van B",        "b.tran@email.com",     "ACTIVE"],
   ["C003","Le Thi C",          "c.le@email.com",       "ACTIVE"],
   ["C004","Khach Hang Ao Bug", "trung_email@email.com","ACTIVE"],
   ["C005","Khach Hang Trung",  "trung_email@email.com","ACTIVE"],
   ["C006","Pham Van X",        "(NULL)",               "ACTIVE"],
   ["C007","Nguyen Thi Y",      "",                     "ACTIVE"],
   ["C008","  Pham Van D  ",    "d.pham@email.com",     "ACTIVE"],
   ["C009","Nguyen Van A (2)",  "A.NGUYEN@EMAIL.COM",   "ACTIVE"],
   ["C010","Khach Test VIP",    "vip@email.com",        "ACTIVE"],
 ],
 "before_bugs": [3, 4, 8],
 "before_col_widths": [55, 145, 225, 68],
 "sql": (
   "SELECT LOWER(email)   AS email_chuan,\n"
   "       COUNT(*)        AS so_lan\n"
   "FROM   Customers\n"
   "GROUP  BY LOWER(email)\n"
   "HAVING COUNT(*) > 1\n"
   "ORDER  BY so_lan DESC;"
 ),
 "clauses": [
   ("FROM Customers",
    "MySQL tải toàn bộ bảng <b>Customers</b>."),
   ("GROUP BY LOWER(email)",
    "<b>LOWER(email)</b> chuyển về chữ thường trước khi gom nhóm. "
    "Nhờ vậy 'A.NGUYEN@EMAIL.COM' và 'a.nguyen@email.com' rơi vào "
    "cùng một nhóm."),
   ("HAVING COUNT(*) > 1",
    "Chỉ giữ nhóm có nhiều hơn 1 bản ghi — email trùng sau khi chuẩn hóa."),
   ("SELECT LOWER(email) AS email_chuan,\n       COUNT(*) AS so_lan",
    "Chiếu email đã chuẩn hóa và số lần trùng."),
   ("ORDER BY so_lan DESC",
    "Email trùng nhiều nhất hiện lên đầu."),
 ],
 "explain":
   "Bọc cột trong hàm <b>LOWER()</b> trước GROUP BY là kỹ thuật chuẩn hóa trước khi gom nhóm.<br/>"
   "Áp dụng tương tự với <b>UPPER()</b>, <b>TRIM()</b>, hay kết hợp cả hai "
   "tùy theo loại dữ liệu cần kiểm tra.",
 "result_table": (
   ["email_chuan","so_lan"],
   [["a.nguyen@email.com",    2],
    ["trung_email@email.com", 2]],
 ),
 "result_note":
   "2 cặp trùng sau khi chuẩn hóa hoa/thường: <b>a.nguyen@email.com</b> (C001 + C009) "
   "và <b>trung_email@email.com</b> (C004 + C005). "
   "Trên DB mẫu (collation không phân biệt hoa/thường) Câu 1 cũng ra đúng hai cặp này; "
   "LOWER() ở đây đảm bảo phát hiện ĐÚNG bất kể collation — quan trọng khi bạn không chắc "
   "cột đang dùng collation nào.",
 "note":
   "Câu lệnh này chỉ cần thiết khi collation của cột là <b>case-sensitive</b> (vd: utf8mb4_bin).<br/>"
   "Nếu bảng dùng <b>utf8mb4_unicode_ci</b> (case-insensitive), MySQL tự động "
   "so sánh không phân biệt hoa/thường — Câu 1 đã đủ, câu này thừa.<br/>"
   "Kiểm tra collation trước khi quyết định dùng: <b>SHOW FULL COLUMNS FROM Customers;</b>",
},
# ─────────────────────────────────────────────────────────
{
 "part": 0, "id": 7,
 "title": "Đếm giá trị NULL theo từng cột",
 "situation":
   "Thay vì kiểm tra NULL từng cột riêng lẻ, câu lệnh này cho ra một "
   "bảng tổng hợp — mỗi cột một ô — để QA thấy ngay bức tranh toàn cảnh: "
   "cột nào bị thiếu nhiều nhất, ưu tiên xử lý cột nào trước.",
 "before_label": "Bảng Products — dòng đỏ: có giá trị NULL trong cột số:",
 "before_cols": ["product_id","product_name","price","stock"],
 "before_rows": [
   ["PROD_001","iPhone 15 Pro Max",        "30.000.000","50"],
   ["PROD_002","Ban phim co Logitech",     "2.000.000", "100"],
   ["PROD_003","Tai nghe Sony WH-1000XM5", "8.000.000", "-5"],
   ["PROD_004","Sac du phong Anker",       "1.000.000", "20"],
   ["PROD_005","Ban phim co Logitech",     "2.000.000", "30"],
   ["PROD_006","Loa Bluetooth JBL",        "(NULL)",    "10"],
   ["PROD_007","Chuot gaming Razer",       "1.500.000", "(NULL)"],
 ],
 "before_bugs": [5, 6],
 "before_col_widths": [65, 220, 108, 100],
 "sql": (
   "SELECT\n"
   "  SUM(CASE WHEN product_name IS NULL THEN 1 ELSE 0 END) AS null_ten,\n"
   "  SUM(CASE WHEN price        IS NULL THEN 1 ELSE 0 END) AS null_gia,\n"
   "  SUM(CASE WHEN stock        IS NULL THEN 1 ELSE 0 END) AS null_ton\n"
   "FROM Products;"
 ),
 "clauses": [
   ("FROM Products",
    "MySQL tải toàn bộ bảng <b>Products</b>."),
   ("SUM(CASE WHEN ... IS NULL\n     THEN 1 ELSE 0 END)",
    "Với mỗi dòng, <b>CASE WHEN</b> trả về 1 nếu cột là NULL, "
    "0 nếu không. <b>SUM</b> cộng lại — kết quả là tổng số NULL của cột đó. "
    "Áp dụng lặp lại cho từng cột cần kiểm tra."),
   ("SELECT null_ten, null_gia, null_ton",
    "Kết quả là <b>1 dòng duy nhất</b> chứa số NULL của mỗi cột — "
    "dạng báo cáo nhanh cho QA."),
 ],
 "explain":
   "Kỹ thuật <b>CASE WHEN + SUM</b> là cách pivot đơn giản: chuyển điều kiện thành số rồi tổng hợp.<br/>"
   "Không cần GROUP BY vì toàn bộ bảng là một nhóm duy nhất — kết quả trả về chỉ 1 dòng.<br/>"
   "Mở rộng bằng cách thêm cột vào SELECT để kiểm tra nhiều trường trong một lần chạy.",
 "result_table": (
   ["null_ten","null_gia","null_ton"],
   [["0","1","1"]],
 ),
 "result_note":
   "Cột price và stock đều có 1 NULL — cần điều tra nguồn dữ liệu "
   "và quyết định giá trị mặc định.",
 "note":
   "Mở rộng câu lệnh sang bảng <b>Customers</b> để tạo báo cáo chất lượng dữ liệu tổng thể:<br/>"
   "(1) Đếm NULL theo từng cột: <b>null_email</b>, <b>null_tier</b>, <b>null_status</b>.<br/>"
   "(2) Chạy ngay đầu sprint — phát hiện sớm giúp team thống nhất giá trị mặc định "
   "trước khi viết test case.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 0, "id": 8,
 "title": "Tìm bản ghi trùng hoàn toàn (full duplicate)",
 "situation":
   "Khác với trùng ID, full duplicate là hai dòng có toàn bộ giá "
   "nghiệp vụ giống nhau nhưng ID tự sinh khác nhau — thường xảy ra "
   "khi người dùng bấm nút 'Lưu' hai lần hoặc import dữ liệu không "
   "kiểm tra trùng trước.",
 "before_label": "Bảng Products — dòng đỏ: cùng tên và giá với dòng khác:",
 "before_cols": ["product_id","product_name","category","price","stock"],
 "before_rows": [
   ["PROD_001","iPhone 15 Pro Max",        "Dien thoai","30.000.000","50"],
   ["PROD_002","Ban phim co Logitech",     "Phu kien",  "2.000.000", "100"],
   ["PROD_003","Tai nghe Sony WH-1000XM5", "Phu kien",  "8.000.000", "-5"],
   ["PROD_004","Sac du phong Anker",       "Phu kien",  "1.000.000", "20"],
   ["PROD_005","Ban phim co Logitech",     "Phu kien",  "2.000.000", "30"],
   ["PROD_006","Loa Bluetooth JBL",        "Phu kien",  "(NULL)",    "10"],
   ["PROD_007","Chuot gaming Razer",       "Phu kien",  "1.500.000", "(NULL)"],
 ],
 "before_bugs": [4],
 "before_col_widths": [58, 175, 75, 95, 90],
 "sql": (
   "SELECT product_name,\n"
   "       price,\n"
   "       COUNT(*) AS so_lan\n"
   "FROM   Products\n"
   "GROUP  BY product_name, price\n"
   "HAVING COUNT(*) > 1;"
 ),
 "clauses": [
   ("FROM Products",
    "MySQL tải toàn bộ bảng <b>Products</b>."),
   ("GROUP BY product_name, price",
    "Gom nhóm theo tổ hợp các cột nghiệp vụ — ở đây là tên sản phẩm "
    "và giá. Thêm category vào GROUP BY nếu muốn kiểm tra chặt hơn."),
   ("HAVING COUNT(*) > 1",
    "Lọc nhóm có nhiều hơn 1 dòng — tức là cùng tên và giá xuất hiện lặp lại."),
   ("SELECT product_name, price,\n       COUNT(*) AS so_lan",
    "Chiếu tên, giá và số lần trùng để xác định bản ghi cần xóa."),
 ],
 "explain":
   "Định nghĩa 'trùng hoàn toàn' phụ thuộc vào nghiệp vụ: có thể trùng theo 2, 3 hoặc toàn bộ cột.<br/>"
   "Hãy thêm bớt cột trong GROUP BY tùy theo ngữ cảnh — "
   "chỉ đưa vào những cột đại diện cho giá trị nghiệp vụ, không phải ID tự sinh.",
 "result_table": (
   ["product_name","price","so_lan"],
   [["Ban phim co Logitech","2.000.000",2]],
 ),
 "result_note":
   "Cần xác định PROD_002 hay PROD_005 là bản gốc trước khi xóa. "
   "Kiểm tra xem bản nào có Order_Items liên kết.",
 "note":
   "Trước khi xóa, hãy xem đầy đủ cả hai dòng để quyết định đúng:<br/>"
   "<b>SELECT * FROM Products</b><br/>"
   "<b>WHERE product_name = 'Ban phim co Logitech' AND price = 2000000;</b><br/>"
   "Kiểm tra thêm: dòng nào đang có <b>Order_Items</b> liên kết — "
   "đó là bản gốc, dòng còn lại mới là bản trùng cần xóa.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 0, "id": 9,
 "title": "Kiểm tra giá trị ngoài danh sách cho phép (ENUM check)",
 "situation":
   "Cột membership_tier chỉ được nhận một trong bốn giá trị: Standard, "
   "Silver, Gold, Platinum. Nếu tầng ứng dụng không validate, hoặc dữ "
   "liệu được nhập thẳng vào DB qua script, các giá trị lạ sẽ lọt vào "
   "và làm vỡ logic ưu đãi.",
 "before_label": "Bảng Customers — dòng đỏ: membership_tier ngoài danh sách hợp lệ:",
 "before_cols": ["customer_id","customer_name","membership_tier","status"],
 "before_rows": [
   ["C001","Nguyen Van A",      "Silver",   "ACTIVE"],
   ["C002","Tran Van B",        "Standard", "ACTIVE"],
   ["C003","Le Thi C",          "Gold",     "ACTIVE"],
   ["C004","Khach Hang Ao Bug", "Standard", "ACTIVE"],
   ["C005","Khach Hang Trung",  "Standard", "ACTIVE"],
   ["C006","Pham Van X",        "Standard", "ACTIVE"],
   ["C007","Nguyen Thi Y",      "Standard", "ACTIVE"],
   ["C008","  Pham Van D  ",    "Gold",     "ACTIVE"],
   ["C009","Nguyen Van A (2)",  "Silver",   "ACTIVE"],
   ["C010","Khach Test VIP",    "VIP",      "ACTIVE"],
 ],
 "before_bugs": [9],
 "before_col_widths": [55, 145, 115, 178],
 "sql": (
   "SELECT customer_id,\n"
   "       customer_name,\n"
   "       membership_tier\n"
   "FROM   Customers\n"
   "WHERE  membership_tier NOT IN ('Standard','Silver','Gold','Platinum');"
 ),
 "clauses": [
   ("FROM Customers",
    "MySQL tải toàn bộ bảng <b>Customers</b>."),
   ("WHERE membership_tier\n  NOT IN ('Standard','Silver',\n          'Gold','Platinum')",
    "<b>NOT IN</b> lọc tất cả dòng có giá trị không nằm trong danh sách. "
    "Lưu ý: NULL sẽ KHÔNG khớp NOT IN — cần thêm <b>OR membership_tier IS NULL</b> "
    "nếu muốn bắt cả NULL."),
   ("SELECT customer_id, customer_name,\n       membership_tier",
    "Chiếu đủ thông tin để QA xác minh và cập nhật về giá trị đúng."),
 ],
 "explain":
   "<b>NOT IN + danh sách tường minh</b> là cách nhanh nhất để kiểm tra ENUM không được enforce ở tầng DB.<br/>"
   "Pattern này áp dụng cho MỌI cột có danh sách giá trị cố định trong hệ thống — chỉ đổi tên "
   "cột/bảng và danh sách hợp lệ, cấu trúc câu lệnh giữ nguyên:<br/>"
   "(1) <b>Orders.status</b>: <b>NOT IN ('COMPLETED','PENDING','CANCELLED','PROCESSING')</b> "
   "— chạy trên data mẫu cho kết quả rỗng (4 trạng thái đều hợp lệ, xác nhận sạch).<br/>"
   "(2) <b>Customers.status</b>: <b>NOT IN ('ACTIVE','INACTIVE','SUSPENDED')</b> "
   "— cũng cho kết quả rỗng, nhưng lưu ý data mẫu toàn ACTIVE nên chưa kiểm thử được "
   "luồng deactivate/suspend tài khoản — khi viết test case cần bổ sung data có đủ trạng thái.<br/>"
   "Kết quả rỗng không phải thất bại — đó là confirmation hệ thống đang đúng, và câu lệnh "
   "nên chạy định kỳ hoặc sau mỗi lần migrate dữ liệu để phát hiện sớm giá trị lạ.",
 "result_table": (
   ["customer_id","customer_name","membership_tier"],
   [["C010","Khach Test VIP","VIP"]],
 ),
 "result_note":
   "1 bản ghi có tier không hợp lệ. Cần cập nhật về giá trị đúng "
   "và bổ sung CHECK constraint hoặc ENUM type trong DB.",
 "note":
   "Cạm bẫy với <b>NOT IN</b>: nếu danh sách chứa NULL, toàn bộ điều kiện trả về UNKNOWN.<br/>"
   "Ví dụ: <b>WHERE tier NOT IN ('Standard', NULL)</b> — không trả về dòng nào, "
   "kể cả dòng có tier = 'VIP'.<br/>"
   "Quy tắc: <b>luôn đảm bảo danh sách NOT IN không chứa NULL</b> — "
   "hoặc dùng NOT EXISTS thay thế để an toàn hơn. Bẫy này áp dụng cho mọi cột ENUM, "
   "không riêng membership_tier.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 0, "id": 10,
 "title": "Tìm bản ghi xóa mềm vẫn tham gia tính toán",
 "situation":
   "Hệ thống dùng cơ chế <b>soft-delete</b> — khi hủy đơn hàng, cột "
   "<b>deleted_at</b> được ghi thời điểm xóa thay vì xóa hẳn bản ghi. "
   "Tuy nhiên nhiều query báo cáo (tổng doanh thu, số đơn trong tháng…) "
   "quên điều kiện <b>WHERE deleted_at IS NULL</b>, khiến đơn đã hủy vẫn "
   "bị tính vào kết quả. Đây là bug rất phổ biến và khó phát hiện bằng "
   "mắt thường vì dữ liệu 'trông có vẻ đúng'.",
 "before_label": "Bảng Orders — dòng đỏ: đơn ORD_005 đã bị xóa mềm (deleted_at có giá trị) nhưng vẫn nằm trong bảng:",
 "before_cols": ["order_id","customer_id","total_amount","status","deleted_at"],
 "before_rows": [
   ["ORD_001","C001","32.000.000","COMPLETED",None],
   ["ORD_002","C002","20.000.000","COMPLETED",None],
   ["ORD_003","C003","8.000.000","CANCELLED",None],
   ["ORD_004","C999","5.000.000","PENDING",None],
   ["ORD_005","C001","15.000.000","CANCELLED","2026-06-25 10:30:00"],
 ],
 "before_bugs": [4],
 "sql": (
   "SELECT o.order_id,\n"
   "       o.total_amount,\n"
   "       o.status,\n"
   "       o.deleted_at\n"
   "FROM   Orders o\n"
   "WHERE  o.deleted_at IS NOT NULL;"
 ),
 "clauses": [
   ("FROM Orders o",
    "Quét toàn bộ bảng Orders — bao gồm cả bản ghi đã bị xóa mềm."),
   ("WHERE o.deleted_at IS NOT NULL",
    "<b>deleted_at IS NOT NULL</b>: lọc ra các đơn hàng đã bị đánh dấu xóa. "
    "Bản ghi vẫn tồn tại trong bảng nhưng lẽ ra không được tham gia "
    "vào bất kỳ phép tính nào."),
   ("SELECT o.order_id, o.total_amount,\n       o.status, o.deleted_at",
    "Chiếu đủ thông tin để QA đối chiếu: đơn nào bị xóa, "
    "số tiền bao nhiêu, trạng thái gì — từ đó kiểm tra xem query "
    "báo cáo có đang cộng nhầm những đơn này không."),
 ],
 "explain":
   "Cơ chế <b>soft-delete</b> giữ lại bản ghi để phục vụ audit trail, "
   "nhưng yêu cầu <b>mọi query nghiệp vụ</b> đều phải thêm điều kiện "
   "<code>WHERE deleted_at IS NULL</code>.<br/>"
   "Bug xảy ra khi developer viết query mới mà quên điều kiện này — "
   "đơn đã xóa lặng lẽ cộng vào tổng doanh thu.<br/>"
   "QA nên chạy câu này để biết có bao nhiêu bản ghi soft-delete, "
   "sau đó đối soát với báo cáo tổng hợp để phát hiện chênh lệch.",
 "result_table": (
   ["order_id","total_amount","status","deleted_at"],
   [["ORD_005","15.000.000","CANCELLED","2026-06-25 10:30:00"]],
 ),
 "result_note":
   "ORD_005 đã bị xóa mềm nhưng vẫn nằm trong bảng. "
   "Nếu query báo cáo không lọc deleted_at, tổng doanh thu "
   "sẽ bị thổi phồng thêm 15 triệu.",
 "note":
   "<b>Soft-delete là pattern phổ biến</b> — hầu hết hệ thống e-commerce, "
   "CRM, ERP đều dùng cơ chế này thay vì xóa cứng (hard delete).<br/>"
   "Khi test, QA cần kiểm tra <b>mọi màn hình báo cáo</b> và đảm bảo chúng "
   "có điều kiện lọc bản ghi đã xóa.<br/>"
   "Mẹo: tìm trong code tất cả câu SELECT trên bảng có cột deleted_at — "
   "câu nào thiếu <code>WHERE deleted_at IS NULL</code> là nghi vấn bug.",
},


# ─────────────────────────────────────────────────────────
{
 "part": 1, "id": 11,
 "title": "Đối soát tổng tiền đơn hàng với chi tiết items",
 "situation":
   "Hệ thống lưu <b>total_amount</b> trong Orders nhưng không tự đối soát với "
   "tổng tính từ Order_Items. Khi có dữ liệu nhân đôi hoặc bug logic, "
   "hai con số lặng lẽ lệch nhau mà không có cảnh báo nào.",
 "before_label": "Bảng Orders — dòng đỏ: total_amount lệch với tổng Order_Items:",
 "before_cols": ["order_id","customer_id","total_amount","status","order_date"],
 "before_rows": [
   ["ORD_001","C001","32.000.000","COMPLETED","2026-06-20"],
   ["ORD_002","C002","20.000.000","COMPLETED","2026-06-22"],
   ["ORD_003","C003","8.000.000","CANCELLED","2026-06-23"],
   ["ORD_004","C999","5.000.000","PENDING","2026-06-24"],
   ["ORD_005","C001","15.000.000","CANCELLED","2026-06-25"],
 ],
 "before_bugs": [0, 1],
 "before_col_widths": [65, 80, 105, 95, 148],
 "sql": (
   "SELECT o.order_id,\n"
   "       o.total_amount                AS ghi_trong_don,\n"
   "       SUM(i.quantity * i.price)     AS tinh_tu_items,\n"
   "       o.total_amount\n"
   "         - SUM(i.quantity * i.price) AS chenh_lech\n"
   "FROM   Orders o\n"
   "JOIN   Order_Items i ON o.order_id = i.order_id\n"
   "GROUP  BY o.order_id, o.total_amount\n"
   "HAVING SUM(i.quantity * i.price) != o.total_amount;"
 ),
 "clauses": [
   ("FROM Orders o\n  JOIN Order_Items i\n    ON o.order_id = i.order_id",
    "<b>INNER JOIN</b> ghép mỗi đơn hàng với tất cả items của nó. "
    "Đơn không có item sẽ bị bỏ qua — dùng LEFT JOIN + Câu 15 để bắt thêm."),
   ("GROUP BY o.order_id, o.total_amount",
    "Gom toàn bộ items của cùng một đơn thành một nhóm. "
    "total_amount cần có trong GROUP BY vì được dùng trong HAVING."),
   ("HAVING SUM(i.quantity * i.price)\n  != o.total_amount",
    "<b>HAVING</b> lọc sau khi đã tính aggregate — chỉ giữ đơn "
    "có tổng items khác với total_amount đã ghi."),
   ("SELECT ..., chenh_lech",
    "Hiển thị cả ba con số: ghi bao nhiêu, tính ra bao nhiêu, chênh lệch bao nhiêu — "
    "đủ thông tin để QA viết defect report."),
 ],
 "explain":
   "Kỹ thuật <b>JOIN + GROUP BY + HAVING</b> để đối soát header-detail: "
   "total_amount trong Orders phải bằng SUM(quantity × price) từ Order_Items.<br/>"
   "Kết quả phát hiện <b>hai nguyên nhân khác nhau</b>:<br/>"
   "(1) ORD_001 lệch vì item bị nhân đôi (item 1 và item 7 cùng order + product).<br/>"
   "(2) ORD_002 lệch vì total_amount bị ghi sai thủ công (Bug-B).<br/>"
   "Cùng triệu chứng nhưng cách xử lý khác nhau — cần tra log để phân biệt.",
 "result_table": (
   ["order_id","ghi_trong_don","tinh_tu_items","chenh_lech"],
   [
     ["ORD_001","32.000.000","62.000.000","-30.000.000"],
     ["ORD_002","20.000.000","31.000.000","-11.000.000"],
     ["ORD_005","15.000.000","3.000.000","12.000.000"],
   ]
 ),
 "result_note":
   "3 đơn lệch: ORD_001 do item trùng (62M vs 32M); "
   "ORD_002 do total_amount ghi sai (31M vs 20M); "
   "ORD_005 đã bị xóa mềm nhưng vẫn tham gia đối soát — minh họa bug Câu 10 (soft-delete leak).",
 "note":
   "INNER JOIN làm ẩn các đơn không có item — những đơn này có thể có total_amount > 0 "
   "nhưng không bao giờ xuất hiện trong kết quả câu này.<br/>"
   "Kết hợp với <b>Câu 15</b> để kiểm tra toàn diện:<br/>"
   "(1) Câu 11: đơn có item nhưng tổng lệch → bug tính toán hoặc dữ liệu nhân đôi.<br/>"
   "(2) Câu 15: đơn không có item nào → trường hợp nghiêm trọng hơn.<br/>"
   "<b>Cảnh báo 'fan-out':</b> mẫu JOIN + SUM này chỉ đúng khi đối soát với MỘT bảng con "
   "(Order_Items). Nếu JOIN thêm bảng con thứ hai (vd Order_Discounts, Shipments), mỗi dòng "
   "đơn bị nhân bản và SUM sẽ phồng sai toàn bộ. Khi có nhiều bảng con, hãy gộp (aggregate) "
   "từng bảng trong subquery riêng rồi mới JOIN các kết quả đã gộp.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 1, "id": 12,
 "title": "Phát hiện tồn kho âm hoặc NULL",
 "situation":
   "Cột <b>stock</b> có hai kiểu lỗi cần soi cùng lúc: giá trị <b>âm</b> (bán quá số lượng "
   "thực có) và giá trị <b>NULL</b> (chưa từng được nhập kho). Hai lỗi này có nguyên nhân và "
   "cách xử lý khác hẳn nhau, nhưng đều khiến trang sản phẩm hiển thị sai tình trạng còn hàng.",
 "before_label": "Bảng Products — dòng đỏ: stock âm (Bug-C) và stock NULL:",
 "before_cols": ["product_id","product_name","category","price","stock"],
 "before_rows": [
   ["PROD_001","iPhone 15 Pro Max","Dien thoai","30.000.000",50],
   ["PROD_002","Ban phim co Logitech","Phu kien","2.000.000",100],
   ["PROD_003","Tai nghe Sony WH-1000XM5","Phu kien","8.000.000",-5],
   ["PROD_004","Sac du phong Anker","Phu kien","1.000.000",20],
   ["PROD_005","Ban phim co Logitech","Phu kien","2.000.000",30],
   ["PROD_006","Loa Bluetooth JBL","Phu kien","(NULL)",10],
   ["PROD_007","Chuot gaming Razer","Phu kien","1.500.000","(NULL)"],
 ],
 "before_bugs": [2, 6],
 "before_col_widths": [65, 178, 65, 90, 95],
 "sql": (
   "SELECT product_id,\n"
   "       product_name,\n"
   "       stock\n"
   "FROM   Products\n"
   "WHERE  stock < 0\n"
   "    OR stock IS NULL;"
 ),
 "clauses": [
   ("FROM Products",
    "MySQL tải toàn bộ bảng <b>Products</b>."),
   ("WHERE stock < 0\n    OR stock IS NULL",
    "Hai điều kiện gộp bằng OR: <b>stock &lt; 0</b> bắt tồn kho âm; "
    "<b>stock IS NULL</b> bắt dữ liệu chưa nhập. Không thể dùng <b>= NULL</b> vì "
    "NULL = NULL trả về UNKNOWN, không phải TRUE — đây là lỗi phổ biến nhất khi mới học SQL."),
   ("SELECT product_id, product_name, stock",
    "Chiếu đủ thông tin để QA xác định sản phẩm và mức độ lệch."),
 ],
 "explain":
   "Câu lệnh đơn giản nhưng <b>cực kỳ quan trọng</b> trong kiểm thử e-commerce — gộp hai loại "
   "lỗi cùng một cột để có báo cáo đầy đủ trong một lần chạy.<br/>"
   "<b>Tồn kho âm</b> thường xảy ra ở hai tình huống: (1) <b>Thiếu CHECK constraint</b> — DB "
   "chấp nhận ngay UPDATE stock = stock - 1 dù stock đang = 0, không báo lỗi gì; "
   "(2) <b>Race condition</b> — hai người cùng đặt hàng lúc còn 1 sản phẩm, cả hai cùng đọc "
   "stock = 1, cùng kiểm tra 'còn hàng', cùng trừ 1 → kết quả cuối stock = -1.<br/>"
   "<b>Tồn kho NULL</b> nghĩa là <b>không có thông tin</b> — khác hẳn với stock = 0 (hết hàng "
   "nhưng đã biết rõ số lượng). Mọi phép so sánh với NULL đều trả về UNKNOWN nên bắt buộc "
   "dùng IS NULL/IS NOT NULL, không thể dùng = hay !=.",
 "result_table": (
   ["product_id","product_name","stock"],
   [
     ["PROD_003","Tai nghe Sony WH-1000XM5",-5],
     ["PROD_007","Chuot gaming Razer","(NULL)"],
   ]
 ),
 "result_note":
   "2 sản phẩm lỗi, hai nguyên nhân khác nhau: PROD_003 tồn kho = -5 (bán quá số lượng — "
   "điều tra race condition hoặc logic trừ kho); PROD_007 tồn kho = NULL (chưa nhập kho — "
   "bổ sung dữ liệu hoặc thêm DEFAULT 0 vào schema).",
 "note":
   "Thêm <b>CHECK constraint</b> vào DB để ngăn giá trị âm từ đầu:<br/>"
   "<b>ALTER TABLE Products ADD CONSTRAINT chk_stock CHECK (stock &gt;= 0);</b><br/>"
   "Constraint này chỉ chặn INSERT/UPDATE mới — dữ liệu âm đã có vẫn giữ nguyên, "
   "vẫn cần chạy câu lệnh trên để dọn dữ liệu cũ.<br/>"
   "CHECK không chặn được NULL (NULL luôn vượt qua mọi CHECK trừ khi thêm NOT NULL) — "
   "muốn bắt buộc phải nhập, thêm riêng <b>NOT NULL</b> cho cột stock.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 1, "id": 14,
 "title": "Phát hiện giá sản phẩm NULL hoặc bằng 0",
 "situation":
   "Sản phẩm có <b>price = NULL</b> hoặc <b>price = 0</b> là dữ liệu chưa hoàn chỉnh. "
   "Nếu trang web tính tổng giỏ hàng bằng SUM(price × quantity), NULL sẽ làm "
   "toàn bộ tổng trả về NULL; price = 0 cho phép mua miễn phí ngoài ý muốn.",
 "before_label": "Bảng Products — dòng đỏ: price = NULL (chưa nhập giá):",
 "before_cols": ["product_id","product_name","category","price","stock"],
 "before_rows": [
   ["PROD_001","iPhone 15 Pro Max","Dien thoai","30.000.000",50],
   ["PROD_002","Ban phim co Logitech","Phu kien","2.000.000",100],
   ["PROD_003","Tai nghe Sony WH-1000XM5","Phu kien","8.000.000",-5],
   ["PROD_004","Sac du phong Anker","Phu kien","1.000.000",20],
   ["PROD_005","Ban phim co Logitech","Phu kien","2.000.000",30],
   ["PROD_006","Loa Bluetooth JBL","Phu kien","(NULL)",10],
   ["PROD_007","Chuot gaming Razer","Phu kien","1.500.000","(NULL)"],
 ],
 "before_bugs": [5],
 "before_col_widths": [65, 178, 65, 90, 95],
 "sql": (
   "SELECT product_id,\n"
   "       product_name,\n"
   "       price\n"
   "FROM   Products\n"
   "WHERE  price IS NULL\n"
   "    OR price <= 0;"
 ),
 "clauses": [
   ("FROM Products",
    "MySQL tải toàn bộ bảng <b>Products</b>."),
   ("WHERE price IS NULL\n    OR price <= 0",
    "<b>IS NULL</b> bắt giá chưa nhập; <b>&lt;= 0</b> bắt giá âm hoặc bằng 0. "
    "Dùng OR để kiểm tra cả hai trường hợp trong một câu lệnh."),
   ("SELECT product_id, product_name, price",
    "Chiếu thông tin để QA xác định sản phẩm cần bổ sung hoặc sửa giá."),
 ],
 "explain":
   "Giá là trường nghiệp vụ quan trọng nhất trong e-commerce.<br/>"
   "Câu lệnh bắt hai loại lỗi:<br/>"
   "(1) <b>NULL</b> — chưa nhập giá, thường xảy ra khi sản phẩm mới được thêm vào nhưng chưa định giá.<br/>"
   "(2) <b>&lt;= 0</b> — giá không hợp lệ: âm hoặc bằng 0 ngoài ý muốn.<br/>"
   "Trong data mẫu, PROD_006 chưa có giá — nếu người dùng thêm vào giỏ hàng, "
   "tổng đơn sẽ trả về NULL.",
 "result_table": (
   ["product_id","product_name","price"],
   [["PROD_006","Loa Bluetooth JBL","(NULL)"]],
 ),
 "result_note":
   "PROD_006 chưa có giá. Cần bổ sung trước khi cho phép bán — "
   "hoặc ẩn sản phẩm này khỏi giao diện người dùng.",
 "note":
   "Để ngăn dữ liệu lỗi ngay từ đầu, schema nên có hai ràng buộc:<br/>"
   "(1) <b>NOT NULL</b> — bắt buộc nhập giá, không cho để trống.<br/>"
   "(2) <b>CHECK (price &gt; 0)</b> — giá phải lớn hơn 0, không cho nhập âm hoặc bằng 0.<br/>"
   "Nếu hệ thống có sản phẩm miễn phí hợp lệ, đổi thành <b>CHECK (price &gt;= 0)</b> "
   "để cho phép price = 0 có chủ đích.<br/>"
   "Tránh đặt <b>DEFAULT 0</b> cho cột price: khi tạo sản phẩm mới mà quên nhập giá, "
   "DB sẽ tự điền 0 thay vì báo lỗi — sản phẩm lặng lẽ lên sàn với giá miễn phí.<br/>"
   "Cùng kỹ thuật này áp dụng được cho <b>Order_Items.price</b> (giá tại thời điểm bán) — "
   "chỉ đổi <b>WHERE price &lt;= 0</b> (cột này NOT NULL theo schema nên không cần nhánh IS "
   "NULL). Hai cột price mang ý nghĩa khác nhau: Products.price là <b>giá niêm yết hiện tại</b>, "
   "Order_Items.price là <b>giá đã chốt lúc khách mua</b> — chúng có thể lệch nhau hợp lệ khi "
   "giá niêm yết đổi sau khi đơn đã tạo (xem Câu 24). Vì vậy cần kiểm tra độc lập trên cả hai "
   "bảng, đặc biệt sau khi deploy tính năng coupon, flash sale, hoặc discount. Thêm CHECK "
   "tương ứng cho Order_Items: <b>ALTER TABLE Order_Items ADD CONSTRAINT chk_item_price "
   "CHECK (price &gt; 0);</b>",
},
# ─────────────────────────────────────────────────────────
{
 "part": 1, "id": 15,
 "title": "Tìm đơn hàng không có dòng chi tiết nào",
 "situation":
   "Mỗi đơn hàng phải có ít nhất một sản phẩm. Đơn rỗng — tồn tại trong Orders "
   "nhưng không có dòng nào trong Order_Items — là dấu hiệu bug luồng xử lý: "
   "đơn được tạo nhưng bước thêm sản phẩm bị lỗi hoặc bị bỏ qua.",
 "before_label": "Bảng Orders — dòng đỏ: ORD_004 không có item nào trong Order_Items:",
 "before_cols": ["order_id","customer_id","total_amount","status","order_date"],
 "before_rows": [
   ["ORD_001","C001","32.000.000","COMPLETED","2026-06-20"],
   ["ORD_002","C002","20.000.000","COMPLETED","2026-06-22"],
   ["ORD_003","C003","8.000.000","CANCELLED","2026-06-23"],
   ["ORD_004","C999","5.000.000","PENDING","2026-06-24"],
   ["ORD_005","C001","15.000.000","CANCELLED","2026-06-25"],
 ],
 "before_bugs": [3],
 "before_col_widths": [65, 80, 105, 95, 148],
 "sql": (
   "SELECT o.order_id,\n"
   "       o.customer_id,\n"
   "       o.total_amount,\n"
   "       o.status\n"
   "FROM   Orders o\n"
   "LEFT JOIN Order_Items i\n"
   "       ON o.order_id = i.order_id\n"
   "WHERE  i.order_id IS NULL;"
 ),
 "clauses": [
   ("FROM Orders o\n  LEFT JOIN Order_Items i\n    ON o.order_id = i.order_id",
    "<b>LEFT JOIN</b> giữ TẤT CẢ đơn hàng, kể cả đơn không có dòng nào "
    "trong Order_Items. Với INNER JOIN, đơn rỗng sẽ biến mất."),
   ("WHERE i.order_id IS NULL",
    "Sau LEFT JOIN, đơn không khớp có toàn bộ cột của Order_Items = NULL. "
    "Lọc những dòng đó là cách nhận diện đơn rỗng — đây là mẫu anti-join."),
   ("SELECT o.order_id, o.customer_id,\n       o.total_amount, o.status",
    "Hiển thị đủ thông tin để QA điều tra: ai đặt, số tiền bao nhiêu, trạng thái gì."),
 ],
 "explain":
   "Kỹ thuật <b>LEFT JOIN + WHERE IS NULL</b> (anti-join) là cách chuẩn để tìm bản ghi không có con.<br/>"
   "Nguyên lý: sau LEFT JOIN, mọi cột từ bảng bên phải sẽ là NULL với những dòng không khớp.<br/>"
   "Trong data mẫu, ORD_004 (khách C999 không tồn tại) cũng không có item nào — "
   "đây là đơn có <b>hai lỗi chồng nhau</b>: orphan customer và rỗng items.",
 "result_table": (
   ["order_id","customer_id","total_amount","status"],
   [["ORD_004","C999","5.000.000","PENDING"]],
 ),
 "result_note":
   "ORD_004 không có item nào và customer_id C999 không tồn tại. "
   "Hai lỗi chồng nhau — cần điều tra lịch sử tạo đơn.",
 "note":
   "Anti-join LEFT JOIN + WHERE IS NULL là pattern dùng lại ở nhiều câu:<br/>"
   "(1) Câu 5: Orders không có Customers — đơn hàng mồ côi.<br/>"
   "(2) Câu 15: Orders không có Order_Items — đơn rỗng.<br/>"
   "(3) Câu 16: Products không có Order_Items — sản phẩm chưa bán.<br/>"
   "Ba câu cùng kỹ thuật nhưng kiểm tra ở ba tầng quan hệ khác nhau.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 1, "id": 16,
 "title": "Tìm sản phẩm chưa bao giờ được bán",
 "situation":
   "Sản phẩm có trong danh mục nhưng không xuất hiện trong bất kỳ đơn hàng nào. "
   "Có thể là sản phẩm mới chưa ra mắt, sản phẩm bị ẩn nhưng dữ liệu chưa dọn, "
   "hoặc sản phẩm bị lỗi khiến không ai thêm được vào giỏ hàng.",
 "before_label": "Bảng Products — dòng đỏ: chưa có trong Order_Items:",
 "before_cols": ["product_id","product_name","category","price","stock"],
 "before_rows": [
   ["PROD_001","iPhone 15 Pro Max","Dien thoai","30.000.000","50"],
   ["PROD_002","Ban phim co Logitech","Phu kien","2.000.000","100"],
   ["PROD_003","Tai nghe Sony WH-1000XM5","Phu kien","8.000.000","-5"],
   ["PROD_004","Sac du phong Anker","Phu kien","1.000.000","20"],
   ["PROD_005","Ban phim co Logitech","Phu kien","2.000.000","30"],
   ["PROD_006","Loa Bluetooth JBL","Phu kien","(NULL)","10"],
   ["PROD_007","Chuot gaming Razer","Phu kien","1.500.000","(NULL)"],
 ],
 "before_bugs": [4, 5, 6],
 "before_col_widths": [65, 178, 65, 90, 95],
 "sql": (
   "SELECT p.product_id,\n"
   "       p.product_name,\n"
   "       p.price,\n"
   "       p.stock\n"
   "FROM   Products p\n"
   "LEFT JOIN Order_Items oi\n"
   "       ON p.product_id = oi.product_id\n"
   "WHERE  oi.product_id IS NULL;"
 ),
 "clauses": [
   ("FROM Products p\n  LEFT JOIN Order_Items oi\n    ON p.product_id = oi.product_id",
    "<b>LEFT JOIN</b> giữ TẤT CẢ sản phẩm, kể cả sản phẩm không có dòng nào "
    "trong Order_Items."),
   ("WHERE oi.product_id IS NULL",
    "Sau LEFT JOIN, sản phẩm không khớp có oi.product_id = NULL. "
    "Đây chính xác là sản phẩm chưa bao giờ được bán."),
   ("SELECT p.product_id, p.product_name,\n       p.price, p.stock",
    "Chiếu thêm price và stock để QA đánh giá: "
    "chưa bán vì lỗi, chưa có giá, hay chưa có hàng?"),
 ],
 "explain":
   "Cùng kỹ thuật anti-join với Câu 5 và Câu 15, áp dụng cho chiều Products → Order_Items.<br/>"
   "Trong data mẫu, 3 sản phẩm chưa bán — mỗi cái có lý do khác nhau:<br/>"
   "(1) PROD_005: trùng tên PROD_002 — sản phẩm bị nhân đôi.<br/>"
   "(2) PROD_006: price = NULL — chưa định giá.<br/>"
   "(3) PROD_007: stock = NULL — chưa nhập kho.<br/>"
   "Kết hợp với Câu 12 và Câu 14 để phân tích từng trường hợp.",
 "result_table": (
   ["product_id","product_name","price","stock"],
   [
     ["PROD_005","Ban phim co Logitech","2.000.000",30],
     ["PROD_006","Loa Bluetooth JBL","(NULL)",10],
     ["PROD_007","Chuot gaming Razer","1.500.000","(NULL)"],
   ]
 ),
 "result_note":
   "3 sản phẩm chưa bán: PROD_005 trùng tên PROD_002, "
   "PROD_006 chưa có giá, PROD_007 chưa có tồn kho.",
 "note":
   "Sản phẩm chưa bán không nhất thiết là lỗi — có thể là hàng mới chưa ra mắt.<br/>"
   "Để phân biệt, kết hợp thêm điều kiện từ Câu 12 và Câu 14:<br/>"
   "(1) <b>PROD_005</b>: trùng với PROD_002 → xác nhận bằng Câu 8 rồi xóa bản thừa.<br/>"
   "(2) <b>PROD_006</b>: price = NULL → cần nhập giá (Câu 14).<br/>"
   "(3) <b>PROD_007</b>: stock = NULL → cần nhập tồn kho (Câu 12).",
},
# ─────────────────────────────────────────────────────────
{
 "part": 1, "id": 17,
 "title": "Tìm khách hàng chưa có đơn hàng nào",
 "situation":
   "Khách hàng đã đăng ký tài khoản nhưng chưa đặt đơn nào. "
   "Có thể là dữ liệu test, tài khoản tạo nhầm, hoặc khách thật nhưng "
   "gặp lỗi khi checkout. Nhận diện nhóm này giúp làm sạch dữ liệu "
   "trước khi kiểm thử tính năng phân tích người dùng.",
 "before_label": "Bảng Customers — dòng đỏ: chưa có đơn hàng nào trong Orders:",
 "before_cols": ["customer_id","customer_name","membership_tier","status"],
 "before_rows": [
   ["C001","Nguyen Van A","Silver","ACTIVE"],
   ["C002","Tran Van B","Standard","ACTIVE"],
   ["C003","Le Thi C","Gold","ACTIVE"],
   ["C004","Khach Hang Ao Bug","Standard","ACTIVE"],
   ["C005","Khach Hang Trung","Standard","ACTIVE"],
   ["C006","Pham Van X","Standard","ACTIVE"],
   ["C007","Nguyen Thi Y","Standard","ACTIVE"],
   ["C008","  Pham Van D  ","Gold","ACTIVE"],
   ["C009","Nguyen Van A (2)","Silver","ACTIVE"],
   ["C010","Khach Test VIP","VIP","ACTIVE"],
 ],
 "before_bugs": [3, 4, 5, 6, 7, 8, 9],
 "before_col_widths": [60, 200, 110, 123],
 "sql": (
   "SELECT c.customer_id,\n"
   "       c.customer_name,\n"
   "       c.membership_tier,\n"
   "       c.status\n"
   "FROM   Customers c\n"
   "LEFT JOIN Orders o\n"
   "       ON c.customer_id = o.customer_id\n"
   "WHERE  o.customer_id IS NULL;"
 ),
 "clauses": [
   ("FROM Customers c\n  LEFT JOIN Orders o\n    ON c.customer_id = o.customer_id",
    "<b>LEFT JOIN</b> giữ TẤT CẢ khách hàng, kể cả người chưa có đơn hàng nào."),
   ("WHERE o.customer_id IS NULL",
    "Sau LEFT JOIN, khách không có đơn sẽ có cột o.customer_id = NULL. "
    "Lọc đúng những khách đó."),
   ("SELECT c.customer_id, c.customer_name,\n       c.membership_tier, c.status",
    "Chiếu thêm tier và status để QA phân loại: "
    "tài khoản test, tài khoản lỗi, hay khách thật chưa mua?"),
 ],
 "explain":
   "Cùng kỹ thuật anti-join, chiều Customers → Orders.<br/>"
   "Trong data mẫu, 7 trong 10 khách chưa có đơn — đây là tài khoản test "
   "được thêm để phục vụ các câu lệnh từ Câu 1 đến Câu 10.<br/>"
   "Khi làm sạch dữ liệu trước sprint, QA nên chạy câu này và đánh dấu "
   "tài khoản nào là test — tránh đưa vào báo cáo làm sai số liệu thật.",
 "result_table": (
   ["customer_id","customer_name","membership_tier","status"],
   [
     ["C004","Khach Hang Ao Bug","Standard","ACTIVE"],
     ["C005","Khach Hang Trung","Standard","ACTIVE"],
     ["C006","Pham Van X","Standard","ACTIVE"],
     ["C007","Nguyen Thi Y","Standard","ACTIVE"],
     ["C008","  Pham Van D  ","Gold","ACTIVE"],
     ["C009","Nguyen Van A (2)","Silver","ACTIVE"],
     ["C010","Khach Test VIP","VIP","ACTIVE"],
   ]
 ),
 "result_note":
   "7 khách chưa có đơn — phần lớn là tài khoản test tạo cho Phần 1. "
   "Cần đánh dấu để loại khỏi báo cáo sản xuất.",
 "note":
   "Câu này hay bị nhầm với Câu 5 (đơn hàng mồ côi). Điểm khác nhau:<br/>"
   "(1) <b>Câu 5</b>: Orders không có Customers — đơn hàng mồ côi, thiếu chủ.<br/>"
   "(2) <b>Câu 17</b>: Customers không có Orders — khách hàng chưa mua gì.<br/>"
   "Hai hướng bổ sung cho nhau: Câu 5 bắt lỗi tầng Orders, Câu 17 bắt lỗi tầng Customers.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 1, "id": 13,
 "title": "Khám phá schema bằng INFORMATION_SCHEMA khi chưa có tài liệu",
 "situation":
   "QA mới nhận một hệ thống không có tài liệu database — chỉ có quyền SELECT, "
   "không biết có bao nhiêu bảng, cột nào kiểu gì, cột nào bắt buộc. Trước khi viết "
   "được bất kỳ câu lệnh soi lỗi nào, cần một cách tra cứu schema ngay trong chính SQL, "
   "không phụ thuộc tài liệu hay sơ đồ ER có thể đã lỗi thời.",
 "before_label": "Những gì QA nhìn thấy qua SELECT * — không biết cấu trúc đứng sau:",
 "before_cols": ["customer_id","customer_name","email","membership_tier","status"],
 "before_rows": [
   ["C001","Nguyen Van A",      "a.nguyen@email.com",    "Silver",   "ACTIVE"],
   ["C002","Tran Van B",        "b.tran@email.com",      "Standard", "ACTIVE"],
   ["C003","Le Thi C",          "c.le@email.com",        "Gold",     "ACTIVE"],
   ["C004","Khach Hang Ao Bug", "trung_email@email.com", "Standard", "ACTIVE"],
   ["C005","Khach Hang Trung",  "trung_email@email.com", "Standard", "ACTIVE"],
   ["C006","Pham Van X",        "(NULL)",                "Standard", "ACTIVE"],
   ["C007","Nguyen Thi Y",      "",                       "Standard", "ACTIVE"],
   ["C008","  Pham Van D  ",    "d.pham@email.com",      "Gold",     "ACTIVE"],
   ["C009","Nguyen Van A (2)",  "A.NGUYEN@EMAIL.COM",    "Silver",   "ACTIVE"],
   ["C010","Khach Test VIP",    "vip@email.com",         "VIP",      "ACTIVE"],
 ],
 "before_bugs": [],
 "before_col_widths": [55, 145, 225, 68],
 "sql": (
   "SELECT table_name,\n"
   "       COUNT(*) AS so_cot,\n"
   "       SUM(CASE WHEN is_nullable='YES'\n"
   "                THEN 1 ELSE 0 END) AS so_cot_nullable,\n"
   "       SUM(CASE WHEN column_key='PRI'\n"
   "                THEN 1 ELSE 0 END) AS so_khoa_chinh\n"
   "FROM   information_schema.columns\n"
   "WHERE  table_schema = 'ecommerce_test'\n"
   "GROUP  BY table_name\n"
   "ORDER  BY table_name;"
 ),
 "clauses": [
   ("FROM information_schema.columns",
    "<b>information_schema</b> là schema hệ thống có sẵn trong mọi DB MySQL — chứa metadata "
    "mô tả chính các bảng/cột trong DB, không cần quyền đặc biệt ngoài SELECT."),
   ("WHERE table_schema\n  = 'ecommerce_test'",
    "Lọc đúng database đang khảo sát — information_schema chứa metadata của TẤT CẢ database "
    "trên server, không lọc sẽ trả về lẫn lộn."),
   ("SUM(CASE WHEN ...\n  THEN 1 ELSE 0 END)",
    "Đếm có điều kiện: đếm số cột cho phép NULL và số cột là khóa chính, "
    "cho cái nhìn nhanh về độ \"chặt\" của từng bảng."),
   ("GROUP BY table_name",
    "Gom theo từng bảng để có một dòng tổng quan mỗi bảng."),
 ],
 "explain":
   "<b>information_schema.columns</b> là bản đồ schema luôn cập nhật — không như tài liệu "
   "viết tay có thể đã lỗi thời từ lâu.<br/>"
   "Mỗi DB có 4 bảng (Customers, Order_Items, Orders, Products), mỗi bảng có 1 khóa chính. "
   "Orders nhiều cột nullable nhất (3/6) — gợi ý nhiều trường tùy chọn, đáng kiểm tra kỹ.<br/>"
   "Lưu ý: <b>table_name có thể trả về chữ thường</b> dù tên gốc viết hoa (tùy hệ điều hành "
   "server MySQL chạy) — luôn kiểm tra case thật trước khi lọc WHERE table_name = '...'.",
 "result_table": (
   ["table_name","so_cot","so_cot_nullable","so_khoa_chinh"],
   [
     ["customers",   5, 3, 1],
     ["order_items", 5, 2, 1],
     ["orders",      6, 3, 1],
     ["products",    5, 3, 1],
   ]
 ),
 "result_note":
   "4 bảng, mỗi bảng 1 khóa chính. Orders có 6 cột (nhiều nhất, vì có thêm order_date và "
   "deleted_at) với 3 cột nullable — nên soi kỹ khi tìm dữ liệu thiếu.",
 "note":
   "Khi cần đào sâu một bảng cụ thể (kiểu dữ liệu từng cột, độ dài chuỗi tối đa...), bỏ "
   "GROUP BY và lọc thêm theo table_name:<br/>"
   "<b>SELECT column_name, column_type, is_nullable, column_key</b><br/>"
   "<b>FROM information_schema.columns</b><br/>"
   "<b>WHERE table_schema='ecommerce_test' AND table_name='Customers'</b><br/>"
   "<b>ORDER BY ordinal_position;</b><br/>"
   "Đây là bước đầu tiên nên làm trước khi viết bất kỳ câu lệnh nào trên một hệ thống lạ — "
   "biến \"đoán mò cấu trúc\" thành \"đọc trực tiếp từ nguồn đáng tin nhất\".",
},
# ─────────────────────────────────────────────────────────
{
 "part": 1, "id": 18,
 "title": "Kiểm tra ràng buộc UNIQUE/FOREIGN KEY có thực sự được enforce",
 "situation":
   "Sách liên tục khuyên \"thêm UNIQUE cho email\", \"thêm FOREIGN KEY cho customer_id\" — "
   "nhưng làm sao biết những ràng buộc đó <b>đã tồn tại hay chưa</b> trên một hệ thống cụ thể? "
   "Đừng tin lời đồn hay tài liệu cũ — tra trực tiếp metadata để biết DB đang thực sự bảo vệ "
   "những gì.",
 "before_label": "Bảng Customers — dòng đỏ: 2 email trùng (C004/C005) lẽ ra phải bị UNIQUE chặn:",
 "before_cols": ["customer_id","customer_name","email","status"],
 "before_rows": [
   ["C001","Nguyen Van A",      "a.nguyen@email.com",    "ACTIVE"],
   ["C002","Tran Van B",        "b.tran@email.com",      "ACTIVE"],
   ["C003","Le Thi C",          "c.le@email.com",        "ACTIVE"],
   ["C004","Khach Hang Ao Bug", "trung_email@email.com", "ACTIVE"],
   ["C005","Khach Hang Trung",  "trung_email@email.com", "ACTIVE"],
   ["C006","Pham Van X",        "(NULL)",                "ACTIVE"],
   ["C007","Nguyen Thi Y",      "",                       "ACTIVE"],
   ["C008","  Pham Van D  ",    "d.pham@email.com",      "ACTIVE"],
   ["C009","Nguyen Van A (2)",  "A.NGUYEN@EMAIL.COM",    "ACTIVE"],
   ["C010","Khach Test VIP",    "vip@email.com",         "ACTIVE"],
 ],
 "before_bugs": [3, 4],
 "before_col_widths": [55, 145, 225, 68],
 "sql": (
   "SELECT tc.table_name,\n"
   "       tc.constraint_type,\n"
   "       kcu.column_name\n"
   "FROM   information_schema.table_constraints tc\n"
   "LEFT JOIN information_schema.key_column_usage kcu\n"
   "       ON tc.constraint_name = kcu.constraint_name\n"
   "      AND tc.table_schema = kcu.table_schema\n"
   "      AND tc.table_name = kcu.table_name\n"
   "WHERE  tc.table_schema = 'ecommerce_test'\n"
   "ORDER  BY tc.table_name, tc.constraint_type;"
 ),
 "clauses": [
   ("FROM information_schema\n  .table_constraints tc",
    "Bảng hệ thống liệt kê MỌI ràng buộc đã khai báo: PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK."),
   ("LEFT JOIN information_schema\n  .key_column_usage kcu",
    "Nối thêm để biết ràng buộc đó áp dụng trên <b>cột nào</b>. Bắt buộc dùng <b>LEFT JOIN</b> "
    "thay vì JOIN thường: ràng buộc <b>CHECK không có dòng tương ứng</b> trong "
    "key_column_usage (CHECK không gắn với một cột theo kiểu khóa), nên INNER JOIN sẽ ÂM "
    "THẦM loại CHECK constraint khỏi kết quả — đúng loại lỗi khó nhận ra vì không báo gì cả."),
   ("WHERE tc.table_schema\n  = 'ecommerce_test'",
    "Giới hạn đúng database đang kiểm tra."),
 ],
 "explain":
   "Kết quả chỉ trả về <b>4 PRIMARY KEY</b> — đúng 1 cho mỗi bảng — và <b>không có một UNIQUE "
   "hay FOREIGN KEY nào khác</b>.<br/>"
   "Đây chính là lời giải thích kỹ thuật cho lý do Câu 1 bắt được email trùng (C004/C005): "
   "không hề có UNIQUE constraint trên cột email để chặn từ đầu.<br/>"
   "Tương tự, Câu 5 bắt được ORD_004 trỏ tới customer_id không tồn tại vì <b>không có FOREIGN "
   "KEY</b> nào ràng buộc Orders.customer_id phải khớp Customers.customer_id — DB chấp nhận "
   "mọi giá trị, đúng hay sai.",
 "result_table": (
   ["table_name","constraint_type","column_name"],
   [
     ["customers",   "PRIMARY KEY", "customer_id"],
     ["order_items", "PRIMARY KEY", "item_id"],
     ["orders",      "PRIMARY KEY", "order_id"],
     ["products",    "PRIMARY KEY", "product_id"],
   ]
 ),
 "result_note":
   "Chỉ có khóa chính. Không một ràng buộc tham chiếu hay duy nhất nào tồn tại — toàn bộ "
   "việc giữ \"sạch\" dữ liệu trong hệ thống này hiện đang dựa hoàn toàn vào tầng ứng dụng, "
   "không có lưới an toàn ở tầng DB.",
 "note":
   "Khi báo cáo phát hiện thiếu ràng buộc, đừng chỉ nói \"nên thêm UNIQUE\" — hãy nói rõ "
   "<b>ĐANG thiếu</b> kèm bằng chứng truy vấn này, để team không tranh cãi \"chắc đã có rồi\".<br/>"
   "Thêm ràng buộc thực tế:<br/>"
   "<b>ALTER TABLE Customers ADD CONSTRAINT uq_email UNIQUE (email);</b><br/>"
   "<b>ALTER TABLE Orders ADD CONSTRAINT fk_customer</b><br/>"
   "<b>  FOREIGN KEY (customer_id) REFERENCES Customers(customer_id);</b><br/>"
   "Lưu ý: thêm UNIQUE sẽ THẤT BẠI nếu dữ liệu trùng (C004/C005) chưa được dọn trước — "
   "phải chạy Câu 1 xử lý dữ liệu cũ rồi mới ALTER TABLE được.<br/>"
   "Nếu hệ thống ĐÃ có CHECK constraint, kết quả sẽ hiện dòng <b>constraint_type = CHECK</b> "
   "với <b>column_name = NULL</b> (do CHECK không gắn cột theo kiểu khóa) — để xem chính xác "
   "điều kiện CHECK kiểm tra gì, tra thêm bảng riêng:<br/>"
   "<b>SELECT constraint_name, check_clause FROM information_schema.check_constraints</b><br/>"
   "<b>WHERE constraint_schema = 'ecommerce_test';</b>",
},
# ─────────────────────────────────────────────────────────
{
 "part": 1, "id": 19,
 "title": "Tổng hợp chi tiêu theo từng khách hàng",
 "situation":
   "QA cần bảng tổng hợp để kiểm tra: khách nào đã mua, bao nhiêu đơn, "
   "tổng tiền bao nhiêu. Bảng này là nền để phát hiện bất thường — "
   "khách chi tiêu quá cao/thấp, hoặc số đơn không khớp với dữ liệu loyalty.",
 "before_label": "Bảng Orders — dữ liệu đầu vào để tổng hợp chi tiêu:",
 "before_cols": ["order_id","customer_id","total_amount","status","order_date"],
 "before_rows": [
   ["ORD_001","C001","32.000.000","COMPLETED","2026-06-20"],
   ["ORD_002","C002","20.000.000","COMPLETED","2026-06-22"],
   ["ORD_003","C003","8.000.000","CANCELLED","2026-06-23"],
   ["ORD_004","C999","5.000.000","PENDING","2026-06-24"],
   ["ORD_005","C001","15.000.000","CANCELLED","2026-06-25"],
 ],
 "before_bugs": [],
 "before_col_widths": [65, 80, 105, 95, 148],
 "sql": (
   "SELECT c.customer_id,\n"
   "       c.customer_name,\n"
   "       COUNT(o.order_id)   AS so_don,\n"
   "       SUM(o.total_amount) AS tong_chi_tieu\n"
   "FROM   Customers c\n"
   "JOIN   Orders o ON c.customer_id = o.customer_id\n"
   "GROUP  BY c.customer_id, c.customer_name\n"
   "ORDER  BY tong_chi_tieu DESC;"
 ),
 "clauses": [
   ("FROM Customers c\n  JOIN Orders o\n    ON c.customer_id = o.customer_id",
    "<b>INNER JOIN</b>: chỉ lấy khách đã có ít nhất một đơn. "
    "Khách chưa mua (C004–C010) sẽ không xuất hiện — "
    "dùng LEFT JOIN nếu muốn hiện cả họ với so_don = 0. "
    "ORD_004 (C999) cũng bị loại vì C999 không có trong Customers."),
   ("GROUP BY c.customer_id, c.customer_name",
    "Gom tất cả đơn hàng của cùng một khách thành một nhóm để tính tổng."),
   ("SELECT ..., COUNT, SUM",
    "<b>COUNT(o.order_id)</b> đếm số đơn; "
    "<b>SUM(o.total_amount)</b> cộng tổng tiền. "
    "Lưu ý: SUM dùng total_amount từ Orders — chưa chắc khớp với tổng items (xem Câu 11)."),
   ("ORDER BY tong_chi_tieu DESC",
    "Khách chi tiêu nhiều nhất lên đầu — dễ phát hiện outlier bất thường. "
    "Trên production, thêm <b>LIMIT 10–20</b> để chỉ lấy nhóm khách chi tiêu cao nhất."),
 ],
 "explain":
   "Câu lệnh không tìm bug trực tiếp mà tạo <b>bảng nền để phát hiện bất thường</b>.<br/>"
   "QA so sánh kết quả với dữ liệu hệ thống loyalty, CRM hoặc báo cáo tài chính — "
   "nếu con số lệch là có vấn đề.<br/>"
   "Lưu ý: vì dùng total_amount từ Orders, kết quả bao gồm Bug-B (ORD_002 ghi sai).<br/>"
   "Cần chạy Câu 11 trước để phát hiện và sửa dữ liệu lệch, sau đó Câu 19 mới phản ánh đúng thực tế.",
 "result_table": (
   ["customer_id","customer_name","so_don","tong_chi_tieu"],
   [
     ["C001","Nguyen Van A", 2,"47.000.000"],
     ["C002","Tran Van B",   1,"20.000.000"],
     ["C003","Le Thi C",     1, "8.000.000"],
   ]
 ),
 "result_note":
   "Chỉ 3/10 khách có đơn (C001, C002, C003); 7 khách C004–C010 chưa mua nên không xuất hiện. "
   "C001 dẫn đầu 47M (2 đơn, bao gồm cả đơn ORD_005 đã bị xóa mềm). Con số C002 (20M) là Bug-B — thực tế items cộng lại 31M. "
   "C003 vẫn được tính dù đơn đã CANCELLED (câu này không lọc status).",
 "note":
   "Câu này dùng total_amount từ Orders — con số ghi sẵn, chưa chắc đúng.<br/>"
   "Để tính chính xác từ Order_Items:<br/>"
   "Thay <b>SUM(o.total_amount)</b> bằng <b>SUM(oi.quantity * oi.price)</b> "
   "sau khi JOIN thêm bảng Order_Items.<br/>"
   "Chạy Câu 11 trước để phát hiện và sửa dữ liệu lệch, rồi mới dùng Câu 19 báo cáo.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 1, "id": 20,
 "title": "Phát hiện sản phẩm đã bán vượt quá tồn kho",
 "situation":
   "Tổng số lượng đã bán (từ Order_Items) lớn hơn tồn kho hiện tại (từ Products). "
   "Đây là dấu hiệu của race condition, thiếu kiểm tra stock trước khi trừ, "
   "hoặc dữ liệu kho bị cập nhật sai sau khi xác nhận đơn.",
 "before_label": "Bảng Products — dòng đỏ: tồn kho có thể bị vượt quá:",
 "before_cols": ["product_id","product_name","category","price","stock"],
 "before_rows": [
   ["PROD_001","iPhone 15 Pro Max","Dien thoai","30.000.000",50],
   ["PROD_002","Ban phim co Logitech","Phu kien","2.000.000",100],
   ["PROD_003","Tai nghe Sony WH-1000XM5","Phu kien","8.000.000",-5],
   ["PROD_004","Sac du phong Anker","Phu kien","1.000.000",20],
   ["PROD_005","Ban phim co Logitech","Phu kien","2.000.000",30],
   ["PROD_006","Loa Bluetooth JBL","Phu kien","(NULL)",10],
   ["PROD_007","Chuot gaming Razer","Phu kien","1.500.000","(NULL)"],
 ],
 "before_bugs": [2],
 "before_col_widths": [65, 178, 65, 90, 95],
 "sql": (
   "SELECT p.product_id,\n"
   "       p.product_name,\n"
   "       p.stock,\n"
   "       SUM(oi.quantity) AS tong_da_ban\n"
   "FROM   Products p\n"
   "JOIN   Order_Items oi ON p.product_id = oi.product_id\n"
   "GROUP  BY p.product_id, p.product_name, p.stock\n"
   "HAVING SUM(oi.quantity) > p.stock;"
 ),
 "clauses": [
   ("FROM Products p\n  JOIN Order_Items oi\n    ON p.product_id = oi.product_id",
    "<b>INNER JOIN</b> ghép mỗi sản phẩm với tất cả dòng trong Order_Items. "
    "Sản phẩm chưa bán sẽ không xuất hiện — dùng LEFT JOIN + Câu 16 để kiểm tra."),
   ("GROUP BY p.product_id, p.product_name, p.stock",
    "Gom tất cả dòng Order_Items của cùng một sản phẩm để tính tổng số đã bán."),
   ("HAVING SUM(oi.quantity) > p.stock",
    "<b>HAVING</b> so sánh sau aggregate: tổng đã bán > tồn kho hiện tại "
    "là vi phạm ràng buộc nghiệp vụ."),
   ("SELECT ..., tong_da_ban",
    "Hiển thị cả stock hiện tại và tổng đã bán để QA thấy ngay mức độ vượt quá."),
 ],
 "explain":
   "Câu lệnh phát hiện vi phạm ràng buộc: <b>tổng bán ra không được vượt tồn kho</b>.<br/>"
   "PROD_003 bị phát hiện vì stock = -5 và tong_da_ban = 1 (1 &gt; -5).<br/>"
   "Điều này nghĩa là hệ thống đã bán sản phẩm khi tồn kho đã âm — "
   "không có check trước khi giảm kho.<br/>"
   "Với hệ thống thực, câu này giúp phát hiện overselling trước khi "
   "khách hàng phàn nàn vì không nhận được hàng.",
 "result_table": (
   ["product_id","product_name","stock","tong_da_ban"],
   [["PROD_003","Tai nghe Sony WH-1000XM5",-5,1]],
 ),
 "result_note":
   "PROD_003: tồn kho = -5 nhưng tổng đã bán = 1. "
   "Hệ thống đã cho phép bán khi kho đã âm — thiếu validation trước khi trừ kho.",
 "note":
   "INNER JOIN làm câu này bỏ qua sản phẩm chưa có đơn nào.<br/>"
   "Ba câu cùng nhau tạo bức tranh đầy đủ về tình trạng kho:<br/>"
   "(1) <b>Câu 12</b>: stock âm — phát hiện trực tiếp không cần tính tổng bán.<br/>"
   "(2) <b>Câu 16</b>: sản phẩm chưa bán — góc nhìn ngược lại.<br/>"
   "(3) <b>Câu 20</b>: tổng bán > tồn kho — phát hiện overselling.",
},


# ============================================================
# PHẦN 3 — Đối soát và tính toán
# ============================================================
{
 "part": 2, "id": 21,
 "title": "Tính doanh thu thực theo từng đơn từ Order_Items",
 "situation":
   "Câu 19 tổng hợp chi tiêu dùng <b>total_amount</b> — con số ghi sẵn trong Orders, "
   "có thể sai như Bug-B ở ORD_002. Doanh thu thật phải tính trực tiếp từ Order_Items: "
   "<b>SUM(quantity × price)</b>. Câu này là điểm khởi đầu để QA xác minh "
   "độ tin cậy của dữ liệu trước khi đưa vào báo cáo.",
 "before_label": "Bảng Order_Items — dòng đỏ: item_id=7 nhân đôi PROD_001 trong ORD_001:",
 "before_cols": ["item_id","order_id","product_id","quantity","price"],
 "before_rows": [
   [1,"ORD_001","PROD_001",1,"30.000.000"],
   [2,"ORD_001","PROD_002",1, "2.000.000"],
   [4,"ORD_002","PROD_001",1,"30.000.000"],
   [5,"ORD_002","PROD_004",1, "1.000.000"],
   [6,"ORD_003","PROD_003",1, "8.000.000"],
   [7,"ORD_001","PROD_001",1,"30.000.000"],
   [8,"ORD_005","PROD_004",1, "1.000.000"],
   [9,"ORD_005","PROD_002",1, "2.000.000"],
 ],
 "before_bugs": [5],
 "before_col_widths": [50, 75, 90, 65, 213],
 "sql": (
   "SELECT order_id,\n"
   "       COUNT(*)              AS so_dong_items,\n"
   "       SUM(quantity)         AS tong_so_luong,\n"
   "       SUM(quantity * price) AS doanh_thu_thuc\n"
   "FROM   Order_Items\n"
   "GROUP  BY order_id\n"
   "ORDER  BY order_id;"
 ),
 "clauses": [
   ("FROM Order_Items",
    "MySQL tải toàn bộ bảng <b>Order_Items</b> — 8 dòng trong dữ liệu mẫu."),
   ("GROUP BY order_id",
    "Gom tất cả dòng có cùng order_id thành một nhóm. "
    "Mỗi nhóm đại diện cho một đơn hàng."),
   ("COUNT(*), SUM(quantity),\n  SUM(quantity * price)",
    "<b>COUNT(*)</b> đếm số dòng items của đơn. "
    "<b>SUM(quantity)</b> tổng số lượng sản phẩm. "
    "<b>SUM(quantity × price)</b> tính tiền thực từ items."),
   ("ORDER BY order_id",
    "Sắp xếp kết quả theo mã đơn để so sánh dễ hơn với bảng Orders."),
 ],
 "explain":
   "Kỹ thuật <b>GROUP BY + aggregate</b> tổng hợp từ bảng chi tiết lên level đơn hàng.<br/>"
   "<b>COUNT(*)</b> là chỉ số cảnh báo sớm: nếu con số lớn bất thường so với dự kiến, "
   "rất có thể có item bị trùng.<br/>"
   "Trong data mẫu, ORD_001 có 3 dòng thay vì 2 — COUNT(*) = 3 là tín hiệu đầu tiên "
   "trước khi đối soát doanh_thu_thuc với total_amount.",
 "result_table": (
   ["order_id","so_dong_items","tong_so_luong","doanh_thu_thuc"],
   [
     ["ORD_001", 3, 3, "62.000.000"],
     ["ORD_002", 2, 2, "31.000.000"],
     ["ORD_003", 1, 1,  "8.000.000"],
     ["ORD_005", 2, 2,  "3.000.000"],
   ]
 ),
 "result_note":
   "ORD_001: 3 dòng items → COUNT bất thường, doanh thu = 62M (lẽ ra 32M). "
   "ORD_002: tổng = 31M, khác total_amount 20M (Bug-B). "
   "ORD_004 vắng mặt vì không có item nào.",
 "note":
   "Kết hợp câu này với Câu 11 để phân tích sâu hơn:<br/>"
   "(1) <b>Câu 21</b>: tính doanh thu thực từ items theo từng đơn — con số tuyệt đối.<br/>"
   "(2) <b>Câu 11</b>: chỉ lọc ra đơn có doanh_thu_thuc ≠ total_amount — xác định đúng đơn lỗi.<br/>"
   "Câu 21 cho bức tranh tổng thể; Câu 11 chỉ đích danh đơn cần điều tra.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 2, "id": 22,
 "title": "Xếp hạng sản phẩm bán chạy nhất theo doanh số",
 "situation":
   "Báo cáo sản phẩm bán chạy là cơ sở để ra quyết định nhập hàng và marketing. "
   "Nhưng nếu dữ liệu Order_Items có item trùng, bảng xếp hạng sẽ sai — "
   "sản phẩm bình thường đột ngột lên top vì được tính nhiều lần.",
 "before_label": "Bảng Order_Items — dòng đỏ: item_id=7 làm PROD_001 bị tính 3 lần:",
 "before_cols": ["item_id","order_id","product_id","quantity","price"],
 "before_rows": [
   [1,"ORD_001","PROD_001",1,"30.000.000"],
   [2,"ORD_001","PROD_002",1, "2.000.000"],
   [4,"ORD_002","PROD_001",1,"30.000.000"],
   [5,"ORD_002","PROD_004",1, "1.000.000"],
   [6,"ORD_003","PROD_003",1, "8.000.000"],
   [7,"ORD_001","PROD_001",1,"30.000.000"],
   [8,"ORD_005","PROD_004",1,"1.000.000"],
   [9,"ORD_005","PROD_002",1,"2.000.000"],
 ],
 "before_bugs": [5],
 "before_col_widths": [50, 75, 90, 65, 213],
 "sql": (
   "SELECT p.product_id,\n"
   "       p.product_name,\n"
   "       SUM(oi.quantity)            AS tong_so_luong,\n"
   "       SUM(oi.quantity * oi.price) AS tong_doanh_so\n"
   "FROM   Products p\n"
   "JOIN   Order_Items oi\n"
   "       ON p.product_id = oi.product_id\n"
   "GROUP  BY p.product_id, p.product_name\n"
   "ORDER  BY tong_doanh_so DESC;"
 ),
 "clauses": [
   ("FROM Products p\n  JOIN Order_Items oi\n    ON p.product_id = oi.product_id",
    "<b>INNER JOIN</b> ghép mỗi sản phẩm với tất cả items bán ra. "
    "Sản phẩm chưa bán (PROD_005, 006, 007) bị loại — "
    "dùng LEFT JOIN nếu muốn hiện cả chúng với doanh_so = NULL."),
   ("GROUP BY p.product_id, p.product_name",
    "Gom tất cả dòng Order_Items của cùng một sản phẩm thành một nhóm "
    "để tính tổng số lượng và doanh số."),
   ("ORDER BY tong_doanh_so DESC",
    "Sản phẩm doanh số cao nhất nổi lên đầu — "
    "dễ phát hiện outlier nếu chênh lệch bất thường."),
 ],
 "explain":
   "Kỹ thuật <b>JOIN + GROUP BY + ORDER BY</b> là nền của mọi báo cáo xếp hạng.<br/>"
   "Kết quả hiện tại bị méo vì dữ liệu đầu vào có lỗi: "
   "PROD_001 xuất hiện 3 lần trong items (item 1, 4, 7) thay vì 2.<br/>"
   "Doanh số thực của PROD_001 chỉ là 60M — con số 90M là ảo do item trùng.<br/>"
   "Bảng xếp hạng chính xác phải bắt đầu bằng việc xác nhận dữ liệu sạch (Câu 2).",
 "result_table": (
   ["product_id","product_name","tong_so_luong","tong_doanh_so"],
   [
     ["PROD_001","iPhone 15 Pro Max",       3, "90.000.000"],
     ["PROD_003","Tai nghe Sony WH-1000XM5",1,  "8.000.000"],
     ["PROD_002","Ban phim co Logitech",    2,  "4.000.000"],
     ["PROD_004","Sac du phong Anker",      2,  "2.000.000"],
   ]
 ),
 "result_note":
   "PROD_001 dẫn đầu với 90M — thực ra chỉ 60M nếu không có item 7 trùng. "
   "Chạy Câu 2 để xác nhận trùng, sửa dữ liệu rồi mới tin vào kết quả xếp hạng này.",
 "note":
   "Trước khi dùng kết quả xếp hạng để ra quyết định kinh doanh, QA cần kiểm tra:<br/>"
   "(1) <b>Câu 2</b>: có item nào bị trùng (order_id + product_id) không?<br/>"
   "(2) <b>Câu 21</b>: COUNT(*) theo order có dòng nào bất thường không?<br/>"
   "Dữ liệu bẩn ở Order_Items lan trực tiếp lên báo cáo cấp quản lý — "
   "đây là loại bug dễ bị bỏ qua nhất vì không gây lỗi hệ thống.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 2, "id": 23,
 "title": "Kiểm tra giá trị tồn kho (stock × price)",
 "situation":
   "Giá trị tồn kho = <b>stock × price</b> là chỉ số tài chính quan trọng trong "
   "quản lý kho. Nếu stock âm (Bug-C) hoặc price = NULL, "
   "giá trị tính ra sẽ bị âm hoặc NULL — báo cáo kế toán sẽ sai lệch.",
 "before_label": "Bảng Products — dòng đỏ: stock âm hoặc NULL sẽ cho gia_tri_kho sai:",
 "before_cols": ["product_id","product_name","category","price","stock"],
 "before_rows": [
   ["PROD_001","iPhone 15 Pro Max",        "Dien thoai","30.000.000", 50],
   ["PROD_002","Ban phim co Logitech",     "Phu kien",  "2.000.000", 100],
   ["PROD_003","Tai nghe Sony WH-1000XM5", "Phu kien",  "8.000.000",  -5],
   ["PROD_004","Sac du phong Anker",       "Phu kien",  "1.000.000",  20],
   ["PROD_005","Ban phim co Logitech",     "Phu kien",  "2.000.000",  30],
   ["PROD_006","Loa Bluetooth JBL",        "Phu kien",  "(NULL)",     10],
   ["PROD_007","Chuot gaming Razer",       "Phu kien",  "1.500.000","(NULL)"],
 ],
 "before_bugs": [2, 5, 6],
 "before_col_widths": [65, 178, 65, 90, 95],
 "sql": (
   "SELECT product_id,\n"
   "       product_name,\n"
   "       price,\n"
   "       stock,\n"
   "       price * stock AS gia_tri_kho\n"
   "FROM   Products\n"
   "ORDER  BY gia_tri_kho;"
 ),
 "clauses": [
   ("FROM Products",
    "MySQL tải toàn bộ bảng <b>Products</b> — 7 sản phẩm trong dữ liệu mẫu."),
   ("price * stock AS gia_tri_kho",
    "MySQL tính tích hai cột và đặt tên kết quả là <b>gia_tri_kho</b>. "
    "Quy tắc: NULL × bất kỳ = NULL; âm × dương = âm."),
   ("ORDER BY gia_tri_kho",
    "Sắp xếp tăng dần: MySQL đặt NULL trước tiên, rồi đến âm, rồi dương. "
    "Cách hiển thị này đưa dòng lỗi lên đầu bảng kết quả."),
 ],
 "explain":
   "Phép nhân đơn giản nhưng phản ánh ngay <b>hai loại lỗi dữ liệu</b> từ Câu 12 và Câu 14:<br/>"
   "(1) <b>stock âm</b>: PROD_003 cho gia_tri_kho = -40.000.000 — không thể có kho giá trị âm.<br/>"
   "(2) <b>NULL</b>: PROD_006 (price NULL) và PROD_007 (stock NULL) cho gia_tri_kho = NULL "
   "— không thể tính được giá trị kho, ảnh hưởng trực tiếp đến báo cáo tổng tài sản.",
 "result_table": (
   ["product_id","product_name","price","stock","gia_tri_kho"],
   [
     ["PROD_006","Loa Bluetooth JBL",   "(NULL)","10",       "(NULL)"],
     ["PROD_007","Chuot gaming Razer","1.500.000","(NULL)",  "(NULL)"],
      ["PROD_003","Tai nghe Sony WH-1000XM5",       "8.000.000","-5","-40.000.000"],
     ["PROD_004","Sac du phong Anker",  "1.000.000","20", "20.000.000"],
     ["PROD_005","Ban phim co Logitech","2.000.000","30", "60.000.000"],
     ["PROD_002","Ban phim co Logitech","2.000.000","100","200.000.000"],
     ["PROD_001","iPhone 15 Pro Max","30.000.000","50","1.500.000.000"],
   ]
 ),
 "result_note":
   "3 dòng bất thường ở đầu: 2 NULL (không tính được) và 1 âm -40M (tồn kho âm do Bug-C). "
   "ORDER BY gia_tri_kho tự động đưa các dòng lỗi lên đầu — không cần WHERE để lọc riêng.",
 "note":
   "Để chỉ lấy dòng lỗi, thêm điều kiện lọc vào câu lệnh:<br/>"
   "(1) Kho giá trị âm: <b>WHERE price * stock &lt; 0</b><br/>"
   "(2) Kho không tính được: <b>WHERE price IS NULL OR stock IS NULL</b><br/>"
   "Câu 23 (kho âm) kết hợp với Câu 12 (stock âm) và Câu 14 (price NULL) "
   "tạo thành bộ 3 kiểm tra tồn kho đầy đủ.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 2, "id": 24,
 "title": "So sánh giá bán lịch sử với giá niêm yết hiện tại",
 "situation":
   "Cột <b>price</b> trong Order_Items là giá tại thời điểm mua — snapshot của giá khi giao dịch xảy ra. "
   "Cột <b>price</b> trong Products là giá niêm yết hiện tại. "
   "Nếu hai con số khác nhau, có thể bình thường (giá thay đổi) hoặc là bug "
   "(ghi nhầm giá lúc tạo đơn). QA cần kiểm tra để phân biệt hai trường hợp.",
 "before_label": "Bảng Order_Items — so sánh oi.price (lúc mua) với Products.price (hiện tại):",
 "before_cols": ["item_id","order_id","product_id","quantity","price"],
 "before_rows": [
   [1,"ORD_001","PROD_001",1,"30.000.000"],
   [2,"ORD_001","PROD_002",1, "2.000.000"],
   [4,"ORD_002","PROD_001",1,"30.000.000"],
   [5,"ORD_002","PROD_004",1, "1.000.000"],
   [6,"ORD_003","PROD_003",1, "8.000.000"],
   [7,"ORD_001","PROD_001",1,"30.000.000"],
   [8,"ORD_005","PROD_004",1,"1.000.000"],
   [9,"ORD_005","PROD_002",1,"2.000.000"],
 ],
 "before_bugs": [],
 "before_col_widths": [50, 75, 90, 65, 213],
 "sql": (
   "SELECT oi.order_id,\n"
   "       oi.product_id,\n"
   "       oi.price     AS gia_luc_ban,\n"
   "       p.price      AS gia_hien_tai,\n"
   "       oi.price - p.price AS chenh_lech\n"
   "FROM   Order_Items oi\n"
   "JOIN   Products p\n"
   "       ON oi.product_id = p.product_id\n"
   "WHERE  oi.price <> p.price;"
 ),
 "clauses": [
   ("FROM Order_Items oi\n  JOIN Products p\n    ON oi.product_id = p.product_id",
    "<b>INNER JOIN</b> ghép mỗi item với thông tin sản phẩm tương ứng. "
    "Kết quả có cả oi.price (lúc mua) và p.price (hiện tại) trên cùng một dòng."),
   ("WHERE oi.price <> p.price",
    "Lọc chỉ những dòng có giá bán khác giá hiện tại. "
    "Kết quả rỗng = tất cả items được ghi đúng giá."),
   ("SELECT ..., oi.price - p.price\n  AS chenh_lech",
    "Tính độ lệch: dương = bán đắt hơn giá hiện tại; "
    "âm = bán rẻ hơn giá hiện tại."),
 ],
 "explain":
   "Order_Items.price là <b>giá snapshot</b> — lưu lại giá đúng lúc khách mua, "
   "không đổi kể cả khi Products.price thay đổi sau đó.<br/>"
   "Kết quả rỗng trong data mẫu là bình thường — giá chưa thay đổi.<br/>"
   "Thực tế, câu này quan trọng khi team sửa giá sản phẩm: "
   "cần xác nhận đơn cũ đã dùng đúng giá cũ, không phải giá mới bị gán ngược.",
 "result_table": (
   ["order_id","product_id","gia_luc_ban","gia_hien_tai","chenh_lech"],
   [],
 ),
 "result_note":
   "Kết quả rỗng — tất cả items được ghi đúng giá so với Products hiện tại. "
   "Câu này nên chạy lại sau mỗi lần cập nhật bảng giá sản phẩm.",
 "note":
   "Kết quả rỗng ở đây là tốt, nhưng cần phân biệt hai tình huống:<br/>"
   "(1) <b>Chênh lệch hợp lý</b>: giá sản phẩm tăng/giảm sau khi đơn đã đặt — "
   "oi.price đúng, p.price là giá mới. Không phải bug.<br/>"
   "(2) <b>Chênh lệch bất thường</b>: item vừa tạo đã khác giá niêm yết — "
   "có thể bug khi tạo đơn hoặc có discount không được ghi nhận đúng cách.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 2, "id": 25,
 "title": "Tổng doanh thu chỉ tính đơn hàng COMPLETED",
 "situation":
   "Doanh thu thật chỉ đến từ đơn đã hoàn tất. Nếu tổng hợp cả đơn "
   "CANCELLED hay PENDING, con số sẽ bị thổi phồng. "
   "QA cần xác minh hệ thống lọc đúng trạng thái khi tính doanh thu "
   "trước khi chốt số báo cáo cuối kỳ.",
 "before_label": "Bảng Orders — dòng đỏ: ORD_002 có total_amount sai (Bug-B):",
 "before_cols": ["order_id","customer_id","total_amount","status","order_date"],
 "before_rows": [
   ["ORD_001","C001","32.000.000","COMPLETED","2026-06-20"],
   ["ORD_002","C002","20.000.000","COMPLETED","2026-06-22"],
   ["ORD_003","C003","8.000.000","CANCELLED","2026-06-23"],
   ["ORD_004","C999","5.000.000","PENDING",  "2026-06-24"],
   ["ORD_005","C001","15.000.000","CANCELLED","2026-06-25"],
 ],
 "before_bugs": [1],
 "before_col_widths": [65, 80, 105, 95, 148],
 "sql": (
   "SELECT c.customer_name,\n"
   "       o.order_id,\n"
   "       o.total_amount,\n"
   "       o.order_date\n"
   "FROM   Orders o\n"
   "JOIN   Customers c\n"
   "       ON o.customer_id = c.customer_id\n"
   "WHERE  o.status = 'COMPLETED'\n"
   "ORDER  BY o.total_amount DESC;"
 ),
 "clauses": [
   ("FROM Orders o\n  JOIN Customers c\n    ON o.customer_id = c.customer_id",
    "<b>INNER JOIN</b> lấy tên khách hàng cho mỗi đơn. "
    "ORD_004 (customer_id = C999 không tồn tại) tự động bị loại bởi JOIN này."),
   ("WHERE o.status = 'COMPLETED'",
    "Lọc chỉ đơn đã hoàn tất. "
    "ORD_003 (CANCELLED) và ORD_004 (PENDING) không được tính vào doanh thu."),
   ("ORDER BY o.total_amount DESC",
    "Đơn có giá trị lớn nhất lên đầu — "
    "dễ phát hiện đơn bất thường hoặc Bug-B khi đối chiếu với Câu 11."),
 ],
 "explain":
   "Thêm <b>WHERE status = 'COMPLETED'</b> là điều kiện bắt buộc trong mọi câu báo cáo doanh thu.<br/>"
   "Trong data mẫu, tổng total_amount hai đơn COMPLETED = 32M + 20M = 52M.<br/>"
   "Nhưng ORD_002 ghi total_amount = 20M trong khi tổng items thực = 31M (Bug-B) — "
   "tức 52M này đã thấp hơn thực tế. Đừng vội chốt một con số 'doanh thu thực' ở đây: "
   "cần làm sạch dữ liệu lệch (Câu 11) trước khi đưa vào báo cáo.",
 "result_table": (
   ["customer_name","order_id","total_amount","order_date"],
   [
     ["Nguyen Van A","ORD_001","32.000.000","2026-06-20"],
     ["Tran Van B",  "ORD_002","20.000.000","2026-06-22"],
   ]
 ),
 "result_note":
   "2 đơn COMPLETED, tổng 52M. Con số của ORD_002 (20M) bị sai do Bug-B — "
   "chạy Câu 11 để xác nhận trước khi chốt báo cáo.",
 "note":
   "Câu này chỉ lọc theo status — không kiểm tra total_amount có đúng không.<br/>"
   "Để có doanh thu chính xác nhất, dùng tổ hợp ba câu:<br/>"
   "(1) <b>Câu 11</b>: phát hiện đơn có total_amount lệch với tổng items.<br/>"
   "(2) <b>Câu 25</b>: lọc chỉ đơn COMPLETED.<br/>"
   "(3) <b>Câu 21</b>: tính lại doanh thu từ items cho những đơn đã xác nhận sạch.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 2, "id": 26,
 "title": "Phân tích tỷ lệ đơn hàng theo trạng thái",
 "situation":
   "Tỷ lệ CANCELLED cao là dấu hiệu vấn đề UX, luồng thanh toán, hoặc bug nghiệp vụ. "
   "QA cần bảng thống kê trạng thái đơn để theo dõi xu hướng theo sprint "
   "và phát hiện khi tỷ lệ một trạng thái thay đổi bất thường.",
 "before_label": "Bảng Orders — dữ liệu đầu vào để phân tích trạng thái:",
 "before_cols": ["order_id","customer_id","total_amount","status","order_date"],
 "before_rows": [
   ["ORD_001","C001","32.000.000","COMPLETED","2026-06-20"],
   ["ORD_002","C002","20.000.000","COMPLETED","2026-06-22"],
   ["ORD_003","C003","8.000.000","CANCELLED","2026-06-23"],
   ["ORD_004","C999","5.000.000","PENDING",  "2026-06-24"],
   ["ORD_005","C001","15.000.000","CANCELLED","2026-06-25"],
 ],
 "before_bugs": [],
 "before_col_widths": [65, 80, 105, 95, 148],
 "sql": (
   "SELECT status,\n"
   "       COUNT(*) AS so_don,\n"
   "       ROUND(COUNT(*) * 100.0 /\n"
   "         (SELECT COUNT(*) FROM Orders), 1)\n"
   "         AS phan_tram\n"
   "FROM   Orders\n"
   "GROUP  BY status\n"
   "ORDER  BY so_don DESC;"
 ),
 "clauses": [
   ("FROM Orders",
    "MySQL tải toàn bộ bảng <b>Orders</b>."),
   ("GROUP BY status",
    "Gom tất cả đơn có cùng trạng thái thành một nhóm. "
    "Kết quả là 1 dòng cho mỗi giá trị status tồn tại trong bảng."),
   ("COUNT(*) * 100.0 /\n  (SELECT COUNT(*) FROM Orders)",
    "Subquery đếm tổng số đơn. "
    "Chia COUNT nhóm cho tổng rồi nhân 100 để ra phần trăm. "
    "<b>ROUND(..., 1)</b> làm tròn 1 chữ số thập phân."),
   ("ORDER BY so_don DESC",
    "Trạng thái phổ biến nhất lên đầu."),
 ],
 "explain":
   "Subquery <b>(SELECT COUNT(*) FROM Orders)</b> trong SELECT là scalar subquery — "
   "trả về một giá trị dùng làm mẫu số cho tất cả các dòng.<br/>"
   "Nhân với <b>100.0</b> (không phải 100) để ép MySQL dùng phép chia số thực — "
   "nếu dùng 100 (số nguyên), kết quả sẽ bị làm tròn xuống 0.<br/>"
   "Với data mẫu: COMPLETED = 40%, CANCELLED = 40%, PENDING = 20%.",
 "result_table": (
   ["status","so_don","phan_tram"],
   [
     ["COMPLETED", 2, "40.0"],
     ["CANCELLED", 2, "40.0"],
     ["PENDING",   1, "20.0"],
   ]
 ),
 "result_note":
   "40% đơn hoàn tất, 40% bị hủy, 20% chờ xử lý. Với dữ liệu test ít, tỷ lệ này không phản ánh thực tế. "
   "Câu này có giá trị thật khi chạy trên dữ liệu production đủ lớn.",
 "note":
   "Hai lưu ý khi dùng câu này trên production:<br/>"
   "(1) <b>Trạng thái lạ</b>: nếu xuất hiện status không trong danh sách chuẩn, "
   "đây là dòng bất thường cần điều tra — kết hợp với Câu 9 (kỹ thuật ENUM check).<br/>"
   "(2) <b>Tỷ lệ thay đổi đột ngột</b>: CANCELLED tăng từ 10% lên 30% sau một sprint "
   "là tín hiệu cần xem lại luồng checkout hoặc thanh toán.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 2, "id": 27,
 "title": "Tổng doanh thu theo danh mục sản phẩm",
 "situation":
   "Quản lý sản phẩm cần biết danh mục nào đóng góp bao nhiêu vào doanh thu "
   "để ra quyết định nhập hàng và phân bổ ngân sách. "
   "Câu lệnh này tổng hợp từ Order_Items lên level danh mục qua bảng Products.",
 "before_label": "Bảng Order_Items — dòng đỏ: item_id=7 làm danh mục Dien thoai bị thổi phồng:",
 "before_cols": ["item_id","order_id","product_id","quantity","price"],
 "before_rows": [
   [1,"ORD_001","PROD_001",1,"30.000.000"],
   [2,"ORD_001","PROD_002",1, "2.000.000"],
   [4,"ORD_002","PROD_001",1,"30.000.000"],
   [5,"ORD_002","PROD_004",1, "1.000.000"],
   [6,"ORD_003","PROD_003",1, "8.000.000"],
   [7,"ORD_001","PROD_001",1,"30.000.000"],
   [8,"ORD_005","PROD_004",1,"1.000.000"],
   [9,"ORD_005","PROD_002",1,"2.000.000"],
 ],
 "before_bugs": [5],
 "before_col_widths": [50, 75, 90, 65, 213],
 "sql": (
   "SELECT p.category,\n"
   "       COUNT(DISTINCT oi.order_id) AS so_don_co_sp,\n"
   "       SUM(oi.quantity)             AS tong_so_luong,\n"
   "       SUM(oi.quantity * oi.price)  AS tong_doanh_so\n"
   "FROM   Order_Items oi\n"
   "JOIN   Products p\n"
   "       ON oi.product_id = p.product_id\n"
   "GROUP  BY p.category\n"
   "ORDER  BY tong_doanh_so DESC;"
 ),
 "clauses": [
   ("FROM Order_Items oi\n  JOIN Products p\n    ON oi.product_id = p.product_id",
    "<b>INNER JOIN</b> lấy thông tin category từ Products cho mỗi dòng Order_Items. "
    "Sản phẩm chưa bán không xuất hiện — danh mục chỉ tồn tại nếu có đơn."),
   ("GROUP BY p.category",
    "Gom tất cả items về cùng danh mục thành một nhóm. "
    "Mỗi dòng kết quả = một danh mục."),
   ("COUNT(DISTINCT oi.order_id),\n  SUM(oi.quantity * oi.price)",
    "<b>COUNT(DISTINCT order_id)</b> đếm số đơn có ít nhất 1 sản phẩm thuộc danh mục này "
    "(không tính trùng). <b>SUM(quantity × price)</b> tính tổng doanh số."),
   ("ORDER BY tong_doanh_so DESC",
    "Danh mục doanh số cao nhất lên đầu."),
 ],
 "explain":
   "Kỹ thuật <b>JOIN + GROUP BY category</b> tổng hợp dữ liệu qua hai bảng lên một level cao hơn.<br/>"
   "Kết quả bị ảnh hưởng bởi item trùng: 'Dien thoai' cho 90M thay vì 60M thực tế.<br/>"
   "<b>COUNT(DISTINCT order_id)</b> thay vì <b>COUNT(*)</b>: nếu một đơn có 2 item cùng danh mục, "
   "đơn đó chỉ được đếm 1 lần — phản ánh đúng số đơn có mua sản phẩm danh mục này.",
 "result_table": (
   ["category","so_don_co_sp","tong_so_luong","tong_doanh_so"],
   [
     ["Dien thoai", 2, 3, "90.000.000"],
     ["Phu kien",   4, 5, "14.000.000"],
   ]
 ),
 "result_note":
   "'Dien thoai' dẫn đầu 90M — bị thổi phồng do item 7 trùng. Thực tế là 60M. "
   "'Phu kien' 14M từ 4 đơn (3 sản phẩm PROD_002, 004, 003).",
 "note":
   "Kết quả chỉ có 2 danh mục vì INNER JOIN loại sản phẩm chưa bán.<br/>"
   "Nếu muốn xem đầy đủ tất cả danh mục (kể cả chưa có doanh số):<br/>"
   "Đổi sang <b>RIGHT JOIN</b> Products rồi LEFT JOIN Order_Items — "
   "danh mục chưa bán sẽ hiện với tong_doanh_so = NULL.<br/>"
   "Cũng cần chạy Câu 2 để làm sạch item trùng trước khi dùng câu này báo cáo.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 2, "id": 28,
 "title": "Đối soát tồn kho hiện tại với lượng đã bán ra",
 "situation":
   "Tồn kho hiện tại (stock) + lượng đã bán (SUM items) phải khớp với tồn kho ban đầu. "
   "Nếu con số ước tính không hợp lý — âm, quá thấp hoặc quá cao — "
   "có thể có giao dịch bị bỏ sót, dữ liệu kho bị sửa thủ công, "
   "hoặc bug trong logic trừ kho.",
 "before_label": "Bảng Products — dòng đỏ: PROD_003 stock âm sẽ cho uoc_tinh_ban_dau bất thường:",
 "before_cols": ["product_id","product_name","category","price","stock"],
 "before_rows": [
   ["PROD_001","iPhone 15 Pro Max",        "Dien thoai","30.000.000", 50],
   ["PROD_002","Ban phim co Logitech",     "Phu kien",  "2.000.000", 100],
   ["PROD_003","Tai nghe Sony WH-1000XM5", "Phu kien",  "8.000.000",  -5],
   ["PROD_004","Sac du phong Anker",       "Phu kien",  "1.000.000",  20],
   ["PROD_005","Ban phim co Logitech",     "Phu kien",  "2.000.000",  30],
   ["PROD_006","Loa Bluetooth JBL",        "Phu kien",  "(NULL)",     10],
   ["PROD_007","Chuot gaming Razer",       "Phu kien",  "1.500.000","(NULL)"],
 ],
 "before_bugs": [2],
 "before_col_widths": [65, 178, 65, 90, 95],
 "sql": (
   "SELECT p.product_id,\n"
   "       p.product_name,\n"
   "       p.stock                       AS ton_kho_hien_tai,\n"
   "       COALESCE(SUM(oi.quantity), 0) AS tong_da_ban,\n"
   "       p.stock\n"
   "         + COALESCE(SUM(oi.quantity), 0)\n"
   "                                     AS uoc_tinh_ban_dau\n"
   "FROM   Products p\n"
   "LEFT JOIN Order_Items oi\n"
   "       ON p.product_id = oi.product_id\n"
   "GROUP  BY p.product_id, p.product_name, p.stock\n"
   "ORDER  BY p.product_id;"
 ),
 "clauses": [
   ("FROM Products p\n  LEFT JOIN Order_Items oi\n    ON p.product_id = oi.product_id",
    "<b>LEFT JOIN</b> giữ TẤT CẢ sản phẩm, kể cả chưa bán. "
    "Sản phẩm chưa bán sẽ có SUM(oi.quantity) = NULL từ phía Order_Items."),
   ("COALESCE(SUM(oi.quantity), 0)\n  AS tong_da_ban",
    "<b>COALESCE</b> chuyển NULL thành 0 cho sản phẩm chưa bán. "
    "Không dùng COALESCE thì tong_da_ban = NULL — phép cộng tiếp theo sẽ bị NULL."),
   ("p.stock +\n  COALESCE(SUM(oi.quantity), 0)\n  AS uoc_tinh_ban_dau",
    "Ước tính tồn kho ban đầu = tồn hiện tại + đã bán. "
    "Nếu con số này âm → có giao dịch khi kho đã âm."),
   ("GROUP BY p.product_id,\n  p.product_name, p.stock",
    "p.stock phải có trong GROUP BY vì được dùng trong SELECT "
    "nhưng không phải aggregate."),
 ],
 "explain":
   "Kỹ thuật <b>LEFT JOIN + COALESCE + aggregate</b> tạo bảng đối soát kho đầy đủ.<br/>"
   "PROD_003: uoc_tinh_ban_dau = -5 + 1 = <b>-4</b> — tồn kho ước tính ban đầu âm, "
   "vật lý không thể xảy ra → xác nhận dữ liệu tồn kho đã sai ở đâu đó, cần điều tra.<br/>"
   "PROD_001: 50 + 3 = 53 — lẽ ra phải là 52 nếu chỉ bán 2 unit, "
   "chênh 1 đơn vị chính xác bằng item 7 trùng.",
 "result_table": (
   ["product_id","product_name","ton_kho_hien_tai","tong_da_ban","uoc_tinh_ban_dau"],
   [
     ["PROD_001","iPhone 15 Pro Max",    50,      3,  53],
     ["PROD_002","Ban phim co Logitech", 100,     2, 102],
     ["PROD_003","Tai nghe Sony WH-1000XM5", -5,  1,  -4],
     ["PROD_004","Sac du phong Anker",    20,     2,  22],
     ["PROD_005","Ban phim co Logitech",  30,     0,  30],
     ["PROD_006","Loa Bluetooth JBL",     10,     0,  10],
     ["PROD_007","Chuot gaming Razer", "(NULL)",  0,"(NULL)"],
   ]
 ),
 "result_note":
   "PROD_003: uoc_tinh_ban_dau = -4 → bất khả thi, xác nhận dữ liệu tồn kho không nhất quán, cần điều tra. "
   "PROD_001: 53 thay vì 52 → item trùng thổi phồng thêm 1 đơn vị.",
 "note":
   "<b>COALESCE</b> là hàm quan trọng khi LEFT JOIN: không dùng sẽ cho NULL không tính được.<br/>"
   "Hai trường hợp kết quả bất thường cần điều tra thêm:<br/>"
   "(1) <b>uoc_tinh_ban_dau âm</b>: tồn kho âm là bất khả thi về mặt vật lý — bug dữ liệu gốc cần điều tra.<br/>"
   "(2) <b>uoc_tinh_ban_dau quá cao</b>: có thể items bị trùng hoặc kho không trừ đúng.<br/>"
   "PROD_007 trả về NULL vì stock = NULL — COALESCE chỉ xử lý phía tong_da_ban, không xử lý p.stock.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 2, "id": 29,
 "title": "Phát hiện đơn hàng bị tạo trùng (double order)",
 "situation":
   "Khi người dùng bấm nút Đặt hàng nhiều lần hoặc xảy ra lỗi mạng khiến "
   "request gửi hai lần, hệ thống có thể tạo hai đơn giống nhau trong tích tắc. "
   "Đây là lỗi double-charge nghiêm trọng — khách bị trừ tiền hai lần "
   "cho cùng một đơn mà không hay biết.",
 "before_label": "Bảng Orders — kiểm tra có cặp đơn nào trùng customer + tổng tiền + ngày không:",
 "before_cols": ["order_id","customer_id","total_amount","status","order_date"],
 "before_rows": [
   ["ORD_001","C001","32.000.000","COMPLETED","2026-06-20"],
   ["ORD_002","C002","20.000.000","COMPLETED","2026-06-22"],
   ["ORD_003","C003","8.000.000","CANCELLED","2026-06-23"],
   ["ORD_004","C999","5.000.000","PENDING",  "2026-06-24"],
   ["ORD_005","C001","15.000.000","CANCELLED","2026-06-25"],
 ],
 "before_bugs": [],
 "before_col_widths": [65, 80, 105, 95, 148],
 "sql": (
   "SELECT customer_id,\n"
   "       total_amount,\n"
   "       order_date,\n"
   "       COUNT(*) AS so_lan\n"
   "FROM   Orders\n"
   "GROUP  BY customer_id, total_amount, order_date\n"
   "HAVING COUNT(*) > 1;"
 ),
 "clauses": [
   ("FROM Orders",
    "MySQL tải toàn bộ bảng <b>Orders</b>."),
   ("GROUP BY customer_id,\n  total_amount, order_date",
    "Gom theo bộ ba: cùng khách, cùng tổng tiền, cùng ngày. "
    "Nếu một nhóm có nhiều hơn 1 đơn — rất có thể là double order."),
   ("HAVING COUNT(*) > 1",
    "Chỉ giữ nhóm xuất hiện từ 2 lần trở lên — dấu hiệu của đơn bị tạo trùng."),
 ],
 "explain":
   "Kỹ thuật <b>GROUP BY nhiều cột + HAVING COUNT</b> — cùng mẫu với Câu 1 và Câu 2, "
   "áp dụng cho bảng Orders để phát hiện double submission.<br/>"
   "Kết quả rỗng trong data mẫu là bình thường — chưa có đơn trùng.<br/>"
   "Trong thực tế, câu này nên chạy sau mỗi đợt stress test hoặc khi khách phản ánh "
   "bị trừ tiền hai lần.",
 "result_table": (
   ["customer_id","total_amount","order_date","so_lan"],
   [],
 ),
 "result_note":
   "Kết quả rỗng — không có đơn hàng bị tạo trùng. "
   "Chạy lại câu này sau stress test để phát hiện sớm double-charge bug.",
 "note":
   "Gộp theo <b>order_date</b> (ngày) có thể bỏ sót double order xảy ra trong cùng ngày "
   "nhưng cách nhau vài phút — vẫn là hai đơn hợp lệ.<br/>"
   "Nếu DB lưu cả giờ phút, dùng điều kiện chặt hơn:<br/>"
   "<b>TIMESTAMPDIFF(MINUTE, o1.order_date, o2.order_date) &lt; 5</b> "
   "— chỉ bắt hai đơn cách nhau dưới 5 phút mới là double order thật sự.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 2, "id": 30,
 "title": "Phát hiện đơn hàng có giá trị bất thường (outlier)",
 "situation":
   "Đơn hàng có total_amount quá cao so với mức bình thường có thể do: "
   "nhập nhầm số lượng, giá sản phẩm bị set sai, hoặc bug logic tính tiền. "
   "Câu lệnh này tìm đơn vượt ngưỡng 1.5× trung bình như một bước kiểm tra nhanh.",
 "before_label": "Bảng Orders — dòng đỏ: ORD_001 vượt ngưỡng 1.5× trung bình:",
 "before_cols": ["order_id","customer_id","total_amount","status","order_date"],
 "before_rows": [
   ["ORD_001","C001","32.000.000","COMPLETED","2026-06-20"],
   ["ORD_002","C002","20.000.000","COMPLETED","2026-06-22"],
   ["ORD_003","C003","8.000.000","CANCELLED","2026-06-23"],
   ["ORD_004","C999","5.000.000","PENDING",  "2026-06-24"],
   ["ORD_005","C001","15.000.000","CANCELLED","2026-06-25"],
 ],
 "before_bugs": [0],
 "before_col_widths": [65, 80, 105, 95, 148],
 "sql": (
   "SELECT order_id,\n"
   "       customer_id,\n"
   "       total_amount\n"
   "FROM   Orders\n"
   "WHERE  total_amount >\n"
   "       (SELECT AVG(total_amount) * 1.5\n"
   "        FROM Orders)\n"
   "ORDER  BY total_amount DESC;"
 ),
 "clauses": [
   ("FROM Orders",
    "MySQL tải toàn bộ bảng <b>Orders</b>."),
   ("WHERE total_amount >\n  (SELECT AVG(total_amount) * 1.5\n   FROM Orders)",
    "Subquery tính trung bình total_amount rồi nhân 1.5 làm ngưỡng. "
    "Trong data mẫu: AVG = 16.000.000 → ngưỡng = 24.000.000. "
    "Chỉ ORD_001 (32M) vượt ngưỡng này."),
   ("ORDER BY total_amount DESC",
    "Đơn có giá trị cao nhất lên đầu để QA xem xét trước."),
 ],
 "explain":
   "Dùng <b>subquery trong WHERE</b> để so sánh từng dòng với một ngưỡng động "
   "tính từ chính bảng đó — không cần biết trước ngưỡng là bao nhiêu.<br/>"
   "AVG trong data mẫu = 16.000.000 → ngưỡng 1.5× = 24.000.000.<br/>"
   "ORD_001 (32M) vượt ngưỡng và được flag. Điều này không có nghĩa là lỗi — "
   "đây là điểm khởi đầu để QA điều tra thêm bằng Câu 11.",
 "result_table": (
   ["order_id","customer_id","total_amount"],
   [["ORD_001","C001","32.000.000"]],
 ),
 "result_note":
   "ORD_001 (32M) vượt ngưỡng 1.5× trung bình (24.000.000). "
   "Tổng tiền 32M là hợp lệ (30M + 2M), nhưng doanh thu từ items = 62M do item trùng — "
   "đây mới là bất thường thật sự, cần Câu 11 để phát hiện.",
 "note":
   "Ngưỡng 1.5× trung bình là điểm khởi đầu — điều chỉnh tùy nghiệp vụ:<br/>"
   "(1) Đơn B2B thường có giá trị lớn hơn B2C nhiều lần — nên tách hai nhóm riêng.<br/>"
   "(2) Nếu muốn chặt hơn, dùng <b>2×</b> hoặc <b>3×</b> trung bình.<br/>"
   "(3) Phương pháp thống kê tốt hơn là dùng <b>độ lệch chuẩn</b>: "
   "flag đơn vượt trung bình + 2×STDDEV. MySQL có sẵn <b>STDDEV()</b> / "
   "<b>STDDEV_SAMP()</b> / <b>STDDEV_POP()</b> — chỉ là không lồng trực tiếp với AVG "
   "trong cùng một HAVING được, nên tính ngưỡng (trung bình + 2×độ lệch chuẩn) bằng subquery.",
},


# ============================================================
# PHẦN 4 — Biên và dữ liệu bất thường
# ============================================================
{
 "part": 3, "id": 31,
 "title": "Tìm tên khách hàng chứa ký tự bất thường",
 "situation":
   "Form nhập liệu thường chỉ chặn ký tự đặc biệt ở frontend. "
   "Nếu backend API không validate, tên khách có thể chứa ký tự số, "
   "ngoặc, ký tự lạ — gây lỗi khi render, export PDF, hoặc tích hợp "
   "hệ thống bên ngoài vốn kỳ vọng dữ liệu sạch.",
 "before_label": "Bảng Customers — dòng đỏ: tên chứa ký tự ngoài chữ cái thường:",
 "before_cols": ["customer_id","customer_name","email","status"],
 "before_rows": [
   ["C001","Nguyen Van A",      "a.nguyen@email.com",    "ACTIVE"],
   ["C002","Tran Van B",        "b.tran@email.com",      "ACTIVE"],
   ["C003","Le Thi C",          "c.le@email.com",        "ACTIVE"],
   ["C004","Khach Hang Ao Bug", "trung_email@email.com", "ACTIVE"],
   ["C005","Khach Hang Trung",  "trung_email@email.com", "ACTIVE"],
   ["C006","Pham Van X",        "(NULL)",                "ACTIVE"],
   ["C007","Nguyen Thi Y",      "",                      "ACTIVE"],
   ["C008","  Pham Van D  ",    "d.pham@email.com",      "ACTIVE"],
   ["C009","Nguyen Van A (2)",  "A.NGUYEN@EMAIL.COM",    "ACTIVE"],
   ["C010","Khach Test VIP",    "vip@email.com",         "ACTIVE"],
 ],
 "before_bugs": [8],
 "before_col_widths": [55, 145, 225, 68],
 "sql": (
   "SELECT customer_id,\n"
   "       customer_name\n"
   "FROM   Customers\n"
   "WHERE  customer_name REGEXP '[0-9()]';"
 ),
 "clauses": [
   ("FROM Customers",
    "MySQL tải toàn bộ bảng <b>Customers</b>."),
   ("WHERE customer_name\n  REGEXP '[0-9()]'",
    "<b>REGEXP</b> kiểm tra chuỗi theo mẫu biểu thức chính quy. "
    "Pattern <b>[0-9()]</b> khớp với bất kỳ ký tự nào là chữ số (0–9) "
    "hoặc dấu ngoặc tròn."),
   ("SELECT customer_id, customer_name",
    "Chiếu hai cột để QA xác minh và quyết định chuẩn hóa."),
 ],
 "explain":
   "<b>REGEXP</b> (Regular Expression) là công cụ mạnh để kiểm tra định dạng dữ liệu "
   "mà LIKE không làm được.<br/>"
   "Pattern <b>[0-9()]</b> khớp với CHỮ SỐ hoặc DẤU NGOẶC — hai loại ký tự "
   "không nên xuất hiện trong tên người thật.<br/>"
   "C009 'Nguyen Van A (2)' bị bắt vì có cả '(' ')' và chữ số '2' — "
   "đây là tên được nhập để đối phó với ràng buộc UNIQUE, không phải tên thật.",
 "result_table": (
   ["customer_id","customer_name"],
   [["C009","Nguyen Van A (2)"]],
 ),
 "result_note":
   "1 bản ghi: C009 có tên chứa ngoặc và số — dấu hiệu dữ liệu test "
   "hoặc người dùng cố gắng bypass ràng buộc unique tên.",
 "note":
   "Mở rộng pattern để bắt thêm ký tự đặc biệt khác:<br/>"
   "(1) <b>[!@#$%^&*]</b>: bắt ký tự đặc biệt thường gặp trong SQL injection.<br/>"
   "(2) <b>[^a-zA-Z ]</b>: chỉ cho phép chữ cái Latin và dấu cách — "
   "cẩn thận vì sẽ bắt cả tên tiếng Việt có dấu.<br/>"
   "Với dữ liệu tiếng Việt, cách an toàn hơn là <b>whitelist</b>: "
   "kiểm tra từng dòng thủ công thay vì dùng REGEXP.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 3, "id": 32,
 "title": "Tìm email không đúng định dạng cơ bản",
 "situation":
   "Câu 3 đã bắt email NULL và chuỗi rỗng. Câu này đi thêm một bước: "
   "kiểm tra email <b>có nội dung</b> nhưng thiếu ký tự @ hoặc dấu chấm domain — "
   "dấu hiệu nhập sai hoặc bypass validation bằng cách nhập chữ bừa.",
 "before_label": "Bảng Customers — dòng đỏ: email NULL, rỗng hoặc không có @/dấu chấm:",
 "before_cols": ["customer_id","customer_name","email","status"],
 "before_rows": [
   ["C001","Nguyen Van A",      "a.nguyen@email.com",    "ACTIVE"],
   ["C002","Tran Van B",        "b.tran@email.com",      "ACTIVE"],
   ["C003","Le Thi C",          "c.le@email.com",        "ACTIVE"],
   ["C004","Khach Hang Ao Bug", "trung_email@email.com", "ACTIVE"],
   ["C005","Khach Hang Trung",  "trung_email@email.com", "ACTIVE"],
   ["C006","Pham Van X",        "(NULL)",                "ACTIVE"],
   ["C007","Nguyen Thi Y",      "",                      "ACTIVE"],
   ["C008","  Pham Van D  ",    "d.pham@email.com",      "ACTIVE"],
   ["C009","Nguyen Van A (2)",  "A.NGUYEN@EMAIL.COM",    "ACTIVE"],
   ["C010","Khach Test VIP",    "vip@email.com",         "ACTIVE"],
 ],
 "before_bugs": [5, 6],
 "before_col_widths": [55, 145, 225, 68],
 "sql": (
   "SELECT customer_id,\n"
   "       customer_name,\n"
   "       email\n"
   "FROM   Customers\n"
   "WHERE  email IS NULL\n"
   "    OR TRIM(email) = ''\n"
   "    OR email NOT LIKE '%@%'\n"
   "    OR email NOT LIKE '%.%';"
 ),
 "clauses": [
   ("FROM Customers",
    "MySQL tải toàn bộ bảng <b>Customers</b>."),
   ("WHERE email IS NULL\n    OR TRIM(email) = ''",
    "Hai điều kiện này trùng với Câu 3 — nhắc lại ở đây để câu lệnh "
    "hoạt động độc lập, không cần chạy thêm câu khác."),
   ("OR email NOT LIKE '%@%'\n    OR email NOT LIKE '%.%'",
    "<b>NOT LIKE '%@%'</b>: email không chứa ký tự @ — không thể hợp lệ. "
    "<b>NOT LIKE '%.%'</b>: không có dấu chấm — thiếu phần domain (vd .com)."),
   ("SELECT customer_id,\n  customer_name, email",
    "Chiếu đủ thông tin để QA liên hệ xác nhận email thật."),
 ],
 "explain":
   "Câu này kiểm tra email theo <b>ba tầng</b>:<br/>"
   "(1) Tầng tồn tại: NULL hoặc chuỗi rỗng → không có email.<br/>"
   "(2) Tầng cấu trúc: thiếu @ → không thể là email hợp lệ.<br/>"
   "(3) Tầng domain: thiếu dấu chấm → không có phần .com/.vn.<br/>"
   "LIKE '%@%.%' không bắt được email như 'abc@' hay '@domain.com' "
   "— với dữ liệu nghiêm ngặt, dùng REGEXP thay thế.",
 "result_table": (
   ["customer_id","customer_name","email"],
   [
     ["C006","Pham Van X",   "(NULL)"],
     ["C007","Nguyen Thi Y", ""],
   ]
 ),
 "result_note":
   "C006: email NULL — chưa có. C007: email rỗng — nhập bỏ qua. "
   "Trên data mẫu, hai tầng kiểm tra @ và dấu chấm CHƯA bắt thêm dòng nào ngoài NULL/rỗng "
   "(các email còn lại đều đúng cấu trúc) — nhưng đó là tuyến phòng thủ quan trọng trên dữ liệu "
   "thật khi người dùng nhập email sai cấu trúc.",
 "note":
   "LIKE là kiểm tra nhanh nhưng lỏng lẻo — không bắt được các trường hợp như:<br/>"
   "(1) <b>'abc@'</b>: có @ nhưng không có domain → LIKE '%@%' vẫn pass.<br/>"
   "(2) <b>'@domain.com'</b>: thiếu phần local → LIKE cũng pass.<br/>"
   "Để kiểm tra chặt hơn, dùng REGEXP:<br/>"
   "<b>WHERE email NOT REGEXP '^[A-Za-z0-9._%+\\-]+@[A-Za-z0-9.\\-]+\\.[A-Za-z]{2,}$'</b>",
},
# ─────────────────────────────────────────────────────────
{
 "part": 3, "id": 33,
 "title": "Kiểm tra số lượng sản phẩm bất thường trong Order_Items",
 "situation":
   "Cột quantity phải luôn >= 1. Quantity = 0 là đơn trống về số lượng "
   "nhưng vẫn tồn tại trong DB — lỗi logic. "
   "Quantity âm có thể là bug trừ kho ngược chiều hoặc dữ liệu hoàn trả "
   "bị ghi sai bảng. Quantity quá lớn (> 1000) cũng cần xem xét.",
 "before_label": "Bảng Order_Items — kiểm tra quantity có trong ngưỡng hợp lệ không:",
 "before_cols": ["item_id","order_id","product_id","quantity","price"],
 "before_rows": [
   [1,"ORD_001","PROD_001",1,"30.000.000"],
   [2,"ORD_001","PROD_002",1, "2.000.000"],
   [4,"ORD_002","PROD_001",1,"30.000.000"],
   [5,"ORD_002","PROD_004",1, "1.000.000"],
   [6,"ORD_003","PROD_003",1, "8.000.000"],
   [7,"ORD_001","PROD_001",1,"30.000.000"],
   [8,"ORD_005","PROD_004",1,"1.000.000"],
   [9,"ORD_005","PROD_002",1,"2.000.000"],
 ],
 "before_bugs": [],
 "before_col_widths": [50, 75, 90, 65, 213],
 "sql": (
   "SELECT item_id,\n"
   "       order_id,\n"
   "       product_id,\n"
   "       quantity\n"
   "FROM   Order_Items\n"
   "WHERE  quantity <= 0\n"
   "    OR quantity > 1000;"
 ),
 "clauses": [
   ("FROM Order_Items",
    "MySQL tải toàn bộ bảng <b>Order_Items</b>."),
   ("WHERE quantity <= 0\n    OR quantity > 1000",
    "Hai điều kiện biên: <b><= 0</b> bắt lỗi âm và zero; "
    "<b>> 1000</b> bắt số lượng bất thường lớn "
    "(ngưỡng tùy ngành hàng)."),
   ("SELECT item_id, order_id,\n  product_id, quantity",
    "Chiếu đủ thông tin để QA xác định item nào vi phạm và thuộc đơn nào."),
 ],
 "explain":
   "Kiểm tra biên dưới (<b>quantity <= 0</b>) và biên trên (<b>quantity > 1000</b>) "
   "là cặp kiểm tra chuẩn cho mọi trường số lượng.<br/>"
   "Kết quả rỗng trong data mẫu — tất cả items đều có quantity = 1, hoàn toàn hợp lệ.<br/>"
   "Kết quả rỗng ở đây là confirmation tốt: "
   "hệ thống chưa có bug quantity trong dữ liệu hiện tại.",
 "result_table": (
   ["item_id","order_id","product_id","quantity"],
   [],
 ),
 "result_note":
   "Kết quả rỗng — tất cả quantity đều hợp lệ (= 1). "
   "Chạy lại sau mỗi lần import hàng loạt hoặc sau sprint có tính năng 'hoàn hàng'.",
 "note":
   "Ngưỡng > 1000 chỉ là ví dụ — điều chỉnh tùy nghiệp vụ:<br/>"
   "(1) Bán lẻ (B2C): quantity > 10 đã đáng ngờ.<br/>"
   "(2) Bán buôn (B2B): quantity > 10.000 mới bất thường.<br/>"
   "Để thêm CHECK constraint vào DB ngăn từ đầu:<br/>"
   "<b>ALTER TABLE Order_Items ADD CONSTRAINT chk_qty CHECK (quantity &gt;= 1);</b>",
},
# ─────────────────────────────────────────────────────────
{
 "part": 3, "id": 34,
 "title": "Kiểm tra ngày đặt hàng bất thường (tương lai hoặc quá xa quá khứ)",
 "situation":
   "Ngày đặt hàng trong tương lai là dấu hiệu đồng hồ server sai, "
   "dữ liệu được nhập thủ công với ngày sai, hoặc bug timezone. "
   "Ngày quá xa quá khứ (trước 2020) gợi ý dữ liệu migration bị lỗi "
   "hoặc giá trị placeholder chưa được cập nhật.",
 "before_label": "Bảng Orders — kiểm tra order_date có trong khoảng hợp lý không:",
 "before_cols": ["order_id","customer_id","total_amount","status","order_date"],
 "before_rows": [
   ["ORD_001","C001","32.000.000","COMPLETED","2026-06-20"],
   ["ORD_002","C002","20.000.000","COMPLETED","2026-06-22"],
   ["ORD_003","C003","8.000.000","CANCELLED","2026-06-23"],
   ["ORD_004","C999","5.000.000","PENDING",  "2026-06-24"],
   ["ORD_005","C001","15.000.000","CANCELLED","2026-06-25"],
 ],
 "before_bugs": [],
 "before_col_widths": [65, 80, 105, 95, 148],
 "sql": (
   "SELECT order_id,\n"
   "       customer_id,\n"
   "       order_date\n"
   "FROM   Orders\n"
   "WHERE  order_date > CURDATE()\n"
   "    OR order_date < '2020-01-01';"
 ),
 "clauses": [
   ("FROM Orders",
    "MySQL tải toàn bộ bảng <b>Orders</b>."),
   ("WHERE order_date > CURDATE()\n    OR order_date < '2020-01-01'",
    "<b>CURDATE()</b> trả về ngày hiện tại của server — "
    "không cần hardcode ngày vào câu lệnh. "
    "Ngày < 2020-01-01 là ngưỡng tự chọn; điều chỉnh tùy thời điểm "
    "hệ thống bắt đầu hoạt động."),
   ("SELECT order_id, customer_id,\n  order_date",
    "Chiếu ngày để QA xác minh nguồn gốc dữ liệu."),
 ],
 "explain":
   "Dùng <b>CURDATE()</b> thay vì hardcode ngày giúp câu lệnh luôn đúng "
   "mà không cần sửa theo thời gian.<br/>"
   "Kết quả rỗng trong data mẫu — tất cả đơn đều có ngày hợp lệ trong tháng 6/2026.<br/>"
   "Trên production, câu này nên chạy định kỳ — đặc biệt sau khi deploy tính năng "
   "mới có liên quan đến xử lý thời gian hoặc timezone.",
 "result_table": (
   ["order_id","customer_id","order_date"],
   [],
 ),
 "result_note":
   "Kết quả rỗng — tất cả ngày đặt hàng đều hợp lệ. "
   "Điều chỉnh ngưỡng '2020-01-01' theo ngày go-live thực tế của hệ thống.",
 "note":
   "Cạm bẫy timezone: CURDATE() trả về ngày theo timezone của MySQL server.<br/>"
   "Nếu app chạy ở timezone khác (vd UTC+7), "
   "ngày 2026-06-24 23:30 UTC+7 = 2026-06-24 16:30 UTC — "
   "cùng ngày nhưng CURDATE() của server UTC trả về 2026-06-24.<br/>"
   "Khi nghi ngờ timezone gây lỗi, thêm điều kiện: "
   "<b>TIMESTAMPDIFF(HOUR, order_date, NOW()) &lt; -8</b> "
   "để bắt đơn 'tương lai' trong vòng 8 giờ.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 3, "id": 35,
 "title": "Tìm tên sản phẩm trùng sau khi chuẩn hóa",
 "situation":
   "Câu 8 đã bắt trùng chính xác theo tên và giá. Câu này đi sâu hơn: "
   "chuẩn hóa tên về chữ thường và cắt khoảng trắng trước khi so sánh. "
   "Bắt được cả các kiểu trùng tinh vi hơn mà UNIQUE constraint "
   "case-insensitive chưa chặn được.",
 "before_label": "Bảng Products — dòng đỏ: tên trùng sau khi LOWER + TRIM:",
 "before_cols": ["product_id","product_name","category","price","stock"],
 "before_rows": [
   ["PROD_001","iPhone 15 Pro Max",        "Dien thoai","30.000.000", 50],
   ["PROD_002","Ban phim co Logitech",     "Phu kien",  "2.000.000", 100],
   ["PROD_003","Tai nghe Sony WH-1000XM5", "Phu kien",  "8.000.000",  -5],
   ["PROD_004","Sac du phong Anker",       "Phu kien",  "1.000.000",  20],
   ["PROD_005","Ban phim co Logitech",     "Phu kien",  "2.000.000",  30],
   ["PROD_006","Loa Bluetooth JBL",        "Phu kien",  "(NULL)",     10],
   ["PROD_007","Chuot gaming Razer",       "Phu kien",  "1.500.000","(NULL)"],
 ],
 "before_bugs": [1, 4],
 "before_col_widths": [65, 178, 65, 90, 95],
 "sql": (
   "SELECT LOWER(TRIM(product_name)) AS ten_chuan,\n"
   "       COUNT(*)                  AS so_ban_ghi\n"
   "FROM   Products\n"
   "GROUP  BY LOWER(TRIM(product_name))\n"
   "HAVING COUNT(*) > 1;"
 ),
 "clauses": [
   ("FROM Products",
    "MySQL tải toàn bộ bảng <b>Products</b>."),
   ("GROUP BY LOWER(TRIM(product_name))",
    "<b>LOWER</b> chuyển về chữ thường, <b>TRIM</b> cắt khoảng trắng hai đầu. "
    "Nhờ vậy 'Ban phim co Logitech' và '  ban phim co logitech  ' "
    "rơi vào cùng một nhóm."),
   ("HAVING COUNT(*) > 1",
    "Chỉ giữ nhóm có nhiều hơn 1 bản ghi — tên bị trùng sau chuẩn hóa."),
 ],
 "explain":
   "Kỹ thuật <b>LOWER + TRIM + GROUP BY</b> là cách chuẩn hóa trước khi so sánh — "
   "đã dùng ở Câu 6 (email), áp dụng tương tự cho product_name.<br/>"
   "PROD_002 và PROD_005 đều là 'Ban phim co Logitech' → "
   "sau LOWER+TRIM cho 'ban phim co logitech' → COUNT = 2.<br/>"
   "Câu 8 đã bắt cặp này theo (tên + giá), câu này bắt lại chỉ theo tên "
   "— phát hiện trùng ngay cả khi giá đã bị sửa khác nhau.",
 "result_table": (
   ["ten_chuan","so_ban_ghi"],
   [["ban phim co logitech", 2]],
 ),
 "result_note":
   "'ban phim co logitech' xuất hiện 2 lần (PROD_002 + PROD_005). "
   "Chạy thêm SELECT * FROM Products WHERE LOWER(TRIM(product_name)) = 'ban phim co logitech' "
   "để xem chi tiết cả hai dòng.",
 "note":
   "Kết quả câu này chỉ cho tên chuẩn hóa và số lần — không biết product_id nào.<br/>"
   "Để xem đầy đủ thông tin hai sản phẩm trùng, kết hợp với subquery:<br/>"
   "<b>SELECT * FROM Products</b><br/>"
   "<b>WHERE LOWER(TRIM(product_name)) IN</b><br/>"
   "<b>  (SELECT LOWER(TRIM(product_name)) FROM Products</b><br/>"
   "<b>   GROUP BY LOWER(TRIM(product_name)) HAVING COUNT(*) > 1)</b>",
},
# ─────────────────────────────────────────────────────────
{
 "part": 3, "id": 36,
 "title": "Phát hiện dữ liệu test/demo còn sót trong dữ liệu thật",
 "situation":
   "Trong lúc dựng môi trường hoặc thử nghiệm tính năng, dev/QA hay tạo tài khoản và bản ghi "
   "có tên gợi ý rõ ràng là test ('Test', 'Demo', 'Fake'...). Vấn đề là những bản ghi này đôi "
   "khi <b>quên dọn</b> trước khi lên production — làm sai lệch số liệu báo cáo, hoặc tệ hơn, "
   "biến thành lỗ hổng nếu tài khoản test có quyền cao.",
 "before_label": "Bảng Customers — dòng đỏ: tên gợi ý dữ liệu test/demo:",
 "before_cols": ["customer_id","customer_name","email","status"],
 "before_rows": [
   ["C001","Nguyen Van A",      "a.nguyen@email.com",    "ACTIVE"],
   ["C002","Tran Van B",        "b.tran@email.com",      "ACTIVE"],
   ["C003","Le Thi C",          "c.le@email.com",        "ACTIVE"],
   ["C004","Khach Hang Ao Bug", "trung_email@email.com", "ACTIVE"],
   ["C005","Khach Hang Trung",  "trung_email@email.com", "ACTIVE"],
   ["C006","Pham Van X",        "(NULL)",                "ACTIVE"],
   ["C007","Nguyen Thi Y",      "",                       "ACTIVE"],
   ["C008","  Pham Van D  ",    "d.pham@email.com",      "ACTIVE"],
   ["C009","Nguyen Van A (2)",  "A.NGUYEN@EMAIL.COM",    "ACTIVE"],
   ["C010","Khach Test VIP",    "vip@email.com",         "ACTIVE"],
 ],
 "before_bugs": [3, 9],
 "before_col_widths": [55, 145, 225, 68],
 "sql": (
   "SELECT customer_id,\n"
   "       customer_name,\n"
   "       email\n"
   "FROM   Customers\n"
   "WHERE  LOWER(customer_name) LIKE '%test%'\n"
   "    OR LOWER(customer_name) LIKE '%demo%'\n"
   "    OR LOWER(customer_name) LIKE '%fake%'\n"
   "    OR LOWER(customer_name) LIKE '%ao bug%'\n"
   "    OR LOWER(IFNULL(email,'')) LIKE '%test%'\n"
   "    OR LOWER(IFNULL(email,'')) LIKE '%demo%';"
 ),
 "clauses": [
   ("LOWER(customer_name)\n  LIKE '%test%'",
    "<b>LOWER</b> chuẩn hóa trước khi so khớp — bắt được cả 'Test', 'TEST', 'test'. "
    "<b>%...%</b> tìm chuỗi con ở bất kỳ vị trí nào trong tên."),
   ("LOWER(IFNULL(email,''))\n  LIKE '%test%'",
    "<b>IFNULL(email,'')</b> thay NULL bằng chuỗi rỗng trước khi LOWER — tránh LOWER(NULL) "
    "trả về NULL khiến LIKE luôn UNKNOWN và bỏ sót dòng có email NULL."),
   ("OR ... OR ...",
    "Mỗi từ khóa nghi vấn ('test', 'demo', 'fake'...) là một nhánh OR riêng — danh sách "
    "từ khóa nên được team thống nhất và cập nhật theo quy ước đặt tên test data thực tế."),
 ],
 "explain":
   "Kỹ thuật <b>LIKE '%từ_khóa%'</b> trên nhiều cột — khác hẳn các câu trùng lặp/ENUM trước đó "
   "vì đây là tìm kiếm theo <b>ngữ nghĩa từ khóa</b>, không phải so khớp giá trị chính xác.<br/>"
   "Bắt được 2 bản ghi: C004 'Khach Hang Ao Bug' (tên tự đặt là dữ liệu giả) và C010 'Khach "
   "Test VIP' (có chữ 'Test' rõ ràng) — cả hai đều là tài khoản dựng cho mục đích minh họa "
   "trong data mẫu của chính cuốn sách này.<br/>"
   "Trên hệ thống thật, danh sách từ khóa cần mở rộng theo quy ước nội bộ: 'qa_', 'sample_', "
   "tên miền nội bộ dùng để test (vd '@company-test.com')...",
 "result_table": (
   ["customer_id","customer_name","email"],
   [
     ["C004","Khach Hang Ao Bug","trung_email@email.com"],
     ["C010","Khach Test VIP","vip@email.com"],
   ]
 ),
 "result_note":
   "2 bản ghi nghi là dữ liệu test/demo. Trước khi xóa: xác nhận với team xem có phải seed "
   "data cố ý giữ lại cho mục đích nào đó không — đừng xóa chỉ vì tên 'nghe giống' test.",
 "note":
   "LIKE theo từ khóa có hai rủi ro cần lường trước:<br/>"
   "(1) <b>Dương tính giả (false positive)</b>: khách hàng thật tên trùng từ khóa (vd công ty "
   "tên 'Testco') sẽ bị bắt nhầm — luôn xác nhận thủ công trước khi xóa hàng loạt.<br/>"
   "(2) <b>Âm tính giả (false negative)</b>: dữ liệu test đặt tên khéo léo không chứa từ khóa "
   "nào sẽ lọt qua — đây là giới hạn cố hữu của tìm kiếm theo từ khóa, không phải lỗi kỹ thuật.<br/>"
   "Phòng ngừa tận gốc: thêm cột <b>is_test_data BOOLEAN</b> để đánh dấu tường minh ngay từ "
   "lúc tạo, thay vì suy luận ngược từ tên gọi.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 3, "id": 37,
 "title": "Dò bản ghi gần-trùng bằng SOUNDEX (lỗi gõ chính tả)",
 "situation":
   "Câu 6 và Câu 35 bắt trùng nhờ chuẩn hóa hoa/thường và khoảng trắng — nhưng cả hai đều cần "
   "chuỗi gốc <b>giống hệt nhau</b> sau khi chuẩn hóa. Lỗi gõ chính tả thật ('Nguyen Van A' "
   "gõ thành 'Nguyen Van Ah' hay đọc sai dấu) tạo ra chuỗi khác hẳn về mặt ký tự dù phát âm "
   "gần như nhau — LOWER/TRIM không bắt được loại trùng này.",
 "before_label": "Bảng Customers — dòng đỏ: hai tên phát âm giống nhau (SOUNDEX trùng):",
 "before_cols": ["customer_id","customer_name","email","status"],
 "before_rows": [
   ["C001","Nguyen Van A",      "a.nguyen@email.com",    "ACTIVE"],
   ["C002","Tran Van B",        "b.tran@email.com",      "ACTIVE"],
   ["C003","Le Thi C",          "c.le@email.com",        "ACTIVE"],
   ["C004","Khach Hang Ao Bug", "trung_email@email.com", "ACTIVE"],
   ["C005","Khach Hang Trung",  "trung_email@email.com", "ACTIVE"],
   ["C006","Pham Van X",        "(NULL)",                "ACTIVE"],
   ["C007","Nguyen Thi Y",      "",                       "ACTIVE"],
   ["C008","  Pham Van D  ",    "d.pham@email.com",      "ACTIVE"],
   ["C009","Nguyen Van A (2)",  "A.NGUYEN@EMAIL.COM",    "ACTIVE"],
   ["C010","Khach Test VIP",    "vip@email.com",         "ACTIVE"],
 ],
 "before_bugs": [0, 8],
 "before_col_widths": [55, 145, 225, 68],
 "sql": (
   "SELECT a.customer_id  AS id_a,\n"
   "       a.customer_name AS ten_a,\n"
   "       b.customer_id  AS id_b,\n"
   "       b.customer_name AS ten_b\n"
   "FROM   Customers a\n"
   "JOIN   Customers b\n"
   "       ON SOUNDEX(a.customer_name) = SOUNDEX(b.customer_name)\n"
   "      AND a.customer_id < b.customer_id;"
 ),
 "clauses": [
   ("SOUNDEX(a.customer_name)\n  = SOUNDEX(b.customer_name)",
    "<b>SOUNDEX</b> chuyển chuỗi thành mã 4 ký tự đại diện cho cách phát âm — hai chuỗi viết "
    "khác nhau nhưng đọc gần giống sẽ cho cùng mã."),
   ("FROM Customers a\n  JOIN Customers b",
    "<b>Self-join</b>: bảng tự ghép với chính nó để so sánh từng cặp bản ghi. "
    "Vì điều kiện JOIN bọc trong hàm SOUNDEX(), MySQL không dùng được index — "
    "đây là phép so khớp toàn bảng × toàn bảng, xem cảnh báo hiệu năng ở phần Ghi chú."),
   ("AND a.customer_id\n  < b.customer_id",
    "Điều kiện chống trùng cặp: nếu không có dòng này, mỗi cặp sẽ xuất hiện 2 lần (A-B và "
    "B-A) và mỗi dòng còn tự khớp với chính nó."),
 ],
 "explain":
   "SOUNDEX là kỹ thuật <b>fuzzy matching</b> — khác hẳn so khớp chính xác (Câu 1, 8) hay "
   "chuẩn hóa hoa/thường-khoảng trắng (Câu 6, 35): nó so khớp theo <b>âm đọc</b>, không theo "
   "ký tự.<br/>"
   "C001 'Nguyen Van A' và C009 'Nguyen Van A (2)' cho cùng mã SOUNDEX vì SOUNDEX bỏ qua "
   "khoảng trắng và ký tự không phải chữ cái khi mã hóa — cùng một cặp trùng mà Câu 31 (regex "
   "ký tự lạ) đã phát hiện, nay được xác nhận bằng một kỹ thuật hoàn toàn khác.<br/>"
   "SOUNDEX được thiết kế gốc cho tiếng Anh nên kém chính xác với tên có dấu tiếng Việt — "
   "hữu ích nhất khi dữ liệu đã được chuyển về không dấu hoặc cho các trường mã/tên tiếng Anh.",
 "result_table": (
   ["id_a","ten_a","id_b","ten_b"],
   [["C001","Nguyen Van A","C009","Nguyen Van A (2)"]],
 ),
 "result_note":
   "1 cặp phát âm giống nhau. Đây là cùng cặp Câu 31 đã phát hiện qua dấu hiệu khác (ký tự "
   "số/ngoặc trong tên) — SOUNDEX hữu ích nhất khi lỗi gõ không để lại dấu hiệu ký tự rõ ràng "
   "như vậy, ví dụ 'Nguyen Van A' bị gõ nhầm thành 'Nguyenn Van A'.",
 "note":
   "SOUNDEX chỉ là một trong các thuật toán fuzzy matching — hạn chế cần biết trước khi dùng:<br/>"
   "(1) Độ nhạy thấp với tiếng Việt có dấu — cân nhắc bỏ dấu (UNACCENT/REPLACE thủ công) "
   "trước khi SOUNDEX để tăng độ chính xác.<br/>"
   "(2) Dễ cho <b>dương tính giả</b> với tên ngắn — luôn xác nhận thủ công, không tự động xóa.<br/>"
   "(3) Hệ quản trị khác có hàm tương đương: PostgreSQL có <b>SOUNDEX</b> qua extension "
   "fuzzystrmatch (kèm LEVENSHTEIN đo khoảng cách chỉnh sửa), SQL Server có <b>DIFFERENCE()</b>.<br/>"
   "(4) <b>⚠️ CẢNH BÁO HIỆU NĂNG — không chạy nguyên văn câu này trên bảng lớn:</b> đây là "
   "self-join với điều kiện bọc hàm, không index nào hỗ trợ được — EXPLAIN cho thấy MySQL "
   "phải quét toàn bảng cho từng dòng (chi phí xấp xỉ N²). Với 10 dòng demo là tức thì; với "
   "bảng khách hàng thật hàng trăm nghìn dòng, câu này có thể chạy hàng giờ hoặc làm nghẽn "
   "DB đang phục vụ giao dịch. Chạy an toàn theo một trong các cách:<br/>"
   "— Lọc trước bằng <b>WHERE</b> để thu hẹp tập so sánh (vd theo khu vực, theo ngày tạo "
   "gần đây) thay vì so toàn bảng với toàn bảng.<br/>"
   "— Nếu cần chạy định kỳ, thêm cột tính sẵn <b>soundex_name</b> (cập nhật lúc ghi dữ liệu) "
   "và đánh index trên cột đó — khi ấy JOIN so sánh giá trị thường, không còn bọc hàm.<br/>"
   "— Luôn chạy trên <b>replica/read-only</b> (xem chương \"Chạy SQL an toàn trên "
   "production\"), không chạy trực tiếp trên DB giao dịch chính.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 3, "id": 38,
 "title": "Phát hiện đơn có tổng tiền nhưng không có sản phẩm nào",
 "situation":
   "Câu 15 đã tìm đơn rỗng (không có items). Câu này thêm điều kiện: "
   "đơn có <b>total_amount > 0</b> nhưng lại không có item nào — "
   "nghĩa là hệ thống đã thu tiền (hoặc ghi nhận số tiền) cho một đơn "
   "không có sản phẩm cụ thể. Đây là mâu thuẫn dữ liệu nghiêm trọng.",
 "before_label": "Bảng Orders — dòng đỏ: ORD_004 ghi 5M nhưng Order_Items không có dòng nào:",
 "before_cols": ["order_id","customer_id","total_amount","status","order_date"],
 "before_rows": [
   ["ORD_001","C001","32.000.000","COMPLETED","2026-06-20"],
   ["ORD_002","C002","20.000.000","COMPLETED","2026-06-22"],
   ["ORD_003","C003","8.000.000","CANCELLED","2026-06-23"],
   ["ORD_004","C999","5.000.000","PENDING",  "2026-06-24"],
   ["ORD_005","C001","15.000.000","CANCELLED","2026-06-25"],
 ],
 "before_bugs": [3],
 "before_col_widths": [65, 80, 105, 95, 148],
 "sql": (
   "SELECT o.order_id,\n"
   "       o.customer_id,\n"
   "       o.total_amount,\n"
   "       o.status\n"
   "FROM   Orders o\n"
   "LEFT JOIN Order_Items oi\n"
   "       ON o.order_id = oi.order_id\n"
   "WHERE  o.total_amount > 0\n"
   "  AND  oi.order_id IS NULL;"
 ),
 "clauses": [
   ("FROM Orders o\n  LEFT JOIN Order_Items oi\n    ON o.order_id = oi.order_id",
    "<b>LEFT JOIN</b> giữ tất cả đơn hàng. "
    "Đơn không có item sẽ có oi.order_id = NULL sau LEFT JOIN."),
   ("WHERE o.total_amount > 0\n  AND  oi.order_id IS NULL",
    "Kết hợp hai điều kiện: <b>total_amount > 0</b> (có ghi nhận tiền) "
    "VÀ <b>oi.order_id IS NULL</b> (không có items). "
    "Mâu thuẫn này là bug nghiêm trọng."),
   ("SELECT o.order_id, o.customer_id,\n  o.total_amount, o.status",
    "Chiếu đủ thông tin để QA điều tra: bao nhiêu tiền, trạng thái gì."),
 ],
 "explain":
   "Câu 15 bắt <b>mọi đơn rỗng</b> (kể cả total_amount = 0). "
   "Câu 38 chỉ bắt đơn rỗng <b>nhưng có tiền</b> — trường hợp nghiêm trọng hơn.<br/>"
   "ORD_004 bị phát hiện: total_amount = 5M nhưng không có item nào trong Order_Items.<br/>"
   "ORD_004 còn có thêm bug customer_id = C999 không tồn tại (Câu 5) — "
   "một đơn tích lũy nhiều lỗi chồng nhau.",
 "result_table": (
   ["order_id","customer_id","total_amount","status"],
   [["ORD_004","C999","5.000.000","PENDING"]],
 ),
 "result_note":
   "ORD_004: 5M nhưng không có sản phẩm nào. Thêm vào đó: C999 không tồn tại. "
   "Đây là đơn hàng 'ma' — cần điều tra log xem được tạo như thế nào.",
 "note":
   "ORD_004 là ví dụ điển hình của <b>bug chồng bug</b>:<br/>"
   "(1) Câu 5: customer_id = C999 không có trong Customers.<br/>"
   "(2) Câu 15: không có item nào trong Order_Items.<br/>"
   "(3) Câu 38: có total_amount = 5M nhưng không có gì để tính.<br/>"
   "Khi tìm thấy loại đơn này, ưu tiên kiểm tra access log và payment log "
   "để xác định có transaction thật không.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 3, "id": 39,
 "title": "Phát hiện tổng items vượt quá 1.5 lần total_amount",
 "situation":
   "Câu 11 bắt mọi đơn có tổng items khác total_amount dù chỉ 1 đồng. "
   "Câu này dùng ngưỡng 1.5× để bắt những trường hợp <b>lệch bất thường lớn</b>: "
   "tổng items cao hơn total_amount gấp rưỡi là dấu hiệu dữ liệu sai "
   "ở mức độ không thể do làm tròn hay phí vận chuyển.",
 "before_label": "Bảng Orders — dòng đỏ: total_amount bất thường so với tổng items:",
 "before_cols": ["order_id","customer_id","total_amount","status","order_date"],
 "before_rows": [
   ["ORD_001","C001","32.000.000","COMPLETED","2026-06-20"],
   ["ORD_002","C002","20.000.000","COMPLETED","2026-06-22"],
   ["ORD_003","C003","8.000.000","CANCELLED","2026-06-23"],
   ["ORD_004","C999","5.000.000","PENDING",  "2026-06-24"],
   ["ORD_005","C001","15.000.000","CANCELLED","2026-06-25"],
 ],
 "before_bugs": [0, 1],
 "before_col_widths": [65, 80, 105, 95, 148],
 "sql": (
   "SELECT o.order_id,\n"
   "       o.total_amount,\n"
   "       SUM(oi.quantity * oi.price) AS tinh_tu_items\n"
   "FROM   Orders o\n"
   "JOIN   Order_Items oi\n"
   "       ON o.order_id = oi.order_id\n"
   "GROUP  BY o.order_id, o.total_amount\n"
   "HAVING SUM(oi.quantity * oi.price)\n"
   "         > o.total_amount * 1.5;"
 ),
 "clauses": [
   ("FROM Orders o\n  JOIN Order_Items oi\n    ON o.order_id = oi.order_id",
    "<b>INNER JOIN</b> ghép đơn hàng với items. "
    "Đơn không có item (ORD_004) bị loại — "
    "dùng Câu 38 để phát hiện riêng trường hợp đó."),
   ("GROUP BY o.order_id, o.total_amount",
    "Gom tất cả items của cùng một đơn để tính tổng."),
   ("HAVING SUM(oi.quantity * oi.price)\n         > o.total_amount * 1.5",
    "<b>HAVING</b> so sánh sau aggregate: "
    "tổng items > 1.5 lần total_amount là bất thường. "
    "Ngưỡng 1.5× để bỏ qua chênh lệch nhỏ do phí vận chuyển, discount."),
 ],
 "explain":
    "Câu 11 (= ANY difference) vs Câu 39 (&gt; 1.5×): hai mức độ kiểm tra khác nhau.<br/>"
    "ORD_001: tinh_tu_items = 62M, total_amount = 32M &gt; 48M → bị bắt.<br/>"
    "ORD_002: tinh_tu_items = 31M, total_amount = 20M &gt; 30M → bị bắt.<br/>"
    "Cả hai đều bị bắt: ORD_001 do item trùng, ORD_002 do Bug-B (total_amount bị ghi thấp).",
  "result_table": (
    ["order_id","total_amount","tinh_tu_items"],
    [
      ["ORD_001","32.000.000","62.000.000"],
      ["ORD_002","20.000.000","31.000.000"],
    ]
  ),
  "result_note":
    "2 đơn vượt ngưỡng 1.5×. ORD_001: 62M vs 32M (do item trùng). "
    "ORD_002: 31M vs 20M (do Bug-B). Hai nguyên nhân khác nhau, cùng câu phát hiện.",
  "note":
    "Điều chỉnh ngưỡng tùy ngữ cảnh nghiệp vụ:<br/>"
    "(1) <b>&gt; 1.5×</b>: bắt lệch lớn, bỏ qua discount/phí nhỏ (câu này).<br/>"
    "(2) <b>!= (bất kỳ lệch)</b>: bắt tất cả sai lệch dù nhỏ (Câu 11).<br/>"
    "(3) <b>&gt; 2×</b>: chỉ bắt lệch nghiêm trọng nhất.<br/>"
    "Với hệ thống có discount, nên kết hợp thêm điều kiện "
    "loại trừ đơn có coupon trước khi áp ngưỡng.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 4, "id": 40,
 "title": "Truy vết item còn sót của đơn đã xóa mềm",
 "situation":
   "Câu 10 đã phát hiện đơn ORD_005 bị <b>xóa mềm</b> (cột deleted_at có giá trị) "
   "nhưng vẫn nằm trong bảng Orders. Vấn đề chưa dừng ở đó: các dòng chi tiết của "
   "đơn này trong Order_Items (item 8, 9) <b>không hề bị dọn</b>. Khi báo cáo "
   "doanh thu hoặc tồn kho quên lọc đơn đã xóa mềm, những item này vẫn bị cộng vào.",
 "before_label": "Bảng Order_Items — dòng đỏ: item 8, 9 thuộc ORD_005 (đơn đã xóa mềm):",
 "before_cols": ["item_id","order_id","product_id","quantity","price"],
 "before_rows": [
   [1,"ORD_001","PROD_001",1,"30.000.000"],
   [2,"ORD_001","PROD_002",1, "2.000.000"],
   [4,"ORD_002","PROD_001",1,"30.000.000"],
   [5,"ORD_002","PROD_004",1, "1.000.000"],
   [6,"ORD_003","PROD_003",1, "8.000.000"],
   [7,"ORD_001","PROD_001",1,"30.000.000"],
   [8,"ORD_005","PROD_004",1, "1.000.000"],
   [9,"ORD_005","PROD_002",1, "2.000.000"],
 ],
 "before_bugs": [6, 7],
 "before_col_widths": [50, 75, 90, 65, 213],
 "sql": (
   "SELECT oi.item_id,\n"
   "       oi.order_id,\n"
   "       oi.product_id,\n"
   "       oi.quantity,\n"
   "       oi.price\n"
   "FROM   Order_Items oi\n"
   "JOIN   Orders o\n"
   "       ON oi.order_id = o.order_id\n"
   "WHERE  o.deleted_at IS NOT NULL\n"
   "ORDER  BY oi.item_id;"
 ),
 "clauses": [
   ("FROM Order_Items oi\n  JOIN Orders o\n    ON oi.order_id = o.order_id",
    "<b>INNER JOIN</b> ghép mỗi dòng item với đơn cha của nó "
    "để đọc được trạng thái xóa mềm từ bảng Orders."),
   ("WHERE o.deleted_at IS NOT NULL",
    "Chỉ giữ item thuộc đơn đã bị <b>xóa mềm</b> — "
    "deleted_at có giá trị nghĩa là đơn lẽ ra không còn hiệu lực."),
   ("ORDER BY oi.item_id",
    "Sắp xếp theo item_id để dễ đối chiếu với bảng gốc."),
 ],
 "explain":
   "Câu 10 soi <b>bảng cha</b> (Orders) để tìm đơn xóa mềm; câu này đi tiếp xuống "
   "<b>bảng con</b> (Order_Items) để tìm những dòng bị bỏ lại.<br/>"
   "Đây là mẫu kiểm tra <b>tính nhất quán khi xóa mềm</b>: xóa cha thì con phải được "
   "đánh dấu hoặc loại khỏi mọi phép tính.<br/>"
   "item 8 và 9 thuộc ORD_005 — vẫn tồn tại dù đơn đã bị hủy và xóa mềm.",
 "result_table": (
   ["item_id","order_id","product_id","quantity","price"],
   [
     [8,"ORD_005","PROD_004",1,"1.000.000"],
     [9,"ORD_005","PROD_002",1,"2.000.000"],
   ]
 ),
 "result_note":
   "2 item thuộc đơn đã xóa mềm vẫn nằm trong Order_Items. Mọi báo cáo tính từ "
   "Order_Items phải thêm điều kiện loại đơn có deleted_at, nếu không doanh thu và "
   "lượng bán sẽ bị thổi phồng.",
 "note":
   "Cách phòng và soát loại lỗi này:<br/>"
   "(1) <b>Lọc nhất quán</b>: mọi truy vấn báo cáo nên JOIN sang Orders và thêm "
   "<b>WHERE deleted_at IS NULL</b>.<br/>"
   "(2) <b>Dọn theo tầng</b>: khi xóa mềm đơn, cân nhắc đánh dấu cả item con.<br/>"
   "(3) <b>Đối soát định kỳ</b>: chạy câu này theo lịch để phát hiện sớm "
   "item mồ côi sau mỗi đợt xóa.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 4, "id": 41,
 "title": "Đối chiếu trạng thái hủy với cờ xóa mềm",
 "situation":
   "Hệ thống dùng hai dấu vết để đánh dấu một đơn không còn hiệu lực: cột "
   "<b>status = 'CANCELLED'</b> và cột <b>deleted_at</b> (thời điểm xóa mềm). "
   "Theo quy ước, hai cột này phải đi cùng nhau. Khi chúng lệch nhau — hủy nhưng "
   "chưa xóa mềm, hoặc xóa mềm nhưng status chưa đổi — quy trình đã bỏ sót một bước.",
 "before_label": "Bảng Orders — dòng đỏ: ORD_003 hủy nhưng deleted_at vẫn trống:",
 "before_cols": ["order_id","status","deleted_at"],
 "before_rows": [
   ["ORD_001","COMPLETED","(NULL)"],
   ["ORD_002","COMPLETED","(NULL)"],
   ["ORD_003","CANCELLED","(NULL)"],
   ["ORD_004","PENDING",  "(NULL)"],
   ["ORD_005","CANCELLED","2026-06-25 10:30:00"],
 ],
 "before_bugs": [2],
 "before_col_widths": [95, 130, 268],
 "sql": (
   "SELECT order_id,\n"
   "       status,\n"
   "       deleted_at,\n"
   "       CASE\n"
   "         WHEN status = 'CANCELLED'\n"
   "          AND deleted_at IS NULL\n"
   "         THEN 'Hủy nhưng chưa xóa mềm'\n"
   "         WHEN status <> 'CANCELLED'\n"
   "          AND deleted_at IS NOT NULL\n"
   "         THEN 'Xóa mềm nhưng status chưa CANCELLED'\n"
   "       END AS van_de\n"
   "FROM   Orders\n"
   "WHERE  (status = 'CANCELLED' AND deleted_at IS NULL)\n"
   "   OR  (status <> 'CANCELLED' AND deleted_at IS NOT NULL)\n"
   "ORDER  BY order_id;"
 ),
 "clauses": [
   ("CASE WHEN ... THEN ...\n  END AS van_de",
    "<b>CASE</b> gán nhãn mô tả loại lệch cho từng dòng — "
    "giúp QA đọc kết quả là biết ngay vi phạm kiểu nào."),
   ("WHERE (status = 'CANCELLED'\n    AND deleted_at IS NULL)\n  OR (status <> 'CANCELLED'\n    AND deleted_at IS NOT NULL)",
    "Hai vế OR bắt hai chiều lệch: hủy mà chưa xóa mềm, "
    "và xóa mềm mà status chưa chuyển CANCELLED."),
   ("ORDER BY order_id",
    "Sắp xếp theo mã đơn cho dễ tra."),
 ],
 "explain":
   "Khi một sự kiện nghiệp vụ được ghi ở <b>nhiều cột dấu vết</b>, các cột đó phải "
   "luôn đồng bộ. Câu này kiểm tra sự đồng bộ giữa status và deleted_at.<br/>"
   "ORD_003 đã CANCELLED nhưng deleted_at vẫn trống — bước xóa mềm bị bỏ quên.<br/>"
   "ORD_005 thì chuẩn: vừa CANCELLED vừa có deleted_at, nên không bị bắt.",
 "result_table": (
   ["order_id","status","deleted_at","van_de"],
   [["ORD_003","CANCELLED","(NULL)","Hủy nhưng chưa xóa mềm"]],
 ),
 "result_note":
   "ORD_003 hủy nhưng chưa được xóa mềm — nếu báo cáo lọc theo deleted_at, đơn này "
   "vẫn lọt vào như đơn còn hiệu lực. Cần đồng bộ lại hai cột.",
 "note":
   "Mở rộng kiểm tra đồng bộ trạng thái:<br/>"
   "(1) Thêm cặp cột khác: <b>paid_at</b> với status = 'PAID', "
   "<b>shipped_at</b> với status = 'SHIPPED'.<br/>"
   "(2) Đưa câu này vào bộ kiểm tra định kỳ sau mỗi lần đổi luồng trạng thái.<br/>"
   "(3) Gốc rễ thường nằm ở code: nên cập nhật status và deleted_at "
   "trong cùng một transaction.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 4, "id": 42,
 "title": "Phát hiện đơn treo (PENDING) tồn đọng quá lâu",
 "situation":
   "Một đơn ở trạng thái <b>PENDING</b> vài giờ là bình thường. Nhưng nếu nó treo "
   "nhiều ngày, rất có thể luồng thanh toán bị kẹt, job xử lý đã chết, hoặc đơn bị "
   "bỏ quên. Câu này đo số ngày tồn đọng tính đến một <b>mốc chốt sổ cố định</b> "
   "(2026-06-30) để kết quả ổn định, không đổi theo ngày chạy.",
 "before_label": "Bảng Orders — dòng đỏ: ORD_004 vẫn PENDING từ 2026-06-24:",
 "before_cols": ["order_id","customer_id","status","order_date"],
 "before_rows": [
   ["ORD_001","C001","COMPLETED","2026-06-20"],
   ["ORD_002","C002","COMPLETED","2026-06-22"],
   ["ORD_003","C003","CANCELLED","2026-06-23"],
   ["ORD_004","C999","PENDING",  "2026-06-24"],
   ["ORD_005","C001","CANCELLED","2026-06-25"],
 ],
 "before_bugs": [3],
 "before_col_widths": [90, 100, 120, 183],
 "sql": (
   "SELECT order_id,\n"
   "       customer_id,\n"
   "       status,\n"
   "       order_date,\n"
   "       DATEDIFF('2026-06-30', order_date)\n"
   "         AS so_ngay_ton_dong\n"
   "FROM   Orders\n"
   "WHERE  status = 'PENDING'\n"
   "  AND  DATEDIFF('2026-06-30', order_date) > 3\n"
   "ORDER  BY so_ngay_ton_dong DESC;"
 ),
 "clauses": [
   ("DATEDIFF('2026-06-30', order_date)\n  AS so_ngay_ton_dong",
    "<b>DATEDIFF</b> tính số ngày giữa mốc chốt sổ và ngày đặt đơn — "
    "chính là tuổi của đơn. Dùng ngày cố định để kết quả không trôi theo thời gian."),
   ("WHERE status = 'PENDING'\n  AND DATEDIFF('2026-06-30',\n        order_date) > 3",
    "Lọc đơn còn <b>PENDING</b> và đã treo quá <b>3 ngày</b>. "
    "Ngưỡng 3 ngày tùy SLA của hệ thống. Lưu ý: DATEDIFF() bọc quanh order_date khiến "
    "điều kiện này <b>non-sargable</b> — xem cách viết thay thế tận dụng được index ở "
    "phần Ghi chú."),
   ("ORDER BY so_ngay_ton_dong DESC",
    "Đơn treo lâu nhất lên đầu — ưu tiên xử lý trước."),
 ],
 "explain":
   "Câu 34 bắt ngày <b>vô lý</b> (tương lai hoặc quá xa quá khứ); câu này bắt đơn "
   "<b>tồn đọng</b> — ngày hợp lệ nhưng trạng thái mắc kẹt quá lâu.<br/>"
   "ORD_004 đặt 2026-06-24, tính đến mốc 2026-06-30 là 6 ngày vẫn PENDING.<br/>"
   "Trên production thường thay 2026-06-30 bằng <b>CURDATE()</b> để đo theo thời gian thực.",
 "result_table": (
   ["order_id","customer_id","status","order_date","so_ngay_ton_dong"],
   [["ORD_004","C999","PENDING","2026-06-24",6]],
 ),
 "result_note":
   "ORD_004 treo 6 ngày chưa xử lý — lại đúng đơn có customer_id C999 không tồn tại "
   "(Câu 5). Đơn treo lâu là nơi nên soi kỹ vì thường đi kèm lỗi khác.",
 "note":
   "Tinh chỉnh câu này theo nghiệp vụ:<br/>"
   "(1) Đổi mốc cố định thành <b>CURDATE()</b> khi chạy giám sát thực tế.<br/>"
   "(2) Điều chỉnh ngưỡng ngày theo SLA: thanh toán có thể là vài giờ, "
   "giao hàng có thể là vài ngày.<br/>"
   "(3) Áp dụng cho các trạng thái 'mắc kẹt' khác: PROCESSING, AWAITING_PAYMENT.<br/>"
   "(4) <b>Hiệu năng trên bảng lớn</b>: khác với Câu 34 (so sánh trực tiếp order_date, tận "
   "dụng được index nếu có), <b>DATEDIFF(...) &gt; 3</b> bọc hàm quanh cột nên non-sargable "
   "— dù order_date có được đánh index, MySQL vẫn phải tính DATEDIFF cho từng dòng thay vì "
   "dùng index range scan. Trên bảng lớn, viết lại dạng sargable cho cùng kết quả:<br/>"
   "<b>WHERE status = 'PENDING'</b><br/>"
   "<b>  AND order_date &lt; DATE_SUB('2026-06-30', INTERVAL 3 DAY);</b>",
},
# ─────────────────────────────────────────────────────────
{
 "part": 4, "id": 43,
 "title": "Dựng dòng thời gian đơn hàng — khoảng cách giữa các đơn",
 "situation":
   "Một chuỗi đơn hàng đều đặn là dấu hiệu hệ thống chạy bình thường. Khi xuất hiện "
   "<b>khoảng lặng dài</b> (nhiều ngày không có đơn) hoặc <b>cụm dày đặc</b> (nhiều đơn "
   "trong tích tắc), đó là dấu vết đáng soi: job tạo đơn chết, hoặc bot đặt hàng hàng "
   "loạt. Câu này đo số ngày giữa mỗi đơn và đơn liền trước nó.",
 "before_label": "Bảng Orders — dòng thời gian 5 đơn theo order_date:",
 "before_cols": ["order_id","order_date"],
 "before_rows": [
   ["ORD_001","2026-06-20"],
   ["ORD_002","2026-06-22"],
   ["ORD_003","2026-06-23"],
   ["ORD_004","2026-06-24"],
   ["ORD_005","2026-06-25"],
 ],
 "before_bugs": [],
 "before_col_widths": [140, 353],
 "sql": (
   "SELECT o.order_id,\n"
   "       o.order_date,\n"
   "       DATEDIFF(\n"
   "         o.order_date,\n"
   "         (SELECT MAX(o2.order_date)\n"
   "          FROM   Orders o2\n"
   "          WHERE  o2.order_date < o.order_date)\n"
   "       ) AS ngay_ke_tu_don_truoc\n"
   "FROM   Orders o\n"
   "ORDER  BY o.order_date;"
 ),
 "clauses": [
   ("(SELECT MAX(o2.order_date)\n   FROM Orders o2\n   WHERE o2.order_date\n         < o.order_date)",
    "<b>Subquery tương quan</b>: với mỗi đơn, tìm ngày đặt lớn nhất "
    "trong số các đơn <b>trước nó</b> — chính là đơn liền trước. Đây là correlated "
    "subquery (EXPLAIN gắn nhãn <b>dependent</b>) — MySQL chạy lại subquery này cho "
    "TỪNG dòng outer, không phải 1 lần — xem cảnh báo hiệu năng ở phần Ghi chú."),
   ("DATEDIFF(o.order_date, ...)\n  AS ngay_ke_tu_don_truoc",
    "Lấy hiệu số ngày giữa đơn hiện tại và đơn liền trước. "
    "Đơn đầu tiên không có đơn nào trước nên trả về NULL."),
   ("ORDER BY o.order_date",
    "Sắp theo thời gian để đọc như một dòng sự kiện."),
 ],
 "explain":
   "Đây là cách dựng dòng thời gian <b>không dùng window function</b> — phù hợp cả MySQL "
   "phiên bản cũ. Subquery tương quan đóng vai trò như LAG() nhưng viết bằng subquery.<br/>"
   "Câu 49 ở PHẦN 6 sẽ làm việc tương tự gọn hơn bằng window function.<br/>"
   "Khoảng cách đều 1–2 ngày ở data mẫu là bình thường; trên thực tế, một con số đột biến "
   "mới là dấu hiệu cần điều tra.",
 "result_table": (
   ["order_id","order_date","ngay_ke_tu_don_truoc"],
   [
     ["ORD_001","2026-06-20","(NULL)"],
     ["ORD_002","2026-06-22",2],
     ["ORD_003","2026-06-23",1],
     ["ORD_004","2026-06-24",1],
     ["ORD_005","2026-06-25",1],
   ]
 ),
 "result_note":
   "Dòng thời gian liền mạch: cách nhau 1–2 ngày. Đơn đầu tiên ORD_001 có khoảng cách "
   "NULL vì không có đơn nào trước. Nếu thấy khoảng cách bất thường (vd 30 ngày, hay nhiều "
   "đơn cách 0 ngày), đó mới là điểm cần soi.",
 "note":
   "Ứng dụng dòng thời gian trong kiểm thử:<br/>"
   "(1) <b>Khoảng lặng dài</b>: hệ thống ngừng nhận đơn — job hoặc API có thể đã chết.<br/>"
   "(2) <b>Cụm 0 ngày dày đặc</b>: nhiều đơn cùng lúc — nghi vấn bot hoặc double-submit.<br/>"
   "(3) Thêm điều kiện trên khoảng cách để chỉ liệt kê các điểm vượt ngưỡng.<br/>"
   "(4) <b>⚠️ CẢNH BÁO HIỆU NĂNG</b>: subquery tương quan ở đây chạy lại có table scan cho "
   "mỗi dòng outer — chi phí xấp xỉ N² giống hệt mức rủi ro ở Câu 37 (SOUNDEX self-join). "
   "Với vài nghìn đơn vẫn ổn; với bảng Orders production hàng triệu dòng, cách viết này có "
   "thể chạy rất lâu hoặc nghẽn DB. Khi cần chạy thật trên dữ liệu lớn, dùng "
   "<b>LAG(order_date) OVER (ORDER BY order_date)</b> (window function, MySQL 8.0+, xem "
   "Câu 49) — cùng kết quả nhưng chỉ quét bảng một lần. Cách viết subquery ở Câu 43 này chỉ "
   "nên dùng để minh hoạ logic hoặc khi chạy trên MySQL cũ chưa có window function.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 4, "id": 44,
 "title": "Phát hiện item_id bị nhảy — dấu vết của bản ghi bị xóa",
 "situation":
   "item_id là khóa chính tự tăng (AUTO_INCREMENT). Nếu dãy số bị nhảy — "
   "ví dụ tồn tại 1, 2, 4 nhưng không có 3 — có nghĩa là một bản ghi "
   "đã từng tồn tại và bị xóa. Đây là kỹ thuật audit đơn giản "
   "để phát hiện dữ liệu bị xóa không có log.",
 "before_label": "Bảng Order_Items — item_id=3 bị thiếu trong dãy 1→9:",
 "before_cols": ["item_id","order_id","product_id","quantity","price"],
 "before_rows": [
   [1,"ORD_001","PROD_001",1,"30.000.000"],
   [2,"ORD_001","PROD_002",1, "2.000.000"],
   [4,"ORD_002","PROD_001",1,"30.000.000"],
   [5,"ORD_002","PROD_004",1, "1.000.000"],
   [6,"ORD_003","PROD_003",1, "8.000.000"],
   [7,"ORD_001","PROD_001",1,"30.000.000"],
   [8,"ORD_005","PROD_004",1,"1.000.000"],
   [9,"ORD_005","PROD_002",1,"2.000.000"],
 ],
 "before_bugs": [2],
 "before_col_widths": [50, 75, 90, 65, 213],
 "sql": (
   "SELECT a.item_id + 1      AS id_bi_mat\n"
   "FROM   Order_Items a\n"
   "LEFT JOIN Order_Items b\n"
   "       ON b.item_id = a.item_id + 1\n"
   "WHERE  b.item_id IS NULL\n"
   "  AND  a.item_id <\n"
   "       (SELECT MAX(item_id)\n"
   "        FROM Order_Items);"
 ),
 "clauses": [
   ("FROM Order_Items a\n  LEFT JOIN Order_Items b\n    ON b.item_id = a.item_id + 1",
    "<b>Self-join</b>: bảng tự join với chính nó. "
    "Alias <b>a</b> là bản ghi gốc, <b>b</b> là bản ghi tiếp theo liền kề. "
    "Nếu b.item_id = NULL → không có bản ghi nào có id = a.item_id + 1."),
   ("WHERE b.item_id IS NULL\n  AND a.item_id <\n    (SELECT MAX(item_id)\n     FROM Order_Items)",
    "Hai điều kiện kết hợp: tiếp theo bị thiếu (IS NULL) "
    "VÀ chưa phải bản ghi cuối (< MAX). "
    "Bỏ điều kiện MAX sẽ trả thêm id = MAX+1, không phải gap."),
   ("SELECT a.item_id + 1 AS id_bi_mat",
    "Kết quả là id <b>bị thiếu</b> — tức là a.item_id + 1."),
 ],
 "explain":
   "<b>Self-join</b> là kỹ thuật dùng một bảng join với chính nó để phát hiện mối quan hệ "
   "giữa các dòng trong cùng bảng.<br/>"
   "Logic: với mỗi item_id=n, kiểm tra xem n+1 có tồn tại không. "
   "Nếu không → n+1 là gap.<br/>"
   "item_id=2 tồn tại nhưng item_id=3 không → trả về id_bi_mat=3.<br/>"
   "item_id=9 là MAX nên không kiểm tra tiếp — 10 không phải gap, chỉ là chưa có.",
 "result_table": (
   ["id_bi_mat"],
   [[3]],
 ),
 "result_note":
   "item_id=3 bị thiếu trong dãy 1→7. Một item đã từng tồn tại và bị xóa, "
   "hoặc INSERT thất bại và AUTO_INCREMENT vẫn tiếp tục tăng.",
 "note":
   "Gap trong AUTO_INCREMENT không phải lúc nào cũng là bug:<br/>"
   "(1) <b>INSERT thất bại</b>: transaction rollback, nhưng AUTO_INCREMENT "
   "không rollback lại — tạo gap bình thường.<br/>"
   "(2) <b>Xóa dữ liệu</b>: hard DELETE không để lại dấu vết gì khác.<br/>"
   "(3) <b>Bulk insert lỗi giữa chừng</b>: một số ID đã được cấp nhưng "
   "bản ghi tương ứng không được lưu.<br/>"
   "Để biết nguyên nhân chính xác, cần có bảng audit log riêng.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 4, "id": 45,
 "title": "Phân tích đơn hàng bị hủy — khách nào hay hủy nhất",
 "situation":
   "Đơn bị hủy không chỉ là vấn đề kinh doanh — còn là tín hiệu kỹ thuật. "
   "Nếu một khách hàng cụ thể có tỷ lệ hủy cao bất thường, "
   "có thể luồng thanh toán gặp lỗi chỉ với profile đó, "
   "hoặc dữ liệu test chưa được dọn sạch sau sprint.",
 "before_label": "Bảng Orders — dòng đỏ: ORD_003 có status = CANCELLED:",
 "before_cols": ["order_id","customer_id","total_amount","status","order_date"],
 "before_rows": [
   ["ORD_001","C001","32.000.000","COMPLETED","2026-06-20"],
   ["ORD_002","C002","20.000.000","COMPLETED","2026-06-22"],
   ["ORD_003","C003","8.000.000","CANCELLED","2026-06-23"],
   ["ORD_004","C999","5.000.000","PENDING",  "2026-06-24"],
   ["ORD_005","C001","15.000.000","CANCELLED","2026-06-25"],
 ],
 "before_bugs": [2],
 "before_col_widths": [65, 80, 105, 95, 148],
 "sql": (
   "SELECT c.customer_id,\n"
   "       c.customer_name,\n"
   "       COUNT(o.order_id) AS so_don_huy\n"
   "FROM   Orders o\n"
   "JOIN   Customers c\n"
   "       ON o.customer_id = c.customer_id\n"
   "WHERE  o.status = 'CANCELLED'\n"
   "GROUP  BY c.customer_id, c.customer_name\n"
   "ORDER  BY so_don_huy DESC;"
 ),
 "clauses": [
   ("FROM Orders o\n  JOIN Customers c\n    ON o.customer_id = c.customer_id",
    "<b>INNER JOIN</b>: chỉ ghép đơn có customer_id hợp lệ. "
    "ORD_004 (C999) bị loại khỏi kết quả vì C999 không có trong Customers."),
   ("WHERE o.status = 'CANCELLED'",
    "Lọc chỉ giữ đơn bị hủy trước khi group."),
   ("GROUP BY c.customer_id, c.customer_name\n  ORDER BY so_don_huy DESC",
    "Gom theo khách hàng và sắp xếp giảm dần — "
    "khách hủy nhiều nhất lên đầu."),
 ],
 "explain":
   "Kỹ thuật <b>WHERE → GROUP BY → ORDER BY</b> là chuỗi chuẩn để phân tích theo nhóm:<br/>"
   "(1) WHERE lọc loại đơn cần phân tích trước.<br/>"
   "(2) GROUP BY gom về từng khách hàng.<br/>"
   "(3) ORDER BY DESC đặt trường hợp đáng ngờ nhất lên đầu.<br/>"
   "Data mẫu nhỏ nên chỉ có C001 và C003 có đơn bị hủy — trên production, "
   "câu này hiệu quả nhất khi chạy kèm HAVING COUNT(*) > N để lọc noise.",
 "result_table": (
   ["customer_id","customer_name","so_don_huy"],
    [
      ["C003","Le Thi C",1],
      ["C001","Nguyen Van A",1],
    ],
 ),
 "result_note":
   "C001 và C003 mỗi khách hủy 1 đơn (C001 hủy ORD_005, C003 hủy ORD_003). "
    "Câu này giúp theo dõi và cảnh báo sớm nếu tỷ lệ hủy của khách tăng đột biến.",
 "note":
   "Mở rộng câu này để phân tích sâu hơn:<br/>"
   "(1) Thêm <b>HAVING COUNT(*) > 2</b>: chỉ hiện khách hủy nhiều bất thường.<br/>"
   "(2) Thêm <b>tỷ lệ</b>: số đơn hủy / tổng số đơn của khách — "
   "khách có 1 đơn và hủy 1 đơn = 100% hủy, đáng ngờ hơn "
   "khách có 10 đơn hủy 1.<br/>"
   "(3) Kết hợp <b>order_date</b>: xem các đơn hủy có tập trung trong "
   "một khoảng thời gian cụ thể không — có thể liên quan đến release lỗi.",
},


# ============================================================
# PHẦN 6 — Truy vấn nâng cao cho QA
# ============================================================
{
 "part": 5, "id": 46,
 "title": "Dùng ROW_NUMBER() phát hiện item trùng trong cùng một đơn",
 "situation":
   "Câu 2 đã phát hiện item trùng bằng GROUP BY + HAVING COUNT(*) > 1 — "
   "cho biết nhóm nào bị trùng nhưng không chỉ ra dòng nào là bản gốc, dòng nào là bản thừa. "
   "Câu này dùng <b>window function ROW_NUMBER()</b> để đánh số thứ tự "
   "từng item trong cùng nhóm (order_id + product_id). "
   "Bất kỳ item nào có số thứ tự > 1 là bản ghi trùng — "
   "và ta có thể thấy chính xác item nào là lần xuất hiện đầu tiên, lần nào là trùng.",
 "before_label": "Bảng Order_Items — dòng đỏ: item 1 và item 7 cùng ORD_001/PROD_001:",
 "before_cols": ["item_id","order_id","product_id","quantity","price"],
 "before_rows": [
   [1,"ORD_001","PROD_001",1,"30.000.000"],
   [2,"ORD_001","PROD_002",1, "2.000.000"],
   [4,"ORD_002","PROD_001",1,"30.000.000"],
   [5,"ORD_002","PROD_004",1, "1.000.000"],
   [6,"ORD_003","PROD_003",1, "8.000.000"],
   [7,"ORD_001","PROD_001",1,"30.000.000"],
   [8,"ORD_005","PROD_004",1, "1.000.000"],
   [9,"ORD_005","PROD_002",1, "2.000.000"],
 ],
 "before_bugs": [0, 5],
 "before_col_widths": [50, 75, 90, 65, 213],
 "sql": (
   "SELECT item_id,\n"
   "       order_id,\n"
   "       product_id,\n"
   "       ROW_NUMBER() OVER (\n"
   "         PARTITION BY order_id, product_id\n"
   "         ORDER BY item_id\n"
   "       ) AS so_lan_trong_don\n"
   "FROM   Order_Items\n"
   "ORDER  BY order_id, product_id, item_id;"
 ),
 "clauses": [
   ("FROM Order_Items",
    "MySQL tải toàn bộ bảng Order_Items."),
   ("ROW_NUMBER() OVER (\n  PARTITION BY order_id, product_id\n  ORDER BY item_id)\n  AS so_lan_trong_don",
    "<b>ROW_NUMBER()</b> là window function — tính toán trên một 'cửa sổ' dữ liệu "
    "mà không gộp các dòng lại. "
    "<b>PARTITION BY</b> chia dữ liệu thành nhóm (như GROUP BY nhưng giữ nguyên từng dòng). "
    "<b>ORDER BY item_id</b> xác định thứ tự đánh số trong mỗi nhóm."),
   ("ORDER BY order_id,\n  product_id, item_id",
    "Sắp xếp kết quả để dễ quan sát — "
    "các item cùng nhóm (order+product) xếp liền nhau."),
 ],
 "explain":
   "<b>Window function</b> khác GROUP BY ở chỗ: GROUP BY gộp nhiều dòng thành 1, "
   "còn window function giữ nguyên tất cả dòng và thêm một cột tính toán.<br/>"
   "PARTITION BY order_id, product_id tạo nhóm cho mỗi cặp (đơn hàng + sản phẩm).<br/>"
   "Trong nhóm ORD_001/PROD_001: item_id=1 được đánh số 1, item_id=7 được đánh số 2.<br/>"
   "Bất kỳ dòng nào có <b>so_lan_trong_don > 1</b> là bản ghi trùng trong cùng đơn.",
 "result_table": (
   ["item_id","order_id","product_id","so_lan_trong_don"],
   [
     [1, "ORD_001","PROD_001", 1],
     [7, "ORD_001","PROD_001", 2],
     [2, "ORD_001","PROD_002", 1],
     [4, "ORD_002","PROD_001", 1],
     [5, "ORD_002","PROD_004", 1],
     [6, "ORD_003","PROD_003", 1],
     [9, "ORD_005","PROD_002", 1],
     [8, "ORD_005","PROD_004", 1],
   ]
 ),
 "result_note":
   "Item_id=7 có so_lan_trong_don=2 — đây là bản ghi trùng của item_id=1 "
   "trong cùng ORD_001/PROD_001. Lọc WHERE so_lan_trong_don > 1 để chỉ xem bản trùng.",
 "note":
   "Ứng dụng thực tế của ROW_NUMBER() trong QA:<br/>"
   "(1) <b>Phát hiện trùng</b>: WHERE so_lan > 1 → xem chính xác dòng nào là trùng.<br/>"
   "(2) <b>Lấy bản ghi mới nhất</b>: PARTITION BY customer_id ORDER BY order_date DESC "
   "→ lấy dòng số 1 của mỗi khách = đơn mới nhất.<br/>"
   "(3) <b>Phân trang logic</b>: đánh số thứ tự trong nhóm để lấy top-N mỗi nhóm.<br/>"
   "ROW_NUMBER yêu cầu MySQL 8.0+. Kiểm tra phiên bản: <b>SELECT VERSION();</b>",
},
# ─────────────────────────────────────────────────────────
{
 "part": 5, "id": 47,
 "title": "Dùng CTE + RANK() xếp hạng sản phẩm bán chạy",
 "situation":
   "Kết hợp hai kỹ thuật nâng cao: <b>CTE</b> (Common Table Expression) "
   "để tính doanh số trung gian, sau đó <b>RANK()</b> để xếp hạng. "
   "Đây là cách viết SQL rõ ràng hơn nhiều so với subquery lồng nhau — "
   "đặc biệt hữu ích khi kiểm thử hệ thống báo cáo.",
 "before_label": "Bảng Products — PROD_001 xếp hạng 1 nhưng doanh số bị thổi phồng do item trùng:",
 "before_cols": ["product_id","product_name","category","price","stock"],
 "before_rows": [
   ["PROD_001","iPhone 15 Pro Max",        "Dien thoai","30.000.000", 50],
   ["PROD_002","Ban phim co Logitech",     "Phu kien",  "2.000.000", 100],
   ["PROD_003","Tai nghe Sony WH-1000XM5", "Phu kien",  "8.000.000",  -5],
   ["PROD_004","Sac du phong Anker",       "Phu kien",  "1.000.000",  20],
   ["PROD_005","Ban phim co Logitech",     "Phu kien",  "2.000.000",  30],
   ["PROD_006","Loa Bluetooth JBL",        "Phu kien",  "(NULL)",     10],
   ["PROD_007","Chuot gaming Razer",       "Phu kien",  "1.500.000","(NULL)"],
 ],
 "before_bugs": [0],
 "before_col_widths": [65, 178, 65, 90, 95],
 "sql": (
   "WITH doanh_so AS (\n"
   "  SELECT p.product_id,\n"
   "         p.product_name,\n"
   "         SUM(oi.quantity * oi.price)\n"
   "           AS tong_doanh_so\n"
   "  FROM   Products p\n"
   "  JOIN   Order_Items oi\n"
   "         ON p.product_id = oi.product_id\n"
   "  GROUP  BY p.product_id, p.product_name\n"
   ")\n"
   "SELECT product_id,\n"
   "       product_name,\n"
   "       tong_doanh_so,\n"
   "       RANK() OVER\n"
   "         (ORDER BY tong_doanh_so DESC)\n"
   "         AS hang\n"
   "FROM   doanh_so;"
 ),
 "clauses": [
   ("WITH doanh_so AS (\n  SELECT ..., SUM(...)\n  FROM Products JOIN Order_Items\n  GROUP BY ...)",
    "<b>CTE (WITH ... AS)</b>: đặt tên cho một kết quả trung gian. "
    "Câu SELECT bên trong tính tổng doanh số — giống Câu 22 nhưng "
    "được đặt tên 'doanh_so' để tái sử dụng bên dưới."),
   ("RANK() OVER\n  (ORDER BY tong_doanh_so DESC)\n  AS hang",
    "<b>RANK()</b>: gán số thứ hạng theo thứ tự. "
    "Khác ROW_NUMBER: nếu hai sản phẩm bằng doanh số, cả hai cùng nhận hạng 1 "
    "và hạng 2 bị bỏ qua (1, 1, 3...)."),
   ("FROM doanh_so",
    "Tham chiếu tới CTE như một bảng thông thường — "
    "đây là điểm mạnh của CTE: viết một lần, dùng nhiều chỗ."),
 ],
 "explain":
   "<b>CTE</b> giúp viết SQL theo kiểu 'từng bước' thay vì lồng subquery:<br/>"
   "Bước 1 (WITH): tính tổng doanh số từng sản phẩm → lưu vào 'doanh_so'.<br/>"
   "Bước 2 (SELECT chính): lấy từ 'doanh_so', thêm cột RANK().<br/>"
   "PROD_001 xếp hạng 1 với 90M nhưng con số này bị thổi phồng "
   "do item trùng (Câu 2/46) — doanh số thực chỉ khoảng 60M.",
 "result_table": (
   ["product_id","product_name","tong_doanh_so","hang"],
   [
     ["PROD_001","iPhone 15 Pro Max",        "90.000.000", 1],
     ["PROD_003","Tai nghe Sony WH-1000XM5", "8.000.000",  2],
     ["PROD_002","Ban phim co Logitech",     "4.000.000",  3],
     ["PROD_004","Sac du phong Anker",       "2.000.000",  4],
   ]
 ),
 "result_note":
   "4 sản phẩm có doanh số (PROD_005, 006, 007 chưa bán). "
   "PROD_001 dẫn đầu với 90M nhưng bị phóng đại do item_id=7 trùng lặp.",
 "note":
   "Ba loại xếp hạng window function — chọn đúng theo nghiệp vụ:<br/>"
   "(1) <b>ROW_NUMBER()</b>: luôn số liên tiếp, không cùng hạng — 1, 2, 3, 4.<br/>"
   "(2) <b>RANK()</b>: cùng điểm = cùng hạng, bỏ hạng tiếp theo — 1, 1, 3, 4.<br/>"
   "(3) <b>DENSE_RANK()</b>: cùng điểm = cùng hạng, không bỏ hạng — 1, 1, 2, 3.<br/>"
   "Với báo cáo doanh số, RANK() thường phù hợp hơn ROW_NUMBER().",
},
# ─────────────────────────────────────────────────────────
{
 "part": 5, "id": 48,
 "title": "Dùng CTE lồng nhau tìm khách chi tiêu trên mức trung bình",
 "situation":
   "Câu 47 dùng CTE một lớp. Câu này đi thêm một bước: "
   "<b>tái sử dụng CTE trong subquery</b> ngay bên trong câu SELECT chính — "
   "tính tổng chi tiêu từng khách, rồi lọc những người vượt trung bình "
   "của chính tập đó. Không dùng CTE, câu này phải viết subquery lồng 3 cấp.",
 "before_label": "Bảng Customers — C001 là khách duy nhất chi tiêu trên mức trung bình COMPLETED:",
 "before_cols": ["customer_id","customer_name","membership_tier","status"],
 "before_rows": [
   ["C001","Nguyen Van A",      "Silver",   "ACTIVE"],
   ["C002","Tran Van B",        "Standard", "ACTIVE"],
   ["C003","Le Thi C",          "Gold",     "ACTIVE"],
   ["C004","Khach Hang Ao Bug", "Standard", "ACTIVE"],
   ["C005","Khach Hang Trung",  "Standard", "ACTIVE"],
   ["C006","Pham Van X",        "Standard", "ACTIVE"],
   ["C007","Nguyen Thi Y",      "Standard", "ACTIVE"],
   ["C008","  Pham Van D  ",    "Gold",     "ACTIVE"],
   ["C009","Nguyen Van A (2)",  "Silver",   "ACTIVE"],
   ["C010","Khach Test VIP",    "VIP",      "ACTIVE"],
 ],
 "before_bugs": [0],
 "before_col_widths": [55, 145, 115, 178],
 "sql": (
   "WITH tong_chi AS (\n"
   "  SELECT c.customer_id,\n"
   "         c.customer_name,\n"
   "         SUM(o.total_amount) AS tong_da_mua\n"
   "  FROM   Customers c\n"
   "  JOIN   Orders o\n"
   "         ON c.customer_id = o.customer_id\n"
   "  WHERE  o.status = 'COMPLETED'\n"
   "  GROUP  BY c.customer_id, c.customer_name\n"
   ")\n"
   "SELECT customer_id,\n"
   "       customer_name,\n"
   "       tong_da_mua\n"
   "FROM   tong_chi\n"
   "WHERE  tong_da_mua >\n"
   "       (SELECT AVG(tong_da_mua)\n"
   "        FROM   tong_chi)\n"
   "ORDER  BY tong_da_mua DESC;"
 ),
 "clauses": [
   ("WITH tong_chi AS (\n  ... WHERE status = 'COMPLETED'\n  GROUP BY customer_id ...)",
    "CTE tính tổng chi tiêu từng khách, chỉ tính đơn COMPLETED. "
    "Lọc WHERE bên trong CTE — không tính đơn CANCELLED hay PENDING."),
   ("WHERE tong_da_mua >\n  (SELECT AVG(tong_da_mua)\n   FROM tong_chi)",
    "Điểm mạnh của CTE: <b>tái sử dụng 'tong_chi' trong subquery</b> "
    "ngay bên trong mệnh đề WHERE. "
    "Không CTE, ta phải tính lại toàn bộ GROUP BY một lần nữa trong subquery."),
   ("ORDER BY tong_da_mua DESC",
    "Sắp xếp giảm dần — khách chi nhiều nhất lên đầu."),
 ],
 "explain":
   "CTE 'tong_chi' được dùng <b>hai lần</b> trong câu lệnh — đây là lý do chính để dùng CTE:<br/>"
   "(1) FROM tong_chi: lấy danh sách từng khách và tổng chi tiêu.<br/>"
   "(2) SELECT AVG(tong_da_mua) FROM tong_chi: tính trung bình từ cùng tập đó.<br/>"
   "Tổng COMPLETED: C001=32M, C002=20M → trung bình = 26M → chỉ C001 (32M) vượt qua.",
 "result_table": (
   ["customer_id","customer_name","tong_da_mua"],
   [["C001","Nguyen Van A","32.000.000"]],
 ),
 "result_note":
   "Chỉ C001 (32M) vượt mức trung bình 26M. C002 có 20M < 26M nên bị loại. "
   "Đây là khách VIP tiềm năng — dữ liệu test nên cover luồng upgrade membership.",
 "note":
   "CTE vs Subquery — khi nào dùng cái nào:<br/>"
   "(1) <b>Dùng CTE</b> khi cần tái sử dụng kết quả trung gian nhiều lần, "
   "hoặc khi logic chia thành nhiều bước rõ ràng.<br/>"
   "(2) <b>Dùng subquery</b> khi logic đơn giản và chỉ dùng một lần.<br/>"
   "(3) <b>CTE đệ quy</b> (WITH RECURSIVE): dùng cho cấu trúc cây "
   "(category cha/con, cây tổ chức) — MySQL 8.0+ hỗ trợ.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 5, "id": 49,
 "title": "Tính doanh thu tích lũy theo thời gian với SUM() OVER()",
 "situation":
   "Báo cáo tài chính thường yêu cầu 'running total' — tổng cộng dồn theo thời gian. "
   "Không có window function, ta phải dùng self-join hoặc subquery tương quan "
   "rất phức tạp. <b>SUM() OVER()</b> giải quyết trong một câu lệnh đơn giản, "
   "và QA dùng nó để kiểm tra xem hệ thống báo cáo có tính đúng không.",
 "before_label": "Bảng Orders — doanh thu tích lũy tính theo order_date tăng dần:",
 "before_cols": ["order_id","customer_id","total_amount","status","order_date"],
 "before_rows": [
   ["ORD_001","C001","32.000.000","COMPLETED","2026-06-20"],
   ["ORD_002","C002","20.000.000","COMPLETED","2026-06-22"],
   ["ORD_003","C003","8.000.000","CANCELLED","2026-06-23"],
   ["ORD_004","C999","5.000.000","PENDING",  "2026-06-24"],
   ["ORD_005","C001","15.000.000","CANCELLED","2026-06-25"],
 ],
 "before_bugs": [2, 3],
 "before_col_widths": [65, 80, 105, 95, 148],
 "sql": (
   "SELECT order_id,\n"
   "       customer_id,\n"
   "       order_date,\n"
   "       total_amount,\n"
   "       SUM(total_amount) OVER (\n"
   "         ORDER BY order_date\n"
   "         ROWS BETWEEN UNBOUNDED PRECEDING\n"
   "              AND CURRENT ROW\n"
   "       ) AS luy_ke\n"
   "FROM   Orders\n"
   "ORDER  BY order_date;"
 ),
 "clauses": [
   ("FROM Orders",
    "MySQL tải toàn bộ bảng Orders — tất cả 5 đơn, "
    "kể cả CANCELLED và PENDING."),
   ("SUM(total_amount) OVER (\n  ORDER BY order_date\n  ROWS BETWEEN UNBOUNDED\n  PRECEDING AND CURRENT ROW)\n  AS luy_ke",
    "<b>SUM() OVER()</b>: cộng dồn total_amount theo thứ tự order_date. "
    "<b>ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</b>: "
    "cửa sổ tính từ dòng đầu tiên đến dòng hiện tại. "
    "Bản rút gọn SUM(...) OVER (ORDER BY order_date) chỉ cho CÙNG kết quả khi cột "
    "ORDER BY là duy nhất. Nếu có dòng trùng giá trị (vd nhiều đơn cùng order_date), "
    "frame mặc định là RANGE — gộp mọi dòng trùng vào cùng một mốc tích lũy, KHÁC với ROWS "
    "(cộng từng dòng). Viết ROWS tường minh khi cần cộng dồn theo từng dòng."),
   ("ORDER BY order_date",
    "Sắp xếp kết quả cuối cùng theo ngày — "
    "đảm bảo luy_ke tăng dần theo thời gian khi đọc từ trên xuống."),
 ],
 "explain":
   "<b>SUM() OVER()</b> tính tổng tích lũy mà không gộp dòng — giữ nguyên từng đơn hàng.<br/>"
   "ORD_001 (32M) → luy_ke = 32M. "
   "ORD_002 (20M) → luy_ke = 52M. "
   "ORD_003 (8M, CANCELLED) → luy_ke = 60M. "
   "ORD_004 (5M, C999) → luy_ke = 65M.<br/>"
   "Lưu ý: câu này cộng tất cả đơn kể cả CANCELLED và PENDING — "
   "luy_ke thực tế (chỉ COMPLETED) là 52M, không phải 65M.",
 "result_table": (
   ["order_id","customer_id","order_date","total_amount","luy_ke"],
   [
     ["ORD_001","C001","2026-06-20","32.000.000","32.000.000"],
     ["ORD_002","C002","2026-06-22","20.000.000","52.000.000"],
     ["ORD_003","C003","2026-06-23", "8.000.000","60.000.000"],
     ["ORD_004","C999","2026-06-24", "5.000.000","65.000.000"],
     ["ORD_005","C001","2026-06-25","15.000.000","80.000.000"],
   ]
 ),
 "result_note":
   "luy_ke = 80M nhưng đây là tổng thô gồm cả đơn CANCELLED (ORD_003/8M, ORD_005/15M) "
   "và đơn lỗi (ORD_004/5M). Doanh thu thực COMPLETED: 52M.",
 "note":
   "Để tính running total chỉ của đơn COMPLETED:<br/>"
   "<b>SUM(CASE WHEN status = 'COMPLETED'</b><br/>"
   "<b>    THEN total_amount ELSE 0 END)</b><br/>"
   "<b>OVER (ORDER BY order_date) AS luy_ke_thuc</b><br/>"
   "Kỹ thuật CASE WHEN bên trong window function cho phép "
   "tính tích lũy có điều kiện mà không cần WHERE lọc trước "
   "(vì WHERE loại bỏ dòng → mất ORDER BY liên tục theo thời gian).",
},
# ─────────────────────────────────────────────────────────
{
 "part": 5, "id": 50,
 "title": "Báo cáo tổng hợp: nhiều loại lỗi trong một câu UNION ALL",
 "situation":
   "Câu cuối tổng hợp nhiều kiểm tra thành <b>một báo cáo duy nhất</b>: "
   "email trùng (Câu 6), tồn kho âm (Câu 12), khách hàng ma (Câu 5). "
   "QA dùng câu này như một 'health check' nhanh — "
   "chạy một lần, thấy ngay hệ thống đang có bao nhiêu loại lỗi tồn đọng.",
 "before_label": "Bảng Orders (1 trong 3 nguồn lỗi minh hoạ) — câu lệnh quét cả Customers, Products và Orders:",
 "before_cols": ["order_id","customer_id","total_amount","status","order_date"],
 "before_rows": [
   ["ORD_001","C001","32.000.000","COMPLETED","2026-06-20"],
   ["ORD_002","C002","20.000.000","COMPLETED","2026-06-22"],
   ["ORD_003","C003","8.000.000","CANCELLED","2026-06-23"],
   ["ORD_004","C999","5.000.000","PENDING",  "2026-06-24"],
   ["ORD_005","C001","15.000.000","CANCELLED","2026-06-25"],
 ],
 "before_bugs": [3],
 "before_col_widths": [65, 80, 105, 95, 148],
 "sql": (
   "SELECT 'Email trung'  AS loai_loi,\n"
   "       customer_id    AS doi_tuong,\n"
   "       'Customers'    AS bang\n"
   "FROM   Customers\n"
   "WHERE  email IN (\n"
   "  SELECT email FROM Customers\n"
   "  WHERE  email IS NOT NULL\n"
   "    AND  email != ''\n"
   "  GROUP  BY email\n"
   "  HAVING COUNT(*) > 1)\n"
   "UNION ALL\n"
   "SELECT 'Ton kho am', product_id, 'Products'\n"
   "FROM   Products WHERE stock < 0\n"
   "UNION ALL\n"
   "SELECT 'Khach hang ma', order_id, 'Orders'\n"
   "FROM   Orders\n"
   "WHERE  customer_id NOT IN\n"
   "  (SELECT customer_id FROM Customers)\n"
   "ORDER  BY loai_loi;"
 ),
 "clauses": [
   ("SELECT 'Email trung' AS loai_loi,\n  customer_id, 'Customers' AS bang\nFROM Customers WHERE email IN (...)",
    "Khối 1: tìm email trùng bằng subquery "
    "(tương tự Câu 6 nhưng nhúng vào đây). "
    "Cột 'Email trung' là chuỗi cố định — "
    "giúp phân biệt loại lỗi trong kết quả gộp."),
   ("UNION ALL\nSELECT 'Ton kho am', ...\nUNION ALL\nSELECT 'Khach hang ma', ...",
    "<b>UNION ALL</b> ghép ba khối SELECT thành một bảng. "
    "Điều kiện: cùng số cột, kiểu dữ liệu tương thích. "
    "Dùng UNION ALL thay UNION để không mất dòng trùng — "
    "các lỗi ở bảng khác nhau không bao giờ trùng. Khối 'Khach hang ma' dùng "
    "<b>NOT IN</b> — an toàn ở đây vì customer_id là PRIMARY KEY của Customers "
    "(không thể NULL), nhưng xem lại bẫy NOT IN + NULL đã học ở Câu 9 trước khi tái "
    "sử dụng pattern này cho cột khác."),
   ("ORDER BY loai_loi",
    "Sắp xếp theo loại lỗi — nhóm các lỗi cùng loại lại gần nhau "
    "để dễ đọc báo cáo."),
 ],
 "explain":
   "Kết quả có 6 dòng — nhiều hơn dự kiến do một phát hiện bất ngờ:<br/>"
   "<b>Email trùng: C001, C004, C005, C009</b> — không chỉ C004 và C005.<br/>"
   "Nguyên nhân: MySQL 8.0+ mặc định so sánh VARCHAR <b>không phân biệt hoa/thường</b> "
   "(collation utf8mb4_0900_ai_ci). "
   "'a.nguyen@email.com' (C001) và 'A.NGUYEN@EMAIL.COM' (C009) "
   "được coi là cùng email → cả hai bị bắt.<br/>"
   "Đây là bug ẩn mà Câu 6 cũng đã bắt — cần xác nhận lại policy: "
   "hệ thống có phân biệt hoa thường trong email không?",
 "result_table": (
   ["loai_loi","doi_tuong","bang"],
   [
     ["Email trung",   "C001",    "Customers"],
     ["Email trung",   "C004",    "Customers"],
     ["Email trung",   "C005",    "Customers"],
     ["Email trung",   "C009",    "Customers"],
     ["Khach hang ma", "ORD_004", "Orders"],
     ["Ton kho am",    "PROD_003","Products"],
   ]
 ),
 "result_note":
   "6 lỗi từ 3 loại: 4 email trùng (C001+C009 vì MySQL case-insensitive), "
   "1 đơn mồ côi (ORD_004), 1 tồn kho âm (PROD_003). "
   "Chạy câu này mỗi ngày để theo dõi dữ liệu sạch hay không.",
 "note":
   "Mở rộng health check: thêm loại lỗi mới bằng cách thêm UNION ALL:<br/>"
   "<b>UNION ALL</b><br/>"
   "<b>SELECT 'Gia NULL', product_id, 'Products'</b><br/>"
   "<b>FROM Products WHERE price IS NULL</b><br/>"
   "Để báo cáo có thêm cột 'so_luong' đếm bao nhiêu lỗi mỗi loại, "
   "bọc toàn bộ UNION ALL vào một CTE rồi GROUP BY loai_loi bên ngoài.<br/>"
   "Khi thêm khối mới dùng <b>NOT IN (subquery)</b> như khối 'Khach hang ma': nếu cột "
   "trong subquery CÓ thể NULL, đổi sang <b>NOT EXISTS</b> để an toàn tuyệt đối (xem cách "
   "viết tương đương ở Bài tập 5.2) — đừng dựa vào giả định 'cột này chắc không NULL', vì "
   "giả định đó có thể đúng hôm nay nhưng sai sau khi schema đổi.",
},

]  # end ENTRIES


# ===========================================================================
# EXERCISES — bài tập tự luyện cuối mỗi phần (đáp án ở Phụ lục D)
#   part: khớp index PARTS (0..5)
#   Đáp án đã được verify trên DB nhỏ ecommerce_test.
# ===========================================================================
EXERCISES = [
    # ---- PHẦN 1 — Toàn vẹn và trùng lặp ----
    {"part": 0, "code": "1.1",
     "prompt": "Có những hạng thành viên (membership_tier) nào đang được gán cho "
               "từ 2 khách trở lên? Đếm mỗi hạng có bao nhiêu khách.",
     "hint": "GROUP BY membership_tier rồi lọc bằng HAVING COUNT(*) > 1.",
     "sql": "SELECT membership_tier,\n"
            "       COUNT(*) AS so_khach\n"
            "FROM   Customers\n"
            "GROUP  BY membership_tier\n"
            "HAVING COUNT(*) > 1\n"
            "ORDER  BY so_khach DESC;",
     "answer": "Standard (5), Silver (2), Gold (2). VIP chỉ 1 khách nên bị HAVING loại — "
               "nhưng VIP vẫn là giá trị sai (Câu 9). HAVING lọc theo SỐ LƯỢNG, "
               "không phải tính hợp lệ của giá trị."},
    {"part": 0, "code": "1.2",
     "prompt": "Tìm những khách hàng có customer_name chứa khoảng trắng thừa ở đầu hoặc cuối.",
     "hint": "So sánh customer_name với TRIM(customer_name); khác nhau là có khoảng trắng thừa.",
     "sql": "SELECT customer_id,\n"
            "       customer_name,\n"
            "       CHAR_LENGTH(customer_name) AS do_dai\n"
            "FROM   Customers\n"
            "WHERE  customer_name <> TRIM(customer_name);",
     "answer": "C008 ('  Pham Van D  ', dài 14 ký tự — sau TRIM còn 10). Khoảng trắng thừa "
               "không nhìn thấy bằng mắt nhưng phá vỡ so khớp, gây trùng ẩn và lỗi tìm kiếm."},
    {"part": 0, "code": "1.3",
     "prompt": "Sản phẩm nào được mua trong nhiều hơn một đơn hàng khác nhau?",
     "hint": "Đếm số order_id PHÂN BIỆT cho mỗi product_id: COUNT(DISTINCT order_id).",
     "sql": "SELECT product_id,\n"
            "       COUNT(DISTINCT order_id) AS so_don\n"
            "FROM   Order_Items\n"
            "GROUP  BY product_id\n"
            "HAVING COUNT(DISTINCT order_id) > 1;",
     "answer": "PROD_001, PROD_002, PROD_004 — mỗi sản phẩm nằm trong 2 đơn khác nhau "
               "(PROD_001: ORD_001+ORD_002; PROD_002: ORD_001+ORD_005; PROD_004: ORD_002+ORD_005). "
               "Lưu ý COUNT(DISTINCT order_id) khác COUNT(*): PROD_001 có 3 dòng item nhưng item 1 "
               "và 7 cùng thuộc ORD_001 nên chỉ tính 1 đơn cho lần đó."},

    # ---- PHẦN 2 — Ràng buộc nghiệp vụ ----
    {"part": 1, "code": "2.1",
     "prompt": "Liệt kê các sản phẩm có giá cao hơn giá trung bình của toàn bộ sản phẩm.",
     "hint": "Dùng subquery (SELECT AVG(price) FROM Products) ngay trong mệnh đề WHERE.",
     "sql": "SELECT product_id,\n"
            "       product_name,\n"
            "       price\n"
            "FROM   Products\n"
            "WHERE  price > (SELECT AVG(price) FROM Products)\n"
            "ORDER  BY price DESC;",
     "answer": "PROD_001 (30M) và PROD_003 (8M). Trung bình ≈ 7,4M. Lưu ý: AVG tự bỏ qua "
               "PROD_006 (giá NULL) nên ngưỡng chỉ tính trên 6 sản phẩm có giá."},
    {"part": 1, "code": "2.2",
     "prompt": "Trong các đơn COMPLETED, đơn nào có total_amount KHÁC tổng tiền tính từ Order_Items?",
     "hint": "Lọc WHERE status='COMPLETED' trước, JOIN + GROUP BY, rồi HAVING so sánh hai tổng.",
     "sql": "SELECT o.order_id,\n"
            "       o.total_amount,\n"
            "       SUM(oi.quantity * oi.price) AS tong_items\n"
            "FROM   Orders o\n"
            "JOIN   Order_Items oi ON o.order_id = oi.order_id\n"
            "WHERE  o.status = 'COMPLETED'\n"
            "GROUP  BY o.order_id, o.total_amount\n"
            "HAVING SUM(oi.quantity * oi.price) <> o.total_amount;",
     "answer": "ORD_001 (32M vs 62M — item trùng) và ORD_002 (20M vs 31M — Bug-B). ORD_003 "
               "bị loại vì CANCELLED. Đây là Câu 11 thu hẹp vào đơn đã hoàn tất — nơi sai số "
               "gây hậu quả tài chính thật."},
    {"part": 1, "code": "2.3",
     "prompt": "Sản phẩm nào CHƯA từng được bán nhưng vẫn còn tồn kho lớn hơn 0?",
     "hint": "NOT EXISTS để tìm sản phẩm chưa bán, kết hợp điều kiện stock > 0.",
     "sql": "SELECT p.product_id,\n"
            "       p.product_name,\n"
            "       p.stock\n"
            "FROM   Products p\n"
            "WHERE  NOT EXISTS (\n"
            "         SELECT 1 FROM Order_Items oi\n"
            "         WHERE oi.product_id = p.product_id)\n"
            "  AND  p.stock > 0;",
     "answer": "PROD_005 (30) và PROD_006 (10). PROD_007 bị loại vì stock = NULL — so sánh "
               "'NULL > 0' cho UNKNOWN, không phải TRUE. Đây là lý do hàng tồn 'tàng hình' dễ bị bỏ sót."},

    # ---- PHẦN 3 — Đối soát và tính toán ----
    {"part": 2, "code": "3.1",
     "prompt": "Tính tổng doanh thu thực (số lượng × giá) của từng đơn hàng, sắp xếp giảm dần.",
     "hint": "SUM(quantity * price) gom theo GROUP BY order_id.",
     "sql": "SELECT o.order_id,\n"
            "       SUM(oi.quantity * oi.price) AS doanh_thu\n"
            "FROM   Orders o\n"
            "JOIN   Order_Items oi ON o.order_id = oi.order_id\n"
            "GROUP  BY o.order_id\n"
            "ORDER  BY doanh_thu DESC;",
     "answer": "ORD_001 = 62M · ORD_002 = 31M · ORD_003 = 8M. ORD_001 = 62M (bị item trùng "
               "thổi phồng) so với total_amount ghi 32M — luôn đối soát hai con số này (Câu 11)."},
    {"part": 2, "code": "3.2",
     "prompt": "Mỗi danh mục (category) có bao nhiêu sản phẩm, kể cả sản phẩm chưa bán?",
     "hint": "Đếm trực tiếp trên bảng Products (không JOIN Order_Items), GROUP BY category.",
     "sql": "SELECT category,\n"
            "       COUNT(*) AS so_sp\n"
            "FROM   Products\n"
            "GROUP  BY category\n"
            "ORDER  BY so_sp DESC;",
     "answer": "Phu kien (6) · Dien thoai (1). Vì đếm trên Products nên bao gồm cả sản phẩm "
               "chưa bán — khác Câu 27 (chỉ đếm danh mục có phát sinh đơn qua JOIN)."},
    {"part": 2, "code": "3.3",
     "prompt": "Khách hàng nào có tổng chi tiêu cao hơn mức trung bình của các khách đã từng mua?",
     "hint": "Tính tổng mỗi khách, rồi so với AVG của chính các tổng đó (subquery lồng).",
     "sql": "SELECT c.customer_id,\n"
            "       c.customer_name,\n"
            "       SUM(o.total_amount) AS tong\n"
            "FROM   Customers c\n"
            "JOIN   Orders o ON c.customer_id = o.customer_id\n"
            "GROUP  BY c.customer_id, c.customer_name\n"
            "HAVING SUM(o.total_amount) > (\n"
            "         SELECT AVG(t) FROM (\n"
            "           SELECT SUM(o2.total_amount) AS t\n"
            "           FROM   Orders o2\n"
            "           JOIN   Customers c2 ON o2.customer_id = c2.customer_id\n"
            "           GROUP  BY o2.customer_id) x);",
     "answer": "C001 (47M). Trung bình ba khách có đơn = 25M ((47+20+8)/3); chỉ C001 vượt. Mẫu "
               "'so với trung bình của chính tập' là nền của phân tích outlier — Câu 48 dùng CTE "
               "để viết gọn hơn (lưu ý: Câu 48 chỉ tính đơn COMPLETED nên số khác bài này)."},

    # ---- PHẦN 4 — Biên và dữ liệu bất thường ----
    {"part": 3, "code": "4.1",
     "prompt": "Tìm các sản phẩm bị thiếu dữ liệu giá HOẶC tồn kho (giá trị NULL).",
     "hint": "WHERE price IS NULL OR stock IS NULL — KHÔNG dùng '= NULL'.",
     "sql": "SELECT product_id,\n"
            "       product_name,\n"
            "       price,\n"
            "       stock\n"
            "FROM   Products\n"
            "WHERE  price IS NULL\n"
            "    OR stock IS NULL;",
     "answer": "PROD_006 (price NULL) và PROD_007 (stock NULL). Phải dùng IS NULL — viết "
               "'price = NULL' luôn cho kết quả rỗng. Hai sản phẩm này phá vỡ mọi phép tính "
               "liên quan đến giá/kho."},
    {"part": 3, "code": "4.2",
     "prompt": "Tìm khách hàng có tên chứa chữ số.",
     "hint": "REGEXP '[0-9]' bắt mọi ký tự là chữ số trong tên.",
     "sql": "SELECT customer_id,\n"
            "       customer_name\n"
            "FROM   Customers\n"
            "WHERE  customer_name REGEXP '[0-9]';",
     "answer": "C009 ('Nguyen Van A (2)'). Tên người thật hiếm khi có chữ số; '(2)' là dấu hiệu "
               "dữ liệu được thêm để né ràng buộc trùng tên (Câu 31)."},
    {"part": 3, "code": "4.3",
     "prompt": "Tìm các tên sản phẩm bị trùng sau khi chuẩn hóa (bỏ khoảng trắng + đưa về chữ thường).",
     "hint": "GROUP BY LOWER(TRIM(product_name)) rồi HAVING COUNT(*) > 1.",
     "sql": "SELECT LOWER(TRIM(product_name)) AS ten_chuan,\n"
            "       COUNT(*) AS so_lan\n"
            "FROM   Products\n"
            "GROUP  BY LOWER(TRIM(product_name))\n"
            "HAVING COUNT(*) > 1;",
     "answer": "'ban phim co logitech' xuất hiện 2 lần (PROD_002 + PROD_005). Chuẩn hóa trước "
               "khi GROUP giúp bắt trùng mà so khớp thô bỏ sót (Câu 35)."},

    # ---- PHẦN 5 — Audit, log và dấu vết ----
    {"part": 4, "code": "5.1",
     "prompt": "Dùng NOT EXISTS để liệt kê sản phẩm chưa bao giờ xuất hiện trong Order_Items.",
     "hint": "WHERE NOT EXISTS (SELECT 1 FROM Order_Items WHERE product_id khớp).",
     "sql": "SELECT p.product_id,\n"
            "       p.product_name\n"
            "FROM   Products p\n"
            "WHERE  NOT EXISTS (\n"
            "         SELECT 1 FROM Order_Items oi\n"
            "         WHERE oi.product_id = p.product_id);",
     "answer": "PROD_005, PROD_006, PROD_007. Kết quả giống Câu 16 (LEFT JOIN + IS NULL) nhưng "
               "NOT EXISTS an toàn hơn khi khóa có thể NULL (xem bẫy NOT IN ở Câu 9)."},
    {"part": 4, "code": "5.2",
     "prompt": "Dùng NOT EXISTS tìm đơn hàng trỏ tới khách hàng không tồn tại trong Customers.",
     "hint": "Orders mà NOT EXISTS một khách có customer_id tương ứng.",
     "sql": "SELECT o.order_id,\n"
            "       o.customer_id\n"
            "FROM   Orders o\n"
            "WHERE  NOT EXISTS (\n"
            "         SELECT 1 FROM Customers c\n"
            "         WHERE c.customer_id = o.customer_id);",
     "answer": "ORD_004 / C999 (đơn mồ côi). Cùng kết quả Câu 5 (LEFT JOIN + IS NULL) nhưng "
               "viết bằng NOT EXISTS — QA cần đọc được cả hai cách trong dự án thật."},

    # ---- PHẦN 6 — Truy vấn nâng cao cho QA ----
    {"part": 5, "code": "6.1",
     "prompt": "Dùng RANK() xếp hạng sản phẩm theo tổng doanh số bán ra (tính từ Order_Items).",
     "hint": "RANK() OVER (ORDER BY SUM(quantity*price) DESC) kết hợp GROUP BY product_id.",
     "sql": "SELECT product_id,\n"
            "       SUM(quantity * price) AS doanh_so,\n"
            "       RANK() OVER (\n"
            "         ORDER BY SUM(quantity * price) DESC) AS hang\n"
            "FROM   Order_Items\n"
            "GROUP  BY product_id;",
     "answer": "PROD_001 90M (hạng 1) · PROD_003 8M (2) · PROD_002 2M (3) · PROD_004 1M (4). "
               "Xếp hạng đúng kỹ thuật nhưng 90M của PROD_001 bị thổi phồng do item trùng — "
               "dữ liệu nền vẫn bẩn (Câu 47)."},
    {"part": 5, "code": "6.2",
     "prompt": "Dùng UNION ALL tạo báo cáo đếm nhanh: bao nhiêu khách lỗi email, "
               "bao nhiêu sản phẩm giá NULL, bao nhiêu đơn mồ côi.",
     "hint": "Mỗi dòng là một SELECT COUNT(*) kèm nhãn chuỗi cố định, nối bằng UNION ALL.",
     "sql": "SELECT 'Email NULL/rong' AS loai, COUNT(*) AS so_luong\n"
            "FROM   Customers WHERE email IS NULL OR TRIM(email) = ''\n"
            "UNION ALL\n"
            "SELECT 'Gia NULL', COUNT(*)\n"
            "FROM   Products WHERE price IS NULL\n"
            "UNION ALL\n"
            "SELECT 'Don mo coi', COUNT(*)\n"
            "FROM   Orders o WHERE NOT EXISTS (\n"
            "         SELECT 1 FROM Customers c\n"
            "         WHERE c.customer_id = o.customer_id);",
     "answer": "Email NULL/rỗng = 2 (C006, C007) · Giá NULL = 1 (PROD_006) · Đơn mồ côi = 1 "
               "(ORD_004). Mẫu health-check: một câu trả ra nhiều loại lỗi (Câu 50), dễ mở rộng "
               "bằng cách thêm UNION ALL."},
]  # end EXERCISES

