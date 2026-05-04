import { useMemo } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { DATA } from '../data/content';
import SectionLabel from '../components/ui/SectionLabel';

export default function Experience() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const hexIds = useMemo(() => DATA.experience.map(() => Math.random().toString(16).substring(2, 6).toUpperCase()), []);

  return (
    <section id="experience" className="w-full py-24 md:py-[200px] bg-[#030712] text-[#f8fafc] relative">
      <div className="absolute top-12 right-12 font-mono text-xs text-[#222] tracking-[0.2em] uppercase hidden lg:block">sec_id: deployment_history // 0xAF2</div>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <SectionLabel text="deployment history // sys.experience" />

        <div ref={ref} className={`mt-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Unified Architectural Chassis - Professional View */}
          <div className="relative border border-white/10 bg-[#020617] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
              {DATA.experience.map((job, i) => (
                <div 
                  key={i} 
                  className={`relative group hover:bg-white/[0.02] transition-all duration-700`}
                >
                  {/* Module ID - Muted */}
                  <div className="absolute top-8 left-10 font-mono text-xs text-white/10 group-hover:text-white/30 transition-colors tracking-[0.2em] uppercase">
                    exp_segment_0{i + 1}
                  </div>

                  <div className="px-6 md:px-12 py-10 md:py-16">
                    <div className="mb-10">
                       <div className="flex items-center gap-5 mb-6">
                          <div className="flex items-center gap-3 bg-black/40 px-3 py-1.5 border border-white/5 rounded-sm transition-all group-hover:border-[#6366f1]/40">
                            <div className={`w-[1px] h-3 ${job.status === 'active' ? 'bg-[#6366f1] shadow-[0_0_8px_#6366f180]' : 'bg-white/20'}`} />
                            <span className="font-mono text-xs text-white/30 tracking-[0.2em] uppercase group-hover:text-white/60">
                              {job.status}
                            </span>
                          </div>
                          <div className="font-mono text-xs text-white/10 uppercase hidden md:block tracking-widest">
                            #0x{hexIds[i]}
                          </div>
                        </div>
                        
                        <h3 className="text-[34px] md:text-[42px] font-bold tracking-tight capitalize text-white mb-2 leading-tight transition-colors duration-500 group-hover:text-[#6366f1]">
                          {job.company}
                        </h3>
                        <div className="font-sans text-base font-medium text-white/60 capitalize tracking-wide group-hover:text-white/90 transition-colors">{job.role}</div>
                        <div className="font-mono text-sm text-white/30 uppercase tracking-[0.2em] mt-3">{job.date}</div>
                    </div>

                    <div className="mt-8">
                      {/* Execution Logs - Full Width Focus */}
                      <div className="font-mono text-xs text-white/10 uppercase tracking-[0.2em] mb-5">trace_output</div>
                      <ul className="flex flex-col gap-3 font-sans text-sm text-white/70 leading-relaxed">
                        {job.logs?.map((log, idx) => (
                          <li key={idx} className="flex gap-3 group-hover:text-white/90 transition-all">
                            <span className="text-[#6366f1] shrink-0 font-bold mt-0.5">{'▹'}</span>
                            <span>{log}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Stack Tags */}
                      {job.tech && job.tech.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-white/5">
                          {job.tech.map((t, tIdx) => (
                            <span key={tIdx} className="px-3 py-1 font-mono text-xs text-[#6366f1]/70 border border-[#6366f1]/15 bg-[#6366f1]/5 rounded-sm group-hover:border-[#6366f1]/30 group-hover:text-[#6366f1] transition-colors">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
