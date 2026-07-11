# -*- coding: utf-8 -*-
"""Nội dung Sách #2 (bản mẫu để duyệt format) — "SQL cho Data Tester Ngân hàng".
Dữ liệu minh họa HƯ CẤU (khớp book2/sql/banking_dwh_setup.sql, đã verify trên MySQL 9.7)."""

BOOK_TITLE = "SQL CHO DATA TESTER NGÂN HÀNG"

# --- PHẦN 0: các mục kể chuyện (title, html_body) ---
PART0 = [
 ("0.1 · Data Tester ngân hàng đứng ở đâu trong dòng chảy dữ liệu",
  "Một ngân hàng có nhiều <b>hệ nguồn</b> ghi nhận nghiệp vụ hằng ngày: hệ core banking (tài khoản, "
  "tiền gửi, khoản vay), hệ quản lý thẻ, hệ khởi tạo khoản vay (LOS), hệ quản trị khách hàng (CRM). "
  "Dữ liệu từ các hệ này được các luồng <b>ETL</b> gom về vùng đệm (Staging), biến đổi theo quy tắc "
  "nghiệp vụ, rồi nạp vào <b>Kho dữ liệu (Data Warehouse / Data Mart)</b> để lên báo cáo BI và phục vụ "
  "chấm điểm tín dụng.<br/>"
  "Data Tester là người <b>đảm bảo dữ liệu chảy đúng qua từng tầng</b> — không mất mát, không sai lệch, "
  "không trùng lặp. Công cụ chính là SQL: viết truy vấn độc lập để đối soát và kiểm chứng."),
 ("0.2 · OLTP và OLAP — nguồn và đích của ETL",
  "<b>OLTP</b> (xử lý giao dịch trực tuyến) là các hệ nguồn: ghi/đọc/cập nhật liên tục ở mức chi tiết "
  "từng giao dịch — ví dụ rút tiền ATM, chuyển khoản. Đây thường là <b>nguồn</b> của ETL.<br/>"
  "<b>OLAP</b> (xử lý phân tích trực tuyến) là kho dữ liệu: đọc khối lượng lớn dữ liệu lịch sử, tính "
  "tổng hợp phục vụ báo cáo, phân tích xu hướng — thường là <b>đích</b> của ETL.<br/>"
  "Hiểu rõ hai đầu này giúp tester biết mình đang đối soát cái gì với cái gì."),
 ("0.3 · Luồng ETL và 5 bước kiểm thử",
  "ETL = Extract (trích xuất từ nguồn) → Transform (biến đổi theo quy tắc nghiệp vụ) → Load (nạp vào "
  "kho). Kiểm thử ETL đi theo năm bước: (1) đối chiếu <b>cấu trúc</b> bảng đích với tài liệu mapping; "
  "(2) kiểm tra <b>trích xuất</b> đủ dữ liệu vào Staging; (3) kiểm tra <b>biến đổi</b> đúng quy tắc "
  "bằng SQL độc lập; (4) kiểm tra <b>nạp</b> đầy đủ (lần đầu và nạp gia tăng); (5) <b>đối soát</b> số "
  "liệu tổng hợp giữa kho và nguồn, và giữa báo cáo BI với kho."),
 ("0.4 · Vì sao tester thường không truy vấn thẳng hệ core",
  "Nhiều hệ core banking (ví dụ phổ biến trong ngành là Temenos T24) lưu dữ liệu theo mô hình "
  "<b>MultiValue</b> — một trường có thể chứa nhiều giá trị lồng nhau, không phải bảng quan hệ chuẩn. "
  "Câu lệnh SQL quen thuộc như <font face='Mono' size='8.5'>SELECT * FROM ...</font> không áp thẳng "
  "được. Vì vậy dữ liệu được sao chép/chuẩn hóa sang một <b>lớp quan hệ (DWH/replica)</b> — và đó "
  "chính là nơi Data Tester dùng SQL để làm việc. Cả cuốn sách này thao tác trên lớp quan hệ đó."),
]

