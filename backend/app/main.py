from fastapi import FastAPI
from app.api.apidatabase import SessionLocal
from app.api.apimodel import Rate
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select,func
from pydantic import BaseModel
app = FastAPI()
class currency(BaseModel):
    code:str

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def get_all_rates():
    db = SessionLocal()

    try:
        data = db.query(Rate).all()

        # convert ORM objects → dict
        result = []
        for r in data:
            result.append({
                "id": r.id,
                "bank_id": r.bank_id,
                "bank_name": r.bank_name,
                "currency_code": r.currency_code,
                "buy": r.buy,
                "sell": r.sell,
                "created_at": r.created_at,
            })

        return result

    finally:
        db.close()



@app.post("/high&low/{code}")
def get_usd_highest_and_lowest(code: str):

    db = SessionLocal()

    with db as session:

        highest = session.execute(
            select(Rate)
            .where(Rate.currency_code == code.upper())
            .order_by(Rate.buy.desc())
            .limit(1)
        ).scalar_one_or_none()

        lowest = session.execute(
            select(Rate)
            .where(Rate.currency_code == code.upper())
            .order_by(Rate.buy.asc())
            .limit(1)
        ).scalar_one_or_none()

        return {
            "highest": highest,
            "lowest": lowest
        }




@app.post("/avage/{code}")
def get_usd_averages(code:str):

    with SessionLocal() as session:

        result = session.execute(
            select(
                func.avg(Rate.buy),
                func.avg(Rate.sell)
            )
            .where(Rate.currency_code == code.upper(
                
            ))
        ).first()

        return {
            "average_buy": round(result[0], 2),
            "average_sell": round(result[1], 2)
        }
#venv\Scripts\activate
#uvicorn app.main:app --reload