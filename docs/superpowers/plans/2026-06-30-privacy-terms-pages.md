# Privacy & Terms Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `/privacy` and `/terms` standalone pages matching the existing Deep Ocean design system, with bilingual EN+VI semi-formal legal content.

**Architecture:** Five sequential tasks — CSS foundations first, then content data, then the two page components, then routing updates. Each task is independently verifiable via TypeScript compiler (`npm run typecheck`) and visual check on dev server.

**Tech Stack:** Next.js 16.2.7, React 19, TypeScript, pure Server Components, CSS (no Tailwind classes used in these pages — custom CSS only)

## Global Constraints

- Reuse `.support-shell`, `.support-nav`, `.support-brand`, `.support-home-link`, `.ambient-field`, `.button`, `.eyebrow` CSS classes — do not duplicate them
- All page components must be pure Server Components (no `"use client"`)
- Bilingual content: EN visible first in each section, VI below with `--color-text-muted`
- No italic on Vietnamese text (diacritics render poorly in italic)
- Support email: `support@deepocean.io.vn`
- Last updated date: `June 30, 2026`
- App icon path: `/assets/app-icon.png`
- Ocean portal image path: `/assets/ocean-portal-wide.png`

---

### Task 1: Legal page CSS

**Files:**
- Modify: `src/app/globals.css` (append after line 2865 — the closing `}` of the final `@media (max-width: 580px)` block)

**Interfaces:**
- Produces: `.legal-shell`, `.legal-hero`, `.legal-hero-vi`, `.legal-updated`, `.legal-body-wrapper`, `.legal-toc`, `.legal-toc-num`, `.legal-content`, `.legal-section`, `.legal-section-heading`, `.legal-section-heading-vi`, `.legal-en`, `.legal-divider`, `.legal-vi`, `.legal-footer`, `.legal-footer-links` — used by Tasks 3 and 4

- [ ] **Step 1: Append legal CSS to globals.css**

Add this block at the very end of `src/app/globals.css` (after the closing `}` on line 2865):

```css
/* ─── Legal pages (/privacy, /terms) ───────────────────────────────────── */

.legal-shell {
  position: relative;
  min-height: 100vh;
  overflow: clip;
  padding: 0 var(--space-gutter) 5rem;
  background:
    radial-gradient(circle at 78% 12%, rgba(34, 228, 255, 0.09), transparent 26%),
    radial-gradient(circle at 20% 50%, rgba(167, 139, 250, 0.07), transparent 24%),
    linear-gradient(180deg, var(--color-abyss), #020919 56%, var(--color-abyss));
}

.legal-shell::before {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  content: "";
  background-image:
    linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: linear-gradient(to bottom, #000, transparent 78%);
}

.legal-hero,
.legal-body-wrapper,
.legal-footer {
  position: relative;
  z-index: 1;
}

.legal-hero {
  width: min(1180px, 100%);
  margin: 0 auto;
  padding: clamp(2rem, 5vw, 4rem) 0 clamp(1.5rem, 3vw, 2.5rem);
}

.legal-hero h1 {
  margin-bottom: 0.25rem;
  color: var(--color-text);
  font-size: clamp(2.8rem, 7vw, 6rem);
  font-weight: 600;
  line-height: 0.96;
  letter-spacing: -0.04em;
}

.legal-hero-vi {
  margin: 0 0 1.2rem;
  color: var(--color-text-muted);
  font-family: var(--font-display), "Space Grotesk", sans-serif;
  font-size: clamp(1.3rem, 3vw, 2.2rem);
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.025em;
}

.legal-updated {
  margin: 0;
  color: var(--color-text-muted);
  font-family: var(--font-mono), "JetBrains Mono", monospace;
  font-size: 0.68rem;
  letter-spacing: 0.06em;
}

.legal-body-wrapper {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: clamp(2rem, 4vw, 4rem);
  align-items: start;
  width: min(1180px, 100%);
  margin: 0 auto;
  padding-top: clamp(2rem, 4vw, 3rem);
}

.legal-toc {
  position: sticky;
  top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.legal-toc a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.42rem 0.65rem;
  border-radius: 8px;
  color: var(--color-text-muted);
  font-family: var(--font-mono), "JetBrains Mono", monospace;
  font-size: 0.61rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 160ms ease, background 160ms ease;
}

.legal-toc a:hover {
  background: rgba(34, 228, 255, 0.07);
  color: var(--color-cyan);
}

.legal-toc-num {
  opacity: 0.45;
  font-size: 0.56rem;
}

.legal-content {
  min-width: 0;
}

.legal-section {
  padding: clamp(2rem, 4vw, 3rem) 0;
  border-bottom: 1px solid var(--color-line);
}

.legal-section:first-child {
  padding-top: 0;
}

.legal-section-heading {
  margin-bottom: 1.4rem;
}

.legal-section-heading h2 {
  margin-bottom: 0.2rem;
  color: var(--color-text);
  font-size: clamp(1.15rem, 2vw, 1.45rem);
  font-weight: 600;
  letter-spacing: -0.02em;
}

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

.legal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  width: min(1180px, 100%);
  margin: clamp(3rem, 6vw, 5rem) auto 0;
  padding-top: 2rem;
  border-top: 1px solid var(--color-line);
}

.legal-footer > p {
  margin: 0;
  color: var(--color-text-muted);
  font-family: var(--font-mono), "JetBrains Mono", monospace;
  font-size: 0.62rem;
  letter-spacing: 0.06em;
}

.legal-footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.4rem;
}

.legal-footer-links a {
  color: var(--color-text-muted);
  font-family: var(--font-mono), "JetBrains Mono", monospace;
  font-size: 0.63rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 160ms ease;
}

.legal-footer-links a:hover {
  color: var(--color-cyan);
}

@media (max-width: 820px) {
  .legal-body-wrapper {
    grid-template-columns: 1fr;
  }

  .legal-toc {
    position: static;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.4rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--color-line);
  }

  .legal-toc a {
    border: 1px solid var(--color-line);
    background: rgba(255, 255, 255, 0.03);
  }
}

@media (max-width: 580px) {
  .legal-hero h1 {
    font-size: clamp(2.2rem, 10vw, 2.8rem);
  }

  .legal-footer {
    flex-direction: column;
    align-items: flex-start;
  }
}
```

