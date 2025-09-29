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
            { id: "shakespeare", name: "Shakespeare", topicId: 101 },
            { id: "post-1914-literature", name: "Post-1914 Literature", topicId: 102 }
          ]
        },
        {
          id: "paper-2",
          name: "Paper 2: 19th-century Novel and Poetry since 1789",
          topics: [
            { id: "19th-century-novel", name: "19th-century Novel", topicId: 103 },
            { id: "poetry-since-1789", name: "Poetry since 1789", topicId: 104 }
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
            { id: "key-concepts", name: "Key Concepts in Biology", topicId: 105 },
            { id: "cells-control", name: "Cells and Control", topicId: 106 },
            { id: "genetics", name: "Genetics", topicId: 107 },
            { id: "natural-selection", name: "Natural Selection and Genetic Modification", topicId: 108 }
          ]
        },
        {
          id: "paper-2",
          name: "Paper 2",
          topics: [
            { id: "health-disease", name: "Health, Disease and the Development of Medicines", topicId: 109 },
            { id: "plant-structures", name: "Plant Structures and their Functions", topicId: 110 },
            { id: "animal-coordination", name: "Animal Coordination, Control and Homeostasis", topicId: 111 },
            { id: "exchange-transport", name: "Exchange and Transport in Animals", topicId: 112 },
            { id: "ecosystems", name: "Ecosystems and Material Cycles", topicId: 113 }
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
            { id: "atomic-structure", name: "Atomic Structure and the Periodic Table", topicId: 114 },
            { id: "bonding-structure", name: "Bonding, Structure and Properties of Matter", topicId: 115 },
            { id: "chemical-changes", name: "Chemical Changes", topicId: 116 },
            { id: "extracting-metals", name: "Extracting Metals and Equilibria", topicId: 117 }
          ]
        },
        {
          id: "paper-2",
          name: "Paper 2",
          topics: [
            { id: "separate-chemistry", name: "Separate Chemistry 1", topicId: 118 },
            { id: "groups-periodic", name: "Groups in the Periodic Table", topicId: 119 },
            { id: "rates-energy", name: "Rates of Reaction and Energy Changes", topicId: 120 },
            { id: "fuels-earth", name: "Fuels and Earth Science", topicId: 121 },
            { id: "separate-chemistry-2", name: "Separate Chemistry 2", topicId: 122 }
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
            { id: "motion-forces", name: "Motion and Forces", topicId: 123 },
            { id: "conservation-energy", name: "Conservation of Energy", topicId: 124 },
            { id: "waves", name: "Waves", topicId: 125 },
            { id: "light-electromagnetic", name: "Light and the Electromagnetic Spectrum", topicId: 126 },
            { id: "radioactivity", name: "Radioactivity", topicId: 127 },
            { id: "astronomy", name: "Astronomy", topicId: 128 }
          ]
        },
        {
          id: "paper-2",
          name: "Paper 2",
          topics: [
            { id: "energy-forces", name: "Energy - Forces Doing Work", topicId: 129 },
            { id: "forces-their-effects", name: "Forces and their Effects", topicId: 130 },
            { id: "electricity-circuits", name: "Electricity and Circuits", topicId: 131 },
            { id: "magnetism-motors", name: "Magnetism and the Motor Effect", topicId: 132 },
            { id: "electromagnetic-induction", name: "Electromagnetic Induction", topicId: 133 },
            { id: "particle-model", name: "Particle Model", topicId: 134 }
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
            { id: "key-concepts", name: "Key Concepts in Biology", topicId: 105 },
            { id: "cells-control", name: "Cells and Control", topicId: 106 },
            { id: "genetics", name: "Genetics", topicId: 107 },
            { id: "natural-selection", name: "Natural Selection and Genetic Modification", topicId: 108 }
          ]
        },
        {
          id: "biology-paper-2",
          name: "Biology Paper 2",
          topics: [
            { id: "health-disease", name: "Health, Disease and the Development of Medicines", topicId: 109 },
            { id: "plant-structures", name: "Plant Structures and their Functions", topicId: 110 },
            { id: "animal-coordination", name: "Animal Coordination, Control and Homeostasis", topicId: 111 },
            { id: "exchange-transport", name: "Exchange and Transport in Animals", topicId: 112 },
            { id: "ecosystems", name: "Ecosystems and Material Cycles", topicId: 113 }
          ]
        },
        {
          id: "chemistry-paper-1",
          name: "Chemistry Paper 1",
          topics: [
            { id: "atomic-structure", name: "Atomic Structure and the Periodic Table", topicId: 114 },
            { id: "bonding-structure", name: "Bonding, Structure and Properties of Matter", topicId: 115 },
            { id: "chemical-changes", name: "Chemical Changes", topicId: 116 },
            { id: "extracting-metals", name: "Extracting Metals and Equilibria", topicId: 117 }
          ]
        },
        {
          id: "chemistry-paper-2",
          name: "Chemistry Paper 2",
          topics: [
            { id: "separate-chemistry", name: "Separate Chemistry 1", topicId: 118 },
            { id: "groups-periodic", name: "Groups in the Periodic Table", topicId: 119 },
            { id: "rates-energy", name: "Rates of Reaction and Energy Changes", topicId: 120 },
            { id: "fuels-earth", name: "Fuels and Earth Science", topicId: 121 },
            { id: "separate-chemistry-2", name: "Separate Chemistry 2", topicId: 122 }
          ]
        },
        {
          id: "physics-paper-1",
          name: "Physics Paper 1",
          topics: [
            { id: "motion-forces", name: "Motion and Forces", topicId: 123 },
            { id: "conservation-energy", name: "Conservation of Energy", topicId: 124 },
            { id: "waves", name: "Waves", topicId: 125 },
            { id: "light-electromagnetic", name: "Light and the Electromagnetic Spectrum", topicId: 126 },
            { id: "radioactivity", name: "Radioactivity", topicId: 127 },
            { id: "astronomy", name: "Astronomy", topicId: 128 }
          ]
        },
        {
          id: "physics-paper-2",
          name: "Physics Paper 2",
          topics: [
            { id: "energy-forces", name: "Energy - Forces Doing Work", topicId: 129 },
            { id: "forces-their-effects", name: "Forces and their Effects", topicId: 130 },
            { id: "electricity-circuits", name: "Electricity and Circuits", topicId: 131 },
            { id: "magnetism-motors", name: "Magnetism and the Motor Effect", topicId: 132 },
            { id: "electromagnetic-induction", name: "Electromagnetic Induction", topicId: 133 },
            { id: "particle-model", name: "Particle Model", topicId: 134 }
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
            { id: "key-concepts", name: "Key Concepts in Biology", topicId: 105 },
            { id: "cells-control", name: "Cells and Control", topicId: 106 },
            { id: "genetics", name: "Genetics", topicId: 107 },
            { id: "natural-selection", name: "Natural Selection and Genetic Modification", topicId: 108 }
          ]
        },
        {
          id: "biology-paper-2",
          name: "Biology Paper 2",
          topics: [
            { id: "health-disease", name: "Health, Disease and the Development of Medicines", topicId: 109 },
            { id: "plant-structures", name: "Plant Structures and their Functions", topicId: 110 },
            { id: "animal-coordination", name: "Animal Coordination, Control and Homeostasis", topicId: 111 },
            { id: "exchange-transport", name: "Exchange and Transport in Animals", topicId: 112 },
            { id: "ecosystems", name: "Ecosystems and Material Cycles", topicId: 113 }
          ]
        },
        {
          id: "chemistry-paper-1",
          name: "Chemistry Paper 1",
          topics: [
            { id: "atomic-structure", name: "Atomic Structure and the Periodic Table", topicId: 114 },
            { id: "bonding-structure", name: "Bonding, Structure and Properties of Matter", topicId: 115 },
            { id: "chemical-changes", name: "Chemical Changes", topicId: 116 },
            { id: "extracting-metals", name: "Extracting Metals and Equilibria", topicId: 117 }
          ]
        },
        {
          id: "chemistry-paper-2",
          name: "Chemistry Paper 2",
          topics: [
            { id: "separate-chemistry", name: "Separate Chemistry 1", topicId: 118 },
            { id: "groups-periodic", name: "Groups in the Periodic Table", topicId: 119 },
            { id: "rates-energy", name: "Rates of Reaction and Energy Changes", topicId: 120 },
            { id: "fuels-earth", name: "Fuels and Earth Science", topicId: 121 },
            { id: "separate-chemistry-2", name: "Separate Chemistry 2", topicId: 122 }
          ]
        },
        {
          id: "physics-paper-1",
          name: "Physics Paper 1",
          topics: [
            { id: "motion-forces", name: "Motion and Forces", topicId: 123 },
            { id: "conservation-energy", name: "Conservation of Energy", topicId: 124 },
            { id: "waves", name: "Waves", topicId: 125 },
            { id: "light-electromagnetic", name: "Light and the Electromagnetic Spectrum", topicId: 126 },
            { id: "radioactivity", name: "Radioactivity", topicId: 127 },
            { id: "astronomy", name: "Astronomy", topicId: 128 }
          ]
        },
        {
          id: "physics-paper-2",
          name: "Physics Paper 2",
          topics: [
            { id: "energy-forces", name: "Energy - Forces Doing Work", topicId: 129 },
            { id: "forces-their-effects", name: "Forces and their Effects", topicId: 130 },
            { id: "electricity-circuits", name: "Electricity and Circuits", topicId: 131 },
            { id: "magnetism-motors", name: "Magnetism and the Motor Effect", topicId: 132 },
            { id: "electromagnetic-induction", name: "Electromagnetic Induction", topicId: 133 },
            { id: "particle-model", name: "Particle Model", topicId: 134 }
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
            { id: "enterprise-entrepreneurship", name: "Enterprise and Entrepreneurship", topicId: 201 },
            { id: "spotting-business-opportunity", name: "Spotting a Business Opportunity", topicId: 202 },
            { id: "putting-business-idea-practice", name: "Putting a Business Idea into Practice", topicId: 203 },
            { id: "making-business-effective", name: "Making the Business Effective", topicId: 204 },
            { id: "understanding-external-influences", name: "Understanding External Influences on Business", topicId: 205 }
          ]
        },
        {
          id: "paper-2",
          name: "Paper 2: Building a Business",
          topics: [
            { id: "growing-business", name: "Growing the Business", topicId: 206 },
            { id: "making-marketing-decisions", name: "Making Marketing Decisions", topicId: 207 },
            { id: "making-operational-decisions", name: "Making Operational Decisions", topicId: 208 },
            { id: "making-financial-decisions", name: "Making Financial Decisions", topicId: 209 },
            { id: "making-human-resource-decisions", name: "Making Human Resource Decisions", topicId: 210 }
          ]
        }
      ]
    }
  ]
};
