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
--  Bộ dữ liệu cố tình giữ NHỎ và RÕ RÀNG: bạn nhìn thấy ngay từng bug
--  bằng mắt và tự kiểm chứng câu lệnh có bắt đúng hay không. Kết quả chạy
--  trên file này KHỚP CHÍNH XÁC với kết quả in trong sách.
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
--  Customers   : 10 khách hàng (C001–C010)
--  Products    : 7 sản phẩm    (PROD_001–PROD_007)
--  Orders      : 4 đơn hàng    (ORD_001–ORD_004)
--  Order_Items : 6 dòng chi tiết (item_id 1,2,4,5,6,7 — thiếu 3)
--  Tổng cộng   : 27 dòng dữ liệu
--
--  BUG CÀI SẴN (mỗi bug khớp với ít nhất một câu trong sách)
--  ----------------------------------------
--  Bug-A  = ORD_001: total_amount=32M nhưng Order_Items tính ra 62M (item trùng)
--  Bug-B  = ORD_002: total_amount=20M nhưng Order_Items tính ra 31M (chênh -11M)
--  Bug-C  = PROD_003: stock = -5 (tồn kho âm)
--  Bug-D  = C004/C005: trùng email trung_email@email.com
--  Bug-E  = C001/C009: trùng email (không phân biệt hoa/thường)
--  Bug-F  = C006: email NULL; C007: email rỗng
--  Bug-G  = C008: khoảng trắng thừa trong tên ("  Pham Van D  ")
--  Bug-H  = C010: membership_tier = 'VIP' (ngoài danh sách hợp lệ)
--  Bug-I  = ORD_004: customer_id=C999 không tồn tại (orphan order)
--  Bug-J  = ORD_001/PROD_001: xuất hiện 2 lần trong Order_Items (item 1 và 7)
--  Bug-K  = item_id=3 bị thiếu (gap trong chuỗi ID)
--  Bug-L  = PROD_005: trùng tên+giá với PROD_002 (full duplicate)
--  Bug-M  = PROD_006: price=NULL; PROD_007: stock=NULL
--
--  GHI CHÚ: ngày trong Orders dùng 2026-06-20..24 để khớp ví dụ trong sách.
-- ============================================================

CREATE DATABASE IF NOT EXISTS ecommerce_test;
USE ecommerce_test;

-- ── Drop (theo thứ tự FK) ────────────────────────────────────
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

-- ── Dữ liệu: Customers (C001–C010) ───────────────────────────
INSERT INTO Customers (customer_id, customer_name, email, membership_tier, status) VALUES
('C001', 'Nguyen Van A',      'a.nguyen@email.com',    'Silver',   'ACTIVE'),
('C002', 'Tran Van B',        'b.tran@email.com',      'Standard', 'ACTIVE'),
('C003', 'Le Thi C',          'c.le@email.com',        'Gold',     'ACTIVE'),
('C004', 'Khach Hang Ao Bug', 'trung_email@email.com', 'Standard', 'ACTIVE'),  -- Bug-D
('C005', 'Khach Hang Trung',  'trung_email@email.com', 'Standard', 'ACTIVE'),  -- Bug-D
('C006', 'Pham Van X',        NULL,                    'Standard', 'ACTIVE'),  -- Bug-F (email NULL)
('C007', 'Nguyen Thi Y',      '',                      'Standard', 'ACTIVE'),  -- Bug-F (email rỗng)
('C008', '  Pham Van D  ',    'd.pham@email.com',      'Gold',     'ACTIVE'),  -- Bug-G (space thừa)
('C009', 'Nguyen Van A (2)',  'A.NGUYEN@EMAIL.COM',    'Silver',   'ACTIVE'),  -- Bug-E (trùng C001 hoa/thường)
('C010', 'Khach Test VIP',    'vip@email.com',         'VIP',      'ACTIVE');  -- Bug-H (tier ngoài danh sách)

-- ── Dữ liệu: Products (PROD_001–PROD_007) ────────────────────
INSERT INTO Products (product_id, product_name, category, price, stock) VALUES
('PROD_001', 'iPhone 15 Pro Max',        'Dien thoai', 30000000.00,  50),
('PROD_002', 'Ban phim co Logitech',     'Phu kien',    2000000.00, 100),
('PROD_003', 'Tai nghe Sony WH-1000XM5', 'Phu kien',    8000000.00,  -5),  -- Bug-C (stock âm)
('PROD_004', 'Sac du phong Anker',       'Phu kien',    1000000.00,  20),
('PROD_005', 'Ban phim co Logitech',     'Phu kien',    2000000.00,  30),  -- Bug-L (trùng PROD_002)
('PROD_006', 'Loa Bluetooth JBL',        'Phu kien',          NULL,  10),  -- Bug-M (price NULL)
('PROD_007', 'Chuot gaming Razer',       'Phu kien',    1500000.00, NULL); -- Bug-M (stock NULL)

-- ── Dữ liệu: Orders (ORD_001–ORD_004) ────────────────────────
INSERT INTO Orders (order_id, customer_id, total_amount, status, order_date) VALUES
('ORD_001', 'C001', 32000000.00, 'COMPLETED', '2026-06-20'),  -- Bug-A (items thực = 62M)
('ORD_002', 'C002', 20000000.00, 'COMPLETED', '2026-06-22'),  -- Bug-B (items thực = 31M)
('ORD_003', 'C003',  8000000.00, 'CANCELLED', '2026-06-23'),
('ORD_004', 'C999',  5000000.00, 'PENDING',   '2026-06-24');  -- Bug-I (C999 không tồn tại; cũng là đơn rỗng)

-- ── Dữ liệu: Order_Items (item_id 1,2,4,5,6,7 — thiếu 3 = Bug-K) ──
INSERT INTO Order_Items (item_id, order_id, product_id, quantity, price) VALUES
(1, 'ORD_001', 'PROD_001', 1, 30000000.00),
(2, 'ORD_001', 'PROD_002', 1,  2000000.00),
-- item_id = 3 cố tình thiếu (Bug-K: gap trong chuỗi ID)
(4, 'ORD_002', 'PROD_001', 1, 30000000.00),
(5, 'ORD_002', 'PROD_004', 1,  1000000.00),
(6, 'ORD_003', 'PROD_003', 1,  8000000.00),
(7, 'ORD_001', 'PROD_001', 1, 30000000.00);  -- Bug-J (trùng item 1: ORD_001/PROD_001)

-- ============================================================
--  KIỂM TRA NHANH SAU KHI NẠP
--  SELECT COUNT(*) FROM Customers;    -- 10
--  SELECT COUNT(*) FROM Products;     -- 7
--  SELECT COUNT(*) FROM Orders;       -- 4
--  SELECT COUNT(*) FROM Order_Items;  -- 6
-- ============================================================
