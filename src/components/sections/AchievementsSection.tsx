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
    <section id="achievements" className="py-24 relative z-10 border-t border-cyan-500/10 gpu-accelerated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
            <Trophy className="w-3.5 h-3.5" />
            <span>HONORS & HACKATHONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-100">
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
              className="glass-panel glass-panel-hover p-6 rounded-3xl border border-amber-500/20 flex flex-col justify-between space-y-6 relative overflow-hidden group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                    <Trophy className="w-6 h-6 animate-pulse" />
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {ach.date}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-mono font-bold text-amber-400 block mb-1">
                    {ach.rank}
                  </span>
                  <h3 className="text-lg font-display font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
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
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold hover:bg-amber-500/20 transition-all shadow-sm"
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
