# EN / VI Language Toggle Design

**Date:** 2026-07-01
**Scope:** Entire site (`/`, `/privacy`, `/terms`, `/support`)
**Status:** Approved
**Supersedes:** "Out of Scope" item "Language toggle / i18n routing" in `2026-06-30-privacy-terms-pages-design.md`

---

## Overview

Add a site-wide EN/VI language toggle. No URL or route changes — the same page renders both languages in the HTML, and a `data-locale` attribute on `<html>` (driven by CSS) controls which one is visible. Locale choice persists in `localStorage` and is applied before first paint via an inline script, so there is no flash of the wrong language on load or reload.

This intentionally does **not** use Next.js's `app/[lang]/...` locale-routing convention (see `node_modules/next/dist/docs/01-app/02-guides/internationalization.md`). That convention is the right fit for per-locale SSR/SEO, but this project has no server-side signal for locale (no cookies, no path prefix) by product decision — the toggle must work instantly, client-side, without a page reload.

---

## Architecture

1. **Dual render + CSS toggle** (not React state re-render): every translatable string renders as two DOM nodes, one per language, wrapped by a small `<T en vi />` helper. CSS hides the inactive language based on `html[data-locale]`.
2. **Flash prevention**: an inline `<script>` in `app/layout.tsx`'s `<head>` runs synchronously during HTML parsing (before paint) and sets `data-locale` on `<html>` from `localStorage`, falling back to `navigator.language` detection. This follows the pattern in `node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md` ("Themes" section), applied to locale instead of theme.
3. **No component-tree conversion**: because content is dual-rendered and toggled purely by CSS, existing Server Components (`HeroSection`, `FeaturesSection`, etc.) do not need to become Client Components. Only the toggle button itself is a Client Component.

### Why not React Context + single-language render?

Rejected because locale is client-only information (no cookie/URL signal). A context-driven single-render approach would either cause a hydration mismatch, or defer to `useEffect` and show a visible flash of the wrong language on every hard navigation (not just first visit) — explicitly called out as a problem case in the Next.js flash-prevention guide. The dual-render + CSS approach avoids this entirely, at the cost of roughly doubling text payload size, which is acceptable for a single marketing site of this size (and already the precedent on `/privacy` and `/terms` today).

---

## Locale Detection & Persistence

- Storage key: `localStorage["deepocean-locale"]` → `"en" | "vi"`.
- Inline script (`app/layout.tsx`, in `<head>`, runs before paint):
  ```js
  (function () {
    try {
      var s = localStorage.getItem("deepocean-locale");
      var locale = (s === "en" || s === "vi") ? s
        : (navigator.language || "").toLowerCase().startsWith("vi") ? "vi" : "en";
      document.documentElement.setAttribute("data-locale", locale);
    } catch (e) {}
  })();
  ```
- Server-rendered default: `<html lang="en" data-locale="en" suppressHydrationWarning>` — matches the CSS fallback in case JS is disabled or the script fails.
- First-time visitors (no stored value) get locale auto-detected from `navigator.language`. Returning visitors get their last explicit choice.

---

## Rendering Primitive

`src/components/ui/T.tsx` (new, not a Client Component):

```tsx
export function T({ en, vi }: { en: React.ReactNode; vi: React.ReactNode }) {
  return (
    <>
      <span className="i18n-en">{en}</span>
      <span className="i18n-vi">{vi}</span>
    </>
  );
}
```

`globals.css` additions:
```css
.i18n-vi { display: none; }
html[data-locale="vi"] .i18n-en { display: none; }
html[data-locale="vi"] .i18n-vi { display: inline; }
```

Usage: `<h3><T en={feature.title.en} vi={feature.title.vi} /></h3>`.

`SectionHeading` and `FeatureStoryCard` currently type their text props as `string`; both widen to `React.ReactNode` so callers can pass `<T />` output.

---

## Toggle Button

`src/components/ui/LangToggle.tsx` (new, Client Component):

```tsx
"use client";
import { useCallback, useState } from "react";

const STORAGE_KEY = "deepocean-locale";
type Locale = "en" | "vi";

function readLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "vi") return stored;
  return (navigator.language || "").toLowerCase().startsWith("vi") ? "vi" : "en";
}

export function LangToggle() {
  const [locale, setLocale] = useState<Locale>(readLocale);

  const toggle = useCallback(() => {
    const next: Locale = locale === "en" ? "vi" : "en";
    setLocale(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.setAttribute("data-locale", next);
  }, [locale]);

  return (
    <button type="button" className="lang-toggle" onClick={toggle} aria-label="Switch language">
      <span className={locale === "en" ? "active" : undefined}>EN</span>
      <span className={locale === "vi" ? "active" : undefined}>VI</span>
    </button>
  );
}
```

