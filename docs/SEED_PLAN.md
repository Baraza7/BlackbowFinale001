# Seed Plan (Draft)

Scope: Import current static content and public assets into CMS models without changing public UI.

Phases:

1. Discovery
- Map pages and sections from existing routes/components.
- Identify static text blocks (hero titles, subtitles, about copy, cards) and images (public/*.png, *.jpg).

2. Upload Strategy
- For local dev: store originals in `public/uploads` (temporary) or configured blob provider.
- Record `MediaAsset` with width/height/size and store variants (webp/avif) metadata.

3. Import Steps
- Ensure `Page` rows exist for home, services, blog, contacts, etc.
- For each page, create `Section` rows (hero, services, about, team, etc.).
- For text copy, create `ContentBlock` of type RICH_TEXT with HTML-safe content.
- For images, create `MediaAsset` and `SectionMedia` links with roles.

4. Baseline Revision
- Create `Revision` labeled "Baseline v1.0" capturing inserted rows in `RevisionItem`.

5. Idempotency
- Upsert by unique keys: `Page.slug`, `Section(pageId,key)`, `MediaAsset.filename`.
- Skip already-imported assets by hash or filename.

6. Audit
- Write `AuditLog` entries for create operations.

Validation constraints:
- Hero images: min 1600x900, max 2MB.
- Logo grid images: min 200x100, max 300KB, aspect ~2.0.
- Team images: min 600x600, max 1MB, aspect ~1.0.

Execution: seed script runs in staging/local only. Do NOT run in production.
