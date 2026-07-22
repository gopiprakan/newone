import React from 'react';
import { motion } from 'framer-motion';
import {
  Share2,
  Github,
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
  Dribbble,
  Briefcase,
  Code2,
  Cloud,
  Facebook,
  ExternalLink,
  Users,
  Activity
} from 'lucide-react';
import { SOCIAL_PLATFORMS_DATA } from '../../data/socialData';
import { audioController } from '../../utils/AudioController';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Github,
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
  Dribbble,
  Briefcase,
  Code2,
  Cloud,
  Facebook
};

/**
 * PERFORMANCE OPTIMIZED SOCIAL DASHBOARD SECTION
 * Optimizations implemented:
 * 1. React.memo: Prevents section re-renders on parent state changes.
 * 2. Hardware Layer Acceleration: GPU transform promotion on interactive cards.
 */
export const SocialDashboardSection: React.FC = React.memo(() => {
  return (
    <section id="social-dashboard" className="py-24 relative z-10 border-t border-[#3c4043] gpu-accelerated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4285F4]/10 border border-[#4285F4]/30 text-[#8ab4f8] text-xs font-mono">
            <Share2 className="w-3.5 h-3.5 text-[#4285F4]" />
            <span>REAL-TIME SOCIAL HUB</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#e8eaed]">
            INTERACTIVE <span className="text-gradient-google">SOCIAL DASHBOARD</span>
          </h2>
          <p className="text-sm font-mono text-slate-400">
            Digital footprint across developer platforms, social networks, and tech communities.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOCIAL_PLATFORMS_DATA.map((platform, idx) => {
            const IconComponent = ICON_MAP[platform.iconName] || Share2;
            return (
              <motion.div
                key={platform.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                className="glass-panel glass-panel-hover p-6 rounded-3xl border border-[#3c4043] space-y-5 flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Ambient Color Glow */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-10 group-hover:opacity-25 transition-opacity"
                  style={{ backgroundColor: platform.color }}
                />

                <div className="space-y-4">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-3 rounded-2xl border border-[#3c4043] text-[#e8eaed] transition-transform group-hover:scale-110"
                        style={{ backgroundColor: `${platform.color}15`, borderColor: `${platform.color}40` }}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-base text-[#e8eaed] group-hover:text-[#8ab4f8] transition-colors">
                          {platform.name}
                        </h3>
                        <span className="text-xs font-mono text-slate-400">{platform.username}</span>
                      </div>
                    </div>

                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => audioController.playClick()}
                      className="p-2 rounded-xl bg-[#202124] border border-[#3c4043] text-slate-400 hover:text-[#4285F4] hover:border-[#4285F4]/30 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Followers & Telemetry */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-[#202124] border border-[#3c4043] font-mono">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#4285F4]" />
                      Audience Reach
                    </span>
                    <span className="text-sm font-bold text-gradient-google">{platform.followers}</span>
                  </div>

                  {/* Recent Activity */}
                  <div className="space-y-1.5 font-sans text-xs">
                    <div className="flex items-center gap-1.5 text-[#8ab4f8] font-mono text-[11px]">
                      <Activity className="w-3.5 h-3.5 text-[#34A853]" />
                      <span>RECENT TELEMETRY</span>
                    </div>
                    <p className="text-slate-300 line-clamp-2 leading-relaxed bg-[#202124] p-2.5 rounded-xl border border-[#3c4043]">
                      {platform.recentActivity}
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-1.5 pt-1 text-center font-mono">
                    {platform.stats.map((st, i) => (
                      <div key={i} className="p-2 rounded-xl bg-[#202124] border border-[#3c4043]">
                        <span className="text-[9px] text-slate-500 block truncate">{st.label}</span>
                        <span className="text-xs font-bold text-slate-200">{st.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Open Profile Button */}
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => audioController.playClick()}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#2d2e31] border border-[#4285F4]/30 text-[#8ab4f8] font-mono text-xs font-semibold hover:bg-[#4285F4]/20 transition-all shadow-sm"
                >
                  <ExternalLink className="w-4 h-4 text-[#4285F4]" />
                  <span>Open Official {platform.name}</span>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

SocialDashboardSection.displayName = 'SocialDashboardSection';
