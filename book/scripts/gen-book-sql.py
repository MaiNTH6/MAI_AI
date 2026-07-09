# -*- coding: utf-8 -*-
"""
Sinh ebook PDF: "Cẩm nang 50 câu lệnh SQL săn Bug thực chiến cho QA"
- Font Liberation Sans + Liberation Mono (giấy phép SIL OFL, nhúng kèm repo ở scripts/fonts/;
  metric tương thích Arial/Courier, hỗ trợ tiếng Việt đầy đủ)
- Bìa, mục lục, 6 chương, 50 câu lệnh chi tiết
Chạy: python book/scripts/gen-book-sql.py
Xuất ra: book/dist/cam-nang-50-cau-lenh-sql-san-bug.pdf
"""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY, TA_RIGHT
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
# Font nhúng kèm repo (SIL OFL) — KHÔNG dùng font hệ thống để sách bán ra sạch bản quyền.
# Alias nội bộ giữ nguyên tên "Arial"/"Mono" để không phải sửa ~100 chỗ tham chiếu style;
# file thật nhúng vào PDF là Liberation Sans/Mono (xem scripts/fonts/LICENSE-Liberation.txt).
FD = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts")
pdfmetrics.registerFont(TTFont("Arial", f"{FD}/LiberationSans-Regular.ttf"))
pdfmetrics.registerFont(TTFont("Arial-Bold", f"{FD}/LiberationSans-Bold.ttf"))
pdfmetrics.registerFont(TTFont("Arial-Italic", f"{FD}/LiberationSans-Italic.ttf"))
pdfmetrics.registerFont(TTFont("Arial-BoldItalic", f"{FD}/LiberationSans-BoldItalic.ttf"))
pdfmetrics.registerFont(TTFont("Mono", f"{FD}/LiberationMono-Regular.ttf"))
pdfmetrics.registerFont(TTFont("Mono-Bold", f"{FD}/LiberationMono-Bold.ttf"))
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
        ("19",    "Bug cài sẵn"),
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
        "Phần chuẩn bị: script tạo DB, sơ đồ ER, dữ liệu mẫu với 19 bug cố ý cài cắm để thực hành",
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

# ----------------------------------------------------------------------------
# Số trang cho mục lục: build 2 lần — lần 1 ghi nhận trang, lần 2 in vào TOC
# ----------------------------------------------------------------------------
PAGE_MAP = {}

class PageMarker(Flowable):
    """Flowable vô hình: ghi số trang hiện tại vào PAGE_MAP khi được vẽ."""
    def __init__(self, key):
        Flowable.__init__(self)
        self.key = key
        self.width = 0
        self.height = 0
    def draw(self):
        PAGE_MAP[self.key] = self.canv.getPageNumber()

def toc_line(text, key, style):
    pg = PAGE_MAP.get(key, "")
    row = Table([[Paragraph(text, style),
                  Paragraph(str(pg), S(f"tocpg_{key}", parent=style,
                            fontName="Arial", alignment=TA_RIGHT))]],
                colWidths=[CONTENT_W - 34, 34])
    row.setStyle(TableStyle([
        ("LEFTPADDING",  (0,0), (-1,-1), 0),
        ("RIGHTPADDING", (0,0), (-1,-1), 0),
        ("TOPPADDING",   (0,0), (-1,-1), 0),
        ("BOTTOMPADDING",(0,0), (-1,-1), 0),
        ("VALIGN",       (0,0), (-1,-1), "BOTTOM"),
    ]))
    return row

def build():
    out_dir = os.path.join(os.path.dirname(__file__), "..", "dist")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.abspath(os.path.join(out_dir,
               "cam-nang-50-cau-lenh-sql-san-bug.pdf"))
    _build_pass(out_path)   # lần 1: điền PAGE_MAP
    _build_pass(out_path)   # lần 2: mục lục có số trang
    return out_path

