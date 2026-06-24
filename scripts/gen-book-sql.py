# -*- coding: utf-8 -*-
"""
Sinh ebook PDF: "Cẩm nang 50 câu lệnh SQL săn Bug thực chiến cho QA"
- Font Arial + Consolas (hỗ trợ tiếng Việt đầy đủ)
- Bìa, mục lục, 6 chương, 50 câu lệnh chi tiết
Chạy: python scripts/gen-book-sql.py
Xuất ra: public/books/cam-nang-50-cau-lenh-sql-san-bug.pdf
"""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
    PageBreak, Preformatted, NextPageTemplate, KeepTogether, Flowable,
)

# ----------------------------------------------------------------------------
# Fonts
# ----------------------------------------------------------------------------
FD = "C:/Windows/Fonts"
pdfmetrics.registerFont(TTFont("Arial", f"{FD}/arial.ttf"))
pdfmetrics.registerFont(TTFont("Arial-Bold", f"{FD}/arialbd.ttf"))
pdfmetrics.registerFont(TTFont("Arial-Italic", f"{FD}/ariali.ttf"))
pdfmetrics.registerFont(TTFont("Arial-BoldItalic", f"{FD}/arialbi.ttf"))
pdfmetrics.registerFont(TTFont("Mono", f"{FD}/consola.ttf"))
pdfmetrics.registerFont(TTFont("Mono-Bold", f"{FD}/consolab.ttf"))
from reportlab.pdfbase.pdfmetrics import registerFontFamily
registerFontFamily("Arial", normal="Arial", bold="Arial-Bold",
                   italic="Arial-Italic", boldItalic="Arial-BoldItalic")

# ----------------------------------------------------------------------------
# Colors
# ----------------------------------------------------------------------------
NAVY   = colors.HexColor("#1e293b")
BLUE   = colors.HexColor("#2563eb")
LBLUE  = colors.HexColor("#eff6ff")
INK    = colors.HexColor("#0f172a")
GREY   = colors.HexColor("#475569")
LGREY  = colors.HexColor("#f1f5f9")
AMBER  = colors.HexColor("#f59e0b")
LAMBER = colors.HexColor("#fff7ed")
GREEN  = colors.HexColor("#10b981")
LGREEN = colors.HexColor("#ecfdf5")
RED    = colors.HexColor("#dc2626")
CODEBG = colors.HexColor("#0f172a")
CODEFG = colors.HexColor("#e2e8f0")

# ----------------------------------------------------------------------------
# Styles
# ----------------------------------------------------------------------------
styles = getSampleStyleSheet()

def S(name, **kw):
    base = kw.pop("parent", styles["Normal"])
    return ParagraphStyle(name, parent=base, **kw)

st_body = S("body", fontName="Arial", fontSize=10.2, leading=15.5,
            textColor=INK, alignment=TA_JUSTIFY, spaceAfter=4)
st_lead = S("lead", fontName="Arial", fontSize=10.8, leading=17,
            textColor=GREY, alignment=TA_JUSTIFY, spaceAfter=6)
st_h1 = S("h1", fontName="Arial-Bold", fontSize=20, leading=24,
          textColor=NAVY, spaceBefore=4, spaceAfter=8)
st_part = S("part", fontName="Arial-Bold", fontSize=24, leading=28,
            textColor=colors.white)
st_entry = S("entry", fontName="Arial-Bold", fontSize=14, leading=18,
             textColor=NAVY, spaceBefore=2, spaceAfter=2)
st_label = S("label", fontName="Arial-Bold", fontSize=9.5, leading=13,
             textColor=GREY, spaceAfter=2)
st_box = S("box", fontName="Arial", fontSize=9.8, leading=14.5,
           textColor=INK, alignment=TA_LEFT)
st_box_b = S("boxb", parent=st_box, fontName="Arial-Bold")
st_code = S("code", fontName="Mono", fontSize=8.6, leading=12.4,
            textColor=CODEFG)
st_small = S("small", fontName="Arial", fontSize=8.5, leading=12,
             textColor=GREY)
st_cell = S("cell", fontName="Arial", fontSize=8.6, leading=11.5, textColor=INK)
st_cellh = S("cellh", parent=st_cell, fontName="Arial-Bold", textColor=colors.white)
st_toc = S("toc", fontName="Arial", fontSize=9.6, leading=15, textColor=INK)
st_toc_b = S("tocb", parent=st_toc, fontName="Arial-Bold", textColor=NAVY,
             spaceBefore=6)

# ----------------------------------------------------------------------------
# Helper flowables
# ----------------------------------------------------------------------------
class HRule(Flowable):
    def __init__(self, w, color=colors.HexColor("#e2e8f0"), thick=0.8):
        super().__init__(); self.w=w; self.color=color; self.thick=thick
    def wrap(self, *a): return (self.w, self.thick+2)
    def draw(self):
        self.canv.setStrokeColor(self.color); self.canv.setLineWidth(self.thick)
        self.canv.line(0, 1, self.w, 1)

def color_box(label, text, bg, border, label_color):
    """Khối box màu có nhãn (Tình huống / Góc soi lỗi...)."""
    inner = []
    if label:
        inner.append(Paragraph(label, S("bl", fontName="Arial-Bold",
                     fontSize=9, leading=12, textColor=label_color, spaceAfter=3)))
    if isinstance(text, list):
        inner += text
    else:
        inner.append(Paragraph(text, st_box))
    t = Table([[inner]], colWidths=[CONTENT_W])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), bg),
        ("BOX", (0,0), (-1,-1), 0.8, border),
        ("LINEBEFORE", (0,0), (0,-1), 3, border),
        ("LEFTPADDING", (0,0), (-1,-1), 9),
        ("RIGHTPADDING", (0,0), (-1,-1), 9),
        ("TOPPADDING", (0,0), (-1,-1), 7),
        ("BOTTOMPADDING", (0,0), (-1,-1), 7),
    ]))
    return t

