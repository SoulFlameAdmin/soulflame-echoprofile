# V18 Supabase Real Setup Roadmap

## V18 цел
Да минем от DATA_MODE=local към DATA_MODE=supabase реално.

## Стъпки
1. Създай Supabase project.
2. Стартирай cloud/supabase/schema.sql.
3. Вземи SUPABASE_URL.
4. Вземи SUPABASE_SERVICE_ROLE_KEY.
5. Сложи ги в .env.
6. Смени DATA_MODE=supabase.
7. Стартирай node server.js.
8. Провери /api/health.
9. Направи профил.
10. Провери таблиците в Supabase.

## Важно
Service role key не се поставя във frontend.
