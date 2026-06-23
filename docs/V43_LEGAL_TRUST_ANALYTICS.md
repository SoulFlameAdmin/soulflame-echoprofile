# V43 LEGAL TRUST ANALYTICS

Upgrade:
- Adds /privacy
- Adds /terms
- Adds /disclaimer
- Adds POST /api/event
- Adds internal analytics events into Supabase events table
- Adds Trust section on homepage
- Adds FAQ section
- Adds privacy/disclaimer links
- Tracks page_view, ui_click, scroll_depth
- Keeps V42 checkout and V41 unlock flow

Expected:
- /api/health -> V43_LEGAL_TRUST_ANALYTICS
- /privacy -> legal page
- /terms -> legal page
- /disclaimer -> legal page
- /api/event -> saves analytics event