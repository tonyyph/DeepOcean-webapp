import { faqs } from "@/content/landingContent";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { T } from "@/components/ui/T";

export function FAQSection() {
  return (
    <section id="faq" className="section faq-section">
      <div className="section-inner faq-grid">
        <SectionHeading
          eyebrow={<T en="FAQ" vi="Câu hỏi thường gặp" />}
          title={<T en="Before your first descent." vi="Trước lượt lặn đầu tiên của bạn." />}
          description={
            <T
              en="A concise guide to the current product behavior and launch status."
              vi="Một hướng dẫn ngắn gọn về hành vi sản phẩm hiện tại và tình trạng ra mắt."
            />
          }
        />
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details key={faq.question.en} open={index === 0}>
              <summary><T en={faq.question.en} vi={faq.question.vi} /><span>+</span></summary>
              <p><T en={faq.answer.en} vi={faq.answer.vi} /></p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
