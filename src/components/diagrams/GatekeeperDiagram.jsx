export default function GatekeeperDiagram({ activeStep = 0 }) {
  const CX = 450;
  const PW = 256;
  const PX = CX - PW / 2;
  const LH = 34;
  const LG = 8;
  const Y0 = 90;

  const ly  = (i) => Y0 + i * (LH + LG);
  const lcy = (i) => ly(i) + LH / 2;

  const layers = [
    { name: "1 · RS256 JWT Validation",  g: "auth",    step: 2 },
    { name: "2 · JWKS Key Rotation",     g: "auth",    step: 2 },
    { name: "3 · Per-IP Rate Limit",     g: "rate",    step: 3 },
    { name: "4 · Per-Key Rate Limit",    g: "rate",    step: 3 },
    { name: "5 · OPA Policy (Rego)",     g: "policy",  step: 4 },
    { name: "6 · Redis Session Check",   g: "session", step: 5 },
    { name: "7 · Instant Revocation",    g: "session", step: 5 },
    { name: "8 · OTel Tracing",          g: "obs",     step: 6 },
    { name: "9 · Prometheus Metrics",    g: "obs",     step: 6 },
  ];

  // Stroke colors for different modules
  const gc = {
    auth:    "#4f46e5",
    rate:    "#7c3aed",
    policy:  "#0891b2",
    session: "#b91c1c",
    obs:     "#047857",
  };

  const LCX = 128;
  const LW  = 116;
  const RCX = 768;
  const RW  = 130;

  const backendY = ly(8) + LH + 28;

  const jwksTop  = lcy(0) - 10;
  const jwksH    = lcy(1) - lcy(0) + 20;
  const jwksMidY = (lcy(0) + lcy(1)) / 2;

  const redisTop  = lcy(5) - 10;
  const redisH    = lcy(6) - lcy(5) + 20;
  const redisMidY = (lcy(5) + lcy(6)) / 2;

  const otelTop  = lcy(7) - 10;
  const otelH    = lcy(8) - lcy(7) + 20;
  const otelMidY = (lcy(7) + lcy(8)) / 2;

  const legend = [
    { c: "#4f46e5", t: "Auth / Identity" },
    { c: "#7c3aed", t: "Rate Limiting"   },
    { c: "#0891b2", t: "Policy Engine"   },
    { c: "#b91c1c", t: "Session Store"   },
    { c: "#047857", t: "Observability"   },
  ];

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
      stroke: isActive ? '#6366f1' : 'rgba(255, 255, 255, 0.15)',
      strokeWidth: isActive ? 2 : 1.2,
      transition: 'all 0.4s ease',
    };
  };

  return (
    <svg
      viewBox="0 0 900 560"
      className="w-full h-full max-h-[700px] font-sans selection:bg-transparent"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <defs>
        <pattern id="gk-ldots" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="14" cy="14" r="0.9" fill="rgba(255, 255, 255, 0.03)" />
        </pattern>

        {[
          { id: "gk-main",    fill: "#6366f1" },
          { id: "gk-slate",   fill: "#475569" },
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

      {/* Background Grid */}
      <rect width="100%" height="100%" fill="url(#gk-ldots)" rx="12" />

      {/* Client Block */}
      <g style={getStyle(1)}>
        <rect x={CX - 70} y="14" width="140" height="36" rx="8" fill="#070a13" stroke={activeStep === 1 ? '#6366f1' : '#1e293b'} strokeWidth={1.5} />
        <text x={CX} y={36} textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="700">
          👤 Client Request
        </text>
      </g>
      <line x1={CX} y1="50" x2={CX} y2={Y0 - 2} stroke="#6366f1" strokeWidth="1.2" markerEnd="url(#gk-main)" style={getLineStyle(1)} />

      {/* 9 Middleware Layers */}
      {layers.map((layer, i) => {
        const isCurrent = activeStep === layer.step;
        return (
          <g key={i} style={getStyle(layer.step)}>
            <rect
              x={PX} y={ly(i)} width={PW} height={LH} rx="8"
              fill="#070a13" stroke={isCurrent ? '#6366f1' : gc[layer.g]} strokeWidth={isCurrent ? 2 : 1}
            />
            <text x={CX} y={lcy(i) + 4} textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="600">
              {layer.name}
            </text>
            {i < 8 && (
              <line
                x1={CX} y1={ly(i) + LH}
                x2={CX} y2={ly(i + 1) - 2}
                stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1"
                markerEnd="url(#gk-slate)"
                style={getLineStyle(layers[i+1].step)}
              />
            )}
          </g>
        );
      })}

      {/* Backend API connection */}
      <line
        x1={CX} y1={ly(8) + LH}
        x2={CX} y2={backendY - 2}
        stroke="#6366f1" strokeWidth="1.2" markerEnd="url(#gk-main)"
        style={getLineStyle(7)}
      />
      <g style={getStyle(7)}>
        <rect x={CX - 90} y={backendY} width="180" height="36" rx="8" fill="#070a13" stroke={activeStep === 7 ? '#6366f1' : '#1e293b'} strokeWidth={1.5} />
        <text x={CX} y={backendY + 22} textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="700">
          ⚙️ Backend API
        </text>
      </g>

      {/* ── Left: JWKS Endpoint ── */}
      <g style={getStyle(2)}>
        <rect
          x={LCX - LW / 2} y={jwksTop} width={LW} height={jwksH} rx="8"
          fill="#070a13" stroke="#4f46e5" strokeWidth={activeStep === 2 ? 2 : 1}
        />
        <text x={LCX} y={jwksMidY - 3}  textAnchor="middle" fill="#818cf8" fontSize="10" fontWeight="700">JWKS</text>
        <text x={LCX} y={jwksMidY + 11} textAnchor="middle" fill="#818cf8" fontSize="10" fontWeight="700">Endpoint</text>
      </g>
      <line
        x1={LCX + LW / 2} y1={lcy(0)}
        x2={PX - 2}        y2={lcy(0)}
        stroke="#4f46e5" strokeWidth="1.2" markerEnd="url(#gk-auth)"
        style={getLineStyle(2)}
      />
      <line
        x1={LCX + LW / 2} y1={lcy(1)}
        x2={PX - 2}        y2={lcy(1)}
        stroke="#4f46e5" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#gk-auth)"
        style={getLineStyle(2)}
      />

      {/* ── Right: OPA Policy Engine ── */}
      <g style={getStyle(4)}>
        <rect
          x={RCX - RW / 2} y={lcy(4) - 18} width={RW} height={36} rx="8"
          fill="#070a13" stroke="#0891b2" strokeWidth={activeStep === 4 ? 2 : 1}
        />
        <text x={RCX} y={lcy(4) + 4} textAnchor="middle" fill="#22d3ee" fontSize="10" fontWeight="700">
          OPA Policy Engine
        </text>
      </g>
      <line
        x1={PX + PW + 2}      y1={lcy(4)}
        x2={RCX - RW / 2 - 2} y2={lcy(4)}
        stroke="#0891b2" strokeWidth="1.2" markerEnd="url(#gk-policy)"
        style={getLineStyle(4)}
      />

      {/* ── Right: Redis ── */}
      <g style={getStyle(5)}>
        <rect
          x={RCX - RW / 2} y={redisTop} width={RW} height={redisH} rx="8"
          fill="#070a13" stroke="#b91c1c" strokeWidth={activeStep === 5 ? 2 : 1}
        />
        <text x={RCX} y={redisMidY + 4} textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="700">
          💾 Redis Session
        </text>
      </g>
      <line
        x1={PX + PW + 2}      y1={lcy(5)}
        x2={RCX - RW / 2 - 2} y2={lcy(5)}
        stroke="#b91c1c" strokeWidth="1.2" markerEnd="url(#gk-session)"
        style={getLineStyle(5)}
      />
      <line
        x1={PX + PW + 2}      y1={lcy(6)}
        x2={RCX - RW / 2 - 2} y2={lcy(6)}
        stroke="#b91c1c" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#gk-session)"
        style={getLineStyle(5)}
      />

      {/* ── Right: OTel / Prometheus ── */}
      <g style={getStyle(6)}>
        <rect
          x={RCX - RW / 2} y={otelTop} width={RW} height={otelH} rx="8"
          fill="#070a13" stroke="#047857" strokeWidth={activeStep === 6 ? 2 : 1}
        />
        <text x={RCX} y={otelMidY + 4} textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="700">
          📊 OTel · Metrics
        </text>
      </g>
      <line
        x1={PX + PW + 2}      y1={lcy(7)}
        x2={RCX - RW / 2 - 2} y2={lcy(7)}
        stroke="#047857" strokeWidth="1.2" markerEnd="url(#gk-obs)"
        style={getLineStyle(6)}
      />
      <line
        x1={PX + PW + 2}      y1={lcy(8)}
        x2={RCX - RW / 2 - 2} y2={lcy(8)}
        stroke="#047857" strokeWidth="1.2" markerEnd="url(#gk-obs)"
        style={getLineStyle(6)}
      />

      {/* Legend */}
      {legend.map((item, i) => (
        <g key={i} transform={`translate(${52 + i * 160}, 528)`}>
          <rect width="10" height="10" y="1" rx="3" fill={item.c} />
          <text x="15" y="10" fill="#94a3b8" fontSize="10" fontWeight="600">{item.t}</text>
        </g>
      ))}

      <text
        x={CX} y="550"
        fill="#475569" fontSize="9" fontWeight="700" letterSpacing="1.5" textAnchor="middle"
      >
        Gatekeeper Middleware Pipeline · v4.0.0
      </text>
    </svg>
  );
}

