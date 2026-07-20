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
    id: 'cyber-obsidian',
    name: 'Cyber Obsidian',
    description: 'Deep midnight backdrop with glowing cyan & neon purple accents.',
    primary: '#00f0ff',
    secondary: '#7000ff',
    bg: '#05070f'
  },
  {
    id: 'neon-cyberpunk',
    name: 'Neon Cyberpunk',
    description: 'Vibrant hot pink and electric cyan futuristic aesthetic.',
    primary: '#ff007f',
    secondary: '#00f0ff',
    bg: '#090014'
  },
  {
    id: 'emerald-matrix',
    name: 'Emerald Matrix',
    description: 'Bio-tech cyber green with luminous teal highlights.',
    primary: '#10b981',
    secondary: '#06b6d4',
    bg: '#01140e'
  }
];

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ isOpen, onClose }) => {
  const [activeTheme, setActiveTheme] = useState('cyber-obsidian');

  if (!isOpen) return null;

  const handleSelectTheme = (themeId: string) => {
    audioController.playClick();
    setActiveTheme(themeId);

    document.body.classList.remove('theme-cyberpunk', 'theme-emerald');
    if (themeId === 'neon-cyberpunk') {
      document.body.classList.add('theme-cyberpunk');
    } else if (themeId === 'emerald-matrix') {
      document.body.classList.add('theme-emerald');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-[#080d1b] border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden text-slate-100 p-6 md:p-8 space-y-6"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-bold text-gradient-purple">
                THEME ENGINE PRESETS
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-cyan-400"
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
                      ? 'bg-slate-900 border-cyan-400 shadow-neon-cyan'
                      : 'bg-slate-900/50 border-slate-800 hover:border-cyan-500/30'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-display font-bold text-sm text-slate-100">
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
                    <div className="p-1.5 rounded-full bg-cyan-500 text-slate-950">
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
              className="px-5 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs font-mono"
            >
              APPLY & CLOSE
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
