import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { T } from "@/components/ui/T";
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
            eyebrow={<T en="AI & personalization" vi="AI & cá nhân hóa" />}
            title={<T en="A companion that listens to the dive log." vi="Một người bạn đồng hành lắng nghe nhật ký lặn." />}
            description={
              <T
                en="Recommendations can use selected goals and actual app context. Hosted providers are optional; cache and a deterministic local guide keep basic guidance available."
                vi="Gợi ý có thể dựa trên các mục tiêu đã chọn và bối cảnh sử dụng ứng dụng thực tế. Nhà cung cấp trên máy chủ là tùy chọn; bộ nhớ đệm và hướng dẫn cục bộ xác định sẵn giúp hướng dẫn cơ bản luôn khả dụng."
              />
            }
          />
          <div className="intelligence-list">
            {intelligence.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal className="intelligence-item" delay={index * 0.06} key={item.title.en}>
                  <span><Icon size={20} /></span>
                  <div><h3><T en={item.title.en} vi={item.title.vi} /></h3><p><T en={item.description.en} vi={item.description.vi} /></p></div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
