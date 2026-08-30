"use client";

import React, { useEffect } from "react";
import type { Project } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const displayImg = project.imageUrl || project.demoUrl;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        backgroundColor: "rgba(2, 6, 23, 0.78)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        animation: "fadeIn 0.25s ease-out",
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          width: "100%",
          maxWidth: "680px",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "2rem",
          position: "relative",
          border: "1px solid rgba(255, 255, 255, 0.16)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(16, 185, 129, 0.15)",
          direction: "ltr",
          textAlign: "left",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Image Showcase */}
        {displayImg && (
          <div style={{ width: "100%", height: "220px", borderRadius: "1.1rem", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid rgba(255,255,255,0.12)" }}>
            <img src={displayImg} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "1.25rem" }}>
          <div>
            <span className="glass-pill" style={{ marginBottom: "0.4rem" }}>
              {project.category === "ai" ? "AI & RAG Platform" : "Web Application"}
            </span>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 800, margin: 0, color: "#ffffff" }}>{project.title}</h3>
          </div>

          <button
            onClick={onClose}
            aria-label={t("modal.close")}
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "var(--text-muted)",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
            }}
          >
            ✕
          </button>
        </div>

        {/* Description */}
        <p style={{ color: "var(--text-muted)", fontSize: "0.975rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          {project.fullDescription || project.description}
        </p>

        {/* Tech Stack */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h4 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--accent-emerald)", marginBottom: "0.75rem", fontWeight: 700 }}>
            {t("modal.techStack")}
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                style={{
                  background: "rgba(16, 185, 129, 0.1)",
                  border: "1px solid rgba(16, 185, 129, 0.25)",
                  color: "#a7f3d0",
                  fontSize: "0.8rem",
                  padding: "0.3rem 0.75rem",
                  borderRadius: "9999px",
                  fontWeight: 500,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Key Features */}
        {project.features && project.features.length > 0 && (
          <div style={{ marginBottom: "1.75rem" }}>
            <h4 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--accent-emerald)", marginBottom: "0.75rem", fontWeight: 700 }}>
              {t("modal.keyFeatures")}
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {project.features.map((feat, idx) => (
                <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.9rem", color: "var(--text-main)" }}>
                  <span style={{ color: "var(--accent-emerald)", fontSize: "1.1rem", lineHeight: 1 }}>⚡</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
          <button
            onClick={onClose}
            style={{
              padding: "0.65rem 1.5rem",
              borderRadius: "0.75rem",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "var(--text-main)",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {t("modal.close")}
          </button>
        </div>
      </div>
    </div>
  );
}
