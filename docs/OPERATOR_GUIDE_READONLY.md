# Operator Guide (Read-only Phase)

## Health Check
- Visit `/api/backoffice-health` to see DB status, CONTENT_SOURCE, and seeded content counts (home.hero/about.intro).

## Seed (minimal text only)
- Pre-req: `.env.local` with `DATABASE_URL=file:./dev.db` and `CONTENT_SOURCE=db`.
- Run locally (PowerShell):
  - `node scripts/seed-min.cjs`
- Output: JSON with `upserts` count.

## Content Source Switch
- To revert to static copy instantly:
  - Set `CONTENT_SOURCE=static` in `.env.local` and restart dev server.

## Read More Page
- Access full content via `/read/<id-or-composite>`
  - Example composite: `/read/home.hero`

## Notes
- Public UI/layout/typography unchanged in this phase.
- Editing, uploads, and publishing come in the next phase.
