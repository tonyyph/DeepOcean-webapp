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
