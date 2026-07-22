import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Cpu,
  FileCode,
  Terminal,
  Shield,
  Code,
  Database,
  Layout,
  Box,
  Globe,
  Palette,
  Activity,
  Layers,
  Server,
  Zap,
  Share2,
  Bot,
  Brain,
  Search,
  Sparkles,
  HardDrive,
  Cloud,
  GitBranch,
  Sliders,
  Feather,
  CheckCircle
} from 'lucide-react';
import { PORTFOLIO_DATA, SkillCategory } from '../../data/portfolioData';
import { audioController } from '../../utils/AudioController';

// Icon mapping helper
const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  FileCode,
  Terminal,
  Cpu,
  Shield,
  Code,
  Database,
  Layout,
  Box,
  Globe,
  Palette,
  Activity,
  Layers,
  Server,
  Zap,
  Share2,
  Bot,
  Brain,
  Search,
  Sparkles,
  HardDrive,
  Cloud,
  GitBranch,
  Sliders,
  Feather,
  CheckCircle
};

/**
 * PERFORMANCE OPTIMIZED SKILLS SECTION
 * Optimizations implemented:
 * 1. React.memo: Prevents unnecessary component re-renders.
 * 2. useMemo filtering: Memoizes skill categories computation so filtering happens only on tab selection change.
 */
export const SkillsSection: React.FC = React.memo(() => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => ['All', ...PORTFOLIO_DATA.skills.map((s) => s.category)], []);

  const filteredCategories: SkillCategory[] = useMemo(() => {
    return selectedCategory === 'All'
      ? PORTFOLIO_DATA.skills
      : PORTFOLIO_DATA.skills.filter((s) => s.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="skills" className="py-24 relative z-10 border-t border-[#3c4043] gpu-accelerated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4285F4]/10 border border-[#4285F4]/30 text-[#8ab4f8] text-xs font-mono">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#e8eaed]">
            SKILLS & <span className="text-gradient-google">MASTERY</span>
          </h2>
          <p className="text-sm font-mono text-slate-400">
            Engineered proficiency across intelligent systems, full-stack web applications, and scalable architectures.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  audioController.playClick();
                  setSelectedCategory(cat);
                }}
                onMouseEnter={() => audioController.playHover()}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-300 ${
                  isActive
                    ? 'bg-[#4285F4]/20 text-[#8ab4f8] border border-[#4285F4]/50 shadow-google-blue font-bold'
                    : 'bg-[#2d2e31] border border-[#3c4043] text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Categorized Skills Grid */}
        <div className="space-y-10">
          {filteredCategories.map((group) => (
            <div key={group.category} className="space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-[#EA4335] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#EA4335]" />
                {group.category}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.skills.map((sk, idx) => {
                  const IconComp = ICON_MAP[sk.icon] || Code;
                  return (
                    <motion.div
                      key={sk.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      whileHover={{ y: -5 }}
                      className="glass-panel glass-panel-hover p-5 rounded-2xl border border-[#3c4043] space-y-3 relative group overflow-hidden"
                    >
                      {/* Ambient Glow */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#4285F4]/5 rounded-full blur-xl group-hover:bg-[#4285F4]/15 transition-all" />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-[#202124] border border-[#3c4043] text-[#4285F4] group-hover:scale-110 group-hover:border-[#4285F4]/40 transition-all">
                            <IconComp className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-display font-bold text-sm text-slate-100">
                              {sk.name}
                            </h4>
                            <span className="text-[10px] font-mono text-slate-400">
                              {sk.description}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-gradient-google">
                          {sk.level}%
                        </span>
                      </div>

                      {/* Animated Google Progress Bar */}
                      <div className="w-full h-1.5 bg-[#202124] rounded-full overflow-hidden border border-[#3c4043] p-0.5">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853] rounded-full shadow-google-blue"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${sk.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

SkillsSection.displayName = 'SkillsSection';
