import { useEffect, useState } from 'react';

export default function ProfessionalSideNav() {
  const [activeSection, setActiveSection] = useState('home');
  const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];

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

    const sectionElements = document.querySelectorAll('section[id]');
    sectionElements.forEach((el) => observer.observe(el));

    return () => {
      sectionElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <nav 
      aria-label="Section Navigation" 
      className="fixed right-6 lg:right-12 top-1/2 -translate-y-1/2 z-[45] hidden xl:flex flex-col items-end gap-6 select-none pointer-events-auto"
    >
      <div className="flex flex-col items-end gap-5">
        <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-slate-800" />
        
        {sections.map((sec) => {
          const isActive = activeSection === sec;
          return (
            <a
              key={sec}
              href={`#${sec}`}
              className="group flex items-center gap-3 text-right cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(sec)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {/* Tooltip Label */}
              <span className={`font-mono text-[10px] uppercase tracking-[0.15em] font-semibold transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 ${
                isActive ? 'text-[#6366f1]' : 'text-slate-500'
              }`}>
                {sec}
              </span>

              {/* Minimalist dot indicator */}
              <div className="relative flex items-center justify-center w-5 h-5">
                {isActive ? (
                  <>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#6366f1]" />
                    <div className="absolute inset-0 border border-[#6366f1]/30 rounded-full scale-100 animate-[pulse-soft_2.5s_infinite]" />
                  </>
                ) : (
                  <div className="w-1 h-1 rounded-full bg-slate-800 group-hover:bg-[#6366f1]/60 group-hover:scale-125 transition-all duration-300" />
                )}
              </div>
            </a>
          );
        })}

        <div className="w-[1px] h-10 bg-gradient-to-t from-transparent to-slate-800" />
      </div>
    </nav>
  );
}
