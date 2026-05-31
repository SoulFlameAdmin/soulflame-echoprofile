# V23 — Deploy Checklist

## Преди Vercel
[ ] /api/health локално показва activeDataMode=supabase
[ ] Supabase има таблици profiles, leads, payments, unlock_codes, events, admin_logs
[ ] /api/profile записва реално в Supabase
[ ] .env е в .gitignore
[ ] private/ е в .gitignore
[ ] data/ е в .gitignore
[ ] backups/ е в .gitignore
[ ] exports/ е в .gitignore
[ ] .vercelignore съществува
[ ] .env.vercel.example съществува
[ ] Environment Variables са подготвени
[ ] Secret key не е във frontend
[ ] Admin PIN е сложен като env variable
[ ] V24 API migration plan е готов

## Не deploy-ваме още, ако:
- frontend още използва local-only server.js flow;
- /api routes във Vercel са placeholders;
- secret key не е сложен във Vercel env;
- public URL не е тестван.
