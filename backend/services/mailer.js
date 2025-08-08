const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

async function sendNotification({ to, replyTo, subject, htmlBody, attachments=[] }){
  const info = await transporter.sendMail({
    from: `"${process.env.FROM_NAME || 'PGR System'}" <${process.env.GMAIL_USER}>`,
    to,
    replyTo: replyTo || process.env.REPLY_TO_DEFAULT,
    subject,
    html: htmlBody,
    attachments
  });
  return info;
}

module.exports = { sendNotification };
