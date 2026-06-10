import { useState, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { DATA } from '../data/content';
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
    <section
      id="home"
      className="relative w-full bg-[#0a0a0a] text-[#ededed] flex items-center overflow-hidden"
      style={{ minHeight: 'var(--hero-min-h)' }}
    >
      <div className="container-shell relative z-10">
        <div
          ref={ref}
          className={`max-w-3xl transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 soft-pulse" />
            <span className="font-mono text-xs text-neutral-400">
              Open to work in Germany and the EU
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white mb-6 leading-[1.05]">
            {DATA.identity.name}
          </h1>

          <p className="font-sans text-lg text-neutral-400 mb-3">
            {DATA.identity.title}
          </p>

          <p className="font-sans text-base text-neutral-500 max-w-2xl leading-relaxed mb-12">
            {DATA.identity.tagline}
          </p>

          <div className="flex flex-wrap gap-3 items-center mb-12">
            <a
              href={`mailto:${DATA.identity.email}`}
              className="px-5 py-2.5 bg-white text-black font-medium text-sm rounded-md flex items-center gap-2 hover:bg-neutral-200 transition-colors"
            >
              <Icons.Mail width={14} height={14} />
              Get in touch
            </a>

            {DATA.identity.resume && (
              <a
                href={DATA.identity.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-transparent border border-neutral-800 text-neutral-300 font-medium text-sm rounded-md flex items-center gap-2 hover:border-neutral-600 hover:text-white transition-colors"
              >
                <Icons.Download width={14} height={14} />
                Resume
              </a>
            )}

            <button
              onClick={() => setShowTerminal(true)}
              className="px-5 py-2.5 bg-transparent border border-neutral-800 text-neutral-300 font-medium text-sm rounded-md flex items-center gap-2 hover:border-neutral-600 hover:text-white transition-colors cursor-pointer"
            >
              <Icons.Terminal width={14} height={14} />
              Open terminal
            </button>
          </div>

          <div className="flex gap-6 font-mono text-xs text-neutral-500">
            {DATA.identity.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {showTerminal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowTerminal(false)}
          />
          <div className="relative w-full max-w-4xl max-h-[80vh] bg-[#0a0a0a] border border-neutral-800 rounded-lg overflow-hidden flex flex-col shadow-2xl">
            <div className="h-9 bg-[#111] border-b border-neutral-800 flex items-center justify-between px-4 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowTerminal(false)}
                  className="w-3 h-3 rounded-full bg-[#ff5f56] hover:opacity-80"
                  aria-label="Close terminal"
                />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <span className="font-mono text-xs text-neutral-500">
                guest@dkarwasra
              </span>
              <div className="w-16" />
            </div>
            <div className="flex-1 overflow-hidden">
              <EmbeddedTerminal />
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-8 left-0 right-0 px-[var(--section-px)] max-w-[var(--container-max)] mx-auto flex items-center justify-between font-mono text-xs text-neutral-600">
        <span>{DATA.identity.location}</span>
        <span className="hidden sm:inline">scroll</span>
      </div>
    </section>
  );
}
