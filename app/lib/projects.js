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
  id: "floraid",
  specimen: "SPEC_004",
  title: "FloraID",
  category: "ai",
  className: "Flower Identification Web App",
  status: "DEPLOYED",
  image:
      "public/asset/floraid.png",
  description:
    "AI-powered flower identification web app for classifying Oxford 102 flower species from uploaded images, featuring confidence scores, top prediction alternatives, GradCAM visualization, species gallery, favorites, recent predictions, and bilingual UI.",
  tech: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "FastAPI",
    "TensorFlow",
    "EfficientNetB0",
    "GradCAM",
  ],
  metrics: [
    { label: "Species", value: 102, tone: "green" },
    { label: "AI Model", value: 84, tone: "cyan" },
    { label: "GradCAM", value: 85, tone: "yellow" },
  ],
  demoUrl: "https://floraid.vercel.app/",
  featured: true,
  
},
];
