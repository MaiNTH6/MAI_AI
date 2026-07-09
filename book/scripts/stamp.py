# -*- coding: utf-8 -*-
"""
Đóng dấu (watermark) tên + email người mua vào CHÂN MỖI TRANG của sách PDF.
Mỗi bản xuất ra là DUY NHẤT cho một người mua → răn đe + truy vết nếu bị phát tán.
KHÔNG khoá copy chữ (người mua vẫn copy được câu lệnh SQL).

CÁCH DÙNG (khuyên dùng — chống lỗi tiếng Việt trên Windows):
  1. Mở file  book/scripts/don.txt  bằng Notepad.
  2. Mỗi đơn một dòng, theo mẫu:   Họ Tên | email@khach.com | Đơn #123
     (phần "| Đơn #123" không bắt buộc)
  3. Lưu file (giữ mã hoá UTF-8), rồi chạy:   python stamp.py
  → Mỗi đơn ra một file trong  book/dist/ban-giao/

Cách khác (chỉ dùng nếu terminal hỗ trợ UTF-8, vd Windows Terminal):
  python stamp.py "Họ Tên" "email@khach.com" "Đơn #123"
"""
import io, os, re, sys, unicodedata, datetime
import fitz  # PyMuPDF

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

HERE = os.path.dirname(os.path.abspath(__file__))
BASE_PDF = os.path.join(HERE, "..", "dist", "cam-nang-50-cau-lenh-sql-san-bug.pdf")
OUT_DIR  = os.path.join(HERE, "..", "dist", "ban-giao")
FONT     = os.path.join(HERE, "fonts", "LiberationSans-Regular.ttf")
DON_TXT  = os.path.join(HERE, "don.txt")
MM = 2.834645669  # 1mm = 2.834645669 pt


def khong_dau(s: str) -> str:
    """Bỏ dấu tiếng Việt + gọn thành slug cho tên file."""
    s = s.replace("đ", "d").replace("Đ", "D")
    s = unicodedata.normalize("NFD", s)
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = re.sub(r"[^A-Za-z0-9]+", "-", s).strip("-")
    return s or "khach"


def stamp(ten: str, email: str, ghi_chu: str = "") -> str:
    if not os.path.exists(BASE_PDF):
        sys.exit(f"Không thấy file gốc: {BASE_PDF}\n→ chạy gen-book-sql.py để build sách trước.")

    ngay = datetime.date.today().strftime("%d/%m/%Y")
    phan_duoi = ghi_chu.strip() or f"mua ngày {ngay}"
    dau = f"Bản quyền cấp cho: {ten}  ·  {email}  ·  {phan_duoi}"

    # PyMuPDF đóng chữ thẳng lên chân mỗi trang, tự nhúng font riêng
    # (không đụng font của sách nên không mất glyph tiếng Việt).
    doc = fitz.open(BASE_PDF)
    for page in doc:
        y = page.rect.height - 3.3 * MM  # fitz: gốc toạ độ ở TRÊN, y tăng xuống dưới
        page.insert_text((18 * MM, y), dau, fontsize=7,
                         fontname="LibSans", fontfile=FONT,
                         color=(0.42, 0.45, 0.52))

    os.makedirs(OUT_DIR, exist_ok=True)
    out = os.path.join(OUT_DIR, f"sach-{khong_dau(ten)}.pdf")
    doc.save(out, garbage=4, deflate=True)
    doc.close()
    return out


def doc_don_txt(path: str):
    """Đọc danh sách đơn từ file UTF-8: mỗi dòng 'Tên | email | ghi chú'."""
    don = []
    with open(path, encoding="utf-8-sig") as f:
        for raw in f:
            line = raw.strip()
            if not line or line.startswith("#"):
                continue
            phan = [p.strip() for p in line.split("|")]
            if len(phan) < 2 or not phan[0] or not phan[1]:
                print(f"  ⚠ Bỏ qua dòng sai định dạng: {line}")
                continue
            don.append((phan[0], phan[1], phan[2] if len(phan) > 2 else ""))
    return don


def main():
    if len(sys.argv) >= 3:
        # Chế độ tham số (chỉ nên dùng khi terminal hỗ trợ UTF-8)
        ghi_chu = sys.argv[3] if len(sys.argv) > 3 else ""
        print("Đã tạo:", stamp(sys.argv[1], sys.argv[2], ghi_chu))
        return

    if not os.path.exists(DON_TXT):
        sys.exit(f"Chưa có file đơn: {DON_TXT}\n→ tạo file don.txt, mỗi dòng: Tên | email | ghi chú")

    don = doc_don_txt(DON_TXT)
    if not don:
        sys.exit("don.txt chưa có đơn nào hợp lệ.")
    print(f"Đang đóng dấu {len(don)} đơn...")
    for ten, email, ghi_chu in don:
        out = stamp(ten, email, ghi_chu)
        print("  ✓", os.path.basename(out))
    print(f"Xong. File nằm ở: {os.path.abspath(OUT_DIR)}")


if __name__ == "__main__":
    main()
