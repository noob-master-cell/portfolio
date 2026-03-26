import { DATA } from '../../data/content';

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#222] px-6 lg:px-12 py-10 flex flex-col md:flex-row justify-between items-center md:items-end font-mono text-[10px] text-[#555] lowercase relative z-30 bg-[#0d0d0d] gap-10">
      {/* Left: System Status */}
      <div className="flex flex-col gap-1.5 items-center md:items-start w-full md:w-1/3 order-2 md:order-1">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex items-center gap-1">
            <div className="w-1 h-3 bg-[#22c55e] opacity-40" />
            <div className="w-1.5 h-5 bg-[#22c55e] animation-pulse" />
            <div className="w-1 h-2 bg-[#22c55e] opacity-60" />
          </div>
          <span className="text-[#888] uppercase tracking-[0.2em] font-bold">sys.status // operational</span>
        </div>
        <div className="text-[#666]">network_uplink: 100.0% [stable]</div>
        <div className="text-[#666]">encryption_subsystem: aes-256-gcm/rsa_4096</div>
        <div className="text-[#666]">ping: 12ms // secure_tunnel: active</div>
      </div>

      {/* Center: Identity & Links */}
      <div className="flex flex-col items-center w-full md:w-1/3 gap-4 order-1 md:order-2">
        <div className="text-[#ff5722] tracking-[0.3em] font-bold uppercase opacity-80">{DATA.identity.model} // op_id_026</div>
        <div className="flex gap-4 border border-[#1a1a1a] px-5 py-2 bg-[#050505] text-[#888]">
          {DATA.identity.links.map(link => (
            <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="hover:text-white transition-colors uppercase tracking-widest text-[9px]">{link.label}</a>
          ))}
        </div>
        <div className="text-[9px] text-[#222] tracking-[0.6em] font-bold">2026_HEARTBEAT_PROTOCOL</div>
      </div>

      {/* Right: Build Info */}
      <div className="flex flex-col gap-1.5 items-center md:items-end w-full md:w-1/3 md:text-right order-3">
        <div className="text-[#666]">origin_node: {DATA.identity.location.toLowerCase().replace(' ', '_')}</div>
        <div className="text-[#666]">build_fingerprint: 0x8a2f...7e4c</div>
        <div className="text-[#666]">kernel_version: 5.10.104_dk_lts</div>
        <div className="text-[#ff5722] font-bold tracking-widest uppercase opacity-40">terminal_subsystem: online</div>
      </div>
    </footer>
  );
}
