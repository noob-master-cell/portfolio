import GatekeeperDiagram from '../components/diagrams/GatekeeperDiagram';
import NexusDiagram from '../components/diagrams/NexusDiagram';
import PerformanceChart from '../components/diagrams/PerformanceChart';
import { DATA } from '../data/content';
import { Icons } from '../components/ui/Icons';

// --- Sub-components scoped to Projects ---

const ProjectScreen = ({ number, title, subtitle, date, description, isDark, Diagram, metrics, tech, links }) => {
  const bgClass = isDark ? 'bg-[#030712] text-[#f8fafc]' : 'bg-[#f8fafc] text-[#0f172a]';
  const borderClass = isDark ? 'border-[#333]' : 'border-[#ddd]';
  const textMuted = 'text-[#888]';

  return (
    <div className={`relative w-full min-h-screen md:h-screen flex flex-col justify-center overflow-y-auto md:overflow-hidden ${bgClass} py-16 md:py-0`}>
      <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 grid grid-cols-12 gap-8 relative z-10">
        {/* Ghost number - Refined for mobile safety */}
        <div className={`absolute -top-32 md:-top-48 -left-20 md:-left-12 text-[250px] md:text-[400px] font-bold opacity-[0.015] md:opacity-[0.02] scale-75 md:scale-100 select-none pointer-events-none font-sans leading-none tracking-tighter ${isDark ? 'text-white' : 'text-black'}`}>
          0{number}
        </div>

        {/* Left: title block */}
        <div className="col-span-12 md:col-start-2 md:col-span-4 z-10 flex flex-col justify-center">
          <h2 className="text-[44px] md:text-[68px] font-bold capitalize tracking-tighter mb-4 leading-none">{title}</h2>
          <div className={`font-mono text-sm md:text-base mb-6 uppercase tracking-widest ${isDark ? 'text-white/50' : 'text-black/50'}`}>{subtitle}</div>
          <p className={`font-sans text-[16px] md:text-[18px] mb-8 leading-relaxed ${isDark ? 'text-white/60' : 'text-black/60'}`}>{description}</p>
          <div className="font-mono text-xs text-[#6366f1] mb-8 md:mb-12 uppercase tracking-[0.2em] font-bold">{date}</div>
          <div className="mt-auto hidden md:block">
            <div className={`font-mono text-xs mb-4 uppercase tracking-widest ${textMuted}`}>[ technology_stack ]</div>
            <div className="flex flex-wrap gap-2 mb-8">
              {tech && tech.split(', ').map((t, i) => (
                <span 
                  key={i} 
                  className={`px-3 py-1 font-mono text-xs border ${borderClass} transition-all duration-300 hover:bg-[#6366f1] hover:text-white hover:border-[#6366f1] cursor-default`}
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
                  className="flex items-center gap-2 px-4 py-2 bg-[#6366f1] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-[#6366f1] transition-all duration-300 rounded-sm"
                >
                  {link.label.includes('github') ? <Icons.Github width={14} height={14} /> : <Icons.ExternalLink width={14} height={14} />}
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: diagram + metrics */}
        <div className="col-span-12 md:col-start-6 md:col-span-6 flex flex-col justify-center z-10">
          <div className={`hidden md:flex w-full border ${borderClass} relative group bg-white/[0.01] flex-col`}>
            {/* Diagram HUD Header - Refined with proper spacing */}
            <div className={`hidden md:flex w-full bg-inherit border-b ${borderClass} items-center justify-between px-6 py-4 z-20`}>
              <div className="flex items-center gap-4">
                <div className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-[#6366f1]' : 'bg-black/40'} animate-pulse`} />
                <span className={`font-mono text-xs uppercase tracking-[0.2em] ${isDark ? 'text-white/40' : 'text-black/40'}`}>system_architecture // 0x{number}</span>
              </div>
              <div className={`font-mono text-xs ${isDark ? 'text-white/40' : 'text-black/40'} tracking-widest uppercase font-bold`}>
                verified_build: 2.6.0
              </div>
            </div>

            <div className="hidden md:flex w-full items-center justify-center p-4 pt-12 overflow-x-auto overflow-y-auto custom-scrollbar max-h-[500px] md:max-h-none">
              <div className="min-w-[750px] md:min-w-0 w-full flex items-center justify-center">
                <Diagram />
              </div>
            </div>

            {/* Hard-bordered corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#6366f1] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#6366f1] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#6366f1] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#6366f1] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-8 mt-8 md:mt-12">
            {metrics.map((m, i) => (
              <div key={i} className="flex flex-col border-l border-[#6366f1]/40 pl-3 sm:pl-6 py-1 md:py-2">
                <span className="font-sans text-[18px] sm:text-[32px] md:text-[42px] font-bold tracking-tighter leading-none mb-1 sm:mb-2">{m.val}</span>
                <span className={`font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.2em] font-bold ${isDark ? 'text-white/40' : 'text-black/40'}`}>{m.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 md:hidden">
            <div className={`font-mono text-xs mb-4 uppercase tracking-widest ${textMuted}`}>[ tech_stack ]</div>
            <div className="flex flex-wrap gap-2 mb-8">
              {tech && tech.split(', ').map((t, i) => (
                <span key={i} className={`px-3 py-1.5 font-mono text-xs border ${borderClass} bg-white/[0.03]`}>{t}</span>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4">
              {links && links.map((link, i) => (
                <a 
                  key={i} 
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 bg-[#6366f1] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-sm active:scale-95 transition-all w-full justify-center"
                >
                  {link.label.includes('github') ? <Icons.Github width={14} height={14} /> : <Icons.ExternalLink width={14} height={14} />}
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
    <div className={`relative w-full min-h-screen md:h-screen flex flex-col justify-center overflow-y-auto md:overflow-hidden ${bgClass} py-16 md:py-0`}>
      <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 relative z-10">
        {/* Ghost number - Refined for mobile safety */}
        <div className={`absolute -top-32 md:-top-48 -left-20 md:-left-12 text-[250px] md:text-[400px] font-medium opacity-[0.015] md:opacity-[0.03] scale-75 md:scale-100 select-none pointer-events-none font-sans leading-none tracking-tighter ${isDark ? 'text-white' : 'text-black'}`}>
          0{number}
        </div>
        
        <div className="md:col-start-2 md:col-span-10">
          <h2 className="text-[32px] md:text-[48px] font-medium capitalize tracking-tight mb-12">other engineering exploits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DATA.otherProjects.map((proj, i) => (
              <a 
                key={i} 
                href={proj.link}
                className={`flex flex-col border ${borderClass} p-6 h-full transition-colors duration-300 hover:border-[#6366f1] group relative`}
              >
                <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r ${borderClass} group-hover:border-[#6366f1] transition-colors`} />
                <h3 className="text-[20px] font-medium capitalize mb-3 group-hover:text-[#6366f1] transition-colors">{proj.title}</h3>
                <p className={`font-sans text-[14px] leading-relaxed mb-6 flex-1 ${textMuted}`}>{proj.description}</p>
                <div className="font-mono text-xs uppercase text-[#555]">
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
        <OtherProjectsScreen number={DATA.featuredProjects.length + 1} isDark={true} />
      </div>
    </section>
  );
}
