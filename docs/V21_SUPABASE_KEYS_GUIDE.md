# V21 Supabase Keys Guide

## Трябват ти 3 стойности:

SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY

## Къде се взимат?
Supabase Dashboard → Project Settings → API

## Къде се слагат?
В .env:

DATA_MODE=supabase
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

## Важно
SUPABASE_SERVICE_ROLE_KEY не се слага във frontend.
Само backend/server/Vercel env.
