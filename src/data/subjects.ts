export interface Subject {
  id: string;
  name: string;
  icon: string;
  hasOptionalModules: boolean;
  examBoards: ExamBoard[];
}

export interface ExamBoard {
  id: string;
  name: string;
  modules: Module[];
}

export interface Module {
  id: string;
  name: string;
  topics: Topic[];
}

export interface Topic {
  id: string;
  name: string;
}

export const subjects: Subject[] = [
  {
    id: "biology",
    name: "Biology",
    icon: "B",
    hasOptionalModules: false,
    examBoards: [
      {
        id: "aqa-biology",
        name: "AQA",
        modules: [
          {
            id: "working-scientifically",
            name: "Working Scientifically",
            topics: [
              { id: "scientific-method", name: "The Scientific Method" },
              { id: "communication-issues", name: "Communication & Issues Created by Science" },
              { id: "risk", name: "Risk" },
              { id: "designing-investigations", name: "Designing Investigations" },
              { id: "collecting-data", name: "Collecting Data" },
              { id: "processing-presenting-data", name: "Processing and Presenting Data" },
              { id: "units-equations", name: "Units and Equations" },
              { id: "drawing-conclusions", name: "Drawing Conclusions" },
              { id: "uncertainties-evaluations", name: "Uncertainties and Evaluations" }
            ]
          },
          {
            id: "cell-biology",
            name: "Cell Biology",
            topics: [
              { id: "cell-structure", name: "Cell Structure" },
              { id: "cell-division", name: "Cell Division" },
              { id: "transport-in-cells", name: "Transport in Cells" }
            ]
          },
          {
            id: "organisation",
            name: "Organisation",
            topics: [
              { id: "principles-of-organisation", name: "Principles of Organisation" },
              { id: "animal-tissues", name: "Animal Tissues, Organs and Organ Systems" },
              { id: "plant-tissues", name: "Plant Tissues, Organs and Systems" }
            ]
          },
          {
            id: "infection-response",
            name: "Infection and Response",
            topics: [
              { id: "communicable-diseases", name: "Communicable Diseases" },
              { id: "monoclonal-antibodies", name: "Monoclonal Antibodies" },
              { id: "plant-diseases", name: "Plant Diseases" }
            ]
          },
          {
            id: "bioenergetics",
            name: "Bioenergetics",
            topics: [
              { id: "photosynthesis", name: "Photosynthesis" },
              { id: "respiration", name: "Respiration" }
            ]
          },
          {
            id: "homeostasis-response",
            name: "Homeostasis and Response",
            topics: [
              { id: "homeostasis", name: "Homeostasis" },
              { id: "human-nervous-system", name: "Human Nervous System" },
              { id: "hormonal-coordination", name: "Hormonal Coordination in Humans" },
              { id: "plant-hormones", name: "Plant Hormones" }
            ]
          },
          {
            id: "inheritance-variation-evolution",
            name: "Inheritance, Variation and Evolution",
            topics: [
              { id: "reproduction", name: "Reproduction" },
              { id: "variation-evolution", name: "Variation and Evolution" },
              { id: "genetics", name: "Genetics" },
              { id: "natural-selection", name: "Natural Selection" }
            ]
          }
        ]
      },
      {
        id: "edexcel-biology",
        name: "Edexcel",
        modules: [
          {
            id: "key-concepts-biology",
            name: "Key Concepts in Biology",
            topics: [
              { id: "cell-biology", name: "Cell Biology" },
              { id: "enzymes", name: "Enzymes" },
              { id: "nutrition", name: "Nutrition" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "business",
    name: "Business",
    icon: "B",
    hasOptionalModules: true,
    examBoards: [
      {
        id: "aqa-business",
        name: "AQA",
        modules: [
          {
            id: "business-in-the-real-world",
            name: "Business in the Real World",
            topics: [
              { id: "purpose-nature", name: "Purpose and Nature of Business" },
              { id: "business-ownership", name: "Business Ownership" },
              { id: "setting-business-aims", name: "Setting Business Aims and Objectives" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "chemistry",
    name: "Chemistry",
    icon: "C",
    hasOptionalModules: false,
    examBoards: [
      {
        id: "aqa-chemistry",
        name: "AQA",
        modules: [
          {
            id: "atomic-structure",
            name: "Atomic Structure and the Periodic Table",
            topics: [
              { id: "atoms-elements-compounds", name: "Atoms, Elements and Compounds" },
              { id: "mixtures", name: "Mixtures" },
              { id: "atomic-structure", name: "Atomic Structure" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "combined-science",
    name: "Combined Science",
    icon: "C",
    hasOptionalModules: false,
    examBoards: [
      {
        id: "aqa-combined-science",
        name: "AQA",
        modules: [
          {
            id: "biology-paper-1",
            name: "Biology Paper 1",
            topics: [
              { id: "cell-biology", name: "Cell Biology" },
              { id: "organisation", name: "Organisation" },
              { id: "infection-response", name: "Infection and Response" },
              { id: "bioenergetics", name: "Bioenergetics" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "computer-science",
    name: "Computer Science",
    icon: "C",
    hasOptionalModules: true,
    examBoards: [
      {
        id: "aqa-computer-science",
        name: "AQA",
        modules: [
          {
            id: "fundamentals-algorithms",
            name: "Fundamentals of Algorithms",
            topics: [
              { id: "representing-algorithms", name: "Representing Algorithms" },
              { id: "efficiency-algorithms", name: "Efficiency of Algorithms" },
              { id: "searching-algorithms", name: "Searching Algorithms" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "design-technology",
    name: "Design and Technology",
    icon: "D",
    hasOptionalModules: true,
    examBoards: [
      {
        id: "aqa-design-technology",
        name: "AQA",
        modules: [
          {
            id: "core-technical-principles",
            name: "Core Technical Principles",
            topics: [
              { id: "new-technologies", name: "New and Emerging Technologies" },
              { id: "energy-storage", name: "Energy Generation and Storage" },
              { id: "developments-new-materials", name: "Developments in New Materials" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "drama",
    name: "Drama",
    icon: "D",
    hasOptionalModules: true,
    examBoards: [
      {
        id: "aqa-drama",
        name: "AQA",
        modules: [
          {
            id: "understanding-drama",
            name: "Understanding Drama",
            topics: [
              { id: "drama-theatre", name: "Drama and Theatre" },
              { id: "study-of-set-play", name: "Study of a Set Play" },
              { id: "practical-exploration", name: "Practical Exploration" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "english-language",
    name: "English Language",
    icon: "E",
    hasOptionalModules: false,
    examBoards: [
      {
        id: "aqa-english-language",
        name: "AQA",
        modules: [
          {
            id: "explorations-creative-reading-writing",
            name: "Explorations in Creative Reading and Writing",
            topics: [
              { id: "reading-fiction", name: "Reading: Understanding a Text" },
              { id: "writing-fiction", name: "Writing: Descriptive or Narrative Writing" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "english-literature",
    name: "English Literature",
    icon: "E",
    hasOptionalModules: false,
    examBoards: [
      {
        id: "aqa-english-literature",
        name: "AQA",
        modules: [
          {
            id: "shakespeare-19th-century-novel",
            name: "Shakespeare and the 19th-century Novel",
            topics: [
              { id: "shakespeare", name: "Shakespeare" },
              { id: "19th-century-novel", name: "The 19th-century Novel" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "french",
    name: "French",
    icon: "F",
    hasOptionalModules: true,
    examBoards: [
      {
        id: "aqa-french",
        name: "AQA",
        modules: [
          {
            id: "theme-1-identity-culture",
            name: "Theme 1: Identity and Culture",
            topics: [
              { id: "me-my-family-friends", name: "Me, my family and friends" },
              { id: "technology-everyday-life", name: "Technology in everyday life" },
              { id: "free-time-activities", name: "Free-time activities" }
            ]
          }
        ]
      }
    ]
  }
];
