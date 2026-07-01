import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CreditCard,
  Home,
  Mail,
  MessageCircle,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  TimerReset,
} from "lucide-react";
import { siteLinks } from "@/content/landingContent";
import { landingCssVariables } from "@/lib/landingTheme";

const supportEmail = "support@deepocean.io.vn";

const supportTopics = [
  {
    icon: TimerReset,
    title: "Focus dives and session history",
    body: "Get help with timed dives, free dives, saved expedition records, XP, streaks, and progress visibility.",
  },
  {
    icon: Smartphone,
    title: "Widgets and Live Activities",
    body: "Report issues with home-screen widgets, active dive status, notifications, or iPhone Live Activities.",
  },
  {
    icon: CreditCard,
    title: "Deep Ocean Pro",
    body: "Ask about premium themes, subscription access, purchase restore behavior, or App Store billing questions.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy and data",
    body: "Request help with local app data, account-related questions, privacy concerns, or data deletion guidance.",
  },
] as const;

const quickAnswers = [
  {
    question: "How fast will support reply?",
    answer:
      "Most support messages are reviewed within 2 business days. Include your device model, iOS version, app version, and screenshots when possible.",
  },
  {
    question: "How do I restore a purchase?",
    answer:
      "Open Deep Ocean, go to Profile or Pro settings, then use Restore Purchases. If access is still missing, email support with the Apple ID purchase region and receipt details from Apple.",
  },
  {
    question: "Can I request data deletion?",
    answer:
      "Yes. Email support with the subject Data deletion request. Deep Ocean is designed around local-first focus data, and support will guide you through any app-side deletion steps.",
  },
] as const;

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
        <Link className="support-home-link" href="/">
          <Home size={16} />
          Home
        </Link>
      </header>

      <section className="support-hero">
        <div className="support-hero-copy">
          <p className="eyebrow">Support</p>
          <h1>Deep Ocean Support</h1>
          <p>
            Need help with a focus dive, widget, Live Activity, Pro access, or
            privacy request? Contact the Deep Ocean team and include enough
            device details to reproduce the issue.
          </p>
          <div className="support-actions">
            <a className="button button-primary" href={`mailto:${supportEmail}`}>
              <Mail size={18} />
              Email support
            </a>
            <a className="button button-secondary" href={siteLinks.contact}>
              <MessageCircle size={18} />
              Contact team
            </a>
          </div>
          <p className="support-email-note">
            Support email: <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
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
            <span>For Apple review</span>
            <strong>https://deepocean.io.vn/support</strong>
            <p>Public support URL for App Store Connect submissions.</p>
          </div>
        </div>
      </section>

      <section className="support-section">
        <div className="support-section-heading">
          <p className="eyebrow">How we can help</p>
          <h2>Support topics</h2>
        </div>
        <div className="support-topic-grid">
          {supportTopics.map((topic) => {
            const Icon = topic.icon;
            return (
              <article className="support-topic-card" key={topic.title}>
                <span>
                  <Icon size={20} />
                </span>
                <h3>{topic.title}</h3>
                <p>{topic.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="support-section support-two-column">
        <div className="support-panel">
          <p className="eyebrow">Before emailing</p>
          <h2>Include these details</h2>
          <ul className="support-checklist">
            <li>Device model and iOS version</li>
            <li>Deep Ocean app version</li>
            <li>What you expected to happen</li>
            <li>What happened instead</li>
            <li>Screenshots or screen recording if available</li>
          </ul>
        </div>

        <div className="support-panel">
          <p className="eyebrow">Quick answers</p>
          <div className="support-faq-list">
            {quickAnswers.map((item) => (
              <article key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="support-final">
        <div>
          <RefreshCw size={22} />
          <h2>Still need help?</h2>
          <p>
            Send a support request and the team will review it. For App Store
            refunds or billing changes, Apple may require handling the request
            through your Apple account purchase history.
          </p>
        </div>
        <a className="button button-primary" href={`mailto:${supportEmail}`}>
          Email Deep Ocean
          <ArrowUpRight size={18} />
        </a>
      </section>
    </main>
  );
}
