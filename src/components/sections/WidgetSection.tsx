import Image from "next/image";
import { BellRing, Radio, Smartphone } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { widgetHighlights } from "@/content/landingContent";

export function WidgetSection() {
  return (
    <section id="widgets" className="section widget-section">
      <div className="section-inner widget-grid">
        <div className="widget-copy">
          <p className="eyebrow">Widgets, Live Activities & notifications</p>
          <h2>Your dive stays close, even when the app is not open.</h2>
          <p className="section-description">
            Native surfaces use the same session engine and a shared action
            contract, so a widget never becomes a second, conflicting timer.
          </p>
          <div className="widget-feature-list">
            {widgetHighlights.map((highlight) => (
              <div key={highlight}><Radio size={15} /><span>{highlight}</span></div>
            ))}
          </div>
          <div className="platform-pills">
            <span><Smartphone size={15} /> iOS WidgetKit & Live Activity</span>
            <span><BellRing size={15} /> Android active-dive notification</span>
          </div>
        </div>

        <Reveal className="widget-capture-grid">
          <figure className="widget-capture widget-capture-wide">
            <Image
              src="/screenshots/ocean_portal_large.png"
              alt="Real Deep Ocean Ocean Portal large widget preview"
              fill
              sizes="(max-width: 800px) 90vw, 560px"
            />
          </figure>
          <figure className="widget-capture">
            <Image
              src="/screenshots/diving_instrument_large.png"
              alt="Real Deep Ocean Diving Instrument large widget preview"
              fill sizes="(max-width: 800px) 90vw, 360px"
            />
          </figure>
          <figure className="widget-capture">
            <Image
              src="/screenshots/living_ocean_large.png"
              alt="Real Deep Ocean Living Ocean large widget preview"
              fill sizes="(max-width: 800px) 90vw, 360px"
            />
          </figure>
          <p className="widget-capture-note">
            Native widget previews from the current implementation. A
            real-device Live Activity capture is still needed.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
