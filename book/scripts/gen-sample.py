# -*- coding: utf-8 -*-
"""
Sinh BẢN ĐỌC THỬ (lead magnet): "5 câu lệnh SQL săn Bug cho QA".
- Trích 5 câu từ cẩm nang 50 câu (Câu gốc 1, 3, 13, 20, 36) → đánh số lại 1–5.
- Tái dùng toàn bộ layout/font/helper của gen-book-sql.py (import động, không chép).
- Bìa "Bản đọc thử" + trang giới thiệu + 5 câu + trang CTA dẫn mua bản đầy đủ.
Chạy: python book/scripts/gen-sample.py
Xuất ra: book/dist/ban-doc-thu-5-cau-sql.pdf
"""
import os, importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))

# ── Import động module sách (tên file có dấu gạch ngang → dùng importlib) ──────
_spec = importlib.util.spec_from_file_location("genbook", os.path.join(HERE, "gen-book-sql.py"))
gb = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(gb)   # chạy top-level: đăng ký font, định nghĩa helper/style/màu

# Rút gọn tham chiếu tới các thứ trong module sách
mm = gb.mm; colors = gb.colors
PAGE_W, PAGE_H = gb.PAGE_W, gb.PAGE_H
LM, RM, TM, BM, CONTENT_W = gb.LM, gb.RM, gb.TM, gb.BM, gb.CONTENT_W
BLUE, NAVY, AMBER, GREEN = gb.BLUE, gb.NAVY, gb.AMBER, gb.GREEN
LBLUE, LAMBER, LGREEN, LGREY = gb.LBLUE, gb.LAMBER, gb.LGREEN, gb.LGREY
INK, GREY = gb.INK, gb.GREY
S = gb.S; pdfmetrics = gb.pdfmetrics
Paragraph = gb.Paragraph; Spacer = gb.Spacer; Table = gb.Table; TableStyle = gb.TableStyle
PageBreak = gb.PageBreak; KeepTogether = gb.KeepTogether; NextPageTemplate = gb.NextPageTemplate
Frame = gb.Frame; PageTemplate = gb.PageTemplate; BaseDocTemplate = gb.BaseDocTemplate
A4 = gb.A4
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY

# ── Cấu hình bản thử ──────────────────────────────────────────────────────────
PICK = [1, 3, 13, 20, 36]           # câu gốc được chọn (theo thứ tự trình bày)
PRICE_REGULAR = "199.000đ"          # giá gốc (khớp bìa sách đầy đủ)
PRICE_PROMO   = "99.000đ"           # ưu đãi mở bán
PROMO_LIMIT   = 100                  # số suất ưu đãi
FANPAGE_URL  = "https://www.facebook.com/profile.php?id=61591587400278"
FANPAGE_NAME = "Maiqai — Ứng dụng AI &amp; SQL cho QA"   # &amp; vì render trong Paragraph (XML)

