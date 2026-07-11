# -*- coding: utf-8 -*-
"""Dữ liệu 50 câu lệnh SQL + bài tập — schema ecommerce_test (19 bug cài sẵn).
Bộ dữ liệu đầy đủ ở book/sql/ecommerce_test_setup.sql (file companion tải kèm sách)."""

# ===========================================================================
# PARTS — 6 chương
# ===========================================================================
PARTS = [
    ("PHẦN 1", "Toàn vẹn và trùng lặp dữ liệu",
     "Trước khi kiểm thử bất kỳ điều gì, QA cần biết hệ thống mình đang đối mặt. "
     "Hai câu mở đầu là bước thám sát schema: đọc cấu trúc bảng và kiểm tra xem "
     "các ràng buộc UNIQUE/FOREIGN KEY đã thực sự tồn tại chưa. "
     "Tiếp theo là nhóm lỗi kinh điển: bản ghi nhân đôi, ô bắt buộc bị bỏ trống, "
     "khóa ngoại trỏ vào nơi không tồn tại — những lỗi dữ liệu mà QA bắt gặp ngay tuần đầu tiên.",
     "Câu hỏi cốt lõi: <b>DB có đúng cấu trúc không?</b> — "
     "Dữ liệu có định danh được duy nhất, liên kết hợp lệ giữa các bảng, "
     "và các ô bắt buộc không bị để trống?"),
    ("PHẦN 2", "Ràng buộc nghiệp vụ",
     "Mỗi hệ thống đều có những quy tắc bất thành văn: tổng tiền ghi trên đơn "
     "phải khớp tổng từng dòng chi tiết, tồn kho không thể âm, đơn nào cũng phải "
     "có sản phẩm và thuộc về khách hàng thật. "
     "Khi tầng ứng dụng quên kiểm tra, dữ liệu sai sẽ lặng lẽ trôi vào database — "
     "và không có gì ở tầng DB ngăn lại.",
     "Câu hỏi cốt lõi: <b>Dữ liệu có tuân theo luật chơi của hệ thống này không?</b> — "
     "Vi phạm ở phần này thường không gây lỗi ngay, nhưng âm thầm làm sai báo cáo "
     "tài chính, gây lỗi xử lý đơn hàng, hoặc bỏ sót khách hàng thật."),
    ("PHẦN 3", "Đối soát và tính toán",
     "Phần này chuyển từ kiểm tra từng bản ghi sang tổng hợp và thống kê: "
     "tính doanh thu thực từ chi tiết đơn, đối soát tồn kho với lượng đã bán, "
     "xếp hạng sản phẩm, đo tỷ lệ trạng thái và phát hiện giá trị bất thường "
     "so với mặt bằng chung.",
     "Câu hỏi cốt lõi: <b>Các con số tổng hợp có phản ánh đúng dữ liệu chi tiết không?</b> — "
     "Doanh thu, xếp hạng, tỷ lệ phần trăm đều được cộng dồn từ nhiều bản ghi; "
     "chỉ một nhóm bản ghi bẩn cũng đủ làm cả báo cáo sai."),
    ("PHẦN 4", "Biên và dữ liệu bất thường",
     "Người dùng thật luôn nhập những thứ ngoài dự đoán: chuỗi quá dài, ký tự lạ, "
     "số âm, ngày tháng vô lý. Đây là nhóm câu lệnh để tìm những giá trị outlier "
     "(nằm ngoài vùng bình thường) đã lọt vào database.",
     "Câu hỏi cốt lõi: <b>Dữ liệu có nằm trong giới hạn nghiệp vụ cho phép không?</b> — "
     "Số âm, ngày tương lai, chuỗi rỗng, giá trị ngoài enum — "
     "những thứ form nhập liệu lẽ ra phải chặn từ đầu nhưng đã lọt qua."),
    ("PHẦN 5", "Audit, log và dấu vết",
     "Cột thời gian và mối quan hệ giữa các bảng là nơi kể lại lịch sử dữ liệu. "
     "Khi chúng mâu thuẫn — đơn đã xóa mềm vẫn để lại item, đơn hủy mà cờ xóa chưa bật, "
     "dãy ID đứt quãng không rõ nguyên nhân — đó là dấu hiệu của bug logic hoặc lỗ hổng dữ liệu.",
     "Câu hỏi cốt lõi: <b>Lịch sử dữ liệu có kể đúng câu chuyện không?</b> — "
     "Khi nhãn thời gian và trạng thái mâu thuẫn nhau, đó là dấu vết của bug logic "
     "hoặc luồng xử lý bị gián đoạn giữa chừng."),
    ("PHẦN 6", "Truy vấn nâng cao cho QA",
     "Năm câu lệnh cuối dùng tới window function, CTE và UNION. Chúng giải quyết "
     "những bài toán kiểm thử khó: lấy bản ghi mới nhất mỗi nhóm, phân hạng "
     "khách hàng, tổng hợp nhiều loại lỗi trong một báo cáo duy nhất.",
     "Câu hỏi cốt lõi: <b>Cần kỹ thuật nào khi câu trả lời đòi hỏi nhiều bước tính toán?</b> — "
     "Window function, CTE và UNION giải những bài toán mà WHERE và GROUP BY đơn thuần "
     "không đủ: xếp hạng theo nhóm, chuỗi thời gian, tổng hợp nhiều loại lỗi cùng lúc."),
]

# ===========================================================================
# ENTRIES — 50 câu lệnh
# ===========================================================================
ENTRIES = [

# ============================================================
# PHẦN 1 — Toàn vẹn và trùng lặp dữ liệu
# ============================================================
# ─────────────────────────────────────────────────────────
{
 "part": 0, "id": 1,
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
 "before_col_widths": [78, 118, 152, 85, 60],
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
   ("GROUP BY table_name",
    "Gom các cột theo từng bảng để có một dòng tổng quan mỗi bảng."),
   ("SUM(CASE WHEN ...\n  THEN 1 ELSE 0 END)",
    "Chạy ở bước SELECT (sau khi đã gom nhóm): đếm có điều kiện — số cột cho phép NULL và số "
    "cột là khóa chính, cho cái nhìn nhanh về độ \"chặt\" của từng bảng."),
 ],
 "explain":
   "<b>information_schema.columns</b> là bản đồ schema luôn cập nhật — không như tài liệu "
   "viết tay có thể đã lỗi thời từ lâu.<br/>"
   "DB ecommerce_test có 4 bảng (Customers, Order_Items, Orders, Products), mỗi bảng có 1 khóa chính. "
   "Orders nhiều cột nullable nhất (3/6) — gợi ý nhiều trường tùy chọn, đáng kiểm tra kỹ.<br/>"
   "Lưu ý: <b>table_name có thể trả về chữ thường</b> dù tên gốc viết hoa (tùy hệ điều hành "
   "server MySQL chạy) — luôn kiểm tra case thật trước khi lọc WHERE table_name = '...'.<br/>"
   "Chưa cần hiểu hết cú pháp SUM(CASE WHEN...) ở đây — kỹ thuật đếm có điều kiện sẽ được "
   "giải thích kỹ ở Câu 9.",
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
   "Khi thấy một bảng có quá nhiều cột nullable, hỏi dev: những cột đó có rule 'bắt buộc' "
   "nào ở tầng application không? Nếu có, kiểm tra tầng DB có enforce bằng NOT NULL không — "
   "nếu không, tầng application bỏ sót một lần là dữ liệu sai ghi vào ngay. "
   "Câu 5 sẽ kiểm tra cụ thể hơn từng cột.",
},

# ─────────────────────────────────────────────────────────
{
 "part": 0, "id": 2,
 "title": "Kiểm tra ràng buộc UNIQUE/FOREIGN KEY có thực sự được enforce",
 "situation":
   "QA nhận bàn giao một hệ thống: tài liệu ghi \"email là duy nhất\", dev bảo \"đã có FOREIGN KEY "
   "cho customer_id\". Nhưng dữ liệu thực tế lại có email trùng và đơn hàng trỏ tới khách không "
   "tồn tại. Vậy những ràng buộc đó <b>thực sự đã được khai báo hay chưa</b>? "
   "Đừng dựa vào tài liệu hay lời nói miệng — tra trực tiếp metadata của DB để có câu trả lời "
   "chắc chắn.",
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
   "Kết quả chỉ trả về <b>4 PRIMARY KEY</b> — đúng 1 cho mỗi bảng — và <b>không có UNIQUE "
   "hay FOREIGN KEY nào</b>.<br/>"
   "Không có UNIQUE trên cột email có nghĩa là DB không chặn hai tài khoản dùng chung email — "
   "dữ liệu trùng (C004/C005) lọt qua được chính vì lý do này.<br/>"
   "Không có FOREIGN KEY trên Orders.customer_id có nghĩa là DB chấp nhận bất kỳ giá trị nào "
   "cho trường đó — kể cả C999 không tồn tại trong bảng Customers.",
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
   "Chỉ có khóa chính. Tính duy nhất (email không trùng) và tính tham chiếu (đơn hàng phải "
   "có khách hàng thật) chưa được bảo vệ ở tầng DB — nếu tầng ứng dụng bỏ sót một lần kiểm "
   "tra, dữ liệu sai ghi thẳng vào mà không có gì ngăn lại.",
 "note":
   "Khi phát hiện thiếu UNIQUE hay FOREIGN KEY, đừng chỉ nói 'nên thêm' — kèm theo kết quả "
   "câu này như bằng chứng để team không tranh cãi 'chắc đã có rồi'. "
   "Lưu ý: thêm UNIQUE sẽ thất bại nếu dữ liệu trùng chưa được dọn — cần xử lý dữ liệu "
   "trước, rồi mới ALTER TABLE. "
   "MySQL chỉ enforce CHECK constraint từ phiên bản 8.0.16 — hệ thống cũ khai báo nhưng DB "
   "im lặng bỏ qua.",
},


{
 "part": 0, "id": 3,
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
   "<b>a.nguyen@email.com</b> (C001 + C009). "
   "Lưu ý: cặp C001/C009 chỉ xuất hiện trên MySQL 8.0 với collation mặc định "
   "(case-insensitive); trên DB phân biệt hoa/thường, cặp này sẽ không xuất hiện — "
   "chỉ còn 1 cặp. Cần xử lý cả hai trường hợp và thêm ràng buộc UNIQUE trước khi đưa lên production.",
 "note":
   "Kết quả của câu này có thể thay đổi tùy cách database <b>so sánh chuỗi ký tự</b> "
   "(database gọi cài đặt này là <i>collation</i>). "
   "Kiểm tra nhanh: <font face='Mono' size='8.5'>SHOW CREATE TABLE Customers;</font><br/><br/>"
   "(1) <b>Vấn đề hoa/thường</b>: Database thường chạy theo một trong hai chế độ:<br/>"
   "• <b>Không phân biệt hoa/thường</b> (mặc định MySQL 8.0, tên kỹ thuật <i>utf8mb4_0900_ai_ci</i>) "
   "→ 'A.NGUYEN@EMAIL.COM' và 'a.nguyen@email.com' được coi là <b>một</b>, câu này phát hiện được ngay.<br/>"
   "• <b>Phân biệt hoa/thường</b> (tên kỹ thuật <i>utf8mb4_bin</i>) "
   "→ hai email trên bị coi là <b>khác nhau</b>, câu này sẽ BỎ SÓT cặp C001/C009 → cần dùng Câu 8.<br/><br/>"
   "(2) <b>Vấn đề khoảng trắng thừa</b>: '  test@mail.com' (có dấu cách ở đầu) và 'test@mail.com' "
   "bị coi là hai email khác nhau dù trông giống nhau → câu này bỏ sót → dùng Câu 6 để phát hiện.",
},


# ─────────────────────────────────────────────────────────
{
 "part": 0, "id": 4,
 "title": "Tìm trùng theo nhiều cột (composite key)",
 "situation":
   "Quy tắc nghiệp vụ: mỗi đơn hàng không được chứa cùng một sản phẩm "
   "ở hai dòng riêng biệt. Tổ hợp <b>(order_id, product_id)</b> phải là "
   "duy nhất trong Order_Items. Nếu app bị double-submit hoặc thiếu kiểm "
   "tra, một sản phẩm có thể lọt vào hai lần.",
 "before_label": "Bảng Order_Items — dòng đỏ: cặp (order_id, product_id) xuất hiện lần 2:",
 "before_cols": ["item_id","order_id","product_id","quantity","price"],
 "before_rows": [
   [1, "ORD_001","PROD_001", 1,"30.000.000"],
   [2, "ORD_001","PROD_002", 1, "2.000.000"],
   [4, "ORD_002","PROD_001", 1,"30.000.000"],
   [5, "ORD_002","PROD_004", 1, "1.000.000"],
   [6, "ORD_003","PROD_003", 1, "8.000.000"],
   [7, "ORD_001","PROD_001", 1,"30.000.000"],
   [8, "ORD_005","PROD_004", 1, "1.000.000"],
   [9, "ORD_005","PROD_002", 1, "2.000.000"],
   [12,"ORD_003","PROD_002", 0, "1.500.000"],
   [13,"ORD_006","PROD_003", 1, "8.000.000"],
   [14,"ORD_007","PROD_004",20, "1.000.000"],
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
    "MySQL tải toàn bộ bảng <b>Order_Items</b> — 11 dòng trong dữ liệu mẫu."),
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
   "(1) Hai dòng có item_id khác nhau không? Nếu có, xóa theo item_id cụ thể — không xóa theo điều kiện mờ.<br/>"
   "(2) Số lượng và đơn giá của hai dòng có giống nhau không? Nếu khác nhau, cần xác nhận nghiệp vụ "
   "dòng nào đúng trước khi xóa — không thể tự suy.<br/>"
   "Đừng xóa dựa trên giả định — sai item_id sẽ phá vỡ các bảng liên kết.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 0, "id": 5,
 "title": "Tìm NULL ở cột bắt buộc",
 "situation":
   "Cột email được quy định là bắt buộc trên giao diện đăng ký, nhưng "
   "luồng import dữ liệu cũ hoặc API nội bộ lại không kiểm tra. Kết quả: "
   "một số tài khoản không có email — không thể gửi thông báo đặt hàng, "
   "không thể reset mật khẩu, email marketing gửi hàng loạt bị thiếu người nhận.",
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
   "Có <b>hai kiểu rỗng hoàn toàn khác nhau</b> trong SQL — dễ nhầm nhưng hành xử rất khác:<br/><br/>"
   "(1) <b>NULL</b> — ô chưa được điền, hệ thống <i>không biết</i> email là gì. "
   "Giống như tờ form bỏ trống hoàn toàn.<br/>"
   "(2) <b>Chuỗi rỗng ''</b> — ô đã được điền nhưng người dùng không gõ gì, chỉ bấm Submit. "
   "Hệ thống <i>biết</i> có email, nhưng nội dung là trống.<br/><br/>"
   "<b>Tại sao không thể dùng email != '' để bắt cả hai?</b><br/>"
   "Dùng <b>email != ''</b> sẽ bỏ sót mọi dòng có email là NULL — "
   "vì SQL không dùng <b>!=</b> để so sánh với NULL, bắt buộc phải dùng <b>IS NULL</b>. "
   "Đây là lý do câu lệnh cần hai điều kiện riêng kết hợp bằng OR.",
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
   "(2) <b>Ô toàn khoảng trắng</b>: giá trị như '   ' (chỉ có dấu cách) trông giống "
   "có dữ liệu nhưng thực chất rỗng — <b>TRIM(email) = ''</b> cũng bắt được cả trường hợp này. "
   "Kết hợp cả hai điều kiện vào một câu lệnh để không bỏ sót kiểu nào.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 0, "id": 6,
 "title": "Phát hiện khoảng trắng thừa và ký tự ẩn",
 "situation":
   "Người dùng copy-paste tên từ Excel hoặc nhập trên điện thoại dễ "
   "kéo theo dấu cách thừa ở đầu/cuối. Trong dữ liệu mẫu, C008 được lưu là "
   "'  Pham Van D  ' (có hai dấu cách ở đầu và cuối) — nhìn bề ngoài trông bình thường "
   "nhưng hệ thống coi đây là tên khác với 'Pham Van D', "
   "khiến kiểm tra UNIQUE thông thường không phát hiện được trùng lặp.",
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
   "So sánh CHAR_LENGTH trước và sau TRIM để đo chính xác có bao nhiêu ký tự thừa.",
 "result_table": (
   ["customer_id","customer_name","do_dai_goc","do_dai_sau_trim"],
   [["C008","  Pham Van D  ","14","10"]],
 ),
 "result_note":
   "Mỗi dòng trả về là một tên cần được chuẩn hóa — đề xuất dev chạy "
   "UPDATE ... SET customer_name = TRIM(customer_name) trên các dòng này.",
 "note":
   "<b>TRIM chỉ bắt được dấu cách thông thường</b> — loại dấu cách bàn phím tạo ra khi nhấn Space.<br/><br/>"
   "<b>Bẫy từ Excel/Word</b>: khi copy-paste từ các phần mềm văn phòng, đôi khi xuất hiện "
   "<b>dấu cách ẩn</b> (trông y hệt dấu cách bình thường nhưng là một ký tự khác, "
   "tên kỹ thuật là <i>non-breaking space</i>). TRIM không nhận ra loại này và bỏ sót hoàn toàn.<br/><br/>"
   "<b>Cách nhận biết</b>: chạy TRIM xong mà <b>CHAR_LENGTH</b> vẫn dài hơn số ký tự nhìn thấy "
   "→ có khả năng cao đang chứa dấu cách ẩn.<br/>"
   "<b>Cách xử lý</b>: thay thế dấu cách ẩn trước, rồi mới TRIM:<br/>"
   "<font face='Mono' size='8'>TRIM(REPLACE(customer_name, CHAR(160), ''))</font><br/>"
   "Trong đó <font face='Mono' size='8'>CHAR(160)</font> là mã số của dấu cách ẩn đó.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 0, "id": 7,
 "title": "Kiểm tra bản ghi mồ côi (foreign key orphan)",
 "situation":
   "Bảng Orders có cột customer_id dùng để liên kết sang bảng Customers — "
   "mỗi đơn hàng phải thuộc về một khách hàng có thật. "
   "Nếu ràng buộc này bị tắt hoặc dữ liệu được import thủ công bỏ qua kiểm tra, "
   "có thể xuất hiện đơn hàng trỏ đến customer_id không tồn tại trong Customers. "
   "Đây gọi là <b>bản ghi mồ côi</b> — bản ghi tham chiếu đến một đối tượng không còn (hoặc chưa từng) tồn tại. "
   "Báo cáo doanh thu sẽ sai vì không lấy được thông tin khách hàng để ghép vào.",
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
    "Với INNER JOIN, đơn hàng không có khách hàng tương ứng sẽ bị loại khỏi kết quả và không phát hiện được."),
   ("WHERE c.customer_id IS NULL",
    "Sau LEFT JOIN, những dòng Orders không khớp sẽ có "
    "c.customer_id = NULL. Lọc đúng các dòng đó."),
   ("SELECT o.order_id, o.customer_id",
    "Chiếu ra order_id và customer_id để xác định đơn hàng nào bị mồ côi."),
 ],
 "explain":
   "Kỹ thuật <b>LEFT JOIN + WHERE IS NULL</b> là cách chuẩn để tìm bản ghi mồ côi.<br/>"
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
   "Khi tìm thấy đơn mồ côi, hỏi dev hai câu: customer C999 có thực từng tồn tại rồi bị xóa "
   "nhầm không, hay đơn được tạo do bug? Nếu customer bị xóa cứng (hard delete) mà vẫn còn đơn, "
   "đó là lỗ hổng toàn vẹn tham chiếu (referential integrity — dữ liệu con trỏ tới bản ghi cha "
   "không còn tồn tại) — cần xem xét thêm FOREIGN KEY hoặc đổi sang soft-delete. "
   "Câu lệnh tương tự áp dụng được cho mọi cặp bảng cha-con: đổi cặp bảng và cột khóa là xong.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 0, "id": 8,
 "title": "Tìm trùng không phân biệt hoa/thường",
 "situation":
   "Database lưu email theo đúng kiểu người dùng nhập. Trong dữ liệu mẫu, "
   "C001 đăng ký 'a.nguyen@email.com' nhưng C009 lại nhập 'A.NGUYEN@EMAIL.COM' — "
   "cùng một địa chỉ, chỉ khác hoa/thường. "
   "Trên server dùng collation phân biệt hoa/thường, kiểm tra UNIQUE trên cột gốc "
   "sẽ bỏ qua dạng trùng này vì coi hai chuỗi trên là khác nhau.",
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
   "và <b>trung_email@email.com</b> (C004 + C005).",
 "note":
   "Câu 3 và Câu 8 cho cùng kết quả trên MySQL 8.0 mặc định (collation không phân biệt hoa/thường). "
   "Điểm khác biệt: Câu 8 dùng <b>LOWER()</b> nên chạy đúng trên mọi loại collation — "
   "kể cả khi DB được cài chế độ phân biệt hoa/thường. "
   "Khi không chắc DB đang dùng collation nào, dùng Câu 8 là an toàn hơn.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 0, "id": 9,
 "title": "Đếm giá trị NULL theo từng cột",
 "situation":
   "Thay vì kiểm tra NULL từng cột riêng lẻ, câu lệnh này cho ra một "
   "bảng tổng hợp — mỗi cột một ô — để QA thấy ngay bức tranh toàn cảnh: "
   "cột nào bị thiếu nhiều nhất, ưu tiên xử lý cột nào trước.",
 "before_label": "Bảng Products — dòng đỏ: có giá trị NULL trong cột số:",
 "before_cols": ["product_id","product_name","price","stock"],
 "before_rows": [
   ["PROD_001","Phone IP15",        "30.000.000","50"],
   ["PROD_002","Key Logi",     "2.000.000", "100"],
   ["PROD_003","Headphone SN5", "8.000.000", "-5"],
   ["PROD_004","Powerbank AK",       "1.000.000", "20"],
   ["PROD_005","Key Logi",     "2.000.000", "30"],
   ["PROD_006","Speaker JB",        "(NULL)",    "10"],
   ["PROD_007","Mouse RZ",       "1.500.000", "(NULL)"],
   ["PROD_008","key logi",     "2.000.000", "25"],
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
   "Kỹ thuật <b>CASE WHEN + SUM</b> (đã thoáng gặp ở Câu 1, nay phân tích kỹ) là cách "
   "đếm có điều kiện: chuyển mỗi điều kiện thành số 1/0 rồi cộng lại.<br/>"
   "Không cần GROUP BY vì toàn bộ bảng là một nhóm duy nhất — kết quả trả về chỉ 1 dòng.<br/>"
   "Mở rộng bằng cách thêm cột vào SELECT để kiểm tra nhiều trường trong một lần chạy.",
 "result_table": (
   ["null_ten","null_gia","null_ton"],
   [["0","1","1"]],
 ),
 "result_note":
   "Cột price và stock đều có 1 NULL — cần làm rõ với dev/PO: "
   "NULL ở đây có nghĩa là gì? Chưa nhập? Miễn phí? Hết hàng? "
   "NULL và 0 là hai trạng thái khác nhau — xác định đúng nghĩa trước khi viết test case.",
 "note":
   "Câu này chỉ đếm NULL, bỏ sót chuỗi rỗng — dữ liệu thiếu ở hệ thống cũ thường lưu "
   "dưới dạng chuỗi rỗng thay vì NULL, nên kết quả = 0 chưa có nghĩa là sạch.<br/>"
   "Kết quả là tổng hợp toàn bảng (1 dòng duy nhất) — dùng Câu 5 để xem cụ thể bản ghi nào bị thiếu.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 0, "id": 10,
 "title": "Tìm bản ghi trùng hoàn toàn (full duplicate)",
 "situation":
   "Khác với trùng ID, full duplicate là hai dòng có toàn bộ giá "
   "nghiệp vụ giống nhau nhưng ID tự sinh khác nhau — thường xảy ra "
   "khi người dùng bấm nút 'Lưu' hai lần hoặc import dữ liệu không "
   "kiểm tra trùng trước.",
 "before_label": "Bảng Products — dòng đỏ: cùng tên và giá với dòng khác:",
 "before_cols": ["product_id","product_name","category","price","stock"],
 "before_rows": [
   ["PROD_001","Phone IP15",        "Dien thoai","30.000.000","50"],
   ["PROD_002","Key Logi",     "Phu kien",  "2.000.000", "100"],
   ["PROD_003","Headphone SN5", "Phu kien",  "8.000.000", "-5"],
   ["PROD_004","Powerbank AK",       "Phu kien",  "1.000.000", "20"],
   ["PROD_005","Key Logi",     "Phu kien",  "2.000.000", "30"],
   ["PROD_006","Speaker JB",        "Phu kien",  "(NULL)",    "10"],
   ["PROD_007","Mouse RZ",       "Phu kien",  "1.500.000", "(NULL)"],
   ["PROD_008","key logi",     "Phu kien",  "2.000.000", "25"],
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
   [["Key Logi","2.000.000",2]],
 ),
 "result_note":
   "PROD_002 và PROD_005 trùng tên + giá nhưng có product_id khác nhau — "
   "hệ thống đang có hai bản ghi cho cùng một sản phẩm. "
   "Cần xác định bản nào có đơn hàng liên kết để tránh xóa nhầm khi dọn dẹp.<br/>"
   "Lưu ý: PROD_008 cũng là bàn phím này nhưng gõ thường + dư khoảng trắng — cách so tên "
   "<b>chính xác</b> ở đây KHÔNG bắt được nó; phải chuẩn hóa như Câu 35 mới thấy.",
 "note":
   "<b>Bẫy 1 — trùng theo 2 cột chưa đủ bằng chứng:</b> "
   "câu lệnh chỉ so sánh product_name và price. Hai sản phẩm cùng tên cùng giá "
   "nhưng khác nhà cung cấp hoặc khác phiên bản vẫn có thể là sản phẩm hợp lệ, "
   "không phải trùng thật — cần xác nhận thêm với PO trước khi báo bug.<br/><br/>"
   "<b>Bẫy 2 — kết quả không nói bản nào là gốc:</b> "
   "câu trả về số lần trùng, không biết PROD_002 hay PROD_005 mới là bản được tạo đúng. "
   "Có đơn hàng liên kết không đồng nghĩa là bản gốc — có thể người dùng đặt nhầm vào bản trùng.<br/><br/>"
   "<b>Báo cáo bug đúng cách:</b> ghi rõ cả hai product_id, số đơn hàng liên kết từng bản, "
   "và đề nghị dev/PO xác nhận bản nào giữ lại — không tự ý kết luận.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 0, "id": 11,
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
   "Kỹ thuật <b>NOT IN + danh sách tường minh</b>: lọc ra mọi giá trị không nằm trong "
   "tập hợp lệ đã định nghĩa. Áp dụng được cho mọi cột dạng ENUM — chỉ đổi tên cột và danh sách.<br/>"
   "Kết quả rỗng không phải thất bại — đó là xác nhận dữ liệu đang đúng. "
   "Nên chạy định kỳ hoặc sau mỗi lần migrate để phát hiện sớm giá trị lạ.",
 "result_table": (
   ["customer_id","customer_name","membership_tier"],
   [["C010","Khach Test VIP","VIP"]],
 ),
 "result_note":
   "1 bản ghi có tier không hợp lệ. Cần cập nhật về giá trị đúng "
   "và bổ sung CHECK constraint hoặc ENUM type trong DB.",
 "note":
   "<b>Cạm bẫy:</b> không để NULL lọt vào danh sách NOT IN — "
   "nếu có, toàn bộ điều kiện trả về UNKNOWN và bỏ sót mọi dòng. "
   "Bẫy này áp cho cả danh sách viết tay lẫn <b>NOT IN (subquery)</b> khi cột trong subquery "
   "có thể NULL — khi đó dùng NOT EXISTS an toàn hơn.<br/>"
   "Nếu cần bắt thêm cả dòng chưa điền tier, thêm riêng: "
   "<font face='Mono' size='8'>OR membership_tier IS NULL</font>",
},
# ─────────────────────────────────────────────────────────
{
 "part": 0, "id": 12,
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
   "Cơ chế <b>soft-delete</b> giữ lại bản ghi để phục vụ <b>audit trail</b> (nhật ký truy vết — lưu lại lịch sử mọi thao tác để tra cứu khi cần), "
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
   "Soft-delete là pattern phổ biến trong hầu hết hệ thống e-commerce, CRM, ERP. "
   "Khi test, QA cần kiểm tra mọi màn hình báo cáo: chạy lại query báo cáo không có điều kiện "
   "WHERE deleted_at IS NULL rồi so sánh kết quả — nếu tổng tiền hoặc số lượng thay đổi, "
   "đó là bug cần báo cáo ngay. "
   "Bước sau khi tìm thấy: đối chiếu với log để xác nhận đơn được xóa mềm có đúng thời điểm "
   "và đúng lý do không.",
},


