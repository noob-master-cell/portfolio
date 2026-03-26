import { Icons } from './Icons';

export default function LinkItem({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-1 font-mono text-xs text-[#888] hover:text-[#ff5722] transition-colors"
    >
      {label}
      <Icons.ArrowUpRight
        width={12}
        height={12}
        className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"
      />
    </a>
  );
}
