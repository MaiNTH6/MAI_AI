-- ============================================================
--  FILE:    ecommerce_test_setup.sql
--  DÙNG CHO: Cẩm nang "50 câu lệnh SQL săn Bug thực chiến cho QA"
--            Phát hành bởi maiqai.com
-- ============================================================
--
--  MỤC ĐÍCH
--  --------
--  Tạo database mẫu ecommerce_test với dữ liệu có sẵn lỗi (bug)
--  để bạn thực hành chạy từng câu SQL trong sách và thấy kết quả thực tế.
--  Mỗi bug trong data tương ứng với ít nhất một câu lệnh trong sách.
--
--  YÊU CẦU
--  -------
--  - MySQL 5.7 trở lên (hoặc MariaDB 10.3+)
--  - Tài khoản có quyền CREATE DATABASE, CREATE TABLE, INSERT
--
--  CÁCH CHẠY — MySQL Workbench
--  ----------------------------
--  1. Mở MySQL Workbench, kết nối vào server MySQL của bạn
--  2. Chọn File → Open SQL Script → chọn file này
--  3. Nhấn Execute All (Ctrl+Shift+Enter hoặc nút sét ⚡ trên toolbar)
--  4. Chờ kết quả hiện ra ở tab bên dưới — nếu không có lỗi đỏ là thành công
--  5. Ở góc trái chọn Schemas → Refresh → thấy database ecommerce_test là xong
--
--  CÁCH CHẠY — MySQL CLI (command line)
--  --------------------------------------
--  mysql -u root -p < ecommerce_test_setup.sql
--
--  LƯU Ý
--  ------
--  - Script dùng DROP TABLE nên MỖI LẦN chạy sẽ xóa và tạo lại data từ đầu.
--    Nếu bạn đã sửa data để thử nghiệm, chạy lại file này để reset về trạng thái gốc.
--  - Không ảnh hưởng đến các database khác trên cùng server.
--
--  TỔNG QUAN DỮ LIỆU
--  ------------------
--  Customers   : 30 khách hàng (C001–C030)
--  Products    : 13 sản phẩm  (PROD_001–PROD_013)
--  Orders      : 54 đơn hàng  (ORD_001–ORD_054)
--  Order_Items : 57 dòng chi tiết
--  Payments    : 57 giao dịch thanh toán (PAY_001–PAY_057)
--  Audit_Log   : 70 bản ghi lịch sử thay đổi
--  Tổng cộng   : ~281 dòng dữ liệu
--
--  BUG CÀI SẴN
--  ----------------------------------------
--  [Bảng gốc — Câu 1-50]
--  Bug-A  = ORD_001: total_amount=32M nhưng Order_Items tính ra 62M (chênh -30M)
--  Bug-B  = ORD_002: total_amount=20M nhưng Order_Items tính ra 31M (chênh -11M)
--  Bug-C  = PROD_003: stock = -5 (tồn kho âm)
--  Bug-D  = C004/C005: trùng email trung_email@email.com
--  Bug-E  = C001/C009: trùng email (không phân biệt hoa/thường)
--  Bug-F  = C006: email NULL; C007: email rỗng
--  Bug-G  = C008: khoảng trắng thừa trong tên
--  Bug-H  = C010: membership_tier = 'VIP' (ngoài danh sách)
--  Bug-I  = ORD_004: customer_id=C999 không tồn tại (orphan order)
--  Bug-J  = ORD_001/PROD_001: xuất hiện 2 lần trong Order_Items (duplicate)
--  Bug-K  = item_id=3 bị thiếu (gap trong chuỗi ID)
--  Bug-L  = PROD_005: trùng tên+giá với PROD_002 (full duplicate)
--  Bug-M  = PROD_006: price=NULL; PROD_007: stock=NULL
--
--  [Bảng Payments — dùng cho bài tập]
--  Bug-P1 = PAY_001: amount=30M nhưng ORD_001.total_amount=32M (thiếu 2M)
--  Bug-P2 = PAY_020: method='CRYPTO' (phương thức không hợp lệ)
--  Bug-P3 = PAY_025: status='PROCESSING' (trạng thái không hợp lệ)
--  Bug-P4 = PAY_040: status=FAILED nhưng ORD_040.status=COMPLETED
--  Bug-P5 = PAY_055: thanh toán thứ 2 cho ORD_015 (double charge)
--  Bug-P6 = PAY_056: order_id=ORD_999 không tồn tại (orphan payment)
--  Bug-P7 = PAY_057: amount=0 (giá trị 0 không hợp lệ)
--
--  [Bảng Audit_Log — dùng cho bài tập]
--  Bug-L1 = 5 bản ghi có changed_by=NULL (không rõ ai thay đổi)
--  Bug-L2 = 2 bản ghi có action='EDIT' (không hợp lệ, phải là UPDATE)
--  Bug-L3 = 1 bản ghi có action='REMOVE' (không hợp lệ, phải là DELETE)
--  Bug-L4 = 1 bản ghi có changed_at trước ngày tạo đơn (timestamp bất thường)
--  Bug-L5 = C020 xuất hiện trong log DELETE nhưng vẫn tồn tại (phantom delete)
-- ============================================================

CREATE DATABASE IF NOT EXISTS ecommerce_test;
USE ecommerce_test;

-- ── Drop (theo thứ tự FK) ────────────────────────────────────
DROP TABLE IF EXISTS Audit_Log;
DROP TABLE IF EXISTS Payments;
DROP TABLE IF EXISTS Order_Items;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Customers;

-- ── Tạo bảng ────────────────────────────────────────────────
CREATE TABLE Customers (
  customer_id     VARCHAR(10)   PRIMARY KEY,
  customer_name   VARCHAR(100)  NOT NULL,
  email           VARCHAR(150),
  membership_tier VARCHAR(20),
  status          VARCHAR(20)
);

