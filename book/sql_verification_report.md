# SQL Verification Audit Report

This report verifies every SQL query defined in `_book_sql_data.py` against the actual MySQL `ecommerce_test` database.

| Question ID | Title | Status | Details |
|---|---|---|---|
| 1 | Tìm email bị trùng | ✅ MATCH | OK |
| 2 | Tìm trùng theo nhiều cột (composite key) | ✅ MATCH | OK |
| 3 | Tìm NULL ở cột bắt buộc | ✅ MATCH | OK |
| 4 | Phát hiện khoảng trắng thừa và ký tự ẩn | ✅ MATCH | OK |
| 5 | Kiểm tra bản ghi mồ côi (foreign key orphan) | ✅ MATCH | OK |
| 6 | Tìm trùng không phân biệt hoa/thường | ✅ MATCH | OK |
| 7 | Đếm giá trị NULL theo từng cột | ✅ MATCH | OK |
| 8 | Tìm bản ghi trùng hoàn toàn (full duplicate) | ✅ MATCH | OK |
| 9 | Kiểm tra giá trị ngoài danh sách cho phép (ENUM check) | ✅ MATCH | OK |
| 10 | Tìm bản ghi xóa mềm vẫn tham gia tính toán | ✅ MATCH | OK |
| 11 | Đối soát tổng tiền đơn hàng với chi tiết items | ✅ MATCH | OK |
| 12 | Phát hiện tồn kho âm | ✅ MATCH | OK |
| 13 | Phát hiện tồn kho bị NULL | ✅ MATCH | OK |
| 14 | Phát hiện giá sản phẩm NULL hoặc bằng 0 | ✅ MATCH | OK |
| 15 | Tìm đơn hàng không có dòng chi tiết nào | ✅ MATCH | OK |
| 16 | Tìm sản phẩm chưa bao giờ được bán | ✅ MATCH | OK |
| 17 | Tìm khách hàng chưa có đơn hàng nào | ✅ MATCH | OK |
| 18 | Kiểm tra trạng thái đơn hàng ngoài danh sách cho phép | ✅ MATCH | OK |
| 19 | Tổng hợp chi tiêu theo từng khách hàng | ✅ MATCH | OK |
| 20 | Phát hiện sản phẩm đã bán vượt quá tồn kho | ✅ MATCH | OK |
| 21 | Tính doanh thu thực theo từng đơn từ Order_Items | ✅ MATCH | OK |
| 22 | Xếp hạng sản phẩm bán chạy nhất theo doanh số | ✅ MATCH | OK |
| 23 | Kiểm tra giá trị tồn kho (stock × price) | ✅ MATCH | OK |
| 24 | So sánh giá bán lịch sử với giá niêm yết hiện tại | ✅ MATCH | OK |
| 25 | Tổng doanh thu chỉ tính đơn hàng COMPLETED | ✅ MATCH | OK |
| 26 | Phân tích tỷ lệ đơn hàng theo trạng thái | ✅ MATCH | OK |
| 27 | Tổng doanh thu theo danh mục sản phẩm | ✅ MATCH | OK |
| 28 | Đối soát tồn kho hiện tại với lượng đã bán ra | ✅ MATCH | OK |
| 29 | Phát hiện đơn hàng bị tạo trùng (double order) | ✅ MATCH | OK |
| 30 | Phát hiện đơn hàng có giá trị bất thường (outlier) | ✅ MATCH | OK |
| 31 | Tìm tên khách hàng chứa ký tự bất thường | ✅ MATCH | OK |
| 32 | Tìm email không đúng định dạng cơ bản | ✅ MATCH | OK |
| 33 | Kiểm tra số lượng sản phẩm bất thường trong Order_Items | ✅ MATCH | OK |
| 34 | Kiểm tra ngày đặt hàng bất thường (tương lai hoặc quá xa quá khứ) | ✅ MATCH | OK |
| 35 | Tìm tên sản phẩm trùng sau khi chuẩn hóa | ✅ MATCH | OK |
| 36 | Kiểm tra status của Customers ngoài danh sách cho phép | ✅ MATCH | OK |
| 37 | Kiểm tra giá bán âm hoặc bằng 0 trong Order_Items | ✅ MATCH | OK |
| 38 | Phát hiện đơn có tổng tiền nhưng không có sản phẩm nào | ✅ MATCH | OK |
| 39 | Phát hiện tổng items vượt quá 1.5 lần total_amount | ✅ MATCH | OK |
| 40 | Truy vết item còn sót của đơn đã xóa mềm | ✅ MATCH | OK |
| 41 | Đối chiếu trạng thái hủy với cờ xóa mềm | ✅ MATCH | OK |
| 42 | Phát hiện đơn treo (PENDING) tồn đọng quá lâu | ✅ MATCH | OK |
| 43 | Dựng dòng thời gian đơn hàng — khoảng cách giữa các đơn | ✅ MATCH | OK |
| 44 | Phát hiện item_id bị nhảy — dấu vết của bản ghi bị xóa | ✅ MATCH | OK |
| 45 | Phân tích đơn hàng bị hủy — khách nào hay hủy nhất | ✅ MATCH | OK |
| 46 | Dùng ROW_NUMBER() phát hiện item trùng trong cùng một đơn | ✅ MATCH | OK |
| 47 | Dùng CTE + RANK() xếp hạng sản phẩm bán chạy | ✅ MATCH | OK |
| 48 | Dùng CTE lồng nhau tìm khách chi tiêu trên mức trung bình | ✅ MATCH | OK |
| 49 | Tính doanh thu tích lũy theo thời gian với SUM() OVER() | ✅ MATCH | OK |
| 50 | Báo cáo tổng hợp: nhiều loại lỗi trong một câu UNION ALL | ✅ MATCH | OK |

## Detailed Execution Logs

