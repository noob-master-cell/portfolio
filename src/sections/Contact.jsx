import { DATA } from '../data/content';
import { Icons } from '../components/ui/Icons';

export default function Contact() {
  const contactMethods = [
    { 
      label: 'email', 
      value: DATA.identity.email, 
      url: `mailto:${DATA.identity.email}`, 
      icon: Icons.Mail,
      sub: 'primary_comms'
    },
    { 
      label: 'linkedin', 
      value: 'in/dkarwasra', 
      url: DATA.identity.links.find(l => l.label === 'linkedin')?.url, 
      icon: Icons.Linkedin,
      sub: 'pro_network'
    },
    { 
      label: 'github', 
      value: 'noob-master-cell', 
      url: DATA.identity.links.find(l => l.label === 'github')?.url, 
      icon: Icons.Github,
      sub: 'source_control'
    },
    { 
      label: 'leetcode', 
      value: 'dheerajkarwasra',
      url: DATA.identity.links.find(l => l.label === 'leetcode')?.url,
      icon: Icons.Terminal,
      sub: 'algo_profiling'
    },
    { 
      label: 'mobile', 
      value: DATA.identity.phone, 
      url: `tel:${DATA.identity.phone}`, 
      icon: Icons.Phone,
      sub: 'direct_access'
    }
  ];

  return (
    <section id="contact" className="w-full min-h-screen bg-[#030712] text-[#f8fafc] flex flex-col relative z-30 overflow-hidden py-[120px] md:py-[200px]">
      {/* Background Matrix Effect */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 flex-grow flex flex-col justify-center relative z-10">
        <div className="max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-[#6366f1]" />
            <span className="font-mono text-xs text-[#6366f1] uppercase tracking-[0.2em] font-bold">initialize_connection // sys.contact</span>
          </div>

          <h2 className="text-[52px] md:text-[86px] font-bold capitalize tracking-tighter mb-10 text-white leading-[0.9]">
            let&apos;s build <br />
            <span className="text-[#333]">something stable.</span>
          </h2>
          
          <p className="font-mono text-base text-[#888] mb-8 md:mb-16 leading-relaxed max-w-2xl">
            {DATA.identity.availability}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {contactMethods.map((method, i) => (
              <a 
                key={i}
                href={method.url}
                target={method.label !== 'mobile' && method.label !== 'email' ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group relative flex flex-col p-5 md:p-6 bg-[#111]/40 border border-white/5 hover:border-[#6366f1]/40 transition-all duration-500 overflow-hidden"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-[#6366f1]" />
                </div>

                <div className="flex items-center justify-between mb-4 md:mb-8">
                  <div className="w-10 h-10 border border-white/5 flex items-center justify-center group-hover:border-[#6366f1]/20 transition-colors">
                    <method.icon width={18} height={18} className="text-white/40 group-hover:text-[#6366f1] transition-colors" />
                  </div>
                  <Icons.ExternalLink width={12} height={12} className="text-white/10 group-hover:text-[#6366f1] transition-all -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
                </div>

                <div className="mt-auto">
                  <div className="font-mono text-xs text-[#444] uppercase tracking-widest mb-1 group-hover:text-[#666] transition-colors">
                    {method.sub}
                  </div>
                  <div className="font-mono text-xs text-[#6366f1] font-bold uppercase tracking-widest mb-2 transition-colors">
                    {method.label}
                  </div>
                  <div className="text-base font-bold text-white/70 group-hover:text-white transition-colors truncate">
                    {method.value}
                  </div>
                </div>

                {/* Status Bar */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#6366f1] group-hover:w-full transition-all duration-700" />
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer Branding */}
      <div className="absolute bottom-12 left-6 lg:left-12 flex items-center gap-6 opacity-20 hidden md:flex font-mono text-xs uppercase tracking-widest">
        <span>© 2026 // DHEERAJ_KARWASRA</span>
        <div className="w-8 h-[1px] bg-white/50" />
        <span>SYS_STATUS: ONLINE</span>
      </div>
    </section>
  );
}
