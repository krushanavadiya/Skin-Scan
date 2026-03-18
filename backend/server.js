const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'slate_sanctuary_secret_key_change_in_production';

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// ─── Database ─────────────────────────────────────────────────
const db = new sqlite3.Database(path.join(__dirname, 'slate_sanctuary.db'), (err) => {
  if (err) console.error('❌ Could not open database:', err.message);
  else console.log('✅ Database ready: slate_sanctuary.db');
});

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id         INTEGER  PRIMARY KEY AUTOINCREMENT,
    name       TEXT     NOT NULL,
    email      TEXT     NOT NULL UNIQUE,
    password   TEXT     NOT NULL,
    skin_type  TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// ─── Promisify helpers ────────────────────────────────────────
function dbGet(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => { if (err) reject(err); else resolve(row); });
  });
}
function dbRun(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) { if (err) reject(err); else resolve({ lastID: this.lastID }); });
  });
}

// ─── Auth middleware ──────────────────────────────────────────
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try { req.user = jwt.verify(token, JWT_SECRET); next(); }
  catch { res.status(401).json({ error: 'Invalid or expired token' }); }
}

// ─── Routes ───────────────────────────────────────────────────
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'All fields are required.' });
  if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters.' });
  try {
    const existing = await dbGet('SELECT id FROM users WHERE email = ?', [email]);
    if (existing) return res.status(409).json({ error: 'An account with this email already exists.' });
    const hashed = await bcrypt.hash(password, 12);
    const result = await dbRun('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashed]);
    const token = jwt.sign({ userId: result.lastID, email, name }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ message: 'Account created!', token, user: { id: result.lastID, name, email } });
  } catch (err) { console.error(err); res.status(500).json({ error: 'Server error.' }); }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });
  try {
    const user = await dbGet('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) return res.status(401).json({ error: 'Incorrect email or password.' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Incorrect email or password.' });
    const token = jwt.sign({ userId: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ message: 'Signed in!', token, user: { id: user.id, name: user.name, email: user.email, skin_type: user.skin_type } });
  } catch (err) { console.error(err); res.status(500).json({ error: 'Server error.' }); }
});

app.get('/api/profile', authenticate, async (req, res) => {
  try {
    const user = await dbGet('SELECT id, name, email, skin_type, created_at FROM users WHERE id = ?', [req.user.userId]);
    if (!user) return res.status(404).json({ error: 'User not found.' });
    res.json({ user });
  } catch (err) { res.status(500).json({ error: 'Server error.' }); }
});

app.patch('/api/profile/skin-type', authenticate, async (req, res) => {
  try {
    await dbRun('UPDATE users SET skin_type = ? WHERE id = ?', [req.body.skin_type, req.user.userId]);
    res.json({ message: 'Skin type updated.' });
  } catch (err) { res.status(500).json({ error: 'Server error.' }); }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Slate Sanctuary running at http://0.0.0.0:${PORT}`));
