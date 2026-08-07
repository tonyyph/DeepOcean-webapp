import { Check, Diamond } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { T } from "@/components/ui/T";
import { freeAccessBenefits, siteLinks } from "@/content/landingContent";

export function FreeAccessSection() {
  return (
    <section id="free-access" className="section free-access-section">
      <div className="free-access-glow" aria-hidden />
      <div className="section-inner free-access-grid">
        <Reveal className="free-access-copy">
          <p className="eyebrow">Free Access</p>
          <h2><T en="The full ocean is open for current users." vi="Toàn bộ đại dương đang mở miễn phí cho người dùng hiện tại." /></h2>
          <p className="section-description">
            <T
              en="Deep Ocean currently presents focus dives, themes, guidance, reflections, collection details, and field journals as one free experience for current users."
              vi="Deep Ocean hiện trình bày lượt lặn tập trung, giao diện, hướng dẫn, phần nhìn lại, chi tiết bộ sưu tập và nhật ký thực địa như một trải nghiệm miễn phí thống nhất cho người dùng hiện tại."
            />
          </p>
          <div className="free-access-principle">
            <Diamond size={18} />
            <span><T en="Designed as depth, calm, and open access." vi="Được thiết kế xoay quanh độ sâu, sự bình tĩnh và quyền truy cập mở." /></span>
          </div>
          <a className="button button-free-access" href={siteLinks.primaryCta}>
            <T en="Follow launch status" vi="Theo dõi tình trạng ra mắt" />
          </a>
          <small className="placeholder-note">
            <T
              en="This page now describes Deep Ocean as free for current users. Store links will be added when public availability is ready."
              vi="Trang này hiện mô tả Deep Ocean là miễn phí cho người dùng hiện tại. Liên kết cửa hàng sẽ được thêm khi bản phát hành công khai sẵn sàng."
            />
          </small>
        </Reveal>

        <div className="free-access-benefits">
          {freeAccessBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Reveal className="free-access-benefit" delay={index * 0.05} key={benefit.title.en}>
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
