export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  architecture: string[];
  features: string[];
  techHighlights: string[];
  roadmap: string[];
  color: string; // Tailwind glow color class
  icon: string;
}

export interface SkillNode {
  id: string;
  label: string;
  category: "ai" | "dev" | "tools";
  x: number; // Percent position from left (0-100)
  y: number; // Percent position from top (0-100)
  color: string;
}

export interface SkillConnection {
  from: string;
  to: string;
}

export interface KnowledgeNode {
  id: string;
  title: string;
  category: "current" | "previous" | "future";
  description: string;
  bullets: string[];
  connections: string[];
}

export interface MissionWidget {
  title: string;
  value: string;
  sub: string;
  status: "active" | "standby" | "synchronized";
}

export interface LogEntry {
  date: string;
  title: string;
  achievement: string;
  learnings: string;
  status: "completed" | "active";
}

export interface ResearchCapsule {
  id: string;
  title: string;
  theme: string;
  tagline: string;
  abstract: string;
  architecture: string;
  impactLevel: string;
  status: "Phase 1" | "Concept" | "Simulation";
}

export interface Achievement {
  id: string;
  title: string;
  event: string;
  story: string;
  outcome: string;
  learning: string;
  date: string;
}

export interface BrainNote {
  id: string;
  title: string;
  category: "ML / CV" | "Systems" | "AI Agents" | "Software Design";
  timestamp: string;
  summary: string;
  content: string;
  tags: string[];
}

export interface SoftwareRelease {
  version: string;
  codename: string;
  skillsUnlocked: string[];
  goalsCompleted: string[];
  ambitions: string[];
  status: "Deployed" | "Compiling" | "Staging" | "Planned";
}

export interface NetworkContact {
  platform: string;
  label: string;
  value: string;
  url: string;
  icon: string;
  badge: string;
}

// ---------------- IMPLEMENTATION DATA ----------------

