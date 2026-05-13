from app.db.database import get_connection

def insert_rate(bank_id, bank_name, code, buy, sell):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO rates (bank_id, bank_name, currency_code, buy, sell)
        VALUES (?, ?, ?, ?, ?)
    """, (bank_id, bank_name, code, buy, sell))

    conn.commit()
    conn.close()