PGR System - Final Deployable (with Auth)
=========================================

This package contains the PGR System scaffold ready for deploy (frontend + backend).
It includes:
 - Simple authentication (email/password) with seeded master user
 - Upload endpoint for apólice processing
 - Email sending endpoint using Gmail (nodemailer)
 - Preview workflow and minimal dashboard pages

IMPORTANT: This is a ready-to-deploy package, but you must configure environment variables
in your hosting provider (Vercel / Render) before the system can send emails or call OpenAI.

Seeded master user
------------------
E-mail: laudelino.przybilski@global5.com.br
Senha inicial: ChangeMe123!
*For security, change this password immediately after first login.*

Required environment variables
------------------------------
OPENAI_API_KEY=sk-...
GMAIL_USER=global5.pgr@gmail.com
GMAIL_PASS=<app_password_generated_in_google_account>
FROM_NAME=Global5 PGR
REPLY_TO_DEFAULT=implantacao@global5.com.br
PORT=3000

Quick local run
---------------
1. Backend:
   cd backend
   npm install
   copy .env.example to .env and fill values
   npm run dev

2. Frontend:
   cd frontend
   npm install
   npm run dev

Deploy notes (Vercel)
---------------------
- Create a GitHub repository and push this project, or upload the ZIP contents.
- On Vercel import the repo.
- Set environment variables listed above in the Vercel project settings.
- Deploy. After deployment, you will have a public URL to log in.

Files of interest
-----------------
 - backend/templates/ -> put your Novo Modelo - Akad.docx here
 - backend/storage/db.json -> lowdb file (users, apolices). Seeded with master user.
