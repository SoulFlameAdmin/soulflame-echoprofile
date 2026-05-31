# V17 Vercel Notes

Този файл е пример, не финален production deploy.

Не качвай директно локалния JSON backend като production.
Vercel няма постоянен filesystem за data/*.json.

Production правилният вариант:
- Vercel = frontend + API routes
- Supabase = база данни
- Vercel env = secrets
