"use client";

import React, { useState } from "react";
import GlassCard from "@/components/GlassCard";
import { usePortfolioData } from "@/context/PortfolioContext";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Skills.module.css";

export default function Skills() {
  const { data } = usePortfolioData();
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const visibleSkills = (data.skills || []).filter((s) => s.hidden !== true);

  const filteredSkills = activeCategory === "all"
    ? visibleSkills
    : visibleSkills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills">
      <div className="section-container">
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className="gradient-text">{t("skills.title")}</span>
          </h2>
          <p className={styles.subtitle}>{t("skills.subtitle")}</p>
        </div>

        {/* Category Filters */}
        <div className={styles.filterTabs}>
          {[
            { id: "all", label: t("skills.filter.all") },
            { id: "ai", label: t("skills.filter.ai") },
            { id: "frontend", label: t("skills.filter.frontend") },
            { id: "tools", label: t("skills.filter.tools") },
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

        {/* Skills Grid */}
        <div className={styles.skillsGrid}>
          {filteredSkills.map((skill, index) => (
            <GlassCard key={index} className={styles.skillCard}>
              <div className={styles.skillTop}>
                <span className={styles.skillName}>{skill.name}</span>
                <span className={styles.skillLevelText}>{skill.level || 85}%</span>
              </div>

              <div className={styles.progressBarBg}>
                <div
                  className={styles.progressBarFill}
                  style={{ width: `${skill.level || 85}%` }}
                />
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
