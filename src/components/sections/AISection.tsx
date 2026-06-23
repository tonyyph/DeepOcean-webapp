import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { intelligence } from "@/content/landingContent";

export function AISection() {
  return (
    <section id="ai-companion" className="section ai-section">
      <div className="section-inner ai-grid">
        <Reveal className="ai-capture">
          <Image
            src="/screenshots/ai.png"
            alt="Real Deep Ocean Marine Guide screen"
            fill
            sizes="(max-width: 800px) 78vw, 420px"
          />
        </Reveal>

        <div>
          <SectionHeading
            eyebrow="AI & personalization"
            title="A companion that listens to the dive log."
            description="Recommendations can use selected goals and actual app context. Hosted providers are optional; cache and a deterministic local guide keep basic guidance available."
          />
          <div className="intelligence-list">
            {intelligence.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal className="intelligence-item" delay={index * 0.06} key={item.title}>
                  <span><Icon size={20} /></span>
                  <div><h3>{item.title}</h3><p>{item.description}</p></div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
import Image from "next/image";
