import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { T } from "@/components/ui/T";
import { progressFeatures, progressMetrics } from "@/content/landingContent";

export function StatsSection() {
  return (
    <section id="progress" className="section stats-section">
      <div className="section-inner">
        <SectionHeading
          eyebrow={<T en="Progress without pressure" vi="Tiến trình không áp lực" />}
          title={<T en="A history of attention you can actually feel." vi="Một lịch sử của sự tập trung mà bạn thật sự cảm nhận được." />}
          description={
            <T
              en="Deep Ocean turns sessions into a coherent personal record: where you went, how often you returned, and what your focus revealed."
              vi="Deep Ocean biến các phiên tập trung thành một hồ sơ cá nhân mạch lạc: bạn đã đi đến đâu, bạn quay lại bao thường xuyên, và sự tập trung của bạn hé lộ điều gì."
            />
          }
          align="center"
        />
        <div className="metric-grid">
          {progressMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Reveal className="metric-card" delay={index * 0.05} key={metric.label.en}>
                <Icon size={18} />
                <strong>{metric.value}</strong>
                <span><T en={metric.label.en} vi={metric.label.vi} /></span>
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
                <Reveal className="progress-feature" delay={index * 0.06} key={feature.title.en}>
                  <span><Icon size={20} /></span>
                  <div><h3><T en={feature.title.en} vi={feature.title.vi} /></h3><p><T en={feature.body.en} vi={feature.body.vi} /></p></div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