# Ghi đè phần chữ có tham chiếu chéo tới câu KHÔNG có trong bản thử → viết độc lập
OVERRIDES = {
 1: {
   "explain":
     "<b>information_schema.columns</b> là bản đồ schema luôn cập nhật — không như "
     "tài liệu viết tay có thể đã lỗi thời từ lâu.<br/>DB ecommerce_test có 4 bảng "
     "(Customers, Order_Items, Orders, Products), mỗi bảng có 1 khóa chính. Orders "
     "nhiều cột nullable nhất (3/6) — gợi ý nhiều trường tùy chọn, đáng kiểm tra kỹ.<br/>"
     "Lưu ý: <b>table_name có thể trả về chữ thường</b> dù tên gốc viết hoa (tùy hệ điều "
     "hành server MySQL chạy) — luôn kiểm tra case thật trước khi lọc WHERE table_name = '...'.<br/>"
     "Chưa cần hiểu hết cú pháp SUM(CASE WHEN...) ở đây — tạm hiểu là 'đếm số dòng thỏa điều kiện'.",
   "note":
     "Khi thấy một bảng có quá nhiều cột nullable, hỏi dev: những cột đó có rule 'bắt buộc' "
     "nào ở tầng application không? Nếu có, kiểm tra tầng DB có enforce bằng NOT NULL không — "
     "nếu không, tầng application bỏ sót một lần là dữ liệu sai ghi vào ngay. Bước tiếp theo "
     "là soi cụ thể từng cột bắt buộc xem có bản ghi nào đang để trống.",
 },
 3: {
   "note":
     "Kết quả của câu này có thể thay đổi tùy cách database <b>so sánh chuỗi ký tự</b> "
     "(database gọi cài đặt này là <i>collation</i>). Kiểm tra nhanh: "
     "<font face='Mono' size='8.5'>SHOW CREATE TABLE Customers;</font><br/><br/>"
     "(1) <b>Vấn đề hoa/thường</b>: Database thường chạy theo một trong hai chế độ:<br/>"
     "• <b>Không phân biệt hoa/thường</b> (mặc định MySQL 8.0, tên kỹ thuật "
     "<i>utf8mb4_0900_ai_ci</i>) → 'A.NGUYEN@EMAIL.COM' và 'a.nguyen@email.com' được coi là "
     "<b>một</b>, câu này phát hiện được ngay.<br/>"
     "• <b>Phân biệt hoa/thường</b> (tên kỹ thuật <i>utf8mb4_bin</i>) → hai email trên bị coi "
     "là <b>khác nhau</b>, câu này sẽ BỎ SÓT → cần hạ cả hai vế về cùng kiểu chữ bằng "
     "<b>LOWER(email)</b> trước khi gom nhóm.<br/><br/>"
     "(2) <b>Vấn đề khoảng trắng thừa</b>: '  test@mail.com' (có dấu cách ở đầu) và "
     "'test@mail.com' bị coi là hai email khác nhau dù trông giống nhau → câu này bỏ sót → "
     "cần <b>TRIM(email)</b> để cắt khoảng trắng trước khi so sánh.",
 },
 13: {
   "explain":
     "Kỹ thuật <b>JOIN + GROUP BY + HAVING</b> để đối soát header-detail: total_amount trong "
     "Orders phải bằng SUM(quantity × price) từ Order_Items.<br/>Kết quả phát hiện "
     "<b>ba nguyên nhân khác nhau</b>:<br/>"
     "(1) ORD_001 lệch vì item bị nhân đôi (item 1 và item 7 cùng order + product).<br/>"
     "(2) ORD_002 lệch vì total_amount bị ghi sai thủ công (Bug-B).<br/>"
     "(3) ORD_005 lệch vì là đơn đã xóa mềm nhưng item chưa dọn, vẫn lọt vào đối soát.<br/>"
     "Cùng triệu chứng nhưng cách xử lý khác nhau — cần tra log để phân biệt.",
   "result_note":
     "3 đơn lệch: ORD_001 do item trùng (62M vs 32M); ORD_002 do total_amount ghi sai "
     "(31M vs 20M); ORD_005 đã bị xóa mềm nhưng vẫn tham gia đối soát — minh họa lỗi rò rỉ "
     "dữ liệu đã xóa mềm (soft-delete leak).",
 },
}

by = {e["id"]: e for e in gb.ENTRIES}

