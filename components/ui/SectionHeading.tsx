import React from "react";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}) => {
  const alignmentClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`mb-12 max-w-3xl ${alignmentClass} ${className}`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 text-xs font-semibold tracking-wider text-accent-700 uppercase bg-accent-50 rounded-full border border-accent-200">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-600 animate-pulse" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-corporate-900 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-corporate-600">
          {description}
        </p>
      )}
    </div>
  );
};
