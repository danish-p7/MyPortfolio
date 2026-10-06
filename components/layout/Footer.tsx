import React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUp, Code2, Heart } from "lucide-react";
import { siteConfig } from "@/lib/seo";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-corporate-950 text-corporate-300 border-t border-corporate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand & Bio Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent-600 flex items-center justify-center text-white">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Danish Parveez
              </span>
            </div>
            <p className="text-sm leading-relaxed text-corporate-400 max-w-md">
              Software Engineer focused on building robust, high-performance web applications, distributed systems, and modern cloud architectures. Always open to high-impact opportunities and collaborations.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-corporate-900 flex items-center justify-center text-corporate-400 hover:text-white hover:bg-corporate-800 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-corporate-900 flex items-center justify-center text-corporate-400 hover:text-white hover:bg-corporate-800 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.links.email}
                className="w-9 h-9 rounded-lg bg-corporate-900 flex items-center justify-center text-corporate-400 hover:text-white hover:bg-corporate-800 transition-colors"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-corporate-100 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#about" className="hover:text-white transition-colors">
                  About & Background
                </Link>
              </li>
              <li>
                <Link href="/#skills" className="hover:text-white transition-colors">
                  Skills & Technologies
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Engineering Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Status */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-corporate-100 mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/resume.pdf"
                  download="Danish_Parveez_Resume.pdf"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  Download Resume (PDF)
                </a>
              </li>
              <li>
                <span className="inline-flex items-center gap-2 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available for new roles
                </span>
              </li>
              <li className="text-xs text-corporate-400 pt-2">
                Based in Hyderabad, IN (Open to Remote / Hybrid worldwide)
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-corporate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-corporate-400">
          <p>
            &copy; {new Date().getFullYear()} Danish Parveez. All rights reserved.
          </p>
          {/* <p className="flex items-center gap-1">
            Engineered with Next.js 14, TypeScript & Tailwind CSS
          </p> */}
        </div>
      </div>
    </footer>
  );
};
