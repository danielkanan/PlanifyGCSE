// Subject data for different exam boards
// This file contains placeholder data that can be easily edited

export interface Topic {
  id: string;
  name: string;
  subtopics?: string[];
}

export interface Subject {
  id: string;
  name: string;
  icon: string; // Lucide icon name
  topics: Topic[];
}

export interface ExamBoard {
  id: string;
  name: string;
  subjects: Subject[];
}

export const examBoards: ExamBoard[] = [
  {
    id: "aqa",
    name: "AQA",
    subjects: [
      {
        id: "biology",
        name: "Biology",
        icon: "Dna",
        topics: [
          {
            id: "working-scientifically",
            name: "Working Scientifically",
            subtopics: [
              "The Scientific Method",
              "Communication & Issues Created by Science",
              "Risk",
              "Designing Investigations",
              "Collecting Data",
              "Processing and Presenting Data",
              "Units and Equations",
              "Drawing Conclusions",
              "Uncertainties and Evaluations"
            ]
          },
          {
            id: "cell-biology",
            name: "Cell Biology",
            subtopics: [
              "Cell Structure",
              "Cell Division",
              "Transport in Cells",
              "Cell Organisation"
            ]
          },
          {
            id: "organisation",
            name: "Organisation",
            subtopics: [
              "Principles of Organisation",
              "Animal Tissues, Organs and Organ Systems",
              "Plant Tissues, Organs and Systems"
            ]
          },
          {
            id: "infection-and-response",
            name: "Infection and Response",
            subtopics: [
              "Communicable Diseases",
              "Monoclonal Antibodies",
              "Plant Diseases"
            ]
          },
          {
            id: "bioenergetics",
            name: "Bioenergetics",
            subtopics: [
              "Photosynthesis",
              "Respiration"
            ]
          },
          {
            id: "homeostasis-and-response",
            name: "Homeostasis and Response",
            subtopics: [
              "Homeostasis",
              "The Human Nervous System",
              "Hormonal Coordination in Humans",
              "Plant Hormones"
            ]
          },
          {
            id: "inheritance-variation-evolution",
            name: "Inheritance, Variation and Evolution",
            subtopics: [
              "Reproduction",
              "Variation and Evolution",
              "The Development of Understanding of Genetics and Evolution",
              "Classification of Living Organisms"
            ]
          },
          {
            id: "ecology",
            name: "Ecology",
            subtopics: [
              "Adaptations, Interdependence and Competition",
              "Organisation of an Ecosystem",
              "Biodiversity and the Effect of Human Interaction on Ecosystems",
              "Trophic Levels in an Ecosystem",
              "Food Production"
            ]
          },
          {
            id: "practical-skills",
            name: "Practical Skills",
            subtopics: [
              "Required Practical Activities",
              "Mathematical Skills"
            ]
          }
        ]
      },
      {
        id: "chemistry",
        name: "Chemistry",
        icon: "FlaskConical",
        topics: [
          {
            id: "atomic-structure",
            name: "Atomic Structure and the Periodic Table",
            subtopics: [
              "A Simple Model of the Atom",
              "The Periodic Table",
              "Properties of Transition Metals"
            ]
          },
          {
            id: "bonding-structure",
            name: "Bonding, Structure and Properties of Matter",
            subtopics: [
              "Chemical Bonds",
              "How Bonding and Structure are Related to the Properties of Substances",
              "Structure and Bonding of Carbon",
              "Bulk and Surface Properties of Matter"
            ]
          },
          {
            id: "quantitative-chemistry",
            name: "Quantitative Chemistry",
            subtopics: [
              "Chemical Measurements",
              "Use of Amount of Substance in Relation to Masses of Pure Substances",
              "Yield and Atom Economy of Chemical Reactions",
              "Using Concentrations of Solutions in mol/dm³",
              "Use of Amount of Substance in Relation to Volumes of Gases"
            ]
          },
          {
            id: "chemical-changes",
            name: "Chemical Changes",
            subtopics: [
              "Reactivity of Metals",
              "Reactions of Acids",
              "Electrolysis"
            ]
          },
          {
            id: "energy-changes",
            name: "Energy Changes",
            subtopics: [
              "Exothermic and Endothermic Reactions",
              "Chemical Cells and Fuel Cells"
            ]
          },
          {
            id: "rate-extent",
            name: "The Rate and Extent of Chemical Change",
            subtopics: [
              "Rate of Reaction",
              "Reversible Reactions and Dynamic Equilibrium"
            ]
          },
          {
            id: "organic-chemistry",
            name: "Organic Chemistry",
            subtopics: [
              "Carbon Compounds as Fuels and Feedstock",
              "Reactions of Alkenes and Alcohols",
              "Synthetic and Naturally Occurring Polymers"
            ]
          },
          {
            id: "chemical-analysis",
            name: "Chemical Analysis",
            subtopics: [
              "Purity, Formulations and Chromatography",
              "Identification of Common Gases",
              "Identification of Ions by Chemical and Spectroscopic Means"
            ]
          },
          {
            id: "chemistry-atmosphere",
            name: "Chemistry of the Atmosphere",
            subtopics: [
              "Composition and Evolution of the Earth's Atmosphere",
              "Carbon Dioxide and Methane as Greenhouse Gases",
              "Common Atmospheric Pollutants and their Sources"
            ]
          },
          {
            id: "using-resources",
            name: "Using Resources",
            subtopics: [
              "Using the Earth's Resources and Obtaining Potable Water",
              "Life Cycle Assessment and Recycling",
              "Using Materials",
              "The Haber Process and the Use of NPK Fertilisers"
            ]
          }
        ]
      },
      {
        id: "physics",
        name: "Physics",
        icon: "Atom",
        topics: [
          {
            id: "energy",
            name: "Energy",
            subtopics: [
              "Changes in Energy Stores",
              "Energy and Work",
              "Energy and Heating",
              "Energy Demands"
            ]
          },
          {
            id: "electricity",
            name: "Electricity",
            subtopics: [
              "Current, Potential Difference and Resistance",
              "Series and Parallel Circuits",
              "Domestic Uses and Safety",
              "Energy Transfers",
              "Static Electricity"
            ]
          },
          {
            id: "particle-model",
            name: "Particle Model of Matter",
            subtopics: [
              "Changes of State and the Particle Model",
              "Internal Energy and Energy Transfers",
              "Particle Model and Pressure"
            ]
          },
          {
            id: "atomic-structure-physics",
            name: "Atomic Structure",
            subtopics: [
              "Atoms and Isotopes",
              "Atoms and Nuclear Radiation",
              "Hazards and Uses of Radioactive Emissions and of Background Radiation",
              "Nuclear Fission and Fusion"
            ]
          },
          {
            id: "forces",
            name: "Forces",
            subtopics: [
              "Forces and their Interactions",
              "Work Done and Energy Transfer",
              "Forces and Elasticity",
              "Moments, Levers and Gears",
              "Pressure and Pressure Differences in Fluids",
              "Forces and Motion"
            ]
          },
          {
            id: "waves",
            name: "Waves",
            subtopics: [
              "Waves in Air, Fluids and Solids",
              "Electromagnetic Waves",
              "Black Body Radiation"
            ]
          },
          {
            id: "magnetism-electromagnetism",
            name: "Magnetism and Electromagnetism",
            subtopics: [
              "Permanent and Induced Magnetism, Magnetic Forces and Fields",
              "The Motor Effect",
              "Induced Potential, Transformers and the National Grid"
            ]
          },
          {
            id: "space-physics",
            name: "Space Physics",
            subtopics: [
              "Solar System; Stability of Orbital Motions; Satellites",
              "Red-shift"
            ]
          }
        ]
      },
      {
        id: "combined-science",
        name: "Combined Science",
        icon: "Microscope",
        topics: [
          {
            id: "biology-combined",
            name: "Biology (Combined)",
            subtopics: [
              "Cell Biology",
              "Organisation",
              "Infection and Response",
              "Bioenergetics",
              "Homeostasis and Response",
              "Inheritance, Variation and Evolution",
              "Ecology"
            ]
          },
          {
            id: "chemistry-combined",
            name: "Chemistry (Combined)",
            subtopics: [
              "Atomic Structure and the Periodic Table",
              "Bonding, Structure and Properties of Matter",
              "Quantitative Chemistry",
              "Chemical Changes",
              "Energy Changes",
              "The Rate and Extent of Chemical Change",
              "Organic Chemistry",
              "Chemical Analysis",
              "Chemistry of the Atmosphere",
              "Using Resources"
            ]
          },
          {
            id: "physics-combined",
            name: "Physics (Combined)",
            subtopics: [
              "Energy",
              "Electricity",
              "Particle Model of Matter",
              "Atomic Structure",
              "Forces",
              "Waves",
              "Magnetism and Electromagnetism"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "edexcel",
    name: "Edexcel",
    subjects: [
      {
        id: "biology",
        name: "Biology",
        icon: "Dna",
        topics: [
          {
            id: "key-concepts",
            name: "Key Concepts in Biology",
            subtopics: [
              "Cell Structure",
              "Enzymes",
              "Movement of Substances into and out of Cells"
            ]
          },
          {
            id: "cells-control",
            name: "Cells and Control",
            subtopics: [
              "Cell Division",
              "Growth in Organisms",
              "The Brain",
              "The Eye",
              "Nervous Coordination"
            ]
          },
          {
            id: "genetics",
            name: "Genetics",
            subtopics: [
              "Reproduction",
              "Genetics",
              "Natural Selection and Genetic Modification"
            ]
          },
          {
            id: "natural-selection",
            name: "Natural Selection and Genetic Modification",
            subtopics: [
              "Natural Selection",
              "Genetic Modification"
            ]
          },
          {
            id: "health-disease",
            name: "Health, Disease and the Development of Medicines",
            subtopics: [
              "Health and Disease",
              "Pathogens and Disease",
              "Plant Defences",
              "Human Defence Systems",
              "Preventing and Treating Disease"
            ]
          },
          {
            id: "plant-structures",
            name: "Plant Structures and their Functions",
            subtopics: [
              "Photosynthesis",
              "Leaves, Stems and Roots",
              "Plant Hormones"
            ]
          },
          {
            id: "animal-coordination",
            name: "Animal Coordination, Control and Homeostasis",
            subtopics: [
              "Hormonal Coordination",
              "Human Nervous System",
              "Homeostasis"
            ]
          },
          {
            id: "exchange-transport",
            name: "Exchange and Transport in Animals",
            subtopics: [
              "The Circulatory System",
              "The Heart and Blood Vessels",
              "Blood",
              "The Respiratory System"
            ]
          },
          {
            id: "ecosystems",
            name: "Ecosystems and Material Cycles",
            subtopics: [
              "Ecosystems",
              "Biodiversity",
              "Cycles within Ecosystems",
              "Human Effects on Ecosystems"
            ]
          }
        ]
      },
      {
        id: "chemistry",
        name: "Chemistry",
        icon: "FlaskConical",
        topics: [
          {
            id: "atomic-structure",
            name: "Atomic Structure and the Periodic Table",
            subtopics: [
              "Atomic Structure",
              "The Periodic Table",
              "Ionic Bonding",
              "Covalent Bonding",
              "Types of Substance",
              "Calculations Involving Masses"
            ]
          },
          {
            id: "bonding-structure",
            name: "Bonding, Structure and Properties of Matter",
            subtopics: [
              "States of Matter",
              "Methods of Separating and Purifying Substances",
              "Atomic Structure",
              "The Periodic Table",
              "Ionic Bonding",
              "Covalent Bonding",
              "Types of Substance",
              "Calculations Involving Masses"
            ]
          },
          {
            id: "chemical-changes",
            name: "Chemical Changes",
            subtopics: [
              "Acids and Alkalis",
              "Salts",
              "Electrolysis"
            ]
          },
          {
            id: "extracting-metals",
            name: "Extracting Metals and Equilibria",
            subtopics: [
              "Obtaining and Using Metals",
              "Reversible Reactions and Equilibria"
            ]
          },
          {
            id: "separate-chemistry",
            name: "Separate Chemistry 1",
            subtopics: [
              "Transition Metals, Alloys and Corrosion",
              "Quantitative Analysis",
              "Dynamic Equilibria",
              "Chemical Cells and Fuel Cells"
            ]
          },
          {
            id: "groups-periodic",
            name: "Groups in the Periodic Table",
            subtopics: [
              "Group 1",
              "Group 7",
              "Group 0"
            ]
          },
          {
            id: "rates-energy",
            name: "Rates of Reaction and Energy Changes",
            subtopics: [
              "Rates of Reaction",
              "Heat Energy Changes in Chemical Reactions"
            ]
          },
          {
            id: "fuels-earth",
            name: "Fuels and Earth Science",
            subtopics: [
              "Fuels",
              "Earth and Atmospheric Science"
            ]
          },
          {
            id: "separate-chemistry-2",
            name: "Separate Chemistry 2",
            subtopics: [
              "Qualitative Analysis: Tests for Ions",
              "Hydrocarbons",
              "Polymers",
              "Alcohols and Carboxylic Acids",
              "Bulk and Surface Properties of Matter Including Nanoparticles"
            ]
          }
        ]
      },
      {
        id: "physics",
        name: "Physics",
        icon: "Atom",
        topics: [
          {
            id: "motion-forces",
            name: "Motion and Forces",
            subtopics: [
              "Movement and Position",
              "Forces, Movement, Shape and Momentum"
            ]
          },
          {
            id: "conservation-energy",
            name: "Conservation of Energy",
            subtopics: [
              "Energy Stores and Transfers",
              "Energy and Efficiency",
              "National and Global Energy Resources"
            ]
          },
          {
            id: "waves",
            name: "Waves",
            subtopics: [
              "Properties of Waves",
              "The Electromagnetic Spectrum",
              "Light and the Electromagnetic Spectrum"
            ]
          },
          {
            id: "light-electromagnetic",
            name: "Light and the Electromagnetic Spectrum",
            subtopics: [
              "Light and the Electromagnetic Spectrum",
              "Radiation and Risk"
            ]
          },
          {
            id: "radioactivity",
            name: "Radioactivity",
            subtopics: [
              "Radioactivity",
              "Uses and Dangers of Radiation"
            ]
          },
          {
            id: "astronomy",
            name: "Astronomy",
            subtopics: [
              "The Solar System",
              "The Life Cycle of Stars"
            ]
          },
          {
            id: "energy-forces",
            name: "Energy - Forces Doing Work",
            subtopics: [
              "Forces and Energy",
              "Forces and Motion",
              "Momentum"
            ]
          },
          {
            id: "forces-their-effects",
            name: "Forces and their Effects",
            subtopics: [
              "Forces and their Effects",
              "Electricity"
            ]
          },
          {
            id: "electricity-circuits",
            name: "Electricity and Circuits",
            subtopics: [
              "Current Electricity",
              "Mains Electricity"
            ]
          },
          {
            id: "magnetism-motors",
            name: "Magnetism and the Motor Effect",
            subtopics: [
              "Magnetism",
              "The Motor Effect"
            ]
          },
          {
            id: "electromagnetic-induction",
            name: "Electromagnetic Induction",
            subtopics: [
              "Electromagnetic Induction",
              "Transformers"
            ]
          },
          {
            id: "particle-model",
            name: "Particle Model",
            subtopics: [
              "Density",
              "Particle Model and Pressure",
              "Forces and Matter"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "ocr",
    name: "OCR",
    subjects: [
      {
        id: "biology",
        name: "Biology",
        icon: "Dna",
        topics: [
          {
            id: "cell-level-systems",
            name: "Cell Level Systems",
            subtopics: [
              "Cell Structures",
              "What Happens in Cells",
              "Respiration",
              "Photosynthesis"
            ]
          },
          {
            id: "scaling-up",
            name: "Scaling Up",
            subtopics: [
              "Supplying the Cell",
              "The Challenge of Size",
              "Organ Systems"
            ]
          },
          {
            id: "organism-level-systems",
            name: "Organism Level Systems",
            subtopics: [
              "Coordination and Control - the Nervous System",
              "Coordination and Control - the Endocrine System",
              "Maintaining Internal Environments"
            ]
          },
          {
            id: "community-level-systems",
            name: "Community Level Systems",
            subtopics: [
              "Ecosystems",
              "How Materials are Cycled",
              "How Organisms Interact"
            ]
          },
          {
            id: "genes-inheritance",
            name: "Genes, Inheritance and Selection",
            subtopics: [
              "Inheritance",
              "Natural Selection and Evolution",
              "Evidence for Evolution"
            ]
          },
          {
            id: "global-challenges",
            name: "Global Challenges",
            subtopics: [
              "Monitoring and Maintaining the Environment",
              "Feeding the Human Race",
              "Monitoring and Maintaining Health"
            ]
          }
        ]
      },
      {
        id: "chemistry",
        name: "Chemistry",
        icon: "FlaskConical",
        topics: [
          {
            id: "particles",
            name: "Particles",
            subtopics: [
              "The Particle Model",
              "Atomic Structure",
              "Ionic Bonding",
              "Covalent Bonding",
              "Types of Substance",
              "The Periodic Table"
            ]
          },
          {
            id: "elements-compounds",
            name: "Elements, Compounds and Mixtures",
            subtopics: [
              "Purity and Separating Mixtures",
              "Bonding",
              "Properties of Materials"
            ]
          },
          {
            id: "chemical-reactions",
            name: "Chemical Reactions",
            subtopics: [
              "Introducing Chemical Reactions",
              "Energetics",
              "Types of Chemical Reactions",
              "Electrolysis"
            ]
          },
          {
            id: "predicting-identifying",
            name: "Predicting and Identifying Reactions and Products",
            subtopics: [
              "Predicting Chemical Reactions",
              "Identifying the Products of Chemical Reactions",
              "Monitoring and Controlling Chemical Reactions"
            ]
          },
          {
            id: "monitoring-controlling",
            name: "Monitoring and Controlling Chemical Reactions",
            subtopics: [
              "Monitoring Chemical Reactions",
              "Controlling Reactions",
              "Equilibria"
            ]
          },
          {
            id: "global-challenges-chem",
            name: "Global Challenges",
            subtopics: [
              "Improving Processes and Products",
              "Interpreting and Interacting with Earth Systems",
              "Using Resources"
            ]
          }
        ]
      },
      {
        id: "physics",
        name: "Physics",
        icon: "Atom",
        topics: [
          {
            id: "matter",
            name: "Matter",
            subtopics: [
              "Atomic Structure",
              "Changes of State",
              "Particle Model and Pressure"
            ]
          },
          {
            id: "forces",
            name: "Forces",
            subtopics: [
              "Forces and Motion",
              "Work Done and Energy Transfer",
              "Forces and Pressure"
            ]
          },
          {
            id: "electricity",
            name: "Electricity",
            subtopics: [
              "Current, Potential Difference and Resistance",
              "Series and Parallel Circuits",
              "Energy Transfers in Circuits",
              "Static Electricity"
            ]
          },
          {
            id: "magnetism",
            name: "Magnetism and Magnetic Fields",
            subtopics: [
              "Magnets and Magnetic Fields",
              "Uses of the Generator Effect"
            ]
          },
          {
            id: "waves-matter",
            name: "Waves in Matter",
            subtopics: [
              "Observed Waves",
              "Wave Properties",
              "Wave Interactions"
            ]
          },
          {
            id: "radioactivity",
            name: "Radioactivity",
            subtopics: [
              "Radioactive Emissions",
              "Uses and Hazards"
            ]
          },
          {
            id: "energy",
            name: "Energy",
            subtopics: [
              "Work Done and Energy Transfer",
              "Power and Efficiency",
              "Energy Resources and Energy Transfer"
            ]
          },
          {
            id: "global-challenges-physics",
            name: "Global Challenges",
            subtopics: [
              "Physics on the Move",
              "Powering Earth",
              "Beyond Earth"
            ]
          }
        ]
      }
    ]
  }
];

// Helper function to get all subjects across all exam boards
export const getAllSubjects = (): Subject[] => {
  const subjectsMap = new Map<string, Subject>();
  
  examBoards.forEach(board => {
    board.subjects.forEach(subject => {
      if (!subjectsMap.has(subject.id)) {
        subjectsMap.set(subject.id, subject);
      }
    });
  });
  
  return Array.from(subjectsMap.values());
};

// Helper function to get subjects for a specific exam board
export const getSubjectsByExamBoard = (examBoardId: string): Subject[] => {
  const board = examBoards.find(board => board.id === examBoardId);
  return board ? board.subjects : [];
};

// Helper function to get topics for a specific subject and exam board
export const getTopicsBySubjectAndBoard = (examBoardId: string, subjectId: string): Topic[] => {
  const board = examBoards.find(board => board.id === examBoardId);
  if (!board) return [];
  
  const subject = board.subjects.find(subject => subject.id === subjectId);
  return subject ? subject.topics : [];
};
