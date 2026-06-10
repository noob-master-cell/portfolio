export default function SectionLabel({ text, isDark = true }) {
  const colorClass = isDark ? 'text-neutral-500' : 'text-neutral-400';
  return (
    <div className={`font-mono text-xs ${colorClass} mb-4 select-none`}>
      {text}
    </div>
  );
}
