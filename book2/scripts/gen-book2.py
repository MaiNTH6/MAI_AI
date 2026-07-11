# -*- coding: utf-8 -*-
"""
Sinh PDF Sách #2 (BẢN MẪU duyệt format): "SQL cho Data Tester Ngân hàng".
- Tái dùng layout engine của sách 1 (import động gen-book-sql.py): font, style, helper, màu.
- Nội dung ở _book2_data.py. Data minh họa hư cấu (khớp book2/sql/banking_dwh_setup.sql).
Chạy: python book2/scripts/gen-book2.py  ->  book2/dist/sql-data-tester-ngan-hang-MAU.pdf
"""
import os, sys, importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
BOOK1_DIR = os.path.abspath(os.path.join(HERE, "..", "..", "book", "scripts"))
sys.path.insert(0, BOOK1_DIR)   # để gen-book-sql.py import được _book_sql_data
_spec = importlib.util.spec_from_file_location("genbook", os.path.join(BOOK1_DIR, "gen-book-sql.py"))
gb = importlib.util.module_from_spec(_spec); _spec.loader.exec_module(gb)

mm = gb.mm; colors = gb.colors
PAGE_W, PAGE_H = gb.PAGE_W, gb.PAGE_H
LM, RM, TM, BM, CONTENT_W = gb.LM, gb.RM, gb.TM, gb.BM, gb.CONTENT_W
BLUE, NAVY, AMBER, GREEN, VIOLET = gb.BLUE, gb.NAVY, gb.AMBER, gb.GREEN, gb.VIOLET
LBLUE, LAMBER, LGREEN, LVIOLET, LGREY = gb.LBLUE, gb.LAMBER, gb.LGREEN, gb.LVIOLET, gb.LGREY
INK, GREY = gb.INK, gb.GREY
S = gb.S; pdfmetrics = gb.pdfmetrics
Paragraph = gb.Paragraph; Spacer = gb.Spacer; Table = gb.Table; TableStyle = gb.TableStyle
PageBreak = gb.PageBreak; KeepTogether = gb.KeepTogether; NextPageTemplate = gb.NextPageTemplate
Frame = gb.Frame; PageTemplate = gb.PageTemplate; BaseDocTemplate = gb.BaseDocTemplate; A4 = gb.A4
from reportlab.lib.enums import TA_CENTER

import _book2_data as D

# ─────────────────────────────────────────────────────────────────────────────
def cover(canv, doc):
    canv.saveState()
    canv.setFillColor(colors.HexColor("#0f172a")); canv.rect(0,0,PAGE_W,PAGE_H,fill=1,stroke=0)
    canv.setFillColor(colors.HexColor("#1e293b"))
    for gx in range(0,int(PAGE_W/mm)+2,10):
        for gy in range(0,int(PAGE_H/mm)+2,10):
            canv.circle(gx*mm,gy*mm,0.55*mm,fill=1,stroke=0)
    canv.setFillColor(BLUE); canv.rect(0,0,3.5*mm,PAGE_H,fill=1,stroke=0)
    X = LM + 5*mm
    canv.setFillColor(colors.HexColor("#60a5fa")); canv.setFont("Arial-Bold",11)
    canv.drawString(X, PAGE_H-24*mm, "MAIQAI.COM  ·  CẨM NANG DATA TESTER")
    canv.setFillColor(colors.white); canv.setFont("Arial-Bold",38)
    canv.drawString(X, PAGE_H-46*mm, "SQL CHO DATA TESTER")
    canv.setFillColor(AMBER); canv.setFont("Arial-Bold",30)
    canv.drawString(X, PAGE_H-63*mm, "NGÂN HÀNG")
    canv.setFillColor(colors.HexColor("#94a3b8")); canv.setFont("Arial",11.5)
    canv.drawString(X, PAGE_H-77*mm, "Kiểm thử luồng dữ liệu ETL  ·  Core → DWH → BI  ·  Dialect MySQL")

    BX=X; BW=CONTENT_W-5*mm; BT=PAGE_H-98*mm; BH=66*mm
    canv.setFillColor(colors.HexColor("#1e293b")); canv.roundRect(BX,BT-BH,BW,BH,4*mm,fill=1,stroke=0)
    canv.setStrokeColor(colors.HexColor("#334155")); canv.setLineWidth(0.8)
    canv.roundRect(BX,BT-BH,BW,BH,4*mm,fill=0,stroke=1)
    canv.setFillColor(colors.HexColor("#334155")); canv.roundRect(BX,BT-8.5*mm,BW,8.5*mm,4*mm,fill=1,stroke=0)
    canv.rect(BX,BT-8.5*mm,BW,4*mm,fill=1,stroke=0)
    dx=BX+8*mm
    for dc in ["#ef4444","#f59e0b","#10b981"]:
        canv.setFillColor(colors.HexColor(dc)); canv.circle(dx,BT-4.2*mm,2.1*mm,fill=1,stroke=0); dx+=5.2*mm
    canv.setFillColor(colors.HexColor("#94a3b8")); canv.setFont("Mono",7.8)
    canv.drawCentredString(BX+BW/2, BT-6*mm, "doi_soat_du_no.sql")
    lines=[
      ("-- Đối soát tổng dư nợ: Nguồn vs DWH","#64748b"),
      ("SELECT 'Nguon' AS tang, COUNT(*),","#e2e8f0"),
      ("       SUM(outstanding_principal)","#e2e8f0"),
      ("FROM   src_loans","#93c5fd"),
      ("UNION ALL","#fbbf24"),
      ("SELECT 'DWH', COUNT(*), SUM(...) FROM dwh_loans;","#e2e8f0"),
      ("","",),
      ("-- Nguon 4.250tr vs DWH 3.550tr -> lech 700tr","#10b981"),
    ]
    cy=BT-16*mm
    for ln,c in lines:
        if ln:
            canv.setFillColor(colors.HexColor(c)); canv.setFont("Mono",8.4); canv.drawString(BX+7*mm,cy,ln)
        cy-=5.8*mm

    BDG_T=PAGE_H-176*mm; BDG_H=23*mm
    badges=[("ETL","Kiểm thử luồng"),("DWH","Kho dữ liệu"),("MySQL","Dialect")]
    BDG_W=(CONTENT_W-5*mm-2*4*mm)/3; bx=X
    for num,lbl in badges:
        canv.setFillColor(colors.HexColor("#1e3a8a")); canv.roundRect(bx,BDG_T-BDG_H,BDG_W,BDG_H,3*mm,fill=1,stroke=0)
        canv.setStrokeColor(BLUE); canv.setLineWidth(0.6); canv.roundRect(bx,BDG_T-BDG_H,BDG_W,BDG_H,3*mm,fill=0,stroke=1)
        canv.setFillColor(AMBER); canv.setFont("Arial-Bold",15)
        nw=pdfmetrics.stringWidth(num,"Arial-Bold",15); canv.drawString(bx+(BDG_W-nw)/2,BDG_T-10*mm,num)
        canv.setFillColor(colors.HexColor("#94a3b8")); canv.setFont("Arial",7.5)
        lw=pdfmetrics.stringWidth(lbl,"Arial",7.5); canv.drawString(bx+(BDG_W-lw)/2,BDG_T-18.5*mm,lbl)
        bx+=BDG_W+4*mm

    canv.setStrokeColor(colors.HexColor("#334155")); canv.setLineWidth(0.6)
    canv.line(X,PAGE_H-205*mm,PAGE_W-RM,PAGE_H-205*mm)
    canv.setFillColor(colors.HexColor("#cbd5e1")); canv.setFont("Arial",9)
    canv.drawString(X,PAGE_H-213*mm,"Mỗi mục: yêu cầu công việc — nghiệp vụ cần biết — SQL — đọc kết quả — góc soi lỗi.")

    canv.setFillColor(colors.HexColor("#1e293b")); canv.rect(0,0,PAGE_W,21*mm,fill=1,stroke=0)
    canv.setFillColor(BLUE); canv.rect(0,20.5*mm,PAGE_W,0.8*mm,fill=1,stroke=0)
    canv.setFillColor(colors.HexColor("#94a3b8")); canv.setFont("Arial",8.5)
    canv.drawString(X,13*mm,"BẢN MẪU · Dữ liệu minh họa hư cấu · maiqai.com")
    canv.restoreState()

