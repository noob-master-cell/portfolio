import { DATA } from '../data/content';
import { Icons } from '../components/ui/Icons';
import SectionLabel from '../components/ui/SectionLabel';

export default function Contact() {
  const contactMethods = [
    {
      label: 'Email',
      value: DATA.identity.email,
      url: `mailto:${DATA.identity.email}`,
      icon: Icons.Mail
    },
    {
      label: 'LinkedIn',
      value: 'in/dkarwasra',
      url: DATA.identity.links.find(l => l.label === 'linkedin')?.url,
      icon: Icons.Linkedin
    },
    {
      label: 'GitHub',
      value: 'noob-master-cell',
      url: DATA.identity.links.find(l => l.label === 'github')?.url,
      icon: Icons.Github
    },
    {
      label: 'Phone',
      value: DATA.identity.phone,
      url: `tel:${DATA.identity.phone}`,
      icon: Icons.Phone
    }
  ];

  return (
    <section
      id="contact"
      className="section-shell bg-[#0a0a0a] text-[#ededed]"
    >
      <div className="container-shell">
        <SectionLabel text="04 / Contact" />

        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight mb-8">
            Let us talk.
          </h2>

          <p className="text-base text-neutral-400 leading-relaxed mb-12 max-w-2xl">
            {DATA.identity.availability}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
            {contactMethods.map((method, i) => (
              <a
                key={i}
                href={method.url}
                target={method.label !== 'Phone' && method.label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 border border-neutral-900 hover:border-neutral-700 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <method.icon width={16} height={16} className="text-neutral-500 group-hover:text-white transition-colors" />
                  <div>
                    <div className="font-mono text-xs text-neutral-500">
                      {method.label}
                    </div>
                    <div className="text-sm text-white">
                      {method.value}
                    </div>
                  </div>
                </div>
                <Icons.ArrowUpRight width={14} height={14} className="text-neutral-600 group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
