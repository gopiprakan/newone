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
  onSectionChange: (id: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = React.memo(({
  isOpen,
  onClose,
  onOpenResumeModal,
  onToggleTheme,
  onSectionChange,
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
    onSectionChange(sectionId);
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
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#111820]/60 backdrop-blur-md gpu-accelerated">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="w-full max-w-2xl bg-white border border-[#E9E5DE] rounded-2xl shadow-2xl overflow-hidden text-[#111820] gpu-accelerated"
        >
          {/* Header Search Box */}
          <div className="p-4 border-b border-[#E9E5DE] flex items-center gap-3">
            <Search className="w-5 h-5 text-[#FF5722]" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command, search project, or section..."
              className="w-full bg-transparent text-sm focus:outline-none text-[#111820] placeholder:text-[#111820]/40 font-sans"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-[#F7F5F1] text-[#111820]/60 hover:text-[#FF5722]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Command Results Area */}
          <div className="max-h-96 overflow-y-auto p-4 space-y-4">
            {/* Quick Actions */}
            <div>
              <h5 className="text-[11px] font-mono uppercase tracking-wider text-[#111820]/50 mb-2 font-semibold">
                Quick Actions
              </h5>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    onClose();
                    onSectionChange('resume');
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FF5722]/10 hover:border-[#FF5722]/30 border border-transparent text-xs text-left group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-[#FF5722]" />
                    <span className="font-medium text-[#111820]">View & Download Curriculum Vitae (Resume)</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#FF5722] transition-opacity" />
                </button>

                <button
                  onClick={() => {
                    audioController.toggleSound();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FF5722]/10 hover:border-[#FF5722]/30 border border-transparent text-xs text-left group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-4 h-4 text-[#FF5722]" />
                    <span className="font-medium text-[#111820]">Toggle Sound Effects Audio Engine</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#FF5722] transition-opacity" />
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onToggleTheme();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FF5722]/10 hover:border-[#FF5722]/30 border border-transparent text-xs text-left group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Palette className="w-4 h-4 text-[#FF8A50]" />
                    <span className="font-medium text-[#111820]">Switch Theme Palette</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#FF8A50] transition-opacity" />
                </button>
              </div>
            </div>

            {/* Sections */}
            {navMatches.length > 0 && (
              <div>
                <h5 className="text-[11px] font-mono uppercase tracking-wider text-[#111820]/50 mb-2 font-semibold">
                  Sections Navigation
                </h5>
                <div className="grid grid-cols-2 gap-1.5">
                  {navMatches.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => handleJump(sec.id)}
                      className="flex items-center justify-between p-2 rounded-xl bg-[#F7F5F1] hover:bg-[#FF5722]/10 border border-[#E9E5DE] hover:border-[#FF5722]/40 text-xs text-[#111820] hover:text-[#FF5722] transition-all"
                    >
                      <span className="font-mono">// {sec.label}</span>
                      <ArrowRight className="w-3 h-3 text-[#FF5722]" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projectMatches.length > 0 && (
              <div>
                <h5 className="text-[11px] font-mono uppercase tracking-wider text-[#111820]/50 mb-2 font-semibold">
                  Featured Projects
                </h5>
                <div className="space-y-1">
                  {projectMatches.map((proj) => (
                    <button
                      key={proj.id}
                      onClick={() => handleJump('projects')}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#F7F5F1] hover:bg-[#FF5722]/10 border border-[#E9E5DE] hover:border-[#FF5722]/40 text-xs text-left group transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Code className="w-4 h-4 text-[#FF5722]" />
                        <div>
                          <p className="font-semibold text-[#111820]">{proj.title}</p>
                          <p className="text-[11px] text-[#111820]/60 line-clamp-1">{proj.shortDescription}</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-white text-[10px] text-[#FF5722] font-mono border border-[#E9E5DE]">
                        {proj.category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Navigation Hints */}
          <div className="p-3 bg-[#F7F5F1] border-t border-[#E9E5DE] flex items-center justify-between text-[11px] font-mono text-[#111820]/60">
            <span>Navigation Shortcuts</span>
            <div className="flex items-center gap-3">
              <span><kbd className="px-1.5 py-0.5 bg-white rounded border border-[#E9E5DE]">ESC</kbd> Close</span>
              <span><kbd className="px-1.5 py-0.5 bg-white rounded border border-[#E9E5DE]">Ctrl+K</kbd> Toggle</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
});

CommandPalette.displayName = 'CommandPalette';
