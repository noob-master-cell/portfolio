import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { DATA } from '../data/content';
import GatekeeperDiagram from '../components/diagrams/GatekeeperDiagram';
import NexusDiagram from '../components/diagrams/NexusDiagram';
import PerformanceChart from '../components/diagrams/PerformanceChart';
import { Icons } from '../components/ui/Icons';

const DIAGRAMS = {
  nexus: NexusDiagram,
  gatekeeper: GatekeeperDiagram,
  performance: PerformanceChart
};

export default function CaseStudy() {
  const { slug } = useParams();
  const project = DATA.featuredProjects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!project) return;
    const prevTitle = document.title;
    document.title = `${project.title}, case study, ${DATA.identity.name}`;
    return () => {
      document.title = prevTitle;
    };
  }, [project]);

  if (!project) return <Navigate to="/" replace />;

  const Diagram = DIAGRAMS[project.diagramType];
  const study = project.caseStudy;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    author: {
      '@type': 'Person',
      name: DATA.identity.name,
      url: 'https://dheerajkarwasra.com'
    },
    dateCreated: project.date,
    keywords: project.tech
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="border-b border-neutral-900">
        <div className="container-shell h-16 flex items-center justify-between">
          <Link
            to="/"
            viewTransition
            className="flex items-center gap-2 font-mono text-sm text-neutral-400 hover:text-white transition-colors"
          >
            <span>←</span>
            <span>back</span>
          </Link>
          <span className="font-mono text-xs text-neutral-500">
            case study, {project.slug}
          </span>
        </div>
      </header>

      <section className="container-shell pt-16 pb-12">
        <div className="font-mono text-xs text-neutral-500 mb-4">
          {project.date}
        </div>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white leading-[1.05] mb-4">
          {project.title}
        </h1>
        <p className="text-lg text-neutral-400 max-w-2xl mb-10">
          {project.subtitle}
        </p>

        <div className="flex flex-wrap gap-3 mb-10">
          {project.links?.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                i === 0
                  ? 'bg-white text-black hover:bg-neutral-200'
                  : 'border border-neutral-800 text-neutral-300 hover:border-neutral-600 hover:text-white'
              }`}
            >
              {link.label.toLowerCase().includes('github') ? (
                <Icons.Github width={14} height={14} />
              ) : (
                <Icons.ExternalLink width={14} height={14} />
              )}
              {link.label}
            </a>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-3xl">
          {project.metrics.map((m, i) => (
            <div key={i} className="border border-neutral-900 rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-1">
                {m.val}
              </div>
              <div className="font-mono text-xs text-neutral-500">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-shell pb-16">
        <div className="border border-neutral-900 rounded-lg p-6 md:p-10 bg-[#0d0d0d]">
          <div className="font-mono text-xs text-neutral-500 mb-6">
            architecture
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              {Diagram && <Diagram activeStep={0} />}
            </div>
          </div>
        </div>
      </section>

      {study && (
        <>
          <section className="container-shell py-16 border-t border-neutral-900">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              <div className="md:col-span-3">
                <div className="font-mono text-xs text-neutral-500">01</div>
                <h2 className="text-xl font-semibold text-white mt-2">Problem</h2>
              </div>
              <p className="md:col-span-9 text-base text-neutral-400 leading-relaxed">
                {study.problem}
              </p>
            </div>
          </section>

          <section className="container-shell py-16 border-t border-neutral-900">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              <div className="md:col-span-3">
                <div className="font-mono text-xs text-neutral-500">02</div>
                <h2 className="text-xl font-semibold text-white mt-2">Approach</h2>
              </div>
              <p className="md:col-span-9 text-base text-neutral-400 leading-relaxed">
                {study.approach}
              </p>
            </div>
          </section>

          <section className="container-shell py-16 border-t border-neutral-900">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              <div className="md:col-span-3">
                <div className="font-mono text-xs text-neutral-500">03</div>
                <h2 className="text-xl font-semibold text-white mt-2">Key decisions</h2>
              </div>
              <div className="md:col-span-9 flex flex-col gap-6">
                {study.decisions.map((d, i) => (
                  <div key={i} className="border-l border-neutral-800 pl-5">
                    <div className="text-base font-medium text-white mb-2">
                      {d.title}
                    </div>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      {d.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="container-shell py-16 border-t border-neutral-900">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              <div className="md:col-span-3">
                <div className="font-mono text-xs text-neutral-500">04</div>
                <h2 className="text-xl font-semibold text-white mt-2">Outcomes</h2>
              </div>
              <ul className="md:col-span-9 flex flex-col gap-3 text-base text-neutral-400 leading-relaxed">
                {study.outcomes.map((o, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-neutral-600 shrink-0 mt-0.5">·</span>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="container-shell py-16 border-t border-neutral-900">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              <div className="md:col-span-3">
                <div className="font-mono text-xs text-neutral-500">05</div>
                <h2 className="text-xl font-semibold text-white mt-2">What I would change</h2>
              </div>
              <p className="md:col-span-9 text-base text-neutral-400 leading-relaxed">
                {study.learnings}
              </p>
            </div>
          </section>
        </>
      )}

      <section className="container-shell py-16 border-t border-neutral-900">
        <div className="font-mono text-xs text-neutral-500 mb-4">stack</div>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.split(', ').map((t, i) => (
            <span
              key={i}
              className="px-2.5 py-1 font-mono text-xs text-neutral-400 border border-neutral-800 rounded-md"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      <footer className="border-t border-neutral-900 mt-16">
        <div className="container-shell py-10 flex items-center justify-between">
          <Link
            to="/"
            viewTransition
            className="font-mono text-sm text-neutral-400 hover:text-white transition-colors"
          >
            ← back to home
          </Link>
          <span className="font-mono text-xs text-neutral-600">
            © 2026 {DATA.identity.name}
          </span>
        </div>
      </footer>
    </div>
  );
}
