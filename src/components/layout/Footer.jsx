import { DATA } from '../../data/content';

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#222] px-6 lg:px-12 py-10 flex flex-col md:flex-row justify-between items-center md:items-end font-mono text-xs text-[#555] relative z-30 bg-[#030712] gap-10">
      {/* Left: Open to Work */}
      <div className="flex flex-col gap-1.5 items-center md:items-start w-full md:w-1/3 order-2 md:order-1">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
          </div>
          <span className="text-[#888] uppercase tracking-[0.2em] font-bold">open_to_work // EU</span>
        </div>
        <div className="text-[#666]">roles: software_engineer · backend_engineer · ai_engineer</div>
        <div className="text-[#666]">location: kaiserslautern, germany</div>
        <div className="text-[#666]">built_with: react · vite · tailwind_css</div>
      </div>

      {/* Center: Identity & Links */}
      <div className="flex flex-col items-center w-full md:w-1/3 gap-4 order-1 md:order-2">
        <div className="text-[#6366f1] tracking-[0.3em] font-bold uppercase opacity-80">{DATA.identity.model} // kaiserslautern</div>
        <div className="flex gap-4 border border-[#1a1a1a] px-5 py-2 bg-[#050505] text-[#888]">
          {DATA.identity.links.map(link => (
            <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="hover:text-white transition-colors uppercase tracking-widest text-xs">{link.label}</a>
          ))}
        </div>
        <div className="text-xs text-[#222] tracking-[0.6em] font-bold">© 2026 DHEERAJ KARWASRA</div>
      </div>

      {/* Right: Build Info */}
      <div className="flex flex-col gap-1.5 items-center md:items-end w-full md:w-1/3 md:text-right order-3">
        <div className="text-[#666]">email: {DATA.identity.email}</div>
        <div className="text-[#666]">phone: {DATA.identity.phone}</div>
        <div className="text-[#666]">location: {DATA.identity.location.toLowerCase().replace(/ /g, '_')}</div>
        <div className="text-[#6366f1] font-bold tracking-widest uppercase opacity-40">status: seeking_opportunities</div>
      </div>
    </footer>
  );
}
