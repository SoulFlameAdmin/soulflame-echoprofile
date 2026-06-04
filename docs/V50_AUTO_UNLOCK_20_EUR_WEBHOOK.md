# V50 AUTO UNLOCK 20 EUR WEBHOOK

Goal:
- Customer pays fixed 20 EUR through Gumroad / Stripe / generic webhook provider.
- Provider sends webhook.
- System verifies paid/completed + amount >= 20 EUR + EUR.
- System creates paid payment.
- System creates unlock code.
- System sends code by email if RESEND_API_KEY is configured.

Endpoints:
- /api/webhook/gumroad
- /api/webhook/payment
- /api/webhook/stripe
- /api/payment-config

Important:
- Personal revolut.me link cannot fully auto-unlock because it does not notify this app.
- Use Gumroad/Stripe fixed 20 EUR link for real automatic unlock.