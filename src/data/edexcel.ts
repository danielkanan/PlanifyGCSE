import { ExamBoard } from './types';

export const edexcel: ExamBoard = {
  id: "edexcel",
  name: "Edexcel",
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
      id: "english-language",
      name: "English Language",
      icon: "BookOpen",
      papers: [
        {
          id: "paper-1",
          name: "Paper 1: Fiction and Imaginative Writing",
          topics: [
            { id: "reading-fiction", name: "Reading: Understanding and responding to fiction texts", topicId: 1 },
            { id: "writing-fiction", name: "Writing: Imaginative writing", topicId: 2 }
          ]
        },
        {
          id: "paper-2",
          name: "Paper 2: Non-fiction and Transactional Writing",
          topics: [
            { id: "reading-non-fiction", name: "Reading: Understanding and responding to non-fiction texts", topicId: 3 },
            { id: "writing-non-fiction", name: "Writing: Transactional writing", topicId: 4 }
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
          name: "Paper 1: Shakespeare and Post-1914 Literature",
          topics: [
            { id: "shakespeare", name: "Shakespeare" },
            { id: "post-1914-literature", name: "Post-1914 Literature" }
          ]
        },
        {
          id: "paper-2",
          name: "Paper 2: 19th-century Novel and Poetry since 1789",
          topics: [
            { id: "19th-century-novel", name: "19th-century Novel" },
            { id: "poetry-since-1789", name: "Poetry since 1789" }
          ]
        }
      ]
    },
    {
      id: "biology",
      name: "Biology",
      icon: "Dna",
      papers: [
        {
          id: "paper-1",
          name: "Paper 1",
          topics: [
            { id: "key-concepts", name: "Key Concepts in Biology" },
            { id: "cells-control", name: "Cells and Control" },
            { id: "genetics", name: "Genetics" },
            { id: "natural-selection", name: "Natural Selection and Genetic Modification" }
          ]
        },
        {
          id: "paper-2",
          name: "Paper 2",
          topics: [
            { id: "health-disease", name: "Health, Disease and the Development of Medicines" },
            { id: "plant-structures", name: "Plant Structures and their Functions" },
            { id: "animal-coordination", name: "Animal Coordination, Control and Homeostasis" },
            { id: "exchange-transport", name: "Exchange and Transport in Animals" },
            { id: "ecosystems", name: "Ecosystems and Material Cycles" }
          ]
        }
      ]
    },
    {
      id: "chemistry",
      name: "Chemistry",
      icon: "FlaskConical",
      papers: [
        {
          id: "paper-1",
          name: "Paper 1",
          topics: [
            { id: "atomic-structure", name: "Atomic Structure and the Periodic Table" },
            { id: "bonding-structure", name: "Bonding, Structure and Properties of Matter" },
            { id: "chemical-changes", name: "Chemical Changes" },
            { id: "extracting-metals", name: "Extracting Metals and Equilibria" }
          ]
        },
        {
          id: "paper-2",
          name: "Paper 2",
          topics: [
            { id: "separate-chemistry", name: "Separate Chemistry 1" },
            { id: "groups-periodic", name: "Groups in the Periodic Table" },
            { id: "rates-energy", name: "Rates of Reaction and Energy Changes" },
            { id: "fuels-earth", name: "Fuels and Earth Science" },
            { id: "separate-chemistry-2", name: "Separate Chemistry 2" }
          ]
        }
      ]
    },
    {
      id: "physics",
      name: "Physics",
      icon: "Atom",
      papers: [
        {
          id: "paper-1",
          name: "Paper 1",
          topics: [
            { id: "motion-forces", name: "Motion and Forces" },
            { id: "conservation-energy", name: "Conservation of Energy" },
            { id: "waves", name: "Waves" },
            { id: "light-electromagnetic", name: "Light and the Electromagnetic Spectrum" },
            { id: "radioactivity", name: "Radioactivity" },
            { id: "astronomy", name: "Astronomy" }
          ]
        },
        {
          id: "paper-2",
          name: "Paper 2",
          topics: [
            { id: "energy-forces", name: "Energy - Forces Doing Work" },
            { id: "forces-their-effects", name: "Forces and their Effects" },
            { id: "electricity-circuits", name: "Electricity and Circuits" },
            { id: "magnetism-motors", name: "Magnetism and the Motor Effect" },
            { id: "electromagnetic-induction", name: "Electromagnetic Induction" },
            { id: "particle-model", name: "Particle Model" }
          ]
        }
      ]
    },
    {
      id: "combined-science-higher",
      name: "Combined Science",
      icon: "Microscope",
      tier: "Higher",
      papers: [
        {
          id: "biology-paper-1",
          name: "Biology Paper 1",
          topics: [
            { id: "key-concepts", name: "Key Concepts in Biology" },
            { id: "cells-control", name: "Cells and Control" },
            { id: "genetics", name: "Genetics" },
            { id: "natural-selection", name: "Natural Selection and Genetic Modification" }
          ]
        },
        {
          id: "biology-paper-2",
          name: "Biology Paper 2",
          topics: [
            { id: "health-disease", name: "Health, Disease and the Development of Medicines" },
            { id: "plant-structures", name: "Plant Structures and their Functions" },
            { id: "animal-coordination", name: "Animal Coordination, Control and Homeostasis" },
            { id: "exchange-transport", name: "Exchange and Transport in Animals" },
            { id: "ecosystems", name: "Ecosystems and Material Cycles" }
          ]
        },
        {
          id: "chemistry-paper-1",
          name: "Chemistry Paper 1",
          topics: [
            { id: "atomic-structure", name: "Atomic Structure and the Periodic Table" },
            { id: "bonding-structure", name: "Bonding, Structure and Properties of Matter" },
            { id: "chemical-changes", name: "Chemical Changes" },
            { id: "extracting-metals", name: "Extracting Metals and Equilibria" }
          ]
        },
        {
          id: "chemistry-paper-2",
          name: "Chemistry Paper 2",
          topics: [
            { id: "separate-chemistry", name: "Separate Chemistry 1" },
            { id: "groups-periodic", name: "Groups in the Periodic Table" },
            { id: "rates-energy", name: "Rates of Reaction and Energy Changes" },
            { id: "fuels-earth", name: "Fuels and Earth Science" },
            { id: "separate-chemistry-2", name: "Separate Chemistry 2" }
          ]
        },
        {
          id: "physics-paper-1",
          name: "Physics Paper 1",
          topics: [
            { id: "motion-forces", name: "Motion and Forces" },
            { id: "conservation-energy", name: "Conservation of Energy" },
            { id: "waves", name: "Waves" },
            { id: "light-electromagnetic", name: "Light and the Electromagnetic Spectrum" },
            { id: "radioactivity", name: "Radioactivity" },
            { id: "astronomy", name: "Astronomy" }
          ]
        },
        {
          id: "physics-paper-2",
          name: "Physics Paper 2",
          topics: [
            { id: "energy-forces", name: "Energy - Forces Doing Work" },
            { id: "forces-their-effects", name: "Forces and their Effects" },
            { id: "electricity-circuits", name: "Electricity and Circuits" },
            { id: "magnetism-motors", name: "Magnetism and the Motor Effect" },
            { id: "electromagnetic-induction", name: "Electromagnetic Induction" },
            { id: "particle-model", name: "Particle Model" }
          ]
        }
      ]
    },
    {
      id: "combined-science-foundation",
      name: "Combined Science",
      icon: "Microscope",
      tier: "Foundation",
      papers: [
        {
          id: "biology-paper-1",
          name: "Biology Paper 1",
          topics: [
            { id: "key-concepts", name: "Key Concepts in Biology" },
            { id: "cells-control", name: "Cells and Control" },
            { id: "genetics", name: "Genetics" },
            { id: "natural-selection", name: "Natural Selection and Genetic Modification" }
          ]
        },
        {
          id: "biology-paper-2",
          name: "Biology Paper 2",
          topics: [
            { id: "health-disease", name: "Health, Disease and the Development of Medicines" },
            { id: "plant-structures", name: "Plant Structures and their Functions" },
            { id: "animal-coordination", name: "Animal Coordination, Control and Homeostasis" },
            { id: "exchange-transport", name: "Exchange and Transport in Animals" },
            { id: "ecosystems", name: "Ecosystems and Material Cycles" }
          ]
        },
        {
          id: "chemistry-paper-1",
          name: "Chemistry Paper 1",
          topics: [
            { id: "atomic-structure", name: "Atomic Structure and the Periodic Table" },
            { id: "bonding-structure", name: "Bonding, Structure and Properties of Matter" },
            { id: "chemical-changes", name: "Chemical Changes" },
            { id: "extracting-metals", name: "Extracting Metals and Equilibria" }
          ]
        },
        {
          id: "chemistry-paper-2",
          name: "Chemistry Paper 2",
          topics: [
            { id: "separate-chemistry", name: "Separate Chemistry 1" },
            { id: "groups-periodic", name: "Groups in the Periodic Table" },
            { id: "rates-energy", name: "Rates of Reaction and Energy Changes" },
            { id: "fuels-earth", name: "Fuels and Earth Science" },
            { id: "separate-chemistry-2", name: "Separate Chemistry 2" }
          ]
        },
        {
          id: "physics-paper-1",
          name: "Physics Paper 1",
          topics: [
            { id: "motion-forces", name: "Motion and Forces" },
            { id: "conservation-energy", name: "Conservation of Energy" },
            { id: "waves", name: "Waves" },
            { id: "light-electromagnetic", name: "Light and the Electromagnetic Spectrum" },
            { id: "radioactivity", name: "Radioactivity" },
            { id: "astronomy", name: "Astronomy" }
          ]
        },
        {
          id: "physics-paper-2",
          name: "Physics Paper 2",
          topics: [
            { id: "energy-forces", name: "Energy - Forces Doing Work" },
            { id: "forces-their-effects", name: "Forces and their Effects" },
            { id: "electricity-circuits", name: "Electricity and Circuits" },
            { id: "magnetism-motors", name: "Magnetism and the Motor Effect" },
            { id: "electromagnetic-induction", name: "Electromagnetic Induction" },
            { id: "particle-model", name: "Particle Model" }
          ]
        }
      ]
    },
    {
      id: "business",
      name: "Business",
      icon: "Briefcase",
      papers: [
        {
          id: "paper-1",
          name: "Paper 1: Investigating Small Business",
          topics: [
            { id: "enterprise-entrepreneurship", name: "Enterprise and Entrepreneurship" },
            { id: "spotting-business-opportunity", name: "Spotting a Business Opportunity" },
            { id: "putting-business-idea-practice", name: "Putting a Business Idea into Practice" },
            { id: "making-business-effective", name: "Making the Business Effective" },
            { id: "understanding-external-influences", name: "Understanding External Influences on Business" }
          ]
        },
        {
          id: "paper-2",
          name: "Paper 2: Building a Business",
          topics: [
            { id: "growing-business", name: "Growing the Business" },
            { id: "making-marketing-decisions", name: "Making Marketing Decisions" },
            { id: "making-operational-decisions", name: "Making Operational Decisions" },
            { id: "making-financial-decisions", name: "Making Financial Decisions" },
            { id: "making-human-resource-decisions", name: "Making Human Resource Decisions" }
          ]
        }
      ]
    }
  ]
};