# ─────────────────────────────────────────────────────────────────────────────
def etl_flow():
    """Sơ đồ luồng: Nguồn -> Staging -> DWH -> BI."""
    def box(t1, t2, bg):
        inner=[Paragraph(t1, S("fb", fontName="Arial-Bold", fontSize=9, textColor=NAVY, alignment=TA_CENTER))]
        if t2: inner.append(Paragraph(t2, S("fbs", fontName="Arial", fontSize=7, textColor=GREY, alignment=TA_CENTER)))
        t=Table([[x] for x in inner], colWidths=[CONTENT_W*0.205])
        t.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),bg),("BOX",(0,0),(-1,-1),0.8,BLUE),
            ("LEFTPADDING",(0,0),(-1,-1),4),("RIGHTPADDING",(0,0),(-1,-1),4),
            ("TOPPADDING",(0,0),(-1,-1),5),("BOTTOMPADDING",(0,0),(-1,-1),5),("VALIGN",(0,0),(-1,-1),"MIDDLE")]))
        return t
    arr=lambda: Paragraph("→", S("ar", fontName="Arial-Bold", fontSize=14, textColor=BLUE, alignment=TA_CENTER))
    row=[box("Nguồn","Core · Thẻ · LOS · CRM",LBLUE), arr(),
         box("Staging","vùng đệm",LGREY), arr(),
         box("DWH / Data Mart","kho dữ liệu",LBLUE), arr(),
         box("Báo cáo BI","Power BI · Tableau",LAMBER)]
    w=CONTENT_W*0.205; aw=(CONTENT_W-4*w)/3
    t=Table([row], colWidths=[w,aw,w,aw,w,aw,w])
    t.setStyle(TableStyle([("VALIGN",(0,0),(-1,-1),"MIDDLE"),
        ("LEFTPADDING",(0,0),(-1,-1),0),("RIGHTPADDING",(0,0),(-1,-1),0)]))
    return t

def _sub(txt):
    return Paragraph(txt, S("p0h", parent=gb.st_label, textColor=NAVY, fontSize=11, spaceBefore=6))
def _cap(txt):
    return Paragraph(txt, S("cap", parent=gb.st_small, textColor=GREY))

def oltp_olap_cards():
    def card(title, pairs, hbg):
        lab=S("ol",fontName="Arial",fontSize=8,textColor=GREY,leading=11)
        val=S("ov",fontName="Arial-Bold",fontSize=8.5,textColor=INK,leading=11)
        data=[[Paragraph(title,S("oh",fontName="Arial-Bold",fontSize=9.5,textColor=colors.white)),""]]
        for l,v in pairs: data.append([Paragraph(l,lab),Paragraph(v,val)])
        cw=CONTENT_W/2-6
        t=Table(data,colWidths=[cw*0.38,cw*0.62])
        t.setStyle(TableStyle([("SPAN",(0,0),(1,0)),("BACKGROUND",(0,0),(1,0),hbg),
            ("BACKGROUND",(0,1),(-1,-1),colors.white),("BOX",(0,0),(-1,-1),0.8,hbg),
            ("INNERGRID",(0,1),(-1,-1),0.4,colors.HexColor("#e2e8f0")),("VALIGN",(0,0),(-1,-1),"MIDDLE"),
            ("LEFTPADDING",(0,0),(-1,-1),7),("RIGHTPADDING",(0,0),(-1,-1),7),
            ("TOPPADDING",(0,0),(-1,-1),4),("BOTTOMPADDING",(0,0),(-1,-1),4)]))
        return t
    left=card("OLTP — Hệ nguồn (giao dịch)",[("Mục đích","Ghi nhận giao dịch"),
        ("Thao tác","Thêm/sửa liên tục"),("Ví dụ","Rút ATM, chuyển khoản"),("Vai trò ETL","→ NGUỒN")],BLUE)
    right=card("OLAP — Kho dữ liệu (phân tích)",[("Mục đích","Phân tích, báo cáo"),
        ("Thao tác","Đọc & tổng hợp"),("Ví dụ","Báo cáo tổng dư nợ"),("Vai trò ETL","→ ĐÍCH")],colors.HexColor("#b45309"))
    o=Table([[left,right]],colWidths=[CONTENT_W/2,CONTENT_W/2])
    o.setStyle(TableStyle([("VALIGN",(0,0),(-1,-1),"TOP"),
        ("RIGHTPADDING",(0,0),(0,0),6),("LEFTPADDING",(1,0),(1,0),6),
        ("LEFTPADDING",(0,0),(0,0),0),("RIGHTPADDING",(1,0),(1,0),0)]))
    return o

