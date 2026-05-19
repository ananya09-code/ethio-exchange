from app.services.cbe import get_cbe_rates
from app.services.das import get_dashen_rates
from app.services.awe import get_awash_rates
from app.services.nbe import get_nib_rates
from app.services.heb import get_hibret_rates
from app.services.aby import get_abay_rates
from app.services.Boa import get_abyssinia_rates

from app.db.insert import insert_rate
from app.db.bankid import get_or_create_bank_id


# -----------------------------
# NORMALIZATION
# -----------------------------
def normalize(bank, currencies):
    clean = []
    seen = set()

    def safe_float(x):
        if x is None:
            return None
        x = str(x).strip()
        if x in ["-", "", "N/A", "NaN", "nan"]:
            return None
        try:
            return float(x.replace(",", ""))
        except:
            return None

    for c in currencies:
        raw_code = (c.get("code") or "").split(" - ")[0].strip()
        code = raw_code[:3].upper()

        buy = safe_float(c.get("buy") or c.get("buying"))
        sell = safe_float(c.get("sell") or c.get("selling"))

        if buy is None or sell is None:
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


# -----------------------------
# SAFE RUN ALL SCRAPERS
# -----------------------------
def run_all():
    results = []

    scrapers = [
        ("cbe", get_cbe_rates),
        ("dashen", get_dashen_rates),
        ("awash", get_awash_rates),
        ("nib", get_nib_rates),
        ("abyssinia", get_abyssinia_rates),
        ("abay", get_abay_rates),
        ("hibret", get_hibret_rates),
    ]

    for bank_name, scraper in scrapers:
        try:
            print(f"🔄 Scraping {bank_name}...")

            result = scraper()
            currencies = result.get("currencies", [])

            normalized = normalize(bank_name, currencies)
            results.append(normalized)

            print(f"✅ {bank_name} success")

        except Exception as e:
            print(f"❌ {bank_name} failed: {e}")
            continue

    return results


# -----------------------------
# SAVE TO DATABASE SAFELY
# -----------------------------
def save_all_rates():
    banks = run_all()

    for bank in banks:
        try:
            bank_name = bank["bank"]
            bank_id = get_or_create_bank_id(bank_name)

            for c in bank["currencies"]:
                try:
                    insert_rate(
                        bank_id=bank_id,
                        bank_name=bank_name,
                        code=c["code"],
                        buy=c["buy"],
                        sell=c["sell"]
                    )
                except Exception as e:
                    print(f"⚠️ Insert failed {bank_name}-{c['code']}: {e}")
                    continue

        except Exception as e:
            print(f"❌ DB error for {bank.get('bank')}: {e}")
            continue


# -----------------------------
# OPTIONAL MANUAL RUN
# -----------------------------
if __name__ == "__main__":
    save_all_rates()