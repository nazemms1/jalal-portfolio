"use client";

import React, { createContext, useContext, useEffect } from "react";

type Language = "en";

interface LanguageContextType {
  lang: Language;
  t: (key: string) => string;
  isRtl: boolean;
}

const translations: Record<string, string> = {
  // Nav
  "nav.about": "About",
  "nav.skills": "Skills",
  "nav.projects": "Projects",
  "nav.experience": "Experience",
  "nav.education": "Education",
  "nav.contact": "Contact",
  "nav.available": "Available for Work & AI Contracts",

  // Hero
  "hero.badge": "AI & Front-End Specialist",
  "hero.greeting": "Hi, I am",
  "hero.name": "Jalal Al-Nabelsi",
  "hero.desc": "Crafting intelligent AI applications (RAG & LLMs) and building high-performance, visually stunning web interfaces with clean architecture and glassmorphic aesthetics.",
  "hero.cta.projects": "Explore Projects",
  "hero.cta.cv": "Download CV",
  "hero.cta.contact": "Get In Touch",
  "hero.stat.projects": "Featured Projects",
  "hero.stat.ai": "AI & RAG Specialty",
  "hero.stat.exp": "Modern Web Craft",

  // About
  "about.title": "About Me",
  "about.subtitle": "Blending Artificial Intelligence with Modern Engineering",
  "about.p1": "I am an AI Engineer and Front-End Developer dedicated to solving complex software problems through elegant, intuitive solutions. My core focus lies in building Retrieval-Augmented Generation (RAG) systems and architecting high-end React & Next.js applications.",
  "about.p2": "Holding a background in Computer Engineering, I prioritize writing clean, maintainable code, implementing scalable system architectures, and delivering bespoke glassmorphic interfaces that break away from generic AI tropes.",
  "about.focus.ai.title": "AI & RAG Solutions",
  "about.focus.ai.desc": "Building custom RAG engines, document Q&A applications, vector embeddings, and LLM integrations.",
  "about.focus.web.title": "Modern Web Craft",
  "about.focus.web.desc": "Engineering sleek, highly responsive React & Next.js applications with pixel-perfect Glassmorphism.",
  "about.focus.arch.title": "Scalable Architecture",
  "about.focus.arch.desc": "Designing robust software systems, structured APIs, and performant data pipelines.",

  // Skills
  "skills.title": "Technical Mastery",
  "skills.subtitle": "Tools & Technologies I work with daily",
  "skills.filter.all": "All Technologies",
  "skills.filter.ai": "AI & Data",
  "skills.filter.frontend": "Front-End",
  "skills.filter.tools": "Engineering & Tools",

  // Projects
  "projects.title": "Featured Projects",
  "projects.subtitle": "A showcase of intelligent AI applications and modern software engineering",
  "projects.filter.all": "All Projects",
  "projects.filter.ai": "AI & RAG",
  "projects.filter.web": "Web Applications",
  "projects.viewDetails": "Inspect Architecture",
  "projects.liveDemo": "Live Demo",

  // Experience
  "experience.title": "Professional Path",
  "experience.subtitle": "My journey in AI engineering and modern web development",

  // Education
  "education.title": "Education & Certifications",
  "education.subtitle": "Academic background and continuous technical learning",
  "education.degree.title": "Bachelor's Degree in Computer Engineering / AI",
  "education.degree.desc": "In-depth studies in Artificial Intelligence, Machine Learning algorithms, Data Structures, and Software Engineering.",
  "education.courses": "Global Certifications & Specializations",

  // Contact
  "contact.title": "Get In Touch",
  "contact.subtitle": "Have an ambitious project or opportunity in mind? Let's build something extraordinary together.",
  "contact.email": "Email Address",
  "contact.copy": "Copy Email",
  "contact.copied": "Copied to Clipboard!",
  "contact.send": "Send Direct Message",
  "contact.github": "GitHub Profile",
  "contact.linkedin": "LinkedIn Profile",

  // Modal
  "modal.close": "Close Window",
  "modal.techStack": "Technologies & Tools",
  "modal.keyFeatures": "Key Highlights & Architecture",
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.dir = "ltr";
    document.documentElement.lang = "en";
  }, []);

  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        lang: "en",
        t,
        isRtl: false,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
