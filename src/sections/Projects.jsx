import { useState } from 'react';
import GatekeeperDiagram from '../components/diagrams/GatekeeperDiagram';
import NexusDiagram from '../components/diagrams/NexusDiagram';
import PerformanceChart from '../components/diagrams/PerformanceChart';
import { DATA } from '../data/content';
import { Icons } from '../components/ui/Icons';

// --- Sub-components scoped to Projects ---

const ProjectScreen = ({ number, title, subtitle, date, description, isDark, Diagram, metrics, tech, links }) => {
  const bgClass = isDark ? 'bg-[#030712] text-[#f8fafc]' : 'bg-[#f8fafc] text-[#0f172a]';
  const borderClass = isDark ? 'border-white/10 bg-[#020617]/50' : 'border-black/10 bg-slate-50/50';
  const textMuted = 'text-[#888]';

  const [activeStep, setActiveStep] = useState(0);
  const [simLogs, setSimLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [simType, setSimType] = useState('hit'); // 'hit' or 'miss' for ESN Event Platform

  const triggerSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setSimLogs([]);
    setActiveStep(0);

    const isNexus = title.toLowerCase().includes('nexus');
    const isGatekeeper = title.toLowerCase().includes('gatekeeper');
    const isEsn = title.toLowerCase().includes('esn');

    let steps = [];

    if (isNexus) {
      steps = [
        { step: 1, log: "REST Connection: Client GET /query?q='Fraunhofer developer impact'..." },
        { step: 2, log: "Agentic Router: Analyzing query intent... Routing to LOCAL_RAG_PIPELINE." },
        { step: 3, log: "Query Rewriter: Resolving pronouns and expanding parameters..." },
        { step: 4, log: "HyDE Expansion: Generating hypothetical document embedding..." },
        { step: 5, log: "Vector Search: Executing ChromaDB cosine search. Scanning 768-dim vectors." },
        { step: 6, log: "BM25 Scoring: Scanning lexical indexes. Term frequencies calculated." },
        { step: 7, log: "RRF Fusion: Coalescing vector & lexical ranks via Reciprocal Rank Fusion." },
        { step: 8, log: "MMR Re-ranking: Diversifying passage list (lambda=0.6) to cut redundancy." },
        { step: 9, log: "Ollama LLM: Generating SSE stream using Qwen-3.5-9B (42 tokens/sec)." },
        { step: 10, log: "Evaluation: Running Faithfulness metrics check. Score: 0.98. Success!" }
      ];
    } else if (isGatekeeper) {
      steps = [
        { step: 1, log: "Ingress: Client request GET /api/v1/metrics received from IP 192.168.1.42." },
        { step: 2, log: "Auth Shield: Extracting RS256 JWT header. Fetching rotated JWKS keys... VALID." },
        { step: 3, log: "Rate Limiter: Checking client IP. Redis token bucket remaining: 98/100 (0.4ms)." },
        { step: 4, log: "OPA Engine: Calling OPA agent. Evaluating Rego access control policy... ALLOWED." },
        { step: 5, log: "Session Store: Checking Redis active session pool. Revocation index: CLEAR." },
        { step: 6, log: "Observability: Pushing routing traces and latency spans to OpenTelemetry." },
        { step: 7, log: "Forward: Proxying verified payload upstream to backend service. Status: 200 OK." }
      ];
    } else if (isEsn) {
      if (simType === 'hit') {
        steps = [
          { step: 1, log: "Client GraphQL: Sending Query events { title, capacity } from Apollo Client." },
          { step: 2, log: "Auth Gateway: Route resolved via Nginx Proxy. Validating Auth0 Session state." },
          { step: 3, log: "Guard: Analyzing query AST tree complexity. Complexity score: 340 (Allowed < 1000)." },
          { step: 4, log: "DataLoader: Query batching active. Coalescing sub-queries..." },
          { step: 5, log: "Redis Cache: Checking cached query hashes. HIT! Serving 85 records in 0.8ms." },
          { step: 8, log: "GraphQL Response: Query resolved from cache. Total turnaround: 4.2ms. Done." }
        ];
      } else {
        steps = [
          { step: 1, log: "Client GraphQL: Sending Query events { title, capacity } from Apollo Client." },
          { step: 2, log: "Auth Gateway: Route resolved via Nginx Proxy. Validating Auth0 Session state." },
          { step: 3, log: "Guard: Analyzing query AST tree complexity. Complexity score: 340 (Allowed < 1000)." },
          { step: 4, log: "DataLoader: Query batching active. Coalescing sub-queries..." },
          { step: 5, log: "Redis Cache: Checking cached query hashes. MISS! Forwarding to database." },
          { step: 6, log: "ORM Middleware: delegating batched SQL to Prisma ORM. N+1 joins resolved." },
          { step: 7, log: "Primary DB: Querying PostgreSQL 15 waitlist logic. Fetched 85 records (8.2ms)." },
          { step: 8, log: "GraphQL Response: Query resolved from PostgreSQL. Total turnaround: 16.4ms. Done." }
        ];
      }
    }

    let i = 0;
    const runNextStep = () => {
      if (i < steps.length) {
        const item = steps[i];
        setActiveStep(item.step);
        setSimLogs(prev => [...prev, item.log]);
        i++;
        setTimeout(runNextStep, 1300); // Snappy, readable pacing
      } else {
        setIsRunning(false);
      }
    };

    runNextStep();
  };

  return (
    <div className={`relative w-full min-h-screen flex flex-col justify-center overflow-x-hidden md:overflow-hidden ${bgClass} py-16 md:py-0`}>
      <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 grid grid-cols-12 gap-8 relative z-10">
        
        {/* Ghost number - Refined for mobile safety */}
        <div className={`absolute -top-32 md:-top-48 -left-20 md:-left-12 text-[250px] md:text-[400px] font-bold opacity-[0.015] md:opacity-[0.02] scale-75 md:scale-100 select-none pointer-events-none font-sans leading-none tracking-tighter ${isDark ? 'text-white' : 'text-black'}`}>
          0{number}
        </div>

        {/* Left: title block */}
        <div className="col-span-12 md:col-span-5 lg:col-span-4 z-10 flex flex-col justify-center">
          <h2 className="text-[40px] md:text-[56px] lg:text-[68px] font-bold capitalize tracking-tighter mb-4 leading-none">{title}</h2>
          <div className={`font-mono text-xs md:text-sm mb-6 uppercase tracking-widest ${isDark ? 'text-white/50' : 'text-black/50'}`}>{subtitle}</div>
          <p className={`font-sans text-[15px] md:text-[17px] mb-8 leading-relaxed ${isDark ? 'text-white/60' : 'text-black/60'}`}>{description}</p>
          <div className="font-mono text-xs text-[#6366f1] mb-8 md:mb-12 uppercase tracking-[0.2em] font-bold">{date}</div>
          
          <div className="mt-auto hidden md:block">
            <div className={`font-sans text-xs font-semibold mb-4 uppercase tracking-wider text-indigo-600`}>Technologies</div>
            <div className="flex flex-wrap gap-2 mb-8">
              {tech && tech.split(', ').map((t, i) => (
                <span 
                  key={i} 
                  className={`px-3 py-1 font-mono text-xs border rounded-md ${isDark ? 'border-white/10 bg-white/[0.02] text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'} transition-all duration-300 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 cursor-default`}
                >
                  {t}
                </span>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4">
              {links && links.map((link, i) => (
                <a 
                  key={i} 
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-sans text-xs font-semibold uppercase tracking-wider hover:bg-indigo-700 transition-all duration-300 rounded-md shadow-sm"
                >
                  {link.label.toLowerCase().includes('github') ? <Icons.Github width={14} height={14} /> : <Icons.ExternalLink width={14} height={14} />}
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: diagram + metrics + sandbox simulator */}
        <div className="col-span-12 md:col-span-7 lg:col-span-8 flex flex-col justify-center z-10">
          <div className={`flex w-full border ${isDark ? 'border-white/10' : 'border-black/10'} relative group flex-col bg-white/[0.01] overflow-hidden`}>
            {/* Diagram HUD Header */}
            <div className={`flex w-full bg-inherit border-b ${isDark ? 'border-white/10' : 'border-black/10'} items-center justify-between px-4 md:px-6 py-3 md:py-4 z-20`}>
              <div className="flex items-center gap-3">
                <div className={`w-1.5 h-1.5 rounded-full ${isRunning ? 'bg-indigo-500' : 'bg-emerald-500'} animate-pulse`} />
                <span className={`font-sans text-[10px] sm:text-xs uppercase tracking-wider font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>System Architecture · 0{number}</span>
              </div>
              <div className={`font-sans text-[9px] sm:text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'} tracking-wider uppercase font-semibold`}>
                Version 2.6.0
              </div>
            </div>

            {/* Main Interactive Diagram SVG */}
            <div className="relative flex w-full items-center justify-start md:justify-center p-4 pt-10 md:pt-12 overflow-x-auto overflow-y-hidden custom-scrollbar max-h-[450px] md:max-h-none">
              {/* Dynamic horizontal swipe hint for mobile */}
              <div className="md:hidden absolute top-2 right-4 font-mono text-[8px] text-[#6366f1]/80 animate-pulse bg-black/85 px-2 py-0.5 border border-white/5 rounded-sm select-none pointer-events-none">
                ◀ SWIPE HORIZONTALLY TO EXPLORE BLUEPRINT ▶
              </div>
              <div className="min-w-[750px] md:min-w-0 w-full flex items-center justify-center">
                <Diagram activeStep={activeStep} />
              </div>
            </div>

            {/* Sandbox Console Panel */}
            <div className={`border-t ${isDark ? 'border-white/10 bg-slate-950 text-white' : 'border-slate-200 bg-slate-50 text-slate-800'} p-4 flex flex-col font-sans text-xs gap-3 transition-all`}>
              <div className="flex flex-col xs:flex-row gap-2 xs:gap-0 xs:items-center justify-between border-b border-slate-200 dark:border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-indigo-500 animate-ping' : 'bg-emerald-500'}`} />
                  <span className="font-semibold tracking-wide text-slate-800 dark:text-slate-200">Architecture Trace Console</span>
                </div>
                {/* Branching mode buttons for ESN event platform */}
                {title.toLowerCase().includes('esn') && (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setSimType('hit')} 
                      disabled={isRunning}
                      className={`px-2.5 py-1 border cursor-pointer rounded-md text-[10px] uppercase font-semibold transition-all ${simType === 'hit' ? 'border-indigo-600 text-indigo-600 bg-indigo-50 dark:bg-indigo-950/20' : 'border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400'}`}
                    >
                      Cache Hit
                    </button>
                    <button 
                      onClick={() => setSimType('miss')} 
                      disabled={isRunning}
                      className={`px-2.5 py-1 border cursor-pointer rounded-md text-[10px] uppercase font-semibold transition-all ${simType === 'miss' ? 'border-rose-500 text-rose-500 bg-rose-50 dark:bg-rose-950/20' : 'border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400'}`}
                    >
                      Cache Miss
                    </button>
                  </div>
                )}
              </div>

              {/* Log outputs stream */}
              <div className="h-[95px] overflow-y-auto flex flex-col gap-1 border border-slate-200 dark:border-white/10 bg-slate-900 text-slate-100 p-3 rounded-md scrollbar-thin text-left font-mono text-[11px]">
                {simLogs.length === 0 ? (
                  <div className="text-slate-500 italic">System ready. Click "Execute Simulation" below to trigger diagnostic trace.</div>
                ) : (
                  simLogs.map((log, idx) => (
                    <div key={idx} className="flex gap-2 leading-relaxed animate-in fade-in slide-in-from-bottom-1 duration-300">
                      <span className="text-indigo-400 shrink-0 font-bold">{'>'}</span>
                      <span className="text-slate-300">{log}</span>
                    </div>
                  ))
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                <button
                  onClick={triggerSimulation}
                  disabled={isRunning}
                  className={`w-full sm:w-auto px-4 py-2 border font-semibold uppercase tracking-wider text-[10px] rounded-md transition-all cursor-pointer
                    ${isRunning 
                      ? 'border-slate-200 dark:border-white/10 text-slate-400 dark:text-white/20 bg-slate-100 dark:bg-white/[0.02] cursor-not-allowed' 
                      : 'border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white dark:text-white dark:bg-indigo-600/20 dark:hover:bg-indigo-600'
                    }`}
                >
                  {isRunning ? 'Simulation Active' : 'Execute Simulation'}
                </button>
                <div className="text-slate-500 dark:text-slate-400 text-[10px] uppercase tracking-wider font-semibold self-end sm:self-auto">
                  Trace Status: {activeStep > 0 ? `Stage ${activeStep}` : 'Standby'}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-8 mt-8 md:mt-12">
            {metrics.map((m, i) => (
              <div key={i} className="flex flex-col border-l border-[#6366f1]/40 pl-3 sm:pl-6 py-1 md:py-2 text-left">
                <span className="font-sans text-[18px] sm:text-[32px] md:text-[42px] font-bold tracking-tighter leading-none mb-1 sm:mb-2">{m.val}</span>
                <span className={`font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.2em] font-bold ${isDark ? 'text-white/40' : 'text-black/40'}`}>{m.label}</span>
              </div>
            ))}
          </div>

          {/* Mobile fallback techstack details */}
          <div className="mt-12 md:hidden">
            <div className={`font-sans text-xs font-semibold mb-4 uppercase tracking-wider text-indigo-600`}>Technologies</div>
            <div className="flex flex-wrap gap-2 mb-8">
              {tech && tech.split(', ').map((t, i) => (
                <span key={i} className={`px-3 py-1.5 font-mono text-xs border rounded-md ${isDark ? 'border-white/10 bg-white/[0.03] text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>{t}</span>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4">
              {links && links.map((link, i) => (
                <a 
                  key={i} 
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white font-sans text-xs font-semibold uppercase tracking-wider rounded-md active:scale-95 transition-all w-full justify-center shadow-sm"
                >
                  {link.label.toLowerCase().includes('github') ? <Icons.Github width={14} height={14} /> : <Icons.ExternalLink width={14} height={14} />}
                  {link.label}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const OtherProjectsScreen = ({ number, isDark }) => {
  const bgClass = isDark ? 'bg-[#030712] text-[#f8fafc]' : 'bg-[#f8fafc] text-[#0f172a]';
  const borderClass = isDark ? 'border-[#333]' : 'border-[#ddd]';
  const textMuted = 'text-[#888]';

  return (
    <div className={`relative w-full min-h-screen md:h-screen flex flex-col justify-center overflow-x-hidden md:overflow-hidden ${bgClass} py-16 md:py-0`}>
      <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Ghost number - Refined for mobile safety */}
        <div className={`absolute -top-32 md:-top-48 -left-20 md:-left-12 text-[250px] md:text-[400px] font-medium opacity-[0.015] md:opacity-[0.03] scale-75 md:scale-100 select-none pointer-events-none font-sans leading-none tracking-tighter ${isDark ? 'text-white' : 'text-black'}`}>
          0{number}
        </div>
        
        <div className="md:col-start-2 md:col-span-10">
          <h2 className="text-[32px] md:text-[48px] font-semibold capitalize tracking-tight mb-12 text-left">Other Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DATA.otherProjects.map((proj, i) => (
              <a
                key={i}
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col border ${borderClass} p-6 h-full transition-all duration-300 hover:border-indigo-500 rounded-xl bg-white/[0.01] hover:bg-white/[0.03] hover:shadow-md text-left group`}
              >
                <h3 className="text-[20px] font-semibold capitalize mb-3 group-hover:text-indigo-600 transition-colors">{proj.title}</h3>
                <p className={`font-sans text-[14px] leading-relaxed mb-6 flex-1 ${textMuted}`}>{proj.description}</p>
                <div className="font-mono text-xs uppercase text-slate-500">
                  {proj.tech}
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

// --- Main Projects Section ---

export default function Projects() {
  const getDiagramComponent = (type) => {
    switch(type) {
      case 'nexus': return NexusDiagram;
      case 'gatekeeper': return GatekeeperDiagram;
      case 'performance': return PerformanceChart;
      default: return GatekeeperDiagram;
    }
  };

  return (
    <section id="projects" className="relative w-full z-20">
      <div className="relative w-full">
        {DATA.featuredProjects.map((project, i) => (
          <ProjectScreen
            key={i}
            number={i + 1}
            title={project.title}
            subtitle={project.subtitle}
            description={project.description}
            date={project.date}
            isDark={project.isDark}
            Diagram={getDiagramComponent(project.diagramType)}
            metrics={project.metrics}
            tech={project.tech}
            links={project.links}
          />
        ))}
        <OtherProjectsScreen number={DATA.featuredProjects.length + 1} isDark={false} />
      </div>
    </section>
  );
}
