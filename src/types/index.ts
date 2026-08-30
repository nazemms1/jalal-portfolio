export interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription?: string;
  features?: string[];
  tags: string[];
  category: "ai" | "web";
  imageUrl?: string; // Image URL or Base64
  githubUrl?: string;
  demoUrl?: string;
  hidden?: boolean;
}

export interface Skill {
  name: string;
  category: "frontend" | "tools" | "ai";
  level?: number;
  iconName?: string;
  hidden?: boolean;
}

export interface Course {
  name: string;
  provider: string;
  year?: string;
  link?: string;
  hidden?: boolean;
}

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
  tags: string[];
  hidden?: boolean;
}
