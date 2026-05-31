# V16 Local-to-Cloud Migration Plan

## Step 1
Keep DATA_MODE=local and test V16.

## Step 2
Create Supabase project.

## Step 3
Open Supabase SQL Editor and run:

cloud/supabase/schema.sql

## Step 4
Copy Supabase URL and service role key.

## Step 5
Edit .env:

DATA_MODE=supabase
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

## Step 6
Restart server.

## Step 7
Open:

http://localhost:3000/api/health

Check:

activeDataMode = supabase

## Step 8
Later we create V17 deploy version.