def etl_steps():
    def step(n,label,sub):
        inner=[[Paragraph(str(n),S("sn",fontName="Arial-Bold",fontSize=13,textColor=colors.white,alignment=TA_CENTER))],
               [Paragraph(label,S("sl",fontName="Arial-Bold",fontSize=8.3,textColor=NAVY,alignment=TA_CENTER))],
               [Paragraph(sub,S("ss",fontName="Arial",fontSize=6.8,textColor=GREY,alignment=TA_CENTER,leading=8.5))]]
        t=Table(inner,colWidths=[CONTENT_W/5-8])
        t.setStyle(TableStyle([("BACKGROUND",(0,0),(0,0),BLUE),("BACKGROUND",(0,1),(0,-1),LBLUE),
            ("BOX",(0,0),(-1,-1),0.8,BLUE),("VALIGN",(0,0),(-1,-1),"MIDDLE"),
            ("TOPPADDING",(0,0),(0,0),4),("BOTTOMPADDING",(0,0),(0,0),4),
            ("TOPPADDING",(0,1),(-1,-1),3),("BOTTOMPADDING",(0,1),(-1,-1),3),
            ("LEFTPADDING",(0,0),(-1,-1),3),("RIGHTPADDING",(0,0),(-1,-1),3)]))
        return t
    s=[step(1,"Cấu trúc","khớp mapping"),step(2,"Trích xuất","đủ vào staging"),
       step(3,"Biến đổi","đúng quy tắc"),step(4,"Nạp","đầy đủ / gia tăng"),step(5,"Đối soát","kho ↔ nguồn ↔ BI")]
    o=Table([s],colWidths=[CONTENT_W/5]*5)
    o.setStyle(TableStyle([("VALIGN",(0,0),(-1,-1),"TOP"),("LEFTPADDING",(0,0),(-1,-1),4),
        ("RIGHTPADDING",(0,0),(-1,-1),4),("TOPPADDING",(0,0),(-1,-1),0),("BOTTOMPADDING",(0,0),(-1,-1),0)]))
    return o

def core_vs_dwh():
    mono=S("mv",fontName="Mono",fontSize=7.6,textColor=INK,leading=11)
    def panel(title, lines, tag, tagcolor, bg, accent):
        inner=[Paragraph(title,S("pt",fontName="Arial-Bold",fontSize=8.8,textColor=NAVY,spaceAfter=3))]
        inner+=[Paragraph(l,mono) for l in lines]
        inner.append(Paragraph(tag,S("pg",fontName="Arial-Bold",fontSize=8,textColor=tagcolor,spaceBefore=3)))
        t=Table([[inner]],colWidths=[CONTENT_W*0.43])
        t.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),bg),("BOX",(0,0),(-1,-1),0.8,accent),
            ("LEFTPADDING",(0,0),(-1,-1),8),("RIGHTPADDING",(0,0),(-1,-1),8),
            ("TOPPADDING",(0,0),(-1,-1),7),("BOTTOMPADDING",(0,0),(-1,-1),7)]))
        return t
    left=panel("Hệ core (MultiValue)",
        ["KH001  Nguyen Van A","SĐT: [090...; 091...]","TK:  [1001; 1002]"],
        "Khó dùng SQL trực tiếp", colors.HexColor("#b91c1c"), LGREY, colors.HexColor("#cbd5e1"))
    right=panel("DWH (bảng quan hệ)",
        ["cif    | so_dien_thoai","KH001  | 090...","KH001  | 091..."],
        "Nơi Data Tester viết SQL", colors.HexColor("#047857"), LBLUE, BLUE)
    mid=Paragraph("chuẩn hóa<br/>&#8594;", S("mid",fontName="Arial-Bold",fontSize=10,textColor=BLUE,alignment=TA_CENTER,leading=13))
    o=Table([[left,mid,right]],colWidths=[CONTENT_W*0.43,CONTENT_W*0.14,CONTENT_W*0.43])
    o.setStyle(TableStyle([("VALIGN",(0,0),(-1,-1),"MIDDLE"),
        ("LEFTPADDING",(0,0),(-1,-1),0),("RIGHTPADDING",(0,0),(-1,-1),0)]))
    return o

def _mcard(name, rows, header_bg=NAVY, cw=None):
    inner=[[Paragraph(name, S("cn",fontName="Arial-Bold",fontSize=8.6,textColor=colors.white))]]
    for col,tag in rows:
        if tag=="PK": p=Paragraph(f'<font color="#f59e0b"><b>PK</b></font>&nbsp;&nbsp;{col}', S("cr",parent=gb.st_cell,fontSize=7.5))
        elif tag=="FK": p=Paragraph(f'<font color="#10b981"><b>FK</b></font>&nbsp;&nbsp;{col}', S("cr",parent=gb.st_cell,fontSize=7.5))
        else: p=Paragraph(f'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{col}', S("cr",parent=gb.st_cell,fontSize=7.5))
        inner.append([p])
    t=Table(inner,colWidths=[cw or (CONTENT_W/2-6)])
    t.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),header_bg),("BACKGROUND",(0,1),(-1,-1),LBLUE),
        ("BOX",(0,0),(-1,-1),0.8,BLUE),("LINEBELOW",(0,0),(-1,0),1,BLUE),
        ("LEFTPADDING",(0,0),(-1,-1),7),("RIGHTPADDING",(0,0),(-1,-1),7),
        ("TOPPADDING",(0,0),(-1,-1),2.5),("BOTTOMPADDING",(0,0),(-1,-1),2.5)]))
    return t

