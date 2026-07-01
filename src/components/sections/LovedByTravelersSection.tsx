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