export const PROJECTS: Project[] = [
  {
    id: "phytoscan",
    title: "PhytoScan",
    category: "AI & Computer Vision",
    description: "AI-powered plant disease detection platform supporting localized agricultural diagnostic predictions.",
    problem: "Late-stage leaf pathogen detection ruins harvests, resulting in direct yield collapses and heavy pesticide usage for rural farming communities globally.",
    solution: "Srirangapprasath engineered a light, reactive diagnostic node. By loading robust Convolutional Neural Networks on an adaptive classifier endpoint, farmers scan crops in real-time, instantly isolating blight or rust and streaming remedial treatments.",
    architecture: [
      "Vite React & Tailwind UI context layer",
      "Python Flask serving TensorFlow/Keras CNN image classifications",
      "Firebase Cloud Storage hosting raw uploads & predictive database nodes",
      "Edge-optimized quantization strategies for rural offline diagnostics"
    ],
    features: [
      "Dynamic in-app camera frame capture for immediate leaf diagnostic triggers",
      "Multilingual remedy reports containing customized non-toxic fertilizer recommendations",
      "Outbreak hotspot mapping utilizing client metadata"
    ],
    techHighlights: [
      "TensorFlow CNNs",
      "Transfer Learning with ResNetV2",
      "OpenCV Image Processing",
      "Flask Python APIs",
      "Firebase Auth & Cloud Firestore"
    ],
    roadmap: [
      "Migrate model files to TensorFlow.js to compile complete client-side web sandbox processing",
      "Integrate Copernicus satellite vegetation maps to generate ahead-of-time systemic localized blight alerts"
    ],
    color: "from-green-500 to-emerald-400",
    icon: "Bug"
  },
  {
    id: "vaasol",
    title: "VAASOL",
    category: "Fintech & Ledger Systems",
    description: "Finance and dynamic credit ledgering management ecosystem resolving multi-agent tracking errors.",
    problem: "Traditional accounts are splintered, ledgering manually can easily result in math discrepancies, and missing clear collection schedules halts liquidity.",
    solution: "A state-synchronized administrative platform organizing dynamic asset ledgers, client payment timelines, collection schedules, and real-time reconciliation logs with zero margin for error.",
    architecture: [
      "Full-stack React / Node.js express ecosystem",
      "Highly responsive Recharts vector nodes tracking incoming capital trends",
      "Decentralized ledger tracking with role-based dashboard control limits (Admin, Agent, Broker)",
      "Automated transactional SMS & Mail trigger networks"
    ],
    features: [
      "Dynamic data tables with instant search, multi-header sorting, and fluid filters",
      "Intelligent daily settlement reconciliations with instant receipt generators",
      "Interactive analytics panel showing cashflows and risk matrices"
    ],
    techHighlights: [
      "React / Vite",
      "Node.js & Express",
      "Recharts Data Viz",
      "Tailwind Variable Design Variables",
      "Firebase Storage & Hosting"
    ],
    roadmap: [
      "Deploy Automated SMS conversational collection bots via Twilio Node interfaces",
      "Incorporate predictive ML agents estimating repayment risk metrics using historical pattern modeling"
    ],
    color: "from-blue-500 to-cyan-400",
    icon: "DollarSign"
  },
  {
    id: "neurosync",
    title: "NeuroSync",
    category: "Agentic AI Ecosystem",
    description: "Unified AI Assistant workstation merging personal schedules, knowledge vectors, and autonomous workflow loops.",
    problem: "Siloed tasks, browser searches, and note trackers do not cross-talk over an optimized shared semantic workspace, forcing high attention friction.",
    solution: "An immersive, smart command workspace featuring persistent semantic context, tool-calling chains (Gemini models), and scheduled action cards managing productivity.",
    architecture: [
      "React modular task scheduler architecture",
      "Server-side Gemini 3.5 API orchestrator managing multi-turn prompt chains",
      "Vector embeddings memory database indexing files and chat threads",
      "Voice processing triggers via Web Audio synthesis"
    ],
    features: [
      "Holographic core workspace acting as a multi-tool scheduler",
      "Autonomous context parsing: extracts scheduling reminders from user emails",
      "Interactive audio loop reading out summary alerts in futuristic natural voices"
    ],
    techHighlights: [
      "Gemini 3.5 Flash Model",
      "LangChain & Custom Micro-agents",
      "Vector DB Integration",
      "FastAPI & React TS",
      "Web Speech API"
    ],
    roadmap: [
      "Extend terminal node permissions to write and compile code in sandbox scripts autonomously",
      "Develop multi-agent collaboration canvas with live canvas-drawn thinking DAGs"
    ],
    color: "from-purple-500 to-fuchsia-400",
    icon: "Sparkles"
  },
  {
    id: "house-price",
    title: "House Price Analytics",
    category: "Machine Learning Solutions",
    description: "High-accuracy predictive metrics platform evaluating real estate values using statistical regression pipelines.",
    problem: "Opaque property records, volatile interest rates, and multi-attribute pricing structures make manual valuation pricing inaccurate and slow.",
    solution: "An end-to-end Machine Learning model transforming property features (density, crime indexes, age, room distributions) into validated fair-market valuations using premium regression paths.",
    architecture: [
      "Streamlit UI prototyping dashboard",
      "Scikit-learn model serialization pipelines",
      "Advanced gradient-boosting models (XGBoost, LightGBM)",
      "Robust exploratory data analytics (EDA) notebook engines"
    ],
    features: [
      "Real-time slide-controlled attribute testing with instant prediction curves",
      "Comprehensive feature importance trees revealing exactly why a price fluctuates",
      "Dynamic geographical cluster overlays estimating local district valuations"
    ],
    techHighlights: [
      "Python / Jupyter",
      "Scikit-Learn",
      "XGBoost",
      "Pandas & NumPy Documentation",
      "Matplotlib / Seaborn"
    ],
    roadmap: [
      "Add continuous API integrations feeding real-time inflation indexers",
      "Incorporate satellite image segmentation to augment land value based on localized vegetation"
    ],
    color: "from-yellow-500 to-amber-400",
    icon: "Home"
  }
];