CREATE TABLE Products (
  product_id   VARCHAR(10)   PRIMARY KEY,
  product_name VARCHAR(150)  NOT NULL,
  category     VARCHAR(50),
  price        DECIMAL(15,2),
  stock        INT
);

CREATE TABLE Orders (
  order_id     VARCHAR(10)   PRIMARY KEY,
  customer_id  VARCHAR(10),
  total_amount DECIMAL(15,2) NOT NULL,
  status       VARCHAR(20),
  order_date   DATE          NOT NULL
);

CREATE TABLE Order_Items (
  item_id    INT           NOT NULL,
  order_id   VARCHAR(10),
  product_id VARCHAR(10),
  quantity   INT           NOT NULL,
  price      DECIMAL(15,2) NOT NULL,
  PRIMARY KEY (item_id)
);

CREATE TABLE Payments (
  payment_id      VARCHAR(10)   PRIMARY KEY,
  order_id        VARCHAR(10),
  amount          DECIMAL(15,2) NOT NULL,
  method          VARCHAR(20),        -- CREDIT_CARD|BANK_TRANSFER|COD|MOMO|VNPAY
  status          VARCHAR(20),        -- SUCCESS|FAILED|PENDING|REFUNDED
  paid_at         DATETIME,
  transaction_ref VARCHAR(50)
);

CREATE TABLE Audit_Log (
  log_id       INT           AUTO_INCREMENT PRIMARY KEY,
  table_name   VARCHAR(50)   NOT NULL,
  record_id    VARCHAR(20)   NOT NULL,
  action       VARCHAR(20),           -- INSERT|UPDATE|DELETE
  changed_by   VARCHAR(50),
  old_value    TEXT,
  new_value    TEXT,
  changed_at   DATETIME      NOT NULL
);

-- ════════════════════════════════════════════════════════════
--  CUSTOMERS (30 rows: C001–C030)
-- ════════════════════════════════════════════════════════════
INSERT INTO Customers (customer_id, customer_name, email, membership_tier, status) VALUES
  -- Dữ liệu gốc (C001–C010) — giữ nguyên bug đã cài
  ('C001', 'Nguyen Van A',      'a.nguyen@email.com',    'Silver',   'ACTIVE'),
  ('C002', 'Tran Van B',        'b.tran@email.com',      'Standard', 'ACTIVE'),
  ('C003', 'Le Thi C',          'c.le@email.com',        'Gold',     'ACTIVE'),
  ('C004', 'Khach Hang Ao Bug', 'trung_email@email.com', 'Standard', 'ACTIVE'),  -- Bug-D
  ('C005', 'Khach Hang Trung',  'trung_email@email.com', 'Standard', 'ACTIVE'),  -- Bug-D
  ('C006', 'Pham Van X',        NULL,                    'Standard', 'ACTIVE'),  -- Bug-F
  ('C007', 'Nguyen Thi Y',      '',                      'Standard', 'ACTIVE'),  -- Bug-F
  ('C008', '  Pham Van D  ',    'd.pham@email.com',      'Gold',     'ACTIVE'),  -- Bug-G
  ('C009', 'Nguyen Van A (2)',   'A.NGUYEN@EMAIL.COM',   'Silver',   'ACTIVE'),  -- Bug-E
  ('C010', 'Khach Test VIP',    'vip@email.com',         'VIP',      'ACTIVE'),  -- Bug-H
  -- Dữ liệu mở rộng (C011–C030) — sạch, tất cả đều có đơn hàng
  ('C011', 'Hoang Van Duc',     'duc.hoang@email.com',   'Gold',     'ACTIVE'),
  ('C012', 'Nguyen Thi Hoa',    'hoa.nguyen@email.com',  'Standard', 'ACTIVE'),
  ('C013', 'Tran Minh Khoa',    'khoa.tran@email.com',   'Silver',   'ACTIVE'),
  ('C014', 'Le Thi Lan',        'lan.le@email.com',      'Platinum', 'ACTIVE'),
  ('C015', 'Pham Van Long',     'long.pham@email.com',   'Gold',     'ACTIVE'),
  ('C016', 'Vo Thi Mai',        'mai.vo@email.com',      'Standard', 'ACTIVE'),
  ('C017', 'Dang Van Nam',      'nam.dang@email.com',    'Silver',   'ACTIVE'),
  ('C018', 'Bui Thi Oanh',      'oanh.bui@email.com',    'Gold',     'ACTIVE'),
  ('C019', 'Do Van Phuc',       'phuc.do@email.com',     'Standard', 'ACTIVE'),
  ('C020', 'Nguyen Thi Quynh',  'quynh.nguyen@email.com','Silver',   'ACTIVE'),
  ('C021', 'Tran Van Son',      'son.tran@email.com',    'Platinum', 'ACTIVE'),
  ('C022', 'Le Thi Thu',        'thu.le@email.com',      'Gold',     'ACTIVE'),
  ('C023', 'Pham Van Tuan',     'tuan.pham@email.com',   'Standard', 'ACTIVE'),
  ('C024', 'Hoang Thi Uyen',    'uyen.hoang@email.com',  'Silver',   'ACTIVE'),
  ('C025', 'Vo Van Viet',       'viet.vo@email.com',     'Gold',     'ACTIVE'),
  ('C026', 'Dang Thi Xuan',     'xuan.dang@email.com',   'Standard', 'ACTIVE'),
  ('C027', 'Bui Van Yen',       'yen.bui@email.com',     'Silver',   'ACTIVE'),
  ('C028', 'Do Thi Hang',       'hang.do@email.com',     'Gold',     'ACTIVE'),
  ('C029', 'Nguyen Van Binh',   'binh.nguyen2@email.com','Standard', 'ACTIVE'),
  ('C030', 'Tran Thi Chi',      'chi.tran@email.com',    'Platinum', 'ACTIVE');

