import React from 'react';
import { motion } from 'framer-motion';
import { Code2, ExternalLink, Star, Activity } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { audioController } from '../../utils/AudioController';
import { BrandLogoMap } from '../utils/BrandLogos';

export const CodingProfilesSection: React.FC = React.memo(() => {
  return (
    <section id="coding-profiles" className="py-24 relative z-10 border-t border-[#E9E5DE] gpu-accelerated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722] text-xs font-mono">
            <Code2 className="w-3.5 h-3.5 text-[#FF5722]" />
            <span>ALGORITHMIC TELEMETRY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#111820]">
            CODING <span className="text-gradient-google">PROFILES</span>
          </h2>
          <p className="text-sm font-mono text-[#111820]/70">
            Competitive programming ratings, problem solving metrics, and activity heatmaps.
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
              className="bg-white p-6 rounded-3xl border border-[#E9E5DE] shadow-card hover:shadow-card-hover space-y-5 relative overflow-hidden group transition-all duration-300"
            >
              {/* Profile Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden border border-[#E9E5DE] p-2 bg-[#F7F5F1] flex items-center justify-center shrink-0">
                    {(() => {
                      const LogoComponent = BrandLogoMap[prof.platform];
                      return LogoComponent ? (
                        <LogoComponent className="w-8 h-8 object-contain" />
                      ) : (
                        <img
                          src={prof.avatar}
                          alt={prof.name}
                          loading="lazy"
                          decoding="async"
                          width={48}
                          height={48}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      );
                    })()}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-[#111820] group-hover:text-[#FF5722] transition-colors">
                      {prof.name}
                    </h3>
                    <span className="text-xs font-mono text-[#111820]/60">@{prof.username}</span>
                  </div>
                </div>

                <a
                  href={prof.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => audioController.playClick()}
                  className="p-2 rounded-xl bg-[#F7F5F1] border border-[#E9E5DE] text-[#111820]/70 hover:text-[#FF5722] hover:border-[#FF5722]/30 transition-all shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Stats Counters Grid */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#F7F5F1] border border-[#E9E5DE] text-center font-mono">
                <div>
                  <span className="text-[10px] text-[#111820]/50 block">RATING</span>
                  <span className="text-sm font-bold text-[#FF5722]">{prof.rating}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#111820]/50 block">SOLVED</span>
                  <span className="text-sm font-bold text-[#FF5722]">{prof.problemsSolved}+</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#111820]/50 block">FOLLOWERS</span>
                  <span className="text-sm font-bold text-[#FF8A50]">{prof.followers}</span>
                </div>
              </div>

              {/* Badges Tag List */}
              <div className="flex flex-wrap gap-1.5">
                {prof.badges.slice(0, 3).map((b, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/20 text-[10px] font-mono text-[#FF5722] font-semibold flex items-center gap-1"
                  >
                    <Star className="w-2.5 h-2.5 text-[#FF8A50]" />
                    {b}
                  </span>
                ))}
              </div>

              {/* 30-Day Contribution Heatmap Grid Visualizer */}
              <div className="space-y-1.5 pt-2 border-t border-[#E9E5DE]">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#111820]/60">
                  <span className="flex items-center gap-1">
                    <Activity className="w-3 h-3 text-[#FF5722]" />
                    30-Day Activity Heatmap
                  </span>
                  <span className="text-[#FF5722] font-bold">{prof.globalRank}</span>
                </div>

                <div className="grid grid-cols-10 gap-1.5">
                  {prof.heatmap.slice(0, 30).map((count, i) => {
                    const opacity = Math.min(1, Math.max(0.18, count / 40));
                    return (
                      <div
                        key={i}
                        title={`${count} contributions`}
                        className="h-3 rounded-sm bg-[#FF5722] transition-all hover:scale-125"
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
