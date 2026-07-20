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

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onOpenCommandPalette,
  onOpenResumeModal,
  onToggleTheme
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'py-3 bg-[#030712]/85 backdrop-blur-xl border-b border-cyan-500/15 shadow-neon-cyan'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => scrollToSection('home')}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 group-hover:scale-110 group-hover:shadow-neon-cyan transition-all duration-300">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <span className="font-display font-bold text-lg md:text-xl tracking-wider text-gradient-cyan">
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
                    ? 'text-cyan-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/40 rounded-full shadow-neon-cyan -z-10"
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
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-mono bg-slate-900/80 border border-cyan-500/30 text-slate-300 rounded-xl hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300 shadow-sm"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span>Search</span>
            <kbd className="px-1.5 py-0.5 bg-slate-800 text-[10px] text-cyan-400 rounded border border-cyan-500/20">
              Ctrl+K
            </kbd>
          </button>

          {/* Sound Audio Toggle */}
          <button
            onClick={handleToggleSound}
            title={isMuted ? 'Enable Sound FX' : 'Mute Sound FX'}
            className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-300"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={() => {
              audioController.playClick();
              onToggleTheme();
            }}
            title="Switch Cyber Theme"
            className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-purple-400 hover:border-purple-500/40 transition-all duration-300"
          >
            <Palette className="w-4 h-4 text-purple-400" />
          </button>

          {/* Download / View Resume Button */}
          <button
            onClick={() => {
              audioController.playClick();
              onOpenResumeModal();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium bg-gradient-to-r from-cyan-500 to-purple-600 text-slate-950 font-bold rounded-xl hover:brightness-110 shadow-neon-cyan transition-all duration-300"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-cyan-400"
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
            className="lg:hidden bg-[#05070f]/95 backdrop-blur-2xl border-b border-cyan-500/20 px-6 py-6 shadow-2xl"
          >
            <div className="grid grid-cols-2 gap-3 mb-6">
              {NAV_SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeSection === sec.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-3">
              <button
                onClick={() => {
                  onOpenCommandPalette();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-900 border border-cyan-500/30 text-cyan-300 rounded-xl text-sm font-mono"
              >
                <Search className="w-4 h-4" />
                <span>Command Center (Ctrl+K)</span>
              </button>
              <button
                onClick={() => {
                  onOpenResumeModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-slate-950 font-bold rounded-xl text-sm"
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
};