-- ════════════════════════════════════════════════════════════
--  PRODUCTS (13 rows: PROD_001–PROD_013)
-- ════════════════════════════════════════════════════════════
INSERT INTO Products (product_id, product_name, category, price, stock) VALUES
  -- Dữ liệu gốc (PROD_001–PROD_007) — giữ nguyên bug
  ('PROD_001', 'iPhone 15 Pro Max',          'Dien thoai', 30000000,   50),
  ('PROD_002', 'Ban phim co Logitech',       'Phu kien',    2000000,  100),
  ('PROD_003', 'Tai nghe Sony WH-1000XM5',  'Phu kien',    8000000,   -5),  -- Bug-C
  ('PROD_004', 'Sac du phong Anker',         'Phu kien',    1000000,   20),
  ('PROD_005', 'Ban phim co Logitech',       'Phu kien',    2000000,   30),  -- Bug-L
  ('PROD_006', 'Loa Bluetooth JBL',          'Phu kien',       NULL,   10),  -- Bug-M
  ('PROD_007', 'Chuot gaming Razer',         'Phu kien',    1500000, NULL),  -- Bug-M
  -- Dữ liệu mở rộng (PROD_008–PROD_013) — sạch, tất cả đều có đơn
  ('PROD_008', 'Man hinh Samsung 24 inch',   'Dien tu',     5000000,  100),
  ('PROD_009', 'Ghe cong thai hoc ErgoMax',  'Noi that',    3500000,  100),
  ('PROD_010', 'Webcam Logitech C920',       'Phu kien',    7200000,  100),
  ('PROD_011', 'SSD Samsung 500GB',          'Luu tru',     2800000,  100),
  ('PROD_012', 'RAM DDR4 8GB Kingston',      'Luu tru',     2200000,  100),
  ('PROD_013', 'Cap USB-C sac nhanh 2m',    'Phu kien',    1800000,  100);

-- ════════════════════════════════════════════════════════════
--  ORDERS (54 rows: ORD_001–ORD_054)
-- ════════════════════════════════════════════════════════════
INSERT INTO Orders (order_id, customer_id, total_amount, status, order_date) VALUES
  -- Dữ liệu gốc (ORD_001–ORD_004) — giữ nguyên bug
  ('ORD_001', 'C001', 32000000, 'COMPLETED', '2026-06-20'),  -- Bug-A
  ('ORD_002', 'C002', 20000000, 'COMPLETED', '2026-06-22'),  -- Bug-B
  ('ORD_003', 'C003',  8000000, 'CANCELLED', '2026-06-23'),
  ('ORD_004', 'C999',  5000000, 'PENDING',   '2026-06-24'),  -- Bug-I
  -- Dữ liệu mở rộng (ORD_005–ORD_054) — không trồng bug mới
  ('ORD_005', 'C011',  5000000, 'COMPLETED', '2025-01-15'),
  ('ORD_006', 'C012',  3500000, 'COMPLETED', '2025-01-22'),
  ('ORD_007', 'C013',  2800000, 'PROCESSING','2025-02-03'),
  ('ORD_008', 'C014',  2200000, 'COMPLETED', '2025-02-10'),
  ('ORD_009', 'C015',  1800000, 'COMPLETED', '2025-02-18'),
  ('ORD_010', 'C016',  5000000, 'COMPLETED', '2025-02-25'),
  ('ORD_011', 'C017',  7200000, 'COMPLETED', '2025-03-05'),
  ('ORD_012', 'C018',  5000000, 'PROCESSING','2025-03-12'),
  ('ORD_013', 'C019',  1000000, 'CANCELLED', '2025-03-20'),
  ('ORD_014', 'C020',  2800000, 'COMPLETED', '2025-03-27'),
  ('ORD_015', 'C021',  2200000, 'COMPLETED', '2025-04-04'),
  ('ORD_016', 'C022',  1800000, 'COMPLETED', '2025-04-11'),
  ('ORD_017', 'C023',  5000000, 'COMPLETED', '2025-04-18'),
  ('ORD_018', 'C024',  3500000, 'PENDING',   '2025-04-25'),
  ('ORD_019', 'C025',  7200000, 'COMPLETED', '2025-05-02'),
  ('ORD_020', 'C026',  2800000, 'COMPLETED', '2025-05-09'),
  ('ORD_021', 'C027',  2200000, 'PROCESSING','2025-05-16'),
  ('ORD_022', 'C028',  5000000, 'COMPLETED', '2025-05-23'),
  ('ORD_023', 'C029',  1800000, 'COMPLETED', '2025-05-30'),
  ('ORD_024', 'C030',  7200000, 'COMPLETED', '2025-06-06'),
  ('ORD_025', 'C011',  2800000, 'COMPLETED', '2025-06-13'),
  ('ORD_026', 'C012',  5000000, 'COMPLETED', '2025-06-20'),
  ('ORD_027', 'C013',  3500000, 'COMPLETED', '2025-07-04'),
  ('ORD_028', 'C014',  2200000, 'COMPLETED', '2025-07-11'),
  ('ORD_029', 'C015',  1000000, 'PENDING',   '2025-07-18'),
  ('ORD_030', 'C016',  7200000, 'COMPLETED', '2025-07-25'),
  ('ORD_031', 'C017',  5000000, 'COMPLETED', '2025-08-01'),
  ('ORD_032', 'C018',  2800000, 'COMPLETED', '2025-08-08'),
  ('ORD_033', 'C019',  2200000, 'COMPLETED', '2025-08-15'),
  ('ORD_034', 'C020',  3500000, 'PROCESSING','2025-08-22'),
  ('ORD_035', 'C021',  5000000, 'COMPLETED', '2025-08-29'),
  ('ORD_036', 'C022',  7200000, 'COMPLETED', '2025-09-05'),
  ('ORD_037', 'C023',  1800000, 'COMPLETED', '2025-09-12'),
  ('ORD_038', 'C024',  5000000, 'COMPLETED', '2025-09-19'),
  ('ORD_039', 'C025',  2800000, 'COMPLETED', '2025-09-26'),
  ('ORD_040', 'C026',  2200000, 'COMPLETED', '2025-10-03'),
  ('ORD_041', 'C027',  1800000, 'PENDING',   '2025-10-10'),
  ('ORD_042', 'C028',  7200000, 'COMPLETED', '2025-10-17'),
  ('ORD_043', 'C029',  3500000, 'COMPLETED', '2025-10-24'),
  ('ORD_044', 'C030',  2800000, 'COMPLETED', '2025-10-31'),
  ('ORD_045', 'C011',  5000000, 'COMPLETED', '2025-11-07'),
  ('ORD_046', 'C012',  1800000, 'COMPLETED', '2025-11-14'),
  ('ORD_047', 'C013',  2200000, 'COMPLETED', '2025-11-21'),
  ('ORD_048', 'C014',  3500000, 'PROCESSING','2025-11-28'),
  ('ORD_049', 'C015',  7200000, 'COMPLETED', '2025-12-05'),
  ('ORD_050', 'C016',  5000000, 'COMPLETED', '2025-12-12'),
  ('ORD_051', 'C017',  2800000, 'COMPLETED', '2025-12-19'),
  ('ORD_052', 'C018',  2200000, 'COMPLETED', '2026-01-02'),
  ('ORD_053', 'C019',  1800000, 'COMPLETED', '2026-01-09'),
  ('ORD_054', 'C020',  5000000, 'COMPLETED', '2026-01-16');

