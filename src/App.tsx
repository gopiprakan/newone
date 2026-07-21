import React, { useState, useEffect, useCallback } from 'react';
import Lenis from 'lenis';

// Layout & 3D Components
import { Preloader } from './components/layout/Preloader';
import { Navbar, NAV_SECTIONS } from './components/layout/Navbar';
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
 * PERFORMANCE OPTIMIZED APP ROOT
 * Optimizations implemented:
 * 1. useCallback Memoization: Stable prop callback references prevent full-tree re-render cascades.
 * 2. Lenis RAF Cleanup: Tracks requestAnimationFrame handle and cancels on unmount to eliminate ghost animation loops.
 * 3. Passive IntersectionObserver: Monitors active navigation section smoothly without scroll listener thrashing.
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

  // Initialize Lenis Smooth Scroll with proper RAF cancellation
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

  // Section Observer for Active Nav pill
  useEffect(() => {
    if (isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25 }
    );

    NAV_SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isLoading]);

  // Memoized Action Callbacks (Prevents child component re-renders)
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
    <div className="min-h-screen bg-[#030712] text-slate-100 relative font-sans selection:bg-cyan-500 selection:text-black gpu-accelerated">
      {/* Loading Overlay */}
      {isLoading ? (
        <Preloader onComplete={handlePreloaderComplete} />
      ) : (
        <>
          {/* Ambient Particle Canvas Background */}
          <ParticleCanvas />

          {/* Sticky Glass Navbar */}
          <Navbar
            activeSection={activeSection}
            onOpenCommandPalette={handleOpenCommandPalette}
            onOpenResumeModal={handleOpenResumeModal}
            onToggleTheme={handleOpenThemeSelector}
          />

          {/* Main Website Content Sections */}
          <main>
            <HeroSection onOpenResumeModal={handleOpenResumeModal} />
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
          </main>

          {/* Footer */}
          <Footer />

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
