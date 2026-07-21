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
    title: "Full-Stack Web Developer | AI & Data Science Student | Tech Innovator",
    typingTitles: [
      "Full-Stack Web Developer",
      "AI & Data Science Student",
      "Firebase & Node.js Developer",
      "SIH Hackathon Shortlisted Finalist"
    ],
    bio: "Passionate and motivated B.Tech student specializing in Artificial Intelligence and Data Science at Sengunthar Engineering College. Experienced in designing and developing responsive, scalable web applications using modern frontend and backend technologies including React.js, Node.js, Express.js, Python, Java, and Firebase.",
    careerObjective: "Eager to contribute to innovative development teams, build impactful web applications, and continuously enhance technical expertise in modern software development.",
    profileImage: "/profile.jpg",
    email: "gopiprakan2006@gmail.com",
    phone: "+91 9043379569",
    location: "Tamil Nadu, India",
    resumeUrl: "/resume.pdf",
    stats: {
      projectsCompleted: 12,
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
        { name: 'Java', level: 92, icon: 'FileCode', description: 'Core Java, OOP principles, data structures & algorithms' },
        { name: 'Python', level: 94, icon: 'Terminal', description: 'Data Science, NLP, FastAPI, Django, automation scripts' },
        { name: 'JavaScript (ES6+)', level: 95, icon: 'Code', description: 'Async/Await, ES6+ modules, DOM manipulation' },
        { name: 'C', level: 85, icon: 'Cpu', description: 'Fundamental programming concepts & memory management' },
        { name: 'SQL', level: 90, icon: 'Database', description: 'Relational queries, table schemas, data filtering' }
      ]
    },
    {
      category: 'Frontend',
      skills: [
        { name: 'React.js', level: 94, icon: 'Layout', description: 'Functional components, Hooks, Context API, SPA architecture' },
        { name: 'JavaScript (ES6+)', level: 95, icon: 'Code', description: 'Modern syntax, Event Loop, Promises, DOM APIs' },
        { name: 'HTML5 & CSS3', level: 98, icon: 'Globe', description: 'Semantic structure, Flexbox, CSS Grid, responsive design' },
        { name: 'Tailwind CSS', level: 95, icon: 'Palette', description: 'Utility-first styling, glassmorphism, responsive UI layouts' },
        { name: 'Bootstrap', level: 90, icon: 'Layers', description: 'Grid layout system, responsive design components' }
      ]
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', level: 92, icon: 'Server', description: 'Asynchronous event-driven runtime, RESTful APIs' },
        { name: 'Express.js', level: 92, icon: 'Zap', description: 'Middleware routing, REST API development, backend servers' },
        { name: 'Python (FastAPI / Django)', level: 88, icon: 'Share2', description: 'Web APIs, backend microservices, NLP integrations' },
        { name: 'Firebase Backend', level: 94, icon: 'Database', description: 'Real-time database, Authentication, Firestore cloud sync' }
      ]
    },
    {
      category: 'AI & Machine Learning',
      skills: [
        { name: 'Artificial Intelligence', level: 90, icon: 'Brain', description: 'AI algorithms, decision pipelines, predictive logic' },
        { name: 'Natural Language Processing (NLP)', level: 88, icon: 'Bot', description: 'Text processing, chatbot intent parsing, query matching' },
        { name: 'Data Science', level: 89, icon: 'Search', description: 'Data extraction, exploratory data analysis, statistics' }
      ]
    },
    {
      category: 'Databases & Cloud',
      skills: [
        { name: 'MongoDB', level: 90, icon: 'HardDrive', description: 'NoSQL document collections, Mongoose schema modeling' },
        { name: 'MySQL & PostgreSQL', level: 88, icon: 'Database', description: 'Relational database schemas, SQL queries, indexing' },
        { name: 'Firebase Firestore', level: 94, icon: 'Cloud', description: 'Real-time data synchronization, cloud rules & security' },
        { name: 'AWS (Basics)', level: 82, icon: 'Box', description: 'Cloud hosting basics, S3 storage, deployment setups' }
      ]
    },
    {
      category: 'Tools & DevOps',
      skills: [
        { name: 'Git & GitHub', level: 94, icon: 'GitBranch', description: 'Version control, repository management, collaborative branching' },
        { name: 'VS Code & Postman', level: 96, icon: 'Sliders', description: 'API testing, debugging, extension ecosystem' },
        { name: 'Deployment (Vercel / Render)', level: 92, icon: 'CheckCircle', description: 'Continuous production deployment, cloud hosting' }
      ]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: 'real-time-chat-app',
      title: 'Real-Time Communication Chat App',
      category: 'Full-Stack',
      shortDescription: 'Real-time chat application with Firebase authentication, instant messaging, and mobile-first UI.',
      fullDescription: 'Developed a real-time chat application using Firebase with secure user authentication and instant messaging, focusing on providing a smooth, low-latency responsive user experience.',
      problemStatement: 'Modern web communication platforms require secure authentication, real-time message delivery without page reloads, and responsive mobile-first interfaces.',
      solution: 'Engineered a Firebase-backed React application utilizing Firestore real-time listeners and Firebase Auth for instant state synchronization across all connected devices.',
      features: [
        'Secure user registration & instant email authentication',
        'Real-time message synchronization with sub-second latency',
        'Mobile-first responsive UI with Tailwind CSS styling',
        'Active status indicators & message timestamp history',
        'Clean modular React component architecture'
      ],
      techStack: ['React.js', 'Firebase Auth', 'Firestore', 'Tailwind CSS', 'JavaScript (ES6+)'],
      architecture: 'Client-side React SPA communicating with Google Firebase BaaS for authentication, live Firestore data streams, and hosting.',
      challenges: 'Handling real-time state updates and preventing re-rendering performance bottlenecks during fast typing sessions.',
      futureImprovements: 'Adding end-to-end message encryption, media file attachments, and group chat channels.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      screenshots: [
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80'
      ],
      githubUrl: 'https://github.com/gopiprakan/realtime-chat-app',
      liveUrl: 'https://realtime-chat-app.vercel.app',
      featured: true
    },
    {
      id: 'ai-chatbot-college-website',
      title: 'AI Chatbot for College Website',
      category: 'AI & ML',
      shortDescription: 'AI-powered chatbot using Python & NLP to automatically resolve student queries on college portals.',
      fullDescription: 'Built an AI-powered chatbot using Python and NLP to answer student queries automatically, integrated directly into the college website for quick and efficient academic support.',
      problemStatement: 'Students and prospective applicants encounter delays when attempting to find routine college information regarding admissions, departments, and event schedules.',
      solution: 'Created an NLP intent-classification chatbot engine in Python integrated via web API endpoints, providing 24/7 automated query resolutions.',
      features: [
        'Natural Language Processing (NLP) intent & keyword recognition',
        'Seamless integration into college web portals via API',
        'Instant answers for admissions, courses, fees, and campus events',
        'Fallback mechanism to direct complex queries to college office staff',
        'Lightweight, responsive UI chat interface'
      ],
      techStack: ['Python', 'NLP', 'FastAPI / Flask', 'React.js', 'Tailwind CSS'],
      architecture: 'Python backend handling NLP processing and intent classification, serving JSON responses to a React web chat interface.',
      challenges: 'Training the NLP intent model to understand diverse query phrasings and regional student terminology accurately.',
      futureImprovements: 'Integrating voice-assisted queries and multi-language support (Tamil & English).',
      image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
      screenshots: [
        'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80'
      ],
      githubUrl: 'https://github.com/gopiprakan/college-ai-chatbot',
      liveUrl: 'https://college-ai-chatbot.vercel.app',
      featured: true
    },
    {
      id: 'realtime-location-tracker',
      title: 'Real-Time Location Tracking Web App',
      category: 'Full-Stack',
      shortDescription: 'Infosys Springboard project tracking user geolocation in real-time with interactive mapping.',
      fullDescription: 'Created a web application to track and display user locations in real time during the Infosys Springboard program. Integrated map services for accurate location visualization and secure data handling.',
      problemStatement: 'Need for precise real-time location visualization across mobile and desktop devices with secure data transmission.',
      solution: 'Integrated HTML5 Geolocation API with Leaflet/Mapbox mapping libraries and Express web sockets for live coordinate rendering.',
      features: [
        'Real-time GPS coordinate tracking & map visualization',
        'Interactive map markers, routing, and location history',
        'Infosys Springboard capstone program implementation',
        'Secure data handling and privacy control features',
        'Responsive layout optimized for mobile tracking'
      ],
      techStack: ['JavaScript (ES6+)', 'Leaflet.js / Mapbox', 'Node.js', 'Express.js', 'HTML5/CSS3'],
      architecture: 'Node.js & Express server handling location streaming and Leaflet rendering user coordinates on interactive tiles.',
      challenges: 'Optimizing battery usage and GPS polling intervals during continuous real-time tracking sessions.',
      futureImprovements: 'Adding geofencing alerts and historical route playback analytics.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      screenshots: [
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80'
      ],
      githubUrl: 'https://github.com/gopiprakan/realtime-location-tracker',
      liveUrl: 'https://realtime-location-tracker.vercel.app',
      featured: true
    }
  ] as Project[],

  achievements: [
    {
      id: 'sih-hackathon-2024',
      title: 'Smart India Hackathon (SIH) Shortlist',
      competition: 'Smart India Hackathon (SIH 2024)',
      organizer: 'Ministry of Education, Govt. of India',
      date: '2024',
      rank: 'Only Shortlisted Team from College',
      description: 'Selected as the only shortlisted team from Sengunthar Engineering College for the prestigious Smart India Hackathon (SIH), designing innovative software solutions for real-world problem statements.',
      image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=1000&q=80',
      certificateUrl: '/resume.pdf'
    },
    {
      id: 'indian-innovation-event-2025',
      title: 'National Innovator – Indian Innovation Event',
      competition: 'Indian Innovation Event (Bharat Mandapam)',
      organizer: 'Bharat Mandapam, New Delhi',
      date: '2025',
      rank: 'National Level Showcase',
      description: 'Showcased an AI-based project among national-level innovators at Bharat Mandapam, New Delhi. Gained valuable exposure to real-world problem solving and industry-level innovation.',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80',
      certificateUrl: '/resume.pdf'
    },
    {
      id: 'infosys-springboard-project',
      title: 'Infosys Springboard Project Distinction',
      competition: 'Infosys Springboard Program',
      organizer: 'Infosys',
      date: '2024',
      rank: 'Completed Capstone Project',
      description: 'Successfully engineered and deployed the Real-Time Location Tracking Web Application under the Infosys Springboard initiative with distinction.',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1000&q=80',
      certificateUrl: '/resume.pdf'
    }
  ] as Achievement[],

  certificates: [
    {
      id: 'cert-google-cloud',
      title: 'Google Cloud Certification',
      issuer: 'Google Cloud (via Simplilearn.com)',
      issueDate: '2024',
      credentialId: 'GC-SIMPLI-2024',
      skillsLearned: ['Cloud Infrastructure', 'Google Cloud Platform', 'Cloud Application Deployment', 'Cloud Security'],
      image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=800&q=80',
      verifyUrl: 'https://simplilearn.com'
    },
    {
      id: 'cert-java-foundation',
      title: 'Java Foundation Certification',
      issuer: 'Java Foundation / Oracle',
      issueDate: '2024',
      credentialId: 'JAVA-FND-2024',
      skillsLearned: ['Object-Oriented Programming', 'Java Data Structures', 'Core Syntax', 'Exception Handling'],
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      verifyUrl: '/resume.pdf'
    },
    {
      id: 'cert-power-bi',
      title: 'Power BI for Business Professionals',
      issuer: 'Microsoft Business Analytics',
      issueDate: '2024',
      credentialId: 'PBI-BIIZ-2024',
      skillsLearned: ['Data Visualization', 'Business Intelligence', 'Interactive Dashboards', 'DAX Queries'],
      image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
      verifyUrl: '/resume.pdf'
    }
  ] as Certificate[],

  experience: [
    {
      id: 'exp-fullstack-dev-student',
      company: 'Sengunthar Engineering College',
      role: 'Full-Stack Web & AI Developer',
      location: 'Tiruchengode, Tamil Nadu',
      period: '2023 – Present',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
      description: [
        'Designed and developed responsive full-stack web applications using React.js, Node.js, Express.js, and Firebase.',
        'Built an AI-powered NLP chatbot integrated into the college website to automate student query resolutions.',
        'Shortlisted as the only team representing the college in the Smart India Hackathon (SIH 2024).'
      ],
      skills: ['React.js', 'Node.js', 'Express.js', 'Python', 'Firebase', 'Tailwind CSS']
    },
    {
      id: 'exp-infosys-springboard',
      company: 'Infosys Springboard',
      role: 'Software Developer Trainee',
      location: 'Remote',
      period: '2024',
      logo: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=150&q=80',
      description: [
        'Completed full-stack capstone project: Real-Time Location Tracking Web Application.',
        'Integrated mapping services (Leaflet/Mapbox) with geolocation APIs and Node.js for live location streaming.',
        'Gained hands-on experience in clean code principles, API development, and software architecture.'
      ],
      skills: ['JavaScript', 'Node.js', 'Leaflet.js', 'Express.js', 'HTML5/CSS3']
    }
  ] as ExperienceItem[],

  education: [
    {
      id: 'edu-btech-aids',
      institution: 'Sengunthar Engineering College',
      degree: 'B.Tech in Artificial Intelligence and Data Science',
      duration: '2023 – 2027',
      cgpa: '7.71 / 10.0',
      location: 'Tiruchengode, Tamil Nadu, India',
      logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=150&q=80',
      highlights: [
        'Specializing in Artificial Intelligence, Data Science, and Full Stack Web Development.',
        'Only shortlisted team from the college for Smart India Hackathon (SIH 2024).',
        'Showcased AI project at national-level Indian Innovation Event (Bharat Mandapam, New Delhi 2025).'
      ]
    }
  ] as EducationItem[],

  codingProfiles: [
    {
      name: 'GitHub',
      platform: 'github',
      username: 'gopiprakan-s',
      profileUrl: 'https://github.com/gopiprakan-s',
      avatar: '/profile.jpg',
      followers: 120,
      problemsSolved: 350,
      rating: 1850,
      globalRank: 'Active Developer',
      badges: ['Pull Shark', 'SIH 2024 Finalist', 'Pro Developer'],
      color: '#333333',
      heatmap: [5, 8, 12, 15, 20, 18, 25, 30, 22, 19, 14, 28, 35, 40, 29, 32, 27, 24, 18, 21, 33, 38, 42, 45, 30, 25, 20, 28, 36, 40]
    },
    {
      name: 'LeetCode',
      platform: 'leetcode',
      username: 'gopiprakan',
      profileUrl: 'https://leetcode.com',
      avatar: '/profile.jpg',
      followers: 95,
      problemsSolved: 280,
      rating: 1650,
      globalRank: 'Knight Coder',
      badges: ['Problem Solving', '50 Days Streak'],
      color: '#ffa116',
      heatmap: [10, 15, 20, 25, 18, 30, 35, 40, 28, 22, 19, 31, 38, 45, 42, 39, 33, 27, 30, 35, 40, 48, 50, 44, 38, 30, 25, 33, 41, 46]
    },
    {
      name: 'HackerRank',
      platform: 'hackerrank',
      username: 'gopiprakan',
      profileUrl: 'https://hackerrank.com',
      avatar: '/profile.jpg',
      followers: 80,
      problemsSolved: 220,
      rating: 1720,
      globalRank: '5 Gold Stars (Python & Java)',
      badges: ['Java Gold', 'Python Gold', 'Problem Solving Gold'],
      color: '#2ec4b6',
      heatmap: [4, 6, 8, 10, 12, 15, 18, 20, 14, 11, 9, 16, 22, 25, 20, 18, 15, 12, 10, 14, 19, 23, 27, 29, 21, 17, 13, 18, 24, 28]
    }
  ] as CodingProfile[]
};