- [ ] **Step 2: Verify typecheck passes**

```bash
cd /Users/tony/DeepOcean-webapp && npm run typecheck
```

Expected: no errors (CSS changes don't affect TS)

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "style: add legal page CSS classes for /privacy and /terms"
```

---

### Task 2: Legal content data file

**Files:**
- Create: `src/content/legalContent.ts`

**Interfaces:**
- Produces:
  - `LegalSection` type: `{ id: string; heading: { en: string; vi: string }; body: { en: string[]; vi: string[] } }`
  - `LegalPage` type: `{ slug: "privacy" | "terms"; title: { en: string; vi: string }; eyebrow: { en: string; vi: string }; updatedAt: string; sections: LegalSection[] }`
  - `privacyPage: LegalPage` — consumed by Task 3
  - `termsPage: LegalPage` — consumed by Task 4

- [ ] **Step 1: Create src/content/legalContent.ts**

```ts
export type LegalSection = {
  id: string
  heading: { en: string; vi: string }
  body: { en: string[]; vi: string[] }
}

export type LegalPage = {
  slug: "privacy" | "terms"
  title: { en: string; vi: string }
  eyebrow: { en: string; vi: string }
  updatedAt: string
  sections: LegalSection[]
}

export const privacyPage: LegalPage = {
  slug: "privacy",
  title: { en: "Privacy Policy", vi: "Chính sách quyền riêng tư" },
  eyebrow: { en: "Privacy", vi: "Quyền riêng tư" },
  updatedAt: "June 30, 2026",
  sections: [
    {
      id: "overview",
      heading: { en: "Overview", vi: "Tổng quan" },
      body: {
        en: [
          "Deep Ocean is a local-first focus timer app. This Privacy Policy explains what information may be involved when you use Deep Ocean, how it is stored, and your rights regarding that information.",
          "We are committed to keeping your focus data on your device. Deep Ocean does not require you to create an account and is designed so that the core experience works entirely offline.",
        ],
        vi: [
          "Deep Ocean là ứng dụng hẹn giờ tập trung ưu tiên lưu trữ cục bộ. Chính sách Quyền riêng tư này giải thích thông tin nào có thể liên quan khi bạn sử dụng Deep Ocean, cách lưu trữ và quyền của bạn đối với thông tin đó.",
          "Chúng tôi cam kết giữ dữ liệu tập trung của bạn trên thiết bị. Deep Ocean không yêu cầu bạn tạo tài khoản và được thiết kế để trải nghiệm cốt lõi hoạt động hoàn toàn ngoại tuyến.",
        ],
      },
    },
    {
      id: "information-collected",
      heading: { en: "Information We Collect", vi: "Thông tin chúng tôi thu thập" },
      body: {
        en: [
          "Deep Ocean does not collect your name, email address, or any personal identifier by default. The following information may be involved in specific circumstances:",
          "AI guidance prompts — If you use the Marine Guide feature, the text you enter as context or questions may be sent to a configured third-party AI provider to generate a response. Deep Ocean does not store these prompts on its own servers.",
          "Purchase verification — If you subscribe to Deep Ocean Pro, your purchase is verified through RevenueCat and the Apple App Store. We receive a subscription status and purchase receipt identifier, but not your payment card details or Apple ID.",
        ],
        vi: [
          "Deep Ocean không thu thập tên, địa chỉ email hoặc bất kỳ thông tin nhận dạng cá nhân nào theo mặc định. Các thông tin sau đây có thể liên quan trong các trường hợp cụ thể:",
          "Lời nhắc hướng dẫn AI — Nếu bạn sử dụng tính năng Marine Guide, văn bản bạn nhập làm ngữ cảnh hoặc câu hỏi có thể được gửi đến nhà cung cấp AI bên thứ ba đã cấu hình để tạo phản hồi. Deep Ocean không lưu trữ những lời nhắc này trên máy chủ của mình.",
          "Xác minh giao dịch mua — Nếu bạn đăng ký Deep Ocean Pro, giao dịch mua của bạn được xác minh qua RevenueCat và App Store của Apple. Chúng tôi nhận được trạng thái đăng ký và mã định danh biên lai mua hàng, nhưng không nhận thông tin thẻ thanh toán hoặc Apple ID của bạn.",
        ],
      },
    },
    {
      id: "data-storage",
      heading: { en: "How Your Data Is Stored", vi: "Dữ liệu được lưu trữ như thế nào" },
      body: {
        en: [
          "The core product data in Deep Ocean is stored locally on your device using MMKV, a fast on-device key-value storage library. Data stored locally includes: dive history and expedition records, XP and level progression, streaks and achievements, your creature and artifact collection, app settings and personalization preferences, cached AI guidance responses, and mood and onboarding data.",
          "This data does not leave your device unless you explicitly use a feature that requires a network connection, such as Marine Guide or Pro subscription management.",
        ],
        vi: [
          "Dữ liệu sản phẩm cốt lõi trong Deep Ocean được lưu trữ cục bộ trên thiết bị của bạn bằng MMKV, thư viện lưu trữ khóa-giá trị nhanh trên thiết bị. Dữ liệu được lưu trữ cục bộ bao gồm: lịch sử lặn và hồ sơ thám hiểm, tiến độ XP và cấp độ, chuỗi ngày và thành tích, bộ sưu tập sinh vật và hiện vật, cài đặt ứng dụng và tùy chọn cá nhân hóa, phản hồi hướng dẫn AI đã lưu vào bộ nhớ đệm, và dữ liệu tâm trạng và giới thiệu.",
          "Dữ liệu này không rời khỏi thiết bị của bạn trừ khi bạn sử dụng tính năng yêu cầu kết nối mạng, chẳng hạn như Marine Guide hoặc quản lý đăng ký Pro.",
        ],
      },
    },
    {
      id: "third-party-services",
      heading: { en: "Third-Party Services", vi: "Dịch vụ bên thứ ba" },
      body: {
        en: [
          "Deep Ocean integrates with the following third-party services in specific circumstances:",
          "RevenueCat — Used to manage and verify Deep Ocean Pro subscriptions. RevenueCat processes purchase receipts from the Apple App Store. Their privacy policy is available at revenuecat.com.",
          "AI Providers — The Marine Guide feature may send your focus context and prompts to a configured AI provider. This connection is optional and only active when you use Marine Guide. The provider processes your input according to their own privacy policy.",
          "Apple App Store — App distribution, updates, optional crash reporting (if you have opted in via iOS Settings), and purchase billing are handled by Apple under Apple's privacy policy.",
          "Deep Ocean does not use advertising SDKs, analytics SDKs, or social media tracking.",
        ],
        vi: [
          "Deep Ocean tích hợp với các dịch vụ bên thứ ba sau trong các trường hợp cụ thể:",
          "RevenueCat — Được sử dụng để quản lý và xác minh các đăng ký Deep Ocean Pro. RevenueCat xử lý biên lai mua hàng từ App Store của Apple. Chính sách quyền riêng tư của họ có tại revenuecat.com.",
          "Nhà cung cấp AI — Tính năng Marine Guide có thể gửi ngữ cảnh tập trung và lời nhắc của bạn đến nhà cung cấp AI đã cấu hình. Kết nối này là tùy chọn và chỉ hoạt động khi bạn sử dụng Marine Guide. Nhà cung cấp xử lý đầu vào của bạn theo chính sách quyền riêng tư của riêng họ.",
          "App Store của Apple — Phân phối ứng dụng, cập nhật, báo cáo sự cố tùy chọn (nếu bạn đã chọn tham gia qua Cài đặt iOS) và thanh toán mua hàng được xử lý bởi Apple theo chính sách quyền riêng tư của Apple.",
          "Deep Ocean không sử dụng SDK quảng cáo, SDK phân tích hoặc theo dõi mạng xã hội.",
        ],
      },
    },
    {
      id: "data-sharing",
      heading: { en: "Data Sharing & Sale", vi: "Chia sẻ & bán dữ liệu" },
      body: {
        en: [
          "Deep Ocean does not sell your personal data. We do not share your focus history, session records, or usage patterns with advertisers, data brokers, or any commercial third party.",
          "Information is shared with third-party services only as described in Section 4, and only to the extent necessary to provide the relevant feature you have chosen to use.",
        ],
        vi: [
          "Deep Ocean không bán dữ liệu cá nhân của bạn. Chúng tôi không chia sẻ lịch sử tập trung, hồ sơ phiên làm việc hoặc mô hình sử dụng của bạn với các nhà quảng cáo, nhà môi giới dữ liệu hoặc bất kỳ bên thương mại thứ ba nào.",
          "Thông tin chỉ được chia sẻ với các dịch vụ bên thứ ba như mô tả trong Mục 4, và chỉ ở mức độ cần thiết để cung cấp tính năng liên quan mà bạn đã chọn sử dụng.",
        ],
      },
    },
    {
      id: "your-rights",
      heading: { en: "Your Rights", vi: "Quyền của bạn" },
      body: {
        en: [
          "Because Deep Ocean stores your data locally on your device, you have direct control over it. You can delete all local app data by removing Deep Ocean from your device, or use any data management options available in the app's settings.",
          "For purchase-related data held by RevenueCat or Apple, email us at support@deepocean.io.vn with the subject line \"Data deletion request\" and we will guide you through the process.",
        ],
        vi: [
          "Vì Deep Ocean lưu trữ dữ liệu của bạn cục bộ trên thiết bị, bạn có quyền kiểm soát trực tiếp. Bạn có thể xóa tất cả dữ liệu ứng dụng cục bộ bằng cách xóa Deep Ocean khỏi thiết bị, hoặc sử dụng các tùy chọn quản lý dữ liệu có trong cài đặt của ứng dụng.",
          "Đối với dữ liệu liên quan đến giao dịch mua do RevenueCat hoặc Apple lưu giữ, hãy email cho chúng tôi tại support@deepocean.io.vn với dòng tiêu đề \"Data deletion request\" và chúng tôi sẽ hướng dẫn bạn qua quy trình.",
        ],
      },
    },
    {
      id: "childrens-privacy",
      heading: { en: "Children's Privacy", vi: "Quyền riêng tư trẻ em" },
      body: {
        en: [
          "Deep Ocean is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided information through the app, please contact us at support@deepocean.io.vn and we will take steps to remove it.",
        ],
        vi: [
          "Deep Ocean không hướng đến trẻ em dưới 13 tuổi. Chúng tôi không cố ý thu thập thông tin cá nhân từ trẻ em. Nếu bạn cho rằng một trẻ em đã cung cấp thông tin qua ứng dụng, vui lòng liên hệ với chúng tôi tại support@deepocean.io.vn và chúng tôi sẽ thực hiện các bước để xóa thông tin đó.",
        ],
      },
    },
    {
      id: "policy-changes",
      heading: { en: "Changes to This Policy", vi: "Thay đổi chính sách" },
      body: {
        en: [
          "We may update this Privacy Policy from time to time. When we do, we will update the \"Last updated\" date at the top of this page. Continued use of Deep Ocean after a change constitutes your acceptance of the updated policy.",
        ],
        vi: [
          "Chúng tôi có thể cập nhật Chính sách Quyền riêng tư này theo thời gian. Khi làm như vậy, chúng tôi sẽ cập nhật ngày \"Cập nhật lần cuối\" ở đầu trang này. Tiếp tục sử dụng Deep Ocean sau khi có thay đổi đồng nghĩa với việc bạn chấp nhận chính sách đã cập nhật.",
        ],
      },
    },
    {
      id: "contact",
      heading: { en: "Contact", vi: "Liên hệ" },
      body: {
        en: [
          "If you have questions about this Privacy Policy or your data, please contact us at: support@deepocean.io.vn",
        ],
        vi: [
          "Nếu bạn có câu hỏi về Chính sách Quyền riêng tư này hoặc dữ liệu của mình, vui lòng liên hệ với chúng tôi tại: support@deepocean.io.vn",
        ],
      },
    },
  ],
}

export const termsPage: LegalPage = {
  slug: "terms",
  title: { en: "Terms of Service", vi: "Điều khoản dịch vụ" },
  eyebrow: { en: "Terms", vi: "Điều khoản" },
  updatedAt: "June 30, 2026",
  sections: [
    {
      id: "acceptance",
      heading: { en: "Acceptance of Terms", vi: "Chấp nhận điều khoản" },
      body: {
        en: [
          "By downloading, installing, or using Deep Ocean, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the app.",
        ],
        vi: [
          "Bằng cách tải xuống, cài đặt hoặc sử dụng Deep Ocean, bạn đồng ý bị ràng buộc bởi Điều khoản Dịch vụ này. Nếu bạn không đồng ý với các điều khoản này, vui lòng không sử dụng ứng dụng.",
        ],
      },
    },
    {
      id: "service-description",
      heading: { en: "Description of Service", vi: "Mô tả dịch vụ" },
      body: {
        en: [
          "Deep Ocean is a focus timer application that represents focus sessions as underwater dive expeditions. The app tracks your time, depth progression, collected discoveries, XP, streaks, and personal achievements — all stored locally on your device.",
          "An optional AI-powered companion called Marine Guide may send context to a configured third-party AI provider to generate personalized focus guidance. Deep Ocean does not require you to create an account. The core experience is available without a network connection.",
        ],
        vi: [
          "Deep Ocean là ứng dụng hẹn giờ tập trung biểu diễn các phiên tập trung dưới dạng các chuyến lặn biển. Ứng dụng theo dõi thời gian, tiến độ độ sâu, khám phá đã thu thập, XP, chuỗi ngày và thành tích cá nhân — tất cả được lưu trữ cục bộ trên thiết bị của bạn.",
          "Một trợ lý tùy chọn hỗ trợ bởi AI có tên Marine Guide có thể gửi ngữ cảnh đến nhà cung cấp AI bên thứ ba đã cấu hình để tạo hướng dẫn tập trung cá nhân hóa. Deep Ocean không yêu cầu bạn tạo tài khoản. Trải nghiệm cốt lõi có sẵn mà không cần kết nối mạng.",
        ],
      },
    },
    {
      id: "intellectual-property",
      heading: { en: "Intellectual Property", vi: "Sở hữu trí tuệ" },
      body: {
        en: [
          "Deep Ocean, including its name, logo, artwork, screen designs, sounds, written content, and code, is owned by Deep Ocean and is protected by intellectual property law.",
          "You are granted a personal, non-exclusive, non-transferable license to use the app on your Apple devices for personal, non-commercial purposes. You may not reproduce, modify, distribute, reverse engineer, or create derivative works from any part of the app without prior written permission.",
        ],
        vi: [
          "Deep Ocean, bao gồm tên, logo, tác phẩm nghệ thuật, thiết kế màn hình, âm thanh, nội dung văn bản và mã nguồn, thuộc sở hữu của Deep Ocean và được bảo vệ bởi luật sở hữu trí tuệ.",
          "Bạn được cấp giấy phép cá nhân, không độc quyền, không thể chuyển nhượng để sử dụng ứng dụng trên các thiết bị Apple của mình cho mục đích cá nhân, phi thương mại. Bạn không được sao chép, sửa đổi, phân phối, đảo ngược kỹ thuật hoặc tạo tác phẩm phái sinh từ bất kỳ phần nào của ứng dụng mà không có sự cho phép bằng văn bản trước.",
        ],
      },
    },
    {
      id: "subscriptions",
      heading: {
        en: "Deep Ocean Pro & Subscriptions",
        vi: "Deep Ocean Pro & Đăng ký",
      },
      body: {
        en: [
          "Deep Ocean Pro is an optional premium subscription that unlocks additional themes, advanced AI insights, and full field journals. Subscriptions are sold through the Apple App Store and managed by RevenueCat. By subscribing, you agree to Apple's payment terms. Deep Ocean does not handle your payment information directly.",
          "To restore a previous purchase, use the Restore Purchases option in the app's Profile or Pro settings. Refunds for App Store purchases are subject to Apple's refund policy and must be requested through your Apple account purchase history. Deep Ocean cannot issue refunds directly.",
        ],
        vi: [
          "Deep Ocean Pro là đăng ký cao cấp tùy chọn mở khóa các chủ đề bổ sung, thông tin AI nâng cao và nhật ký thực địa đầy đủ. Đăng ký được bán qua App Store của Apple và quản lý bởi RevenueCat. Bằng cách đăng ký, bạn đồng ý với điều khoản thanh toán của Apple. Deep Ocean không xử lý thông tin thanh toán của bạn trực tiếp.",
          "Để khôi phục giao dịch mua trước đó, hãy sử dụng tùy chọn Khôi phục giao dịch mua trong cài đặt Hồ sơ hoặc Pro của ứng dụng. Hoàn tiền cho giao dịch mua trên App Store phải tuân theo chính sách hoàn tiền của Apple và phải được yêu cầu qua lịch sử mua hàng của tài khoản Apple. Deep Ocean không thể hoàn tiền trực tiếp.",
        ],
      },
    },
    {
      id: "acceptable-use",
      heading: { en: "Acceptable Use", vi: "Sử dụng hợp lệ" },
      body: {
        en: [
          "You agree to use Deep Ocean only for its intended purpose as a personal focus tool. You must not attempt to reverse engineer, decompile, or extract the source code of the app; use AI features to generate harmful, illegal, or abusive content; circumvent purchase verification or access Pro features without a valid subscription; or use the app in any way that violates applicable law or the rights of others.",
        ],
        vi: [
          "Bạn đồng ý sử dụng Deep Ocean chỉ cho mục đích dự định của nó như một công cụ tập trung cá nhân. Bạn không được: cố gắng đảo ngược kỹ thuật, biên dịch ngược hoặc trích xuất mã nguồn của ứng dụng; sử dụng các tính năng AI để tạo nội dung có hại, bất hợp pháp hoặc lạm dụng; vượt qua xác minh mua hàng hoặc truy cập các tính năng Pro mà không có đăng ký hợp lệ; hoặc sử dụng ứng dụng theo bất kỳ cách nào vi phạm pháp luật hiện hành hoặc quyền của người khác.",
        ],
      },
    },
    {
      id: "disclaimers",
      heading: {
        en: "Disclaimers",
        vi: "Tuyên bố miễn trừ trách nhiệm",
      },
      body: {
        en: [
          "Deep Ocean is provided \"as is\" without warranties of any kind, express or implied. We do not guarantee that the app will be error-free or uninterrupted, or that any particular feature will remain available at all times.",
          "The Marine Guide AI feature depends on third-party providers and may be unavailable due to outages, configuration changes, or service limitations. The offline fallback mode is provided as a best-effort substitute and may not match the quality of hosted AI responses.",
        ],
        vi: [
          "Deep Ocean được cung cấp \"nguyên trạng\" mà không có bảo đảm dưới bất kỳ hình thức nào, rõ ràng hay ngụ ý. Chúng tôi không đảm bảo rằng ứng dụng sẽ không có lỗi hoặc không bị gián đoạn, hoặc bất kỳ tính năng cụ thể nào sẽ luôn khả dụng.",
          "Tính năng AI Marine Guide phụ thuộc vào các nhà cung cấp bên thứ ba và có thể không khả dụng do sự cố, thay đổi cấu hình hoặc giới hạn dịch vụ. Chế độ dự phòng ngoại tuyến được cung cấp như một giải pháp thay thế theo khả năng tốt nhất và có thể không đạt chất lượng như phản hồi AI được lưu trữ.",
        ],
      },
    },
    {
      id: "liability",
      heading: {
        en: "Limitation of Liability",
        vi: "Giới hạn trách nhiệm pháp lý",
      },
      body: {
        en: [
          "To the maximum extent permitted by applicable law, Deep Ocean and its creators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the app.",
          "In no event shall our total liability to you exceed the amount you paid for Deep Ocean Pro in the twelve months preceding the claim.",
        ],
        vi: [
          "Trong phạm vi tối đa được pháp luật hiện hành cho phép, Deep Ocean và những người tạo ra nó sẽ không chịu trách nhiệm về bất kỳ thiệt hại gián tiếp, ngẫu nhiên, đặc biệt, hậu quả hoặc trừng phạt nào phát sinh từ việc bạn sử dụng ứng dụng.",
          "Trong mọi trường hợp, tổng trách nhiệm của chúng tôi đối với bạn sẽ không vượt quá số tiền bạn đã trả cho Deep Ocean Pro trong mười hai tháng trước khi xảy ra khiếu nại.",
        ],
      },
    },
    {
      id: "terms-changes",
      heading: { en: "Changes to Terms", vi: "Thay đổi điều khoản" },
      body: {
        en: [
          "We may update these Terms of Service from time to time. When we do, we will update the \"Last updated\" date on this page. Continued use of Deep Ocean after a change constitutes your acceptance of the updated terms.",
        ],
        vi: [
          "Chúng tôi có thể cập nhật Điều khoản Dịch vụ này theo thời gian. Khi làm như vậy, chúng tôi sẽ cập nhật ngày \"Cập nhật lần cuối\" trên trang này. Tiếp tục sử dụng Deep Ocean sau khi có thay đổi đồng nghĩa với việc bạn chấp nhận các điều khoản đã cập nhật.",
        ],
      },
    },
    {
      id: "contact",
      heading: { en: "Contact", vi: "Liên hệ" },
      body: {
        en: [
          "For questions about these Terms of Service, contact us at: support@deepocean.io.vn",
        ],
        vi: [
          "Để biết câu hỏi về Điều khoản Dịch vụ này, hãy liên hệ với chúng tôi tại: support@deepocean.io.vn",
        ],
      },
    },
  ],
}
```

- [ ] **Step 2: Run typecheck**

```bash
cd /Users/tony/DeepOcean-webapp && npm run typecheck
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/content/legalContent.ts
git commit -m "feat: add legal content data (privacy policy and terms of service, EN+VI)"
```

---

### Task 3: Privacy page

**Files:**
- Create: `src/app/privacy/page.tsx`

**Interfaces:**
- Consumes:
  - `privacyPage: LegalPage` from `@/content/legalContent`
  - `landingCssVariables` from `@/lib/landingTheme`
  - CSS classes from Task 1: `.legal-shell`, `.legal-hero`, `.legal-hero-vi`, `.legal-updated`, `.legal-body-wrapper`, `.legal-toc`, `.legal-toc-num`, `.legal-content`, `.legal-section`, `.legal-section-heading`, `.legal-section-heading-vi`, `.legal-en`, `.legal-divider`, `.legal-vi`, `.legal-footer`, `.legal-footer-links`
  - Reused classes: `.ambient-field`, `.support-nav`, `.support-brand`, `.support-home-link`, `.eyebrow`

- [ ] **Step 1: Create src/app/privacy/page.tsx**

```tsx
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Home } from "lucide-react"
import { privacyPage } from "@/content/legalContent"
import { landingCssVariables } from "@/lib/landingTheme"

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
        <Link className="support-home-link" href="/">
          <Home size={16} />
          Home
        </Link>
      </header>

      <section className="legal-hero">
        <p className="eyebrow">{privacyPage.eyebrow.en} / {privacyPage.eyebrow.vi}</p>
        <h1>{privacyPage.title.en}</h1>
        <p className="legal-hero-vi">{privacyPage.title.vi}</p>
        <p className="legal-updated">Last updated: {privacyPage.updatedAt}</p>
      </section>

      <div className="legal-body-wrapper">
        <nav className="legal-toc" aria-label="Table of contents">
          {privacyPage.sections.map((section, i) => (
            <a key={section.id} href={`#${section.id}`}>
              <span className="legal-toc-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              {section.heading.en}
            </a>
          ))}
        </nav>

        <div className="legal-content">
          {privacyPage.sections.map((section) => (
            <section id={section.id} key={section.id} className="legal-section">
              <div className="legal-section-heading">
                <h2>{section.heading.en}</h2>
                <p className="legal-section-heading-vi">{section.heading.vi}</p>
              </div>
              <div className="legal-en">
                {section.body.en.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              <div className="legal-divider" aria-hidden />
              <div className="legal-vi">
                {section.body.vi.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <footer className="legal-footer">
        <p>© {new Date().getFullYear()} Deep Ocean</p>
        <nav className="legal-footer-links" aria-label="Legal page links">
          <Link href="/">Home</Link>
          <Link href="/terms">Terms of Service</Link>
          <Link href="/support">Support</Link>
        </nav>
      </footer>
    </main>
  )
}
```

- [ ] **Step 2: Run typecheck**

```bash
cd /Users/tony/DeepOcean-webapp && npm run typecheck
```

Expected: no errors

- [ ] **Step 3: Start dev server and verify /privacy visually**

```bash
cd /Users/tony/DeepOcean-webapp && npm run dev
```

Open http://localhost:3000/privacy and check:
- Dark ocean background with ambient dots
- Branded nav with logo + Home link
- "Privacy Policy / Chính sách quyền riêng tư" in hero
- Sticky TOC sidebar on desktop (9 numbered links)
- Each section shows EN heading, VI heading below, EN body, divider, VI body
- Mobile (< 820px): TOC wraps into pills row above content
- Footer with year + nav links

- [ ] **Step 4: Commit**

```bash
git add src/app/privacy/page.tsx
git commit -m "feat: add /privacy page (bilingual EN+VI)"
```

---

### Task 4: Terms page

**Files:**
- Create: `src/app/terms/page.tsx`

**Interfaces:**
- Consumes:
  - `termsPage: LegalPage` from `@/content/legalContent`
  - `landingCssVariables` from `@/lib/landingTheme`
  - Same CSS classes as Task 3

- [ ] **Step 1: Create src/app/terms/page.tsx**

```tsx
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Home } from "lucide-react"
import { termsPage } from "@/content/legalContent"
import { landingCssVariables } from "@/lib/landingTheme"

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
        <Link className="support-home-link" href="/">
          <Home size={16} />
          Home
        </Link>
      </header>

      <section className="legal-hero">
        <p className="eyebrow">{termsPage.eyebrow.en} / {termsPage.eyebrow.vi}</p>
        <h1>{termsPage.title.en}</h1>
        <p className="legal-hero-vi">{termsPage.title.vi}</p>
        <p className="legal-updated">Last updated: {termsPage.updatedAt}</p>
      </section>

      <div className="legal-body-wrapper">
        <nav className="legal-toc" aria-label="Table of contents">
          {termsPage.sections.map((section, i) => (
            <a key={section.id} href={`#${section.id}`}>
              <span className="legal-toc-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              {section.heading.en}
            </a>
          ))}
        </nav>

        <div className="legal-content">
          {termsPage.sections.map((section) => (
            <section id={section.id} key={section.id} className="legal-section">
              <div className="legal-section-heading">
                <h2>{section.heading.en}</h2>
                <p className="legal-section-heading-vi">{section.heading.vi}</p>
              </div>
              <div className="legal-en">
                {section.body.en.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              <div className="legal-divider" aria-hidden />
              <div className="legal-vi">
                {section.body.vi.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <footer className="legal-footer">
        <p>© {new Date().getFullYear()} Deep Ocean</p>
        <nav className="legal-footer-links" aria-label="Legal page links">
          <Link href="/">Home</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/support">Support</Link>
        </nav>
      </footer>
    </main>
  )
}
```

- [ ] **Step 2: Run typecheck**

```bash
cd /Users/tony/DeepOcean-webapp && npm run typecheck
```

Expected: no errors

- [ ] **Step 3: Verify /terms visually**

Open http://localhost:3000/terms and check:
- Same shell as /privacy but shows Terms of Service content
- 9 sections with EN+VI bilingual layout
- TOC sidebar with all 9 section anchors
- Footer links back to Home, Privacy Policy, Support

- [ ] **Step 4: Commit**

```bash
git add src/app/terms/page.tsx
git commit -m "feat: add /terms page (bilingual EN+VI)"
```

---

### Task 5: Routing updates

**Files:**
- Modify: `src/content/landingContent.ts` lines 22–26 (siteLinks object)
- Modify: `src/app/sitemap.ts`

**Interfaces:**
- Consumes: existing `siteLinks` export from `landingContent.ts`
- Effect: footer "Privacy overview" link now navigates to `/privacy`; footer "Launch notes" link becomes "Terms of Service" and navigates to `/terms`; sitemap includes both new routes

- [ ] **Step 1: Update siteLinks in landingContent.ts**

In `src/content/landingContent.ts`, change lines 20–27:

```ts
export const siteLinks = {
  primaryCta: "#final-cta",
  secondaryCta: "#how-it-works",
  privacy: "/privacy",
  terms: "/terms",
  support: "/support",
  contact: "mailto:support@deepocean.io.vn",
} as const
```

- [ ] **Step 2: Update footer link label in landingContent.ts**

In the `footerGroups` array (around line 322–340 in `landingContent.ts`), update the "Company" group:

```ts
{
  title: "Company",
  links: [
    { label: "Privacy Policy", href: siteLinks.privacy },
    { label: "Terms of Service", href: siteLinks.terms },
    { label: "Support", href: siteLinks.support },
    { label: "Email support", href: siteLinks.contact },
  ],
},
```

(Previously: `{ label: "Privacy overview", href: siteLinks.privacy }` and `{ label: "Launch notes", href: siteLinks.terms }`)

- [ ] **Step 3: Add /privacy and /terms to sitemap.ts**

Replace the contents of `src/app/sitemap.ts` with:

```ts
import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl.toString(),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: new URL("/support", siteUrl).toString(),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: new URL("/privacy", siteUrl).toString(),
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: new URL("/terms", siteUrl).toString(),
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ]
}
```

- [ ] **Step 4: Run typecheck**

```bash
cd /Users/tony/DeepOcean-webapp && npm run typecheck
```

Expected: no errors

- [ ] **Step 5: Verify footer links on landing page**

Open http://localhost:3000 and scroll to footer. Check:
- "Privacy Policy" link navigates to /privacy
- "Terms of Service" link navigates to /terms
- Both pages load correctly from footer links

- [ ] **Step 6: Run production build to confirm no errors**

```bash
cd /Users/tony/DeepOcean-webapp && npm run build
```

Expected: build succeeds, all routes listed including `/privacy` and `/terms`

- [ ] **Step 7: Commit**

```bash
git add src/content/landingContent.ts src/app/sitemap.ts
git commit -m "feat: wire /privacy and /terms into footer links and sitemap"
```
