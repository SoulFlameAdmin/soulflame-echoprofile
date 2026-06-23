-- ============================================================
-- SoulFlame Twins V30 schema compatibility patch
-- Run this in Supabase SQL Editor only if lead/payment/unlock/admin gives column errors.
-- ============================================================

alter table if exists public.profiles
  add column if not exists name text,
  add column if not exists contact text,
  add column if not exists goal text,
  add column if not exists age text,
  add column if not exists main_trait text,
  add column if not exists second_trait text,
  add column if not exists profile text,
  add column if not exists scores jsonb default '{}'::jsonb,
  add column if not exists mini_report text,
  add column if not exists full_report text,
  add column if not exists raw jsonb default '{}'::jsonb;

create table if not exists public.leads (
  id bigint primary key,
  created_at timestamptz default now(),
  offer text,
  name text,
  contact text,
  profile text,
  scores jsonb default '{}'::jsonb,
  raw jsonb default '{}'::jsonb
);

create table if not exists public.payments (
  id bigint primary key,
  created_at timestamptz default now(),
  status text default 'pending',
  offer text,
  amount text,
  method text,
  name text,
  contact text,
  profile text,
  scores jsonb default '{}'::jsonb,
  code text,
  raw jsonb default '{}'::jsonb
);

create table if not exists public.unlock_codes (
  id bigint primary key,
  created_at timestamptz default now(),
  code text unique,
  status text default 'unused',
  offer text,
  note text,
  used_at timestamptz,
  used_by jsonb,
  profile_id bigint,
  payment_id bigint,
  raw jsonb default '{}'::jsonb
);

create table if not exists public.events (
  id bigint primary key,
  created_at timestamptz default now(),
  type text,
  payload jsonb default '{}'::jsonb
);

create table if not exists public.admin_logs (
  id bigint primary key,
  created_at timestamptz default now(),
  type text,
  payload jsonb default '{}'::jsonb
);

alter table public.profiles disable row level security;
alter table public.leads disable row level security;
alter table public.payments disable row level security;
alter table public.unlock_codes disable row level security;
alter table public.events disable row level security;
alter table public.admin_logs disable row level security;