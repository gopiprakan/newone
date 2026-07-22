import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Layers, AlertTriangle, Lightbulb, CheckCircle2 } from 'lucide-react';
import { Project } from '../../data/portfolioData';
import { audioController } from '../../utils/AudioController';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

/**
 * PERFORMANCE OPTIMIZED PROJECT MODAL
 * Optimizations implemented:
 * 1. React.memo: Prevents re-rendering modal when unrelated App state changes.
 * 2. Image Optimization: Lazy loading, async decoding & explicit dimensions on screenshot gallery.
 */
export const ProjectModal: React.FC<ProjectModalProps> = React.memo(({ project, onClose }) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  if (!project) return null;

  const currentHeroImg = selectedImg || project.image;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl overflow-y-auto gpu-accelerated">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-5xl bg-[#2d2e31] border border-[#3c4043] rounded-3xl shadow-2xl overflow-hidden text-[#e8eaed] my-auto gpu-accelerated"
        >
          {/* Close Button */}
          <button
            onClick={() => {
              audioController.playClick();
              onClose();
            }}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#202124] border border-[#3c4043] text-slate-300 hover:text-[#4285F4] hover:border-[#4285F4] transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Project Screenshot Hero & Gallery */}
          <div className="relative h-64 sm:h-80 md:h-96 w-full bg-[#202124] overflow-hidden group">
            <img
              src={currentHeroImg}
              alt={project.title}
              loading="lazy"
              decoding="async"
              width={900}
              height={400}
              className="w-full h-full object-cover filter brightness-105 contrast-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2d2e31] via-[#2d2e31]/40 to-transparent" />

            {/* Thumbnail Gallery Overlay */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center gap-3 overflow-x-auto pb-1">
              {project.screenshots.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(s)}
                  className={`w-16 h-12 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    currentHeroImg === s ? 'border-[#4285F4] scale-105 shadow-google-blue' : 'border-[#3c4043] opacity-60'
                  }`}
                >
                  <img src={s} alt="screenshot" loading="lazy" decoding="async" width={64} height={48} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 md:p-8 space-y-8 max-h-[60vh] overflow-y-auto font-sans">
            {/* Title & CTAs */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#3c4043] pb-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#4285F4]/10 border border-[#4285F4]/30 text-[#8ab4f8] text-xs font-mono mb-2">
                  {project.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gradient-google">
                  {project.title}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#202124] border border-[#3c4043] text-xs font-mono font-medium hover:border-[#4285F4] hover:text-[#8ab4f8] transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#4285F4] hover:bg-[#3367d6] text-white font-bold text-xs shadow-google-blue transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Live App</span>
                </a>
              </div>
            </div>

            {/* Problem & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-[#202124] border border-[#EA4335]/30 space-y-2">
                <div className="flex items-center gap-2 text-[#EA4335] font-mono text-xs font-semibold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>PROBLEM STATEMENT</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{project.problemStatement}</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#202124] border border-[#34A853]/30 space-y-2">
                <div className="flex items-center gap-2 text-[#34A853] font-mono text-xs font-semibold">
                  <Lightbulb className="w-4 h-4" />
                  <span>ENGINEERED SOLUTION</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{project.solution}</p>
              </div>
            </div>

            {/* Key Features & Tech Badges */}
            <div className="space-y-4">
              <h4 className="text-sm font-mono uppercase tracking-wider text-[#4285F4]">
                // KEY ARCHITECTURAL FEATURES
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#202124] border border-[#3c4043] text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#4285F4] shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Badges */}
            <div className="space-y-3">
              <h4 className="text-sm font-mono uppercase tracking-wider text-[#FBBC04]">
                // TECHNOLOGIES UTILIZED
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-[#202124] border border-[#3c4043] text-xs font-mono text-[#8ab4f8]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Architecture & Challenges */}
            <div className="p-5 rounded-2xl bg-[#202124] border border-[#3c4043] space-y-3">
              <div className="flex items-center gap-2 text-[#4285F4] font-mono text-xs font-semibold">
                <Layers className="w-4 h-4" />
                <span>SYSTEM ARCHITECTURE & CHALLENGES</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{project.architecture}</p>
              <p className="text-xs text-slate-400 leading-relaxed italic">
                <strong className="text-slate-300 font-normal">Challenge Highlight:</strong> {project.challenges}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
});

ProjectModal.displayName = 'ProjectModal';
