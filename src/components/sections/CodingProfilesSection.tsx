import React from 'react';
import { motion } from 'framer-motion';
import { Code2, ExternalLink, Star, Activity } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { audioController } from '../../utils/AudioController';

/**
 * PERFORMANCE OPTIMIZED CODING PROFILES SECTION
 * Optimizations implemented:
 * 1. React.memo: Prevents section re-renders on parent state changes.
 * 2. Image Loading Attributes: Adds lazy loading & async decoding on platform avatars.
 */
export const CodingProfilesSection: React.FC = React.memo(() => {
  return (
    <section id="coding-profiles" className="py-24 relative z-10 border-t border-cyan-500/10 gpu-accelerated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <Code2 className="w-3.5 h-3.5" />
            <span>ALGORITHMIC TELEMETRY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-100">
            CODING <span className="text-gradient-cyan">PROFILES</span>
          </h2>
          <p className="text-sm font-mono text-slate-400">
            Live competitive programming ratings, problem solving streaks, and contribution heatmaps.
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.codingProfiles.map((prof, idx) => (
            <motion.div
              key={prof.platform}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass-panel glass-panel-hover p-6 rounded-3xl border border-slate-800 space-y-5 relative overflow-hidden group"
            >
              {/* Profile Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden border border-cyan-500/30 p-0.5 bg-slate-900">
                    <img
                      src={prof.avatar}
                      alt={prof.name}
                      loading="lazy"
                      decoding="async"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {prof.name}
                    </h3>
                    <span className="text-xs font-mono text-slate-400">@{prof.username}</span>
                  </div>
                </div>

                <a
                  href={prof.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => audioController.playClick()}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Stats Counters Grid */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-center font-mono">
                <div>
                  <span className="text-[10px] text-slate-500 block">RATING</span>
                  <span className="text-sm font-bold text-gradient-cyan">{prof.rating}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">SOLVED</span>
                  <span className="text-sm font-bold text-gradient-purple">{prof.problemsSolved}+</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">FOLLOWERS</span>
                  <span className="text-sm font-bold text-gradient-gold">{prof.followers}</span>
                </div>
              </div>

              {/* Badges Tag List */}
              <div className="flex flex-wrap gap-1.5">
                {prof.badges.slice(0, 3).map((b, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-mono text-cyan-300 flex items-center gap-1"
                  >
                    <Star className="w-2.5 h-2.5 text-cyan-400" />
                    {b}
                  </span>
                ))}
              </div>

              {/* 30-Day Contribution Heatmap Grid Visualizer */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800/60">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <Activity className="w-3 h-3 text-emerald-400" />
                    30-Day Activity Heatmap
                  </span>
                  <span className="text-emerald-400 font-bold">{prof.globalRank}</span>
                </div>

                <div className="grid grid-cols-10 gap-1.5">
                  {prof.heatmap.slice(0, 30).map((count, i) => {
                    // Color intensity logic
                    const opacity = Math.min(1, Math.max(0.15, count / 40));
                    return (
                      <div
                        key={i}
                        title={`${count} contributions`}
                        className="h-3 rounded-sm bg-cyan-400 transition-all hover:scale-125"
                        style={{ opacity }}
                      />
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

CodingProfilesSection.displayName = 'CodingProfilesSection';
