-- ==========================================================================
-- Sách #2 — "SQL cho Data Tester Ngân hàng" — Data mẫu HƯ CẤU
-- Mô phỏng 2 TẦNG: NGUỒN (giống Core, chi tiết) --ETL--> ĐÍCH (DWH, đã tổng hợp)
-- Toàn bộ dữ liệu là hư cấu, KHÔNG đại diện cho bất kỳ tổ chức nào.
-- Tiền dùng DECIMAL(18,2) (không FLOAT). Chạy: mysql -u root < banking_dwh_setup.sql
-- ==========================================================================
DROP DATABASE IF EXISTS banking_dwh_test;
CREATE DATABASE banking_dwh_test CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE banking_dwh_test;

-- ========================= BẢNG CHIỀU (dimension) =========================
CREATE TABLE dim_branch (               -- danh mục chi nhánh
  branch_id   VARCHAR(10) PRIMARY KEY,
  branch_name VARCHAR(100) NOT NULL,
  region      VARCHAR(50)  NOT NULL
);
INSERT INTO dim_branch VALUES
  ('B01','Chi nhanh Trung tam','Mien Bac'),
  ('B02','Chi nhanh Ha Dong','Mien Bac');
-- (B03 'Chi nhanh Mien Nam' vừa mở — CỐ Ý CHƯA thêm vào dim -> gây lỗi ETL)

CREATE TABLE dim_product (              -- danh mục sản phẩm
  product_code VARCHAR(10) PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  product_group VARCHAR(30) NOT NULL   -- CASA / TIEN_GUI / VAY / THE
);
INSERT INTO dim_product VALUES
  ('CA01','Tai khoan thanh toan','CASA'),
  ('SA01','Tiet kiem co ky han','TIEN_GUI'),
  ('LN01','Vay tieu dung','VAY'),
  ('CC01','The tin dung','THE');

-- ===================== TẦNG NGUỒN (mô phỏng Core, OLTP) =====================
-- 1 KHÁCH HÀNG (CIF) -> nhiều TÀI KHOẢN -> nhiều GIAO DỊCH. Vay & thẻ gắn theo CIF/tài khoản.
CREATE TABLE src_customers (
  cif           VARCHAR(10) PRIMARY KEY,          -- mã định danh khách hàng (duy nhất)
  full_name     VARCHAR(100) NOT NULL,
  dob           DATE,
  id_number     VARCHAR(20),                       -- CCCD/CMND
  phone         VARCHAR(20),
  segment       VARCHAR(20),                        -- RETAIL / PRIORITY / SME
  kyc_status    VARCHAR(20),                        -- FULL / PENDING
  last_updated_date DATE NOT NULL                   -- phục vụ nạp gia tăng (CDC)
);
INSERT INTO src_customers VALUES
 ('C001','Nguyen Van A','1985-03-12','036085000111','0901000111','RETAIL','FULL','2026-06-30'),
 ('C002','Tran Thi B','1990-07-01','001190000222','0902000222','PRIORITY','FULL','2026-06-30'),
 ('C003','Le Van C','1978-11-23','038078000333','0903000333','SME','FULL','2026-06-30'),
 ('C004','Pham Thi D','1995-02-14','001195000444',NULL,'RETAIL','PENDING','2026-06-30'), -- thiếu phone
 ('C005','Hoang Van E','1982-09-09','036082000555','0905000555','RETAIL','FULL','2026-06-30'),
 ('C006','Vu Thi F','1988-05-30','001188000666','0906000666','PRIORITY','FULL','2026-06-30'),
 ('C007','Dang Van G','2000-01-01','038000000777','0907000777','RETAIL','FULL','2026-06-30'),
 ('C008','Bui Thi H','1975-12-20','001175000888','0908000888','SME','FULL','2026-06-30');

CREATE TABLE src_accounts (
  account_no    VARCHAR(16) PRIMARY KEY,
  cif           VARCHAR(10) NOT NULL,              -- FK -> src_customers
  branch_id     VARCHAR(10) NOT NULL,              -- FK -> dim_branch
  product_code  VARCHAR(10) NOT NULL,              -- FK -> dim_product
  currency      CHAR(3) NOT NULL DEFAULT 'VND',
  status        VARCHAR(12) NOT NULL,              -- ACTIVE / DORMANT / CLOSED
  open_date     DATE NOT NULL,
  balance       DECIMAL(18,2) NOT NULL,            -- số dư hiện tại
  last_updated_date DATE NOT NULL
);
INSERT INTO src_accounts VALUES
 ('1001','C001','B01','CA01','VND','ACTIVE','2022-01-10',  15000000.00,'2026-06-30'),
 ('1002','C001','B01','SA01','VND','ACTIVE','2023-05-01', 200000000.00,'2026-06-30'),
 ('1003','C002','B01','CA01','VND','ACTIVE','2021-03-15',  32000000.00,'2026-06-30'),
 ('1004','C003','B02','CA01','VND','ACTIVE','2020-08-20',   5000000.00,'2026-06-30'),
 ('1005','C004','B02','SA01','VND','DORMANT','2019-02-02', 50000000.00,'2026-06-30'),
 ('1006','C005','B03','CA01','VND','ACTIVE','2026-05-05',   8000000.00,'2026-06-30'), -- chi nhánh mới B03
 ('1007','C006','B01','CA01','VND','ACTIVE','2022-11-11',  90000000.00,'2026-06-30'),
 ('1008','C008','B02','CA01','VND','CLOSED','2018-06-30',        0.00,'2026-06-30');