### Câu 1: Tìm email bị trùng
#### SQL Query:
```sql
SELECT email,
       COUNT(*) AS so_lan
FROM   Customers
GROUP  BY email
HAVING COUNT(*) > 1
ORDER  BY so_lan DESC;
```
#### Expected result_table:
Columns: `['email', 'so_lan']`
Rows:
```python
  ['a.nguyen@email.com', 2]
  ['trung_email@email.com', 2]
```
#### Actual Database Output:
Columns: `['email', 'so_lan']`
Rows:
```python
  ['a.nguyen@email.com', 2]
  ['trung_email@email.com', 2]
```
**Verification status**: ✅ MATCH
---
### Câu 2: Tìm trùng theo nhiều cột (composite key)
#### SQL Query:
```sql
SELECT order_id,
       product_id,
       COUNT(*) AS so_lan
FROM   Order_Items
GROUP  BY order_id, product_id
HAVING COUNT(*) > 1;
```
#### Expected result_table:
Columns: `['order_id', 'product_id', 'so_lan']`
Rows:
```python
  ['ORD_001', 'PROD_001', 2]
```
#### Actual Database Output:
Columns: `['order_id', 'product_id', 'so_lan']`
Rows:
```python
  ['ORD_001', 'PROD_001', 2]
```
**Verification status**: ✅ MATCH
---
### Câu 3: Tìm NULL ở cột bắt buộc
#### SQL Query:
```sql
SELECT customer_id,
       customer_name,
       email
FROM   Customers
WHERE  email IS NULL
   OR  TRIM(email) = '';
```
#### Expected result_table:
Columns: `['customer_id', 'customer_name', 'email']`
Rows:
```python
  ['C006', 'Pham Van X', '(NULL)']
  ['C007', 'Nguyen Thi Y', '']
```
#### Actual Database Output:
Columns: `['customer_id', 'customer_name', 'email']`
Rows:
```python
  ['C006', 'Pham Van X', None]
  ['C007', 'Nguyen Thi Y', '']
```
**Verification status**: ✅ MATCH
---
### Câu 4: Phát hiện khoảng trắng thừa và ký tự ẩn
#### SQL Query:
```sql
SELECT customer_id,
       customer_name,
       CHAR_LENGTH(customer_name)          AS do_dai_goc,
       CHAR_LENGTH(TRIM(customer_name))     AS do_dai_sau_trim
FROM   Customers
WHERE  customer_name != TRIM(customer_name);
```
#### Expected result_table:
Columns: `['customer_id', 'customer_name', 'do_dai_goc', 'do_dai_sau_trim']`
Rows:
```python
  ['C008', '  Pham Van D  ', '14', '10']
```
#### Actual Database Output:
Columns: `['customer_id', 'customer_name', 'do_dai_goc', 'do_dai_sau_trim']`
Rows:
```python
  ['C008', '  Pham Van D  ', 14, 10]
```
**Verification status**: ✅ MATCH
---
### Câu 5: Kiểm tra bản ghi mồ côi (foreign key orphan)
#### SQL Query:
```sql
SELECT o.order_id,
       o.customer_id
FROM   Orders o
  LEFT JOIN Customers c ON o.customer_id = c.customer_id
WHERE  c.customer_id IS NULL;
```
#### Expected result_table:
Columns: `['order_id', 'customer_id']`
Rows:
```python
  ['ORD_004', 'C999']
```
#### Actual Database Output:
Columns: `['order_id', 'customer_id']`
Rows:
```python
  ['ORD_004', 'C999']
```
**Verification status**: ✅ MATCH
---
### Câu 6: Tìm trùng không phân biệt hoa/thường
#### SQL Query:
```sql
SELECT LOWER(email)   AS email_chuan,
       COUNT(*)        AS so_lan
FROM   Customers
GROUP  BY LOWER(email)
HAVING COUNT(*) > 1
ORDER  BY so_lan DESC;
```
#### Expected result_table:
Columns: `['email_chuan', 'so_lan']`
Rows:
```python
  ['a.nguyen@email.com', 2]
  ['trung_email@email.com', 2]
```
#### Actual Database Output:
Columns: `['email_chuan', 'so_lan']`
Rows:
```python
  ['a.nguyen@email.com', 2]
  ['trung_email@email.com', 2]
```
**Verification status**: ✅ MATCH
---
### Câu 7: Đếm giá trị NULL theo từng cột
#### SQL Query:
```sql
SELECT
  SUM(CASE WHEN product_name IS NULL THEN 1 ELSE 0 END) AS null_ten,
  SUM(CASE WHEN price        IS NULL THEN 1 ELSE 0 END) AS null_gia,
  SUM(CASE WHEN stock        IS NULL THEN 1 ELSE 0 END) AS null_ton
FROM Products;
```
#### Expected result_table:
Columns: `['null_ten', 'null_gia', 'null_ton']`
Rows:
```python
  ['0', '1', '1']
```
#### Actual Database Output:
Columns: `['null_ten', 'null_gia', 'null_ton']`
Rows:
```python
  [Decimal('0'), Decimal('1'), Decimal('1')]
```
**Verification status**: ✅ MATCH
---
### Câu 8: Tìm bản ghi trùng hoàn toàn (full duplicate)
#### SQL Query:
```sql
SELECT product_name,
       price,
       COUNT(*) AS so_lan
FROM   Products
GROUP  BY product_name, price
HAVING COUNT(*) > 1;
```
#### Expected result_table:
Columns: `['product_name', 'price', 'so_lan']`
Rows:
```python
  ['Ban phim co Logitech', '2.000.000', 2]
```
#### Actual Database Output:
Columns: `['product_name', 'price', 'so_lan']`
Rows:
```python
  ['Ban phim co Logitech', Decimal('2000000.00'), 2]
```
**Verification status**: ✅ MATCH
---
### Câu 9: Kiểm tra giá trị ngoài danh sách cho phép (ENUM check)
#### SQL Query:
```sql
SELECT customer_id,
       customer_name,
       membership_tier
FROM   Customers
WHERE  membership_tier NOT IN ('Standard','Silver','Gold','Platinum');
```
#### Expected result_table:
Columns: `['customer_id', 'customer_name', 'membership_tier']`
Rows:
```python
  ['C010', 'Khach Test VIP', 'VIP']
```
#### Actual Database Output:
Columns: `['customer_id', 'customer_name', 'membership_tier']`
Rows:
```python
  ['C010', 'Khach Test VIP', 'VIP']
```
**Verification status**: ✅ MATCH
---
### Câu 10: Tìm bản ghi xóa mềm vẫn tham gia tính toán
#### SQL Query:
```sql
SELECT o.order_id,
       o.total_amount,
       o.status,
       o.deleted_at
FROM   Orders o
WHERE  o.deleted_at IS NOT NULL;
```
#### Expected result_table:
Columns: `['order_id', 'total_amount', 'status', 'deleted_at']`
Rows:
```python
  ['ORD_005', '15.000.000', 'CANCELLED', '2026-06-25 10:30:00']
```
#### Actual Database Output:
Columns: `['order_id', 'total_amount', 'status', 'deleted_at']`
Rows:
```python
  ['ORD_005', Decimal('15000000.00'), 'CANCELLED', datetime.datetime(2026, 6, 25, 10, 30)]
```
**Verification status**: ✅ MATCH
---
### Câu 11: Đối soát tổng tiền đơn hàng với chi tiết items
#### SQL Query:
```sql
SELECT o.order_id,
       o.total_amount                AS ghi_trong_don,
       SUM(i.quantity * i.price)     AS tinh_tu_items,
       o.total_amount
         - SUM(i.quantity * i.price) AS chenh_lech
FROM   Orders o
JOIN   Order_Items i ON o.order_id = i.order_id
GROUP  BY o.order_id, o.total_amount
HAVING SUM(i.quantity * i.price) != o.total_amount;
```
#### Expected result_table:
Columns: `['order_id', 'ghi_trong_don', 'tinh_tu_items', 'chenh_lech']`
Rows:
```python
  ['ORD_001', '32.000.000', '62.000.000', '-30.000.000']
  ['ORD_002', '20.000.000', '31.000.000', '-11.000.000']
  ['ORD_005', '15.000.000', '3.000.000', '12.000.000']
```
#### Actual Database Output:
Columns: `['order_id', 'ghi_trong_don', 'tinh_tu_items', 'chenh_lech']`
Rows:
```python
  ['ORD_001', Decimal('32000000.00'), Decimal('62000000.00'), Decimal('-30000000.00')]
  ['ORD_002', Decimal('20000000.00'), Decimal('31000000.00'), Decimal('-11000000.00')]
  ['ORD_005', Decimal('15000000.00'), Decimal('3000000.00'), Decimal('12000000.00')]
```
**Verification status**: ✅ MATCH
---
### Câu 12: Phát hiện tồn kho âm
#### SQL Query:
```sql
SELECT product_id,
       product_name,
       stock
FROM   Products
WHERE  stock < 0;
```
#### Expected result_table:
Columns: `['product_id', 'product_name', 'stock']`
Rows:
```python
  ['PROD_003', 'Tai nghe Sony WH-1000XM5', -5]
```
#### Actual Database Output:
Columns: `['product_id', 'product_name', 'stock']`
Rows:
```python
  ['PROD_003', 'Tai nghe Sony WH-1000XM5', -5]
```
**Verification status**: ✅ MATCH
---
### Câu 13: Phát hiện tồn kho bị NULL
#### SQL Query:
```sql
SELECT product_id,
       product_name,
       stock
FROM   Products
WHERE  stock IS NULL;
```
#### Expected result_table:
Columns: `['product_id', 'product_name', 'stock']`
Rows:
```python
  ['PROD_007', 'Chuot gaming Razer', '(NULL)']
```
#### Actual Database Output:
Columns: `['product_id', 'product_name', 'stock']`
Rows:
```python
  ['PROD_007', 'Chuot gaming Razer', None]
```
**Verification status**: ✅ MATCH
---
### Câu 14: Phát hiện giá sản phẩm NULL hoặc bằng 0
#### SQL Query:
```sql
SELECT product_id,
       product_name,
       price
FROM   Products
WHERE  price IS NULL
    OR price <= 0;
```
#### Expected result_table:
Columns: `['product_id', 'product_name', 'price']`
Rows:
```python
  ['PROD_006', 'Loa Bluetooth JBL', '(NULL)']
```
#### Actual Database Output:
Columns: `['product_id', 'product_name', 'price']`
Rows:
```python
  ['PROD_006', 'Loa Bluetooth JBL', None]
```
**Verification status**: ✅ MATCH
---
### Câu 15: Tìm đơn hàng không có dòng chi tiết nào
#### SQL Query:
```sql
SELECT o.order_id,
       o.customer_id,
       o.total_amount,
       o.status
FROM   Orders o
LEFT JOIN Order_Items i
       ON o.order_id = i.order_id
WHERE  i.order_id IS NULL;
```
#### Expected result_table:
Columns: `['order_id', 'customer_id', 'total_amount', 'status']`
Rows:
```python
  ['ORD_004', 'C999', '5.000.000', 'PENDING']
```
#### Actual Database Output:
Columns: `['order_id', 'customer_id', 'total_amount', 'status']`
Rows:
```python
  ['ORD_004', 'C999', Decimal('5000000.00'), 'PENDING']
```
**Verification status**: ✅ MATCH
---
### Câu 16: Tìm sản phẩm chưa bao giờ được bán
#### SQL Query:
```sql
SELECT p.product_id,
       p.product_name,
       p.price,
       p.stock
FROM   Products p
LEFT JOIN Order_Items oi
       ON p.product_id = oi.product_id
WHERE  oi.product_id IS NULL;
```
#### Expected result_table:
Columns: `['product_id', 'product_name', 'price', 'stock']`
Rows:
```python
  ['PROD_005', 'Ban phim co Logitech', '2.000.000', 30]
  ['PROD_006', 'Loa Bluetooth JBL', '(NULL)', 10]
  ['PROD_007', 'Chuot gaming Razer', '1.500.000', '(NULL)']
```
#### Actual Database Output:
Columns: `['product_id', 'product_name', 'price', 'stock']`
Rows:
```python
  ['PROD_005', 'Ban phim co Logitech', Decimal('2000000.00'), 30]
  ['PROD_006', 'Loa Bluetooth JBL', None, 10]
  ['PROD_007', 'Chuot gaming Razer', Decimal('1500000.00'), None]
```
**Verification status**: ✅ MATCH
---
### Câu 17: Tìm khách hàng chưa có đơn hàng nào
#### SQL Query:
```sql
SELECT c.customer_id,
       c.customer_name,
       c.membership_tier,
       c.status
FROM   Customers c
LEFT JOIN Orders o
       ON c.customer_id = o.customer_id
WHERE  o.customer_id IS NULL;
```
#### Expected result_table:
Columns: `['customer_id', 'customer_name', 'membership_tier', 'status']`
Rows:
```python
  ['C004', 'Khach Hang Ao Bug', 'Standard', 'ACTIVE']
  ['C005', 'Khach Hang Trung', 'Standard', 'ACTIVE']
  ['C006', 'Pham Van X', 'Standard', 'ACTIVE']
  ['C007', 'Nguyen Thi Y', 'Standard', 'ACTIVE']
  ['C008', '  Pham Van D  ', 'Gold', 'ACTIVE']
  ['C009', 'Nguyen Van A (2)', 'Silver', 'ACTIVE']
  ['C010', 'Khach Test VIP', 'VIP', 'ACTIVE']
```
#### Actual Database Output:
Columns: `['customer_id', 'customer_name', 'membership_tier', 'status']`
Rows:
```python
  ['C004', 'Khach Hang Ao Bug', 'Standard', 'ACTIVE']
  ['C005', 'Khach Hang Trung', 'Standard', 'ACTIVE']
  ['C006', 'Pham Van X', 'Standard', 'ACTIVE']
  ['C007', 'Nguyen Thi Y', 'Standard', 'ACTIVE']
  ['C008', '  Pham Van D  ', 'Gold', 'ACTIVE']
  ['C009', 'Nguyen Van A (2)', 'Silver', 'ACTIVE']
  ['C010', 'Khach Test VIP', 'VIP', 'ACTIVE']
```
**Verification status**: ✅ MATCH
---
### Câu 18: Kiểm tra trạng thái đơn hàng ngoài danh sách cho phép
#### SQL Query:
```sql
SELECT order_id,
       customer_id,
       status
FROM   Orders
WHERE  status NOT IN
  ('COMPLETED','PENDING',
   'CANCELLED','PROCESSING');
```
#### Expected result_table:
Columns: `['order_id', 'customer_id', 'status']`
Rows:
```python
```
#### Actual Database Output:
Columns: `['order_id', 'customer_id', 'status']`
Rows:
```python
```
**Verification status**: ✅ MATCH
---
### Câu 19: Tổng hợp chi tiêu theo từng khách hàng
#### SQL Query:
```sql
SELECT c.customer_id,
       c.customer_name,
       COUNT(o.order_id)   AS so_don,
       SUM(o.total_amount) AS tong_chi_tieu
FROM   Customers c
JOIN   Orders o ON c.customer_id = o.customer_id
GROUP  BY c.customer_id, c.customer_name
ORDER  BY tong_chi_tieu DESC;
```
#### Expected result_table:
Columns: `['customer_id', 'customer_name', 'so_don', 'tong_chi_tieu']`
Rows:
```python
  ['C001', 'Nguyen Van A', 2, '47.000.000']
  ['C002', 'Tran Van B', 1, '20.000.000']
  ['C003', 'Le Thi C', 1, '8.000.000']
```
#### Actual Database Output:
Columns: `['customer_id', 'customer_name', 'so_don', 'tong_chi_tieu']`
Rows:
```python
  ['C001', 'Nguyen Van A', 2, Decimal('47000000.00')]
  ['C002', 'Tran Van B', 1, Decimal('20000000.00')]
  ['C003', 'Le Thi C', 1, Decimal('8000000.00')]
```
**Verification status**: ✅ MATCH
---
### Câu 20: Phát hiện sản phẩm đã bán vượt quá tồn kho
#### SQL Query:
```sql
SELECT p.product_id,
       p.product_name,
       p.stock,
       SUM(oi.quantity) AS tong_da_ban
FROM   Products p
JOIN   Order_Items oi ON p.product_id = oi.product_id
GROUP  BY p.product_id, p.product_name, p.stock
HAVING SUM(oi.quantity) > p.stock;
```
#### Expected result_table:
Columns: `['product_id', 'product_name', 'stock', 'tong_da_ban']`
Rows:
```python
  ['PROD_003', 'Tai nghe Sony WH-1000XM5', -5, 1]
```
#### Actual Database Output:
Columns: `['product_id', 'product_name', 'stock', 'tong_da_ban']`
Rows:
```python
  ['PROD_003', 'Tai nghe Sony WH-1000XM5', -5, Decimal('1')]
```
**Verification status**: ✅ MATCH
---
### Câu 21: Tính doanh thu thực theo từng đơn từ Order_Items
#### SQL Query:
```sql
SELECT order_id,
       COUNT(*)              AS so_dong_items,
       SUM(quantity)         AS tong_so_luong,
       SUM(quantity * price) AS doanh_thu_thuc
FROM   Order_Items
GROUP  BY order_id
ORDER  BY order_id;
```
#### Expected result_table:
Columns: `['order_id', 'so_dong_items', 'tong_so_luong', 'doanh_thu_thuc']`
Rows:
```python
  ['ORD_001', 3, 3, '62.000.000']
  ['ORD_002', 2, 2, '31.000.000']
  ['ORD_003', 1, 1, '8.000.000']
  ['ORD_005', 2, 2, '3.000.000']
```
#### Actual Database Output:
Columns: `['order_id', 'so_dong_items', 'tong_so_luong', 'doanh_thu_thuc']`
Rows:
```python
  ['ORD_001', 3, Decimal('3'), Decimal('62000000.00')]
  ['ORD_002', 2, Decimal('2'), Decimal('31000000.00')]
  ['ORD_003', 1, Decimal('1'), Decimal('8000000.00')]
  ['ORD_005', 2, Decimal('2'), Decimal('3000000.00')]
```
**Verification status**: ✅ MATCH
---
### Câu 22: Xếp hạng sản phẩm bán chạy nhất theo doanh số
#### SQL Query:
```sql
SELECT p.product_id,
       p.product_name,
       SUM(oi.quantity)            AS tong_so_luong,
       SUM(oi.quantity * oi.price) AS tong_doanh_so
FROM   Products p
JOIN   Order_Items oi
       ON p.product_id = oi.product_id
GROUP  BY p.product_id, p.product_name
ORDER  BY tong_doanh_so DESC;
```
#### Expected result_table:
Columns: `['product_id', 'product_name', 'tong_so_luong', 'tong_doanh_so']`
Rows:
```python
  ['PROD_001', 'iPhone 15 Pro Max', 3, '90.000.000']
  ['PROD_003', 'Tai nghe Sony WH-1000XM5', 1, '8.000.000']
  ['PROD_002', 'Ban phim co Logitech', 2, '4.000.000']
  ['PROD_004', 'Sac du phong Anker', 2, '2.000.000']
```
#### Actual Database Output:
Columns: `['product_id', 'product_name', 'tong_so_luong', 'tong_doanh_so']`
Rows:
```python
  ['PROD_001', 'iPhone 15 Pro Max', Decimal('3'), Decimal('90000000.00')]
  ['PROD_003', 'Tai nghe Sony WH-1000XM5', Decimal('1'), Decimal('8000000.00')]
  ['PROD_002', 'Ban phim co Logitech', Decimal('2'), Decimal('4000000.00')]
  ['PROD_004', 'Sac du phong Anker', Decimal('2'), Decimal('2000000.00')]
```
**Verification status**: ✅ MATCH
---
### Câu 23: Kiểm tra giá trị tồn kho (stock × price)
#### SQL Query:
```sql
SELECT product_id,
       product_name,
       price,
       stock,
       price * stock AS gia_tri_kho
FROM   Products
ORDER  BY gia_tri_kho;
```
#### Expected result_table:
Columns: `['product_id', 'product_name', 'price', 'stock', 'gia_tri_kho']`
Rows:
```python
  ['PROD_006', 'Loa Bluetooth JBL', '(NULL)', '10', '(NULL)']
  ['PROD_007', 'Chuot gaming Razer', '1.500.000', '(NULL)', '(NULL)']
  ['PROD_003', 'Tai nghe Sony WH-1000XM5', '8.000.000', '-5', '-40.000.000']
  ['PROD_004', 'Sac du phong Anker', '1.000.000', '20', '20.000.000']
  ['PROD_005', 'Ban phim co Logitech', '2.000.000', '30', '60.000.000']
  ['PROD_002', 'Ban phim co Logitech', '2.000.000', '100', '200.000.000']
  ['PROD_001', 'iPhone 15 Pro Max', '30.000.000', '50', '1.500.000.000']
```
#### Actual Database Output:
Columns: `['product_id', 'product_name', 'price', 'stock', 'gia_tri_kho']`
Rows:
```python
  ['PROD_006', 'Loa Bluetooth JBL', None, 10, None]
  ['PROD_007', 'Chuot gaming Razer', Decimal('1500000.00'), None, None]
  ['PROD_003', 'Tai nghe Sony WH-1000XM5', Decimal('8000000.00'), -5, Decimal('-40000000.00')]
  ['PROD_004', 'Sac du phong Anker', Decimal('1000000.00'), 20, Decimal('20000000.00')]
  ['PROD_005', 'Ban phim co Logitech', Decimal('2000000.00'), 30, Decimal('60000000.00')]
  ['PROD_002', 'Ban phim co Logitech', Decimal('2000000.00'), 100, Decimal('200000000.00')]
  ['PROD_001', 'iPhone 15 Pro Max', Decimal('30000000.00'), 50, Decimal('1500000000.00')]
```
**Verification status**: ✅ MATCH
---
### Câu 24: So sánh giá bán lịch sử với giá niêm yết hiện tại
#### SQL Query:
```sql
SELECT oi.order_id,
       oi.product_id,
       oi.price     AS gia_luc_ban,
       p.price      AS gia_hien_tai,
       oi.price - p.price AS chenh_lech
FROM   Order_Items oi
JOIN   Products p
       ON oi.product_id = p.product_id
WHERE  oi.price <> p.price;
```
#### Expected result_table:
Columns: `['order_id', 'product_id', 'gia_luc_ban', 'gia_hien_tai', 'chenh_lech']`
Rows:
```python
```
#### Actual Database Output:
Columns: `['order_id', 'product_id', 'gia_luc_ban', 'gia_hien_tai', 'chenh_lech']`
Rows:
```python
```
**Verification status**: ✅ MATCH
---
### Câu 25: Tổng doanh thu chỉ tính đơn hàng COMPLETED
#### SQL Query:
```sql
SELECT c.customer_name,
       o.order_id,
       o.total_amount,
       o.order_date
FROM   Orders o
JOIN   Customers c
       ON o.customer_id = c.customer_id
WHERE  o.status = 'COMPLETED'
ORDER  BY o.total_amount DESC;
```
#### Expected result_table:
Columns: `['customer_name', 'order_id', 'total_amount', 'order_date']`
Rows:
```python
  ['Nguyen Van A', 'ORD_001', '32.000.000', '2026-06-20']
  ['Tran Van B', 'ORD_002', '20.000.000', '2026-06-22']
```
#### Actual Database Output:
Columns: `['customer_name', 'order_id', 'total_amount', 'order_date']`
Rows:
```python
  ['Nguyen Van A', 'ORD_001', Decimal('32000000.00'), datetime.date(2026, 6, 20)]
  ['Tran Van B', 'ORD_002', Decimal('20000000.00'), datetime.date(2026, 6, 22)]
```
**Verification status**: ✅ MATCH
---
### Câu 26: Phân tích tỷ lệ đơn hàng theo trạng thái
#### SQL Query:
```sql
SELECT status,
       COUNT(*) AS so_don,
       ROUND(COUNT(*) * 100.0 /
         (SELECT COUNT(*) FROM Orders), 1)
         AS phan_tram
FROM   Orders
GROUP  BY status
ORDER  BY so_don DESC;
```
#### Expected result_table:
Columns: `['status', 'so_don', 'phan_tram']`
Rows:
```python
  ['COMPLETED', 2, '40.0']
  ['CANCELLED', 2, '40.0']
  ['PENDING', 1, '20.0']
```
#### Actual Database Output:
Columns: `['status', 'so_don', 'phan_tram']`
Rows:
```python
  ['COMPLETED', 2, Decimal('40.0')]
  ['CANCELLED', 2, Decimal('40.0')]
  ['PENDING', 1, Decimal('20.0')]
```
**Verification status**: ✅ MATCH
---
### Câu 27: Tổng doanh thu theo danh mục sản phẩm
#### SQL Query:
```sql
SELECT p.category,
       COUNT(DISTINCT oi.order_id) AS so_don_co_sp,
       SUM(oi.quantity)             AS tong_so_luong,
       SUM(oi.quantity * oi.price)  AS tong_doanh_so
FROM   Order_Items oi
JOIN   Products p
       ON oi.product_id = p.product_id
GROUP  BY p.category
ORDER  BY tong_doanh_so DESC;
```
#### Expected result_table:
Columns: `['category', 'so_don_co_sp', 'tong_so_luong', 'tong_doanh_so']`
Rows:
```python
  ['Dien thoai', 2, 3, '90.000.000']
  ['Phu kien', 4, 5, '14.000.000']
```
#### Actual Database Output:
Columns: `['category', 'so_don_co_sp', 'tong_so_luong', 'tong_doanh_so']`
Rows:
```python
  ['Dien thoai', 2, Decimal('3'), Decimal('90000000.00')]
  ['Phu kien', 4, Decimal('5'), Decimal('14000000.00')]
```
**Verification status**: ✅ MATCH
---
### Câu 28: Đối soát tồn kho hiện tại với lượng đã bán ra
#### SQL Query:
```sql
SELECT p.product_id,
       p.product_name,
       p.stock                       AS ton_kho_hien_tai,
       COALESCE(SUM(oi.quantity), 0) AS tong_da_ban,
       p.stock
         + COALESCE(SUM(oi.quantity), 0)
                                     AS uoc_tinh_ban_dau
FROM   Products p
LEFT JOIN Order_Items oi
       ON p.product_id = oi.product_id
GROUP  BY p.product_id, p.product_name, p.stock
ORDER  BY p.product_id;
```
#### Expected result_table:
Columns: `['product_id', 'product_name', 'ton_kho_hien_tai', 'tong_da_ban', 'uoc_tinh_ban_dau']`
Rows:
```python
  ['PROD_001', 'iPhone 15 Pro Max', 50, 3, 53]
  ['PROD_002', 'Ban phim co Logitech', 100, 2, 102]
  ['PROD_003', 'Tai nghe Sony WH-1000XM5', -5, 1, -4]
  ['PROD_004', 'Sac du phong Anker', 20, 2, 22]
  ['PROD_005', 'Ban phim co Logitech', 30, 0, 30]
  ['PROD_006', 'Loa Bluetooth JBL', 10, 0, 10]
  ['PROD_007', 'Chuot gaming Razer', '(NULL)', 0, '(NULL)']
```
#### Actual Database Output:
Columns: `['product_id', 'product_name', 'ton_kho_hien_tai', 'tong_da_ban', 'uoc_tinh_ban_dau']`
Rows:
```python
  ['PROD_001', 'iPhone 15 Pro Max', 50, Decimal('3'), Decimal('53')]
  ['PROD_002', 'Ban phim co Logitech', 100, Decimal('2'), Decimal('102')]
  ['PROD_003', 'Tai nghe Sony WH-1000XM5', -5, Decimal('1'), Decimal('-4')]
  ['PROD_004', 'Sac du phong Anker', 20, Decimal('2'), Decimal('22')]
  ['PROD_005', 'Ban phim co Logitech', 30, Decimal('0'), Decimal('30')]
  ['PROD_006', 'Loa Bluetooth JBL', 10, Decimal('0'), Decimal('10')]
  ['PROD_007', 'Chuot gaming Razer', None, Decimal('0'), None]
```
**Verification status**: ✅ MATCH
---
### Câu 29: Phát hiện đơn hàng bị tạo trùng (double order)
#### SQL Query:
```sql
SELECT customer_id,
       total_amount,
       order_date,
       COUNT(*) AS so_lan
FROM   Orders
GROUP  BY customer_id, total_amount, order_date
HAVING COUNT(*) > 1;
```
#### Expected result_table:
Columns: `['customer_id', 'total_amount', 'order_date', 'so_lan']`
Rows:
```python
```
#### Actual Database Output:
Columns: `['customer_id', 'total_amount', 'order_date', 'so_lan']`
Rows:
```python
```
**Verification status**: ✅ MATCH
---
### Câu 30: Phát hiện đơn hàng có giá trị bất thường (outlier)
#### SQL Query:
```sql
SELECT order_id,
       customer_id,
       total_amount
FROM   Orders
WHERE  total_amount >
       (SELECT AVG(total_amount) * 1.5
        FROM Orders)
ORDER  BY total_amount DESC;
```
#### Expected result_table:
Columns: `['order_id', 'customer_id', 'total_amount']`
Rows:
```python
  ['ORD_001', 'C001', '32.000.000']
```
#### Actual Database Output:
Columns: `['order_id', 'customer_id', 'total_amount']`
Rows:
```python
  ['ORD_001', 'C001', Decimal('32000000.00')]
```
**Verification status**: ✅ MATCH
---
### Câu 31: Tìm tên khách hàng chứa ký tự bất thường
#### SQL Query:
```sql
SELECT customer_id,
       customer_name
FROM   Customers
WHERE  customer_name REGEXP '[0-9()]';
```
#### Expected result_table:
Columns: `['customer_id', 'customer_name']`
Rows:
```python
  ['C009', 'Nguyen Van A (2)']
```
#### Actual Database Output:
Columns: `['customer_id', 'customer_name']`
Rows:
```python
  ['C009', 'Nguyen Van A (2)']
```
**Verification status**: ✅ MATCH
---
### Câu 32: Tìm email không đúng định dạng cơ bản
#### SQL Query:
```sql
SELECT customer_id,
       customer_name,
       email
FROM   Customers
WHERE  email IS NULL
    OR TRIM(email) = ''
    OR email NOT LIKE '%@%'
    OR email NOT LIKE '%.%';
```
#### Expected result_table:
Columns: `['customer_id', 'customer_name', 'email']`
Rows:
```python
  ['C006', 'Pham Van X', '(NULL)']
  ['C007', 'Nguyen Thi Y', '']
```
#### Actual Database Output:
Columns: `['customer_id', 'customer_name', 'email']`
Rows:
```python
  ['C006', 'Pham Van X', None]
  ['C007', 'Nguyen Thi Y', '']
```
**Verification status**: ✅ MATCH
---
### Câu 33: Kiểm tra số lượng sản phẩm bất thường trong Order_Items
#### SQL Query:
```sql
SELECT item_id,
       order_id,
       product_id,
       quantity
FROM   Order_Items
WHERE  quantity <= 0
    OR quantity > 1000;
```
#### Expected result_table:
Columns: `['item_id', 'order_id', 'product_id', 'quantity']`
Rows:
```python
```
#### Actual Database Output:
Columns: `['item_id', 'order_id', 'product_id', 'quantity']`
Rows:
```python
```
**Verification status**: ✅ MATCH
---
### Câu 34: Kiểm tra ngày đặt hàng bất thường (tương lai hoặc quá xa quá khứ)
#### SQL Query:
```sql
SELECT order_id,
       customer_id,
       order_date
FROM   Orders
WHERE  order_date > CURDATE()
    OR order_date < '2020-01-01';
```
#### Expected result_table:
Columns: `['order_id', 'customer_id', 'order_date']`
Rows:
```python
```
#### Actual Database Output:
Columns: `['order_id', 'customer_id', 'order_date']`
Rows:
```python
```
**Verification status**: ✅ MATCH
---
### Câu 35: Tìm tên sản phẩm trùng sau khi chuẩn hóa
#### SQL Query:
```sql
SELECT LOWER(TRIM(product_name)) AS ten_chuan,
       COUNT(*)                  AS so_ban_ghi
FROM   Products
GROUP  BY LOWER(TRIM(product_name))
HAVING COUNT(*) > 1;
```
#### Expected result_table:
Columns: `['ten_chuan', 'so_ban_ghi']`
Rows:
```python
  ['ban phim co logitech', 2]
```
#### Actual Database Output:
Columns: `['ten_chuan', 'so_ban_ghi']`
Rows:
```python
  ['ban phim co logitech', 2]
```
**Verification status**: ✅ MATCH
---
### Câu 36: Kiểm tra status của Customers ngoài danh sách cho phép
#### SQL Query:
```sql
SELECT customer_id,
       customer_name,
       status
FROM   Customers
WHERE  status NOT IN
  ('ACTIVE','INACTIVE','SUSPENDED');
```
#### Expected result_table:
Columns: `['customer_id', 'customer_name', 'status']`
Rows:
```python
```
#### Actual Database Output:
Columns: `['customer_id', 'customer_name', 'status']`
Rows:
```python
```
**Verification status**: ✅ MATCH
---
### Câu 37: Kiểm tra giá bán âm hoặc bằng 0 trong Order_Items
#### SQL Query:
```sql
SELECT item_id,
       order_id,
       product_id,
       price
FROM   Order_Items
WHERE  price <= 0;
```
#### Expected result_table:
Columns: `['item_id', 'order_id', 'product_id', 'price']`
Rows:
```python
```
#### Actual Database Output:
Columns: `['item_id', 'order_id', 'product_id', 'price']`
Rows:
```python
```
**Verification status**: ✅ MATCH
---
### Câu 38: Phát hiện đơn có tổng tiền nhưng không có sản phẩm nào
#### SQL Query:
```sql
SELECT o.order_id,
       o.customer_id,
       o.total_amount,
       o.status
FROM   Orders o
LEFT JOIN Order_Items oi
       ON o.order_id = oi.order_id
WHERE  o.total_amount > 0
  AND  oi.order_id IS NULL;
```
#### Expected result_table:
Columns: `['order_id', 'customer_id', 'total_amount', 'status']`
Rows:
```python
  ['ORD_004', 'C999', '5.000.000', 'PENDING']
```
#### Actual Database Output:
Columns: `['order_id', 'customer_id', 'total_amount', 'status']`
Rows:
```python
  ['ORD_004', 'C999', Decimal('5000000.00'), 'PENDING']
```
**Verification status**: ✅ MATCH
---
### Câu 39: Phát hiện tổng items vượt quá 1.5 lần total_amount
#### SQL Query:
```sql
SELECT o.order_id,
       o.total_amount,
       SUM(oi.quantity * oi.price) AS tinh_tu_items
FROM   Orders o
JOIN   Order_Items oi
       ON o.order_id = oi.order_id
GROUP  BY o.order_id, o.total_amount
HAVING SUM(oi.quantity * oi.price)
         > o.total_amount * 1.5;
```
#### Expected result_table:
Columns: `['order_id', 'total_amount', 'tinh_tu_items']`
Rows:
```python
  ['ORD_001', '32.000.000', '62.000.000']
  ['ORD_002', '20.000.000', '31.000.000']
```
#### Actual Database Output:
Columns: `['order_id', 'total_amount', 'tinh_tu_items']`
Rows:
```python
  ['ORD_001', Decimal('32000000.00'), Decimal('62000000.00')]
  ['ORD_002', Decimal('20000000.00'), Decimal('31000000.00')]
```
**Verification status**: ✅ MATCH
---
### Câu 40: Truy vết item còn sót của đơn đã xóa mềm
#### SQL Query:
```sql
SELECT oi.item_id,
       oi.order_id,
       oi.product_id,
       oi.quantity,
       oi.price
FROM   Order_Items oi
JOIN   Orders o
       ON oi.order_id = o.order_id
WHERE  o.deleted_at IS NOT NULL
ORDER  BY oi.item_id;
```
#### Expected result_table:
Columns: `['item_id', 'order_id', 'product_id', 'quantity', 'price']`
Rows:
```python
  [8, 'ORD_005', 'PROD_004', 1, '1.000.000']
  [9, 'ORD_005', 'PROD_002', 1, '2.000.000']
```
#### Actual Database Output:
Columns: `['item_id', 'order_id', 'product_id', 'quantity', 'price']`
Rows:
```python
  [8, 'ORD_005', 'PROD_004', 1, Decimal('1000000.00')]
  [9, 'ORD_005', 'PROD_002', 1, Decimal('2000000.00')]
```
**Verification status**: ✅ MATCH
---
### Câu 41: Đối chiếu trạng thái hủy với cờ xóa mềm
#### SQL Query:
```sql
SELECT order_id,
       status,
       deleted_at,
       CASE
         WHEN status = 'CANCELLED'
          AND deleted_at IS NULL
         THEN 'Hủy nhưng chưa xóa mềm'
         WHEN status <> 'CANCELLED'
          AND deleted_at IS NOT NULL
         THEN 'Xóa mềm nhưng status chưa CANCELLED'
       END AS van_de
FROM   Orders
WHERE  (status = 'CANCELLED' AND deleted_at IS NULL)
   OR  (status <> 'CANCELLED' AND deleted_at IS NOT NULL)
ORDER  BY order_id;
```
#### Expected result_table:
Columns: `['order_id', 'status', 'deleted_at', 'van_de']`
Rows:
```python
  ['ORD_003', 'CANCELLED', '(NULL)', 'Hủy nhưng chưa xóa mềm']
```
#### Actual Database Output:
Columns: `['order_id', 'status', 'deleted_at', 'van_de']`
Rows:
```python
  ['ORD_003', 'CANCELLED', None, 'Hủy nhưng chưa xóa mềm']
```
**Verification status**: ✅ MATCH
---
### Câu 42: Phát hiện đơn treo (PENDING) tồn đọng quá lâu
#### SQL Query:
```sql
SELECT order_id,
       customer_id,
       status,
       order_date,
       DATEDIFF('2026-06-30', order_date)
         AS so_ngay_ton_dong
FROM   Orders
WHERE  status = 'PENDING'
  AND  DATEDIFF('2026-06-30', order_date) > 3
ORDER  BY so_ngay_ton_dong DESC;
```
#### Expected result_table:
Columns: `['order_id', 'customer_id', 'status', 'order_date', 'so_ngay_ton_dong']`
Rows:
```python
  ['ORD_004', 'C999', 'PENDING', '2026-06-24', 6]
```
#### Actual Database Output:
Columns: `['order_id', 'customer_id', 'status', 'order_date', 'so_ngay_ton_dong']`
Rows:
```python
  ['ORD_004', 'C999', 'PENDING', datetime.date(2026, 6, 24), 6]
```
**Verification status**: ✅ MATCH
---
### Câu 43: Dựng dòng thời gian đơn hàng — khoảng cách giữa các đơn
#### SQL Query:
```sql
SELECT o.order_id,
       o.order_date,
       DATEDIFF(
         o.order_date,
         (SELECT MAX(o2.order_date)
          FROM   Orders o2
          WHERE  o2.order_date < o.order_date)
       ) AS ngay_ke_tu_don_truoc
FROM   Orders o
ORDER  BY o.order_date;
```
#### Expected result_table:
Columns: `['order_id', 'order_date', 'ngay_ke_tu_don_truoc']`
Rows:
```python
  ['ORD_001', '2026-06-20', '(NULL)']
  ['ORD_002', '2026-06-22', 2]
  ['ORD_003', '2026-06-23', 1]
  ['ORD_004', '2026-06-24', 1]
  ['ORD_005', '2026-06-25', 1]
```
#### Actual Database Output:
Columns: `['order_id', 'order_date', 'ngay_ke_tu_don_truoc']`
Rows:
```python
  ['ORD_001', datetime.date(2026, 6, 20), None]
  ['ORD_002', datetime.date(2026, 6, 22), 2]
  ['ORD_003', datetime.date(2026, 6, 23), 1]
  ['ORD_004', datetime.date(2026, 6, 24), 1]
  ['ORD_005', datetime.date(2026, 6, 25), 1]
```
**Verification status**: ✅ MATCH
---
### Câu 44: Phát hiện item_id bị nhảy — dấu vết của bản ghi bị xóa
#### SQL Query:
```sql
SELECT a.item_id + 1      AS id_bi_mat
FROM   Order_Items a
LEFT JOIN Order_Items b
       ON b.item_id = a.item_id + 1
WHERE  b.item_id IS NULL
  AND  a.item_id <
       (SELECT MAX(item_id)
        FROM Order_Items);
```
#### Expected result_table:
Columns: `['id_bi_mat']`
Rows:
```python
  [3]
```
#### Actual Database Output:
Columns: `['id_bi_mat']`
Rows:
```python
  [3]
```
**Verification status**: ✅ MATCH
---
### Câu 45: Phân tích đơn hàng bị hủy — khách nào hay hủy nhất
#### SQL Query:
```sql
SELECT c.customer_id,
       c.customer_name,
       COUNT(o.order_id) AS so_don_huy
FROM   Orders o
JOIN   Customers c
       ON o.customer_id = c.customer_id
WHERE  o.status = 'CANCELLED'
GROUP  BY c.customer_id, c.customer_name
ORDER  BY so_don_huy DESC;
```
#### Expected result_table:
Columns: `['customer_id', 'customer_name', 'so_don_huy']`
Rows:
```python
  ['C003', 'Le Thi C', 1]
  ['C001', 'Nguyen Van A', 1]
```
#### Actual Database Output:
Columns: `['customer_id', 'customer_name', 'so_don_huy']`
Rows:
```python
  ['C003', 'Le Thi C', 1]
  ['C001', 'Nguyen Van A', 1]
```
**Verification status**: ✅ MATCH
---
### Câu 46: Dùng ROW_NUMBER() phát hiện item trùng trong cùng một đơn
#### SQL Query:
```sql
SELECT item_id,
       order_id,
       product_id,
       ROW_NUMBER() OVER (
         PARTITION BY order_id, product_id
         ORDER BY item_id
       ) AS so_lan_trong_don
FROM   Order_Items
ORDER  BY order_id, product_id, item_id;
```
#### Expected result_table:
Columns: `['item_id', 'order_id', 'product_id', 'so_lan_trong_don']`
Rows:
```python
  [1, 'ORD_001', 'PROD_001', 1]
  [7, 'ORD_001', 'PROD_001', 2]
  [2, 'ORD_001', 'PROD_002', 1]
  [4, 'ORD_002', 'PROD_001', 1]
  [5, 'ORD_002', 'PROD_004', 1]
  [6, 'ORD_003', 'PROD_003', 1]
  [9, 'ORD_005', 'PROD_002', 1]
  [8, 'ORD_005', 'PROD_004', 1]
```
#### Actual Database Output:
Columns: `['item_id', 'order_id', 'product_id', 'so_lan_trong_don']`
Rows:
```python
  [1, 'ORD_001', 'PROD_001', 1]
  [7, 'ORD_001', 'PROD_001', 2]
  [2, 'ORD_001', 'PROD_002', 1]
  [4, 'ORD_002', 'PROD_001', 1]
  [5, 'ORD_002', 'PROD_004', 1]
  [6, 'ORD_003', 'PROD_003', 1]
  [9, 'ORD_005', 'PROD_002', 1]
  [8, 'ORD_005', 'PROD_004', 1]
```
**Verification status**: ✅ MATCH
---
### Câu 47: Dùng CTE + RANK() xếp hạng sản phẩm bán chạy
#### SQL Query:
```sql
WITH doanh_so AS (
  SELECT p.product_id,
         p.product_name,
         SUM(oi.quantity * oi.price)
           AS tong_doanh_so
  FROM   Products p
  JOIN   Order_Items oi
         ON p.product_id = oi.product_id
  GROUP  BY p.product_id, p.product_name
)
SELECT product_id,
       product_name,
       tong_doanh_so,
       RANK() OVER
         (ORDER BY tong_doanh_so DESC)
         AS hang
FROM   doanh_so;
```
#### Expected result_table:
Columns: `['product_id', 'product_name', 'tong_doanh_so', 'hang']`
Rows:
```python
  ['PROD_001', 'iPhone 15 Pro Max', '90.000.000', 1]
  ['PROD_003', 'Tai nghe Sony WH-1000XM5', '8.000.000', 2]
  ['PROD_002', 'Ban phim co Logitech', '4.000.000', 3]
  ['PROD_004', 'Sac du phong Anker', '2.000.000', 4]
```
#### Actual Database Output:
Columns: `['product_id', 'product_name', 'tong_doanh_so', 'hang']`
Rows:
```python
  ['PROD_001', 'iPhone 15 Pro Max', Decimal('90000000.00'), 1]
  ['PROD_003', 'Tai nghe Sony WH-1000XM5', Decimal('8000000.00'), 2]
  ['PROD_002', 'Ban phim co Logitech', Decimal('4000000.00'), 3]
  ['PROD_004', 'Sac du phong Anker', Decimal('2000000.00'), 4]
```
**Verification status**: ✅ MATCH
---
### Câu 48: Dùng CTE lồng nhau tìm khách chi tiêu trên mức trung bình
#### SQL Query:
```sql
WITH tong_chi AS (
  SELECT c.customer_id,
         c.customer_name,
         SUM(o.total_amount) AS tong_da_mua
  FROM   Customers c
  JOIN   Orders o
         ON c.customer_id = o.customer_id
  WHERE  o.status = 'COMPLETED'
  GROUP  BY c.customer_id, c.customer_name
)
SELECT customer_id,
       customer_name,
       tong_da_mua
FROM   tong_chi
WHERE  tong_da_mua >
       (SELECT AVG(tong_da_mua)
        FROM   tong_chi)
ORDER  BY tong_da_mua DESC;
```
#### Expected result_table:
Columns: `['customer_id', 'customer_name', 'tong_da_mua']`
Rows:
```python
  ['C001', 'Nguyen Van A', '32.000.000']
```
#### Actual Database Output:
Columns: `['customer_id', 'customer_name', 'tong_da_mua']`
Rows:
```python
  ['C001', 'Nguyen Van A', Decimal('32000000.00')]
```
**Verification status**: ✅ MATCH
---
### Câu 49: Tính doanh thu tích lũy theo thời gian với SUM() OVER()
#### SQL Query:
```sql
SELECT order_id,
       customer_id,
       order_date,
       total_amount,
       SUM(total_amount) OVER (
         ORDER BY order_date
         ROWS BETWEEN UNBOUNDED PRECEDING
              AND CURRENT ROW
       ) AS luy_ke
FROM   Orders
ORDER  BY order_date;
```
#### Expected result_table:
Columns: `['order_id', 'customer_id', 'order_date', 'total_amount', 'luy_ke']`
Rows:
```python
  ['ORD_001', 'C001', '2026-06-20', '32.000.000', '32.000.000']
  ['ORD_002', 'C002', '2026-06-22', '20.000.000', '52.000.000']
  ['ORD_003', 'C003', '2026-06-23', '8.000.000', '60.000.000']
  ['ORD_004', 'C999', '2026-06-24', '5.000.000', '65.000.000']
  ['ORD_005', 'C001', '2026-06-25', '15.000.000', '80.000.000']
```
#### Actual Database Output:
Columns: `['order_id', 'customer_id', 'order_date', 'total_amount', 'luy_ke']`
Rows:
```python
  ['ORD_001', 'C001', datetime.date(2026, 6, 20), Decimal('32000000.00'), Decimal('32000000.00')]
  ['ORD_002', 'C002', datetime.date(2026, 6, 22), Decimal('20000000.00'), Decimal('52000000.00')]
  ['ORD_003', 'C003', datetime.date(2026, 6, 23), Decimal('8000000.00'), Decimal('60000000.00')]
  ['ORD_004', 'C999', datetime.date(2026, 6, 24), Decimal('5000000.00'), Decimal('65000000.00')]
  ['ORD_005', 'C001', datetime.date(2026, 6, 25), Decimal('15000000.00'), Decimal('80000000.00')]
```
**Verification status**: ✅ MATCH
---
### Câu 50: Báo cáo tổng hợp: nhiều loại lỗi trong một câu UNION ALL
#### SQL Query:
```sql
SELECT 'Email trung'  AS loai_loi,
       customer_id    AS doi_tuong,
       'Customers'    AS bang
FROM   Customers
WHERE  email IN (
  SELECT email FROM Customers
  WHERE  email IS NOT NULL
    AND  email != ''
  GROUP  BY email
  HAVING COUNT(*) > 1)
UNION ALL
SELECT 'Ton kho am', product_id, 'Products'
FROM   Products WHERE stock < 0
UNION ALL
SELECT 'Khach hang ma', order_id, 'Orders'
FROM   Orders
WHERE  customer_id NOT IN
  (SELECT customer_id FROM Customers)
ORDER  BY loai_loi;
```
#### Expected result_table:
Columns: `['loai_loi', 'doi_tuong', 'bang']`
Rows:
```python
  ['Email trung', 'C001', 'Customers']
  ['Email trung', 'C004', 'Customers']
  ['Email trung', 'C005', 'Customers']
  ['Email trung', 'C009', 'Customers']
  ['Khach hang ma', 'ORD_004', 'Orders']
  ['Ton kho am', 'PROD_003', 'Products']
```
#### Actual Database Output:
Columns: `['loai_loi', 'doi_tuong', 'bang']`
Rows:
```python
  ['Email trung', 'C001', 'Customers']
  ['Email trung', 'C004', 'Customers']
  ['Email trung', 'C005', 'Customers']
  ['Email trung', 'C009', 'Customers']
  ['Khach hang ma', 'ORD_004', 'Orders']
  ['Ton kho am', 'PROD_003', 'Products']
```
**Verification status**: ✅ MATCH
---