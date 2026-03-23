# Slate Sanctuary (SkinScan)

A full-stack web application that helps users identify their skin type through a diagnostic quiz and provides personalized skincare routines, advice, and product recommendations.

## Architecture

- **Frontend**: Vanilla HTML/CSS/JavaScript (served statically from `frontend/`)
- **Backend**: Node.js with Express (`backend/server.js`)
- **Database**: PostgreSQL (Replit built-in, via `pg` package)
- **Auth**: JWT-based authentication with bcryptjs password hashing

## How It Works

1. Users sign up / log in
2. Take a 5-question diagnostic quiz about their skin behavior
3. Receive a "Skin ID" (Dry, Oily, Combination, Sensitive, or Balanced)
4. Get a personalized AM/PM routine, ingredient recommendations, and product suggestions

## Key Files

- `backend/server.js` — Express API server (auth, profile, skin-type endpoints)
- `frontend/index.html` — Landing page
- `frontend/login.html` — Sign up / login page
- `frontend/quiz.html` / `frontend/quiz.js` — Skin quiz logic
- `frontend/dashboard.html` / `frontend/dashboard.js` — Results and routine dashboard
- `frontend/style.css` — All application styles

## API Endpoints

- `POST /api/signup` — Create account
- `POST /api/login` — Sign in, returns JWT
- `GET /api/profile` — Get user profile (authenticated)
- `PATCH /api/profile/skin-type` — Update user's skin type result (authenticated)

## Database Schema

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  skin_type VARCHAR(100) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Environment Variables

- `DATABASE_URL` — PostgreSQL connection string (provided by Replit)
- `SESSION_SECRET` — Used as JWT secret fallback (provided by Replit)
- `PORT` — Server port (defaults to 5000)

## Running the App

```bash
npm run dev
```

Server starts on port 5000.

## Migration Notes

- Originally built with MongoDB/Mongoose; migrated to Replit's built-in PostgreSQL for reliability.
- The `mongoose` dependency was removed and replaced with `pg`.
