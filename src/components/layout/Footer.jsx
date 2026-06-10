import { DATA } from '../../data/content';

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-900 bg-[#0a0a0a]">
      <div className="container-shell py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="font-mono text-xs text-neutral-500">
          © 2026 {DATA.identity.name}
        </div>

        <div className="flex items-center gap-6 font-mono text-xs">
          {DATA.identity.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${DATA.identity.email}`}
            className="text-neutral-500 hover:text-white transition-colors"
          >
            email
          </a>
        </div>
      </div>
    </footer>
  );
}
