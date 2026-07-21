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
  heatmap: number[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Gopiprakan S",
    title: "AI & Data Science Student | Founder @ ZARO | Freelance Web Developer",
    typingTitles: [
      "AI & Data Science Student",
      "Founder @ ZARO Web",
      "Freelance Full-Stack Developer",
      "SIH Hackathon Shortlisted Finalist"
    ],
    bio: "Passionate AI & Data Science student at V.S.B Engineering College, Karur and Founder & Freelance Web Developer at ZARO. Experienced in designing responsive, scalable web applications, autonomous AI agents, and custom digital solutions for startups and businesses.",
    careerObjective: "Technology becomes meaningful when it solves real-world problems and creates value for people.",
    profileImage: "/profile.jpg",
    email: "gopiprakan2006@gmail.com",
    phone: "+91 9043379569",
    location: "Tamil Nadu, India",
    resumeUrl: "/resume.pdf",
    stats: {
      projectsCompleted: 33,
      hackathonsWon: 3,
      certificationsCount: 6,
      technologiesMastered: 16,
      cgpa: "7.71 / 10.0"
    }
  },

  skills: [
    {
      category: 'Programming Languages',
      skills: [
        { name: 'Java', level: 92, icon: 'FileCode', description: 'Core Java, OOP principles, algorithms, Data Structures' },
        { name: 'Python', level: 94, icon: 'Terminal', description: 'Machine Learning, NLP, FastAPI, Django, Data Analytics' },
        { name: 'JavaScript (ES6+)', level: 95, icon: 'Code', description: 'Async/Await, ES6+ modules, DOM manipulation' },
        { name: 'C / C++', level: 85, icon: 'Cpu', description: 'Programming fundamentals & memory management' },
        { name: 'SQL', level: 90, icon: 'Database', description: 'Relational queries, MySQL, PostgreSQL schemas' }
      ]
    },
    {
      category: 'Frontend',
      skills: [
        { name: 'React.js', level: 94, icon: 'Layout', description: 'Functional components, Hooks, Context API, SPA architecture' },
        { name: 'Tailwind CSS', level: 95, icon: 'Palette', description: 'Utility-first styling, glassmorphism, responsive UI layouts' },
        { name: 'HTML5 & CSS3', level: 98, icon: 'Globe', description: 'Semantic HTML, CSS Grid, Flexbox, responsive design' },
        { name: 'Bootstrap', level: 90, icon: 'Layers', description: 'Grid layout system, responsive UI components' }
      ]
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js & Express.js', level: 92, icon: 'Server', description: 'Event-driven server runtime, REST APIs' },
        { name: 'Python (FastAPI / Django)', level: 88, icon: 'Zap', description: 'Web APIs, backend microservices, NLP & AI integrations' },
        { name: 'Firebase & Supabase', level: 94, icon: 'Database', description: 'Real-time database, Auth, Firestore cloud sync' }
      ]
    },
    {
      category: 'AI & Machine Learning',
      skills: [
        { name: 'Artificial Intelligence & Agents', level: 90, icon: 'Brain', description: 'Autonomous software engineer agents, AI workflows' },
        { name: 'Natural Language Processing (NLP)', level: 88, icon: 'Bot', description: 'Text processing, chatbot intent classification' },
        { name: 'Generative AI & LLMs', level: 92, icon: 'Sparkles', description: 'Gemini, Prompt Engineering, LLM Agent tuning (Google Certified)' },
        { name: 'Data Science & Analytics', level: 89, icon: 'Search', description: 'Kaggle explorations, data extraction, predictive logic' }
      ]
    },
    {
      category: 'Databases & Cloud',
      skills: [
        { name: 'Google Cloud Platform', level: 88, icon: 'Cloud', description: 'Google Skills Boost certified, Cloud AI, Vertex AI' },
        { name: 'MySQL & PostgreSQL', level: 88, icon: 'Database', description: 'Relational database schemas, indexing, queries' },
        { name: 'MongoDB', level: 90, icon: 'HardDrive', description: 'NoSQL collections, Mongoose data modeling' },
        { name: 'AWS & Vercel Hosting', level: 85, icon: 'Box', description: 'Cloud hosting, S3 storage, deployment setups' }
      ]
    },
    {
      category: 'Tools & DevOps',
      skills: [
        { name: 'Git & GitHub', level: 94, icon: 'GitBranch', description: 'Version control, repositories, collaborative workflows' },
        { name: 'VS Code & Postman', level: 96, icon: 'Sliders', description: 'API testing, debugging, extension ecosystem' }
      ]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: 'ai-software-engineer-agent',
      title: 'AutoDev AI - Software Engineer Agent',
      category: 'AI & ML',
      shortDescription: 'Autonomous AI Software Engineer Agent designed for automatic code generation and task execution.',
      fullDescription: 'Built an autonomous AI Software Engineer Agent in Python capable of understanding high-level developer goals, breaking down tasks, and writing functional code dynamically.',
      problemStatement: 'Software development workflows involve tedious boilerplate creation and repetitive code refactoring tasks.',
      solution: 'Engineered an agentic Python system utilizing LLM task loops and code execution sandboxes to automate end-to-end code creation.',
      features: [
        'Autonomous task breakdown & step planning',
        'Automatic code generation & execution validation',
        'Multi-agent role specialization loops',
        'Lightweight terminal and API control interface'
      ],
      techStack: ['Python', 'LLM Agents', 'FastAPI', 'Git', 'Tailwind CSS'],
      architecture: 'Agentic Python workflow using task planner modules, code generators, and execution validators.',
      challenges: 'Ensuring agent loop termination and handling code execution syntax errors gracefully.',
      futureImprovements: 'Integrating local WebGPU model execution and multi-file project refactoring.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      screenshots: [
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80'
      ],
      githubUrl: 'https://github.com/gopiprakan/AI-Software-Engineer-Agent--AutoDev-AI-',
      liveUrl: 'https://github.com/gopiprakan/AI-Software-Engineer-Agent--AutoDev-AI-',
      featured: true
    },
    {
      id: 'real-time-communication-app',
      title: 'Real-Time Communication Chat App',
      category: 'Full-Stack',
      shortDescription: 'Real-time chat application with Firebase authentication, instant messaging, and responsive UI.',
      fullDescription: 'Developed a real-time chat application using Firebase with secure user authentication and instant messaging, focusing on providing a smooth, low-latency responsive user experience.',
      problemStatement: 'Modern web platforms require real-time message delivery without page reloads and secure user authentication.',
      solution: 'Engineered a Firebase-backed React application utilizing Firestore real-time listeners and Firebase Auth for instant state synchronization.',
      features: [
        'Secure user registration & instant email authentication',
        'Real-time message synchronization with sub-second latency',
        'Mobile-first responsive UI with Tailwind CSS styling',
        'Active user status indicators & message timestamp history'
      ],
      techStack: ['TypeScript', 'React.js', 'Firebase Auth', 'Firestore', 'Tailwind CSS'],
      architecture: 'Client-side React SPA communicating with Google Firebase BaaS for authentication and Firestore streams.',
      challenges: 'Handling real-time state updates without re-rendering performance bottlenecks.',
      futureImprovements: 'Adding media file attachments and group chat channels.',
      image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
      screenshots: [
        'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80'
      ],
      githubUrl: 'https://github.com/gopiprakan/real-time-communication-app',
      liveUrl: 'https://github.com/gopiprakan/real-time-communication-app',
      featured: true
    },
    {
      id: 'dharanikaa-water-supply',
      title: 'Dharanikaa Water Supply & Transport Web App',
      category: 'Full-Stack',
      shortDescription: 'Commercial business website for water transport services developed under ZARO.',
      fullDescription: 'Designed and developed a responsive business web application for Dharanikaa Water Supply to streamline customer orders, showcase service routes, and facilitate instant contact.',
      problemStatement: 'Local utility & transport businesses lack digital presence to handle online service inquiries effectively.',
      solution: 'Created a sleek, mobile-optimized business web application with interactive service calculators and quick WhatsApp / call triggers.',
      features: [
        'Responsive commercial landing page',
        'Water delivery service route showcase',
        'Direct customer contact & inquiry forms',
        'ZARO client project delivery'
      ],
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Vercel'],
      architecture: 'Single-page business website with client-side interactive routing and direct contact triggers.',
      challenges: 'Optimizing mobile page load speeds for rural network connections.',
      futureImprovements: 'Adding real-time tanker delivery tracking and online booking.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      screenshots: [
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80'
      ],
      githubUrl: 'https://github.com/gopiprakan/Dharanikaa_Water_Supply',
      liveUrl: 'https://github.com/gopiprakan/Dharanikaa_Water_Supply',
      featured: true
    },
    {
      id: 'ai-chatbot-college-website',
      title: 'AI Chatbot for College Website',
      category: 'AI & ML',
      shortDescription: 'AI-powered chatbot using Python & NLP for automated college student query resolution.',
      fullDescription: 'Built an AI-powered chatbot using Python and NLP to answer student queries automatically, integrated directly into the college website for quick and efficient support.',
      problemStatement: 'Students and applicants encounter delays when attempting to find routine college information.',
      solution: 'Created an NLP intent-classification chatbot engine in Python integrated via web API endpoints.',
      features: [
        'Natural Language Processing (NLP) intent recognition',
        'Seamless integration into web portals via API',
        'Instant answers for admissions, courses, and events'
      ],
      techStack: ['Python', 'NLP', 'FastAPI', 'CSS', 'JavaScript'],
      architecture: 'Python backend handling NLP intent classification, serving responses to web chat widgets.',
      challenges: 'Training the NLP intent model to understand diverse student query phrasings.',
      futureImprovements: 'Integrating multi-language support.',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80',
      screenshots: [
        'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80'
      ],
      githubUrl: 'https://github.com/gopiprakan/Chatbot_healthcare-',
      liveUrl: 'https://github.com/gopiprakan/Chatbot_healthcare-',
      featured: false
    }
  ] as Project[],

  achievements: [
    {
      id: 'zaro-founder',
      title: 'Founder & Lead Developer @ ZARO',
      competition: 'ZARO Digital Solutions',
      organizer: 'ZARO Technologies',
      date: '2024 – Present',
      rank: 'Founder & Freelance Lead',
      description: 'Founded ZARO to provide startups, businesses, and individuals with modern, responsive, and scalable web applications, landing pages, and custom software.',
      image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=1000&q=80',
      certificateUrl: '/resume.pdf'
    },
    {
      id: 'sih-hackathon-2024',
      title: 'Smart India Hackathon (SIH) Shortlist',
      competition: 'Smart India Hackathon (SIH 2024)',
      organizer: 'Ministry of Education, Govt. of India',
      date: '2024',
      rank: 'Shortlisted College Team',
      description: 'Selected as the shortlisted team representing the college in Smart India Hackathon (SIH), building AI-driven solutions for real-world challenge statements.',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80',
      certificateUrl: '/resume.pdf'
    },
    {
      id: 'indian-innovation-event-2025',
      title: 'National Innovator – Indian Innovation Event',
      competition: 'Indian Innovation Event (Bharat Mandapam)',
      organizer: 'Bharat Mandapam, New Delhi',
      date: '2025',
      rank: 'National Level Showcase',
      description: 'Showcased an AI-based project among national-level innovators at Bharat Mandapam, New Delhi. Gained valuable exposure to industry innovation.',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1000&q=80',
      certificateUrl: '/resume.pdf'
    }
  ] as Achievement[],

  certificates: [
    {
      id: 'cert-google-llm',
      title: 'Introduction to Large Language Models (LLM)',
      issuer: 'Google Cloud Skills Boost',
      issueDate: 'Aug 2025',
      credentialId: 'GOOG-LLM-17330357',
      skillsLearned: ['Large Language Models', 'Prompt Tuning', 'Generative AI Apps', 'Gemini GEAR Program'],
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      verifyUrl: 'https://www.skills.google/public_profiles/4dd21e0d-872d-4f20-9113-84fee8fd7f54'
    },
    {
      id: 'cert-google-genai',
      title: 'Introduction to Generative AI',
      issuer: 'Google Cloud Skills Boost',
      issueDate: 'Aug 2025',
      credentialId: 'GOOG-GENAI-17330109',
      skillsLearned: ['Generative AI Fundamentals', 'Google AI Tools', 'Model Training Differences', 'Gen AI Applications'],
      image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
      verifyUrl: 'https://www.skills.google/public_profiles/4dd21e0d-872d-4f20-9113-84fee8fd7f54'
    },
    {
      id: 'cert-google-resp-ai',
      title: 'Introduction to Responsible AI',
      issuer: 'Google Cloud Skills Boost',
      issueDate: 'Aug 2025',
      credentialId: 'GOOG-RESPAI-17330476',
      skillsLearned: ['Responsible AI Principles', 'Google 3 AI Principles', 'Ethics in AI', 'Safety Guidelines'],
      image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=800&q=80',
      verifyUrl: 'https://www.skills.google/public_profiles/4dd21e0d-872d-4f20-9113-84fee8fd7f54'
    },
    {
      id: 'cert-google-boost-bites',
      title: 'AI Boost Bites: Presentation Scripts with Gemini',
      issuer: 'Google Cloud Skills Boost',
      issueDate: 'Nov 2025',
      credentialId: 'GOOG-BOOST-20395581',
      skillsLearned: ['Gemini AI Tools', 'Presentation Automation', 'AI Productivity', 'Script Generation'],
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80',
      verifyUrl: 'https://www.skills.google/public_profiles/4dd21e0d-872d-4f20-9113-84fee8fd7f54'
    }
  ] as Certificate[],

  experience: [
    {
      id: 'exp-founder-zaro',
      company: 'ZARO Digital Solutions',
      role: 'Founder & Freelance Web Developer',
      location: 'Tamil Nadu, India',
      period: '2024 – Present',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
      description: [
        'Help startups, businesses, and individuals build modern, responsive, and scalable web applications.',
        'Developed client web projects including Dharanikaa Water Supply & transport solutions.',
        'Provide end-to-end full-stack web development, UI design, API integration, and cloud deployment.'
      ],
      skills: ['React.js', 'Node.js', 'Express.js', 'Python', 'Firebase', 'Tailwind CSS', 'Bootstrap']
    },
    {
      id: 'exp-student-developer',
      company: 'V.S.B Engineering College',
      role: 'AI & Data Science Developer',
      location: 'Karur, Tamil Nadu',
      period: '2023 – Present',
      logo: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=150&q=80',
      description: [
        'Engineered autonomous AI software engineer agents (AutoDev AI) and NLP chatbot tools.',
        'Shortlisted as college representative team for Smart India Hackathon (SIH 2024).',
        'Showcased AI project at Bharat Mandapam, New Delhi for the Indian Innovation Event 2025.'
      ],
      skills: ['Python', 'Machine Learning', 'NLP', 'JavaScript', 'React.js', 'Java']
    }
  ] as ExperienceItem[],

  education: [
    {
      id: 'edu-vsb-aids',
      institution: 'V.S.B Engineering College',
      degree: 'B.Tech in Artificial Intelligence and Data Science',
      duration: '2023 – 2027',
      cgpa: '7.71 / 10.0',
      location: 'Karur, Tamil Nadu, India',
      logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=150&q=80',
      highlights: [
        'Specializing in Artificial Intelligence, Machine Learning, Data Science, and Full Stack Development.',
        'Founder & Freelance Web Developer at ZARO Digital Solutions.',
        'Shortlisted team for Smart India Hackathon (SIH 2024) & National Innovator at Bharat Mandapam, New Delhi.'
      ]
    }
  ] as EducationItem[],

  codingProfiles: [
    {
      name: 'Google Skills Boost',
      platform: 'google-skill-boost',
      username: 'gopiprakan',
      profileUrl: 'https://www.skills.google/public_profiles/4dd21e0d-872d-4f20-9113-84fee8fd7f54',
      avatar: '/profile.jpg',
      followers: 4,
      problemsSolved: 4,
      rating: 1890,
      globalRank: 'Google Skill Badged',
      badges: ['Generative AI', 'Large Language Models', 'Responsible AI', 'AI Boost Bites'],
      color: '#4285f4',
      heatmap: [8, 12, 16, 19, 22, 26, 30, 34, 25, 21, 18, 27, 33, 38, 32, 29, 24, 20, 18, 23, 31, 37, 41, 44, 33, 28, 23, 30, 38, 42]
    },
    {
      name: 'GitHub',
      platform: 'github',
      username: 'gopiprakan',
      profileUrl: 'https://github.com/gopiprakan',
      avatar: '/profile.jpg',
      followers: 2,
      problemsSolved: 33,
      rating: 1850,
      globalRank: 'Active Developer',
      badges: ['Founder @ ZARO', 'SIH Finalist', '33 Repositories'],
      color: '#333333',
      heatmap: [5, 8, 12, 15, 20, 18, 25, 30, 22, 19, 14, 28, 35, 40, 29, 32, 27, 24, 18, 21, 33, 38, 42, 45, 30, 25, 20, 28, 36, 40]
    },
    {
      name: 'LeetCode',
      platform: 'leetcode',
      username: 'wZeBSNNRFh',
      profileUrl: 'https://leetcode.com/u/wZeBSNNRFh/',
      avatar: '/profile.jpg',
      followers: 120,
      problemsSolved: 280,
      rating: 1650,
      globalRank: 'Knight Coder',
      badges: ['Problem Solving', 'Data Structures'],
      color: '#ffa116',
      heatmap: [10, 15, 20, 25, 18, 30, 35, 40, 28, 22, 19, 31, 38, 45, 42, 39, 33, 27, 30, 35, 40, 48, 50, 44, 38, 30, 25, 33, 41, 46]
    },
    {
      name: 'Kaggle',
      platform: 'kaggle',
      username: 'gopiprakan',
      profileUrl: 'https://www.kaggle.com/gopiprakan',
      avatar: '/profile.jpg',
      followers: 85,
      problemsSolved: 15,
      rating: 1550,
      globalRank: 'Kaggle Contributor',
      badges: ['AI Agents in Action', 'Data Exploration'],
      color: '#20beff',
      heatmap: [4, 6, 8, 10, 12, 15, 18, 20, 14, 11, 9, 16, 22, 25, 20, 18, 15, 12, 10, 14, 19, 23, 27, 29, 21, 17, 13, 18, 24, 28]
    }
  ] as CodingProfile[]
};
