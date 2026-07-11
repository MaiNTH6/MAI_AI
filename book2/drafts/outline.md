# Dàn ý chi tiết — Sách #2 (v4): "SQL cho Data Tester Ngân hàng"

> Trạng thái: **BẢN NHÁP v4 — chờ user duyệt.** Đã TRUNG TÍNH HOÁ (không nêu ngân hàng cụ thể).
> Dialect: MySQL chính + hộp khác biệt Oracle/SQL Server. Data test tự tạo. Tái dùng layout engine sách 1.

## ⚠️ Nguyên tắc BẢO MẬT & BẢN QUYỀN (bắt buộc, xuyên suốt)
- **KHÔNG nêu tên ngân hàng cụ thể** nào; dùng tên hệ thống theo **chức năng chung**
  (core banking, hệ quản lý thẻ, hệ khởi tạo khoản vay/LOS, CRM, DWH, công cụ BI).
  Tên sản phẩm vendor (Temenos T24, Finacle, FLEXCUBE, OpenWay) chỉ nhắc **1 lần ở Phần 0**
  như kiến thức ngành phổ biến, KHÔNG gắn với bất kỳ ngân hàng nào.
- **Dữ liệu 100% hư cấu**, tự sinh — không lấy từ hệ thống/ngân hàng thật, không PII thật.
- **Nội dung 100% tự viết** bằng lời của mình; tài liệu tham khảo chỉ để hiểu vấn đề, không sao chép.
- Chỉ dùng **thông tin công khai** (văn bản pháp luật NHNN, khái niệm ngành) — có verify nguồn.
- Sách in kèm **trang tuyên bố**: dữ liệu minh họa là hư cấu; không đại diện cho tổ chức nào.

## Định vị
Sách cho **Data Tester ngân hàng**: kiểm thử **luồng dữ liệu ETL** từ các hệ nguồn (core banking,
hệ thẻ, hệ khởi tạo vay, CRM) → Staging → **DWH / Data Mart** → **báo cáo BI** & chấm điểm tín dụng.
Với mỗi việc thật → dạy **nghiệp vụ cần biết** + **SQL để kiểm chứng/đối soát dữ liệu**.
(Khác sách 1: sách 1 = săn bug trong 1 DB; sách 2 = kiểm thử DÒNG CHẢY dữ liệu qua nhiều tầng.)

## Khung mỗi mục
Yêu cầu công việc → Nghiệp vụ cần biết → Dữ liệu liên quan → Câu lệnh SQL → Đọc kết quả → Góc soi lỗi.

## Bộ dữ liệu mẫu (tự tạo, MySQL, HƯ CẤU) — mô phỏng 2 tầng
- **Tầng nguồn (mô phỏng Core/OLTP):** `src_customers`, `src_accounts`, `src_transactions`, `src_cards`, `src_loans`…
- **Tầng đích (mô phỏng DWH/OLAP):** `dwh_*` (đã transform) + `staging_*`.
→ Minh họa đối soát Source ↔ Target, kiểm tra transform, incremental load. Cài sẵn vài lỗi ETL cố ý.

---

## PHẦN 0 — Bức tranh hệ thống dữ liệu ngân hàng
0.1 Các hệ nguồn theo chức năng: core banking, hệ quản lý thẻ, hệ khởi tạo vay (LOS), CRM — vs DWH/Data Lake/Data Mart vs BI. Data Tester đứng ở đâu.
0.2 **OLTP vs OLAP**: nguồn (giao dịch) vs đích (phân tích) của ETL.
0.3 Luồng ETL/ELT tổng quát: Extract → Staging → Transform → Load → Report.
0.4 Mô hình lưu trữ hệ core: nhiều hệ core (ví dụ phổ biến trong ngành: Temenos T24) dùng **MultiValue** (không phải bảng quan hệ thuần) → vì sao tester làm việc ở **tầng DWH/replica quan hệ** (nơi SQL áp dụng).
0.5 EOD & "thời điểm dữ liệu"; SLA (vd ETL xong trước giờ báo cáo đầu ngày).
0.6 Bản đồ khái niệm → schema mẫu (src_* / staging_* / dwh_*).

## PHẦN 1 — Nền tảng ETL Testing
1.1 ETL Testing là gì + quy trình 5 bước (tổng quan).
1.2 Schema validation theo Source-to-Target Mapping (datatype/length/PK/FK khớp đặc tả).
1.3 Kiểm tra Extract: Staging có đủ dữ liệu từ nguồn không (row count nguồn ↔ staging).
1.4 Kiểm tra Load — Initial vs **Incremental (CDC / Last_Updated_Date)**: chỉ bản ghi đổi mới được nạp.
1.5 Bắt bản ghi bị bỏ rơi / nạp thừa giữa các tầng.