# ─────────────────────────────────────────────────────────
{
 "part": 1, "id": 13,
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
    "Đơn không có item sẽ bị bỏ qua khỏi kết quả — đây là ý muốn: đơn rỗng không có gì để đối soát. "
    "Nếu cần phát hiện riêng đơn 0 items, viết thêm truy vấn dùng LEFT JOIN lọc WHERE i.item_id IS NULL."),
   ("GROUP BY o.order_id, o.total_amount",
    "Gom toàn bộ items của cùng một đơn thành một nhóm. "
    "total_amount cần có trong GROUP BY vì được dùng trong HAVING."),
   ("HAVING SUM(i.quantity * i.price)\n  != o.total_amount",
    "<b>HAVING</b> lọc sau khi đã tính aggregate — chỉ giữ đơn "
    "có tổng items khác với total_amount đã ghi."),
   ("SELECT o.order_id,\n  o.total_amount AS ghi_trong_don,\n  SUM(i.quantity * i.price) AS tinh_tu_items,\n  o.total_amount - SUM(...) AS chenh_lech",
    "Hiển thị cả ba con số: <b>ghi_trong_don</b> (ghi trong đơn), "
    "<b>tinh_tu_items</b> (tính từ từng dòng sản phẩm), "
    "<b>chenh_lech</b> (hiệu giữa hai cột) — đủ thông tin để QA viết defect report mà không cần tra thêm."),
 ],
 "explain":
   "Kỹ thuật <b>JOIN + GROUP BY + HAVING</b> để đối soát header-detail: "
   "total_amount trong Orders phải bằng SUM(quantity × price) từ Order_Items.<br/>"
   "Kết quả phát hiện <b>ba nguyên nhân khác nhau</b>:<br/>"
   "(1) ORD_001 lệch vì item bị nhân đôi (item 1 và item 7 cùng order + product).<br/>"
   "(2) ORD_002 lệch vì total_amount bị ghi sai thủ công (Bug-B).<br/>"
   "(3) ORD_005 lệch vì là đơn đã xóa mềm nhưng item chưa dọn, vẫn lọt vào đối soát (Câu 12).<br/>"
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
   "ORD_005 đã bị xóa mềm nhưng vẫn tham gia đối soát — minh họa bug Câu 12 (soft-delete leak).",
 "note":
   "Hai bẫy cần biết khi dùng câu này: "
   "(1) INNER JOIN bỏ qua đơn rỗng — đơn không có item không xuất hiện trong kết quả, "
   "không phải không có lỗi mà bị lọt. "
   "(2) Câu này không lọc deleted_at, nên đơn đã xóa mềm vẫn lọt vào kết quả — "
   "nếu chỉ muốn đối soát đơn còn hiệu lực, thêm WHERE o.deleted_at IS NULL. "
   "Khi tìm thấy chênh lệch, hỏi dev: nguyên nhân là item bị nhân đôi hay total_amount bị ghi sai "
   "thủ công? Hai nguyên nhân có cách xử lý hoàn toàn khác nhau.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 1, "id": 14,
 "title": "Phát hiện tồn kho âm hoặc NULL",
 "situation":
   "Cột <b>stock</b> có hai kiểu lỗi cần soi cùng lúc: giá trị <b>âm</b> (bán quá số lượng "
   "thực có) và giá trị <b>NULL</b> (chưa từng được nhập kho). Hai lỗi này có nguyên nhân và "
   "cách xử lý khác hẳn nhau, nhưng đều khiến trang sản phẩm hiển thị sai tình trạng còn hàng.",
 "before_label": "Bảng Products — dòng đỏ: stock âm (Bug-C) và stock NULL:",
 "before_cols": ["product_id","product_name","category","price","stock"],
 "before_rows": [
   ["PROD_001","Phone IP15","Dien thoai","30.000.000",50],
   ["PROD_002","Key Logi","Phu kien","2.000.000",100],
   ["PROD_003","Headphone SN5","Phu kien","8.000.000",-5],
   ["PROD_004","Powerbank AK","Phu kien","1.000.000",20],
   ["PROD_005","Key Logi","Phu kien","2.000.000",30],
   ["PROD_006","Speaker JB","Phu kien","(NULL)",10],
   ["PROD_007","Mouse RZ","Phu kien","1.500.000","(NULL)"],
   ["PROD_008","key logi","Phu kien","2.000.000",25],
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
   "Một câu gộp hai loại lỗi: <b>tồn kho âm</b> (bán quá số lượng — thường do thiếu CHECK "
   "constraint hoặc hai người đặt cùng lúc) và <b>tồn kho NULL</b> (chưa có thông tin — "
   "khác với stock = 0 là hết hàng đã biết rõ).<br/>"
   "Lưu ý: phải dùng <b>IS NULL</b> để bắt NULL, viết <b>stock = NULL</b> không bao giờ cho kết quả.",
 "result_table": (
   ["product_id","product_name","stock"],
   [
     ["PROD_003","Headphone SN5",-5],
     ["PROD_007","Mouse RZ","(NULL)"],
   ]
 ),
 "result_note":
   "2 sản phẩm lỗi, hai nguyên nhân khác nhau: PROD_003 tồn kho = -5 (bán quá số lượng — "
   "điều tra race condition hoặc logic trừ kho); PROD_007 tồn kho = NULL (chưa nhập kho — "
   "bổ sung dữ liệu hoặc thêm DEFAULT 0 vào schema).",
 "note":
   "<b>Khi tìm thấy stock âm</b> — hỏi dev hai câu trước khi viết defect report:<br/>"
   "(1) Luồng nào trừ kho? (đặt hàng, xác nhận thanh toán, hay xuất kho?) "
   "→ xác định đúng điểm xảy ra lỗi.<br/>"
   "(2) DB có ràng buộc ngăn giá trị âm không? "
   "→ nếu không có, đây là thiếu sót cần ghi vào defect.<br/><br/>"
   "<b>Khi tìm thấy stock NULL</b> — phân biệt hai tình huống trước khi báo lỗi:<br/>"
   "(1) Sản phẩm mới tạo chưa nhập kho → nhắc nhở bổ sung dữ liệu, chưa phải bug nghiêm trọng.<br/>"
   "(2) Sản phẩm đang bán mà stock = NULL → bug thật: hệ thống không biết còn hàng không, "
   "có thể cho phép đặt hàng tùy tiện.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 1, "id": 15,
 "title": "Phát hiện đơn hàng PENDING đang chờ sản phẩm hết hàng",
 "situation":
   "Khi hệ thống nhận đơn hàng mà không kiểm tra tồn kho tức thì, đơn PENDING "
   "vẫn được tạo dù sản phẩm đã hết hoặc tồn kho âm. QA cần phát hiện sớm "
   "trước khi đội vận hành phải xử lý thủ công — hoặc tệ hơn, khách chờ lâu mà không "
   "được giao hàng.",
 "before_label": "Đơn PENDING ghép với tồn kho sản phẩm (tổng hợp Orders + Order_Items + Products) — dòng đỏ: ORD_006 đặt PROD_003 đang hết hàng (stock = −5):",
 "before_cols": ["order_id","customer_id","product_id","ton_kho","status"],
 "before_rows": [
   ["ORD_004","C999","(rỗng — 0 items)","—","PENDING"],
   ["ORD_006","C003","PROD_003","-5","PENDING"],
   ["ORD_007","C001","PROD_004","20","PENDING"],
 ],
 "before_bugs": [1],
 "before_col_widths": [62, 60, 80, 68, 65],
 "sql": (
   "SELECT o.order_id,\n"
   "       o.customer_id,\n"
   "       oi.product_id,\n"
   "       p.product_name,\n"
   "       p.stock      AS ton_kho,\n"
   "       oi.quantity  AS so_luong_dat\n"
   "FROM   Orders o\n"
   "JOIN   Order_Items oi ON o.order_id  = oi.order_id\n"
   "JOIN   Products    p  ON oi.product_id = p.product_id\n"
   "WHERE  o.status = 'PENDING'\n"
   "  AND  p.stock  <= 0;"
 ),
 "clauses": [
   ("FROM Orders o",
    "Bắt đầu từ bảng Orders (mỗi đơn là một dòng), gán alias <b>o</b>. Đây là bảng gốc "
    "để lần lượt nối thêm chi tiết đơn và sản phẩm."),
   ("JOIN Order_Items oi\n  ON o.order_id = oi.order_id",
    "Nối Orders với chi tiết sản phẩm — bỏ qua đơn rỗng (ORD_004) vì không có "
    "dòng nào trong Order_Items để nối."),
   ("JOIN Products p\n  ON oi.product_id = p.product_id",
    "Nối tiếp sang bảng Products để lấy tồn kho hiện tại của từng sản phẩm "
    "trong đơn hàng."),
   ("WHERE o.status = 'PENDING'\n  AND p.stock <= 0",
    "<b>o.status = 'PENDING'</b>: chỉ xét đơn đang chờ xử lý.<br/>"
    "<b>p.stock &lt;= 0</b>: lọc ra sản phẩm hết hàng hoặc tồn kho âm — "
    "kết hợp với điều kiện trên để tìm đơn đang chờ nhưng không thể giao."),
 ],
 "explain":
   "Câu lệnh kết hợp ba bảng để đặt câu hỏi liên bảng: <b>đơn hàng nào đang "
   "chờ mà sản phẩm trong đó đã hết?</b><br/>"
   "Điều này khác với Câu 14 (chỉ hỏi 'sản phẩm nào hết hàng?') — ở đây ta hỏi "
   "thêm 'và nó đang nằm trong đơn PENDING không?' — cần JOIN để trả lời.<br/>"
   "Đây là lỗi thường gặp khi hệ thống không có bước <i>reserve stock</i> "
   "(đặt chỗ tồn kho) ngay lúc tạo đơn.",
 "result_table": (
   ["order_id","customer_id","product_id","product_name","ton_kho","so_luong_dat"],
   [["ORD_006","C003","PROD_003","Headphone SN5","-5","1"]],
 ),
 "result_note":
   "ORD_006 đang PENDING nhưng PROD_003 có stock = −5. "
   "Đơn này không thể giao cho đến khi nhập thêm hàng.",
 "note":
   "Khi tìm thấy đơn PENDING + hết hàng, QA cần xác nhận thêm hai điều:<br/>"
   "(1) Hệ thống có cảnh báo cho đội vận hành không, hay đơn tồn đọng im lặng?<br/>"
   "(2) Nếu DB dùng soft-delete, lọc thêm <b>AND o.deleted_at IS NULL</b> để tránh tính nhầm đơn đã hủy.<br/>"
   "Câu 14 tìm sản phẩm hết hàng; câu này tìm đúng đơn hàng bị ảnh hưởng — "
   "giúp ưu tiên đúng chỗ khi viết defect report.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 1, "id": 16,
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
    "Lọc những dòng đó là cách nhận diện đơn rỗng — đây là kỹ thuật truy vấn loại trừ."),
   ("SELECT o.order_id, o.customer_id,\n       o.total_amount, o.status",
    "Hiển thị đủ thông tin để QA điều tra: ai đặt, số tiền bao nhiêu, trạng thái gì."),
 ],
 "explain":
   "Kỹ thuật <b>LEFT JOIN + WHERE IS NULL</b> là cách chuẩn để tìm bản ghi không có con.<br/>"
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
   "Đơn rỗng thường xuất hiện do bug luồng xử lý — đơn được tạo nhưng bước "
   "thêm sản phẩm bị lỗi hoặc timeout. Khi tìm thấy, hỏi dev: "
   "luồng tạo đơn có bước rollback không nếu thêm item thất bại? "
   "Nếu không có, đơn rỗng sẽ tiếp tục xuất hiện sau mỗi lần lỗi mạng hoặc lỗi timeout.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 1, "id": 17,
 "title": "Tìm sản phẩm chưa bao giờ được bán",
 "situation":
   "Sản phẩm có trong danh mục nhưng không xuất hiện trong bất kỳ đơn hàng nào. "
   "Có thể là sản phẩm mới chưa ra mắt, sản phẩm bị ẩn nhưng dữ liệu chưa dọn, "
   "hoặc sản phẩm bị lỗi khiến không ai thêm được vào giỏ hàng.",
 "before_label": "Bảng Products — dòng đỏ: chưa có trong Order_Items:",
 "before_cols": ["product_id","product_name","category","price","stock"],
 "before_rows": [
   ["PROD_001","Phone IP15","Dien thoai","30.000.000","50"],
   ["PROD_002","Key Logi","Phu kien","2.000.000","100"],
   ["PROD_003","Headphone SN5","Phu kien","8.000.000","-5"],
   ["PROD_004","Powerbank AK","Phu kien","1.000.000","20"],
   ["PROD_005","Key Logi","Phu kien","2.000.000","30"],
   ["PROD_006","Speaker JB","Phu kien","(NULL)","10"],
   ["PROD_007","Mouse RZ","Phu kien","1.500.000","(NULL)"],
   ["PROD_008","key logi","Phu kien","2.000.000","25"],
 ],
 "before_bugs": [4, 5, 6, 7],
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
   "Cùng kỹ thuật LEFT JOIN + WHERE IS NULL với Câu 7 và Câu 16, áp dụng cho chiều Products → Order_Items.<br/>"
   "Trong data mẫu, 4 sản phẩm chưa bán — mỗi cái một lý do:<br/>"
   "(1) PROD_005: trùng tên PROD_002 — sản phẩm bị nhân đôi.<br/>"
   "(2) PROD_006: price = NULL — chưa định giá.<br/>"
   "(3) PROD_007: stock = NULL — chưa nhập kho.<br/>"
   "(4) PROD_008: cũng là bản trùng của 'Key Logi' nhưng gõ sai (chữ thường + dư "
   "khoảng trắng, xem Câu 35) — bản thừa nên chẳng có đơn nào.<br/>"
   "Kết hợp với Câu 9, Câu 10, Câu 14 và Câu 35 để phân tích từng trường hợp.",
 "result_table": (
   ["product_id","product_name","price","stock"],
   [
     ["PROD_005","Key Logi","2.000.000",30],
     ["PROD_006","Speaker JB","(NULL)",10],
     ["PROD_007","Mouse RZ","1.500.000","(NULL)"],
     ["PROD_008","key logi","2.000.000",25],
   ]
 ),
 "result_note":
   "4 sản phẩm chưa bán: PROD_005 và PROD_008 đều là bản trùng của PROD_002 "
   "(một bản gõ hệt, một bản gõ sai), PROD_006 chưa có giá, PROD_007 chưa có tồn kho.",
 "note":
   "Sản phẩm chưa bán không nhất thiết là lỗi — có thể là hàng mới chưa ra mắt. "
   "Để phân biệt trước khi báo bug: xem thêm cột price và stock trong kết quả. "
   "Sản phẩm chưa bán mà price = NULL hoặc stock = NULL là dấu hiệu dữ liệu chưa hoàn chỉnh — "
   "ưu tiên điều tra trước. "
   "Sản phẩm chưa bán mà trùng tên sản phẩm đã có thì nghi nhân đôi — xác nhận bằng Câu 10.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 1, "id": 18,
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
   "Cùng kỹ thuật LEFT JOIN + WHERE IS NULL, chiều Customers → Orders.<br/>"
   "Trong data mẫu, 7 trong 10 khách chưa có đơn — phần lớn mang dấu hiệu tài khoản test "
   "(tên chứa 'Test', 'Ao Bug', khoảng trắng thừa, đánh số thủ công).<br/>"
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
   "7 khách chưa có đơn — phần lớn mang dấu hiệu tài khoản test. "
   "Cần đánh dấu để loại khỏi báo cáo production.",
 "note":
   "Câu này hay bị nhầm với Câu 7 (đơn hàng mồ côi). Điểm khác nhau:<br/>"
   "(1) <b>Câu 7</b>: Orders không có Customers — đơn hàng mồ côi, thiếu chủ.<br/>"
   "(2) <b>Câu 18</b>: Customers không có Orders — khách hàng chưa mua gì.<br/>"
   "Hai hướng bổ sung cho nhau: Câu 7 bắt lỗi tầng Orders, Câu 18 bắt lỗi tầng Customers.",
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
   ["ORD_006","C003","8.000.000","PENDING","2026-06-23"],
   ["ORD_007","C001","20.000.000","PENDING","2027-01-01"],
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
    "Lưu ý: SUM dùng total_amount từ Orders là con số đã ghi sẵn trong đơn, "
    "không tính lại từ từng item — nếu dữ liệu bị chênh lệch giữa tổng đơn và tổng items, "
    "câu lệnh này sẽ không phát hiện được."),
   ("ORDER BY tong_chi_tieu DESC",
    "Khách chi tiêu nhiều nhất lên đầu — dễ phát hiện outlier bất thường. "
    "Trên production, thêm <b>LIMIT 10–20</b> để chỉ lấy nhóm khách chi tiêu cao nhất."),
 ],
 "explain":
   "Câu lệnh không tìm bug trực tiếp mà tạo <b>bảng nền để phát hiện bất thường</b>.<br/>"
   "QA so sánh kết quả với dữ liệu hệ thống loyalty, CRM hoặc báo cáo tài chính — "
   "nếu con số lệch là có vấn đề.<br/>"
   "Lưu ý: vì dùng total_amount từ Orders, kết quả bao gồm Bug-B (ORD_002 ghi sai).<br/>"
   "Cần chạy Câu 13 trước để phát hiện và sửa dữ liệu lệch, sau đó Câu 19 mới phản ánh đúng thực tế.",
 "result_table": (
   ["customer_id","customer_name","so_don","tong_chi_tieu"],
   [
     ["C001","Nguyen Van A", 3,"67.000.000"],
     ["C002","Tran Van B",   1,"20.000.000"],
     ["C003","Le Thi C",     2,"16.000.000"],
   ]
 ),
 "result_note":
   "Chỉ 3/10 khách có đơn (C001, C002, C003); 7 khách C004–C010 chưa mua nên không xuất hiện. "
   "C001 dẫn đầu 67M (3 đơn: ORD_001 + ORD_005 soft-delete + ORD_007 ngày tương lai). "
   "C003 có 2 đơn (ORD_003 + ORD_006 — cặp double order từ Câu 29). Con số C002 (20M) là Bug-B — thực tế items cộng lại 31M.",
 "note":
   "Câu này dùng total_amount từ Orders — con số ghi sẵn, chưa chắc đúng. "
   "Trước khi dùng kết quả này để báo cáo, chạy Câu 13 trước để xác nhận không có đơn nào bị lệch. "
   "Bộ số tổng hợp ở đây chỉ đáng tin khi dữ liệu nền đã được kiểm tra sạch — "
   "đừng báo cáo con số C001 = 67M mà chưa kiểm tra đơn nào trong 3 đơn của C001 có lỗi không.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 1, "id": 20,
 "title": "Phát hiện sản phẩm đã bán vượt quá tồn kho",
 "situation":
   "Tổng số lượng đã bán (từ Order_Items) lớn hơn tồn kho hiện tại (từ Products). "
   "Đây là dấu hiệu của race condition, thiếu kiểm tra stock trước khi trừ, "
   "hoặc dữ liệu kho bị cập nhật sai sau khi xác nhận đơn. "
   "Lưu ý: phép so sánh này chỉ có nghĩa khi kho chưa được nhập thêm kể từ đầu kỳ "
   "(đúng với DB mẫu); hệ thống có nhập hàng định kỳ phải đối soát với bảng nhập–xuất kho.",
 "before_label": "Bảng Products — dòng đỏ: tồn kho có thể bị vượt quá:",
 "before_cols": ["product_id","product_name","category","price","stock"],
 "before_rows": [
   ["PROD_001","Phone IP15","Dien thoai","30.000.000",50],
   ["PROD_002","Key Logi","Phu kien","2.000.000",100],
   ["PROD_003","Headphone SN5","Phu kien","8.000.000",-5],
   ["PROD_004","Powerbank AK","Phu kien","1.000.000",20],
   ["PROD_005","Key Logi","Phu kien","2.000.000",30],
   ["PROD_006","Speaker JB","Phu kien","(NULL)",10],
   ["PROD_007","Mouse RZ","Phu kien","1.500.000","(NULL)"],
   ["PROD_008","key logi","Phu kien","2.000.000",25],
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
    "Sản phẩm chưa có dòng nào trong Order_Items sẽ bị loại khỏi kết quả — "
    "đây là ý muốn: không bán được thì không có gì để so sánh với tồn kho. "
    "Nếu cần liệt kê sản phẩm chưa bán, dùng LEFT JOIN và lọc WHERE oi.item_id IS NULL."),
   ("GROUP BY p.product_id, p.product_name, p.stock",
    "Gom tất cả dòng Order_Items của cùng một sản phẩm để tính tổng số đã bán."),
   ("HAVING SUM(oi.quantity) > p.stock",
    "<b>HAVING</b> so sánh sau aggregate: tổng đã bán > tồn kho hiện tại "
    "là vi phạm ràng buộc nghiệp vụ."),
   ("SELECT ..., tong_da_ban",
    "Hiển thị cả stock hiện tại và tổng đã bán để QA thấy ngay mức độ vượt quá."),
 ],
 "explain":
   "Câu lệnh phát hiện vi phạm ràng buộc: <b>tổng bán ra không được vượt tồn kho</b> "
   "(với giả định kho chưa nhập thêm — xem lưu ý ở phần Tình huống).<br/>"
   "PROD_003 bị phát hiện vì stock = -5 và tong_da_ban = 2 (2 &gt; -5).<br/>"
   "PROD_004 cũng bị phát hiện: stock = 20 nhưng tong_da_ban = 22 (22 &gt; 20) — "
   "hệ thống đã bán quá số lượng tồn kho hiện có.<br/>"
   "Với hệ thống thực, câu này giúp phát hiện overselling (bán vượt tồn kho) trước khi "
   "khách hàng phàn nàn vì không nhận được hàng.",
 "result_table": (
   ["product_id","product_name","stock","tong_da_ban"],
   [
     ["PROD_004","Powerbank AK",        20,22],
     ["PROD_003","Headphone SN5", -5, 2],
   ]
 ),
 "result_note":
   "PROD_003: tồn kho = -5 nhưng tổng đã bán = 2 — kho âm vẫn bị bán thêm. "
   "PROD_004: tồn kho = 20 nhưng tổng đã bán = 22 — vượt 2 đơn vị so với tồn kho hiện tại.",
 "note":
   "INNER JOIN làm câu này bỏ qua sản phẩm chưa có đơn nào — sản phẩm chưa bán không xuất hiện "
   "dù tồn kho đang âm. "
   "Khi tìm thấy overselling (bán vượt tồn kho), hỏi dev: hệ thống có bước reserve stock (đặt chỗ tồn kho) ngay khi "
   "tạo đơn không? Nếu không, race condition xảy ra khi hai người đặt cùng lúc — "
   "đây là lỗi đồng thời (concurrency bug), không chỉ là lỗi dữ liệu đơn thuần.",
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
   [1, "ORD_001","PROD_001", 1,"30.000.000"],
   [2, "ORD_001","PROD_002", 1, "2.000.000"],
   [4, "ORD_002","PROD_001", 1,"30.000.000"],
   [5, "ORD_002","PROD_004", 1, "1.000.000"],
   [6, "ORD_003","PROD_003", 1, "8.000.000"],
   [7, "ORD_001","PROD_001", 1,"30.000.000"],
   [8, "ORD_005","PROD_004", 1, "1.000.000"],
   [9, "ORD_005","PROD_002", 1, "2.000.000"],
   [12,"ORD_003","PROD_002", 0, "1.500.000"],
   [13,"ORD_006","PROD_003", 1, "8.000.000"],
   [14,"ORD_007","PROD_004",20, "1.000.000"],
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
    "MySQL tải toàn bộ bảng <b>Order_Items</b> — 11 dòng trong dữ liệu mẫu."),
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
     ["ORD_003", 2, 1,  "8.000.000"],
     ["ORD_005", 2, 2,  "3.000.000"],
     ["ORD_006", 1, 1,  "8.000.000"],
     ["ORD_007", 1,20, "20.000.000"],
   ]
 ),
 "result_note":
   "ORD_001: 3 dòng items → COUNT bất thường, doanh thu = 62M (lẽ ra 32M). "
   "ORD_002: tổng = 31M, khác total_amount 20M (Bug-B). "
   "ORD_003: 2 dòng — item 12 có quantity=0 nên tong_so_luong vẫn = 1 và doanh thu = 8M. "
   "ORD_006 (double order) và ORD_007 (ngày tương lai) xuất hiện thêm. "
   "ORD_004 vắng mặt vì không có item nào.",
 "note":
   "Khi thấy COUNT(*) của một đơn cao bất thường, không cần tính doanh thu ngay — tra trực tiếp "
   "các item của đơn đó ORDER BY item_id để xem dòng nào bị nhân đôi, rồi đối chiếu item_id cụ thể "
   "trước khi báo bug.",
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
   [1, "ORD_001","PROD_001", 1,"30.000.000"],
   [2, "ORD_001","PROD_002", 1, "2.000.000"],
   [4, "ORD_002","PROD_001", 1,"30.000.000"],
   [5, "ORD_002","PROD_004", 1, "1.000.000"],
   [6, "ORD_003","PROD_003", 1, "8.000.000"],
   [7, "ORD_001","PROD_001", 1,"30.000.000"],
   [8, "ORD_005","PROD_004", 1, "1.000.000"],
   [9, "ORD_005","PROD_002", 1, "2.000.000"],
   [12,"ORD_003","PROD_002", 0, "1.500.000"],
   [13,"ORD_006","PROD_003", 1, "8.000.000"],
   [14,"ORD_007","PROD_004",20, "1.000.000"],
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
    "Sản phẩm chưa bán (PROD_005, 006, 007, 008) bị loại — "
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
   "Bảng xếp hạng chính xác phải bắt đầu bằng việc xác nhận dữ liệu sạch (Câu 4).",
 "result_table": (
   ["product_id","product_name","tong_so_luong","tong_doanh_so"],
   [
     ["PROD_001","Phone IP15",        3, "90.000.000"],
     ["PROD_004","Powerbank AK",       22,"22.000.000"],
     ["PROD_003","Headphone SN5", 2, "16.000.000"],
     ["PROD_002","Key Logi",     2,  "4.000.000"],
   ]
 ),
 "result_note":
   "PROD_001 dẫn đầu với 90M — thực ra chỉ 60M nếu không có item 7 trùng. "
   "PROD_004 vọt lên hạng 2 (22 đơn vị, 22M) do item 14 có quantity=20 — đây là dấu hiệu đáng ngờ. "
   "Chạy Câu 4 để xác nhận trùng, sửa dữ liệu rồi mới tin vào kết quả xếp hạng này.",
 "note":
   "Trước khi dùng kết quả xếp hạng để ra quyết định kinh doanh, QA cần kiểm tra:<br/>"
   "(1) <b>Câu 4</b>: có item nào bị trùng (order_id + product_id) không?<br/>"
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
   ["PROD_001","Phone IP15",        "Dien thoai","30.000.000", 50],
   ["PROD_002","Key Logi",     "Phu kien",  "2.000.000", 100],
   ["PROD_003","Headphone SN5", "Phu kien",  "8.000.000",  -5],
   ["PROD_004","Powerbank AK",       "Phu kien",  "1.000.000",  20],
   ["PROD_005","Key Logi",     "Phu kien",  "2.000.000",  30],
   ["PROD_006","Speaker JB",        "Phu kien",  "(NULL)",     10],
   ["PROD_007","Mouse RZ",       "Phu kien",  "1.500.000","(NULL)"],
   ["PROD_008","key logi",     "Phu kien",  "2.000.000", 25],
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
    "MySQL tải toàn bộ bảng <b>Products</b> — 8 sản phẩm trong dữ liệu mẫu."),
   ("price * stock AS gia_tri_kho",
    "MySQL tính tích hai cột và đặt tên kết quả là <b>gia_tri_kho</b>. "
    "Quy tắc: NULL × bất kỳ = NULL; âm × dương = âm."),
   ("ORDER BY gia_tri_kho",
    "Sắp xếp tăng dần: MySQL đặt NULL trước tiên, rồi đến âm, rồi dương. "
    "Cách hiển thị này đưa dòng lỗi lên đầu bảng kết quả."),
 ],
 "explain":
   "Phép nhân đơn giản nhưng phản ánh ngay <b>hai loại lỗi dữ liệu</b> đã gặp ở Câu 9 và Câu 14:<br/>"
   "(1) <b>stock âm</b>: PROD_003 cho gia_tri_kho = -40.000.000 — không thể có kho giá trị âm.<br/>"
   "(2) <b>NULL</b>: PROD_006 (price NULL) và PROD_007 (stock NULL) cho gia_tri_kho = NULL "
   "— không thể tính được giá trị kho, ảnh hưởng trực tiếp đến báo cáo tổng tài sản.",
 "result_table": (
   ["product_id","product_name","price","stock","gia_tri_kho"],
   [
     ["PROD_006","Speaker JB",   "(NULL)","10",       "(NULL)"],
     ["PROD_007","Mouse RZ","1.500.000","(NULL)",  "(NULL)"],
      ["PROD_003","Headphone SN5",       "8.000.000","-5","-40.000.000"],
     ["PROD_004","Powerbank AK",  "1.000.000","20", "20.000.000"],
     ["PROD_008","key logi","2.000.000","25", "50.000.000"],
     ["PROD_005","Key Logi","2.000.000","30", "60.000.000"],
     ["PROD_002","Key Logi","2.000.000","100","200.000.000"],
     ["PROD_001","Phone IP15","30.000.000","50","1.500.000.000"],
   ]
 ),
 "result_note":
   "3 dòng bất thường ở đầu: 2 NULL (không tính được) và 1 âm -40M (tồn kho âm do Bug-C). "
   "ORDER BY gia_tri_kho tự động đưa các dòng lỗi lên đầu — không cần WHERE để lọc riêng.",
 "note":
   "Khi thấy giá trị kho âm (-40M), không phải chỉ báo bug 'giá trị âm' — cần hỏi dev: "
   "logic trừ kho xảy ra ở đâu trong luồng (đặt đơn, xác nhận, xuất kho) và có ràng buộc "
   "ngăn stock < 0 không? Câu trả lời quyết định severity của bug.",
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
   [1, "ORD_001","PROD_001", 1,"30.000.000"],
   [2, "ORD_001","PROD_002", 1, "2.000.000"],
   [4, "ORD_002","PROD_001", 1,"30.000.000"],
   [5, "ORD_002","PROD_004", 1, "1.000.000"],
   [6, "ORD_003","PROD_003", 1, "8.000.000"],
   [7, "ORD_001","PROD_001", 1,"30.000.000"],
   [8, "ORD_005","PROD_004", 1, "1.000.000"],
   [9, "ORD_005","PROD_002", 1, "2.000.000"],
   [12,"ORD_003","PROD_002", 0, "1.500.000"],
   [13,"ORD_006","PROD_003", 1, "8.000.000"],
   [14,"ORD_007","PROD_004",20, "1.000.000"],
 ],
 "before_bugs": [8],
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
   "Item 12 (ORD_003/PROD_002): ghi giá 1.500.000 nhưng giá hiện tại của PROD_002 là 2.000.000 "
   "→ chênh lệch -500.000. Đây là dấu hiệu giá snapshot bị ghi sai lúc tạo đơn, "
   "không phải thay đổi giá hợp lệ sau đó.<br/>"
   "Câu này quan trọng khi team sửa giá sản phẩm: "
   "cần xác nhận đơn cũ đã dùng đúng giá cũ, không phải giá mới bị gán ngược.",
 "result_table": (
   ["order_id","product_id","gia_luc_ban","gia_hien_tai","chenh_lech"],
   [["ORD_003","PROD_002","1.500.000","2.000.000","-500.000"]],
 ),
 "result_note":
   "Item 12 (ORD_003/PROD_002) ghi giá 1.500.000 nhưng giá niêm yết PROD_002 là 2.000.000 — "
   "chênh -500.000. Cần xác nhận: giá PROD_002 từng là 1.500.000 trước đây (hợp lý), "
   "hay item này bị ghi sai giá ngay từ đầu (bug). Câu này nên chạy lại sau mỗi lần cập nhật bảng giá.",
 "note":
   "Không phải mọi chênh lệch giá đều là bug — khi có dòng trả về (như item 12 ở đây), "
   "cần phân biệt hai tình huống:<br/>"
   "(1) <b>Chênh lệch hợp lý</b>: giá sản phẩm tăng/giảm sau khi đơn đã đặt — "
   "oi.price đúng (giá tại thời điểm mua), p.price là giá mới. Không phải bug.<br/>"
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
    "dễ phát hiện đơn bất thường hoặc Bug-B khi đối chiếu với Câu 13."),
 ],
 "explain":
   "Thêm <b>WHERE status = 'COMPLETED'</b> là điều kiện bắt buộc trong mọi câu báo cáo doanh thu.<br/>"
   "Trong data mẫu, tổng total_amount hai đơn COMPLETED = 32M + 20M = 52M.<br/>"
   "Nhưng ORD_002 ghi total_amount = 20M trong khi tổng items thực = 31M (Bug-B) — "
   "tức 52M này đã thấp hơn thực tế. Đừng vội chốt một con số 'doanh thu thực' ở đây: "
   "cần làm sạch dữ liệu lệch (Câu 13) trước khi đưa vào báo cáo.",
 "result_table": (
   ["customer_name","order_id","total_amount","order_date"],
   [
     ["Nguyen Van A","ORD_001","32.000.000","2026-06-20"],
     ["Tran Van B",  "ORD_002","20.000.000","2026-06-22"],
   ]
 ),
 "result_note":
   "2 đơn COMPLETED, tổng 52M — nhưng ORD_002 ghi 20M trong khi tổng items thực là 31M (Bug-B), "
   "nên con số 52M chưa đáng tin.",
 "note":
   "Ngoài chuyện total_amount có thể sai, cần thống nhất với spec định nghĩa 'doanh thu':<br/>"
   "(1) Chỉ tính COMPLETED, hay gồm cả đơn đã giao nhưng status chưa kịp cập nhật?<br/>"
   "(2) Đơn COMPLETED nhưng sau đó bị hoàn trả (refund) có bị trừ khỏi doanh thu không?<br/>"
   "Trả lời sai một trong hai câu này thì báo cáo lệch dù câu SQL viết đúng.",
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
   ["ORD_006","C003","8.000.000","PENDING",  "2026-06-23"],
   ["ORD_007","C001","20.000.000","PENDING",  "2027-01-01"],
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
   "Trên MySQL, toán tử <b>/</b> luôn cho số thập phân nên viết 100 hay 100.0 đều ra đúng. "
   "Dùng <b>100.0</b> là thói quen an toàn khi mang câu lệnh sang SQL Server hoặc PostgreSQL — "
   "nơi chia hai số nguyên bị cắt mất phần thập phân (kết quả thành 0).<br/>"
   "Với data mẫu (7 đơn): PENDING = 42.9%, COMPLETED = 28.6%, CANCELLED = 28.6%.",
 "result_table": (
   ["status","so_don","phan_tram"],
   [
     ["PENDING",   3, "42.9"],
     ["COMPLETED", 2, "28.6"],
     ["CANCELLED", 2, "28.6"],
   ]
 ),
 "result_note":
   "PENDING chiếm tỷ lệ cao nhất (3/7 đơn, 42.9%) — đáng lo nếu trên production. "
   "Bao gồm ORD_004 (C999-orphan), ORD_006 (double order), ORD_007 (ngày tương lai). "
   "Câu này có giá trị thật khi chạy trên dữ liệu production đủ lớn để phát hiện xu hướng bất thường.",
 "note":
   "Hai lưu ý khi dùng câu này trên production:<br/>"
   "(1) <b>Trạng thái lạ</b>: nếu xuất hiện status không trong danh sách chuẩn, "
   "đây là dòng bất thường cần điều tra — kết hợp với Câu 11 (kỹ thuật ENUM check).<br/>"
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
   [1, "ORD_001","PROD_001", 1,"30.000.000"],
   [2, "ORD_001","PROD_002", 1, "2.000.000"],
   [4, "ORD_002","PROD_001", 1,"30.000.000"],
   [5, "ORD_002","PROD_004", 1, "1.000.000"],
   [6, "ORD_003","PROD_003", 1, "8.000.000"],
   [7, "ORD_001","PROD_001", 1,"30.000.000"],
   [8, "ORD_005","PROD_004", 1, "1.000.000"],
   [9, "ORD_005","PROD_002", 1, "2.000.000"],
   [12,"ORD_003","PROD_002", 0, "1.500.000"],
   [13,"ORD_006","PROD_003", 1, "8.000.000"],
   [14,"ORD_007","PROD_004",20, "1.000.000"],
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
     ["Dien thoai", 2,  3, "90.000.000"],
     ["Phu kien",   6, 26, "42.000.000"],
   ]
 ),
 "result_note":
   "'Dien thoai' dẫn đầu 90M — bị thổi phồng do item 7 trùng. Thực tế là 60M. "
   "'Phu kien' tăng mạnh lên 42M / 26 đơn vị (6 đơn) do item 14 có quantity=20 của ORD_007. "
   "Đây là ví dụ điển hình: một dòng dữ liệu bất thường (qty=20) đã kéo lệch toàn bộ báo cáo danh mục.",
 "note":
   "Kết quả chỉ có 2 danh mục vì INNER JOIN loại sản phẩm chưa bán — nếu báo cáo không đề cập "
   "đến điều này, người đọc có thể tưởng 'Dien thoai' và 'Phu kien' là toàn bộ danh mục. "
   "Trước khi tin vào doanh số 90M của 'Dien thoai', kiểm tra item trùng bằng Câu 4 — "
   "item 7 đang thổi phồng con số này lên 30M.",
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
   ["PROD_001","Phone IP15",        "Dien thoai","30.000.000", 50],
   ["PROD_002","Key Logi",     "Phu kien",  "2.000.000", 100],
   ["PROD_003","Headphone SN5", "Phu kien",  "8.000.000",  -5],
   ["PROD_004","Powerbank AK",       "Phu kien",  "1.000.000",  20],
   ["PROD_005","Key Logi",     "Phu kien",  "2.000.000",  30],
   ["PROD_006","Speaker JB",        "Phu kien",  "(NULL)",     10],
   ["PROD_007","Mouse RZ",       "Phu kien",  "1.500.000","(NULL)"],
   ["PROD_008","key logi",     "Phu kien",  "2.000.000", 25],
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
   "PROD_003: uoc_tinh_ban_dau = -5 + 2 = <b>-3</b> — tồn kho ước tính ban đầu âm, "
   "vật lý không thể xảy ra → xác nhận dữ liệu tồn kho đã sai ở đâu đó, cần điều tra.<br/>"
   "PROD_004: 20 + 22 = 42 — ước tính ban đầu 42 đơn vị nhưng chỉ còn 20, cần xem xét.<br/>"
   "PROD_001: 50 + 3 = 53 — lẽ ra phải là 52 nếu chỉ bán 2 unit, "
   "chênh 1 đơn vị chính xác bằng item 7 trùng.",
 "result_table": (
   ["product_id","product_name","ton_kho_hien_tai","tong_da_ban","uoc_tinh_ban_dau"],
   [
     ["PROD_001","Phone IP15",         50,  3,  53],
     ["PROD_002","Key Logi",      100,  2, 102],
     ["PROD_003","Headphone SN5",  -5,  2,  -3],
     ["PROD_004","Powerbank AK",         20, 22,  42],
     ["PROD_005","Key Logi",       30,  0,  30],
     ["PROD_006","Speaker JB",          10,  0,  10],
     ["PROD_007","Mouse RZ",    "(NULL)", 0,"(NULL)"],
     ["PROD_008","key logi",      25,  0,  25],
   ]
 ),
 "result_note":
   "PROD_003: uoc_tinh_ban_dau = -3 → bất khả thi, xác nhận tồn kho không nhất quán. "
   "PROD_004: uoc_tinh = 42 (đã bán 22, còn 20) — hợp lý về mặt số học nhưng cần kiểm tra vì tong_da_ban > stock. "
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
   ["ORD_006","C003","8.000.000","PENDING",  "2026-06-23"],
   ["ORD_007","C001","20.000.000","PENDING",  "2027-01-01"],
 ],
 "before_bugs": [5],
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
   "Kỹ thuật <b>GROUP BY nhiều cột + HAVING COUNT</b> — cùng mẫu với Câu 3 và Câu 4, "
   "áp dụng cho bảng Orders để phát hiện double submission.<br/>"
   "ORD_003 (CANCELLED) và ORD_006 (PENDING) cùng thuộc C003, cùng total_amount 8.000.000, "
   "cùng order_date 2026-06-23 → nhóm này có COUNT(*) = 2, vượt HAVING COUNT(*) &gt; 1.<br/>"
   "Câu này nên chạy sau mỗi đợt stress test hoặc khi khách phản ánh bị trừ tiền hai lần.",
 "result_table": (
   ["customer_id","total_amount","order_date","so_lan"],
   [["C003","8.000.000","2026-06-23",2]],
 ),
 "result_note":
   "C003 có 2 đơn cùng ngày 2026-06-23, cùng tổng tiền 8M — dấu hiệu double submission điển hình. "
   "ORD_003 (CANCELLED) và ORD_006 (PENDING) — cần xác minh đây là hai đơn riêng biệt hay cùng một đơn bị tạo hai lần.",
 "note":
   "Khi tìm thấy double order, trước khi xóa bản nào hỏi khách hoặc kiểm tra payment log: "
   "cả hai đơn có phát sinh transaction thanh toán không? Nếu có, đây là lỗi double-charge "
   "nghiêm trọng — cần hoàn tiền trước khi xóa bản thừa. "
   "Nếu chỉ một đơn được thanh toán, giữ đơn đó và hủy đơn còn lại. "
   "Câu này gộp theo ngày — trên hệ thống lưu cả giờ phút, double order thực tế thường cách "
   "nhau vài giây đến vài phút.",
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
   ["ORD_006","C003","8.000.000","PENDING",  "2026-06-23"],
   ["ORD_007","C001","20.000.000","PENDING",  "2027-01-01"],
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
    "Trong data mẫu (7 đơn): AVG ≈ 15.430.000 → ngưỡng ≈ 23.140.000. "
    "Chỉ ORD_001 (32M) vượt ngưỡng này."),
   ("ORDER BY total_amount DESC",
    "Đơn có giá trị cao nhất lên đầu để QA xem xét trước."),
 ],
 "explain":
   "Dùng <b>subquery trong WHERE</b> để so sánh từng dòng với một ngưỡng động "
   "tính từ chính bảng đó — không cần biết trước ngưỡng là bao nhiêu.<br/>"
   "AVG trong data mẫu (7 đơn) ≈ 15.430.000 → ngưỡng 1,5× ≈ 23.140.000.<br/>"
   "ORD_001 (32M) vượt ngưỡng và được flag. Điều này không có nghĩa là lỗi — "
   "đây là điểm khởi đầu để QA điều tra thêm bằng Câu 13.",
 "result_table": (
   ["order_id","customer_id","total_amount"],
   [["ORD_001","C001","32.000.000"]],
 ),
 "result_note":
   "ORD_001 (32M) vượt ngưỡng 1.5× trung bình (khoảng 23.140.000). "
   "Tổng tiền 32M là hợp lệ (30M + 2M), nhưng doanh thu từ items = 62M do item trùng — "
   "đây mới là bất thường thật sự, cần Câu 13 để phát hiện.",
 "note":
   "Ngưỡng 1.5× là điểm khởi đầu điều tra, không phải kết luận bug. "
   "Khi tìm thấy đơn vượt ngưỡng, hỏi: đơn B2B thường có giá trị lớn hơn B2C nhiều lần — "
   "cần phân tách hai nhóm trước khi so sánh. "
   "Bước tiếp theo khi flag được đơn: chạy Câu 13 để kiểm tra total_amount có khớp với tổng "
   "items không — đó mới là bằng chứng xác định lỗi, không phải chỉ vì giá trị lớn.",
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
   "dấu hiệu tài khoản nhân bản hoặc dữ liệu test được đánh số bằng tay, không phải tên thật.",
 "result_table": (
   ["customer_id","customer_name"],
   [["C009","Nguyen Van A (2)"]],
 ),
 "result_note":
   "1 bản ghi: C009 có tên chứa ngoặc và số — dấu hiệu dữ liệu test "
   "hoặc tài khoản nhân bản được đánh số thủ công.",
 "note":
   "C009 'Nguyen Van A (2)' là ví dụ điển hình của tài khoản nhân bản, đánh số bằng tay ở cuối tên "
   "để tạo bản ghi mới. Khi tìm thấy loại này, hỏi dev: hệ thống có validate định dạng tên "
   "ở tầng backend không, hay chỉ validate ở frontend? Nếu chỉ ở frontend, người dùng có thể "
   "gửi thẳng qua API call để lách. "
   "Pattern REGEXP có thể mở rộng cho ký tự đặc biệt khác, nhưng với tên tiếng Việt nên dùng "
   "whitelist thủ công hơn là blacklist.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 3, "id": 32,
 "title": "Tìm email không đúng định dạng cơ bản",
 "situation":
   "Câu 5 đã bắt email NULL và chuỗi rỗng. Câu này đi thêm một bước: "
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
    "Hai điều kiện này trùng với Câu 5 — nhắc lại ở đây để câu lệnh "
    "hoạt động độc lập, không cần chạy thêm câu khác."),
   ("OR email NOT LIKE '%@%'\n    OR email NOT LIKE '%.%'",
    "<b>NOT LIKE '%@%'</b>: email không chứa ký tự @ — không thể hợp lệ. "
    "<b>NOT LIKE '%.%'</b>: không có dấu chấm — thiếu phần domain (vd .com)."),
   ("SELECT customer_id,\n  customer_name, email",
    "Chiếu đủ thông tin để QA liên hệ xác nhận email thật."),
 ],
 "explain":
   "Câu này kiểm tra email theo <b>ba tầng</b>, từ thô đến tinh:<br/>"
   "(1) Tầng tồn tại: NULL hoặc chuỗi rỗng → không có email.<br/>"
   "(2) Tầng cấu trúc: thiếu @ → không thể là email hợp lệ.<br/>"
   "(3) Tầng domain: thiếu dấu chấm → không có phần .com/.vn.<br/>"
   "Cả ba tầng đều dựa trên LIKE nên chỉ chặn được lỗi thô — email 'có @ và có dấu chấm nhưng "
   "sai vị trí' vẫn lọt qua (xem Góc soi lỗi).",
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
   "LIKE chỉ kiểm tra ký tự @ và dấu chấm <b>có tồn tại</b> hay không — <b>không quan tâm vị trí "
   "hay thứ tự</b>. Nên các email sau vẫn lọt lưới dù rõ ràng sai:<br/>"
   "(1) <b>'user.name@'</b>: có @ và có dấu chấm (trong phần tên) nhưng <b>thiếu domain</b> sau @.<br/>"
   "(2) <b>'@domain.com'</b>: có @ và dấu chấm nhưng <b>thiếu phần tên</b> trước @.<br/>"
   "(Ngược lại, 'abc@' lại BỊ bắt — vì nó không có dấu chấm nào.)<br/>"
   "Để kiểm đúng thứ tự tên@domain.đuôi, dùng REGEXP:<br/>"
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
   [1, "ORD_001","PROD_001", 1,"30.000.000"],
   [2, "ORD_001","PROD_002", 1, "2.000.000"],
   [4, "ORD_002","PROD_001", 1,"30.000.000"],
   [5, "ORD_002","PROD_004", 1, "1.000.000"],
   [6, "ORD_003","PROD_003", 1, "8.000.000"],
   [7, "ORD_001","PROD_001", 1,"30.000.000"],
   [8, "ORD_005","PROD_004", 1, "1.000.000"],
   [9, "ORD_005","PROD_002", 1, "2.000.000"],
   [12,"ORD_003","PROD_002", 0, "1.500.000"],
   [13,"ORD_006","PROD_003", 1, "8.000.000"],
   [14,"ORD_007","PROD_004",20, "1.000.000"],
 ],
 "before_bugs": [8],
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
    "MySQL duyệt toàn bộ dòng chi tiết đơn trong bảng Order_Items."),
   ("WHERE quantity <= 0\n    OR quantity > 1000",
    "Hai điều kiện biên, dính <b>một</b> là bất thường:<br/>"
    "• <b>quantity &lt;= 0</b>: bắt số lượng <b>âm hoặc bằng 0</b> — ví dụ item 12 có "
    "quantity = 0 nên lọt vào đây.<br/>"
    "• <b>quantity &gt; 1000</b>: bắt số lượng <b>lớn bất thường</b>. Ngưỡng 1000 tùy ngành "
    "hàng (xem Góc soi lỗi)."),
   ("SELECT item_id, order_id,\n  product_id, quantity",
    "Chiếu đủ thông tin để QA xác định item nào vi phạm và thuộc đơn nào."),
 ],
 "explain":
   "Đây là cặp kiểm biên chuẩn cho mọi trường số lượng: chặn <b>biên dưới</b> (≤ 0) và "
   "<b>biên trên</b> (&gt; 1000) trong một câu.<br/>"
   "Một điểm tinh tế đáng nhớ: <b>hợp lệ về kỹ thuật chưa chắc hợp lý về nghiệp vụ</b>. Item 14 "
   "có quantity = 20 — nằm trong ngưỡng nên câu này KHÔNG bắt, nhưng mua 20 sạc dự phòng cùng "
   "lúc vẫn đáng để QA hỏi lại. Ngưỡng số chỉ lọc được cái 'không thể đúng'; còn cái 'đúng luật "
   "mà bất thường' thì phải cần mắt người soi.",
 "result_table": (
   ["item_id","order_id","product_id","quantity"],
   [[12,"ORD_003","PROD_002",0]],
 ),
 "result_note":
   "Item 12 (ORD_003/PROD_002) có quantity = 0 — vi phạm ràng buộc biên dưới. "
   "Một đơn hàng không thể chứa sản phẩm với số lượng bằng 0. "
   "Cần ADD CHECK CONSTRAINT hoặc validate tại tầng application để ngăn từ đầu.",
 "note":
   "(1) <b>Nhớ dùng &lt;= 0, không phải &lt; 0</b>: bẫy hay gặp là chỉ viết <b>quantity &lt; "
   "0</b> (bắt số âm) mà quên <b>quantity = 0</b> — vốn mới là ca phổ biến (item 12). Phải "
   "&lt;= 0 để gộp cả hai.<br/>"
   "(2) <b>Thấy quantity = 0 thì hỏi dev</b>: lỗi lúc nhập đơn, hay có luồng cố tình set 0 "
   "(hoàn trả, điều chỉnh)? Nếu là hoàn trả thì nên ghi vào bảng riêng, không để trong "
   "Order_Items với số lượng 0.<br/>"
   "(3) <b>Ngưỡng trên tùy ngành</b>: &gt; 1000 chỉ là ví dụ — bán lẻ B2C thì quantity &gt; 10 "
   "đã đáng ngờ, bán buôn B2B có thể &gt; 10.000 mới bất thường.<br/>"
   "(4) <b>Coi chừng NULL</b>: nếu cột quantity cho phép NULL (DB mẫu thì NOT NULL nên không "
   "gặp), dòng NULL sẽ lọt lưới vì NULL không thỏa cả hai vế so sánh — thêm <b>OR quantity IS "
   "NULL</b> khi cần.",
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
   ["ORD_006","C003","8.000.000","PENDING",  "2026-06-23"],
   ["ORD_007","C001","20.000.000","PENDING",  "2027-01-01"],
 ],
 "before_bugs": [6],
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
    "MySQL duyệt toàn bộ đơn trong bảng Orders."),
   ("WHERE order_date > CURDATE()\n    OR order_date < '2020-01-01'",
    "Hai điều kiện nối bằng OR — dính <b>một</b> trong hai là bất thường:<br/>"
    "• <b>order_date &gt; CURDATE()</b>: ngày đặt <b>ở tương lai</b>. CURDATE() luôn là ngày "
    "hôm nay của server nên câu lệnh không phải sửa lại theo thời gian. Ví dụ ORD_007 "
    "(2027-01-01) rơi vào nhánh này.<br/>"
    "• <b>order_date &lt; '2020-01-01'</b>: ngày <b>quá xa quá khứ</b>. Mốc 2020 là ngưỡng tự "
    "chọn — chỉnh theo thời điểm hệ thống của bạn bắt đầu hoạt động."),
   ("SELECT order_id, customer_id,\n  order_date",
    "Chiếu mã đơn, khách và ngày để QA truy lại nguồn gốc dòng dữ liệu bất thường."),
 ],
 "explain":
   "Bài học chính: <b>đừng tin tuyệt đối vào cột thời gian</b>. Ngày tháng là dữ liệu do người "
   "hoặc máy ghi vào nên vẫn có thể sai — lệch múi giờ, nhập tay nhầm, đồng hồ server chạy sai. "
   "Một phép kiểm biên đơn giản như câu này lọc ra ngay những giá trị 'không thể đúng'.<br/>"
   "Nên chạy định kỳ, nhất là sau khi deploy tính năng có xử lý thời gian/timezone.<br/>"
   "<i>Lưu ý khi thực hành: kết quả trên đúng khi bạn chạy TRƯỚC ngày 2027-01-01. Nếu chạy sau "
   "ngày đó, ORD_007 không còn là 'tương lai' nữa và kết quả sẽ rỗng — hãy sửa order_date của "
   "ORD_007 thành một ngày xa hơn hiện tại để tái hiện.</i>",
 "result_table": (
   ["order_id","customer_id","order_date"],
   [["ORD_007","C001","2027-01-01"]],
 ),
 "result_note":
   "ORD_007 có order_date = 2027-01-01 — hơn nửa năm trong tương lai so với hôm nay. "
   "Cần xác minh: đây là đặt hàng trước (pre-order) được phép, hay dữ liệu bị nhập sai ngày?",
 "note":
   "Cạm bẫy timezone: CURDATE() trả về ngày theo timezone của MySQL server.<br/>"
   "Nếu app chạy ở timezone khác, ngày có thể lệch nhau quanh nửa đêm: "
   "đơn đặt lúc 06:30 sáng 25/06 giờ Việt Nam (UTC+7) = 23:30 đêm 24/06 giờ UTC — "
   "app hiển thị ngày 25 nhưng server UTC ghi ngày 24.<br/>"
   "Khi nghi ngờ timezone gây báo nhầm, siết lại bằng độ lệch GIỜ thay vì chỉ so ngày: "
   "<b>TIMESTAMPDIFF(HOUR, order_date, NOW()) &lt; -8</b>. Điều kiện này chỉ giữ đơn ở tương "
   "lai <b>quá 8 giờ</b> — tức <b>bỏ qua</b> những đơn chỉ lệch tương lai vài giờ (phần lớn do "
   "chênh timezone, không phải bug thật). Ngưỡng 8 giờ chỉnh theo khoảng cách múi giờ của hệ thống bạn.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 3, "id": 35,
 "title": "Tìm tên sản phẩm trùng sau khi chuẩn hóa",
 "situation":
   "Câu 10 bắt trùng khi hai dòng gõ <b>y hệt</b> nhau. Nhưng cùng một sản phẩm nhập hai lần "
   "thường bị gõ lệch nhau chút ít — chữ hoa/thường khác, dư vài khoảng trắng — và khi đó so "
   "tên thô sẽ bỏ sót. Câu này chuẩn hóa tên (về chữ thường, cắt khoảng trắng) <b>trước khi</b> "
   "so, để những cặp 'trông khác mà thực ra là một' vẫn lộ ra.",
 "before_label": "Bảng Products — dòng đỏ: tên trùng sau khi LOWER + TRIM:",
 "before_cols": ["product_id","product_name","category","price","stock"],
 "before_rows": [
   ["PROD_001","Phone IP15",        "Dien thoai","30.000.000", 50],
   ["PROD_002","Key Logi",     "Phu kien",  "2.000.000", 100],
   ["PROD_003","Headphone SN5", "Phu kien",  "8.000.000",  -5],
   ["PROD_004","Powerbank AK",       "Phu kien",  "1.000.000",  20],
   ["PROD_005","Key Logi",     "Phu kien",  "2.000.000",  30],
   ["PROD_006","Speaker JB",        "Phu kien",  "(NULL)",     10],
   ["PROD_007","Mouse RZ",       "Phu kien",  "1.500.000","(NULL)"],
   ["PROD_008","key logi",     "Phu kien",  "2.000.000", 25],
 ],
 "before_bugs": [1, 4, 7],
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
    "MySQL tải toàn bộ bảng Products — 8 sản phẩm."),
   ("GROUP BY LOWER(TRIM(product_name))",
    "Điểm mấu chốt: gom nhóm theo tên <b>đã chuẩn hóa</b>, không phải tên thô.<br/>"
    "• <b>LOWER</b> hạ hết về chữ thường — 'Key Logi' và 'key logi' "
    "thành một.<br/>"
    "• <b>TRIM</b> cắt khoảng trắng thừa hai đầu — '  key logi  ' cũng gộp vào.<br/>"
    "Nhờ vậy PROD_002, PROD_005 (viết hệt nhau) và PROD_008 (viết thường + dư khoảng trắng) đều "
    "rơi vào cùng một nhóm 'key logi'."),
   ("HAVING COUNT(*) > 1",
    "Chỉ giữ nhóm có nhiều hơn 1 bản ghi — tức tên bị trùng sau khi chuẩn hóa. Ở đây nhóm "
    "'key logi' có 3 bản ghi nên bị bắt."),
 ],
 "explain":
   "Câu 10 so tên <b>thô</b> nên chỉ bắt được các bản ghi gõ y hệt nhau. Nhưng trùng trong "
   "thực tế thường 'tinh vi' hơn: cùng một sản phẩm bị nhập hai lần với cách gõ khác nhau — "
   "hoa/thường lệch, dư khoảng trắng.<br/>"
   "Chuẩn hóa <b>LOWER + TRIM trước khi gom nhóm</b> xóa các khác biệt vô nghĩa đó, nên bắt "
   "được cả những cặp mà so thô bỏ sót. Trong data mẫu, PROD_008 chính là ca đó — Câu 10 không "
   "thấy nó, còn câu này gộp chung với PROD_002/005 thành nhóm 3 bản ghi.<br/>"
   "Đây cũng là kỹ thuật chuẩn hóa đã dùng cho email ở Câu 8, nay áp cho tên sản phẩm.",
 "result_table": (
   ["ten_chuan","so_ban_ghi"],
   [["key logi", 3]],
 ),
 "result_note":
   "'key logi' xuất hiện 3 lần: PROD_002, PROD_005 (viết hệt nhau) và PROD_008 "
   "(viết thường + dư khoảng trắng). Câu 10 so tên thô chỉ bắt được PROD_002/005; riêng PROD_008 "
   "chỉ lộ ra sau khi LOWER+TRIM — đó chính là giá trị của bước chuẩn hóa.",
 "note":
   "Kết quả câu này chỉ cho tên đã chuẩn hóa và số lần trùng — chưa biết product_id nào. Để "
   "lấy đầy đủ thông tin các bản ghi trùng, ghép ngược lại bằng một JOIN với chính nhóm đó:<br/>"
   "<b>SELECT p.*</b><br/>"
   "<b>FROM Products p</b><br/>"
   "<b>JOIN (SELECT LOWER(TRIM(product_name)) AS ten_chuan</b><br/>"
   "<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FROM Products GROUP BY LOWER(TRIM(product_name))</b><br/>"
   "<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HAVING COUNT(*) &gt; 1) dup</b><br/>"
   "<b>&nbsp;&nbsp;ON LOWER(TRIM(p.product_name)) = dup.ten_chuan;</b><br/>"
   "Trả về đủ PROD_002, PROD_005 và PROD_008.<br/>"
   "<b>Cạm bẫy MySQL 8.0:</b> nếu viết dạng <b>WHERE LOWER(TRIM(product_name)) IN (SELECT ... "
   "GROUP BY ... HAVING COUNT(*)&gt;1)</b>, chế độ <b>only_full_group_by</b> (bật mặc định) có "
   "thể báo lỗi khi MySQL biến subquery thành phép ghép trong. Viết dạng JOIN như trên thì tránh được.",
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
   ("FROM Customers",
    "Duyệt bảng Customers — nơi tài khoản test/demo có thể lẫn giữa khách hàng thật."),
   ("WHERE LOWER(customer_name)\n  LIKE '%test%'",
    "Điều kiện lọc chính, ghép từ ba mảnh:<br/>"
    "• <b>LOWER(...)</b> đưa tên về chữ thường trước khi so — nhờ vậy bắt được cả 'Test', "
    "'TEST', 'test'.<br/>"
    "• <b>LIKE</b> so khớp theo <i>mẫu</i>, không cần bằng tuyệt đối.<br/>"
    "• <b>%test%</b>: dấu % nghĩa là 'có gì cũng được', nên '%test%' = 'tên chứa chữ test ở "
    "bất kỳ đâu'.<br/>"
    "Ví dụ 'Khach Test VIP' có chứa 'test' → khớp."),
   ("LOWER(IFNULL(email,''))\n  LIKE '%test%'",
    "Cùng cách trên nhưng soi thêm cột <b>email</b>. Có một bẫy NULL: nếu email trống (NULL) "
    "thì LOWER(NULL) ra NULL, và LIKE với NULL luôn cho 'không xác định' → dòng đó bị bỏ sót.<br/>"
    "<b>IFNULL(email,'')</b> thay NULL bằng chuỗi rỗng trước, để dòng email trống vẫn được xét "
    "bình thường (chỉ là không khớp từ khóa nào)."),
   ("OR ... OR ...",
    "Tất cả điều kiện trên nối với nhau bằng <b>OR</b> — chỉ cần <b>một</b> từ khóa khớp "
    "(trong tên hoặc email) là dòng đó bị bắt. Mỗi từ khóa nghi vấn ('test', 'demo', 'fake', "
    "'ao bug') là một nhánh riêng.<br/>"
    "Riêng <b>'ao bug'</b> đặt thêm để bắt đúng dòng mẫu 'Khach Hang Ao Bug' trong DB thực "
    "hành — hệ thống thật nên thay bằng quy ước đặt tên test data của chính team bạn."),
 ],
 "explain":
   "Khác với các câu trước (so khớp giá trị chính xác, kiểm ràng buộc), câu này <b>đoán</b> "
   "bản ghi test từ <b>ý nghĩa cái tên</b> — dò xem tên hoặc email có chứa các từ gợi ý như "
   "'test', 'demo' không.<br/>"
   "Vì chỉ dựa vào cái tên, kết quả là một <b>danh sách nghi ngờ</b> chứ không phải bằng chứng "
   "chắc chắn — nó chính xác tới đâu hoàn toàn phụ thuộc vào bộ từ khóa bạn liệt kê "
   "(xem thêm hạn chế ở Góc soi lỗi).",
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
   "Cách dò theo từ khóa có hai rủi ro cần lường trước:<br/>"
   "(1) <b>Bắt nhầm (dương tính giả)</b>: khách thật có tên chứa từ khóa — công ty 'Testco', "
   "hay một cái tên lỡ có chuỗi 'demo' — cũng bị dính. Giảm bằng cách siết từ khóa cho chặt hơn "
   "(ví dụ khớp tiền tố 'test_' thay vì '%test%' quá rộng).<br/>"
   "(2) <b>Bỏ sót (âm tính giả)</b>: dữ liệu test đặt tên khéo, không chứa từ khóa nào, sẽ lọt "
   "qua — đây là giới hạn cố hữu của cách dò theo tên, không phải lỗi kỹ thuật.<br/>"
   "Phòng ngừa tận gốc: thêm cột <b>is_test_data</b> đánh dấu ngay lúc tạo bản ghi, thay vì suy "
   "luận ngược từ tên — khi đó chỉ cần lọc theo cột này, hết cả bắt nhầm lẫn bỏ sót.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 3, "id": 37,
 "title": "Dò bản ghi gần-trùng bằng SOUNDEX (lỗi gõ chính tả)",
 "situation":
   "Câu 8 và Câu 35 bắt trùng nhờ chuẩn hóa hoa/thường và khoảng trắng — nhưng cả hai đều cần "
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
   ("FROM Customers a\n  JOIN Customers b",
    "<b>Self-join</b> — bảng Customers tự ghép với chính nó: hình dung có hai bản sao cùng "
    "bảng, đặt tên <b>a</b> và <b>b</b>, rồi xét từng cặp (một dòng ở a với một dòng ở b) xem "
    "tên có nghe giống nhau không.<br/>"
    "Lưu ý: điều kiện ghép bọc trong hàm SOUNDEX() nên MySQL không dùng được index — phải so "
    "mọi dòng với mọi dòng, rất nặng trên bảng lớn (xem Góc soi lỗi)."),
   ("ON SOUNDEX(a.customer_name)\n     = SOUNDEX(b.customer_name)",
    "Điều kiện ghép cặp: <b>SOUNDEX</b> chuyển mỗi tên thành một <b>mã phát âm</b> — bắt đầu "
    "bằng chữ cái đầu, tiếp theo là các số mã hóa phụ âm (bỏ nguyên âm và ký tự không phải chữ). "
    "Hai tên đọc gần giống sẽ ra cùng mã và được ghép thành một cặp.<br/>"
    "Ví dụ: 'Nguyen Van A' và 'Nguyen Van A (2)' đều cho mã <b>N2515</b> (SOUNDEX bỏ qua phần "
    "' (2)') → ghép thành cặp nghi trùng."),
   ("AND a.customer_id\n  < b.customer_id",
    "Điều kiện chống đếm trùng cặp. Nếu bỏ dòng này:<br/>"
    "• mỗi cặp hiện 2 lần — cả (a ghép b) lẫn (b ghép a);<br/>"
    "• mỗi dòng còn tự khớp với chính nó (tên luôn trùng mã với chính nó).<br/>"
    "Điều kiện <b>a.customer_id &lt; b.customer_id</b> chỉ giữ lại một chiều, loại cả hai "
    "trường hợp thừa trên."),
 ],
 "explain":
   "Điểm cốt lõi: câu này đổi <b>thước đo</b> so trùng từ <b>ký tự</b> sang <b>âm đọc</b>. "
   "Các cách trước cần hai chuỗi giống hệt nhau sau khi chuẩn hóa; còn ở đây, chỉ cần đọc lên "
   "nghe gần giống là bị ghép cặp — nhờ vậy bắt được loại trùng do lỗi đánh máy mà cách so "
   "ký tự bỏ sót.",
 "result_table": (
   ["id_a","ten_a","id_b","ten_b"],
   [["C001","Nguyen Van A","C009","Nguyen Van A (2)"]],
 ),
 "result_note":
   "1 cặp phát âm giống nhau. Đây là cùng cặp Câu 31 đã phát hiện qua dấu hiệu khác (ký tự "
   "số/ngoặc trong tên) — SOUNDEX hữu ích nhất khi lỗi gõ không để lại dấu hiệu ký tự rõ ràng "
   "như vậy, ví dụ 'Nguyen Van A' bị gõ nhầm thành 'Nguyenn Van A'.",
 "note":
   "Vài hạn chế cần biết trước khi dùng cách dò theo âm này:<br/>"
   "(1) <b>Kém với tiếng Việt có dấu</b>: SOUNDEX vốn cho tiếng Anh, nên bỏ dấu ('Nguyễn' → "
   "'Nguyen') trước khi so để tăng độ chính xác.<br/>"
   "(2) <b>Dễ báo nhầm với tên ngắn</b>: nhiều tên ngắn khác nghĩa vẫn ra cùng mã → luôn xác "
   "nhận bằng mắt trước khi xử lý, tuyệt đối không tự động xóa hay gộp.<br/>"
   "(3) <b>Cảnh báo hiệu năng — đừng chạy nguyên câu này trên bảng lớn</b>: nó ghép mọi dòng "
   "với mọi dòng, lại bọc hàm nên không xài được index; số khách càng nhiều thì chi phí phình "
   "theo cấp số nhân (khoảng N×N). 10 dòng demo thì tức thì, nhưng bảng khách thật hàng trăm "
   "nghìn dòng có thể chạy hàng giờ hoặc làm nghẽn DB. Cách chạy an toàn: lọc trước bằng "
   "<b>WHERE</b> để thu hẹp phạm vi (theo khu vực, theo ngày tạo gần đây...); hoặc thêm cột "
   "<b>soundex_name</b> tính sẵn + đánh index rồi so trên cột đó (hết bọc hàm); và luôn chạy "
   "trên bản sao read-only (xem chương 'Chạy SQL an toàn trên production').",
},
# ─────────────────────────────────────────────────────────
{
 "part": 3, "id": 38,
 "title": "Phát hiện đơn có tổng tiền nhưng không có sản phẩm nào",
 "situation":
   "Câu 16 đã tìm đơn rỗng (không có items). Câu này thêm điều kiện: "
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
    "<b>LEFT JOIN</b> giữ lại <b>tất cả</b> đơn, kể cả đơn không có dòng item nào. "
    "Với đơn có items, mỗi item ghép thành một dòng; với đơn rỗng, phần cột của Order_Items "
    "bị bỏ trống — tức <b>oi.order_id = NULL</b>.<br/>"
    "Ví dụ ORD_004 không có item nào → sau LEFT JOIN, dòng ORD_004 vẫn còn nhưng oi.order_id "
    "để trống. (Nếu dùng INNER JOIN, ORD_004 sẽ biến mất — không bắt được đơn rỗng.)"),
   ("WHERE o.total_amount > 0\n  AND  oi.order_id IS NULL",
    "Hai điều kiện phải thỏa cùng lúc:<br/>"
    "• <b>total_amount &gt; 0</b>: đơn có ghi nhận số tiền.<br/>"
    "• <b>oi.order_id IS NULL</b>: nhưng không có item nào — chính là dấu hiệu đơn rỗng lộ ra "
    "ở bước LEFT JOIN trên.<br/>"
    "Ghép lại: đơn <b>có tiền mà không có sản phẩm</b> — một mâu thuẫn nghiêm trọng."),
   ("SELECT o.order_id, o.customer_id,\n  o.total_amount, o.status",
    "Chiếu đủ thông tin để QA điều tra tiếp: đơn của khách nào, ghi bao nhiêu tiền, đang ở "
    "trạng thái gì."),
 ],
 "explain":
   "Vì sao đơn rỗng-có-tiền xếp mức nghiêm trọng hơn đơn rỗng thường? Vì hệ thống đang ghi nhận "
   "một khoản tiền mà <b>không có dòng hàng nào chống lưng</b> để đối chiếu — không cách nào biết "
   "5M đó đúng hay sai, từ đâu ra. Số tiền 'lơ lửng' như vậy là rủi ro toàn vẹn tài chính, không "
   "chỉ là bản ghi thừa.<br/>"
   "Một bài học soi lỗi đi kèm: <b>dữ liệu bẩn thật thường trượt nhiều phép kiểm cùng lúc</b>. "
   "ORD_004 vừa rỗng-có-tiền (câu này), vừa gắn customer_id C999 không tồn tại (Câu 7) — hai lỗi "
   "độc lập chồng lên một dòng. Nên khi bắt được một đơn kiểu này, đừng dừng ở một phát hiện: "
   "soi luôn các dấu hiệu lân cận (khách có thật không, trạng thái có hợp lý không).",
 "result_table": (
   ["order_id","customer_id","total_amount","status"],
   [["ORD_004","C999","5.000.000","PENDING"]],
 ),
 "result_note":
   "ORD_004: 5M nhưng không có sản phẩm nào. Thêm vào đó: C999 không tồn tại. "
   "Đây là đơn hàng 'ma' — cần điều tra log xem được tạo như thế nào.",
 "note":
   "(1) <b>Cạm bẫy khi dùng LEFT JOIN để tìm đơn không có bản ghi con</b>: điều kiện lọc bảng "
   "con phải đặt <b>đúng chỗ</b>. "
   "<b>oi.order_id IS NULL phải nằm ở WHERE</b> (lọc sau khi đã LEFT JOIN); nếu vô ý chuyển nó "
   "lên ON thì không đơn nào bị loại và kết quả trả về sai bét. Và phải kiểm IS NULL trên "
   "<b>cột khóa</b> của bảng con (oi.order_id) — chọn nhầm một cột vốn cho phép NULL thì kết "
   "quả không còn tin được.<br/>"
   "(2) <b>Hỏi trước khi kết luận là bug</b>: đơn có tiền mà không item thường do bước tạo đơn "
   "và bước thêm item <b>không nằm chung một transaction</b> — tạo đơn xong nhưng thêm item "
   "thất bại giữa chừng, để lại cái vỏ có tiền mà rỗng ruột. Cũng có thể là đơn điều chỉnh/hoàn "
   "phí cố ý không gắn sản phẩm. Biết nhóm nguyên nhân giúp hỏi đúng người (dev hay vận hành).",
},
# ─────────────────────────────────────────────────────────
{
 "part": 3, "id": 39,
 "title": "Phát hiện tổng items vượt quá 1.5 lần total_amount",
 "situation":
   "Câu 13 bắt mọi đơn có tổng items khác total_amount dù chỉ 1 đồng. "
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
    "Đơn không có item (ORD_004) bị loại — không có items thì không có tổng để so sánh. "
    "Nếu cần phát hiện cả đơn rỗng, dùng LEFT JOIN và lọc WHERE oi.item_id IS NULL."),
   ("GROUP BY o.order_id, o.total_amount",
    "Gom tất cả items của cùng một đơn để tính tổng."),
   ("HAVING SUM(oi.quantity * oi.price)\n         > o.total_amount * 1.5",
    "<b>HAVING</b> so sánh sau aggregate: "
    "tổng items > 1.5 lần total_amount là bất thường. "
    "Ngưỡng 1.5× để bỏ qua chênh lệch nhỏ do phí vận chuyển, discount."),
 ],
 "explain":
    "Hai mức độ kiểm tra khác nhau: Câu 13 bắt <b>mọi</b> chênh lệch dù nhỏ, "
    "câu này chỉ bắt khi tổng items vượt <b>1.5 lần</b> total_amount.<br/>"
    "<b>Vì sao là 1.5×?</b> Tiền hàng và total_amount thường lệch nhau chút ít vì lý do hợp lệ "
    "— phí vận chuyển, giảm giá, làm tròn — nhưng các khác biệt này hiếm khi vượt vài chục phần "
    "trăm. Đặt ngưỡng ở mức +50% là để bỏ qua vùng 'nhiễu' đó: đã vượt 1.5× thì gần như chắc "
    "chắn là lỗi dữ liệu thật, không phải phí hay khuyến mãi. Đây là tham số nghiệp vụ — mỗi hệ "
    "thống nên tự chỉnh (các mức thay thế xem ở Góc soi lỗi).<br/>"
    "ORD_001: items 62M &gt; 48M (= 32M × 1.5) → bị bắt (do item trùng).<br/>"
    "ORD_002: items 31M &gt; 30M (= 20M × 1.5), tỷ lệ ≈ 1,55× — chỉ <b>vừa đủ</b> vượt ngưỡng → "
    "bị bắt (do Bug-B: total_amount ghi thấp). Nếu nâng ngưỡng lên 2× thì cả ORD_001 (1,94×) lẫn "
    "ORD_002 (1,55×) đều lọt lưới — cho thấy chọn con số nào quyết định ranh giới 'bao nhiêu thì "
    "coi là bất thường'.",
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
    "(2) <b>!= (bất kỳ lệch)</b>: bắt tất cả sai lệch dù nhỏ (Câu 13).<br/>"
    "(3) <b>&gt; 2×</b>: chỉ bắt lệch nghiêm trọng nhất.<br/>"
    "Với hệ thống có discount, nên kết hợp thêm điều kiện "
    "loại trừ đơn có coupon trước khi áp ngưỡng.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 4, "id": 40,
 "title": "Truy vết item còn sót của đơn đã xóa mềm",
 "situation":
   "Câu 12 đã phát hiện đơn ORD_005 bị <b>xóa mềm</b> (cột deleted_at có giá trị) "
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
    "<b>INNER JOIN</b> ghép mỗi dòng item với đơn cha của nó (khớp theo order_id), để đọc được "
    "cột <b>deleted_at</b> — cột này nằm bên bảng Orders, không có trong Order_Items.<br/>"
    "Ví dụ item 8 mang order_id = ORD_005 → JOIN sang Orders lấy được trạng thái xóa mềm của "
    "đơn ORD_005."),
   ("WHERE o.deleted_at IS NOT NULL",
    "Chỉ giữ lại item thuộc đơn đã bị <b>xóa mềm</b> — tức đơn cha có deleted_at khác NULL "
    "(đã đánh dấu xóa, lẽ ra không còn hiệu lực).<br/>"
    "Với dữ liệu mẫu chỉ ORD_005 có deleted_at, nên chỉ item 8 và 9 lọt qua; item của các đơn "
    "khác (deleted_at trống) đều bị loại."),
   ("ORDER BY oi.item_id",
    "Sắp xếp theo item_id để dễ đối chiếu ngược lại với bảng Order_Items gốc."),
 ],
 "explain":
   "Câu 12 soi <b>bảng cha</b> (Orders) để tìm đơn bị xóa mềm; câu này đi tiếp xuống "
   "<b>bảng con</b> (Order_Items) tìm những dòng chi tiết bị bỏ lại.<br/>"
   "Đây là mẫu kiểm tra <b>tính nhất quán khi xóa mềm</b>: đã xóa (mềm) đơn cha thì các dòng "
   "con cũng phải được đánh dấu hoặc loại khỏi mọi phép tính. Nếu không, dữ liệu con 'sống' "
   "lâu hơn dữ liệu cha, và mọi con số cộng từ bảng con đều lệch.<br/>"
   "Điểm mấu chốt: bug ở đây không nằm ở một dòng sai giá trị, mà ở <b>thao tác xóa làm nửa "
   "vời</b> — dọn cha nhưng quên con.",
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
   "(1) <b>Điểm mù của câu lệnh</b>: INNER JOIN chỉ bắt được item mà đơn cha <b>còn</b> trong "
   "bảng Orders (bị xóa mềm). Nếu đơn cha bị <b>xóa cứng</b> (xóa hẳn dòng khỏi Orders), item "
   "con thành mồ côi thật sự nhưng câu này KHÔNG thấy — vì INNER JOIN đã loại luôn dòng không "
   "tìm được cha. Muốn bắt cả trường hợp đó, đối chiếu order_id của item với danh sách đơn tồn "
   "tại bằng <b>LEFT JOIN ... WHERE o.order_id IS NULL</b>.<br/>"
   "(2) <b>Hỏi dev về ý đồ</b>: xóa mềm một đơn CÓ nên tự động dọn (hoặc đánh dấu) item con "
   "không? Nếu có mà code chưa làm → bug ở luồng xóa; nên xóa cha và con trong <b>cùng một "
   "transaction</b> để không bỏ sót nửa vời.",
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
   ("FROM Orders",
    "MySQL bắt đầu từ đây: lấy toàn bộ đơn trong bảng Orders, rồi các bước sau mới lọc và "
    "gán nhãn trên đó."),
   ("WHERE (status = 'CANCELLED'\n    AND deleted_at IS NULL)\n  OR (status <> 'CANCELLED'\n    AND deleted_at IS NOT NULL)",
    "Bước lọc, chạy ngay sau FROM — chỉ giữ những đơn có hai cột dấu vết <b>lệch nhau</b>. "
    "Hai vế OR bắt hai chiều lệch:<br/>"
    "• <b>status = 'CANCELLED' AND deleted_at IS NULL</b>: đã hủy nhưng chưa xóa mềm "
    "(ví dụ ORD_003).<br/>"
    "• <b>status &lt;&gt; 'CANCELLED' AND deleted_at IS NOT NULL</b>: đã xóa mềm nhưng trạng "
    "thái chưa chuyển sang hủy.<br/>"
    "Đơn nào có hai cột <b>khớp nhau</b> (cùng đã hủy, hoặc cùng còn bình thường) đều không "
    "lọt qua bước này."),
   ("CASE WHEN ... THEN ...\n  END AS van_de",
    "Thuộc phần SELECT nên chạy <b>sau</b> WHERE, dù được viết ở đầu câu lệnh.<br/>"
    "Trên các đơn đã lọc, CASE dán cho mỗi đơn một <b>nhãn mô tả</b> đúng chiều lệch của nó "
    "vào cột <b>van_de</b> — một trong hai chuỗi: 'Hủy nhưng chưa xóa mềm' hoặc 'Xóa mềm nhưng "
    "status chưa CANCELLED'.<br/>"
    "Nhờ nhãn sẵn này, QA đọc kết quả là biết ngay đơn sai kiểu gì, khỏi phải tự đối chiếu."),
   ("ORDER BY order_id",
    "Sắp xếp theo mã đơn cho dễ tra cứu."),
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
   "(1) <b>Hỏi dev trước khi kết luận</b>: đơn CANCELLED mà deleted_at trống là <b>bug của một "
   "bước bị thiếu</b> trong luồng hủy đơn, hay quy trình cố ý tách riêng hai bước? Hai câu trả "
   "lời dẫn tới hai hướng xử lý khác nhau — nếu là cố ý, phải rà lại mọi báo cáo/màn hình đang "
   "lọc theo deleted_at xem có bỏ sót đơn đã hủy không.<br/>"
   "(2) <b>Gốc rễ thường nằm ở code</b>: nên cập nhật status và deleted_at trong <b>cùng một "
   "transaction</b>, tránh cập nhật nửa vời (half-update — sửa được cột này nhưng cột kia chưa "
   "kịp) khiến hai cột lệch nhau.",
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
   ["ORD_006","C003","PENDING",  "2026-06-23"],
   ["ORD_007","C001","PENDING",  "2027-01-01"],
 ],
 "before_bugs": [3, 5],
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
   ("FROM Orders",
    "MySQL bắt đầu từ đây: lấy toàn bộ đơn trong bảng Orders làm tập dữ liệu, "
    "rồi các bước sau mới lọc và tính toán trên đó."),
   ("WHERE status = 'PENDING'\n  AND DATEDIFF('2026-06-30',\n        order_date) > 3",
    "Bước lọc, chạy ngay sau FROM — chỉ giữ đơn thỏa <b>cả hai</b> điều kiện:<br/>"
    "• <b>status = 'PENDING'</b>: đơn đang treo, chưa xử lý xong.<br/>"
    "• <b>DATEDIFF('2026-06-30', order_date) &gt; 3</b>: đã treo quá 3 ngày.<br/>"
    "Trong đó <b>DATEDIFF(mốc, ngày_đặt)</b> là số ngày từ ngày đặt đơn đến mốc chốt sổ 30-06. "
    "Ví dụ đơn đặt 24-06 → cách 30-06 là 6 ngày, lớn hơn 3 nên được giữ lại.<br/>"
    "Ngưỡng 3 ngày chỉ là ví dụ — tùy SLA (cam kết thời gian xử lý) của mỗi hệ thống.<br/>"
    "Lưu ý: DATEDIFF bọc quanh cột order_date khiến điều kiện này chậm trên bảng lớn "
    "(<b>non-sargable</b>) — chi tiết và cách viết nhanh hơn xem ở Góc soi lỗi."),
   ("DATEDIFF('2026-06-30', order_date)\n  AS so_ngay_ton_dong",
    "Thuộc phần SELECT nên chạy <b>sau</b> WHERE, dù được viết ở đầu câu lệnh.<br/>"
    "Nó lấy chính con số 'số ngày treo' vừa dùng để lọc và <b>hiển thị thành một cột riêng</b> "
    "(đặt tên <b>so_ngay_ton_dong</b>) để đọc và sắp xếp.<br/>"
    "Dùng mốc cố định 2026-06-30 (thay vì ngày hôm nay) để con số trong sách không đổi mỗi lần chạy."),
   ("ORDER BY so_ngay_ton_dong DESC",
    "Sắp xếp giảm dần theo số ngày treo — đơn treo lâu nhất lên đầu, để ưu tiên xử lý trước."),
 ],
 "explain":
   "Câu này săn đơn <b>tồn đọng</b> — đơn có ngày đặt hợp lệ nhưng trạng thái mắc kẹt ở PENDING "
   "quá lâu. (Khác Câu 34: câu đó bắt ngày <b>vô lý</b> như ngày tương lai.)<br/>"
   "Bộ lọc gồm hai điều kiện phải thỏa cùng lúc: trạng thái là <b>PENDING</b>, và số ngày treo "
   "(tính đến mốc 30-06) phải <b>lớn hơn 3</b>. Bảng dưới cho thấy câu lệnh quyết định giữ hay "
   "loại từng đơn thế nào:",
 "explain_table": (
   ["Đơn", "Trạng thái", "Số ngày treo (đến 30-06)", "Kết quả"],
   [
     ["ORD_006", "PENDING", "7  (&gt; 3)", "Giữ lại"],
     ["ORD_004", "PENDING", "6  (&gt; 3)", "Giữ lại"],
     ["ORD_001", "COMPLETED", "10", "Loại — không PENDING"],
     ["ORD_007", "PENDING", "−185 (đơn tương lai)", "Loại — không quá 3 ngày"],
   ],
 ),
 "result_table": (
   ["order_id","customer_id","status","order_date","so_ngay_ton_dong"],
   [
     ["ORD_006","C003","PENDING","2026-06-23",7],
     ["ORD_004","C999","PENDING","2026-06-24",6],
   ]
 ),
 "result_note":
   "ORD_006 treo 7 ngày — đây cũng là đơn double order với ORD_003 (Câu 29). "
   "ORD_004 treo 6 ngày — customer_id C999 không tồn tại (Câu 7). "
   "Đơn treo lâu là nơi nên soi kỹ vì thường đi kèm nhiều lỗi khác.",
 "note":
   "(1) <b>Đừng quên mốc thời gian</b>: mốc 30-06 ở đây là cố định để ví dụ chạy ra kết quả "
   "ổn định. Nếu bê nguyên lên hệ thống thật mà quên đổi thành <b>CURDATE()</b>, câu lệnh sẽ "
   "đo theo một ngày đứng yên — 'tuổi đơn' tính ra ngày càng sai mà không báo lỗi gì. Khi giám "
   "sát thực tế, luôn đo theo ngày hiện tại.<br/>"
   "(2) <b>Cạm bẫy hiệu năng (non-sargable)</b>: bọc hàm quanh cột — <b>DATEDIFF(order_date) "
   "&gt; 3</b> — khiến dù order_date có index, MySQL vẫn phải tính DATEDIFF cho <b>từng dòng</b> "
   "thay vì dùng index, nên chậm trên bảng lớn. Viết lại dạng dùng được index (cùng kết quả):<br/>"
   "<b>WHERE status = 'PENDING'</b><br/>"
   "<b>  AND order_date &lt; DATE_SUB(CURDATE(), INTERVAL 3 DAY);</b>",
},
# ─────────────────────────────────────────────────────────
{
 "part": 4, "id": 43,
 "title": "Dựng dòng thời gian đơn hàng — khoảng cách giữa các đơn",
 "situation":
   "Mỗi đơn hàng đến vào một thời điểm, và khoảng cách giữa các đơn liên tiếp cho biết "
   "<b>nhịp đặt đơn</b> của hệ thống. Câu này xếp đơn theo thời gian rồi tính, với mỗi đơn, "
   "đã cách đơn liền trước bao nhiêu ngày — biến một danh sách đơn thành đường nhịp để nhìn ra "
   "chỗ bất thường. Có hai kiểu bất thường đáng soi: <b>khoảng lặng dài</b> (nhiều ngày liền "
   "không có đơn — có thể job tạo đơn hoặc API đã ngừng chạy mà không ai hay) và <b>cụm dày "
   "đặc</b> (nhiều đơn dồn trong tích tắc — nghi vấn bot đặt hàng loạt hoặc khách bấm gửi hai lần).",
 "before_label": "Bảng Orders — dòng thời gian 7 đơn theo order_date:",
 "before_cols": ["order_id","order_date"],
 "before_rows": [
   ["ORD_001","2026-06-20"],
   ["ORD_002","2026-06-22"],
   ["ORD_003","2026-06-23"],
   ["ORD_004","2026-06-24"],
   ["ORD_005","2026-06-25"],
   ["ORD_006","2026-06-23"],
   ["ORD_007","2027-01-01"],
 ],
 "before_bugs": [5, 6],
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
   ("FROM Orders o",
    "MySQL bắt đầu từ đây: lấy toàn bộ đơn trong bảng Orders, gán alias <b>o</b> cho mỗi đơn "
    "đang xét. Bước này xác định 'sẽ duyệt trên những dòng nào' — chạy <b>trước</b>, rồi phần "
    "SELECT mới tính toán trên từng dòng đã chọn."),
   ("(SELECT MAX(o2.order_date)\n   FROM Orders o2\n   WHERE o2.order_date\n         < o.order_date)",
    "<b>Subquery tương quan — trái tim của câu lệnh.</b> Nhiệm vụ của nó rất gọn: tìm "
    "<b>ngày của đơn liền ngay trước</b> đơn đang xét.<br/>"
    "Cách làm: với mỗi đơn (gọi là o), nó nhìn qua mọi đơn khác, chỉ giữ những đơn có ngày "
    "<b>trước</b> ngày của o, rồi lấy ngày <b>mới nhất</b> (MAX) trong số đó — đúng là đơn ngay "
    "trước o.<br/>"
    "Ví dụ đơn ORD_004 (24-06): các đơn trước nó rơi vào ngày 20, 22, 23, 23 → lấy MAX = 23-06.<br/>"
    "Hai điểm dễ vấp:<br/>"
    "• Dùng dấu &lt; (ngày <b>nhỏ hơn</b>), không phải ≤ — để đơn không tự so với chính nó, và "
    "để hai đơn cùng ngày cùng nhìn lùi về ngày khác gần nhất.<br/>"
    "• Gọi là 'tương quan' (correlated) vì bên trong có nhắc <b>o.order_date</b> của truy vấn "
    "ngoài. Do đó MySQL phải chạy lại subquery này cho <b>từng đơn</b> (EXPLAIN gắn nhãn "
    "dependent) — chính là lý do câu chậm khi bảng lớn (xem Góc soi lỗi)."),
   ("DATEDIFF(o.order_date, ...)\n  AS ngay_ke_tu_don_truoc",
    "<b>DATEDIFF(a, b)</b> trả về số ngày của a trừ b. Ở đây a = ngày đơn hiện tại, "
    "b = ngày đơn liền trước (do subquery trả về) → kết quả là 'đơn này cách đơn trước bao "
    "nhiêu ngày'.<br/>"
    "Ví dụ ORD_004: DATEDIFF(24-06, 23-06) = 1.<br/>"
    "Riêng đơn đầu tiên (ORD_001) không có đơn nào trước → subquery trả NULL → "
    "DATEDIFF(ngày, NULL) = NULL, nên cột này hiển thị trống."),
   ("ORDER BY o.order_date",
    "Sắp xếp kết quả hiển thị theo thời gian tăng dần, để đọc bảng như một dòng sự kiện từ "
    "cũ đến mới. Mệnh đề này <b>không ảnh hưởng cách tính</b> khoảng cách — bỏ đi thì các con "
    "số vẫn đúng, chỉ là thứ tự dòng xáo trộn nên khó đọc hơn."),
 ],
 "explain":
   "Cách đọc kết quả: cột 'số ngày cách đơn trước' chính là thước đo nhịp bán hàng. Với dữ liệu "
   "mẫu, các khoảng 1–2 ngày là đều đặn — bình thường; chỉ con số vọt lên bất thường (như 190 "
   "ngày) mới đáng điều tra. Nói ngắn gọn: bản thân con số không phải bug — <b>chỗ lệch khỏi "
   "nhịp thường ngày</b> mới là dấu hiệu cần soi.<br/>"
   "Một điểm hay của cách viết này: nó dựng được dòng thời gian mà <b>không cần công cụ đặc biệt "
   "nào</b>, chạy được cả trên các bản MySQL cũ. Từ MySQL 8.0 trở lên có 'window function' "
   "(giới thiệu ở Câu 49) giúp viết kiểu bài này ngắn gọn hơn.",
 "result_table": (
   ["order_id","order_date","ngay_ke_tu_don_truoc"],
   [
     ["ORD_001","2026-06-20","(NULL)"],
     ["ORD_002","2026-06-22",2],
     ["ORD_003","2026-06-23",1],
     ["ORD_006","2026-06-23",1],
     ["ORD_004","2026-06-24",1],
     ["ORD_005","2026-06-25",1],
     ["ORD_007","2027-01-01",190],
   ]
 ),
 "result_note":
   "ORD_003 và ORD_006 cùng ngày 2026-06-23 — subquery lấy max ngày TRƯỚC 2026-06-23 là 2026-06-22, "
   "nên cả hai đều cho khoảng cách = 1. Hai đơn cùng ngày là dấu hiệu double-submit (xem Câu 29). "
   "ORD_007 (2027-01-01) có khoảng cách = 190 ngày — khoảng lặng cực dài, đây là đơn ngày tương lai (xem Câu 34). "
   "Đơn đầu tiên ORD_001 có khoảng cách NULL vì không có đơn nào trước.",
 "note":
   "(1) <b>Muốn tự động hoá</b>: thêm điều kiện lọc theo khoảng cách (ví dụ chỉ lấy đơn cách đơn "
   "trước hơn 7 ngày, hoặc bằng 0) để câu lệnh tự chỉ ra điểm bất thường, khỏi phải dò tay.<br/>"
   "(2) <b>Cảnh báo hiệu năng</b>: subquery ở đây phải quét lại bảng cho <b>từng đơn</b>, nên số "
   "đơn càng nhiều thì chi phí phình rất nhanh (khoảng N×N — cùng kiểu rủi ro với Câu 37). Vài "
   "nghìn đơn vẫn ổn; nhưng bảng Orders thật hàng triệu dòng thì câu này có thể chạy rất lâu. Khi "
   "đó nên dùng <b>window function LAG()</b> (MySQL 8.0+; xem Câu 49) — chỉ quét bảng một lần.<br/>"
   "(3) <b>Khác biệt cần nhớ nếu đổi sang LAG</b>: với hai đơn <b>trùng ngày</b>, LAG cho khoảng "
   "cách 0 (so đúng dòng liền trước), còn subquery ở đây (dùng dấu &lt;) cho 1 (đếm lùi về ngày "
   "khác gần nhất) — chọn cách khớp với điều bạn muốn đo.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 4, "id": 44,
 "title": "Phát hiện item_id bị nhảy — dấu vết của bản ghi bị xóa",
 "situation":
   "Trên hệ thống thật, item_id thường là khóa chính tự tăng (AUTO_INCREMENT) — cấp số liên tục "
   "1, 2, 3... Nếu dãy bị nhảy (có 1, 2, 4 nhưng thiếu 3), thường là dấu vết một bản ghi từng tồn "
   "tại rồi bị xóa. Đây là kỹ thuật audit đơn giản để phát hiện dữ liệu bị xóa mà không để lại log. "
   "(Trên DB mẫu, gap được tạo sẵn bằng INSERT tường minh để mô phỏng.)",
 "before_label": "Bảng Order_Items — thiếu item_id 3, 10 và 11 trong dãy 1→14:",
 "before_cols": ["item_id","order_id","product_id","quantity","price"],
 "before_rows": [
   [1, "ORD_001","PROD_001", 1,"30.000.000"],
   [2, "ORD_001","PROD_002", 1, "2.000.000"],
   [4, "ORD_002","PROD_001", 1,"30.000.000"],
   [5, "ORD_002","PROD_004", 1, "1.000.000"],
   [6, "ORD_003","PROD_003", 1, "8.000.000"],
   [7, "ORD_001","PROD_001", 1,"30.000.000"],
   [8, "ORD_005","PROD_004", 1, "1.000.000"],
   [9, "ORD_005","PROD_002", 1, "2.000.000"],
   [12,"ORD_003","PROD_002", 0, "1.500.000"],
   [13,"ORD_006","PROD_003", 1, "8.000.000"],
   [14,"ORD_007","PROD_004",20, "1.000.000"],
 ],
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
   "Logic của câu: với mỗi item_id = n đang có, kiểm tra xem n+1 có tồn tại không. "
   "Nếu không có → n+1 chính là một số bị thiếu.<br/>"
   "Ví dụ: có item_id=2 nhưng không có 3 → báo thiếu 3; có 9 nhưng không có 10 → báo thiếu 10. "
   "Riêng item_id=14 là số lớn nhất nên không xét tiếp.<br/>"
   "<b>Điểm mù cần biết:</b> câu chỉ soi được số ngay sau một id ĐANG tồn tại. Số 11 cũng thiếu, "
   "nhưng vì 10 cũng không có trong bảng nên không có dòng nào để 'nhìn sang' 11 — thành ra 11 bị "
   "bỏ sót. Nói cách khác, với một khoảng thiếu liên tiếp, câu này chỉ báo số đầu tiên của khoảng.",
 "result_table": (
   ["id_bi_mat"],
   [[3], [10]],
 ),
 "result_note":
   "Query báo 2 số bị thiếu: item_id=3 (giữa 2 và 4) và item_id=10 (giữa 9 và 12). "
   "Đó là các vị trí từng có bản ghi rồi biến mất — cần đối chiếu audit log để biết vì sao mất.",
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
   "Đơn bị hủy không chỉ là chuyện kinh doanh — còn là tín hiệu kỹ thuật. "
   "Nếu một khách cụ thể hủy nhiều đơn bất thường, có thể luồng thanh toán gặp lỗi riêng với "
   "profile đó, hoặc là dữ liệu test chưa dọn sau sprint. "
   "Câu này đếm số đơn hủy theo từng khách và xếp ai hủy nhiều nhất lên đầu.",
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
    "<b>INNER JOIN</b> lấy tên khách cho mỗi đơn. Đơn mồ côi (customer_id không có trong Customers) "
    "sẽ bị loại — nhưng ở câu này không ảnh hưởng, vì đơn mồ côi ORD_004 vốn là PENDING nên đã bị "
    "mệnh đề WHERE lọc trước rồi."),
   ("WHERE o.status = 'CANCELLED'",
    "Chỉ giữ đơn bị hủy trước khi gom nhóm."),
   ("GROUP BY c.customer_id, c.customer_name\n  ORDER BY so_don_huy DESC",
    "Gom các đơn hủy về từng khách rồi đếm (COUNT), sắp xếp giảm dần — khách hủy nhiều nhất lên đầu."),
 ],
 "explain":
   "Đây là mẫu <b>đếm-rồi-xếp-hạng trên một tập đã lọc</b>: lọc đúng loại đơn (CANCELLED), gom theo "
   "khách, đưa ai nhiều nhất lên đầu — dùng được cho mọi câu hỏi 'ai/cái gì nhiều nhất trong nhóm X'.<br/>"
   "Nhớ rằng kết quả là <b>tín hiệu, không phải kết luận</b>: 1 đơn hủy chưa nói lên gì. Trên data mẫu "
   "ai cũng chỉ ~1 nên bảng này chưa có ý nghĩa — nó chỉ phát huy trên production đủ lớn, thường kèm "
   "<b>HAVING COUNT(*) &gt; N</b> để bỏ nhiễu, chỉ giữ khách hủy nhiều đáng ngờ.",
 "result_table": (
   ["customer_id","customer_name","so_don_huy"],
    [
      ["C003","Le Thi C",1],
      ["C001","Nguyen Van A",1],
    ],
 ),
 "result_note":
   "C001 và C003 mỗi khách hủy 1 đơn (C001 hủy ORD_005, C003 hủy ORD_003). "
    "Trên production, câu này giúp theo dõi và cảnh báo sớm khi số đơn hủy của một khách tăng đột biến.",
 "note":
   "<b>'Số đơn hủy' khác 'tỷ lệ hủy'.</b> Câu này đếm <b>số</b> đơn hủy — một khách hủy 1/1 đơn "
   "(100%) và một khách hủy 1/50 đơn (2%) đều hiện so_don_huy = 1. Muốn đo mức bất thường thật, "
   "phải tính tỷ lệ: số đơn hủy chia tổng đơn của khách đó.<br/>"
   "Khi thấy khách hủy nhiều, phân biệt trước khi báo bug: hủy <b>tập trung một khoảng thời gian</b> "
   "→ nghi release lỗi, soi luồng checkout đợt đó; hủy <b>rải đều</b> → có thể là dữ liệu test chưa "
   "dọn hoặc lỗi UX mãn tính.",
},


