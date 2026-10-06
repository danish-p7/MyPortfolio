import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, Calendar, Briefcase, Tag, FolderGit2 } from "lucide-react";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import { constructMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return constructMetadata({ title: "Project Not Found" });
  }

  return constructMetadata({
    title: `${project.metadata.title} — Case Study`,
    description: project.metadata.description,
  });
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const { metadata, contentHtml } = project;

  return (
    <div className="py-12 sm:py-16 bg-corporate-50/30 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-corporate-600 hover:text-corporate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>
        </div>

        {/* Project Header Banner */}
        <div className="bg-white rounded-2xl border border-corporate-200 p-8 sm:p-12 shadow-sm mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {metadata.featured && (
              <Badge variant="accent" size="sm">
                Featured Case Study
              </Badge>
            )}
            <span className="text-xs text-corporate-500 font-mono">
              {metadata.date}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-corporate-900 tracking-tight mb-4">
            {metadata.title}
          </h1>

          <p className="text-lg text-corporate-600 leading-relaxed mb-8 max-w-3xl">
            {metadata.description}
          </p>

          {/* Quick Stats & Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-corporate-100 text-sm">
            {metadata.role && (
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-corporate-400 mb-1 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" /> Role
                </span>
                <span className="font-semibold text-corporate-900">{metadata.role}</span>
              </div>
            )}

            {metadata.clientOrCompany && (
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-corporate-400 mb-1 flex items-center gap-1.5">
                  <FolderGit2 className="w-3.5 h-3.5" /> Organization
                </span>
                <span className="font-semibold text-corporate-900">{metadata.clientOrCompany}</span>
              </div>
            )}

            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-corporate-400 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Timeline
              </span>
              <span className="font-semibold text-corporate-900">{metadata.date}</span>
            </div>

            <div className="flex items-center gap-2 sm:justify-end">
              {metadata.repoUrl && (
                <Button
                  href={metadata.repoUrl}
                  external
                  variant="outline"
                  size="sm"
                  icon={<Github className="w-4 h-4" />}
                >
                  Source
                </Button>
              )}
              {metadata.liveUrl && (
                <Button
                  href={metadata.liveUrl}
                  external
                  variant="primary"
                  size="sm"
                  icon={<ExternalLink className="w-4 h-4" />}
                >
                  Live Demo
                </Button>
              )}
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div className="mt-6 pt-6 border-t border-corporate-100">
            <span className="text-xs font-semibold uppercase tracking-wider text-corporate-400 block mb-2">
              Technology Stack Used
            </span>
            <div className="flex flex-wrap gap-1.5">
              {metadata.techTags.map((tag) => (
                <Badge key={tag} variant="neutral" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Rendered Case Study Content */}
        <div className="bg-white rounded-2xl border border-corporate-200 p-8 sm:p-12 shadow-sm">
          <div
            className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Bottom Back Button */}
          <div className="mt-12 pt-8 border-t border-corporate-100 flex items-center justify-between">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent-600 hover:text-accent-700"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all projects</span>
            </Link>
            <Button href="/contact" variant="outline" size="sm">
              Inquire About Similar Work
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
