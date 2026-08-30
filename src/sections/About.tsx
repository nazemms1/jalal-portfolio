"use client";

import React from "react";
import GlassCard from "@/components/GlassCard";
import { usePortfolioData } from "@/context/PortfolioContext";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./About.module.css";

export default function About() {
  const { data } = usePortfolioData();
  const { t } = useLanguage();
  const { about } = data;

  return (
    <section id="about" style={{ position: "relative" }}>
      <div className="section-container">
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className="gradient-text">{t("about.title")}</span>
          </h2>
          <p className={styles.subtitle}>{t("about.subtitle")}</p>
        </div>

        <div className={styles.bentoGrid}>
          {/* Main Story Card */}
          <GlassCard className={styles.mainCard}>
            <div>
              <span className="glass-pill" style={{ marginBottom: "1rem" }}>
                <span>💡</span> <span>Core Philosophy</span>
              </span>
              <p className={styles.paragraph}>{about.p1}</p>
              <p className={styles.paragraph}>{about.p2}</p>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1rem" }}>
              <span className="glass-pill">RAG & Vector Search</span>
              <span className="glass-pill">React & Next.js Architecture</span>
              <span className="glass-pill">LLM Prompting & Fine-Tuning</span>
              <span className="glass-pill">Clean Code & System Design</span>
            </div>
          </GlassCard>

          {/* Focus Pillars Stack */}
          <div className={styles.focusStack}>
            <GlassCard className={styles.focusCard}>
              <div className={styles.focusIcon}>🤖</div>
              <div>
                <h3 className={styles.focusHeading}>{t("about.focus.ai.title")}</h3>
                <p className={styles.focusText}>{t("about.focus.ai.desc")}</p>
              </div>
            </GlassCard>

            <GlassCard className={styles.focusCard}>
              <div className={styles.focusIcon}>⚡</div>
              <div>
                <h3 className={styles.focusHeading}>{t("about.focus.web.title")}</h3>
                <p className={styles.focusText}>{t("about.focus.web.desc")}</p>
              </div>
            </GlassCard>

            <GlassCard className={styles.focusCard}>
              <div className={styles.focusIcon}>🏛️</div>
              <div>
                <h3 className={styles.focusHeading}>{t("about.focus.arch.title")}</h3>
                <p className={styles.focusText}>{t("about.focus.arch.desc")}</p>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
