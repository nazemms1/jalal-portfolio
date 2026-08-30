"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Footer.module.css";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <a href="#hero" className={styles.brand}>
            Jalal Al-Nabelsi
          </a>
          <p className={styles.text}>
            © {new Date().getFullYear()} Jalal Al-Nabelsi. Handcrafted with React &amp; Firebase Realtime CMS.
          </p>
        </div>

        <ul className={styles.links}>
          <li><a href="#about" className={styles.link}>{t("nav.about")}</a></li>
          <li><a href="#skills" className={styles.link}>{t("nav.skills")}</a></li>
          <li><a href="#projects" className={styles.link}>{t("nav.projects")}</a></li>
          <li><a href="#contact" className={styles.link}>{t("nav.contact")}</a></li>
          <li>
            <a
              href="#/admin"
              className={styles.link}
              style={{ color: "var(--accent-emerald)", fontWeight: 600 }}
              title="Open Portfolio CMS Admin"
            >
              🔒 Portfolio CMS
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
