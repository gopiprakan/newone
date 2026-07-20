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
    id: 'github',
    name: 'GitHub',
    username: '@alexrivers-dev',
    followers: '4.85K',
    followerCount: 4850,
    iconName: 'Github',
    color: '#f0f6fc',
    gradient: 'from-gray-700 to-gray-900',
    url: 'https://github.com',
    recentActivity: 'Pushed 14 commits to neuroma-matrix-ai',
    latestPost: 'Released v2.4.0 of Three.js spatial shader library with Draco compression support!',
    stats: [
      { label: 'Repositories', value: '64 Public' },
      { label: 'Contributions', value: '2,840 this year' },
      { label: 'Stars Earned', value: '3.4K+' }
    ],
    recentReposOrItems: [
      { name: 'neuroma-matrix-ai', starsOrViews: '★ 1.2k', desc: 'Autonomous LLM agent matrix graph' },
      { name: 'hyperspace-3d-engine', starsOrViews: '★ 890', desc: 'R3F PBR product configurator' }
    ]
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    username: 'alex-rivers-tech',
    followers: '18.4K',
    followerCount: 18400,
    iconName: 'Linkedin',
    color: '#0a66c2',
    gradient: 'from-blue-600 to-blue-800',
    url: 'https://linkedin.com',
    recentActivity: 'Shared a technical breakdown of WebGPU compute shaders',
    latestPost: 'Key takeaway from building 60 FPS 3D canvas graph rendering in React: minimize garbage collection by pooling vectors.',
    stats: [
      { label: 'Connections', value: '500+' },
      { label: 'Post Impressions', value: '450K/mo' },
      { label: 'Profile Views', value: '12.8K' }
    ]
  },
  {
    id: 'x-twitter',
    name: 'X (Twitter)',
    username: '@alexrivers_ai',
    followers: '12.2K',
    followerCount: 12200,
    iconName: 'Twitter',
    color: '#1da1f2',
    gradient: 'from-sky-500 to-blue-700',
    url: 'https://x.com',
    recentActivity: 'Tweeted thread on LLM fine-tuning techniques',
    latestPost: 'RAG is only as good as your embedding reranker. Here is how we achieved 94% recall accuracy using hybrid search:',
    stats: [
      { label: 'Monthly Tweets', value: '85' },
      { label: 'Impressions', value: '620K' },
      { label: 'Engagement Rate', value: '4.8%' }
    ]
  },
  {
    id: 'youtube',
    name: 'YouTube',
    username: 'AlexRiversDev',
    followers: '34.5K',
    followerCount: 34500,
    iconName: 'Youtube',
    color: '#ff0000',
    gradient: 'from-red-600 to-rose-900',
    url: 'https://youtube.com',
    recentActivity: 'Uploaded tutorial: "Mastering Three.js & React Three Fiber in 2026"',
    latestPost: 'New video live: Building a futuristic WebGL portfolio from scratch using Tailwind & GSAP.',
    stats: [
      { label: 'Subscribers', value: '34.5K' },
      { label: 'Total Views', value: '1.4M+' },
      { label: 'Videos', value: '42 Tutorials' }
    ]
  },
  {
    id: 'instagram',
    name: 'Instagram',
    username: '@alexrivers.design',
    followers: '9.4K',
    followerCount: 9400,
    iconName: 'Instagram',
    color: '#e1306c',
    gradient: 'from-pink-600 to-purple-800',
    url: 'https://instagram.com',
    recentActivity: 'Posted desktop workstation setup reel',
    latestPost: 'Minimalist neon cyberpunk dev setup setup breakdown 🚀🎧 #devlife #cyberpunk',
    stats: [
      { label: 'Posts', value: '180' },
      { label: 'Reels Views', value: '850K' },
      { label: 'Story Reach', value: '3.2K/day' }
    ]
  },
  {
    id: 'dribbble',
    name: 'Dribbble',
    username: 'alexrivers_ui',
    followers: '6.1K',
    followerCount: 6100,
    iconName: 'Dribbble',
    color: '#ea4c89',
    gradient: 'from-pink-500 to-rose-700',
    url: 'https://dribbble.com',
    recentActivity: 'Published Shot: "Holographic Cyber Interface Kit"',
    latestPost: 'Dark mode UI components created for next-gen quantum telemetry platform.',
    stats: [
      { label: 'Shots', value: '54 Designs' },
      { label: 'Likes', value: '42.5K' },
      { label: 'Pro Badge', value: 'Verified' }
    ]
  },
  {
    id: 'behance',
    name: 'Behance',
    username: 'alexrivers_design',
    followers: '5.8K',
    followerCount: 5800,
    iconName: 'Briefcase',
    color: '#1769ff',
    gradient: 'from-blue-600 to-indigo-900',
    url: 'https://behance.net',
    recentActivity: 'Featured in Interaction Design Gallery',
    latestPost: 'Case Study: NeuroMatrix Autonomous AI WebGL Dashboard UI System',
    stats: [
      { label: 'Project Views', value: '185K' },
      { label: 'Appreciations', value: '24K' },
      { label: 'Curated Badges', value: '3 Features' }
    ]
  },
  {
    id: 'leetcode',
    name: 'LeetCode',
    username: 'alex_rivers_lc',
    followers: '2.1K',
    followerCount: 2100,
    iconName: 'Code2',
    color: '#ffa116',
    gradient: 'from-amber-500 to-orange-700',
    url: 'https://leetcode.com',
    recentActivity: 'Solved Weekly Contest 412 - Rank 84',
    latestPost: 'Reached Guardian tier with 2,245 rating!',
    stats: [
      { label: 'Rating', value: '2,245' },
      { label: 'Problems', value: '1,280 Solved' },
      { label: 'Streak', value: '100 Days' }
    ]
  },
  {
    id: 'google-skill-boost',
    name: 'Google Skill Boost',
    username: 'alex_google_skills',
    followers: '1.25K',
    followerCount: 1250,
    iconName: 'Cloud',
    color: '#4285f4',
    gradient: 'from-blue-500 to-emerald-600',
    url: 'https://www.cloudskillsboost.google',
    recentActivity: 'Completed Quest: Generative AI Leader',
    latestPost: 'Earned Cloud Hero Legend badge on Google Cloud Skills Boost!',
    stats: [
      { label: 'Badges Earned', value: '45 Quests' },
      { label: 'Skill Points', value: '124,500' },
      { label: 'Rank', value: 'Top 1%' }
    ]
  },
  {
    id: 'facebook',
    name: 'Facebook Meta',
    username: 'alex.rivers.official',
    followers: '3.2K',
    followerCount: 3200,
    iconName: 'Facebook',
    color: '#1877f2',
    gradient: 'from-blue-600 to-sky-800',
    url: 'https://facebook.com',
    recentActivity: 'Shared Developer Conference keynotes',
    latestPost: 'Excited to announce our Stanford research paper presentation at NeurIPS 2026!',
    stats: [
      { label: 'Friends & Followers', value: '3.2K' },
      { label: 'Tech Group', value: 'Admin (15K Members)' }
    ]
  }
];
