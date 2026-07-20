import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Layers, Cpu, AlertTriangle, Lightbulb, Play, CheckCircle2, ChevronRight } from 'lucide-react';
import { Project } from '../../data/portfolioData';
import { audioController } from '../../utils/AudioController';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  if (!project) return null;

  const currentHeroImg = selectedImg || project.image;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/85 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-5xl bg-[#080d1b] border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden text-slate-100 my-auto"
        >
          {/* Close Button */}
          <button
            onClick={() => {
              audioController.playClick();
              onClose();
            }}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Project Screenshot Hero & Gallery */}
          <div className="relative h-64 sm:h-80 md:h-96 w-full bg-slate-950 overflow-hidden group">
            <img
              src={currentHeroImg}
              alt={project.title}
              className="w-full h-full object-cover filter brightness-105 contrast-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080d1b] via-[#080d1b]/40 to-transparent" />

            {/* Thumbnail Gallery Overlay */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center gap-3 overflow-x-auto pb-1">
              {project.screenshots.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(s)}
                  className={`w-16 h-12 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    currentHeroImg === s ? 'border-cyan-400 scale-105 shadow-neon-cyan' : 'border-slate-700 opacity-60'
                  }`}
                >
                  <img src={s} alt="screenshot" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 md:p-8 space-y-8 max-h-[60vh] overflow-y-auto font-sans">
            {/* Title & CTAs */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
                  {project.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gradient-cyan">
                  {project.title}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono font-medium hover:border-cyan-400 hover:text-cyan-300 transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-slate-950 font-bold text-xs shadow-neon-cyan hover:brightness-110 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Live App</span>
                </a>
              </div>
            </div>

            {/* Problem & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-rose-500/20 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-semibold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>PROBLEM STATEMENT</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{project.problemStatement}</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-emerald-500/20 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
                  <Lightbulb className="w-4 h-4" />
                  <span>ENGINEERED SOLUTION</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{project.solution}</p>
              </div>
            </div>

            {/* Key Features & Tech Badges */}
            <div className="space-y-4">
              <h4 className="text-sm font-mono uppercase tracking-wider text-cyan-400">
                // KEY ARCHITECTURAL FEATURES
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Badges */}
            <div className="space-y-3">
              <h4 className="text-sm font-mono uppercase tracking-wider text-purple-400">
                // TECHNOLOGIES UTILIZED
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-slate-900 border border-cyan-500/20 text-xs font-mono text-cyan-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Architecture & Challenges */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-cyan-500/20 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold">
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
};
