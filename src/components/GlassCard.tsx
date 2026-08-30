"use client";

import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  glowOnHover?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function GlassCard({
  children,
  className = "",
  interactive = true,
  glowOnHover = true,
  onClick,
  style,
}: GlassCardProps) {
  const baseClass = interactive ? "glass-panel-interactive" : "glass-panel";

  return (
    <div
      className={`${baseClass} ${className}`}
      onClick={onClick}
      style={{
        padding: "1.75rem",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