# --- ENTRIES: mục nghiệp vụ (bản mẫu: 1 mục) ---
ENTRIES = [
 {
  "part_code": "PHẦN 2", "part_name": "Đối soát dữ liệu (Reconciliation)",
  "id": 1,
  "title": "Đối soát tổng dư nợ giữa DWH và nguồn (Core)",
  "task":
    "Sáng ngày làm việc đầu tháng, sau khi job ETL cuối tháng chạy xong và báo 'Success', đội báo "
    "cáo phát hiện: tổng dư nợ cho vay trên báo cáo (lấy từ DWH) THẤP hơn số trên hệ thống nguồn. "
    "Trưởng nhóm giao cho bạn — Data Tester — 3 việc trước 10h: (1) xác nhận có lệch thật không "
    "hay chỉ là xem nhầm bộ lọc; (2) nếu lệch, lệch bao nhiêu và ở những bản ghi nào; "
    "(3) khoanh vùng lỗi nằm ở khâu nào của ETL để báo đội dev sửa. Báo cáo tháng chỉ được phát "
    "hành khi số liệu đã khớp.",
  "domain":
    "<b>Dư nợ gốc (outstanding principal)</b> là số tiền khách còn nợ ngân hàng tại một thời điểm. "
    "Ví dụ: vay 600 triệu, đã trả 100 triệu gốc → dư nợ gốc còn 500 triệu. Cộng dư nợ của mọi khoản "
    "vay lại là <b>tổng dư nợ</b> — một trong những con số quan trọng nhất của ngân hàng.<br/>"
    "<b>Vì sao phải đối soát con số này giữa nguồn và DWH?</b> Vì hai nơi cùng nói về một thứ nhưng "
    "đi hai đường: nguồn ghi trực tiếp từ nghiệp vụ, còn DWH nhận qua ETL — mọi sai sót của ETL đều "
    "đọng lại ở đây. Nếu DWH thiếu mà không ai phát hiện:<br/>"
    "• Báo cáo gửi <b>Ngân hàng Nhà nước</b> sai — quy định yêu cầu khớp tuyệt đối;<br/>"
    "• <b>Trích lập dự phòng rủi ro</b> (tiền phải để dành cho nợ xấu) tính thiếu;<br/>"
    "• Lãnh đạo ra quyết định trên <b>dashboard BI</b> với con số thấp hơn thực tế.<br/>"
    "Vì vậy đối soát tổng là <b>phép khám nhanh chạy ĐẦU TIÊN</b> sau mỗi lần ETL: chỉ 2 câu SQL, "
    "vài giây, biết ngay hệ có khỏe không — dù trong quy trình 5 bước nó là bước xác nhận cuối.<br/>"
    "<b>Vì sao số có thể lệch dù job 'Success'?</b> 'Success' chỉ nghĩa là job chạy xong không lỗi "
    "kỹ thuật. Bẫy kinh điển: khi nạp DWH, ETL thường <b>JOIN</b> bảng khoản vay với <b>bảng chiều</b> "
    "(dim) để lấy tên chi nhánh, tên sản phẩm. Nếu dùng <b>INNER JOIN</b> mà bảng chiều thiếu một "
    "khóa (chi nhánh mới mở chưa kịp khai báo), toàn bộ bản ghi mang khóa đó bị <b>loại âm thầm</b> "
    "— không lỗi, không cảnh báo, chỉ mất số.",
  "data_note":
    "Nguồn: <b>src_loans</b> (dư nợ từng khoản — cột outstanding_principal). Đích: <b>dwh_loans</b> "
    "(đã nạp qua ETL). Bảng chiều: <b>dim_branch</b> — trong data mẫu CỐ Ý thiếu chi nhánh mới 'B03'.",
  "sql":
    "-- (1) Đối soát tổng & số lượng giữa nguồn và DWH\n"
    "SELECT 'Nguồn (Core)' AS tang,\n"
    "       COUNT(*)                    AS so_khoan,\n"
    "       SUM(outstanding_principal)  AS tong_du_no\n"
    "FROM   src_loans\n"
    "UNION ALL\n"
    "SELECT 'DWH', COUNT(*), SUM(outstanding_principal)\n"
    "FROM   dwh_loans;\n"
    "\n"
    "-- (2) Nếu lệch: truy các khoản CÓ ở nguồn nhưng THIẾU ở DWH\n"
    "SELECT loan_id, branch_id, outstanding_principal FROM src_loans\n"
    "EXCEPT\n"
    "SELECT loan_id, branch_id, outstanding_principal FROM dwh_loans;",
  "clause_groups": [
    ("Câu (1) — Đối soát tổng &amp; số lượng (2 khối ghép bằng UNION ALL)", [
      ("Khối 1:\nFROM src_loans",
       "<b>Chạy trước tiên</b>: mở bảng khoản vay ở TẦNG NGUỒN — 8 dòng, mỗi dòng một khoản vay "
       "(L001 → L008)."),
      ("COUNT(*)\nSUM(outstanding_principal)",
       "Trên 8 dòng đó, đếm số khoản và cộng dư nợ gốc:<br/>"
       "• COUNT(*) = <b>8</b> khoản;<br/>"
       "• SUM = 500tr + 300tr + 1.200tr + 800tr + 450tr + 250tr + 150tr + 600tr = <b>4.250.000.000</b>.<br/>"
       "Viết ở đầu câu nhưng chạy ở bước SELECT — sau khi đã có dữ liệu từ FROM."),
      ("'Nguồn (Core)' AS tang",
       "Gắn nhãn chữ cố định cho dòng kết quả — để khi ghép hai khối, biết dòng nào của tầng nào."),
      ("Khối 2:\nFROM dwh_loans\n+ COUNT / SUM",
       "Khối 2 làm Y HỆT khối 1 nhưng trên bảng TẦNG ĐÍCH (DWH): đếm được <b>6</b> khoản, "
       "tổng <b>3.550.000.000</b> (thiếu L005 + L006 = 700tr so với nguồn)."),
      ("UNION ALL",
       "Ghép kết quả khối 1 và khối 2 thành bảng 2 dòng nằm cạnh nhau để so bằng mắt. "
       "Dùng <b>ALL</b> để giữ nguyên mọi dòng — không gộp trùng (UNION thường sẽ gộp, "
       "nếu hai tầng tình cờ ra số giống nhau sẽ mất 1 dòng)."),
    ]),
    ("Câu (2) — Truy dòng lệch bằng EXCEPT (chỉ chạy khi câu 1 cho thấy lệch)", [
      ("Vế trên:\nSELECT loan_id, branch_id,\n  outstanding_principal\nFROM src_loans",
       "Tập A: toàn bộ 8 khoản ở nguồn, lấy 3 cột đủ nhận diện một khoản vay (mã, chi nhánh, dư nợ)."),
      ("EXCEPT",
       "Phép TRỪ TẬP HỢP: lấy các dòng CÓ trong tập A (nguồn) nhưng KHÔNG có trong tập B (DWH) — "
       "chính là các bản ghi bị rơi rớt trên đường ETL.<br/>"
       "Ở data mẫu: 8 dòng − 6 dòng khớp = trả về <b>L005 và L006</b>.<br/>"
       "Lưu ý: EXCEPT so <b>toàn bộ cột</b> trong SELECT — chỉ cần 1 cột lệch (vd dư nợ bị làm tròn "
       "khác) là dòng đó cũng bị coi là 'không khớp'."),
      ("Vế dưới:\nSELECT ... FROM dwh_loans",
       "Tập B: các khoản đang có ở DWH, cùng 3 cột và cùng thứ tự cột với tập A — bắt buộc, "
       "vì EXCEPT so theo vị trí cột, không so theo tên cột."),
    ]),
  ],
  "result_groups": [
    ("Kết quả câu (1) — bảng đối soát tổng:",
     ["tang", "so_khoan", "tong_du_no (VND)"],
     [["Nguồn (Core)", "8", "4.250.000.000"],
      ["DWH", "6", "3.550.000.000"]]),
    ("Kết quả câu (2) — các khoản CÓ ở nguồn nhưng THIẾU ở DWH:",
     ["loan_id", "branch_id", "outstanding_principal (VND)"],
     [["L005", "B03", "450.000.000"],
      ["L006", "B03", "250.000.000"]]),
  ],
  "result_note":
    "<b>Đọc câu (1):</b> hai dòng lệch nhau cả về số lượng (8 vs 6 khoản) lẫn giá trị "
    "(4.250 vs 3.550 tỷ) → xác nhận CÓ lệch thật, thiếu <b>2 khoản / 700.000.000đ</b> — không phải "
    "do xem nhầm bộ lọc.<br/>"
    "<b>Đọc câu (2):</b> chỉ đích danh 2 khoản bị thiếu là <b>L005</b> và <b>L006</b>; cột branch_id "
    "cho manh mối quyết định — cả hai đều thuộc <b>B03</b> (chi nhánh mới mở). Cộng dư nợ 2 khoản: "
    "450tr + 250tr = đúng 700tr đã lệch ở câu (1) — hai kết quả khớp nhau.<br/>"
    "<b>Kết luận:</b> ETL nạp DWH bằng INNER JOIN với dim_branch, mà B03 chưa được khai báo trong "
    "bảng chiều nên mọi bản ghi mang B03 bị loại. Đủ thông tin để báo đội dev: thêm B03 vào "
    "dim_branch + đổi INNER JOIN thành LEFT JOIN.",
  "note":
    "Lệch tổng thì ĐỪNG vội kết luận 'ETL sai toàn bộ' — luôn truy đúng <b>dòng lệch</b> trước (bước "
    "2) rồi mới tìm nguyên nhân.<br/>"
    "Các dòng lệch ở đây cùng thuộc một chi nhánh mới → nghi ngay JOIN với bảng chiều. Đề xuất đội "
    "ETL đổi sang <b>LEFT JOIN</b> và xử lý khóa thiếu (gán 'Chưa xác định') thay vì INNER JOIN làm "
    "mất dòng.<br/>"
    "Bẫy 'thời điểm': đối soát chỉ đúng khi nguồn và DWH cùng một mốc chụp (EOD). Nếu nguồn đã sang "
    "ngày mới mà DWH còn số cũ, lệch là do lệch thời điểm chứ không phải lỗi ETL — luôn xác nhận mốc "
    "dữ liệu trước khi kết luận.",
  "dialect_table": (
    ["Hệ quản trị", "Từ khóa", "Ghi chú"],
    [
      ["SQL Server · PostgreSQL · MySQL 8.0.31+", ("mono", "EXCEPT"),
       "Dùng nguyên câu lệnh như trong sách."],
      ["Oracle", ("mono", "MINUS"),
       "Cùng ý nghĩa với EXCEPT — chỉ khác từ khóa."],
      ["MySQL cũ (trước 8.0.31)", ("mono", "LEFT JOIN"),
       "Chưa có EXCEPT — tìm dòng không khớp bằng LEFT JOIN (câu thay thế bên dưới)."],
    ],
  ),
  "dialect_note": "Câu thay thế trên MySQL cũ:",
  "dialect_code":
    "SELECT s.loan_id, s.branch_id, s.outstanding_principal\n"
    "FROM   src_loans s\n"
    "LEFT   JOIN dwh_loans d\n"
    "       ON s.loan_id = d.loan_id\n"
    "WHERE  d.loan_id IS NULL;   -- không có bên DWH → dòng bị thiếu",
 },
]

