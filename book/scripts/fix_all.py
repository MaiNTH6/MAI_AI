# -*- coding: utf-8 -*-
"""
Script sua tong hop cho _book_sql_data.py (one-off, da ap dung)
Chay: python book/scripts/fix_all.py
"""
import os

filepath = os.path.join(os.path.dirname(os.path.abspath(__file__)), '_book_sql_data.py')

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

changes = 0

# ============================================================
# FIX CAU 39: Lines 2513-2518 (0-indexed: 2512-2517)
# Replace corrupted explain + add missing result_table/note
# ============================================================
# Find the corrupted explain line
for i, line in enumerate(lines):
    if 'NOT EXISTS cannot filter by date condition.' in line:
        # Found line 2517 (0-indexed i). The explain starts at i-3
        start = i - 3  # "explain": line
        end = i + 1    # }, line
        
        new_block = [
            '  "explain":\n',
            '    "C\u00e2u 11 (= ANY difference) vs C\u00e2u 39 (&gt; 1.5\u00d7): hai m\u1ee9c \u0111\u1ed9 ki\u1ec3m tra kh\u00e1c nhau.<br/>"\n',
            '    "ORD_001: tinh_tu_items = 62M, total_amount = 32M &gt; 48M \u2192 b\u1ecb b\u1eaft.<br/>"\n',
            '    "ORD_002: tinh_tu_items = 31M, total_amount = 20M &gt; 30M \u2192 b\u1ecb b\u1eaft.<br/>"\n',
            '    "C\u1ea3 hai \u0111\u1ec1u b\u1ecb b\u1eaft: ORD_001 do item tr\u00f9ng, ORD_002 do Bug-B (total_amount b\u1ecb ghi th\u1ea5p).",\n',
            '  "result_table": (\n',
            '    ["order_id","total_amount","tinh_tu_items"],\n',
            '    [\n',
            '      ["ORD_001","32.000.000","62.000.000"],\n',
            '      ["ORD_002","20.000.000","31.000.000"],\n',
            '    ]\n',
            '  ),\n',
            '  "result_note":\n',
            '    "2 \u0111\u01a1n v\u01b0\u1ee3t ng\u01b0\u1ee1ng 1.5\u00d7. ORD_001: 62M vs 32M (do item tr\u00f9ng). "\n',
            '    "ORD_002: 31M vs 20M (do Bug-B). Hai nguy\u00ean nh\u00e2n kh\u00e1c nhau, c\u00f9ng c\u00e2u ph\u00e1t hi\u1ec7n.",\n',
            '  "note":\n',
            '    "\u0110i\u1ec1u ch\u1ec9nh ng\u01b0\u1ee1ng t\u00f9y ng\u1eef c\u1ea3nh nghi\u1ec7p v\u1ee5:<br/>"\n',
            '    "(1) <b>&gt; 1.5\u00d7</b>: b\u1eaft l\u1ec7ch l\u1edbn, b\u1ecf qua discount/ph\u00ed nh\u1ecf (c\u00e2u n\u00e0y).<br/>"\n',
            '    "(2) <b>!= (b\u1ea5t k\u1ef3 l\u1ec7ch)</b>: b\u1eaft t\u1ea5t c\u1ea3 sai l\u1ec7ch d\u00f9 nh\u1ecf (C\u00e2u 11).<br/>"\n',
            '    "(3) <b>&gt; 2\u00d7</b>: ch\u1ec9 b\u1eaft l\u1ec7ch nghi\u00eam tr\u1ecdng nh\u1ea5t.<br/>"\n',
            '    "V\u1edbi h\u1ec7 th\u1ed1ng c\u00f3 discount, n\u00ean k\u1ebft h\u1ee3p th\u00eam \u0111i\u1ec1u ki\u1ec7n "\n',
            '    "lo\u1ea1i tr\u1eeb \u0111\u01a1n c\u00f3 coupon tr\u01b0\u1edbc khi \u00e1p ng\u01b0\u1ee1ng.",\n',
            '},\n',
        ]
        
        lines[start:end+1] = new_block
        changes += 1
        print(f"[OK] Cau 39: Replaced lines {start+1}-{end+1} with correct content")
        break
