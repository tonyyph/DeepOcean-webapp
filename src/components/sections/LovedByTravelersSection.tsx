import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { FloatingAppPreview } from "@/components/ui/FloatingAppPreview";
import { SectionBadge } from "@/components/ui/SectionBadge";

export function LovedByTravelersSection() {
  return (
    <section className="section travelers-section" aria-labelledby="travelers-title">
      <div className="section-inner travelers-grid">
        <AnimatedSection className="travelers-copy">
          <SectionBadge>LOVED BY TRAVELERS</SectionBadge>
          <h2 id="travelers-title">Less chaos, more trips.</h2>
          <p>
            Deep Ocean gives each focus session a clear beginning and a calm
            destination—so there is less friction between deciding to focus and
            actually starting.
          </p>
          <div className="travelers-proof" aria-label="Verified product capabilities">
            <span>Timed & free dives</span>
            <span>Five ocean zones</span>
            <span>English & Vietnamese</span>
          </div>
        </AnimatedSection>
        <AnimatedSection className="travelers-preview" delay={0.12}>
          <FloatingAppPreview />
        </AnimatedSection>
      </div>
    </section>
  );
}
