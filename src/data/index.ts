import type { Project, Skill, Course } from "@/types";

export const projects: Project[] = [
  {
    id: 1,
    title: "Nabelsi Company Website",
    description:
      "Responsive website showcasing company products with dark/light mode toggle built with Material UI.",
    tags: ["React", "Material UI", "Responsive"],
    emoji: "🌐",
  },
  {
    id: 2,
    title: "Expense Management App",
    description:
      "React application for tracking personal expenses with automatic categorization and monthly reports.",
    tags: ["React", "JavaScript", "Charts"],
    emoji: "💰",
  },
  {
    id: 3,
    title: "ChatPDF – Graduation Project",
    description:
      "AI-powered PDF application using LLM and RAG. Features: chat with PDF, OCR for handwritten text, summarization, quiz generation, and audio-to-text conversion.",
    tags: ["AI", "LLM", "RAG", "Python"],
    emoji: "🤖",
  },
  {
    id: 4,
    title: "Social Aid App",
    description:
      "Donation management platform for connecting donors with those in need, built with React and Material UI.",
    tags: ["React", "Material UI", "Node.js"],
    emoji: "🤝",
  },
];

export const skills: Skill[] = [
  { name: "React", category: "frontend" },
  { name: "CSS", category: "frontend" },
  { name: "Material UI", category: "frontend" },
  { name: "Git", category: "tools" },
  { name: "Postman", category: "tools" },
  { name: "Testing", category: "tools" },
  { name: "UML Diagrams", category: "tools" },
  { name: "Data Analysis", category: "ai" },
  { name: "Machine Learning", category: "ai" },
  { name: "Deep Learning", category: "ai" },
];

export const courses: Course[] = [
  {
    name: "Foundation: Data, Data, Everywhere",
    provider: "Coursera",
  },
];
