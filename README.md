# 🇪🇹 Birrify

A full-stack exchange rate platform that makes it easier to compare Ethiopian bank currency rates in one place.

Birrify collects exchange rate data from different banks and provides a simple interface for users and developers to view and compare rates.

🌐 Live Demo:
https://birrify.vercel.app/

---

## 📌 About The Project

I started building Birrify after noticing how difficult it was to compare exchange rates across different Ethiopian bank websites.

Each bank had its own website, design, and way of showing rates, so I built a platform that brings the information together.

The goal is to make exchange rate data easier to access for users and developers.

---

## ✨ Features

- View exchange rates from multiple Ethiopian banks
- Compare buying and selling rates
- Filter by bank
- Filter by currency
- Find highest and lowest rates
- Calculate average market rates
- Responsive design for mobile and desktop
- Developer API access
- Historical rate storage

---

## 🏦 Supported Banks

Currently supported:

- Commercial Bank of Ethiopia (CBE)
- Dashen Bank
- Awash Bank
- Nib Bank
- Abyssinia Bank
- Abay Bank
- Hibret Bank

More banks are being added.

---

## 🛠️ Tech Stack

### Frontend

- React.js
- JavaScript
- CSS
- Axios
- Vite

### Backend

- FastAPI
- Python
- SQLAlchemy

### Database

- PostgreSQL (Neon)

### Deployment

- Vercel (Frontend)
- Render (Backend)

---

## 📂 Project Structure

```
Birrify/

├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── assets/

├── backend/
│   ├── app/
│   ├── models/
│   ├── routes/
│   └── database/
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/ananya09-code/ethio-exchange.git
```

---

## Frontend Setup

Go into frontend:

```bash
cd frontendt
```

Install dependencies:

```bash
npm install
```

Run:

```bash
npm run dev
```

---

## Backend Setup

Go into backend:

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate:

Windows:

```bash
venv\Scripts\activate
```

Install packages:

```bash
pip install -r requirements.txt
```

Run server:

```bash
uvicorn app.main:app --reload
```

---

## 🔌 API Endpoints

### Get all exchange rates

```
GET /
```

---

### Get highest and lowest rate

```
GET /high-low/{currency}
```

Example:

```
GET /high-low/USD
```

---

### Get average rate

```
GET /average/{currency}
```

Example:

```
GET /average/USD
```

---

## 🔮 Future Improvements

- Add more Ethiopian banks
- Add more currencies
- Add exchange rate history charts
- Add authentication
- Add developer API keys
- Improve analytics

---

## 👨‍💻 Developer

Built by Ananya

Frontend-Focused Full Stack Developer

---

## ⭐ Feedback

Suggestions and improvements are welcome!
