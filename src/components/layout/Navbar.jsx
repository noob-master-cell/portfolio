import { useState, useEffect } from 'react';

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
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((s) => observer.observe(s));

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
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const navLinks = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0a0a0a]/80 backdrop-blur-md border-b border-neutral-900'
            : 'bg-transparent'
        }`}
      >
        <div className="container-shell h-16 flex items-center justify-between">
          <a
            href="#home"
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-mono text-sm font-medium text-white">
              dheeraj.k
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8 font-mono text-sm">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link}`}
                className={`transition-colors ${
                  activeSection === link
                    ? 'text-white'
                    : 'text-neutral-500 hover:text-white'
                }`}
              >
                {link}
              </a>
            ))}
          </div>

          <button
            className="md:hidden text-neutral-300 font-mono text-sm"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? 'close' : 'menu'}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-[#0a0a0a]/95 backdrop-blur-md z-40 transition-transform duration-500 md:hidden flex flex-col justify-center px-10 ${
          menuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex flex-col gap-6 font-mono">
          {navLinks.map((link, i) => (
            <a
              key={link}
              href={`#${link}`}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-5 text-2xl transition-colors ${
                activeSection === link ? 'text-white' : 'text-neutral-500 hover:text-white'
              }`}
            >
              <span className="text-xs text-neutral-700 w-6">0{i + 1}</span>
              {link}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
