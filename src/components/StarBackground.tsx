"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  colorIdx: number;
}

/* rgb strings — drawn as rgba */
const COLORS = [
  "232,237,245",  // cool white
  "255,255,255",  // white
  "163,184,74",   // olive accent
  "200,216,160",  // pale olive
  "200,216,255",  // pale blue-white
];

const MAX_DIST = 140;   // connection threshold px
const MIN_SPEED = 0.12;
const MAX_SPEED = 0.32;

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

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width  = W;
      canvas!.height = H;
      build();
    }

    function build() {
      /* ~1 particle per 5 000 px² → rich but not sluggish */
      const count = Math.max(80, Math.floor((W * H) / 5000));
      particles = Array.from({ length: count }, () => ({
        x:            Math.random() * W,
        y:            Math.random() * H,
        vx:           signedRand(MAX_SPEED),
        vy:           signedRand(MAX_SPEED),
        r:            rand(0.9, 2.5),
        baseAlpha:    rand(0.45, 0.95),
        twinkleSpeed: rand(0.4, 1.4),
        twinklePhase: Math.random() * Math.PI * 2,
        colorIdx:     Math.floor(Math.random() * COLORS.length),
      }));
    }

    function draw(now: number) {
      ctx!.clearRect(0, 0, W, H);

      /* ── solid deep-navy fill ── */
      ctx!.fillStyle = "#050b12";
      ctx!.fillRect(0, 0, W, H);

      /* ── subtle nebula blobs ── */
      [
        { cx: W * 0.15, cy: H * 0.12, r: Math.min(W,H)*0.38, rgb:"107,124,46", a:0.07 },
        { cx: W * 0.82, cy: H * 0.72, r: Math.min(W,H)*0.32, rgb:"20,44,90",   a:0.09 },
        { cx: W * 0.52, cy: H * 0.45, r: Math.min(W,H)*0.50, rgb:"18,36,72",   a:0.05 },
      ].forEach(({ cx, cy, r, rgb, a }) => {
        const g = ctx!.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0,   `rgba(${rgb},${a})`);
        g.addColorStop(0.5, `rgba(${rgb},${a*0.3})`);
        g.addColorStop(1,   "rgba(0,0,0,0)");
        ctx!.fillStyle = g;
        ctx!.fillRect(0, 0, W, H);
      });

      const t = now * 0.001;

      /* ── move particles ── */
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        /* wrap edges */
        if (p.x < -4)  p.x = W + 4;
        if (p.x > W+4) p.x = -4;
        if (p.y < -4)  p.y = H + 4;
        if (p.y > H+4) p.y = -4;
      }

      /* ── draw connections ── */
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist2 = dx*dx + dy*dy;
          if (dist2 > MAX_DIST * MAX_DIST) continue;

          const dist    = Math.sqrt(dist2);
          const fade    = 1 - dist / MAX_DIST;  /* 1 at same point, 0 at MAX_DIST */
          const opacity = fade * fade * 0.38;   /* quadratic falloff, max ~0.38 */

          /* olive for olive particles, blue-white otherwise */
          const isOlive = a.colorIdx === 2 || a.colorIdx === 3;
          ctx!.strokeStyle = isOlive
            ? `rgba(163,184,74,${opacity})`
            : `rgba(180,210,255,${opacity})`;
          ctx!.lineWidth = 0.9;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
        }
      }

      /* ── draw stars / nodes ── */
      for (const p of particles) {
        const twinkle = 0.45 + 0.55 * Math.abs(Math.sin(t * p.twinkleSpeed + p.twinklePhase));
        const alpha   = p.baseAlpha * twinkle;
        const col     = COLORS[p.colorIdx];

        /* glow halo for bigger stars */
        if (p.r > 1.6) {
          const glow = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
          glow.addColorStop(0,   `rgba(${col},${alpha * 0.55})`);
          glow.addColorStop(0.4, `rgba(${col},${alpha * 0.12})`);
          glow.addColorStop(1,   "rgba(0,0,0,0)");
          ctx!.fillStyle = glow;
          ctx!.fillRect(p.x - p.r*5, p.y - p.r*5, p.r*10, p.r*10);
        }

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${col},${alpha})`;
        ctx!.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
}