# ─────────────────────────────────────────────────────────────────────────────
# Bìa bản đọc thử (vẽ bằng canvas)
# ─────────────────────────────────────────────────────────────────────────────
def cover_sample(canv, doc):
    canv.saveState()
    canv.setFillColor(colors.HexColor("#0f172a"))
    canv.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    # dot-grid
    canv.setFillColor(colors.HexColor("#1e293b"))
    for gx in range(0, int(PAGE_W / mm) + 2, 10):
        for gy in range(0, int(PAGE_H / mm) + 2, 10):
            canv.circle(gx * mm, gy * mm, 0.55 * mm, fill=1, stroke=0)
    # accent stripe
    canv.setFillColor(BLUE); canv.rect(0, 0, 3.5 * mm, PAGE_H, fill=1, stroke=0)
    X = LM + 5 * mm

    # eyebrow
    canv.setFillColor(colors.HexColor("#60a5fa")); canv.setFont("Arial-Bold", 11)
    canv.drawString(X, PAGE_H - 30 * mm, "MAIQAI.COM  ·  BẢN ĐỌC THỬ MIỄN PHÍ")
    # title
    canv.setFillColor(colors.white); canv.setFont("Arial-Bold", 42)
    canv.drawString(X, PAGE_H - 53 * mm, "5 CÂU LỆNH SQL")
    canv.setFillColor(AMBER); canv.setFont("Arial-Bold", 25)
    canv.drawString(X, PAGE_H - 71 * mm, "SĂN BUG CHO QA")
    # tagline
    canv.setFillColor(colors.HexColor("#94a3b8")); canv.setFont("Arial", 12)
    canv.drawString(X, PAGE_H - 85 * mm, "Trích từ cẩm nang 50 câu  ·  Dialect MySQL")

    # ── code window ──
    BX = X; BW = CONTENT_W - 5 * mm; BT = PAGE_H - 100 * mm; BH = 62 * mm
    canv.setFillColor(colors.HexColor("#1e293b"))
    canv.roundRect(BX, BT - BH, BW, BH, 4 * mm, fill=1, stroke=0)
    canv.setStrokeColor(colors.HexColor("#334155")); canv.setLineWidth(0.8)
    canv.roundRect(BX, BT - BH, BW, BH, 4 * mm, fill=0, stroke=1)
    canv.setFillColor(colors.HexColor("#334155"))
    canv.roundRect(BX, BT - 8.5 * mm, BW, 8.5 * mm, 4 * mm, fill=1, stroke=0)
    canv.rect(BX, BT - 8.5 * mm, BW, 4 * mm, fill=1, stroke=0)
    dx = BX + 8 * mm
    for dc in ["#ef4444", "#f59e0b", "#10b981"]:
        canv.setFillColor(colors.HexColor(dc))
        canv.circle(dx, BT - 4.2 * mm, 2.1 * mm, fill=1, stroke=0); dx += 5.2 * mm
    canv.setFillColor(colors.HexColor("#94a3b8")); canv.setFont("Mono", 7.8)
    canv.drawCentredString(BX + BW / 2, BT - 6 * mm, "doi_soat_don_hang.sql")
    code_lines = [
        ("-- Bug tiền: tổng đơn ≠ tổng chi tiết items", "#64748b"),
        ("SELECT o.order_id, o.total_amount,",          "#e2e8f0"),
        ("       SUM(i.quantity * i.price) AS tinh_lai", "#e2e8f0"),
        ("FROM   Orders o",                              "#93c5fd"),
        ("JOIN   Order_Items i ON o.order_id=i.order_id","#93c5fd"),
        ("GROUP  BY o.order_id, o.total_amount",         "#e2e8f0"),
        ("HAVING SUM(i.quantity*i.price) != o.total_amount;", "#fbbf24"),
        ("",                                             ""),
        ("-- 3 đơn lệch → nghi bug tính tiền",          "#10b981"),
    ]
    cy = BT - 16 * mm
    for line, col in code_lines:
        if line:
            canv.setFillColor(colors.HexColor(col)); canv.setFont("Mono", 8.3)
            canv.drawString(BX + 7 * mm, cy, line)
        cy -= 5.6 * mm

    # ── badges ──
    BDG_T = PAGE_H - 176 * mm; BDG_H = 23 * mm
    badges = [("5", "Câu trong bản thử"), ("50", "Câu ở bản đầy đủ"), ("MySQL", "Dialect")]
    BDG_W = (CONTENT_W - 5 * mm - 2 * 4 * mm) / 3
    bx = X
    for num, lbl in badges:
        canv.setFillColor(colors.HexColor("#1e3a8a"))
        canv.roundRect(bx, BDG_T - BDG_H, BDG_W, BDG_H, 3 * mm, fill=1, stroke=0)
        canv.setStrokeColor(BLUE); canv.setLineWidth(0.6)
        canv.roundRect(bx, BDG_T - BDG_H, BDG_W, BDG_H, 3 * mm, fill=0, stroke=1)
        canv.setFillColor(AMBER); canv.setFont("Arial-Bold", 17)
        nw = pdfmetrics.stringWidth(num, "Arial-Bold", 17)
        canv.drawString(bx + (BDG_W - nw) / 2, BDG_T - 10 * mm, num)
        canv.setFillColor(colors.HexColor("#94a3b8")); canv.setFont("Arial", 7.5)
        lw = pdfmetrics.stringWidth(lbl, "Arial", 7.5)
        canv.drawString(bx + (BDG_W - lw) / 2, BDG_T - 18.5 * mm, lbl)
        bx += BDG_W + 4 * mm

    # ── description line ──
    canv.setStrokeColor(colors.HexColor("#334155")); canv.setLineWidth(0.6)
    canv.line(X, PAGE_H - 205 * mm, PAGE_W - RM, PAGE_H - 205 * mm)
    canv.setFillColor(colors.HexColor("#cbd5e1")); canv.setFont("Arial", 9.5)
    canv.drawString(X, PAGE_H - 213 * mm,
                    "Mỗi câu: tình huống bug — SQL copy được — phân tích — kết quả — góc soi lỗi.")

    # ── footer bar ──
    canv.setFillColor(colors.HexColor("#1e293b")); canv.rect(0, 0, PAGE_W, 21 * mm, fill=1, stroke=0)
    canv.setFillColor(BLUE); canv.rect(0, 20.5 * mm, PAGE_W, 0.8 * mm, fill=1, stroke=0)
    canv.setFillColor(colors.HexColor("#94a3b8")); canv.setFont("Arial", 9)
    canv.drawString(X, 13 * mm, "Bản đọc thử miễn phí  ·  maiqai.com")
    canv.setFillColor(AMBER); canv.setFont("Arial-Bold", 9)
    canv.drawRightString(PAGE_W - RM, 13 * mm, "Bản đầy đủ: 50 câu")
    canv.restoreState()

