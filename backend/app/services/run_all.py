from app.services.cbe import get_cbe_rates
from app.services.das import get_dashen_rates
from app.services.awe import get_awash_rates
from app.services.nbe import get_nib_rates
from app.services.heb import get_hibret_rates
from app.services.aby import get_abay_rates
from app.services.Boa import get_abyssinia_rates
from app.db.insert import insert_rate

from app.db.bankid import get_or_create_bank_id
from app.db.insert import insert_rate


def normalize(bank, currencies):
    clean = []
    seen = set()

    for c in currencies:
        code = c["code"].split(" - ")[0].strip()
        raw_code = c["code"].split(" - ")[0].strip()

        # 🔥 force 3-letter code
        code = raw_code[:3].upper()

        buy = c.get("buy") or c.get("buying")
        sell = c.get("sell") or c.get("selling")

        if not buy or not sell:
            continue

        if "nan" in str(buy).lower() or "nan" in str(sell).lower():
            continue

        key = (bank, code)
        if key in seen:
            continue

        seen.add(key)

        clean.append({
            "code": code,
            "buy": buy,
            "sell": sell
        })

    return {
        "bank": bank,
        "currencies": clean
    }



def run_all():
    return [
        normalize("cbe", get_cbe_rates()["currencies"]),
        normalize("dashen", get_dashen_rates()["currencies"]),
        normalize("awash", get_awash_rates()["currencies"]),
        normalize("nib", get_nib_rates()["currencies"]),
        normalize("abyssinia", get_abyssinia_rates()["currencies"]),
        normalize("abay", get_abay_rates()["currencies"]),
        normalize("hibret", get_hibret_rates()["currencies"]),
    ]




for bank in run_all():
    bank_name = bank["bank"]
    bank_id = get_or_create_bank_id(bank_name)
    for c in bank["currencies"]:
         insert_rate(
                bank_id=bank_id,
                bank_name=bank_name,
                code=c["code"],
                buy=c["buy"],
                sell=c["sell"]
            )
