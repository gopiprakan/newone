import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Printer, FileText, CheckCircle, Award } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { audioController } from '../../utils/AudioController';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    audioController.playClick();
    // Simulate resume download
    const element = document.createElement('a');
    const file = new Blob([
      `CURRICULUM VITAE - ALEX RIVERS\nSenior AI & Full-Stack Architect\nEmail: ${PORTFOLIO_DATA.personal.email}\nPhone: ${PORTFOLIO_DATA.personal.phone}\nLocation: ${PORTFOLIO_DATA.personal.location}\n\nBIO:\n${PORTFOLIO_DATA.personal.bio}\n\nEDUCATION:\n- M.S. CS (Stanford University) CGPA: 3.96\n- B.S. CS (UC Berkeley) CGPA: 3.94\n\nEXPERIENCE:\n- Apex AI Systems (Lead AI Architect)\n- Vanguard Cyber Tech (Senior Software Engineer)`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'Alex_Rivers_Resume_2026.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#090e1d] border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden text-slate-100 p-6 md:p-10 my-auto"
        >
          {/* Top Bar Actions */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-gradient-cyan">
                  CURRICULUM VITAE
                </h3>
                <span className="text-xs font-mono text-slate-400">ALEX RIVERS // VERIFIED EXECUTIVE CV</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-slate-950 font-bold text-xs shadow-neon-cyan hover:brightness-110"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-cyan-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Interactive Document View */}
          <div className="bg-[#050814] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 font-sans max-h-[65vh] overflow-y-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800/80 pb-4 gap-2">
              <div>
                <h2 className="text-2xl font-bold text-slate-100">{PORTFOLIO_DATA.personal.name}</h2>
                <p className="text-xs font-mono text-cyan-400">{PORTFOLIO_DATA.personal.title}</p>
              </div>
              <div className="text-xs font-mono text-slate-400 space-y-1">
                <p>Email: {PORTFOLIO_DATA.personal.email}</p>
                <p>Location: {PORTFOLIO_DATA.personal.location}</p>
              </div>
            </div>

            {/* Executive Bio */}
            <div>
              <h4 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider mb-2">// Executive Summary</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{PORTFOLIO_DATA.personal.bio}</p>
            </div>

            {/* Education Summary */}
            <div>
              <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-3">// Education & Highest Degrees</h4>
              <div className="space-y-3">
                {PORTFOLIO_DATA.education.map((e) => (
                  <div key={e.id} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                    <div className="flex justify-between text-slate-200 font-semibold mb-1">
                      <span>{e.degree}</span>
                      <span className="text-cyan-400 font-mono">{e.duration}</span>
                    </div>
                    <p className="text-slate-400">{e.institution} — CGPA: {e.cgpa}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Work Experience */}
            <div>
              <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-3">// Leadership & Senior Work Experience</h4>
              <div className="space-y-4">
                {PORTFOLIO_DATA.experience.map((exp) => (
                  <div key={exp.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-2">
                    <div className="flex justify-between text-slate-100 font-semibold">
                      <span>{exp.role} @ {exp.company}</span>
                      <span className="text-cyan-400 font-mono">{exp.period}</span>
                    </div>
                    <ul className="space-y-1 text-slate-300">
                      {exp.description.map((d, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-cyan-400">•</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
