# V30 PRODUCTION STABILIZER

Added:
- /test production test page
- V30 health version
- schema compatibility SQL patch
- stabilized routes:
  - /
  - /test
  - /admin
  - /api/health
  - /api/profile
  - /api/lead
  - /api/payment-request
  - /api/unlock
  - /api/admin/data
  - /api/admin/code
  - /api/admin/metrics

Production:
https://soulflame-twins.vercel.app

Admin:
https://soulflame-twins.vercel.app/admin

Test:
https://soulflame-twins.vercel.app/test

If lead/payment/unlock errors because of missing columns:
Run cloud/supabase/v30_schema_patch.sql in Supabase SQL Editor.