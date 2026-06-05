"use client";

import { useEffect, useState } from "react";
import "./GlitchText.css";

interface GlitchTextProps {
  text?: string;
  words?: string[];
  className?: string;
  style?: React.CSSProperties;
  interval?: number;
}

export function GlitchText({
  text,
  words,
  className = "",
  style,
  interval = 3000,
}: GlitchTextProps) {
  const list = words ?? (text ? [text] : []);
  const [, setIndex] = useState(0);
  const [glitching, setGlitching] = useState(false);
  const [displayed, setDisplayed] = useState(list[0] ?? "");

  useEffect(() => {
    if (list.length <= 1) return;

    const timer = setInterval(() => {
      setGlitching(true);
      setTimeout(() => {
        setIndex((i) => {
          const next = (i + 1) % list.length;
          setDisplayed(list[next]);
          return next;
        });
        setGlitching(false);
      }, 600);
    }, interval);

    return () => clearInterval(timer);
  }, [list.length, interval]);

  return (
    <span
      className={`glitch-title${glitching ? " glitch-switching" : ""} ${className}`}
      data-text={displayed}
      style={style}
    >
      {displayed}
    </span>
  );
}