def _grid(cards):
    """Xếp danh sách card thành lưới 2 cột."""
    rows=[]; cw=CONTENT_W/2-3
    for i in range(0,len(cards),2):
        pair=cards[i:i+2]
        if len(pair)==1: pair.append("")
        rows.append(pair)
    t=Table(rows,colWidths=[CONTENT_W/2, CONTENT_W/2])
    t.setStyle(TableStyle([("VALIGN",(0,0),(-1,-1),"TOP"),
        ("LEFTPADDING",(0,0),(0,-1),0),("RIGHTPADDING",(0,0),(0,-1),6),
        ("LEFTPADDING",(1,0),(1,-1),6),("RIGHTPADDING",(1,0),(1,-1),0),
        ("TOPPADDING",(0,0),(-1,-1),3),("BOTTOMPADDING",(0,0),(-1,-1),3)]))
    return t

def _etl_band():
    p=Paragraph("ETL &nbsp;·&nbsp; Extract (trích xuất) &nbsp;→&nbsp; Transform (gắn tên chi nhánh, tính nhóm nợ) &nbsp;→&nbsp; Load (nạp vào DWH)",
        S("eb",fontName="Arial-Bold",fontSize=9,textColor=colors.white,alignment=TA_CENTER))
    t=Table([[p]],colWidths=[CONTENT_W])
    t.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),BLUE),("TOPPADDING",(0,0),(-1,-1),7),
        ("BOTTOMPADDING",(0,0),(-1,-1),7)]))
    return t

def field_table(title, rows):
    hdr=[Paragraph(h,gb.st_cellh) for h in ["Trường","Kiểu","Ý nghĩa"]]
    data=[hdr]
    for f,ty,m in rows:
        data.append([Paragraph(f,S("ff",parent=gb.st_cell,fontName="Mono",fontSize=7.4,leading=10)),
                     Paragraph(ty,S("ft",parent=gb.st_cell,fontSize=7.4,textColor=GREY,leading=10)),
                     Paragraph(m,S("fm",parent=gb.st_cell,fontSize=8,leading=11))])
    t=Table(data,colWidths=[CONTENT_W*0.24,CONTENT_W*0.16,CONTENT_W*0.60],repeatRows=1)
    t.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),NAVY),
        ("ROWBACKGROUNDS",(0,1),(-1,-1),[colors.white,LGREY]),
        ("GRID",(0,0),(-1,-1),0.4,colors.HexColor("#cbd5e1")),("VALIGN",(0,0),(-1,-1),"TOP"),
        ("LEFTPADDING",(0,0),(-1,-1),6),("RIGHTPADDING",(0,0),(-1,-1),6),
        ("TOPPADDING",(0,0),(-1,-1),3),("BOTTOMPADDING",(0,0),(-1,-1),3)]))
    return t

