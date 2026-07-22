import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, ExternalLink, Eye } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { audioController } from '../../utils/AudioController';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * PERFORMANCE OPTIMIZED RESUME MODAL
 * Optimizations implemented:
 * 1. React.memo: Prevents modal re-renders when closed or parent re-renders.
 * 2. Perfectly Centered Viewport: Centered in the middle of the screen with balanced top/bottom margins.
 * 3. Lock Body Scroll: Disables background document scrolling while viewing PDF.
 */
export const ResumeModal: React.FC<ResumeModalProps> = React.memo(({ isOpen, onClose }) => {
  const [viewMode, setViewMode] = useState<'pdf' | 'text'>('pdf');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownload = () => {
    audioController.playClick();
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Gopiprakan_S_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenNewTab = () => {
    audioController.playClick();
    window.open('/resume.pdf', '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/90 backdrop-blur-2xl gpu-accelerated">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-5xl h-[80vh] sm:h-[84vh] max-h-[780px] flex flex-col bg-[#2d2e31] border border-[#3c4043] rounded-3xl shadow-2xl overflow-hidden text-[#e8eaed] p-4 sm:p-6 my-auto gpu-accelerated"
        >
          {/* Top Bar Actions */}
          <div className="flex-none flex flex-wrap items-center justify-between gap-3 border-b border-[#3c4043] pb-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#4285F4]/10 border border-[#4285F4]/30 text-[#4285F4]">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-xl font-display font-bold text-gradient-google">
                  CURRICULUM VITAE
                </h3>
                <span className="text-[11px] sm:text-xs font-mono text-slate-400">GOPIPRAKAN S // OFFICIAL RESUME PDF</span>
              </div>
            </div>

            {/* View Mode Toggle & Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {/* Mode Toggle */}
              <div className="flex items-center p-1 rounded-xl bg-[#202124] border border-[#3c4043] text-xs font-mono">
                <button
                  onClick={() => {
                    audioController.playClick();
                    setViewMode('pdf');
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all ${
                    viewMode === 'pdf'
                      ? 'bg-[#4285F4] text-white font-bold shadow-google-blue'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>PDF Viewer</span>
                </button>

                <button
                  onClick={() => {
                    audioController.playClick();
                    setViewMode('text');
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all ${
                    viewMode === 'text'
                      ? 'bg-[#4285F4] text-white font-bold shadow-google-blue'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Text Summary</span>
                </button>
              </div>

              {/* Open PDF in New Tab */}
              <button
                onClick={handleOpenNewTab}
                title="Open PDF in New Tab"
                className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl bg-[#202124] border border-[#3c4043] text-[#4285F4] hover:bg-[#4285F4]/20 hover:text-white text-xs font-semibold transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Open PDF</span>
              </button>

              {/* Direct Download PDF Button */}
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:py-2 rounded-xl bg-[#4285F4] hover:bg-[#3367d6] text-white font-bold text-xs shadow-google-blue transition-all"
              >
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Download PDF</span>
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 rounded-xl bg-[#202124] border border-[#3c4043] text-slate-400 hover:text-[#4285F4] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content Mode */}
          {viewMode === 'pdf' ? (
            <div className="flex-1 w-full h-full min-h-0 relative rounded-2xl overflow-hidden border border-[#3c4043] bg-[#202124] shadow-2xl flex flex-col">
              <iframe
                src="/resume.pdf#toolbar=1"
                title="Gopiprakan S Resume PDF"
                className="w-full h-full border-0 flex-1"
              />
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto bg-[#202124] border border-[#3c4043] rounded-2xl p-4 sm:p-6 space-y-6 font-sans">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#3c4043] pb-4 gap-2">
                <div>
                  <h2 className="text-2xl font-bold text-[#e8eaed]">{PORTFOLIO_DATA.personal.name}</h2>
                  <p className="text-xs font-mono text-[#8ab4f8]">{PORTFOLIO_DATA.personal.title}</p>
                </div>
                <div className="text-xs font-mono text-slate-400 space-y-1">
                  <p>Email: {PORTFOLIO_DATA.personal.email}</p>
                  <p>Phone: {PORTFOLIO_DATA.personal.phone}</p>
                  <p>Location: {PORTFOLIO_DATA.personal.location}</p>
                </div>
              </div>

              {/* Executive Summary */}
              <div>
                <h4 className="text-xs font-mono font-bold text-[#EA4335] uppercase tracking-wider mb-2">// Executive Summary</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{PORTFOLIO_DATA.personal.bio}</p>
              </div>

              {/* Education Summary */}
              <div>
                <h4 className="text-xs font-mono font-bold text-[#4285F4] uppercase tracking-wider mb-3">// Education & Degrees</h4>
                <div className="space-y-3">
                  {PORTFOLIO_DATA.education.map((e) => (
                    <div key={e.id} className="p-3.5 rounded-xl bg-[#2d2e31] border border-[#3c4043] text-xs">
                      <div className="flex justify-between text-slate-200 font-semibold mb-1">
                        <span>{e.degree}</span>
                        <span className="text-[#8ab4f8] font-mono">{e.duration}</span>
                      </div>
                      <p className="text-slate-400">{e.institution} — CGPA: {e.cgpa}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Experience */}
              <div>
                <h4 className="text-xs font-mono font-bold text-[#34A853] uppercase tracking-wider mb-3">// Experience & Projects</h4>
                <div className="space-y-4">
                  {PORTFOLIO_DATA.experience.map((exp) => (
                    <div key={exp.id} className="p-4 rounded-xl bg-[#2d2e31] border border-[#3c4043] text-xs space-y-2">
                      <div className="flex justify-between text-slate-100 font-semibold">
                        <span>{exp.role} @ {exp.company}</span>
                        <span className="text-[#8ab4f8] font-mono">{exp.period}</span>
                      </div>
                      <ul className="space-y-1 text-slate-300">
                        {exp.description.map((d, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#4285F4]">•</span>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
});

ResumeModal.displayName = 'ResumeModal';
