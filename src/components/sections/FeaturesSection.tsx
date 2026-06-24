import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { FeatureStoryCard } from "@/components/ui/FeatureStoryCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featureStories } from "@/content/landingContent";

export function FeaturesSection() {
  return (
    <section id="features" className="section feature-stories-section">
      <div className="section-inner">
        <AnimatedSection>
          <SectionHeading
            eyebrow="Stories from below"
            title="A focus ritual, told in three real views."
            description="Every visual comes from the current project: shipped widget artwork or a verified mobile-app capture."
          />
        </AnimatedSection>
        <div className="feature-story-grid">
          {featureStories.map((story, index) => (
            <FeatureStoryCard {...story} index={index} key={story.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
