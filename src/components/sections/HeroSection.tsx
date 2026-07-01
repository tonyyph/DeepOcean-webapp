import Image from "next/image";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
import { AppScreenshot } from "@/components/ui/AppScreenshot";
import { Reveal } from "@/components/ui/Reveal";
import { T } from "@/components/ui/T";
import { siteLinks } from "@/content/landingContent";

export function HeroSection() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-art" aria-hidden>
        <Image
          src="/assets/ocean-portal-wide.png"
          alt=""
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className="hero-shade" />
      <div className="hero-inner">
        <Reveal className="hero-copy">
          <div className="hero-brand-line">
            <Image src="/assets/app-icon.png" alt="" width={38} height={38} />
            <span><T en="Focus dives for iPhone & Android" vi="Lặn tập trung cho iPhone & Android" /></span>
          </div>
          <h1>
            <T en="Focus deeper." vi="Tập trung sâu hơn." />
            <span><T en="Surface calmer." vi="Trồi lên bình yên hơn." /></span>
          </h1>
          <p className="hero-lede">
            <T
              en="Deep Ocean turns each focus session into an underwater dive—where uninterrupted minutes become depth, discoveries, and a lasting record of the attention you protected."
              vi="Deep Ocean biến mỗi phiên tập trung thành một lượt lặn dưới nước — nơi những phút giây không bị gián đoạn trở thành độ sâu, khám phá, và một hồ sơ lâu dài về sự tập trung bạn đã bảo vệ."
            />
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={siteLinks.primaryCta}>
              <T en="Get launch updates" vi="Nhận cập nhật ra mắt" />
              <ArrowRight size={18} />
            </a>
            <a className="button button-secondary" href={siteLinks.secondaryCta}>
              <T en="Explore the dive" vi="Khám phá lượt lặn" />
              <ArrowDown size={17} />
            </a>
          </div>
          <div className="hero-proof">
            <span><Check size={14} /> <T en="Timed or free dives" vi="Lặn có giờ hoặc lặn tự do" /></span>
            <span><Check size={14} /> <T en="Core focus loop stays accessible" vi="Vòng lặp tập trung cốt lõi luôn có thể sử dụng được" /></span>
            <span><Check size={14} /> <T en="English & Vietnamese app UI" vi="Giao diện ứng dụng tiếng Anh & tiếng Việt" /></span>
          </div>
        </Reveal>

        <Reveal className="hero-device-stage" delay={0.15}>
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
          <AppScreenshot screen="dive" priority />
        </Reveal>
      </div>
      <div className="hero-depth-scale" aria-hidden>
        <span>0 m</span><i /><span>6,000 m+</span>
      </div>
    </section>
  );
}
