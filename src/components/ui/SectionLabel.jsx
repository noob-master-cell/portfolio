export default function SectionLabel({ text, isDark = true }) {
  const colorClass = isDark ? 'text-neutral-500' : 'text-neutral-400';
  return (
    <div className="flex items-center gap-3 mb-5 select-none">
      <span className="h-px w-6 bg-[#6366f1]/60" aria-hidden="true" />
      <span className={`font-mono text-[11px] tracking-[0.2em] uppercase ${colorClass}`}>
        {text}
      </span>
    </div>
  );
}
