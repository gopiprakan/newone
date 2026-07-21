export interface SocialPlatform {
  id: string;
  name: string;
  username: string;
  followers: string;
  followerCount: number;
  iconName: string;
  color: string;
  gradient: string;
  url: string;
  recentActivity: string;
  latestPost: string;
  stats: {
    label: string;
    value: string;
  }[];
  recentReposOrItems?: {
    name: string;
    starsOrViews: string;
    desc: string;
  }[];
}

export const SOCIAL_PLATFORMS_DATA: SocialPlatform[] = [
  {
    id: 'googledeveloper',
    name: 'Google Developer Profile',
    username: 'gopiprakan',
    followers: 'Verified',
    followerCount: 50,
    iconName: 'Globe',
    color: '#4285f4',
    gradient: 'from-blue-500 via-red-500 to-amber-500',
    url: 'https://g.dev/gopiprakan',
    recentActivity: 'Verified Google Developer Profile (g.dev/gopiprakan)',
    latestPost: 'Official Google Developer Program member building AI solutions, web applications, and earning Google Cloud credentials.',
    stats: [
      { label: 'Profile', value: 'g.dev/gopiprakan' },
      { label: 'Program', value: 'Google Developers' },
      { label: 'Status', value: 'Verified Member' }
    ],
    recentReposOrItems: [
      { name: 'g.dev/gopiprakan', starsOrViews: '★ Verified', desc: 'Google Developer official profile link' },
      { name: 'Google Cloud Skills', starsOrViews: '★ 4 Badges', desc: 'Gen AI & LLM course completions' }
    ]
  },
  {
    id: 'cloudskillsboost',
    name: 'Google Cloud Skills Boost',
    username: 'Gopiprakan S',
    followers: '4 Badges',
    followerCount: 4,
    iconName: 'Cloud',
    color: '#34a853',
    gradient: 'from-emerald-500 to-teal-700',
    url: 'https://www.skills.google/public_profiles/4dd21e0d-872d-4f20-9113-84fee8fd7f54',
    recentActivity: 'Earned AI Boost Bites: Presentation Scripts with Gemini (Nov 2025)',
    latestPost: 'Completed Google Cloud Skills Boost courses on Large Language Models (LLM), Generative AI, and Responsible AI.',
    stats: [
      { label: 'Badges Earned', value: '4 Verified' },
      { label: 'Platform', value: 'Google Skills' },
      { label: 'Member Since', value: '2025' }
    ],
    recentReposOrItems: [
      { name: 'Introduction to Large Language Models', starsOrViews: '★ Google', desc: 'LLMs & prompt tuning microlearning' },
      { name: 'Introduction to Generative AI', starsOrViews: '★ Google', desc: 'Gen AI & Google AI tools overview' }
    ]
  },
  {
    id: 'github',
    name: 'GitHub',
    username: '@gopiprakan',
    followers: '33 Repos',
    followerCount: 33,
    iconName: 'Github',
    color: '#f0f6fc',
    gradient: 'from-gray-700 to-gray-900',
    url: 'https://github.com/gopiprakan',
    recentActivity: 'Pushed AutoDev AI & real-time communication repos',
    latestPost: 'Building autonomous AI software engineer agents and web applications through ZARO Digital Solutions!',
    stats: [
      { label: 'Public Repos', value: '33 Repos' },
      { label: 'Contributions', value: '350+ this year' },
      { label: 'Stars Earned', value: '25+' }
    ],
    recentReposOrItems: [
      { name: 'AI-Software-Engineer-Agent--AutoDev-AI-', starsOrViews: '★ 1', desc: 'Autonomous AI Software Engineer Agent in Python' },
      { name: 'Dharanikaa_Water_Supply', starsOrViews: '★ 1', desc: 'Water delivery business web app built under ZARO' }
    ]
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    username: 'gopiprakan-s-98ab41292',
    followers: '500+',
    followerCount: 500,
    iconName: 'Linkedin',
    color: '#0a66c2',
    gradient: 'from-blue-600 to-blue-800',
    url: 'https://www.linkedin.com/in/gopiprakan-s-98ab41292/',
    recentActivity: 'Shared ZARO Digital Solutions & SIH Hackathon updates',
    latestPost: 'Helping startups & local businesses scale with modern web platforms via ZARO while pursuing B.Tech in AI & Data Science at V.S.B Engineering College!',
    stats: [
      { label: 'Connections', value: '500+' },
      { label: 'Post Impressions', value: '15.4K/mo' },
      { label: 'Profile Views', value: '1.2K' }
    ]
  },
  {
    id: 'instagram',
    name: 'Instagram',
    username: '@mr_creative_officl',
    followers: '850',
    followerCount: 850,
    iconName: 'Instagram',
    color: '#e1306c',
    gradient: 'from-pink-600 via-purple-600 to-amber-500',
    url: 'https://www.instagram.com/mr_creative_officl/',
    recentActivity: 'Shared highlights from Bharat Mandapam, New Delhi & ZARO Web launches',
    latestPost: 'Founder at ZARO | Crafting web solutions & exploring AI innovation 🚀',
    stats: [
      { label: 'Posts', value: '48' },
      { label: 'Engagement', value: '8.4%' },
      { label: 'Reach', value: '5.6K' }
    ]
  },
  {
    id: 'leetcode',
    name: 'LeetCode',
    username: 'wZeBSNNRFh',
    followers: '280 Solved',
    followerCount: 280,
    iconName: 'Code',
    color: '#ffa116',
    gradient: 'from-amber-500 to-orange-700',
    url: 'https://leetcode.com/u/wZeBSNNRFh/',
    recentActivity: 'Practicing Data Structures & Algorithms',
    latestPost: 'Consistently solving algorithms & data structures in Java & Python.',
    stats: [
      { label: 'Problems Solved', value: '280+' },
      { label: 'Rating', value: '1,650' },
      { label: 'Global Rank', value: 'Knight Coder' }
    ]
  },
  {
    id: 'kaggle',
    name: 'Kaggle',
    username: 'gopiprakan',
    followers: 'AI Exploration',
    followerCount: 100,
    iconName: 'Cloud',
    color: '#20beff',
    gradient: 'from-sky-400 to-blue-600',
    url: 'https://www.kaggle.com/gopiprakan',
    recentActivity: 'Published capstone: AI Agents in Action',
    latestPost: 'Exploring AI Agents & Data Analytics capstones on Kaggle.',
    stats: [
      { label: 'Notebooks', value: 'Active' },
      { label: 'Domain', value: 'AI & Data Science' }
    ]
  }
];
