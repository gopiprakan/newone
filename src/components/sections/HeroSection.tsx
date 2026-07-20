import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Send, Sparkles, ArrowDown, FolderGit2, Trophy, Award, Cpu } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { AvatarHoloRing } from '../3d/AvatarHoloRing';
import { audioController } from '../../utils/AudioController';

interface HeroSectionProps {
  onOpenResumeModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResumeModal }) => {
  const [typingIndex, setTypingIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const titles = PORTFOLIO_DATA.personal.typingTitles;

  useEffect(() => {
    const fullText = titles[typingIndex];

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          setCurrentText(fullText.substring(0, currentText.length + 1));
          if (currentText === fullText) {
            setTimeout(() => setIsDeleting(true), 1800);
          }
        } else {
          setCurrentText(fullText.substring(0, currentText.length - 1));
          if (currentText === '') {
            setIsDeleting(false);
            setTypingIndex((prev) => (prev + 1) % titles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, typingIndex, titles]);

  const scrollToProjects = () => {
    audioController.playClick();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    audioController.playClick();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Intro Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono shadow-neon-cyan">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>AVAILABLE FOR AI & FULL-STACK ROLES / HACKATHONS</span>
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-slate-100 leading-tight">
              HI, I'M <span className="text-gradient-cyan">{PORTFOLIO_DATA.personal.name}</span>
            </h1>

            {/* Typing Effect Subtitle */}
            <div className="h-10 text-xl sm:text-2xl font-mono text-purple-400 font-medium flex items-center gap-2">
              <span>&gt;</span>
              <span>{currentText}</span>
              <span className="w-2.5 h-6 bg-cyan-400 animate-pulse" />
            </div>

            {/* Bio */}
            <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed font-sans">
              {PORTFOLIO_DATA.personal.bio}
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => {
                  audioController.playClick();
                  onOpenResumeModal();
                }}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-slate-950 font-display font-bold text-sm shadow-neon-cyan hover:scale-105 transition-all duration-300"
              >
                <FileText className="w-4 h-4" />
                <span>Download Resume</span>
              </button>

              <button
                onClick={scrollToContact}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 border border-purple-500/40 text-purple-300 font-display font-semibold text-sm hover:bg-purple-500/20 hover:border-purple-400 hover:scale-105 transition-all duration-300"
              >
                <Send className="w-4 h-4" />
                <span>Hire Me</span>
              </button>

              <button
                onClick={scrollToProjects}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900/60 border border-slate-700 text-slate-300 font-display font-medium text-sm hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>View Projects</span>
              </button>
            </div>
          </motion.div>

          {/* Right 3D Avatar Holo Rings Stage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <AvatarHoloRing />
          </motion.div>
        </div>

        {/* Below Hero Animated Statistics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Projects Completed', value: `${PORTFOLIO_DATA.personal.stats.projectsCompleted}+`, icon: FolderGit2, color: 'text-cyan-400' },
            { label: 'Hackathons Won', value: `${PORTFOLIO_DATA.personal.stats.hackathonsWon}+`, icon: Trophy, color: 'text-amber-400' },
            { label: 'Certifications', value: `${PORTFOLIO_DATA.personal.stats.certificationsCount}+`, icon: Award, color: 'text-purple-400' },
            { label: 'Technologies', value: `${PORTFOLIO_DATA.personal.stats.technologiesMastered}+`, icon: Cpu, color: 'text-emerald-400' }
          ].map((st, i) => {
            const IconComponent = st.icon;
            return (
              <div
                key={i}
                className="glass-panel glass-panel-hover p-5 rounded-2xl border border-slate-800 flex items-center gap-4 group"
              >
                <div className={`p-3 rounded-xl bg-slate-900 border border-slate-800 ${st.color} group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <div className={`text-2xl sm:text-3xl font-display font-extrabold ${st.color}`}>
                    {st.value}
                  </div>
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    {st.label}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Down Scroll Arrow */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 text-xs font-mono animate-bounce cursor-pointer" onClick={scrollToProjects}>
        <span>SCROLL DOWN</span>
        <ArrowDown className="w-4 h-4 text-cyan-400" />
      </div>
    </section>
  );
};
