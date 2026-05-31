# SoulFlame EchoProfile V16 — Supabase Adapter

## 10 upgrade-а

1. DATA_MODE switch
2. Supabase adapter
3. Unified database engine
4. Cloud ENV settings
5. Upgraded Supabase schema
6. Migration documentation
7. Local-to-cloud export
8. Safer admin API aliases
9. Cloud warning system
10. Full V15 → V16 backup

## Local mode

.env:

DATA_MODE=local

Start:

node server.js

## Supabase mode

.env:

DATA_MODE=supabase
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY

Then run:

node server.js

## Warning

If DATA_MODE=supabase but keys are missing, the system will fall back to local mode and show warnings in /api/health.

## Export local data

PowerShell:

.\export-cloud-ready.ps1

Output:

exports/cloud-ready-export-*.json
