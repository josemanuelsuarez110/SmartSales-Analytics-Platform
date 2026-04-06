import sqlite3
import os

db_path = "aibi_platform.db"
if not os.path.exists(db_path):
    print(f"❌ Database file {db_path} NOT FOUND")
else:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    print(f"✅ Tables found in {db_path}: {[t[0] for t in tables]}")
    conn.close()