def _build_pass(out_path):
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
        "<b>Tình huống</b> — bối cảnh nghiệp vụ đặt ra câu lệnh: vì sao QA cần đến nó.",
        "<b>Dữ liệu trước query</b> — bảng mẫu cho thấy trạng thái dữ liệu; dòng tô đỏ là dòng lỗi "
        "hoặc dòng trọng tâm của câu lệnh. Bảng có thể chỉ trích các dòng liên quan cho gọn.",
        "<b>Câu lệnh SQL</b> — sẵn sàng copy, viết theo dialect MySQL.",
        "<b>Phân tích từng mệnh đề</b> — mỗi từ khóa SQL được giải thích riêng.",
        "<b>Giải thích tổng thể</b> — ý nghĩa và bài học rút ra từ cả câu lệnh.",
        "<b>Kết quả sau query</b> — bảng output sau khi chạy lệnh trên dữ liệu mẫu.",
        "<b>Góc soi lỗi của Tester</b> — cạm bẫy, hiểu lầm và bước tiếp theo.",
    ]:
        story.append(li(t))
    story.append(Spacer(1, 6))
    story.append(color_box("ĐỌC TRƯỚC KHI CHẠY",
        "Mọi câu lệnh trong sách đều là truy vấn ĐỌC (SELECT) — không sửa, không xóa dữ liệu. "
        "Dù vậy, hãy luôn chạy trên bản sao test/staging. Tên bảng/cột dùng "
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
    def toc_b(text, key):
        story.append(Spacer(1, 6))
        story.append(toc_line(text, key, st_toc_b))

    toc_b("CHUẨN BỊ · Môi trường thực hành", "chuanbi")
    toc_b("PHƯƠNG PHÁP · Dịch yêu cầu thành câu lệnh săn bug", "phuongphap")
    for pi, (code, name, *_) in enumerate(PARTS):
        toc_b(f"{code} · {name}", f"part{pi}")
        for e in ENTRIES:
            if e["part"] == pi:
                story.append(toc_line(
                    f"<b>{e['id']:02d}.</b>&nbsp;&nbsp;{e['title']}",
                    f"cau{e['id']}", st_toc))
    toc_b("CASE STUDY · Một ngày điều tra dữ liệu của QA", "casestudy")
    toc_b("KIỂM THỬ GHI DỮ LIỆU · Hành động trên app → xác minh DB", "ghidulieu")
    toc_b("CHẠY SQL AN TOÀN TRÊN PRODUCTION", "production")
    toc_b("PHỤ LỤC · Tra cứu nhanh", "apxA")
    for key, t in [("apxA", "A · Cheat sheet cú pháp lõi"),
                   ("apxB", "B · Đáp án bài tập tự luyện"),
                   ("apxC", "C · Giải thích thuật ngữ")]:
        story.append(toc_line(f"&nbsp;&nbsp;&nbsp;{t}", key, st_toc))

    # ---- CHƯƠNG 0: Setup database ----
    story.append(PageBreak())
    story.append(PageMarker("chuanbi"))
    story.append(Paragraph("Chuẩn bị môi trường thực hành", st_h1))
    story.append(HRule(CONTENT_W, BLUE, 1.5))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "Tất cả 50 câu lệnh trong sách đều chạy được ngay trên cơ sở dữ liệu "
        "<b>ecommerce_test</b> dưới đây. Hệ thống mô phỏng một sàn thương mại điện "
        "tử nhỏ gồm 4 bảng, với <b>19 bug được cố ý cài cắm</b> để bạn thực hành phát hiện.",
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
        Paragraph("Script tạo Database",
            S("h2", parent=st_label, textColor=NAVY, fontSize=10.5, spaceBefore=4)),
        Spacer(1, 4),
        Paragraph(
            "Thay vì copy-paste thủ công, hãy tải file SQL sẵn có và chạy một lần duy nhất "
            "— database <b>ecommerce_test</b> cùng toàn bộ dữ liệu mẫu sẽ được tạo tự động.",
            st_body)))
    story.append(Spacer(1, 8))
    dl_data = [[Paragraph(
        '<b>Tải file:</b>  <a href="https://maiqai.com/books/ecommerce_test_setup.sql" color="#1a56db">maiqai.com/books/ecommerce_test_setup.sql</a>',
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
    story.append(Spacer(1, 6))
    story.append(color_box("PHIÊN BẢN MYSQL",
        "Khuyến nghị <b>MySQL 8.0 trở lên</b>. Câu 1-45 chạy được trên MySQL 5.7, "
        "nhưng PHẦN 6 (Câu 46-50) dùng window function và CTE — hai tính năng chỉ có "
        "từ MySQL 8.0. Kiểm tra phiên bản đang dùng: "
        "<font face='Mono' size='8.5'>SELECT VERSION();</font>",
        LAMBER, AMBER, colors.HexColor("#b45309")))
    story.append(Spacer(1, 8))

    # Bug annotation boxes
    story.append(keep(
        Paragraph("Lỗi đã cài sẵn trong dữ liệu mẫu",
            S("h2", parent=st_label, textColor=NAVY, fontSize=10.5, spaceBefore=4)),
        Spacer(1, 4),
        Paragraph(
            "Data mẫu chứa <b>19 lỗi cố ý</b> (đánh mã Bug-A → Bug-S) cài sẵn để bạn bắt bằng SQL, gom theo sáu nhóm dưới đây. "
            "Mọi câu lệnh trong sách đều trả về ít nhất một kết quả bất thường — bạn luôn có thứ để kiểm tra. "
            "Bản đồ đầy đủ từng lỗi ↔ câu phát hiện nằm ở phần chú thích đầu file <b>ecommerce_test_setup.sql</b>.",
            st_body)))
    story.append(Spacer(1, 6))
    bug_groups = [
        ("Trùng lặp & toàn vẹn dữ liệu",
         "Email trùng tuyệt đối (C004/C005), tổ hợp khóa trùng trong Order_Items (item 1 và 7), "
         "email trùng không phân biệt hoa/thường (C001/C009), tên sản phẩm trùng hoàn toàn (PROD_002/PROD_005).<br/>"
         "ORD_006 trùng hoàn toàn với ORD_003 (cùng khách hàng, tổng tiền, ngày đặt — đơn nhân đôi)."),
        ("NULL & dữ liệu thiếu",
         "C006: email = NULL.<br/>"
         "C007: email = chuỗi rỗng.<br/>"
         "PROD_006: price = NULL.<br/>"
         "PROD_007: stock = NULL."),
        ("Định dạng không hợp lệ",
         "C008: customer_name có khoảng trắng thừa ở đầu và cuối ('  Pham Van D  ').<br/>"
         "C010: membership_tier = 'VIP' — ngoài danh sách Standard/Silver/Gold/Platinum."),
        ("Mồ côi & ràng buộc tham chiếu",
         "ORD_004: customer_id = 'C999' không tồn tại trong bảng Customers — đồng thời là đơn không có dòng item nào."),
        ("Giá trị nghiệp vụ sai & lệch số",
         "item_id bỏ trống số 3 — gap trong chuỗi ID liên tục.<br/>"
         "PROD_003: stock = -5 (tồn kho âm).<br/>"
         "ORD_001: total_amount = 32.000.000 nhưng Order_Items cộng = 62.000.000 (do item trùng).<br/>"
         "ORD_002: total_amount = 20.000.000 nhưng Order_Items cộng = 31.000.000 (lệch 11.000.000).<br/>"
         "ORD_007: order_date = 2027-01-01 (ngày đặt hàng trong tương lai).<br/>"
         "Item 12: quantity = 0 (số lượng biên dưới không hợp lệ).<br/>"
         "Item 12: price = 1.500.000 nhưng PROD_002 niêm yết 2.000.000 (giá ghi sai vào đơn hàng)."),
        ("Audit, xóa mềm & dấu vết",
         "ORD_005: đã xóa mềm (deleted_at có giá trị) nhưng item 8, 9 chưa được dọn và đơn vẫn lọt vào tính toán.<br/>"
         "ORD_003: đã CANCELLED nhưng deleted_at vẫn trống — hai cột dấu vết lệch nhau."),
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
        S("lbl_cu", parent=st_label, keepWithNext=True)))
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
        "Bảng Products (8 dòng — dòng đỏ: stock âm, NULL, tên trùng)",
        S("lbl_pr", parent=st_label, keepWithNext=True)))
    # col widths: product_id=58 | product_name=175 | category=75 | price=95 | stock=90 = 493
    story.append(before_tbl(
        ["product_id","product_name","category","price","stock"],
        [["PROD_001","iPhone 15 Pro Max","Dien thoai","30.000.000","50"],
         ["PROD_002","Ban phim co Logitech","Phu kien","2.000.000","100"],
         ["PROD_003","Tai nghe Sony WH-1000XM5","Phu kien","8.000.000","-5"],
         ["PROD_004","Sac du phong Anker","Phu kien","1.000.000","20"],
         ["PROD_005","Ban phim co Logitech","Phu kien","2.000.000","30"],
         ["PROD_006","Loa Bluetooth JBL","Phu kien","(NULL)","10"],
         ["PROD_007","Chuot gaming Razer","Phu kien","1.500.000","(NULL)"],
         ["PROD_008","ban phim co logitech","Phu kien","2.000.000","25"]],
        bugs=[2,4,5,6,7],
        col_widths=[58, 175, 75, 95, 90]))
    story.append(Spacer(1, 8))

    story.append(Paragraph(
        "Bảng Orders (7 dòng — dòng đỏ: total_amount sai, khách hàng mồ côi, xóa mềm, đơn nhân đôi, ngày tương lai)",
        S("lbl_or", parent=st_label, keepWithNext=True)))
    # col widths: order_id=65 | customer_id=72 | total_amount=88 | status=80 | order_date=75 | deleted_at=113 = 493
    story.append(before_tbl(
        ["order_id","customer_id","total_amount","status","order_date","deleted_at"],
        [["ORD_001","C001","32.000.000","COMPLETED","2026-06-20","(NULL)"],
         ["ORD_002","C002","20.000.000","COMPLETED","2026-06-22","(NULL)"],
         ["ORD_003","C003","8.000.000","CANCELLED","2026-06-23","(NULL)"],
         ["ORD_004","C999","5.000.000","PENDING","2026-06-24","(NULL)"],
         ["ORD_005","C001","15.000.000","CANCELLED","2026-06-25","2026-06-25 10:30:00"],
         ["ORD_006","C003","8.000.000","PENDING","2026-06-23","(NULL)"],
         ["ORD_007","C001","20.000.000","PENDING","2027-01-01","(NULL)"]],
        bugs=[1,3,4,5,6],
        col_widths=[65, 72, 88, 80, 75, 113]))
    story.append(Spacer(1, 8))

    story.append(Paragraph(
        "Bảng Order_Items (11 dòng — dòng đỏ: tổ hợp khóa trùng; item_id=3 bỏ qua; qty=0; giá sai)",
        S("lbl_oi", parent=st_label, keepWithNext=True)))
    # col widths: item_id=52 | order_id=80 | product_id=95 | quantity=66 | price=200 = 493
    story.append(before_tbl(
        ["item_id","order_id","product_id","quantity","price"],
        [[1, "ORD_001","PROD_001", 1,"30.000.000"],
         [2, "ORD_001","PROD_002", 1, "2.000.000"],
         [4, "ORD_002","PROD_001", 1,"30.000.000"],
         [5, "ORD_002","PROD_004", 1, "1.000.000"],
         [6, "ORD_003","PROD_003", 1, "8.000.000"],
         [7, "ORD_001","PROD_001", 1,"30.000.000"],
         [8, "ORD_005","PROD_004", 1, "1.000.000"],
         [9, "ORD_005","PROD_002", 1, "2.000.000"],
         [12,"ORD_003","PROD_002", 0, "1.500.000"],
         [13,"ORD_006","PROD_003", 1, "8.000.000"],
         [14,"ORD_007","PROD_004",20, "1.000.000"]],
        bugs=[5, 8],
        col_widths=[52, 80, 95, 66, 200]))
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        "item_id nhảy từ 2 lên 4 (thiếu 3) và từ 9 lên 12 (thiếu 10, 11).<br/>"
        "Item 7 trùng (order_id, product_id) với item 1.<br/>"
        "ORD_002: tổng items = 31.000.000 nhưng total_amount = 20.000.000 (lệch 11.000.000).<br/>"
        "Item 8 và 9 thuộc ORD_005 — đơn đã xóa mềm nhưng dòng chi tiết vẫn còn.<br/>"
        "Item 12: quantity = 0 và price = 1.500.000 (PROD_002 niêm yết 2.000.000).",
        S("fn", parent=st_small, textColor=RED)))

    # ---- Chương phương pháp: Dịch yêu cầu → SQL ----
    story.append(NextPageTemplate("body"))
    story.append(PageBreak())
    story.append(PageMarker("phuongphap"))
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
         "• Nhiều bảng → cần JOIN hoặc truy vấn loại trừ (NOT EXISTS / NOT IN)<br/>"
         "• So sánh hai tổng → cần GROUP BY và hàm tổng hợp"),
        ("Bước 4 — Chọn khuôn mẫu SQL",
         "Mỗi loại bất biến ứng với một mẫu quen thuộc (tra nhanh ở Phụ lục A). "
         "<i>Lưu ý: các mẫu dưới đây tìm chỗ vi phạm — tức là nơi quy tắc bị phá vỡ, không phải nơi quy tắc đúng.</i><br/>"
         "• 'không được trùng' → GROUP BY ... HAVING COUNT(*) &gt; 1<br/>"
         "• 'phải tồn tại ở bảng kia' → NOT EXISTS "
         "<i>(quy tắc nói 'phải có', ta tìm chỗ 'không có' — nên dùng NOT EXISTS)</i><br/>"
         "• 'hai tổng phải bằng nhau' → JOIN + GROUP BY + HAVING so sánh<br/>"
         "• 'phải nằm trong danh sách' → NOT IN "
         "<i>(quy tắc nói 'phải nằm trong', ta tìm chỗ 'nằm ngoài' — nên dùng NOT IN)</i>"),
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
        "<b>Bước 2 — Câu hỏi vi phạm:</b> tìm email nào đang bị từ 2 tài khoản trở lên cùng sử dụng.<br/>"
        "<b>Bước 3 — Bảng/cột:</b> chỉ bảng Customers, cột email — một bảng nên không cần JOIN; "
        "so theo nhóm nên dùng GROUP BY.<br/>"
        "<b>Bước 4 — Khuôn mẫu:</b> 'không được trùng' → GROUP BY email HAVING COUNT(*) &gt; 1.<br/>"
        "<b>Bước 5 — Diễn giải:</b> kết quả ra 2 email trùng — "
        "trung_email@email.com (C004 và C005 trùng hoàn toàn) và "
        "a.nguyen@email.com (C001 và C009 trùng khác hoa/thường, do collation mặc định của MySQL không phân biệt case). "
        "Cả hai cặp cần điều tra.",
        st_body))
    story.append(Spacer(1, 4))
    story.append(code_box(
        "SELECT email,\n"
        "       COUNT(*) AS so_lan\n"
        "FROM   Customers\n"
        "GROUP  BY email\n"
        "HAVING COUNT(*) > 1;"))
    story.append(Spacer(1, 5))

    # ---- Parts & entries ----
    for pi, (code, name, intro, scope_note) in enumerate(PARTS):
        story.append(NextPageTemplate("body"))
        story.append(PageBreak())
        # Part banner
        banner = Table([[Paragraph(f"{code}", S("pc", fontName="Arial-Bold",
                        fontSize=13, textColor=colors.HexColor("#93c5fd"))),]],
                        colWidths=[CONTENT_W])
        story.append(PageMarker(f"part{pi}"))
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
        story.append(Spacer(1, 6))
        story.append(color_box("PHẠM VI", scope_note, LBLUE, BLUE, BLUE))
        story.append(Spacer(1, 4))

        for e in [x for x in ENTRIES if x["part"] == pi]:
            blocks = [PageMarker(f"cau{e['id']}")]
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
            blocks.append(Paragraph("CÂU LỆNH SQL",
                S("lbl_sql", parent=st_label, keepWithNext=True)))
            blocks.append(code_box(e["sql"]))
            # Clause-by-clause explanation
            if e.get("clauses"):
                blocks.append(Spacer(1, 5))
                blocks.append(Paragraph(
                    "PHÂN TÍCH TỪNG MỆNH ĐỀ SQL  "
                    "<font color='#64748b' size='8'>"
                    "(theo thứ tự MySQL thực thi — FROM chạy trước SELECT)</font>",
                    S("clbl", parent=st_label, textColor=BLUE, keepWithNext=True)))
                blocks.append(clause_tbl(e["clauses"]))
            blocks.append(Spacer(1, 6))
            blocks.append(Paragraph("Giải thích tổng thể", S("gt", parent=st_label,
                          textColor=NAVY)))
            blocks.append(Paragraph(e["explain"], st_body))
            if e.get("explain_table"):
                blocks.append(Spacer(1, 4))
                blocks.append(result_table(*e["explain_table"]))
            # Result (after query)
            blocks.append(Spacer(1, 4))
            blocks.append(Paragraph("Kết quả sau khi query (minh họa)", S("kq",
                          parent=st_label, textColor=NAVY, keepWithNext=True)))
            if e.get("result_table"):
                blocks.append(result_table(*e["result_table"]))
                blocks.append(Spacer(1, 3))
            if e.get("result_note"):
                blocks.append(Paragraph(e["result_note"], st_small))
            blocks.append(Spacer(1, 6))
            blocks.append(color_box("GÓC SOI LỖI CỦA TESTER", e["note"],
                          LGREEN, GREEN, colors.HexColor("#047857")))
            if e.get("fix_note"):
                blocks.append(Spacer(1, 4))
                blocks.append(color_box("GỢI Ý FIX", e["fix_note"],
                              LBLUE, BLUE, BLUE))
            blocks.append(Spacer(1, 14))
            # Keep header + situation together; let the rest flow
            story.append(KeepTogether(blocks[:5]))
            story.extend(blocks[5:])

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
                "→ Lời giải đầy đủ ở <b>Phụ lục B</b> (cuối sách). Hãy tự viết trước khi xem.",
                S("exr", parent=st_small, textColor=colors.HexColor("#6d28d9"),
                  spaceBefore=4)))
            story.append(Spacer(1, 10))
            story.append(color_box("", inner, LVIOLET, VIOLET, VIOLET))

    # ---- Case study: Một ngày điều tra của QA ----
    story.append(NextPageTemplate("body"))
    story.append(PageBreak())
    story.append(PageMarker("casestudy"))
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
        ("Bước 1 · Chụp toàn cảnh (Câu 21)",
         "Đếm số dòng items mỗi đơn để tìm đơn có số dòng bất thường.",
         "GROUP BY order_id → COUNT(*)",
         "<b>ORD_001 = 3 dòng</b> (các đơn khác chỉ 1–2) — một đơn 2 sản phẩm sao có 3 dòng?",
         "Biết có đơn bất thường, nhưng chưa rõ sản phẩm nào bị thổi số — xếp hạng doanh số để lộ nghi phạm."),
        ("Bước 2 · Định vị nghi phạm (Câu 22)",
         "Xếp hạng doanh số từng sản phẩm để xem cái nào cao bất thường.",
         "GROUP BY product_id → SUM(quantity*price), ORDER BY ... DESC",
         "<b>PROD_001 = 90M</b> = đúng 3 × 30 triệu, nhưng nghiệp vụ chỉ bán 2 lần → có 1 lần bán 'ảo'.",
         "Biết PROD_001 bị thổi, nhưng cái 'ảo' nằm ở dòng nào? — đánh số từng dòng để chỉ mặt bản trùng."),
        ("Bước 3 · Truy tới gốc (Câu 46)",
         "Đánh số các dòng trong cùng nhóm (order_id, product_id): dòng nào bị đánh số &gt; 1 là bản trùng.",
         "ROW_NUMBER() OVER (PARTITION BY order_id, product_id)",
         "Trong ORD_001/PROD_001: item 1 → 1, <b>item 7 → 2</b> — item 7 là bản sao của item 1. "
         "Đây chính là chiếc iPhone thứ ba 'ảo'.",
         "Đã chỉ mặt thủ phạm (item 7), giờ đo thiệt hại bằng tiền — đối soát tổng đơn."),
        ("Bước 4 · Đo đúng phần lệch (Câu 13)",
         "Đối soát tổng ghi trên đơn với tổng cộng từ từng dòng items.",
         "HAVING total_amount &lt;&gt; SUM(quantity*price)",
         "<b>ORD_001: ghi 32M nhưng items cộng 62M — lệch đúng 30 triệu</b>, khớp giá một iPhone đếm thừa.",
         "Biết một đơn lệch 30M, nhưng con số sai này đã lan tới báo cáo nào? — tổng theo danh mục xem phạm vi."),
        ("Bước 5 · Đánh giá phạm vi ảnh hưởng (Câu 27)",
         "Tổng doanh số theo danh mục để xem lỗi lan tới cấp báo cáo nào.",
         "GROUP BY category → SUM(quantity*price)",
         "<b>Dien thoai = 90M</b> thay vì 60M thực — báo cáo danh mục và toàn hệ thống đều bị thổi từ 1 dòng lỗi.",
         "Xong vụ chính; tiện lúc mở DB, quét luôn xem còn lỗi nào khác đang ẩn."),
        ("Bước 6 · Quét thêm lỗi khác (Câu 50)",
         "Việc chính đã xong. Trước khi đóng DB, chạy một câu gộp nhiều kiểm tra vào một lần — "
         "thói quen tốt để không bỏ lỡ lỗi khác đang ẩn.",
         "SELECT 'Email trùng'... UNION ALL SELECT 'Tồn kho âm'... UNION ALL SELECT 'Khách mồ côi'...",
         "<b>6 dòng thuộc 3 loại lỗi</b>: 4 email trùng · 1 sản phẩm tồn kho âm · 1 đơn mồ côi "
         "(ORD_004 trỏ khách C999 không tồn tại) — không liên quan vụ iPhone, nhưng ghi nhận để xử lý riêng.",
         ""),
    ]
    for t, d, sql, kq, nxt in cs_steps:
        content = [
            Paragraph(d, st_box),
            Spacer(1, 3),
            Paragraph("<b>Câu lệnh lõi:</b> <font face='Mono' size='8'>" + sql + "</font>", st_box),
            Spacer(1, 2),
            Paragraph("<b>Kết quả:</b> " + kq, st_box),
        ]
        if nxt:
            content += [Spacer(1, 3),
                Paragraph("<font color='#1e3a5f'><b>→ Bước tiếp:</b> " + nxt + "</font>", st_box)]
        story.append(color_box(t, content, LBLUE, BLUE, BLUE))
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
        "Điều đáng nhớ không phải sáu câu lệnh, mà là <b>trình tự điều tra</b>: chụp toàn cảnh → định vị "
        "nghi phạm → truy tới gốc → đo đúng phần lệch → đánh giá phạm vi → quét lỗi đi kèm. SQL là "
        "đèn pin; tư duy điều tra mới là hướng soi.", st_lead))

    # ---- Chương: Kiểm thử ghi dữ liệu (verify-after-action) ----
    story.append(NextPageTemplate("body"))
    story.append(PageBreak())
    story.append(PageMarker("ghidulieu"))
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
        ("TRƯỚC (Arrange) — ghi lại trạng thái hiện tại",
         "Trước khi thao tác, ghi lại những giá trị sắp bị thay đổi — nhất là các con số sẽ biến động "
         "(tồn kho, số dư, số dòng). Không có mốc 'trước' để so, bạn không thể khẳng định 'sau' đúng hay sai."),
        ("HÀNH ĐỘNG (Act) — thao tác qua app/API",
         "Thực hiện đúng một thao tác trên giao diện hoặc API như người dùng thật — <b>không</b> sửa DB "
         "bằng tay. Mục tiêu là kiểm xem hệ thống ghi đúng không, chứ không phải tự ghi hộ nó."),
        ("SAU (Assert) — soi DB và so với kỳ vọng",
         "Chạy SELECT kiểm từng thứ và so với kỳ vọng: bản ghi chính, các bảng liên quan, "
         "các giá trị được tính ra từ số khác (vd tổng tiền = tổng các dòng), và quan trọng — "
         "<b>không có bản ghi thừa hay thiếu</b>."),
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
            "(PROD_001, giá 30.000.000). Hệ thống sinh đơn mới <b>ORD_100</b>. Tồn kho PROD_001 "
            "trước khi đặt là <b>50</b>. Sau thao tác, DB phải thể hiện đúng bốn điều dưới đây.",
            LAMBER, AMBER, colors.HexColor("#b45309"))))
    story.append(Spacer(1, 6))
    story.append(Paragraph("<b>1. Bản ghi đơn được tạo đúng</b> — đúng khách, tổng tiền, trạng thái, ngày.",
        st_body))
    story.append(code_box(
        "SELECT order_id, customer_id, total_amount, status, order_date\n"
        "FROM   Orders\n"
        "WHERE  order_id = 'ORD_100';"))
    story.append(Paragraph(
        "Kỳ vọng: customer_id = C001, total_amount = 60.000.000, status hợp lệ (vd PENDING), "
        "order_date = hôm nay.", st_small))
    story.append(Spacer(1, 5))
    story.append(Paragraph("<b>2. Dòng chi tiết đúng và KHÔNG thừa</b> — số lượng dòng phải khớp.",
        st_body))
    story.append(code_box(
        "SELECT product_id, quantity, price\n"
        "FROM   Order_Items\n"
        "WHERE  order_id = 'ORD_100';"))
    story.append(Paragraph(
        "Kỳ vọng đúng 1 dòng: PROD_001, quantity = 2, price = 30.000.000 (giá tại thời điểm mua). "
        "Nếu ra 2 dòng → double-submit (người dùng bấm gửi hai lần), xem Câu 4, 29; "
        "nếu rỗng → đơn tạo mà thiếu chi tiết (Câu 16, 38).",
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
    story.append(Paragraph("<b>4. Số tổng khớp với chi tiết</b>: total_amount = SUM(quantity × price).",
        st_body))
    story.append(code_box(
        "SELECT o.total_amount,\n"
        "       SUM(oi.quantity * oi.price) AS tinh_tu_items\n"
        "FROM   Orders o\n"
        "JOIN   Order_Items oi ON o.order_id = oi.order_id\n"
        "WHERE  o.order_id = 'ORD_100'\n"
        "GROUP  BY o.total_amount;"))
    story.append(Paragraph(
        "Hai con số phải bằng nhau (60.000.000 = 2 × 30.000.000). Lệch là lỗi tính tiền — đúng mẫu Câu 13, "
        "nay áp cho một đơn vừa tạo.", st_small))
    story.append(Spacer(1, 8))
    story.append(color_box("CHECKLIST — SAU MỖI THAO TÁC GHI, KIỂM GÌ?",
        [li("Bản ghi chính được tạo / sửa / xóa đúng như mong đợi?"),
         li("Mọi bảng <b>liên quan</b> cập nhật đúng (tồn kho, audit log, bảng đối soát)?"),
         li("Số dòng đúng — không thừa (double-submit), không thiếu?"),
         li("Số tổng khớp với chi tiết (total = SUM items, số dư, điểm thưởng)?"),
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
         li("Trừ kho hai lần / tạo đơn trùng do double-submit (Câu 4, 29)."),
         li("<b>Soft-delete</b>: 'xóa' trên app nhưng DB chỉ đánh dấu cờ — phải kiểm đúng cơ chế, đừng tưởng mất là mất."),
         li("Sai múi giờ hoặc timestamp khi ghi (Câu 34)."),
        ],
        LGREEN, GREEN, colors.HexColor("#047857")))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "Luôn kiểm trên môi trường test/staging, và chạy lại file <b>ecommerce_test_setup.sql</b> để "
        "đưa dữ liệu về mốc gốc trước mỗi lượt kiểm — nhờ vậy con số 'trước' luôn xác định và kết quả "
        "tái lập được.", st_small))

    # ---- Chương: Chạy SQL an toàn trên production ----
    story.append(NextPageTemplate("body"))
    story.append(PageBreak())
    story.append(PageMarker("production"))
    story.append(Paragraph("Chạy SQL an toàn trên production", st_h1))
    story.append(HRule(CONTENT_W, BLUE, 1.5))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "50 câu lệnh chính trong sách đều là SELECT — chỉ đọc, không sửa. Nhưng khi chạy trên "
        "database thật đang phục vụ người dùng, cần vài nguyên tắc tối thiểu để không gây hại.",
        st_lead))
    story.append(Spacer(1, 8))
    story.append(Paragraph("Nguyên tắc an toàn",
        S("sh2a", parent=st_label, textColor=NAVY, fontSize=11, spaceBefore=4, spaceAfter=2,
          keepWithNext=True)))
    story.append(Spacer(1, 3))
    for t in [
        "Ưu tiên chạy trên <b>replica / bản sao chỉ đọc</b>; dùng <b>tài khoản read-only</b> để không thể vô tình UPDATE/DELETE.",
        "Luôn thêm <b>LIMIT</b> khi thăm dò; tránh giờ cao điểm — câu nặng có thể chiếm nhiều tài nguyên và làm chậm cả hệ thống.",
        "Đặt <b>EXPLAIN</b> trước câu SELECT để xem có quét cả bảng không — dấu hiệu <b>'Table scan'</b> "
        "(EXPLAIN dạng cây, mặc định MySQL 8.0+) hoặc <b>type = ALL</b> (dạng bảng). Trên bảng lớn, đây là "
        "tín hiệu báo dev/DBA cân nhắc đánh index trên cột đang lọc — QA không tự thêm index trên production.",
        "Nếu buộc phải sửa: chạy <b>SELECT với đúng WHERE trước</b>, xem kết quả, rồi mới đổi thành "
        "UPDATE/DELETE trong transaction để còn ROLLBACK nếu sai.",
        "Sách viết theo cú pháp MySQL — vài chỗ khác trên PostgreSQL/SQL Server (LIMIT vs TOP, IFNULL vs ISNULL, phân biệt hoa/thường).",
    ]:
        story.append(li(t))
    story.append(Spacer(1, 8))
    story.append(color_box("QUYỀN RIÊNG TƯ KHI QUERY DỮ LIỆU THẬT",
        [li("KHÔNG <b>SELECT *</b> trên bảng chứa thông tin cá nhân; che email/số điện thoại khi đính kết quả vào defect report."),
         li("Không copy dữ liệu thật ra ngoài môi trường kiểm soát; cần quyền truy cập thì xin đúng quy trình, đừng mượn tài khoản người khác."),
        ],
        LAMBER, AMBER, colors.HexColor("#b45309")))

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
        "Ba phần tra cứu nhanh: bảng cú pháp lõi để tra khi viết câu lệnh, đáp án các bài "
        "tập tự luyện, và bảng giải thích thuật ngữ.", st_lead))

    # A · Cheat sheet cú pháp
    story.append(PageMarker("apxA"))
    story.append(apx_h2("A · Cheat sheet cú pháp lõi"))
    story.append(HRule(CONTENT_W, BLUE, 1.2))
    story.append(Spacer(1, 6))
    rows_B = [
        ["Khám phá schema chưa có tài liệu", ("mono", "FROM information_schema<br/>&nbsp;&nbsp;.columns / .table_constraints"), "1, 2"],
        ["Tìm bản ghi trùng", ("mono", "GROUP BY cot<br/>HAVING COUNT(*) &gt; 1"), "3, 4, 8, 29"],
        ["Tìm mồ côi — an toàn với NULL", ("mono", "WHERE NOT EXISTS (<br/>&nbsp;&nbsp;SELECT 1 FROM b<br/>&nbsp;&nbsp;WHERE b.fk = a.id)"), "BT 6.2"],
        ["Tìm mồ côi — viết ngắn", ("mono", "LEFT JOIN b ON ...<br/>WHERE b.id IS NULL"), "7, 16, 17"],
        ["Bẫy cần tránh", ("mono", "NOT IN (subquery<br/>có NULL) → luôn rỗng"), "11"],
        ["Xử lý NULL khi tính toán", ("mono", "COALESCE(x, 0)"), "28"],
        ["Chuẩn hóa chuỗi trước khi so", ("mono", "TRIM(x), LOWER(x)"), "6, 8, 35"],
        ["Kiểm tra định dạng chuỗi", ("mono", "x REGEXP 'mau'"), "31, 32"],
        ["Kiểm tra ngày bất thường", ("mono", "WHERE ngay &gt; CURDATE()<br/>DATEDIFF(a, b)"), "34, 42, 43"],
        ["Đếm có điều kiện", ("mono", "SUM(CASE WHEN ...<br/>&nbsp;&nbsp;THEN 1 ELSE 0 END)"), "9"],
        ["Đối soát tổng cha – con", ("mono", "JOIN + GROUP BY<br/>HAVING SUM(chi tiết) ≠ cha"), "13, 21, 39"],
        ["Tính phần trăm / tỷ lệ", ("mono", "COUNT(*) * 100.0 /<br/>(SELECT COUNT(*) ...)"), "26"],
        ["Đánh số thứ tự trong nhóm", ("mono", "ROW_NUMBER() OVER (<br/>&nbsp;&nbsp;PARTITION BY g<br/>&nbsp;&nbsp;ORDER BY c)"), "46"],
        ["Xếp hạng (cho phép đồng hạng)", ("mono", "RANK() / DENSE_RANK()<br/>OVER (ORDER BY c)"), "22, 47"],
        ["Cộng dồn theo thời gian", ("mono", "SUM(x) OVER (<br/>&nbsp;&nbsp;ORDER BY ngay)"), "49"],
        ["Tái dùng kết quả trung gian", ("mono", "WITH cte AS (...)<br/>SELECT ... FROM cte"), "47, 48"],
        ["Ghép nhiều báo cáo theo cột dọc", ("mono", "SELECT ... UNION ALL<br/>SELECT ..."), "50, BT 6.2"],
        ["Ngưỡng động tính từ chính bảng", ("mono", "WHERE x &gt; (SELECT<br/>&nbsp;&nbsp;AVG(x)*k FROM t)"), "30, 39, 48"],
    ]
    story.append(ref_table(
        ["Mục tiêu", "Cú pháp lõi", "Câu mẫu"],
        rows_B, [CONTENT_W*0.32, CONTENT_W*0.48, CONTENT_W*0.20]))

    # B · Đáp án bài tập tự luyện
    story.append(PageBreak())
    story.append(PageMarker("apxB"))
    story.append(apx_h2("B · Đáp án bài tập tự luyện"))
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

    # C · Giải thích thuật ngữ
    story.append(PageBreak())
    story.append(PageMarker("apxC"))
    story.append(apx_h2("C · Giải thích thuật ngữ"))
    story.append(HRule(CONTENT_W, BLUE, 1.2))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "Các thuật ngữ kỹ thuật thường gặp trong sách — sắp xếp theo thứ tự bảng chữ cái.",
        st_small))
    story.append(Spacer(1, 6))
    rows_F = [
        ["AUTO_INCREMENT",
         "Cột DB tự tăng số thứ tự mỗi khi thêm dòng mới (1, 2, 3...). "
         "Nếu một INSERT thất bại hoặc có dòng bị xóa, chuỗi số sẽ có gap — "
         "đây là dấu hiệu cần điều tra (Câu 44)."],
        ["Bản ghi mồ côi\n(orphan record)",
         "Dòng dữ liệu tham chiếu đến một đối tượng không tồn tại ở bảng kia. "
         "Ví dụ: đơn hàng có customer_id C999 nhưng C999 không có trong bảng Customers (Câu 7)."],
        ["Collation",
         "Cài đặt quy định cách database so sánh chuỗi ký tự. "
         "Chế độ mặc định MySQL 8.0 (utf8mb4_0900_ai_ci) không phân biệt hoa/thường: "
         "'a.nguyen@email.com' và 'A.NGUYEN@EMAIL.COM' được coi là như nhau (Câu 3, 8)."],
        ["Composite key\n(khóa tổ hợp)",
         "Khóa gồm nhiều cột kết hợp thay vì một cột đơn. "
         "Ví dụ: tổ hợp (order_id, product_id) xác định duy nhất mỗi dòng trong Order_Items (Câu 4)."],
        ["CTE\n(Common Table Expression)",
         "Tên đặt tạm cho một kết quả trung gian trong câu SQL, khai báo bằng WITH ... AS (...). "
         "Giúp viết SQL theo từng bước rõ ràng thay vì lồng nhiều subquery vào nhau (Câu 47, 48)."],
        ["FK / Foreign Key\n(khóa ngoại)",
         "Cột dùng để liên kết sang bảng khác. Khi có FK constraint, DB kiểm tra tự động: "
         "giá trị nhập vào phải tồn tại ở bảng tham chiếu. Nếu constraint bị tắt, "
         "bản ghi mồ côi có thể lọt vào (Câu 2, 7)."],
        ["Hard delete\n(xóa cứng)",
         "Xóa hẳn dòng khỏi DB bằng lệnh DELETE. Không thể phục hồi nếu không có backup. "
         "Xem thêm: Soft-delete."],
        ["Index (chỉ mục)",
         "Cấu trúc DB tạo sẵn để tăng tốc tìm kiếm, giống mục lục cuối sách. "
         "Câu lệnh bọc hàm quanh cột (LOWER, TRIM, DATEDIFF...) thường không dùng được index, "
         "khiến DB phải quét toàn bộ bảng — chậm khi dữ liệu lớn."],
        ["NULL",
         "Giá trị đặc biệt nghĩa là 'chưa có thông tin' — khác hoàn toàn với chuỗi rỗng '' "
         "và số 0. Mọi phép so sánh với NULL (=, !=, >) đều trả về 'không xác định', "
         "nên bắt buộc dùng IS NULL hoặc IS NOT NULL (Câu 5, 9, 14)."],
        ["Outlier\n(giá trị ngoại lệ)",
         "Bản ghi có giá trị bất thường so với phần còn lại của tập dữ liệu. "
         "Ví dụ: đơn hàng 32M trong khi trung bình chỉ 15M. "
         "Outlier không nhất thiết là lỗi — nhưng luôn cần điều tra thêm (Câu 30)."],
        ["Rollback\n(hoàn tác giao dịch)",
         "Khi một giao dịch DB (transaction) gặp lỗi giữa chừng, rollback hủy bỏ toàn bộ "
         "thao tác đã thực hiện trong giao dịch đó và khôi phục DB về trạng thái trước. "
         "Lưu ý: AUTO_INCREMENT không rollback theo — tạo gap trong chuỗi ID."],
        ["Soft-delete\n(xóa mềm)",
         "Không xóa thật mà đánh dấu bằng cột (deleted_at, is_deleted). "
         "Dữ liệu vẫn còn trong DB, dùng để tra cứu lịch sử hoặc phục hồi. "
         "Bug thường gặp: quên lọc bản ghi đã soft-delete dẫn đến tính toán sai (Câu 12, 40, 41)."],
        ["Subquery\n(truy vấn con)",
         "Câu SELECT lồng bên trong một câu SQL khác. "
         "Dùng để tính ngưỡng động, kiểm tra sự tồn tại, hoặc lọc theo kết quả trung gian. "
         "Khi cần dùng lại nhiều lần, thay bằng CTE để code rõ hơn (Câu 30, 47, 48)."],
        ["Transaction\n(giao dịch DB)",
         "Nhóm thao tác DB được thực hiện cùng nhau theo nguyên tắc 'tất cả hoặc không'. "
         "Nếu bất kỳ bước nào thất bại, toàn bộ giao dịch bị rollback. "
         "Đảm bảo dữ liệu không bị ghi dở giữa chừng."],
        ["Window function\n(hàm cửa sổ)",
         "Nhóm hàm SQL tính toán trên một tập dữ liệu nhưng giữ nguyên từng dòng "
         "— khác với GROUP BY vốn gộp nhiều dòng thành một. "
         "Gồm: ROW_NUMBER(), RANK(), SUM() OVER, LAG()... (Câu 46, 47, 49)."],
    ]
    story.append(ref_table(
        ["Thuật ngữ", "Giải thích"],
        rows_F, [CONTENT_W*0.28, CONTENT_W*0.72]))

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
         li("Cẩn thận với <b>NULL</b>, <b>collation</b>, <b>khoảng trắng ẩn</b> và <b>khác biệt dialect</b> — đó là nơi bug ẩn nấp ngay trong chính câu lệnh của bạn."),
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
