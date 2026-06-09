from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from sqlalchemy import select, func
from app.db.database import SessionLocal, engine, Base
from app.db.model import Rate
from datetime import datetime, timedelta



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
    allow_origins=["*"],
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

class date(BaseModel):
    date:str
# -----------------------------------
# ROUTES
# -----------------------------------

@app.get("/health")
def health_check():
    return {"status": "ok"}




@app.get("/rates/{date}")
def get_all_rates(date:str):
    db = SessionLocal()
   
    try:
        date_obj = datetime.strptime(date, "%Y-%m-%d")

        data = db.query(Rate).filter(
            Rate.created_at >= date_obj,
            Rate.created_at < date_obj + timedelta(days=1)
        ).all()

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
# AVERAGE FRO
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


@app.get("/chart/{code}")
def get_chart_data(code: str):
    db = SessionLocal()

    try:
        result = db.execute(
            select(
                func.date(Rate.created_at).label("date"),
                func.avg(Rate.buy).label("avg_buy"),
                func.avg(Rate.sell).label("avg_sell")
            )
            .where(Rate.currency_code == code.upper())
            .group_by(func.date(Rate.created_at))
            .order_by(func.date(Rate.created_at))
        ).all()

        return [
            {
                "date": row.date,
                "buy": round(row.avg_buy or 0, 2),
                "sell": round(row.avg_sell or 0, 2)
            }
            for row in result
        ]

    finally:
        db.close()
#venv\Scripts\activate
#uvicorn app.main:app --reload



