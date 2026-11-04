import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Send, Sparkles, ArrowDown, FolderGit2, Trophy, Award, Cpu } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { AvatarHoloRing } from '../3d/AvatarHoloRing';
import { audioController } from '../../utils/AudioController';

interface HeroSectionProps {
  onOpenResumeModal: () => void;
  onSectionChange: (id: string) => void;
}

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
            setIsDeleting(false);
            setTypingIndex((prev) => (prev + 1) % titles.length);
          }
        }
      },
      isDeleting ? 45 : 90
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722] text-xs font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-ping" />
              <span>AVAILABLE FOR AI & FULL-STACK ROLES / HACKATHONS</span>
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-[#111820] leading-tight">
              HI, I'M <span className="text-gradient-google">{PORTFOLIO_DATA.personal.name}</span>
            </h1>

            {/* Typing Effect Subtitle */}
            <div className="h-10 text-xl sm:text-2xl font-mono text-[#FF5722] font-semibold flex items-center gap-2">
              <span>&gt;</span>
              <span>{currentText}</span>
              <span className="w-2.5 h-6 bg-[#FF5722] animate-pulse" />
            </div>

            {/* Bio */}
            <p className="text-[#111820]/75 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed font-sans">
              {PORTFOLIO_DATA.personal.bio}
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={handleGoToResume}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#FF5722] hover:bg-[#E64A19] text-white font-display font-bold text-sm shadow-sm hover:scale-105 transition-all duration-200"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume</span>
              </button>

              <button
                onClick={handleGoToContact}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-[#FF8A50] text-[#FF5722] font-display font-semibold text-sm hover:bg-[#FF8A50]/10 hover:scale-105 transition-all duration-200 shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>Hire Me</span>
              </button>

              <button
                onClick={handleGoToProjects}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-[#E9E5DE] text-[#111820] font-display font-medium text-sm hover:border-[#FF5722] hover:text-[#FF5722] transition-all duration-200 shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-[#FF8A50]" />
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
            { label: 'Projects Completed', value: `${PORTFOLIO_DATA.personal.stats.projectsCompleted}+`, icon: FolderGit2, color: 'text-[#FF5722]' },
            { label: 'Hackathons Won', value: `${PORTFOLIO_DATA.personal.stats.hackathonsWon}+`, icon: Trophy, color: 'text-[#FF8A50]' },
            { label: 'Certifications', value: `${PORTFOLIO_DATA.personal.stats.certificationsCount}+`, icon: Award, color: 'text-[#FF5722]' },
            { label: 'Technologies', value: `${PORTFOLIO_DATA.personal.stats.technologiesMastered}+`, icon: Cpu, color: 'text-[#FF8A50]' }
          ].map((st, i) => {
            const IconComponent = st.icon;
            return (
              <div
                key={i}
                className="bg-white p-5 rounded-2xl border border-[#E9E5DE] shadow-card hover:shadow-card-hover flex items-center gap-4 group transition-all duration-300"
              >
                <div className={`p-3 rounded-xl bg-[#F7F5F1] border border-[#E9E5DE] ${st.color} group-hover:scale-105 transition-transform`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#111820]">
                    {st.value}
                  </div>
                  <div className="text-xs font-mono text-[#111820]/60 uppercase tracking-wider">
                    {st.label}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Down Scroll Arrow */}
      <div 
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#111820]/60 hover:text-[#FF5722] text-xs font-mono animate-bounce cursor-pointer transition-colors" 
        onClick={handleGoToProjects}
      >
        <span>VIEW PROJECTS</span>
        <ArrowDown className="w-4 h-4 text-[#FF5722]" />
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';
