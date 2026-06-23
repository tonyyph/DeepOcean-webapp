import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { progressFeatures, progressMetrics } from "@/content/landingContent";

export function StatsSection() {
  return (
    <section id="progress" className="section stats-section">
      <div className="section-inner">
        <SectionHeading
          eyebrow="Progress without pressure"
          title="A history of attention you can actually feel."
          description="Deep Ocean turns sessions into a coherent personal record: where you went, how often you returned, and what your focus revealed."
          align="center"
        />
        <div className="metric-grid">
          {progressMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Reveal className="metric-card" delay={index * 0.05} key={metric.label}>
                <Icon size={18} />
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </Reveal>
            );
          })}
        </div>
        <div className="progress-detail-grid">
          <Reveal className="analytics-capture">
            <Image
              src="/screenshots/stats.png"
              alt="Real Deep Ocean Dive Analytics screen"
              fill
              sizes="(max-width: 800px) 84vw, 440px"
            />
          </Reveal>
          <div className="progress-feature-list">
            {progressFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Reveal className="progress-feature" delay={index * 0.06} key={feature.title}>
                  <span><Icon size={20} /></span>
                  <div><h3>{feature.title}</h3><p>{feature.body}</p></div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
