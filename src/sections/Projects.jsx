import { useState } from 'react';
import { Link } from 'react-router-dom';
import GatekeeperDiagram from '../components/diagrams/GatekeeperDiagram';
import NexusDiagram from '../components/diagrams/NexusDiagram';
import PerformanceChart from '../components/diagrams/PerformanceChart';
import { DATA } from '../data/content';
import { Icons } from '../components/ui/Icons';
import SectionLabel from '../components/ui/SectionLabel';

const ProjectScreen = ({ number, slug, title, subtitle, date, description, isDark, Diagram, metrics, tech, links }) => {
  const bgClass = isDark ? 'bg-[#0a0a0a] text-[#ededed]' : 'bg-[#fafafa] text-[#0a0a0a]';
  const borderClass = isDark ? 'border-neutral-900' : 'border-neutral-200';
  const textMuted = isDark ? 'text-neutral-500' : 'text-neutral-500';
  const textBody = isDark ? 'text-neutral-400' : 'text-neutral-600';

  const [activeStep, setActiveStep] = useState(0);
  const [simLogs, setSimLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [simType, setSimType] = useState('hit');

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
        { step: 1, log: "GET /query received from client" },
        { step: 2, log: "Router: intent classified, routing to local RAG pipeline" },
        { step: 3, log: "Rewriter: resolving pronouns, expanding parameters" },
        { step: 4, log: "HyDE: generating hypothetical document embedding" },
        { step: 5, log: "Vector search: ChromaDB cosine search on 768 dim vectors" },
        { step: 6, log: "BM25: lexical index scan, term frequencies calculated" },
        { step: 7, log: "RRF: fusing vector and lexical ranks" },
        { step: 8, log: "MMR: re ranking passages with lambda 0.6" },
        { step: 9, log: "Ollama: streaming response with Qwen 3.5 9B" },
        { step: 10, log: "Faithfulness score: 0.98. Done." }
      ];
    } else if (isGatekeeper) {
      steps = [
        { step: 1, log: "Ingress: GET /api/v1/metrics from 192.168.1.42" },
        { step: 2, log: "Auth: RS256 JWT validated against rotated JWKS keys" },
        { step: 3, log: "Rate limit: Redis bucket has 98 of 100 tokens (0.4ms)" },
        { step: 4, log: "OPA: Rego policy evaluation passed" },
        { step: 5, log: "Session: revocation index clear" },
        { step: 6, log: "Tracing: spans pushed to OpenTelemetry" },
        { step: 7, log: "Proxy: forwarded to upstream. 200 OK." }
      ];
    } else if (isEsn) {
      if (simType === 'hit') {
        steps = [
          { step: 1, log: "GraphQL query: events { title, capacity }" },
          { step: 2, log: "Auth: Auth0 session valid" },
          { step: 3, log: "Guard: complexity score 340, under limit of 1000" },
          { step: 4, log: "DataLoader: batching active" },
          { step: 5, log: "Redis: cache hit, 85 records served in 0.8ms" },
          { step: 8, log: "Response sent in 4.2ms total" }
        ];
      } else {
        steps = [
          { step: 1, log: "GraphQL query: events { title, capacity }" },
          { step: 2, log: "Auth: Auth0 session valid" },
          { step: 3, log: "Guard: complexity score 340, under limit of 1000" },
          { step: 4, log: "DataLoader: batching active" },
          { step: 5, log: "Redis: cache miss, forwarding to database" },
          { step: 6, log: "Prisma: N+1 joins resolved" },
          { step: 7, log: "PostgreSQL: 85 records fetched in 8.2ms" },
          { step: 8, log: "Response sent in 16.4ms total" }
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
        setTimeout(runNextStep, 1300);
      } else {
        setIsRunning(false);
      }
    };

    runNextStep();
  };

  return (
    <div className={`section-shell ${bgClass} ${!isDark ? 'border-y border-neutral-200' : ''}`}>
      <div className="container-shell">
        <SectionLabel text={`Project ${String(number).padStart(2, '0')}`} isDark={isDark} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-5 flex flex-col">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3 leading-tight">
              {title}
            </h2>
            <div className={`text-sm ${textMuted} mb-6`}>
              {subtitle}
            </div>
            <p className={`text-base ${textBody} leading-relaxed mb-6`}>
              {description}
            </p>
            <div className={`font-mono text-xs ${textMuted} mb-8`}>
              {date}
            </div>

            <div className="hidden md:block">
              <div className={`text-xs ${textMuted} mb-3`}>
                Stack
              </div>
              <div className="flex flex-wrap gap-1.5 mb-8">
                {tech && tech.split(', ').map((t, i) => (
                  <span
                    key={i}
                    className={`px-2.5 py-1 font-mono text-xs rounded-md border ${isDark ? 'border-neutral-800 text-neutral-400' : 'border-neutral-200 text-neutral-600 bg-white'}`}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {slug && (
                  <Link
                    to={`/projects/${slug}`}
                    viewTransition
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${isDark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'}`}
                  >
                    Read case study
                    <Icons.ArrowUpRight width={14} height={14} />
                  </Link>
                )}
                {links && links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${isDark ? 'border border-neutral-800 text-neutral-300 hover:border-neutral-600' : 'border border-neutral-300 text-neutral-700 hover:border-neutral-500'}`}
                  >
                    {link.label.toLowerCase().includes('github') ? <Icons.Github width={14} height={14} /> : <Icons.ExternalLink width={14} height={14} />}
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-7 flex flex-col">
            <div className={`border ${borderClass} rounded-lg overflow-hidden flex flex-col`}>
              <div className={`border-b ${borderClass} flex items-center justify-between px-4 py-3`}>
                <div className="flex items-center gap-2.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${isRunning ? 'bg-indigo-500 soft-pulse' : 'bg-emerald-500'}`} />
                  <span className={`font-mono text-xs ${textMuted}`}>
                    architecture
                  </span>
                </div>
                {title.toLowerCase().includes('esn') && (
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setSimType('hit')}
                      disabled={isRunning}
                      className={`px-2.5 py-1 text-xs rounded-md transition-colors ${simType === 'hit' ? (isDark ? 'bg-neutral-800 text-white' : 'bg-neutral-900 text-white') : (isDark ? 'text-neutral-500 hover:text-neutral-300' : 'text-neutral-500 hover:text-neutral-800')}`}
                    >
                      cache hit
                    </button>
                    <button
                      onClick={() => setSimType('miss')}
                      disabled={isRunning}
                      className={`px-2.5 py-1 text-xs rounded-md transition-colors ${simType === 'miss' ? (isDark ? 'bg-neutral-800 text-white' : 'bg-neutral-900 text-white') : (isDark ? 'text-neutral-500 hover:text-neutral-300' : 'text-neutral-500 hover:text-neutral-800')}`}
                    >
                      cache miss
                    </button>
                  </div>
                )}
              </div>

              <div className="relative flex w-full items-center justify-start md:justify-center p-4 overflow-x-auto overflow-y-hidden max-h-[420px] md:max-h-none">
                <div className="min-w-[750px] md:min-w-0 w-full flex items-center justify-center">
                  <Diagram activeStep={activeStep} />
                </div>
              </div>

              <div className={`border-t ${borderClass} flex flex-col gap-3 p-4`}>
                <div className={`h-[100px] overflow-y-auto flex flex-col gap-1 ${isDark ? 'bg-neutral-950' : 'bg-neutral-900'} text-neutral-200 p-3 rounded-md font-mono text-xs`}>
                  {simLogs.length === 0 ? (
                    <div className="text-neutral-600">Click run to start the trace.</div>
                  ) : (
                    simLogs.map((log, idx) => (
                      <div key={idx} className="flex gap-2 leading-relaxed">
                        <span className="text-indigo-400 shrink-0">{'>'}</span>
                        <span className="text-neutral-300">{log}</span>
                      </div>
                    ))
                  )}
                </div>

                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={triggerSimulation}
                    disabled={isRunning}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${isRunning ? (isDark ? 'bg-neutral-900 text-neutral-600 cursor-not-allowed' : 'bg-neutral-100 text-neutral-400 cursor-not-allowed') : (isDark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800')}`}
                  >
                    {isRunning ? 'Running' : 'Run trace'}
                  </button>
                  <div className={`text-xs font-mono ${textMuted}`}>
                    {activeStep > 0 ? `step ${activeStep}` : 'idle'}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8">
              {metrics.map((m, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-semibold tracking-tight mb-1">
                    {m.val}
                  </span>
                  <span className={`font-mono text-xs ${textMuted}`}>
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 md:hidden">
              <div className={`text-xs ${textMuted} mb-3`}>
                Stack
              </div>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {tech && tech.split(', ').map((t, i) => (
                  <span
                    key={i}
                    className={`px-2.5 py-1 font-mono text-xs rounded-md border ${isDark ? 'border-neutral-800 text-neutral-400' : 'border-neutral-200 text-neutral-600 bg-white'}`}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {slug && (
                  <Link
                    to={`/projects/${slug}`}
                    viewTransition
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}
                  >
                    Read case study
                    <Icons.ArrowUpRight width={14} height={14} />
                  </Link>
                )}
                {links && links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md ${isDark ? 'border border-neutral-800 text-neutral-300' : 'border border-neutral-300 text-neutral-700'}`}
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
    </div>
  );
};

const OtherProjectsScreen = ({ isDark }) => {
  const bgClass = isDark ? 'bg-[#0a0a0a] text-[#ededed]' : 'bg-[#fafafa] text-[#0a0a0a]';
  const borderClass = isDark ? 'border-neutral-900 hover:border-neutral-700' : 'border-neutral-200 hover:border-neutral-400';
  const textMuted = isDark ? 'text-neutral-500' : 'text-neutral-500';
  const textBody = isDark ? 'text-neutral-400' : 'text-neutral-600';

  return (
    <div className={`section-shell ${bgClass} ${!isDark ? 'border-y border-neutral-200' : ''}`}>
      <div className="container-shell">
        <SectionLabel text="More projects" isDark={isDark} />

        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-12">
          Smaller things I built
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {DATA.otherProjects.map((proj, i) => (
            <a
              key={i}
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col border ${borderClass} p-6 h-full transition-colors rounded-lg group`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-base font-semibold">{proj.title}</h3>
                <Icons.ArrowUpRight width={14} height={14} className={`${textMuted} opacity-0 group-hover:opacity-100 transition-opacity`} />
              </div>
              <p className={`text-sm leading-relaxed mb-6 flex-1 ${textBody}`}>
                {proj.description}
              </p>
              <div className={`font-mono text-xs ${textMuted}`}>
                {proj.tech}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const getDiagramComponent = (type) => {
    switch (type) {
      case 'nexus':
        return NexusDiagram;
      case 'gatekeeper':
        return GatekeeperDiagram;
      case 'performance':
        return PerformanceChart;
      default:
        return GatekeeperDiagram;
    }
  };

  return (
    <section id="projects" className="relative w-full">
      {DATA.featuredProjects.map((project, i) => (
        <ProjectScreen
          key={i}
          number={i + 1}
          slug={project.slug}
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
      <OtherProjectsScreen isDark={false} />
    </section>
  );
}
