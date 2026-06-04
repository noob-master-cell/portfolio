export default function SectionLabel({ text, isDark = true }) {
  const colorClass = isDark ? 'text-white/40' : 'text-slate-400';
  return (
    <div className={`font-mono text-xs uppercase tracking-[0.4em] mb-12 ${colorClass} select-none font-bold`}>
      {text}
    </div>
  );
}

