export default function PerformanceChart() {
  return (
    <svg viewBox="0 0 950 500" className="w-full h-full max-h-[600px] font-sans selection:bg-transparent" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <defs>
        <pattern id="gridSubtle" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="rgba(0,0,0,0.03)" />
        </pattern>
        <filter id="blockShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="15" floodColor="#000" floodOpacity="0.03" />
        </filter>
      </defs>
      
      {/* Blueprint Grid */}
      <rect width="100%" height="100%" fill="url(#gridSubtle)" rx="16" />

      {/* --- FRONTEND SPA --- */}
      <g transform="translate(40, 60)">
        <rect width="150" height="380" rx="10" fill="#fff" filter="url(#blockShadow)" stroke="#f1f5f9" />
        <text x="20" y="30" fill="#6366f1" fontSize="10px" fontWeight="800" letterSpacing="2">FRONTEND_SPA</text>
        <text x="20" y="55" fill="#1a1a1a" fontWeight="800" fontSize="16px">React 19 / Vite</text>
        
        {['Apollo Client', 'Zustand UI', 'Tailwind v4', 'Auth0 SDK', 'Framer Motion'].map((svc, i) => (
          <g key={i} transform={`translate(20, ${100 + i * 55})`}>
            <rect width="110" height="40" rx="6" fill="#f8fafc" stroke="#e2e8f0" />
            <text x="12" y="24" fill="#64748b" fontSize="10px" fontWeight="600">{svc}</text>
          </g>
        ))}
      </g>

      {/* --- GATEWAY / PROXY --- */}
      <g transform="translate(230, 180)">
        <rect width="120" height="140" rx="8" fill="#f1f5f9" stroke="#e2e8f0" />
        <text x="15" y="25" fill="#475569" fontSize="9px" fontWeight="800">GATEWAY</text>
        
        <g transform="translate(15, 45)">
          <rect width="90" height="35" rx="4" fill="#fff" stroke="#e2e8f0" />
          <text x="45" y="22" textAnchor="middle" fill="#1e293b" fontSize="11px" fontWeight="700">Nginx Proxy</text>
        </g>
        <g transform="translate(15, 90)">
          <rect width="90" height="35" rx="4" fill="#111" />
          <text x="45" y="22" textAnchor="middle" fill="#fff" fontSize="11px" fontWeight="700">Auth0 OIDC</text>
        </g>
      </g>

      {/* --- BACKEND API (NESTJS) --- */}
      <g transform="translate(390, 40)">
        <rect width="280" height="420" rx="12" fill="#fff" filter="url(#blockShadow)" stroke="#f1f5f9" strokeWidth="1.5" />
        <text x="25" y="35" fill="#e11d48" fontSize="11px" fontWeight="800" letterSpacing="2">NESTJS_GQL_BACKEND</text>
        <text x="25" y="65" fill="#1a1a1a" fontWeight="800" fontSize="20px">GraphQL Engine</text>
        
        <g transform="translate(25, 100)">
          <rect width="230" height="290" rx="8" fill="#fcfcfc" stroke="#f1f1f1" />
          
          <g transform="translate(15, 25)">
            <text x="0" y="15" fill="#64748b" fontSize="10px" fontWeight="800">DATA_LOADER_MIDDLEWARE</text>
            <rect y="25" width="200" height="45" rx="4" fill="#fff" stroke="#6366f1/20" strokeWidth="2" />
            <text x="15" y="52" fill="#1a1a1a" fontSize="13px" fontWeight="800">N+1 Batch Protection</text>
            <circle cx="180" cy="47" r="5" fill="#6366f1">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>

          <g transform="translate(15, 100)">
            <text x="0" y="15" fill="#64748b" fontSize="10px" fontWeight="800">SECURITY_GUARD</text>
            <rect y="25" width="200" height="45" rx="4" fill="#fff" stroke="#eee" />
            <text x="15" y="52" fill="#1a1a1a" fontSize="12px" fontWeight="600">Query Complexity Cap [1k]</text>
          </g>

          <g transform="translate(15, 175)">
            <text x="0" y="15" fill="#64748b" fontSize="10px" fontWeight="800">PERSISTENCE_LAYER</text>
            <rect y="25" width="200" height="45" rx="4" fill="#2d3748" />
            <text x="15" y="52" fill="#fff" fontSize="13px" fontWeight="700">Prisma ORM (PostgreSQL)</text>
          </g>
          
          <g transform="translate(15, 255)">
            <text x="0" y="12" fill="#64748b" fontSize="9px" fontWeight="700">GQL_SUBSCRIPTIONS (WS)</text>
            <path d="M 0 20 L 200 20" stroke="#f1f5f9" strokeWidth="2" strokeDasharray="4 4" />
          </g>
        </g>
      </g>

      {/* --- SERVICES (REDIS / CLOUDINARY) --- */}
      <g transform="translate(710, 80)">
        <g transform="translate(0, 0)">
          <rect width="150" height="80" rx="10" fill="#fff" stroke="#e11d48/30" filter="url(#blockShadow)" />
          <text x="15" y="30" fill="#e11d48" fontSize="10px" fontWeight="800">Redis 7 / Caching</text>
          <path d="M 20 55 L 130 55" stroke="#e11d48/10" strokeWidth="4" />
          <path d="M 20 55 L 80 55" stroke="#e11d48" strokeWidth="4">
            <animate attributeName="x" values="20;70;20" dur="2s" repeatCount="indefinite" />
          </path>
        </g>

        <g transform="translate(0, 110)">
          <rect width="150" height="80" rx="10" fill="#fff" stroke="#0ea5e9/30" filter="url(#blockShadow)" />
          <text x="15" y="30" fill="#0ea5e9" fontSize="10px" fontWeight="800">Cloudinary / Media</text>
          <circle cx="75" cy="55" r="10" fill="none" stroke="#0ea5e9/20" strokeWidth="2" />
          <circle cx="75" cy="55" r="4" fill="#0ea5e9">
             <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* PostgreSQL */}
        <g transform="translate(0, 220)">
          <rect width="200" height="150" rx="10" fill="#fff" stroke="#334155/10" filter="url(#blockShadow)" />
          <text x="20" y="30" fill="#334155" fontSize="11px" fontWeight="800">PRIMARY_STORE</text>
          <text x="20" y="55" fill="#1a1a1a" fontWeight="800" fontSize="16px">PostgreSQL 15</text>
          
          <rect x="20" y="80" width="160" height="50" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
          <text x="35" y="102" fill="#64748b" fontSize="10px" fontWeight="700">Automated Waitlist Logic</text>
          <text x="35" y="118" fill="#64748b" fontSize="9px">Position-Based Ranking</text>
        </g>
      </g>

      <text x="40" y="485" fill="#94a3b8" fontSize="10px" fontWeight="700" letterSpacing="1">ARCHITECTURE_ESN_EVENT_PORTAL_2.6</text>
    </svg>
  );
}
