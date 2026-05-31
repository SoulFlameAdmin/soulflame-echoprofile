# V17 API Route Map

## Public routes
GET  /api/health
GET  /api/public-config
POST /api/profile
POST /api/lead
POST /api/payment-request
POST /api/unlock

## Admin routes
GET    /api/admin/data
GET    /api/admin/metrics
GET    /api/admin/export
POST   /api/admin/code
POST   /api/admin/payment-confirm
DELETE /api/admin/data

## Legacy supported routes
GET    /api/data
POST   /api/code
POST   /api/payment-confirm
DELETE /api/data

## Production note
В online версията admin routes трябва да минат към real auth, не само PIN.
