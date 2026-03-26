import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { DATA } from '../data/content';
import SectionLabel from '../components/ui/SectionLabel';

export default function About() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section id="about" className="w-full py-[120px] md:py-[180px] bg-[#f5f3ef] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] text-[#1a1a1a] relative border-y border-[#ddd]">
       <div className="absolute top-12 right-12 font-mono text-[9px] text-[#ccc] tracking-[0.5em] uppercase hidden lg:block">dossier_id: dk_operator_p1 // encrypted</div>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <SectionLabel text="about / system dossier" />

        <div ref={ref} className="grid grid-cols-12 gap-8 lg:gap-12 mt-16 md:mt-24">
          
          {/* Column 1: Metadata Sidebar (col-span-12 md:col-span-3) */}
          <div className={`col-span-12 md:col-span-3 pr-0 md:pr-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="flex flex-col gap-10">
              <div>
                <div className="font-mono text-[10px] text-black/50 tracking-[0.4em] uppercase mb-4">/ operator_id</div>
                <h2 className="font-sans text-[36px] md:text-[46px] font-bold tracking-tight text-black leading-none uppercase">Dheeraj K.</h2>
              </div>
              
              <div className="space-y-8">
                 <div>
                    <div className="font-mono text-[10px] text-black/50 tracking-widest uppercase mb-1">origin_node</div>
                    <div className="font-mono text-[11px] text-[#1a1a1a] uppercase">{DATA.identity.location.replace(' ', '_')}</div>
                 </div>
                 <div>
                    <div className="font-mono text-[10px] text-black/50 tracking-widest uppercase mb-1">privilege</div>
                    <div className="font-mono text-[12px] text-[#ff5722] font-bold uppercase tracking-wider">root_administrator</div>
                 </div>
                 <div className="pt-8 border-t border-black/10">
                    <div className="font-mono text-[10px] text-black/50 tracking-widest uppercase mb-4">authenticity_trace</div>
                    <div className="flex gap-[1.5px]">
                       {[...Array(24)].map((_, i) => (
                         <div key={i} className={`w-0.5 h-4 ${Math.random() > 0.3 ? 'bg-black/10' : 'bg-[#ff5722]/60'}`} />
                       ))}
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Column 2: Profile Card (col-span-12 md:col-span-5) */}
          <div className={`col-span-12 md:col-span-5 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative border border-black/5 p-10 md:p-14 bg-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)]">
              
              <div className="flex items-center gap-6 mb-12">
                <div className="w-12 h-12 rounded-full border border-black/10 p-1 relative group bg-[#fafafa]">
                   <div className="w-full h-full rounded-full bg-[#ff5722]/5 flex items-center justify-center overflow-hidden">
                      <div className="w-full h-[1px] bg-[#ff5722] animate-[scanline_3s_linear_infinite] opacity-30" />
                   </div>
                </div>
                <div>
                   <div className="font-mono text-[10px] text-black/50 tracking-widest uppercase">status</div>
                   <div className="font-mono text-[12px] text-[#ff5722] font-bold tracking-tight uppercase">identity_active</div>
                </div>
              </div>

              <div className="text-[26px] md:text-[34px] leading-[1.1] tracking-tighter font-sans text-black mb-8 font-medium">
                {DATA.about.quote}
              </div>
              
              <div className="pt-10 border-t border-black/10">
                 <p className="font-sans text-[16px] text-black/70 leading-relaxed tracking-wide">
                   system initialization complete. human interface modules deployed in deep learning, distributed backend systems, and architectural design. seeking high-impact engineering challenges.
                 </p>
              </div>
            </div>
          </div>

          {/* Column 3: Academic Timeline (col-span-12 md:col-span-4) */}
          <div className={`col-span-12 md:col-span-4 pl-0 md:pl-20 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative">
              <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-black/10" />
              
              <div className="flex flex-col gap-12 pl-10">
                {DATA.education.map((edu, i) => (
                  <div key={i} className="relative group">
                    <div className="absolute -left-[44.5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-black/20 bg-white group-hover:bg-[#ff5722] group-hover:border-[#ff5722] transition-all duration-500" />
                    <div className="font-sans text-[18px] md:text-[20px] font-bold text-black tracking-tight">{edu.degree}</div>
                    <div className="font-mono text-[11px] text-black/60 uppercase mt-1.5 tracking-widest">{edu.focus}</div>
                    <div className="flex justify-between items-center mt-5">
                       <div className="font-mono text-[11px] text-black/40 uppercase tracking-tighter">{edu.school}</div>
                       <div className="font-mono text-[11px] text-[#ff5722]/80 font-bold group-hover:text-[#ff5722] transition-colors">{edu.date}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coursework Tag Field */}
              <div className="mt-20 pt-10 border-t border-black/10 pl-10">
                 <div className="font-mono text-[10px] text-black/50 tracking-[0.4em] uppercase font-bold mb-8">core_modules</div>
                 <div className="flex flex-wrap gap-2.5">
                    {DATA.coursework.map((course, i) => (
                      <span key={i} className="font-mono text-[10px] uppercase border border-black/10 px-3 py-1.5 bg-white text-black/60 hover:border-[#ff5722]/50 hover:text-[#ff5722] transition-all cursor-default">
                        {course.replace(' ', '_')}
                      </span>
                    ))}
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