-- ════════════════════════════════════════════════════════════
--  ORDER_ITEMS (57 rows: item_id 1–57, gap tại item_id=3)
-- ════════════════════════════════════════════════════════════
INSERT INTO Order_Items (item_id, order_id, product_id, quantity, price) VALUES
  -- Dữ liệu gốc (item 1–7) — giữ nguyên bug
  (1, 'ORD_001', 'PROD_001', 1, 30000000),
  (2, 'ORD_001', 'PROD_002', 1,  2000000),
  -- item_id=3 bỏ trống → Bug-K (gap)
  (4, 'ORD_002', 'PROD_001', 1, 30000000),
  (5, 'ORD_002', 'PROD_004', 1,  1000000),
  (6, 'ORD_003', 'PROD_003', 1,  8000000),
  (7, 'ORD_001', 'PROD_001', 1, 30000000),  -- Bug-J (duplicate ORD_001+PROD_001)
  -- Dữ liệu mở rộng (item 8–57)
  ( 8, 'ORD_005', 'PROD_008', 1,  5000000),
  ( 9, 'ORD_006', 'PROD_009', 1,  3500000),
  (10, 'ORD_007', 'PROD_011', 1,  2800000),
  (11, 'ORD_008', 'PROD_012', 1,  2200000),
  (12, 'ORD_009', 'PROD_013', 1,  1800000),
  (13, 'ORD_010', 'PROD_008', 1,  5000000),
  (14, 'ORD_011', 'PROD_010', 1,  7200000),
  (15, 'ORD_012', 'PROD_008', 1,  5000000),
  (16, 'ORD_013', 'PROD_004', 1,  1000000),
  (17, 'ORD_014', 'PROD_011', 1,  2800000),
  (18, 'ORD_015', 'PROD_012', 1,  2200000),
  (19, 'ORD_016', 'PROD_013', 1,  1800000),
  (20, 'ORD_017', 'PROD_008', 1,  5000000),
  (21, 'ORD_018', 'PROD_009', 1,  3500000),
  (22, 'ORD_019', 'PROD_010', 1,  7200000),
  (23, 'ORD_020', 'PROD_011', 1,  2800000),
  (24, 'ORD_021', 'PROD_012', 1,  2200000),
  (25, 'ORD_022', 'PROD_008', 1,  5000000),
  (26, 'ORD_023', 'PROD_013', 1,  1800000),
  (27, 'ORD_024', 'PROD_010', 1,  7200000),
  (28, 'ORD_025', 'PROD_011', 1,  2800000),
  (29, 'ORD_026', 'PROD_008', 1,  5000000),
  (30, 'ORD_027', 'PROD_009', 1,  3500000),
  (31, 'ORD_028', 'PROD_012', 1,  2200000),
  (32, 'ORD_029', 'PROD_004', 1,  1000000),
  (33, 'ORD_030', 'PROD_010', 1,  7200000),
  (34, 'ORD_031', 'PROD_008', 1,  5000000),
  (35, 'ORD_032', 'PROD_011', 1,  2800000),
  (36, 'ORD_033', 'PROD_012', 1,  2200000),
  (37, 'ORD_034', 'PROD_009', 1,  3500000),
  (38, 'ORD_035', 'PROD_008', 1,  5000000),
  (39, 'ORD_036', 'PROD_010', 1,  7200000),
  (40, 'ORD_037', 'PROD_013', 1,  1800000),
  (41, 'ORD_038', 'PROD_008', 1,  5000000),
  (42, 'ORD_039', 'PROD_011', 1,  2800000),
  (43, 'ORD_040', 'PROD_012', 1,  2200000),
  (44, 'ORD_041', 'PROD_013', 1,  1800000),
  (45, 'ORD_042', 'PROD_010', 1,  7200000),
  (46, 'ORD_043', 'PROD_009', 1,  3500000),
  (47, 'ORD_044', 'PROD_011', 1,  2800000),
  (48, 'ORD_045', 'PROD_008', 1,  5000000),
  (49, 'ORD_046', 'PROD_013', 1,  1800000),
  (50, 'ORD_047', 'PROD_012', 1,  2200000),
  (51, 'ORD_048', 'PROD_009', 1,  3500000),
  (52, 'ORD_049', 'PROD_010', 1,  7200000),
  (53, 'ORD_050', 'PROD_008', 1,  5000000),
  (54, 'ORD_051', 'PROD_011', 1,  2800000),
  (55, 'ORD_052', 'PROD_012', 1,  2200000),
  (56, 'ORD_053', 'PROD_013', 1,  1800000),
  (57, 'ORD_054', 'PROD_008', 1,  5000000);

