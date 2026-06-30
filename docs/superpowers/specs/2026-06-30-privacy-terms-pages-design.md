# Privacy & Terms Pages Design

**Date:** 2026-06-30  
**Routes:** `/privacy`, `/terms`  
**Status:** Approved

---

## Overview

Build two standalone legal pages for Deep Ocean that match the existing visual design system established by `/support`. Both pages are semi-formal (clear legal structure, standard sections) but written in Deep Ocean's calm, direct voice. Content is bilingual EN + VI rendered simultaneously on a single page (no tab switching, full SSR).

---

## Visual Structure

Both pages share an identical shell and layout pattern:

```
[Branded nav: Logo + Home link]
[Hero: Page title EN / VI + last updated date]
[2-column body: sticky TOC sidebar (desktop) | scrollable content sections]
[Footer: back links to home, support, and the other legal page]
```

**Desktop:** Sticky sidebar (~240px) lists numbered section anchors. Content area takes remaining width.  
**Mobile:** Sidebar hidden. Content is single-column. Section headings serve as visual anchors.

**Bilingual rendering per section:**
- Heading: EN title stacked above VI title (VI in `--color-text-muted`)
- Body: EN paragraph(s) in `--color-text-secondary`, then a subtle CSS divider line, then VI paragraph(s) in `--color-text-muted` (no italic — Vietnamese diacritics render poorly in italic)

---

## File Structure

### New files
| File | Purpose |
|------|---------|
| `src/app/privacy/page.tsx` | `/privacy` route — Server Component |
| `src/app/terms/page.tsx` | `/terms` route — Server Component |
| `src/content/legalContent.ts` | All EN + VI text content for both pages |

### Updated files
| File | Change |
|------|--------|
| `src/app/globals.css` | Add `.legal-shell`, `.legal-toc`, `.legal-body`, `.legal-section`, `.legal-section-heading`, `.legal-divider`, `.legal-vi` classes |
| `src/content/landingContent.ts` | `siteLinks.privacy → "/privacy"`, `siteLinks.terms → "/terms"` |
| `src/app/sitemap.ts` | Add `/privacy` and `/terms` entries |

### CSS reuse
- `.support-shell` — main page background + grid overlay
- `.support-nav`, `.support-brand`, `.support-home-link` — top navigation
- `.ambient-field` — floating particle dots
- `.button`, `.button-primary`, `.button-secondary` — CTA buttons
- `.eyebrow` — monospace kicker labels

---

## Privacy Policy — `/privacy`

**Title:** Privacy Policy / Chính sách quyền riêng tư  
**Last updated:** June 30, 2026

| # | Section EN | Section VI | Key content |
|---|-----------|-----------|-------------|
| 1 | Overview | Tổng quan | Local-first app, no account required, this policy covers what data may be involved |
| 2 | Information We Collect | Thông tin chúng tôi thu thập | AI prompt text (if AI used), purchase receipt (via RevenueCat/App Store), no name/email/account collected |
| 3 | How Your Data Is Stored | Dữ liệu được lưu trữ như thế nào | MMKV on-device: dive history, XP, streaks, collection, settings, cached AI responses |
| 4 | Third-Party Services | Dịch vụ bên thứ ba | RevenueCat (purchase verification), AI providers (if configured by user), Apple App Store |
| 5 | Data Sharing & Sale | Chia sẻ & bán dữ liệu | No data sold. No advertiser sharing. Third-party services operate under their own policies |
| 6 | Your Rights | Quyền của bạn | Delete local data via app settings; email support for purchase-related data requests |
| 7 | Children's Privacy | Quyền riêng tư trẻ em | Not directed at children under 13; no knowingly collected data from children |
| 8 | Changes to This Policy | Thay đổi chính sách | Will update this page; continued use after change = acceptance |
| 9 | Contact | Liên hệ | support@deepocean.io.vn |

---

## Terms of Service — `/terms`

**Title:** Terms of Service / Điều khoản dịch vụ  
**Last updated:** June 30, 2026

| # | Section EN | Section VI | Key content |
|---|-----------|-----------|-------------|
| 1 | Acceptance of Terms | Chấp nhận điều khoản | Using the app = accepting these terms |
| 2 | Description of Service | Mô tả dịch vụ | Focus timer app, local-first, no account required, AI features optional |
| 3 | Intellectual Property | Sở hữu trí tuệ | App, assets, and content owned by Deep Ocean; user granted personal non-commercial license |
| 4 | Deep Ocean Pro & Subscriptions | Deep Ocean Pro & Đăng ký | Billed via App Store/RevenueCat; billing managed by Apple; restore purchase instructions; no refunds from Deep Ocean (Apple's refund policy applies) |
| 5 | Acceptable Use | Sử dụng hợp lệ | No reverse engineering, no misuse of AI features, personal use only |
| 6 | Disclaimers | Tuyên bố miễn trừ trách nhiệm | App provided "as is"; AI features depend on third-party providers and may be unavailable |
| 7 | Limitation of Liability | Giới hạn trách nhiệm pháp lý | Deep Ocean not liable for indirect/consequential damages; liability limited to amount paid |
| 8 | Changes to Terms | Thay đổi điều khoản | Will update this page with notice; continued use = acceptance |
| 9 | Contact | Liên hệ | support@deepocean.io.vn |

---

## Data Model for `legalContent.ts`

```ts
type LegalSection = {
  id: string
  heading: { en: string; vi: string }
  body: { en: string[]; vi: string[] }  // array of paragraphs
}

type LegalPage = {
  slug: "privacy" | "terms"
  title: { en: string; vi: string }
  updatedAt: string
  sections: LegalSection[]
}
```

Pages import their respective `LegalPage` object and render with a shared `LegalPageShell` component.

---

## Metadata

Each page exports its own `metadata` (Next.js Metadata API):
- `title`, `description`, `alternates.canonical`
- `openGraph` with the standard ocean portal image
- `twitter` card

---

## Routing Updates

- `siteLinks.privacy` → `"/privacy"` (currently `"#privacy"`)
- `siteLinks.terms` → `"/terms"` (currently `"#launch-notes"`)
- Footer "Privacy overview" link → `/privacy`
- Footer "Launch notes" link → renamed to "Terms of Service" + `/terms`
- Sitemap → add both routes with `priority: 0.6`

---

## Out of Scope

- Language toggle / i18n routing (content rendered inline, both languages always visible)
- CMS or editable content (static TS file is sufficient at this stage)
- Cookie consent banner (app has no cookies)
- Separate mobile layout file (CSS handles responsive)
