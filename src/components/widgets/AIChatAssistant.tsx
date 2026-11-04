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

export const AIChatAssistant: React.FC = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hello! I am GOPI-AI, Gopiprakan's portfolio assistant. Ask me about Gopiprakan's AI projects, Data Science background, or full-stack web applications!",
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
    }, 800);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          audioController.playClick();
          setIsOpen(!isOpen);
        }}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-[#FF5722] hover:bg-[#E64A19] text-white shadow-card flex items-center justify-center group gpu-accelerated"
      >
        <Bot className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF8A50] rounded-full animate-ping" />
      </motion.button>

      {/* Floating Chat Modal Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-24 right-4 sm:right-8 z-40 w-80 sm:w-96 bg-white border border-[#E9E5DE] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[480px] gpu-accelerated text-[#111820]"
          >
            {/* Header */}
            <div className="p-3.5 bg-[#F7F5F1] border-b border-[#E9E5DE] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722]">
                  <Cpu className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-[#111820] tracking-wider">
                    AI ASSISTANT
                  </h4>
                  <span className="text-[10px] font-mono text-[#FF5722]">● ONLINE // KNOWLEDGE BASE</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white text-[#111820]/60 hover:text-[#FF5722]"
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
                    <div className="w-6 h-6 rounded-lg bg-[#FF5722]/10 border border-[#FF5722]/30 flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5 text-[#FF5722]" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[#FF5722] text-white rounded-tr-none shadow-sm'
                        : 'bg-[#F7F5F1] border border-[#E9E5DE] text-[#111820] rounded-tl-none'
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
                <div className="flex items-center gap-2 text-[#FF5722] text-xs font-mono">
                  <Bot className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing query...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="p-2 border-t border-[#E9E5DE] bg-[#F7F5F1] flex gap-1.5 overflow-x-auto">
              {[
                'What are Gopiprakan’s core skills?',
                'Tell me about AI & Data Science projects',
                'How can I contact Gopiprakan?'
              ].map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(qp)}
                  className="px-2.5 py-1 rounded-lg bg-white border border-[#E9E5DE] text-[10px] font-mono text-[#111820] whitespace-nowrap hover:border-[#FF5722] hover:text-[#FF5722] transition-colors"
                >
                  {qp}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-[#E9E5DE] flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask AI Assistant..."
                className="flex-1 bg-[#F7F5F1] border border-[#E9E5DE] rounded-xl px-3 py-2 text-xs text-[#111820] placeholder:text-[#111820]/40 focus:outline-none focus:border-[#FF5722] focus:bg-white transition-colors"
              />
              <button
                onClick={() => handleSend()}
                className="p-2 rounded-xl bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold shadow-sm"
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