def code_box(sql):
    p = Preformatted(sql, st_code)
    t = Table([[p]], colWidths=[CONTENT_W])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), CODEBG),
        ("LEFTPADDING", (0,0), (-1,-1), 11),
        ("RIGHTPADDING", (0,0), (-1,-1), 11),
        ("TOPPADDING", (0,0), (-1,-1), 9),
        ("BOTTOMPADDING", (0,0), (-1,-1), 9),
        ("ROUNDEDCORNERS", [4,4,4,4]),
    ]))
    return t

def result_table(headers, rows):
    data = [[Paragraph(h, st_cellh) for h in headers]]
    for r in rows:
        data.append([Paragraph(str(c), st_cell) for c in r])
    ncol = len(headers)
    cw = CONTENT_W / ncol
    t = Table(data, colWidths=[cw]*ncol, repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,0), NAVY),
        ("ROWBACKGROUNDS", (0,1), (-1,-1), [colors.white, LGREY]),
        ("GRID", (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
        ("LEFTPADDING", (0,0), (-1,-1), 6),
        ("RIGHTPADDING", (0,0), (-1,-1), 6),
        ("TOPPADDING", (0,0), (-1,-1), 4),
        ("BOTTOMPADDING", (0,0), (-1,-1), 4),
    ]))
    return t

def before_tbl(cols, rows, bugs=None, col_widths=None):
    """Bảng dữ liệu 'trước khi query' với dòng bug highlight đỏ nhạt."""
    bugs = set(bugs or [])
    data = [[Paragraph(h, st_cellh) for h in cols]]
    for r in rows:
        data.append([Paragraph(str(c), st_cell) for c in r])
    ncol = len(cols)
    cw = col_widths if col_widths else [CONTENT_W / ncol] * ncol
    t = Table(data, colWidths=cw, repeatRows=1)
    cmds = [
        ("BACKGROUND", (0,0), (-1,0), colors.HexColor("#334155")),
        ("ROWBACKGROUNDS", (0,1), (-1,-1), [colors.white, LGREY]),
        ("GRID", (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
        ("LEFTPADDING", (0,0), (-1,-1), 6),
        ("RIGHTPADDING", (0,0), (-1,-1), 6),
        ("TOPPADDING", (0,0), (-1,-1), 3),
        ("BOTTOMPADDING", (0,0), (-1,-1), 3),
    ]
    for i in bugs:
        r = i + 1
        cmds += [
            ("BACKGROUND", (0,r), (-1,r), colors.HexColor("#fff1f1")),
            ("TEXTCOLOR", (0,r), (-1,r), RED),
            ("FONTNAME", (0,r), (-1,r), "Arial-Bold"),
        ]
    t.setStyle(TableStyle(cmds))
    return t

def clause_tbl(clauses):
    """Bảng phân tích từng mệnh đề SQL: cột trái code, cột phải giải thích."""
    data = []
    for code, expl in clauses:
        data.append([
            Preformatted(code, S("cs", parent=st_code, fontSize=7.8, leading=11)),
            Paragraph(expl, S("ce", parent=st_box, fontSize=9.2, leading=13.5)),
        ])
    cw1 = CONTENT_W * 0.44
    cw2 = CONTENT_W * 0.56
    t = Table(data, colWidths=[cw1, cw2])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (0,-1), CODEBG),
        ("BACKGROUND", (1,0), (1,-1), LGREY),
        ("GRID", (0,0), (-1,-1), 0.5, colors.HexColor("#475569")),
        ("VALIGN", (0,0), (-1,-1), "TOP"),
        ("LEFTPADDING", (0,0), (-1,-1), 8),
        ("RIGHTPADDING", (0,0), (-1,-1), 8),
        ("TOPPADDING", (0,0), (-1,-1), 5),
        ("BOTTOMPADDING", (0,0), (-1,-1), 5),
        ("LINEBEFORE", (1,0), (1,-1), 0, colors.white),
    ]))
    return t

def schema_diagram():
    """Sơ đồ 4 bảng ecommerce_test dạng card grid."""
    def card(name, rows_data, header_bg=NAVY):
        inner = [[Paragraph(name, S("cn", fontName="Arial-Bold", fontSize=10,
                                    textColor=colors.white))]]
        for col, tag in rows_data:
            if tag == "PK":
                p = Paragraph(f'<font color="#f59e0b"><b>PK</b></font>  {col}',
                              S("crc", parent=st_cell, fontSize=8.5))
            elif tag == "FK":
                p = Paragraph(f'<font color="#10b981"><b>FK</b></font>  {col}',
                              S("crc", parent=st_cell, fontSize=8.5))
            else:
                p = Paragraph(f'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{col}',
                              S("crc", parent=st_cell, fontSize=8.5))
            inner.append([p])
        cw = CONTENT_W / 2 - 6*mm
        t = Table(inner, colWidths=[cw])
        t.setStyle(TableStyle([
            ("BACKGROUND", (0,0), (-1,0), header_bg),
            ("BACKGROUND", (0,1), (-1,-1), LBLUE),
            ("BOX", (0,0), (-1,-1), 1, BLUE),
            ("LINEBELOW", (0,0), (-1,0), 1, BLUE),
            ("LEFTPADDING", (0,0), (-1,-1), 8),
            ("RIGHTPADDING", (0,0), (-1,-1), 8),
            ("TOPPADDING", (0,0), (-1,-1), 3),
            ("BOTTOMPADDING", (0,0), (-1,-1), 3),
        ]))
        return t

    c_card = card("Customers", [
        ("customer_id", "PK"), ("customer_name",""), ("email",""),
        ("membership_tier",""), ("status",""),
    ])
    p_card = card("Products", [
        ("product_id","PK"), ("product_name",""), ("category",""),
        ("price",""), ("stock",""),
    ])
    o_card = card("Orders", [
        ("order_id","PK"), ("customer_id","FK"), ("total_amount",""),
        ("status",""), ("order_date",""),
    ])
    oi_card = card("Order_Items", [
        ("item_id","PK"), ("order_id","FK"), ("product_id","FK"),
        ("quantity",""), ("price",""),
    ])

    arrow = Paragraph("Customers 1 : N  Orders  |  Orders 1 : N  Order_Items  |  Products 1 : N  Order_Items",
                      S("arr", fontName="Arial-Italic", fontSize=8.5, textColor=GREY,
                        alignment=TA_CENTER))

    grid = Table([[c_card, p_card], [o_card, oi_card]],
                 colWidths=[CONTENT_W/2 - 2*mm, CONTENT_W/2 - 2*mm],
                 rowHeights=None)
    grid.setStyle(TableStyle([
        ("VALIGN", (0,0), (-1,-1), "TOP"),
        ("LEFTPADDING", (0,0), (-1,-1), 3),
        ("RIGHTPADDING", (0,0), (-1,-1), 3),
        ("TOPPADDING", (0,0), (-1,-1), 4),
        ("BOTTOMPADDING", (0,0), (-1,-1), 4),
    ]))
    return [grid, Spacer(1,6), arrow]