# ============================================================
# PHẦN 6 — Truy vấn nâng cao cho QA
# ============================================================
{
 "part": 5, "id": 46,
 "title": "Dùng ROW_NUMBER() phát hiện item trùng trong cùng một đơn",
 "situation":
   "Câu 4 tìm được item trùng bằng GROUP BY, nhưng chỉ cho biết <b>nhóm nào</b> bị trùng — không "
   "chỉ ra <b>dòng nào</b> mới là bản thừa cần xóa. Câu này dùng <b>ROW_NUMBER()</b> để đánh số thứ "
   "tự cho từng dòng trong mỗi nhóm; dòng nào bị đánh số 2 trở lên chính là bản trùng.<br/>"
   "ROW_NUMBER() thuộc nhóm <b>window function</b>: khác GROUP BY (gộp nhiều dòng thành một), "
   "nó giữ nguyên từng dòng và chỉ thêm một cột đánh số bên cạnh.",
 "before_label": "Bảng Order_Items — dòng đỏ: item 1 và item 7 cùng ORD_001/PROD_001:",
 "before_cols": ["item_id","order_id","product_id","quantity","price"],
 "before_rows": [
   [1, "ORD_001","PROD_001", 1,"30.000.000"],
   [2, "ORD_001","PROD_002", 1, "2.000.000"],
   [4, "ORD_002","PROD_001", 1,"30.000.000"],
   [5, "ORD_002","PROD_004", 1, "1.000.000"],
   [6, "ORD_003","PROD_003", 1, "8.000.000"],
   [7, "ORD_001","PROD_001", 1,"30.000.000"],
   [8, "ORD_005","PROD_004", 1, "1.000.000"],
   [9, "ORD_005","PROD_002", 1, "2.000.000"],
   [12,"ORD_003","PROD_002", 0, "1.500.000"],
   [13,"ORD_006","PROD_003", 1, "8.000.000"],
   [14,"ORD_007","PROD_004",20, "1.000.000"],
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
    "Nạp toàn bộ bảng Order_Items — 11 dòng. Window function không lọc bớt dòng nào, "
    "giữ nguyên tất cả rồi thêm cột đánh số bên cạnh."),
   ("ROW_NUMBER() OVER ( ... )\n  AS so_lan_trong_don",
    "<b>ROW_NUMBER()</b> gán một số thứ tự tăng dần (1, 2, 3...) cho từng dòng.<br/>"
    "Phần <b>OVER (...)</b> khai báo 'cửa sổ' — phạm vi dòng mà hàm nhìn vào để đánh số. "
    "Nếu để OVER () trống thì cả bảng là một cửa sổ (đánh 1→11); ở đây ta chia nhỏ cửa sổ "
    "bằng PARTITION BY ngay dưới."),
   ("PARTITION BY\n  order_id, product_id",
    "Chia dữ liệu thành từng nhóm theo cặp (đơn + sản phẩm) — giống cách gom của GROUP BY nhưng "
    "<b>KHÔNG gộp dòng</b>. Mỗi khi sang một nhóm mới (cặp order_id/product_id khác), ROW_NUMBER "
    "<b>đếm lại từ 1</b>. Nhờ vậy con số cho biết 'đây là lần xuất hiện thứ mấy của cặp này'."),
   ("ORDER BY item_id\n  (bên trong OVER)",
    "Trong mỗi nhóm, quyết định dòng nào được số 1: item_id nhỏ hơn xếp trước → nhận số 1 "
    "(coi là bản gốc), dòng sau nhận số 2 (bản trùng). "
    "Đây là ORDER BY <b>của cửa sổ</b> — đừng nhầm với ORDER BY sắp xếp kết quả ở cuối câu."),
   ("ORDER BY order_id,\n  product_id, item_id\n  (cuối câu)",
    "ORDER BY này chỉ sắp xếp bảng kết quả cho dễ đọc — đưa các dòng cùng nhóm nằm liền nhau. "
    "Không ảnh hưởng gì đến số ROW_NUMBER đã tính ở trên."),
 ],
 "explain":
   "Ý tưởng cốt lõi: con số <b>so_lan_trong_don</b> cho biết mỗi dòng là <b>lần xuất hiện thứ mấy</b> "
   "của cặp (đơn + sản phẩm). Số <b>1</b> = bản đầu tiên (giữ lại); số <b>2 trở lên</b> = bản lặp (thừa).<br/>"
   "Nhờ vậy việc dọn trùng trở nên an toàn: chỉ cần xóa các dòng có số &gt; 1, giữ nguyên bản gốc số 1 "
   "— không sợ xóa nhầm cả cặp.<br/>"
   "Đó là lợi thế so với Câu 4: Câu 4 chỉ nói 'cặp này bị trùng', còn câu này chỉ thẳng <b>dòng nào</b> "
   "phải xóa (item 7).",
 "result_table": (
   ["item_id","order_id","product_id","so_lan_trong_don"],
   [
     [1,  "ORD_001","PROD_001", 1],
     [7,  "ORD_001","PROD_001", 2],
     [2,  "ORD_001","PROD_002", 1],
     [4,  "ORD_002","PROD_001", 1],
     [5,  "ORD_002","PROD_004", 1],
     [12, "ORD_003","PROD_002", 1],
     [6,  "ORD_003","PROD_003", 1],
     [9,  "ORD_005","PROD_002", 1],
     [8,  "ORD_005","PROD_004", 1],
     [13, "ORD_006","PROD_003", 1],
     [14, "ORD_007","PROD_004", 1],
   ]
 ),
 "result_note":
   "Item_id=7 có so_lan_trong_don=2 — bản ghi trùng của item_id=1 trong ORD_001/PROD_001. "
   "11 dòng tổng cộng; chỉ item 7 có số thứ tự > 1 → là bản ghi trùng duy nhất. "
   "Lọc WHERE so_lan_trong_don > 1 để chỉ xem bản trùng.",
 "note":
   "<b>Trước khi xóa các dòng có số &gt; 1, phải chốt 'giữ dòng nào'.</b> ORDER BY trong OVER quyết "
   "định dòng nào là bản gốc được giữ — ở đây là item_id nhỏ nhất. Nhưng có khi bản mới hơn mới là "
   "bản đã sửa đúng; hỏi dev/PO quy tắc giữ bản nào trước khi DELETE.<br/>"
   "<b>Cảnh giác khi cột ORDER BY không duy nhất:</b> nếu các dòng trùng có cùng giá trị ORDER BY, "
   "dòng nào nhận số 1 là ngẫu nhiên — dễ xóa nhầm dòng cần giữ. Luôn ORDER BY theo một cột xác định "
   "(id, thời gian tạo).<br/>"
   "Ngoài bắt trùng, ROW_NUMBER() còn hay dùng để <b>lấy bản ghi mới nhất mỗi nhóm</b> "
   "(PARTITION BY nhóm, ORDER BY thời gian DESC, giữ dòng số 1) — mẫu rất thường gặp khi kiểm thử báo cáo.<br/>"
   "Lưu ý: ROW_NUMBER() cần MySQL 8.0+ (kiểm tra: <b>SELECT VERSION();</b>).",
},
# ─────────────────────────────────────────────────────────
{
 "part": 5, "id": 47,
 "title": "Dùng CTE + RANK() xếp hạng sản phẩm bán chạy",
 "situation":
   "Gần như báo cáo bán hàng nào cũng có bảng <b>'top sản phẩm bán chạy'</b> — xếp hạng sản phẩm "
   "theo doanh số từ cao xuống thấp. Câu này dựng đúng bảng đó qua hai bước: trước tiên tính tổng "
   "doanh số mỗi sản phẩm (dùng <b>CTE</b> đặt tên cho kết quả trung gian), rồi gán thứ hạng bằng "
   "<b>RANK()</b> — hàm này còn xử lý được cả khi hai sản phẩm bằng doanh số (cùng nhận một hạng). "
   "QA dựng lại bảng này để kiểm tra xếp hạng trên dashboard có đúng không, và quan trọng hơn: "
   "con số xếp hạng có bị dữ liệu bẩn thổi phồng không.",
 "before_label": "Bảng Products — PROD_001 xếp hạng 1 nhưng doanh số bị thổi phồng do item trùng:",
 "before_cols": ["product_id","product_name","category","price","stock"],
 "before_rows": [
   ["PROD_001","Phone IP15",        "Dien thoai","30.000.000", 50],
   ["PROD_002","Key Logi",     "Phu kien",  "2.000.000", 100],
   ["PROD_003","Headphone SN5", "Phu kien",  "8.000.000",  -5],
   ["PROD_004","Powerbank AK",       "Phu kien",  "1.000.000",  20],
   ["PROD_005","Key Logi",     "Phu kien",  "2.000.000",  30],
   ["PROD_006","Speaker JB",        "Phu kien",  "(NULL)",     10],
   ["PROD_007","Mouse RZ",       "Phu kien",  "1.500.000","(NULL)"],
   ["PROD_008","key logi",     "Phu kien",  "2.000.000", 25],
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
   ("WITH doanh_so AS (\n  SELECT product_id, product_name,\n         SUM(quantity*price)\n           AS tong_doanh_so\n  FROM Products JOIN Order_Items\n  GROUP BY product_id, product_name)",
    "<b>Cụm 1 — Dựng bảng tạm (CTE):</b> khối WITH tạo một bảng tạm tên <b>doanh_so</b> — mỗi sản "
    "phẩm một dòng kèm tổng doanh số (giống Câu 22). Đặt tên để dùng lại ở cụm sau."),
   ("SELECT ...,\n  RANK() OVER (\n    ORDER BY tong_doanh_so DESC)\n    AS hang\nFROM doanh_so",
    "<b>Cụm 2 — Truy vấn trên bảng tạm:</b> đọc từ doanh_so và thêm cột thứ hạng bằng <b>RANK()</b>. "
    "RANK khác ROW_NUMBER: nếu hai sản phẩm bằng doanh số, cả hai cùng nhận một hạng và hạng kế bị "
    "bỏ qua (1, 1, 3...)."),
 ],
 "explain":
   "Kết quả xếp hạng đúng về kỹ thuật, nhưng <b>bảng xếp hạng chỉ đáng tin khi dữ liệu nền sạch</b>:<br/>"
   "PROD_001 đứng hạng 1 với 90M — nhưng con số này bị thổi phồng do item trùng (Câu 4/46), "
   "doanh số thực chỉ khoảng 60M.<br/>"
   "PROD_004 vọt lên hạng 2 với 22M do item 14 có quantity=20 — cần kiểm tra là đơn thật hay dữ liệu "
   "test chưa dọn.<br/>"
   "Bài học QA: một 'bảng bán chạy' trông chuyên nghiệp vẫn có thể sai nếu chưa đối soát dữ liệu gốc.",
 "result_table": (
   ["product_id","product_name","tong_doanh_so","hang"],
   [
     ["PROD_001","Phone IP15",        "90.000.000", 1],
     ["PROD_004","Powerbank AK",       "22.000.000", 2],
     ["PROD_003","Headphone SN5","16.000.000", 3],
     ["PROD_002","Key Logi",     "4.000.000",  4],
   ]
 ),
 "result_note":
   "4 sản phẩm có doanh số (PROD_005, 006, 007, 008 chưa bán). "
   "PROD_001 dẫn đầu 90M (bị phóng đại do item 7 trùng). "
   "PROD_004 hạng 2 với 22M (do item 14 qty=20). "
   "PROD_003 hạng 3 với 16M. Xếp hạng này chỉ đáng tin sau khi làm sạch dữ liệu.",
 "note":
   "Bảng xếp hạng dễ 'trông đúng mà sai': thứ tự có thể chuẩn nhưng con số lại bị dữ liệu bẩn thổi "
   "phồng — luôn soi cả con số, đừng chỉ soi thứ hạng.<br/>"
   "Khi hai sản phẩm bằng doanh số, xác nhận với spec: báo cáo muốn <b>RANK()</b> (đồng hạng, bỏ "
   "hạng kế) hay <b>ROW_NUMBER()</b> (số liên tiếp, không đồng hạng)? Nhìn giao diện không suy ra "
   "được — phải hỏi.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 5, "id": 48,
 "title": "Dùng lại một CTE nhiều lần: tìm khách chi tiêu trên mức trung bình",
 "situation":
   "Nhiều hệ thống cần lọc ra nhóm <b>khách chi tiêu cao hơn mặt bằng</b> — để chăm sóc VIP, mời "
   "ưu đãi, phân tích khách giá trị. 'Cao hơn mặt bằng' nghĩa là chi nhiều hơn <b>mức trung bình "
   "của tất cả khách</b>. Câu này làm ba việc: tính tổng chi mỗi khách, lấy trung bình các con số "
   "đó, rồi giữ lại ai vượt trung bình.<br/>"
   "Vì mức trung bình phải tính từ chính danh sách vừa dựng, ta đặt tên danh sách đó bằng <b>CTE</b> "
   "(bảng tạm) để <b>dùng lại hai lần</b> — một lần lấy danh sách, một lần tính trung bình — thay "
   "vì viết lại phép tính tổng hai lần.",
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
   ("WITH tong_chi AS (\n  SELECT customer_id,\n         SUM(total_amount)\n         AS tong_da_mua\n  ... WHERE status='COMPLETED'\n  GROUP BY customer_id)",
    "<b>Cụm 1 — Dựng bảng tạm (CTE):</b> khối WITH tạo một bảng tạm tên <b>tong_chi</b> — mỗi khách "
    "một dòng kèm tổng chi tiêu, chỉ tính đơn COMPLETED (bỏ CANCELLED, PENDING). "
    "Xong cụm này, coi tong_chi như một bảng thật để dùng tiếp."),
   ("SELECT ... FROM tong_chi      -- lan 1\nWHERE tong_da_mua > (\n  SELECT AVG(tong_da_mua)\n  FROM tong_chi)        -- lan 2",
    "<b>Cụm 2 — Truy vấn trên bảng tạm:</b> ở đây tong_chi được gọi tên <b>hai lần</b>:<br/>"
    "• <b>Lần 1</b> (FROM tong_chi ở câu chính): lấy danh sách khách kèm tổng chi.<br/>"
    "• <b>Lần 2</b> (FROM tong_chi trong subquery): tính mức trung bình để làm ngưỡng so sánh.<br/>"
    "Câu chỉ giữ khách có tổng chi lớn hơn mức trung bình đó. Định nghĩa CTE một lần, dùng lại hai "
    "lần — khỏi phải chép lại khối GROUP BY."),
   ("ORDER BY tong_da_mua DESC",
    "Sắp xếp kết quả giảm dần — khách chi nhiều nhất lên đầu."),
 ],
 "explain":
   "Câu này lọc theo một <b>ngưỡng động</b>: mức trung bình được tính ngay từ chính tập dữ liệu, "
   "không phải con số cố định gõ tay — nên khi dữ liệu đổi, ngưỡng tự đổi theo.<br/>"
   "Trong data mẫu (chỉ tính đơn COMPLETED): C001 = 32M, C002 = 20M → trung bình = 26M → "
   "chỉ C001 (32M) vượt, C002 (20M) rớt.<br/>"
   "Mẫu 'so với trung bình của chính tập' là nền của phân tích outlier — tìm cái bất thường so với "
   "mặt bằng chung.",
 "result_table": (
   ["customer_id","customer_name","tong_da_mua"],
   [["C001","Nguyen Van A","32.000.000"]],
 ),
 "result_note":
   "Chỉ C001 (32M) vượt mức trung bình 26M. C002 có 20M < 26M nên bị loại. "
   "Đây là khách VIP tiềm năng — dữ liệu test nên cover luồng upgrade membership.",
 "note":
   "'Trên mức trung bình' — trung bình của cái gì? Câu này lấy trung bình của <b>tổng chi từng "
   "khách</b> (gộp về mỗi khách một số rồi mới tính trung bình), khác với trung bình của <b>từng "
   "đơn</b>. Hai cách cho hai ngưỡng khác nhau — xác nhận với PO đang cần loại nào.<br/>"
   "Ngưỡng này còn 'động': thêm/bớt khách là trung bình đổi theo, nên một khách 'trên trung bình' "
   "hôm nay có thể rớt xuống sau — đừng chốt danh sách VIP cứng từ một lần chạy.",
},
# ─────────────────────────────────────────────────────────
{
 "part": 5, "id": 49,
 "title": "Tính doanh thu tích lũy theo thời gian với SUM() OVER()",
 "situation":
   "Nhiều báo cáo hiện con số <b>lũy kế</b> — 'tính đến thời điểm này đã cộng được tổng bao nhiêu'. "
   "Giống cột số dư trên sao kê ngân hàng: mỗi dòng không phải số của riêng nó, mà là tổng dồn "
   "tất cả các dòng từ đầu đến đó (ngày 1 bán 32M → lũy kế 32M; ngày 2 bán 20M → lũy kế 52M; cứ thế). "
   "QA gặp con số lũy kế này trên dashboard 'doanh thu từ đầu tháng', biểu đồ tăng trưởng... "
   "và cần tự tính lại bằng SQL để đối chiếu — lệch là có bug. "
   "<b>SUM() OVER()</b> là công cụ đẻ ra cột lũy kế đó chỉ trong một câu lệnh.",
 "before_label": "Bảng Orders — doanh thu tích lũy tính theo order_date tăng dần:",
 "before_cols": ["order_id","customer_id","total_amount","status","order_date"],
 "before_rows": [
   ["ORD_001","C001","32.000.000","COMPLETED","2026-06-20"],
   ["ORD_002","C002","20.000.000","COMPLETED","2026-06-22"],
   ["ORD_003","C003","8.000.000","CANCELLED","2026-06-23"],
   ["ORD_004","C999","5.000.000","PENDING",  "2026-06-24"],
   ["ORD_005","C001","15.000.000","CANCELLED","2026-06-25"],
   ["ORD_006","C003","8.000.000","PENDING",  "2026-06-23"],
   ["ORD_007","C001","20.000.000","PENDING",  "2027-01-01"],
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
    "MySQL tải toàn bộ bảng Orders — tất cả 7 đơn, "
    "kể cả CANCELLED và PENDING."),
   ("SUM(total_amount) OVER (\n  ORDER BY order_date\n  ROWS BETWEEN UNBOUNDED\n  PRECEDING AND CURRENT ROW)\n  AS luy_ke",
    "<b>SUM() OVER()</b> là kiểu 'tổng chạy dồn': với mỗi đơn, cộng total_amount của nó với mọi đơn "
    "đứng trước — khác <b>SUM()</b> thường vốn gộp tất cả thành một con số duy nhất.<br/>"
    "<b>ORDER BY order_date</b> (đặt bên trong OVER) quyết định thứ tự cộng dồn: theo ngày, cũ trước "
    "mới sau.<br/>"
    "<b>ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</b> là phạm vi cộng — từ dòng đầu tiên "
    "(<i>UNBOUNDED PRECEDING</i> = không giới hạn về trước) đến dòng đang xét (<i>CURRENT ROW</i>).<br/>"
    "Có thể viết gọn <b>OVER (ORDER BY order_date)</b>, cùng kết quả khi mỗi ngày chỉ có một đơn. "
    "Nhưng khi nhiều đơn cùng ngày thì hai kiểu khác nhau:<br/>"
    "• <b>RANGE</b> (bản gọn ngầm dùng): các đơn cùng ngày bị gộp chung một mốc tích lũy.<br/>"
    "• <b>ROWS</b> (viết tường minh như trên): cộng lần lượt từng dòng, mỗi đơn một mốc riêng."),
   ("ORDER BY order_date",
    "Sắp xếp kết quả cuối cùng theo ngày — "
    "đảm bảo luy_ke tăng dần theo thời gian khi đọc từ trên xuống."),
 ],
 "explain":
   "<b>SUM() OVER()</b> tính tổng tích lũy mà không gộp dòng — khác GROUP BY (gộp tất cả thành một "
   "con số): window function vừa giữ chi tiết đủ 7 đơn, vừa thêm cột tổng dồn. "
   "Cách cột luy_ke hình thành — mỗi dòng = số của chính nó cộng lũy kế của dòng ngay trên:",
 "explain_table": (
   ["Đơn (theo ngày)", "Bán trong đơn", "Lũy kế = trước + nay"],
   [
     ["ORD_001", "32M", "32M"],
     ["ORD_002", "20M", "52M  (32 + 20)"],
     ["ORD_003", "8M",  "60M  (52 + 8)"],
     ["ORD_006", "8M",  "68M  (60 + 8)"],
     ["ORD_004", "5M",  "73M  (68 + 5)"],
     ["ORD_005", "15M", "88M  (73 + 15)"],
     ["ORD_007", "20M", "108M (88 + 20)"],
   ],
 ),
 "result_table": (
   ["order_id","customer_id","order_date","total_amount","luy_ke"],
   [
     ["ORD_001","C001","2026-06-20","32.000.000", "32.000.000"],
     ["ORD_002","C002","2026-06-22","20.000.000", "52.000.000"],
     ["ORD_003","C003","2026-06-23", "8.000.000", "60.000.000"],
     ["ORD_006","C003","2026-06-23", "8.000.000", "68.000.000"],
     ["ORD_004","C999","2026-06-24", "5.000.000", "73.000.000"],
     ["ORD_005","C001","2026-06-25","15.000.000", "88.000.000"],
     ["ORD_007","C001","2027-01-01","20.000.000","108.000.000"],
   ]
 ),
 "result_note":
   "luy_ke = 108M nhưng đây là tổng thô gồm cả CANCELLED (ORD_003/8M, ORD_005/15M), "
   "PENDING bất thường (ORD_006 double order/8M, ORD_007 ngày tương lai/20M), "
   "và orphan (ORD_004/5M). Doanh thu thực COMPLETED: chỉ 52M.",
 "note":
   "Khi kiểm thử báo cáo tích lũy, hỏi spec rõ ngay từ đầu: cộng dồn theo <b>tất cả đơn</b> hay chỉ "
   "đơn đã hoàn tất? Nếu chỉ tính đơn hoàn tất, thêm <b>WHERE status = 'COMPLETED'</b> trước khi cộng "
   "dồn — nếu không, tổng dồn sẽ gồm cả đơn hủy và đơn treo, làm sai báo cáo.<br/>"
   "Với nhiều đơn cùng ngày, kết quả tích lũy còn phụ thuộc cách viết frame ROWS vs RANGE "
   "(đã giải thích ở phần phân tích mệnh đề bên trên).",
},
# ─────────────────────────────────────────────────────────
{
 "part": 5, "id": 50,
 "title": "Báo cáo tổng hợp: nhiều loại lỗi trong một câu UNION ALL",
 "situation":
   "Câu cuối gộp nhiều kiểm tra vào <b>một báo cáo duy nhất</b>. Mỗi loại lỗi là một câu SELECT "
   "riêng — email trùng (Câu 3), tồn kho âm (Câu 14), khách hàng ma (Câu 7) — rồi <b>UNION ALL</b> "
   "xếp chồng ba kết quả đó lại thành một bảng. QA dùng câu này như một 'health check' nhanh: "
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
   ("FROM Customers\nWHERE email IN (\n  SELECT email FROM Customers\n  GROUP BY email\n  HAVING COUNT(*) > 1)",
    "<b>Khối 1 — quét &amp; lọc:</b> subquery bên trong tìm các email xuất hiện &gt; 1 lần; câu ngoài "
    "giữ lại những khách có email nằm trong danh sách trùng đó (kỹ thuật Câu 3; bọc LOWER() như Câu 8 "
    "nếu muốn an toàn với mọi collation)."),
   ("SELECT 'Email trung' AS loai_loi,\n  customer_id AS doi_tuong,\n  'Customers' AS bang",
    "<b>Khối 1 — chiếu kết quả:</b> mỗi dòng gắn một nhãn cố định 'Email trung' + đối tượng "
    "(customer_id) + tên bảng, để trong báo cáo gộp biết dòng này thuộc loại lỗi gì."),
   ("UNION ALL\nSELECT 'Ton kho am', ...\nUNION ALL\nSELECT 'Khach hang ma', ...",
    "<b>UNION ALL</b> xếp chồng thêm hai khối kiểm tra nữa (tồn kho âm, khách hàng ma) xuống dưới "
    "khối 1. Điều kiện: cả ba khối <b>cùng số cột</b> và kiểu tương thích. Dùng UNION ALL (không phải "
    "UNION) để giữ nguyên mọi dòng — nhanh hơn và không vô tình gộp mất dòng."),
   ("ORDER BY loai_loi",
    "Sắp xếp theo loại lỗi — gom các lỗi cùng loại lại gần nhau để dễ đọc báo cáo."),
 ],
 "explain":
   "Sức mạnh của câu này là <b>gộp nhiều kiểm tra độc lập vào một lần chạy</b>: mỗi khối UNION ALL "
   "là một câu kiểm tra hoàn chỉnh, không phụ thuộc khối khác — thêm hay bớt một loại lỗi chỉ là "
   "thêm/bớt một khối, rất dễ biến thành 'bảng theo dõi sức khỏe dữ liệu' chạy định kỳ.<br/>"
   "Một điểm đáng chú ý ở kết quả: nhóm email bắt <b>4 dòng (C001, C004, C005, C009)</b> thay vì 2 "
   "như nhìn bằng mắt. Vì MySQL 8.0+ mặc định so sánh chuỗi <b>không phân biệt hoa/thường</b>, "
   "'a.nguyen@email.com' (C001) và 'A.NGUYEN@EMAIL.COM' (C009) bị coi là cùng một email → cả hai bị bắt. "
   "Đây là bug ẩn mà Câu 8 cũng phát hiện — cần xác nhận policy: hệ thống có phân biệt hoa/thường "
   "trong email không?",
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
   "<b>Bẫy 'sạch giả':</b> nếu một khối kiểm tra bị viết sai điều kiện, nó lặng lẽ trả 0 dòng — cả "
   "báo cáo trông 'không có lỗi' trong khi thực ra khối đó đã hỏng, không còn bắt được gì. "
   "Nên chạy thử từng khối riêng ít nhất một lần để chắc nó thật sự phát hiện được lỗi.<br/>"
   "Khi thêm khối dùng <b>NOT IN (subquery)</b> như 'Khach hang ma': nếu cột trong subquery có thể "
   "NULL, đổi sang <b>NOT EXISTS</b> — cùng bẫy NULL đã học ở Câu 11, nay ở dạng subquery.",
},

]  # end ENTRIES


