import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Eye } from 'lucide-react';
import { PORTFOLIO_DATA, Achievement } from '../../data/portfolioData';
import { audioController } from '../../utils/AudioController';

interface AchievementsSectionProps {
  onSelectAchievement: (ach: Achievement) => void;
}

/**
 * PERFORMANCE OPTIMIZED ACHIEVEMENTS SECTION
 * Optimizations implemented:
 * 1. React.memo: Prevents section re-renders on parent state changes.
 * 2. Hardware Layer Acceleration: Promotes card animations to GPU layers.
 */
export const AchievementsSection: React.FC<AchievementsSectionProps> = React.memo(({ onSelectAchievement }) => {
  return (
    <section id="achievements" className="py-24 relative z-10 border-t border-[#3c4043] gpu-accelerated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FBBC04]/10 border border-[#FBBC04]/30 text-[#FBBC04] text-xs font-mono">
            <Trophy className="w-3.5 h-3.5" />
            <span>HONORS & HACKATHONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#e8eaed]">
            KEY <span className="text-gradient-gold">ACHIEVEMENTS</span>
          </h2>
          <p className="text-sm font-mono text-slate-400">
            Global hackathon championships, competition awards, and research recognitions.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PORTFOLIO_DATA.achievements.map((ach, idx) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-panel glass-panel-hover p-6 rounded-3xl border border-[#3c4043] flex flex-col justify-between space-y-6 relative overflow-hidden group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-[#FBBC04]/10 border border-[#FBBC04]/30 text-[#FBBC04]">
                    <Trophy className="w-6 h-6 animate-pulse" />
                  </div>
                  <span className="text-[10px] font-mono text-[#8ab4f8] flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#4285F4]" />
                    {ach.date}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-mono font-bold text-[#FBBC04] block mb-1">
                    {ach.rank}
                  </span>
                  <h3 className="text-lg font-display font-bold text-slate-100 group-hover:text-[#FBBC04] transition-colors">
                    {ach.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    {ach.competition}
                  </p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-3">
                  {ach.description}
                </p>
              </div>

              <button
                onClick={() => {
                  audioController.playClick();
                  onSelectAchievement(ach);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#2d2e31] border border-[#FBBC04]/30 text-[#FBBC04] font-mono text-xs font-semibold hover:bg-[#FBBC04]/20 transition-all shadow-sm"
              >
                <Eye className="w-4 h-4" />
                <span>View Full Award & Certificate</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

AchievementsSection.displayName = 'AchievementsSection';
