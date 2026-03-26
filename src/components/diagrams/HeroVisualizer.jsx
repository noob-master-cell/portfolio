import React from 'react';

export default function HeroVisualizer() {
  return (
    <div className="w-full h-full flex items-center justify-center relative select-none">
      {/* Background Glow */}
      <div className="absolute w-[400px] h-[400px] bg-[#ff5722] opacity-[0.03] blur-[120px] rounded-full" />
      
      <svg viewBox="0 0 200 200" className="w-[100%] max-w-[600px] drop-shadow-[0_0_15px_rgba(255,87,34,0.1)]">
        <defs>
          <filter id="glowSmall" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- CONCENTRIC RINGS --- */}
        <circle cx="100" cy="100" r="90" fill="none" stroke="#222" strokeWidth="0.5" strokeDasharray="4 2" />
        <circle cx="100" cy="100" r="75" fill="none" stroke="#333" strokeWidth="1" strokeDasharray="40 10">
          <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="40s" repeatCount="indefinite" />
        </circle>
        <circle cx="100" cy="100" r="60" fill="none" stroke="#444" strokeWidth="0.5" strokeDasharray="2 10">
          <animateTransform attributeName="transform" type="rotate" from="360 100 100" to="0 100 100" dur="20s" repeatCount="indefinite" />
        </circle>

        {/* --- CORE DATA NODES --- */}
        <g transform="translate(100, 100)">
          {/* Central Cube (Simplified) */}
          <path d="M-15 -10 L15 -25 L15 10 L-15 25 Z" fill="none" stroke="#ff5722" strokeWidth="1" opacity="0.6">
             <animate attributeName="stroke-width" values="1;2;1" dur="2s" repeatCount="indefinite" />
          </path>
          <path d="M-15 -10 L-45 -25 L-15 -40 L15 -25 Z" fill="none" stroke="#e8e6e1" strokeWidth="0.5" />
          <path d="M-15 -10 L-15 25 L-45 10 L-45 -25 Z" fill="none" stroke="#e8e6e1" strokeWidth="0.5" />
          
          {/* Pulsing Nodes */}
          {[[40, -40], [-50, 20], [20, 50]].map(([x, y], i) => (
             <g key={i} transform={`translate(${x}, ${y})`}>
                <circle r="2" fill="#ff5722" filter="url(#glowSmall)">
                   <animate attributeName="r" values="1.5;2.5;1.5" dur={`${1.5 + i}s`} repeatCount="indefinite" />
                </circle>
                <line x1="0" y1="0" x2={-x/2} y2={-y/2} stroke="#333" strokeWidth="0.5" strokeDasharray="2 2" />
             </g>
          ))}
        </g>

        {/* --- DATA STREAMS --- */}
        <g stroke="#ff5722" strokeWidth="0.5" opacity="0.4">
            <path d="M10 100 L40 100" strokeDasharray="1 3">
                <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
            </path>
            <path d="M160 100 L190 100" strokeDasharray="1 3">
                <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
            </path>
        </g>

      </svg>

      {/* Floating Meta Labels */}
      <div className="absolute top-[20%] right-[10%] font-mono text-[9px] text-[#555] tracking-widest uppercase">
          system.core // active<br/>
          encryption: rs256
      </div>
      <div className="absolute bottom-[20%] left-[10%] font-mono text-[9px] text-[#555] tracking-widest uppercase">
          node_latency: 0.04ms<br/>
          throughput: 2.4gb/s
      </div>
      
      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#333]" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#333]" />
    </div>
  );
}
