from app.services.run_all import save_all_rates

if __name__ == "__main__":
    print("🚀 Starting daily scrape job...")
    save_all_rates()
    print("✅ Finished daily scrape job")