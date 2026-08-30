"use client";

import React from "react";
import { GlitchText } from "@/components/GlitchText";
import CodeTerminal from "@/components/CodeTerminal";
import { usePortfolioData } from "@/context/PortfolioContext";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Hero.module.css";

export default function Hero() {
  const { data } = usePortfolioData();
  const { t } = useLanguage();
  const { hero } = data;

  return (
    <section className={styles.hero} id="hero">
      <div className="section-container">
        <div className={styles.grid}>
          {/* Hero Content */}
          <div className={styles.heroContent}>
            {hero.availableForWork && (
              <div className={styles.badge}>
                <span className="pulse-dot" />
                <span>{t("nav.available")}</span>
              </div>
            )}

            <p className={styles.greeting}>{hero.greeting || t("hero.greeting")}</p>

            <h1 className={styles.name}>
              <span className="gradient-text">{hero.name}</span>
            </h1>

            <div className={styles.roleWrapper}>
              <GlitchText words={hero.roles} interval={3400} />
            </div>

            <p className={styles.desc}>{hero.description}</p>

            <div className={styles.actions}>
              <a href="#projects" className={styles.btnPrimary}>
                <span>{t("hero.cta.projects")}</span>
                <span className={styles.arrowIcon}>→</span>
              </a>

              <a href={hero.cvUrl || "/cv.pdf"} download className={styles.btnSecondary}>
                <span>📄</span>
                <span>{t("hero.cta.cv")}</span>
              </a>
            </div>

            <div className={styles.statsBar}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{hero.projectsStat}</span>
                <span className={styles.statLabel}>{t("hero.stat.projects")}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{hero.aiStat}</span>
                <span className={styles.statLabel}>{t("hero.stat.ai")}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{hero.expStat}</span>
                <span className={styles.statLabel}>{t("hero.stat.exp")}</span>
              </div>
            </div>
          </div>

          {/* Code Showcase Terminal */}
          <div className={styles.terminalWrapper}>
            <CodeTerminal />
          </div>
        </div>
      </div>
    </section>
  );
}
