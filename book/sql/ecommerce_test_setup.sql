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
--  - Khuyến nghị MySQL 8.0+ (hoặc MariaDB 10.3+).
--    Chỉ Câu 46-49 (PHẦN 6) cần MySQL 8.0 vì dùng window function và CTE;
--    các câu còn lại — kể cả Câu 50 (UNION ALL) — chạy được trên MySQL 5.7.
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
--  19 LỖI CỐ Ý CÀI SẴN (Bug-A → Bug-S)
--  ----------------------------------------
--  Trùng lặp & toàn vẹn dữ liệu:
--    Bug-A  ORD_001: total_amount=32M nhưng Order_Items cộng=62M (item trùng)        → Câu 4, 13, 39, 46
--    Bug-B  ORD_002: total_amount=20M nhưng Order_Items cộng=31M                     → Câu 13, 19, 39
--    Bug-D  C004/C005: trùng email trung_email@email.com                             → Câu 3, 36, 50
--    Bug-E  C001/C009: trùng email khác hoa/thường                                   → Câu 8, 37, 50
--    Bug-J  Item 1 và 7: trùng (order_id, product_id) = (ORD_001, PROD_001)          → Câu 4, 46
--    Bug-L  PROD_005 trùng hệt PROD_002 (Câu 10); PROD_008 trùng nhưng gõ sai hoa/thường+dấu cách (Câu 35)
--    Bug-P  ORD_006: trùng hoàn toàn ORD_003 (khách/tổng tiền/ngày — đơn nhân đôi) → Câu 29
--  NULL & dữ liệu thiếu:
--    Bug-F  C006: email = NULL   C007: email = chuỗi rỗng                            → Câu 5, 9, 32
--    Bug-M  PROD_006: price = NULL   PROD_007: stock = NULL                          → Câu 9, 14
--  Định dạng không hợp lệ:
--    Bug-G  C008: khoảng trắng thừa đầu/cuối tên ('  Pham Van D  ')                 → Câu 6
--    Bug-H  C010: membership_tier = 'VIP' (ngoài Standard/Silver/Gold/Platinum)      → Câu 11, 36
--  Mồ côi & ràng buộc tham chiếu:
--    Bug-I  ORD_004: customer_id = 'C999' không tồn tại + đơn rỗng (0 items)        → Câu 7, 16, 38, 42, 50
--  Giá trị nghiệp vụ sai & lệch số:
--    Bug-C  PROD_003: stock = -5 (tồn kho âm)                                       → Câu 14, 15, 20, 28
--    Bug-K  item_id = 3 bị thiếu (gap trong chuỗi ID liên tục; gap 10,11 cũng có)   → Câu 44
--    Bug-Q  ORD_007: order_date = 2027-01-01 (ngày đặt hàng trong tương lai)        → Câu 34
--    Bug-R  Item 12: quantity = 0 (số lượng biên dưới không hợp lệ)                 → Câu 33
--    Bug-S  Item 12: price = 1.500.000 nhưng PROD_002 niêm yết 2.000.000            → Câu 24
--  Audit, xóa mềm & dấu vết:
--    Bug-N  ORD_005: đã xóa mềm nhưng item 8, 9 chưa dọn, đơn vẫn bị tính         → Câu 12, 40
--    Bug-O  ORD_003: đã CANCELLED nhưng deleted_at vẫn NULL                         → Câu 41
-- ============================================================

CREATE DATABASE IF NOT EXISTS ecommerce_test;
USE ecommerce_test;

-- ── Tables ──────────────────────────────────────────────────
DROP TABLE IF EXISTS Order_Items;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Customers;
-- Dọn luôn 2 bảng thuộc bản dữ liệu mở rộng (Payments, Audit_Log) phòng khi
-- cùng schema từng được nạp bởi ecommerce_test_setup_expanded.sql — đảm bảo
-- ecommerce_test luôn đúng 4 bảng như mô tả trong sách, không lẫn dữ liệu thừa.
DROP TABLE IF EXISTS Payments;
DROP TABLE IF EXISTS Audit_Log;

CREATE TABLE Customers (
  customer_id     VARCHAR(10)   PRIMARY KEY,
  customer_name   VARCHAR(100)  NOT NULL,
  email           VARCHAR(150),           -- nullable: Câu 5
  membership_tier VARCHAR(20),            -- nullable: có thể NULL
  status          VARCHAR(20)
);

CREATE TABLE Products (
  product_id   VARCHAR(10)   PRIMARY KEY,
  product_name VARCHAR(150)  NOT NULL,
  category     VARCHAR(50),
  price        DECIMAL(15,2),             -- nullable: Câu 9
  stock        INT                        -- nullable: Câu 9
);

CREATE TABLE Orders (
  order_id     VARCHAR(10)   PRIMARY KEY,
  customer_id  VARCHAR(10),               -- nullable intentionally: Câu 7
  total_amount DECIMAL(15,2) NOT NULL,
  status       VARCHAR(20),
  order_date   DATE          NOT NULL,
  deleted_at   DATETIME      DEFAULT NULL -- Câu 12: soft-delete
);

