from app.db.database import get_connection

def get_or_create_bank_id(name: str):
    conn = get_connection()
    cur = conn.cursor()

    # check if bank exists
    cur.execute("SELECT id FROM banks WHERE name = ?", (name,))
    row = cur.fetchone()

    if row:
        conn.close()
        return row[0]

    # insert if not exists
    cur.execute("INSERT INTO banks (name) VALUES (?)", (name,))
    conn.commit()

    bank_id = cur.lastrowid
    conn.close()

    return bank_id