export const SKILL_NODES: SkillNode[] = [
  // Artificial Intelligence Category (AI Network Core) - Left side (x: 10-38)
  { id: "ai", label: "Artificial Intelligence", category: "ai", x: 22, y: 15, color: "#a855f7" },
  { id: "ml", label: "Machine Learning", category: "ai", x: 12, y: 35, color: "#8b5cf6" },
  { id: "dl", label: "Deep Learning", category: "ai", x: 32, y: 35, color: "#c084fc" },
  { id: "cv", label: "Computer Vision", category: "ai", x: 15, y: 55, color: "#d946ef" },
  { id: "nlp", label: "Natural Language Processing", category: "ai", x: 35, y: 55, color: "#ec4899" },
  
  // Development - Right side (x: 62-90)
  { id: "dev", label: "Development Hub", category: "dev", x: 74, y: 15, color: "#3b82f6" },
  { id: "python", label: "Python", category: "dev", x: 62, y: 35, color: "#60a5fa" },
  { id: "java", label: "Java SE", category: "dev", x: 86, y: 35, color: "#1e40af" },
  { id: "react", label: "React / TS", category: "dev", x: 65, y: 55, color: "#06b6d4" },
  { id: "flutter", label: "Flutter Engine", category: "dev", x: 83, y: 55, color: "#0ea5e9" },
  { id: "firebase", label: "Firebase Cloud", category: "dev", x: 74, y: 72, color: "#fbaf24" },

  // Tools & Infrastructure - Center Bot (x: 40-60)
  { id: "tools", label: "Engineering Tools", category: "tools", x: 48, y: 48, color: "#14b8a6" },
  { id: "git", label: "Git Node", category: "tools", x: 40, y: 70, color: "#0d9488" },
  { id: "github", label: "GitHub Hub", category: "tools", x: 48, y: 82, color: "#2dd4bf" },
  { id: "vscode", label: "VS Code Suite", category: "tools", x: 58, y: 70, color: "#0284c7" },
  { id: "figma", label: "Figma UI", category: "tools", x: 50, y: 30, color: "#f43f5e" }
];

export const SKILL_CONNECTIONS: SkillConnection[] = [
  // Links between AI Hub and subgroups
  { from: "ai", to: "ml" },
  { from: "ai", to: "dl" },
  { from: "ml", to: "dl" },
  { from: "dl", to: "cv" },
  { from: "dl", to: "nlp" },
  { from: "ml", to: "cv" },

  // Links to languages
  { from: "python", to: "ml" },
  { from: "python", to: "dl" },
  { from: "java", to: "dev" },

  // Dev Hub Connections
  { from: "dev", to: "python" },
  { from: "dev", to: "react" },
  { from: "dev", to: "flutter" },
  { from: "react", to: "firebase" },
  { from: "flutter", to: "firebase" },

  // Intersections with Tools central nexus
  { from: "figma", to: "react" },
  { from: "figma", to: "flutter" },
  { from: "figma", to: "ai" },
  
  { from: "tools", to: "git" },
  { from: "tools", to: "vscode" },
  { from: "git", to: "github" },
  { from: "vscode", to: "python" },
  { from: "vscode", to: "react" }
];

export const KNOWLEDGE_NODES: KnowledgeNode[] = [
  {
    id: "kn-current",
    title: "Currently Mapping",
    category: "current",
    description: "The core focus areas Srirangapprasath is vigorously researching and integrating into his active systems right now.",
    bullets: [
      "Agentic AI Architectures: Structuring dynamic loops, memory registries, and recursive self-correction behaviors via LangGraph.",
      "Large Language Models (LLMs) Fine-tuning: Evaluating weight quantization techniques (QLoRA) and customized task fine-tuning on consumer-grade nodes.",
      "Software Systems Orchestration: Designing decoupled, enterprise-grade cloud systems leveraging distributed queues, Docker virtualization, and secure API gateways."
    ],
    connections: ["kn-previous", "kn-future"]
  },
  {
    id: "kn-previous",
    title: "Established Foundations",
    category: "previous",
    description: "Competencies thoroughly absorbed, tested through intensive production builds, and completely automated.",
    bullets: [
      "Deep Learning Pipelines: Multi-class convolutional classifiers, image augmentation layers, pixel manipulations using OpenCV.",
      "React Framework Development: High-performance state controllers, elegant responsive CSS grids, tailored full-stack API proxy bindings.",
      "Mobile Architecture (Flutter / Dart): Multithreading background channels, secure database caching pipelines, fluid 60FPS visual animations."
    ],
    connections: ["kn-current"]
  },
  {
    id: "kn-future",
    title: "Visionary Horizonal Paths",
    category: "future",
    description: "Forward engineering paradigms Sri is slated to dive into next to keep frontiers aligned with state-of-the-art AI orchestration.",
    bullets: [
      "Edge AI Deployments: Exporting compiled model graphs onto dedicated low-powered wearable silicon or IoT controllers with zero performance drop.",
      "Federated Learning Ecosystems: Orchestrating distributed clusters that train shared machine learning models locally while preserving absolute data sovereignty.",
      "Intelligent Robotic Swarms: Integrating vision-language-action (VLA) controllers to operate tactile tasks in unpredictable, chaotic spatial environments."
    ],
    connections: ["kn-current"]
  }
];

