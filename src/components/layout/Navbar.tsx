import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Volume2,
  VolumeX,
  Search,
  Menu,
  X,
  Palette,
  FileText,
  Sparkles
} from 'lucide-react';
import { audioController } from '../../utils/AudioController';

interface NavbarProps {
  activeSection: string;
  onSectionChange: (id: string) => void;
  onOpenCommandPalette: () => void;
  onOpenResumeModal: () => void;
  onToggleTheme: () => void;
}

export const NAV_SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'coding-profiles', label: 'Coding' },
  { id: 'social-dashboard', label: 'Social Hub' },
  { id: 'contact', label: 'Contact' },
];

/**
 * NEAT & PROFESSIONAL FIXED NAVBAR
 * Designed with solid clean surfaces, warm grey borders, and vibrant orange accents.
 */
export const Navbar: React.FC<NavbarProps> = React.memo(({
  activeSection,
  onSectionChange,
  onOpenCommandPalette,
  onOpenResumeModal,
  onToggleTheme
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const active = audioController.toggleSound();
    setIsMuted(!active);
  };

  const handleSectionChange = (id: string) => {
    audioController.playClick();
    setMobileMenuOpen(false);
    onSectionChange(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 gpu-accelerated ${
        isScrolled
          ? 'py-2.5 bg-white/95 backdrop-blur-xl border-b border-[#E9E5DE] shadow-card'
          : 'py-4 bg-[#F7F5F1]/80 backdrop-blur-md border-b border-[#E9E5DE]/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleSectionChange('home')}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="p-2 rounded-xl bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722] group-hover:scale-105 transition-all duration-300">
            <Cpu className="w-5 h-5" />
          </div>
          <span className="font-display font-bold text-lg md:text-xl tracking-tight text-[#111820]">
            GOPI<span className="text-[#FF5722]">PRAKAN</span>
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#E9E5DE] shadow-sm">
          {NAV_SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => handleSectionChange(sec.id)}
                onMouseEnter={() => audioController.playHover()}
                className={`relative px-3 py-1 text-xs font-medium tracking-wide transition-all duration-200 rounded-full ${
                  isActive
                    ? 'text-[#FF5722] font-semibold'
                    : 'text-[#111820]/70 hover:text-[#111820]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 bg-[#FF5722]/10 border border-[#FF5722]/30 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {sec.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Command Palette Trigger */}
          <button
            onClick={() => {
              audioController.playClick();
              onOpenCommandPalette();
            }}
            title="Open Command Center (Ctrl+K)"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-mono bg-white border border-[#E9E5DE] text-[#111820] rounded-xl hover:border-[#FF5722] hover:text-[#FF5722] transition-all duration-200 shadow-sm"
          >
            <Search className="w-3.5 h-3.5 text-[#FF5722]" />
            <span>Search</span>
            <kbd className="px-1.5 py-0.5 bg-[#F7F5F1] text-[10px] text-[#FF5722] font-semibold rounded border border-[#E9E5DE]">
              Ctrl+K
            </kbd>
          </button>

          {/* Sound Audio Toggle */}
          <button
            onClick={handleToggleSound}
            title={isMuted ? 'Enable Sound FX' : 'Mute Sound FX'}
            className="p-2 rounded-xl bg-white border border-[#E9E5DE] text-[#111820]/70 hover:text-[#FF5722] hover:border-[#FF5722]/40 transition-all duration-200 shadow-sm"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-[#111820]/40" /> : <Volume2 className="w-4 h-4 text-[#FF5722]" />}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={() => {
              audioController.playClick();
              onToggleTheme();
            }}
            title="Switch Theme"
            className="p-2 rounded-xl bg-white border border-[#E9E5DE] text-[#111820]/70 hover:text-[#FF5722] hover:border-[#FF5722]/40 transition-all duration-200 shadow-sm"
          >
            <Palette className="w-4 h-4 text-[#FF5722]" />
          </button>

          {/* Download / View Resume Button */}
          <button
            onClick={() => handleSectionChange('resume')}
            className={`hidden sm:flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-xl transition-all duration-200 shadow-sm ${
              activeSection === 'resume'
                ? 'bg-[#E64A19] text-white border border-[#FF5722]'
                : 'bg-[#FF5722] hover:bg-[#E64A19] text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white border border-[#E9E5DE] text-[#FF5722] shadow-sm"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/98 backdrop-blur-2xl border-b border-[#E9E5DE] px-6 py-6 shadow-2xl"
          >
            <div className="grid grid-cols-2 gap-2.5 mb-6">
              {NAV_SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => handleSectionChange(sec.id)}
                  className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeSection === sec.id
                      ? 'bg-[#FF5722]/10 text-[#FF5722] border border-[#FF5722]/30 font-semibold'
                      : 'text-[#111820]/70 hover:bg-[#F7F5F1] hover:text-[#111820]'
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E9E5DE] flex flex-col gap-2.5">
              <button
                onClick={() => {
                  onOpenCommandPalette();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#F7F5F1] border border-[#E9E5DE] text-[#111820] rounded-xl text-sm font-mono hover:border-[#FF5722]"
              >
                <Search className="w-4 h-4 text-[#FF5722]" />
                <span>Command Center (Ctrl+K)</span>
              </button>
              <button
                onClick={() => {
                  handleSectionChange('resume');
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold rounded-xl text-sm shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>View Resume</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
});

Navbar.displayName = 'Navbar';
