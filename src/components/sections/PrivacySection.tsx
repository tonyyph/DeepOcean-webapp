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
