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
      aria-label="Section navigation"
      className="fixed right-8 top-1/2 -translate-y-1/2 z-[45] hidden xl:flex flex-col items-end gap-4 select-none"
    >
      {sections.map((sec) => {
        const isActive = activeSection === sec;
        return (
          <a
            key={sec}
            href={`#${sec}`}
            className="group flex items-center gap-3 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(sec)?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span
              className={`font-mono text-xs transition-opacity duration-300 ${
                isActive ? 'opacity-100 text-white' : 'opacity-0 group-hover:opacity-100 text-neutral-500'
              }`}
            >
              {sec}
            </span>
            <div
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-1.5 h-1.5 bg-white'
                  : 'w-1 h-1 bg-neutral-700 group-hover:bg-neutral-400'
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}
