import Image from "next/image";
import { Apple, Play } from "lucide-react";
import { T } from "@/components/ui/T";

export function FinalCTASection() {
  return (
    <section id="final-cta" className="final-cta-section">
      <Image src="/assets/ocean-portal-wide.png" alt="" fill sizes="100vw" />
      <div className="final-cta-overlay" />
      <div className="final-cta-content">
        <p className="eyebrow"><T en="The next dive starts at the surface" vi="Lượt lặn tiếp theo bắt đầu từ mặt nước" /></p>
        <h2><T en="Give your focus somewhere deeper to go." vi="Cho sự tập trung của bạn một nơi sâu hơn để đến." /></h2>
        <p>
          <T
            en="Deep Ocean is preparing for release. Store links will appear here when the production listings are confirmed."
            vi="Deep Ocean đang chuẩn bị ra mắt. Liên kết cửa hàng sẽ xuất hiện ở đây khi các gian hàng chính thức được xác nhận."
          />
        </p>
        <div id="store-links" className="store-buttons">
          <span aria-label="App Store availability coming soon">
            <Apple size={22} />
            <span><small><T en="Coming soon on" vi="Sắp ra mắt trên" /></small>App Store</span>
          </span>
          <span aria-label="Google Play availability coming soon">
            <Play size={20} />
            <span><small><T en="Coming soon on" vi="Sắp ra mắt trên" /></small>Google Play</span>
          </span>
        </div>
      </div>
    </section>
  );
}
