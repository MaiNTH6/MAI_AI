# Quy ước format Sách #2 — ĐÃ CHỐT qua 6 vòng duyệt (2026-07-11)

> Khuôn mẫu = mục "Đối soát tổng dư nợ giữa DWH và nguồn" trong `_book2_data.py`.
> MỌI MỤC MỚI phải theo đúng các quy ước dưới đây. Generator: `gen-book2.py`.

## Khuôn 1 mục nghiệp vụ (thứ tự khối)

1. **Header** — số thứ tự (ô xanh) + tiêu đề.
2. **YÊU CẦU CÔNG VIỆC** (hộp xanh dương, field `task`)
   - Tình huống THẬT có bối cảnh: thời điểm (vd sáng đầu tháng sau EOD), ai phát hiện/ai giao,
     deadline, và **giao phẩm cụ thể đánh số** (vd 3 việc: xác nhận lệch → lệch ở đâu → khoanh vùng khâu lỗi).
   - Kèm ràng buộc nghiệp vụ tạo áp lực (vd "báo cáo chỉ phát hành khi số đã khớp").
3. **NGHIỆP VỤ CẦN BIẾT** (hộp tím, field `domain`) — 3 tầng, xuống dòng `<br/>`, bullet `•`:
   - (a) **Khái niệm là gì** + ví dụ số cụ thể (vay 600tr, trả 100tr → dư nợ 500tr);
   - (b) **VÌ SAO phải chạy kiểm tra này** — hậu quả nếu sai (báo cáo NHNN, trích lập dự phòng, quyết định trên BI);
     nêu cả vị trí trong thực tế (vd "phép khám nhanh chạy ĐẦU TIÊN dù trong quy trình là bước cuối");
   - (c) **Vì sao lỗi xảy ra dù job 'Success'** — cơ chế kỹ thuật (vd INNER JOIN thiếu khóa → loại âm thầm).
4. **Dữ liệu liên quan** (field `data_note`) — bảng nguồn/đích/chiều + lỗi cài sẵn trong data mẫu.
5. **CÂU LỆNH SQL** (field `sql`) — khối code tối; nhiều câu thì đánh số `-- (1)`, `-- (2)` kèm chú thích vai trò.
6. **PHÂN TÍCH TỪNG MỆNH ĐỀ SQL** — nhãn cố định:
   `PHÂN TÍCH TỪNG MỆNH ĐỀ SQL (theo thứ tự MySQL thực thi — FROM chạy trước SELECT)`
   - **Nhiều câu → dùng `clause_groups`**: MỖI CÂU MỘT BẢNG riêng; tiêu đề đậm nêu vai trò
     VÀ quan hệ giữa các câu (vd "Câu (2) — ... (chỉ chạy khi câu 1 cho thấy lệch)").
   - Trong mỗi bảng: **mở bằng nguồn dữ liệu (FROM)**; UNION chia "Khối 1/2", EXCEPT chia "Vế trên/Vế dưới"
     (kế thừa quy ước Cụm/Khối của sách 1).
   - Mỗi mệnh đề giải thích kèm **ví dụ số truy được từ data mẫu**
     (vd SUM = 500tr + 300tr + ... = 4.250.000.000).
   - Biểu thức SELECT ghi chú "viết ở đầu câu nhưng chạy ở bước SELECT".
   - Nêu cạm bẫy cú pháp ngay tại mệnh đề (EXCEPT so toàn bộ cột / so theo vị trí cột).
7. **Kết quả sau khi query (minh họa)** — **`result_groups`: MỖI CÂU MỘT BẢNG kết quả có nhãn riêng**
   ("Kết quả câu (1) — ...", "Kết quả câu (2) — ..."). Số liệu LẤY TỪ LẦN CHẠY VERIFY THẬT.
8. **Phân tích kết quả** (field `result_note`, render thành mục riêng sau các bảng):
   đọc lần lượt "Đọc câu (1): ...", "Đọc câu (2): ..." → **đối chiếu chéo** hai kết quả khớp nhau
   (450tr + 250tr = đúng 700tr lệch) → "Kết luận:" đủ thông tin báo dev.
9. **GÓC SOI LỖI CỦA TESTER** (hộp xanh lá, field `note`) — cạm bẫy + hành động; không lặp ý các khối trên.
10. **TRÊN ORACLE / SQL SERVER** (hộp vàng cam):
    - `dialect_table` = bảng 3 cột **Hệ quản trị | Từ khóa | Ghi chú** (từ khóa dạng `("mono", "...")`,
      header màu `#b45309`);
    - `dialect_note` = câu dẫn ngắn;
    - `dialect_code` = **khối code NHIỀU DÒNG** (không viết 1 dòng dài), từ khóa thẳng cột, có comment,
      liệt kê cột rõ ràng (không `SELECT *`) cho nhất quán với câu chính.

## Fields của 1 entry trong `_book2_data.py`
`task · domain · data_note · sql · clause_groups (hoặc clauses) · result_groups (hoặc result_table) · result_note · note · dialect_table · dialect_note · dialect_code`

## Quy ước chung (mọi phần)
- **Verify mọi con số trên MySQL thật** (db `banking_dwh_test`, client `/c/Program Files/MySQL/MySQL Server 9.7/bin/mysql.exe -u root`) trước khi ghi vào sách.
- **Không emoji / ký tự đặc biệt** trong PDF: ①②✗✓➜ đều ra ô vuông với font Liberation → dùng (1), (2), →, chữ thường.
- **Trung tính**: không tên ngân hàng cụ thể; tên vendor chỉ ở Phần 0; data 100% hư cấu.
- Tiền format chấm ngăn nghìn (4.250.000.000), có thể viết tắt tr/tỷ trong lời giải thích.
- Phần 0: **nghiệp vụ trước, kỹ thuật sau**; sơ đồ + bảng "giải thích chủ thể" gộp 1 trang;
  Phần dữ liệu = ER 2 tầng + hộp "cách lưu" + **Script tạo Database kiểu sách 1**
  (link tải `maiqai.com/books/banking_dwh_setup.sql` + hướng dẫn Workbench + hộp PHIÊN BẢN MYSQL)
  + TỪ ĐIỂN DỮ LIỆU (bảng Trường | Kiểu | Ý nghĩa cho từng bảng).
- Build: `cd book2/scripts && python gen-book2.py` → `book2/dist/sql-data-tester-ngan-hang-MAU.pdf`.
  Sau mỗi lần build: check tofu (`□`/`�`) + render trang mới sửa ra PNG soi mắt.
