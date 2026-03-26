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
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? 'bg-black/40 backdrop-blur-xl border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.1)] py-0' : 'bg-transparent py-6'}`}>
        {/* Subtle System Status Line (Top) */}
        {scrolled && <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ff5722]/20 to-transparent" />}
        
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-white">
          {/* Logo / Identity */}
          <a href="#home" className="flex items-center gap-3 hover:opacity-70 transition-opacity relative z-50 group">
            <div className={`w-2 h-2 rounded-full ${activeSection === 'home' && !scrolled ? 'bg-[#ff5722]' : 'bg-[#ff5722]'} shadow-[0_0_8px_#ff572240]`} />
            <span className="text-[10px] font-bold tracking-[0.4em] text-white/90">DHEERAJ KARWASRA</span>
          </a>
 
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-10 lowercase font-medium">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link}`}
                className={`transition-all duration-500 relative py-2 ${activeSection === link ? 'text-[#ff5722]' : 'text-white/40 hover:text-white'}`}
              >
                {link}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#ff5722] transition-all duration-500 ${activeSection === link ? 'opacity-100 scale-100 shadow-[0_0_8px_#ff5722]' : 'opacity-0 scale-0'}`} />
              </a>
            ))}
          </div>
 
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden relative z-50 text-white/60 hover:text-[#ff5722] transition-colors focus:outline-none font-mono text-[10px] uppercase tracking-widest"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '[ close ]' : '[ menu ]'}
          </button>
        </div>
      </nav>
 
      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#0d0d0d]/98 backdrop-blur-3xl z-40 transition-transform duration-700 ease-[0.22,1,0.36,1] md:hidden flex flex-col justify-center px-12 ${menuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col gap-8 lowercase font-mono">
          <div className="text-[10px] text-[#ff5722] tracking-[0.5em] uppercase mb-6 border-b border-white/5 pb-4">
            terminal_access // links
          </div>
          {navLinks.map((link, i) => (
            <a
              key={link}
              href={`#${link}`}
              onClick={() => setMenuOpen(false)}
              className={`transition-all duration-500 flex items-center gap-6 text-2xl ${activeSection === link ? 'text-[#ff5722]' : 'text-white/30 hover:text-white'}`}
              style={{
                transitionDelay: menuOpen ? `${i * 50 + 200}ms` : '0ms',
                transform: menuOpen ? 'translateY(0)' : 'translateY(40px)',
                opacity: menuOpen ? 1 : 0,
              }}
            >
              <span className="text-[11px] text-white/10 w-8">0{i + 1}</span>
              {link}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
