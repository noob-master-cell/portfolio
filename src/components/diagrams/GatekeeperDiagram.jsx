export default function GatekeeperDiagram() {
  const nodes = [
    { name: "Browser / Client", icon: "👤" },
    { name: "Proxy Gateway", icon: "🛡️" },
    { name: "Redis (Sessions/Cache)", icon: "🔴" },
    { name: "Control Plane", icon: "🎛️" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "Backend API", icon: "⚙️" }
  ];

  const steps = [
    { from: 0, to: 1, label: "1. Request (+ JWT Cookie)", y: 100 },
    { from: 1, to: 2, label: "2. Verify Session & Policy", y: 140 },
    { from: 2, to: 1, label: "3. Session Valid + Rules", y: 180, dashed: true },
    { from: 1, to: 1, label: "4. Enforce RBAC & Posture", y: 220, loop: true },
    { from: 1, to: 2, label: "5. Stream Audit Log", y: 270 },
    { from: 1, to: 5, label: "6. Forward Request", y: 320 },
    { from: 5, to: 1, label: "7. Response", y: 370, dashed: true },
    { from: 1, to: 0, label: "8. Secure Response", y: 420, dashed: true }
  ];

  return (
    <svg viewBox="0 0 950 550" className="w-full h-full max-h-[700px] text-[#e8e6e1] font-sans selection:bg-transparent" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <defs>
        <pattern id="dotGrid" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="rgba(255,255,255,0.03)" />
        </pattern>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#ff5722" />
        </marker>
        <marker id="arrowheadMuted" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="rgba(255,255,255,0.2)" />
        </marker>
      </defs>

      {/* Background */}
      <rect width="100%" height="100%" fill="url(#dotGrid)" rx="12" />

      {/* Render Node Headers */}
      {nodes.map((node, i) => {
        const x = 70 + i * 162;
        return (
          <g key={i}>
            {/* Top Box */}
            <rect x={x - 65} y="30" width="130" height="40" rx="4" fill="#111" stroke="#333" strokeWidth="1" />
            <text x={x} y="55" textAnchor="middle" fill="#fff" fontSize="10px" fontWeight="700">
               {node.icon} {node.name}
            </text>
            
            {/* Lifeline */}
            <line x1={x} y1="70" x2={x} y2="480" stroke="#333" strokeWidth="1" strokeDasharray="4 4" />
            
            {/* Bottom Box */}
            <rect x={x - 65} y="480" width="130" height="40" rx="4" fill="#111" stroke="#333" strokeWidth="1" />
            <text x={x} y="505" textAnchor="middle" fill="#fff" fontSize="10px" fontWeight="700">
               {node.icon} {node.name}
            </text>
          </g>
        );
      })}

      {/* Render Steps */}
      {steps.map((step, i) => {
        const x1 = 70 + step.from * 162;
        const x2 = 70 + step.to * 162;
        const isReverse = x2 < x1;
        
        if (step.loop) {
          return (
             <g key={i} transform={`translate(${x1}, ${step.y})`}>
               <path d="M 0 0 Q 30 15, 0 30" fill="none" stroke="#ff5722" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
               <text x="35" y="18" fill="#ff5722" fontSize="10px" fontWeight="800" textAnchor="start">{step.label}</text>
             </g>
          );
        }

        return (
          <g key={i}>
            <line 
              x1={x1} 
              y1={step.y} 
              x2={x2} 
              y2={step.y} 
              stroke={step.dashed ? "rgba(255,255,255,0.3)" : "#ff5722"} 
              strokeWidth="1.5"
              strokeDasharray={step.dashed ? "4 4" : "0"}
              markerEnd={step.dashed ? "url(#arrowheadMuted)" : "url(#arrowhead)"}
            />
            <text 
              x={(x1 + x2) / 2} 
              y={step.y - 8} 
              textAnchor="middle" 
              fill={step.dashed ? "rgba(255,255,255,0.4)" : "#fff"} 
              fontSize="10px" 
              fontWeight={step.dashed ? "600" : "800"}
              letterSpacing="0.05em"
            >
              {step.label}
            </text>
          </g>
        );
      })}

      {/* Label Details */}
      <text x="40" y="535" fill="#333" fontSize="10px" fontWeight="900" letterSpacing="2">GATEKEEPER // REQUEST_FLOW_SEQUENCE // VER 3.1.2</text>
    </svg>
  );
}