def business_flow_page():
    def vbox(title, sub, w, bg=LBLUE, accent=BLUE, tcol=NAVY):
        inner=[Paragraph(title, S("vt",fontName="Arial-Bold",fontSize=8.4,textColor=tcol,alignment=TA_CENTER,leading=10))]
        if sub: inner.append(Paragraph(sub, S("vs",fontName="Arial",fontSize=6.6,textColor=GREY,alignment=TA_CENTER,leading=8.5)))
        t=Table([[x] for x in inner], colWidths=[w])
        t.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),bg),("BOX",(0,0),(-1,-1),0.8,accent),
            ("VALIGN",(0,0),(-1,-1),"MIDDLE"),("LEFTPADDING",(0,0),(-1,-1),3),("RIGHTPADDING",(0,0),(-1,-1),3),
            ("TOPPADDING",(0,0),(-1,-1),7),("BOTTOMPADDING",(0,0),(-1,-1),7)]))
        return t
    def arrow(txt="&#8595;"):
        return Paragraph(txt, S("dn",fontName="Arial-Bold",fontSize=11,textColor=BLUE,alignment=TA_CENTER))
    def centered(box, w):
        side=(CONTENT_W-w)/2
        t=Table([["",box,""]],colWidths=[side,w,side])
        t.setStyle(TableStyle([("LEFTPADDING",(0,0),(-1,-1),0),("RIGHTPADDING",(0,0),(-1,-1),0),
            ("TOPPADDING",(0,0),(-1,-1),0),("BOTTOMPADDING",(0,0),(-1,-1),0),("VALIGN",(0,0),(-1,-1),"MIDDLE")]))
        return t
    def band(txt, bg):
        p=Paragraph(txt, S("bd",fontName="Arial-Bold",fontSize=9,textColor=colors.white,alignment=TA_CENTER))
        t=Table([[p]],colWidths=[CONTENT_W]); t.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),bg),
            ("TOPPADDING",(0,0),(-1,-1),6),("BOTTOMPADDING",(0,0),(-1,-1),6)])); return t
    lw=CONTENT_W/5
    lanes=[vbox("Mở TK & KYC","Ch.1 · customers, accounts",lw-6),
           vbox("Tiền gửi & Lãi","Ch.2 · số dư, lãi",lw-6),
           vbox("Giao dịch & Chuyển khoản","Ch.3 · transactions",lw-6),
           vbox("Tín dụng & Nhóm nợ","Ch.4 · loans, schedule",lw-6),
           vbox("Thẻ & Hạn mức","Ch.5 · cards",lw-6)]
    lane_row=Table([lanes],colWidths=[lw]*5)
    lane_row.setStyle(TableStyle([("VALIGN",(0,0),(-1,-1),"TOP"),("LEFTPADDING",(0,0),(-1,-1),3),
        ("RIGHTPADDING",(0,0),(-1,-1),3),("TOPPADDING",(0,0),(-1,-1),0),("BOTTOMPADDING",(0,0),(-1,-1),0)]))
    ow=CONTENT_W/3
    outs=[vbox("Báo cáo BI","Power BI / Tableau",ow-6,LAMBER,AMBER),
          vbox("Chấm điểm tín dụng","Credit Scoring",ow-6,LAMBER,AMBER),
          vbox("Báo cáo NHNN","Ch.6 · tuân thủ",ow-6,LAMBER,AMBER)]
    out_row=Table([outs],colWidths=[ow]*3)
    out_row.setStyle(TableStyle([("VALIGN",(0,0),(-1,-1),"TOP"),("LEFTPADDING",(0,0),(-1,-1),3),("RIGHTPADDING",(0,0),(-1,-1),3)]))

    head=Table([[Paragraph("PHẦN 0  —  Bức tranh tổng thể", gb.st_part)]],colWidths=[CONTENT_W])
    head.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),NAVY),("LEFTPADDING",(0,0),(-1,-1),16),
        ("RIGHTPADDING",(0,0),(-1,-1),16),("TOPPADDING",(0,0),(-1,-1),10),("BOTTOMPADDING",(0,0),(-1,-1),10)]))
    def gloss_table(rows):
        data=[[Paragraph(tm,S("gt",fontName="Arial-Bold",fontSize=8,textColor=NAVY,leading=10)),
               Paragraph(ex,S("ge",parent=gb.st_box,fontSize=8,leading=10.5))] for tm,ex in rows]
        tb=Table(data,colWidths=[CONTENT_W*0.24,CONTENT_W*0.76])
        tb.setStyle(TableStyle([("ROWBACKGROUNDS",(0,0),(-1,-1),[colors.white,LGREY]),
            ("BOX",(0,0),(-1,-1),0.6,colors.HexColor("#cbd5e1")),("INNERGRID",(0,0),(-1,-1),0.4,colors.HexColor("#e2e8f0")),
            ("VALIGN",(0,0),(-1,-1),"TOP"),("LEFTPADDING",(0,0),(-1,-1),7),("RIGHTPADDING",(0,0),(-1,-1),7),
            ("TOPPADDING",(0,0),(-1,-1),2.5),("BOTTOMPADDING",(0,0),(-1,-1),2.5)]))
        return tb
    gloss=[
      ("Khách hàng (CIF)","Người dùng dịch vụ ngân hàng. CIF là mã định danh khách hàng — DUY NHẤT toàn hệ thống; mọi tài khoản, khoản vay, thẻ đều móc về mã này."),
      ("Nghiệp vụ (5 luồng)","Các việc khách làm và sinh ra dữ liệu: mở tài khoản & định danh (KYC), gửi tiền & tính lãi, giao dịch/chuyển khoản, vay & phân nhóm nợ, phát hành & chi tiêu thẻ."),
      ("Hệ nguồn","Các hệ thống ghi nhận nghiệp vụ theo thời gian thực: core banking, hệ quản lý thẻ, hệ khởi tạo khoản vay (LOS), CRM. Đây là nơi dữ liệu gốc phát sinh."),
      ("Sổ cái (GL)","General Ledger — sổ kế toán tổng. Mọi giao dịch đều được hạch toán vào một tài khoản kế toán ở đây; số dư sổ cái phải khớp với chi tiết từng phân hệ."),
      ("EOD & ETL","Cuối ngày (End Of Day), quy trình ETL trích xuất dữ liệu từ hệ nguồn, biến đổi theo quy tắc rồi nạp vào kho — thường chạy theo mẻ ban đêm."),
      ("DWH / Data Mart","Data Warehouse — kho dữ liệu tổng hợp từ nhiều hệ nguồn, đã chuẩn hóa, phục vụ phân tích & báo cáo. Data Mart là phần kho cho một chủ đề (vd thẻ, tín dụng)."),
      ("Báo cáo BI","Business Intelligence — công cụ trực quan hóa số liệu (Power BI, Tableau) cho lãnh đạo và bộ phận nghiệp vụ."),
      ("Chấm điểm tín dụng","Mô hình đánh giá khả năng trả nợ của khách để quyết định cho vay / cấp hạn mức; lấy dữ liệu từ kho."),
      ("Báo cáo NHNN","Báo cáo định kỳ gửi Ngân hàng Nhà nước (cơ quan quản lý) như phân loại nợ, an toàn vốn — yêu cầu số liệu khớp tuyệt đối."),
    ]
    return [head, Spacer(1,10),
      Paragraph("Trước khi vào SQL, nắm hai bức tranh: (1) ngân hàng làm gì và sinh ra dữ liệu gì; "
        "(2) dữ liệu đó chảy qua hệ thống ra sao. Bắt đầu từ nghiệp vụ — thứ gần gũi nhất:", gb.st_lead),
      Spacer(1,9),
      Paragraph("(1) LUỒNG NGHIỆP VỤ — từ khách hàng đến báo cáo", S("s1",parent=gb.st_label,textColor=NAVY,fontSize=10.5)),
      Spacer(1,8),
      centered(vbox("KHÁCH HÀNG (CIF)","chủ thể mọi nghiệp vụ", CONTENT_W*0.42, LVIOLET, VIOLET), CONTENT_W*0.42),
      Spacer(1,6), arrow(), Spacer(1,6),
      lane_row,
      Spacer(1,9), arrow(), Spacer(1,6),
      band("Ghi nhận vào HỆ NGUỒN  +  hạch toán SỔ CÁI (GL)", BLUE),
      Spacer(1,7), arrow("&#8595;  Cuối ngày (EOD) · ETL"), Spacer(1,7),
      centered(vbox("DWH / DATA MART","kho dữ liệu đã tổng hợp", CONTENT_W*0.42, LBLUE, BLUE), CONTENT_W*0.42),
      Spacer(1,7), arrow(), Spacer(1,7),
      out_row,
      KeepTogether([Spacer(1,13),
        Paragraph("GIẢI THÍCH CÁC CHỦ THỂ TRONG SƠ ĐỒ", S("gh",parent=gb.st_label,textColor=NAVY,fontSize=10.5)),
        Spacer(1,6), gloss_table(gloss)])]

