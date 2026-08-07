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
    "Terms of Service for Deep Ocean, covering acceptable use, free app access, intellectual property, disclaimers, and contact.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service — Deep Ocean",
    description:
      "Read the Terms of Service for Deep Ocean, including free access terms, acceptable use, and limitation of liability.",
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
      "Deep Ocean Terms of Service — free app access, acceptable use, and your rights.",
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
