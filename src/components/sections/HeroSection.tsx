import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Send, Sparkles, ArrowDown, FolderGit2, Trophy, Award, Cpu } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { AvatarHoloRing } from '../3d/AvatarHoloRing';
import { audioController } from '../../utils/AudioController';

interface HeroSectionProps {
  onOpenResumeModal: () => void;
}

/**
 * PERFORMANCE OPTIMIZED HERO SECTION
 * Optimizations implemented:
 * 1. React.memo: Prevents unnecessary section re-evaluations during parent re-renders.
 * 2. Timer Cleanup: Properly disposes typing effect timers to prevent memory leaks.
 * 3. Hardware Layer Promotion: Applies GPU acceleration rules to text layout and stat cards.
 */
export const HeroSection: React.FC<HeroSectionProps> = React.memo(({ onOpenResumeModal }) => {
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
            setIsDeleting(false);
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

  const scrollToProjects = () => {
    audioController.playClick();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    audioController.playClick();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4285F4]/10 border border-[#4285F4]/30 text-[#8ab4f8] text-xs font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#4285F4] animate-ping" />
              <span>AVAILABLE FOR AI & FULL-STACK ROLES / HACKATHONS</span>
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-[#e8eaed] leading-tight">
              HI, I'M <span className="text-gradient-google">{PORTFOLIO_DATA.personal.name}</span>
            </h1>

            {/* Typing Effect Subtitle */}
            <div className="h-10 text-xl sm:text-2xl font-mono text-[#8ab4f8] font-medium flex items-center gap-2">
              <span>&gt;</span>
              <span>{currentText}</span>
              <span className="w-2.5 h-6 bg-[#4285F4] animate-pulse" />
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
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#4285F4] hover:bg-[#3367d6] text-white font-display font-bold text-sm shadow-google-blue hover:scale-105 transition-all duration-300"
              >
                <FileText className="w-4 h-4" />
                <span>Download Resume</span>
              </button>

              <button
                onClick={scrollToContact}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#2d2e31] border border-[#EA4335]/40 text-[#f28b82] font-display font-semibold text-sm hover:bg-[#EA4335]/15 hover:border-[#EA4335] hover:scale-105 transition-all duration-300"
              >
                <Send className="w-4 h-4" />
                <span>Hire Me</span>
              </button>

              <button
                onClick={scrollToProjects}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#2d2e31] border border-[#3c4043] text-slate-300 font-display font-medium text-sm hover:border-[#4285F4] hover:text-[#8ab4f8] transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 text-[#FBBC04]" />
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
            { label: 'Projects Completed', value: `${PORTFOLIO_DATA.personal.stats.projectsCompleted}+`, icon: FolderGit2, color: 'text-[#4285F4]' },
            { label: 'Hackathons Won', value: `${PORTFOLIO_DATA.personal.stats.hackathonsWon}+`, icon: Trophy, color: 'text-[#FBBC04]' },
            { label: 'Certifications', value: `${PORTFOLIO_DATA.personal.stats.certificationsCount}+`, icon: Award, color: 'text-[#EA4335]' },
            { label: 'Technologies', value: `${PORTFOLIO_DATA.personal.stats.technologiesMastered}+`, icon: Cpu, color: 'text-[#34A853]' }
          ].map((st, i) => {
            const IconComponent = st.icon;
            return (
              <div
                key={i}
                className="glass-panel glass-panel-hover p-5 rounded-2xl border border-[#3c4043] flex items-center gap-4 group"
              >
                <div className={`p-3 rounded-xl bg-[#202124] border border-[#3c4043] ${st.color} group-hover:scale-110 transition-transform`}>
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
        <ArrowDown className="w-4 h-4 text-[#4285F4]" />
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';
