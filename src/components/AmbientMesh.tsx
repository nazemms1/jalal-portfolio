"use client";

import React from "react";

export default function AmbientMesh() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        backgroundColor: "#030712", // Deep Obsidian Navy
      }}
      aria-hidden="true"
    >
      {/* Animated Liquid Gradient Aura 1 (Emerald Spotlight) */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "15%",
          width: "55vw",
          height: "55vw",
          maxWidth: "700px",
          maxHeight: "700px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.16) 0%, rgba(6, 182, 212, 0.05) 50%, transparent 75%)",
          filter: "blur(90px)",
          animation: "auraFlow1 22s ease-in-out infinite alternate",
        }}
      />

      {/* Animated Liquid Gradient Aura 2 (Indigo / Cyan Orbit) */}
      <div
        style={{
          position: "absolute",
          top: "35%",
          right: "-15%",
          width: "50vw",
          height: "50vw",
          maxWidth: "650px",
          maxHeight: "650px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.14) 0%, rgba(16, 185, 129, 0.04) 50%, transparent 75%)",
          filter: "blur(100px)",
          animation: "auraFlow2 28s ease-in-out infinite alternate-reverse",
        }}
      />

      {/* Animated Liquid Gradient Aura 3 (Deep Violet Glow) */}
      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "25%",
          width: "48vw",
          height: "48vw",
          maxWidth: "600px",
          maxHeight: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, rgba(99, 102, 241, 0.05) 50%, transparent 75%)",
          filter: "blur(95px)",
          animation: "auraFlow3 25s ease-in-out infinite alternate",
        }}
      />

      {/* Fine Structural Gridlines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, transparent 95%)",
          opacity: 0.65,
        }}
      />

      {/* Global CSS Keyframe Animations for Fluid Aura Motion */}
      <style jsx global>{`
        @keyframes auraFlow1 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(60px, -50px) scale(1.12); }
          100% { transform: translate(-40px, 40px) scale(0.92); }
        }
        @keyframes auraFlow2 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-70px, 60px) scale(1.15); }
          100% { transform: translate(50px, -30px) scale(0.95); }
        }
        @keyframes auraFlow3 {
          0% { transform: translate(0, 0) scale(0.95); }
          50% { transform: translate(40px, -60px) scale(1.1); }
          100% { transform: translate(-50px, 30px) scale(1); }
        }
      `}</style>
    </div>
  );
}
