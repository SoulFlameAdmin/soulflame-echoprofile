# V44 EMAIL DELIVERY CLIENT MESSAGE FLOW

Upgrade:
- Adds POST /api/admin/email
- Supports Resend email sending if RESEND_API_KEY is configured
- Falls back to manual copy mode if Resend is not configured
- Adds Email Delivery panel in /admin
- Adds message templates:
  - Payment Instructions
  - Unlock Code
  - Full Report Ready
  - Follow-up
- Adds Use Email action for table rows
- Adds Open Mail App mailto fallback
- Adds copy client message
- Keeps V43 legal/trust/analytics
- Keeps V42 checkout
- Keeps V41 unlock flow

Environment variables:
RESEND_API_KEY
EMAIL_FROM

Expected:
- /api/health -> V44_EMAIL_DELIVERY_CLIENT_MESSAGE_FLOW
- /admin -> Email Delivery panel
- /api/admin/email -> manual_copy or sent via Resend