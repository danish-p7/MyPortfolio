import React from "react";
import type { Metadata } from "next";
import { Mail, MapPin, Clock, Github, Linkedin, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/sections/ContactForm";
import { constructMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Contact & Consultation Inquiries",
  description:
    "Get in touch with Alex Morgan for senior engineering opportunities, technical consulting, architecture reviews, or collaborations.",
});

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-24 bg-corporate-50/40 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let’s Discuss Your Next High-Impact Initiative"
          description="Whether you have an open full-time opportunity, need architectural consulting, or want to explore potential collaborations, I’d be glad to connect."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Direct Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-2xl border border-corporate-200 p-8 shadow-xs space-y-6">
              <h3 className="text-xl font-bold text-corporate-900 tracking-tight">
                Direct Contact Information
              </h3>
              <p className="text-sm text-corporate-600 leading-relaxed">
                Prefer email or social channels? Feel free to reach out directly through any of the channels below.
              </p>

              <div className="space-y-4 pt-2">
                <a
                  href={siteConfig.links.email}
                  className="flex items-center gap-3 p-3 rounded-lg border border-corporate-200 hover:border-accent-400 hover:bg-accent-50/50 transition-colors group"
                >
                  <div className="p-2 rounded-md bg-corporate-100 text-corporate-700 group-hover:bg-accent-600 group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-corporate-500 font-medium">Email Address</span>
                    <span className="text-sm font-semibold text-corporate-900 group-hover:text-accent-600">
                      danish.parveez.dev@gmail.com
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-lg border border-corporate-200 bg-corporate-50/50">
                  <div className="p-2 rounded-md bg-corporate-100 text-corporate-700">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-corporate-500 font-medium">Location</span>
                    <span className="text-sm font-semibold text-corporate-900">
                      Hyderabad, IN (Open to Worldwide Remote)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg border border-corporate-200 bg-corporate-50/50">
                  <div className="p-2 rounded-md bg-corporate-100 text-corporate-700">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-corporate-500 font-medium">Timezone & Response</span>
                    <span className="text-sm font-semibold text-corporate-900">
                      IST (UTC+5:30) • Response within 24 hours
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="pt-4 border-t border-corporate-100">
                <span className="block text-xs font-semibold uppercase tracking-wider text-corporate-500 mb-3">
                  Professional Profiles
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-corporate-200 text-xs font-medium text-corporate-700 hover:bg-corporate-100 transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-sky-600" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-corporate-200 text-xs font-medium text-corporate-700 hover:bg-corporate-100 transition-colors"
                  >
                    <Github className="w-4 h-4 text-corporate-900" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Credibility Note */}
            <div className="p-6 rounded-2xl bg-white border border-corporate-200 shadow-xs flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-corporate-600 leading-relaxed">
                <strong className="block text-corporate-900 text-sm font-semibold mb-1">
                  Commitment to Quality & Confidentiality
                </strong>
                All shared business specifications, project scopes, and proprietary requirements are treated with strict confidentiality.
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
