export default function NexusDiagram({ activeStep = 0 }) {
  // Helper to determine opacity and styles for high-tech HUD focus effect
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
      strokeWidth: isActive ? 2 : 1.2,
      strokeDasharray: isActive ? '3 3' : 'none',
      transition: 'all 0.4s ease',
    };
  };

  return (
    <svg viewBox="0 0 950 550" className="w-full h-full max-h-[700px] text-[#f8fafc] font-sans selection:bg-transparent" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <defs>
        <pattern id="nexusDots" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="rgba(255,255,255,0.03)" />
        </pattern>
        <marker id="nexusArrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
        </marker>
        <marker id="nexusArrowMuted" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="rgba(255,255,255,0.25)" />
        </marker>
        <linearGradient id="nexusGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.05" />
        </linearGradient>
        <filter id="nexusGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background Grid */}
      <rect width="100%" height="100%" fill="url(#nexusDots)" rx="12" />

      {/* === LEFT COLUMN: Frontend + Storage === */}

      {/* Frontend Block */}
      <g transform="translate(30, 30)" style={getStyle(1)}>
        <rect width="170" height="110" rx="8" fill="#070a13" stroke={activeStep === 1 ? '#6366f1' : '#1e293b'} strokeWidth={activeStep === 1 ? 1.5 : 1} />
        <text x="15" y="25" fill="#6366f1" fontSize="9px" fontWeight="700" letterSpacing="1">FRONTEND</text>
        <text x="15" y="48" fill="#fff" fontSize="14px" fontWeight="700">React + Vite</text>
        {['Chat UI / SSE', 'Doc Upload', 'Benchmarking'].map((item, i) => (
          <g key={i} transform={`translate(15, ${62 + i * 16})`}>
            <circle cx="4" cy="-3" r="2" fill="#6366f1" opacity="0.6" />
            <text x="12" y="0" fill="rgba(255,255,255,0.6)" fontSize="9px" fontWeight="500">{item}</text>
          </g>
        ))}
      </g>

      {/* SQLite */}
      <g transform="translate(30, 165)" style={getStyle(1)}>
        <rect width="80" height="50" rx="8" fill="#070a13" stroke="#1e293b" strokeWidth="1" />
        <text x="12" y="22" fill="#f59e0b" fontSize="9px" fontWeight="700">SQLite</text>
        <text x="12" y="38" fill="rgba(255,255,255,0.5)" fontSize="8px" fontWeight="500">Sessions</text>
      </g>

      {/* ChromaDB */}
      <g transform="translate(120, 165)" style={getStyle(5)}>
        <rect width="80" height="50" rx="8" fill="#070a13" stroke={activeStep === 5 ? '#10b981' : '#1e293b'} strokeWidth={activeStep === 5 ? 1.5 : 1} />
        <text x="12" y="22" fill="#10b981" fontSize="9px" fontWeight="700">ChromaDB</text>
        <text x="12" y="38" fill="rgba(255,255,255,0.5)" fontSize="8px" fontWeight="500">Vectors</text>
      </g>

      {/* Ollama */}
      <g transform="translate(30, 240)" style={getStyle([5, 9])}>
        <rect width="170" height="55" rx="8" fill="#070a13" stroke={activeStep === 5 || activeStep === 9 ? '#6366f1' : '#1e293b'} strokeWidth={activeStep === 5 || activeStep === 9 ? 1.5 : 1} />
        <text x="15" y="22" fill="#6366f1" fontSize="9px" fontWeight="700" letterSpacing="1">OLLAMA ENGINE</text>
        <text x="15" y="42" fill="rgba(255,255,255,0.6)" fontSize="9px" fontWeight="500">Qwen 3.5 · nomic-embed</text>
        <circle cx="155" cy="28" r="3" fill="#6366f1">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* === CENTER: 7-Stage Retrieval Pipeline === */}
      
      {/* Pipeline Header */}
      <g transform="translate(240, 20)" style={getStyle([2, 3, 4, 5, 6, 7, 8])}>
        <rect width="460" height="35" rx="6" fill="url(#nexusGrad)" stroke="#6366f1" strokeWidth="0.5" strokeOpacity="0.4" />
        <text x="230" y="23" textAnchor="middle" fill="#6366f1" fontSize="10px" fontWeight="700" letterSpacing="2">7-STAGE RETRIEVAL PIPELINE</text>
      </g>

      {/* Pipeline Stages */}
      {[
        { label: 'Agentic Router', sub: 'vector_db / web / direct', color: '#f43f5e', y: 75, step: 2 },
        { label: 'Query Rewriter', sub: 'Pronoun resolution', color: '#f59e0b', y: 140, step: 3 },
        { label: 'HyDE Expansion', sub: 'Hypothetical doc embed', color: '#8b5cf6', y: 205, step: 4 },
        { label: 'Vector Search', sub: '4× top_k cosine (ChromaDB)', color: '#6366f1', y: 270, step: 5 },
        { label: 'BM25 Scoring', sub: 'Lexical relevance', color: '#0ea5e9', y: 335, step: 6 },
        { label: 'RRF Fusion', sub: 'Reciprocal rank merge', color: '#14b8a6', y: 400, step: 7 },
        { label: 'MMR Re-rank', sub: 'Diversity λ=0.6', color: '#10b981', y: 465, step: 8 },
      ].map((stage, i) => {
        const isCurrent = activeStep === stage.step;
        return (
          <g key={i} style={getStyle(stage.step)}>
            {/* Stage box */}
            <rect x="260" y={stage.y} width="200" height="48" rx="8" fill="#070a13" stroke={stage.color} strokeWidth={isCurrent ? 2 : 1.2} />
            
            {/* Stage number badge */}
            <rect x="265" y={stage.y + 5} width="22" height="16" rx="4" fill={stage.color} opacity="0.2" />
            <text x="276" y={stage.y + 17} textAnchor="middle" fill={stage.color} fontSize="9px" fontWeight="700">{i + 1}</text>
            
            {/* Labels */}
            <text x="295" y={stage.y + 20} fill="#fff" fontSize="12px" fontWeight="600">{stage.label}</text>
            <text x="265" y={stage.y + 38} fill="rgba(255,255,255,0.4)" fontSize="8px" fontWeight="500">{stage.sub}</text>
            
            {/* Active pulse */}
            <circle cx="448" cy={stage.y + 24} r="3" fill={stage.color} opacity={isCurrent ? 1 : 0.5}>
              <animate attributeName="opacity" values="0.2;1;0.2" dur={isCurrent ? '0.8s' : `${1.5 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>

            {/* Connector arrow to next stage */}
            {i < 6 && (
              <line 
                x1="360" y1={stage.y + 48} 
                x2="360" y2={stage.y + 65} 
                stroke="#6366f1" 
                strokeWidth={activeStep === stage.step + 1 ? 2 : 1.2} 
                markerEnd="url(#nexusArrow)" 
                strokeOpacity={activeStep === stage.step + 1 ? 1 : 0.6}
                style={getLineStyle(stage.step + 1)}
              />
            )}
          </g>
        );
      })}

      {/* Ingestion Engine */}
      <g transform="translate(520, 70)" style={getStyle(0)}>
        <rect width="200" height="160" rx="8" fill="#070a13" stroke="#1e293b" strokeWidth="1" />
        <text x="15" y="25" fill="#f59e0b" fontSize="9px" fontWeight="700" letterSpacing="1">INGESTION ENGINE</text>
        
        {/* Loader */}
        <g transform="translate(15, 42)">
          <rect width="170" height="30" rx="6" fill="rgba(245,158,11,0.04)" stroke="rgba(245,158,11,0.15)" />
          <text x="10" y="19" fill="rgba(255,255,255,0.7)" fontSize="9px" fontWeight="600">Loader — PDF / TXT / Code / URL</text>
        </g>
        
        {/* Chunker */}
        <g transform="translate(15, 80)">
          <rect width="170" height="30" rx="6" fill="rgba(139,92,246,0.04)" stroke="rgba(139,92,246,0.15)" />
          <text x="10" y="19" fill="rgba(255,255,255,0.7)" fontSize="9px" fontWeight="600">Chunker — 4 Strategies</text>
        </g>

        {/* Embedder */}
        <g transform="translate(15, 118)">
          <rect width="170" height="30" rx="6" fill="rgba(99,102,241,0.04)" stroke="rgba(99,102,241,0.15)" />
          <text x="10" y="19" fill="rgba(255,255,255,0.7)" fontSize="9px" fontWeight="600">Embedder — nomic (768-dim)</text>
        </g>
      </g>

      {/* Chunking Strategies */}
      <g transform="translate(740, 70)" style={getStyle(0)}>
        <rect width="180" height="160" rx="8" fill="#070a13" stroke="#1e293b" strokeWidth="1" />
        <text x="15" y="25" fill="#8b5cf6" fontSize="9px" fontWeight="700" letterSpacing="1">CHUNK STRATEGIES</text>
        
        {['Fixed-Size', 'Semantic', 'Hierarchical', 'Code-Aware'].map((strat, i) => (
          <g key={i} transform={`translate(15, ${42 + i * 30})`}>
            <rect width="150" height="22" rx="4" fill="rgba(139,92,246,0.03)" stroke="rgba(139,92,246,0.1)" />
            <circle cx="12" cy="11" r="2.5" fill="#8b5cf6" opacity="0.5" />
            <text x="22" y="15" fill="rgba(255,255,255,0.6)" fontSize="9px" fontWeight="500">{strat}</text>
          </g>
        ))}
      </g>

      {/* LLM Generation */}
      <g transform="translate(520, 260)" style={getStyle(9)}>
        <rect width="200" height="80" rx="8" fill="#070a13" stroke={activeStep === 9 ? '#6366f1' : '#1e293b'} strokeWidth={activeStep === 9 ? 1.5 : 1} />
        <text x="15" y="25" fill="#6366f1" fontSize="9px" fontWeight="700" letterSpacing="1">LLM GENERATION</text>
        <text x="15" y="48" fill="#fff" fontSize="11px" fontWeight="600">SSE Streaming + Citations</text>
        <text x="15" y="66" fill="rgba(255,255,255,0.4)" fontSize="8px" fontWeight="500">Qwen 3.5 9B — context-grounded answers</text>
        
        {/* Streaming indicator */}
        <rect x="165" y="12" width="25" height="12" rx="6" fill="rgba(99,102,241,0.15)">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite" />
        </rect>
        <text x="170" y="21" fill="#6366f1" fontSize="7px" fontWeight="700">SSE</text>
      </g>

      {/* Faithfulness Evaluation */}
      <g transform="translate(520, 365)" style={getStyle(10)}>
        <rect width="200" height="100" rx="8" fill="#070a13" stroke={activeStep === 10 ? '#f43f5e' : '#1e293b'} strokeWidth={activeStep === 10 ? 1.5 : 1} />
        <text x="15" y="25" fill="#f43f5e" fontSize="9px" fontWeight="700" letterSpacing="1">EVALUATION ENGINE</text>
        
        <g transform="translate(15, 40)">
          <rect width="170" height="22" rx="4" fill="rgba(244,63,94,0.04)" stroke="rgba(244,63,94,0.15)" />
          <text x="10" y="15" fill="rgba(255,255,255,0.6)" fontSize="9px" fontWeight="500">Faithfulness Check</text>
        </g>
        <g transform="translate(15, 68)">
          <rect width="170" height="22" rx="4" fill="rgba(244,63,94,0.04)" stroke="rgba(244,63,94,0.15)" />
          <text x="10" y="15" fill="rgba(255,255,255,0.6)" fontSize="9px" fontWeight="500">Relevancy Scoring</text>
        </g>
      </g>

      {/* Web Search Fallback */}
      <g transform="translate(740, 260)" style={getStyle(0)}>
        <rect width="180" height="80" rx="8" fill="#070a13" stroke="#0ea5e9" strokeWidth="1" />
        <text x="15" y="25" fill="#0ea5e9" fontSize="9px" fontWeight="700" letterSpacing="1">WEB FALLBACK</text>
        <g transform="translate(15, 40)">
          <rect width="150" height="22" rx="4" fill="rgba(14,165,233,0.04)" stroke="rgba(14,165,233,0.1)" />
          <text x="10" y="15" fill="rgba(255,255,255,0.6)" fontSize="9px" fontWeight="500">DuckDuckGo + Wikipedia</text>
        </g>
      </g>

      {/* Benchmark Suite */}
      <g transform="translate(740, 370)" style={getStyle(0)}>
        <rect width="180" height="95" rx="8" fill="#070a13" stroke="#14b8a6" strokeWidth="1" />
        <text x="15" y="25" fill="#14b8a6" fontSize="9px" fontWeight="700" letterSpacing="1">BENCHMARK SUITE</text>
        {['Similarity Metrics', 'Coverage Analysis', 'Latency Profiling'].map((m, i) => (
          <g key={i} transform={`translate(15, ${38 + i * 20})`}>
            <circle cx="5" cy="4" r="2.5" fill="#14b8a6" opacity="0.5" />
            <text x="14" y="8" fill="rgba(255,255,255,0.5)" fontSize="8px" fontWeight="500">{m}</text>
          </g>
        ))}
      </g>

      {/* === Connection Lines === */}
      
      {/* Frontend → Pipeline (SSE/REST) */}
      <line x1="200" y1="85" x2="258" y2="85" stroke="#6366f1" strokeWidth="1.2" markerEnd="url(#nexusArrow)" style={getLineStyle(1)} />
      <text x="214" y="78" fill="rgba(255,255,255,0.25)" fontSize="7px" fontWeight="700" style={getStyle(1)}>REST</text>

      {/* Pipeline → LLM Generation (from stage 7 bottom, routing right then up) */}
      <path d="M 462 513 L 510 513 L 510 320 L 518 320" fill="none" stroke="#6366f1" strokeWidth="1.2" markerEnd="url(#nexusArrow)" style={getLineStyle(9)} />

      {/* LLM Gen → Eval */}
      <line x1="620" y1="340" x2="620" y2="363" stroke="#f43f5e" strokeWidth="1" markerEnd="url(#nexusArrowMuted)" style={getLineStyle(10)} />

      {/* Ingestion → Pipeline (feeds vectors) */}
      <line x1="518" y1="200" x2="462" y2="290" stroke="rgba(245,158,11,0.3)" strokeWidth="1" strokeDasharray="4 4" markerEnd="url(#nexusArrowMuted)" style={getStyle(0)} />

      {/* Agentic Router (stage 1, cy≈99) → Web Search Fallback */}
      <line x1="462" y1="99" x2="508" y2="99"  stroke="rgba(14,165,233,0.4)" strokeWidth="1" strokeDasharray="4 4" style={getStyle(0)} />
      <line x1="508" y1="99" x2="508" y2="300" stroke="rgba(14,165,233,0.4)" strokeWidth="1" strokeDasharray="4 4" style={getStyle(0)} />
      <line x1="508" y1="300" x2="738" y2="300" stroke="rgba(14,165,233,0.4)" strokeWidth="1" strokeDasharray="4 4" markerEnd="url(#nexusArrowMuted)" style={getStyle(0)} />
      <text x="514" y="95" fill="rgba(14,165,233,0.6)" fontSize="7px" fontWeight="700" style={getStyle(0)}>web_route</text>

      {/* Ollama ↔ Pipeline */}
      <line x1="200" y1="268" x2="258" y2="268" stroke="#6366f1" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#nexusArrow)" style={getLineStyle([5, 9])} />
      <text x="208" y="260" fill="rgba(255,255,255,0.2)" fontSize="7px" fontWeight="700" style={getStyle([5, 9])}>EMBED</text>

      {/* ChromaDB → Pipeline */}
      <line x1="200" y1="190" x2="258" y2="280" stroke="rgba(16,185,129,0.3)" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#nexusArrowMuted)" style={getLineStyle(5)} />

      {/* Footer label */}
      <text x="40" y="535" fill="rgba(255,255,255,0.2)" fontSize="10px" fontWeight="600" letterSpacing="1">Nexus Agentic RAG Pipeline · v1.0.0</text>
    </svg>
  );
}
