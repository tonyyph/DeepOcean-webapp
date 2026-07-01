import Image from "next/image";
import { BellRing, Radio, Smartphone } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { T } from "@/components/ui/T";
import { widgetHighlights } from "@/content/landingContent";

export function WidgetSection() {
  return (
    <section id="widgets" className="section widget-section">
      <div className="section-inner widget-grid">
        <div className="widget-copy">
          <p className="eyebrow"><T en="Widgets, Live Activities & notifications" vi="Widget, Live Activities & thông báo" /></p>
          <h2><T en="Your dive stays close, even when the app is not open." vi="Lượt lặn của bạn luôn ở gần, ngay cả khi ứng dụng không mở." /></h2>
          <p className="section-description">
            <T
              en="Native surfaces use the same session engine and a shared action contract, so a widget never becomes a second, conflicting timer."
              vi="Các giao diện gốc dùng chung engine phiên tập trung và một giao ước hành động chung, nên widget không bao giờ trở thành một bộ đếm giờ thứ hai gây xung đột."
            />
          </p>
          <div className="widget-feature-list">
            {widgetHighlights.map((highlight) => (
              <div key={highlight.en}><Radio size={15} /><span><T en={highlight.en} vi={highlight.vi} /></span></div>
            ))}
          </div>
          <div className="platform-pills">
            <span><Smartphone size={15} /> iOS WidgetKit & Live Activity</span>
            <span><BellRing size={15} /> <T en="Android active-dive notification" vi="Thông báo lượt lặn đang diễn ra trên Android" /></span>
          </div>
        </div>

        <Reveal className="widget-capture-grid">
          <figure className="widget-capture widget-concept-capture">
            <Image
              src="/screenshots/widget-portal.png"
              alt="Deep Ocean widget concept sheet showing Ocean Portal, Diving Instrument, and Living Ocean layouts"
              fill
              sizes="(max-width: 800px) 92vw, 620px"
            />
          </figure>
          <p className="widget-capture-note">
            <T
              en="Repository-sourced widget concept sheet. Real installed widget and Live Activity captures are still needed."
              vi="Bảng phác thảo widget lấy từ kho mã nguồn. Vẫn cần ảnh chụp widget đã cài đặt thật và Live Activity thật."
            />
          </p>
        </Reveal>
      </div>
    </section>
  );
}
