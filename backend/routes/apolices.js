const express = require('express');
const router = express.Router();
const { sendNotification } = require('../services/mailer');
const path = require('path');
const { Low, JSONFile } = require('lowdb');
const adapter = new JSONFile(path.join(__dirname, '..', 'storage', 'db.json'));
const db = new (require('lowdb').Low)(adapter);

router.post('/send-email', async (req,res)=>{
  try {
    const { to, subject, body, replyTo, attachDocxPath } = req.body;
    const attachments = attachDocxPath ? [{ path: attachDocxPath }] : [];
    const info = await sendNotification({ to, replyTo, subject, htmlBody: body, attachments });
    await db.read();
    db.data = db.data || {};
    db.data.apolices = db.data.apolices || [];
    db.data.apolices.push({ id: Date.now().toString(), to, subject, sentAt: new Date().toISOString() });
    await db.write();
    res.json({ success:true, info });
  } catch(err){
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
