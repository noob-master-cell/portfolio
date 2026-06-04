import { DATA } from '../../data/content';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 px-6 lg:px-12 py-12 flex flex-col md:flex-row justify-between items-center md:items-end font-mono text-xs text-slate-500 relative z-30 bg-[#030712] gap-10">
      {/* Left: Open to Work */}
      <div className="flex flex-col gap-1.5 items-center md:items-start w-full md:w-1/3 order-2 md:order-1">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
          </div>
          <span className="text-slate-300 uppercase tracking-[0.2em] font-bold">Open to Work / EU</span>
        </div>
        <div className="text-slate-400">Roles: Software Engineer · Backend Engineer · AI Engineer</div>
        <div className="text-slate-400">Location: Kaiserslautern, Germany</div>
        <div className="text-slate-400">Built with: React · Vite · Tailwind CSS</div>
      </div>

      {/* Center: Identity & Links */}
      <div className="flex flex-col items-center w-full md:w-1/3 gap-4 order-1 md:order-2">
        <div className="text-[#6366f1] tracking-[0.3em] font-bold uppercase opacity-90">{DATA.identity.model} / Kaiserslautern</div>
        <div className="flex gap-6 border border-slate-800/60 px-6 py-2.5 bg-[#070a13] rounded-md text-slate-400">
          {DATA.identity.links.map(link => (
            <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="hover:text-white transition-colors uppercase tracking-widest text-xs">{link.label}</a>
          ))}
        </div>
        <div className="text-xs text-slate-800 tracking-[0.6em] font-bold mt-1">© 2026 DHEERAJ KARWASRA</div>
      </div>

      {/* Right: Contact & Status */}
      <div className="flex flex-col gap-1.5 items-center md:items-end w-full md:w-1/3 md:text-right order-3">
        <div className="text-slate-400">Email: {DATA.identity.email}</div>
        <div className="text-slate-400">Phone: {DATA.identity.phone}</div>
        <div className="text-slate-400">Location: {DATA.identity.location}</div>
        <div className="text-[#6366f1] font-bold tracking-widest uppercase opacity-70 mt-1">Status: Seeking Opportunities</div>
      </div>
    </footer>
  );
}
