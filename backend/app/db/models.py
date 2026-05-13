import sqlite3
from pathlib import Path

DB_PATH = Path("exchange.db")

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def create_tables():
    conn = get_connection()
    cur = conn.cursor()

    # ----------------------------
    # BANKS TABLE (source of truth)
    # ----------------------------
    cur.execute("""
    CREATE TABLE IF NOT EXISTS banks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL
    )
    """)

    # ----------------------------
    # RATES TABLE (hybrid model)
    # ----------------------------
    cur.execute("""
    CREATE TABLE IF NOT EXISTS rates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        bank_id INTEGER,
        bank_name TEXT NOT NULL,
        currency_code TEXT NOT NULL,
        buy REAL,
        sell REAL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        
        FOREIGN KEY (bank_id) REFERENCES banks(id)
    )
    """)

    # ----------------------------
    # INDEXES (important for speed)
    # ----------------------------
    cur.execute("""
    CREATE INDEX IF NOT EXISTS idx_rates_bank
    ON rates(bank_id)
    """)

    cur.execute("""
    CREATE INDEX IF NOT EXISTS idx_rates_currency
    ON rates(currency_code)
    """)

    cur.execute("""
    CREATE INDEX IF NOT EXISTS idx_rates_created
    ON rates(created_at)
    """)

    conn.commit()
    conn.close()