-- ════════════════════════════════════════════════════════════
--  PAYMENTS (57 rows: PAY_001–PAY_057)
--  Bug-P1: PAY_001 amount=30M nhưng ORD_001 total=32M
--  Bug-P2: PAY_020 method='CRYPTO' (không hợp lệ)
--  Bug-P3: PAY_025 status='PROCESSING' (không hợp lệ)
--  Bug-P4: PAY_040 status=FAILED nhưng ORD_040 là COMPLETED
--  Bug-P5: PAY_055 = thanh toán thứ 2 cho ORD_015 (double charge)
--  Bug-P6: PAY_056 order_id=ORD_999 không tồn tại
--  Bug-P7: PAY_057 amount=0
-- ════════════════════════════════════════════════════════════
INSERT INTO Payments (payment_id, order_id, amount, method, status, paid_at, transaction_ref) VALUES
  -- Đơn gốc
  ('PAY_001','ORD_001', 30000000,'CREDIT_CARD',  'SUCCESS',  '2026-06-20 09:15:00','TXN_P001'),  -- Bug-P1
  ('PAY_002','ORD_002', 20000000,'BANK_TRANSFER', 'SUCCESS',  '2026-06-22 14:30:00','TXN_P002'),
  ('PAY_003','ORD_003',  8000000,'COD',           'REFUNDED', '2026-06-23 16:00:00','TXN_P003'),
  ('PAY_004','ORD_004',  5000000,'MOMO',          'PENDING',  NULL,                  NULL),
  -- Đơn mở rộng
  ('PAY_005','ORD_005',  5000000,'VNPAY',         'SUCCESS',  '2025-01-15 10:00:00','TXN_P005'),
  ('PAY_006','ORD_006',  3500000,'CREDIT_CARD',   'SUCCESS',  '2025-01-22 11:30:00','TXN_P006'),
  ('PAY_007','ORD_007',  2800000,'MOMO',          'PENDING',  NULL,                  NULL),
  ('PAY_008','ORD_008',  2200000,'BANK_TRANSFER', 'SUCCESS',  '2025-02-10 14:00:00','TXN_P008'),
  ('PAY_009','ORD_009',  1800000,'VNPAY',         'SUCCESS',  '2025-02-18 09:45:00','TXN_P009'),
  ('PAY_010','ORD_010',  5000000,'CREDIT_CARD',   'SUCCESS',  '2025-02-25 13:00:00','TXN_P010'),
  ('PAY_011','ORD_011',  7200000,'BANK_TRANSFER', 'SUCCESS',  '2025-03-05 10:30:00','TXN_P011'),
  ('PAY_012','ORD_012',  5000000,'CREDIT_CARD',   'PENDING',  NULL,                  NULL),
  ('PAY_013','ORD_013',  1000000,'COD',           'REFUNDED', '2025-03-20 16:00:00','TXN_P013'),
  ('PAY_014','ORD_014',  2800000,'MOMO',          'SUCCESS',  '2025-03-27 11:00:00','TXN_P014'),
  ('PAY_015','ORD_015',  2200000,'CREDIT_CARD',   'SUCCESS',  '2025-04-04 09:00:00','TXN_P015'),
  ('PAY_016','ORD_016',  1800000,'VNPAY',         'SUCCESS',  '2025-04-11 14:30:00','TXN_P016'),
  ('PAY_017','ORD_017',  5000000,'BANK_TRANSFER', 'SUCCESS',  '2025-04-18 10:00:00','TXN_P017'),
  ('PAY_018','ORD_018',  3500000,'MOMO',          'PENDING',  NULL,                  NULL),
  ('PAY_019','ORD_019',  7200000,'CREDIT_CARD',   'SUCCESS',  '2025-05-02 09:30:00','TXN_P019'),
  ('PAY_020','ORD_020',  2800000,'CRYPTO',        'PENDING',  NULL,                  NULL),          -- Bug-P2
  ('PAY_021','ORD_021',  2200000,'BANK_TRANSFER', 'PENDING',  NULL,                  NULL),
  ('PAY_022','ORD_022',  5000000,'VNPAY',         'SUCCESS',  '2025-05-23 11:00:00','TXN_P022'),
  ('PAY_023','ORD_023',  1800000,'CREDIT_CARD',   'SUCCESS',  '2025-05-30 13:30:00','TXN_P023'),
  ('PAY_024','ORD_024',  7200000,'MOMO',          'SUCCESS',  '2025-06-06 10:00:00','TXN_P024'),
  ('PAY_025','ORD_025',  2800000,'BANK_TRANSFER', 'PROCESSING',NULL,                 NULL),          -- Bug-P3
  ('PAY_026','ORD_026',  5000000,'CREDIT_CARD',   'SUCCESS',  '2025-06-20 14:00:00','TXN_P026'),
  ('PAY_027','ORD_027',  3500000,'VNPAY',         'SUCCESS',  '2025-07-04 09:00:00','TXN_P027'),
  ('PAY_028','ORD_028',  2200000,'BANK_TRANSFER', 'SUCCESS',  '2025-07-11 11:30:00','TXN_P028'),
  ('PAY_029','ORD_029',  1000000,'COD',           'PENDING',  NULL,                  NULL),
  ('PAY_030','ORD_030',  7200000,'CREDIT_CARD',   'SUCCESS',  '2025-07-25 10:00:00','TXN_P030'),
  ('PAY_031','ORD_031',  5000000,'MOMO',          'SUCCESS',  '2025-08-01 09:30:00','TXN_P031'),
  ('PAY_032','ORD_032',  2800000,'VNPAY',         'SUCCESS',  '2025-08-08 13:00:00','TXN_P032'),
  ('PAY_033','ORD_033',  2200000,'BANK_TRANSFER', 'SUCCESS',  '2025-08-15 11:00:00','TXN_P033'),
  ('PAY_034','ORD_034',  3500000,'CREDIT_CARD',   'PENDING',  NULL,                  NULL),
  ('PAY_035','ORD_035',  5000000,'MOMO',          'SUCCESS',  '2025-08-29 10:00:00','TXN_P035'),
  ('PAY_036','ORD_036',  7200000,'VNPAY',         'SUCCESS',  '2025-09-05 14:30:00','TXN_P036'),
  ('PAY_037','ORD_037',  1800000,'CREDIT_CARD',   'SUCCESS',  '2025-09-12 09:00:00','TXN_P037'),
  ('PAY_038','ORD_038',  5000000,'BANK_TRANSFER', 'SUCCESS',  '2025-09-19 11:30:00','TXN_P038'),
  ('PAY_039','ORD_039',  2800000,'MOMO',          'SUCCESS',  '2025-09-26 10:00:00','TXN_P039'),
  ('PAY_040','ORD_040',  2200000,'CREDIT_CARD',   'FAILED',   '2025-10-03 13:00:00','TXN_P040_ERR'),-- Bug-P4
  ('PAY_041','ORD_041',  1800000,'VNPAY',         'PENDING',  NULL,                  NULL),
  ('PAY_042','ORD_042',  7200000,'BANK_TRANSFER', 'SUCCESS',  '2025-10-17 10:00:00','TXN_P042'),
  ('PAY_043','ORD_043',  3500000,'CREDIT_CARD',   'SUCCESS',  '2025-10-24 11:00:00','TXN_P043'),
  ('PAY_044','ORD_044',  2800000,'MOMO',          'SUCCESS',  '2025-10-31 09:30:00','TXN_P044'),
  ('PAY_045','ORD_045',  5000000,'VNPAY',         'SUCCESS',  '2025-11-07 14:00:00','TXN_P045'),
  ('PAY_046','ORD_046',  1800000,'CREDIT_CARD',   'SUCCESS',  '2025-11-14 10:00:00','TXN_P046'),
  ('PAY_047','ORD_047',  2200000,'BANK_TRANSFER', 'SUCCESS',  '2025-11-21 11:30:00','TXN_P047'),
  ('PAY_048','ORD_048',  3500000,'MOMO',          'PENDING',  NULL,                  NULL),
  ('PAY_049','ORD_049',  7200000,'CREDIT_CARD',   'SUCCESS',  '2025-12-05 09:00:00','TXN_P049'),
  ('PAY_050','ORD_050',  5000000,'VNPAY',         'SUCCESS',  '2025-12-12 14:00:00','TXN_P050'),
  ('PAY_051','ORD_051',  2800000,'BANK_TRANSFER', 'SUCCESS',  '2025-12-19 10:30:00','TXN_P051'),
  ('PAY_052','ORD_052',  2200000,'CREDIT_CARD',   'SUCCESS',  '2026-01-02 11:00:00','TXN_P052'),
  ('PAY_053','ORD_053',  1800000,'MOMO',          'SUCCESS',  '2026-01-09 09:30:00','TXN_P053'),
  ('PAY_054','ORD_054',  5000000,'VNPAY',         'SUCCESS',  '2026-01-16 14:00:00','TXN_P054'),
  -- Bug payments
  ('PAY_055','ORD_015',  2200000,'MOMO',          'SUCCESS',  '2025-04-04 10:30:00','TXN_P055_DUP'), -- Bug-P5
  ('PAY_056','ORD_999',  5000000,'VNPAY',         'SUCCESS',  '2025-06-01 10:00:00','TXN_P056_ORP'), -- Bug-P6
  ('PAY_057','ORD_022',       0, 'COD',           'SUCCESS',  '2025-05-23 09:00:00','TXN_P057_ZERO');-- Bug-P7

