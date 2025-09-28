import { ExamBoard } from './types';

export const aqa: ExamBoard = {
  id: "aqa",
  name: "AQA",
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
          name: "Paper 1: Explorations in Creative Reading and Writing",
          topics: [
            { id: "reading-fiction", name: "Reading: Understanding and responding to fiction texts", topicId: 7 },
            { id: "writing-fiction", name: "Writing: Creative writing", topicId: 8 }
          ]
        },
        {
          id: "paper-2",
          name: "Paper 2: Writers' Viewpoints and Perspectives",
          topics: [
            { id: "reading-non-fiction", name: "Reading: Understanding and responding to non-fiction texts", topicId: 9 },
            { id: "writing-non-fiction", name: "Writing: Non-fiction writing", topicId: 10 }
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
          name: "Paper 1: Shakespeare and the 19th-century novel",
          topics: [
            { id: "shakespeare", name: "Shakespeare", topicId: 11 },
            { id: "19th-century-novel", name: "19th-century novel", topicId: 12 }
          ]
        },
        {
          id: "paper-2",
          name: "Paper 2: Modern texts and poetry",
          topics: [
            { id: "modern-prose", name: "Modern prose or drama", topicId: 13 },
            { id: "poetry", name: "Poetry", topicId: 14 },
            { id: "unseen-poetry", name: "Unseen poetry", topicId: 15 }
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
            { id: "cell-biology", name: "Cell Biology", topicId: 16 },
            { id: "organisation", name: "Organisation", topicId: 17 },
            { id: "infection-and-response", name: "Infection and Response", topicId: 18 },
            { id: "bioenergetics", name: "Bioenergetics", topicId: 19 }
          ]
        },
        {
          id: "paper-2",
          name: "Paper 2",
          topics: [
            { id: "homeostasis-and-response", name: "Homeostasis and Response", topicId: 20 },
            { id: "inheritance-variation-evolution", name: "Inheritance, Variation and Evolution", topicId: 21 },
            { id: "ecology", name: "Ecology", topicId: 22 }
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
            { id: "atomic-structure", name: "Atomic Structure and the Periodic Table", topicId: 23 },
            { id: "bonding-structure", name: "Bonding, Structure and Properties of Matter", topicId: 24 },
            { id: "quantitative-chemistry", name: "Quantitative Chemistry", topicId: 25 },
            { id: "chemical-changes", name: "Chemical Changes", topicId: 26 },
            { id: "energy-changes", name: "Energy Changes", topicId: 27 }
          ]
        },
        {
          id: "paper-2",
          name: "Paper 2",
          topics: [
            { id: "rate-extent", name: "The Rate and Extent of Chemical Change", topicId: 28 },
            { id: "organic-chemistry", name: "Organic Chemistry", topicId: 29 },
            { id: "chemical-analysis", name: "Chemical Analysis", topicId: 30 },
            { id: "chemistry-atmosphere", name: "Chemistry of the Atmosphere", topicId: 31 },
            { id: "using-resources", name: "Using Resources", topicId: 32 }
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
            { id: "energy", name: "Energy", topicId: 33 },
            { id: "electricity", name: "Electricity", topicId: 34 },
            { id: "particle-model", name: "Particle Model of Matter", topicId: 35 },
            { id: "atomic-structure-physics", name: "Atomic Structure", topicId: 36 }
          ]
        },
        {
          id: "paper-2",
          name: "Paper 2",
          topics: [
            { id: "forces", name: "Forces", topicId: 37 },
            { id: "waves", name: "Waves", topicId: 38 },
            { id: "magnetism-electromagnetism", name: "Magnetism and Electromagnetism", topicId: 39 },
            { id: "space-physics", name: "Space Physics", topicId: 40 }
          ]
        }
      ]
    },
    {
      id: "combined-science-higher",
      name: "Combined Science (Trilogy)",
      icon: "Microscope",
      tier: "Higher",
      papers: [
        {
          id: "biology-paper-1",
          name: "Biology Paper 1",
          topics: [
            { id: "cell-biology", name: "Cell Biology", topicId: 16 },
            { id: "organisation", name: "Organisation", topicId: 17 },
            { id: "infection-and-response", name: "Infection and Response", topicId: 18 },
            { id: "bioenergetics", name: "Bioenergetics", topicId: 19 }
          ]
        },
        {
          id: "biology-paper-2",
          name: "Biology Paper 2",
          topics: [
            { id: "homeostasis-and-response", name: "Homeostasis and Response", topicId: 20 },
            { id: "inheritance-variation-evolution", name: "Inheritance, Variation and Evolution", topicId: 21 },
            { id: "ecology", name: "Ecology", topicId: 22 }
          ]
        },
        {
          id: "chemistry-paper-1",
          name: "Chemistry Paper 1",
          topics: [
            { id: "atomic-structure", name: "Atomic Structure and the Periodic Table", topicId: 23 },
            { id: "bonding-structure", name: "Bonding, Structure and Properties of Matter", topicId: 24 },
            { id: "quantitative-chemistry", name: "Quantitative Chemistry", topicId: 25 },
            { id: "chemical-changes", name: "Chemical Changes", topicId: 26 },
            { id: "energy-changes", name: "Energy Changes", topicId: 27 }
          ]
        },
        {
          id: "chemistry-paper-2",
          name: "Chemistry Paper 2",
          topics: [
            { id: "rate-extent", name: "The Rate and Extent of Chemical Change", topicId: 28 },
            { id: "organic-chemistry", name: "Organic Chemistry", topicId: 29 },
            { id: "chemical-analysis", name: "Chemical Analysis", topicId: 30 },
            { id: "chemistry-atmosphere", name: "Chemistry of the Atmosphere", topicId: 31 },
            { id: "using-resources", name: "Using Resources", topicId: 32 }
          ]
        },
        {
          id: "physics-paper-1",
          name: "Physics Paper 1",
          topics: [
            { id: "energy", name: "Energy", topicId: 33 },
            { id: "electricity", name: "Electricity", topicId: 34 },
            { id: "particle-model", name: "Particle Model of Matter", topicId: 35 },
            { id: "atomic-structure-physics", name: "Atomic Structure", topicId: 36 }
          ]
        },
        {
          id: "physics-paper-2",
          name: "Physics Paper 2",
          topics: [
            { id: "forces", name: "Forces", topicId: 37 },
            { id: "waves", name: "Waves", topicId: 38 },
            { id: "magnetism-electromagnetism", name: "Magnetism and Electromagnetism", topicId: 39 },
            { id: "space-physics", name: "Space Physics", topicId: 40 }
          ]
        }
      ]
    },
    {
      id: "combined-science-foundation",
      name: "Combined Science (Trilogy)",
      icon: "Microscope",
      tier: "Foundation",
      papers: [
        {
          id: "biology-paper-1",
          name: "Biology Paper 1",
          topics: [
            { id: "cell-biology", name: "Cell Biology", topicId: 16 },
            { id: "organisation", name: "Organisation", topicId: 17 },
            { id: "infection-and-response", name: "Infection and Response", topicId: 18 },
            { id: "bioenergetics", name: "Bioenergetics", topicId: 19 }
          ]
        },
        {
          id: "biology-paper-2",
          name: "Biology Paper 2",
          topics: [
            { id: "homeostasis-and-response", name: "Homeostasis and Response", topicId: 20 },
            { id: "inheritance-variation-evolution", name: "Inheritance, Variation and Evolution", topicId: 21 },
            { id: "ecology", name: "Ecology", topicId: 22 }
          ]
        },
        {
          id: "chemistry-paper-1",
          name: "Chemistry Paper 1",
          topics: [
            { id: "atomic-structure", name: "Atomic Structure and the Periodic Table", topicId: 23 },
            { id: "bonding-structure", name: "Bonding, Structure and Properties of Matter", topicId: 24 },
            { id: "quantitative-chemistry", name: "Quantitative Chemistry", topicId: 25 },
            { id: "chemical-changes", name: "Chemical Changes", topicId: 26 },
            { id: "energy-changes", name: "Energy Changes", topicId: 27 }
          ]
        },
        {
          id: "chemistry-paper-2",
          name: "Chemistry Paper 2",
          topics: [
            { id: "rate-extent", name: "The Rate and Extent of Chemical Change", topicId: 28 },
            { id: "organic-chemistry", name: "Organic Chemistry", topicId: 29 },
            { id: "chemical-analysis", name: "Chemical Analysis", topicId: 30 },
            { id: "chemistry-atmosphere", name: "Chemistry of the Atmosphere", topicId: 31 },
            { id: "using-resources", name: "Using Resources", topicId: 32 }
          ]
        },
        {
          id: "physics-paper-1",
          name: "Physics Paper 1",
          topics: [
            { id: "energy", name: "Energy", topicId: 33 },
            { id: "electricity", name: "Electricity", topicId: 34 },
            { id: "particle-model", name: "Particle Model of Matter", topicId: 35 },
            { id: "atomic-structure-physics", name: "Atomic Structure", topicId: 36 }
          ]
        },
        {
          id: "physics-paper-2",
          name: "Physics Paper 2",
          topics: [
            { id: "forces", name: "Forces", topicId: 37 },
            { id: "waves", name: "Waves", topicId: 38 },
            { id: "magnetism-electromagnetism", name: "Magnetism and Electromagnetism", topicId: 39 },
            { id: "space-physics", name: "Space Physics", topicId: 40 }
          ]
        }
      ]
    }
  ]
};