def model_page():
    cw=CONTENT_W/2-6
    src=[
      _mcard("src_customers  (khách hàng)",[("cif","PK"),("full_name",""),("id_number",""),("phone",""),("segment / kyc_status","")],NAVY,cw),
      _mcard("src_accounts  (tài khoản)",[("account_no","PK"),("cif","FK"),("branch_id","FK"),("product_code","FK"),("status / balance","")],NAVY,cw),
      _mcard("src_transactions  (giao dịch)",[("txn_id","PK"),("account_no","FK"),("dr_cr  (Nợ/Có)",""),("amount",""),("txn_date / value_date","")],NAVY,cw),
      _mcard("src_loans  (khoản vay)",[("loan_id","PK"),("cif","FK"),("branch_id","FK"),("outstanding_principal",""),("dpd  (ngày quá hạn)","")],NAVY,cw),
      _mcard("src_cards  (thẻ)",[("card_id","PK"),("account_no","FK"),("card_number_masked",""),("credit_limit / outstanding",""),("card_type / status","")],NAVY,cw),
      _mcard("src_loan_schedule  (lịch trả nợ)",[("loan_id + installment_no","PK"),("due_date",""),("principal_due / interest_due",""),("status","")],NAVY,cw),
    ]
    dims=[
      _mcard("dim_branch  (chiều chi nhánh)",[("branch_id","PK"),("branch_name",""),("region","")],colors.HexColor("#334155"),cw),
      _mcard("dim_product  (chiều sản phẩm)",[("product_code","PK"),("product_name",""),("product_group","")],colors.HexColor("#334155"),cw),
      _mcard("gl_balances  (sổ cái)",[("gl_account_code","PK"),("gl_account_name",""),("balance",""),("snapshot_date","")],colors.HexColor("#334155"),cw),
    ]
    dwh=[
      _mcard("dwh_loans  (dư nợ + nhóm nợ)",[("loan_id","PK"),("branch_name  (đã gắn)",""),("outstanding_principal",""),("debt_group  (đã tính)",""),("snapshot_date","")],colors.HexColor("#7c3aed"),cw),
      _mcard("dwh_account_balance",[("account_no","PK"),("branch_name / product_name",""),("balance",""),("snapshot_date","")],colors.HexColor("#7c3aed"),cw),
    ]
    out=[]
    head=Table([[Paragraph("CHUẨN BỊ  —  Mô hình dữ liệu mẫu", gb.st_part)]],colWidths=[CONTENT_W])
    head.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),NAVY),("LEFTPADDING",(0,0),(-1,-1),16),
        ("RIGHTPADDING",(0,0),(-1,-1),16),("TOPPADDING",(0,0),(-1,-1),16),("BOTTOMPADDING",(0,0),(-1,-1),16)]))
    out+=[head, Spacer(1,8),
      Paragraph("Sách dùng một bộ dữ liệu <b>hư cấu</b> mô phỏng 2 tầng. Hiểu mô hình này trước để chạy "
        "được mọi câu lệnh. Nhãn <font color='#f59e0b'><b>PK</b></font> = khóa chính, "
        "<font color='#10b981'><b>FK</b></font> = khóa ngoại (liên kết bảng khác).", gb.st_lead), Spacer(1,8),
      Paragraph("TẦNG NGUỒN (Core / OLTP) — chi tiết từng bản ghi", S("ml",parent=gb.st_label,textColor=NAVY,fontSize=10.5)), Spacer(1,4),
      _grid(src), Spacer(1,6),
      Paragraph("BẢNG CHIỀU (tham chiếu) & SỔ CÁI", S("ml3",parent=gb.st_label,textColor=NAVY,fontSize=9.5)), Spacer(1,4),
      _grid(dims), Spacer(1,5),
      _cap("Quan hệ: 1 Khách hàng (cif) → nhiều Tài khoản → nhiều Giao dịch. Khoản vay gắn theo cif. "
           "Tài khoản/khoản vay trỏ tới bảng chiều để lấy tên chi nhánh, tên sản phẩm."), Spacer(1,10),
      _etl_band(), Spacer(1,10),
      Paragraph("TẦNG ĐÍCH (DWH / OLAP) — đã tổng hợp & chuẩn hoá", S("ml2",parent=gb.st_label,textColor=NAVY,fontSize=10.5)), Spacer(1,4),
      _grid(dwh), Spacer(1,10),
      gb.color_box("DỮ LIỆU NGÂN HÀNG THƯỜNG LƯU THẾ NÀO",
        [Paragraph("<b>Lấy khách hàng (CIF) làm trung tâm</b> — mọi tài khoản, khoản vay, thẻ đều móc về một mã CIF duy nhất.", gb.st_box),
         gb.li("Tiền luôn là <b>DECIMAL</b> (không FLOAT) để không sai số khi cộng dồn."),
         gb.li("Giao dịch ghi <b>Nợ/Có</b> (dr_cr) và có <b>value_date</b> (ngày hiệu lực) tách khỏi ngày ghi sổ."),
         gb.li("Trạng thái là tập giá trị cố định: ACTIVE / DORMANT / CLOSED…"),
         gb.li("Cột <b>last_updated_date</b> để ETL nạp gia tăng (chỉ lấy bản ghi thay đổi)."),
         gb.li("<b>Tầng nguồn</b> giữ chi tiết từng giao dịch; <b>tầng DWH</b> đã tổng hợp, gắn thêm mô tả và (khi cần) che dữ liệu nhạy cảm."),
        ], LGREEN, GREEN, colors.HexColor("#047857")),
      Spacer(1,10),
    ]
    # --- Script tạo Database (trình bày giống sách 1: link tải + hướng dẫn Workbench) ---
    out.append(KeepTogether([
        Paragraph("Script tạo Database",
            S("h2s", parent=gb.st_label, textColor=NAVY, fontSize=10.5, spaceBefore=4)),
        Spacer(1, 4),
        Paragraph(
            "Thay vì gõ tay từng bảng, hãy tải file SQL dựng sẵn và chạy một lần duy nhất — "
            "database <b>banking_dwh_test</b> với đủ 11 bảng (2 tầng nguồn/DWH) cùng toàn bộ "
            "dữ liệu mẫu sẽ được tạo tự động.", gb.st_body)]))
    out.append(Spacer(1, 8))
    dl_tbl = Table([[Paragraph(
        '<b>Tải file:</b>  <a href="https://maiqai.com/books/banking_dwh_setup.sql" '
        'color="#1a56db">maiqai.com/books/banking_dwh_setup.sql</a>',
        S("dl2", fontName="Arial", fontSize=10, textColor=colors.HexColor("#1a56db")))]],
        colWidths=[CONTENT_W])
    dl_tbl.setStyle(TableStyle([
        ("BACKGROUND",   (0,0),(-1,-1), colors.HexColor("#eff6ff")),
        ("BOX",          (0,0),(-1,-1), 0.8, colors.HexColor("#93c5fd")),
        ("TOPPADDING",   (0,0),(-1,-1), 8),
        ("BOTTOMPADDING",(0,0),(-1,-1), 8),
        ("LEFTPADDING",  (0,0),(-1,-1), 12),
    ]))
    out.append(dl_tbl)
    out.append(Spacer(1, 8))
    out.append(Paragraph(
        "<b>Chạy trong MySQL Workbench:</b>  File → Open SQL Script → chọn file vừa tải "
        "→ nhấn <b>Ctrl+Shift+Enter</b>.",
        S("wb2", fontName="Arial", fontSize=9.5, textColor=colors.HexColor("#374151"))))
    out.append(Paragraph(
        "Script tự xóa và tạo lại database mỗi lần chạy — tiện để reset về trạng thái ban đầu "
        "sau khi thực hành. Mọi số liệu là hư cấu; một vài lỗi ETL được cài sẵn có chủ ý để bạn "
        "luyện phát hiện.",
        S("wb2n", fontName="Arial", fontSize=9, textColor=colors.HexColor("#6b7280"), spaceBefore=4)))
    out.append(Spacer(1, 6))
    out.append(gb.color_box("PHIÊN BẢN MYSQL",
        "Khuyến nghị <b>MySQL 8.0.31 trở lên</b> — các câu đối soát trong sách dùng <b>EXCEPT</b> "
        "(có từ 8.0.31). Nếu dùng bản cũ hơn, thay EXCEPT bằng LEFT JOIN như hướng dẫn ở hộp "
        "khác biệt dialect của từng mục. Kiểm tra phiên bản: "
        "<font face='Mono' size='8.5'>SELECT VERSION();</font>",
        LAMBER, AMBER, colors.HexColor("#b45309")))
    # --- Từ điển dữ liệu ---
    out.append(PageBreak())
    dh=Table([[Paragraph("TỪ ĐIỂN DỮ LIỆU  —  Giải thích từng trường", gb.st_part)]], colWidths=[CONTENT_W])
    dh.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),NAVY),("LEFTPADDING",(0,0),(-1,-1),16),
        ("RIGHTPADDING",(0,0),(-1,-1),16),("TOPPADDING",(0,0),(-1,-1),16),("BOTTOMPADDING",(0,0),(-1,-1),16)]))
    out += [dh, Spacer(1,8),
      Paragraph("Mỗi trường trong bộ dữ liệu mẫu, kèm kiểu và ý nghĩa nghiệp vụ:", gb.st_lead), Spacer(1,6)]
    for title, rows in D.DATA_DICT:
        out.append(KeepTogether([
            Paragraph(title, S("dt",parent=gb.st_label,textColor=NAVY,fontSize=10)),
            Spacer(1,3), field_table(title, rows)]))
        out.append(Spacer(1,9))
    return out

