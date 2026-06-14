import { DATA } from '../data/content';
import SectionLabel from '../components/ui/SectionLabel';

export default function Skills() {
  const skillCategories = DATA.about.skills;

  return (
    <section
      id="skills"
      className="section-shell bg-[#fafafa] text-[#0a0a0a] border-y border-neutral-200"
    >
      <div className="container-shell">
        <SectionLabel text="03 / Skills" isDark={false} />

        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-black mb-12">
          What I work with
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {skillCategories.map((skill, i) => {
            const items = skill.items.split(', ');

            return (
              <div key={i} className="flex flex-col">
                <div className="text-sm font-medium text-black mb-4">
                  {skill.category}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item, j) => (
                    <span
                      key={j}
                      className="px-2.5 py-1 text-xs text-neutral-700 bg-white border border-neutral-200 rounded-md transition-colors duration-150 hover:border-neutral-400 hover:text-black"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
