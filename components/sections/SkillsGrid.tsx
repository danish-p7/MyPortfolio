import React from "react";
import { Code, Layout, Database, Cloud, Cpu, Check } from "lucide-react";
import { skillCategories, SkillCategory } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";

export const SkillsGrid: React.FC = () => {
  const getCategoryIcon = (category: SkillCategory["category"]) => {
    switch (category) {
      case "Languages":
        return <Code className="w-5 h-5 text-accent-600" />;
      case "Frameworks & Libraries":
        return <Layout className="w-5 h-5 text-accent-600" />;
      case "Databases & Storage":
        return <Database className="w-5 h-5 text-accent-600" />;
      case "DevOps & Cloud":
        return <Cloud className="w-5 h-5 text-accent-600" />;
      case "Architecture & Tools":
        return <Cpu className="w-5 h-5 text-accent-600" />;
      default:
        return <Code className="w-5 h-5 text-accent-600" />;
    }
  };

  return (
    <section id="skills" className="py-20 bg-corporate-50/50 border-b border-corporate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Technical Proficiencies"
          title="Skills & Technology Stack"
          description="A categorized overview of languages, frameworks, and infrastructure tools I leverage in production environments."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((categoryGroup) => (
            <div
              key={categoryGroup.category}
              className="bg-white rounded-xl border border-corporate-200/90 p-6 shadow-xs hover:shadow-md hover:border-corporate-300 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-corporate-100">
                  <div className="p-2 rounded-lg bg-accent-50 border border-accent-100/80">
                    {getCategoryIcon(categoryGroup.category)}
                  </div>
                  <h3 className="font-bold text-base text-corporate-900">
                    {categoryGroup.category}
                  </h3>
                </div>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-2">
                  {categoryGroup.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-corporate-50 hover:bg-accent-50 text-corporate-800 hover:text-accent-800 border border-corporate-200 hover:border-accent-200 transition-colors"
                    >
                      <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>{skill.name}</span>
                      {skill.proficiency && (
                        <span className="text-[10px] text-corporate-400 group-hover:text-accent-600 font-mono pl-0.5">
                          • {skill.proficiency}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-corporate-100/80 flex items-center justify-between text-[11px] text-corporate-400">
                <span>{categoryGroup.skills.length} core technologies</span>
                <span className="font-medium text-corporate-500">Production Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
