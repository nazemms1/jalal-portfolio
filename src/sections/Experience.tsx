"use client";

import React from "react";
import GlassCard from "@/components/GlassCard";
import { usePortfolioData } from "@/context/PortfolioContext";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Experience.module.css";

export default function Experience() {
  const { data } = usePortfolioData();
  const { t } = useLanguage();
  const visibleExperiences = (data.experiences || []).filter((exp) => exp.hidden !== true);

  return (
    <section id="experience">
      <div className="section-container">
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className="gradient-text">{t("experience.title")}</span>
          </h2>
          <p className={styles.subtitle}>{t("experience.subtitle")}</p>
        </div>

        <div className={styles.timeline}>
          <div className={styles.timelineLine} />

          {visibleExperiences.map((exp) => (
            <div key={exp.id} className={styles.timelineItem}>
              <div className={styles.nodeDot} />

              <GlassCard>
                <div className={styles.expHeader}>
                  <div>
                    <h3 className={styles.roleTitle}>{exp.role}</h3>
                    <span className={styles.companyName}>{exp.company}</span>
                  </div>

                  <span className={styles.periodBadge}>{exp.period}</span>
                </div>

                <p className={styles.expDesc}>{exp.description}</p>

                <ul className={styles.highlightsList}>
                  {exp.highlights.map((item, idx) => (
                    <li key={idx} className={styles.highlightItem}>
                      <span className={styles.highlightBullet}>⚡</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className={styles.tags}>
                  {exp.tags.map((tag, idx) => (
                    <span key={idx} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
