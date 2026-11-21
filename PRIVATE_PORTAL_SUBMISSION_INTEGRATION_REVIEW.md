# Private portal submission adapter — review plan

## Scope and preservation

This branch is intentionally separate from the public site's `main`. No public source, design, logo, images, pages, navigation, property listing behavior, CSP, Supabase settings, or deployment has been changed.

The inspected public integration module is `src/features/vacant-houses/integrations/supabasePublic.ts`. It currently reads published/available properties directly from Supabase and submits applications and inquiries directly to Supabase. The UI imports these functions from `src/App.tsx`.

## Why the form cutover is not activated yet

The private portal now has a server-only Supabase adapter and a staging migration on its own implementation branch, but the existing Express property/application/inquiry routes are not yet switched to that adapter. The portal's current public intake routes still write to its SQLite database. Pointing the live public forms at those routes now would create a second, inconsistent data store and violate the approved single-source-of-truth architecture.

Therefore this branch does not yet redirect submissions. That change is blocked until:
1. Express staff and public routes use Supabase as the canonical store for shared properties, applications and inquiries.
2. Inquiry thread tokens and message history are persisted and verified against the new Supabase model.
3. Idempotency, server-side validation, persistent/shared rate limiting and bot controls are implemented.
4. A separate staging Supabase project has the reviewed additive migration applied and synthetic end-to-end tests pass.
5. The private portal has a stable HTTPS staging URL and its server-only intake credential is configured.

## Intended minimal public change after those gates

- Keep `getPublicProperties()` reading the existing public Supabase listing query, unchanged.
- Change only `submitPublicApplication()` and `submitVacancyInquiry()` to POST to same-origin Cloudflare Pages Functions (for example `/api/public/applications` and `/api/public/inquiries`).
- Implement those functions as server-side proxies to the private portal. Store the portal API key only in Cloudflare Pages environment secrets; never expose it through `VITE_*`, HTML, or browser JavaScript.
- Validate payload shape and request size at the function boundary; portal performs authoritative validation, property eligibility checks, idempotency and rate limiting.
- Because the intended functions are same-origin, the existing CSP `connect-src 'self'` already permits browser requests. Do not broaden CSP unnecessarily. If the final architecture requires a direct cross-origin browser request instead, update only `connect-src` to the exact portal origin after review; never add the service-role key or server credential to the browser.
- Do not change form UI, page design, navigation, listing rendering, logo, imagery, or other public content.

## Validation and rollback

Use synthetic staging properties and visitor details only. Verify successful submissions, duplicate submissions, invalid/unavailable property rejection, network errors, CORS, rate limiting, and portal-side staff visibility. Compare production inquiry count using metadata-only checks before/after cutover; do not export or log visitor content. Preserve the seven existing inquiry rows. Do not revoke existing production anonymous INSERT permissions until the replacement path is live, tested, and a separately approved production security change is scheduled.

No production database, policy, grant, or deployment action is authorized by this review branch.
