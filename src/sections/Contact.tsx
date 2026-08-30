"use client";

import React, { useState } from "react";
import GlassCard from "@/components/GlassCard";
import { usePortfolioData } from "@/context/PortfolioContext";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Contact.module.css";

export default function Contact() {
  const { data } = usePortfolioData();
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const email = data.contact?.email || "jalal.nabelsi@example.com";
  const github = data.contact?.githubUrl || "https://github.com";
  const linkedin = data.contact?.linkedinUrl || "https://linkedin.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact">
      <div className="section-container">
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className="gradient-text">{t("contact.title")}</span>
          </h2>
          <p className={styles.subtitle}>{t("contact.subtitle")}</p>
        </div>

        <GlassCard className={styles.contactCard}>
          <span className="glass-pill" style={{ marginBottom: "1.5rem" }}>
            <span className="pulse-dot" />
            <span>Open for full-time roles &amp; AI contracts</span>
          </span>

          <h3 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "1rem 0 0.5rem" }}>
            Let's build something remarkable
          </h3>

          {/* Email Box */}
          <div className={styles.emailBox}>
            <span className={styles.emailText}>{email}</span>
            <button onClick={handleCopy} className={styles.copyBtn}>
              <span>📋</span>
              <span>{copied ? t("contact.copied") : t("contact.copy")}</span>
            </button>
          </div>

          {copied && <p className={styles.toast}>✨ {t("contact.copied")}</p>}

          {/* Social Connections */}
          <div className={styles.socialGrid}>
            <a
              href={`mailto:${email}`}
              className={styles.socialBtn}
              style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", color: "#020617" }}
            >
              <span>✉️</span>
              <span>{t("contact.send")}</span>
            </a>

            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.185 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
              </svg>
              <span>{t("contact.github")}</span>
            </a>

            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span>{t("contact.linkedin")}</span>
            </a>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