# ─────────────────────────────────────────────────────────────────────────────
# Render 1 câu (đánh số lại) — sao theo khối entry của gen-book-sql.py
# ─────────────────────────────────────────────────────────────────────────────
def render_entry(new_id, e):
    ov = OVERRIDES.get(e["id"], {})
    def F(k, default=""):
        return ov.get(k, e.get(k, default))

    blocks = []
    num = Table([[
        Paragraph(f"{new_id:02d}", S("num", fontName="Arial-Bold", fontSize=17,
                  textColor=colors.white, alignment=TA_CENTER)),
        Paragraph(e["title"], gb.st_entry),
    ]], colWidths=[13*mm, CONTENT_W-13*mm])
    num.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (0,0), BLUE),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
        ("TOPPADDING", (0,0), (-1,-1), 6),
        ("BOTTOMPADDING", (0,0), (-1,-1), 6),
        ("LEFTPADDING", (1,0), (1,0), 10),
        ("BACKGROUND", (1,0), (1,0), LBLUE),
    ]))
    blocks.append(num)
    blocks.append(Spacer(1, 6))
    blocks.append(gb.color_box("TÌNH HUỐNG", F("situation"),
                  LAMBER, AMBER, colors.HexColor("#b45309")))
    if e.get("before_cols"):
        blocks.append(Spacer(1, 6))
        blocks.append(Paragraph(
            e.get("before_label", "Dữ liệu trong bảng trước khi query:"),
            S("blbl", parent=gb.st_label, textColor=colors.HexColor("#1e3a5f"))))
        blocks.append(gb.before_tbl(
            e["before_cols"], e["before_rows"], e.get("before_bugs", []),
            col_widths=e.get("before_col_widths")))
    blocks.append(Spacer(1, 6))
    blocks.append(Paragraph("CÂU LỆNH SQL",
        S("lbl_sql", parent=gb.st_label, keepWithNext=True)))
    blocks.append(gb.code_box(e["sql"]))
    if e.get("clauses"):
        blocks.append(Spacer(1, 5))
        blocks.append(Paragraph(
            "PHÂN TÍCH TỪNG MỆNH ĐỀ SQL  "
            "<font color='#64748b' size='8'>(theo thứ tự MySQL thực thi — FROM chạy trước SELECT)</font>",
            S("clbl", parent=gb.st_label, textColor=BLUE, keepWithNext=True)))
        blocks.append(gb.clause_tbl(e["clauses"]))
    blocks.append(Spacer(1, 6))
    blocks.append(Paragraph("Giải thích tổng thể",
        S("gt", parent=gb.st_label, textColor=NAVY)))
    blocks.append(Paragraph(F("explain"), gb.st_body))
    if e.get("explain_table"):
        blocks.append(Spacer(1, 4))
        blocks.append(gb.result_table(*e["explain_table"]))
    blocks.append(Spacer(1, 4))
    blocks.append(Paragraph("Kết quả sau khi query (minh họa)",
        S("kq", parent=gb.st_label, textColor=NAVY, keepWithNext=True)))
    if e.get("result_table"):
        blocks.append(gb.result_table(*e["result_table"]))
        blocks.append(Spacer(1, 3))
    if F("result_note"):
        blocks.append(Paragraph(F("result_note"), gb.st_small))
    blocks.append(Spacer(1, 6))
    blocks.append(gb.color_box("GÓC SOI LỖI CỦA TESTER", F("note"),
                  LGREEN, GREEN, colors.HexColor("#047857")))
    blocks.append(Spacer(1, 14))
    return blocks