# ----------------------------------------------------------------------------
# Page geometry
# ----------------------------------------------------------------------------
PAGE_W, PAGE_H = A4
LM = RM = 18*mm
TM = 20*mm
BM = 18*mm
CONTENT_W = PAGE_W - LM - RM

BOOK_TITLE = "CẨM NANG 50 CÂU LỆNH SQL SĂN BUG"

from _book_sql_data import PARTS, ENTRIES, SETUP_SQL

# ----------------------------------------------------------------------------
# Page decorations (header / footer)
# ----------------------------------------------------------------------------
def _footer(canv, doc, show_header=True):
    canv.saveState()
    # Footer
    canv.setStrokeColor(colors.HexColor("#e2e8f0"))
    canv.setLineWidth(0.6)
    canv.line(LM, 12*mm, PAGE_W-RM, 12*mm)
    canv.setFont("Arial", 8)
    canv.setFillColor(GREY)
    canv.drawString(LM, 8*mm, "MAI.tools — Ứng dụng AI vào Kiểm thử")
    canv.drawRightString(PAGE_W-RM, 8*mm, "Trang %d" % doc.page)
    if show_header:
        canv.setFont("Arial", 9)
        canv.setFillColor(colors.HexColor("#94a3b8"))
        canv.drawString(LM, PAGE_H-13*mm, "Cẩm nang 50 câu lệnh SQL săn Bug thực chiến cho QA")
        canv.setStrokeColor(colors.HexColor("#eef2f7"))
        canv.line(LM, PAGE_H-15*mm, PAGE_W-RM, PAGE_H-15*mm)
    canv.restoreState()

