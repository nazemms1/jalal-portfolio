export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  emoji: string;
}

export interface Skill {
  name: string;
  category: "frontend" | "tools" | "ai";
}

export interface Course {
  name: string;
  provider: string;
}
