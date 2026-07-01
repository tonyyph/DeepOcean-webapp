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
