import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles, FolderGit2 } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { SkillsGrid } from "@/components/sections/SkillsGrid";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { getFeaturedProjects, getAllBlogPosts } from "@/lib/content";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const latestPosts = getAllBlogPosts().slice(0, 2);

  return (
    <div>
      {/* 1. Hero / Intro */}
      <Hero />

      {/* 2. About / Bio */}
      <About />

      {/* 3. Skills / Tech Stack */}
      <SkillsGrid />

      {/* 4. Featured Projects Grid */}
      <section id="projects" className="py-20 bg-white border-b border-corporate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionHeading
              eyebrow="Portfolio Highlights"
              title="Featured Engineering Projects"
              description="A curated selection of scalable systems, web platforms, and open-source infrastructure tools."
              className="mb-0 max-w-2xl"
            />
            <div className="mt-4 md:mt-0">
              <Button
                href="/projects"
                variant="outline"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                View All Projects
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Latest Engineering Articles */}
      <section className="py-20 bg-corporate-50/50 border-b border-corporate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionHeading
              eyebrow="Technical Writing"
              title="Latest Architectural Insights"
              description="Deep-dives into TypeScript design patterns, high-scale performance, and modern web application development."
              className="mb-0 max-w-2xl"
            />
            <div className="mt-4 md:mt-0">
              <Button
                href="/blog"
                variant="outline"
                size="md"
                icon={<BookOpen className="w-4 h-4" />}
              >
                Read All Articles
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestPosts.map((post) => (
              <article
                key={post.slug}
                className="group bg-white rounded-xl border border-corporate-200/90 p-8 shadow-xs hover:shadow-md hover:border-corporate-300 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 text-xs text-corporate-500 mb-3">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-corporate-900 group-hover:text-accent-600 transition-colors mb-3">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-sm text-corporate-600 leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-corporate-100 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="neutral" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-accent-600 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Read article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Contact Banner CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl bg-gradient-to-r from-corporate-900 to-corporate-950 p-8 sm:p-12 text-white shadow-xl overflow-hidden">
            <div className="relative z-10 max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-accent-500/20 text-accent-300 border border-accent-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Available for New Roles & High-Impact Projects</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Interested in working together or hiring me?
              </h2>
              <p className="text-corporate-300 text-sm sm:text-base leading-relaxed">
                Whether you have an open engineering position, need architectural consulting, or want to discuss an upcoming project, my inbox is always open.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button
                  href="/contact"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Send a Message
                </Button>
                <Button
                  href="/resume.pdf"
                  download="Danish_Parveez_Resume.pdf"
                  external
                  variant="outline"
                  size="lg"
                  className="bg-amber-900 text-white border-corporate-700 hover:bg-corporate-800"
                >
                  Download Resume
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
