"use client";

import React, { useState } from "react";
import GlassCard from "@/components/GlassCard";
import ProjectModal from "@/components/ProjectModal";
import { usePortfolioData } from "@/context/PortfolioContext";
import type { Project } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Projects.module.css";

export default function Projects() {
  const { data } = usePortfolioData();
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const visibleProjects = (data.projects || []).filter((p) => p.hidden !== true);

  const filteredProjects = activeCategory === "all"
    ? visibleProjects
    : visibleProjects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects">
      <div className="section-container">
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className="gradient-text">{t("projects.title")}</span>
          </h2>
          <p className={styles.subtitle}>{t("projects.subtitle")}</p>
        </div>

        {/* Category Filters */}
        <div className={styles.filterTabs}>
          {[
            { id: "all", label: t("projects.filter.all") },
            { id: "ai", label: t("projects.filter.ai") },
            { id: "web", label: t("projects.filter.web") },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`${styles.tabBtn} ${
                activeCategory === tab.id ? styles.tabBtnActive : ""
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className={styles.projectsGrid}>
          {filteredProjects.map((project) => {
            const displayImg = project.imageUrl || project.demoUrl;

            return (
              <GlassCard
                key={project.id}
                className={styles.projectCard}
                onClick={() => setSelectedProject(project)}
              >
                <div>
                  {displayImg ? (
                    <div className={styles.imageFrame}>
                      <img
                        src={displayImg}
                        alt={project.title}
                        className={styles.projectImg}
                      />
                    </div>
                  ) : (
                    <div className={styles.placeholderFrame}>
                      <span className="glass-pill">
                        {project.category === "ai" ? "AI & RAG System" : "Web Platform"}
                      </span>
                    </div>
                  )}

                  <div className={styles.cardHeader}>
                    <span className="glass-pill">
                      {project.category === "ai" ? "AI & RAG" : "Web Application"}
                    </span>
                  </div>

                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDesc}>{project.description}</p>
                </div>

                <div>
                  <div className={styles.tags}>
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className={styles.cardFooter}>
                    <button
                      className={styles.detailsBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                    >
                      <span>🔍</span>
                      <span>{t("projects.viewDetails")}</span>
                    </button>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* Project Specs Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
