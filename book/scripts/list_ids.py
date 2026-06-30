import sys, os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
import _book_sql_data

ids = [entry.get("id") for entry in _book_sql_data.ENTRIES]
print("Number of entries:", len(_book_sql_data.ENTRIES))
print("IDs in list:", ids)
