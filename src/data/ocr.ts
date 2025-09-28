import { ExamBoard } from './types';

export const ocr: ExamBoard = {
  id: "ocr",
  name: "OCR",
  subjects: [
    {
      id: "mathematics-higher",
      name: "Mathematics",
      icon: "Calculator",
      tier: "Higher",
      papers: [
        {
          id: "paper-1",
          name: "Paper 1",
          topics: [
            { id: "number", name: "Number", topicId: 1 },
            { id: "algebra", name: "Algebra", topicId: 2 },
            { id: "ratio-proportion", name: "Ratio, Proportion and Rates of Change", topicId: 3 },
            { id: "geometry-measures", name: "Geometry and Measures", topicId: 4 },
            { id: "probability", name: "Probability", topicId: 5 },
            { id: "statistics", name: "Statistics", topicId: 6 }
          ]
        },
        {
          id: "paper-2",
          name: "Paper 2",
          topics: [
            { id: "number", name: "Number", topicId: 1 },
            { id: "algebra", name: "Algebra", topicId: 2 },
            { id: "ratio-proportion", name: "Ratio, Proportion and Rates of Change", topicId: 3 },
            { id: "geometry-measures", name: "Geometry and Measures", topicId: 4 },
            { id: "probability", name: "Probability", topicId: 5 },
            { id: "statistics", name: "Statistics", topicId: 6 }
          ]
        },
        {
          id: "paper-3",
          name: "Paper 3",
          topics: [
            { id: "number", name: "Number", topicId: 1 },
            { id: "algebra", name: "Algebra", topicId: 2 },
            { id: "ratio-proportion", name: "Ratio, Proportion and Rates of Change", topicId: 3 },
            { id: "geometry-measures", name: "Geometry and Measures", topicId: 4 },
            { id: "probability", name: "Probability", topicId: 5 },
            { id: "statistics", name: "Statistics", topicId: 6 }
          ]
        }
      ]
    },
    {
      id: "mathematics-foundation",
      name: "Mathematics",
      icon: "Calculator",
      tier: "Foundation",
      papers: [
        {
          id: "paper-1",
          name: "Paper 1",
          topics: [
            { id: "number", name: "Number", topicId: 1 },
            { id: "algebra", name: "Algebra", topicId: 2 },
            { id: "ratio-proportion", name: "Ratio, Proportion and Rates of Change", topicId: 3 },
            { id: "geometry-measures", name: "Geometry and Measures", topicId: 4 },
            { id: "probability", name: "Probability", topicId: 5 },
            { id: "statistics", name: "Statistics", topicId: 6 }
          ]
        },
        {
          id: "paper-2",
          name: "Paper 2",
          topics: [
            { id: "number", name: "Number", topicId: 1 },
            { id: "algebra", name: "Algebra", topicId: 2 },
            { id: "ratio-proportion", name: "Ratio, Proportion and Rates of Change", topicId: 3 },
            { id: "geometry-measures", name: "Geometry and Measures", topicId: 4 },
            { id: "probability", name: "Probability", topicId: 5 },
            { id: "statistics", name: "Statistics", topicId: 6 }
          ]
        },
        {
          id: "paper-3",
          name: "Paper 3",
          topics: [
            { id: "number", name: "Number", topicId: 1 },
            { id: "algebra", name: "Algebra", topicId: 2 },
            { id: "ratio-proportion", name: "Ratio, Proportion and Rates of Change", topicId: 3 },
            { id: "geometry-measures", name: "Geometry and Measures", topicId: 4 },
            { id: "probability", name: "Probability", topicId: 5 },
            { id: "statistics", name: "Statistics", topicId: 6 }
          ]
        }
      ]
    },
    {
      id: "computer-science",
      name: "Computer Science",
      icon: "Monitor",
      papers: [
        {
          id: "paper-1",
          name: "Paper 1: Computer Systems",
          topics: [
            { id: "systems-architecture", name: "Systems Architecture", topicId: 41 },
            { id: "memory-storage", name: "Memory and Storage", topicId: 42 },
            { id: "computer-networks", name: "Computer Networks, Connections and Protocols", topicId: 43 },
            { id: "network-security", name: "Network Security", topicId: 44 },
            { id: "systems-software", name: "Systems Software", topicId: 45 },
            { id: "ethical-legal", name: "Ethical, Legal, Cultural and Environmental Impacts of Digital Technology", topicId: 46 }
          ]
        },
        {
          id: "paper-2",
          name: "Paper 2: Computational Thinking, Algorithms and Programming",
          topics: [
            { id: "algorithms", name: "Algorithms", topicId: 47 },
            { id: "programming-fundamentals", name: "Programming Fundamentals", topicId: 48 },
            { id: "producing-robust-programs", name: "Producing Robust Programs", topicId: 49 },
            { id: "boolean-logic", name: "Boolean Logic", topicId: 50 },
            { id: "programming-languages", name: "Programming Languages and Integrated Development Environments", topicId: 51 }
          ]
        }
      ]
    },
    {
      id: "english-language",
      name: "English Language",
      icon: "BookOpen",
      papers: [
        {
          id: "paper-1",
          name: "Paper 1: Communicating Information and Ideas",
          topics: [
            { id: "reading-information", name: "Reading: Understanding and responding to information texts", topicId: 52 },
            { id: "writing-information", name: "Writing: Communicating information and ideas", topicId: 53 }
          ]
        },
        {
          id: "paper-2",
          name: "Paper 2: Exploring Effects and Impact",
          topics: [
            { id: "reading-effects", name: "Reading: Understanding and responding to texts that explore effects and impact", topicId: 54 },
            { id: "writing-effects", name: "Writing: Exploring effects and impact", topicId: 55 }
          ]
        }
      ]
    },
    {
      id: "english-literature",
      name: "English Literature",
      icon: "BookOpen",
      papers: [
        {
          id: "paper-1",
          name: "Paper 1: Exploring Modern and Literary Heritage Texts",
          topics: [
            { id: "modern-prose", name: "Modern Prose or Drama", topicId: 56 },
            { id: "literary-heritage", name: "Literary Heritage Prose or Drama", topicId: 57 }
          ]
        },
        {
          id: "paper-2",
          name: "Paper 2: Exploring Poetry and Shakespeare",
          topics: [
            { id: "poetry", name: "Poetry", topicId: 58 },
            { id: "shakespeare", name: "Shakespeare", topicId: 59 }
          ]
        }
      ]
    }
  ]
};
