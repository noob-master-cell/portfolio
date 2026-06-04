import { DATA } from '../data/content';
import { Icons } from '../components/ui/Icons';
import SectionLabel from '../components/ui/SectionLabel';

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
          <SectionLabel text="Get in Touch / Contact" isDark={true} />

          <h2 className="text-[52px] md:text-[80px] font-bold capitalize tracking-tighter mb-8 text-white leading-[0.95]">
            let&apos;s build <br />
            <span className="text-slate-655">something remarkable.</span>
          </h2>
          
          <p className="font-sans text-base text-slate-400 mb-8 md:mb-12 leading-relaxed max-w-2xl">
            {DATA.identity.availability}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {contactMethods.map((method, i) => (
              <a 
                key={i}
                href={method.url}
                target={method.label !== 'mobile' && method.label !== 'email' ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group relative flex flex-col p-6 bg-slate-900/10 border border-slate-800/80 hover:border-indigo-500/30 hover:bg-slate-900/20 rounded-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="w-10 h-10 rounded-md border border-slate-800 flex items-center justify-center group-hover:border-indigo-500/25 transition-colors bg-black/20">
                    <method.icon width={18} height={18} className="text-slate-500 group-hover:text-indigo-450 transition-colors" />
                  </div>
                  <Icons.ExternalLink width={12} height={12} className="text-slate-700 group-hover:text-indigo-450 transition-all -translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />
                </div>

                <div className="mt-auto">
                  <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest mb-1">
                    {method.label}
                  </div>
                  <div className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors truncate">
                    {method.value}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer Branding */}
      <div className="absolute bottom-10 left-6 lg:left-12 flex items-center gap-6 opacity-30 hidden md:flex font-mono text-[10px] uppercase tracking-widest text-slate-500">
        <span>© 2026 // Dheeraj Karwasra</span>
        <div className="w-8 h-[1px] bg-slate-800" />
        <span>System Active</span>
      </div>
    </section>
  );
}
