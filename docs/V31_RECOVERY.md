# V31 RECOVERY DEPLOY

Purpose:
Fix failed V27/V30 deploy chain by removing aggressive `builds` from vercel.json.

Live checks after deployment:
- /
- /api/health
- /api/profile
- /admin
- /test

Expected /api/health version:
V31_RECOVERY_DEPLOY