CREATE TABLE Order_Items (
  item_id    INT           NOT NULL,      -- explicit: tạo gap Câu 44
  order_id   VARCHAR(10),
  product_id VARCHAR(10),
  quantity   INT           NOT NULL,
  price      DECIMAL(15,2) NOT NULL,
  PRIMARY KEY (item_id)
);

-- ── Customers ────────────────────────────────────────────────
INSERT INTO Customers (customer_id, customer_name, email, membership_tier, status) VALUES
  -- Dữ liệu chuẩn
  ('C001', 'Nguyen Van A',     'a.nguyen@email.com',    'Silver',   'ACTIVE'),
  ('C002', 'Tran Van B',       'b.tran@email.com',      'Standard', 'ACTIVE'),
  ('C003', 'Le Thi C',         'c.le@email.com',        'Gold',     'ACTIVE'),
  -- Bug-D: C004 và C005 trùng email (Câu 3 & 8)
  ('C004', 'Khach Hang Ao Bug','trung_email@email.com', 'Standard', 'ACTIVE'),
  ('C005', 'Khach Hang Trung', 'trung_email@email.com', 'Standard', 'ACTIVE'),
  -- Câu 5: NULL email và email rỗng
  ('C006', 'Pham Van X',       NULL,                    'Standard', 'ACTIVE'),
  ('C007', 'Nguyen Thi Y',     '',                      'Standard', 'ACTIVE'),
  -- Câu 6: khoảng trắng thừa trong customer_name
  ('C008', '  Pham Van D  ',   'd.pham@email.com',      'Gold',     'ACTIVE'),
  -- Câu 8: trùng email không phân biệt hoa/thường với C001
  ('C009', 'Nguyen Van A (2)', 'A.NGUYEN@EMAIL.COM',    'Silver',   'ACTIVE'),
  -- Câu 11: membership_tier ngoài danh sách cho phép
  ('C010', 'Khach Test VIP',   'vip@email.com',         'VIP',      'ACTIVE');

-- ── Products ─────────────────────────────────────────────────
INSERT INTO Products (product_id, product_name, category, price, stock) VALUES
  -- Dữ liệu chuẩn
  ('PROD_001', 'iPhone 15 Pro Max',         'Dien thoai', 30000000,  50),
  ('PROD_002', 'Ban phim co Logitech',      'Phu kien',    2000000, 100),
  -- Bug2: stock âm (Câu liên quan đến kiểm tra số âm)
  ('PROD_003', 'Tai nghe Sony WH-1000XM5', 'Phu kien',    8000000,  -5),
  ('PROD_004', 'Sac du phong Anker',        'Phu kien',    1000000,  20),
  -- Câu 10: full duplicate (cùng tên + giá với PROD_002)
  ('PROD_005', 'Ban phim co Logitech',      'Phu kien',    2000000,  30),
  -- Câu 9: cột price bị NULL
  ('PROD_006', 'Loa Bluetooth JBL',         'Phu kien',       NULL,  10),
  -- Câu 9: cột stock bị NULL
  ('PROD_007', 'Chuot gaming Razer',        'Phu kien',   1500000, NULL),
  -- Câu 35: bản trùng của "Ban phim co Logitech" nhưng gõ sai (chữ thường + dư
  --         khoảng trắng hai đầu). Chỉ LOWER(TRIM()) mới gom cùng nhóm; so khớp
  --         thô theo tên chính xác (Câu 10) bỏ sót dòng này.
  ('PROD_008', '  ban phim co logitech  ',  'Phu kien',    2000000,  25);

-- ── Orders ───────────────────────────────────────────────────
INSERT INTO Orders (order_id, customer_id, total_amount, status, order_date, deleted_at) VALUES
  ('ORD_001', 'C001', 32000000, 'COMPLETED', '2026-06-20', NULL),
  -- Bug-B: ghi 20M nhưng Order_Items tính ra 31M
  ('ORD_002', 'C002', 20000000, 'COMPLETED', '2026-06-22', NULL),
  ('ORD_003', 'C003',  8000000, 'CANCELLED', '2026-06-23', NULL),
  -- Câu 7: orphan — customer_id C999 không tồn tại trong Customers
  ('ORD_004', 'C999',  5000000, 'PENDING',   '2026-06-24', NULL),
  -- Câu 12: soft-delete — đơn đã bị hủy và xóa mềm nhưng vẫn nằm trong bảng
  ('ORD_005', 'C001', 15000000, 'CANCELLED', '2026-06-25', '2026-06-25 10:30:00'),
  -- Câu 29: double order — C003/8M/23-Jun trùng hệt ORD_003 (customer+total+date)
  ('ORD_006', 'C003',  8000000, 'PENDING',   '2026-06-23', NULL),
  -- Câu 34: ngày đặt hàng ở tương lai (2027) — dấu hiệu bug timezone hoặc nhập tay sai
  ('ORD_007', 'C001', 20000000, 'PENDING',   '2027-01-01', NULL);

