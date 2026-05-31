-- V20 Supabase Table Verification

select 'profiles' as table_name, count(*) as rows from profiles
union all
select 'leads', count(*) from leads
union all
select 'payments', count(*) from payments
union all
select 'unlock_codes', count(*) from unlock_codes
union all
select 'events', count(*) from events
union all
select 'admin_logs', count(*) from admin_logs;
