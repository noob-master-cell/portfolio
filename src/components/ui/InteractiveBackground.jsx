export default function InteractiveBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden opacity-35 select-none">
      {/* Soft Indigo Spotlight - Top Left */}
      <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-[#6366f1] opacity-[0.12] blur-[150px] rounded-full" />
      
      {/* Soft Purple/Violet Spotlight - Bottom Right */}
      <div className="absolute -bottom-[10%] -right-[10%] w-[60vw] h-[60vw] bg-[#8b5cf6] opacity-[0.08] blur-[180px] rounded-full" />
      
      {/* Subtle Gray-Blue Spotlight - Center-left */}
      <div className="absolute top-[30%] left-[10%] w-[40vw] h-[40vw] bg-[#4f46e5] opacity-[0.05] blur-[140px] rounded-full" />
    </div>
  );
}
