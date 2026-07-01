# EN / VI Language Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a site-wide EN/VI language toggle to the Deep Ocean marketing site (`/`, `/privacy`, `/terms`, `/support`) with no URL change and no flash of the wrong language.

**Architecture:** Every translatable string renders as two DOM nodes (`.i18n-en` / `.i18n-vi`) via a shared `<T en vi />` helper. CSS driven by an `html[data-locale]` attribute shows only the active language. An inline `<script>` in `app/layout.tsx`'s `<head>` sets `data-locale` from `localStorage` (falling back to `navigator.language`) before first paint, so there's no hydration mismatch and no flash. Section components stay Server Components; only the toggle button is a Client Component.

**Tech Stack:** Next.js 16 App Router, React 19, plain CSS (no i18n library — see `docs/superpowers/specs/2026-07-01-language-toggle-design.md`).

## Global Constraints

- Storage key is exactly `"deepocean-locale"`, value `"en" | "vi"`.
- Translatable content fields become `{ en: string; vi: string }` pairs, matching the existing convention in `src/content/legalContent.ts`.
- Do **not** translate: image `alt` text, `aria-label`s, page `metadata` (title/description/OpenGraph/Twitter), or brand/product terms (`Deep Ocean`, `Pro`, `XP`, ocean zone names, `App Store`, `Google Play`, `iOS WidgetKit & Live Activity`).
- No test framework exists in this repo (no jest/vitest/playwright — confirmed via `package.json`). Verification per task is: `npm run typecheck`, `npm run build`, and a `curl`-based structural check of the rendered HTML (grep for expected classes/text). The full interactive click-through (final Task 15) is the only manual-browser step.
- Every `.map()` that used a translated field as its React `key` must switch to a stable, untranslated key (usually `.en`, or an existing `id`/`number`/`href` field). Get this right per task — a duplicate or missing key is a silent bug.
- Follow the dual-render + CSS pattern from `node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md` ("Themes" section) — do not introduce a React Context or convert section components to Client Components.

---

### Task 1: Foundation — `T` component, CSS toggle rules, flash-free script, toggle button

**Files:**
- Create: `src/components/ui/T.tsx`
- Create: `src/components/ui/LangToggle.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/components/ui/Navbar.tsx`

**Interfaces:**
- Produces: `T({ en: React.ReactNode; vi: React.ReactNode })` — used by every later task to render bilingual content.
- Produces: `LangToggle()` — a Client Component, no props, self-contained. Later tasks only need to import and render `<LangToggle />`.
- Produces: `data-locale` attribute on `<html>`, values `"en" | "vi"`, and CSS classes `.i18n-en` / `.i18n-vi` that later tasks use inside `<T>`.

- [ ] **Step 1: Create the `T` component**

Create `src/components/ui/T.tsx`:

```tsx
import type { ReactNode } from "react";

export function T({ en, vi }: { en: ReactNode; vi: ReactNode }) {
  return (
    <>
      <span className="i18n-en">{en}</span>
      <span className="i18n-vi">{vi}</span>
    </>
  );
}
```

- [ ] **Step 2: Add the locale CSS rules and toggle button styles**

In `src/app/globals.css`, find the `.site-nav` block (around line 214) and insert the following new block immediately **before** it:

```css
.i18n-vi {
  display: none;
}

html[data-locale="vi"] .i18n-en {
  display: none;
}

html[data-locale="vi"] .i18n-vi {
  display: inline;
}

.lang-toggle {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 4px;
  border: 1px solid var(--color-line);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.03);
  cursor: pointer;
}

.lang-toggle span {
  padding: 4px 10px;
  border-radius: 999px;
  color: var(--color-text-muted);
  font-family: var(--font-mono), "JetBrains Mono", monospace;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  transition: background 160ms ease, color 160ms ease;
}

.lang-toggle span.active {
  background: rgba(34, 228, 255, 0.14);
  color: var(--color-cyan);
}
```

Then find the mobile nav media query (`@media (max-width: 820px) { .site-nav { ... }`, around line 2331) and add this rule right after the existing `.nav-links a:last-child { border-bottom: 0; }` line, inside the same media query block:

```css
  .nav-links .lang-toggle {
    margin: 0.75rem 1rem;
  }
```

- [ ] **Step 3: Add the flash-prevention script to the root layout**

In `src/app/layout.tsx`, the current `RootLayout` renders:

```tsx
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetBrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
```

Replace it with:

```tsx
    <html
      lang="en"
      data-locale="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetBrainsMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem("deepocean-locale");var l=(s==="en"||s==="vi")?s:((navigator.language||"").toLowerCase().indexOf("vi")===0?"vi":"en");document.documentElement.setAttribute("data-locale",l);document.documentElement.lang=l;}catch(e){}})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
```

- [ ] **Step 4: Verify typecheck and build pass**

Run: `npm run typecheck`
Expected: no output, exit code 0.

Run: `npm run build`
Expected: build succeeds, all 6 routes still listed (`/`, `/_not-found`, `/privacy`, `/robots.txt`, `/sitemap.xml`, `/support`, `/terms`).

- [ ] **Step 5: Create the `LangToggle` client component**

Create `src/components/ui/LangToggle.tsx`:

```tsx
"use client";

import { useCallback, useState } from "react";

const STORAGE_KEY = "deepocean-locale";

type Locale = "en" | "vi";

function readLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "vi") return stored;
  return (navigator.language || "").toLowerCase().startsWith("vi") ? "vi" : "en";
}

export function LangToggle() {
  const [locale, setLocale] = useState<Locale>(readLocale);

  const toggle = useCallback(() => {
    const next: Locale = locale === "en" ? "vi" : "en";
    setLocale(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.setAttribute("data-locale", next);
    document.documentElement.lang = next;
  }, [locale]);

  return (
    <button
      type="button"
      className="lang-toggle"
      onClick={toggle}
      aria-label="Switch language"
    >
      <span className={locale === "en" ? "active" : undefined}>EN</span>
      <span className={locale === "vi" ? "active" : undefined}>VI</span>
    </button>
  );
}
```

- [ ] **Step 6: Wire the toggle into the Navbar**

In `src/components/ui/Navbar.tsx`, add the import:

```tsx
import { LangToggle } from "@/components/ui/LangToggle";
```

right after `import { navItems, siteLinks } from "@/content/landingContent";`.

Then find:

```tsx
      <div className={`nav-links${open ? " nav-links-open" : ""}`}>
        {navItems.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
      </div>
```

Replace with:

```tsx
      <div className={`nav-links${open ? " nav-links-open" : ""}`}>
        {navItems.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <LangToggle />
      </div>
```

(`navItems` labels are still plain strings at this point — Task 2 converts them. This step only places the toggle.)

- [ ] **Step 7: Verify typecheck and build pass**

Run: `npm run typecheck && npm run build`
Expected: both succeed with no errors.

- [ ] **Step 8: Verify the script and CSS structurally**

Run:
```bash
npm run build && npm run start -- -p 3411 & sleep 1
sleep 3
curl -s http://localhost:3411/ -o /tmp/deepocean-home.html
grep -o 'data-locale="en"' /tmp/deepocean-home.html | head -1
grep -o 'deepocean-locale' /tmp/deepocean-home.html | head -1
grep -o 'class="lang-toggle"' /tmp/deepocean-home.html | head -1
kill %1 2>/dev/null
```
Expected: all three `grep` calls print a match (confirms the default `data-locale="en"` on `<html>`, the inline script referencing the storage key, and the toggle button are all present in the server-rendered HTML).

- [ ] **Step 9: Commit**

```bash
git add src/components/ui/T.tsx src/components/ui/LangToggle.tsx src/app/layout.tsx src/app/globals.css src/components/ui/Navbar.tsx
git commit -m "feat: add language toggle foundation (T component, CSS, flash-free script)"
```

---

### Task 2: Translate Navbar (`navItems` + "Coming soon" CTA)

**Files:**
- Modify: `src/content/landingContent.ts`
- Modify: `src/components/ui/Navbar.tsx`

**Interfaces:**
- Consumes: `T` from `src/components/ui/T.tsx` (Task 1).
- Produces: `navItems: { label: { en: string; vi: string }; href: string }[]` — no other file currently imports `navItems` besides `Navbar.tsx`.

- [ ] **Step 1: Convert `navItems` to bilingual labels**

In `src/content/landingContent.ts`, find:

```ts
export const navItems = [
  { label: "Why Deep Ocean", href: "#problem" },
  { label: "Features", href: "#features" },
  { label: "Experience", href: "#screens" },
  { label: "Pro", href: "#premium" },
  { label: "Privacy", href: "#privacy" },
] as const;
```

Replace with:

```ts
export const navItems = [
  { label: { en: "Why Deep Ocean", vi: "Vì sao chọn Deep Ocean" }, href: "#problem" },
  { label: { en: "Features", vi: "Tính năng" }, href: "#features" },
  { label: { en: "Experience", vi: "Trải nghiệm" }, href: "#screens" },
  { label: { en: "Pro", vi: "Pro" }, href: "#premium" },
  { label: { en: "Privacy", vi: "Quyền riêng tư" }, href: "#privacy" },
] as const;
```

- [ ] **Step 2: Update `Navbar.tsx` to render bilingual labels and CTA**

In `src/components/ui/Navbar.tsx`, add the import:

```tsx
import { T } from "@/components/ui/T";
```

after the `LangToggle` import. Then find:

```tsx
        {navItems.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
```

Replace with:

```tsx
        {navItems.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            <T en={link.label.en} vi={link.label.vi} />
          </a>
        ))}
```

Then find:

```tsx
      <a className="nav-cta" href={siteLinks.primaryCta}>
        Coming soon
      </a>
```

Replace with:

```tsx
      <a className="nav-cta" href={siteLinks.primaryCta}>
        <T en="Coming soon" vi="Sắp ra mắt" />
      </a>
```

- [ ] **Step 3: Verify**

Run: `npm run typecheck && npm run build`
Expected: both succeed.

Run:
```bash
npm run start -- -p 3411 & sleep 3
curl -s http://localhost:3411/ | grep -o 'Vì sao chọn Deep Ocean'
curl -s http://localhost:3411/ | grep -o 'Sắp ra mắt'
kill %1 2>/dev/null
```
Expected: both `grep` calls print a match — confirms the Vietnamese nav copy is present in the server-rendered HTML (it's just hidden by default CSS, which is correct for the dual-render approach).

- [ ] **Step 4: Commit**

```bash
git add src/content/landingContent.ts src/components/ui/Navbar.tsx
git commit -m "feat: translate navbar to EN/VI"
```

---

### Task 3: Widen `SectionHeading` and `FeatureStoryCard` prop types

**Files:**
- Modify: `src/components/ui/SectionHeading.tsx`
- Modify: `src/components/ui/FeatureStoryCard.tsx`

**Interfaces:**
- Produces: `SectionHeading({ eyebrow: ReactNode; title: ReactNode; description?: ReactNode; align?: "left" | "center" })` — consumed by Tasks 5–11.
- Produces: `FeatureStoryCard({ image; category: ReactNode; title: ReactNode; description: ReactNode; index })` — consumed by Task 5.

- [ ] **Step 1: Widen `SectionHeading` prop types**

Replace the full contents of `src/components/ui/SectionHeading.tsx`:

```tsx
import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={`section-heading section-heading-${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  );
}
```

- [ ] **Step 2: Widen `FeatureStoryCard` prop types**

In `src/components/ui/FeatureStoryCard.tsx`, find:

```tsx
type FeatureStoryCardProps = {
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    position?: string;
  };
  category: string;
  title: string;
  description: string;
  index: number;
};
```

Replace with:

```tsx
import type { ReactNode } from "react";

type FeatureStoryCardProps = {
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    position?: string;
  };
  category: ReactNode;
  title: ReactNode;
  description: ReactNode;
  index: number;
};
```

(Add the `import type { ReactNode } from "react";` line near the top of the file, alongside the existing imports.)

- [ ] **Step 3: Verify**

Run: `npm run typecheck && npm run build`
Expected: both succeed — no other file has been changed yet, so behavior is unchanged, this only widens types.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/SectionHeading.tsx src/components/ui/FeatureStoryCard.tsx
git commit -m "refactor: widen SectionHeading and FeatureStoryCard prop types to ReactNode"
```

---

### Task 4: Translate Hero + Problem/Solution sections

**Files:**
- Modify: `src/content/landingContent.ts`
- Modify: `src/components/sections/HeroSection.tsx`
- Modify: `src/components/sections/ProblemSolutionSection.tsx`

**Interfaces:**
- Consumes: `T` (Task 1).
- Produces: `problemSolution.problem/solution.{eyebrow,title,body}: { en; vi }` — only consumed by `ProblemSolutionSection.tsx`.

- [ ] **Step 1: Convert `problemSolution` to bilingual fields**

In `src/content/landingContent.ts`, find:

