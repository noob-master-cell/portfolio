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

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
        <SectionLabel text="Capabilities / Technical Stack" isDark={false} />

        {/* 3-column grid on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {skillCategories.map((skill, i) => {
            const isActive = activeIdx === i;
            const items = skill.items.split(', ');
            const icon = CATEGORY_ICONS[skill.category];

            return (
              <div
                key={i}
                onMouseEnter={() => setActiveIdx(i)}
                onMouseLeave={() => setActiveIdx(null)}
                className={`group relative border p-6 transition-all duration-300 rounded-[4px] cursor-default
                  ${isActive 
                    ? 'bg-white border-indigo-500/20 shadow-xl shadow-indigo-500/5' 
                    : 'bg-white/40 border-[#e2e8f0] hover:bg-white hover:border-indigo-500/10 hover:shadow-md'
                  }`}
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-5">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors
                    ${isActive ? 'bg-indigo-50 text-indigo-650' : 'bg-slate-100 text-slate-450 group-hover:text-indigo-500'}`}
                  >
                    {icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-black tracking-tight">{skill.category}</h3>
                    <span className={`font-mono text-[10px] uppercase tracking-wider transition-colors
                      ${isActive ? 'text-indigo-600 font-bold' : 'text-slate-400'}`}
                    >
                      {items.length} Technologies
                    </span>
                  </div>
                </div>

                {/* Skills as tags */}
                <div className="flex flex-wrap gap-2">
                  {items.map((item, j) => (
                    <span
                      key={j}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md border transition-all duration-205
                        ${isActive
                          ? 'bg-indigo-50/40 text-indigo-700 border-indigo-100/60'
                          : 'bg-white/80 text-slate-650 border-slate-100/80 group-hover:bg-indigo-50/20 group-hover:text-slate-800'
                        }`}
                      style={{ animationDelay: `${j * 30}ms` }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
}
