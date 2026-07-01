import { ArrowDown, Waves } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { T } from "@/components/ui/T";
import { problemSolution } from "@/content/landingContent";

export function ProblemSolutionSection() {
  return (
    <section id="problem" className="section problem-section">
      <div className="section-inner problem-grid">
        <Reveal className="problem-card problem-card-muted">
          <span className="problem-index">01</span>
          <p className="eyebrow"><T en={problemSolution.problem.eyebrow.en} vi={problemSolution.problem.eyebrow.vi} /></p>
          <h2><T en={problemSolution.problem.title.en} vi={problemSolution.problem.title.vi} /></h2>
          <p><T en={problemSolution.problem.body.en} vi={problemSolution.problem.body.vi} /></p>
          <div className="problem-visual" aria-hidden>
            <span>25:00</span>
            <i />
            <small><T en="another countdown" vi="một bộ đếm ngược khác" /></small>
          </div>
        </Reveal>

        <div className="problem-connector" aria-hidden>
          <ArrowDown size={18} />
        </div>

        <Reveal className="problem-card problem-card-solution" delay={0.12}>
          <span className="problem-index">02</span>
          <p className="eyebrow"><T en={problemSolution.solution.eyebrow.en} vi={problemSolution.solution.eyebrow.vi} /></p>
          <h2><T en={problemSolution.solution.title.en} vi={problemSolution.solution.title.vi} /></h2>
          <p><T en={problemSolution.solution.body.en} vi={problemSolution.solution.body.vi} /></p>
          <div className="solution-visual">
            <Waves size={28} />
            <div>
              <strong><T en="Focus becomes a place." vi="Sự tập trung trở thành một nơi chốn." /></strong>
              <small><T en="A ritual you can return to." vi="Một nghi thức bạn có thể quay lại." /></small>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
