import React from "react";
import Link from "next/link";
import { ArrowRight, Download, Terminal, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-corporate-200/60 bg-gradient-to-b from-corporate-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-wide text-corporate-800 bg-white border border-corporate-200 rounded-full shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Engineering Roles & Consulting</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-corporate-900 tracking-tight leading-[1.1]">
              Architecting scalable software with precision & speed.
            </h1>

            <p className="text-lg sm:text-xl text-corporate-600 leading-relaxed max-w-2xl">
              Hi, I’m <strong className="text-corporate-900 font-semibold">Danish Parveez</strong>. A Full-Stack Engineer with 2+ years of experience building enterprise decisioning platforms, GenAI-powered applications, distributed backend systems and mission-critical enterprise applications.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                href="/projects"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                View Featured Projects
              </Button>
              <Button
                href="/resume.pdf"
                download="Alex_Morgan_Resume.pdf"
                external
                variant="outline"
                size="lg"
                icon={<Download className="w-4 h-4 text-corporate-600" />}
              >
                Download Resume
              </Button>
            </div>

            {/* Credibility Badges */}
            <div className="pt-6 border-t border-corporate-200/80 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <div className="text-2xl font-bold text-corporate-900">2+</div>
                <div className="text-xs text-corporate-500 font-medium mt-0.5">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-corporate-900">4+</div>
                <div className="text-xs text-corporate-500 font-medium mt-0.5">Production Deployments</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-corporate-900">99.9%</div>
                <div className="text-xs text-corporate-500 font-medium mt-0.5">Reliability SLA</div>
              </div>
            </div>
          </div>

          {/* Visual Avatar / Terminal Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Decorative Blur Backdrop */}
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-600 to-corporate-900 rounded-2xl blur-xl opacity-10" />

              <div className="relative bg-white border border-corporate-200 rounded-2xl shadow-xl overflow-hidden">
                {/* Window Header */}
                <div className="bg-corporate-900 px-4 py-3 flex items-center justify-between border-b border-corporate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-corporate-400 font-mono">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>danish-parveez.py</span>
                  </div>
                  <div className="w-12" />
                </div>

                {/* Headshot & Profile Card */}
                <div className="p-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-accent-600 shadow-md bg-corporate-100 flex items-center justify-center shrink-0">
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

                    <div>
                      <h3 className="text-lg font-bold text-corporate-900 leading-tight">
                        Danish Parveez
                      </h3>
                      <p className="text-xs text-corporate-500 font-medium">
                        Software Engineer
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-flex">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Verified Contributor</span>
                      </div>
                    </div>
                  </div>

                  {/* Terminal Code Snippet */}
                  <div className="p-3.5 bg-corporate-950 rounded-lg text-xs font-mono text-corporate-300 leading-relaxed border border-corporate-800 space-y-1">
                    <div><span className="text-purple-400">engineer</span> = &#123;</div>
                    <div className="pl-4"><span className="text-corporate-400">&quot;role&quot;</span>: <span className="text-emerald-300">&quot;Systems & Web Dev&quot;</span>,</div>
                    <div className="pl-4"><span className="text-corporate-400">&quot;coreStack&quot;</span>: [<span className="text-amber-300">&quot;Python&quot;</span>, <span className="text-amber-300">&quot;CPP&quot;</span>, <span className="text-amber-300">&quot;SQL&quot;</span>],</div>
                    <div className="pl-4"><span className="text-corporate-400">&quot;currentFocus&quot;</span>: <span className="text-emerald-300">&quot;Cloud Scale & Performance&quot;</span>,</div>
                    <div className="pl-4"><span className="text-corporate-400">&quot;status&quot;</span>: <span className="text-emerald-400">&quot;Ready for Impact&quot;</span></div>
                    <div>&#125;</div>
                  </div>

                  {/* Highlights checklist */}
                  <ul className="space-y-2 text-xs text-corporate-600">
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-accent-600 shrink-0" />
                      <span>Specialized in high-load backend dev</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-accent-600 shrink-0" />
                      <span>Strict type safety, automated CI/CD & testing</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
