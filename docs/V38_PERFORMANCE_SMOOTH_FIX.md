# V38 PERFORMANCE SMOOTH FIX

Fixes scroll lag from V37.

Removed:
- Custom smooth wheel hijack
- Heavy cursor aura blur
- Heavy canvas particle network
- Continuous full-page RAF scroll loop
- Magnetic buttons on every pointer move

Kept:
- Quantum look
- Levitation orb
- Native smooth scroll
- Lightweight progress bar
- Lightweight reveal
- Supabase write flow

Expected:
- /api/health -> V38_PERFORMANCE_SMOOTH_FIX
- / -> smooth site without scroll lag