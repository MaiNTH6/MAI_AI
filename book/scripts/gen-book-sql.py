# -*- coding: utf-8 -*-
"""
Sinh ebook PDF: "Cẩm nang 50 câu lệnh SQL săn Bug thực chiến cho QA"
- Font Arial + Consolas (hỗ trợ tiếng Việt đầy đủ)
- Bìa, mục lục, 6 chương, 50 câu lệnh chi tiết
Chạy: python book/scripts/gen-book-sql.py
Xuất ra: book/dist/cam-nang-50-cau-lenh-sql-san-bug.pdf
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
VIOLET = colors.HexColor("#7c3aed")
LVIOLET= colors.HexColor("#f5f3ff")
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

def ref_table(headers, rows, col_widths, head_bg=NAVY):
    """Bảng tra cứu phụ lục: header màu + cell căn trái, tự xuống dòng."""
    st_rc  = S("rc",  parent=st_cell, fontSize=8.8, leading=12)
    st_rcm = S("rcm", parent=st_rc, fontName="Mono", fontSize=7.8, leading=11)
    data = [[Paragraph(h, st_cellh) for h in headers]]
    for r in rows:
        row = []
        for c in r:
            # tuple ("mono", text) -> render code; else thường
            if isinstance(c, tuple) and c[0] == "mono":
                row.append(Paragraph(c[1], st_rcm))
            else:
                row.append(Paragraph(str(c), st_rc))
        data.append(row)
    t = Table(data, colWidths=col_widths, repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,0), head_bg),
        ("ROWBACKGROUNDS", (0,1), (-1,-1), [colors.white, LGREY]),
        ("GRID", (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ("VALIGN", (0,0), (-1,-1), "TOP"),
        ("LEFTPADDING", (0,0), (-1,-1), 7),
        ("RIGHTPADDING", (0,0), (-1,-1), 7),
        ("TOPPADDING", (0,0), (-1,-1), 4),
        ("BOTTOMPADDING", (0,0), (-1,-1), 4),
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
        ("status",""), ("order_date",""), ("deleted_at",""),
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

from _book_sql_data import PARTS, ENTRIES, EXERCISES

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
    canv.drawString(LM, 8*mm, "maiqai.com")
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
    canv.drawString(X, PAGE_H - 22 * mm, "MAIQAI.COM  ·  CẨM NANG QA / TESTER")

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
    canv.drawString(X, PAGE_H - 77 * mm, "Dành cho QA · Tester  —  Dialect MySQL")

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
        ("-- Tìm bug: email bị trùng (Bug-D)",   "#64748b"),
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
        ("15",    "Bug cài sẵn"),
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
        "Mỗi câu lệnh: tình huống bug điển hình — SQL — phân tích mệnh đề — kết quả — góc soi lỗi",
        "Phần chuẩn bị: script tạo DB, sơ đồ ER, dữ liệu mẫu với 15 bug cố ý cài cắm để thực hành",
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

def keep(*flow):
    """Gói nhiều flowable lại để không bị ngắt trang giữa chừng (chống tiêu đề mồ côi)."""
    return KeepTogether(list(flow))

def build():
    out_dir = os.path.join(os.path.dirname(__file__), "..", "dist")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.abspath(os.path.join(out_dir,
               "cam-nang-50-cau-lenh-sql-san-bug.pdf"))

    doc = BaseDocTemplate(out_path, pagesize=A4,
        leftMargin=LM, rightMargin=RM, topMargin=TM, bottomMargin=BM,
        title="Cẩm nang 50 câu lệnh SQL săn Bug thực chiến cho QA",
        author="maiqai.com", subject="SQL cho QA / Kiểm thử")

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
        "schema ecommerce_test ở phần Chuẩn bị môi trường — đổi cho khớp schema thật của bạn.",
        LAMBER, AMBER, colors.HexColor("#b45309")))
    story.append(Spacer(1, 6))
    story.append(color_box("NGUYÊN TẮC XUYÊN SUỐT",
        "Săn bug bằng SQL thực chất là đi tìm những điều LẼ RA LUÔN ĐÚNG nhưng dữ "
        "liệu lại nói ngược lại: tồn kho không thể âm, tổng dòng con phải bằng header, "
        "email trong hệ thống phải là duy nhất. Với mỗi bất biến đó, bạn viết một câu "
        "lệnh tìm các bản ghi VI PHẠM. Cuốn sách này là 50 ví dụ của đúng một tư duy đó.",
        LGREEN, GREEN, colors.HexColor("#047857")))

    # ---- Mục lục (Table of contents) ----
    story.append(PageBreak())
    story.append(Paragraph("Mục lục", st_h1))
    story.append(HRule(CONTENT_W, BLUE, 1.5))
    story.append(Spacer(1, 6))
    story.append(Paragraph("CHUẨN BỊ · Môi trường thực hành", st_toc_b))
    story.append(Paragraph("PHƯƠNG PHÁP · Dịch yêu cầu thành câu lệnh săn bug", st_toc_b))
    for pi, (code, name, _) in enumerate(PARTS):
        story.append(Paragraph(f"{code} · {name}", st_toc_b))
        for e in ENTRIES:
            if e["part"] == pi:
                story.append(Paragraph(
                    f"<b>{e['id']:02d}.</b>&nbsp;&nbsp;{e['title']}", st_toc))
    story.append(Paragraph("CASE STUDY · Một ngày điều tra dữ liệu của QA", st_toc_b))
    story.append(Paragraph("KIỂM THỬ GHI DỮ LIỆU · Hành động trên app → xác minh DB", st_toc_b))
    story.append(Paragraph("KIỂM THỬ GIAO DỊCH & TRUY CẬP ĐỒNG THỜI", st_toc_b))
    story.append(Paragraph("CHẠY SQL AN TOÀN TRÊN PRODUCTION", st_toc_b))
    story.append(Paragraph("PHỤ LỤC · Tra cứu nhanh", st_toc_b))
    for t in ["A · Gặp triệu chứng → dùng câu nào",
              "B · Cheat sheet cú pháp lõi",
              "C · Bản đồ 15 lỗi mẫu → câu phát hiện",
              "D · Đáp án bài tập tự luyện",
              "E · Tra cứu theo module nghiệp vụ"]:
        story.append(Paragraph(f"&nbsp;&nbsp;&nbsp;{t}", st_toc))

    # ---- CHƯƠNG 0: Setup database ----
    story.append(PageBreak())
    story.append(Paragraph("Chuẩn bị môi trường thực hành", st_h1))
    story.append(HRule(CONTENT_W, BLUE, 1.5))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "Tất cả 50 câu lệnh trong sách đều chạy được ngay trên cơ sở dữ liệu "
        "<b>ecommerce_test</b> dưới đây. Hệ thống mô phỏng một sàn thương mại điện "
        "tử nhỏ gồm 4 bảng, với <b>15 bug được cố ý cài cắm</b> để bạn thực hành phát hiện.",
        st_lead))
    story.append(Spacer(1, 8))

    # Schema diagram
    story.append(Paragraph("Sơ đồ quan hệ 4 bảng (Entity Relationship)",
        S("h2", parent=st_label, textColor=NAVY, fontSize=10.5, spaceBefore=4,
          keepWithNext=True)))
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
        "<b>Lưu ý:</b> <b>total_amount</b> (Orders) và <b>price</b> (Order_Items) là hai cột khác nhau. "
        "total_amount = tổng cả đơn; price = giá 1 đơn vị. "
        "Nếu hai con số này không khớp là có bug — ví dụ: "
        "ORD_002 ghi total_amount = 20.000.000 nhưng "
        "SUM(price × quantity) trong Order_Items = 31.000.000 → lệch 11.000.000 (Bug-B trong data mẫu).",
        S("bug1note", parent=st_small, textColor=colors.HexColor("#92400e"),
          backColor=colors.HexColor("#fffbeb"), borderPadding=(5,6,5,6))))
    story.append(Spacer(1, 10))

    # Setup SQL — download link thay vì nhúng code
    story.append(keep(
        Paragraph("Script tạo Database và bơm dữ liệu mẫu",
            S("h2", parent=st_label, textColor=NAVY, fontSize=10.5, spaceBefore=4)),
        Spacer(1, 4),
        Paragraph(
            "Thay vì copy-paste thủ công, hãy tải file SQL sẵn có và chạy một lần duy nhất "
            "— database <b>ecommerce_test</b> cùng toàn bộ dữ liệu mẫu sẽ được tạo tự động.",
            st_body)))
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
    story.append(keep(
        Paragraph("Lỗi đã cài sẵn trong dữ liệu mẫu",
            S("h2", parent=st_label, textColor=NAVY, fontSize=10.5, spaceBefore=4)),
        Spacer(1, 4),
        Paragraph(
            "Data mẫu chứa <b>15 lỗi cố ý</b> (đánh mã Bug-A → Bug-O) cài sẵn để bạn bắt bằng SQL, gom theo sáu nhóm dưới đây. "
            "Nhiều câu lệnh khác trong sách lại là <b>kiểm tra sạch</b> — kết quả rỗng nghĩa là dữ liệu "
            "đạt, không phải thất bại. Bản đồ đầy đủ từng lỗi ↔ câu phát hiện nằm ở <b>Phụ lục C</b> (cuối sách).",
            st_body)))
    story.append(Spacer(1, 6))
    bug_groups = [
        ("Trùng lặp & toàn vẹn dữ liệu",
         "Email trùng (C004/C005 · C001/C009), composite key trùng trong Order_Items (item 1 và 7), "
         "email trùng không phân biệt hoa/thường, tên sản phẩm trùng hoàn toàn (PROD_002/PROD_005)."),
        ("NULL & dữ liệu thiếu",
         "C006: email = NULL. C007: email = chuỗi rỗng. "
         "PROD_006: price = NULL. PROD_007: stock = NULL."),
        ("Định dạng không hợp lệ",
         "C008: customer_name có khoảng trắng thừa ở đầu và cuối ('  Pham Van D  '). "
         "C010: membership_tier = 'VIP' — ngoài danh sách Standard/Silver/Gold/Platinum."),
        ("Mồ côi & ràng buộc tham chiếu",
         "ORD_004: customer_id = 'C999' không tồn tại trong bảng Customers — đồng thời là đơn "
         "không có dòng item nào."),
        ("Giá trị nghiệp vụ sai & lệch số",
         "item_id bỏ trống số 3 — gap trong chuỗi ID liên tục. PROD_003: stock = -5 (tồn kho âm). "
         "ORD_001: total_amount = 32.000.000 nhưng Order_Items cộng = 62.000.000 (do item trùng). "
         "ORD_002: total_amount = 20.000.000 nhưng Order_Items cộng = 31.000.000 (lệch 11.000.000)."),
        ("Audit, xóa mềm & dấu vết",
         "ORD_005: đã xóa mềm (deleted_at có giá trị) nhưng item 8, 9 chưa được dọn và đơn vẫn lọt "
         "vào tính toán. ORD_003: đã CANCELLED nhưng deleted_at vẫn trống — hai cột dấu vết lệch nhau."),
    ]
    for grp_title, grp_desc in bug_groups:
        story.append(color_box(grp_title, grp_desc, LAMBER, AMBER, colors.HexColor("#b45309")))
        story.append(Spacer(1, 4))

    # Sample data tables
    story.append(PageBreak())
    story.append(Paragraph("Dữ liệu mẫu sau khi chạy script",
        S("h2", parent=st_label, textColor=NAVY, fontSize=10.5, spaceBefore=4,
          keepWithNext=True)))
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
        "Bảng Orders (5 dòng — dòng đỏ: total_amount sai, orphan customer, ORD_005 đã xóa mềm)",
        st_label))
    # col widths: order_id=50 | customer_id=58 | total_amount=88 | status=80 | order_date=75 | deleted_at=142 = 493
    story.append(before_tbl(
        ["order_id","customer_id","total_amount","status","order_date","deleted_at"],
        [["ORD_001","C001","32.000.000","COMPLETED","2026-06-20","(NULL)"],
         ["ORD_002","C002","20.000.000","COMPLETED","2026-06-22","(NULL)"],
         ["ORD_003","C003","8.000.000","CANCELLED","2026-06-23","(NULL)"],
         ["ORD_004","C999","5.000.000","PENDING","2026-06-24","(NULL)"],
         ["ORD_005","C001","15.000.000","CANCELLED","2026-06-25","2026-06-25 10:30:00"]],
        bugs=[1,3,4],
        col_widths=[50, 58, 88, 80, 75, 142]))
    story.append(Spacer(1, 8))

    story.append(Paragraph(
        "Bảng Order_Items (8 dòng — dòng đỏ: composite key trùng; item_id=3 bị bỏ qua)",
        st_label))
    # col widths: item_id=52 | order_id=80 | product_id=95 | quantity=66 | price=200 = 493
    story.append(before_tbl(
        ["item_id","order_id","product_id","quantity","price"],
        [[1,"ORD_001","PROD_001",1,"30.000.000"],
         [2,"ORD_001","PROD_002",1, "2.000.000"],
         [4,"ORD_002","PROD_001",1,"30.000.000"],
         [5,"ORD_002","PROD_004",1, "1.000.000"],
         [6,"ORD_003","PROD_003",1, "8.000.000"],
         [7,"ORD_001","PROD_001",1,"30.000.000"],
         [8,"ORD_005","PROD_004",1, "1.000.000"],
         [9,"ORD_005","PROD_002",1, "2.000.000"]],
        bugs=[5],
        col_widths=[52, 80, 95, 66, 200]))
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        "item_id nhảy từ 2 lên 4 (thiếu 3). Item 7 trùng (order_id, product_id) với item 1. "
        "ORD_002: tổng items = 31.000.000 nhưng total_amount = 20.000.000 (lệch 11.000.000). "
        "Item 8 và 9 thuộc ORD_005 — đơn đã bị xóa mềm nhưng dòng chi tiết vẫn còn.",
        S("fn", parent=st_small, textColor=RED)))

    # ---- Chương phương pháp: Dịch yêu cầu → SQL ----
    story.append(NextPageTemplate("body"))
    story.append(PageBreak())
    story.append(Paragraph("Phương pháp: Dịch một yêu cầu thành câu lệnh săn bug", st_h1))
    story.append(HRule(CONTENT_W, BLUE, 1.5))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "50 câu trong sách là 50 lời giải có sẵn. Nhưng hệ thống bạn kiểm thử luôn có những quy tắc "
        "riêng mà không câu nào đoán trước được. Kỹ năng thật sự không nằm ở việc thuộc lòng câu lệnh, "
        "mà ở chỗ <b>biến một yêu cầu nghiệp vụ thành một truy vấn kiểm chứng</b>. Dưới đây là quy "
        "trình năm bước áp dụng được cho mọi nghiệp vụ.", st_lead))
    story.append(Spacer(1, 8))
    method_steps = [
        ("Bước 1 — Tìm 'bất biến' (điều luôn phải đúng)",
         "Mọi quy tắc nghiệp vụ đều ẩn một điều LUÔN PHẢI ĐÚNG. Viết nó ra thành một câu khẳng định, ví dụ:<br/>"
         "• 'tổng tiền đơn = tổng tiền các dòng item'<br/>"
         "• 'mỗi email chỉ thuộc một khách'<br/>"
         "• 'tồn kho không bao giờ âm'"),
        ("Bước 2 — Đảo thành câu hỏi vi phạm",
         "Bug là nơi bất biến bị phá vỡ. Đổi 'X luôn đúng' thành 'tìm những bản ghi mà X SAI'. "
         "Đây là bước biến tư duy kiểm thử thành một mục tiêu truy vấn rõ ràng."),
        ("Bước 3 — Khoanh vùng bảng và cột",
         "Bất biến đụng tới bảng và cột nào?<br/>"
         "• Một bảng → WHERE đơn giản<br/>"
         "• Nhiều bảng → cần JOIN hoặc anti-join<br/>"
         "• So sánh hai tổng → cần GROUP BY và hàm tổng hợp"),
        ("Bước 4 — Chọn khuôn mẫu SQL",
         "Mỗi loại bất biến ứng với một mẫu quen thuộc (tra nhanh ở Phụ lục B):<br/>"
         "• 'không được trùng' → GROUP BY ... HAVING COUNT(*) &gt; 1<br/>"
         "• 'phải tồn tại ở bảng kia' → NOT EXISTS<br/>"
         "• 'hai tổng phải bằng nhau' → JOIN + GROUP BY + HAVING so sánh<br/>"
         "• 'phải nằm trong danh sách' → NOT IN"),
        ("Bước 5 — Chạy và diễn giải",
         "• Kết quả RỖNG → bất biến đang được giữ; đó là tin tốt, không phải thất bại.<br/>"
         "• Có dòng trả về → DANH SÁCH CẦN ĐIỀU TRA, không phải bản án: luôn xác minh thủ công "
         "trước khi kết luận bug."),
    ]
    for t, d in method_steps:
        story.append(color_box(t, d, LBLUE, BLUE, BLUE))
        story.append(Spacer(1, 4))
    story.append(PageBreak())
    story.append(keep(
        Paragraph("Ví dụ áp dụng — từ một câu yêu cầu đến câu lệnh",
            S("mh2", parent=st_label, textColor=NAVY, fontSize=11, spaceBefore=4, spaceAfter=2)),
        Spacer(1, 4),
        color_box("YÊU CẦU (trích từ tài liệu nghiệp vụ)",
            "“Mỗi khách hàng phải đăng ký bằng một địa chỉ email duy nhất; không hai tài khoản nào "
            "được dùng chung một email.”",
            LAMBER, AMBER, colors.HexColor("#b45309"))))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "<b>Bước 1 — Bất biến:</b> email là duy nhất giữa các khách hàng.<br/>"
        "<b>Bước 2 — Câu hỏi vi phạm:</b> tìm những email được nhiều hơn một khách dùng.<br/>"
        "<b>Bước 3 — Bảng/cột:</b> chỉ bảng Customers, cột email — một bảng nên không cần JOIN; "
        "so theo nhóm nên dùng GROUP BY.<br/>"
        "<b>Bước 4 — Khuôn mẫu:</b> 'không được trùng' → GROUP BY email HAVING COUNT(*) &gt; 1.<br/>"
        "<b>Bước 5 — Diễn giải:</b> kết quả ra trung_email@email.com (C004 và C005) → điều tra hai tài khoản.",
        st_body))
    story.append(Spacer(1, 4))
    story.append(code_box(
        "SELECT email,\n"
        "       COUNT(*) AS so_lan\n"
        "FROM   Customers\n"
        "GROUP  BY email\n"
        "HAVING COUNT(*) > 1;"))
    story.append(Spacer(1, 5))
    story.append(Paragraph(
        "Câu lệnh vừa tự suy ra chính là Câu 1 trong sách. Khi gặp yêu cầu phức tạp hơn — ví dụ "
        "'mỗi đơn hàng phải trỏ tới một khách có thật' — vẫn năm bước đó sẽ dẫn bạn tới mẫu anti-join "
        "(NOT EXISTS), tức Câu 5. Phương pháp không đổi, chỉ khuôn mẫu ở Bước 4 thay đổi theo loại bất biến.",
        st_small))

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

        # ---- Bài tập tự luyện cuối phần ----
        part_ex = [x for x in EXERCISES if x["part"] == pi]
        if part_ex:
            inner = [Paragraph(f"BÀI TẬP TỰ LUYỆN — {code}",
                     S("exh", fontName="Arial-Bold", fontSize=10.5, leading=14,
                       textColor=colors.HexColor("#6d28d9"), spaceAfter=4))]
            for ex in part_ex:
                inner.append(Paragraph(
                    f"<b>Bài {ex['code']}.</b>&nbsp; {ex['prompt']}",
                    S("exq", parent=st_box, fontSize=9.6, leading=13.5, spaceBefore=5)))
                inner.append(Paragraph(
                    f"<i>Gợi ý: {ex['hint']}</i>",
                    S("exhint", parent=st_small, textColor=GREY, spaceAfter=1)))
            inner.append(Paragraph(
                "→ Lời giải đầy đủ ở <b>Phụ lục D</b> (cuối sách). Hãy tự viết trước khi xem.",
                S("exr", parent=st_small, textColor=colors.HexColor("#6d28d9"),
                  spaceBefore=4)))
            story.append(Spacer(1, 10))
            story.append(color_box("", inner, LVIOLET, VIOLET, VIOLET))

    # ---- Case study: Một ngày điều tra của QA ----
    story.append(NextPageTemplate("body"))
    story.append(PageBreak())
    story.append(Paragraph("Case study: Một ngày điều tra dữ liệu của QA", st_h1))
    story.append(HRule(CONTENT_W, BLUE, 1.5))
    story.append(Spacer(1, 8))
    story.append(color_box("BỐI CẢNH",
        "Sáng thứ Hai, dashboard báo doanh số iPhone 15 Pro Max (PROD_001) tháng này là "
        "<b>90.000.000đ</b> — tương đương 3 máy. Nhưng bộ phận kho khẳng định chỉ xuất <b>2 máy</b> "
        "(60.000.000đ). Lệch 30 triệu. QA được nhờ soi xem dữ liệu sai ở đâu.",
        LAMBER, AMBER, colors.HexColor("#b45309")))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "Thay vì đoán, QA lần theo dấu vết bằng chính các câu lệnh trong sách — mỗi bước thu hẹp phạm "
        "vi nghi ngờ cho tới khi chạm nguyên nhân gốc.", st_lead))
    story.append(Spacer(1, 6))
    cs_steps = [
        ("Nhịp 1 · Chụp toàn cảnh (Câu 21)",
         "Đếm số dòng items theo từng đơn: ORD_001 hiện 3 dòng cho một đơn lẽ ra chỉ 2 sản phẩm. "
         "Con số bất thường này khiến QA nghi có item bị nhân đôi."),
        ("Nhịp 2 · Định vị nghi phạm (Câu 22)",
         "Xếp hạng doanh số: PROD_001 = 90.000.000đ = đúng 3 × 30 triệu. Nhưng nghiệp vụ chỉ ghi nhận "
         "2 lần bán — vậy có một lần bán 'ảo' đã lọt vào dữ liệu."),
        ("Nhịp 3 · Truy tới gốc (Câu 46)",
         "Dùng ROW_NUMBER() PARTITION BY (order_id, product_id): cặp ORD_001/PROD_001 có so_lan = 2 — "
         "item_id 1 và item_id 7 là cùng một dòng bị lặp. Đây chính là chiếc iPhone thứ ba 'ảo'."),
        ("Nhịp 4 · Đo đúng phần lệch (Câu 11)",
         "Đối soát ORD_001: tổng từ items = 62 triệu nhưng total_amount ghi 32 triệu — lệch đúng 30 "
         "triệu, khớp chính xác giá một chiếc iPhone bị đếm thừa."),
        ("Nhịp 5 · Đánh giá phạm vi ảnh hưởng (Câu 27)",
         "Tổng theo danh mục: 'Dien thoai' hiện 90 triệu thay vì 60 triệu thực. Báo cáo cấp danh mục và "
         "toàn hệ thống đều bị thổi phồng từ đúng một dòng lỗi này."),
        ("Nhịp 6 · Quét lỗi đi kèm (Câu 50)",
         "Trong lúc mở DB, chạy health-check tổng hợp: ngoài item trùng còn lộ email trùng (C004/C005) "
         "và đơn mồ côi ORD_004/C999 — không liên quan vụ 30 triệu nhưng ghi nhận để xử lý riêng."),
    ]
    for t, d in cs_steps:
        story.append(color_box(t, d, LBLUE, BLUE, BLUE))
        story.append(Spacer(1, 4))
    story.append(Spacer(1, 4))
    story.append(color_box("KẾT LUẬN & KIẾN NGHỊ",
        [Paragraph("<b>Nguyên nhân gốc:</b> bảng Order_Items thiếu ràng buộc duy nhất trên "
                   "(order_id, product_id), khiến cùng một dòng bị ghi hai lần.", st_box),
         Spacer(1, 4),
         li("Báo dev thêm <b>UNIQUE(order_id, product_id)</b> (hoặc kiểm tra ở tầng ứng dụng) để chặn lặp."),
         li("Dọn dữ liệu: xóa item_id = 7 bị trùng, tính lại total_amount và các báo cáo liên quan."),
         li("Báo kế toán con số đúng: doanh số iPhone là <b>60 triệu</b>, không phải 90 triệu."),
        ],
        LGREEN, GREEN, colors.HexColor("#047857")))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "Điều đáng nhớ không phải sáu câu lệnh, mà là <b>nhịp điều tra</b>: chụp toàn cảnh → định vị "
        "nghi phạm → truy tới gốc → đo đúng phần lệch → đánh giá phạm vi → quét lỗi đi kèm. SQL là "
        "đèn pin; tư duy điều tra mới là hướng soi.", st_lead))

    # ---- Chương: Kiểm thử ghi dữ liệu (verify-after-action) ----
    story.append(NextPageTemplate("body"))
    story.append(PageBreak())
    story.append(Paragraph("Kiểm thử ghi dữ liệu: hành động trên ứng dụng → xác minh database", st_h1))
    story.append(HRule(CONTENT_W, BLUE, 1.5))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "50 câu phía trước soi <b>dữ liệu đã có sẵn</b>. Nhưng phần lớn công việc kiểm thử chạm tới "
        "database lại là một câu hỏi khác: <b>“Tôi vừa thao tác trên ứng dụng — database có ghi lại "
        "đúng không?”</b> Tạo một đơn hàng, sửa hồ sơ, hủy giao dịch — mỗi hành động phải để lại đúng "
        "dấu vết trong DB. Đây là kỹ năng QA chức năng dùng hằng ngày.", st_lead))
    story.append(Spacer(1, 8))
    story.append(Paragraph("Khuôn ba bước: Trước → Hành động → Sau (Arrange – Act – Assert)",
        S("vh2a", parent=st_label, textColor=NAVY, fontSize=11, spaceBefore=4, spaceAfter=2)))
    story.append(Spacer(1, 4))
    for t, d in [
        ("TRƯỚC (Arrange) — chụp trạng thái nền",
         "Ghi lại giá trị DB sẽ bị thay đổi <b>trước</b> khi thao tác — nhất là số sẽ biến động "
         "(tồn kho, số dư, số dòng). Không có mốc 'trước', bạn không thể khẳng định 'sau' đúng hay sai."),
        ("HÀNH ĐỘNG (Act) — thao tác qua app/API",
         "Thực hiện đúng một thao tác trên giao diện hoặc API như người dùng thật — <b>không</b> sửa DB "
         "bằng tay. Mục tiêu là kiểm xem hệ thống ghi đúng không, chứ không phải tự ghi hộ nó."),
        ("SAU (Assert) — soi DB và so với kỳ vọng",
         "Chạy SELECT kiểm từng điều phải đúng và so với kỳ vọng: bản ghi chính, các bảng liên quan, "
         "giá trị dẫn xuất, và quan trọng — <b>không có bản ghi thừa hay thiếu</b>."),
    ]:
        story.append(color_box(t, d, LBLUE, BLUE, BLUE))
        story.append(Spacer(1, 4))
    story.append(Spacer(1, 4))
    story.append(keep(
        Paragraph("Ví dụ — đặt một đơn hàng mới rồi xác minh",
            S("vh2b", parent=st_label, textColor=NAVY, fontSize=11, spaceBefore=4, spaceAfter=2)),
        Spacer(1, 4),
        color_box("HÀNH ĐỘNG",
            "Trên giao diện, khách <b>C001</b> đặt mua <b>2</b> chiếc iPhone 15 Pro Max "
            "(PROD_001, giá 30.000.000). Hệ thống sinh đơn mới <b>ORD_006</b>. Tồn kho PROD_001 "
            "trước khi đặt là <b>50</b>. Sau thao tác, DB phải thể hiện đúng bốn điều dưới đây.",
            LAMBER, AMBER, colors.HexColor("#b45309"))))
    story.append(Spacer(1, 6))
    story.append(Paragraph("<b>1. Bản ghi đơn được tạo đúng</b> — đúng khách, tổng tiền, trạng thái, ngày.",
        st_body))
    story.append(code_box(
        "SELECT order_id, customer_id, total_amount, status, order_date\n"
        "FROM   Orders\n"
        "WHERE  order_id = 'ORD_006';"))
    story.append(Paragraph(
        "Kỳ vọng: customer_id = C001, total_amount = 60.000.000, status hợp lệ (vd PENDING), "
        "order_date = hôm nay.", st_small))
    story.append(Spacer(1, 5))
    story.append(Paragraph("<b>2. Dòng chi tiết đúng và KHÔNG thừa</b> — số lượng dòng phải khớp.",
        st_body))
    story.append(code_box(
        "SELECT product_id, quantity, price\n"
        "FROM   Order_Items\n"
        "WHERE  order_id = 'ORD_006';"))
    story.append(Paragraph(
        "Kỳ vọng đúng 1 dòng: PROD_001, quantity = 2, price = 30.000.000 (giá tại thời điểm mua). "
        "Nếu ra 2 dòng → double-submit (Câu 2, 29); nếu rỗng → đơn tạo mà thiếu chi tiết (Câu 15, 38).",
        st_small))
    story.append(Spacer(1, 5))
    story.append(Paragraph("<b>3. Tồn kho bị trừ đúng số lượng</b> — so với mốc 'trước'.", st_body))
    story.append(code_box(
        "SELECT stock\n"
        "FROM   Products\n"
        "WHERE  product_id = 'PROD_001';"))
    story.append(Paragraph(
        "Trước khi đặt stock = 50, bán 2 → kỳ vọng <b>48</b>. Vẫn 50 → quên trừ kho; "
        "còn 46 → trừ hai lần (xem Câu 20, 28).", st_small))
    story.append(Spacer(1, 5))
    story.append(Paragraph("<b>4. Giá trị dẫn xuất nhất quán</b>: total_amount = SUM(quantity × price).",
        st_body))
    story.append(code_box(
        "SELECT o.total_amount,\n"
        "       SUM(oi.quantity * oi.price) AS tinh_tu_items\n"
        "FROM   Orders o\n"
        "JOIN   Order_Items oi ON o.order_id = oi.order_id\n"
        "WHERE  o.order_id = 'ORD_006'\n"
        "GROUP  BY o.total_amount;"))
    story.append(Paragraph(
        "Hai con số phải bằng nhau (60.000.000 = 2 × 30.000.000). Lệch là lỗi tính tiền — đúng mẫu Câu 11, "
        "nay áp cho một đơn vừa tạo.", st_small))
    story.append(Spacer(1, 8))
    story.append(color_box("CHECKLIST — SAU MỖI THAO TÁC GHI, KIỂM GÌ?",
        [li("Bản ghi chính được tạo / sửa / xóa đúng như mong đợi?"),
         li("Mọi bảng <b>liên quan</b> cập nhật đúng (tồn kho, audit log, bảng đối soát)?"),
         li("Số dòng đúng — không thừa (double-submit), không thiếu?"),
         li("Giá trị dẫn xuất nhất quán (total = SUM items, số dư, điểm thưởng)?"),
         li("Cột tự động đúng (timestamp, status mặc định, khóa ngoại)?"),
         li("Nếu thao tác <b>thất bại</b>: DB có rollback sạch, không để lại bản ghi rác?"),
        ],
        LBLUE, BLUE, BLUE))
    story.append(Spacer(1, 6))
    story.append(color_box("GÓC SOI LỖI CỦA TESTER",
        [Paragraph("Những bug 'ghi dữ liệu' hay gặp nhất:", st_box),
         Spacer(1, 3),
         li("App báo 'thành công' nhưng DB không ghi — hoặc ngược lại, DB ghi mà app báo lỗi (để lại rác)."),
         li("Cập nhật <b>một phần</b>: đơn được tạo nhưng quên trừ kho hoặc quên ghi audit log."),
         li("Trừ kho hai lần / tạo đơn trùng do double-submit (Câu 2, 29)."),
         li("<b>Soft-delete</b>: 'xóa' trên app nhưng DB chỉ đánh dấu cờ — phải kiểm đúng cơ chế, đừng tưởng mất là mất."),
         li("Sai múi giờ hoặc timestamp khi ghi (Câu 34)."),
        ],
        LGREEN, GREEN, colors.HexColor("#047857")))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "Luôn kiểm trên môi trường test/staging, và chạy lại file <b>ecommerce_test_setup.sql</b> để "
        "đưa dữ liệu về mốc gốc trước mỗi lượt kiểm — nhờ vậy con số 'trước' luôn xác định và kết quả "
        "tái lập được.", st_small))

    # ---- Chương: Kiểm thử giao dịch và truy cập đồng thời ----
    story.append(NextPageTemplate("body"))
    story.append(PageBreak())
    story.append(Paragraph("Kiểm thử giao dịch và truy cập đồng thời", st_h1))
    story.append(HRule(CONTENT_W, BLUE, 1.5))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "Các câu trước phát hiện <b>hậu quả</b>: tồn kho âm (Câu 12), đơn trùng (Câu 29). Chương này "
        "đi tới <b>nguyên nhân</b>: phần lớn các bug đó sinh ra từ giao dịch không nguyên tử hoặc nhiều "
        "người thao tác cùng lúc. QA cần biết cách chủ động <b>kiểm và tái hiện</b> chúng — bằng chính SQL.",
        st_lead))
    story.append(Spacer(1, 8))

    # A. Tính nguyên tử & rollback
    story.append(keep(
        Paragraph("Tính nguyên tử: cả cụm cùng sống hoặc cùng chết",
            S("th2a", parent=st_label, textColor=NAVY, fontSize=11, spaceBefore=4, spaceAfter=2)),
        Spacer(1, 4),
        Paragraph(
            "Một thao tác nghiệp vụ thường đụng nhiều bảng. 'Đặt đơn' = thêm Orders + thêm Order_Items "
            "+ trừ Products.stock. Cả ba phải nằm trong MỘT <b>transaction</b>: lỗi một bước thì huỷ tất cả "
            "(ROLLBACK), không để lại cập nhật nửa vời.", st_body)))
    story.append(Spacer(1, 4))
    story.append(code_box(
        "START TRANSACTION;\n"
        "  INSERT INTO Orders      VALUES ('ORD_006','C001',60000000,'PENDING',CURDATE());\n"
        "  INSERT INTO Order_Items VALUES (10,'ORD_006','PROD_001',2,30000000);\n"
        "  UPDATE Products SET stock = stock - 2 WHERE product_id = 'PROD_001';\n"
        "ROLLBACK;   -- giả lập một bước lỗi → huỷ TẤT CẢ\n"
        "\n"
        "-- Kiểm: không được còn dấu vết nào của ORD_006\n"
        "SELECT * FROM Orders      WHERE order_id = 'ORD_006';   -- phải rỗng\n"
        "SELECT * FROM Order_Items WHERE order_id = 'ORD_006';   -- phải rỗng\n"
        "SELECT stock FROM Products WHERE product_id = 'PROD_001'; -- phải vẫn = 50"))
    story.append(Paragraph(
        "Nếu sau ROLLBACK vẫn còn ORD_006, hoặc kho đã bị trừ → ứng dụng <b>không bọc transaction đúng</b>: "
        "lỗi nửa chừng sẽ để lại dữ liệu rác. Bài học cho tester: <b>luôn test cả luồng lỗi</b>, đừng chỉ "
        "test luồng thành công.", st_small))
    story.append(Spacer(1, 8))

    # B. Race condition
    story.append(keep(
        Paragraph("Race condition: tái hiện 'bán vượt kho' bằng hai phiên",
            S("th2b", parent=st_label, textColor=NAVY, fontSize=11, spaceBefore=4, spaceAfter=2)),
        Spacer(1, 4),
        Paragraph(
            "Giả sử một sản phẩm chỉ còn <b>1</b> chiếc. Hai khách bấm Mua gần như cùng lúc. Mở hai phiên "
            "MySQL và xen kẽ các bước theo thời gian:", st_body)))
    story.append(Spacer(1, 4))
    story.append(ref_table(
        ["Phiên A (khách 1)", "Phiên B (khách 2)"],
        [
            [("mono", "1) START TRANSACTION;<br/>&nbsp;&nbsp;&nbsp;SELECT stock; -- còn 1"), ""],
            ["", ("mono", "2) START TRANSACTION;<br/>&nbsp;&nbsp;&nbsp;SELECT stock; -- cũng còn 1")],
            [("mono", "3) UPDATE stock=stock-1;<br/>&nbsp;&nbsp;&nbsp;COMMIT; -- còn 0"), ""],
            ["", ("mono", "4) UPDATE stock=stock-1;<br/>&nbsp;&nbsp;&nbsp;COMMIT; -- thành -1 !")],
        ],
        [CONTENT_W*0.5, CONTENT_W*0.5]))
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        "Cả hai cùng đọc thấy 'còn 1' rồi cùng trừ → bán ra 2 chiếc, kho thành -1. Đây chính là nguồn "
        "gốc của tồn kho âm (Câu 12) và bán vượt kho (Câu 20). Hai cách chặn:", st_body))
    story.append(Spacer(1, 4))
    story.append(code_box(
        "-- Cách 1: UPDATE có điều kiện (nguyên tử) — chỉ trừ khi còn hàng\n"
        "UPDATE Products SET stock = stock - 1\n"
        "WHERE  product_id = 'PROD_004' AND stock >= 1;\n"
        "-- Nếu ROW_COUNT() = 0 → đã hết hàng, từ chối đơn\n"
        "\n"
        "-- Cách 2: khoá bi quan — đọc kèm khoá, phiên kia phải CHỜ\n"
        "SELECT stock FROM Products WHERE product_id = 'PROD_004' FOR UPDATE;"))
    story.append(Paragraph(
        "Cách test: mở hai phiên và xen kẽ như bảng trên. Nếu hệ thống cho bán nhiều hơn tồn → bug. "
        "Lưu ý: race chỉ lộ khi chạy đồng thời — thao tác tuần tự một người gần như không bao giờ thấy.",
        st_small))
    story.append(Spacer(1, 8))

    # C. Mức cô lập
    story.append(keep(
        Paragraph("Mức cô lập (isolation level) — phiên này thấy gì của phiên kia",
            S("th2c", parent=st_label, textColor=NAVY, fontSize=11, spaceBefore=4, spaceAfter=2)),
        Spacer(1, 4),
        Paragraph(
            "Mức cô lập quyết định một transaction 'nhìn thấy' dữ liệu của transaction khác ra sao. Ba hiện "
            "tượng cần biết và mức chặn được:", st_body)))
    story.append(Spacer(1, 4))
    story.append(ref_table(
        ["Hiện tượng", "Là gì", "Chặn được từ mức"],
        [
            ["Dirty read", "Đọc trúng dữ liệu phiên khác CHƯA commit (có thể bị rollback sau đó)", "READ COMMITTED"],
            ["Non-repeatable read", "Đọc cùng một dòng hai lần ra hai giá trị (phiên khác sửa + commit xen giữa)", "REPEATABLE READ"],
            ["Phantom read", "Đọc cùng điều kiện hai lần ra số dòng khác (phiên khác thêm/xóa dòng)", "SERIALIZABLE"],
        ],
        [CONTENT_W*0.24, CONTENT_W*0.52, CONTENT_W*0.24]))
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        "MySQL (InnoDB) mặc định <b>REPEATABLE READ</b>. Xem mức hiện tại bằng "
        "<b>SELECT @@transaction_isolation;</b>. Với luồng nhạy cảm (trừ kho, thanh toán), QA nên xác nhận "
        "đội dev dùng đúng mức cô lập hoặc khoá phù hợp.", st_small))
    story.append(Spacer(1, 8))
    story.append(color_box("GÓC SOI LỖI CỦA TESTER",
        [li("Chỉ test luồng thành công, quên luồng lỗi giữa chừng → bỏ sót bug nguyên tử (cập nhật nửa vời)."),
         li("App không bọc nhiều bước trong một transaction → lỗi nửa chừng để lại dữ liệu rác."),
         li("Thiếu khóa hoặc điều kiện nguyên tử → oversell, double-charge khi tải cao — <b>chỉ lộ lúc nhiều người</b>, không lộ khi test tay một mình."),
         li("Deadlock dưới tải → giao dịch fail ngẫu nhiên, khó tái hiện nếu không stress test."),
        ],
        LGREEN, GREEN, colors.HexColor("#047857")))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "Bug đồng thời là loại 'ẩn' nhất: không thấy bằng thao tác tuần tự, chỉ lộ khi hai phiên chạy "
        "song song hoặc khi stress test. Sau mỗi lượt thử, chạy lại <b>ecommerce_test_setup.sql</b> để "
        "đưa dữ liệu về mốc gốc.", st_small))

    # ---- Chương: Chạy SQL an toàn trên production ----
    story.append(NextPageTemplate("body"))
    story.append(PageBreak())
    story.append(Paragraph("Chạy SQL an toàn trên production", st_h1))
    story.append(HRule(CONTENT_W, BLUE, 1.5))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "Các câu lệnh trong sách đều là SELECT — chỉ đọc, không sửa. Nhưng khi chạy trên cơ sở dữ liệu "
        "thật đang phục vụ người dùng, ngay cả một câu SELECT viết ẩu cũng có thể làm chậm cả hệ thống. "
        "Phần này là những nguyên tắc tối thiểu để không gây hại.", st_lead))
    story.append(Spacer(1, 8))
    story.append(Paragraph("Nguyên tắc vàng khi chạm vào dữ liệu thật",
        S("sh2a", parent=st_label, textColor=NAVY, fontSize=11, spaceBefore=4, spaceAfter=2,
          keepWithNext=True)))
    story.append(Spacer(1, 3))
    for t in [
        "Ưu tiên chạy trên <b>replica / bản sao chỉ đọc</b>, không phải database chính đang phục vụ giao dịch.",
        "Dùng <b>tài khoản chỉ-đọc</b> (read-only) để không thể vô tình UPDATE hay DELETE.",
        "Luôn thêm <b>LIMIT</b> khi thăm dò — đừng SELECT toàn bộ một bảng hàng triệu dòng.",
        "Tránh giờ cao điểm; câu lệnh nặng (JOIN lớn, thiếu index) có thể khóa bảng và làm chậm hệ thống.",
        "Nếu buộc phải sửa: chạy <b>SELECT với đúng WHERE trước</b>, xem kết quả, rồi mới đổi thành "
        "UPDATE/DELETE; bọc trong transaction để còn ROLLBACK nếu sai.",
    ]:
        story.append(li(t))
    story.append(Spacer(1, 8))
    story.append(keep(
        Paragraph("Đọc EXPLAIN — câu lệnh của bạn có 'quét cả bảng' không?",
            S("sh2b", parent=st_label, textColor=NAVY, fontSize=11, spaceBefore=4, spaceAfter=2)),
        Spacer(1, 3),
        Paragraph(
            "Đặt <b>EXPLAIN</b> trước câu SELECT, MySQL sẽ cho biết kế hoạch thực thi mà không thật sự chạy "
            "nó — cách kiểm tra một truy vấn có hiệu quả không trước khi chạy trên dữ liệu lớn.", st_body)))
    story.append(Spacer(1, 4))
    story.append(code_box(
        "EXPLAIN\n"
        "SELECT email, COUNT(*)\n"
        "FROM   Customers\n"
        "GROUP  BY email\n"
        "HAVING COUNT(*) > 1;"))
    story.append(Spacer(1, 6))
    explain_rows = [
        ["type", "Cách truy cập bảng",
         "<b>ALL</b> = quét toàn bảng (đáng lo trên bảng lớn). <b>ref / eq_ref / range</b> = đang dùng index (tốt)."],
        ["key", "Index đang được dùng",
         "NULL nghĩa là KHÔNG dùng index nào — thường đi kèm type = ALL."],
        ["rows", "Số dòng ước tính phải đọc",
         "Càng lớn càng nặng. Đối chiếu với tổng số dòng bảng để biết có quét gần hết không."],
        ["Extra", "Ghi chú thêm",
         "<b>Using filesort</b> / <b>Using temporary</b> = phải sắp xếp hoặc tạo bảng tạm — dấu hiệu cần tối ưu."],
    ]
    story.append(ref_table(["Cột", "Ý nghĩa", "Cần lo khi nào"],
        explain_rows, [CONTENT_W*0.13, CONTENT_W*0.30, CONTENT_W*0.57]))
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        "Với bộ dữ liệu mẫu nhỏ trong sách, type = ALL hoàn toàn vô hại. Nhưng nếu bảng Customers có 10 "
        "triệu dòng, câu tìm email trùng cần một index trên cột email — nếu không, mỗi lần chạy là một "
        "lần quét 10 triệu dòng.", st_small))
    story.append(Spacer(1, 8))
    story.append(keep(
        Paragraph("Khác biệt dialect — khi đổi sang PostgreSQL hay SQL Server",
            S("sh2c", parent=st_label, textColor=NAVY, fontSize=11, spaceBefore=4, spaceAfter=2)),
        Spacer(1, 3),
        Paragraph(
            "Sách dùng cú pháp MySQL. Phần lớn câu lệnh chạy nguyên vẹn trên hệ khác, nhưng vài chỗ khác nhau:",
            st_body)))
    story.append(Spacer(1, 4))
    dialect_rows = [
        ["Giới hạn số dòng", ("mono", "LIMIT 10"), ("mono", "LIMIT 10"), ("mono", "TOP 10")],
        ["So khớp biểu thức", ("mono", "x REGEXP '..'"), ("mono", "x ~ '..'"), ("mono", "LIKE/PATINDEX")],
        ["Thay NULL", ("mono", "IFNULL(x,0)"), ("mono", "COALESCE(x,0)"), ("mono", "ISNULL(x,0)")],
        ["Nối chuỗi", ("mono", "CONCAT(a,b)"), ("mono", "a || b"), ("mono", "a + b")],
        ["Phân biệt hoa/thường", "Thường KHÔNG", "CÓ (mặc định)", "Theo collation"],
    ]
    story.append(ref_table(["Việc cần làm", "MySQL", "PostgreSQL", "SQL Server"],
        dialect_rows, [CONTENT_W*0.26, CONTENT_W*0.25, CONTENT_W*0.25, CONTENT_W*0.24]))
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        "Window function (ROW_NUMBER, RANK, SUM OVER) và CTE (WITH) đều được hỗ trợ trên cả ba hệ — "
        "MySQL từ 8.0, PostgreSQL từ 9.4, SQL Server từ 2012.", st_small))

    # ---- PHỤ LỤC: Tra cứu nhanh ----
    def apx_h2(t):
        return Paragraph(t, S("apxh2", parent=st_label, textColor=NAVY,
                              fontSize=12, leading=15, spaceBefore=8, spaceAfter=2,
                              keepWithNext=True))

    story.append(NextPageTemplate("body"))
    story.append(PageBreak())
    story.append(Spacer(1, 30))
    apx_head = Table([[Paragraph("PHỤ LỤC  —  Tra cứu nhanh", st_part)]],
                     colWidths=[CONTENT_W])
    apx_head.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), NAVY),
        ("LEFTPADDING", (0,0), (-1,-1), 16),
        ("RIGHTPADDING", (0,0), (-1,-1), 16),
        ("TOPPADDING", (0,0), (-1,-1), 16),
        ("BOTTOMPADDING", (0,0), (-1,-1), 16),
    ]))
    story.append(apx_head)
    story.append(Spacer(1, 10))
    story.append(Paragraph(
        "Ba bảng tra để dùng cuốn sách như công cụ hằng ngày: từ một triệu chứng nghi ngờ "
        "tìm ngay câu lệnh phù hợp, tra nhanh cú pháp lõi, và bản đồ nối từng lỗi mẫu "
        "với các câu phát hiện nó.", st_lead))

    # A · Triệu chứng → câu lệnh
    story.append(apx_h2("A · Gặp triệu chứng này → dùng câu nào"))
    story.append(HRule(CONTENT_W, BLUE, 1.2))
    story.append(Spacer(1, 6))
    rows_A = [
        ["Bản ghi nhân đôi (cùng giá trị hoặc cùng khóa)", "Câu 1, 2, 8, 29, 46"],
        ["Ô bắt buộc bị bỏ trống (NULL hoặc chuỗi rỗng)", "Câu 3, 7, 12, 14"],
        ["Khóa ngoại trỏ vào bản ghi không tồn tại (orphan)", "Câu 5"],
        ["Chuỗi bẩn: khoảng trắng thừa, ký tự lạ, hoa/thường", "Câu 4, 6, 31, 35"],
        ["Email sai định dạng cơ bản", "Câu 32"],
        ["Giá trị ngoài danh sách cho phép (ENUM)", "Câu 9"],
        ["Tồn kho âm hoặc bán vượt tồn kho", "Câu 12, 20, 28"],
        ["Giá hoặc tiền âm / bằng 0", "Câu 14"],
        ["Ràng buộc DB chưa được enforce (thiếu UNIQUE/FK)", "Câu 18"],
        ["Schema lạ, chưa có tài liệu", "Câu 13"],
        ["Lệch giữa tổng header và tổng chi tiết", "Câu 11, 21, 38, 39"],
        ["Đơn hàng rỗng (không có dòng chi tiết)", "Câu 15, 38"],
        ["Số lượng hoặc ngày tháng bất thường", "Câu 30, 33, 34"],
        ["Giá bán lịch sử khác giá niêm yết hiện tại", "Câu 24"],
        ["Sản phẩm / khách hàng chưa phát sinh giao dịch", "Câu 16, 17"],
        ["Bản ghi bị xóa để lại dấu vết (gap ID, xóa mềm)", "Câu 10, 40, 41, 44"],
        ["Định giá tồn kho / báo cáo tổng hợp / phân bố", "Câu 19, 23, 25, 26, 27, 45"],
        ["Xếp hạng hoặc đánh số bản ghi theo nhóm", "Câu 22, 46, 47, 48, 49"],
        ["Đơn tồn đọng lâu hoặc dòng thời gian bất thường", "Câu 42, 43"],
        ["Health check nhanh nhiều loại lỗi cùng lúc", "Câu 50"],
    ]
    story.append(ref_table(
        ["Triệu chứng / nghi vấn khi kiểm thử", "Câu nên dùng"],
        rows_A, [CONTENT_W*0.70, CONTENT_W*0.30]))

    # B · Cheat sheet cú pháp
    story.append(apx_h2("B · Cheat sheet cú pháp lõi"))
    story.append(HRule(CONTENT_W, BLUE, 1.2))
    story.append(Spacer(1, 6))
    rows_B = [
        ["Tìm bản ghi trùng", ("mono", "GROUP BY cot<br/>HAVING COUNT(*) &gt; 1"), "1, 2, 8, 29"],
        ["Tìm mồ côi — an toàn với NULL", ("mono", "WHERE NOT EXISTS (<br/>&nbsp;&nbsp;SELECT 1 FROM b<br/>&nbsp;&nbsp;WHERE b.fk = a.id)"), "BT 5.1, 5.2"],
        ["Tìm mồ côi — viết ngắn", ("mono", "LEFT JOIN b ON ...<br/>WHERE b.id IS NULL"), "5, 16, 17"],
        ["Bẫy cần tránh", ("mono", "NOT IN (subquery<br/>có NULL) → luôn rỗng"), "9"],
        ["Xử lý NULL khi tính toán", ("mono", "COALESCE(x, 0)"), "28"],
        ["Chuẩn hóa chuỗi trước khi so", ("mono", "TRIM(x), LOWER(x)"), "4, 6, 35"],
        ["Kiểm tra định dạng chuỗi", ("mono", "x REGEXP 'mau'"), "31, 32"],
        ["Đếm có điều kiện", ("mono", "SUM(CASE WHEN ...<br/>&nbsp;&nbsp;THEN 1 ELSE 0 END)"), "7"],
        ["Tính phần trăm / tỷ lệ", ("mono", "COUNT(*) * 100.0 /<br/>(SELECT COUNT(*) ...)"), "26"],
        ["Đánh số thứ tự trong nhóm", ("mono", "ROW_NUMBER() OVER (<br/>&nbsp;&nbsp;PARTITION BY g<br/>&nbsp;&nbsp;ORDER BY c)"), "46"],
        ["Xếp hạng (cho phép đồng hạng)", ("mono", "RANK() / DENSE_RANK()<br/>OVER (ORDER BY c)"), "22, 47"],
        ["Cộng dồn theo thời gian", ("mono", "SUM(x) OVER (<br/>&nbsp;&nbsp;ORDER BY ngay)"), "49"],
        ["Tái dùng kết quả trung gian", ("mono", "WITH cte AS (...)<br/>SELECT ... FROM cte"), "47, 48"],
        ["Ghép nhiều báo cáo theo cột dọc", ("mono", "SELECT ... UNION ALL<br/>SELECT ..."), "40, 50"],
        ["Ngưỡng động tính từ chính bảng", ("mono", "WHERE x &gt; (SELECT<br/>&nbsp;&nbsp;AVG(x)*k FROM t)"), "30, 39, 48"],
    ]
    story.append(ref_table(
        ["Mục tiêu", "Cú pháp lõi", "Câu mẫu"],
        rows_B, [CONTENT_W*0.32, CONTENT_W*0.48, CONTENT_W*0.20]))

    # C · Bản đồ bug → câu phát hiện
    story.append(apx_h2("C · Bản đồ 15 lỗi mẫu → câu phát hiện"))
    story.append(HRule(CONTENT_W, BLUE, 1.2))
    story.append(Spacer(1, 6))
    rows_C = [
        ["Bug-A", "ORD_001: total 32M nhưng items cộng 62M (item trùng)", "2, 11, 39, 46"],
        ["Bug-B", "ORD_002: total 20M nhưng items cộng 31M", "11, 19, 39"],
        ["Bug-C", "PROD_003: stock = -5 (tồn kho âm)", "12, 20, 28"],
        ["Bug-D", "C004/C005: trùng email trung_email@email.com", "1, 36, 50"],
        ["Bug-E", "C001/C009: trùng email khác hoa/thường", "6, 37, 50"],
        ["Bug-F", "C006: email NULL; C007: email rỗng", "3, 7, 32"],
        ["Bug-G", "C008: khoảng trắng thừa trong tên", "4"],
        ["Bug-H", "C010: membership_tier = VIP (ngoài danh sách)", "9, 36"],
        ["Bug-I", "ORD_004: customer_id C999 (orphan) + đơn rỗng", "5, 15, 38, 42, 50"],
        ["Bug-J", "ORD_001/PROD_001: trùng (item 1 và 7)", "2, 46"],
        ["Bug-K", "item_id = 3 bị thiếu (gap chuỗi ID)", "44"],
        ["Bug-L", "PROD_005: trùng tên + giá với PROD_002", "8, 35"],
        ["Bug-M", "PROD_006 price NULL; PROD_007 stock NULL", "7, 12, 14"],
        ["Bug-N", "ORD_005: xóa mềm nhưng item 8,9 chưa dọn, đơn vẫn bị tính", "10, 40"],
        ["Bug-O", "ORD_003: đã CANCELLED nhưng chưa xóa mềm (deleted_at NULL)", "41"],
    ]
    story.append(ref_table(
        ["Mã", "Lỗi cài sẵn trong dữ liệu mẫu", "Câu phát hiện"],
        rows_C, [CONTENT_W*0.12, CONTENT_W*0.60, CONTENT_W*0.28]))

    # D · Đáp án bài tập tự luyện
    story.append(PageBreak())
    story.append(apx_h2("D · Đáp án bài tập tự luyện"))
    story.append(HRule(CONTENT_W, BLUE, 1.2))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "Lời giải dưới đây chỉ là MỘT cách viết đúng — cách của bạn có thể khác mà vẫn cho "
        "cùng kết quả. Đáp án được kiểm chứng trên bộ dữ liệu mẫu nhỏ trong sách.", st_small))
    story.append(Spacer(1, 4))
    cur_part = None
    for ex in EXERCISES:
        if ex["part"] != cur_part:
            cur_part = ex["part"]
            story.append(Paragraph(
                PARTS[cur_part][0] + " · " + PARTS[cur_part][1],
                S("exdp", parent=st_label, textColor=NAVY, fontSize=10.5,
                  spaceBefore=10, spaceAfter=2)))
        block = [
            Paragraph(f"<b>Bài {ex['code']}.</b>&nbsp; {ex['prompt']}",
                      S("exdq", parent=st_body, fontSize=9.8, spaceAfter=3)),
            code_box(ex["sql"]),
            Spacer(1, 3),
            color_box("ĐÁP ÁN", ex["answer"], LGREEN, GREEN,
                      colors.HexColor("#047857")),
            Spacer(1, 9),
        ]
        story.append(KeepTogether(block))

    # E · Tra cứu theo module nghiệp vụ
    story.append(PageBreak())
    story.append(apx_h2("E · Tra cứu theo module nghiệp vụ"))
    story.append(HRule(CONTENT_W, BLUE, 1.2))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "Phụ lục A tra theo <b>triệu chứng</b>; phụ lục này tra theo <b>module bạn đang test</b> "
        "— sát với cách một QA thực tế làm việc hằng ngày hơn cách đọc tuần tự 6 phần. "
        "Đang test tính năng nào, tra đúng hàng tương ứng để biết ngay nên tham khảo câu nào.",
        st_body))
    story.append(Spacer(1, 6))
    rows_E = [
        ["Customers (hồ sơ khách hàng)", "1, 3, 4, 6, 9, 31, 32, 36, 37"],
        ["Products (danh mục sản phẩm)", "7, 8, 12, 14, 23, 35"],
        ["Orders (đơn hàng)", "10, 26, 29, 30, 34, 41, 42, 43, 49"],
        ["Order_Items (chi tiết đơn hàng)", "2, 21, 33, 44, 46"],
        ["Customers + Orders (khách hàng & lịch sử mua)", "5, 17, 19, 25, 45, 48"],
        ["Orders + Order_Items (đơn hàng & chi tiết)", "11, 15, 38, 39, 40"],
        ["Products + Order_Items (sản phẩm & doanh số bán)", "16, 20, 22, 24, 27, 28, 47"],
        ["Đa bảng / báo cáo tổng hợp (3 bảng trở lên)", "50"],
        ["Schema hệ thống (information_schema)", "13, 18"],
    ]
    story.append(ref_table(
        ["Module / bảng dữ liệu chính", "Câu nên tham khảo"],
        rows_E, [CONTENT_W*0.62, CONTENT_W*0.38]))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "Cách đọc bảng: mỗi hàng liệt kê đúng bảng (hoặc tổ hợp bảng) mà câu lệnh thực sự "
        "JOIN/FROM — lấy trực tiếp từ chính SQL trong sách, không suy đoán theo chủ đề. "
        "Một số câu xuất hiện ở nhiều hàng nếu vừa truy vấn 1 bảng riêng vừa có biến thể "
        "JOIN sang bảng khác.<br/>"
        "Trên dự án thật, schema thường có hàng chục–hàng trăm bảng — bảng tra này chỉ là "
        "ví dụ thu nhỏ. Cách áp dụng: khi vào một module mới, dùng Câu 13 (INFORMATION_SCHEMA) "
        "để tự liệt kê bảng/cột, sau đó map mỗi bảng nghiệp vụ với khuôn mẫu SQL gần nhất "
        "trong 50 câu — đó chính là Bước 3-4 của phương pháp 5 bước áp dụng cho module cụ thể.",
        st_small))

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
        "Biên soạn bởi maiqai.com",
        S("end", parent=st_small, alignment=TA_CENTER)))

    doc.build(story)
    return out_path

if __name__ == "__main__":
    path = build()
    print("Done:", path)