# ===========================================================================
# EXERCISES — bài tập tự luyện cuối mỗi phần (đáp án ở Phụ lục B)
#   part: khớp index PARTS (0..5)
#   Đáp án đã được verify trên DB nhỏ ecommerce_test.
# ===========================================================================
EXERCISES = [
    # ---- PHẦN 1 — Toàn vẹn và trùng lặp ----
    {"part": 0, "code": "1.1",
     "prompt": "Đếm số khách theo từng hạng thành viên (membership_tier) và chỉ ra hạng nào "
               "nằm NGOÀI danh sách hợp lệ (Standard, Silver, Gold, Platinum).",
     "hint": "GROUP BY membership_tier để đếm; đối chiếu danh sách hợp lệ như Câu 11.",
     "sql": "SELECT membership_tier,\n"
            "       COUNT(*) AS so_khach,\n"
            "       CASE WHEN membership_tier NOT IN\n"
            "            ('Standard','Silver','Gold','Platinum')\n"
            "            THEN 'NGOAI DANH SACH' ELSE 'OK' END AS trang_thai\n"
            "FROM   Customers\n"
            "GROUP  BY membership_tier\n"
            "ORDER  BY so_khach DESC;",
     "answer": "Standard (5), Silver (2), Gold (2), VIP (1). Chỉ VIP bị đánh dấu 'NGOAI DANH SACH' — "
               "đây mới là giá trị cần điều tra (Bug-H). Đếm theo tier là bình thường; "
               "điều đáng quan tâm với QA là tier lạ, không phải tier trùng."},
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
     "answer": "4 sản phẩm đạt điều kiện: PROD_001 (2 đơn: ORD_001+ORD_002), "
               "PROD_002 (3 đơn: ORD_001+ORD_003+ORD_005), "
               "PROD_003 (2 đơn: ORD_003+ORD_006), "
               "PROD_004 (3 đơn: ORD_002+ORD_005+ORD_007). "
               "Lưu ý COUNT(DISTINCT order_id) khác COUNT(*): PROD_001 có 3 dòng item "
               "nhưng item 1 và 7 cùng thuộc ORD_001 — chỉ tính 1 đơn cho lần đó."},

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
     "answer": "PROD_001 (30M) và PROD_003 (8M). Trung bình ≈ 6.6M. Lưu ý: AVG tự bỏ qua "
               "PROD_006 (giá NULL) nên ngưỡng chỉ tính trên 7 sản phẩm có giá."},
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
               "bị loại vì CANCELLED. Đây là Câu 13 thu hẹp vào đơn đã hoàn tất — nơi sai số "
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
     "answer": "PROD_005 (30), PROD_006 (10) và PROD_008 (25). PROD_007 bị loại vì stock = NULL — "
               "so sánh 'NULL > 0' cho UNKNOWN, không phải TRUE. Đây là lý do hàng tồn 'tàng hình' dễ bị bỏ sót."},
    {"part": 1, "code": "2.4",
     "prompt": "Tìm tất cả sản phẩm có giá (price) bằng NULL hoặc bằng 0.",
     "hint": "Dùng IS NULL để bắt giá chưa nhập và <= 0 để bắt giá không hợp lệ — kết hợp bằng OR.",
     "sql": "SELECT product_id,\n"
            "       product_name,\n"
            "       price\n"
            "FROM   Products\n"
            "WHERE  price IS NULL\n"
            "    OR price <= 0;",
     "answer": "Chỉ PROD_006 (Speaker JB, price = NULL) khớp; trong data mẫu không sản phẩm "
               "nào có price ≤ 0. Tương tự Câu 14 nhưng áp cho cột price thay vì stock: "
               "NULL = chưa nhập giá; ≤ 0 = giá âm hoặc miễn phí ngoài ý muốn."},

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
     "answer": "6 đơn có item (ORD_004 rỗng nên không hiện): "
               "ORD_001=62M · ORD_002=31M · ORD_007=20M · ORD_003=8M · ORD_006=8M · ORD_005=3M. "
               "ORD_001 đứng đầu nhưng bị thổi phồng do item trùng (62M vs total_amount ghi 32M) — "
               "luôn đối soát hai con số này (Câu 13)."},
    {"part": 2, "code": "3.2",
     "prompt": "Mỗi danh mục (category) có bao nhiêu sản phẩm, kể cả sản phẩm chưa bán?",
     "hint": "Đếm trực tiếp trên bảng Products (không JOIN Order_Items), GROUP BY category.",
     "sql": "SELECT category,\n"
            "       COUNT(*) AS so_sp\n"
            "FROM   Products\n"
            "GROUP  BY category\n"
            "ORDER  BY so_sp DESC;",
     "answer": "Phu kien (7) · Dien thoai (1). Vì đếm trên Products nên bao gồm cả sản phẩm "
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
     "answer": "C001 (67M). Trung bình ba khách có đơn ≈ 34.3M ((67+20+16)/3); chỉ C001 vượt. "
               "C001 có 3 đơn (ORD_001+ORD_005+ORD_007=67M), C003 có 2 đơn (ORD_003+ORD_006=16M). "
               "Mẫu 'so với trung bình của chính tập' là nền của phân tích outlier — Câu 48 dùng CTE "
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
               "tài khoản nhân bản hoặc dữ liệu test được đánh số thủ công (Câu 31)."},
    {"part": 3, "code": "4.3",
     "prompt": "Tìm các tên sản phẩm bị trùng sau khi chuẩn hóa (bỏ khoảng trắng + đưa về chữ thường).",
     "hint": "GROUP BY LOWER(TRIM(product_name)) rồi HAVING COUNT(*) > 1.",
     "sql": "SELECT LOWER(TRIM(product_name)) AS ten_chuan,\n"
            "       COUNT(*) AS so_lan\n"
            "FROM   Products\n"
            "GROUP  BY LOWER(TRIM(product_name))\n"
            "HAVING COUNT(*) > 1;",
     "answer": "'key logi' xuất hiện 3 lần (PROD_002, PROD_005, PROD_008). Chuẩn hóa "
               "trước khi GROUP giúp bắt cả bản gõ sai (PROD_008: thường + dư khoảng trắng) mà so "
               "khớp thô bỏ sót (Câu 35)."},

    # ---- PHẦN 5 — Audit, log và dấu vết ----
    {"part": 4, "code": "5.1",
     "prompt": "Liệt kê các đơn đã bị xóa mềm (deleted_at có giá trị) kèm số ngày từ lúc đặt "
               "đến lúc xóa (DATEDIFF) — đơn 'sống' quá ngắn là dấu vết đáng soi.",
     "hint": "WHERE deleted_at IS NOT NULL; dùng DATEDIFF(deleted_at, order_date).",
     "sql": "SELECT order_id,\n"
            "       order_date,\n"
            "       deleted_at,\n"
            "       DATEDIFF(deleted_at, order_date) AS ngay_ton_tai\n"
            "FROM   Orders\n"
            "WHERE  deleted_at IS NOT NULL;",
     "answer": "ORD_005 — đặt và xóa cùng ngày 2026-06-25 → ngay_ton_tai = 0. Đơn bị hủy ngay "
               "trong ngày thường là đặt nhầm, test, hoặc thao tác gian lận — dấu vết audit "
               "cần đối chiếu với log thao tác."},
    {"part": 4, "code": "5.2",
     "prompt": "Tìm các item vẫn còn trong Order_Items nhưng thuộc đơn hàng đã bị xóa mềm "
               "(deleted_at IS NOT NULL) — dấu vết dọn dẹp không triệt để.",
     "hint": "JOIN Order_Items với Orders, lọc WHERE o.deleted_at IS NOT NULL.",
     "sql": "SELECT oi.item_id,\n"
            "       oi.order_id,\n"
            "       oi.product_id\n"
            "FROM   Order_Items oi\n"
            "JOIN   Orders o ON oi.order_id = o.order_id\n"
            "WHERE  o.deleted_at IS NOT NULL;",
     "answer": "Item 8 (PROD_004) và item 9 (PROD_002) — cả hai thuộc ORD_005 đã xóa mềm nhưng "
               "item chưa được dọn. Nếu báo cáo doanh số tính thẳng từ Order_Items mà không JOIN "
               "sang Orders để lọc deleted_at, hai item này vẫn bị cộng vào — đúng mẫu rò rỉ ở Câu 40."},

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
     "answer": "PROD_001 90M (hạng 1) · PROD_004 22M (hạng 2) · PROD_003 16M (hạng 3) · PROD_002 4M (hạng 4). "
               "Xếp hạng đúng kỹ thuật nhưng 90M của PROD_001 bị thổi phồng do item trùng — "
               "dữ liệu nền vẫn bẩn (Câu 47). PROD_002 chỉ 4M vì item 12 có quantity=0 (không đóng góp doanh số)."},
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

