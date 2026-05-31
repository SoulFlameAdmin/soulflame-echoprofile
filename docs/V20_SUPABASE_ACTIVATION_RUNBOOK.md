# V20 Supabase Activation Runbook

## 1. Create Supabase project
Create project in Supabase dashboard.

## 2. Run schema
Open SQL Editor and run:

cloud/supabase/schema.sql

## 3. Verify tables
Run:

cloud/supabase/verify_tables.sql

## 4. Optional test seed
Run:

cloud/supabase/test_seed.sql

## 5. Fill .env
Required:

DATA_MODE=supabase
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

## 6. Check connection
PowerShell:

.\supabase-check-v19.ps1

## 7. Switch mode
PowerShell:

.\set-data-mode-supabase.ps1

## 8. Restart
node server.js

## 9. Confirm
Open:

http://localhost:3000/api/health

Expected:

activeDataMode = supabase
