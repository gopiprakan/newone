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
    username: '@gopiprakan-s',
    followers: '120',
    followerCount: 120,
    iconName: 'Github',
    color: '#f0f6fc',
    gradient: 'from-gray-700 to-gray-900',
    url: 'https://github.com/gopiprakan-s',
    recentActivity: 'Pushed commits to realtime-chat-app & college-ai-chatbot',
    latestPost: 'Pushed Firebase Auth & Firestore live messaging modules for Real-Time Chat App!',
    stats: [
      { label: 'Repositories', value: '12 Public' },
      { label: 'Contributions', value: '350+ this year' },
      { label: 'Stars Earned', value: '45+' }
    ],
    recentReposOrItems: [
      { name: 'realtime-chat-app', starsOrViews: '★ 24', desc: 'Firebase & React real-time messaging' },
      { name: 'college-ai-chatbot', starsOrViews: '★ 18', desc: 'Python NLP student query resolution chatbot' }
    ]
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    username: 'gopiprakan-s',
    followers: '500+',
    followerCount: 500,
    iconName: 'Linkedin',
    color: '#0a66c2',
    gradient: 'from-blue-600 to-blue-800',
    url: 'https://linkedin.com/in/gopiprakan-s',
    recentActivity: 'Shared Smart India Hackathon (SIH 2024) Shortlist milestone!',
    latestPost: 'Honored to represent Sengunthar Engineering College at Smart India Hackathon 2024 and showcase our AI project at Bharat Mandapam, New Delhi!',
    stats: [
      { label: 'Connections', value: '500+' },
      { label: 'Post Impressions', value: '15.4K/mo' },
      { label: 'Profile Views', value: '1.2K' }
    ]
  },
  {
    id: 'x-twitter',
    name: 'X (Twitter)',
    username: '@gopiprakan_dev',
    followers: '320',
    followerCount: 320,
    iconName: 'Twitter',
    color: '#1da1f2',
    gradient: 'from-sky-500 to-blue-700',
    url: 'https://x.com',
    recentActivity: 'Tweeted update on NLP intent classification using Python & FastAPI',
    latestPost: 'Building an AI chatbot for college web portals using Python & NLP. Fast API endpoints paired with React components make instant support seamless.',
    stats: [
      { label: 'Monthly Tweets', value: '25' },
      { label: 'Impressions', value: '12.5K' },
      { label: 'Engagement Rate', value: '5.2%' }
    ]
  },
  {
    id: 'youtube',
    name: 'YouTube',
    username: 'GopiprakanTech',
    followers: '1.2K',
    followerCount: 1200,
    iconName: 'Youtube',
    color: '#ff0000',
    gradient: 'from-red-600 to-rose-900',
    url: 'https://youtube.com',
    recentActivity: 'Uploaded demo: "Real-Time Chat Application built with Firebase & React"',
    latestPost: 'New video live: How to integrate Firebase Authentication and Firestore live updates in modern React applications.',
    stats: [
      { label: 'Subscribers', value: '1.2K' },
      { label: 'Total Views', value: '45K+' },
      { label: 'Videos', value: '15 Tutorials' }
    ]
  },
  {
    id: 'instagram',
    name: 'Instagram',
    username: '@gopiprakan_s',
    followers: '850',
    followerCount: 850,
    iconName: 'Instagram',
    color: '#e1306c',
    gradient: 'from-pink-600 via-purple-600 to-amber-500',
    url: 'https://instagram.com',
    recentActivity: 'Posted stories from Indian Innovation Event @ Bharat Mandapam, New Delhi',
    latestPost: 'Reflecting on an inspiring journey at Bharat Mandapam, New Delhi representing Sengunthar Engineering College!',
    stats: [
      { label: 'Posts', value: '48' },
      { label: 'Engagement', value: '8.4%' },
      { label: 'Reach', value: '5.6K' }
    ]
  },
  {
    id: 'dribbble',
    name: 'Dribbble',
    username: 'gopiprakan',
    followers: '240',
    followerCount: 240,
    iconName: 'Dribbble',
    color: '#ea4c89',
    gradient: 'from-pink-500 to-rose-600',
    url: 'https://dribbble.com',
    recentActivity: 'Published Shot: "Cyberpunk Futuristic Portfolio UI Kit"',
    latestPost: 'Dark neon design concept with smooth WebGL glowing rings and Tailwind glassmorphism.',
    stats: [
      { label: 'Shots', value: '12' },
      { label: 'Likes', value: '680' },
      { label: 'Views', value: '8.5K' }
    ]
  },
  {
    id: 'behance',
    name: 'Behance',
    username: 'gopiprakan',
    followers: '310',
    followerCount: 310,
    iconName: 'Behance',
    color: '#1769ff',
    gradient: 'from-blue-600 to-indigo-800',
    url: 'https://behance.net',
    recentActivity: 'Published Case Study: "Real-Time Location Tracking Web App UI/UX"',
    latestPost: 'Full UI/UX breakdown of the Infosys Springboard capstone tracking application.',
    stats: [
      { label: 'Projects', value: '8' },
      { label: 'Appreciations', value: '940' },
      { label: 'Views', value: '12.4K' }
    ]
  },
  {
    id: 'leetcode',
    name: 'LeetCode',
    username: 'gopiprakan',
    followers: '95',
    followerCount: 95,
    iconName: 'Code',
    color: '#ffa116',
    gradient: 'from-amber-500 to-orange-700',
    url: 'https://leetcode.com',
    recentActivity: 'Solved 5 array & dynamic programming problems today',
    latestPost: 'Achieved 50 Days Problem Solving streak on LeetCode!',
    stats: [
      { label: 'Problems Solved', value: '280+' },
      { label: 'Contest Rating', value: '1,650' },
      { label: 'Global Rank', value: 'Knight Coder' }
    ]
  },
  {
    id: 'cloudskillsboost',
    name: 'Google Cloud Skills Boost',
    username: 'gopiprakan',
    followers: '150',
    followerCount: 150,
    iconName: 'Cloud',
    color: '#4285f4',
    gradient: 'from-blue-500 to-blue-700',
    url: 'https://www.cloudskillsboost.google',
    recentActivity: 'Completed Google Cloud Certificate via Simplilearn',
    latestPost: 'Finished Google Cloud Infrastructure and Cloud Deployment hands-on labs.',
    stats: [
      { label: 'Badges Earned', value: '14' },
      { label: 'Quests Completed', value: '8' },
      { label: 'Skill Rank', value: 'Cloud Practitioner' }
    ]
  },
  {
    id: 'facebook',
    name: 'Facebook',
    username: 'gopiprakan.s',
    followers: '420',
    followerCount: 420,
    iconName: 'Facebook',
    color: '#1877f2',
    gradient: 'from-blue-600 to-blue-800',
    url: 'https://facebook.com',
    recentActivity: 'Shared updates from college technical symposium',
    latestPost: 'Excited for the upcoming SIH Hackathon competition with team members at Sengunthar Engineering College!',
    stats: [
      { label: 'Friends', value: '420' },
      { label: 'Posts', value: '65' }
    ]
  }
];
