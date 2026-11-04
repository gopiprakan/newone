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

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
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
};

export const SkillsSection: React.FC = React.memo(() => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    return ['All', ...PORTFOLIO_DATA.skillCategories.map((c) => c.category)];
  }, []);

  const filteredCategories = useMemo(() => {
    if (selectedCategory === 'All') return PORTFOLIO_DATA.skillCategories;
    return PORTFOLIO_DATA.skillCategories.filter((c) => c.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="skills" className="py-24 relative z-10 border-t border-[#E9E5DE] gpu-accelerated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722] text-xs font-mono">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#111820]">
            SKILLS & <span className="text-gradient-google">MASTERY</span>
          </h2>
          <p className="text-sm font-mono text-[#111820]/70">
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
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 ${
                  isActive
                    ? 'bg-[#FF5722] text-white border border-[#FF5722] shadow-sm font-bold'
                    : 'bg-white border border-[#E9E5DE] text-[#111820]/70 hover:border-[#FF5722] hover:text-[#FF5722]'
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
              <h3 className="text-sm font-mono uppercase tracking-wider text-[#FF5722] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF5722]" />
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
                      whileHover={{ y: -4 }}
                      className="bg-white p-5 rounded-2xl border border-[#E9E5DE] shadow-card hover:shadow-card-hover hover:border-[#FF5722]/50 space-y-3 relative group overflow-hidden transition-all duration-300"
                    >
                      {/* Ambient Subtle Warmth */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF8A50]/5 rounded-full blur-xl group-hover:bg-[#FF8A50]/15 transition-all" />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-[#F7F5F1] border border-[#E9E5DE] text-[#FF5722] group-hover:scale-105 group-hover:border-[#FF5722]/40 transition-all">
                            <IconComp className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-display font-bold text-sm text-[#111820]">
                              {sk.name}
                            </h4>
                            <span className="text-[10px] font-mono text-[#111820]/60">
                              {sk.description}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-[#FF5722]">
                          {sk.level}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-1.5 bg-[#F7F5F1] rounded-full overflow-hidden border border-[#E9E5DE] p-0.5">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#FF5722] to-[#FF8A50] rounded-full"
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