else:
    # Try the original Vietnamese text
    for i, line in enumerate(lines):
        if 'NOT EXISTS kh\u00f4ng l\u00e0m \u0111\u01b0\u1ee3c' in line:
            start = i - 3
            end = i + 1
            new_block = [
                '  "explain":\n',
                '    "C\u00e2u 11 (= ANY difference) vs C\u00e2u 39 (&gt; 1.5\u00d7): hai m\u1ee9c \u0111\u1ed9 ki\u1ec3m tra kh\u00e1c nhau.<br/>"\n',
                '    "ORD_001: tinh_tu_items = 62M, total_amount = 32M &gt; 48M \u2192 b\u1ecb b\u1eaft.<br/>"\n',
                '    "ORD_002: tinh_tu_items = 31M, total_amount = 20M &gt; 30M \u2192 b\u1ecb b\u1eaft.<br/>"\n',
                '    "C\u1ea3 hai \u0111\u1ec1u b\u1ecb b\u1eaft: ORD_001 do item tr\u00f9ng, ORD_002 do Bug-B (total_amount b\u1ecb ghi th\u1ea5p).",\n',
                '  "result_table": (\n',
                '    ["order_id","total_amount","tinh_tu_items"],\n',
                '    [\n',
                '      ["ORD_001","32.000.000","62.000.000"],\n',
                '      ["ORD_002","20.000.000","31.000.000"],\n',
                '    ]\n',
                '  ),\n',
                '  "result_note":\n',
                '    "2 \u0111\u01a1n v\u01b0\u1ee3t ng\u01b0\u1ee1ng 1.5\u00d7. ORD_001: 62M vs 32M (do item tr\u00f9ng). "\n',
                '    "ORD_002: 31M vs 20M (do Bug-B). Hai nguy\u00ean nh\u00e2n kh\u00e1c nhau, c\u00f9ng c\u00e2u ph\u00e1t hi\u1ec7n.",\n',
                '  "note":\n',
                '    "\u0110i\u1ec1u ch\u1ec9nh ng\u01b0\u1ee1ng t\u00f9y ng\u1eef c\u1ea3nh nghi\u1ec7p v\u1ee5:<br/>"\n',
                '    "(1) <b>&gt; 1.5\u00d7</b>: b\u1eaft l\u1ec7ch l\u1edbn, b\u1ecf qua discount/ph\u00ed nh\u1ecf (c\u00e2u n\u00e0y).<br/>"\n',
                '    "(2) <b>!= (b\u1ea5t k\u1ef3 l\u1ec7ch)</b>: b\u1eaft t\u1ea5t c\u1ea3 sai l\u1ec7ch d\u00f9 nh\u1ecf (C\u00e2u 11).<br/>"\n',
                '    "(3) <b>&gt; 2\u00d7</b>: ch\u1ec9 b\u1eaft l\u1ec7ch nghi\u00eam tr\u1ecdng nh\u1ea5t.<br/>"\n',
                '    "V\u1edbi h\u1ec7 th\u1ed1ng c\u00f3 discount, n\u00ean k\u1ebft h\u1ee3p th\u00eam \u0111i\u1ec1u ki\u1ec7n "\n',
                '    "lo\u1ea1i tr\u1eeb \u0111\u01a1n c\u00f3 coupon tr\u01b0\u1edbc khi \u00e1p ng\u01b0\u1ee1ng.",\n',
                '},\n',
            ]
            lines[start:end+1] = new_block
            changes += 1
            print(f"[OK] Cau 39: Replaced lines {start+1}-{end+1}")
            break
    else:
        print("[SKIP] Cau 39: Could not find corrupted text")

# Rejoin and do string replacements
content = ''.join(lines)

# ============================================================
# FIX #1: Cross-reference
# ============================================================
old_ref = "do item tr\u00f9ng (C\u00e2u 10/46)"
new_ref = "do item tr\u00f9ng (C\u00e2u 2/46)"
if old_ref in content:
    content = content.replace(old_ref, new_ref)
    changes += 1
    print("[OK] Fix #1: Cross-ref Cau 10/46 -> Cau 2/46")

# ============================================================
# FIX #2+3: ORD_005 result updates
# ============================================================

# Cau 11: Add ORD_005 row
old = '      ["ORD_002","20.000.000","31.000.000","-11.000.000"],\n    ]\n  ),\n  "result_note":\n    "2 \u0111\u01a1n l\u1ec7ch'
new = '      ["ORD_002","20.000.000","31.000.000","-11.000.000"],\n      ["ORD_005","15.000.000","3.000.000","12.000.000"],\n    ]\n  ),\n  "result_note":\n    "3 \u0111\u01a1n l\u1ec7ch'
if old in content:
    content = content.replace(old, new, 1)
    changes += 1
    print("[OK] Cau 11: Added ORD_005 row")

# Cau 11: Update result_note
old = '    "2 \u0111\u01a1n l\u1ec7ch: ORD_001 do item tr\u00f9ng (item 7 nh\u00e2n \u0111\u00f4i item 1 \u2192 t\u1ed5ng items = 62M); "\n    "ORD_002 do total_amount ghi sai (Bug-B). C\u00f9ng tri\u1ec7u ch\u1ee9ng \u2014 kh\u00e1c nguy\u00ean nh\u00e2n.",'
new = '    "3 \u0111\u01a1n l\u1ec7ch: ORD_001 do item tr\u00f9ng (62M vs 32M); "\n    "ORD_002 do total_amount ghi sai (31M vs 20M); "\n    "ORD_005 \u0111\u00e3 b\u1ecb x\u00f3a m\u1ec1m nh\u01b0ng v\u1eabn tham gia \u0111\u1ed1i so\u00e1t \u2014 minh h\u1ecda bug C\u00e2u 10 (soft-delete leak).",'
if old in content:
    content = content.replace(old, new, 1)
    changes += 1
    print("[OK] Cau 11: Updated result_note")

