"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  colorRgb: string;
}

const PALETTE_RGBS = [
  "16,185,129",   // Emerald
  "6,182,212",    // Cyan
  "99,102,241",   // Violet
  "248,250,252",  // Cool Slate White
  "167,243,208",  // Light Mint
];

const MAX_DIST = 150;
const MIN_SPEED = 0.15;
const MAX_SPEED = 0.45;

function rand(a: number, b: number) { return a + Math.random() * (b - a); }
function signedRand(mag: number) { return (Math.random() < 0.5 ? 1 : -1) * rand(MIN_SPEED, mag); }

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];
    let W = 0, H = 0;
    let mouseX = -1000;
    let mouseY = -1000;
    let scrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width = W;
      canvas!.height = H;
      build();
    }

    function build() {
      const count = Math.max(90, Math.floor((W * H) / 4500));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: signedRand(MAX_SPEED),
        vy: signedRand(MAX_SPEED),
        r: rand(1.2, 2.8),
        baseAlpha: rand(0.4, 0.9),
        twinkleSpeed: rand(0.5, 1.8),
        twinklePhase: Math.random() * Math.PI * 2,
        colorRgb: PALETTE_RGBS[Math.floor(Math.random() * PALETTE_RGBS.length)],
      }));
    }

    function draw(now: number) {
      ctx!.clearRect(0, 0, W, H);

      // Deep Obsidian Base Fill
      ctx!.fillStyle = "#050811";
      ctx!.fillRect(0, 0, W, H);

      // Dynamic Ambient Radial Nebulae following scroll & mouse
      const scrollRatio = (scrollY * 0.0005) % (Math.PI * 2);
      const orb1X = W * 0.2 + Math.sin(scrollRatio) * 60;
      const orb1Y = H * 0.15 + Math.cos(scrollRatio) * 40;
      const orb2X = W * 0.8 + Math.cos(scrollRatio * 0.8) * 80;
      const orb2Y = H * 0.7 + Math.sin(scrollRatio * 0.8) * 50;

      // Draw Orb 1 (Emerald Glow)
      const g1 = ctx!.createRadialGradient(orb1X, orb1Y, 0, orb1X, orb1Y, Math.min(W, H) * 0.45);
      g1.addColorStop(0, "rgba(16, 185, 129, 0.12)");
      g1.addColorStop(0.5, "rgba(16, 185, 129, 0.03)");
      g1.addColorStop(1, "rgba(5, 8, 17, 0)");
      ctx!.fillStyle = g1;
      ctx!.fillRect(0, 0, W, H);

      // Draw Orb 2 (Violet / Cyan Depth)
      const g2 = ctx!.createRadialGradient(orb2X, orb2Y, 0, orb2X, orb2Y, Math.min(W, H) * 0.4);
      g2.addColorStop(0, "rgba(99, 102, 241, 0.1)");
      g2.addColorStop(0.5, "rgba(6, 182, 212, 0.02)");
      g2.addColorStop(1, "rgba(5, 8, 17, 0)");
      ctx!.fillStyle = g2;
      ctx!.fillRect(0, 0, W, H);

      const t = now * 0.001;

      // Update & Move Particles
      for (const p of particles) {
        // Subtle magnetic push away from mouse cursor
        const mdx = p.x - mouseX;
        const mdy = p.y - mouseY;
        const mdist2 = mdx * mdx + mdy * mdy;
        if (mdist2 < 140 * 140) {
          const force = (140 - Math.sqrt(mdist2)) / 140;
          p.x += (mdx / (Math.sqrt(mdist2) || 1)) * force * 1.5;
          p.y += (mdy / (Math.sqrt(mdist2) || 1)) * force * 1.5;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Screen Wraparound
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;
      }

      // Draw Constellation Connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist2 = dx * dx + dy * dy;

          if (dist2 < MAX_DIST * MAX_DIST) {
            const dist = Math.sqrt(dist2);
            const alpha = (1 - dist / MAX_DIST) * 0.28;

            ctx!.strokeStyle = `rgba(${p1.colorRgb}, ${alpha})`;
            ctx!.lineWidth = 0.8;
            ctx!.beginPath();
            ctx!.moveTo(p1.x, p1.y);
            ctx!.lineTo(p2.x, p2.y);
            ctx!.stroke();
          }
        }
      }

      // Draw Particles & Glowing Halos
      for (const p of particles) {
        const twinkle = 0.5 + 0.5 * Math.sin(t * p.twinkleSpeed + p.twinklePhase);
        const alpha = p.baseAlpha * twinkle;

        // Glow aura for larger particles
        if (p.r > 2.0) {
          const halo = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
          halo.addColorStop(0, `rgba(${p.colorRgb}, ${alpha * 0.4})`);
          halo.addColorStop(1, "rgba(0, 0, 0, 0)");
          ctx!.fillStyle = halo;
          ctx!.fillRect(p.x - p.r * 6, p.y - p.r * 6, p.r * 12, p.r * 12);
        }

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${p.colorRgb}, ${alpha})`;
        ctx!.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
}
