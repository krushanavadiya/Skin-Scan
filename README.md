# Slate Sanctuary – Backend Setup Guide

## Folder Structure

```
slate-sanctuary/
├── frontend/          ← your existing HTML/CSS/JS files
│   ├── login.html     ← updated to call real API
│   ├── dashboard.html
│   ├── quiz.html
│   ├── index.html
│   └── style.css
└── backend/           ← new Node.js backend
    ├── server.js
    ├── package.json
    ├── .env.example
    └── slate_sanctuary.db   ← auto-created on first run
```

---

## Step 1 – Install Dependencies

```bash
cd backend
npm install
```

## Step 2 – Create Your .env File

```bash
cp .env.example .env
```

Edit `.env` and set a strong `JWT_SECRET`:
```
PORT=3000
JWT_SECRET=some_very_long_random_string_here
```

## Step 3 – Start the Backend

```bash
# Normal start
npm start

# Or with auto-reload on file changes (development)
npm run dev
```

You'll see:
```
✅ Database ready: slate_sanctuary.db
🚀 Slate Sanctuary backend running at http://localhost:3000
```

## Step 4 – Open Your Frontend

Open `frontend/login.html` in a browser (or use VS Code Live Server).

> **Important:** Make sure the `API_BASE` in `login.html` matches your backend URL:
> ```js
> const API_BASE = 'http://localhost:3000/api';
> ```

---

## API Endpoints

| Method | Endpoint               | Auth Required | Description           |
|--------|------------------------|---------------|-----------------------|
| POST   | `/api/signup`          | No            | Register a new user   |
| POST   | `/api/login`           | No            | Sign in, get token    |
| GET    | `/api/profile`         | Yes (Bearer)  | Get logged-in user    |
| PATCH  | `/api/profile/skin-type` | Yes (Bearer) | Save skin type result |

### Example: Sign Up
```json
POST /api/signup
{
  "name": "Priya Sharma",
  "email": "priya@example.com",
  "password": "mypassword123"
}
```

### Example: Login
```json
POST /api/login
{
  "email": "priya@example.com",
  "password": "mypassword123"
}
```

---

## Database

SQLite file `slate_sanctuary.db` is auto-created in the `backend/` folder.

**Users table schema:**
```sql
id         INTEGER  PRIMARY KEY AUTOINCREMENT
name       TEXT     NOT NULL
email      TEXT     NOT NULL UNIQUE
password   TEXT     NOT NULL  ← stored as bcrypt hash (never plain text)
skin_type  TEXT               ← set after quiz
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
```

To view data, install [DB Browser for SQLite](https://sqlitebrowser.org/) (free GUI).

---

## How Authentication Works

1. User signs up / logs in → server returns a **JWT token**
2. Frontend saves token to `localStorage` as `ss_token`
3. Protected routes require `Authorization: Bearer <token>` header
4. Token expires after **7 days**