# Cau 19: C001 2 orders
old = '["C001","Nguyen Van A", 1,"32.000.000"]'
new = '["C001","Nguyen Van A", 2,"47.000.000"]'
if old in content:
    content = content.replace(old, new, 1)
    changes += 1
    print("[OK] Cau 19: C001 updated to 2 orders, 47M")

# Cau 22: PROD_002 qty
old = '["PROD_002","Ban phim co Logitech",    1,  "2.000.000"],'
new = '["PROD_002","Ban phim co Logitech",    2,  "4.000.000"],'
if old in content:
    content = content.replace(old, new, 1)
    changes += 1
    print("[OK] Cau 22: PROD_002 updated")

# Cau 22: PROD_004 qty
old = '["PROD_004","Sac du phong Anker",      1,  "1.000.000"],'
new = '["PROD_004","Sac du phong Anker",      2,  "2.000.000"],'
if old in content:
    content = content.replace(old, new, 1)
    changes += 1
    print("[OK] Cau 22: PROD_004 updated")

# Cau 26: percentages
old = '["COMPLETED", 2, "50.0"],\n      ["CANCELLED", 1, "25.0"],\n      ["PENDING",   1, "25.0"],'
new = '["COMPLETED", 2, "40.0"],\n      ["CANCELLED", 2, "40.0"],\n      ["PENDING",   1, "20.0"],'
if old in content:
    content = content.replace(old, new, 1)
    changes += 1
    print("[OK] Cau 26: Percentages updated")

# Cau 27: Phu kien
old = '"Phu kien",   3, 3, "11.000.000"'
new = '"Phu kien",   4, 5, "14.000.000"'
if old in content:
    content = content.replace(old, new, 1)
    changes += 1
    print("[OK] Cau 27: Phu kien updated")

# Cau 28: PROD_002
old = '["PROD_002","Ban phim co Logitech", 100,     1, 101],'
new = '["PROD_002","Ban phim co Logitech", 100,     2, 102],'
if old in content:
    content = content.replace(old, new, 1)
    changes += 1
    print("[OK] Cau 28: PROD_002 tong_da_ban updated")

# Cau 28: PROD_004
old = '["PROD_004","Sac du phong Anker",    20,     1,  21],'
new = '["PROD_004","Sac du phong Anker",    20,     2,  22],'
if old in content:
    content = content.replace(old, new, 1)
    changes += 1
    print("[OK] Cau 28: PROD_004 tong_da_ban updated")

# Cau 30: AVG
old = 'AVG = 16.250.000'
new = 'AVG = 16.000.000'
cnt = content.count(old)
if cnt > 0:
    content = content.replace(old, new)
    changes += 1
    print(f"[OK] Cau 30: AVG updated ({cnt} occurrences)")

old = '24.375.000'
new = '24.000.000'
cnt = content.count(old)
if cnt > 0:
    content = content.replace(old, new)
    changes += 1
    print(f"[OK] Cau 30: Threshold updated ({cnt} occurrences)")

# Cau 45: Add C001
old = '    [["C003","Le Thi C",1]],'
new = '    [\n      ["C001","Nguyen Van A",1],\n      ["C003","Le Thi C",1],\n    ]'
if old in content:
    content = content.replace(old, new, 1)
    changes += 1
    print("[OK] Cau 45: Added C001 to cancelled list")

# Cau 47: PROD_002
old = '["PROD_002","Ban phim co Logitech",     "2.000.000",  3],'
new = '["PROD_002","Ban phim co Logitech",     "4.000.000",  3],'
if old in content:
    content = content.replace(old, new, 1)
    changes += 1
    print("[OK] Cau 47: PROD_002 doanh_so updated")

# Cau 47: PROD_004
old = '["PROD_004","Sac du phong Anker",       "1.000.000",  4],'
new = '["PROD_004","Sac du phong Anker",       "2.000.000",  4],'
if old in content:
    content = content.replace(old, new, 1)
    changes += 1
    print("[OK] Cau 47: PROD_004 doanh_so updated")

# Cau 49: Add ORD_005 row
old = '      ["ORD_004","C999","2026-06-24", "5.000.000","65.000.000"],\n    ]\n  ),'
new = '      ["ORD_004","C999","2026-06-24", "5.000.000","65.000.000"],\n      ["ORD_005","C001","2026-06-25","15.000.000","80.000.000"],\n    ]\n  ),'
if old in content:
    content = content.replace(old, new, 1)
    changes += 1
    print("[OK] Cau 49: Added ORD_005 row")

# Cau 49: result_note 65M -> 80M
old = '    "luy_ke = 65M'
new = '    "luy_ke = 80M'
if old in content:
    content = content.replace(old, new, 1)
    changes += 1
    print("[OK] Cau 49: luy_ke 65M -> 80M")

# ============================================================
# SAVE
# ============================================================
with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\n=== DONE: {changes} changes applied ===")