```ts
export const problemSolution = {
  problem: {
    eyebrow: "The surface problem",
    title: "Most timers measure attention. They do not make it easier to return.",
    body: "A plain countdown can feel like another demand. Deep Ocean gives focus a calm sense of place, visible progression, and a reason to protect the next few minutes.",
  },
  solution: {
    eyebrow: "A quieter system",
    title: "Every session becomes a dive with a beginning, a descent, and something worth surfacing with.",
    body: "Choose a duration or free dive, watch time become depth, discover ocean life, and build a personal record of focused work without turning productivity into noise.",
  },
} as const;
```

Replace with:

```ts
export const problemSolution = {
  problem: {
    eyebrow: { en: "The surface problem", vi: "Vấn đề trên mặt nước" },
    title: {
      en: "Most timers measure attention. They do not make it easier to return.",
      vi: "Hầu hết bộ đếm giờ chỉ đo sự tập trung. Chúng không giúp bạn dễ quay lại hơn.",
    },
    body: {
      en: "A plain countdown can feel like another demand. Deep Ocean gives focus a calm sense of place, visible progression, and a reason to protect the next few minutes.",
      vi: "Một bộ đếm ngược đơn thuần có thể giống thêm một áp lực khác. Deep Ocean mang lại cho sự tập trung một cảm giác về nơi chốn bình yên, tiến trình rõ ràng và một lý do để bảo vệ vài phút tiếp theo.",
    },
  },
  solution: {
    eyebrow: { en: "A quieter system", vi: "Một hệ thống tĩnh lặng hơn" },
    title: {
      en: "Every session becomes a dive with a beginning, a descent, and something worth surfacing with.",
      vi: "Mỗi phiên tập trung trở thành một lượt lặn có điểm bắt đầu, một hành trình đi xuống, và điều gì đó đáng để mang lên khi trồi lên mặt nước.",
    },
    body: {
      en: "Choose a duration or free dive, watch time become depth, discover ocean life, and build a personal record of focused work without turning productivity into noise.",
      vi: "Chọn thời lượng hoặc lặn tự do, xem thời gian biến thành độ sâu, khám phá sinh vật đại dương, và xây dựng một hồ sơ cá nhân về công việc tập trung mà không biến năng suất thành áp lực ồn ào.",
    },
  },
} as const;
```

- [ ] **Step 2: Translate `HeroSection.tsx`**

Replace the full contents of `src/components/sections/HeroSection.tsx`:

```tsx
import Image from "next/image";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
import { AppScreenshot } from "@/components/ui/AppScreenshot";
import { Reveal } from "@/components/ui/Reveal";
import { T } from "@/components/ui/T";
import { siteLinks } from "@/content/landingContent";

export function HeroSection() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-art" aria-hidden>
        <Image
          src="/assets/ocean-portal-wide.png"
          alt=""
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className="hero-shade" />
      <div className="hero-inner">
        <Reveal className="hero-copy">
          <div className="hero-brand-line">
            <Image src="/assets/app-icon.png" alt="" width={38} height={38} />
            <span><T en="Focus dives for iPhone & Android" vi="Lặn tập trung cho iPhone & Android" /></span>
          </div>
          <h1>
            <T en="Focus deeper." vi="Tập trung sâu hơn." />
            <span><T en="Surface calmer." vi="Trồi lên bình yên hơn." /></span>
          </h1>
          <p className="hero-lede">
            <T
              en="Deep Ocean turns each focus session into an underwater dive—where uninterrupted minutes become depth, discoveries, and a lasting record of the attention you protected."
              vi="Deep Ocean biến mỗi phiên tập trung thành một lượt lặn dưới nước — nơi những phút giây không bị gián đoạn trở thành độ sâu, khám phá, và một hồ sơ lâu dài về sự tập trung bạn đã bảo vệ."
            />
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={siteLinks.primaryCta}>
              <T en="Get launch updates" vi="Nhận cập nhật ra mắt" />
              <ArrowRight size={18} />
            </a>
            <a className="button button-secondary" href={siteLinks.secondaryCta}>
              <T en="Explore the dive" vi="Khám phá lượt lặn" />
              <ArrowDown size={17} />
            </a>
          </div>
          <div className="hero-proof">
            <span><Check size={14} /> <T en="Timed or free dives" vi="Lặn có giờ hoặc lặn tự do" /></span>
            <span><Check size={14} /> <T en="Core focus loop stays accessible" vi="Vòng lặp tập trung cốt lõi luôn có thể sử dụng được" /></span>
            <span><Check size={14} /> <T en="English & Vietnamese app UI" vi="Giao diện ứng dụng tiếng Anh & tiếng Việt" /></span>
          </div>
        </Reveal>

        <Reveal className="hero-device-stage" delay={0.15}>
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
          <AppScreenshot screen="dive" priority />
        </Reveal>
      </div>
      <div className="hero-depth-scale" aria-hidden>
        <span>0 m</span><i /><span>6,000 m+</span>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Translate `ProblemSolutionSection.tsx`**

Replace the full contents of `src/components/sections/ProblemSolutionSection.tsx`:

```tsx
import { ArrowDown, Waves } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { T } from "@/components/ui/T";
import { problemSolution } from "@/content/landingContent";

