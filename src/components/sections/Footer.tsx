import Image from "next/image";
import { footerGroups, siteLinks } from "@/content/landingContent";
import { T } from "@/components/ui/T";
import { LangToggle } from "@/components/ui/LangToggle";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <a href="#hero">
            <Image src="/assets/app-icon.png" alt="" width={42} height={42} />
            <span>Deep Ocean</span>
          </a>
          <p><T en="Focus dives for calmer, more visible progress." vi="Những lượt lặn tập trung cho tiến trình bình yên và rõ ràng hơn." /></p>
        </div>
        {footerGroups.map((group) => (
          <div className="footer-group" key={group.title.en}>
            <strong><T en={group.title.en} vi={group.title.vi} /></strong>
            {group.links.map((link) => (
              <a href={link.href} key={link.label.en}><T en={link.label.en} vi={link.label.vi} /></a>
            ))}
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Deep Ocean</span>
        <a id="contact-placeholder" href={siteLinks.support}><T en="Support and contact" vi="Hỗ trợ và liên hệ" /></a>
        <LangToggle />
      </div>
    </footer>
  );
}
