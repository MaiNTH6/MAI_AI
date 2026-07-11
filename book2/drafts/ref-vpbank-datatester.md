# Nguồn tham khảo (user cung cấp) — Bộ câu hỏi phỏng vấn Data Tester VPBank

> User cung cấp 2026-07-10. Mô tả CHÍNH XÁC công việc Data Tester ngân hàng → dùng để định hình Sách #2.
> ⚠️ Vài mốc số trong tài liệu này lệch nhẹ so với văn bản gốc (xem mục "Đính chính" cuối file) — sách dùng số ĐÃ VERIFY ở facts-verified.md.

## Đặc thù vị trí Data Tester (VPBank & khối ngân hàng)
Đảm bảo chất lượng luồng ETL/ELT từ Core Banking (T24, Way4…) vào DWH, Data Lake, Data Mart → báo cáo BI (Power BI/Tableau) & chấm điểm tín dụng (Credit Scoring).

## Chủ đề kỹ thuật cốt lõi
- **ETL Testing** & quy trình 5 bước: (1) Schema validation theo Source-to-Target Mapping; (2) Extract → Staging đủ dữ liệu; (3) Transform verify business rule bằng SQL độc lập (vd tính dư nợ lãi, phân nhóm nợ); (4) Load: Initial vs Incremental (CDC / Last_Updated_Date); (5) Reporting/DQ reconciliation (DWH ↔ Core, DWH ↔ BI).
- **Data Reconciliation quy mô lớn**: so Row Count + Aggregate (COUNT/SUM/AVG/MIN/MAX); dùng EXCEPT/MINUS lấy dòng lệch → 0 dòng = khớp; lấy key lệch để điều tra.
- **5 chiều Data Quality**: Completeness (CCCD/SĐT không NULL), Accuracy (số dư khớp thực tế), Consistency (nhóm nợ Core = CRM = xét duyệt), Uniqueness (1 khách = 1 CIF), Timeliness (ETL xong trước 6h sáng).
- **OLTP vs OLAP**: OLTP = Core (giao dịch, nguồn ETL); OLAP = DWH/Data Cube (phân tích, đích ETL).
- **Điều tra số liệu lệch** (vd tổng dư nợ Power BI lệch 5 tỷ so Core dù ETL "Success"): đi ngược Đích→Nguồn — (1) tầng BI: filter/slicer, công thức DAX; (2) DWH: SQL tổng so BI & Core, khoanh vùng lỗi ở ETL hay refresh; (3) Transform: job lọc bỏ bản ghi? INNER JOIN thay LEFT JOIN gây mất dòng?; (4) Staging: row count vs Core (data loss khi extract?).

## 5 luồng nghiệp vụ bắt buộc
1. **Tiền gửi & tài khoản (CASA + Term Deposit) — T24.** EOD tính lãi dồn tích (accrued) hàng ngày. Test: công thức lãi ngày = số dư × lãi suất năm / 365 (hoặc 360); tất toán trước hạn → hạ về lãi KKH; đáo hạn tự động (roll-over) cập nhật ngày đáo hạn & gốc mới.
2. **Tín dụng & phân nhóm nợ — LOS + T24.** LOS khởi tạo → T24 giải ngân → ETL phân nhóm nợ theo DPD phục vụ trích lập dự phòng & báo cáo CIC. Test: logic DPD→nhóm 1-5; **CIC off-site "nhảy nhóm nợ"** (khách nợ xấu nhóm 3 ở bank khác → VPBank phải nâng nhóm theo dữ liệu CIC).
3. **Thẻ & thanh toán — Way4 (OpenWay) + T24.** POS/ATM/online → Way4 cấp phép → EOD kết xuất sang T24 hạch toán → Data Mart Thẻ. Test: đối soát chéo Way4 ↔ T24 (số lượng + tổng tiền); công thức **Hạn mức khả dụng = Hạn mức cấp − Dư nợ hiện tại − Giao dịch pending**; phí thường niên/phí quốc tế/điểm thưởng.
4. **Customer 360 / CDP — Salesforce CRM + Core.** Gộp khách đa kênh → 1 Golden Customer Record. Test: dedup (chung SĐT/CCCD → gộp 1 CIF); đồng bộ kịp thời thay đổi email/SĐT/địa chỉ NEO → DWH → CRM.
5. **Báo cáo tuân thủ NHNN (SBV) — Regulatory Reporting.** DWH → biểu mẫu chuẩn (TT11, TT22, Basel II/III). Test: khớp 100% số liệu SQL thô vs biểu mẫu; gán đúng **mã ngành kinh tế** (lỗi hay do map sai).

## Hệ thống nhắc tới (grounding thật)
Core: **Temenos T24**. Thẻ: **Way4/OpenWay**. Khởi tạo vay: **LOS**. CRM: **Salesforce**. Kho: **DWH / Data Lake / Data Mart**. BI: **Power BI / Tableau**. Ngoài: **CIC** (Trung tâm Thông tin Tín dụng), **SBV/NHNN**. App: VPBank NEO.

## Đính chính so với văn bản gốc (sách dùng số VERIFY)
- Tài liệu ghi nhóm nợ: N3 90–179, N4 180–359, N5 ≥360. **Văn bản gốc TT 11/2021 Điều 10: N3 91–180, N4 181–360, N5 >360** (N2: 10–90). → Sách dùng số gốc, và chính "độ chính xác mốc ngày" là điểm giá trị sách chỉ ra.
