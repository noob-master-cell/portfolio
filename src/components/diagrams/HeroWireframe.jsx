import React from 'react';

export default function HeroWireframe() {
  return (
    <div className="w-full h-full flex items-center justify-center opacity-80 mix-blend-screen relative">
      <svg viewBox="0 0 100 100" className="w-[80%] max-w-[500px] animate-[spin_60s_linear_infinite]">
        <g stroke="#333" strokeWidth="0.5" fill="none">
          {[...Array(11)].map((_, i) => (
            <React.Fragment key={i}>
              <line x1={i * 10} y1="0" x2={i * 10} y2="100" />
              <line x1="0" y1={i * 10} x2="100" y2={i * 10} />
            </React.Fragment>
          ))}
          <path d="M50 20 L80 35 L80 65 L50 80 L20 65 L20 35 Z" stroke="#e8e6e1" strokeWidth="1" />
          <line x1="50" y1="50" x2="50" y2="80" stroke="#e8e6e1" strokeWidth="1" />
          <line x1="50" y1="50" x2="20" y2="35" stroke="#e8e6e1" strokeWidth="1" />
          <line x1="50" y1="50" x2="80" y2="35" stroke="#e8e6e1" strokeWidth="1" />
          <circle cx="50" cy="20" r="1.5" fill="#ff5722" stroke="none" />
          <circle cx="20" cy="65" r="1.5" fill="#e8e6e1" stroke="none" />
          <circle cx="80" cy="65" r="1.5" fill="#e8e6e1" stroke="none" />
        </g>
      </svg>
      <div className="absolute bottom-10 right-10 font-mono text-[10px] text-[#888]">
        node_id: 0x9A4F<br />
        status: active
      </div>
    </div>
  );
}
