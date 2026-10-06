"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, Menu, X, Code2, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "About", href: "/#about" },
    { label: "Skills", href: "/#skills" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
        ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-corporate-200/80 py-3"
        : "bg-white/80 backdrop-blur-sm border-b border-corporate-100 py-4"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-accent-500 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-lg bg-corporate-900 flex items-center justify-center text-white shadow-sm group-hover:bg-accent-600 transition-colors">
              <Code2 className="w-5 h-5 text-accent-400 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-corporate-900 tracking-tight leading-none group-hover:text-accent-600 transition-colors">
                Danish Parveez
              </span>
              <span className="text-xs text-corporate-500 font-medium mt-0.5 tracking-normal">
                Software Engineer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive =
                link.href === pathname ||
                (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                    ? "text-accent-600 bg-accent-50 font-semibold"
                    : "text-corporate-600 hover:text-corporate-900 hover:bg-corporate-50"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              href="/resume.pdf"
              download="Danish_Parveez_Resume.pdf"
              external
              variant="outline"
              size="sm"
              icon={<Download className="w-4 h-4 text-corporate-600" />}
            >
              Download Resume
            </Button>
            <Button
              href="/contact"
              variant="primary"
              size="sm"
              icon={<ArrowUpRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Get in Touch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              href="/resume.pdf"
              download="Danish_Parveez_Resume.pdf"
              external
              variant="outline"
              size="sm"
              className="px-2.5 py-1.5"
            >
              <Download className="w-4 h-4 text-corporate-700" />
            </Button>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-corporate-700 hover:bg-corporate-100 focus:outline-none focus:ring-2 focus:ring-accent-500"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-b border-corporate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2.5 rounded-md text-base font-medium text-corporate-700 hover:text-corporate-950 hover:bg-corporate-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-corporate-100 flex flex-col gap-2">
              <Button
                href="/resume.pdf"
                download="Alex_Morgan_Resume.pdf"
                external
                variant="outline"
                size="md"
                className="w-full justify-center"
                icon={<Download className="w-4 h-4" />}
              >
                Download Resume (PDF)
              </Button>
              <Button
                href="/contact"
                variant="primary"
                size="md"
                className="w-full justify-center"
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
