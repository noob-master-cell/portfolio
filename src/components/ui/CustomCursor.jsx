import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const mainRef = useRef(null);
  const secondaryRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTextCursor, setIsTextCursor] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const secondaryPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e) => {
      const target = !!(e.target.closest('a') || e.target.closest('button') || e.target.closest('.interactive-hover'));
      const isText = window.getComputedStyle(e.target).cursor === 'text';
      
      // Batch state updates and only trigger if values changed
      setIsHovering(prev => prev !== target ? target : prev);
      setIsTextCursor(prev => prev !== isText ? isText : prev);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    // Animation loop for sub-millisecond smoothness
    let rafId;
    const update = () => {
      if (mainRef.current) {
        mainRef.current.style.transform = `translate3d(calc(${mousePos.current.x}px - 50%), calc(${mousePos.current.y}px - 50%), 0)`;
      }

      if (secondaryRef.current) {
        // Linear interpolation: 0.35 is much snappier than 0.15
        const lerp = 0.35;
        secondaryPos.current.x += (mousePos.current.x - secondaryPos.current.x) * lerp;
        secondaryPos.current.y += (mousePos.current.y - secondaryPos.current.y) * lerp;
        secondaryRef.current.style.transform = `translate3d(calc(${secondaryPos.current.x}px - 50%), calc(${secondaryPos.current.y}px - 50%), 0)`;
      }

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="hidden md:block">
      {/* Primary HUD Anchor (Instant Tracking) */}
      <div
        ref={mainRef}
        className="fixed top-0 left-0 pointer-events-none z-[110] transition-none"
        style={{ width: 0, height: 0 }}
      >
        {/* The Pointer Dot/Indicator */}
        <div 
          className={`flex items-center justify-center transition-all duration-300 ${
            isTextCursor ? 'w-0 h-0' : 'w-4 h-4'
          }`}
          style={{ transform: 'translate3d(-50%, -50%, 0)' }}
        >
          {/* Core Dot */}
          <div className={`rounded-full transition-all duration-300 ${isHovering ? 'w-1 h-1 bg-white' : 'w-1.5 h-1.5 bg-[#ff5722]'}`} />
          
          {/* Static Crosshair (Dim) */}
          {!isHovering && !isTextCursor && (
            <>
              <div className="absolute w-[10px] h-[1px] bg-[#ff5722]/40" />
              <div className="absolute h-[10px] w-[1px] bg-[#ff5722]/40" />
            </>
          )}

          {/* Interactive Brackets (Visible only on Hover) */}
          <div className={`absolute w-8 h-8 transition-all duration-500 ease-[0.22,1,0.36,1] ${isHovering ? 'opacity-100 scale-100' : 'opacity-0 scale-150'}`}>
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#ff5722]/60" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#ff5722]/60" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#ff5722]/60" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#ff5722]/60" />
            
            {/* Subtle Inner Pulse */}
            <div className="absolute inset-2 border border-[#ff5722]/10 animate-pulse rounded-sm" />
          </div>
        </div>

        {/* Text Selection I-Beam */}
        {isTextCursor && (
          <div 
            className="w-[1px] h-4 bg-white/70 animate-[pulse-soft_2s_infinite]"
            style={{ transform: 'translate3d(-50%, -50%, 0)' }}
          />
        )}
      </div>

      {/* Secondary Lag Component (Motion Fluidity) */}
      <div
        ref={secondaryRef}
        className="fixed top-0 left-0 pointer-events-none z-[100] transition-none"
        style={{ width: 0, height: 0 }}
      >
        <div 
          className={`w-6 h-6 border border-white/5 rounded-full transition-all duration-700 ${isHovering || isTextCursor ? 'opacity-0' : 'opacity-100'}`}
          style={{ transform: 'translate3d(-50%, -50%, 0)' }}
        />
      </div>
    </div>
  );
}
