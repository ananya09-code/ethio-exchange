from .database import SessionLocal
from .model import Rate

from datetime import datetime


def insert_rate(bank_id, bank_name, code, buy, sell):

    db = SessionLocal()

    try:

        # ----------------------------
        # CLEAN DATA
        # ----------------------------

        code = code.strip().upper()
        bank_name = bank_name.strip().lower()

        buy = float(buy)
        sell = float(sell)

        # ----------------------------
        # CHECK EXISTING RATE
        # ----------------------------

        existing_rate = (
            db.query(Rate)
            .filter(
                Rate.bank_id == bank_id,
                Rate.currency_code == code
            )
            .first()
        )

        # ----------------------------
        # UPDATE EXISTING
        # ----------------------------

        if existing_rate:

            existing_rate.buy = buy
            existing_rate.sell = sell
            existing_rate.bank_name = bank_name
            existing_rate.created_at = datetime.utcnow()

        # ----------------------------
        # INSERT NEW
        # ----------------------------

        else:

            new_rate = Rate(
                bank_id=bank_id,
                bank_name=bank_name,
                currency_code=code,
                buy=buy,
                sell=sell,
            )

            db.add(new_rate)

        # ----------------------------
        # SAVE TO NEON
        # ----------------------------

        db.commit()

    except Exception as e:

        db.rollback()
        print("INSERT ERROR:", e)

    finally:

        db.close()