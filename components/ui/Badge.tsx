import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "success" | "outline" | "neutral";
  size?: "sm" | "md";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  className = "",
}) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full border transition-colors";

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs gap-1",
    md: "px-3 py-1 text-xs gap-1.5",
  };

  const variantStyles = {
    default: "bg-corporate-100/90 text-corporate-700 border-corporate-200",
    accent: "bg-accent-50 text-accent-700 border-accent-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    outline: "bg-transparent text-corporate-600 border-corporate-300",
    neutral: "bg-white text-corporate-700 border-corporate-200 shadow-sm",
  };

  return (
    <span className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
