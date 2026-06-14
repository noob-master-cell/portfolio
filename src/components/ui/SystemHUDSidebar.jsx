import { useEffect, useState, useRef } from 'react';

export default function SystemHUDSidebar() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('home');
  const [latency, setLatency] = useState(12);
  const canvasRef = useRef(null);

  const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];

  useEffect(() => {
    // Latency fluctuation simulator
    const interval = setInterval(() => {
      setLatency(prev => {
        const diff = (Math.random() - 0.5) * 4;
        return Math.max(8, Math.min(24, Math.round(prev + diff)));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (currentScrollY / docHeight) * 100 : 0;
      setScrollPercent(Math.round(percent));
    };

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Intersection observer for section tracking
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
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      sectionElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Micro diagnostic canvas visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let offset = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
      ctx.lineWidth = 1;
      
      // Draw grid pattern inside micro widget
      ctx.beginPath();
      for (let i = 0; i < canvas.width; i += 8) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
      }
      ctx.stroke();

      // Dynamic sine-like system wave
      ctx.beginPath();
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 1.5;
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin(x * 0.1 + offset) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      offset += 0.05;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="fixed right-6 lg:right-12 top-1/2 -translate-y-1/2 z-[45] hidden xl:flex flex-col items-end gap-8 select-none pointer-events-none">
      
      {/* Dynamic Telemetry Box */}
      <div className="flex flex-col gap-2 p-4 bg-[#030712]/75 border border-white/5 backdrop-blur-md font-mono text-[9px] text-[#444] min-w-[130px] rounded-[2px] transition-all duration-300 pointer-events-auto hover:border-[#6366f1]/20">
        <div className="flex justify-between items-center border-b border-white/5 pb-1.5 mb-1">
          <span className="text-[#6366f1] font-bold">SYSTEM_HUD</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
        </div>
        
        <div className="flex justify-between">
          <span>Y_COORD</span>
          <span className="text-[#888] font-semibold">{scrollY}px</span>
        </div>

        <div className="flex justify-between">
          <span>CURSOR</span>
          <span className="text-[#888] font-semibold">{mousePos.x}, {mousePos.y}</span>
        </div>

        <div className="flex justify-between">
          <span>LATENCY</span>
          <span className="text-[#888] font-semibold">{latency}ms</span>
        </div>

        <div className="flex justify-between">
          <span>LOAD_PCT</span>
          <span className="text-[#6366f1] font-bold">{scrollPercent}%</span>
        </div>

        {/* Diagnostic canvas graph */}
        <div className="w-full h-8 mt-2 border border-white/5 bg-black/40 overflow-hidden">
          <canvas ref={canvasRef} width="112" height="32" className="w-full h-full" />
        </div>
      </div>

      {/* Vertical Navigation Tracker */}
      <div className="flex flex-col items-end gap-4 pointer-events-auto">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-white/10" />
        
        {sections.map((sec) => {
          const isActive = activeSection === sec;
          return (
            <a
              key={sec}
              href={`#${sec}`}
              className="group flex items-center gap-3 text-right"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(sec)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {/* Tooltip Label */}
              <span className={`font-mono text-[9px] uppercase tracking-[0.2em] font-bold transition-all duration-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 ${isActive ? 'text-[#6366f1]' : 'text-[#888]'}`}>
                {sec}
              </span>

              {/* Visual Indicator dot/bracket */}
              <div className="relative flex items-center justify-center w-6 h-6">
                {isActive ? (
                  <>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#6366f1] shadow-[0_0_8px_#6366f1]" />
                    <div className="absolute inset-0 border border-[#6366f1]/40 rounded-sm scale-75 animate-[pulse-soft_2s_infinite]" />
                    {/* Small layout brackets */}
                    <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-[#6366f1]" />
                    <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-[#6366f1]" />
                  </>
                ) : (
                  <div className="w-1 h-1 rounded-full bg-[#222] group-hover:bg-[#6366f1] group-hover:scale-125 transition-all duration-500" />
                )}
              </div>
            </a>
          );
        })}

        <div className="w-[1px] h-12 bg-gradient-to-t from-transparent to-white/10" />
      </div>

      {/* Bottom telemetry trace */}
      <div className="font-mono text-[8px] text-[#222] tracking-widest rotate-90 origin-right translate-y-8 uppercase mt-4">
        sys.trace // active_node: {activeSection}
      </div>

    </div>
  );
}
