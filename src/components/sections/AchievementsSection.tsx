import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Eye } from 'lucide-react';
import { PORTFOLIO_DATA, Achievement } from '../../data/portfolioData';
import { audioController } from '../../utils/AudioController';

interface AchievementsSectionProps {
  onSelectAchievement: (ach: Achievement) => void;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = React.memo(({ onSelectAchievement }) => {
  return (
    <section id="achievements" className="py-24 relative z-10 border-t border-[#E9E5DE] gpu-accelerated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722] text-xs font-mono">
            <Trophy className="w-3.5 h-3.5" />
            <span>HONORS & HACKATHONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#111820]">
            KEY <span className="text-gradient-google">ACHIEVEMENTS</span>
          </h2>
          <p className="text-sm font-mono text-[#111820]/70">
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
              className="bg-white p-6 rounded-3xl border border-[#E9E5DE] shadow-card hover:shadow-card-hover flex flex-col justify-between space-y-6 relative overflow-hidden group transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722]">
                    <Trophy className="w-6 h-6 animate-pulse" />
                  </div>
                  <span className="text-[10px] font-mono text-[#FF5722] flex items-center gap-1 font-semibold">
                    <Calendar className="w-3 h-3 text-[#FF5722]" />
                    {ach.date}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-mono font-bold text-[#FF5722] block mb-1">
                    {ach.rank}
                  </span>
                  <h3 className="text-lg font-display font-bold text-[#111820] group-hover:text-[#FF5722] transition-colors">
                    {ach.title}
                  </h3>
                  <p className="text-xs font-mono text-[#111820]/60 mt-1">
                    {ach.competition}
                  </p>
                </div>

                <p className="text-xs text-[#111820]/75 leading-relaxed font-sans line-clamp-3">
                  {ach.description}
                </p>
              </div>

              <button
                onClick={() => {
                  audioController.playClick();
                  onSelectAchievement(ach);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#F7F5F1] border border-[#E9E5DE] text-[#FF5722] font-mono text-xs font-semibold hover:bg-[#FF5722] hover:text-white transition-all shadow-sm"
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
