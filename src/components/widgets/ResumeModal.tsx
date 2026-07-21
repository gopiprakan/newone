import React, { useState } from 'react';
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
 * 2. Embedded Live PDF Viewer: Renders /resume.pdf directly with native toolbar download & print controls.
 * 3. Dual Mode: Toggle between live PDF viewer and structured text summary.
 */
export const ResumeModal: React.FC<ResumeModalProps> = React.memo(({ isOpen, onClose }) => {
  const [viewMode, setViewMode] = useState<'pdf' | 'text'>('pdf');

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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl overflow-y-auto gpu-accelerated">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl bg-[#090e1d] border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden text-slate-100 p-4 sm:p-6 md:p-8 my-auto gpu-accelerated"
        >
          {/* Top Bar Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-display font-bold text-gradient-cyan">
                  CURRICULUM VITAE
                </h3>
                <span className="text-xs font-mono text-slate-400">GOPIPRAKAN S // OFFICIAL RESUME PDF</span>
              </div>
            </div>

            {/* View Mode Toggle & Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {/* Mode Toggle */}
              <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
                <button
                  onClick={() => {
                    audioController.playClick();
                    setViewMode('pdf');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    viewMode === 'pdf'
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-neon-cyan'
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
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                    viewMode === 'text'
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-neon-cyan'
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
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/20 text-xs font-semibold transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">Open PDF</span>
              </button>

              {/* Direct Download PDF Button */}
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-slate-950 font-bold text-xs shadow-neon-cyan hover:brightness-110 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content Mode */}
          {viewMode === 'pdf' ? (
            <div className="space-y-3">
              <div className="relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
                <iframe
                  src="/resume.pdf#toolbar=1"
                  title="Gopiprakan S Resume PDF"
                  className="w-full h-[60vh] sm:h-[65vh] rounded-2xl border-0"
                />
              </div>

              {/* PDF Action Quick Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>Viewing Gopiprakan_S_Resume.pdf</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleOpenNewTab}
                    className="text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Fullscreen PDF</span>
                  </button>
                  <span>|</span>
                  <button
                    onClick={handleDownload}
                    className="text-purple-400 font-bold hover:underline flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Copy (PDF)</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#050814] border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 font-sans max-h-[65vh] overflow-y-auto">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800/80 pb-4 gap-2">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">{PORTFOLIO_DATA.personal.name}</h2>
                  <p className="text-xs font-mono text-cyan-400">{PORTFOLIO_DATA.personal.title}</p>
                </div>
                <div className="text-xs font-mono text-slate-400 space-y-1">
                  <p>Email: {PORTFOLIO_DATA.personal.email}</p>
                  <p>Phone: {PORTFOLIO_DATA.personal.phone}</p>
                  <p>Location: {PORTFOLIO_DATA.personal.location}</p>
                </div>
              </div>

              {/* Executive Summary */}
              <div>
                <h4 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider mb-2">// Executive Summary</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{PORTFOLIO_DATA.personal.bio}</p>
              </div>

              {/* Education Summary */}
              <div>
                <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-3">// Education & Degrees</h4>
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

              {/* Key Experience */}
              <div>
                <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-3">// Experience & Projects</h4>
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
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
});

ResumeModal.displayName = 'ResumeModal';
