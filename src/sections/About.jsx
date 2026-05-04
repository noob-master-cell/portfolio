import { useMemo } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { DATA } from '../data/content';
import SectionLabel from '../components/ui/SectionLabel';

export default function About() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });
  const barPattern = useMemo(() => [...Array(24)].map(() => Math.random() > 0.3), []);

  return (
    <section id="about" className="w-full py-16 md:py-[180px] bg-[#f8fafc] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] text-[#0f172a] relative border-y border-[#e2e8f0]">
      <div className="max-w-[1440px] mx-auto px-8 md:px-10 lg:px-12">
        <div className="font-mono text-xs uppercase tracking-[0.4em] mb-4 md:mb-12 text-black/30 select-none">about / system dossier</div>

        <div ref={ref} className="grid grid-cols-12 gap-8 lg:gap-12 mt-8 md:mt-24">
          
          {/* Column 1: Metadata Sidebar (col-span-12 md:col-span-3) */}
          <div className={`col-span-12 md:col-span-3 pr-0 md:pr-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="flex flex-col gap-10">
              <div>
                <div className="font-mono text-xs text-black/50 tracking-[0.2em] uppercase mb-4">/ operator_id</div>
                <h2 className="font-sans text-[36px] md:text-[46px] font-bold tracking-tight text-black leading-none uppercase">Dheeraj K.</h2>
              </div>
              
              <div className="space-y-8">
                 <div>
                    <div className="font-mono text-xs text-black/50 tracking-widest uppercase mb-1">origin_node</div>
                    <div className="font-mono text-sm text-[#1a1a1a] uppercase">{DATA.identity.location.replace(/ /g, '_')}</div>
                 </div>
                 <div>
                    <div className="font-mono text-xs text-black/50 tracking-widest uppercase mb-1">focus</div>
                    <div className="font-mono text-sm text-[#6366f1] font-bold uppercase tracking-wider">distributed_systems · ai</div>
                 </div>
                 <div className="pt-8 border-t border-black/10">
                    <div className="font-mono text-xs text-black/50 tracking-widest uppercase mb-4">authenticity_trace</div>
                    <div className="flex gap-[1.5px]">
                       {barPattern.map((isLight, i) => (
                         <div key={i} className={`w-0.5 h-4 ${isLight ? 'bg-black/10' : 'bg-[#6366f1]/60'}`} />
                       ))}
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Column 2: Profile Card (col-span-12 md:col-span-5) */}
          <div className={`col-span-12 md:col-span-5 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative border border-black/5 p-8 sm:p-10 md:p-14 bg-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)]">
              
              <div className="flex items-center gap-6 mb-12">
                <div className="w-12 h-12 rounded-full border border-black/10 p-1 relative group bg-[#fafafa]">
                   <div className="w-full h-full rounded-full bg-[#6366f1]/5 flex items-center justify-center overflow-hidden">
                      <div className="w-full h-[1px] bg-[#6366f1] animate-[scanline_3s_linear_infinite] opacity-30" />
                   </div>
                </div>
                <div>
                   <div className="font-mono text-xs text-black/50 tracking-widest uppercase">status</div>
                   <div className="font-mono text-sm text-[#6366f1] font-bold tracking-tight uppercase">identity_active</div>
                </div>
              </div>

              <div className="text-[26px] md:text-[34px] leading-[1.1] tracking-tighter font-sans text-black mb-8 font-medium">
                {DATA.about.quote}
              </div>
              
              <div className="pt-10 border-t border-black/10">
                 <p className="font-sans text-[16px] text-black/70 leading-relaxed tracking-wide">
                   {DATA.about.description}
                 </p>
              </div>
            </div>
          </div>

          {/* Column 3: Academic Timeline (col-span-12 md:col-span-4) */}
          <div className={`col-span-12 md:col-span-4 pl-0 md:pl-8 lg:pl-16 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative">
              <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-black/10" />
              
              <div className="flex flex-col gap-12 pl-10">
                {DATA.education.map((edu, i) => (
                  <div key={i} className="relative group">
                    <div className="absolute -left-[44.5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-black/20 bg-white group-hover:bg-[#6366f1] group-hover:border-[#6366f1] transition-all duration-500" />
                    <div className="font-sans text-[18px] md:text-[20px] font-bold text-black tracking-tight">{edu.degree}</div>
                    <div className="font-mono text-xs text-black/60 uppercase mt-1.5 tracking-widest">{edu.focus}</div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-5 gap-1 sm:gap-0">
                       <div className="font-mono text-xs text-black/40 uppercase tracking-tighter">{edu.school}</div>
                       <div className="font-mono text-xs text-[#6366f1]/80 font-bold group-hover:text-[#6366f1] transition-colors">{edu.date}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coursework Tag Field */}
              <div className="mt-20 pt-10 border-t border-black/10 pl-10">
                 <div className="font-mono text-xs text-black/50 tracking-[0.2em] uppercase font-bold mb-8">core_modules</div>
                 <div className="flex flex-wrap gap-2.5">
                    {DATA.coursework.map((course, i) => (
                      <span key={i} className="font-mono text-xs uppercase border border-black/10 px-3 py-1.5 bg-white text-black/60 hover:border-[#6366f1]/50 hover:text-[#6366f1] transition-all cursor-default">
                        {course.replace(/ /g, '_')}
                      </span>
                    ))}
                 </div>
              </div>

              {/* Certifications */}
              {DATA.certifications && DATA.certifications.length > 0 && (
                <div className="mt-12 pt-10 border-t border-black/10 pl-10">
                   <div className="font-mono text-xs text-black/50 tracking-[0.2em] uppercase font-bold mb-8">certifications</div>
                   <div className="flex flex-col gap-4">
                      {DATA.certifications.map((cert, i) => (
                        <div key={i} className="flex items-start gap-3 group">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#6366f1]/40 mt-1.5 shrink-0 group-hover:bg-[#6366f1] transition-colors" />
                          <div>
                            <div className="font-sans text-sm font-medium text-black tracking-tight">{cert.title}</div>
                            <div className="font-mono text-xs text-black/40 uppercase tracking-wider mt-0.5">{cert.issuer}{cert.date ? ` · ${cert.date}` : ''}</div>
                          </div>
                        </div>
                      ))}
                   </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
