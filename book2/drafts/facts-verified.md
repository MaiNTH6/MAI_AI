# Facts nghiệp vụ ngân hàng — ĐÃ VERIFY (kèm nguồn)

> Dùng cho Sách #2. Chỉ ghi những gì đã tra cứu/đối chiếu. Mục nào còn nghi → đánh dấu "CẦN VERIFY THÊM".

## 1. Core banking & mô hình dữ liệu (T24)
- **Temenos T24/Transact** lưu dữ liệu theo mô hình **MultiValue (jBASE)** — bản ghi là **mảng động (dynamic array)**, một trường có thể chứa nhiều giá trị; **KHÔNG phải bảng quan hệ chuẩn hoá**. `SELECT * FROM Transactions` kiểu SQL không chạy trực tiếp như trên RDBMS.
- T24 **có thể chạy trên nền jBASE, Oracle, hoặc SQL Server** (có tài liệu Microsoft "T24 optimized on SQL Server"), nhưng **mô hình dữ liệu vẫn là MultiValue** dù nền lưu là gì.
- Vì khó truy vấn/tích hợp báo cáo (phải "normalize" dữ liệu multi-value), ngân hàng thường dựng **DB báo cáo/replica dạng quan hệ** → **đây là nơi tester dùng SQL**, không phải query thẳng core.
- Hàm ý cho sách: sách dạy SQL trên **mô hình quan hệ rút gọn** (mô phỏng lớp báo cáo/replica) — đúng thứ tester thực sự đụng.
- CẦN VERIFY THÊM: thuật ngữ chi tiết T24 (record @ID, local reference fields, application VERSION); nền DB của Finacle (Infosys) & Oracle FLEXCUBE (đều gắn Oracle — xác nhận lại trước khi khẳng định).

## 2. Phân loại nhóm nợ — Thông tư 11/2021/TT-NHNN, Điều 10 (định lượng)
- **Nhóm 1 — Đủ tiêu chuẩn:** trong hạn hoặc **quá hạn < 10 ngày**.
- **Nhóm 2 — Cần chú ý:** **quá hạn 10–90 ngày**.
- **Nhóm 3 — Dưới tiêu chuẩn:** **quá hạn 91–180 ngày**.
- **Nhóm 4 — Nghi ngờ:** **quá hạn 181–360 ngày**.
- **Nhóm 5 — Có khả năng mất vốn:** **quá hạn > 360 ngày**.
- **Nợ xấu (NPL)** = nhóm 3, 4, 5 (quá hạn ≥ 90 ngày).
- (Ngoài định lượng còn có phương pháp định tính + quy tắc cơ cấu nợ nhiều lần → nhóm cao hơn; nêu ở mức khái niệm.)

## 3. Báo cáo giao dịch giá trị lớn (AML) — QĐ 11/2023/QĐ-TTg
- Ngưỡng **giao dịch giá trị lớn phải báo cáo NHNN = 400.000.000 VND trở lên**, hiệu lực **từ 01/12/2023** (trước đó 300 triệu theo QĐ 20/2013).
- Thời hạn báo cáo: trong 1 ngày làm việc (báo cáo điện tử) / 2 ngày làm việc (giấy).
- Áp dụng cho tổ chức tài chính + đối tượng theo Luật Phòng, chống rửa tiền.

## 4. Tính lãi (để viết mục kiểm tra lãi) — quy ước
- Lãi tiền gửi thường theo **day-count Actual/365** (một số sản phẩm/hợp đồng khác nhau) — số tiền lãi ≈ số dư × lãi suất năm × số ngày / 365.
- CẦN VERIFY THÊM: quy ước ghép lãi (compounding) theo từng sản phẩm; ngày tính lãi (value date). Sẽ nêu công thức chuẩn + lưu ý "tùy sản phẩm/hợp đồng".

## Nguồn
- T24 / MultiValue: [International Spectrum](https://www.intl-spectrum.com/product/66/Temenos-T24-T24.aspx), [Microsoft: T24 on SQL Server (PDF)](https://download.microsoft.com/download/b/2/3/b23e0b02-aa00-4921-8a76-b4384b6197dd/sql-temenos-t24.pdf), [IBM Redpaper HA/DR for T24 (PDF)](https://www.redbooks.ibm.com/redpapers/pdfs/redp4794.pdf)
- Nhóm nợ: [Thông tư 11/2021/TT-NHNN — LuatVietnam](https://luatvietnam.vn/tai-chinh/thong-tu-11-2021-tt-nhnn-ngan-hang-nha-nuoc-viet-nam-206806-d1.html), [Chinhphu.vn](https://chinhphu.vn/default.aspx?pageid=27160&docid=203811)
- AML 400 triệu: [Quyết định 11/2023/QĐ-TTg — LuatVietnam](https://luatvietnam.vn/tai-chinh/quyet-dinh-11-2023-qd-ttg-muc-giao-dich-gia-tri-lon-phai-bao-cao-251149-d1.html), [Cổng TTĐT Chính phủ](https://xaydungchinhsach.chinhphu.vn/quy-dinh-moi-giao-dich-tu-400000000-dong-tro-len-phai-bao-cao-nhnn-119230429113524107.htm)
