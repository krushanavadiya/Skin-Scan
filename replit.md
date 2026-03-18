# Slate Sanctuary

A full-stack skin health management web app that helps users identify their skin type through a diagnostic quiz and get personalized skincare recommendations.

## Tech Stack

- **Runtime**: Node.js 20
- **Framework**: Express.js
- **Database**: SQLite (via `sqlite3` library, stored at `backend/slate_sanctuary.db`)
- **Auth**: JWT (`jsonwebtoken`) + password hashing (`bcryptjs`)
- **Frontend**: Vanilla HTML/CSS/JavaScript (no framework)

## Project Structure

```
/
├── backend/
│   ├── server.js           # Main Express server + API routes
│   └── slate_sanctuary.db  # SQLite database file
├── frontend/
│   ├── index.html          # Landing page
│   ├── main.js             # Landing page JS (magnetic CTA, skin preview, nav lock)
│   ├── login.html          # Login/signup page
│   ├── dashboard.html      # User dashboard
│   ├── dashboard.js
│   ├── quiz.html           # Skin type diagnostic quiz
│   ├── quiz.js
│   ├── prescription.html   # Skincare recommendations
│   ├── prescription.js
│   └── style.css           # Global styles
├── package.json
└── README.md
```

## Running the App

```bash
npm run dev
```

The app runs on port **5000** (`0.0.0.0:5000`). The Express server serves both the API and static frontend files.

## API Endpoints

- `POST /api/signup` — Register a new user
- `POST /api/login` — Authenticate and receive a JWT
- `GET /api/profile` — Get user profile (protected)
- `PATCH /api/profile/skin-type` — Update skin type after quiz (protected)

## Key Notes

- The JWT token is stored in `localStorage` as `ss_token`
- SQLite DB is created automatically on first run
- CORS is open to all origins (`*`) for development
- `frontend/main.js` handles landing page interactivity (magnetic button, skin ID preview, nav lock)