def render_entry(e):
    b=[]
    num=Table([[Paragraph(f"{e['id']:02d}", S("n",fontName="Arial-Bold",fontSize=17,textColor=colors.white,alignment=TA_CENTER)),
                Paragraph(e["title"], gb.st_entry)]], colWidths=[13*mm, CONTENT_W-13*mm])
    num.setStyle(TableStyle([("BACKGROUND",(0,0),(0,0),BLUE),("VALIGN",(0,0),(-1,-1),"MIDDLE"),
        ("TOPPADDING",(0,0),(-1,-1),6),("BOTTOMPADDING",(0,0),(-1,-1),6),
        ("LEFTPADDING",(1,0),(1,0),10),("BACKGROUND",(1,0),(1,0),LBLUE)]))
    b.append(num); b.append(Spacer(1,6))
    b.append(gb.color_box("YÊU CẦU CÔNG VIỆC", e["task"], LBLUE, BLUE, BLUE)); b.append(Spacer(1,6))
    b.append(gb.color_box("NGHIỆP VỤ CẦN BIẾT", e["domain"], LVIOLET, VIOLET, VIOLET)); b.append(Spacer(1,6))
    b.append(Paragraph("Dữ liệu liên quan", S("dl",parent=gb.st_label,textColor=NAVY)))
    b.append(Paragraph(e["data_note"], gb.st_body)); b.append(Spacer(1,4))
    b.append(Paragraph("CÂU LỆNH SQL", S("sq",parent=gb.st_label,keepWithNext=True)))
    b.append(gb.code_box(e["sql"]))
    if e.get("clauses") or e.get("clause_groups"):
        b.append(Spacer(1,5))
        b.append(Paragraph(
            "PHÂN TÍCH TỪNG MỆNH ĐỀ SQL  "
            "<font color='#64748b' size='8'>"
            "(theo thứ tự MySQL thực thi — FROM chạy trước SELECT)</font>",
            S("cl",parent=gb.st_label,textColor=BLUE,keepWithNext=True)))
        if e.get("clause_groups"):
            for gi,(gtitle, gclauses) in enumerate(e["clause_groups"]):
                if gi: b.append(Spacer(1,8))
                b.append(Paragraph(gtitle,
                    S("cg",fontName="Arial-Bold",fontSize=9.2,textColor=NAVY,
                      spaceBefore=2,spaceAfter=3,keepWithNext=True)))
                b.append(gb.clause_tbl(gclauses))
        else:
            b.append(gb.clause_tbl(e["clauses"]))
    b.append(Spacer(1,6))
    b.append(Paragraph("Kết quả sau khi query (minh họa)", S("kq",parent=gb.st_label,textColor=NAVY,keepWithNext=True)))
    if e.get("result_groups"):
        for ri,(rtitle, rheaders, rrows) in enumerate(e["result_groups"]):
            if ri: b.append(Spacer(1,7))
            b.append(Paragraph(rtitle,
                S("rg",fontName="Arial-Bold",fontSize=9,textColor=INK,
                  spaceBefore=2,spaceAfter=3,keepWithNext=True)))
            b.append(gb.result_table(rheaders, rrows))
    elif e.get("result_table"):
        b.append(gb.result_table(*e["result_table"]))
    if e.get("result_note"):
        b.append(Spacer(1,6))
        b.append(Paragraph("Phân tích kết quả",
            S("rn",parent=gb.st_label,textColor=NAVY,keepWithNext=True)))
        b.append(Paragraph(e["result_note"], gb.st_body))
    b.append(Spacer(1,6))
    b.append(gb.color_box("GÓC SOI LỖI CỦA TESTER", e["note"], LGREEN, GREEN, colors.HexColor("#047857")))
    if e.get("dialect_table") or e.get("dialect_note"):
        inner=[]
        if e.get("dialect_table"):
            dhd, drows = e["dialect_table"]
            dw = CONTENT_W - 26   # trừ padding trong color_box
            inner.append(gb.ref_table(dhd, drows,
                [dw*0.34, dw*0.15, dw*0.51], head_bg=colors.HexColor("#b45309")))
        if e.get("dialect_note"):
            if inner: inner.append(Spacer(1,6))
            inner.append(Paragraph(e["dialect_note"], gb.st_box))
        if e.get("dialect_code"):
            inner.append(Spacer(1,4))
            from reportlab.platypus import Preformatted
            dcw = CONTENT_W - 26
            dct = Table([[Preformatted(e["dialect_code"], gb.st_code)]], colWidths=[dcw])
            dct.setStyle(TableStyle([
                ("BACKGROUND", (0,0), (-1,-1), gb.CODEBG),
                ("LEFTPADDING", (0,0), (-1,-1), 10),
                ("RIGHTPADDING", (0,0), (-1,-1), 10),
                ("TOPPADDING", (0,0), (-1,-1), 8),
                ("BOTTOMPADDING", (0,0), (-1,-1), 8),
            ]))
            inner.append(dct)
        b.append(Spacer(1,5))
        b.append(gb.color_box("TRÊN ORACLE / SQL SERVER", inner, LAMBER, AMBER, colors.HexColor("#b45309")))
    b.append(Spacer(1,14))
    return b