-- ════════════════════════════════════════════════════════════
--  AUDIT_LOG (70 rows)
--  Bug-L1: 5 bản ghi có changed_by=NULL
--  Bug-L2: 2 bản ghi có action='EDIT'
--  Bug-L3: 1 bản ghi có action='REMOVE'
--  Bug-L4: 1 bản ghi timestamp trước ngày tạo đơn (ORD_019)
--  Bug-L5: C020 xuất hiện trong log DELETE nhưng vẫn tồn tại
-- ════════════════════════════════════════════════════════════
INSERT INTO Audit_Log (table_name, record_id, action, changed_by, old_value, new_value, changed_at) VALUES
  -- INSERT logs: tạo đơn hàng
  ('Orders','ORD_001','INSERT','admin',        NULL,           'status=COMPLETED',  '2026-06-20 08:00:00'),
  ('Orders','ORD_002','INSERT','admin',        NULL,           'status=COMPLETED',  '2026-06-22 09:00:00'),
  ('Orders','ORD_003','INSERT','admin',        NULL,           'status=CANCELLED',  '2026-06-23 10:00:00'),
  ('Orders','ORD_004','INSERT','system',       NULL,           'status=PENDING',    '2026-06-24 08:30:00'),
  ('Orders','ORD_005','INSERT','staff_01',     NULL,           'status=COMPLETED',  '2025-01-15 08:00:00'),
  ('Orders','ORD_006','INSERT','staff_01',     NULL,           'status=COMPLETED',  '2025-01-22 08:00:00'),
  ('Orders','ORD_007','INSERT','staff_02',     NULL,           'status=PROCESSING', '2025-02-03 08:00:00'),
  ('Orders','ORD_008','INSERT','staff_02',     NULL,           'status=COMPLETED',  '2025-02-10 08:00:00'),
  ('Orders','ORD_009','INSERT','staff_01',     NULL,           'status=COMPLETED',  '2025-02-18 08:00:00'),
  ('Orders','ORD_010','INSERT','staff_03',     NULL,           'status=COMPLETED',  '2025-02-25 08:00:00'),
  ('Orders','ORD_011','INSERT','staff_03',     NULL,           'status=COMPLETED',  '2025-03-05 08:00:00'),
  ('Orders','ORD_012','INSERT','staff_01',     NULL,           'status=PROCESSING', '2025-03-12 08:00:00'),
  ('Orders','ORD_013','INSERT','staff_02',     NULL,           'status=CANCELLED',  '2025-03-20 08:00:00'),
  ('Orders','ORD_014','INSERT','staff_02',     NULL,           'status=COMPLETED',  '2025-03-27 08:00:00'),
  ('Orders','ORD_015','INSERT','staff_03',     NULL,           'status=COMPLETED',  '2025-04-04 08:00:00'),
  ('Orders','ORD_016','INSERT','staff_01',     NULL,           'status=COMPLETED',  '2025-04-11 08:00:00'),
  ('Orders','ORD_017','INSERT','staff_02',     NULL,           'status=COMPLETED',  '2025-04-18 08:00:00'),
  ('Orders','ORD_018','INSERT','staff_03',     NULL,           'status=PENDING',    '2025-04-25 08:00:00'),
  -- Bug-L4: timestamp TRƯỚC ngày tạo đơn (ORD_019 tạo 2025-05-02 nhưng log ghi 2024-12-01)
  ('Orders','ORD_019','INSERT',NULL,           NULL,           'status=COMPLETED',  '2024-12-01 08:00:00'),
  ('Orders','ORD_020','INSERT','staff_01',     NULL,           'status=COMPLETED',  '2025-05-09 08:00:00'),
  ('Orders','ORD_021','INSERT','staff_02',     NULL,           'status=PROCESSING', '2025-05-16 08:00:00'),
  ('Orders','ORD_022','INSERT','staff_03',     NULL,           'status=COMPLETED',  '2025-05-23 08:00:00'),
  ('Orders','ORD_023','INSERT','staff_01',     NULL,           'status=COMPLETED',  '2025-05-30 08:00:00'),
  ('Orders','ORD_024','INSERT','staff_02',     NULL,           'status=COMPLETED',  '2025-06-06 08:00:00'),
  -- UPDATE logs: thay đổi trạng thái đơn
  ('Orders','ORD_003','UPDATE','admin',        'status=PROCESSING','status=CANCELLED','2026-06-23 15:00:00'),
  ('Orders','ORD_007','UPDATE','staff_02',     'status=PENDING',   'status=PROCESSING','2025-02-05 10:00:00'),
  ('Orders','ORD_012','UPDATE','staff_01',     'status=PENDING',   'status=PROCESSING','2025-03-14 09:00:00'),
  ('Orders','ORD_018','UPDATE',NULL,           'status=PROCESSING','status=PENDING', '2025-04-27 10:00:00'), -- Bug-L1 (NULL)
  ('Orders','ORD_021','UPDATE','staff_02',     'status=PENDING',   'status=PROCESSING','2025-05-18 11:00:00'),
  -- Bug-L2: action='EDIT' (không hợp lệ)
  ('Orders','ORD_022','EDIT',  'staff_03',     'status=PENDING',   'status=COMPLETED', '2025-05-23 12:00:00'),
  ('Orders','ORD_024','EDIT',  'staff_02',     'status=PENDING',   'status=COMPLETED', '2025-06-06 11:00:00'),
  -- UPDATE logs: thay đổi thông tin sản phẩm
  ('Products','PROD_003','UPDATE','admin',     'stock=0',      'stock=-5',          '2025-06-01 09:00:00'),
  ('Products','PROD_006','UPDATE','staff_01',  'price=500000', 'price=NULL',        '2025-07-15 14:00:00'), -- Bug-L1 (NULL)
  ('Products','PROD_007','UPDATE',NULL,        'stock=15',     'stock=NULL',        '2025-08-10 10:00:00'), -- Bug-L1 (NULL)
  ('Products','PROD_001','UPDATE','admin',     'price=28000000','price=30000000',   '2025-09-01 09:00:00'),
  ('Products','PROD_002','UPDATE','staff_02',  'stock=80',     'stock=100',         '2025-10-01 11:00:00'),
  -- UPDATE logs: thay đổi thông tin khách hàng
  ('Customers','C001','UPDATE','admin',        'tier=Standard','tier=Silver',       '2025-01-01 09:00:00'),
  ('Customers','C003','UPDATE','admin',        'tier=Silver',  'tier=Gold',         '2025-03-01 09:00:00'),
  ('Customers','C008','UPDATE',NULL,           'name=Pham Van D','name=  Pham Van D  ','2025-05-01 10:00:00'), -- Bug-L1 (NULL)
  ('Customers','C010','UPDATE','admin',        'tier=Gold',    'tier=VIP',          '2025-06-15 09:00:00'),
  ('Customers','C009','INSERT','system',       NULL,           'email=A.NGUYEN@EMAIL.COM','2025-07-01 08:00:00'),
  -- DELETE logs: xoá bản ghi
  ('Orders','ORD_013','DELETE','admin',        'status=CANCELLED',NULL,             '2025-04-01 16:00:00'),
  -- Bug-L3: action='REMOVE' (không hợp lệ)
  ('Orders','ORD_003','REMOVE','admin',        'status=CANCELLED',NULL,             '2026-06-30 10:00:00'),
  -- Bug-L5: C020 trong log DELETE nhưng vẫn tồn tại trong bảng Customers
  ('Customers','C020','DELETE','admin',        'status=ACTIVE', NULL,               '2025-09-01 11:00:00'),
  -- INSERT logs bổ sung
  ('Orders','ORD_025','INSERT','staff_01',     NULL,           'status=COMPLETED',  '2025-06-13 08:00:00'),
  ('Orders','ORD_026','INSERT','staff_02',     NULL,           'status=COMPLETED',  '2025-06-20 08:00:00'),
  ('Orders','ORD_027','INSERT','staff_03',     NULL,           'status=COMPLETED',  '2025-07-04 08:00:00'),
  ('Orders','ORD_028','INSERT','staff_01',     NULL,           'status=COMPLETED',  '2025-07-11 08:00:00'),
  ('Orders','ORD_029','INSERT','staff_02',     NULL,           'status=PENDING',    '2025-07-18 08:00:00'),
  ('Orders','ORD_030','INSERT','staff_03',     NULL,           'status=COMPLETED',  '2025-07-25 08:00:00'),
  ('Orders','ORD_031','INSERT','staff_01',     NULL,           'status=COMPLETED',  '2025-08-01 08:00:00'),
  ('Orders','ORD_032','INSERT','staff_02',     NULL,           'status=COMPLETED',  '2025-08-08 08:00:00'),
  ('Orders','ORD_033','INSERT','staff_03',     NULL,           'status=COMPLETED',  '2025-08-15 08:00:00'),
  ('Orders','ORD_034','INSERT','staff_01',     NULL,           'status=PROCESSING', '2025-08-22 08:00:00'),
  ('Orders','ORD_035','INSERT','staff_02',     NULL,           'status=COMPLETED',  '2025-08-29 08:00:00'),
  ('Orders','ORD_036','INSERT','staff_03',     NULL,           'status=COMPLETED',  '2025-09-05 08:00:00'),
  ('Orders','ORD_037','INSERT','staff_01',     NULL,           'status=COMPLETED',  '2025-09-12 08:00:00'),
  ('Orders','ORD_038','INSERT','staff_02',     NULL,           'status=COMPLETED',  '2025-09-19 08:00:00'),
  ('Orders','ORD_039','INSERT','staff_03',     NULL,           'status=COMPLETED',  '2025-09-26 08:00:00'),
  ('Orders','ORD_040','INSERT','staff_01',     NULL,           'status=COMPLETED',  '2025-10-03 08:00:00'),
  ('Orders','ORD_041','INSERT','staff_02',     NULL,           'status=PENDING',    '2025-10-10 08:00:00'),
  ('Orders','ORD_042','INSERT','staff_03',     NULL,           'status=COMPLETED',  '2025-10-17 08:00:00'),
  ('Orders','ORD_043','INSERT','staff_01',     NULL,           'status=COMPLETED',  '2025-10-24 08:00:00'),
  ('Orders','ORD_044','INSERT','staff_02',     NULL,           'status=COMPLETED',  '2025-10-31 08:00:00'),
  -- Bug-L1: 1 INSERT log cuối cùng có changed_by=NULL
  ('Payments','PAY_056','INSERT',NULL,         NULL,           'order_id=ORD_999',  '2025-06-01 10:05:00');-- Bug-L1 (NULL)