`readLocale()` reads the same source as the inline script (`localStorage`, then `navigator.language`), so the button's own lazy `useState` initializer matches what the script already put in the DOM — no mismatch, per the "Syncing with React state" pattern in the Next.js guide.

Clicking updates `localStorage` and the `data-locale` attribute directly; no re-render of page content is needed since CSS handles visibility.

**Placement:**
- `Navbar.tsx` — next to the "Coming soon" CTA, included in the mobile menu.
- Shared header markup on `/privacy`, `/terms`, `/support` (all three currently duplicate the same `support-nav` header inline) — added next to the "Home" link in each.

---

## Content Model Changes

All translatable string fields move from `string` to `{ en: string; vi: string }`, matching the pattern already established in `legalContent.ts`.

**`src/content/landingContent.ts`** — restructure: `navItems`, `problemSolution`, `features`, `featureStories`, `steps`, `screenPreviews`, `premiumBenefits`, `intelligence`, `progressFeatures`, `faqs`, `widgetHighlights`, `footerGroups`. Also add the "Loved by travelers" section copy here (currently hardcoded directly in `LovedByTravelersSection.tsx`, not sourced from content data) for consistency.

**`src/content/legalContent.ts`** — no structural change (already `{en, vi}`). Only the *pages* change: instead of always showing both languages stacked, `/privacy` and `/terms` render through `<T>` and respect the toggle.

**`src/content/supportContent.ts`** (new) — extract the currently-inline JSX text from `src/app/support/page.tsx` (hero copy, `supportTopics`, `quickAnswers`, checklist items, final CTA) into `{en, vi}` data, following the same convention as `landingContent.ts`.

**Explicitly not translated** (out of scope): image `alt` text, `aria-label`s, page `<title>`/`metadata` (SEO description, OpenGraph, Twitter card), and product terminology (`Deep Ocean`, `Pro`, `XP`, zone names). These are either attribute contexts where CSS-based dual-render doesn't apply, or brand/product terms that stay in English by design.

---

## File Scope

### New files
| File | Purpose |
|------|---------|
| `src/components/ui/T.tsx` | Dual-language render primitive |
| `src/components/ui/LangToggle.tsx` | EN/VI toggle button (Client Component) |
| `src/content/supportContent.ts` | Bilingual content for `/support`, extracted from the page |

### Updated files
| File | Change |
|------|--------|
| `src/app/layout.tsx` | Add inline locale-detection script to `<head>`; `data-locale="en"` default on `<html>` |
| `src/app/globals.css` | Add `.i18n-en` / `.i18n-vi` rules and `.lang-toggle` styles |
| `src/content/landingContent.ts` | Convert listed fields to `{en, vi}`; add travelers-section copy |
| `src/components/ui/SectionHeading.tsx` | Widen `eyebrow`/`title`/`description` prop types to `React.ReactNode` |
| `src/components/ui/FeatureStoryCard.tsx` | Widen `category`/`title`/`description` prop types to `React.ReactNode` |
| `src/components/ui/Navbar.tsx` | Wrap `navItems` labels in `<T>`; add `<LangToggle />` |
| `src/components/sections/*.tsx` (Hero, ProblemSolution, Features, HowItWorks, ScreensPreview, Premium, AI, Stats, Privacy, Widget, FAQ, FinalCTA, Footer, LovedByTravelers) | Wrap rendered text in `<T>` |
| `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` | Render through `<T>` instead of stacking both languages; add `<LangToggle />` to header |
| `src/app/support/page.tsx` | Source text from `supportContent.ts` via `<T>`; add `<LangToggle />` to header |

---

## Testing Plan

1. `npm run typecheck` and `npm run build` pass with no hydration warnings.
2. Manual browser verification:
   - Toggling EN↔VI on `/` swaps all visible copy with no leftover untranslated strings in either direction.
   - Reloading after choosing VI stays on VI (no flash to EN first).
   - Simulating a Vietnamese browser locale with no prior stored choice defaults to VI on first load.
   - Toggle is present and functional on `/`, `/privacy`, `/terms`, `/support`.
   - Mobile nav menu toggle works the same as desktop.

---

## Out of Scope

- URL/path-based locale routing (`/en`, `/vi`)
- Translating `metadata`, `alt` text, `aria-label`s
- Any third language beyond EN/VI
- Server-side locale detection (`Accept-Language` header, cookies)
