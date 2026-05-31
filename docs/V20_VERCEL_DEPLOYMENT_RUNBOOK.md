# V20 Vercel Deployment Runbook

## Не deploy-ваме, докато:
- DATA_MODE не работи със supabase
- /api/health не показва activeDataMode=supabase
- Admin PIN не е сменен
- service role key не е само във backend env
- data/ не се качва
- backups/ не се качва
- exports/ не се качва

## След това:
1. Подготвяме API routes.
2. Качваме public frontend.
3. Слагаме env variables във Vercel.
4. Тестваме public profile creation.
5. Тестваме admin confirm.
6. Тестваме unlock code.
7. Добавяме domain.
