import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, FileText, Palette, Volume2, Code, X } from 'lucide-react';
import { NAV_SECTIONS } from '../layout/Navbar';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { audioController } from '../../utils/AudioController';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResumeModal: () => void;
  onToggleTheme: () => void;
}

/**
 * PERFORMANCE OPTIMIZED COMMAND PALETTE WIDGET
 * Optimizations implemented:
 * 1. React.memo: Avoids re-rendering command modal when closed or when unrelated App state changes.
 * 2. Hardware Layer Promotion: Promotes backdrop and modal surface to GPU layer.
 */
export const CommandPalette: React.FC<CommandPaletteProps> = React.memo(({
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
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md gpu-accelerated">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="w-full max-w-2xl bg-[#2d2e31] border border-[#3c4043] rounded-2xl shadow-2xl overflow-hidden text-[#e8eaed] gpu-accelerated"
        >
          {/* Header Search Box */}
          <div className="p-4 border-b border-[#3c4043] flex items-center gap-3">
            <Search className="w-5 h-5 text-[#4285F4]" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command, search project, or section..."
              className="w-full bg-transparent text-sm focus:outline-none text-[#e8eaed] placeholder:text-slate-500 font-sans"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-[#202124] text-slate-400 hover:text-slate-200"
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
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#4285F4]/10 hover:border-[#4285F4]/30 border border-transparent text-xs text-left group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-[#4285F4]" />
                    <span>View & Download Curriculum Vitae (Resume)</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#4285F4] transition-opacity" />
                </button>

                <button
                  onClick={() => {
                    audioController.toggleSound();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#4285F4]/10 hover:border-[#4285F4]/30 border border-transparent text-xs text-left group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-4 h-4 text-[#34A853]" />
                    <span>Toggle Synthesized Sound Effects Engine</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#34A853] transition-opacity" />
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onToggleTheme();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#4285F4]/10 hover:border-[#4285F4]/30 border border-transparent text-xs text-left group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Palette className="w-4 h-4 text-[#FBBC04]" />
                    <span>Switch Google Antigravity Theme Palette</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#FBBC04] transition-opacity" />
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
                      className="flex items-center justify-between p-2 rounded-xl bg-[#202124] hover:bg-[#4285F4]/15 border border-[#3c4043] hover:border-[#4285F4]/40 text-xs text-slate-300 hover:text-[#8ab4f8] transition-all"
                    >
                      <span className="font-mono">// {sec.label}</span>
                      <ArrowRight className="w-3 h-3 text-[#4285F4]" />
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
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#202124] hover:bg-[#EA4335]/15 border border-[#3c4043] hover:border-[#EA4335]/40 text-xs text-left group transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Code className="w-4 h-4 text-[#4285F4]" />
                        <div>
                          <p className="font-semibold text-slate-200">{proj.title}</p>
                          <p className="text-[11px] text-slate-400 line-clamp-1">{proj.shortDescription}</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#2d2e31] text-[10px] text-[#f28b82] font-mono border border-[#3c4043]">
                        {proj.category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Navigation Hints */}
          <div className="p-3 bg-[#202124] border-t border-[#3c4043] flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Navigation Shortcuts</span>
            <div className="flex items-center gap-3">
              <span><kbd className="px-1.5 py-0.5 bg-[#2d2e31] rounded border border-[#3c4043]">ESC</kbd> Close</span>
              <span><kbd className="px-1.5 py-0.5 bg-[#2d2e31] rounded border border-[#3c4043]">Ctrl+K</kbd> Toggle</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
});

CommandPalette.displayName = 'CommandPalette';
