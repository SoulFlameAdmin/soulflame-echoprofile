-- V20 Supabase Policies Draft
-- ВНИМАНИЕ: Това е draft. За production използвай backend service role за admin operations.

-- Public insert examples. Ползвай внимателно.
-- create policy "public can insert profiles" on profiles for insert with check (true);
-- create policy "public can insert leads" on leads for insert with check (true);
-- create policy "public can insert payments" on payments for insert with check (true);

-- Public select не се включва за лични данни.
-- Admin достъпът трябва да минава през backend/API routes със service role key.

-- Recommended:
-- 1. RLS enabled
-- 2. no public select on private tables
-- 3. backend handles admin reads/writes
-- 4. service role key only in backend env
