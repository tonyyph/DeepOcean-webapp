import { AppScreenshot } from "@/components/ui/AppScreenshot";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { T } from "@/components/ui/T";
import { screenPreviews } from "@/content/landingContent";

export function ScreensPreviewSection() {
  return (
    <section id="screens" className="section screens-section">
      <div className="section-inner">
        <SectionHeading
          eyebrow={<T en="Product preview" vi="Xem trước sản phẩm" />}
          title={<T en="The real app, without stand-ins." vi="Ứng dụng thật, không dàn dựng." />}
          description={
            <T
              en="Every image below is a current mobile-app capture. No generated phone UI and no reconstructed screenshots."
              vi="Mọi hình ảnh bên dưới đều là ảnh chụp thực tế từ ứng dụng di động hiện tại. Không có giao diện điện thoại dựng sẵn và không có ảnh chụp màn hình tái tạo."
            />
          }
        />
        <div className="screen-gallery">
          {screenPreviews.map((screen, index) => (
            <Reveal className="screen-preview-card" delay={index * 0.06} key={screen.id}>
              <div className="screen-copy">
                <span><T en={screen.label.en} vi={screen.label.vi} /></span>
                <h3><T en={screen.title.en} vi={screen.title.vi} /></h3>
                <p><T en={screen.description.en} vi={screen.description.vi} /></p>
              </div>
              <AppScreenshot
                screen={screen.id}
                compact
              />
            </Reveal>
          ))}
        </div>
        <p className="capture-note">
          <T
            en="Still needed: onboarding, surfaced rewards, session detail, notifications, and real-device Live Activity captures. See the asset audit for the complete capture list."
            vi="Vẫn còn thiếu: giới thiệu ban đầu, phần thưởng khi trồi lên, chi tiết phiên, thông báo, và ảnh chụp Live Activity trên thiết bị thật. Xem bản kiểm kê tài nguyên để biết danh sách đầy đủ."
          />
        </p>
      </div>
    </section>
  );
}
