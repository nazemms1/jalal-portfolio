"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.skills"), href: "#skills" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.experience"), href: "#experience" },
    { label: t("nav.education"), href: "#education" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <>
      <header className={styles.header}>
        <div className={styles.navInner}>
          <a href="#hero" className={styles.logo}>
            <span className={styles.logoDot} />
            Jalal.ai
          </a>

          <nav>
            <ul className={styles.navLinks}>
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={styles.navLink}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <a href="#contact" className={styles.contactBtn}>
              {t("hero.cta.contact")}
            </a>

            <button
              className={styles.mobileMenuBtn}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className={styles.mobileDrawer}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.mobileNavLink}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className={styles.contactBtn}
            style={{ width: "100%", textAlign: "center", marginTop: "1rem", display: "block" }}
            onClick={() => setMobileOpen(false)}
          >
            {t("hero.cta.contact")}
          </a>
        </div>
      )}
    </>
  );
}
