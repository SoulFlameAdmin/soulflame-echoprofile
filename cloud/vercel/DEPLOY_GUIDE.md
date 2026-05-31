# Cloud Deploy Guide

## Vercel + Supabase production path

1. Подготви Supabase.
2. Добави production schema.
3. Настрой environment variables във Vercel.
4. Не качвай .env.
5. Не качвай data/.
6. Не качвай backups/.
7. Deploy frontend.
8. Deploy API routes.
9. Тествай public mode.
10. Тествай admin mode.

## Required Vercel env variables
APP_MODE=production
DATA_MODE=supabase
OWNER_EMAIL=
ECHO_ADMIN_PIN=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_ANON_KEY=
