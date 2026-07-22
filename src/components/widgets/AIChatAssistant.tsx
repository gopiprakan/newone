import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Cpu } from 'lucide-react';
import { audioController } from '../../utils/AudioController';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

/**
 * PERFORMANCE OPTIMIZED AI CHAT ASSISTANT WIDGET
 * Optimizations implemented:
 * 1. React.memo: Avoids re-evaluating widget DOM tree when unrelated App state changes.
 * 2. Hardware Layer Promotion: Applies GPU compositing rules on floating drawers.
 */
export const AIChatAssistant: React.FC = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hello! I am GOPI-AI, Gopiprakan's autonomous portfolio assistant. Ask me about Gopiprakan's AI projects, Data Science background, or full-stack web apps!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = (userQuery?: string) => {
    const textToSend = userQuery || input;
    if (!textToSend.trim()) return;

    audioController.playClick();

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!userQuery) setInput('');
    setIsTyping(true);

    // AI logic response simulation
    setTimeout(() => {
      let aiReply = "Gopiprakan S is a Full-Stack Web Developer and B.Tech AI & Data Science student at Sengunthar Engineering College specializing in React, Node.js, Express, Python, Java, and Firebase.";

      const q = textToSend.toLowerCase();
      if (q.includes('skill') || q.includes('tech') || q.includes('stack')) {
        aiReply = `Gopiprakan's core skills include Java, Python, JavaScript (ES6+), React.js, Node.js, Express.js, Firebase, MongoDB, Tailwind CSS, and NLP/AI development.`;
      } else if (q.includes('project') || q.includes('chat') || q.includes('location') || q.includes('bot')) {
        aiReply = `Gopiprakan's featured projects: 1) Real-Time Communication Chat App (Firebase/React), 2) AI Chatbot for College Website (Python/NLP), 3) Real-Time Location Tracking Web App (Infosys Springboard).`;
      } else if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone')) {
        aiReply = `You can contact Gopiprakan S directly via Email at gopiprakan2006@gmail.com or Phone at +91 9043379569.`;
      } else if (q.includes('education') || q.includes('degree') || q.includes('cgpa') || q.includes('college')) {
        aiReply = `Gopiprakan S is pursuing B.Tech in Artificial Intelligence & Data Science (2023–2027) at Sengunthar Engineering College with a CGPA of 7.71 / 10.0.`;
      } else if (q.includes('achievement') || q.includes('hackathon') || q.includes('sih') || q.includes('award')) {
        aiReply = `Achievements: 1) Smart India Hackathon (SIH 2024) Shortlisted Finalist, 2) National Innovator at Indian Innovation Event (Bharat Mandapam, New Delhi 2025), 3) Infosys Springboard Project Distinction.`;
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          audioController.playClick();
          setIsOpen(!isOpen);
        }}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-[#4285F4] hover:bg-[#3367d6] text-white shadow-google-blue flex items-center justify-center group gpu-accelerated"
      >
        <Bot className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#EA4335] rounded-full animate-ping" />
      </motion.button>

      {/* Floating Chat Modal Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="fixed bottom-24 right-4 sm:right-8 z-40 w-80 sm:w-96 bg-[#2d2e31] border border-[#3c4043] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[480px] gpu-accelerated text-[#e8eaed]"
          >
            {/* Header */}
            <div className="p-3.5 bg-[#202124] border-b border-[#3c4043] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#4285F4]/10 border border-[#4285F4]/30 text-[#4285F4]">
                  <Cpu className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-gradient-google tracking-wider">
                    ANTIGRAVITY ASSISTANT
                  </h4>
                  <span className="text-[10px] font-mono text-[#34A853]">● ONLINE // GOOGLE KNOWLEDGE BASE</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-[#2d2e31] text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Log */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3 font-sans text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.sender === 'ai' && (
                    <div className="w-6 h-6 rounded-lg bg-[#4285F4]/20 border border-[#4285F4]/40 flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5 text-[#4285F4]" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[#4285F4] text-white rounded-tr-none shadow-sm'
                        : 'bg-[#202124] border border-[#3c4043] text-slate-200 rounded-tl-none'
                    }`}
                  >
                    <p>{m.text}</p>
                    <span className="text-[9px] font-mono opacity-60 block text-right mt-1">
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-[#4285F4] text-xs font-mono">
                  <Bot className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing input...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="p-2 border-t border-[#3c4043] bg-[#202124] flex gap-1.5 overflow-x-auto">
              {[
                'What are Gopiprakan’s core skills?',
                'Tell me about AI & Data Science projects',
                'How can I contact Gopiprakan?'
              ].map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(qp)}
                  className="px-2.5 py-1 rounded-lg bg-[#2d2e31] border border-[#3c4043] text-[10px] font-mono text-[#8ab4f8] whitespace-nowrap hover:bg-[#4285F4]/10"
                >
                  {qp}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-[#202124] border-t border-[#3c4043] flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Antigravity Assistant..."
                className="flex-1 bg-[#2d2e31] border border-[#3c4043] rounded-xl px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-[#4285F4]"
              />
              <button
                onClick={() => handleSend()}
                className="p-2 rounded-xl bg-[#4285F4] hover:bg-[#3367d6] text-white font-bold shadow-google-blue"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

AIChatAssistant.displayName = 'AIChatAssistant';
