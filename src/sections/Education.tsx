"use client";

import React from "react";
import GlassCard from "@/components/GlassCard";
import { courses } from "@/data";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Education.module.css";

export default function Education() {
  const { t } = useLanguage();

  return (
    <section id="education">
      <div className="section-container">
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className="gradient-text">{t("education.title")}</span>
          </h2>
          <p className={styles.subtitle}>{t("education.subtitle")}</p>
        </div>

        <div className={styles.grid}>
          {/* Degree Card */}
          <GlassCard className={styles.degreeCard}>
            <div className={styles.degreeHeader}>
              <div className={styles.degreeIcon}>🎓</div>
              <div>
                <span className="glass-pill" style={{ marginBottom: "0.25rem" }}>
                  Computer Engineering
                </span>
                <h3 className={styles.degreeTitle}>{t("education.degree.title")}</h3>
              </div>
            </div>

            <p className={styles.degreeDesc}>{t("education.degree.desc")}</p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              <span className="glass-pill">Artificial Intelligence</span>
              <span className="glass-pill">Data Structures</span>
              <span className="glass-pill">Machine Learning</span>
              <span className="glass-pill">Software Engineering</span>
            </div>
          </GlassCard>

          {/* Courses & Specializations */}
          <GlassCard>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "1.25rem", color: "var(--text-main)" }}>
              {t("education.courses")}
            </h3>

            <div className={styles.coursesList}>
              {courses.map((course, idx) => (
                <div key={idx} className={styles.courseItem}>
                  <span className={styles.courseIcon}>📜</span>
                  <div>
                    <div className={styles.courseName}>{course.name}</div>
                    <div className={styles.courseProvider}>{course.provider}</div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
