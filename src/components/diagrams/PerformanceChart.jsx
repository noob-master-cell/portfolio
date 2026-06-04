export default function PerformanceChart({ activeStep = 0 }) {
  const getStyle = (steps) => {
    const list = Array.isArray(steps) ? steps : [steps];
    if (activeStep === 0) return { transition: 'all 0.5s ease' };
    const isActive = list.includes(activeStep);
    return {
      opacity: isActive ? 1 : 0.15,
      filter: isActive ? 'drop-shadow(0px 2px 6px rgba(99, 102, 241, 0.25))' : 'none',
      transition: 'all 0.4s ease',
    };
  };

  const getLineStyle = (steps) => {
    const list = Array.isArray(steps) ? steps : [steps];
    if (activeStep === 0) return { transition: 'all 0.5s ease' };
    const isActive = list.includes(activeStep);
    return {
      opacity: isActive ? 1 : 0.15,
      stroke: isActive ? '#6366f1' : 'rgba(255,255,255,0.15)',
      strokeWidth: isActive ? 2 : 1,
      transition: 'all 0.4s ease',
    };
  };

  return (
    <svg viewBox="0 0 950 500" className="w-full h-full max-h-[600px] text-[#f8fafc] font-sans selection:bg-transparent" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <defs>
        <pattern id="gridSubtle" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="rgba(255,255,255,0.03)" />
        </pattern>
      </defs>
      
      {/* Blueprint Grid */}
      <rect width="100%" height="100%" fill="url(#gridSubtle)" rx="16" />

      {/* --- FRONTEND SPA --- */}
      <g transform="translate(40, 60)" style={getStyle([1, 8])}>
        <rect width="150" height="380" rx="8" fill="#070a13" stroke={activeStep === 1 || activeStep === 8 ? '#6366f1' : '#1e293b'} strokeWidth={activeStep === 1 || activeStep === 8 ? 1.5 : 1} />
        <text x="20" y="30" fill="#6366f1" fontSize="10px" fontWeight="700" letterSpacing="1">FRONTEND SPA</text>
        <text x="20" y="55" fill="#fff" fontWeight="700" fontSize="16px">React 19 + Vite</text>
        
        {['Apollo Client', 'Zustand UI', 'Tailwind v4', 'Auth0 SDK', 'Framer Motion'].map((svc, i) => (
          <g key={i} transform={`translate(20, ${100 + i * 55})`}>
            <rect width="110" height="40" rx="6" fill="rgba(255,255,255,0.02)" stroke="#1e293b" />
            <text x="12" y="24" fill="rgba(255,255,255,0.7)" fontSize="10px" fontWeight="500">{svc}</text>
          </g>
        ))}
      </g>

      {/* --- GATEWAY / PROXY --- */}
      <g transform="translate(230, 180)" style={getStyle(2)}>
        <rect width="120" height="140" rx="8" fill="#070a13" stroke={activeStep === 2 ? '#6366f1' : '#1e293b'} strokeWidth={activeStep === 2 ? 1.5 : 1} />
        <text x="15" y="25" fill="#6366f1" fontSize="9px" fontWeight="700" letterSpacing="1">GATEWAY</text>
        
        <g transform="translate(15, 45)">
          <rect width="90" height="35" rx="6" fill="rgba(255,255,255,0.02)" stroke="#1e293b" />
          <text x="45" y="22" textAnchor="middle" fill="#fff" fontSize="11px" fontWeight="600">Nginx Proxy</text>
        </g>
        <g transform="translate(15, 90)">
          <rect width="90" height="35" rx="6" fill="#090d16" stroke="#1e293b" />
          <text x="45" y="22" textAnchor="middle" fill="#fff" fontSize="11px" fontWeight="600">Auth0 OIDC</text>
        </g>
      </g>

      {/* --- BACKEND API (NESTJS) --- */}
      <g transform="translate(390, 40)" style={getStyle([3, 4, 6])}>
        <rect width="280" height="420" rx="8" fill="#070a13" stroke={activeStep === 3 || activeStep === 4 || activeStep === 6 ? '#e11d48' : '#1e293b'} strokeWidth={activeStep === 3 || activeStep === 4 || activeStep === 6 ? 1.5 : 1} />
        <text x="25" y="35" fill="#e11d48" fontSize="11px" fontWeight="700" letterSpacing="1">NESTJS GRAPHQL BACKEND</text>
        <text x="25" y="65" fill="#fff" fontWeight="700" fontSize="20px">GraphQL Engine</text>
        
        <g transform="translate(25, 100)">
          <rect width="230" height="290" rx="8" fill="rgba(255,255,255,0.01)" stroke="#1e293b" />
          
          <g transform="translate(15, 25)" style={getStyle(4)}>
            <text x="0" y="15" fill="rgba(255,255,255,0.4)" fontSize="10px" fontWeight="700">DATA LOADER MIDDLEWARE</text>
            <rect y="25" width="200" height="45" rx="6" fill="#090d16" stroke={activeStep === 4 ? '#6366f1' : '#1e293b'} strokeWidth={activeStep === 4 ? 1.5 : 1} />
            <text x="15" y="52" fill="#fff" fontSize="13px" fontWeight="600">N+1 Batch Protection</text>
            <circle cx="180" cy="47" r="4" fill="#6366f1">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>

          <g transform="translate(15, 100)" style={getStyle(3)}>
            <text x="0" y="15" fill="rgba(255,255,255,0.4)" fontSize="10px" fontWeight="700">SECURITY GUARD</text>
            <rect y="25" width="200" height="45" rx="6" fill="#090d16" stroke={activeStep === 3 ? '#6366f1' : '#1e293b'} strokeWidth={activeStep === 3 ? 1.5 : 1} />
            <text x="15" y="52" fill="#fff" fontSize="12px" fontWeight="500">Query Complexity Cap [1k]</text>
          </g>

          <g transform="translate(15, 175)" style={getStyle(6)}>
            <text x="0" y="15" fill="rgba(255,255,255,0.4)" fontSize="10px" fontWeight="700">PERSISTENCE LAYER</text>
            <rect y="25" width="200" height="45" rx="6" fill="#090d16" stroke={activeStep === 6 ? '#6366f1' : '#1e293b'} strokeWidth={activeStep === 6 ? 1.5 : 1} />
            <text x="15" y="52" fill="#fff" fontSize="13px" fontWeight="600">Prisma ORM (PostgreSQL)</text>
          </g>
          
          <g transform="translate(15, 255)">
            <text x="0" y="12" fill="rgba(255,255,255,0.4)" fontSize="9px" fontWeight="700">GRAPHQL SUBSCRIPTIONS (WS)</text>
            <path d="M 0 20 L 200 20" stroke="#1e293b" strokeWidth="2" strokeDasharray="3 3" />
          </g>
        </g>
      </g>

      {/* --- SERVICES (REDIS / CLOUDINARY / DATABASE) --- */}
      <g transform="translate(710, 80)">
        {/* Redis Block */}
        <g transform="translate(0, 0)" style={getStyle(5)}>
          <rect width="150" height="80" rx="8" fill="#070a13" stroke={activeStep === 5 ? '#e11d48' : '#1e293b'} strokeWidth={activeStep === 5 ? 1.5 : 1} />
          <text x="15" y="30" fill="#e11d48" fontSize="10px" fontWeight="700">Redis 7 / Caching</text>
          <path d="M 20 55 L 130 55" stroke="rgba(225, 29, 72, 0.08)" strokeWidth="4" />
          <path d="M 20 55 L 80 55" stroke="#e11d48" strokeWidth="4">
            <animate attributeName="x" values="20;70;20" dur="2s" repeatCount="indefinite" />
          </path>
        </g>

        {/* Cloudinary Block */}
        <g transform="translate(0, 110)" style={getStyle(0)}>
          <rect width="150" height="80" rx="8" fill="#070a13" stroke="#1e293b" strokeWidth="1" />
          <text x="15" y="30" fill="#0ea5e9" fontSize="10px" fontWeight="700">Cloudinary / Media</text>
          <circle cx="75" cy="55" r="10" fill="none" stroke="rgba(14, 165, 233, 0.15)" strokeWidth="2" />
          <circle cx="75" cy="55" r="3" fill="#0ea5e9">
             <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* PostgreSQL Database Block */}
        <g transform="translate(0, 220)" style={getStyle(7)}>
          <rect width="200" height="150" rx="8" fill="#070a13" stroke={activeStep === 7 ? '#94a3b8' : '#1e293b'} strokeWidth={activeStep === 7 ? 1.5 : 1} />
          <text x="20" y="30" fill="#94a3b8" fontSize="11px" fontWeight="700">PRIMARY STORE</text>
          <text x="20" y="55" fill="#fff" fontWeight="700" fontSize="16px">PostgreSQL 15</text>
          
          <rect x="20" y="80" width="160" height="50" rx="6" fill="#090d16" stroke="#1e293b" />
          <text x="35" y="102" fill="rgba(255,255,255,0.7)" fontSize="10px" fontWeight="600">Automated Waitlist Logic</text>
          <text x="35" y="118" fill="rgba(255,255,255,0.4)" fontSize="9px">Position-Based Ranking</text>
        </g>
      </g>

      {/* Connection Lines */}
      
      {/* Front SPA → Gateway */}
      <line x1="190" y1="200" x2="230" y2="200" stroke="#6366f1" strokeWidth="1" style={getLineStyle(1)} />

      {/* Gateway → Nest Backend */}
      <line x1="350" y1="250" x2="390" y2="250" stroke="#6366f1" strokeWidth="1" style={getLineStyle(2)} />

      {/* Backend → Redis */}
      <path d="M 670 120 L 710 120" fill="none" stroke="#e11d48" strokeWidth="1" style={getLineStyle(5)} />

      {/* Backend → PostgreSQL */}
      <path d="M 670 300 L 710 300" fill="none" stroke="#94a3b8" strokeWidth="1" style={getLineStyle(7)} />

      <text x="40" y="485" fill="rgba(255,255,255,0.2)" fontSize="10px" fontWeight="600" letterSpacing="1">ESN Event Platform Architecture · v2.6</text>
    </svg>
  );
}
