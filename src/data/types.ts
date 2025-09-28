// TypeScript interfaces for exam board data structure

export interface Topic {
  id: string;
  name: string;
  topicId?: number; // Numerical ID for efficient storage (optional for backward compatibility)
}

export interface Paper {
  id: string;
  name: string;
  topics: Topic[];
}

export interface Subject {
  id: string;
  name: string;
  icon: string; // Lucide icon name
  tier?: string; // "Higher" or "Foundation" for tiered subjects
  papers: Paper[];
}

export interface ExamBoard {
  id: string;
  name: string;
  subjects: Subject[];
}
