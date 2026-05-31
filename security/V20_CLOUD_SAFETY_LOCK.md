# V20 Cloud Safety Lock

Rules:
1. Never put SUPABASE_SERVICE_ROLE_KEY in frontend.
2. Never deploy .env.
3. Never deploy local data.
4. Never expose admin data publicly.
5. Confirm payment only through admin/backend.
6. Generate codes only through admin/backend.
7. Keep public pages static and safe.
8. Use backend for all private operations.
9. Use Supabase for persistent cloud data.
10. Use Vercel env variables for secrets.
