import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";
import { getAllBlogPosts } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Engineering Blog & Articles",
  description:
    "Technical articles on full-stack web development, TypeScript design patterns, distributed systems, and performance engineering.",
});

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="py-16 sm:py-24 bg-corporate-50/40 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Engineering Blog"
          title="Technical Articles & Insights"
          description="In-depth writings on software architecture, clean code principles, and scaling full-stack web applications."
        />

        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group bg-white rounded-xl border border-corporate-200 p-8 shadow-xs hover:shadow-md hover:border-corporate-300 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-corporate-500 mb-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-corporate-400" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-corporate-400" />
                    <span>{post.readingTime}</span>
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-corporate-900 group-hover:text-accent-600 transition-colors mb-3">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="text-base text-corporate-600 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-corporate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="default" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600 hover:text-accent-700 transition-colors"
                >
                  <span>Read full post</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}

          {posts.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl border border-corporate-200">
              <BookOpen className="w-10 h-10 text-corporate-400 mx-auto mb-3" />
              <p className="text-corporate-600">No blog posts found. Add .md files into content/blog/ to publish.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