## PHẦN 2 — Đối soát dữ liệu (Reconciliation) quy mô lớn
2.1 Đối soát Row Count nguồn ↔ đích.
2.2 Đối soát Aggregate: SUM/AVG/MIN/MAX các trường tiền (số dư, dư nợ, doanh số).
2.3 Lấy dòng lệch bằng **EXCEPT/MINUS** — ⚠ dialect: Oracle=MINUS; SQL Server/PostgreSQL/MySQL 8.0.31+ = EXCEPT; MySQL cũ → LEFT JOIN/NOT EXISTS/hash.
2.4 Checksum/hash toàn dòng để so nhanh triệu bản ghi.
2.5 Từ dòng lệch → lấy khóa (customer_id/CIF) để điều tra Extract hay Transform sai.

## PHẦN 3 — Data Quality (5 chiều) + kiểm tra Transform
3.1 **Completeness**: trường bắt buộc không NULL/rỗng (CCCD, SĐT hồ sơ).
3.2 **Accuracy**: số dư/dư nợ khớp thực tế & công thức.
3.3 **Consistency**: cùng chỉ tiêu giữa các hệ khớp nhau (nhóm nợ core = CRM = xét duyệt).
3.4 **Uniqueness**: 1 khách = 1 CIF; không CIF trùng/khách trùng.
3.5 **Timeliness**: dữ liệu cập nhật đúng hạn (đối chiếu Last_Updated_Date vs SLA EOD).
3.6 Verify business rule ở Transform: SQL độc lập tính lại (vd nhóm nợ) rồi so cột DWH.

## PHẦN 4 — Các luồng nghiệp vụ lõi + SQL kiểm thử
4.1 **Tiền gửi (CASA & Term Deposit)**: lãi dồn tích ngày (số dư × ls/365), tất toán trước hạn → lãi KKH, đáo hạn tự động (roll-over).
4.2 **Tín dụng & phân nhóm nợ**: DPD → nhóm 1–5 (VERIFY: <10 / 10–90 / 91–180 / 181–360 / >360 ngày), cơ chế "nhảy nhóm nợ" theo dữ liệu CIC.
4.3 **Thẻ & thanh toán**: đối soát chéo hệ thẻ ↔ core, Hạn mức khả dụng = Hạn mức cấp − Dư nợ − Giao dịch pending, phí & điểm thưởng.
4.4 **Customer 360 / CDP**: dedup → golden CIF (chung SĐT/CCCD), đồng bộ thông tin liên lạc kịp thời.
4.5 **Báo cáo tuân thủ NHNN**: khớp 100% biểu mẫu (Thông tư 11/2021 …), gán đúng mã ngành kinh tế.

## PHẦN 5 — Tình huống điều tra & đối soát cuối
5.1 Case: tổng dư nợ trên BI lệch số gốc dù ETL "Success" → điều tra ngược BI→DWH→Transform→Staging.
5.2 Bẫy kinh điển: **INNER JOIN thay LEFT JOIN** làm mất dòng khi thiếu bản ghi tra cứu.
5.3 Bẫy tầng BI: filter/slicer, công thức tính sai, cache/gateway chưa refresh.
5.4 Bộ kiểm tra toàn vẹn tổng hợp trước khi "ký" số liệu.

## PHỤ LỤC (gọn)
- A · Cheat sheet cú pháp đối soát/ETL (COUNT/SUM, EXCEPT/MINUS/NOT EXISTS, hash) + khác biệt dialect.
- B · Giải thích thuật ngữ (ETL, DWH, Data Mart, CDC, DPD, CIF, OLTP/OLAP…).

---

## Đã chốt
- Reframe v3/v4: trục ETL/DWH testing. ✔
- Trung tính hoá: KHÔNG nêu ngân hàng cụ thể; bảo mật dữ liệu + bản quyền. ✔
- Qui mô: ~30 mục chính + 2 phụ lục gọn.
- Dialect: MySQL + hộp khác biệt Oracle/SQL Server. Data test tự tạo.

## Ghi chú nguồn
Tài liệu tham khảo (ref-vpbank-datatester.md) CHỈ dùng nội bộ để hiểu công việc — KHÔNG trích nguyên văn,
KHÔNG đưa tên ngân hàng/sản phẩm riêng vào sách. Diễn đạt lại 100% bằng lời mình.

## Đã VERIFY / CẦN VERIFY THÊM → xem facts-verified.md
Nhóm nợ, AML 400tr, core=MultiValue = đã verify. Cần verify thêm: Thông tư 22, chuẩn Basel,
mã ngành kinh tế, cơ chế CIC nhảy nhóm — trước khi viết các mục liên quan.
