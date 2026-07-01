import { Check, Diamond } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { T } from "@/components/ui/T";
import { premiumBenefits, siteLinks } from "@/content/landingContent";

export function PremiumSection() {
  return (
    <section id="premium" className="section premium-section">
      <div className="premium-glow" aria-hidden />
      <div className="section-inner premium-grid">
        <Reveal className="premium-copy">
          <p className="eyebrow">Deep Ocean Pro</p>
          <h2><T en="More personal. More reflective. Never louder." vi="Cá nhân hơn. Sâu lắng hơn. Không bao giờ ồn ào hơn." /></h2>
          <p className="section-description">
            <T
              en="The core dive remains useful on its own. Pro adds richer visual identities, deeper guidance, and complete expedition lore."
              vi="Lượt lặn cốt lõi vẫn hữu ích khi dùng riêng. Pro bổ sung bộ nhận diện hình ảnh phong phú hơn, hướng dẫn sâu hơn và trọn vẹn truyền thuyết thám hiểm."
            />
          </p>
          <div className="premium-principle">
            <Diamond size={18} />
            <span><T en="Designed as depth, not pressure." vi="Được thiết kế như độ sâu, không phải áp lực." /></span>
          </div>
          <a className="button button-premium" href={siteLinks.primaryCta}>
            <T en="Follow launch status" vi="Theo dõi tình trạng ra mắt" />
          </a>
          <small className="placeholder-note">
            <T
              en="Production pricing and store availability are not published on this page until the live offerings are confirmed."
              vi="Giá chính thức và tình trạng có mặt trên cửa hàng chưa được công bố trên trang này cho đến khi các gói sản phẩm chính thức được xác nhận."
            />
          </small>
        </Reveal>

        <div className="premium-benefits">
          {premiumBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Reveal className="premium-benefit" delay={index * 0.05} key={benefit.title.en}>
                <span><Icon size={19} /></span>
                <div>
                  <h3><T en={benefit.title.en} vi={benefit.title.vi} /></h3>
                  <p><T en={benefit.description.en} vi={benefit.description.vi} /></p>
                </div>
                <Check size={16} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