CREATE TABLE src_transactions (
  txn_id        BIGINT PRIMARY KEY,
  account_no    VARCHAR(16) NOT NULL,             -- FK -> src_accounts
  txn_date      DATE NOT NULL,                    -- ngày ghi sổ
  value_date    DATE NOT NULL,                    -- ngày hiệu lực
  dr_cr         CHAR(1) NOT NULL,                 -- 'D' ghi Nợ / 'C' ghi Có
  amount        DECIMAL(18,2) NOT NULL,
  channel       VARCHAR(10) NOT NULL,             -- ATM/POS/IB/TELLER
  description   VARCHAR(100)
);
INSERT INTO src_transactions VALUES
 (1, '1001','2026-06-28','2026-06-28','C', 20000000.00,'IB','Nhan luong'),
 (2, '1001','2026-06-29','2026-06-29','D',  5000000.00,'ATM','Rut tien'),
 (3, '1003','2026-06-27','2026-06-27','C', 10000000.00,'TELLER','Nop tien mat'),
 (4, '1003','2026-06-30','2026-06-30','D',  3000000.00,'POS','Thanh toan POS'),
 (5, '1007','2026-06-30','2026-06-30','C', 90000000.00,'IB','Chuyen den'),
 (6, '1004','2026-06-25','2026-06-25','D',  1000000.00,'ATM','Rut tien');

CREATE TABLE src_loans (
  loan_id       VARCHAR(10) PRIMARY KEY,
  cif           VARCHAR(10) NOT NULL,             -- FK -> src_customers
  branch_id     VARCHAR(10) NOT NULL,             -- FK -> dim_branch
  principal     DECIMAL(18,2) NOT NULL,           -- gốc vay ban đầu
  outstanding_principal DECIMAL(18,2) NOT NULL,   -- dư nợ gốc hiện tại
  dpd           INT NOT NULL,                     -- số ngày quá hạn (Days Past Due)
  status        VARCHAR(12) NOT NULL,
  disburse_date DATE NOT NULL
);
INSERT INTO src_loans VALUES
 ('L001','C001','B01', 600000000, 500000000,   0,'ACTIVE','2024-01-15'),
 ('L002','C002','B01', 400000000, 300000000,   5,'ACTIVE','2024-03-01'),
 ('L003','C003','B02',1500000000,1200000000,  45,'ACTIVE','2023-06-10'),
 ('L004','C004','B02',1000000000, 800000000, 120,'ACTIVE','2023-02-20'),
 ('L005','C005','B03', 500000000, 450000000, 200,'ACTIVE','2024-05-05'),  -- chi nhánh mới B03
 ('L006','C006','B03', 300000000, 250000000, 400,'ACTIVE','2022-05-05'),  -- chi nhánh mới B03
 ('L007','C007','B01', 200000000, 150000000,   0,'ACTIVE','2025-01-01'),
 ('L008','C008','B02', 700000000, 600000000,  95,'ACTIVE','2023-09-09');
-- Tổng dư nợ NGUỒN = 4.250.000.000 (8 khoản)

CREATE TABLE src_cards (
  card_id             VARCHAR(12) PRIMARY KEY,
  account_no          VARCHAR(16) NOT NULL,        -- FK -> src_accounts
  card_number_masked  VARCHAR(25),                 -- 6 số đầu + 4 số cuối, che giữa
  card_type           VARCHAR(10) NOT NULL,        -- DEBIT / CREDIT
  credit_limit        DECIMAL(18,2),               -- hạn mức (thẻ tín dụng)
  current_outstanding DECIMAL(18,2),               -- dư nợ thẻ hiện tại
  status              VARCHAR(12) NOT NULL,         -- ACTIVE / BLOCKED / EXPIRED
  expiry_date         DATE
);
INSERT INTO src_cards VALUES
 ('CARD0001','1001','970416******1234','CREDIT', 100000000.00, 30000000.00,'ACTIVE','2028-05-31'),
 ('CARD0002','1003','970416******5678','DEBIT',        NULL,        NULL,'ACTIVE','2027-08-31'),
 ('CARD0003','1007','970416******9012','CREDIT',  50000000.00, 55000000.00,'ACTIVE','2029-01-31'), -- vượt hạn mức
 ('CARD0004','1004','970416******3456','CREDIT',  20000000.00,  5000000.00,'EXPIRED','2025-12-31');