def build():
    out_dir=os.path.join(HERE,"..","dist"); os.makedirs(out_dir,exist_ok=True)
    out=os.path.abspath(os.path.join(out_dir,"sql-data-tester-ngan-hang-MAU.pdf"))
    doc=BaseDocTemplate(out,pagesize=A4,leftMargin=LM,rightMargin=RM,topMargin=TM,bottomMargin=BM,
        title="SQL cho Data Tester Ngân hàng (bản mẫu)",author="maiqai.com")
    frame=Frame(LM,BM,CONTENT_W,PAGE_H-TM-BM,id="main")
    doc.addPageTemplates([
        PageTemplate(id="cover",frames=[frame],onPage=cover),
        PageTemplate(id="body",frames=[frame],onPage=lambda c,d: gb._footer(c,d,show_header=False))])
    st=[NextPageTemplate("body"), PageBreak()]

    # PHẦN 0 — Bức tranh tổng thể: ① luồng nghiệp vụ (gần gũi trước)
    st.extend(business_flow_page())
    # ② dữ liệu chảy qua hệ thống (kỹ thuật sau)
    st.append(PageBreak())
    st.append(Paragraph("(2) DỮ LIỆU CHẢY QUA HỆ THỐNG THẾ NÀO",
        S("s2",parent=gb.st_label,textColor=NAVY,fontSize=10.5))); st.append(Spacer(1,6))
    # A · Luồng dữ liệu
    st.append(KeepTogether([etl_flow(), Spacer(1,5),
        _cap("Data Tester kiểm ở MỌI mũi tên: dữ liệu qua mỗi tầng phải ĐÚNG · ĐỦ · KHÔNG TRÙNG.")]))
    st.append(Spacer(1,14))
    # B · OLTP vs OLAP
    st.append(KeepTogether([_sub("Hai đầu của ETL: OLTP (nguồn) và OLAP (đích)"), Spacer(1,4),
        oltp_olap_cards(), Spacer(1,4),
        _cap("Nôm na: OLTP là nơi GHI việc đang xảy ra; OLAP là nơi ĐỌC để phân tích. ETL chuyển từ trái sang phải.")]))
    st.append(Spacer(1,14))
    # C · 5 bước ETL testing
    st.append(KeepTogether([_sub("Kiểm thử một luồng ETL gồm 5 bước"), Spacer(1,5), etl_steps(), Spacer(1,4),
        _cap("Sách đi sâu từng bước; trọng tâm của tester là bước 3 (biến đổi đúng) và bước 5 (đối soát khớp).")]))
    st.append(Spacer(1,14))
    # D · MultiValue vs quan hệ
    st.append(KeepTogether([_sub("Vì sao Data Tester viết SQL ở tầng DWH, không phải hệ core"), Spacer(1,5),
        core_vs_dwh(), Spacer(1,4),
        _cap("Hệ core lưu 'nhiều giá trị trong một ô' nên SQL khó dùng thẳng; dữ liệu được chuẩn hóa sang bảng quan hệ ở DWH — nơi tester làm việc.")]))
    st.append(Spacer(1,12))
    st.append(gb.color_box("VAI TRÒ DATA TESTER TRONG BỨC TRANH NÀY",
        "Ở mỗi mũi tên (nghiệp vụ → nguồn → kho → báo cáo), tester viết SQL để trả lời: dữ liệu có "
        "<b>ĐÚNG</b> (khớp quy tắc nghiệp vụ), <b>ĐỦ</b> (không rơi rớt), và <b>KHỚP</b> "
        "(nguồn = kho = báo cáo) không. Sáu phần của sách lần lượt đi theo các luồng ở trên.",
        LGREEN, GREEN, colors.HexColor("#047857")))

    # CHUẨN BỊ — Mô hình dữ liệu
    st.append(PageBreak())
    st.extend(model_page())

    # PHẦN nghiệp vụ (mẫu)
    st.append(PageBreak())
    part=Table([[Paragraph("PHẦN 2  —  Đối soát dữ liệu (Reconciliation)", gb.st_part)]], colWidths=[CONTENT_W])
    part.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),NAVY),("LEFTPADDING",(0,0),(-1,-1),16),
        ("RIGHTPADDING",(0,0),(-1,-1),16),("TOPPADDING",(0,0),(-1,-1),16),("BOTTOMPADDING",(0,0),(-1,-1),16)]))
    st.append(part); st.append(Spacer(1,10))
    for e in D.ENTRIES:
        blocks=render_entry(e)
        st.append(KeepTogether(blocks[:4])); st.extend(blocks[4:])

    doc.build(st)
    return out

if __name__ == "__main__":
    print("Done:", build())
