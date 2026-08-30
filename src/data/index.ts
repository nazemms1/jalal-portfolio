import type { Project, Skill, Course, ExperienceItem } from "@/types";

export const projects: Project[] = [
  {
    id: 1,
    title: "ChatPDF – AI Graduation Project",
    description:
      "Advanced AI-powered PDF conversational application engineered with Large Language Models (LLM) and Retrieval-Augmented Generation (RAG).",
    fullDescription:
      "ChatPDF empowers users to upload complex PDF documents and engage in context-aware conversations. Built with RAG architecture, it indexes documents into vector embeddings for precise citation and accurate answer synthesis. Key features include handwritten OCR, auto-generated quizzes, instant document summaries, and voice-to-text input.",
    features: [
      "Retrieval-Augmented Generation (RAG) for accurate PDF search & Q&A",
      "Handwritten OCR processing for scanning physical notes",
      "Automated summary & interactive quiz generator",
      "Audio-to-text conversion & real-time response stream",
    ],
    tags: ["Python", "AI / LLM", "RAG", "Vector DB", "FastAPI", "React"],
    category: "ai",
  },
  {
    id: 2,
    title: "Nabelsi Company Platform",
    description:
      "Modern corporate Web application showcasing commercial products, featuring custom theme architecture and dynamic product catalogs.",
    fullDescription:
      "A complete enterprise product display website built with React and custom design components. Includes seamless dark/light mode toggles, real-time product filtering, interactive inquiry forms, and fully responsive multi-device accessibility.",
    features: [
      "Dynamic dark/light mode aesthetic transition",
      "Product category filter and search index",
      "High-performance image loading & accessibility",
      "Interactive customer quote & contact flow",
    ],
    tags: ["React", "Material UI", "TypeScript", "Responsive UI"],
    category: "web",
  },
  {
    id: 3,
    title: "Expense Management Ecosystem",
    description:
      "Interactive personal finance tracking web application featuring automated expense categorization, budget analytics, and visual reports.",
    fullDescription:
      "An intuitive web platform enabling users to track multi-currency income and expenses. Offers intelligent categorization, month-over-month trend visualization, customizable spending alerts, and local data persistence.",
    features: [
      "Interactive chart dashboards for spending analysis",
      "Automated categorization of daily transactions",
      "Budget goal tracking with visual progress metrics",
      "Export reports to CSV/PDF formats",
    ],
    tags: ["React", "JavaScript", "Chart.js", "CSS Glass"],
    category: "web",
  },
  {
    id: 4,
    title: "Social Aid Platform",
    description:
      "Humanitarian donation and resource matching platform connecting verified donors directly with families in need.",
    fullDescription:
      "Designed to streamline community aid distribution. Features case management, donor transparency tracking, campaign creation, and secure multi-role administrative dashboards.",
    features: [
      "Verified case listings and campaign progress bars",
      "Donor transparent matching system",
      "Role-based access control (Admin, Donor, Manager)",
      "Mobile-first fluid layout design",
    ],
    tags: ["React", "Material UI", "Node.js", "Express"],
    category: "web",
  },
];

export const skills: Skill[] = [
  // AI Category
  { name: "Python", category: "ai", level: 92 },
  { name: "RAG Systems", category: "ai", level: 90 },
  { name: "LLMs & Prompt Eng", category: "ai", level: 88 },
  { name: "Machine Learning", category: "ai", level: 85 },
  { name: "Deep Learning", category: "ai", level: 82 },
  { name: "Data Analysis", category: "ai", level: 86 },

  // Frontend Category
  { name: "React.js", category: "frontend", level: 95 },
  { name: "Next.js", category: "frontend", level: 90 },
  { name: "TypeScript", category: "frontend", level: 88 },
  { name: "JavaScript (ES6+)", category: "frontend", level: 94 },
  { name: "Modern CSS / Glassmorphism", category: "frontend", level: 96 },
  { name: "Material UI / Tailwind", category: "frontend", level: 90 },

  // Tools Category
  { name: "Git & GitHub", category: "tools", level: 92 },
  { name: "FastAPI / Node.js", category: "tools", level: 84 },
  { name: "REST APIs & Postman", category: "tools", level: 90 },
  { name: "Software Testing", category: "tools", level: 80 },
  { name: "UML Architecture", category: "tools", level: 85 },
];

export const courses: Course[] = [
  {
    name: "Foundation: Data, Data, Everywhere",
    provider: "Coursera / Google",
    year: "2024",
  },
];

export const experiences: ExperienceItem[] = [
  {
    id: 1,
    role: "AI & Front-End Software Developer",
    company: "Autonomous Projects & Engineering",
    period: "2023 - Present",
    description:
      "Engineering modern web software applications integrated with intelligent AI pipelines and RAG document search engines.",
    highlights: [
      "Architected ChatPDF graduation system using LLMs, vector search, and handwritten OCR",
      "Designed and delivered glassmorphic React applications with smooth micro-interactions",
      "Optimized front-end rendering performance and state management in Next.js apps",
    ],
    tags: ["AI", "React", "Next.js", "Python", "RAG"],
  },
];
