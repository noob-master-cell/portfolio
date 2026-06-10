import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { DATA } from '../data/content';
import SectionLabel from '../components/ui/SectionLabel';

export default function Experience() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      id="experience"
      className="section-shell bg-[#0a0a0a] text-[#ededed]"
    >
      <div className="container-shell">
        <SectionLabel text="02 / Experience" />

        <div
          ref={ref}
          className={`mt-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex flex-col">
            {DATA.experience.map((job, i) => (
              <div
                key={i}
                className={`grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-10 ${
                  i !== DATA.experience.length - 1
                    ? 'border-b border-neutral-900'
                    : ''
                }`}
              >
                <div className="md:col-span-3">
                  <div className="font-mono text-xs text-neutral-500">
                    {job.date}
                  </div>
                </div>

                <div className="md:col-span-9">
                  <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-1">
                    {job.company}
                  </h3>
                  <div className="text-sm text-neutral-400 mb-6">
                    {job.role}
                  </div>

                  <ul className="flex flex-col gap-3 text-sm text-neutral-400 leading-relaxed">
                    {job.logs?.map((log, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="text-neutral-600 shrink-0 mt-0.5">
                          ·
                        </span>
                        <span>{log}</span>
                      </li>
                    ))}
                  </ul>

                  {job.tech && job.tech.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-6">
                      {job.tech.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 font-mono text-xs text-neutral-400 border border-neutral-800 rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
