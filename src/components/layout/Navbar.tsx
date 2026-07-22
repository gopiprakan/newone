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
 * PERFORMANCE OPTIMIZED NAVBAR
 * Optimizations implemented:
 * 1. React.memo: Prevents unnecessary header re-renders on active section or parent state changes.
 * 2. Throttled Scroll Listener: RAF-throttled scroll observer with passive event listener.
 * 3. Hardware Layer Promotion: Glass background promoted to GPU compositing layer.
 */
export const Navbar: React.FC<NavbarProps> = React.memo(({
  activeSection,
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
          setIsScrolled(window.scrollY > 40);
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

  const scrollToSection = (id: string) => {
    audioController.playClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 gpu-accelerated ${
        isScrolled
          ? 'py-3 bg-[#202124]/90 backdrop-blur-xl border-b border-[#3c4043] shadow-google-card'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => scrollToSection('home')}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="p-2 rounded-xl bg-[#4285F4]/10 border border-[#4285F4]/30 text-[#4285F4] group-hover:scale-110 transition-all duration-300">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <span className="font-display font-bold text-lg md:text-xl tracking-wider text-gradient-google">
            GOPIPRAKAN
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border border-white/10 shadow-glass">
          {NAV_SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                onMouseEnter={() => audioController.playHover()}
                className={`relative px-3 py-1.5 text-xs font-medium tracking-wide transition-all duration-300 rounded-full ${
                  isActive
                    ? 'text-[#8ab4f8] font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 bg-[#4285F4]/20 border border-[#4285F4]/50 rounded-full shadow-google-blue -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {sec.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls (Command Palette, Sound, Theme, Resume, Mobile Menu Toggle) */}
        <div className="flex items-center gap-2">
          {/* Command Palette Trigger (`Ctrl+K`) */}
          <button
            onClick={() => {
              audioController.playClick();
              onOpenCommandPalette();
            }}
            title="Open Command Center (Ctrl+K)"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-mono bg-[#2d2e31] border border-[#3c4043] text-slate-300 rounded-xl hover:border-[#4285F4] hover:text-[#8ab4f8] transition-all duration-300 shadow-sm"
          >
            <Search className="w-3.5 h-3.5 text-[#4285F4]" />
            <span>Search</span>
            <kbd className="px-1.5 py-0.5 bg-[#202124] text-[10px] text-[#8ab4f8] rounded border border-[#3c4043]">
              Ctrl+K
            </kbd>
          </button>

          {/* Sound Audio Toggle */}
          <button
            onClick={handleToggleSound}
            title={isMuted ? 'Enable Sound FX' : 'Mute Sound FX'}
            className="p-2.5 rounded-xl bg-[#2d2e31] border border-[#3c4043] text-slate-300 hover:text-[#4285F4] hover:border-[#4285F4]/40 transition-all duration-300"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-[#4285F4] animate-pulse" />}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={() => {
              audioController.playClick();
              onToggleTheme();
            }}
            title="Switch Google Antigravity Theme"
            className="p-2.5 rounded-xl bg-[#2d2e31] border border-[#3c4043] text-slate-300 hover:text-[#EA4335] hover:border-[#EA4335]/40 transition-all duration-300"
          >
            <Palette className="w-4 h-4 text-[#EA4335]" />
          </button>

          {/* Download / View Resume Button */}
          <button
            onClick={() => {
              audioController.playClick();
              onOpenResumeModal();
            }}
            className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold bg-[#4285F4] hover:bg-[#3367d6] text-white rounded-xl shadow-google-blue transition-all duration-300"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-[#2d2e31] border border-[#3c4043] text-[#4285F4]"
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
            className="lg:hidden bg-[#202124]/95 backdrop-blur-2xl border-b border-[#3c4043] px-6 py-6 shadow-2xl"
          >
            <div className="grid grid-cols-2 gap-3 mb-6">
              {NAV_SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeSection === sec.id
                      ? 'bg-[#4285F4]/20 text-[#8ab4f8] border border-[#4285F4]/40 font-semibold'
                      : 'text-slate-300 hover:bg-[#2d2e31]'
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-[#3c4043] flex flex-col gap-3">
              <button
                onClick={() => {
                  onOpenCommandPalette();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#2d2e31] border border-[#3c4043] text-[#8ab4f8] rounded-xl text-sm font-mono"
              >
                <Search className="w-4 h-4 text-[#4285F4]" />
                <span>Command Center (Ctrl+K)</span>
              </button>
              <button
                onClick={() => {
                  onOpenResumeModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#4285F4] hover:bg-[#3367d6] text-white font-bold rounded-xl text-sm shadow-google-blue"
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