-- ════════════════════════════════════════════════════════════
--  KIỂM TRA NHANH SAU KHI SETUP
-- ════════════════════════════════════════════════════════════
SELECT '=== SETUP XONG ===' AS thong_bao;

SELECT CONCAT('Customers: ', COUNT(*)) AS rows_count FROM Customers
UNION ALL SELECT CONCAT('Products: ',   COUNT(*)) FROM Products
UNION ALL SELECT CONCAT('Orders: ',     COUNT(*)) FROM Orders
UNION ALL SELECT CONCAT('Order_Items: ',COUNT(*)) FROM Order_Items
UNION ALL SELECT CONCAT('Payments: ',   COUNT(*)) FROM Payments
UNION ALL SELECT CONCAT('Audit_Log: ',  COUNT(*)) FROM Audit_Log;

SELECT '--- Bug-A+B: Chenh lech total_amount ---' AS check_name;
SELECT o.order_id,
       o.total_amount                             AS ghi_trong_orders,
       SUM(i.quantity * i.price)                  AS tinh_tu_items,
       o.total_amount - SUM(i.quantity * i.price) AS chenh_lech
FROM Orders o JOIN Order_Items i ON o.order_id = i.order_id
GROUP BY o.order_id, o.total_amount
HAVING SUM(i.quantity * i.price) != o.total_amount;

