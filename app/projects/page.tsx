import React from "react";
import type { Metadata } from "next";
import { getAllProjects } from "@/lib/content";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Engineering Projects & Portfolio",
  description:
    "Explore production projects, open-source systems, and full-stack architectures developed by Alex Morgan.",
});

export default function ProjectsPage() {
  const projects = getAllProjects();

  // Gather unique tags
  const allTags = Array.from(new Set(projects.flatMap((p) => p.techTags))).slice(0, 8);

  return (
    <div className="py-16 sm:py-24 bg-corporate-50/40 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Portfolio Archive"
          title="Featured Systems & Projects"
          description="A comprehensive record of production architectures, web applications, and developer tools built with a focus on performance and maintainability."
        />

        {/* Tech tags preview summary */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-6 border-b border-corporate-200/80 text-xs text-corporate-600">
          <span className="font-semibold text-corporate-800">Key Technologies:</span>
          {allTags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md bg-white border border-corporate-200 text-corporate-700 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-corporate-200">
            <p className="text-corporate-600">No projects found. Add .md files into content/projects/ to populate.</p>
          </div>
        )}
      </div>
    </div>
  );
}
