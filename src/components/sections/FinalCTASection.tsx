import Image from "next/image";
import { Apple, Play } from "lucide-react";

export function FinalCTASection() {
  return (
    <section id="final-cta" className="final-cta-section">
      <Image src="/assets/ocean-portal-wide.png" alt="" fill sizes="100vw" />
      <div className="final-cta-overlay" />
      <div className="final-cta-content">
        <p className="eyebrow">The next dive starts at the surface</p>
        <h2>Give your focus somewhere deeper to go.</h2>
        <p>
          Deep Ocean is preparing for release. Store links will appear here
          when the production listings are confirmed.
        </p>
        <div id="store-links" className="store-buttons">
          <span aria-label="App Store availability coming soon">
            <Apple size={22} />
            <span><small>Coming soon on</small>App Store</span>
          </span>
          <span aria-label="Google Play availability coming soon">
            <Play size={20} />
            <span><small>Coming soon on</small>Google Play</span>
          </span>
        </div>
      </div>
    </section>
  );
}
