import os
from app.db.models import DB_PATH, create_tables

def reset_database():
    if DB_PATH.exists():
        os.remove(DB_PATH)
        print("🧨 Database deleted successfully!")

    create_tables()
    print("✅ Fresh database created!")


if __name__ == "__main__":
    reset_database()