const express = require('express');
const router = express.Router();
const { Low, JSONFile } = require('lowdb');
const bcrypt = require('bcryptjs');
const path = require('path');
const dbFile = path.join(__dirname, '..', 'storage', 'db.json');
const adapter = new JSONFile(dbFile);
const db = new Low(adapter);
async function loadDB(){ await db.read(); db.data = db.data || { users:[] }; }

router.post('/login', async (req,res)=>{
  await loadDB();
  const { email, password } = req.body;
  const user = (db.data.users||[]).find(u=>u.email.toLowerCase()=== (email||'').toLowerCase());
  if(!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password_hash);
  if(!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64');
  res.json({ user: { id:user.id, email:user.email, role:user.role, name:user.name }, token });
});

module.exports = router;
