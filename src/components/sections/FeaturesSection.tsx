import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { FeatureStoryCard } from "@/components/ui/FeatureStoryCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { T } from "@/components/ui/T";
import { featureStories } from "@/content/landingContent";

export function FeaturesSection() {
  return (
    <section id="features" className="section feature-stories-section">
      <div className="section-inner">
        <AnimatedSection>
          <SectionHeading
            eyebrow={<T en="Stories from below" vi="Những câu chuyện từ đáy sâu" />}
            title={<T en="A focus ritual, told in three real views." vi="Một nghi thức tập trung, kể qua ba góc nhìn thật." />}
            description={
              <T
                en="Every visual comes from the current project: shipped widget artwork or a verified mobile-app capture."
                vi="Mọi hình ảnh đều đến từ dự án hiện tại: hình minh họa widget đã phát hành hoặc ảnh chụp thực tế từ ứng dụng di động đã xác minh."
              />
            }
          />
        </AnimatedSection>
        <div className="feature-story-grid">
          {featureStories.map((story, index) => (
            <FeatureStoryCard
              image={story.image}
              category={<T en={story.category.en} vi={story.category.vi} />}
              title={<T en={story.title.en} vi={story.title.vi} />}
              description={<T en={story.description.en} vi={story.description.vi} />}
              index={index}
              key={story.title.en}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
