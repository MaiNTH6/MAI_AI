# 📘 Cẩm nang 50 câu lệnh SQL săn Bug cho QA

Phần **SÁCH** của dự án MAI — tách riêng khỏi trang web (`/app`, `/components`, `/lib`...).
Toàn bộ nguồn, dữ liệu mẫu và pipeline build của ebook nằm gọn trong thư mục này.

> Trang web ở thư mục gốc repo **không** phụ thuộc vào `book/`. Hai phần độc lập, build riêng.

## Cấu trúc

```
book/
├── scripts/
│   ├── _book_sql_data.py        # NGUỒN nội dung sách: 46 câu SQL + kết quả mẫu kỳ vọng
│   ├── gen-book-sql.py          # Sinh PDF từ _book_sql_data.py  → dist/
│   ├── run_all_verification.py  # Chạy từng câu SQL trên MySQL thật, đối chiếu kết quả → báo cáo
│   ├── list_ids.py              # Helper: liệt kê ID các câu trong sách
│   └── fix_all.py               # Script one-off đã áp dụng (giữ lại để tham khảo)
├── sql/
│   ├── ecommerce_test_setup.sql           # ⭐ Dữ liệu mẫu CHUẨN (khớp nội dung sách, có ORD_005/soft-delete)
│   └── ecommerce_test_setup_expanded.sql  # Bản dữ liệu mở rộng (chưa dùng cho sách)
├── dist/
│   └── cam-nang-50-cau-lenh-sql-san-bug.pdf   # Sản phẩm build (ebook)
├── drafts/
│   └── ecommerce_test_setup_nho-27dong.sql    # ⚠️ Bản nháp 27 dòng — LỆCH với sách (xem ghi chú dưới)
└── sql_verification_report.md   # Báo cáo kiểm chứng SQL (tất cả ✅ MATCH)
```

## Build & kiểm chứng

Yêu cầu: Python 3, `reportlab` (sinh PDF), `pymysql` + MySQL chạy ở `127.0.0.1:3306` (verify).
Chạy lệnh từ **thư mục gốc repo**:

```bash
# 1) Sinh PDF ebook → book/dist/cam-nang-50-cau-lenh-sql-san-bug.pdf
python book/scripts/gen-book-sql.py

# 2) Kiểm chứng 46 câu SQL với MySQL thật → cập nhật book/sql_verification_report.md
python book/scripts/run_all_verification.py
```

`run_all_verification.py` tự nạp `book/sql/ecommerce_test_setup.sql` vào MySQL rồi chạy từng câu,
so kết quả thực tế với kết quả kỳ vọng khai trong `_book_sql_data.py`.

## Nguồn dữ liệu mẫu (đã chốt)

- **`sql/ecommerce_test_setup.sql`** = ⭐ **bản CHUẨN duy nhất** (single source of truth):
  chứa `ORD_005` + cột `deleted_at` (soft-delete) + `item_id` 8, 9. Nội dung sách
  (`_book_sql_data.py`, tham chiếu `ORD_005` 42 lần) và báo cáo verify đều dựa vào bản này.
  Mọi thay đổi dữ liệu mẫu → sửa file này rồi chạy lại `run_all_verification.py`.
- **`drafts/ecommerce_test_setup_nho-27dong.sql`** = bản nháp thu gọn (27 dòng, bỏ `ORD_005`),
  **KHÔNG dùng làm chuẩn**. Giữ lại chỉ để tham khảo các nhãn `Bug-A..Bug-M` (mô tả bug rõ ràng)
  khi rà soát nội dung. Bản này thiếu data cho câu 10/28/38/45/46/49 nên không khớp sách.

## 📌 Việc còn treo

- **Rà soát & chuẩn hoá nội dung sách** trước khi xuất bản (chưa làm). Khi rà, có thể mượn
  cách đặt nhãn `Bug-A..Bug-M` từ bản nháp để chú thích cho dễ hiểu, nhưng dữ liệu vẫn bám
  bản chuẩn ở `sql/ecommerce_test_setup.sql`.
- **Phát hành lên web** (chưa làm vội): khi nội dung đã chuẩn, copy `dist/*.pdf` và
  `sql/ecommerce_test_setup.sql` sang `public/books/` của web để cho tải về. Trong PDF có ghi
  đường dẫn `maiqai.com/books/ecommerce_test_setup.sql` — cần wire-up khi xuất bản.
