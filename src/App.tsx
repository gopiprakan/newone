import React, { useState, useEffect } from 'react';
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
import { CommandPalette } from './components/widgets/CommandPalette';
import { AIChatAssistant } from './components/widgets/AIChatAssistant';
import { ProjectModal } from './components/widgets/ProjectModal';
import { AchievementModal } from './components/widgets/AchievementModal';
import { ResumeModal } from './components/widgets/ResumeModal';
import { ThemeSelector } from './components/widgets/ThemeSelector';

import { Project, Achievement } from './data/portfolioData';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  // Modal States
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [themeSelectorOpen, setThemeSelectorOpen] = useState(false);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Section Observer for Active Nav pill
  useEffect(() => {
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

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 relative font-sans selection:bg-cyan-500 selection:text-black">
      {/* Loading Overlay */}
      {isLoading ? (
        <Preloader onComplete={() => setIsLoading(false)} />
      ) : (
        <>
          {/* Ambient Particle Canvas Background */}
          <ParticleCanvas />

          {/* Sticky Glass Navbar */}
          <Navbar
            activeSection={activeSection}
            onOpenCommandPalette={() => setCommandPaletteOpen(true)}
            onOpenResumeModal={() => setResumeModalOpen(true)}
            onToggleTheme={() => setThemeSelectorOpen(true)}
          />

          {/* Main Website Content Sections */}
          <main>
            <HeroSection onOpenResumeModal={() => setResumeModalOpen(true)} />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection onSelectProject={(p) => setSelectedProject(p)} />
            <AchievementsSection onSelectAchievement={(ach) => setSelectedAchievement(ach)} />
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
            onClose={() => setSelectedProject(null)}
          />
          <AchievementModal
            achievement={selectedAchievement}
            onClose={() => setSelectedAchievement(null)}
          />
          <ResumeModal
            isOpen={resumeModalOpen}
            onClose={() => setResumeModalOpen(false)}
          />
          <CommandPalette
            isOpen={commandPaletteOpen}
            onClose={() => setCommandPaletteOpen(false)}
            onOpenResumeModal={() => setResumeModalOpen(true)}
            onToggleTheme={() => setThemeSelectorOpen(true)}
          />
          <ThemeSelector
            isOpen={themeSelectorOpen}
            onClose={() => setThemeSelectorOpen(false)}
          />
        </>
      )}
    </div>
  );
};
