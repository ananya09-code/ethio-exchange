from app.db.database import get_connection

def get_highest_usd_buy():

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT bank_name, buy
        FROM rates
        WHERE currency_code = 'USD'
        ORDER BY buy DESC
        LIMIT 1;
    """)

    result = cur.fetchone()

    conn.close()

    return result

