export const projectCategories = [
  { id: "all", label: "ALL" },
  { id: "frontend", label: "FRONTEND" },
  { id: "fullstack", label: "FULL_STACK" },
  { id: "ml", label: "ML" },
  { id: "iot", label: "IOT" },
  { id: "game", label: "GAME" },
];

export const projects = [
  {
    id: "sunflower-balance",
    specimen: "SPEC_001",
    title: "Sunflower Balance",
    category: "frontend",
    className: "Frontend Dashboard",
    status: "DEPLOYED",
    image:
      "https://plus.unsplash.com/premium_photo-1700124162812-1d5d29087b81?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0",
    description:
      "Interactive irrigation analysis dashboard for sunflower crops, featuring water balance monitoring, stress analysis, and responsive data visualization systems.",
    tech: ["HTML", "Tailwind", "JavaScript"],
    metrics: [
      { label: "Interface", value: 92, tone: "cyan" },
      { label: "Data Visual", value: 86, tone: "green" },
      { label: "Responsive", value: 90, tone: "yellow" },
    ],
    demoUrl: "https://sunflower-balance.vercel.app/",
    featured: true,
  },
  {
    id: "locales-pro",
    specimen: "SPEC_002",
    title: "Locales Pro",
    category: "fullstack",
    className: "POS System",
    status: "ARCHIVED",
    description:
      "Multi-user Point of Sale system with role-based access, stock management, transaction processing, and receipt printing workflows.",
    tech: ["React JS", "PHP Native", "MySQL", "XAMPP"],
    metrics: [
      { label: "System Flow", value: 84, tone: "cyan" },
      { label: "Database", value: 78, tone: "purple" },
      { label: "Operations", value: 88, tone: "green" },
    ],
    repoUrl: "https://github.com/TeamHore1/LocalesPro",
    featured: true,
  },
  {
    id: "flowers-story",
    specimen: "SPEC_003",
    title: "The Flowers",
    category: "frontend",
    className: "Narrative Web",
    status: "DEPLOYED",
    description:
      "Interactive slice-of-life storytelling web experience with character design, relationship mapping, and immersive frontend UI.",
    tech: ["HTML5", "CSS3", "Vanilla JS"],
    metrics: [
      { label: "Story UI", value: 91, tone: "yellow" },
      { label: "Motion", value: 82, tone: "cyan" },
      { label: "Mood", value: 93, tone: "green" },
    ],
    demoUrl: "https://the-flowers-story.vercel.app/",
    featured: true,
  },
  {
    id: "ml-experiment",
    specimen: "SPEC_004",
    title: "Machine Learning Experiment",
    category: "ml",
    className: "Prediction Model",
    status: "TRAINING",
    description:
      "Machine learning project template for preprocessing datasets, training prediction models, and evaluating model performance with clear metrics.",
    tech: ["Python", "Scikit-learn", "Pandas", "ML"],
    metrics: [
      { label: "Accuracy", value: 92, tone: "cyan" },
      { label: "Dataset", value: 86, tone: "green" },
      { label: "Iterations", value: 74, tone: "yellow" },
    ],
    featured: true,
  },
];
