# V23 — Security Lock

Никога не качвай:
- .env
- private/
- data/
- backups/
- exports/
- Supabase secret key
- OpenAI key
- Stripe secret key

Supabase secret key:
- само backend/serverless env
- никога във frontend JS
- никога в публичен GitHub
- никога в HTML

Vercel:
- Environment Variables са правилното място
- не .env файл
