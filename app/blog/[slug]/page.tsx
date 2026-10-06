import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/content";
import { constructMetadata } from "@/lib/seo";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) {
    return constructMetadata({ title: "Article Not Found" });
  }

  return constructMetadata({
    title: `${post.metadata.title} — Engineering Blog`,
    description: post.metadata.excerpt,
  });
}

export default async function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const { metadata, contentHtml } = post;

  return (
    <article className="py-12 sm:py-16 bg-corporate-50/30 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-corporate-600 hover:text-corporate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>
        </div>

        {/* Article Header Card */}
        <header className="bg-white rounded-2xl border border-corporate-200 p-8 sm:p-12 shadow-sm mb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs text-corporate-500 mb-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-corporate-400" />
              <time dateTime={metadata.date}>
                {new Date(metadata.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-corporate-400" />
              <span>{metadata.readingTime}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-corporate-400" />
              <span>{metadata.author || "Danish Parveez"}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-corporate-900 tracking-tight leading-tight mb-6">
            {metadata.title}
          </h1>

          <p className="text-lg text-corporate-600 leading-relaxed mb-6 font-normal">
            {metadata.excerpt}
          </p>

          <div className="pt-6 border-t border-corporate-100 flex flex-wrap gap-1.5">
            {metadata.tags.map((tag) => (
              <Badge key={tag} variant="neutral" size="sm">
                #{tag}
              </Badge>
            ))}
          </div>
        </header>

        {/* Rendered Article Body */}
        <div className="bg-white rounded-2xl border border-corporate-200 p-8 sm:p-12 shadow-sm">
          <div
            className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-accent-600 hover:prose-a:text-accent-700"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Author Bio Footer */}
          <div className="mt-16 pt-8 border-t border-corporate-200 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-corporate-900 text-white flex items-center justify-center font-bold text-xl shrink-0">
              {/* Clean Vector Headshot Placeholder */}
              <svg
                className="w-full h-full text-corporate-400"
                viewBox="0 0 128 128"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Danish Parveez headshot illustration"
              >
                {/* Background */}
                <rect width="128" height="128" fill="#F1F5F9" />

                {/* Broad, muscular shoulders (navy blazer) */}
                <path d="M2 128 C2 104 20 92 46 87 L82 87 C108 92 126 104 126 128 Z" fill="#1E2A4A" />

                {/* Neck (thick) */}
                <path d="M52 66 H76 V90 L64 100 L52 90 Z" fill="#B57C57" />

                {/* White shirt */}
                <path d="M49 86 L64 120 L79 86 L71 83 L64 94 L57 83 Z" fill="#FFFFFF" />

                {/* Lapels */}
                <path d="M46 87 L63 118 L54 128 L32 128 L35 100 Z" fill="#16203A" />
                <path d="M82 87 L65 118 L74 128 L96 128 L93 100 Z" fill="#16203A" />

                {/* Ears */}
                <ellipse cx="39.5" cy="55" rx="3.5" ry="6" fill="#C48A63" />
                <ellipse cx="88.5" cy="55" rx="3.5" ry="6" fill="#C48A63" />

                {/* Face with sharp, angular jawline */}
                <path
                  d="M40 44 C40 34 48 29 64 29 C80 29 88 34 88 44 L88 57 L82 74 L70 85 H58 L46 74 L40 57 Z"
                  fill="#C98F69"
                />
                {/* Jaw shading for definition */}
                <path d="M46 74 L58 85 H70 L82 74 L79 72 L69 81 H59 L49 72 Z" fill="#B57C57" opacity="0.55" />
                {/* Cheekbone highlights */}
                <path d="M46 60 Q49 66 54 69" stroke="#B57C57" strokeWidth="1.2" fill="none" opacity="0.5" />
                <path d="M82 60 Q79 66 74 69" stroke="#B57C57" strokeWidth="1.2" fill="none" opacity="0.5" />

                {/* Voluminous wavy black hair */}
                <path
                  d="M35 52 C28 32 36 14 58 12 C66 8 82 10 90 20 C98 28 96 42 92 54
                      C91 44 88 38 82 35 C74 30 62 32 54 33 C46 35 40 42 38 52 Z"
                  fill="#0B0B10"
                />
                <path d="M42 26 C50 16 64 14 74 18" stroke="#2A2A35" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M50 22 C58 15 72 15 82 22" stroke="#2A2A35" strokeWidth="1.2" fill="none" strokeLinecap="round" />

                {/* Eyebrows */}
                <path d="M46 44 Q53 40 61 43" stroke="#0B0B10" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                <path d="M67 43 Q75 40 82 44" stroke="#0B0B10" strokeWidth="2.2" fill="none" strokeLinecap="round" />

                {/* Eyes */}
                <ellipse cx="53.5" cy="52" rx="3" ry="2.2" fill="#FFFFFF" />
                <ellipse cx="74.5" cy="52" rx="3" ry="2.2" fill="#FFFFFF" />
                <circle cx="53.5" cy="52" r="1.8" fill="#3B2416" />
                <circle cx="74.5" cy="52" r="1.8" fill="#3B2416" />

                {/* Nose */}
                <path d="M64 54 L62 64 Q64 66.5 66 64" stroke="#A96F4C" strokeWidth="1.5" fill="none" strokeLinecap="round" />

                {/* Subtle smile (clean-shaven) */}
                <path d="M57 74 Q64 77.5 71 74" stroke="#8A4B3A" strokeWidth="1.8" fill="none" strokeLinecap="round" />

                {/* Trendy Gen-Z glasses */}
                <rect x="44" y="45.5" width="19" height="13" rx="4.5" fill="#FFFFFF" fillOpacity="0.12" stroke="#0F172A" strokeWidth="2" />
                <rect x="65" y="45.5" width="19" height="13" rx="4.5" fill="#FFFFFF" fillOpacity="0.12" stroke="#0F172A" strokeWidth="2" />
                <path d="M63 50 H65" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
                <path d="M44 49 L40 48 M84 49 L88 48" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-bold text-corporate-900">
                Written by {metadata.author || "Danish Parveez"}
              </h4>
              <p className="text-xs text-corporate-500 max-w-lg leading-normal">
                Full-Stack & Systems Developer specializing in resilient web applications, cloud architecture, and AI Application design systems.
              </p>
            </div>
          </div>

          {/* Navigation Footer */}
          <div className="mt-8 pt-6 border-t border-corporate-100 flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent-600 hover:text-accent-700"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Articles</span>
            </Link>
            <Button href="/contact" variant="outline" size="sm">
              Discuss this Article
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
