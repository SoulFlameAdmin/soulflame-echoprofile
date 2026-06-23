# V42 REAL CHECKOUT PAYMENT LINK FLOW

Upgrade:
- Adds POST /api/checkout
- Creates pending payment in Supabase
- Uses PAYMENT_LINK_FULL_TWIN when configured
- Shows checkout panel on homepage
- Keeps admin confirm payment flow
- Keeps unlock code flow

Environment variables:
PAYMENT_LINK_FULL_TWIN
PAYMENT_LINK_DEEP_TWIN

Expected:
- /api/health -> V42_REAL_CHECKOUT_PAYMENT_LINK_FLOW
- / -> checkout section available
- request Full Twin -> creates checkout/payment row