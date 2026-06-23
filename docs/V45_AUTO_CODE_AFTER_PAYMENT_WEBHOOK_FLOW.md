# V45 AUTO-CODE AFTER PAYMENT WEBHOOK FLOW

Upgrade:
- Adds POST /api/admin/auto-code
- Adds POST /api/webhook/payment generic webhook
- Adds POST /api/webhook/stripe Stripe webhook
- Creates paid payment + unlock code automatically
- Reuses existing code if payment already has code
- Adds admin Auto-Code Paid Payment panel
- Keeps checkout, unlock, email, legal, analytics

Environment variables:
PAYMENT_WEBHOOK_SECRET
STRIPE_WEBHOOK_SECRET
PAYMENT_LINK_FULL_TWIN
PAYMENT_LINK_DEEP_TWIN
RESEND_API_KEY
EMAIL_FROM

Expected:
- /api/health -> V45_AUTO_CODE_AFTER_PAYMENT_WEBHOOK_FLOW
- /admin -> V45 Auto-Code panel
- /api/admin/auto-code -> paid payment + unlock code
- /api/webhook/payment -> generic webhook auto-code
- /api/webhook/stripe -> verified Stripe webhook auto-code