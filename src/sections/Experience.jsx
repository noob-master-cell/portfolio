import { useMemo } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { DATA } from '../data/content';
import SectionLabel from '../components/ui/SectionLabel';

export default function Experience() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="experience" className="w-full py-24 md:py-[200px] bg-[#030712] text-[#f8fafc] relative">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <SectionLabel text="Professional Experience" />

        <div ref={ref} className={`mt-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Unified Architectural Chassis - Professional View */}
          <div className="relative border border-slate-800/80 bg-[#060810] shadow-2xl rounded-sm overflow-hidden">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800/80">
              {DATA.experience.map((job, i) => (
                <div 
                  key={i} 
                  className={`relative group hover:bg-white/[0.01] transition-all duration-500`}
                >
                  <div className="px-6 md:px-12 py-12 md:py-16">
                    <div className="mb-8">
                       <div className="flex items-center gap-3 mb-5">
                          {job.status === 'active' ? (
                            <div className="flex items-center gap-2 bg-emerald-500/10 px-2.5 py-1 border border-emerald-500/20 rounded-md">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              <span className="font-sans text-[10px] font-bold text-emerald-450 tracking-wider uppercase">
                                Active Position
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 bg-slate-800/40 px-2.5 py-1 border border-slate-700/30 rounded-md">
                              <span className="font-sans text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
                                Completed
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <h3 className="text-[32px] md:text-[38px] font-bold tracking-tight capitalize text-white mb-2 leading-tight transition-colors duration-500 group-hover:text-indigo-400">
                          {job.company}
                        </h3>
                        <div className="font-sans text-base font-medium text-slate-400 capitalize tracking-wide group-hover:text-slate-200 transition-colors">{job.role}</div>
                        <div className="font-mono text-xs text-indigo-400/80 uppercase tracking-widest mt-3 font-semibold">{job.date}</div>
                    </div>

                    <div className="mt-8">
                      <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-4 font-bold">Key Contributions & Impact</div>
                      <ul className="flex flex-col gap-3 font-sans text-sm text-slate-400 leading-relaxed">
                        {job.logs?.map((log, idx) => (
                          <li key={idx} className="flex gap-3 group-hover:text-slate-300 transition-all">
                            <span className="text-indigo-500 shrink-0 font-bold mt-0.5">{'▹'}</span>
                            <span>{log}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Stack Tags */}
                      {job.tech && job.tech.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-slate-800/60">
                          {job.tech.map((t, tIdx) => (
                            <span key={tIdx} className="px-3 py-1 font-mono text-xs text-indigo-450 border border-indigo-900/30 bg-indigo-950/20 rounded-md transition-colors group-hover:border-indigo-800/50 group-hover:text-indigo-400">
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