# --- TỪ ĐIỂN DỮ LIỆU: giải thích từng trường (table, [(field, type, meaning)]) ---
DATA_DICT = [
 ("src_customers — Khách hàng (CIF)", [
   ("cif","VARCHAR(10)","Mã định danh khách hàng — DUY NHẤT toàn hệ thống (khóa chính). Mọi tài khoản/vay/thẻ đều móc về đây."),
   ("full_name","VARCHAR(100)","Họ tên khách hàng."),
   ("dob","DATE","Ngày sinh."),
   ("id_number","VARCHAR(20)","Số CCCD/CMND — thuộc dữ liệu định danh, cần che khi đưa ra môi trường test."),
   ("phone","VARCHAR(20)","Số điện thoại liên lạc."),
   ("segment","VARCHAR(20)","Phân khúc khách: RETAIL / PRIORITY / SME."),
   ("kyc_status","VARCHAR(20)","Tình trạng định danh: FULL (đủ) / PENDING (thiếu hồ sơ)."),
   ("last_updated_date","DATE","Ngày cập nhật gần nhất — mốc để ETL nạp gia tăng (chỉ lấy bản ghi thay đổi)."),
 ]),
 ("src_accounts — Tài khoản", [
   ("account_no","VARCHAR(16)","Số tài khoản (khóa chính)."),
   ("cif","VARCHAR(10)","Khóa ngoại → khách hàng sở hữu tài khoản."),
   ("branch_id","VARCHAR(10)","Khóa ngoại → chi nhánh mở tài khoản."),
   ("product_code","VARCHAR(10)","Khóa ngoại → loại sản phẩm (CASA / tiết kiệm…)."),
   ("currency","CHAR(3)","Loại tiền: VND / USD…"),
   ("status","VARCHAR(12)","Trạng thái: ACTIVE / DORMANT (ngủ đông) / CLOSED (đã đóng)."),
   ("open_date","DATE","Ngày mở tài khoản."),
   ("balance","DECIMAL(18,2)","Số dư hiện tại. Dùng DECIMAL để không sai số khi cộng dồn."),
   ("last_updated_date","DATE","Mốc cập nhật cho nạp gia tăng."),
 ]),
 ("src_transactions — Giao dịch (bút toán)", [
   ("txn_id","BIGINT","Mã giao dịch (khóa chính)."),
   ("account_no","VARCHAR(16)","Khóa ngoại → tài khoản phát sinh giao dịch."),
   ("txn_date","DATE","Ngày ghi sổ giao dịch."),
   ("value_date","DATE","Ngày hiệu lực (có thể khác ngày ghi sổ — vd cuối tuần, lễ)."),
   ("dr_cr","CHAR(1)","'D' = ghi Nợ (tiền ra) / 'C' = ghi Có (tiền vào)."),
   ("amount","DECIMAL(18,2)","Số tiền giao dịch (luôn dương; chiều tiền do dr_cr quyết định)."),
   ("channel","VARCHAR(10)","Kênh: ATM / POS / IB (internet banking) / TELLER (quầy)."),
   ("description","VARCHAR(100)","Diễn giải giao dịch."),
 ]),
 ("src_loans — Khoản vay", [
   ("loan_id","VARCHAR(10)","Mã khoản vay (khóa chính)."),
   ("cif","VARCHAR(10)","Khóa ngoại → khách hàng vay."),
   ("branch_id","VARCHAR(10)","Khóa ngoại → chi nhánh cấp khoản vay."),
   ("principal","DECIMAL(18,2)","Số tiền vay gốc ban đầu."),
   ("outstanding_principal","DECIMAL(18,2)","Dư nợ gốc còn lại hiện tại."),
   ("dpd","INT","Số ngày quá hạn (Days Past Due) — cơ sở phân nhóm nợ 1–5."),
   ("status","VARCHAR(12)","Trạng thái khoản vay: ACTIVE / CLOSED."),
   ("disburse_date","DATE","Ngày giải ngân."),
 ]),
 ("src_cards — Thẻ", [
   ("card_id","VARCHAR(12)","Mã thẻ (khóa chính)."),
   ("account_no","VARCHAR(16)","Khóa ngoại → tài khoản gắn thẻ."),
   ("card_number_masked","VARCHAR(25)","Số thẻ đã che (giữ 6 số đầu + 4 số cuối) — tuân thủ bảo mật thẻ."),
   ("card_type","VARCHAR(10)","DEBIT (ghi nợ) / CREDIT (tín dụng)."),
   ("credit_limit","DECIMAL(18,2)","Hạn mức tín dụng được cấp (thẻ tín dụng)."),
   ("current_outstanding","DECIMAL(18,2)","Dư nợ thẻ hiện tại. Hạn mức khả dụng = hạn mức − dư nợ − giao dịch chờ."),
   ("status","VARCHAR(12)","ACTIVE / BLOCKED (khóa) / EXPIRED (hết hạn)."),
   ("expiry_date","DATE","Ngày hết hạn thẻ."),
 ]),
 ("src_loan_schedule — Lịch trả nợ", [
   ("loan_id","VARCHAR(10)","Khóa ngoại → khoản vay (cùng installment_no tạo khóa chính)."),
   ("installment_no","INT","Kỳ trả thứ mấy."),
   ("due_date","DATE","Ngày đến hạn của kỳ."),
   ("principal_due","DECIMAL(18,2)","Gốc phải trả kỳ này (tổng các kỳ = gốc vay ban đầu)."),
   ("interest_due","DECIMAL(18,2)","Lãi phải trả kỳ này (giảm dần theo dư nợ)."),
   ("status","VARCHAR(10)","PAID (đã trả) / DUE (đến hạn) / OVERDUE (quá hạn)."),
 ]),
 ("gl_balances — Sổ cái (General Ledger)", [
   ("gl_account_code","VARCHAR(20)","Mã tài khoản kế toán trên sổ cái (khóa chính)."),
   ("gl_account_name","VARCHAR(100)","Tên tài khoản kế toán (vd 'Cho vay khách hàng')."),
   ("balance","DECIMAL(18,2)","Số dư sổ cái — phải khớp tổng chi tiết (sub-ledger) tương ứng."),
   ("snapshot_date","DATE","Ngày chốt số liệu (EOD)."),
 ]),
]