CREATE TABLE src_loan_schedule (
  loan_id        VARCHAR(10) NOT NULL,             -- FK -> src_loans
  installment_no INT NOT NULL,                     -- kỳ trả thứ mấy
  due_date       DATE NOT NULL,                    -- ngày đến hạn
  principal_due  DECIMAL(18,2) NOT NULL,           -- gốc phải trả kỳ này
  interest_due   DECIMAL(18,2) NOT NULL,           -- lãi phải trả kỳ này
  status         VARCHAR(10) NOT NULL,             -- PAID / DUE / OVERDUE
  PRIMARY KEY (loan_id, installment_no)
);
INSERT INTO src_loan_schedule VALUES
 ('L001',1,'2024-02-15',100000000.00, 5000000.00,'PAID'),
 ('L001',2,'2024-03-15',100000000.00, 4200000.00,'PAID'),
 ('L001',3,'2024-04-15',100000000.00, 3400000.00,'PAID'),
 ('L001',4,'2024-05-15',100000000.00, 2600000.00,'DUE'),
 ('L001',5,'2024-06-15',100000000.00, 1800000.00,'DUE'),
 ('L001',6,'2024-07-15',100000000.00, 1000000.00,'DUE');
-- Tổng gốc theo kỳ = 600.000.000 = principal của L001 (dùng để đối soát)

CREATE TABLE gl_balances (                          -- Sổ cái (General Ledger) — số dư theo tài khoản kế toán
  gl_account_code VARCHAR(20) PRIMARY KEY,
  gl_account_name VARCHAR(100) NOT NULL,
  balance         DECIMAL(18,2) NOT NULL,
  snapshot_date   DATE NOT NULL
);
INSERT INTO gl_balances VALUES
 ('2110','Cho vay khach hang', 4250000000.00,'2026-06-30'),  -- khớp tổng dư nợ NGUỒN
 ('4210','Tien gui khach hang',  300000000.00,'2026-06-30'),
 ('1010','Tien mat tai quy',      45000000.00,'2026-06-30');

-- ===================== TẦNG ĐÍCH (mô phỏng DWH, OLAP) =====================
-- Được nạp qua "ETL": JOIN nguồn với bảng chiều + biến đổi (tính nhóm nợ).
CREATE TABLE dwh_loans (
  loan_id       VARCHAR(10) PRIMARY KEY,
  cif           VARCHAR(10) NOT NULL,
  branch_id     VARCHAR(10) NOT NULL,
  branch_name   VARCHAR(100),
  outstanding_principal DECIMAL(18,2) NOT NULL,
  dpd           INT NOT NULL,
  debt_group    VARCHAR(10) NOT NULL,             -- Transform: phân nhóm nợ từ DPD
  snapshot_date DATE NOT NULL
);
-- BUG cố ý: INNER JOIN dim_branch -> khoản ở B03 (chưa có trong dim) bị loại.
INSERT INTO dwh_loans
SELECT s.loan_id, s.cif, s.branch_id, b.branch_name, s.outstanding_principal, s.dpd,
       CASE WHEN s.dpd < 10  THEN 'Nhom 1'
            WHEN s.dpd <= 90  THEN 'Nhom 2'
            WHEN s.dpd <= 180 THEN 'Nhom 3'
            WHEN s.dpd <= 360 THEN 'Nhom 4'
            ELSE 'Nhom 5' END,
       '2026-06-30'
FROM   src_loans s
JOIN   dim_branch b ON s.branch_id = b.branch_id;   -- INNER JOIN = mất khoản B03

-- Bảng số dư tài khoản trên DWH (đã gắn tên chi nhánh, tên sản phẩm)
CREATE TABLE dwh_account_balance (
  account_no    VARCHAR(16) PRIMARY KEY,
  cif           VARCHAR(10) NOT NULL,
  branch_name   VARCHAR(100),
  product_name  VARCHAR(100),
  status        VARCHAR(12),
  balance       DECIMAL(18,2) NOT NULL,
  snapshot_date DATE NOT NULL
);
INSERT INTO dwh_account_balance
SELECT a.account_no, a.cif, b.branch_name, p.product_name, a.status, a.balance, '2026-06-30'
FROM   src_accounts a
JOIN   dim_branch  b ON a.branch_id = b.branch_id      -- (cũng INNER JOIN: account B03 bị loại)
JOIN   dim_product p ON a.product_code = p.product_code;