def cover_page(canv, doc):
    canv.saveState()

    # ── Full dark background ──────────────────────────────────────────────────
    canv.setFillColor(colors.HexColor("#0f172a"))
    canv.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)

    # ── Subtle dot-grid texture ───────────────────────────────────────────────
    canv.setFillColor(colors.HexColor("#1e293b"))
    for gx in range(0, int(PAGE_W / mm) + 2, 10):
        for gy in range(0, int(PAGE_H / mm) + 2, 10):
            canv.circle(gx * mm, gy * mm, 0.55 * mm, fill=1, stroke=0)

    # ── Left accent stripe ────────────────────────────────────────────────────
    canv.setFillColor(BLUE)
    canv.rect(0, 0, 3.5 * mm, PAGE_H, fill=1, stroke=0)

    X = LM + 5 * mm  # text left edge (after stripe)

    # ── Top header band ───────────────────────────────────────────────────────
    canv.setFillColor(colors.HexColor("#172554"))
    canv.rect(0, PAGE_H - 88 * mm, PAGE_W, 88 * mm, fill=1, stroke=0)
    canv.setFillColor(BLUE)
    canv.rect(0, PAGE_H - 90 * mm, PAGE_W, 2 * mm, fill=1, stroke=0)

    # Eyebrow
    canv.setFillColor(colors.HexColor("#60a5fa"))
    canv.setFont("Arial-Bold", 11)
    canv.drawString(X, PAGE_H - 22 * mm, "MAI.TOOLS  ·  CẨM NANG QA / TESTER")

    # Main title
    canv.setFillColor(colors.white)
    canv.setFont("Arial-Bold", 40)
    canv.drawString(X, PAGE_H - 45 * mm, "50 CÂU LỆNH SQL")
    canv.setFillColor(AMBER)
    canv.setFont("Arial-Bold", 26)
    canv.drawString(X, PAGE_H - 63 * mm, "SĂN BUG THỰC CHIẾN")

    # Tagline
    canv.setFillColor(colors.HexColor("#94a3b8"))
    canv.setFont("Arial", 12)
    canv.drawString(X, PAGE_H - 77 * mm, "Dành cho QA · Tester · Dev  —  Dialect MySQL")

    # ── Code-editor window ────────────────────────────────────────────────────
    BX = X
    BW = CONTENT_W - 5 * mm
    BT = PAGE_H - 100 * mm   # top y of box
    BH = 74 * mm

    # Window body
    canv.setFillColor(colors.HexColor("#1e293b"))
    canv.roundRect(BX, BT - BH, BW, BH, 4 * mm, fill=1, stroke=0)
    canv.setStrokeColor(colors.HexColor("#334155"))
    canv.setLineWidth(0.8)
    canv.roundRect(BX, BT - BH, BW, BH, 4 * mm, fill=0, stroke=1)

    # Title bar
    canv.setFillColor(colors.HexColor("#334155"))
    canv.roundRect(BX, BT - 8.5 * mm, BW, 8.5 * mm, 4 * mm, fill=1, stroke=0)
    canv.rect(BX, BT - 8.5 * mm, BW, 4 * mm, fill=1, stroke=0)

    # Traffic-light dots
    dx = BX + 8 * mm
    for dc in ["#ef4444", "#f59e0b", "#10b981"]:
        canv.setFillColor(colors.HexColor(dc))
        canv.circle(dx, BT - 4.2 * mm, 2.1 * mm, fill=1, stroke=0)
        dx += 5.2 * mm

    # Filename
    canv.setFillColor(colors.HexColor("#94a3b8"))
    canv.setFont("Mono", 7.8)
    canv.drawCentredString(BX + BW / 2, BT - 6 * mm, "ecommerce_test.sql")

    # SQL syntax-highlighted lines
    code_lines = [
        ("-- Tìm bug: email bị trùng (Bug 3)",   "#64748b"),
        ("SELECT email, COUNT(*) AS so_lan",      "#e2e8f0"),
        ("FROM   Customers",                       "#93c5fd"),
        ("GROUP  BY email",                        "#e2e8f0"),
        ("HAVING COUNT(*) > 1",                   "#fbbf24"),
        ("ORDER  BY so_lan DESC;",                "#e2e8f0"),
        ("",                                       ""),
        ("-- Kết quả phát hiện:",                 "#10b981"),
        ("trung_email@email.com  |  2",           "#f59e0b"),
    ]
    cy = BT - 18 * mm
    for line, col in code_lines:
        if line:
            canv.setFillColor(colors.HexColor(col))
            canv.setFont("Mono", 8.5)
            canv.drawString(BX + 7 * mm, cy, line)
        cy -= 6.2 * mm

    # ── Feature badges ────────────────────────────────────────────────────────
    BDG_T = PAGE_H - 184 * mm
    BDG_H = 23 * mm
    badges = [
        ("50",    "Câu lệnh SQL"),
        ("6",     "Nhóm chủ đề"),
        ("3",     "Bug cài sẵn"),
        ("MySQL", "Dialect"),
    ]
    BDG_W = (CONTENT_W - 5 * mm - 3 * 4 * mm) / 4
    bx = X
    for num, lbl in badges:
        canv.setFillColor(colors.HexColor("#1e3a8a"))
        canv.roundRect(bx, BDG_T - BDG_H, BDG_W, BDG_H, 3 * mm, fill=1, stroke=0)
        canv.setStrokeColor(BLUE)
        canv.setLineWidth(0.6)
        canv.roundRect(bx, BDG_T - BDG_H, BDG_W, BDG_H, 3 * mm, fill=0, stroke=1)
        # Number
        canv.setFillColor(AMBER)
        canv.setFont("Arial-Bold", 17)
        nw = pdfmetrics.stringWidth(num, "Arial-Bold", 17)
        canv.drawString(bx + (BDG_W - nw) / 2, BDG_T - 10 * mm, num)
        # Label
        canv.setFillColor(colors.HexColor("#94a3b8"))
        canv.setFont("Arial", 7.5)
        lw = pdfmetrics.stringWidth(lbl, "Arial", 7.5)
        canv.drawString(bx + (BDG_W - lw) / 2, BDG_T - 18.5 * mm, lbl)
        bx += BDG_W + 4 * mm

    # ── Description bullets ───────────────────────────────────────────────────
    canv.setStrokeColor(colors.HexColor("#334155"))
    canv.setLineWidth(0.6)
    canv.line(X, PAGE_H - 213 * mm, PAGE_W - RM, PAGE_H - 213 * mm)

    bullets = [
        "Mỗi câu lệnh: tình huống bug thật — SQL — phân tích mệnh đề — kết quả — góc soi lỗi",
        "Chương 0: script tạo DB, sơ đồ ER, dữ liệu mẫu với 3 bug cố ý cài cắm để thực hành",
    ]
    dy = PAGE_H - 221 * mm
    for b in bullets:
        canv.setFillColor(BLUE)
        canv.circle(X, dy + 1.8 * mm, 1.3 * mm, fill=1, stroke=0)
        canv.setFillColor(colors.HexColor("#cbd5e1"))
        canv.setFont("Arial", 9.5)
        canv.drawString(X + 4.5 * mm, dy, b)
        dy -= 7 * mm

    # ── Footer bar ────────────────────────────────────────────────────────────
    canv.setFillColor(colors.HexColor("#1e293b"))
    canv.rect(0, 0, PAGE_W, 21 * mm, fill=1, stroke=0)
    canv.setFillColor(BLUE)
    canv.rect(0, 20.5 * mm, PAGE_W, 0.8 * mm, fill=1, stroke=0)

    canv.setFillColor(colors.HexColor("#94a3b8"))
    canv.setFont("Arial", 9)
    canv.drawString(X, 13 * mm, "Phiên bản 1.0  ·  Phát hành bởi maiqai.com")
    canv.setFillColor(AMBER)
    canv.setFont("Arial-Bold", 9)
    canv.drawRightString(PAGE_W - RM, 13 * mm, "Giá: 199.000đ")

    canv.restoreState()

# ----------------------------------------------------------------------------
# Build the story
# ----------------------------------------------------------------------------
def li(text):
    return Paragraph("•&nbsp;&nbsp;" + text, S("li", parent=st_body, leftIndent=10,
                     spaceAfter=3))