SELECT '--- Bug-C: Stock am ---' AS check_name;
SELECT product_id, product_name, stock FROM Products WHERE stock < 0;

SELECT '--- Bug-D: Email trung ---' AS check_name;
SELECT email, COUNT(*) FROM Customers GROUP BY email HAVING COUNT(*) > 1;

SELECT '--- Bug-I: Orphan order ---' AS check_name;
SELECT o.order_id, o.customer_id
FROM Orders o LEFT JOIN Customers c ON o.customer_id = c.customer_id
WHERE c.customer_id IS NULL;

SELECT '--- Bug-P1: Payment thieu so voi don hang ---' AS check_name;
SELECT p.payment_id, p.order_id, p.amount AS paid, o.total_amount AS order_total,
       o.total_amount - p.amount AS con_thieu
FROM Payments p JOIN Orders o ON p.order_id = o.order_id
WHERE p.status = 'SUCCESS' AND p.amount < o.total_amount;

SELECT '--- Bug-P2+P3: Payment method/status khong hop le ---' AS check_name;
SELECT payment_id, order_id, method, status
FROM Payments
WHERE method NOT IN ('CREDIT_CARD','BANK_TRANSFER','COD','MOMO','VNPAY')
   OR status NOT IN ('SUCCESS','FAILED','PENDING','REFUNDED');

SELECT '--- Bug-P5: Double charge (2 SUCCESS cho cung 1 don) ---' AS check_name;
SELECT order_id, COUNT(*) AS so_payment_success
FROM Payments WHERE status = 'SUCCESS'
GROUP BY order_id HAVING COUNT(*) > 1;

SELECT '--- Bug-L1: Audit_Log chua NULL changed_by ---' AS check_name;
SELECT COUNT(*) AS so_ban_ghi_null_changed_by FROM Audit_Log WHERE changed_by IS NULL;

SELECT '--- Bug-L5: Phantom delete (record con ton tai trong bang) ---' AS check_name;
SELECT l.record_id, l.changed_at
FROM Audit_Log l JOIN Customers c ON l.record_id = c.customer_id
WHERE l.table_name = 'Customers' AND l.action = 'DELETE';
