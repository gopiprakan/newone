import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, ExternalLink, Eye } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { audioController } from '../../utils/AudioController';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[#111820]/60 backdrop-blur-md gpu-accelerated">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-5xl h-[80vh] sm:h-[84vh] max-h-[780px] flex flex-col bg-white border border-[#E9E5DE] rounded-3xl shadow-2xl overflow-hidden text-[#111820] p-4 sm:p-6 my-auto gpu-accelerated"
        >
          {/* Top Bar Actions */}
          <div className="flex-none flex flex-wrap items-center justify-between gap-3 border-b border-[#E9E5DE] pb-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722]">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-xl font-display font-bold text-[#111820]">
                  CURRICULUM VITAE
                </h3>
                <span className="text-[11px] sm:text-xs font-mono text-[#111820]/60">GOPIPRAKAN S // OFFICIAL RESUME PDF</span>
              </div>
            </div>

            {/* View Mode Toggle & Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {/* Mode Toggle */}
              <div className="flex items-center p-1 rounded-xl bg-[#F7F5F1] border border-[#E9E5DE] text-xs font-mono">
                <button
                  onClick={() => {
                    audioController.playClick();
                    setViewMode('pdf');
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all ${
                    viewMode === 'pdf'
                      ? 'bg-[#FF5722] text-white font-bold shadow-sm'
                      : 'text-[#111820]/60 hover:text-[#111820]'
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
                      ? 'bg-[#FF5722] text-white font-bold shadow-sm'
                      : 'text-[#111820]/60 hover:text-[#111820]'
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
                className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl bg-[#F7F5F1] border border-[#E9E5DE] text-[#FF5722] hover:bg-[#FF5722] hover:text-white text-xs font-semibold transition-all shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Open PDF</span>
              </button>

              {/* Direct Download PDF Button */}
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:py-2 rounded-xl bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold text-xs shadow-sm transition-all"
              >
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Download PDF</span>
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 rounded-xl bg-[#F7F5F1] border border-[#E9E5DE] text-[#111820] hover:text-[#FF5722] transition-colors shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content Mode */}
          {viewMode === 'pdf' ? (
            <div className="flex-1 w-full h-full min-h-0 relative rounded-2xl overflow-hidden border border-[#E9E5DE] bg-[#F7F5F1] shadow-inner flex flex-col">
              <iframe
                src="/resume.pdf#toolbar=1"
                title="Gopiprakan S Resume PDF"
                className="w-full h-full border-0 flex-1"
              />
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto bg-[#F7F5F1] border border-[#E9E5DE] rounded-2xl p-4 sm:p-6 space-y-6 font-sans">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#E9E5DE] pb-4 gap-2">
                <div>
                  <h2 className="text-2xl font-bold text-[#111820]">{PORTFOLIO_DATA.personal.name}</h2>
                  <p className="text-xs font-mono text-[#FF5722] font-semibold">{PORTFOLIO_DATA.personal.title}</p>
                </div>
                <div className="text-xs font-mono text-[#111820]/60 space-y-1">
                  <p>Email: {PORTFOLIO_DATA.personal.email}</p>
                  <p>Phone: {PORTFOLIO_DATA.personal.phone}</p>
                  <p>Location: {PORTFOLIO_DATA.personal.location}</p>
                </div>
              </div>

              {/* Executive Summary */}
              <div>
                <h4 className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-wider mb-2">// Executive Summary</h4>
                <p className="text-xs text-[#111820]/80 leading-relaxed">{PORTFOLIO_DATA.personal.bio}</p>
              </div>

              {/* Education Summary */}
              <div>
                <h4 className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-wider mb-3">// Education & Degrees</h4>
                <div className="space-y-3">
                  {PORTFOLIO_DATA.education.map((e) => (
                    <div key={e.id} className="p-3.5 rounded-xl bg-white border border-[#E9E5DE] text-xs shadow-sm">
                      <div className="flex justify-between text-[#111820] font-semibold mb-1">
                        <span>{e.degree}</span>
                        <span className="text-[#FF5722] font-mono">{e.duration}</span>
                      </div>
                      <p className="text-[#111820]/70">{e.institution} — CGPA: {e.cgpa}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Experience */}
              <div>
                <h4 className="text-xs font-mono font-bold text-[#FF5722] uppercase tracking-wider mb-3">// Experience & Projects</h4>
                <div className="space-y-4">
                  {PORTFOLIO_DATA.experience.map((exp) => (
                    <div key={exp.id} className="p-4 rounded-xl bg-white border border-[#E9E5DE] text-xs space-y-2 shadow-sm">
                      <div className="flex justify-between text-[#111820] font-semibold">
                        <span>{exp.role} @ {exp.company}</span>
                        <span className="text-[#FF5722] font-mono">{exp.period}</span>
                      </div>
                      <ul className="space-y-1 text-[#111820]/75">
                        {exp.description.map((d, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#FF5722]">•</span>
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