def build():
    out_dir = os.path.join(os.path.dirname(__file__), "..", "public", "books")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.abspath(os.path.join(out_dir,
               "cam-nang-50-cau-lenh-sql-san-bug.pdf"))

    doc = BaseDocTemplate(out_path, pagesize=A4,
        leftMargin=LM, rightMargin=RM, topMargin=TM, bottomMargin=BM,
        title="Cẩm nang 50 câu lệnh SQL săn Bug thực chiến cho QA",
        author="MAI.tools", subject="SQL cho QA / Kiểm thử")

    frame = Frame(LM, BM, CONTENT_W, PAGE_H-TM-BM, id="main")
    doc.addPageTemplates([
        PageTemplate(id="cover", frames=[frame], onPage=cover_page),
        PageTemplate(id="body", frames=[frame], onPage=_footer),
    ])

    story = []
    # ---- Cover (drawn by onPage) ----
    story.append(NextPageTemplate("body"))
    story.append(PageBreak())

    # ---- Intro: cách dùng cuốn cẩm nang ----
    story.append(Paragraph("Cách dùng cuốn cẩm nang này", st_h1))
    story.append(HRule(CONTENT_W, BLUE, 1.5))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "Đây không phải tài liệu dạy SQL từ đầu. Nó là một bộ công cụ thực chiến: "
        "50 câu lệnh để một người làm kiểm thử có thể tự mình đi vào database và "
        "tìm ra những lỗi mà giao diện không phơi bày. Mỗi câu lệnh được trình bày "
        "theo cùng một khuôn để bạn tra cứu nhanh:", st_lead))
    story.append(Spacer(1, 4))
    for t in [
        "<b>Dữ liệu trước query</b> — bảng mẫu cho thấy trạng thái dữ liệu, dòng lỗi highlight đỏ.",
        "<b>Câu lệnh SQL</b> — sẵn sàng copy, viết theo dialect MySQL.",
        "<b>Phân tích từng mệnh đề</b> — mỗi từ khóa SQL được giải thích riêng.",
        "<b>Kết quả sau query</b> — bảng output sau khi chạy lệnh trên dữ liệu mẫu.",
        "<b>Góc soi lỗi của Tester</b> — cạm bẫy, hiểu lầm và bước tiếp theo.",
    ]:
        story.append(li(t))
    story.append(Spacer(1, 6))
    story.append(color_box("ĐỌC TRƯỚC KHI CHẠY",
        "Mọi câu lệnh trong sách đều là truy vấn ĐỌC (SELECT) — không sửa, không xóa "
        "dữ liệu. Dù vậy, hãy luôn chạy trên bản sao test/staging. Tên bảng/cột dùng "
        "schema ecommerce_test ở Chương 0 — đổi cho khớp schema thật của bạn.",
        LAMBER, AMBER, colors.HexColor("#b45309")))
    story.append(Spacer(1, 6))
    story.append(color_box("NGUYÊN TẮC XUYÊN SUỐT",
        "Săn bug bằng SQL thực chất là đi tìm những điều LẼ RA LUÔN ĐÚNG nhưng dữ "
        "liệu lại nói ngược lại: tồn kho không thể âm, tổng dòng con phải bằng header, "
        "email trong hệ thống phải là duy nhất. Với mỗi bất biến đó, bạn viết một câu "
        "lệnh tìm các bản ghi VI PHẠM. Cuốn sách này là 50 ví dụ của đúng một tư duy đó.",
        LGREEN, GREEN, colors.HexColor("#047857")))

    # ---- CHƯƠNG 0: Setup database ----
    story.append(PageBreak())
    story.append(Paragraph("Chương 0 — Chuẩn bị môi trường thực hành", st_h1))
    story.append(HRule(CONTENT_W, BLUE, 1.5))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "Tất cả 50 câu lệnh trong sách đều chạy được ngay trên cơ sở dữ liệu "
        "<b>ecommerce_test</b> dưới đây. Hệ thống mô phỏng một sàn thương mại điện "
        "tử nhỏ gồm 4 bảng, với <b>3 bug được cố ý cài cắm</b> để bạn thực hành phát hiện.",
        st_lead))
    story.append(Spacer(1, 8))

    # Schema diagram
    story.append(Paragraph("1.1  Sơ đồ quan hệ 4 bảng (Entity Relationship)",
        S("h2", parent=st_label, textColor=NAVY, fontSize=10.5, spaceBefore=4)))
    story.append(Spacer(1, 4))
    story.extend(schema_diagram())
    story.append(Spacer(1, 10))

    # Legend
    leg = Paragraph(
        '<font color="#f59e0b"><b>PK</b></font> = Primary Key (khóa chính)'
        '           '
        '<font color="#10b981"><b>FK</b></font> = Foreign Key (khóa ngoại, liên kết bảng khác)',
        S("leg", parent=st_small, alignment=TA_CENTER))
    story.append(leg)
    story.append(Spacer(1, 8))

    # Giải thích 4 bảng
    st_dh = S("dh", fontName="Arial-Bold", fontSize=8.5, leading=12, textColor=NAVY)
    st_dn = S("dn", fontName="Arial-Bold", fontSize=8.5, leading=12, textColor=INK)
    st_dd = S("dd", fontName="Arial",      fontSize=8.5, leading=12, textColor=INK)
    desc_data = [
        [Paragraph("Bảng", st_dh), Paragraph("Lưu gì", st_dh), Paragraph("Ví dụ trong sách", st_dh)],
        [
            Paragraph("Customers", st_dn),
            Paragraph("Danh sách khách hàng: họ tên, email, hạng thành viên (Standard / Silver / Gold), trạng thái tài khoản.", st_dd),
            Paragraph("C001 = Nguyen Van A, Silver, ACTIVE.", st_dd),
        ],
        [
            Paragraph("Products", st_dn),
            Paragraph("Danh mục sản phẩm: tên, danh mục, giá niêm yết, số lượng tồn kho.", st_dd),
            Paragraph("PROD_001 = iPhone 15 Pro Max, giá 30.000.000, tồn 50.", st_dd),
        ],
        [
            Paragraph("Orders", st_dn),
            Paragraph("Mỗi đơn hàng: ai đặt, trạng thái (PENDING / COMPLETED / CANCELLED), ngày đặt, và <b>total_amount</b> — tổng tiền toàn đơn. Giá trị này phải bằng SUM(price × quantity) của tất cả dòng Order_Items cùng order_id.", st_dd),
            Paragraph("ORD_001 của C001, tổng 32.000.000, COMPLETED.", st_dd),
        ],
        [
            Paragraph("Order_Items", st_dn),
            Paragraph("Chi tiết từng sản phẩm trong đơn — bảng nối Orders ↔ Products. Mỗi dòng = 1 sản phẩm: mua gì, số lượng, và <b>price</b> (giá 1 đơn vị lúc mua — lưu riêng vì giá sản phẩm có thể thay đổi sau).", st_dd),
            Paragraph("ORD_001 có 2 sản phẩm → 2 dòng cùng order_id = ORD_001.", st_dd),
        ],
    ]
    CW = CONTENT_W
    desc_tbl = Table(desc_data, colWidths=[72, CW*0.47, CW*0.385], repeatRows=1)
    desc_tbl.setStyle(TableStyle([
        ("BACKGROUND",    (0, 0), (-1,  0), colors.HexColor("#eef2f7")),
        ("BACKGROUND",    (0, 2), (-1,  2), colors.HexColor("#f8fafc")),
        ("BACKGROUND",    (0, 4), (-1,  4), colors.HexColor("#f8fafc")),
        ("BOX",           (0, 0), (-1, -1), 0.5, colors.HexColor("#cbd5e1")),
        ("INNERGRID",     (0, 0), (-1, -1), 0.4, colors.HexColor("#e2e8f0")),
        ("VALIGN",        (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING",    (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LEFTPADDING",   (0, 0), (-1, -1), 6),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 6),
    ]))
    story.append(desc_tbl)
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "⚠️  <b>Lưu ý:</b> <b>total_amount</b> (Orders) và <b>price</b> (Order_Items) là hai cột khác nhau. "
        "total_amount = tổng cả đơn; price = giá 1 đơn vị. "
        "Nếu hai con số này không khớp là có bug — ví dụ: "
        "ORD_002 ghi total_amount = 20.000.000 nhưng "
        "SUM(price × quantity) trong Order_Items = 31.000.000 → lệch 11.000.000 (Bug 1 trong data mẫu).",
        S("bug1note", parent=st_small, textColor=colors.HexColor("#92400e"),
          backColor=colors.HexColor("#fffbeb"), borderPadding=(5,6,5,6))))
    story.append(Spacer(1, 10))

    # Setup SQL — download link thay vì nhúng code
    story.append(Paragraph("1.2  Script tạo Database và bơm dữ liệu mẫu",
        S("h2", parent=st_label, textColor=NAVY, fontSize=10.5, spaceBefore=4)))
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        "Thay vì copy-paste thủ công, hãy tải file SQL sẵn có và chạy một lần duy nhất "
        "— database <b>ecommerce_test</b> cùng toàn bộ dữ liệu mẫu sẽ được tạo tự động.",
        st_body))
    story.append(Spacer(1, 8))
    dl_data = [[Paragraph(
        "<b>Tải file:</b>  maiqai.com/books/ecommerce_test_setup.sql",
        S("normal", fontName="Arial", fontSize=10, textColor=colors.HexColor("#1a56db")))]]
    dl_tbl = Table(dl_data, colWidths=[CONTENT_W])
    dl_tbl.setStyle(TableStyle([
        ("BACKGROUND",   (0,0),(-1,-1), colors.HexColor("#eff6ff")),
        ("BOX",          (0,0),(-1,-1), 0.8, colors.HexColor("#93c5fd")),
        ("TOPPADDING",   (0,0),(-1,-1), 8),
        ("BOTTOMPADDING",(0,0),(-1,-1), 8),
        ("LEFTPADDING",  (0,0),(-1,-1), 12),
    ]))
    story.append(dl_tbl)
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "<b>Chạy trong MySQL Workbench:</b>  "
        "File → Open SQL Script → chọn file vừa tải "
        "→ nhấn <b>Ctrl+Shift+Enter</b>.",
        S("normal", fontName="Arial", fontSize=9.5, textColor=colors.HexColor("#374151"))))
    story.append(Paragraph(
        "<b>Chạy bằng CLI:</b>  "
        "mysql -u root -p &lt; ecommerce_test_setup.sql",
        S("normal", fontName="Arial", fontSize=9.5, textColor=colors.HexColor("#374151"),
          spaceBefore=3)))
    story.append(Paragraph(
        "Script tự xóa và tạo lại data mỗi lần chạy — tiện để reset sau khi thực hành.",
        S("normal", fontName="Arial", fontSize=9, textColor=colors.HexColor("#6b7280"),
          spaceBefore=4)))
    story.append(Spacer(1, 8))

    # Bug annotation boxes
    story.append(Paragraph("1.3  Lỗi đã cài sẵn trong dữ liệu mẫu",
        S("h2", parent=st_label, textColor=NAVY, fontSize=10.5, spaceBefore=4)))
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        "Data mẫu chứa đầy đủ lỗi cho cả 50 câu SQL. Dưới đây là tổng hợp "
        "theo nhóm để bạn nắm trước khi bắt đầu thực hành.",
        st_body))
    story.append(Spacer(1, 6))
    bug_groups = [
        ("Trùng lặp & toàn vẹn (Câu 1–8)",
         "Email trùng (C004/C005 · C001/C009), composite key trùng trong Order_Items (item 1 và 7), "
         "email trùng không phân biệt hoa/thường, tên sản phẩm trùng hoàn toàn (PROD_002/PROD_005)."),
        ("NULL & dữ liệu thiếu (Câu 3, 7)",
         "C006: email = NULL. C007: email = chuỗi rỗng. "
         "PROD_006: price = NULL. PROD_007: stock = NULL."),
        ("Định dạng không hợp lệ (Câu 4, 9)",
         "C008: customer_name có khoảng trắng thừa ở đầu và cuối ('  Pham Van D  '). "
         "C010: membership_tier = 'VIP' — ngoài danh sách Standard/Silver/Gold/Platinum."),
        ("Orphan & ràng buộc tham chiếu (Câu 5)",
         "ORD_004: customer_id = 'C999' không tồn tại trong bảng Customers."),
        ("Giá trị nghiệp vụ sai (Câu 10, 17, 18)",
         "item_id bỏ trống số 3 — gap trong chuỗi ID liên tục. "
         "PROD_003: stock = -5 (tồn kho âm). "
         "ORD_002: total_amount = 20.000.000 nhưng Order_Items tổng = 31.000.000 (lệch 11.000.000)."),
    ]
    for grp_title, grp_desc in bug_groups:
        story.append(color_box(grp_title, grp_desc, LAMBER, AMBER, colors.HexColor("#b45309")))
        story.append(Spacer(1, 4))

    # Sample data tables
    story.append(PageBreak())
    story.append(Paragraph("1.4  Dữ liệu mẫu sau khi chạy script",
        S("h2", parent=st_label, textColor=NAVY, fontSize=10.5, spaceBefore=4)))
    story.append(Spacer(1, 6))

    story.append(Paragraph(
        "Bảng Customers (10 dòng — dòng đỏ: lỗi trùng email, NULL, khoảng trắng, tier sai)",
        st_label))
    # col widths: customer_id=50 | customer_name=105 | email=150 | membership_tier=100 | status=88 = 493
    story.append(before_tbl(
        ["customer_id","customer_name","email","membership_tier","status"],
        [["C001","Nguyen Van A","a.nguyen@email.com","Silver","ACTIVE"],
         ["C002","Tran Van B","b.tran@email.com","Standard","ACTIVE"],
         ["C003","Le Thi C","c.le@email.com","Gold","ACTIVE"],
         ["C004","Khach Hang Ao Bug","trung_email@email.com","Standard","ACTIVE"],
         ["C005","Khach Hang Trung","trung_email@email.com","Standard","ACTIVE"],
         ["C006","Pham Van X","(NULL)","Standard","ACTIVE"],
         ["C007","Nguyen Thi Y","","Standard","ACTIVE"],
         ["C008","  Pham Van D  ","d.pham@email.com","Gold","ACTIVE"],
         ["C009","Nguyen Van A (2)","A.NGUYEN@EMAIL.COM","Silver","ACTIVE"],
         ["C010","Khach Test VIP","vip@email.com","VIP","ACTIVE"]],
        bugs=[3,4,5,6,7,8,9],
        col_widths=[50, 105, 150, 100, 88]))
    story.append(Spacer(1, 8))

    story.append(Paragraph(
        "Bảng Products (7 dòng — dòng đỏ: stock âm, NULL, tên trùng)",
        st_label))
    # col widths: product_id=58 | product_name=175 | category=75 | price=95 | stock=90 = 493
    story.append(before_tbl(
        ["product_id","product_name","category","price","stock"],
        [["PROD_001","iPhone 15 Pro Max","Dien thoai","30.000.000","50"],
         ["PROD_002","Ban phim co Logitech","Phu kien","2.000.000","100"],
         ["PROD_003","Tai nghe Sony WH-1000XM5","Phu kien","8.000.000","-5"],
         ["PROD_004","Sac du phong Anker","Phu kien","1.000.000","20"],
         ["PROD_005","Ban phim co Logitech","Phu kien","2.000.000","30"],
         ["PROD_006","Loa Bluetooth JBL","Phu kien","(NULL)","10"],
         ["PROD_007","Chuot gaming Razer","Phu kien","1.500.000","(NULL)"]],
        bugs=[2,4,5,6],
        col_widths=[58, 175, 75, 95, 90]))
    story.append(Spacer(1, 8))

    story.append(Paragraph(
        "Bảng Orders (4 dòng — dòng đỏ: total_amount sai, orphan customer)",
        st_label))
    # col widths: order_id=65 | customer_id=65 | total_amount=110 | status=100 | order_date=153 = 493
    story.append(before_tbl(
        ["order_id","customer_id","total_amount","status","order_date"],
        [["ORD_001","C001","32.000.000","COMPLETED","2026-06-20"],
         ["ORD_002","C002","20.000.000","COMPLETED","2026-06-22"],
         ["ORD_003","C003","8.000.000","CANCELLED","2026-06-23"],
         ["ORD_004","C999","5.000.000","PENDING","2026-06-24"]],
        bugs=[1,3],
        col_widths=[65, 65, 110, 100, 153]))
    story.append(Spacer(1, 8))

    story.append(Paragraph(
        "Bảng Order_Items (6 dòng — dòng đỏ: composite key trùng; item_id=3 bị bỏ qua)",
        st_label))
    # col widths: item_id=52 | order_id=80 | product_id=95 | quantity=66 | price=200 = 493
    story.append(before_tbl(
        ["item_id","order_id","product_id","quantity","price"],
        [[1,"ORD_001","PROD_001",1,"30.000.000"],
         [2,"ORD_001","PROD_002",1, "2.000.000"],
         [4,"ORD_002","PROD_001",1,"30.000.000"],
         [5,"ORD_002","PROD_004",1, "1.000.000"],
         [6,"ORD_003","PROD_003",1, "8.000.000"],
         [7,"ORD_001","PROD_001",1,"30.000.000"]],
        bugs=[5],
        col_widths=[52, 80, 95, 66, 200]))
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        "item_id nhảy từ 2 lên 4 (thiếu 3). Item 7 trùng (order_id, product_id) với item 1. "
        "ORD_002: tổng items = 31.000.000 nhưng total_amount = 20.000.000 (lệch 11.000.000).",
        S("fn", parent=st_small, textColor=RED)))

    # ---- Table of contents ----
    story.append(PageBreak())
    story.append(Paragraph("Mục lục", st_h1))
    story.append(HRule(CONTENT_W, BLUE, 1.5))
    story.append(Spacer(1, 6))
    for pi, (code, name, _) in enumerate(PARTS):
        story.append(Paragraph(f"{code} · {name}", st_toc_b))
        for e in ENTRIES:
            if e["part"] == pi:
                story.append(Paragraph(
                    f"<b>{e['id']:02d}.</b>&nbsp;&nbsp;{e['title']}", st_toc))

    # ---- Parts & entries ----
    for pi, (code, name, intro) in enumerate(PARTS):
        story.append(NextPageTemplate("body"))
        story.append(PageBreak())
        # Part banner
        banner = Table([[Paragraph(f"{code}", S("pc", fontName="Arial-Bold",
                        fontSize=13, textColor=colors.HexColor("#93c5fd"))),]],
                        colWidths=[CONTENT_W])
        story.append(Spacer(1, 30))
        head = Table([[Paragraph(code + "  —  " + name, st_part)]],
                     colWidths=[CONTENT_W])
        head.setStyle(TableStyle([
            ("BACKGROUND", (0,0), (-1,-1), NAVY),
            ("LEFTPADDING", (0,0), (-1,-1), 16),
            ("RIGHTPADDING", (0,0), (-1,-1), 16),
            ("TOPPADDING", (0,0), (-1,-1), 16),
            ("BOTTOMPADDING", (0,0), (-1,-1), 16),
        ]))
        story.append(head)
        story.append(Spacer(1, 10))
        story.append(Paragraph(intro, st_lead))
        story.append(Spacer(1, 4))

        for e in [x for x in ENTRIES if x["part"] == pi]:
            blocks = []
            # Entry header
            num = Table([[
                Paragraph(f"{e['id']:02d}", S("num", fontName="Arial-Bold",
                          fontSize=17, textColor=colors.white, alignment=TA_CENTER)),
                Paragraph(e["title"], st_entry),
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
            blocks.append(color_box("TÌNH HUỐNG", e["situation"],
                          LAMBER, AMBER, colors.HexColor("#b45309")))
            # Before table
            if e.get("before_cols"):
                blocks.append(Spacer(1, 6))
                blocks.append(Paragraph(
                    e.get("before_label","Dữ liệu trong bảng trước khi query:"),
                    S("blbl", parent=st_label, textColor=colors.HexColor("#1e3a5f"))))
                blocks.append(before_tbl(
                    e["before_cols"], e["before_rows"], e.get("before_bugs",[]),
                    col_widths=e.get("before_col_widths")))
            blocks.append(Spacer(1, 6))
            blocks.append(Paragraph("CÂU LỆNH SQL", st_label))
            blocks.append(code_box(e["sql"]))
            # Clause-by-clause explanation
            if e.get("clauses"):
                blocks.append(Spacer(1, 5))
                blocks.append(Paragraph(
                    "PHÂN TÍCH TỪNG MỆNH ĐỀ SQL  "
                    "<font color='#64748b' size='8'>"
                    "(theo thứ tự MySQL thực thi — FROM chạy trước SELECT)</font>",
                    S("clbl", parent=st_label, textColor=BLUE)))
                blocks.append(clause_tbl(e["clauses"]))
            blocks.append(Spacer(1, 6))
            blocks.append(Paragraph("Giải thích tổng thể", S("gt", parent=st_label,
                          textColor=NAVY)))
            blocks.append(Paragraph(e["explain"], st_body))
            # Result (after query)
            blocks.append(Spacer(1, 4))
            blocks.append(Paragraph("Ket qua sau khi query (minh hoa)", S("kq",
                          parent=st_label, textColor=NAVY)))
            if e.get("result_table"):
                blocks.append(result_table(*e["result_table"]))
                blocks.append(Spacer(1, 3))
            if e.get("result_note"):
                blocks.append(Paragraph(e["result_note"], st_small))
            blocks.append(Spacer(1, 6))
            blocks.append(color_box("GÓC SOI LỖI CỦA TESTER", e["note"],
                          LGREEN, GREEN, colors.HexColor("#047857")))
            blocks.append(Spacer(1, 14))
            # Keep header + situation together; let the rest flow
            story.append(KeepTogether(blocks[:4]))
            story.extend(blocks[4:])

    # ---- Closing ----
    story.append(PageBreak())
    story.append(Paragraph("Tóm lại", st_h1))
    story.append(HRule(CONTENT_W, BLUE, 1.5))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "SQL không thay thế tư duy kiểm thử — nó khuếch đại tư duy ấy. Một câu lệnh "
        "chỉ mạnh khi đứng sau nó là một câu hỏi tốt: \"Điều gì trong hệ thống "
        "này lẽ ra phải luôn đúng?\". 50 câu lệnh ở đây là 50 câu hỏi như vậy, "
        "đã được viết thành truy vấn. Khi gặp một nghiệp vụ mới, hãy tự đặt câu hỏi "
        "của riêng bạn rồi dịch nó sang SQL theo đúng các mẫu trong sách.", st_lead))
    story.append(Spacer(1, 6))
    story.append(color_box("",
        [Paragraph("<b>Ba điều mang theo:</b>", st_box),
         Spacer(1,4),
         li("Mọi truy vấn đối soát đều dựa trên một <b>bất biến</b> — tìm cái luôn đúng, rồi tìm cái vi phạm nó."),
         li("Kết quả SQL là <b>danh sách cần điều tra</b>, không phải bản án. Luôn xác minh trước khi kết luận bug."),
         li("Cẩn thận với <b>NULL</b>, <b>collation</b>, <b>kiểu số thực</b> và <b>khác biệt dialect</b> — đó là nơi bug ẩn nấp ngay trong chính câu lệnh của bạn."),
        ],
        LBLUE, BLUE, BLUE))
    story.append(Spacer(1, 10))
    story.append(Paragraph(
        "— Biên soạn bởi MAI.tools · Ứng dụng AI vào công việc Kiểm thử · maiqai.com",
        S("end", parent=st_small, alignment=TA_CENTER)))

    doc.build(story)
    return out_path

if __name__ == "__main__":
    path = build()
    print("Done:", path)
