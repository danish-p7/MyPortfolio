import React from "react";
import Link from "next/link";
import { ExternalLink, Github, ArrowRight, FolderGit2 } from "lucide-react";
import { ProjectMetadata } from "@/lib/content";
import { Badge } from "@/components/ui/Badge";

export interface ProjectCardProps {
  project: ProjectMetadata;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group flex flex-col bg-white rounded-xl border border-corporate-200/90 shadow-xs hover:shadow-lg hover:border-corporate-300 transition-all duration-200 overflow-hidden">
      {/* Thumbnail Placeholder Visual */}
      <div className="relative h-48 w-full bg-gradient-to-br from-corporate-900 via-corporate-800 to-corporate-950 p-6 flex flex-col justify-between overflow-hidden border-b border-corporate-100">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(#ffffff 1px, transparent 1px), radial-gradient(#ffffff 1px, #0f172a 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative z-10 flex items-center justify-between">
          <div className="p-2 rounded-lg bg-white/10 backdrop-blur-md text-white border border-white/10">
            <FolderGit2 className="w-5 h-5 text-accent-400" />
          </div>
          {project.featured && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-accent-500/20 text-accent-300 border border-accent-400/30 backdrop-blur-md">
              Featured
            </span>
          )}
        </div>

        <div className="relative z-10">
          <span className="text-[11px] font-mono uppercase tracking-wider text-corporate-400">
            {project.clientOrCompany || "Production Case Study"}
          </span>
          <h4 className="text-white font-bold text-lg line-clamp-1 group-hover:text-accent-300 transition-colors">
            {project.title}
          </h4>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Tech Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.techTags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="default" size="sm">
                {tag}
              </Badge>
            ))}
            {project.techTags.length > 4 && (
              <span className="text-[11px] text-corporate-400 self-center">
                +{project.techTags.length - 4} more
              </span>
            )}
          </div>

          <h3 className="text-lg font-bold text-corporate-900 group-hover:text-accent-600 transition-colors mb-2">
            <Link href={`/projects/${project.slug}`}>
              {project.title}
            </Link>
          </h3>

          <p className="text-sm text-corporate-600 leading-relaxed line-clamp-3 mb-6">
            {project.description}
          </p>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-4 border-t border-corporate-100 flex items-center justify-between">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-600 hover:text-accent-700 transition-colors group/link"
          >
            <span>Read Case Study</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
          </Link>

          <div className="flex items-center gap-2">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-md text-corporate-500 hover:text-corporate-900 hover:bg-corporate-100 transition-colors"
                title="View Source Code on GitHub"
                aria-label="View Source Code"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-md text-corporate-500 hover:text-corporate-900 hover:bg-corporate-100 transition-colors"
                title="Open Live Deployment"
                aria-label="Open Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
