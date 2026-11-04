import React, { useState, useEffect, useCallback } from 'react';
import Lenis from 'lenis';

// Layout & 3D Components
import { Preloader } from './components/layout/Preloader';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ParticleCanvas } from './components/3d/ParticleCanvas';

// Section Components
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { AchievementsSection } from './components/sections/AchievementsSection';
import { CertificatesSection } from './components/sections/CertificatesSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { EducationSection } from './components/sections/EducationSection';
import { CodingProfilesSection } from './components/sections/CodingProfilesSection';
import { SocialDashboardSection } from './components/sections/SocialDashboardSection';
import { ContactSection } from './components/sections/ContactSection';
import { ResumeSection } from './components/sections/ResumeSection';

// Widget Modals & Floating Features
import { CustomCursor } from './components/widgets/CustomCursor';
import { AIChatAssistant } from './components/widgets/AIChatAssistant';
import { ProjectModal } from './components/widgets/ProjectModal';
import { AchievementModal } from './components/widgets/AchievementModal';
import { ResumeModal } from './components/widgets/ResumeModal';
import { CommandPalette } from './components/widgets/CommandPalette';
import { ThemeSelector } from './components/widgets/ThemeSelector';

import { Project, Achievement } from './data/portfolioData';

/**
 * HIGH-PERFORMANCE CONTINUOUS SCROLL PORTFOLIO
 * UI Theme: Warm Ivory (#F7F5F1), Vibrant Orange (#FF5722), Deep Charcoal (#111820),
 * Soft Orange (#FF8A50), Warm Grey (#E9E5DE), Pure White (#FFFFFF).
 * Features continuous multi-section scrolling with synchronized scroll-spy navigation.
 */
export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  // Modal States
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [themeSelectorOpen, setThemeSelectorOpen] = useState(false);

  // Initialize Lenis Smooth Scroll with proper RAF cleanup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Section Scroll-Spy to dynamically update active navbar section as user scrolls
  useEffect(() => {
    if (isLoading) return;

    const sectionIds = [
      'home',
      'about',
      'skills',
      'projects',
      'achievements',
      'certificates',
      'experience',
      'education',
      'coding-profiles',
      'social-dashboard',
      'contact',
      'resume'
    ];

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + 140;
          for (let i = sectionIds.length - 1; i >= 0; i--) {
            const el = document.getElementById(sectionIds[i]);
            if (el) {
              const top = el.offsetTop;
              if (scrollPosition >= top) {
                setActiveSection(sectionIds[i]);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading]);

  // Smooth scroll to target section when clicked in navbar, footer, or buttons
  const handleSectionChange = useCallback((id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 76;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, elementPosition - navOffset),
        behavior: 'smooth'
      });
    }
  }, []);

  // Memoized Action Callbacks
  const handlePreloaderComplete = useCallback(() => setIsLoading(false), []);
  const handleOpenCommandPalette = useCallback(() => setCommandPaletteOpen(true), []);
  const handleCloseCommandPalette = useCallback(() => setCommandPaletteOpen(false), []);
  const handleOpenResumeModal = useCallback(() => setResumeModalOpen(true), []);
  const handleCloseResumeModal = useCallback(() => setResumeModalOpen(false), []);
  const handleOpenThemeSelector = useCallback(() => setThemeSelectorOpen(true), []);
  const handleCloseThemeSelector = useCallback(() => setThemeSelectorOpen(false), []);
  const handleSelectProject = useCallback((p: Project) => setSelectedProject(p), []);
  const handleCloseProjectModal = useCallback(() => setSelectedProject(null), []);
  const handleSelectAchievement = useCallback((ach: Achievement) => setSelectedAchievement(ach), []);
  const handleCloseAchievementModal = useCallback(() => setSelectedAchievement(null), []);

  return (
    <div className="min-h-screen bg-[#F7F5F1] text-[#111820] relative font-sans selection:bg-[#FF5722] selection:text-white gpu-accelerated">
      {/* Loading Overlay */}
      {isLoading ? (
        <Preloader onComplete={handlePreloaderComplete} />
      ) : (
        <>
          {/* Ambient Warm Ivory Particle Canvas Background */}
          <ParticleCanvas />

          {/* Sticky Neat Navbar */}
          <Navbar
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            onOpenCommandPalette={handleOpenCommandPalette}
            onOpenResumeModal={handleOpenResumeModal}
            onToggleTheme={handleOpenThemeSelector}
          />

          {/* Continuous Multi-Section Scrolling Container */}
          <main className="relative w-full">
            <HeroSection
              onOpenResumeModal={handleOpenResumeModal}
              onSectionChange={handleSectionChange}
            />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection onSelectProject={handleSelectProject} />
            <AchievementsSection onSelectAchievement={handleSelectAchievement} />
            <CertificatesSection />
            <ExperienceSection />
            <EducationSection />
            <CodingProfilesSection />
            <SocialDashboardSection />
            <ContactSection />
            <ResumeSection />
          </main>

          {/* Footer */}
          <Footer onSectionChange={handleSectionChange} />

          {/* Custom Cursor & Floating Widgets */}
          <CustomCursor />
          <AIChatAssistant />

          {/* Modals */}
          <ProjectModal
            project={selectedProject}
            onClose={handleCloseProjectModal}
          />
          <AchievementModal
            achievement={selectedAchievement}
            onClose={handleCloseAchievementModal}
          />
          <ResumeModal
            isOpen={resumeModalOpen}
            onClose={handleCloseResumeModal}
          />
          <CommandPalette
            isOpen={commandPaletteOpen}
            onClose={handleCloseCommandPalette}
            onOpenResumeModal={handleOpenResumeModal}
            onToggleTheme={handleOpenThemeSelector}
            onSectionChange={handleSectionChange}
          />
          <ThemeSelector
            isOpen={themeSelectorOpen}
            onClose={handleCloseThemeSelector}
          />
        </>
      )}
    </div>
  );
};
