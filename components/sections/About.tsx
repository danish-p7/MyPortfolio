import React from "react";
import { Layers, Zap, Users, Code, Award, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const About: React.FC = () => {
  const pillars = [
    {
      icon: <Layers className="w-5 h-5 text-accent-600" />,
      title: "System Architecture",
      description:
        "Designing modular, decoupled systems using Clean Architecture, event-driven pipelines, and strictly-typed domain boundaries that resist technical debt as teams scale.",
    },
    {
      icon: <Zap className="w-5 h-5 text-accent-600" />,
      title: "Performance & Reliability",
      description:
        "Optimizing critical render paths, database queries, and caching strategies to deliver sub-second response times and 99.99% service availability.",
    },
    {
      icon: <Users className="w-5 h-5 text-accent-600" />,
      title: "Engineering Leadership",
      description:
        "Championing pragmatic code reviews, establishing rigorous testing standards (unit, integration, e2e), and mentoring developers through complex system deliveries.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-white border-b border-corporate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About Me"
          title="Engineering resilient software with business impact"
          description="A professional summary of my background, engineering philosophy, and the principles that guide my work."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main narrative */}
          <div className="lg:col-span-7 space-y-6 text-corporate-700 leading-relaxed">
            <p className="text-base sm:text-lg">
              Over the past 2+ years, I have worked across the entire engineering lifecycle — from early-stage greenfield product prototyping to re-architecting legacy monoliths into scalable microservices handling millions of daily operations.
            </p>
            <p className="text-base">
              My technical foundation centers around core development and problem-solving technologies (C++, Python, AI, Data Structures and Algorithms, API Testing), complemented by hands-on Pega development for both batch and real-time data processing. This is supported by backend datastores and cloud technologies (PostgreSQL, Redis, Supabase), alongside modern development and deployment workflows (Docker, Vercel, GitHub). I place heavy emphasis on robust application logic, reliable data processing, scalable backend systems, and efficient end-to-end integrations.
            </p>
            <p className="text-base">
              Beyond writing clean code, I bridge the gap between business objectives and technical implementation. I communicate proactively with stakeholders, prioritize ruthlessly to ship high-impact features, and build software that teams enjoy maintaining.
            </p>

            <div className="p-4 rounded-xl bg-corporate-50 border border-corporate-200/80 text-xs text-corporate-500 italic">
              {/* <strong>Note for portfolio owner:</strong> This biographical text is designed as a polished placeholder. You can quickly customize it with your specific past companies, degrees, or personal mission in <code className="text-corporate-800 font-mono">components/sections/About.tsx</code>. */}
            </div>
          </div>

          {/* Value pillars cards */}
          <div className="lg:col-span-5 space-y-4">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="p-6 rounded-xl border border-corporate-200/80 bg-corporate-50/50 hover:bg-white hover:shadow-md hover:border-corporate-300 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-white border border-corporate-200 shadow-xs shrink-0">
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-corporate-900">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 text-sm text-corporate-600 leading-normal">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