export const MISSION_WIDGETS: MissionWidget[] = [
  {
    title: "Current Primary Mission",
    value: "AI Architect Transition",
    sub: "Bridging system code pipelines & neural model topologies",
    status: "active"
  },
  {
    title: "Focused Specialization",
    value: "Agentic AI",
    sub: "Creating robust autonomous multi-tool models",
    status: "active"
  },
  {
    title: "Current Tech Synthesis",
    value: "Deep Learning Systems",
    sub: "PyTorch tensor operations & edge optimization grids",
    status: "synchronized"
  },
  {
    title: "Ultimate Future Ambition",
    value: "Global AI Compute Platforms",
    sub: "Building consumer-facing platforms utilized by millions of nodes",
    status: "standby"
  }
];

export const BUILD_LOGS: LogEntry[] = [
  {
    date: "Sept 2022",
    title: "Initialized Python Node",
    achievement: "Dived into basic algorithms, command terminals, and automated workflows.",
    learnings: "Discovered the potential of computational problem solving. Understood OOP, data structures, and the freedom of scripting.",
    status: "completed"
  },
  {
    date: "Feb 2023",
    title: "Established Core Machine Learning Concepts",
    achievement: "Wrote first custom regression and boundary-class clustering equations using Scikit-Learn.",
    learnings: "Understood that machine learning is the art of fitting statistical parameters dynamically, far transcending manual hard-coded conditional heuristics.",
    status: "completed"
  },
  {
    date: "Oct 2023",
    title: "Launched PhytoScan Agricultural platform",
    achievement: "Engineered deep CNN classifiers to diagnose crop damage directly from agricultural camera streams.",
    learnings: "Mastered full-stack service integration, connecting high-throughput Flask predictions with reliable client UI architectures.",
    status: "completed"
  },
  {
    date: "Aug 2024",
    title: "AI Workshop at IIT Madras Research Park",
    achievement: "Selected to learn cutting-edge modern neural network standards, distributed training parameters, and hardware-level AI workflows.",
    learnings: "Acquired a rigorous understanding of GPU architectures, deep model optimization techniques, and met industry architects pushing the boundary of AI.",
    status: "completed"
  },
  {
    date: "Present",
    title: "Pioneering Autonomous Agents",
    achievement: "Designing recursive tool-orchestrating, vector-indexed agent workspaces resembling intelligent human operations.",
    learnings: "Currently mastering dynamic prompt graph structures, semantic memory retrieval constraints, and secure self-evaluating execution runs.",
    status: "active"
  }
];

