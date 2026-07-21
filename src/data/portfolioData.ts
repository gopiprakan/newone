export interface Project {
  id: string;
  title: string;
  category: 'AI & ML' | 'Full-Stack' | '3D Web & Canvas' | 'Web3 & Cloud';
  shortDescription: string;
  fullDescription: string;
  problemStatement: string;
  solution: string;
  features: string[];
  techStack: string[];
  architecture: string;
  challenges: string;
  futureImprovements: string;
  image: string;
  screenshots: string[];
  githubUrl: string;
  liveUrl: string;
  videoDemoUrl?: string;
  featured: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  competition: string;
  organizer: string;
  date: string;
  description: string;
  image: string;
  certificateUrl: string;
  rank: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  skillsLearned: string[];
  image: string;
  verifyUrl: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  logo: string;
  description: string[];
  skills: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  duration: string;
  cgpa: string;
  location: string;
  logo: string;
  highlights: string[];
}

export interface SkillCategory {
  category: 'Programming Languages' | 'Frontend' | 'Backend' | 'AI & Machine Learning' | 'Databases & Cloud' | 'Tools & DevOps';
  skills: {
    name: string;
    level: number; // 0 to 100
    icon: string;
    description: string;
  }[];
}

export interface CodingProfile {
  name: string;
  platform: string;
  username: string;
  profileUrl: string;
  avatar: string;
  followers: number;
  problemsSolved: number;
  rating: number;
  globalRank: string;
  badges: string[];
  color: string;
  heatmap: number[]; // 30 days dummy heatmap data
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Gopiprakan",
    title: "AI & Data Science Student | AI Developer | Full Stack Developer | AI Automation Enthusiast",
    typingTitles: [
      "AI & Data Science Student",
      "AI-Powered App Developer",
      "Full Stack Web Developer",
      "AI Automation Enthusiast"
    ],
    bio: "Hi, I'm Gopiprakan. I am a passionate Artificial Intelligence & Data Science student who enjoys building AI-powered applications, intelligent automation systems, full-stack web applications, and innovative real-world solutions. I love learning new technologies, participating in hackathons, and creating impactful software products.",
    careerObjective: "To pioneer intelligent AI-driven applications, scalable web ecosystems, and automated workflows that address complex real-world challenges while continuously expanding expertise in Artificial Intelligence and Data Science.",
    profileImage: "/profile.jpg",
    email: "gopiprakan.dev@gmail.com",
    phone: "+91 98765 43210",
    location: "Tamil Nadu, India",
    resumeUrl: "#resume-modal",
    stats: {
      projectsCompleted: 24,
      hackathonsWon: 8,
      certificationsCount: 15,
      technologiesMastered: 28,
      cgpa: "3.92 / 4.00"
    }
  },

  skills: [
    {
      category: 'Programming Languages',
      skills: [
        { name: 'TypeScript', level: 96, icon: 'FileCode', description: 'Advanced type safety, generics, AST parsing' },
        { name: 'Python', level: 94, icon: 'Terminal', description: 'PyTorch, Fast-API, NumPy, Pandas, Data Pipelines' },
        { name: 'C++', level: 88, icon: 'Cpu', description: 'Low-level graphics rendering, memory optimization' },
        { name: 'Rust', level: 85, icon: 'Shield', description: 'Wasm modules, high-throughput microservices' },
        { name: 'JavaScript (ESNext)', level: 98, icon: 'Code', description: 'Async patterns, V8 engine internals, Event loop' },
        { name: 'SQL & Cypher', level: 90, icon: 'Database', description: 'Complex analytics, recursive queries, Graph DBs' }
      ]
    },
    {
      category: 'Frontend',
      skills: [
        { name: 'React 18+', level: 98, icon: 'Layout', description: 'Server Components, Fiber architecture, Hooks' },
        { name: 'Three.js / R3F', level: 92, icon: 'Box', description: 'Custom shaders, GLSL, particle systems, Drei' },
        { name: 'Next.js', level: 95, icon: 'Globe', description: 'App Router, SSR, ISR, Edge functions' },
        { name: 'Tailwind CSS', level: 96, icon: 'Palette', description: 'Custom plugin development, Glassmorphism design systems' },
        { name: 'Framer Motion & GSAP', level: 94, icon: 'Activity', description: 'Timeline orchestration, physics-based springs' },
        { name: 'WebGL & Canvas API', level: 89, icon: 'Layers', description: '2D/3D context rendering, frame buffer objects' }
      ]
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js & Express', level: 95, icon: 'Server', description: 'Event-driven microservices, WebSockets, Streams' },
        { name: 'FastAPI / Python', level: 92, icon: 'Zap', description: 'Asynchronous API endpoints, Pydantic validation' },
        { name: 'GraphQL & REST', level: 90, icon: 'Share2', description: 'Schema stitching, Apollo Server, rate limiting' },
        { name: 'Go (Golang)', level: 86, icon: 'Cpu', description: 'Goroutines, gRPC channels, high concurrency' },
        { name: 'Redis Caching', level: 91, icon: 'Zap', description: 'Pub/Sub, memory cache clusters, session management' }
      ]
    },
    {
      category: 'AI & Machine Learning',
      skills: [
        { name: 'LLM Fine-Tuning', level: 92, icon: 'Bot', description: 'LoRA, RAG pipelines, LangChain, LlamaIndex' },
        { name: 'PyTorch & TensorFlow', level: 88, icon: 'Brain', description: 'Deep neural networks, Computer Vision models' },
        { name: 'Vector DBs (Pinecone, Chroma)', level: 94, icon: 'Search', description: 'Embedding search, HNSW indexing, semantic retrieval' },
        { name: 'OpenAI & Claude APIs', level: 96, icon: 'Sparkles', description: 'Function calling, streaming responses, agentic loops' }
      ]
    },
    {
      category: 'Databases & Cloud',
      skills: [
        { name: 'PostgreSQL', level: 93, icon: 'Database', description: 'pgvector extension, query optimization, indexing' },
        { name: 'MongoDB & Cosmos DB', level: 90, icon: 'HardDrive', description: 'Aggregation frameworks, document sharding' },
        { name: 'AWS & GCP', level: 89, icon: 'Cloud', description: 'Lambda, ECS, S3, CloudFront, BigQuery' },
        { name: 'Docker & Kubernetes', level: 88, icon: 'Box', description: 'Container orchestration, Helm charts, multi-stage builds' }
      ]
    },
    {
      category: 'Tools & DevOps',
      skills: [
        { name: 'Git & GitHub Actions', level: 95, icon: 'GitBranch', description: 'CI/CD matrix pipelines, automated releases' },
        { name: 'Vite & Webpack', level: 92, icon: 'Sliders', description: 'Custom bundle splits, tree shaking, plugins' },
        { name: 'Figma & UI Systems', level: 90, icon: 'Feather', description: 'Design tokens, auto-layout wireframes' },
        { name: 'Jest, Playwright & Vitest', level: 89, icon: 'CheckCircle', description: 'E2E testing, visual regression suite' }
      ]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: 'neuro-matrix-ai',
      title: 'NeuroMatrix AI Engine',
      category: 'AI & ML',
      shortDescription: 'Autonomous multi-agent LLM orchestration platform with real-time neural visualization.',
      fullDescription: 'NeuroMatrix is an enterprise-grade AI execution matrix that coordinates collaborative LLM agents with real-time vector memory search and live WebGL node network graphs.',
      problemStatement: 'Modern AI workflows require complex agent collaboration with high latency in context synchronization and lack of visual transparency.',
      solution: 'Engineered a streaming WebSockets agent broker with Pinecone vector memory and an interactive 3D WebGL node visualization graph for step-by-step reasoning transparency.',
      features: [
        'Multi-agent role specialization & dynamic delegation',
        '3D WebGL real-time neural connection canvas',
        'Streaming SSE response renderer with code execution sandbox',
        'Vector memory RAG integration with custom semantic ranking',
        'Enterprise RBAC & granular API token telemetry'
      ],
      techStack: ['React 18', 'TypeScript', 'Three.js', 'PyTorch', 'FastAPI', 'Pinecone', 'Tailwind CSS'],
      architecture: 'Microservices architecture with FastAPI backend workers, Redis pub/sub message bus, and a React Three Fiber visualization canvas.',
      challenges: 'Managing frame rates during 10,000+ node graph updates while maintaining zero-lag WebSocket text streaming.',
      futureImprovements: 'Integrating local WebGPU model inference for offline low-latency browser processing.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      screenshots: [
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1200&q=80'
      ],
      githubUrl: 'https://github.com/example/neuromatrix-ai',
      liveUrl: 'https://neuromatrix-demo.example.com',
      videoDemoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      featured: true
    },
    {
      id: 'hyper-space-3d',
      title: 'HyperSpace 3D Commerce Engine',
      category: '3D Web & Canvas',
      shortDescription: 'Photorealistic WebGL product configurator with real-time ray-tracing simulations.',
      fullDescription: 'Next-generation 3D spatial storefront empowering users to customize complex hardware, change materials in real time, and inspect ray-traced reflections in browser.',
      problemStatement: 'Traditional 2D product photos lead to high return rates and poor user engagement in high-value e-commerce.',
      solution: 'Created a WebGL GLTF rendering pipeline with custom PBR shaders, dynamic HDR environment maps, and instant GLTF loading optimizations.',
      features: [
        'Real-time PBR material swapper & decal layering',
        'Procedural camera transitions with GSAP timeline control',
        'Instant AR view model exporter for iOS USDZ and Android SceneViewer',
        'Custom lighting rig presets (Studio, Cyberpunk, Cyber Glow)',
        'Ultra-compressed 3D mesh Draco compression setup'
      ],
      techStack: ['React', 'Three.js', 'R3F', 'GLSL Shaders', 'GSAP', 'Next.js', 'Tailwind CSS'],
      architecture: 'Decoupled Vite application with WebGL GLTF loader workers and custom GLSL shader passes.',
      challenges: 'Reducing initial 3D model load payload from 45MB down to 3.2MB without loss of visual fidelity.',
      futureImprovements: 'Adding Spatial Audio soundscapes aligned with 3D model interaction points.',
      image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
      screenshots: [
        'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80'
      ],
      githubUrl: 'https://github.com/example/hyperspace-3d',
      liveUrl: 'https://hyperspace-3d.example.com',
      featured: true
    },
    {
      id: 'quantum-cloud-mesh',
      title: 'Quantum Mesh Cloud Portal',
      category: 'Full-Stack',
      shortDescription: 'High-speed cloud infrastructure telemetry dashboard with real-time anomaly detection.',
      fullDescription: 'Enterprise Kubernetes cluster monitoring dashboard rendering thousands of telemetry metrics per second with sub-50ms latency.',
      problemStatement: 'Cloud engineers struggle to pinpoint transient microservice bottlenecks across hundreds of distributed pod instances.',
      solution: 'Built a high-frequency WebSocket streaming pipeline paired with canvas chart rendering and automated AI root-cause analysis alerts.',
      features: [
        'Sub-second metric streaming for 500+ cluster nodes',
        'Automated AI-assisted log clustering & fault detection',
        'Custom interactive canvas chart engine (60 FPS)',
        'Dark mode cyber UI with custom keyboard shortcuts (`Ctrl+K`)',
        'One-click pod auto-scaling trigger integrations'
      ],
      techStack: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'TimescaleDB', 'Redis', 'Docker'],
      architecture: 'Distributed Node.js microservices streaming telemetry to TimescaleDB and pushed via Redis WebSockets.',
      challenges: 'Eliminating DOM trash and garbage collection spikes when rendering 100,000 live data points.',
      futureImprovements: 'Introducing predictive load forecasting based on historical usage metrics.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      screenshots: [
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80'
      ],
      githubUrl: 'https://github.com/example/quantum-cloud-mesh',
      liveUrl: 'https://quantum-cloud.example.com',
      featured: true
    },
    {
      id: 'cyber-vault-web3',
      title: 'CyberVault Web3 Analytics',
      category: 'Web3 & Cloud',
      shortDescription: 'Decentralized asset management suite with smart contract security audits and cross-chain tracking.',
      fullDescription: 'Comprehensive Web3 terminal providing real-time liquidity flow analytics, automated smart contract vulnerability scanning, and multi-chain portfolio tracking.',
      problemStatement: 'Crypto fund managers lack unified tools to audit smart contract security while monitoring cross-chain yield pools simultaneously.',
      solution: 'Engineered an EVM indexing pipeline parsing blockchain events into actionable security alerts and visual wallet dependency graphs.',
      features: [
        'Cross-chain asset tracking (Ethereum, Arbitrum, Solana, Polygon)',
        'Automated Solidity smart contract static analysis scanner',
        'Interactive wallet network graph visualizer',
        'Instant transaction simulation prior to wallet execution',
        'Hardware wallet integration (Ledger, Trezor)'
      ],
      techStack: ['React', 'TypeScript', 'Ethers.js', 'Wagmi', 'Go', 'GraphQL', 'Tailwind CSS'],
      architecture: 'Go indexer consuming RPC WebSocket events into PostgreSQL, consumed by a React Wagmi frontend.',
      challenges: 'Synchronizing multi-chain RPC providers without hitting rate limits during market volatility.',
      futureImprovements: 'Zero-knowledge proof validation integration for private institutional asset tracking.',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80',
      screenshots: [
        'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80'
      ],
      githubUrl: 'https://github.com/example/cyber-vault-web3',
      liveUrl: 'https://cybervault.example.com',
      featured: false
    }
  ] as Project[],

  achievements: [
    {
      id: 'global-ai-hackathon-1st',
      title: 'Grand Winner - 1st Place',
      competition: 'Global AI & Autonomous Systems Hackathon 2025',
      organizer: 'OpenAI & TechCrunch',
      date: 'November 2025',
      rank: '1st Place out of 1,200+ Teams',
      description: 'Awarded 1st place for creating an autonomous emergency dispatch AI agent using multi-modal LLM reasoning and real-time mesh routing.',
      image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=1000&q=80',
      certificateUrl: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'eth-global-winner',
      title: 'Best Developer Tooling Award',
      competition: 'ETHGlobal San Francisco 2024',
      organizer: 'ETHGlobal Consortium',
      date: 'October 2024',
      rank: 'Top Innovator Award',
      description: 'Developed a WebGL smart contract visualizer that reduced bytecode vulnerability identification time by 75%.',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80',
      certificateUrl: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'google-dev-cup',
      title: 'National Champion',
      competition: 'Google Cloud Developer Challenge 2024',
      organizer: 'Google Developer Group',
      date: 'June 2024',
      rank: 'Gold Medal',
      description: 'Built a zero-downtime microservice orchestration engine on GCP BigQuery & Vertex AI for predictive climate modeling.',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1000&q=80',
      certificateUrl: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=1000&q=80'
    }
  ] as Achievement[],

  certificates: [
    {
      id: 'cert-aws-solutions-architect',
      title: 'AWS Certified Solutions Architect – Professional',
      issuer: 'Amazon Web Services (AWS)',
      issueDate: 'Jan 2025 – Jan 2028',
      credentialId: 'AWS-PSA-9938210',
      skillsLearned: ['Distributed Systems', 'Multi-region Cloud Security', 'Serverless Architecture', 'Cost Optimization'],
      image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=800&q=80',
      verifyUrl: 'https://aws.amazon.com/verification'
    },
    {
      id: 'cert-deeplearning-ai-llm',
      title: 'Generative AI & LLM Systems Specialization',
      issuer: 'DeepLearning.AI & Stanford',
      issueDate: 'Sep 2024',
      credentialId: 'DLAI-LLM-88371',
      skillsLearned: ['Transformer Architecture', 'RLHF Fine-Tuning', 'Prompt Engineering', 'LangChain Framework'],
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      verifyUrl: 'https://coursera.org/verify'
    },
    {
      id: 'cert-meta-frontend-architect',
      title: 'Meta Senior Front-End Developer Professional',
      issuer: 'Meta Staff Engineers',
      issueDate: 'Mar 2024',
      credentialId: 'META-FE-55419',
      skillsLearned: ['React Fiber Internals', 'Advanced Web Performance', 'State Management Architecture', 'Accessibility Standards'],
      image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
      verifyUrl: 'https://meta.com/verify'
    }
  ] as Certificate[],

  experience: [
    {
      id: 'exp-lead-ai-architect',
      company: 'Apex AI Systems',
      role: 'Lead AI & Full-Stack Architect',
      location: 'San Francisco, CA',
      period: '2023 – Present',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
      description: [
        'Spearheaded the engineering team of 12 developers building real-time multi-modal AI platform serving over 2M active monthly users.',
        'Architected PyTorch & FastAPI microservices infrastructure reducing LLM inference latency by 42%.',
        'Introduced React Three Fiber 3D data graph dashboards, raising customer retention metrics by 35%.'
      ],
      skills: ['React', 'TypeScript', 'Three.js', 'PyTorch', 'FastAPI', 'AWS', 'Redis']
    },
    {
      id: 'exp-senior-fullstack-dev',
      company: 'Vanguard Cyber Tech',
      role: 'Senior Software Engineer',
      location: 'Silicon Valley, CA',
      period: '2021 – 2023',
      logo: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=150&q=80',
      description: [
        'Designed and implemented micro-frontend architecture using Next.js, Webpack Module Federation, and GraphQL.',
        'Optimized core Web Vitals score from 68 to 98 across 40+ high-traffic product pages.',
        'Mentored 6 junior engineers and established strict CI/CD linting and automated E2E testing pipelines.'
      ],
      skills: ['Next.js', 'GraphQL', 'Node.js', 'PostgreSQL', 'Docker', 'Tailwind CSS']
    },
    {
      id: 'exp-frontend-developer',
      company: 'Nova Digital Agency',
      role: 'Creative Web Engineer',
      location: 'Remote',
      period: '2019 – 2021',
      logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=150&q=80',
      description: [
        'Developed interactive 3D WebGL websites for Fortune 500 clients winning Awwwards Site of the Day.',
        'Custom GSAP and Three.js particle canvas animations creating seamless client storytelling experiences.'
      ],
      skills: ['Three.js', 'GSAP', 'WebGL', 'JavaScript', 'HTML5/CSS3']
    }
  ] as ExperienceItem[],

  education: [
    {
      id: 'edu-master-cs',
      institution: 'Stanford University',
      degree: 'Master of Science in Computer Science (Artificial Intelligence Specialization)',
      duration: '2021 – 2023',
      cgpa: '3.96 / 4.00',
      location: 'Stanford, CA',
      logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=150&q=80',
      highlights: [
        'Thesis: Scalable Autonomous Multi-Agent Reasoning via Graph Attention Networks.',
        'Graduate Research Assistant at Stanford AI Vision & Rendering Lab.',
        'Recipient of the Dean’s Highest Academic Honor Award.'
      ]
    },
    {
      id: 'edu-bachelor-cs',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science in Computer Science & Applied Mathematics',
      duration: '2017 – 2021',
      cgpa: '3.94 / 4.00',
      location: 'Berkeley, CA',
      logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=150&q=80',
      highlights: [
        'President of Berkeley Competitive Programming & Web Development Club.',
        '1st Place Winner of UC Berkeley Senior Software Capstone Expo 2021.',
        'Course Instructor Assistant for CS61B Data Structures & Algorithms.'
      ]
    }
  ] as EducationItem[],

  codingProfiles: [
    {
      name: 'GitHub',
      platform: 'github',
      username: 'alexrivers-dev',
      profileUrl: 'https://github.com',
      avatar: '/profile.jpg',
      followers: 4850,
      problemsSolved: 1420,
      rating: 2450,
      globalRank: 'Top 0.5%',
      badges: ['Arctic Code Vault Contributor', 'GitHub Star', 'Pull Shark', 'Pro Developer'],
      color: '#333333',
      heatmap: [5, 8, 12, 15, 20, 18, 25, 30, 22, 19, 14, 28, 35, 40, 29, 32, 27, 24, 18, 21, 33, 38, 42, 45, 30, 25, 20, 28, 36, 40]
    },
    {
      name: 'LeetCode',
      platform: 'leetcode',
      username: 'alex_rivers_lc',
      profileUrl: 'https://leetcode.com',
      avatar: '/profile.jpg',
      followers: 2190,
      problemsSolved: 1280,
      rating: 2245,
      globalRank: 'Guardian (Top 1.2%)',
      badges: ['Knight Badge', 'Guardian Badge', 'Annual Medal 2024', '100 Days Streak'],
      color: '#ffa116',
      heatmap: [10, 15, 20, 25, 18, 30, 35, 40, 28, 22, 19, 31, 38, 45, 42, 39, 33, 27, 30, 35, 40, 48, 50, 44, 38, 30, 25, 33, 41, 46]
    },
    {
      name: 'HackerRank',
      platform: 'hackerrank',
      username: 'alex_hackerrank',
      profileUrl: 'https://hackerrank.com',
      avatar: '/profile.jpg',
      followers: 1420,
      problemsSolved: 650,
      rating: 2100,
      globalRank: '6 Gold Stars (Problem Solving)',
      badges: ['Problem Solving Gold', 'C++ Gold', 'Python Gold', 'SQL Gold'],
      color: '#2ec4b6',
      heatmap: [4, 6, 8, 10, 12, 15, 18, 20, 14, 11, 9, 16, 22, 25, 20, 18, 15, 12, 10, 14, 19, 23, 27, 29, 21, 17, 13, 18, 24, 28]
    },
    {
      name: 'CodeChef',
      platform: 'codechef',
      username: 'alex_codechef',
      profileUrl: 'https://codechef.com',
      avatar: '/profile.jpg',
      followers: 980,
      problemsSolved: 480,
      rating: 2180,
      globalRank: '5 Star Coder',
      badges: ['Cook-Off Winner', 'Lunchtime Division 1', 'Star Coder Badge'],
      color: '#5b4636',
      heatmap: [2, 5, 7, 9, 12, 14, 16, 19, 13, 10, 8, 15, 20, 22, 18, 16, 14, 11, 9, 13, 17, 21, 25, 26, 19, 15, 12, 16, 22, 24]
    },
    {
      name: 'Codeforces',
      platform: 'codeforces',
      username: 'alex_cf_master',
      profileUrl: 'https://codeforces.com',
      avatar: '/profile.jpg',
      followers: 1350,
      problemsSolved: 820,
      rating: 2015,
      globalRank: 'Candidate Master',
      badges: ['Div 1 Participant', 'Global Round Top 200'],
      color: '#3182ce',
      heatmap: [6, 9, 12, 15, 18, 22, 25, 28, 20, 17, 14, 21, 27, 30, 25, 23, 19, 16, 14, 18, 24, 29, 33, 35, 26, 22, 18, 23, 30, 34]
    },
    {
      name: 'GeeksforGeeks',
      platform: 'geeksforgeeks',
      username: 'alex_gfg_pro',
      profileUrl: 'https://geeksforgeeks.org',
      avatar: '/profile.jpg',
      followers: 1840,
      problemsSolved: 950,
      rating: 1950,
      globalRank: 'Institutional Rank #1',
      badges: ['Monthly Challenge Winner', 'Campus Ambassador', 'Master Author'],
      color: '#2f9e44',
      heatmap: [8, 12, 16, 19, 22, 26, 30, 34, 25, 21, 18, 27, 33, 38, 32, 29, 24, 20, 18, 23, 31, 37, 41, 44, 33, 28, 23, 30, 38, 42]
    },
    {
      name: 'Google Skill Boost',
      platform: 'google-skill-boost',
      username: 'alex_google_skills',
      profileUrl: 'https://www.cloudskillsboost.google',
      avatar: '/profile.jpg',
      followers: 1250,
      problemsSolved: 340,
      rating: 1890,
      globalRank: 'Cloud Hero Legend',
      badges: ['Kubernetes Expert', 'Generative AI Leader', 'BigQuery Legend', 'ML Ops Champion'],
      color: '#4285f4',
      heatmap: [3, 5, 8, 10, 13, 16, 19, 22, 15, 12, 10, 17, 23, 26, 21, 19, 16, 13, 11, 15, 20, 24, 28, 30, 22, 18, 14, 19, 25, 29]
    }
  ] as CodingProfile[]
};
