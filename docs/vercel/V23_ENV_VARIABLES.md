# V23 — Vercel Environment Variables Guide

Във Vercel НЕ качваш .env файл.

Отиваш:

Vercel → Project → Settings → Environment Variables

И добавяш:

APP_MODE=production
DATA_MODE=supabase
DATA_DIR=data
APP_VERSION=V23_VERCEL_PREP
OWNER_EMAIL=stere0metal360@gmail.com
ECHO_ADMIN_PIN=твоя_admin_pin

SUPABASE_URL=https://frhletkiuupgksmgxoxc.supabase.co
SUPABASE_ANON_KEY=твоя_publishable_key
SUPABASE_SERVICE_ROLE_KEY=твоя_secret_key

PUBLIC_SITE_URL=твоят_vercel_url_или_domain

Важно:
- .env не се качва.
- private/ не се качва.
- data/ не се качва.
- backups/ не се качва.
- exports/ не се качва.
- SUPABASE_SERVICE_ROLE_KEY не влиза във frontend.
