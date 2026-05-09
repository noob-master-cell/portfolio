export default function GatekeeperDiagram() {
  const CX = 450;
  const PW = 256;
  const PX = CX - PW / 2;
  const LH = 34;
  const LG = 8;
  const Y0 = 90;

  const ly  = (i) => Y0 + i * (LH + LG);
  const lcy = (i) => ly(i) + LH / 2;

  const layers = [
    { name: "1 · RS256 JWT Validation",  g: "auth"    },
    { name: "2 · JWKS Key Rotation",     g: "auth"    },
    { name: "3 · Per-IP Rate Limit",     g: "rate"    },
    { name: "4 · Per-Key Rate Limit",    g: "rate"    },
    { name: "5 · OPA Policy (Rego)",     g: "policy"  },
    { name: "6 · Redis Session Check",   g: "session" },
    { name: "7 · Instant Revocation",    g: "session" },
    { name: "8 · OTel Tracing",          g: "obs"     },
    { name: "9 · Prometheus Metrics",    g: "obs"     },
  ];

  const gc = {
    auth:    "#4f46e5",
    rate:    "#7c3aed",
    policy:  "#0891b2",
    session: "#b91c1c",
    obs:     "#047857",
  };

  const gcRgba = {
    auth:    "rgba(79,70,229,0.10)",
    rate:    "rgba(124,58,237,0.10)",
    policy:  "rgba(8,145,178,0.10)",
    session: "rgba(185,28,28,0.10)",
    obs:     "rgba(4,120,87,0.10)",
  };

  // Left service
  const LCX = 128;
  const LW  = 116;

  // Right services
  const RCX = 768;
  const RW  = 130;

  const backendY = ly(8) + LH + 28;

  const legend = [
    { c: "#4f46e5", t: "Auth / Identity" },
    { c: "#7c3aed", t: "Rate Limiting"   },
    { c: "#0891b2", t: "Policy Engine"   },
    { c: "#b91c1c", t: "Session Store"   },
    { c: "#047857", t: "Observability"   },
  ];

  // Precomputed service geometry
  const jwksTop    = lcy(0) - 10;
  const jwksH      = lcy(1) - lcy(0) + 20;
  const jwksMidY   = lcy(0) + jwksH / 2 - 10;

  const redisTop   = lcy(5) - 10;
  const redisH     = lcy(6) - lcy(5) + 20;
  const redisMidY  = (lcy(5) + lcy(6)) / 2;

  const otelTop    = lcy(7) - 10;
  const otelH      = lcy(8) - lcy(7) + 20;
  const otelMidY   = (lcy(7) + lcy(8)) / 2;

  return (
    <svg
      viewBox="0 0 900 560"
      className="w-full h-full max-h-[700px] font-sans selection:bg-transparent"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <defs>
        <pattern id="gk-dots" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="rgba(255,255,255,0.03)" />
        </pattern>
        {[
          { id: "gk-main",    fill: "#6366f1" },
          { id: "gk-gray",    fill: "#555"    },
          { id: "gk-auth",    fill: "#4f46e5" },
          { id: "gk-policy",  fill: "#0891b2" },
          { id: "gk-session", fill: "#b91c1c" },
          { id: "gk-obs",     fill: "#047857" },
        ].map(({ id, fill }) => (
          <marker key={id} id={id} markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={fill} />
          </marker>
        ))}
      </defs>

      {/* Background */}
      <rect width="100%" height="100%" fill="url(#gk-dots)" rx="12" />

      {/* Client */}
      <rect x={CX - 70} y="14" width="140" height="36" rx="4" fill="#111" stroke="#444" strokeWidth="1.5" />
      <text x={CX} y="37" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">
        👤 Client Request
      </text>
      <line x1={CX} y1="50" x2={CX} y2={Y0 - 2} stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#gk-main)" />

      {/* 9 Middleware Layers */}
      {layers.map((layer, i) => (
        <g key={i}>
          <rect
            x={PX} y={ly(i)} width={PW} height={LH} rx="4"
            fill={gcRgba[layer.g]} stroke={gc[layer.g]} strokeWidth="1.5"
          />
          <text x={CX} y={lcy(i) + 4.5} textAnchor="middle" fill="#f1f5f9" fontSize="10.5" fontWeight="700">
            {layer.name}
          </text>
          {i < 8 && (
            <line
              x1={CX} y1={ly(i) + LH}
              x2={CX} y2={ly(i + 1) - 2}
              stroke="#555" strokeWidth="1.5"
              markerEnd="url(#gk-gray)"
            />
          )}
        </g>
      ))}

      {/* Backend API */}
      <line
        x1={CX} y1={ly(8) + LH}
        x2={CX} y2={backendY - 2}
        stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#gk-main)"
      />
      <rect x={CX - 90} y={backendY} width="180" height="36" rx="4" fill="#111" stroke="#444" strokeWidth="1.5" />
      <text x={CX} y={backendY + 22} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">
        ⚙️ Backend API
      </text>

      {/* ── Left: JWKS Endpoint → layers 0 & 1 ── */}
      <rect
        x={LCX - LW / 2} y={jwksTop} width={LW} height={jwksH} rx="4"
        fill="rgba(79,70,229,0.10)" stroke="#4f46e5" strokeWidth="1.5"
      />
      <text x={LCX} y={jwksMidY}      textAnchor="middle" fill="#a5b4fc" fontSize="9" fontWeight="700">JWKS</text>
      <text x={LCX} y={jwksMidY + 13} textAnchor="middle" fill="#a5b4fc" fontSize="9" fontWeight="700">Endpoint</text>
      {/* solid: supplies public key for JWT validation */}
      <line
        x1={LCX + LW / 2} y1={lcy(0)}
        x2={PX - 2}        y2={lcy(0)}
        stroke="#4f46e5" strokeWidth="1.5" markerEnd="url(#gk-auth)"
      />
      {/* dashed: rotated key used by JWKS layer */}
      <line
        x1={LCX + LW / 2} y1={lcy(1)}
        x2={PX - 2}        y2={lcy(1)}
        stroke="#4f46e5" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#gk-auth)"
      />

      {/* ── Right: OPA Policy Engine → layer 4 ── */}
      <rect
        x={RCX - RW / 2} y={lcy(4) - 18} width={RW} height={36} rx="4"
        fill="rgba(8,145,178,0.10)" stroke="#0891b2" strokeWidth="1.5"
      />
      <text x={RCX} y={lcy(4) + 5} textAnchor="middle" fill="#67e8f9" fontSize="9" fontWeight="700">
        OPA Policy Engine
      </text>
      <line
        x1={PX + PW + 2}   y1={lcy(4)}
        x2={RCX - RW / 2 - 2} y2={lcy(4)}
        stroke="#0891b2" strokeWidth="1.5" markerEnd="url(#gk-policy)"
      />

      {/* ── Right: Redis → layers 5 & 6 ── */}
      <rect
        x={RCX - RW / 2} y={redisTop} width={RW} height={redisH} rx="4"
        fill="rgba(185,28,28,0.10)" stroke="#b91c1c" strokeWidth="1.5"
      />
      <text x={RCX} y={redisMidY + 5} textAnchor="middle" fill="#fca5a5" fontSize="9" fontWeight="700">
        🔴 Redis
      </text>
      <line
        x1={PX + PW + 2}   y1={lcy(5)}
        x2={RCX - RW / 2 - 2} y2={lcy(5)}
        stroke="#b91c1c" strokeWidth="1.5" markerEnd="url(#gk-session)"
      />
      <line
        x1={PX + PW + 2}   y1={lcy(6)}
        x2={RCX - RW / 2 - 2} y2={lcy(6)}
        stroke="#b91c1c" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#gk-session)"
      />

      {/* ── Right: OTel / Prometheus → layers 7 & 8 ── */}
      <rect
        x={RCX - RW / 2} y={otelTop} width={RW} height={otelH} rx="4"
        fill="rgba(4,120,87,0.10)" stroke="#047857" strokeWidth="1.5"
      />
      <text x={RCX} y={otelMidY + 5} textAnchor="middle" fill="#6ee7b7" fontSize="9" fontWeight="700">
        OTel · Prometheus
      </text>
      <line
        x1={PX + PW + 2}   y1={lcy(7)}
        x2={RCX - RW / 2 - 2} y2={lcy(7)}
        stroke="#047857" strokeWidth="1.5" markerEnd="url(#gk-obs)"
      />
      <line
        x1={PX + PW + 2}   y1={lcy(8)}
        x2={RCX - RW / 2 - 2} y2={lcy(8)}
        stroke="#047857" strokeWidth="1.5" markerEnd="url(#gk-obs)"
      />

      {/* Legend */}
      {legend.map((item, i) => (
        <g key={i} transform={`translate(${52 + i * 160}, 528)`}>
          <rect width="10" height="10" y="1" rx="2" fill={item.c} />
          <text x="15" y="10" fill="#555" fontSize="9" fontWeight="600">{item.t}</text>
        </g>
      ))}

      <text
        x={CX} y="550"
        fill="#2a2a2a" fontSize="8.5" fontWeight="900" letterSpacing="1.5" textAnchor="middle"
      >
        GATEKEEPER // MIDDLEWARE_PIPELINE_SEQUENCE // VER 4.0.0
      </text>
    </svg>
  );
}
