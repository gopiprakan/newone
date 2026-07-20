import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, User, Cpu } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { audioController } from '../../utils/AudioController';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AIChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hello! I am RIVERS-AI, Alex's autonomous portfolio assistant. Ask me about Alex's AI architecture experience, 3D WebGL projects, or career highlights!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

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
      let aiReply = "Alex is a Senior AI & Full-Stack Architect specialized in PyTorch, React, Three.js, and Cloud Distributed Systems.";

      const q = textToSend.toLowerCase();
      if (q.includes('skill') || q.includes('tech') || q.includes('stack')) {
        aiReply = `Alex's core mastery spans TypeScript, Python (PyTorch, FastAPI), React 18+, Three.js/R3F, WebGL, Next.js, and AWS Cloud Native infrastructure.`;
      } else if (q.includes('project') || q.includes('neuromatrix') || q.includes('hyperspace')) {
        aiReply = `Alex's flagship projects include NeuroMatrix AI (Autonomous agent matrix), HyperSpace 3D (PBR configurator), and Quantum Mesh Cloud Portal.`;
      } else if (q.includes('contact') || q.includes('hire') || q.includes('email')) {
        aiReply = `You can reach Alex directly at alex.rivers.dev@example.com or via the Contact section below for contract, consulting, or full-time roles.`;
      } else if (q.includes('education') || q.includes('degree') || q.includes('cgpa')) {
        aiReply = `Alex holds a Master of Science in CS (Artificial Intelligence) from Stanford University (CGPA 3.96) and a BS in CS from UC Berkeley (CGPA 3.94).`;
      } else if (q.includes('achievement') || q.includes('hackathon') || q.includes('award')) {
        aiReply = `Highlights: 1st Place Grand Winner at Global AI Hackathon 2025, ETHGlobal Best Developer Tooling Award, and Google Developer Challenge Gold Medalist.`;
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
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 text-slate-950 shadow-neon-cyan flex items-center justify-center group"
      >
        <Bot className="w-6 h-6 text-slate-950 group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-ping" />
      </motion.button>

      {/* Floating Chat Modal Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="fixed bottom-24 right-4 sm:right-8 z-40 w-80 sm:w-96 bg-[#090d1a] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[480px]"
          >
            {/* Header */}
            <div className="p-3.5 bg-slate-900 border-b border-cyan-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <Cpu className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-gradient-cyan tracking-wider">
                    RIVERS-AI ASSISTANT
                  </h4>
                  <span className="text-[10px] font-mono text-emerald-400">● ONLINE // VECTOR RAG ENABLED</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200"
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
                    <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none'
                        : 'bg-slate-900 border border-cyan-500/20 text-slate-200 rounded-tl-none'
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
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
                  <Bot className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing vector embeddings...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="p-2 border-t border-slate-800 bg-slate-950/60 flex gap-1.5 overflow-x-auto">
              {[
                'What are Alex’s core skills?',
                'Tell me about NeuroMatrix AI',
                'How can I contact Alex?'
              ].map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(qp)}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-cyan-500/20 text-[10px] font-mono text-cyan-300 whitespace-nowrap hover:bg-cyan-500/10"
                >
                  {qp}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-slate-950 border-t border-cyan-500/20 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask RIVERS-AI anything..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <button
                onClick={() => handleSend()}
                className="p-2 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:brightness-110 shadow-neon-cyan"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
