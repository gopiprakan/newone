import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X, Check } from 'lucide-react';
import { audioController } from '../../utils/AudioController';

interface ThemeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const THEMES = [
  {
    id: 'google-antigravity-dark',
    name: 'Google Antigravity Dark',
    description: 'Signature Google Dark background with Google 4-color brand accents.',
    primary: '#4285F4',
    secondary: '#EA4335',
    bg: '#202124'
  },
  {
    id: 'google-material-light',
    name: 'Google Material Light',
    description: 'Clean Google light theme background with Google Blue and Green highlights.',
    primary: '#1a73e8',
    secondary: '#34A853',
    bg: '#f8f9fa'
  },
  {
    id: 'google-deep-slate',
    name: 'Google Workspace Slate',
    description: 'Minimalist deep slate style with vibrant Google Yellow and Blue accents.',
    primary: '#8ab4f8',
    secondary: '#FBBC04',
    bg: '#171717'
  }
];

/**
 * PERFORMANCE OPTIMIZED THEME SELECTOR MODAL
 * Optimizations implemented:
 * 1. React.memo: Avoids re-rendering theme modal when closed or parent re-renders.
 */
export const ThemeSelector: React.FC<ThemeSelectorProps> = React.memo(({ isOpen, onClose }) => {
  const [activeTheme, setActiveTheme] = useState('google-antigravity-dark');

  if (!isOpen) return null;

  const handleSelectTheme = (themeId: string) => {
    audioController.playClick();
    setActiveTheme(themeId);

    document.body.classList.remove('theme-cyberpunk', 'theme-emerald', 'theme-google-light', 'theme-google-slate');
    if (themeId === 'google-material-light') {
      document.body.classList.add('theme-google-light');
    } else if (themeId === 'google-deep-slate') {
      document.body.classList.add('theme-google-slate');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md gpu-accelerated">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-[#2d2e31] border border-[#3c4043] rounded-3xl shadow-2xl overflow-hidden text-[#e8eaed] p-6 md:p-8 space-y-6 gpu-accelerated"
        >
          <div className="flex items-center justify-between border-b border-[#3c4043] pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#4285F4]/10 border border-[#4285F4]/30 text-[#4285F4]">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-bold text-gradient-google">
                GOOGLE ANTIGRAVITY THEMES
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#202124] border border-[#3c4043] text-slate-400 hover:text-[#4285F4]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            {THEMES.map((theme) => {
              const isSelected = activeTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => handleSelectTheme(theme.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-[#202124] border-[#4285F4] shadow-google-blue'
                      : 'bg-[#202124]/50 border-[#3c4043] hover:border-[#4285F4]/40'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-display font-bold text-sm text-[#e8eaed]">
                        {theme.name}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.primary }} />
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.secondary }} />
                      </div>
                    </div>
                    <p className="text-xs text-slate-400">{theme.description}</p>
                  </div>

                  {isSelected && (
                    <div className="p-1.5 rounded-full bg-[#4285F4] text-white">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#4285F4] hover:bg-[#3367d6] text-white text-xs font-bold font-mono transition-colors shadow-md"
            >
              APPLY & CLOSE
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
});

ThemeSelector.displayName = 'ThemeSelector';