-- ── Order_Items (explicit item_id để kiểm soát gap) ─────────
INSERT INTO Order_Items (item_id, order_id, product_id, quantity, price) VALUES
  (1, 'ORD_001', 'PROD_001', 1, 30000000),
  (2, 'ORD_001', 'PROD_002', 1,  2000000),
  -- item_id = 3 bỏ trống (Câu 44: gap trong chuỗi ID liên tục)
  (4, 'ORD_002', 'PROD_001', 1, 30000000),
  (5, 'ORD_002', 'PROD_004', 1,  1000000),
  (6, 'ORD_003', 'PROD_003', 1,  8000000),
  -- Câu 4: duplicate composite key (cùng order_id + product_id với item_id=1)
  (7, 'ORD_001', 'PROD_001', 1, 30000000),
  -- Câu 12: items thuộc đơn đã soft-delete (ORD_005)
  (8, 'ORD_005', 'PROD_004', 1,  1000000),
  (9, 'ORD_005', 'PROD_002', 1,  2000000),
  -- Câu 33: quantity = 0 (biên dưới bất hợp lệ); Câu 24: giá 1.5M ≠ PROD_002 hiện tại 2M
  (12, 'ORD_003', 'PROD_002', 0,  1500000),
  -- ORD_006 (double order): 1 đơn PROD_003 / 8M — khớp total_amount, không tạo lệch Câu 13
  (13, 'ORD_006', 'PROD_003', 1,  8000000),
  -- ORD_007 (ngày tương lai): 20 sạc dự phòng / 1M × 20 = 20M — khớp total_amount
  (14, 'ORD_007', 'PROD_004', 20, 1000000);

-- ── Kiểm tra nhanh sau khi setup ────────────────────────────
SELECT '=== SETUP XONG ===' AS thong_bao;

SELECT '--- Cau 13: Lenh tien Orders vs Items ---' AS check_name;
SELECT o.order_id,
       o.total_amount                             AS ghi_trong_orders,
       SUM(i.quantity * i.price)                  AS tinh_tu_items,
       o.total_amount - SUM(i.quantity * i.price) AS chenh_lech
FROM Orders o
JOIN Order_Items i ON o.order_id = i.order_id
GROUP BY o.order_id, o.total_amount;

SELECT '--- Cau 14: Stock am ---' AS check_name;
SELECT product_id, product_name, stock FROM Products WHERE stock < 0;

SELECT '--- Cau 3: Email trung ---' AS check_name;
SELECT email, COUNT(*) AS so_lan FROM Customers GROUP BY email HAVING COUNT(*) > 1;

SELECT '--- Cau 4: Composite key trung ---' AS check_name;
SELECT order_id, product_id, COUNT(*) AS so_lan
FROM Order_Items GROUP BY order_id, product_id HAVING COUNT(*) > 1;

SELECT '--- Cau 5: NULL/rong email ---' AS check_name;
SELECT customer_id, customer_name, email
FROM Customers WHERE email IS NULL OR TRIM(email) = '';

SELECT '--- Cau 6: Khoang trang thua ---' AS check_name;
SELECT customer_id, customer_name,
       CHAR_LENGTH(customer_name) AS goc,
       CHAR_LENGTH(TRIM(customer_name)) AS sau_trim
FROM Customers WHERE customer_name != TRIM(customer_name);

SELECT '--- Cau 7: Orphan order ---' AS check_name;
SELECT o.order_id, o.customer_id
FROM Orders o LEFT JOIN Customers c ON o.customer_id = c.customer_id
WHERE c.customer_id IS NULL;

SELECT '--- Cau 8: Trung email case-insensitive ---' AS check_name;
SELECT LOWER(email) AS email_chuan, COUNT(*) AS so_lan
FROM Customers GROUP BY LOWER(email) HAVING COUNT(*) > 1;

SELECT '--- Cau 9: NULL theo tung cot (Products) ---' AS check_name;
SELECT
  SUM(CASE WHEN product_name IS NULL THEN 1 ELSE 0 END) AS null_ten,
  SUM(CASE WHEN price        IS NULL THEN 1 ELSE 0 END) AS null_gia,
  SUM(CASE WHEN stock        IS NULL THEN 1 ELSE 0 END) AS null_ton
FROM Products;

SELECT '--- Cau 10: Full duplicate (Products) ---' AS check_name;
SELECT product_name, price, COUNT(*) AS so_lan
FROM Products GROUP BY product_name, price HAVING COUNT(*) > 1;

SELECT '--- Cau 35: Trung sau khi chuan hoa LOWER+TRIM (Products) ---' AS check_name;
SELECT LOWER(TRIM(product_name)) AS ten_chuan, COUNT(*) AS so_lan
FROM Products GROUP BY LOWER(TRIM(product_name)) HAVING COUNT(*) > 1;

SELECT '--- Cau 11: Tier ngoai danh sach ---' AS check_name;
SELECT customer_id, customer_name, membership_tier
FROM Customers WHERE membership_tier NOT IN ('Standard','Silver','Gold','Platinum');

SELECT '--- Cau 12: Soft-delete leak ---' AS check_name;
SELECT order_id, total_amount, status, deleted_at
FROM Orders WHERE deleted_at IS NOT NULL;