export function ProblemSolutionSection() {
  return (
    <section id="problem" className="section problem-section">
      <div className="section-inner problem-grid">
        <Reveal className="problem-card problem-card-muted">
          <span className="problem-index">01</span>
          <p className="eyebrow"><T en={problemSolution.problem.eyebrow.en} vi={problemSolution.problem.eyebrow.vi} /></p>
          <h2><T en={problemSolution.problem.title.en} vi={problemSolution.problem.title.vi} /></h2>
          <p><T en={problemSolution.problem.body.en} vi={problemSolution.problem.body.vi} /></p>
          <div className="problem-visual" aria-hidden>
            <span>25:00</span>
            <i />
            <small><T en="another countdown" vi="một bộ đếm ngược khác" /></small>
          </div>
        </Reveal>

        <div className="problem-connector" aria-hidden>
          <ArrowDown size={18} />
        </div>

        <Reveal className="problem-card problem-card-solution" delay={0.12}>
          <span className="problem-index">02</span>
          <p className="eyebrow"><T en={problemSolution.solution.eyebrow.en} vi={problemSolution.solution.eyebrow.vi} /></p>
          <h2><T en={problemSolution.solution.title.en} vi={problemSolution.solution.title.vi} /></h2>
          <p><T en={problemSolution.solution.body.en} vi={problemSolution.solution.body.vi} /></p>
          <div className="solution-visual">
            <Waves size={28} />
            <div>
              <strong><T en="Focus becomes a place." vi="Sự tập trung trở thành một nơi chốn." /></strong>
              <small><T en="A ritual you can return to." vi="Một nghi thức bạn có thể quay lại." /></small>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npm run typecheck && npm run build`
Expected: both succeed.

Run:
```bash
npm run start -- -p 3411 & sleep 3
curl -s http://localhost:3411/ | grep -c 'i18n-vi'
curl -s http://localhost:3411/ | grep -o 'Trồi lên bình yên hơn'
kill %1 2>/dev/null
```
Expected: the count is greater than before (more bilingual nodes present), and the Vietnamese hero headline text is found.

- [ ] **Step 5: Commit**

```bash
git add src/content/landingContent.ts src/components/sections/HeroSection.tsx src/components/sections/ProblemSolutionSection.tsx
git commit -m "feat: translate hero and problem/solution sections to EN/VI"
```

---

### Task 5: Translate Features section (`features` + `featureStories`)

**Files:**
- Modify: `src/content/landingContent.ts`
- Modify: `src/components/sections/FeaturesSection.tsx`

Note: the `features` array (6 items with icon/title/description/tag) is currently unused by any component — grep confirms only `featureStories` is rendered by `FeaturesSection.tsx`. Translate both for content-model consistency and because `features` may be wired up later, but only `featureStories` has a rendering change in this task.

**Interfaces:**
- Consumes: `T`, `SectionHeading` (widened in Task 3), `FeatureStoryCard` (widened in Task 3).
- Produces: `featureStories: { image; category: {en,vi}; title: {en,vi}; description: {en,vi} }[]`.

- [ ] **Step 1: Convert `features` to bilingual fields**

In `src/content/landingContent.ts`, find the `features` array (starts with `export const features = [`) and replace its full contents with:

```ts
export const features = [
  {
    icon: TimerReset,
    title: { en: "Timed and free dives", vi: "Lặn có giờ và lặn tự do" },
    description: {
      en: "Start with 15, 25, 45, or 60 minutes, choose a custom duration, or leave the timer open and surface when the work is done.",
      vi: "Bắt đầu với 15, 25, 45 hoặc 60 phút, chọn thời lượng tùy chỉnh, hoặc để bộ đếm giờ mở và trồi lên khi công việc hoàn tất.",
    },
    tag: { en: "Core focus", vi: "Tập trung cốt lõi" },
  },
  {
    icon: Layers3,
    title: { en: "Five depth zones", vi: "Năm vùng độ sâu" },
    description: {
      en: "Focused minutes move you from the Sunlight Zone through Twilight, Midnight, Abyssal, and the Hadal Trench.",
      vi: "Những phút tập trung đưa bạn từ Vùng Ánh Sáng qua Vùng Chạng Vạng, Vùng Nửa Đêm, Vùng Vực Thẳm, và Rãnh Hadal.",
    },
    tag: { en: "Progression", vi: "Tiến trình" },
  },
  {
    icon: FishSymbol,
    title: { en: "Creatures, artifacts, and lore", vi: "Sinh vật, cổ vật và truyền thuyết" },
    description: {
      en: "Deterministic discovery rolls reveal creatures and artifacts from the zone you reached, building an expedition log over time.",
      vi: "Các lượt khám phá xác định sẵn hé lộ sinh vật và cổ vật từ vùng bạn đã đến, dần xây dựng một nhật ký thám hiểm theo thời gian.",
    },
    tag: { en: "Collection", vi: "Bộ sưu tập" },
  },
  {
    icon: Trophy,
    title: { en: "XP, levels, streaks, and titles", vi: "XP, cấp độ, chuỗi ngày và danh hiệu" },
    description: {
      en: "Completed focus earns XP and can advance levels, daily streaks, zone unlocks, and milestone achievements.",
      vi: "Hoàn thành phiên tập trung nhận XP và có thể tăng cấp độ, duy trì chuỗi ngày, mở khóa vùng mới và đạt các cột mốc thành tựu.",
    },
    tag: { en: "Motivation", vi: "Động lực" },
  },
  {
    icon: ChartNoAxesCombined,
    title: { en: "Focus analytics", vi: "Phân tích tập trung" },
    description: {
      en: "Review total focus, maximum depth, weekly rhythm, recent expeditions, discoveries, and per-session reports.",
      vi: "Xem lại tổng thời gian tập trung, độ sâu tối đa, nhịp độ theo tuần, các chuyến thám hiểm gần đây, khám phá và báo cáo từng phiên.",
    },
    tag: { en: "Reflection", vi: "Nhìn lại" },
  },
  {
    icon: MoonStar,
    title: { en: "Calm sensory feedback", vi: "Phản hồi giác quan êm dịu" },
    description: {
      en: "Cinematic motion, underwater ambience, semantic haptics, reduced-motion support, and discovery alerts shape the ritual.",
      vi: "Chuyển động điện ảnh, không khí dưới nước, rung phản hồi có ngữ nghĩa, hỗ trợ giảm chuyển động và thông báo khám phá tạo nên nghi thức tập trung.",
    },
    tag: { en: "Atmosphere", vi: "Không khí" },
  },
] as const;
```

- [ ] **Step 2: Convert `featureStories` to bilingual fields**

In the same file, find the `featureStories` array and replace its full contents with:

```ts
export const featureStories = [
  {
    image: {
      src: "/assets/ocean-portal-wide.png",
      alt: "Deep Ocean widget artwork showing a whale below a sunlit ocean portal",
      width: 1000,
      height: 500,
      position: "center",
    },
    category: { en: "The ritual", vi: "Nghi thức" },
    title: {
      en: "Start with a destination, not another countdown.",
      vi: "Bắt đầu với một điểm đến, không phải thêm một bộ đếm ngược.",
    },
    description: {
      en: "Choose a timed or open-ended dive and let focused minutes become a visible descent through the ocean.",
      vi: "Chọn một lượt lặn có giờ hoặc không giới hạn và để những phút tập trung trở thành một hành trình đi xuống đại dương có thể nhìn thấy được.",
    },
  },
  {
    image: {
      src: "/assets/living-jellyfish-square.png",
      alt: "Deep Ocean Living Ocean widget artwork with a glowing jellyfish",
      width: 900,
      height: 900,
      position: "center",
    },
    category: { en: "The atmosphere", vi: "Không khí" },
    title: {
      en: "A living world that makes returning feel natural.",
      vi: "Một thế giới sống động khiến việc quay lại trở nên tự nhiên.",
    },
    description: {
      en: "Ocean zones, discoveries, restrained motion, ambience, and haptics turn focus into a repeatable calm ritual.",
      vi: "Các vùng đại dương, khám phá, chuyển động tiết chế, không khí và rung phản hồi biến sự tập trung thành một nghi thức bình yên có thể lặp lại.",
    },
  },
  {
    image: {
      src: "/screenshots/stats.png",
      alt: "Real Deep Ocean Dive Analytics screen with focus totals and expedition history",
      width: 1290,
      height: 2796,
      position: "center 18%",
    },
    category: { en: "The record", vi: "Hồ sơ" },
    title: {
      en: "See the attention you protected over time.",
      vi: "Xem lại sự tập trung bạn đã bảo vệ theo thời gian.",
    },
    description: {
      en: "Completed dives build authentic history through total focus, weekly rhythm, depth records, and recent expeditions.",
      vi: "Các lượt lặn đã hoàn thành xây dựng nên lịch sử chân thực qua tổng thời gian tập trung, nhịp độ theo tuần, kỷ lục độ sâu và các chuyến thám hiểm gần đây.",
    },
  },
] as const;
```

- [ ] **Step 3: Update `FeaturesSection.tsx`**

Replace the full contents of `src/components/sections/FeaturesSection.tsx`:

```tsx
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { FeatureStoryCard } from "@/components/ui/FeatureStoryCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { T } from "@/components/ui/T";
import { featureStories } from "@/content/landingContent";

export function FeaturesSection() {
  return (
    <section id="features" className="section feature-stories-section">
      <div className="section-inner">
        <AnimatedSection>
          <SectionHeading
            eyebrow={<T en="Stories from below" vi="Những câu chuyện từ đáy sâu" />}
            title={<T en="A focus ritual, told in three real views." vi="Một nghi thức tập trung, kể qua ba góc nhìn thật." />}
            description={
              <T
                en="Every visual comes from the current project: shipped widget artwork or a verified mobile-app capture."
                vi="Mọi hình ảnh đều đến từ dự án hiện tại: hình minh họa widget đã phát hành hoặc ảnh chụp thực tế từ ứng dụng di động đã xác minh."
              />
            }
          />
        </AnimatedSection>
        <div className="feature-story-grid">
          {featureStories.map((story, index) => (
            <FeatureStoryCard
              image={story.image}
              category={<T en={story.category.en} vi={story.category.vi} />}
              title={<T en={story.title.en} vi={story.title.vi} />}
              description={<T en={story.description.en} vi={story.description.vi} />}
              index={index}
              key={story.title.en}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npm run typecheck && npm run build`
Expected: both succeed. (`features` is still unused — this is pre-existing and out of scope to fix here.)

Run:
```bash
npm run start -- -p 3411 & sleep 3
curl -s http://localhost:3411/ | grep -o 'Những câu chuyện từ đáy sâu'
kill %1 2>/dev/null
```
Expected: match found.

- [ ] **Step 5: Commit**

```bash
git add src/content/landingContent.ts src/components/sections/FeaturesSection.tsx
git commit -m "feat: translate features section to EN/VI"
```

---

### Task 6: Translate How It Works + Screens Preview sections

**Files:**
- Modify: `src/content/landingContent.ts`
- Modify: `src/components/sections/HowItWorksSection.tsx`
- Modify: `src/components/sections/ScreensPreviewSection.tsx`

**Interfaces:**
- Consumes: `T`, `SectionHeading`.
- Produces: `steps: { number: string; title: {en,vi}; description: {en,vi} }[]`, `screenPreviews: { id; label: {en,vi}; title: {en,vi}; description: {en,vi} }[]`.

- [ ] **Step 1: Convert `steps` to bilingual fields**

In `src/content/landingContent.ts`, find the `steps` array and replace its full contents with:

```ts
export const steps = [
  {
    number: "01",
    title: { en: "Tell Deep Ocean what you want to improve", vi: "Cho Deep Ocean biết điều bạn muốn cải thiện" },
    description: {
      en: "Onboarding captures goals such as focus, consistency, stress reduction, learning, routines, and productivity.",
      vi: "Bước giới thiệu ghi nhận các mục tiêu như tập trung, duy trì đều đặn, giảm căng thẳng, học tập, thói quen và năng suất.",
    },
  },
  {
    number: "02",
    title: { en: "Choose a focus rhythm", vi: "Chọn nhịp độ tập trung" },
    description: {
      en: "Select a recommended workflow and a timed or open-ended dive that fits the energy you have today.",
      vi: "Chọn một quy trình được gợi ý và một lượt lặn có giờ hoặc không giới hạn phù hợp với năng lượng bạn có hôm nay.",
    },
  },
  {
    number: "03",
    title: { en: "Descend while you work", vi: "Đi xuống trong khi bạn làm việc" },
    description: {
      en: "The live dive tracks elapsed focus, depth, zone, discoveries, pause state, and completion without crowding the screen.",
      vi: "Lượt lặn trực tiếp theo dõi thời gian tập trung đã trôi qua, độ sâu, vùng, khám phá, trạng thái tạm dừng và hoàn thành mà không làm rối màn hình.",
    },
  },
  {
    number: "04",
    title: { en: "Surface with a useful record", vi: "Trồi lên với một hồ sơ hữu ích" },
    description: {
      en: "A completed dive is saved with XP, depth, discoveries, level progress, streak updates, and an expedition report.",
      vi: "Một lượt lặn hoàn thành được lưu lại cùng XP, độ sâu, khám phá, tiến trình cấp độ, cập nhật chuỗi ngày và báo cáo thám hiểm.",
    },
  },
] as const;
```

- [ ] **Step 2: Convert `screenPreviews` to bilingual fields**

In the same file, find the `screenPreviews` array and replace its full contents with:

```ts
export const screenPreviews = [
  {
    id: "home",
    label: { en: "Home", vi: "Trang chính" },
    title: { en: "A calm launch point", vi: "Một điểm khởi đầu bình yên" },
    description: {
      en: "See your last dive, preferred session, quick durations, depth progress, daily guidance, streak, dives, and level.",
      vi: "Xem lượt lặn gần nhất, phiên yêu thích, thời lượng nhanh, tiến trình độ sâu, hướng dẫn hằng ngày, chuỗi ngày, số lượt lặn và cấp độ.",
    },
  },
  {
    id: "dive",
    label: { en: "Live dive", vi: "Lặn trực tiếp" },
    title: { en: "Attention, with almost no chrome", vi: "Sự tập trung, gần như không giao diện thừa" },
    description: {
      en: "One cinematic screen holds the progress ring, elapsed time, depth, zone, discoveries, pause, surface, and abort controls.",
      vi: "Một màn hình điện ảnh duy nhất chứa vòng tiến trình, thời gian đã trôi qua, độ sâu, vùng, khám phá, cùng các nút tạm dừng, trồi lên và hủy.",
    },
  },
  {
    id: "collection",
    label: { en: "Expedition log", vi: "Nhật ký thám hiểm" },
    title: { en: "A collection earned through real focus", vi: "Một bộ sưu tập đạt được nhờ sự tập trung thật sự" },
    description: {
      en: "Catalog creatures and artifacts by rarity, revisit sightings, and unlock deeper field-journal entries with Pro.",
      vi: "Phân loại sinh vật và cổ vật theo độ hiếm, xem lại các lần bắt gặp, và mở khóa các mục nhật ký thực địa chuyên sâu hơn với Pro.",
    },
  },
  {
    id: "stats",
    label: { en: "Dive analytics", vi: "Phân tích lượt lặn" },
    title: { en: "A history of protected attention", vi: "Một lịch sử của sự tập trung được bảo vệ" },
    description: {
      en: "Review total focus, maximum depth, a seven-day heatmap, recent expeditions, and individual session reports.",
      vi: "Xem lại tổng thời gian tập trung, độ sâu tối đa, bản đồ nhiệt bảy ngày, các chuyến thám hiểm gần đây và báo cáo từng phiên.",
    },
  },
  {
    id: "ai",
    label: { en: "Marine Guide", vi: "Hướng Dẫn Viên Biển" },
    title: { en: "Guidance grounded in your app context", vi: "Hướng dẫn dựa trên bối cảnh sử dụng ứng dụng của bạn" },
    description: {
      en: "Daily recommendations, motivation, session reflection, mood selection, and a cached or local fallback when hosted AI is unavailable.",
      vi: "Gợi ý hằng ngày, động lực, nhìn lại phiên tập trung, chọn tâm trạng, và cơ chế dự phòng cục bộ hoặc lưu đệm khi AI trên máy chủ không khả dụng.",
    },
  },
  {
    id: "premium",
    label: { en: "Profile & Pro", vi: "Hồ sơ & Pro" },
    title: { en: "Settings and premium access in one place", vi: "Cài đặt và quyền truy cập cao cấp ở một nơi" },
    description: {
      en: "Manage the diver profile, XP, themes, language, reminders, motion, haptics, audio, and verified Pro entitlements.",
      vi: "Quản lý hồ sơ thợ lặn, XP, giao diện, ngôn ngữ, nhắc nhở, chuyển động, rung phản hồi, âm thanh và quyền lợi Pro đã xác minh.",
    },
  },
] as const;
```

- [ ] **Step 3: Update `HowItWorksSection.tsx`**

Replace the full contents of `src/components/sections/HowItWorksSection.tsx`:

```tsx
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { T } from "@/components/ui/T";
import { steps } from "@/content/landingContent";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section how-section">
      <div className="section-inner">
        <SectionHeading
          eyebrow={<T en="How it works" vi="Cách hoạt động" />}
          title={<T en="From intention to expedition report." vi="Từ ý định đến báo cáo thám hiểm." />}
          description={
            <T
              en="Deep Ocean keeps the interaction simple while giving each stage a clear emotional purpose."
              vi="Deep Ocean giữ cho thao tác đơn giản trong khi mang lại cho mỗi giai đoạn một mục đích cảm xúc rõ ràng."
            />
          }
          align="center"
        />
        <div className="steps-grid">
          {steps.map((step, index) => (
            <Reveal className="step-card" delay={index * 0.06} key={step.number}>
              <span className="step-number">{step.number}</span>
              <div className="step-line" aria-hidden />
              <h3><T en={step.title.en} vi={step.title.vi} /></h3>
              <p><T en={step.description.en} vi={step.description.vi} /></p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Update `ScreensPreviewSection.tsx`**

Replace the full contents of `src/components/sections/ScreensPreviewSection.tsx`:

```tsx
import { AppScreenshot } from "@/components/ui/AppScreenshot";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { T } from "@/components/ui/T";
import { screenPreviews } from "@/content/landingContent";

export function ScreensPreviewSection() {
  return (
    <section id="screens" className="section screens-section">
      <div className="section-inner">
        <SectionHeading
          eyebrow={<T en="Product preview" vi="Xem trước sản phẩm" />}
          title={<T en="The real app, without stand-ins." vi="Ứng dụng thật, không dàn dựng." />}
          description={
            <T
              en="Every image below is a current mobile-app capture. No generated phone UI and no reconstructed screenshots."
              vi="Mọi hình ảnh bên dưới đều là ảnh chụp thực tế từ ứng dụng di động hiện tại. Không có giao diện điện thoại dựng sẵn và không có ảnh chụp màn hình tái tạo."
            />
          }
        />
        <div className="screen-gallery">
          {screenPreviews.map((screen, index) => (
            <Reveal className="screen-preview-card" delay={index * 0.06} key={screen.id}>
              <div className="screen-copy">
                <span><T en={screen.label.en} vi={screen.label.vi} /></span>
                <h3><T en={screen.title.en} vi={screen.title.vi} /></h3>
                <p><T en={screen.description.en} vi={screen.description.vi} /></p>
              </div>
              <AppScreenshot
                screen={screen.id}
                compact
              />
            </Reveal>
          ))}
        </div>
        <p className="capture-note">
          <T
            en="Still needed: onboarding, surfaced rewards, session detail, the actual paywall, notifications, and real-device Live Activity captures. See the asset audit for the complete capture list."
            vi="Vẫn còn thiếu: giới thiệu ban đầu, phần thưởng khi trồi lên, chi tiết phiên, paywall thật, thông báo, và ảnh chụp Live Activity trên thiết bị thật. Xem bản kiểm kê tài nguyên để biết danh sách đầy đủ."
          />
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Verify**

Run: `npm run typecheck && npm run build`
Expected: both succeed.

Run:
```bash
npm run start -- -p 3411 & sleep 3
curl -s http://localhost:3411/ | grep -o 'Từ ý định đến báo cáo thám hiểm'
curl -s http://localhost:3411/ | grep -o 'Ứng dụng thật, không dàn dựng'
kill %1 2>/dev/null
```
Expected: both matches found.

- [ ] **Step 6: Commit**

```bash
git add src/content/landingContent.ts src/components/sections/HowItWorksSection.tsx src/components/sections/ScreensPreviewSection.tsx
git commit -m "feat: translate how-it-works and screens-preview sections to EN/VI"
```

---

### Task 7: Translate Premium + AI sections

**Files:**
- Modify: `src/content/landingContent.ts`
- Modify: `src/components/sections/PremiumSection.tsx`
- Modify: `src/components/sections/AISection.tsx`

**Interfaces:**
- Consumes: `T`, `SectionHeading`.
- Produces: `premiumBenefits: { icon; title: {en,vi}; description: {en,vi} }[]`, `intelligence: { icon; title: {en,vi}; description: {en,vi} }[]`.

- [ ] **Step 1: Convert `premiumBenefits` to bilingual fields**

In `src/content/landingContent.ts`, find the `premiumBenefits` array and replace its full contents with:

```ts
export const premiumBenefits = [
  {
    icon: Palette,
    title: { en: "Seven premium themes", vi: "Bảy giao diện cao cấp" },
    description: {
      en: "App-wide visual identities with distinct palettes, typography, particles, gradients, and ambient effects.",
      vi: "Bộ nhận diện hình ảnh toàn ứng dụng với bảng màu, kiểu chữ, hiệu ứng hạt, gradient và hiệu ứng không khí riêng biệt.",
    },
  },
  {
    icon: BrainCircuit,
    title: { en: "Deep AI insights", vi: "Phân tích sâu từ AI" },
    description: {
      en: "Unlock personal trend analysis, mood-correlated patterns, focus plans, and a guided breathing ritual.",
      vi: "Mở khóa phân tích xu hướng cá nhân, các mẫu hình liên quan đến tâm trạng, kế hoạch tập trung và một nghi thức hít thở có hướng dẫn.",
    },
  },
  {
    icon: BookOpen,
    title: { en: "Full field journals", vi: "Nhật ký thực địa đầy đủ" },
    description: {
      en: "Read the folklore, theories, and sealed expedition notes behind discovered creatures and artifacts.",
      vi: "Đọc truyền thuyết, giả thuyết và ghi chú thám hiểm được niêm phong đằng sau các sinh vật và cổ vật đã khám phá.",
    },
  },
  {
    icon: Gem,
    title: { en: "A more personal ocean", vi: "Một đại dương mang dấu ấn riêng" },
    description: {
      en: "Pro elevates the tab experience and lets the visual system feel deliberately yours while the core timer remains accessible.",
      vi: "Pro nâng tầm trải nghiệm các tab và giúp hệ thống hình ảnh mang đậm dấu ấn cá nhân, trong khi bộ đếm giờ cốt lõi vẫn luôn sẵn sàng.",
    },
  },
] as const;
```

- [ ] **Step 2: Convert `intelligence` to bilingual fields**

In the same file, find the `intelligence` array and replace its full contents with:

```ts
export const intelligence = [
  {
    icon: BrainCircuit,
    title: { en: "Context-aware companion", vi: "Người bạn đồng hành hiểu bối cảnh" },
    description: {
      en: "Guidance can use your level, streak, mood, unlocked zones, achievements, and recent sessions.",
      vi: "Hướng dẫn có thể dựa trên cấp độ, chuỗi ngày, tâm trạng, vùng đã mở khóa, thành tựu và các phiên gần đây của bạn.",
    },
  },
  {
    icon: Compass,
    title: { en: "Personal onboarding plan", vi: "Kế hoạch giới thiệu cá nhân hóa" },
    description: {
      en: "Your selected goals shape recommended items and a starting workflow before the first dive.",
      vi: "Các mục tiêu bạn chọn định hình những gợi ý và quy trình khởi đầu trước lượt lặn đầu tiên.",
    },
  },
  {
    icon: Sparkles,
    title: { en: "Graceful offline fallback", vi: "Cơ chế dự phòng ngoại tuyến mượt mà" },
    description: {
      en: "If a hosted AI provider is unavailable, a deterministic local guide still produces data-driven recommendations.",
      vi: "Nếu nhà cung cấp AI trên máy chủ không khả dụng, một hướng dẫn cục bộ xác định sẵn vẫn tạo ra gợi ý dựa trên dữ liệu.",
    },
  },
] as const;
```

- [ ] **Step 3: Update `PremiumSection.tsx`**

Replace the full contents of `src/components/sections/PremiumSection.tsx`:

```tsx
import { Check, Diamond } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { T } from "@/components/ui/T";
import { premiumBenefits, siteLinks } from "@/content/landingContent";

export function PremiumSection() {
  return (
    <section id="premium" className="section premium-section">
      <div className="premium-glow" aria-hidden />
      <div className="section-inner premium-grid">
        <Reveal className="premium-copy">
          <p className="eyebrow">Deep Ocean Pro</p>
          <h2><T en="More personal. More reflective. Never louder." vi="Cá nhân hơn. Sâu lắng hơn. Không bao giờ ồn ào hơn." /></h2>
          <p className="section-description">
            <T
              en="The core dive remains useful on its own. Pro adds richer visual identities, deeper guidance, and complete expedition lore."
              vi="Lượt lặn cốt lõi vẫn hữu ích khi dùng riêng. Pro bổ sung bộ nhận diện hình ảnh phong phú hơn, hướng dẫn sâu hơn và trọn vẹn truyền thuyết thám hiểm."
            />
          </p>
          <div className="premium-principle">
            <Diamond size={18} />
            <span><T en="Designed as depth, not pressure." vi="Được thiết kế như độ sâu, không phải áp lực." /></span>
          </div>
          <a className="button button-premium" href={siteLinks.primaryCta}>
            <T en="Follow launch status" vi="Theo dõi tình trạng ra mắt" />
          </a>
          <small className="placeholder-note">
            <T
              en="Production pricing and store availability are not published on this page until the live offerings are confirmed."
              vi="Giá chính thức và tình trạng có mặt trên cửa hàng chưa được công bố trên trang này cho đến khi các gói sản phẩm chính thức được xác nhận."
            />
          </small>
        </Reveal>

        <div className="premium-benefits">
          {premiumBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Reveal className="premium-benefit" delay={index * 0.05} key={benefit.title.en}>
                <span><Icon size={19} /></span>
                <div>
                  <h3><T en={benefit.title.en} vi={benefit.title.vi} /></h3>
                  <p><T en={benefit.description.en} vi={benefit.description.vi} /></p>
                </div>
                <Check size={16} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Update `AISection.tsx`**

Replace the full contents of `src/components/sections/AISection.tsx`:

```tsx
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { T } from "@/components/ui/T";
import { intelligence } from "@/content/landingContent";

export function AISection() {
  return (
    <section id="ai-companion" className="section ai-section">
      <div className="section-inner ai-grid">
        <Reveal className="ai-capture">
          <Image
            src="/screenshots/ai.png"
            alt="Real Deep Ocean Marine Guide screen"
            fill
            sizes="(max-width: 800px) 78vw, 420px"
          />
        </Reveal>

        <div>
          <SectionHeading
            eyebrow={<T en="AI & personalization" vi="AI & cá nhân hóa" />}
            title={<T en="A companion that listens to the dive log." vi="Một người bạn đồng hành lắng nghe nhật ký lặn." />}
            description={
              <T
                en="Recommendations can use selected goals and actual app context. Hosted providers are optional; cache and a deterministic local guide keep basic guidance available."
                vi="Gợi ý có thể dựa trên các mục tiêu đã chọn và bối cảnh sử dụng ứng dụng thực tế. Nhà cung cấp trên máy chủ là tùy chọn; bộ nhớ đệm và hướng dẫn cục bộ xác định sẵn giúp hướng dẫn cơ bản luôn khả dụng."
              />
            }
          />
          <div className="intelligence-list">
            {intelligence.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal className="intelligence-item" delay={index * 0.06} key={item.title.en}>
                  <span><Icon size={20} /></span>
                  <div><h3><T en={item.title.en} vi={item.title.vi} /></h3><p><T en={item.description.en} vi={item.description.vi} /></p></div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
```

(Note: this also fixes the pre-existing misplaced `import Image from "next/image";` — moved to the top of the file where it belongs, since this task rewrites the whole file anyway.)

- [ ] **Step 5: Verify**

Run: `npm run typecheck && npm run build`
Expected: both succeed.

Run:
```bash
npm run start -- -p 3411 & sleep 3
curl -s http://localhost:3411/ | grep -o 'Cá nhân hơn. Sâu lắng hơn'
curl -s http://localhost:3411/ | grep -o 'AI & cá nhân hóa'
kill %1 2>/dev/null
```
Expected: both matches found.

- [ ] **Step 6: Commit**

```bash
git add src/content/landingContent.ts src/components/sections/PremiumSection.tsx src/components/sections/AISection.tsx
git commit -m "feat: translate premium and AI sections to EN/VI"
```

---

### Task 8: Translate Stats section (`progressMetrics` + `progressFeatures`)

**Files:**
- Modify: `src/content/landingContent.ts`
- Modify: `src/components/sections/StatsSection.tsx`

**Interfaces:**
- Consumes: `T`, `SectionHeading`.
- Produces: `progressMetrics: { value: string; label: {en,vi}; icon }[]`, `progressFeatures: { icon; title: {en,vi}; body: {en,vi} }[]`.

- [ ] **Step 1: Convert `progressMetrics` to bilingual fields**

In `src/content/landingContent.ts`, find:

```ts
export const progressMetrics = [
  { value: "5", label: "ocean zones", icon: Layers3 },
  { value: "164", label: "catalog entries", icon: FishSymbol },
  { value: "500", label: "local session records", icon: Gauge },
  { value: "EN / VI", label: "app languages", icon: Waves },
] as const;
```

Replace with:

```ts
export const progressMetrics = [
  { value: "5", label: { en: "ocean zones", vi: "vùng đại dương" }, icon: Layers3 },
  { value: "164", label: { en: "catalog entries", vi: "mục trong danh mục" }, icon: FishSymbol },
  { value: "500", label: { en: "local session records", vi: "bản ghi phiên cục bộ" }, icon: Gauge },
  { value: "EN / VI", label: { en: "app languages", vi: "ngôn ngữ ứng dụng" }, icon: Waves },
] as const;
```

- [ ] **Step 2: Convert `progressFeatures` to bilingual fields**

In the same file, find the `progressFeatures` array and replace its full contents with:

```ts
export const progressFeatures = [
  {
    icon: History,
    title: { en: "Expedition history", vi: "Lịch sử thám hiểm" },
    body: {
      en: "Every surfaced session becomes a dated record with duration, maximum depth, discoveries, and XP.",
      vi: "Mỗi phiên đã trồi lên trở thành một bản ghi có ngày tháng với thời lượng, độ sâu tối đa, khám phá và XP.",
    },
  },
  {
    icon: ChartNoAxesCombined,
    title: { en: "Weekly focus shape", vi: "Nhịp độ tập trung theo tuần" },
    body: {
      en: "A seven-day heatmap makes consistency visible without turning the experience into a spreadsheet.",
      vi: "Bản đồ nhiệt bảy ngày giúp thấy rõ sự đều đặn mà không biến trải nghiệm thành một bảng tính.",
    },
  },
  {
    icon: Trophy,
    title: { en: "Long-term progression", vi: "Tiến trình dài hạn" },
    body: {
      en: "Levels, current and longest streaks, depth records, collection milestones, and title achievements reward return.",
      vi: "Cấp độ, chuỗi ngày hiện tại và dài nhất, kỷ lục độ sâu, cột mốc bộ sưu tập và danh hiệu thành tựu tưởng thưởng cho sự quay lại.",
    },
  },
] as const;
```

- [ ] **Step 3: Update `StatsSection.tsx`**

Replace the full contents of `src/components/sections/StatsSection.tsx`:

```tsx
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { T } from "@/components/ui/T";
import { progressFeatures, progressMetrics } from "@/content/landingContent";

export function StatsSection() {
  return (
    <section id="progress" className="section stats-section">
      <div className="section-inner">
        <SectionHeading
          eyebrow={<T en="Progress without pressure" vi="Tiến trình không áp lực" />}
          title={<T en="A history of attention you can actually feel." vi="Một lịch sử của sự tập trung mà bạn thật sự cảm nhận được." />}
          description={
            <T
              en="Deep Ocean turns sessions into a coherent personal record: where you went, how often you returned, and what your focus revealed."
              vi="Deep Ocean biến các phiên tập trung thành một hồ sơ cá nhân mạch lạc: bạn đã đi đến đâu, bạn quay lại bao thường xuyên, và sự tập trung của bạn hé lộ điều gì."
            />
          }
          align="center"
        />
        <div className="metric-grid">
          {progressMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Reveal className="metric-card" delay={index * 0.05} key={metric.label.en}>
                <Icon size={18} />
                <strong>{metric.value}</strong>
                <span><T en={metric.label.en} vi={metric.label.vi} /></span>
              </Reveal>
            );
          })}
        </div>
        <div className="progress-detail-grid">
          <Reveal className="analytics-capture">
            <Image
              src="/screenshots/stats.png"
              alt="Real Deep Ocean Dive Analytics screen"
              fill
              sizes="(max-width: 800px) 84vw, 440px"
            />
          </Reveal>
          <div className="progress-feature-list">
            {progressFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Reveal className="progress-feature" delay={index * 0.06} key={feature.title.en}>
                  <span><Icon size={20} /></span>
                  <div><h3><T en={feature.title.en} vi={feature.title.vi} /></h3><p><T en={feature.body.en} vi={feature.body.vi} /></p></div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npm run typecheck && npm run build`
Expected: both succeed.

Run:
```bash
npm run start -- -p 3411 & sleep 3
curl -s http://localhost:3411/ | grep -o 'Tiến trình không áp lực'
kill %1 2>/dev/null
```
Expected: match found.

- [ ] **Step 5: Commit**

```bash
git add src/content/landingContent.ts src/components/sections/StatsSection.tsx
git commit -m "feat: translate stats section to EN/VI"
```

---

### Task 9: Translate Privacy section (move content into `landingContent.ts`) + Widget section

**Files:**
- Modify: `src/content/landingContent.ts`
- Modify: `src/components/sections/PrivacySection.tsx`
- Modify: `src/components/sections/WidgetSection.tsx`

**Interfaces:**
- Consumes: `T`, `SectionHeading`.
- Produces: `privacyPoints: { icon; title: {en,vi}; body: {en,vi} }[]` (new export in `landingContent.ts`), `privacySectionCopy: { eyebrow; title; description }` (new export), `widgetHighlights: { en; vi }[]`.

- [ ] **Step 1: Add `privacySectionCopy` and `privacyPoints` to `landingContent.ts`**

In `src/content/landingContent.ts`, the icon imports at the top currently read:

```ts
import {
  BellRing,
  BookOpen,
  BrainCircuit,
  ChartNoAxesCombined,
  Compass,
  FishSymbol,
  Gauge,
  Gem,
  History,
  Layers3,
  MoonStar,
  Palette,
  Sparkles,
  TimerReset,
  Trophy,
  Waves,
} from "lucide-react";
```

Replace with (adds `CloudOff`, `Database`, `Radio`, `ShieldCheck`, `Smartphone`, alphabetized, needed for the content moved from `PrivacySection.tsx` and `WidgetSection.tsx` in this task):

```ts
import {
  BellRing,
  BookOpen,
  BrainCircuit,
  ChartNoAxesCombined,
  CloudOff,
  Compass,
  Database,
  FishSymbol,
  Gauge,
  Gem,
  History,
  Layers3,
  MoonStar,
  Palette,
  Sparkles,
  ShieldCheck,
  TimerReset,
  Trophy,
  Waves,
} from "lucide-react";
```

Then, at the end of the file, find:

```ts
export const auxiliaryIcons = { BellRing };
```

Replace it with (adding the two new exports before `auxiliaryIcons`, keeping `auxiliaryIcons` last):

```ts
export const privacySectionCopy = {
  eyebrow: { en: "Privacy & local-first", vi: "Quyền riêng tư & ưu tiên cục bộ" },
  title: {
    en: "Your focus history begins on your device.",
    vi: "Lịch sử tập trung của bạn bắt đầu ngay trên thiết bị.",
  },
  description: {
    en: "The current architecture keeps the core product record local while clearly separating the few features that may call configured services.",
    vi: "Kiến trúc hiện tại giữ hồ sơ sản phẩm cốt lõi ở cục bộ, đồng thời tách biệt rõ ràng số ít tính năng có thể gọi đến các dịch vụ đã cấu hình.",
  },
} as const;

export const privacyPoints = [
  {
    icon: Database,
    title: { en: "Core records stay on device", vi: "Hồ sơ cốt lõi luôn ở trên thiết bị" },
    body: {
      en: "Dive history, profile progress, collection, mood, settings, personalization, achievements, and cached guidance are persisted locally with MMKV.",
      vi: "Lịch sử lặn, tiến trình hồ sơ, bộ sưu tập, tâm trạng, cài đặt, cá nhân hóa, thành tựu và hướng dẫn được lưu đệm đều được lưu trữ cục bộ bằng MMKV.",
    },
  },
  {
    icon: CloudOff,
    title: { en: "Guidance degrades gracefully", vi: "Hướng dẫn suy giảm một cách mượt mà" },
    body: {
      en: "When a hosted AI provider is unavailable, Deep Ocean can use a cached response or context-derived offline guidance instead of breaking the core experience.",
      vi: "Khi nhà cung cấp AI trên máy chủ không khả dụng, Deep Ocean có thể dùng phản hồi đã lưu đệm hoặc hướng dẫn ngoại tuyến suy ra từ bối cảnh, thay vì làm gián đoạn trải nghiệm cốt lõi.",
    },
  },
  {
    icon: ShieldCheck,
    title: { en: "Clear network boundaries", vi: "Ranh giới mạng rõ ràng" },
    body: {
      en: "Optional AI providers, RevenueCat purchases, and app updates can use network services. Deep Ocean does not claim that every feature is fully offline.",
      vi: "Nhà cung cấp AI tùy chọn, giao dịch mua qua RevenueCat và cập nhật ứng dụng có thể sử dụng dịch vụ mạng. Deep Ocean không khẳng định mọi tính năng đều hoàn toàn ngoại tuyến.",
    },
  },
] as const;

export const auxiliaryIcons = { BellRing };
```

- [ ] **Step 2: Convert `widgetHighlights` to bilingual fields**

In the same file, find:

```ts
export const widgetHighlights = [
  "Start, pause, or resume a focus session",
  "Open the AI companion or daily progress",
  "See streak, focus targets, zone, depth, and discoveries",
  "Follow an active timed dive with iPhone Live Activities",
] as const;
```

Replace with:

```ts
export const widgetHighlights = [
  { en: "Start, pause, or resume a focus session", vi: "Bắt đầu, tạm dừng hoặc tiếp tục một phiên tập trung" },
  { en: "Open the AI companion or daily progress", vi: "Mở người bạn đồng hành AI hoặc tiến trình hằng ngày" },
  { en: "See streak, focus targets, zone, depth, and discoveries", vi: "Xem chuỗi ngày, mục tiêu tập trung, vùng, độ sâu và khám phá" },
  { en: "Follow an active timed dive with iPhone Live Activities", vi: "Theo dõi lượt lặn có giờ đang diễn ra bằng Live Activities trên iPhone" },
] as const;
```

- [ ] **Step 3: Rewrite `PrivacySection.tsx` to source content from `landingContent.ts`**

Replace the full contents of `src/components/sections/PrivacySection.tsx`:

```tsx
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { T } from "@/components/ui/T";
import { privacyPoints, privacySectionCopy } from "@/content/landingContent";

export function PrivacySection() {
  return (
    <section id="privacy" className="section privacy-section">
      <div className="section-inner privacy-grid">
        <SectionHeading
          eyebrow={<T en={privacySectionCopy.eyebrow.en} vi={privacySectionCopy.eyebrow.vi} />}
          title={<T en={privacySectionCopy.title.en} vi={privacySectionCopy.title.vi} />}
          description={<T en={privacySectionCopy.description.en} vi={privacySectionCopy.description.vi} />}
        />
        <div className="privacy-list">
          {privacyPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <Reveal
                className="privacy-card"
                delay={index * 0.05}
                key={point.title.en}
              >
                <span><Icon size={20} /></span>
                <div>
                  <h3><T en={point.title.en} vi={point.title.vi} /></h3>
                  <p><T en={point.body.en} vi={point.body.vi} /></p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Update `WidgetSection.tsx`**

Replace the full contents of `src/components/sections/WidgetSection.tsx`:

```tsx
import Image from "next/image";
import { BellRing, Radio, Smartphone } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { T } from "@/components/ui/T";
import { widgetHighlights } from "@/content/landingContent";

export function WidgetSection() {
  return (
    <section id="widgets" className="section widget-section">
      <div className="section-inner widget-grid">
        <div className="widget-copy">
          <p className="eyebrow"><T en="Widgets, Live Activities & notifications" vi="Widget, Live Activities & thông báo" /></p>
          <h2><T en="Your dive stays close, even when the app is not open." vi="Lượt lặn của bạn luôn ở gần, ngay cả khi ứng dụng không mở." /></h2>
          <p className="section-description">
            <T
              en="Native surfaces use the same session engine and a shared action contract, so a widget never becomes a second, conflicting timer."
              vi="Các giao diện gốc dùng chung engine phiên tập trung và một giao ước hành động chung, nên widget không bao giờ trở thành một bộ đếm giờ thứ hai gây xung đột."
            />
          </p>
          <div className="widget-feature-list">
            {widgetHighlights.map((highlight) => (
              <div key={highlight.en}><Radio size={15} /><span><T en={highlight.en} vi={highlight.vi} /></span></div>
            ))}
          </div>
          <div className="platform-pills">
            <span><Smartphone size={15} /> iOS WidgetKit & Live Activity</span>
            <span><BellRing size={15} /> <T en="Android active-dive notification" vi="Thông báo lượt lặn đang diễn ra trên Android" /></span>
          </div>
        </div>

        <Reveal className="widget-capture-grid">
          <figure className="widget-capture widget-concept-capture">
            <Image
              src="/screenshots/widget-portal.png"
              alt="Deep Ocean widget concept sheet showing Ocean Portal, Diving Instrument, and Living Ocean layouts"
              fill
              sizes="(max-width: 800px) 92vw, 620px"
            />
          </figure>
          <p className="widget-capture-note">
            <T
              en="Repository-sourced widget concept sheet. Real installed widget and Live Activity captures are still needed."
              vi="Bảng phác thảo widget lấy từ kho mã nguồn. Vẫn cần ảnh chụp widget đã cài đặt thật và Live Activity thật."
            />
          </p>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Verify**

Run: `npm run typecheck && npm run build`
Expected: both succeed.

Run:
```bash
npm run start -- -p 3411 & sleep 3
curl -s http://localhost:3411/ | grep -o 'Quyền riêng tư & ưu tiên cục bộ'
curl -s http://localhost:3411/ | grep -o 'Widget, Live Activities & thông báo'
kill %1 2>/dev/null
```
Expected: both matches found.

- [ ] **Step 6: Commit**

```bash
git add src/content/landingContent.ts src/components/sections/PrivacySection.tsx src/components/sections/WidgetSection.tsx
git commit -m "feat: translate privacy and widget sections to EN/VI"
```

---

### Task 10: Translate FAQ + Final CTA sections

**Files:**
- Modify: `src/content/landingContent.ts`
- Modify: `src/components/sections/FAQSection.tsx`
- Modify: `src/components/sections/FinalCTASection.tsx`

**Interfaces:**
- Consumes: `T`, `SectionHeading`.
- Produces: `faqs: { question: {en,vi}; answer: {en,vi} }[]`.

- [ ] **Step 1: Convert `faqs` to bilingual fields**

In `src/content/landingContent.ts`, find the `faqs` array and replace its full contents with:

```ts
export const faqs = [
  {
    question: { en: "What is a focus dive?", vi: "Lượt lặn tập trung là gì?" },
    answer: {
      en: "It is a focus session represented as an underwater descent. Time becomes depth, deeper durations reach new zones, and completed sessions can produce discoveries and progression.",
      vi: "Đó là một phiên tập trung được thể hiện dưới dạng một hành trình lặn xuống đại dương. Thời gian trở thành độ sâu, thời lượng càng dài càng chạm tới vùng mới, và các phiên hoàn thành có thể tạo ra khám phá và tiến trình.",
    },
  },
  {
    question: { en: "Do I have to use a fixed timer?", vi: "Tôi có bắt buộc dùng bộ đếm giờ cố định không?" },
    answer: {
      en: "No. Deep Ocean includes quick and custom timed sessions plus a free dive with no fixed end time.",
      vi: "Không. Deep Ocean có các phiên nhanh và tùy chỉnh theo giờ, cùng với chế độ lặn tự do không có thời điểm kết thúc cố định.",
    },
  },
  {
    question: { en: "What stays available without Pro?", vi: "Điều gì vẫn khả dụng khi không dùng Pro?" },
    answer: {
      en: "The core dive timer, XP, streaks, basic expedition history, collection loop, and standard guidance remain part of the core experience. Pro adds premium themes, deeper AI insights, and full field journals.",
      vi: "Bộ đếm giờ lặn cốt lõi, XP, chuỗi ngày, lịch sử thám hiểm cơ bản, vòng lặp bộ sưu tập và hướng dẫn tiêu chuẩn vẫn là một phần của trải nghiệm cốt lõi. Pro bổ sung giao diện cao cấp, phân tích AI chuyên sâu hơn và nhật ký thực địa đầy đủ.",
    },
  },
  {
    question: { en: "Does the AI companion require an internet connection?", vi: "Người bạn đồng hành AI có cần kết nối internet không?" },
    answer: {
      en: "Hosted AI features need a configured provider and connectivity, but the app includes cached and local fallback behavior so basic guidance does not disappear.",
      vi: "Các tính năng AI trên máy chủ cần một nhà cung cấp đã cấu hình và kết nối mạng, nhưng ứng dụng có cơ chế lưu đệm và dự phòng cục bộ để hướng dẫn cơ bản không biến mất.",
    },
  },
  {
    question: { en: "Can I keep track of a dive outside the app?", vi: "Tôi có thể theo dõi lượt lặn bên ngoài ứng dụng không?" },
    answer: {
      en: "The implementation includes home-screen widgets, timed-dive completion notifications, an Android active-dive notification, and iPhone Live Activity support. Final device and store QA is still required before release.",
      vi: "Phiên bản hiện tại có widget màn hình chính, thông báo hoàn thành lượt lặn có giờ, thông báo lượt lặn đang diễn ra trên Android, và hỗ trợ Live Activity trên iPhone. Vẫn cần kiểm thử thiết bị và cửa hàng ứng dụng lần cuối trước khi phát hành.",
    },
  },
  {
    question: { en: "Is Deep Ocean available now?", vi: "Deep Ocean đã có sẵn chưa?" },
    answer: {
      en: "Store availability links have not been provided for this landing page yet. The current calls to action are clearly marked as beta or store-link placeholders.",
      vi: "Liên kết cửa hàng ứng dụng chưa được cung cấp cho trang này. Các nút kêu gọi hành động hiện tại được đánh dấu rõ là bản beta hoặc chỗ giữ chỗ cho liên kết cửa hàng.",
    },
  },
] as const;
```

- [ ] **Step 2: Update `FAQSection.tsx`**

Replace the full contents of `src/components/sections/FAQSection.tsx`:

```tsx
import { faqs } from "@/content/landingContent";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { T } from "@/components/ui/T";

export function FAQSection() {
  return (
    <section id="faq" className="section faq-section">
      <div className="section-inner faq-grid">
        <SectionHeading
          eyebrow={<T en="FAQ" vi="Câu hỏi thường gặp" />}
          title={<T en="Before your first descent." vi="Trước lượt lặn đầu tiên của bạn." />}
          description={
            <T
              en="A concise guide to the current product behavior and launch status."
              vi="Một hướng dẫn ngắn gọn về hành vi sản phẩm hiện tại và tình trạng ra mắt."
            />
          }
        />
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details key={faq.question.en} open={index === 0}>
              <summary><T en={faq.question.en} vi={faq.question.vi} /><span>+</span></summary>
              <p><T en={faq.answer.en} vi={faq.answer.vi} /></p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Update `FinalCTASection.tsx`**

Replace the full contents of `src/components/sections/FinalCTASection.tsx`:

```tsx
import Image from "next/image";
import { Apple, Play } from "lucide-react";
import { T } from "@/components/ui/T";

export function FinalCTASection() {
  return (
    <section id="final-cta" className="final-cta-section">
      <Image src="/assets/ocean-portal-wide.png" alt="" fill sizes="100vw" />
      <div className="final-cta-overlay" />
      <div className="final-cta-content">
        <p className="eyebrow"><T en="The next dive starts at the surface" vi="Lượt lặn tiếp theo bắt đầu từ mặt nước" /></p>
        <h2><T en="Give your focus somewhere deeper to go." vi="Cho sự tập trung của bạn một nơi sâu hơn để đến." /></h2>
        <p>
          <T
            en="Deep Ocean is preparing for release. Store links will appear here when the production listings are confirmed."
            vi="Deep Ocean đang chuẩn bị ra mắt. Liên kết cửa hàng sẽ xuất hiện ở đây khi các gian hàng chính thức được xác nhận."
          />
        </p>
        <div id="store-links" className="store-buttons">
          <span aria-label="App Store availability coming soon">
            <Apple size={22} />
            <span><small><T en="Coming soon on" vi="Sắp ra mắt trên" /></small>App Store</span>
          </span>
          <span aria-label="Google Play availability coming soon">
            <Play size={20} />
            <span><small><T en="Coming soon on" vi="Sắp ra mắt trên" /></small>Google Play</span>
          </span>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npm run typecheck && npm run build`
Expected: both succeed.

Run:
```bash
npm run start -- -p 3411 & sleep 3
curl -s http://localhost:3411/ | grep -o 'Trước lượt lặn đầu tiên của bạn'
curl -s http://localhost:3411/ | grep -o 'Sắp ra mắt trên'
kill %1 2>/dev/null
```
Expected: both matches found.

- [ ] **Step 5: Commit**

```bash
git add src/content/landingContent.ts src/components/sections/FAQSection.tsx src/components/sections/FinalCTASection.tsx
git commit -m "feat: translate FAQ and final CTA sections to EN/VI"
```

---

### Task 11: Move Loved-by-travelers content into `landingContent.ts` and translate

**Files:**
- Modify: `src/content/landingContent.ts`
- Modify: `src/components/sections/LovedByTravelersSection.tsx`

**Interfaces:**
- Consumes: `T`.
- Produces: `travelersSectionCopy: { badge; title; body; proof: {en,vi}[] }` (new export).

- [ ] **Step 1: Add `travelersSectionCopy` to `landingContent.ts`**

In `src/content/landingContent.ts`, find:

```ts
export const auxiliaryIcons = { BellRing };
```

Replace with (appending the new export before it):

```ts
export const travelersSectionCopy = {
  badge: { en: "LOVED BY TRAVELERS", vi: "ĐƯỢC NGƯỜI DÙNG YÊU THÍCH" },
  title: { en: "Less chaos, more trips.", vi: "Ít hỗn loạn hơn, nhiều chuyến lặn hơn." },
  body: {
    en: "Deep Ocean gives each focus session a clear beginning and a calm destination—so there is less friction between deciding to focus and actually starting.",
    vi: "Deep Ocean mang đến cho mỗi phiên tập trung một điểm bắt đầu rõ ràng và một điểm đến bình yên — để giảm bớt trở ngại giữa việc quyết định tập trung và thật sự bắt đầu.",
  },
  proof: [
    { en: "Timed & free dives", vi: "Lặn có giờ & lặn tự do" },
    { en: "Five ocean zones", vi: "Năm vùng đại dương" },
    { en: "English & Vietnamese", vi: "Tiếng Anh & Tiếng Việt" },
  ],
} as const;

export const auxiliaryIcons = { BellRing };
```

(This task runs after Task 9, which already added `privacySectionCopy`/`privacyPoints` before `auxiliaryIcons` — insert `travelersSectionCopy` in the same place, immediately before the `auxiliaryIcons` line.)

- [ ] **Step 2: Rewrite `LovedByTravelersSection.tsx`**

Replace the full contents of `src/components/sections/LovedByTravelersSection.tsx`:

```tsx
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { FloatingAppPreview } from "@/components/ui/FloatingAppPreview";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { T } from "@/components/ui/T";
import { travelersSectionCopy } from "@/content/landingContent";

export function LovedByTravelersSection() {
  return (
    <section className="section travelers-section" aria-labelledby="travelers-title">
      <div className="section-inner travelers-grid">
        <AnimatedSection className="travelers-copy">
          <SectionBadge><T en={travelersSectionCopy.badge.en} vi={travelersSectionCopy.badge.vi} /></SectionBadge>
          <h2 id="travelers-title"><T en={travelersSectionCopy.title.en} vi={travelersSectionCopy.title.vi} /></h2>
          <p>
            <T en={travelersSectionCopy.body.en} vi={travelersSectionCopy.body.vi} />
          </p>
          <div className="travelers-proof" aria-label="Verified product capabilities">
            {travelersSectionCopy.proof.map((item) => (
              <span key={item.en}><T en={item.en} vi={item.vi} /></span>
            ))}
          </div>
        </AnimatedSection>
        <AnimatedSection className="travelers-preview" delay={0.12}>
          <FloatingAppPreview />
        </AnimatedSection>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npm run typecheck && npm run build`
Expected: both succeed.

Run:
```bash
npm run start -- -p 3411 & sleep 3
curl -s http://localhost:3411/ | grep -o 'Ít hỗn loạn hơn, nhiều chuyến lặn hơn'
kill %1 2>/dev/null
```
Expected: match found.

- [ ] **Step 4: Commit**

```bash
git add src/content/landingContent.ts src/components/sections/LovedByTravelersSection.tsx
git commit -m "feat: move travelers section copy into content file and translate to EN/VI"
```

---

### Task 12: Translate Footer (`footerGroups`)

**Files:**
- Modify: `src/content/landingContent.ts`
- Modify: `src/components/sections/Footer.tsx`

**Interfaces:**
- Consumes: `T`, `LangToggle` (Task 1).
- Produces: `footerGroups: { title: {en,vi}; links: { label: {en,vi}; href: string }[] }[]`.

- [ ] **Step 1: Convert `footerGroups` to bilingual fields**

In `src/content/landingContent.ts`, find:

```ts
export const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Experience", href: "#screens" },
      { label: "Deep Ocean Pro", href: "#premium" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Privacy Policy", href: siteLinks.privacy },
      { label: "Terms of Service", href: siteLinks.terms },
      { label: "Support", href: siteLinks.support },
      { label: "Email support", href: siteLinks.contact },
    ],
  },
] as const;
```

Replace with:

```ts
export const footerGroups = [
  {
    title: { en: "Product", vi: "Sản phẩm" },
    links: [
      { label: { en: "Features", vi: "Tính năng" }, href: "#features" },
      { label: { en: "Experience", vi: "Trải nghiệm" }, href: "#screens" },
      { label: { en: "Deep Ocean Pro", vi: "Deep Ocean Pro" }, href: "#premium" },
    ],
  },
  {
    title: { en: "Company", vi: "Công ty" },
    links: [
      { label: { en: "Privacy Policy", vi: "Chính sách quyền riêng tư" }, href: siteLinks.privacy },
      { label: { en: "Terms of Service", vi: "Điều khoản dịch vụ" }, href: siteLinks.terms },
      { label: { en: "Support", vi: "Hỗ trợ" }, href: siteLinks.support },
      { label: { en: "Email support", vi: "Email hỗ trợ" }, href: siteLinks.contact },
    ],
  },
] as const;
```

- [ ] **Step 2: Update `Footer.tsx`**

Replace the full contents of `src/components/sections/Footer.tsx`:

```tsx
import Image from "next/image";
import { footerGroups, siteLinks } from "@/content/landingContent";
import { T } from "@/components/ui/T";
import { LangToggle } from "@/components/ui/LangToggle";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <a href="#hero">
            <Image src="/assets/app-icon.png" alt="" width={42} height={42} />
            <span>Deep Ocean</span>
          </a>
          <p><T en="Focus dives for calmer, more visible progress." vi="Những lượt lặn tập trung cho tiến trình bình yên và rõ ràng hơn." /></p>
        </div>
        {footerGroups.map((group) => (
          <div className="footer-group" key={group.title.en}>
            <strong><T en={group.title.en} vi={group.title.vi} /></strong>
            {group.links.map((link) => (
              <a href={link.href} key={link.label.en}><T en={link.label.en} vi={link.label.vi} /></a>
            ))}
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Deep Ocean</span>
        <a id="contact-placeholder" href={siteLinks.support}><T en="Support and contact" vi="Hỗ trợ và liên hệ" /></a>
        <LangToggle />
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npm run typecheck && npm run build`
Expected: both succeed.

Run:
```bash
npm run start -- -p 3411 & sleep 3
curl -s http://localhost:3411/ | grep -o 'Chính sách quyền riêng tư'
curl -s http://localhost:3411/ | grep -o 'Hỗ trợ và liên hệ'
kill %1 2>/dev/null
```
Expected: both matches found.

- [ ] **Step 4: Commit**

```bash
git add src/content/landingContent.ts src/components/sections/Footer.tsx
git commit -m "feat: translate footer to EN/VI"
```

---

### Task 13: Convert `/privacy` and `/terms` pages from dual-stack display to the toggle

**Files:**
- Modify: `src/app/privacy/page.tsx`
- Modify: `src/app/terms/page.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: `T`, `LangToggle` (Task 1), `privacyPage`/`termsPage` from `src/content/legalContent.ts` (unchanged structure — already `{en, vi}`).

`legalContent.ts` is **not modified** in this task — only how the two pages render it changes.

- [ ] **Step 1: Add shared header-actions CSS**

In `src/app/globals.css`, find:

```css
.support-home-link {
  min-height: 42px;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-small);
  padding: 0 0.9rem;
  color: var(--color-text-secondary);
  font-family: var(--font-mono), monospace;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
```

Add this new rule immediately after it:

```css

.support-nav-actions {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}
```

Then find the legal-pages block and replace the paragraph-color rules. Find:

```css
.legal-hero-vi {
  margin: 0 0 1.2rem;
  color: var(--color-text-muted);
  font-family: var(--font-display), "Space Grotesk", sans-serif;
  font-size: clamp(1.3rem, 3vw, 2.2rem);
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.025em;
}
```

Delete this entire `.legal-hero-vi` rule (the stacked-VI-title style is no longer used once both pages render through the toggle).

Then find:

```css
.legal-section-heading-vi {
  margin: 0;
  color: var(--color-text-muted);
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  font-weight: 500;
}

.legal-en p,
.legal-vi p {
  margin-bottom: 0.85rem;
  font-size: clamp(0.9rem, 1.3vw, 1rem);
  line-height: 1.8;
}

.legal-en p:last-child,
.legal-vi p:last-child {
  margin-bottom: 0;
}

.legal-en p {
  color: var(--color-text-secondary);
}

.legal-vi p {
  color: var(--color-text-muted);
}

.legal-divider {
  width: 100%;
  height: 1px;
  margin: 1.2rem 0;
  background: var(--color-line);
}
```

Replace this entire block with:

```css
.legal-section p {
  margin-bottom: 0.85rem;
  color: var(--color-text-secondary);
  font-size: clamp(0.9rem, 1.3vw, 1rem);
  line-height: 1.8;
}

.legal-section p:last-child {
  margin-bottom: 0;
}
```

- [ ] **Step 2: Rewrite `src/app/privacy/page.tsx`**

Replace the full contents:

```tsx
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Home } from "lucide-react"
import { privacyPage } from "@/content/legalContent"
import { landingCssVariables } from "@/lib/landingTheme"
import { T } from "@/components/ui/T"
import { LangToggle } from "@/components/ui/LangToggle"

export const metadata: Metadata = {
  title: "Privacy Policy — Deep Ocean",
  description:
    "Deep Ocean is a local-first focus app. This Privacy Policy explains what data may be involved, how it is stored on your device, and your rights.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy — Deep Ocean",
    description:
      "Deep Ocean is a local-first focus app. Read the Privacy Policy for details on data storage, third-party services, and your rights.",
    url: "/privacy",
    siteName: "Deep Ocean",
    type: "website",
    images: [
      {
        url: "/assets/ocean-portal-wide.png",
        width: 1000,
        height: 500,
        alt: "Deep Ocean focus app underwater portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — Deep Ocean",
    description:
      "Deep Ocean keeps your focus data on your device. Read the full Privacy Policy.",
    images: ["/assets/ocean-portal-wide.png"],
  },
}

export default function PrivacyPage() {
  return (
    <main className="legal-shell" style={landingCssVariables}>
      <div className="ambient-field" aria-hidden>
        <i /><i /><i /><i /><i /><i />
      </div>

      <header className="support-nav">
        <Link className="support-brand" href="/" aria-label="Deep Ocean home">
          <Image src="/assets/app-icon.png" alt="" width={36} height={36} />
          <span>Deep Ocean</span>
        </Link>
        <div className="support-nav-actions">
          <LangToggle />
          <Link className="support-home-link" href="/">
            <Home size={16} />
            <T en="Home" vi="Trang chủ" />
          </Link>
        </div>
      </header>

      <section className="legal-hero">
        <p className="eyebrow"><T en={privacyPage.eyebrow.en} vi={privacyPage.eyebrow.vi} /></p>
        <h1><T en={privacyPage.title.en} vi={privacyPage.title.vi} /></h1>
        <p className="legal-updated"><T en="Last updated:" vi="Cập nhật lần cuối:" /> {privacyPage.updatedAt}</p>
      </section>

      <div className="legal-body-wrapper">
        <nav className="legal-toc" aria-label="Table of contents">
          {privacyPage.sections.map((section, i) => (
            <a key={section.id} href={`#${section.id}`}>
              <span className="legal-toc-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <T en={section.heading.en} vi={section.heading.vi} />
            </a>
          ))}
        </nav>

        <div className="legal-content">
          {privacyPage.sections.map((section) => (
            <section id={section.id} key={section.id} className="legal-section">
              <div className="legal-section-heading">
                <h2><T en={section.heading.en} vi={section.heading.vi} /></h2>
              </div>
              {section.body.en.map((paragraph, i) => (
                <p key={i}><T en={paragraph} vi={section.body.vi[i]} /></p>
              ))}
            </section>
          ))}
        </div>
      </div>

      <footer className="legal-footer">
        <p>© {new Date().getFullYear()} Deep Ocean</p>
        <nav className="legal-footer-links" aria-label="Legal page links">
          <Link href="/"><T en="Home" vi="Trang chủ" /></Link>
          <Link href="/terms"><T en="Terms of Service" vi="Điều khoản dịch vụ" /></Link>
          <Link href="/support"><T en="Support" vi="Hỗ trợ" /></Link>
        </nav>
      </footer>
    </main>
  )
}
```

- [ ] **Step 3: Rewrite `src/app/terms/page.tsx`**

Replace the full contents:

```tsx
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Home } from "lucide-react"
import { termsPage } from "@/content/legalContent"
import { landingCssVariables } from "@/lib/landingTheme"
import { T } from "@/components/ui/T"
import { LangToggle } from "@/components/ui/LangToggle"

export const metadata: Metadata = {
  title: "Terms of Service — Deep Ocean",
  description:
    "Terms of Service for Deep Ocean, covering acceptable use, Deep Ocean Pro subscriptions, intellectual property, disclaimers, and contact.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service — Deep Ocean",
    description:
      "Read the Terms of Service for Deep Ocean, including subscription terms, acceptable use, and limitation of liability.",
    url: "/terms",
    siteName: "Deep Ocean",
    type: "website",
    images: [
      {
        url: "/assets/ocean-portal-wide.png",
        width: 1000,
        height: 500,
        alt: "Deep Ocean focus app underwater portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service — Deep Ocean",
    description:
      "Deep Ocean Terms of Service — subscriptions, acceptable use, and your rights.",
    images: ["/assets/ocean-portal-wide.png"],
  },
}

export default function TermsPage() {
  return (
    <main className="legal-shell" style={landingCssVariables}>
      <div className="ambient-field" aria-hidden>
        <i /><i /><i /><i /><i /><i />
      </div>

      <header className="support-nav">
        <Link className="support-brand" href="/" aria-label="Deep Ocean home">
          <Image src="/assets/app-icon.png" alt="" width={36} height={36} />
          <span>Deep Ocean</span>
        </Link>
        <div className="support-nav-actions">
          <LangToggle />
          <Link className="support-home-link" href="/">
            <Home size={16} />
            <T en="Home" vi="Trang chủ" />
          </Link>
        </div>
      </header>

      <section className="legal-hero">
        <p className="eyebrow"><T en={termsPage.eyebrow.en} vi={termsPage.eyebrow.vi} /></p>
        <h1><T en={termsPage.title.en} vi={termsPage.title.vi} /></h1>
        <p className="legal-updated"><T en="Last updated:" vi="Cập nhật lần cuối:" /> {termsPage.updatedAt}</p>
      </section>

      <div className="legal-body-wrapper">
        <nav className="legal-toc" aria-label="Table of contents">
          {termsPage.sections.map((section, i) => (
            <a key={section.id} href={`#${section.id}`}>
              <span className="legal-toc-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <T en={section.heading.en} vi={section.heading.vi} />
            </a>
          ))}
        </nav>

        <div className="legal-content">
          {termsPage.sections.map((section) => (
            <section id={section.id} key={section.id} className="legal-section">
              <div className="legal-section-heading">
                <h2><T en={section.heading.en} vi={section.heading.vi} /></h2>
              </div>
              {section.body.en.map((paragraph, i) => (
                <p key={i}><T en={paragraph} vi={section.body.vi[i]} /></p>
              ))}
            </section>
          ))}
        </div>
      </div>

      <footer className="legal-footer">
        <p>© {new Date().getFullYear()} Deep Ocean</p>
        <nav className="legal-footer-links" aria-label="Legal page links">
          <Link href="/"><T en="Home" vi="Trang chủ" /></Link>
          <Link href="/privacy"><T en="Privacy Policy" vi="Chính sách quyền riêng tư" /></Link>
          <Link href="/support"><T en="Support" vi="Hỗ trợ" /></Link>
        </nav>
      </footer>
    </main>
  )
}
```

- [ ] **Step 4: Verify**

Run: `npm run typecheck && npm run build`
Expected: both succeed.

Run:
```bash
npm run start -- -p 3411 & sleep 3
curl -s http://localhost:3411/privacy | grep -o 'Chính sách quyền riêng tư'
curl -s http://localhost:3411/privacy | grep -o 'class="lang-toggle"'
curl -s http://localhost:3411/terms | grep -o 'Điều khoản dịch vụ'
curl -s http://localhost:3411/terms | grep -o 'class="lang-toggle"'
kill %1 2>/dev/null
```
Expected: all four matches found — confirms Vietnamese content is present and the toggle button renders on both pages.

- [ ] **Step 5: Commit**

```bash
git add src/app/privacy/page.tsx src/app/terms/page.tsx src/app/globals.css
git commit -m "feat: switch /privacy and /terms to the language toggle"
```

---

### Task 14: Extract `/support` content and add the toggle

**Files:**
- Create: `src/content/supportContent.ts`
- Modify: `src/app/support/page.tsx`

**Interfaces:**
- Produces: `supportContent.ts` exports `heroCopy`, `supportTopics`, `checklistItems`, `quickAnswers`, `finalCopy` — all `{en, vi}` shaped, consumed only by `src/app/support/page.tsx`.

- [ ] **Step 1: Create `src/content/supportContent.ts`**

```ts
import {
  CreditCard,
  ShieldCheck,
  Smartphone,
  TimerReset,
} from "lucide-react";

export const supportEmail = "support@deepocean.io.vn";

export const heroCopy = {
  eyebrow: { en: "Support", vi: "Hỗ trợ" },
  title: { en: "Deep Ocean Support", vi: "Hỗ Trợ Deep Ocean" },
  body: {
    en: "Need help with a focus dive, widget, Live Activity, Pro access, or privacy request? Contact the Deep Ocean team and include enough device details to reproduce the issue.",
    vi: "Cần hỗ trợ về lượt lặn tập trung, widget, Live Activity, quyền truy cập Pro, hay yêu cầu về quyền riêng tư? Hãy liên hệ đội ngũ Deep Ocean và cung cấp đủ thông tin thiết bị để chúng tôi có thể tái hiện vấn đề.",
  },
  emailButton: { en: "Email support", vi: "Gửi email hỗ trợ" },
  contactButton: { en: "Contact team", vi: "Liên hệ đội ngũ" },
  emailNotePrefix: { en: "Support email: ", vi: "Email hỗ trợ: " },
  cardLabel: { en: "For Apple review", vi: "Dành cho Apple xét duyệt" },
  cardNote: {
    en: "Public support URL for App Store Connect submissions.",
    vi: "Đường dẫn hỗ trợ công khai dùng cho hồ sơ nộp trên App Store Connect.",
  },
} as const;

export const topicsHeading = {
  eyebrow: { en: "How we can help", vi: "Chúng tôi có thể giúp gì" },
  title: { en: "Support topics", vi: "Chủ đề hỗ trợ" },
} as const;

export const supportTopics = [
  {
    icon: TimerReset,
    title: { en: "Focus dives and session history", vi: "Lượt lặn tập trung và lịch sử phiên" },
    body: {
      en: "Get help with timed dives, free dives, saved expedition records, XP, streaks, and progress visibility.",
      vi: "Nhận hỗ trợ về lượt lặn có giờ, lặn tự do, bản ghi thám hiểm đã lưu, XP, chuỗi ngày và hiển thị tiến trình.",
    },
  },
  {
    icon: Smartphone,
    title: { en: "Widgets and Live Activities", vi: "Widget và Live Activities" },
    body: {
      en: "Report issues with home-screen widgets, active dive status, notifications, or iPhone Live Activities.",
      vi: "Báo cáo sự cố với widget màn hình chính, trạng thái lượt lặn đang diễn ra, thông báo, hoặc Live Activities trên iPhone.",
    },
  },
  {
    icon: CreditCard,
    title: { en: "Deep Ocean Pro", vi: "Deep Ocean Pro" },
    body: {
      en: "Ask about premium themes, subscription access, purchase restore behavior, or App Store billing questions.",
      vi: "Hỏi về giao diện cao cấp, quyền truy cập gói đăng ký, khôi phục giao dịch mua, hoặc các câu hỏi về thanh toán trên App Store.",
    },
  },
  {
    icon: ShieldCheck,
    title: { en: "Privacy and data", vi: "Quyền riêng tư và dữ liệu" },
    body: {
      en: "Request help with local app data, account-related questions, privacy concerns, or data deletion guidance.",
      vi: "Yêu cầu hỗ trợ về dữ liệu cục bộ của ứng dụng, câu hỏi liên quan đến tài khoản, mối lo về quyền riêng tư, hoặc hướng dẫn xóa dữ liệu.",
    },
  },
] as const;

export const beforeEmailingHeading = {
  eyebrow: { en: "Before emailing", vi: "Trước khi gửi email" },
  title: { en: "Include these details", vi: "Bao gồm các thông tin sau" },
} as const;

export const checklistItems = [
  { en: "Device model and iOS version", vi: "Model thiết bị và phiên bản iOS" },
  { en: "Deep Ocean app version", vi: "Phiên bản ứng dụng Deep Ocean" },
  { en: "What you expected to happen", vi: "Điều bạn mong đợi sẽ xảy ra" },
  { en: "What happened instead", vi: "Điều thực tế đã xảy ra" },
  { en: "Screenshots or screen recording if available", vi: "Ảnh chụp màn hình hoặc video quay màn hình nếu có" },
] as const;

export const quickAnswersHeading = {
  eyebrow: { en: "Quick answers", vi: "Giải đáp nhanh" },
} as const;

export const quickAnswers = [
  {
    question: { en: "How fast will support reply?", vi: "Hỗ trợ sẽ phản hồi nhanh như thế nào?" },
    answer: {
      en: "Most support messages are reviewed within 2 business days. Include your device model, iOS version, app version, and screenshots when possible.",
      vi: "Hầu hết các yêu cầu hỗ trợ được xem xét trong vòng 2 ngày làm việc. Vui lòng kèm theo model thiết bị, phiên bản iOS, phiên bản ứng dụng và ảnh chụp màn hình nếu có thể.",
    },
  },
  {
    question: { en: "How do I restore a purchase?", vi: "Làm sao để khôi phục giao dịch mua?" },
    answer: {
      en: "Open Deep Ocean, go to Profile or Pro settings, then use Restore Purchases. If access is still missing, email support with the Apple ID purchase region and receipt details from Apple.",
      vi: "Mở Deep Ocean, vào Hồ sơ hoặc cài đặt Pro, rồi dùng chức năng Khôi phục giao dịch mua. Nếu vẫn chưa có quyền truy cập, hãy gửi email cho bộ phận hỗ trợ kèm khu vực mua hàng của Apple ID và chi tiết biên nhận từ Apple.",
    },
  },
  {
    question: { en: "Can I request data deletion?", vi: "Tôi có thể yêu cầu xóa dữ liệu không?" },
    answer: {
      en: "Yes. Email support with the subject Data deletion request. Deep Ocean is designed around local-first focus data, and support will guide you through any app-side deletion steps.",
      vi: "Có. Hãy gửi email cho bộ phận hỗ trợ với tiêu đề Data deletion request. Deep Ocean được thiết kế xoay quanh dữ liệu tập trung ưu tiên cục bộ, và bộ phận hỗ trợ sẽ hướng dẫn bạn các bước xóa dữ liệu trong ứng dụng nếu cần.",
    },
  },
] as const;

export const finalCopy = {
  title: { en: "Still need help?", vi: "Vẫn cần hỗ trợ thêm?" },
  body: {
    en: "Send a support request and the team will review it. For App Store refunds or billing changes, Apple may require handling the request through your Apple account purchase history.",
    vi: "Gửi một yêu cầu hỗ trợ và đội ngũ sẽ xem xét. Đối với hoàn tiền hoặc thay đổi thanh toán trên App Store, Apple có thể yêu cầu xử lý qua lịch sử mua hàng trong tài khoản Apple của bạn.",
  },
  button: { en: "Email Deep Ocean", vi: "Gửi email cho Deep Ocean" },
} as const;
```

- [ ] **Step 2: Rewrite `src/app/support/page.tsx`**

Replace the full contents:

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Home,
  Mail,
  MessageCircle,
  RefreshCw,
} from "lucide-react";
import { siteLinks } from "@/content/landingContent";
import {
  beforeEmailingHeading,
  checklistItems,
  finalCopy,
  heroCopy,
  quickAnswers,
  quickAnswersHeading,
  supportEmail,
  supportTopics,
  topicsHeading,
} from "@/content/supportContent";
import { landingCssVariables } from "@/lib/landingTheme";
import { LangToggle } from "@/components/ui/LangToggle";
import { T } from "@/components/ui/T";

export const metadata: Metadata = {
  title: "Deep Ocean Support",
  description:
    "Get help with Deep Ocean focus dives, widgets, Live Activities, Deep Ocean Pro, privacy, and App Store support requests.",
  alternates: {
    canonical: "/support",
  },
  openGraph: {
    title: "Deep Ocean Support",
    description:
      "Support and contact page for Deep Ocean on iOS, including focus sessions, widgets, premium access, and privacy help.",
    url: "/support",
    siteName: "Deep Ocean",
    type: "website",
    images: [
      {
        url: "/assets/ocean-portal-wide.png",
        width: 1000,
        height: 500,
        alt: "Deep Ocean support page underwater portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deep Ocean Support",
    description:
      "Contact Deep Ocean support for app help, purchase restore questions, widgets, and privacy requests.",
    images: ["/assets/ocean-portal-wide.png"],
  },
};

export default function SupportPage() {
  return (
    <main className="support-shell" style={landingCssVariables}>
      <div className="ambient-field" aria-hidden>
        <i /><i /><i /><i /><i /><i />
      </div>

      <header className="support-nav">
        <Link className="support-brand" href="/" aria-label="Deep Ocean home">
          <Image src="/assets/app-icon.png" alt="" width={36} height={36} />
          <span>Deep Ocean</span>
        </Link>
        <div className="support-nav-actions">
          <LangToggle />
          <Link className="support-home-link" href="/">
            <Home size={16} />
            <T en="Home" vi="Trang chủ" />
          </Link>
        </div>
      </header>

      <section className="support-hero">
        <div className="support-hero-copy">
          <p className="eyebrow"><T en={heroCopy.eyebrow.en} vi={heroCopy.eyebrow.vi} /></p>
          <h1><T en={heroCopy.title.en} vi={heroCopy.title.vi} /></h1>
          <p>
            <T en={heroCopy.body.en} vi={heroCopy.body.vi} />
          </p>
          <div className="support-actions">
            <a className="button button-primary" href={`mailto:${supportEmail}`}>
              <Mail size={18} />
              <T en={heroCopy.emailButton.en} vi={heroCopy.emailButton.vi} />
            </a>
            <a className="button button-secondary" href={siteLinks.contact}>
              <MessageCircle size={18} />
              <T en={heroCopy.contactButton.en} vi={heroCopy.contactButton.vi} />
            </a>
          </div>
          <p className="support-email-note">
            <T en={heroCopy.emailNotePrefix.en} vi={heroCopy.emailNotePrefix.vi} /><a href={`mailto:${supportEmail}`}>{supportEmail}</a>
          </p>
        </div>

        <div className="support-hero-card" aria-label="Support details">
          <Image
            src="/assets/ocean-portal-square.png"
            alt="Deep Ocean underwater portal artwork"
            width={900}
            height={900}
            priority
          />
          <div>
            <span><T en={heroCopy.cardLabel.en} vi={heroCopy.cardLabel.vi} /></span>
            <strong>https://deepocean.io.vn/support</strong>
            <p><T en={heroCopy.cardNote.en} vi={heroCopy.cardNote.vi} /></p>
          </div>
        </div>
      </section>

      <section className="support-section">
        <div className="support-section-heading">
          <p className="eyebrow"><T en={topicsHeading.eyebrow.en} vi={topicsHeading.eyebrow.vi} /></p>
          <h2><T en={topicsHeading.title.en} vi={topicsHeading.title.vi} /></h2>
        </div>
        <div className="support-topic-grid">
          {supportTopics.map((topic) => {
            const Icon = topic.icon;
            return (
              <article className="support-topic-card" key={topic.title.en}>
                <span>
                  <Icon size={20} />
                </span>
                <h3><T en={topic.title.en} vi={topic.title.vi} /></h3>
                <p><T en={topic.body.en} vi={topic.body.vi} /></p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="support-section support-two-column">
        <div className="support-panel">
          <p className="eyebrow"><T en={beforeEmailingHeading.eyebrow.en} vi={beforeEmailingHeading.eyebrow.vi} /></p>
          <h2><T en={beforeEmailingHeading.title.en} vi={beforeEmailingHeading.title.vi} /></h2>
          <ul className="support-checklist">
            {checklistItems.map((item) => (
              <li key={item.en}><T en={item.en} vi={item.vi} /></li>
            ))}
          </ul>
        </div>

        <div className="support-panel">
          <p className="eyebrow"><T en={quickAnswersHeading.eyebrow.en} vi={quickAnswersHeading.eyebrow.vi} /></p>
          <div className="support-faq-list">
            {quickAnswers.map((item) => (
              <article key={item.question.en}>
                <h3><T en={item.question.en} vi={item.question.vi} /></h3>
                <p><T en={item.answer.en} vi={item.answer.vi} /></p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="support-final">
        <div>
          <RefreshCw size={22} />
          <h2><T en={finalCopy.title.en} vi={finalCopy.title.vi} /></h2>
          <p>
            <T en={finalCopy.body.en} vi={finalCopy.body.vi} />
          </p>
        </div>
        <a className="button button-primary" href={`mailto:${supportEmail}`}>
          <T en={finalCopy.button.en} vi={finalCopy.button.vi} />
          <ArrowUpRight size={18} />
        </a>
      </section>
    </main>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npm run typecheck && npm run build`
Expected: both succeed.

Run:
```bash
npm run start -- -p 3411 & sleep 3
curl -s http://localhost:3411/support | grep -o 'Hỗ Trợ Deep Ocean'
curl -s http://localhost:3411/support | grep -o 'class="lang-toggle"'
kill %1 2>/dev/null
```
Expected: both matches found.

- [ ] **Step 4: Commit**

```bash
git add src/content/supportContent.ts src/app/support/page.tsx
git commit -m "feat: extract /support content and add the language toggle"
```

---

### Task 15: Full-site verification pass

**Files:** none (verification only, no code changes expected).

- [ ] **Step 1: Typecheck and build the whole project**

Run: `npm run typecheck && npm run build`
Expected: both succeed, all 7 routes listed (`/`, `/_not-found`, `/privacy`, `/robots.txt`, `/sitemap.xml`, `/support`, `/terms`).

- [ ] **Step 2: Confirm every page has the toggle and Vietnamese content in SSR output**

```bash
npm run start -- -p 3411 & sleep 3
for path in "/" "/privacy" "/terms" "/support"; do
  echo "== $path =="
  curl -s "http://localhost:3411$path" -o "/tmp/deepocean-$$-page.html"
  echo -n "toggle present: "; grep -qo 'class="lang-toggle"' "/tmp/deepocean-$$-page.html" && echo yes || echo NO
  echo -n "has i18n-vi nodes: "; grep -qo 'class="i18n-vi"' "/tmp/deepocean-$$-page.html" && echo yes || echo NO
  echo -n "default data-locale=en: "; grep -qo 'data-locale="en"' "/tmp/deepocean-$$-page.html" && echo yes || echo NO
  rm -f "/tmp/deepocean-$$-page.html"
done
kill %1 2>/dev/null
```
Expected: `yes` on all three checks for all four paths.

- [ ] **Step 3: Confirm no leftover plain (untranslated) content array**

```bash
grep -n ": \"" src/content/landingContent.ts | grep -v "id:\|href:\|number:\|value:\|src:\|alt:\|position:" || echo "no plain string fields found"
```
Expected: `no plain string fields found`, or only lines for fields explicitly out of scope (`icon:` values are identifiers, not strings, so won't match `: "` anyway). If any translatable field is still a plain string, go back and fix it before proceeding.

- [ ] **Step 4: Manual browser check (requires a real browser — cannot be scripted with curl)**

Start the dev server (`npm run dev`) and open `http://localhost:3000` in a browser. Verify:
1. Click the EN/VI toggle in the navbar — all visible text on the page switches language immediately, with no leftover English text when VI is active (or vice versa).
2. Reload the page after selecting VI — the page loads directly in VI, with no flash of English first.
3. Open DevTools → Application → Local Storage, confirm `deepocean-locale` is set to the last-clicked value.
4. In DevTools → Sensors (or by changing the OS/browser language), simulate a browser with no `deepocean-locale` in storage (clear it) and Vietnamese as the preferred language — reload — the page should load in VI by default.
5. Repeat steps 1–2 on `/privacy`, `/terms`, and `/support`.
6. Resize to a mobile width, open the hamburger menu, confirm the toggle is present and functional there too.
7. Confirm `Deep Ocean Pro`, `Pro`, `XP`, `App Store`, `Google Play`, and ocean zone names are unchanged in both languages (per the "do not translate brand terms" constraint).

If any issue is found, note which task's file it traces back to and fix it there, then re-run this task's automated checks.

- [ ] **Step 5: Report results**

No commit for this task (verification only). If all checks pass, the feature is complete.

---

## Self-Review Notes

- **Spec coverage:** every section of `docs/superpowers/specs/2026-07-01-language-toggle-design.md` maps to a task — Architecture/Locale Detection/Rendering Primitive/Toggle Button → Task 1; Content Model Changes → Tasks 2, 4–12, 14; File Scope's page updates → Tasks 13–14; Testing Plan → Task 15.
- **Placeholder scan:** no TBD/TODO; every step has complete, copy-pasteable code including full Vietnamese translations (no "translate this" instructions left unresolved).
- **Type consistency:** `T({ en, vi })` signature is identical everywhere it's used across all 15 tasks. `LangToggle()` takes no props everywhere it's rendered (Tasks 1, 12, 13, 14). Content field shape `{ en: string; vi: string }` is consistent across every converted array.
- **Key consistency:** every `.map()` over a newly bilingual field was checked and updated to key off `.en` (or an existing stable `id`/`number`/`href`) instead of the now-object field, across Tasks 2, 5–14.
