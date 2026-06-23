import { AppScreenshot } from "@/components/ui/AppScreenshot";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { screenPreviews } from "@/content/landingContent";

export function ScreensPreviewSection() {
  return (
    <section id="screens" className="section screens-section">
      <div className="section-inner">
        <SectionHeading
          eyebrow="Product preview"
          title="The real app, without stand-ins."
          description="Every image below is a current mobile-app capture. No generated phone UI and no reconstructed screenshots."
        />
        <div className="screen-gallery">
          {screenPreviews.map((screen, index) => (
            <Reveal className="screen-preview-card" delay={index * 0.06} key={screen.id}>
              <div className="screen-copy">
                <span>{screen.label}</span>
                <h3>{screen.title}</h3>
                <p>{screen.description}</p>
              </div>
              <AppScreenshot
                screen={screen.id}
                compact
              />
            </Reveal>
          ))}
        </div>
        <p className="capture-note">
          Still needed: onboarding, surfaced rewards, session detail, the
          actual paywall, notifications, and real-device Live Activity
          captures. See the asset audit for the complete capture list.
        </p>
      </div>
    </section>
  );
}
