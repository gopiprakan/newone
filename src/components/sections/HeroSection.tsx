import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Send, Sparkles, ArrowDown, FolderGit2, Trophy, Award, Cpu } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { AvatarHoloRing } from '../3d/AvatarHoloRing';
import { audioController } from '../../utils/AudioController';

iinterface HeroSectionProps {
  onOpenResumeModal: () => void;
  onSectionChange: (id: string) => void;
}

/**
 * PERFORMANCE OPTIMIZED HERO SECTION
 * Optimizations implemented:
 * 1. React.memo: Prevents unnecessary section re-evaluations during parent re-renders.
 * 2. Timer Cleanup: Properly disposes typing effect timers to prevent memory leaks.
 * 3. Hardware Layer Promotion: Applies GPU acceleration rules to text layout and stat cards.
 */
export const HeroSection: React.FC<HeroSectionProps> = React.memo(({ onOpenResumeModal, onSectionChange }) => {
  const [typingIndex, setTypingIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const titles = PORTFOLIO_DATA.personal.typingTitles;

  useEffect(() => {
    const fullText = titles[typingIndex];
    let subTimeout: number;

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          setCurrentText(fullText.substring(0, currentText.length + 1));
          if (currentText === fullText) {
            subTimeout = window.setTimeout(() => setIsDeleting(true), 1800);
          }
        } else {
          setCurrentText(fullText.substring(0, currentText.length - 1));
          if (currentText === '') {
            isDeleting(false);
            setTypingIndex((prev) => (prev + 1) % titles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => {
      clearTimeout(timer);
      if (subTimeout) clearTimeout(subTimeout);
    };
  }, [currentText, isDeleting, typingIndex, titles]);

  const handleGoToProjects = () => {
    audioController.playClick();
    onSectionChange('projects');
  };

  const handleGoToContact = () => {
    audioController.playClick();
    onSectionChange('contact');
  };

  const handleGoToResume = () => {
    audioController.playClick();
    onSectionChange('resume');
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center overflow-hidden gpu-accelerated">
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5F1F]/10 border border-[#FF5F1F]/30 text-[#FFA726] text-xs font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#FF5F1F] animate-ping" />
              <span>AVAILABLE FOR AI & FULL-STACK ROLES / HACKATHONS</span>
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-[#e8eaed] leading-tight">
              HI, I'M <span className="text-gradient-google">{PORTFOLIO_DATA.personal.name}</span>
            </h1>

            {/* Typing Effect Subtitle */}
            <div className="h-10 text-xl sm:text-2xl font-mono text-[#FFA726] font-medium flex items-center gap-2">
              <span>&gt;</span>
              <span>{currentText}</span>
              <span className="w-2.5 h-6 bg-[#FF5F1F] animate-pulse" />
            </div>

            {/* Bio */}
            <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed font-sans">
              {PORTFOLIO_DATA.personal.bio}
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={handleGoToResume}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#FF5F1F] hover:bg-[#E64A19] text-white font-display font-bold text-sm shadow-google-blue hover:scale-105 transition-all duration-300"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume</span>
              </button>

              <button
                onClick={handleGoToContact}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#121212] border border-[#FF3D00]/40 text-[#FF8A50] font-display font-semibold text-sm hover:bg-[#FF3D00]/15 hover:border-[#FF3D00] hover:scale-105 transition-all duration-300"
              >
                <Send className="w-4 h-4" />
                <span>Hire Me</span>
              </button>

              <button
                onClick={handleGoToProjects}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#121212] border border-[#262626] text-slate-300 font-display font-medium text-sm hover:border-[#FF5F1F] hover:text-[#FFA726] transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 text-[#FF8F00]" />
                <span>View Projects</span>
              </button>
            </div>
          </motion.div>

          {/* Right 3D Avatar Stage */}
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
            { label: 'Projects Completed', value: `${PORTFOLIO_DATA.personal.stats.projectsCompleted}+`, icon: FolderGit2, color: 'text-[#FF5F1F]' },
            { label: 'Hackathons Won', value: `${PORTFOLIO_DATA.personal.stats.hackathonsWon}+`, icon: Trophy, color: 'text-[#FF8F00]' },
            { label: 'Certifications', value: `${PORTFOLIO_DATA.personal.stats.certificationsCount}+`, icon: Award, color: 'text-[#FF3D00]' },
            { label: 'Technologies', value: `${PORTFOLIO_DATA.personal.stats.technologiesMastered}+`, icon: Cpu, color: 'text-[#FF5F1F]' }
          ].map((st, i) => {
            const IconComponent = st.icon;
            return (
              <div
                key={i}
                className="glass-panel glass-panel-hover p-5 rounded-2xl border border-[#262626] flex items-center gap-4 group"
              >
                <div className={`p-3 rounded-xl bg-[#050505] border border-[#262626] ${st.color} group-hover:scale-110 transition-transform`}>
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
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 text-xs font-mono animate-bounce cursor-pointer" onClick={handleGoToProjects}>
        <span>VIEW PROJECTS</span>
        <ArrowDown className="w-4 h-4 text-[#FF5F1F]" />
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';
