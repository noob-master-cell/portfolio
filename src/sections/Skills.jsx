import { useState } from 'react';
import { DATA } from '../data/content';
import SectionLabel from '../components/ui/SectionLabel';

/* ── Skill icon mapping ── */
const CATEGORY_ICONS = {
  'Languages': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  'Backend & Cloud': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" />
      <circle cx="6" cy="6" r="1" fill="currentColor" /><circle cx="6" cy="18" r="1" fill="currentColor" />
    </svg>
  ),
  'Frontend': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  'Databases': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  'AI & ML': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.4V11h3a3 3 0 0 1 3 3v1.6c1.2.6 2 1.9 2 3.4a4 4 0 0 1-8 0c0-1.5.8-2.8 2-3.4V14a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v1.6c1.2.6 2 1.9 2 3.4a4 4 0 0 1-8 0c0-1.5.8-2.8 2-3.4V14a3 3 0 0 1 3-3h3V9.4C7.8 8.8 7 7.5 7 6a4 4 0 0 1 5-3.9" />
    </svg>
  ),
  'Core CS': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
};

export default function Skills() {
  const [activeIdx, setActiveIdx] = useState(null);
  const skillCategories = DATA.about.skills;

  return (
    <section id="skills" className="w-full py-24 md:py-32 bg-[#f8fafc] text-[#0f172a] relative overflow-hidden border-b border-[#e2e8f0]">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="skillGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#000" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#skillGrid)" />
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <SectionLabel text="capabilities / technical_stack" />

        {/* 3-column grid on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
          {skillCategories.map((skill, i) => {
            const isActive = activeIdx === i;
            const items = skill.items.split(', ');
            const icon = CATEGORY_ICONS[skill.category];

            return (
              <div
                key={i}
                onMouseEnter={() => setActiveIdx(i)}
                onMouseLeave={() => setActiveIdx(null)}
                className={`group relative border p-5 transition-all duration-300 cursor-default
                  ${isActive 
                    ? 'bg-white border-[#6366f1]/30 shadow-lg shadow-[#6366f1]/5' 
                    : 'bg-white/40 border-[#e2e8f0] hover:bg-white hover:border-[#6366f1]/20 hover:shadow-md'
                  }`}
              >
                {/* Module ID */}
                <div className={`absolute top-0 right-0 px-3 py-1.5 border-l border-b font-mono text-[10px] tracking-wider transition-colors
                  ${isActive ? 'bg-[#6366f1] text-white border-[#6366f1]' : 'border-[#e2e8f0] text-black/25'}`}
                >
                  MOD_0{i + 1}
                </div>

                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors
                    ${isActive ? 'bg-[#6366f1]/10 text-[#6366f1]' : 'bg-black/[0.03] text-black/30 group-hover:text-[#6366f1]/60'}`}
                  >
                    {icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-black tracking-tight">{skill.category}</h3>
                    <span className={`font-mono text-[10px] uppercase tracking-widest transition-colors
                      ${isActive ? 'text-[#6366f1]' : 'text-black/30'}`}
                    >
                      {items.length} modules loaded
                    </span>
                  </div>
                </div>

                {/* Skills as tags */}
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item, j) => (
                    <span
                      key={j}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-200
                        ${isActive
                          ? 'bg-[#6366f1]/[0.06] text-[#4338ca] border border-[#6366f1]/15'
                          : 'bg-black/[0.03] text-black/60 border border-transparent group-hover:bg-[#6366f1]/[0.04] group-hover:text-black/70'
                        }`}
                      style={{ animationDelay: `${j * 30}ms` }}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Bottom status bar */}
                <div className="mt-4 pt-3 border-t border-dashed border-[#e2e8f0] flex items-center justify-between">
                  <div className="flex gap-[2px]">
                    {items.map((_, dot) => (
                      <div
                        key={dot}
                        className={`w-[3px] h-2.5 rounded-[1px] transition-colors duration-300
                          ${isActive ? 'bg-[#6366f1]' : 'bg-[#ddd]'}`}
                        style={{ transitionDelay: `${dot * 40}ms` }}
                      />
                    ))}
                  </div>
                  <span className={`font-mono text-[10px] uppercase tracking-widest font-bold transition-colors
                    ${isActive ? 'text-[#6366f1]' : 'text-black/20'}`}>
                    {isActive ? 'active' : 'standby'}
                  </span>
                </div>

                {/* Corner accents */}
                <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l transition-colors ${isActive ? 'border-[#6366f1]' : 'border-[#ddd]'}`} />
                <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r transition-colors ${isActive ? 'border-[#6366f1]' : 'border-[#ddd]'}`} />
              </div>
            );
          })}
        </div>

        {/* Coursework strip */}
        {DATA.coursework && (
          <div className="mt-8 border border-[#e2e8f0] bg-white/40 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-[#6366f1] rounded-full" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-black/40 font-bold">Relevant Coursework</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {DATA.coursework.map((course, i) => (
                <span key={i} className="px-3 py-1 text-xs font-medium text-black/50 bg-black/[0.02] border border-[#e2e8f0] rounded-md hover:text-[#6366f1] hover:border-[#6366f1]/20 hover:bg-[#6366f1]/[0.03] transition-colors cursor-default">
                  {course}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
