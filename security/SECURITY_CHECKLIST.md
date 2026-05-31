# V17 Security Checklist

## Никога не качвай публично:
- .env
- .env.local
- backups/
- exports/
- data/
- SUPABASE_SERVICE_ROLE_KEY
- OPENAI_API_KEY
- STRIPE_SECRET_KEY
- лични клиентски данни

## Преди production:
1. Смени Admin PIN.
2. Използвай Supabase, не JSON файлове.
3. Включи real auth за admin.
4. Не показвай admin бутони на public клиента.
5. Провери /api/health за warnings.
6. Не качвай backup папките.
7. Не слагай service role key във frontend.
8. Провери GDPR/privacy текст.
9. Добави terms/privacy page.
10. Направи тест от телефон.
