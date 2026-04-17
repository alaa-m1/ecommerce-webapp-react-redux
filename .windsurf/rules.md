# Project Rules

These rules must be followed for all future code changes in this repository.

## Internationalization (i18n)
- If you add/modify any user-facing label/text that needs translation, you must add the corresponding translation keys in:
  - `public/locales/en/translation.json`
  - `public/locales/de/translation.json`
  - `public/locales/ar/translation.json`
- Do not hardcode translated strings directly in pages/components.

## No Empty / Non-functional Files
- Do not add empty files.
- Every added file must have a clear purpose and be used (imported) or provide meaningful exports.

## TypeScript Only
- New code must be written in TypeScript (`.ts` / `.tsx`).
- Avoid introducing new JavaScript files.

## Prefer `type` Over `interface`
- Always use `type` aliases instead of `interface` for new types.
