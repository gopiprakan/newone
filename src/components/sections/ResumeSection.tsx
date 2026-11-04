import React, { useState } from 'react';
import { Download, FileText, ExternalLink, Eye, Cpu } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { audioController } from '../../utils/AudioController';

export const ResumeSection: React.FC = React.memo(() => {
  const [viewMode, setViewMode] = useState<'pdf' | 'text'>('pdf');

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
    <section id="resume" className="py-24 relative z-10 border-t border-[#E9E5DE] gpu-accelerated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722] text-xs font-mono">
            <FileText className="w-3.5 h-3.5" />
            <span>CURRICULUM VITAE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#111820]">
            PROFESSIONAL <span className="text-gradient-google">RESUME</span>
          </h2>
          <p className="text-sm font-mono text-[#111820]/70">
            View or download my verified academic credentials, technical qualifications, and development experience.
          </p>
        </div>

        {/* Resume Stage Controls & Content Container */}
        <div className="w-full bg-white border border-[#E9E5DE] rounded-3xl shadow-card overflow-hidden text-[#111820] p-4 sm:p-6 flex flex-col gpu-accelerated">
          {/* Top Bar Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E9E5DE] pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722]">
                <Cpu className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-display font-bold text-[#111820]">
                  GOPIPRAKAN S // RESUME PORTAL
                </span>
                <p className="text-[10px] sm:text-xs font-mono text-[#111820]/60">STATUS: VERIFIED & COMPILING</p>
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
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
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
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
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
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F7F5F1] border border-[#E9E5DE] text-[#FF5722] hover:bg-[#FF5722] hover:text-white text-xs font-semibold transition-all shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Open PDF</span>
              </button>

              {/* Direct Download PDF Button */}
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 sm:gap-2 px-4 py-2 rounded-xl bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold text-xs shadow-sm transition-all"
              >
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>

          {/* Body Content Mode */}
          {viewMode === 'pdf' ? (
            <div className="w-full h-[650px] relative rounded-2xl overflow-hidden border border-[#E9E5DE] bg-[#F7F5F1] shadow-inner flex flex-col">
              <iframe
                src="/resume.pdf#toolbar=1"
                title="Gopiprakan S Resume PDF"
                className="w-full h-full border-0"
              />
            </div>
          ) : (
            <div className="w-full max-h-[650px] overflow-y-auto bg-[#F7F5F1] border border-[#E9E5DE] rounded-2xl p-4 sm:p-6 space-y-6 font-sans">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#E9E5DE] pb-4 gap-2">
                <div>
                  <h2 className="text-2xl font-bold text-[#111820]">{PORTFOLIO_DATA.personal.name}</h2>
                  <p className="text-xs font-mono text-[#FF5722] font-semibold">{PORTFOLIO_DATA.personal.title}</p>
                </div>
                <div className="text-xs font-mono text-[#111820]/70 space-y-1">
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
        </div>
      </div>
    </section>
  );
});

ResumeSection.displayName = 'ResumeSection';
