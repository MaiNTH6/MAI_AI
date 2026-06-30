# -*- coding: utf-8 -*-
import sys
import os
import pymysql
import re

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
import _book_sql_data

# Connect to MySQL
try:
    conn = pymysql.connect(
        host='127.0.0.1',
        port=3306,
        user='root',
        password='',
        charset='utf8mb4',
        cursorclass=pymysql.cursors.Cursor
    )
    print("Connected to MySQL successfully!")
except Exception as e:
    print(f"Connection failed: {e}")
    sys.exit(1)

cursor = conn.cursor()

# Nạp dữ liệu mẫu từ file companion (bản chuẩn, khớp nội dung sách)
setup_file = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                          '..', 'sql', 'ecommerce_test_setup.sql')

with open(setup_file, 'r', encoding='utf-8') as f:
    setup_content = f.read()

# Strip comments and get statements
def get_clean_statements(sql_content):
    clean_lines = []
    for line in sql_content.split('\n'):
        if '--' in line:
            line = line.split('--')[0]
        if '#' in line:
            line = line.split('#')[0]
        line = line.strip()
        if line:
            clean_lines.append(line)
    
    clean_content = ' '.join(clean_lines)
    statements = [s.strip() for s in clean_content.split(';') if s.strip()]
    return statements

statements = get_clean_statements(setup_content)
for stmt in statements:
    try:
        cursor.execute(stmt)
    except Exception as e:
        if 'DROP TABLE' not in stmt:
            pass

conn.commit()
cursor.execute("USE ecommerce_test;")

def normalize_value(val):
    if val is None:
        return None
    val_str = str(val).strip()
    if val_str.upper() in ('NONE', '(NULL)', 'NULL'):
        return None
    if re.match(r'^-?\d+(\.\d{3})+$', val_str):
        val_str = val_str.replace('.', '')
    try:
        f = float(val_str)
        if f.is_integer():
            return int(f)
        return f
    except ValueError:
        return val_str.lower()

def compare_results(expected_cols, expected_rows, actual_cols, actual_rows):
    norm_expected_cols = [c.lower() for c in expected_cols]
    norm_actual_cols = [c.lower() for c in actual_cols]
    if norm_expected_cols != norm_actual_cols:
        return False, f"Columns mismatch: expected {norm_expected_cols}, got {norm_actual_cols}"
    
    if len(expected_rows) != len(actual_rows):
        return False, f"Row count mismatch: expected {len(expected_rows)}, got {len(actual_rows)}"
    
    for r_idx, (e_row, a_row) in enumerate(zip(expected_rows, actual_rows)):
        norm_e_row = [normalize_value(x) for x in e_row]
        norm_a_row = [normalize_value(x) for x in a_row]
        if norm_e_row != norm_a_row:
            return False, f"Row {r_idx} mismatch: expected {norm_e_row}, got {norm_a_row}"
            
    return True, "MATCH"

# Generate Markdown Report
report_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'sql_verification_report.md')
report_lines = [
    "# SQL Verification Audit Report",
    "",
    "This report verifies every SQL query defined in `_book_sql_data.py` against the actual MySQL `ecommerce_test` database.",
    "",
    "| Question ID | Title | Status | Details |",
    "|---|---|---|---|",
]

details_section = ["", "## Detailed Execution Logs", ""]

matches = 0
mismatches = 0
skipped = 0

for entry in _book_sql_data.ENTRIES:
    q_id = entry.get("id")
    title = entry.get("title")
    sql = entry.get("sql")
    expected_table = entry.get("result_table")
    
    # Safe title
    safe_title = title.encode('ascii', errors='replace').decode('ascii')
    
    if not sql or not expected_table:
        report_lines.append(f"| {q_id} | {title} | SKIPPED | No SQL or result_table defined |")
        skipped += 1
        continue
        
    expected_cols = expected_table[0]
    expected_rows = expected_table[1]
    
    try:
        sql_clean = sql.strip().rstrip(';')
        cursor.execute(sql_clean)
        actual_rows = cursor.fetchall()
        actual_cols = [col[0] for col in cursor.description]
        
        is_match, reason = compare_results(expected_cols, expected_rows, actual_cols, actual_rows)
        
        if is_match:
            report_lines.append(f"| {q_id} | {title} | ✅ MATCH | OK |")
            matches += 1
        else:
            report_lines.append(f"| {q_id} | {title} | ❌ MISMATCH | {reason} |")
            mismatches += 1
            
        # Add detailed log
        details_section.append(f"### Câu {q_id}: {title}")
        details_section.append("#### SQL Query:")
        details_section.append(f"```sql\n{sql}\n```")
        details_section.append("#### Expected result_table:")
        details_section.append(f"Columns: `{expected_cols}`")
        details_section.append("Rows:")
        details_section.append("```python")
        for r in expected_rows:
            details_section.append(f"  {r}")
        details_section.append("```")
        details_section.append("#### Actual Database Output:")
        details_section.append(f"Columns: `{actual_cols}`")
        details_section.append("Rows:")
        details_section.append("```python")
        for r in actual_rows:
            details_section.append(f"  {list(r)}")
        details_section.append("```")
        details_section.append(f"**Verification status**: {'✅ MATCH' if is_match else '❌ MISMATCH (' + reason + ')'}")
        details_section.append("---")
            
    except Exception as e:
        report_lines.append(f"| {q_id} | {title} | 💥 ERROR | {e} |")
        details_section.append(f"### Câu {q_id}: {title}")
        details_section.append("#### SQL Query:")
        details_section.append(f"```sql\n{sql}\n```")
        details_section.append(f"**Error**: {e}")
        details_section.append("---")
        mismatches += 1

report_lines.extend(details_section)

# Save Report
with open(report_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(report_lines))

print(f"Audit completed: {matches} MATCHED, {mismatches} MISMATCHED, {skipped} SKIPPED.")
print(f"Report written to: {report_path}")

conn.close()

if mismatches > 0:
    sys.exit(1)
else:
    sys.exit(0)
