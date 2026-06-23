import { CloudOff, Database, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const privacyPoints = [
  {
    icon: Database,
    title: "Core records stay on device",
    body: "Dive history, profile progress, collection, mood, settings, personalization, achievements, and cached guidance are persisted locally with MMKV.",
  },
  {
    icon: CloudOff,
    title: "Guidance degrades gracefully",
    body: "When a hosted AI provider is unavailable, Deep Ocean can use a cached response or context-derived offline guidance instead of breaking the core experience.",
  },
  {
    icon: ShieldCheck,
    title: "Clear network boundaries",
    body: "Optional AI providers, RevenueCat purchases, and app updates can use network services. Deep Ocean does not claim that every feature is fully offline.",
  },
] as const;

export function PrivacySection() {
  return (
    <section id="privacy" className="section privacy-section">
      <div className="section-inner privacy-grid">
        <SectionHeading
          eyebrow="Privacy & local-first"
          title="Your focus history begins on your device."
          description="The current architecture keeps the core product record local while clearly separating the few features that may call configured services."
        />
        <div className="privacy-list">
          {privacyPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <Reveal
                className="privacy-card"
                delay={index * 0.05}
                key={point.title}
              >
                <span><Icon size={20} /></span>
                <div>
                  <h3>{point.title}</h3>
                  <p>{point.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
