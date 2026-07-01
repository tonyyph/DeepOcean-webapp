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
