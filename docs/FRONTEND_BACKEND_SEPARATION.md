# Frontend / Backend Separation Plan

## Current local structure
- index.html
- style.css
- script.js
- server.js
- core/
- data/

## Future online structure
frontend/
  index.html
  style.css
  script.js
  assets/

api/
  profile.js
  lead.js
  payment-request.js
  unlock.js
  admin/
    data.js
    metrics.js
    code.js
    payment-confirm.js

core/
  database-engine.js
  local-data-adapter.js
  supabase-adapter.js
  echo-analyzer.js

cloud/
  supabase/
  vercel/

## Rule
Frontend не трябва да съдържа secret keys.
Backend/API routes държат admin logic и service role keys.
