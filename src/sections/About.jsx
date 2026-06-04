import { useMemo } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { DATA } from '../data/content';
import SectionLabel from '../components/ui/SectionLabel';

export default function About() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });
  const barPattern = useMemo(() => [...Array(24)].map(() => Math.random() > 0.3), []);

  return (
    <section id="about" className="w-full py-16 md:py-[180px] bg-[#f8fafc] bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] text-[#0f172a] relative border-y border-[#e2e8f0]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <SectionLabel text="About / Professional Profile" isDark={false} />

        <div ref={ref} className="grid grid-cols-12 gap-8 lg:gap-12 mt-8 md:mt-24">
          
          {/* Column 1: Metadata Sidebar */}
          <div className={`col-span-12 md:col-span-3 pr-0 md:pr-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="flex flex-col gap-10">
              <div>
                <div className="font-mono text-xs text-slate-500 tracking-widest uppercase mb-3">Identity</div>
                <h2 className="font-sans text-[32px] md:text-[40px] font-bold tracking-tight text-black leading-none uppercase">{DATA.identity.name}</h2>
              </div>
              
              <div className="space-y-6">
                 <div>
                    <div className="font-mono text-xs text-slate-400 tracking-widest uppercase mb-1">Location</div>
                    <div className="font-sans text-sm text-slate-800 font-medium">{DATA.identity.location}</div>
                 </div>
                 <div>
                    <div className="font-mono text-xs text-slate-400 tracking-widest uppercase mb-1">Research Focus</div>
                    <div className="font-sans text-sm text-indigo-600 font-bold uppercase tracking-wider">Distributed Systems · AI</div>
                 </div>
              </div>
            </div>
          </div>

          {/* Column 2: Profile Card */}
          <div className={`col-span-12 md:col-span-5 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative border border-slate-100 p-8 sm:p-10 md:p-14 bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] rounded-[4px]">
              
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
                </div>
                <div>
                   <div className="font-mono text-[10px] text-slate-400 tracking-widest uppercase">Status</div>
                   <div className="font-sans text-xs text-slate-800 font-semibold uppercase tracking-wider">Active & Available</div>
                </div>
              </div>

              <div className="text-[24px] md:text-[30px] leading-[1.2] tracking-tighter font-sans text-black mb-8 font-medium">
                {DATA.about.quote}
              </div>
              
              <div className="pt-8 border-t border-slate-100">
                 <p className="font-sans text-[15px] text-slate-600 leading-relaxed tracking-wide">
                   {DATA.about.description}
                 </p>
              </div>
            </div>
          </div>

          {/* Column 3: Academic Timeline */}
          <div className={`col-span-12 md:col-span-4 pl-0 md:pl-8 lg:pl-16 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative">
              <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-slate-200" />
              
              <div className="flex flex-col gap-12 pl-10">
                {DATA.education.map((edu, i) => (
                  <div key={i} className="relative group">
                    <div className="absolute -left-[44.5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-slate-300 bg-white group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all duration-500" />
                    <div className="font-sans text-[18px] md:text-[20px] font-bold text-black tracking-tight">{edu.degree}</div>
                    <div className="font-mono text-xs text-slate-500 mt-1.5 tracking-wider">{edu.focus}</div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-5 gap-1 sm:gap-0">
                       <div className="font-mono text-xs text-slate-400 uppercase tracking-tighter">{edu.school}</div>
                       <div className="font-mono text-xs text-indigo-600 font-bold group-hover:text-indigo-500 transition-colors">{edu.date}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coursework Tag Field */}
              <div className="mt-16 pt-10 border-t border-slate-200 pl-10">
                 <div className="font-mono text-xs text-slate-500 tracking-widest uppercase font-bold mb-6">Academic Focus</div>
                 <div className="flex flex-wrap gap-2">
                    {DATA.coursework.map((course, i) => (
                      <span key={i} className="font-sans text-xs border border-slate-250 px-3 py-1.5 bg-white rounded-md text-slate-650 hover:border-indigo-500 hover:text-indigo-600 transition-all cursor-default shadow-sm">
                        {course}
                      </span>
                    ))}
                 </div>
              </div>

              {/* Certifications */}
              {DATA.certifications && DATA.certifications.length > 0 && (
                <div className="mt-12 pt-10 border-t border-slate-200 pl-10">
                   <div className="font-mono text-xs text-slate-500 tracking-widest uppercase font-bold mb-6">Certifications</div>
                   <div className="flex flex-col gap-4">
                      {DATA.certifications.map((cert, i) => (
                        <div key={i} className="flex items-start gap-3 group">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-600/30 mt-1.5 shrink-0 group-hover:bg-indigo-600 transition-colors" />
                          <div>
                            <div className="font-sans text-sm font-medium text-black tracking-tight">{cert.title}</div>
                            <div className="font-mono text-xs text-slate-400 tracking-wider mt-0.5">{cert.issuer}{cert.date ? ` · ${cert.date}` : ''}</div>
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