# ─────────────────────────────────────────────────────────────────────────────
# Build
# ─────────────────────────────────────────────────────────────────────────────
def build():
    out_dir = os.path.join(HERE, "..", "dist")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.abspath(os.path.join(out_dir, "ban-doc-thu-5-cau-sql.pdf"))

    doc = BaseDocTemplate(out_path, pagesize=A4,
        leftMargin=LM, rightMargin=RM, topMargin=TM, bottomMargin=BM,
        title="Bản đọc thử — 5 câu lệnh SQL săn Bug cho QA",
        author="maiqai.com", subject="SQL cho QA / Kiểm thử")
    frame = Frame(LM, BM, CONTENT_W, PAGE_H-TM-BM, id="main")
    doc.addPageTemplates([
        PageTemplate(id="cover", frames=[frame], onPage=cover_sample),
        PageTemplate(id="body", frames=[frame], onPage=lambda c, d: gb._footer(c, d, show_header=False)),
    ])

    story = []
    story.append(NextPageTemplate("body"))
    story.append(PageBreak())

    # ── Trang giới thiệu ──
    story.append(Paragraph("Bản đọc thử này là gì?", gb.st_h1))
    story.append(gb.HRule(CONTENT_W, BLUE, 1.5))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "Đây là 5 câu chọn lọc, trích nguyên vẹn từ cuốn <b>“Cẩm nang 50 câu lệnh SQL săn Bug "
        "thực chiến cho QA”</b>. Mục tiêu không phải dạy SQL từ đầu, mà cho bạn thấy ngay một "
        "cách làm việc: người kiểm thử tự đi vào database và tìm ra những lỗi mà giao diện "
        "không phơi bày. Mỗi câu trình bày theo cùng một khuôn để tra cứu nhanh:", gb.st_lead))
    story.append(Spacer(1, 4))
    for t in [
        "<b>Tình huống</b> — vì sao QA cần đến câu lệnh này.",
        "<b>Dữ liệu trước query</b> — bảng mẫu; dòng tô đỏ là dòng lỗi hoặc trọng tâm.",
        "<b>Câu lệnh SQL</b> — copy chạy được ngay, dialect MySQL.",
        "<b>Phân tích từng mệnh đề</b> + <b>Giải thích tổng thể</b> — hiểu vì sao nó bắt được bug.",
        "<b>Kết quả sau query</b> và <b>Góc soi lỗi của Tester</b> — cạm bẫy và bước tiếp theo.",
    ]:
        story.append(gb.li(t))
    story.append(Spacer(1, 6))
    story.append(gb.color_box("CHẠY THỬ ĐƯỢC NGAY",
        "Muốn tự tay chạy 5 câu này, tải file dựng sẵn database ecommerce_test (4 bảng, có "
        "cài sẵn lỗi để thực hành) rồi chạy một lần trong MySQL Workbench: "
        "<a href='https://maiqai.com/books/ecommerce_test_setup.sql' color='#1a56db'>"
        "maiqai.com/books/ecommerce_test_setup.sql</a>",
        LBLUE, BLUE, BLUE))
    story.append(Spacer(1, 6))
    story.append(gb.color_box("NGUYÊN TẮC XUYÊN SUỐT",
        "Săn bug bằng SQL thực chất là đi tìm những điều LẼ RA LUÔN ĐÚNG nhưng dữ liệu lại nói "
        "ngược lại: tồn kho không thể âm, tổng dòng con phải bằng header, email phải là duy nhất. "
        "Với mỗi bất biến đó, bạn viết một câu lệnh tìm các bản ghi VI PHẠM. 5 câu dưới đây là "
        "5 ví dụ của đúng một tư duy đó.",
        LGREEN, GREEN, colors.HexColor("#047857")))

    # ── 5 câu ──
    story.append(PageBreak())
    for new_id, gid in enumerate(PICK, start=1):
        blocks = render_entry(new_id, by[gid])
        story.append(KeepTogether(blocks[:4]))   # giữ header+tình huống+bảng cùng trang
        story.extend(blocks[4:])

    # ── Trang CTA ──
    story.append(PageBreak())
    story.append(Paragraph("Bạn vừa xem 5 trong 50 câu", gb.st_h1))
    story.append(gb.HRule(CONTENT_W, BLUE, 1.5))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "Nếu 5 câu này giúp được bạn, bản đầy đủ còn đi xa hơn nhiều — không chỉ nhiều câu hơn, "
        "mà là một bộ công cụ hoàn chỉnh để soi dữ liệu như một người điều tra:", gb.st_lead))
    story.append(Spacer(1, 4))
    for t in [
        "<b>Đủ 50 câu lệnh</b> chia 6 nhóm chủ đề — từ toàn vẹn dữ liệu đến đối soát tài chính.",
        "<b>Phần nâng cao</b>: window function, CTE, UNION — giải các bài kiểm thử khó.",
        "<b>Phần Audit &amp; dấu vết dữ liệu</b>: truy vết đơn xóa mềm, trạng thái mâu thuẫn, ID nhảy cóc.",
        "<b>19 bug cài sẵn</b> trong database mẫu để bạn tự tay thực hành phát hiện.",
        "<b>Bài tập tự luyện + đáp án</b>, <b>Case study</b> “một ngày điều tra dữ liệu của QA”.",
        "<b>Chương chạy SQL an toàn trên production</b> và 3 phụ lục tra cứu nhanh.",
    ]:
        story.append(gb.li(t))
    story.append(Spacer(1, 8))

    cta_inner = [
        Paragraph(
            f"ƯU ĐÃI MỞ BÁN — CHỈ {PROMO_LIMIT} SUẤT ĐẦU TIÊN",
            S("ctabadge", fontName="Arial-Bold", fontSize=9.5,
              textColor=colors.HexColor("#b45309"), spaceAfter=5)),
        Paragraph("Nhận bản đầy đủ 50 câu",
            S("ctah", fontName="Arial-Bold", fontSize=14, textColor=NAVY, spaceAfter=4)),
        Paragraph(
            f"Giá gốc <strike>{PRICE_REGULAR}</strike> &nbsp;→&nbsp; "
            f"<font color='#b45309' size='13'><b>chỉ {PRICE_PROMO}</b></font> "
            f"cho {PROMO_LIMIT} bạn đầu tiên. Mua một lần — trọn đời, cập nhật miễn phí các phiên bản sau.",
            S("ctap", parent=gb.st_box, fontSize=10.5, spaceAfter=6)),
        Paragraph(
            f"Cách nhận: nhắn tin Fanpage "
            f"<a href='{FANPAGE_URL}' color='#1a56db'><b>{FANPAGE_NAME}</b></a> — "
            "inbox “Mình muốn mua sách SQL” để nhận hướng dẫn thanh toán và bản PDF đầy đủ.",
            gb.st_box),
    ]
    cta = Table([[cta_inner]], colWidths=[CONTENT_W])
    cta.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), LAMBER),
        ("BOX", (0,0), (-1,-1), 1.2, AMBER),
        ("LINEBEFORE", (0,0), (0,-1), 4, AMBER),
        ("LEFTPADDING", (0,0), (-1,-1), 14),
        ("RIGHTPADDING", (0,0), (-1,-1), 14),
        ("TOPPADDING", (0,0), (-1,-1), 12),
        ("BOTTOMPADDING", (0,0), (-1,-1), 12),
    ]))
    story.append(cta)
    story.append(Spacer(1, 12))
    story.append(Paragraph("Biên soạn bởi maiqai.com — Ứng dụng AI &amp; SQL cho QA",
        S("end", parent=gb.st_small, alignment=TA_CENTER)))

    doc.build(story)
    return out_path

if __name__ == "__main__":
    print("Done:", build())
