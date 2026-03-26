import { useState } from 'react';
import { DATA } from '../data/content';
import SectionLabel from '../components/ui/SectionLabel';

const Oscilloscope = ({ active }) => (
  <svg viewBox="0 0 100 40" className="w-24 h-8">
    <path
      d="M 0 20 Q 5 5 10 20 T 20 20 T 30 20 T 40 20 T 50 20 T 60 20 T 70 20 T 80 20 T 90 20 T 100 20"
      fill="none"
      stroke={active ? "#ff5722" : "#e5e5e5"}
      strokeWidth="1.2"
    >
      {active && (
        <animate
          attributeName="d"
          dur="1s"
          repeatCount="indefinite"
          values="
            M 0 20 Q 5 5 10 20 T 20 20 T 30 20 T 40 20 T 50 20 T 60 20 T 70 20 T 80 20 T 90 20 T 100 20;
            M 0 20 Q 5 35 10 20 T 20 20 T 30 20 T 40 20 T 50 20 T 60 20 T 70 20 T 80 20 T 90 20 T 100 20;
            M 0 20 Q 5 5 10 20 T 20 20 T 30 20 T 40 20 T 50 20 T 60 20 T 70 20 T 80 20 T 90 20 T 100 20
          "
        />
      )}
    </path>
  </svg>
);

const RadarScan = ({ active }) => (
  <svg viewBox="0 0 40 40" className="w-10 h-10">
    <circle cx="20" cy="20" r="18" fill="none" stroke="#e5e5e5" strokeWidth="1" />
    <circle cx="20" cy="20" r="10" fill="none" stroke="#e5e5e5" strokeWidth="1" />
    <line x1="20" y1="2" x2="20" y2="38" stroke="#e5e5e5" strokeWidth="1" />
    <line x1="2" y1="20" x2="38" y2="20" stroke="#e5e5e5" strokeWidth="1" />
    {active && (
      <g>
        <path d="M 20 20 L 20 2 A 18 18 0 0 1 38 20 Z" fill="url(#radarGradient)" />
        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff5722" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ff5722" stopOpacity="0" />
          </linearGradient>
        </defs>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 20 20"
          to="360 20 20"
          dur="2s"
          repeatCount="indefinite"
        />
      </g>
    )}
  </svg>
);

const SignalBars = ({ active }) => (
  <svg viewBox="0 0 40 30" className="w-10 h-8">
    {[5, 12, 19, 26].map((x, i) => (
      <rect
        key={i}
        x={x}
        y={30 - (i + 2) * 5}
        width="4"
        height={(i + 2) * 5}
        fill={active ? (i < 3 ? "#ff5722" : "#e5e5e5") : "#e5e5e5"}
      >
        {active && (
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur={`${0.5 + i * 0.2}s`}
            repeatCount="indefinite"
          />
        )}
      </rect>
    ))}
  </svg>
);

const ModuleIcon = ({ category, active }) => {
  if (category.toLowerCase().includes('backend')) return <Oscilloscope active={active} />;
  if (category.toLowerCase().includes('frontend')) return <RadarScan active={active} />;
  return <SignalBars active={active} />;
};

export default function Skills() {
  const [activeIdx, setActiveIdx] = useState(null);

  const skillCategories = DATA.about.skills;

  return (
    <section id="skills" className="w-full py-24 md:py-[150px] bg-[#f5f3ef] text-[#1a1a1a] relative overflow-hidden border-b border-[#eee]">
      {/* Neural Mesh Background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="mesh" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#000" />
              <line x1="2" y1="2" x2="100" y2="100" stroke="#000" strokeWidth="0.5" strokeDasharray="1 15" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mesh)" />
        </svg>
      </div>

      <div className="absolute top-12 right-12 font-mono text-[11px] text-black/30 tracking-[0.4em] uppercase hidden lg:block">mode: system_diagnostics // active</div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <SectionLabel text="capabilities / technical_stack" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-12 mt-20">
          {skillCategories.map((skill, i) => {
            const isActive = activeIdx === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setActiveIdx(i)}
                onMouseLeave={() => setActiveIdx(null)}
                className={`group relative border border-[#ddd] p-6 md:p-10 transition-all duration-500 bg-white/[0.4] hover:bg-white hover:border-[#ff5722] hover:shadow-2xl hover:shadow-black/5 overflow-hidden`}
              >
                {/* ID Label */}
                <div className="absolute top-0 right-0 px-5 py-2.5 border-l border-b border-black/5 font-mono text-[11px] text-black/40 group-hover:bg-[#ff5722] group-hover:text-white group-hover:border-[#ff5722] transition-colors">
                  MOD_0{i + 1}
                </div>

                <div className="flex flex-col md:flex-row gap-10 items-start">
                  {/* Left: Metadata & Monitor */}
                  <div className="w-full md:w-[140px] shrink-0">
                    <div className="font-mono mb-8">
                      <div className="text-[11px] text-[#ff5722] font-bold uppercase tracking-widest mb-1.5 whitespace-nowrap">status: {isActive ? 'active' : 'idle'}</div>
                      <div className="text-[16px] font-bold lowercase tracking-tight text-black">{skill.category}</div>
                    </div>
                    
                    <div className="flex items-center justify-center h-20 bg-black/[0.02] border border-dashed border-[#ddd] rounded-lg group-hover:border-[#ff5722]/30 transition-colors">
                      <ModuleIcon category={skill.category} active={isActive} />
                    </div>
                  </div>

                  {/* Right: Technical Readout */}
                  <div className="flex-1 w-full font-mono text-[12px]">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-full h-[1px] bg-black/5 group-hover:bg-[#ff5722]/30" />
                      <span className="text-[10px] uppercase tracking-[0.3em] text-black/40 whitespace-nowrap">data_stream: {skill.category.toLowerCase().replace(' ', '_')}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 font-mono">
                      {skill.items.split(', ').map((item, j) => (
                        <div key={j} className="flex items-center group/skill py-1 px-1 -ml-1 hover:bg-black/5 rounded-sm transition-colors">
                          <span className="text-[#ff5722] mr-2.5 opacity-0 group-hover:opacity-100 transition-opacity">»</span>
                          <span className={`text-[13px] ${isActive ? 'text-black' : 'text-black/70'} group-hover:text-black transition-colors font-medium`}>{item}</span>
                          <span className={`ml-auto text-[10px] tracking-tight ${isActive ? 'text-[#ff5722]' : 'text-black/20'} group-hover:text-[#ff5722]/80 transition-colors uppercase font-bold`}>
                            [stbl]
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Diagnostic Footer */}
                    <div className="mt-6 pt-4 border-t border-dashed border-[#ddd] flex justify-between items-center opacity-60 group-hover:opacity-100 transition-all">
                      <div className="flex gap-[1.5px]">
                        {[...Array(8)].map((_, dot) => (
                          <div key={dot} className={`w-[3px] h-3 ${isActive ? 'bg-[#ff5722]' : 'bg-[#ddd]'}`} />
                        ))}
                      </div>
                      <div className="text-[9px] uppercase tracking-widest text-[#888] font-bold">
                        {isActive ? 'bit_depth: 32bit' : 'sys_mode: idle'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#ddd] group-hover:border-[#ff5722]" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#ddd] group-hover:border-[#ff5722]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
