import { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { DATA } from '../data/content';
import HeroVisualizer from '../components/diagrams/HeroVisualizer';
import LinkItem from '../components/ui/LinkItem';
import EmbeddedTerminal from '../components/terminal/EmbeddedTerminal';
import { Icons } from '../components/ui/Icons';

export default function Hero() {
  const [ref, isVisible] = useIntersectionObserver();
  const [showTerminal, setShowTerminal] = useState(false);

  return (
    <section id="home" className="relative w-full h-screen bg-[#030712] text-[#f8fafc] flex items-center overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,#fff_50%)] bg-[size:100%_4px] animate-[scanline_10s_linear_infinite]" />
      </div>

      <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 grid grid-cols-12 gap-8 items-center relative z-10">
        <div
          ref={ref}
          className={`col-span-12 md:col-start-2 md:col-span-6 flex flex-col justify-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
        >
          <div className="font-mono text-xs text-[#666] mb-8 tracking-widest uppercase flex items-center gap-2">
            <span className="w-8 h-[1px] bg-[#333]" />
            {DATA.identity.title} — 2026
          </div>
          <h1 className="text-[42px] sm:text-[60px] md:text-[86px] leading-[0.9] md:leading-[0.85] tracking-tighter font-bold mb-8 md:mb-10 capitalize text-white">
            {DATA.identity.name}
          </h1>
          <p className="font-mono text-sm md:text-base text-slate-400 max-w-md leading-relaxed mb-12 border-l-2 border-[#6366f1] pl-6 py-1">
            &quot;{DATA.identity.tagline}&quot;
          </p>
          
          <div className="flex flex-wrap gap-8 md:gap-10 items-center mb-20 md:mb-16">
            <button 
              onClick={() => setShowTerminal(true)}
              className="group flex items-center gap-4 cursor-pointer relative"
            >
              {/* Pulsing Status Ring */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[#6366f1] animate-ping opacity-20" />
                <div className="w-10 h-10 rounded-full border border-[#6366f1]/60 flex items-center justify-center group-hover:bg-[#6366f1] group-hover:border-[#6366f1] transition-all duration-500 shadow-[0_0_15px_rgba(99,102,241,0.1)] group-hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]">
                  <Icons.Terminal width={14} height={14} className="text-[#6366f1] group-hover:text-white transition-colors" />
                </div>
                {/* Status LED */}
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#6366f1] border-2 border-[#030712] animate-pulse" />
              </div>

              <div className="flex flex-col items-start gap-1">
                <span className="font-mono text-xs text-[#6366f1] uppercase tracking-[0.2em] font-bold group-hover:text-white transition-colors">
                  [ system_terminal // initialize ]
                </span>
                <span className="font-mono text-xs text-[#444] uppercase tracking-widest group-hover:text-[#666] transition-colors">
                  access_shell_control_v4.0
                </span>
              </div>
            </button>

            {/* Resume Button */}
            {DATA.identity.resume && (
              <a 
                href={DATA.identity.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 cursor-pointer relative"
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/30 transition-all duration-500">
                    <Icons.Download width={14} height={14} className="text-white/40 group-hover:text-white transition-colors" />
                  </div>
                </div>

                <div className="flex flex-col items-start gap-1">
                  <span className="font-mono text-xs text-white/60 uppercase tracking-[0.2em] font-bold group-hover:text-white transition-colors">
                    [ fetch_resume // pdf ]
                  </span>
                  <span className="font-mono text-xs text-[#444] uppercase tracking-widest group-hover:text-[#666] transition-colors">
                    download_dossier
                  </span>
                </div>
              </a>
            )}
            
            <div className="flex gap-8">
              {DATA.identity.links.map((link) => (
                <LinkItem key={link.label} href={link.url} label={link.label} />
              ))}
            </div>
          </div>
        </div>

        <div className={`col-span-12 md:col-span-5 h-[50vh] md:h-[60vh] relative hidden md:block transition-all duration-700 ${showTerminal ? 'opacity-20 scale-95 grayscale' : 'opacity-100 scale-100'}`}>
          <HeroVisualizer />
        </div>
      </div>

      {/* Terminal HUD Overlay */}
      {showTerminal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 md:p-12 animate-in fade-in zoom-in duration-500">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowTerminal(false)} />
          <div className="relative w-full max-w-4xl max-h-[80vh] bg-[#030712] border border-[#6366f1]/30 shadow-[0_0_50px_rgba(99,102,241,0.2)] rounded-lg overflow-hidden flex flex-col">
             <div className="h-10 bg-[#111] border-b border-[#333] flex items-center justify-between px-6">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#6366f1] animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#666]">secure_shell // session_active</span>
                </div>
                <button 
                  onClick={() => setShowTerminal(false)}
                  className="text-[#666] hover:text-white transition-colors"
                  aria-label="Close terminal"
                >
                  <Icons.X width={18} height={18} />
                </button>
             </div>
             <div className="flex-1 overflow-hidden">
                <EmbeddedTerminal />
             </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-xs text-[#444] tracking-[0.3em] uppercase flex flex-col items-center gap-4">
        <span>scroll protocol</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#6366f1] to-transparent animate-bounce" />
      </div>
      
      <div className="absolute bottom-12 left-6 lg:left-12 font-mono text-xs text-[#555] tracking-widest uppercase">
          geoloc: {DATA.identity.location.toLowerCase().replace(/ /g, '_')}
      </div>
      <div className="absolute top-12 left-1/2 -translate-x-1/2 font-mono text-xs text-[#222] tracking-[0.5em] uppercase hidden lg:block">
          encryption_active // system_secure
      </div>
    </section>
  );
}