export const EXPERIMENTS: ResearchCapsule[] = [
  {
    id: "twin-assistant",
    title: "Digital Twin Cognitive Pod",
    theme: "Autonomous Assistants",
    tagline: "Your digital copy answering meetings & handling code commits.",
    abstract: "A vector database synchronizes with an individual's personal messaging records, file repositories, and scheduling constraints, feeding an LLM agent that executes tasks autonomously on behalf of the creator.",
    architecture: "FastAPI server, vector lookup database, Gemini tool-calling integrations, persistent context memory streams.",
    impactLevel: "High - Eliminates repetitive attention tasks, freeing human creativity.",
    status: "Simulation"
  },
  {
    id: "pollution-reduction",
    title: "AI localized Smart Scrub Grid",
    theme: "Climate & Smart Robotics",
    tagline: "Dynamic localized air purifiers optimizing intake on sensory telemetry.",
    abstract: "Micro-purification structures are distributed throughout high-urban zones. Guided by localized air quality sensory telemetry, custom deep reinforcement agents optimize scrubbing speeds and air intakes to maintain an clean atmospheric safety buffer.",
    architecture: "Edge IoT controllers, distributed actuator triggers, Actor-Critic deep reinforcement learning algorithms.",
    impactLevel: "Critical - Reduces atmospheric toxic load in densely populated cities.",
    status: "Concept"
  },
  {
    id: "next-gen-agent",
    title: "Self-Verifying Software Engine",
    theme: "Agentic AI",
    tagline: "An agent that writes code, launches compiles, reads stack traces, and corrects bugs.",
    abstract: "A cyclic software architecture that listens to prompts. If compiler tests output errors, a customized secondary prompt parses the trace log, rewrites code files surgically, and retries building until tests run fully green.",
    architecture: "Docker micro-sandboxes, Node/Python compiler runtimes, AST parsing models, structured JSON repair models.",
    impactLevel: "Distruptive - Multiplies single-engineer throughput by up to 10x.",
    status: "Phase 1"
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "iit-madras",
    title: "IIT Madras AI Workshop",
    event: "AI Workshop at IIT Madras Research Park",
    story: "Selected out of highly competitive applicant Pools to participate in advanced machine learning sessions led by premiere researchers and leading industrial software developers.",
    outcome: "Learned optimization strategies for convolutional neural networks, mastered PyTorch tensor designs, and collaborated directly on custom computer vision projects.",
    learning: "The transition from academic modeling to production deployment requires rigorous evaluation metrics, data sanity cleaning pipelines, and edge optimization standardizations.",
    date: "Aug 2024"
  },
  {
    id: "hackathon-gold",
    title: "Agriculture Outbreak Defender",
    event: "Regional Tech Innovation Hackathon",
    story: "Competed in high-intensity 48-hour sprint building localized agricultural assistance utilities for farmers facing agricultural insect invasions.",
    outcome: "Successfully walked away with Top honors by demoing a live-updating localized outbreak locator integrated with mobile crop-disease camera diagnostics.",
    learning: "Building robust minimal viable products under extreme constraints requires disciplined scope alignment and keeping non-negotiable usability first.",
    date: "Nov 2023"
  },
  {
    id: "certifications-vault",
    title: "Deep Learning Foundations Cert",
    event: "Professional Technical Credentials",
    story: "Completed consecutive rigorous tracks covering convolutional networks, sequence transduction networks, recurrent architectures, and vector indexing operations.",
    outcome: "Attained comprehensive certification validation proving ability to mathematically build, optimize, and evaluate multi-layer neural configurations.",
    learning: "Understood backpropagation calculations, weight initialization variances, regularizations, and model training failure modes.",
    date: "May 2023"
  }
];

export const BRAIN_NOTES: BrainNote[] = [
  {
    id: "note-1",
    title: "Overcoming Overfitting in Low-Sample CNNs",
    category: "ML / CV",
    timestamp: "2026-04-12",
    summary: "Proven approaches to maintain accurate generalization boundaries when dataset size is strictly bottlenecked.",
    content: "When training systems like PhytoScan with limited crop disease images, models easily memorize data noise. Applying aggressive ImageDataGenerator parameters (random horizontal flips, 15-degree rotations, zoom shifts) forces invariant feature synthesis. Further, leveraging pre-trained weights (ResNet50V2) and freezing base layers acts as an excellent feature extractor. We only train the final classification head with a high dropout factor (0.5), preventing rapid co-dependency.",
    tags: ["Dropouts", "CNN", "Data Augmentation", "ResNet"]
  },
  {
    id: "note-2",
    title: "Designing Predictable Multi-Agent Orchestrations",
    category: "AI Agents",
    timestamp: "2026-05-30",
    summary: "Avoiding chaotic recursive loops and endless call conditions in system layouts.",
    content: "Without standard structures, multi-agent chains often lock in circular dependencies. Transitioning from unstructured prompt responses to state-controlled DAG structures (Directed Acyclic Graphs) ensures absolute execution bounds. Each agent publishes structured JSON outputs that map to state objects. Execution progress terminates when pre-arranged criteria lists evaluate to verified status, preventing ballooning API costs.",
    tags: ["State Machines", "LangGraph", "JSON Schema", "Orchestration"]
  },
  {
    id: "note-3",
    title: "Fintech State Management: Ledger Synchronization Standards",
    category: "Software Design",
    timestamp: "2026-06-05",
    summary: "Ensuring zero-error reconciliations when multiple roles push updates concurrently.",
    content: "In systems such as VAASOL, database locking and optimistic rendering prevent ledger collisions. When multiple collection agents push updates to a client account, utilizing atomic transactions rather than state-destructive overwrites preserves ledger history. Each update pushes an immutable transaction record, and balances are recalculable as the sum of all historic logs. This completely eliminates mathematical offsets.",
    tags: ["Immutability", "Atomic Operations", "Concurrency", "Ledger Design"]
  }
];

