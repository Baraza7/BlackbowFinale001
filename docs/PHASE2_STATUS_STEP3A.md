# Phase 2 – STEP 3A Status

## Summary
- Added server admin guard (`lib/admin-auth.ts`) with DEV bypass via `ADMIN_BYPASS=true`.
- Guarded admin routes with `app/admin/layout.tsx` server-side check.
- Created admin edit scaffold:
  - `app/admin/content/[page]/[section]/edit/page.tsx` (form: title/subtitle/body/image placeholder)
  - Server action `saveSection` validates and upserts blocks, writes a simple revision label.
- Public UI remains unchanged.

## Files Touched
- `lib/admin-auth.ts`
- `app/admin/layout.tsx`
- `app/admin/content/[page]/[section]/actions.ts`
- `app/admin/content/[page]/[section]/edit/page.tsx`

## Admin Guard Status
- DEV: set `ADMIN_BYPASS=true` to allow admin access.
- PROD: placeholder denies with 403 until real auth session/roles are wired.

## Edit Scaffold Endpoints
- Page: `/admin/content/[page]/[section]/edit` (server-rendered form)
- Action: `saveSection(page, section, formData)`

## Overflow Route
- `/read/[id]` exists (from STEP 2) for full content view.

## Schema GAPs
- Current schema uses `ContentBlock` model with keyed blocks (title/subtitle/body) instead of a single `Content` model.
- Revisions: we write `Revision` with items snapshot, but not per-content live/draft fields yet.

## Next Actions (STEP 3B)
- Image upload endpoint + validation, variants, storage to `/public/uploads` (dev).
- Publish flow: draft → live copy, optimistic conflict checks, AuditLog entries.
- Revisions viewer UI and Restore Baseline action.
- Role management UI and real session integration.


