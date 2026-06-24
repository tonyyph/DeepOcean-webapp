import Navbar from "@/components/ui/Navbar";
import { AISection } from "@/components/sections/AISection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { Footer } from "@/components/sections/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { LovedByTravelersSection } from "@/components/sections/LovedByTravelersSection";
import { PremiumSection } from "@/components/sections/PremiumSection";
import { PrivacySection } from "@/components/sections/PrivacySection";
import { ProblemSolutionSection } from "@/components/sections/ProblemSolutionSection";
import { ScreensPreviewSection } from "@/components/sections/ScreensPreviewSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { WidgetSection } from "@/components/sections/WidgetSection";
import { landingCssVariables } from "@/lib/landingTheme";

export default function Home() {
  return (
    <main className="landing-shell" style={landingCssVariables}>
      <div className="ambient-field" aria-hidden>
        <i /><i /><i /><i /><i /><i />
      </div>
      <Navbar />
      <HeroSection />
      <ProblemSolutionSection />
      <FeaturesSection />
      <LovedByTravelersSection />
      <HowItWorksSection />
      <ScreensPreviewSection />
      <PremiumSection />
      <AISection />
      <WidgetSection />
      <StatsSection />
      <PrivacySection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
