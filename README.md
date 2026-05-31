# SoulFlame EchoProfile V23 — Vercel Deploy Prep

V22:
- Supabase cloud mode works.
- /api/profile writes to Supabase locally.

V23:
- Adds Vercel deploy preparation.
- Adds .vercelignore protection.
- Adds environment variable checklist.
- Adds placeholder API routes for V24.
- Adds deploy preflight.
- Does NOT do final deploy yet.

## Local start

node server.js

## Local health

http://localhost:3000/api/health

## V23 preflight

.\v23-vercel-preflight.ps1

## Vercel env template

.\open-vercel-env-template.ps1

## Important

Do not deploy:
- .env
- private/
- data/
- backups/
- exports/

V24 will migrate real backend logic to Vercel serverless API routes.
