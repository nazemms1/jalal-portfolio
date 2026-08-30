"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { projects as defaultProjects, skills as defaultSkills, experiences as defaultExperiences, courses as defaultCourses } from "@/data";
import type { Project, Skill, ExperienceItem, Course } from "@/types";

export interface PortfolioContentData {
  hero: {
    name: string;
    greeting: string;
    roles: string[];
    description: string;
    projectsStat: string;
    aiStat: string;
    expStat: string;
    cvUrl: string;
    availableForWork: boolean;
  };
  about: {
    p1: string;
    p2: string;
  };
  projects: Project[];
  skills: Skill[];
  experiences: ExperienceItem[];
  courses: Course[];
  contact: {
    email: string;
    githubUrl: string;
    linkedinUrl: string;
  };
}

export const defaultPortfolioData: PortfolioContentData = {
  hero: {
    name: "Jalal Al-Nabelsi",
    greeting: "Hi, I am",
    roles: [
      "AI Engineer & Front-End Developer",
      "RAG Systems & LLM Specialist",
      "React & Next.js Architect",
      "Machine Learning Engineer",
    ],
    description:
      "Crafting intelligent AI applications (RAG & LLMs) and building high-performance, visually stunning web interfaces with clean architecture and glassmorphic aesthetics.",
    projectsStat: "4+",
    aiStat: "RAG / LLM",
    expStat: "Next.js & React",
    cvUrl: "/cv.pdf",
    availableForWork: true,
  },
  about: {
    p1: "I am an AI Engineer and Front-End Developer dedicated to solving complex software problems through elegant, intuitive solutions. My core focus lies in building Retrieval-Augmented Generation (RAG) systems and architecting high-end React & Next.js applications.",
    p2: "Holding a background in Computer Engineering, I prioritize writing clean, maintainable code, implementing scalable system architectures, and delivering bespoke glassmorphic interfaces that break away from generic AI tropes.",
  },
  projects: defaultProjects,
  skills: defaultSkills,
  experiences: defaultExperiences,
  courses: defaultCourses,
  contact: {
    email: "jalal.nabelsi@example.com",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
  },
};

interface PortfolioContextType {
  data: PortfolioContentData;
  isLoading: boolean;
  isSynced: boolean;
  saveData: (newContent: PortfolioContentData) => Promise<void>;
  resetToDefaults: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioContentData>(defaultPortfolioData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSynced, setIsSynced] = useState<boolean>(false);

  useEffect(() => {
    // Firestore realtime listener on Jalal/content
    const docRef = doc(db, "Jalal", "content");

    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const remoteData = snapshot.data() as PortfolioContentData;
          // Merge with defaults to guarantee all fields exist
          setData({
            hero: { ...defaultPortfolioData.hero, ...remoteData.hero },
            about: { ...defaultPortfolioData.about, ...remoteData.about },
            projects: remoteData.projects || defaultPortfolioData.projects,
            skills: remoteData.skills || defaultPortfolioData.skills,
            experiences: remoteData.experiences || defaultPortfolioData.experiences,
            courses: remoteData.courses || defaultPortfolioData.courses,
            contact: { ...defaultPortfolioData.contact, ...remoteData.contact },
          });
          setIsSynced(true);
        } else {
          // Document doesn't exist yet, seed initial content to Firestore
          setDoc(docRef, defaultPortfolioData)
            .then(() => setIsSynced(true))
            .catch(() => setIsSynced(false));
        }
        setIsLoading(false);
      },
      (error) => {
        console.warn("Firestore realtime sync offline, using local fallback seed:", error);
        setIsSynced(false);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const saveData = async (newContent: PortfolioContentData) => {
    setData(newContent);
    const docRef = doc(db, "Jalal", "content");
    await setDoc(docRef, newContent, { merge: true });
    setIsSynced(true);
  };

  const resetToDefaults = async () => {
    setData(defaultPortfolioData);
    const docRef = doc(db, "Jalal", "content");
    await setDoc(docRef, defaultPortfolioData);
    setIsSynced(true);
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isLoading,
        isSynced,
        saveData,
        resetToDefaults,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolioData() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolioData must be used within a PortfolioProvider");
  }
  return context;
}