export const SOFTWARE_RELEASES: SoftwareRelease[] = [
  {
    version: "v1.0",
    codename: "Genesis Kernel",
    skillsUnlocked: ["Python core scripts", "Java procedural apps", "Basic OOP structures"],
    goalsCompleted: ["Wrote first automated scripters", "Decompiled and explored framework files", "Built basic static desktop applications"],
    ambitions: ["Acquire deep regression concepts", "Learn frontend component paradigms"],
    status: "Deployed"
  },
  {
    version: "v2.0",
    codename: "Neural Synthesizer",
    skillsUnlocked: ["Deep Learning (CNNs)", "Transfer Learning (ResNet)", "Full Stack React", "Firebase integration"],
    goalsCompleted: ["Engineered PhytoScan disease diagnostics", "Created VAASOL collection analytical portals", "Participated in IIT Madras AI Workshop"],
    ambitions: ["Build autonomous tool-calling systems", "Understand vector indexing and prompt graph states"],
    status: "Deployed"
  },
  {
    version: "v5.0",
    codename: "Cognitive Architect",
    skillsUnlocked: ["Autonomous LangGraph loops", "Custom QLoRA LLM tuning", "Distributed message queues", "Serverless edge inference"],
    goalsCompleted: ["Launch self-correcting agent sandboxes", "Consult startups on system intelligence infrastructures", "Architect open-source AI hubs"],
    ambitions: ["Pioneer non-volatile continuous learning setups for autonomous swarms"],
    status: "Compiling"
  },
  {
    version: "v10.0",
    codename: "Infinite Nodes",
    skillsUnlocked: ["Hardware-level neural compiler optimization", "Federated system design at exascale", "Full-dimensional AI platforms"],
    goalsCompleted: ["Build products enhancing daily operations of over 10 million active users globally", "Create decentralized compute nodes accessible to everyone"],
    ambitions: ["Solve major global agricultural, economic, and atmospheric challenges with zero friction"],
    status: "Planned"
  }
];

export const NETWORK_NODES: NetworkContact[] = [
  {
    platform: "GitHub",
    label: "Explore Sri's Code Vault",
    value: "rangapprasathsri-web",
    url: "https://github.com/rangapprasathsri-web",
    icon: "Github",
    badge: "100+ Commits"
  },
  {
    platform: "LinkedIn",
    label: "Synchronize Professionally",
    value: "Srirangapprasath I",
    url: "https://www.linkedin.com/in/srirangapprasath-i-167985383",
    icon: "Linkedin",
    badge: "AI Network"
  },
  {
    platform: "Email Base",
    label: "Transmit Direct Signal",
    value: "rangapprasathsri@gmail.com",
    url: "mailto:rangapprasathsri@gmail.com",
    icon: "Mail",
    badge: "Response < 12h"
  },
  {
    platform: "Secure CV Link",
    label: "Retrieve Technical Resume",
    value: "Request Srirangapprasath's Resume",
    url: "#resume", // We will let them click to download, or trigger a clean visual display
    icon: "FileDown",
    badge: "PDF Encrypted"
  }
];
