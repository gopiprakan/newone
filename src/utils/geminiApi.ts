import { PORTFOLIO_DATA } from '../data/portfolioData';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

/**
 * System Context compiled from PORTFOLIO_DATA for Gemini AI
 */
const SYSTEM_CONTEXT = `
You are GOPI-AI, the official, highly intelligent personal AI Assistant for Gopiprakan S's Portfolio Website.
Your goal is to answer visitor questions accurately, professionally, and enthusiastically about Gopiprakan S.

Summary of Gopiprakan S:
- Full Name: Gopiprakan S
- Title: AI & Data Science Student | Founder @ ZARO | Full-Stack Web Developer
- Location: Tamil Nadu, India
- Email: gopiprakan2006@gmail.com | Phone: +91 9043379569
- Education: B.Tech in Artificial Intelligence & Data Science (2023–2027) at Sengunthar Engineering College. CGPA: 7.71 / 10.0
- Schooling: HSC from St. Mary's Higher Secondary School, Millerpuram, Tuticorin (Percentage: 81.33%)

Key Achievements & Badges:
1. Smart India Hackathon (SIH 2024) Shortlisted Finalist (Dec 2024) - Built AI-driven web system.
2. National Innovator at Indian Innovation Event (Bharat Mandapam, New Delhi - 2025).
3. Infosys Springboard Project Completion with Distinction in Full-Stack & Location Systems.
4. Google Developer Profile Verified (g.dev/gopiprakan).

Key Skills:
- Languages: Java, Python, JavaScript (ES6+), TypeScript, HTML5/CSS3.
- Web Development: React.js, Node.js, Express.js, Tailwind CSS, Firebase, MongoDB, RESTful APIs.
- AI & Data Science: Machine Learning, NLP, Data Preprocessing, Scikit-learn, Pandas, NumPy.
- Developer Tools: Git, GitHub, VS Code, Postman, Vite.

Featured Projects:
1. Real-Time Communication Chat App: Built with React.js, Firebase Authentication & Firestore real-time database.
2. College AI Chatbot Website: AI-driven NLP chatbot for automated student query resolution built with Python, Flask, and React.
3. Real-Time Location Tracking Web App: Live geolocation tracking app with interactive Leaflet/Mapbox maps built during Infosys Springboard training.

Coding & Social Profiles:
- Google Developer: https://g.dev/gopiprakan
- GitHub: https://github.com/gopiprakan
- LinkedIn: https://www.linkedin.com/in/gopiprakan-s-82a1732a3/
- LeetCode: https://leetcode.com/u/wZeBSNNRFh/
- Kaggle: https://www.kaggle.com/gopiprakan

Guidelines for your responses:
- Keep answers clear, friendly, direct, and well-formatted with markdown bullet points when helpful.
- Be proud of Gopiprakan's accomplishments in AI, Data Science, and Web Development.
- Always encourage visitors to contact Gopiprakan via email (gopiprakan2006@gmail.com) or download his resume from the header button.
`;

/**
 * Calls Google Gemini API REST endpoints to generate intelligent AI replies
 */
export async function generateGeminiResponse(
  userQuery: string,
  history: ChatMessage[] = []
): Promise<string> {
  if (!GEMINI_API_KEY) {
    return getOfflineFallbackResponse(userQuery);
  }

  // Build conversational context
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `[SYSTEM INSTRUCTION]\n${SYSTEM_CONTEXT}\n\n[USER QUERY]\n${userQuery}`
        }
      ]
    }
  ];

  // Primary API Model: gemini-1.5-flash, Secondary Fallback: gemini-2.0-flash
  const models = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro'];

  for (const model of models) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ contents })
        }
      );

      if (!response.ok) {
        console.warn(`Gemini API model ${model} response not ok:`, response.statusText);
        continue;
      }

      const data = await response.json();
      const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (replyText && replyText.trim().length > 0) {
        return replyText.trim();
      }
    } catch (err) {
      console.warn(`Error querying Gemini model ${model}:`, err);
    }
  }

  // If online API call fails or quota limit is reached, return intelligent local fallback
  return getOfflineFallbackResponse(userQuery);
}

/**
 * High-quality offline fallback matcher for seamless user experience
 */
function getOfflineFallbackResponse(userQuery: string): string {
  const q = userQuery.toLowerCase();

  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('know')) {
    return `**Gopiprakan's Tech Stack & Core Skills:**\n- **Languages:** Java, Python, JavaScript, TypeScript, HTML5/CSS3\n- **Frontend:** React.js, Tailwind CSS, Vite, Framer Motion\n- **Backend & Cloud:** Node.js, Express.js, Firebase, MongoDB\n- **AI & Data Science:** Scikit-learn, Pandas, NumPy, NLP Models\n- **DevTools:** Git, GitHub, Postman, Vercel`;
  }

  if (q.includes('project') || q.includes('chat') || q.includes('app') || q.includes('build')) {
    return `**Featured Projects by Gopiprakan:**\n1. **Real-Time Communication Chat App:** Multi-room chat web application built with React.js & Firebase.\n2. **College AI Chatbot:** Intelligent NLP assistant for automated student query resolution.\n3. **Real-Time Geolocation Tracking App:** Live tracking dashboard developed with Leaflet Maps & Express.js.`;
  }

  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('hire')) {
    return `**Contact Information:**\n- **Email:** gopiprakan2006@gmail.com\n- **Phone:** +91 9043379569\n- **Location:** Tamil Nadu, India\n- **Google Developer:** [g.dev/gopiprakan](https://g.dev/gopiprakan)\n- **LinkedIn:** [Gopiprakan S](https://www.linkedin.com/in/gopiprakan-s-82a1732a3/)`;
  }

  if (q.includes('education') || q.includes('cgpa') || q.includes('college') || q.includes('degree')) {
    return `**Educational Background:**\n- **Degree:** B.Tech in Artificial Intelligence & Data Science (2023–2027)\n- **Institution:** Sengunthar Engineering College, Tamil Nadu\n- **Current CGPA:** **7.71 / 10.0**\n- **High School:** St. Mary's Higher Secondary School (HSC: 81.33%)`;
  }

  if (q.includes('achievement') || q.includes('sih') || q.includes('hackathon') || q.includes('award')) {
    return `**Key Achievements & Recognition:**\n- **Smart India Hackathon (SIH 2024):** Shortlisted Finalist\n- **National Innovator 2025:** Displayed project at Bharat Mandapam, New Delhi\n- **Infosys Springboard:** Completed Project with Distinction\n- **Google Developer Profile:** Official Verified Developer ([g.dev/gopiprakan](https://g.dev/gopiprakan))`;
  }

  return `Gopiprakan S is an AI & Data Science student, Founder @ ZARO Web, and Full-Stack Developer specializing in React, Node.js, Python, and Machine Learning. Feel free to ask about his projects, skills, education, or contact info!`;
}
