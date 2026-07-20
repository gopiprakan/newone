import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, FileText, Palette, Volume2, Send, Code, Sparkles, X } from 'lucide-react';
import { NAV_SECTIONS } from '../layout/Navbar';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { audioController } from '../../utils/AudioController';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResumeModal: () => void;
  onToggleTheme: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResumeModal,
  onToggleTheme,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleJump = (sectionId: string) => {
    audioController.playClick();
    onClose();
    const elem = document.getElementById(sectionId);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const navMatches = NAV_SECTIONS.filter((s) =>
    s.label.toLowerCase().includes(query.toLowerCase())
  );

  const projectMatches = PORTFOLIO_DATA.projects.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.shortDescription.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="w-full max-w-2xl bg-[#090d1a] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden text-slate-100"
        >
          {/* Header Search Box */}
          <div className="p-4 border-b border-cyan-500/20 flex items-center gap-3">
            <Search className="w-5 h-5 text-cyan-400" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command, search project, or section..."
              className="w-full bg-transparent text-sm focus:outline-none text-slate-100 placeholder:text-slate-500 font-sans"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Command Results Area */}
          <div className="max-h-96 overflow-y-auto p-4 space-y-4">
            {/* Quick Actions */}
            <div>
              <h5 className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                Quick Actions
              </h5>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    onClose();
                    onOpenResumeModal();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-cyan-500/10 hover:border-cyan-500/30 border border-transparent text-xs text-left group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <span>View & Download Curriculum Vitae (Resume)</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-cyan-400 transition-opacity" />
                </button>

                <button
                  onClick={() => {
                    audioController.toggleSound();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-cyan-500/10 hover:border-cyan-500/30 border border-transparent text-xs text-left group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-4 h-4 text-purple-400" />
                    <span>Toggle Synthesized Sound Effects Engine</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-purple-400 transition-opacity" />
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onToggleTheme();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-cyan-500/10 hover:border-cyan-500/30 border border-transparent text-xs text-left group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Palette className="w-4 h-4 text-pink-400" />
                    <span>Switch Cyber Aesthetic Theme Palette</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-pink-400 transition-opacity" />
                </button>
              </div>
            </div>

            {/* Sections */}
            {navMatches.length > 0 && (
              <div>
                <h5 className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                  Sections Navigation
                </h5>
                <div className="grid grid-cols-2 gap-1.5">
                  {navMatches.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => handleJump(sec.id)}
                      className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 hover:bg-cyan-500/15 border border-slate-800 hover:border-cyan-500/40 text-xs text-slate-300 hover:text-cyan-300 transition-all"
                    >
                      <span className="font-mono">// {sec.label}</span>
                      <ArrowRight className="w-3 h-3 text-cyan-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projectMatches.length > 0 && (
              <div>
                <h5 className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                  Featured Projects
                </h5>
                <div className="space-y-1">
                  {projectMatches.map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => handleJump('projects')}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 hover:bg-purple-500/15 border border-slate-800 hover:border-purple-500/40 text-xs text-left group transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Code className="w-4 h-4 text-cyan-400" />
                        <div>
                          <p className="font-semibold text-slate-200">{proj.title}</p>
                          <p className="text-[11px] text-slate-400 line-clamp-1">{proj.shortDescription}</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-purple-300 font-mono">
                        {proj.category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Navigation Hints */}
          <div className="p-3 bg-slate-950 border-t border-cyan-500/20 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Navigation Shortcuts</span>
            <div className="flex items-center gap-3">
              <span><kbd className="px-1.5 py-0.5 bg-slate-800 rounded">ESC</kbd> Close</span>
              <span><kbd className="px-1.5 py-0.5 bg-slate-800 rounded">Ctrl+K</kbd> Toggle</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
