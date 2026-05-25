export const robloxGames = [
  {
    id: "terminal-hacker",
    code: "GAME_001",
    title: "Terminal Hacker",
    genre: "Cyber Simulation",
    status: "PUBLISHED",
    role: "Gameplay Systems / UI / Modular Scripting",
    image:
      "https://tr.rbxcdn.com/180DAY-670d033741a01b5ad07b1e8672be64ce/768/432/Image/Png/noFilter",
    description:
      "Cyber security simulation built in Roblox with terminal-style interaction, modular systems, and gameplay inspired by reconnaissance, privilege escalation, encryption, and vulnerability analysis.",
    tech: ["Luau", "DataStore", "ModuleScript", "GUI System", "OOP"],
    stats: [
      { label: "Systems", value: 88, tone: "cyan" },
      { label: "UI Flow", value: 82, tone: "green" },
      { label: "Gameplay", value: 78, tone: "yellow" },
    ],
    url: "https://www.roblox.com/id/games/105731922583962/Terminal-Hacker",
  },
  {
    id: "test-typing",
    code: "GAME_002",
    title: "Test Typing",
    genre: "Typing Prototype",
    status: "BETA",
    role: "Input Flow / GUI System / RemoteEvents",
    image: "https://t2.rbxcdn.com/180DAY-67b2be37ae31be00ab1319901b9d8347",
    description:
      "Single-player typing training prototype for Roblox PC players, focused on speed, accuracy, input handling, timing, and responsive feedback loops.",
    tech: ["Luau", "ModuleScript", "GUI System", "RemoteEvents"],
    stats: [
      { label: "Input", value: 84, tone: "cyan" },
      { label: "Feedback", value: 76, tone: "yellow" },
      { label: "Prototype", value: 72, tone: "green" },
    ],
    url: "https://www.roblox.com/id/games/129862426505170/Test-Typing",
  },
  {
    id: "locked-build",
    code: "GAME_003",
    title: "Next Roblox Build",
    genre: "System Lab",
    status: "PLANNING",
    role: "Game Architecture / Economy / Persistence",
    description:
      "Reserved slot for the next Roblox project. Use this as a template for future commissions, prototypes, or published game systems.",
    tech: ["Luau", "DataStore", "Economy", "UI"],
    stats: [
      { label: "Design", value: 66, tone: "purple" },
      { label: "Systems", value: 58, tone: "cyan" },
      { label: "Content", value: 42, tone: "yellow" },
    ],
  },
];

export const robloxCapabilities = [
  {
    icon: "code",
    title: "Luau Scripting",
    detail: "ModuleScript structure, gameplay logic, reusable services.",
  },
  {
    icon: "ui",
    title: "UI Systems",
    detail: "Roblox GUI flows, feedback states, menu and HUD behavior.",
  },
  {
    icon: "database",
    title: "DataStore",
    detail: "Progression, persistence, save data, and player records.",
  },
  {
    icon: "server",
    title: "RemoteEvents",
    detail: "Client-server interaction patterns for responsive gameplay.",
  },
  {
    icon: "layers",
    title: "OOP Architecture",
    detail: "Clean systems for mechanics, items, shops, and game loops.",
  },
  {
    icon: "boxes",
    title: "Game Mechanics",
    detail: "Prototype loops, reward systems, interaction and progression.",
  },
];
