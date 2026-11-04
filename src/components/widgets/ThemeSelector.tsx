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
    id: 'warm-ivory-orange',
    name: 'Warm Ivory & Vibrant Orange (Default)',
    description: 'Neat, editorial warm ivory (#F7F5F1) with vibrant orange (#FF5722).',
    primary: '#FF5722',
    secondary: '#FF8A50',
    bg: '#F7F5F1'
  },
  {
    id: 'pure-white-editorial',
    name: 'Pure White & Deep Charcoal',
    description: 'Crisp minimal white surfaces with deep charcoal (#111820) typography.',
    primary: '#111820',
    secondary: '#FF5722',
    bg: '#FFFFFF'
  },
  {
    id: 'warm-grey-minimal',
    name: 'Warm Grey Modern',
    description: 'Balanced warm grey (#E9E5DE) accents with soft orange highlights.',
    primary: '#FF8A50',
    secondary: '#E9E5DE',
    bg: '#E9E5DE'
  }
];

export const ThemeSelector: React.FC<ThemeSelectorProps> = React.memo(({ isOpen, onClose }) => {
  const [activeTheme, setActiveTheme] = useState('warm-ivory-orange');

  if (!isOpen) return null;

  const handleSelectTheme = (themeId: string) => {
    audioController.playClick();
    setActiveTheme(themeId);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111820]/60 backdrop-blur-md gpu-accelerated">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white border border-[#E9E5DE] rounded-3xl shadow-2xl overflow-hidden text-[#111820] p-6 md:p-8 space-y-6 gpu-accelerated"
        >
          <div className="flex items-center justify-between border-b border-[#E9E5DE] pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722]">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-bold text-[#111820]">
                COLOR THEMES
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#F7F5F1] border border-[#E9E5DE] text-[#111820] hover:text-[#FF5722] transition-colors"
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
                      ? 'bg-[#F7F5F1] border-[#FF5722] shadow-sm'
                      : 'bg-white border-[#E9E5DE] hover:border-[#FF5722]/40'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-display font-bold text-sm text-[#111820]">
                        {theme.name}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: theme.primary }} />
                        <span className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: theme.secondary }} />
                      </div>
                    </div>
                    <p className="text-xs text-[#111820]/65">{theme.description}</p>
                  </div>

                  {isSelected && (
                    <div className="p-1.5 rounded-full bg-[#FF5722] text-white">
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
              className="px-5 py-2.5 rounded-xl bg-[#FF5722] hover:bg-[#E64A19] text-white text-xs font-bold font-mono transition-colors shadow-sm"
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
