from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from sqlalchemy import select, func
from app.db.database import SessionLocal, engine, Base
from app.db.model import Rate



# -----------------------------------
# APP SETUP
# -----------------------------------
app = FastAPI()

# Create DB tables (Neon PostgreSQL)
Base.metadata.create_all(bind=engine)

# -----------------------------------
# CORS
# -----------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://birrify.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# -----------------------------------
# SCHEDULER (auto update rates)
# -----------------------------------

# -----------------------------------
# RESPONSE MODELS (optional)
# -----------------------------------

class Currency(BaseModel):
    code: str

# -----------------------------------
# ROUTES
# -----------------------------------

@app.get("/")
def get_all_rates():
    db = SessionLocal()
   
    try:
        data = db.query(Rate).all()

        result = []

        for r in data:
            if r is None:
                continue  # skip broken rows

            result.append({ "id": r.id, "bank_id": r.bank_id, "bank_name": r.bank_name, "currency_code": r.currency_code, "buy": r.buy, "sell": r.sell, "created_at": r.created_at, })
        return result

    finally:
        db.close()

# -----------------------------------
# HIGH & LOW RATE
# -----------------------------------

@app.get("/high-low/{code}")
def get_highest_and_lowest(code: str):
    db = SessionLocal()

    try:
        highest = (
            db.query(Rate)
            .filter(Rate.currency_code == code.upper())
            .order_by(Rate.buy.desc())
            .first()
        )

        lowest = (
            db.query(Rate)
            .filter(Rate.currency_code == code.upper())
            .order_by(Rate.sell.asc())
            .first()
        )

        def format_rate(r):
            if not r:
                return None

            return {
                "id": r.id,
                "bank_id": r.bank_id,
                "bank_name": r.bank_name,
                "currency_code": r.currency_code,
                "buy": r.buy,
                "sell": r.sell,
                "created_at": r.created_at,
            }

        return {
            "highest": format_rate(highest),
            "lowest": format_rate(lowest),
        }

    finally:
        db.close()

# -----------------------------------
# AVERAGE
# -----------------------------------

@app.get("/average/{code}")
def get_averages(code: str):
    db = SessionLocal()

    try:
        result = db.execute(
            select(
                func.avg(Rate.buy),
                func.avg(Rate.sell)
            ).where(Rate.currency_code == code.upper())
        ).first()

        return {
            "average_buy": round(result[0] or 0, 2),
            "average_sell": round(result[1] or 0, 2)
        }

    finally:
        db.close()
#venv\Scripts\activate
#uvicorn app.main:app --reload



