import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { T } from "@/components/ui/T";
import { steps } from "@/content/landingContent";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section how-section">
      <div className="section-inner">
        <SectionHeading
          eyebrow={<T en="How it works" vi="Cách hoạt động" />}
          title={<T en="From intention to expedition report." vi="Từ ý định đến báo cáo thám hiểm." />}
          description={
            <T
              en="Deep Ocean keeps the interaction simple while giving each stage a clear emotional purpose."
              vi="Deep Ocean giữ cho thao tác đơn giản trong khi mang lại cho mỗi giai đoạn một mục đích cảm xúc rõ ràng."
            />
          }
          align="center"
        />
        <div className="steps-grid">
          {steps.map((step, index) => (
            <Reveal className="step-card" delay={index * 0.06} key={step.number}>
              <span className="step-number">{step.number}</span>
              <div className="step-line" aria-hidden />
              <h3><T en={step.title.en} vi={step.title.vi} /></h3>
              <p><T en={step.description.en} vi={step.description.vi} /></p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
