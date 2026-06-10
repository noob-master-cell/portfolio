import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { DATA } from '../data/content';
import SectionLabel from '../components/ui/SectionLabel';
import GitHubStats from '../components/ui/GitHubStats';

export default function About() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section
      id="about"
      className="section-shell bg-[#fafafa] text-[#0a0a0a] border-y border-neutral-200"
    >
      <div className="container-shell">
        <SectionLabel text="01 / About" isDark={false} />

        <div
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mt-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="md:col-span-7">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-black leading-tight mb-8">
              {DATA.about.quote}
            </h2>

            <p className="font-sans text-base text-neutral-600 leading-relaxed">
              {DATA.about.description}
            </p>
          </div>

          <div className="md:col-span-5 md:pl-8 md:border-l border-neutral-200">
            <div className="mb-10">
              <GitHubStats />
            </div>

            <div className="mb-12">
              <div className="font-mono text-xs text-neutral-500 mb-4">
                Education
              </div>
              <div className="flex flex-col gap-6">
                {DATA.education.map((edu, i) => (
                  <div key={i}>
                    <div className="text-sm font-medium text-black">
                      {edu.degree}
                    </div>
                    <div className="text-sm text-neutral-500 mt-0.5">
                      {edu.school}
                    </div>
                    <div className="font-mono text-xs text-neutral-400 mt-1">
                      {edu.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <div className="font-mono text-xs text-neutral-500 mb-4">
                Coursework
              </div>
              <div className="flex flex-wrap gap-1.5">
                {DATA.coursework.map((course, i) => (
                  <span
                    key={i}
                    className="text-xs text-neutral-700 px-2.5 py-1 bg-white border border-neutral-200 rounded-md"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>

            {DATA.certifications && DATA.certifications.length > 0 && (
              <div>
                <div className="font-mono text-xs text-neutral-500 mb-4">
                  Certifications
                </div>
                <div className="flex flex-col gap-3">
                  {DATA.certifications.map((cert, i) => (
                    <div key={i}>
                      <div className="text-sm text-black">
                        {cert.title}
                      </div>
                      <div className="font-mono text-xs text-neutral-400 mt-0.5">
                        {cert.issuer}, {cert.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
