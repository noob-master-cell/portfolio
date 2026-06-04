import { useState, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { DATA } from '../data/content';
import HeroVisualizer from '../components/diagrams/HeroVisualizer';
import LinkItem from '../components/ui/LinkItem';
import EmbeddedTerminal from '../components/terminal/EmbeddedTerminal';
import { Icons } from '../components/ui/Icons';

export default function Hero() {
  const [ref, isVisible] = useIntersectionObserver();
  const [showTerminal, setShowTerminal] = useState(false);

  useEffect(() => {
    const handle = (e) => {
      setShowTerminal(false);
      setTimeout(() => {
        document.getElementById(e.detail.section)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    };
    window.addEventListener('terminal-navigate', handle);
    return () => window.removeEventListener('terminal-navigate', handle);
  }, []);

  return (
    <section id="home" className="relative w-full h-screen bg-[#030712] text-[#f8fafc] flex items-center overflow-hidden">
      {/* Background Soft Spotlight */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
        <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 grid grid-cols-12 gap-8 items-center relative z-10">
        <div
          ref={ref}
          className={`col-span-12 md:col-start-2 md:col-span-6 flex flex-col justify-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
        >
          <div className="font-mono text-xs text-slate-500 mb-6 tracking-widest uppercase flex items-center gap-2">
            <span className="w-8 h-[1px] bg-slate-800 hidden sm:block shrink-0" />
            <span className="hidden sm:inline">{DATA.identity.title}</span>
            <span className="sm:hidden">{DATA.identity.name}</span>
          </div>
          <h1 className="text-[46px] sm:text-[64px] md:text-[80px] leading-[0.95] md:leading-[0.9] tracking-tighter font-bold mb-6 capitalize text-white">
            {DATA.identity.name}
          </h1>
          <p className="font-sans text-base md:text-lg text-slate-400 max-w-lg leading-relaxed mb-10 border-l border-indigo-500 pl-6 py-1">
            {DATA.identity.tagline}
          </p>
          
          <div className="flex flex-wrap gap-4 items-center mb-10 md:mb-12">
            {/* Interactive Shell Button (Primary) */}
            <button 
              onClick={() => setShowTerminal(true)}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-[4px] uppercase tracking-wider flex items-center gap-2 transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 cursor-pointer"
            >
              <Icons.Terminal width={14} height={14} />
              Open Interactive Shell
            </button>

            {/* Resume Button (Secondary) */}
            {DATA.identity.resume && (
              <a 
                href={DATA.identity.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-slate-300 hover:text-white font-medium text-xs rounded-[4px] uppercase tracking-wider flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                <Icons.Download width={14} height={14} />
                Download Resume
              </a>
            )}
            
            <div className="flex gap-6 ml-2">
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
          <div className="absolute inset-0 bg-black/75 backdrop-blur-md" onClick={() => setShowTerminal(false)} />
          <div className="relative w-full max-w-4xl max-h-[80vh] bg-[#090b11] border border-slate-800 shadow-2xl rounded-lg overflow-hidden flex flex-col">
             <div className="h-10 bg-[#0d1017] border-b border-slate-900 flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-2">
                  <button onClick={() => setShowTerminal(false)} className="w-3 h-3 rounded-full bg-[#ff5f56] hover:opacity-80 transition-opacity" aria-label="Close terminal" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">guest@dkarwasra — interactive_shell</span>
                <div className="w-16" />
             </div>
             <div className="flex-1 overflow-hidden">
                <EmbeddedTerminal />
             </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[10px] text-slate-500 tracking-[0.25em] uppercase flex flex-col items-center gap-3">
        <span>scroll to explore</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-indigo-500 to-transparent animate-bounce" />
      </div>
      
      <div className="absolute bottom-10 left-6 lg:left-12 font-mono text-[10px] text-slate-500 tracking-widest uppercase">
          location: {DATA.identity.location.toUpperCase()}
      </div>
    </section>
  );
}
