import { useState, useEffect } from 'react';
import { DATA } from '../../data/content';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        // Trigger precisely when the section center crosses the viewport center
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0 
      }
    );
    
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((s) => observer.observe(s));
    
    // Manual override for top of page
    const handleScrollTop = () => {
      if (window.scrollY < 100) setActiveSection('home');
    };
    window.addEventListener('scroll', handleScrollTop);

    return () => {
      sections.forEach((s) => observer.unobserve(s));
      window.removeEventListener('scroll', handleScrollTop);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [menuOpen]);

  const navLinks = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];

  return (
    <>
      <nav aria-label="Main navigation" className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? 'bg-black/40 backdrop-blur-xl border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.1)] py-0' : 'bg-transparent py-6'}`}>
        {/* Subtle System Status Line (Top) */}
        {scrolled && <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#6366f1]/20 to-transparent" />}
        
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between font-mono text-sm uppercase tracking-widest text-white">
          {/* Logo / Identity */}
          <a href="#home" className="flex items-center gap-3 hover:opacity-70 transition-opacity relative z-50 group">
            <div className={`w-2 h-2 rounded-full ${activeSection === 'home' && !scrolled ? 'bg-[#6366f1]' : 'bg-[#6366f1]'} shadow-[0_0_8px_#6366f140]`} />
            <span className="text-xs font-bold tracking-[0.4em] text-white/90">DHEERAJ KARWASRA</span>
          </a>
          <div className="hidden sm:flex items-center gap-2 ml-2 px-3 py-1 border border-[#22c55e]/20 bg-[#22c55e]/5 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="font-mono text-[10px] text-[#22c55e] uppercase tracking-widest font-bold">Open to Work · EU</span>
          </div>
 
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-10 capitalize font-medium">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link}`}
                className={`transition-all duration-500 relative py-2 ${activeSection === link ? 'text-[#6366f1]' : 'text-white/40 hover:text-white'}`}
              >
                {link}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#6366f1] transition-all duration-500 ${activeSection === link ? 'opacity-100 scale-100 shadow-[0_0_8px_#6366f1]' : 'opacity-0 scale-0'}`} />
              </a>
            ))}
          </div>
 
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden relative z-50 text-white/60 hover:text-[#6366f1] transition-colors focus:outline-none font-mono text-xs uppercase tracking-widest"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? '[ close ]' : '[ menu ]'}
          </button>
        </div>
      </nav>
 
      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#030712]/98 backdrop-blur-3xl z-40 transition-transform duration-700 ease-[0.22,1,0.36,1] md:hidden flex flex-col justify-center px-12 ${menuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col gap-8 capitalize font-mono">
          <div className="text-xs text-[#6366f1] tracking-[0.2em] uppercase mb-6 border-b border-white/5 pb-4">
            terminal_access // links
          </div>
          {navLinks.map((link, i) => (
            <a
              key={link}
              href={`#${link}`}
              onClick={() => setMenuOpen(false)}
              className={`transition-all duration-500 flex items-center gap-6 text-2xl ${activeSection === link ? 'text-[#6366f1]' : 'text-white/30 hover:text-white'}`}
              style={{
                transitionDelay: menuOpen ? `${i * 50 + 200}ms` : '0ms',
                transform: menuOpen ? 'translateY(0)' : 'translateY(40px)',
                opacity: menuOpen ? 1 : 0,
              }}
            >
              <span className="text-xs text-white/10 w-8">0{i + 1}</span>
              {link}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
