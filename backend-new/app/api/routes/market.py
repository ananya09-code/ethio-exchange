from datetime import datetime, time, timedelta

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.model import Rate


router = APIRouter(
    prefix="/api/market",
    tags=["Market"],
)


SUPPORTED_CURRENCIES = {
    "USD": "US Dollar",
    "EUR": "Euro",
    "GBP": "British Pound",
    "AED": "UAE Dirham",
    "SAR": "Saudi Riyal",
}


@router.get("/")
def get_market(
    currency: str = Query(
        default="USD",
        description="Currency code.",
    ),
    db: Session = Depends(get_db),
):
    requested_currency = currency.upper()

    if requested_currency not in SUPPORTED_CURRENCIES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported currency: {requested_currency}",
        )

    today = datetime.now().date()

    start_datetime = datetime.combine(today, time.min)
    end_datetime = datetime.combine(
        today + timedelta(days=1),
        time.min,
    )

    rates = (
        db.query(Rate)
        .filter(
            Rate.currency_code == requested_currency,
            Rate.created_at >= start_datetime,
            Rate.created_at < end_datetime,
        )
        .order_by(Rate.created_at.desc())
        .all()
    )

    if not rates:
        raise HTTPException(
            status_code=404,
            detail=f"No {requested_currency} rates found for {today}.",
        )

    average_buy = sum(rate.buy for rate in rates) / len(rates)
    average_sell = sum(rate.sell for rate in rates) / len(rates)

    lowest_buy = min(rate.buy for rate in rates)
    highest_buy = max(rate.buy for rate in rates)

    lowest_sell = min(rate.sell for rate in rates)
    highest_sell = max(rate.sell for rate in rates)

    spread = average_sell - average_buy

    latest_rate = max(
        rates,
        key=lambda rate: rate.created_at,
    )

    # Count unique banks, not individual rate records.
    banks_count = len(
        {
            rate.bank_id
            for rate in rates
            if rate.bank_id is not None
        }
    )

    return {
        "currency": requested_currency,
        "date": today.isoformat(),
        "market": {
            "average_buy": round(average_buy, 4),
            "average_sell": round(average_sell, 4),
            "spread": round(spread, 4),
            "lowest_buy": round(lowest_buy, 4),
            "highest_buy": round(highest_buy, 4),
            "lowest_sell": round(lowest_sell, 4),
            "highest_sell": round(highest_sell, 4),
        },
        "banks_count": banks_count,
        "last_updated": latest_rate.created_at.isoformat(),
    }
