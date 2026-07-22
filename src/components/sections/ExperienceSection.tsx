import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

/**
 * PERFORMANCE OPTIMIZED EXPERIENCE SECTION
 * Optimizations implemented:
 * 1. React.memo: Prevents section re-renders on parent state changes.
 * 2. Hardware Layer Acceleration: GPU transform promotion on timeline cards.
 */
export const ExperienceSection: React.FC = React.memo(() => {
  return (
    <section id="experience" className="py-24 relative z-10 border-t border-[#3c4043] gpu-accelerated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4285F4]/10 border border-[#4285F4]/30 text-[#8ab4f8] text-xs font-mono">
            <Briefcase className="w-3.5 h-3.5 text-[#4285F4]" />
            <span>CAREER TRAJECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#e8eaed]">
            WORK <span className="text-gradient-google">EXPERIENCE</span>
          </h2>
          <p className="text-sm font-mono text-slate-400">
            Leadership roles, architectural contributions, and high-impact engineering milestones.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto relative pl-6 md:pl-8 border-l-2 border-[#4285F4]/30 space-y-12">
          {PORTFOLIO_DATA.experience.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative space-y-4"
            >
              {/* Timeline Node Dot */}
              <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-[#202124] border-2 border-[#4285F4] shadow-google-blue flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-[#4285F4] animate-ping" />
              </div>

              {/* Card */}
              <div className="glass-panel glass-panel-hover p-6 rounded-3xl border border-[#3c4043] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#3c4043] pb-4">
                  <div>
                    <span className="text-xs font-mono text-[#4285F4] font-semibold uppercase tracking-wider">
                      {exp.company}
                    </span>
                    <h3 className="text-xl font-display font-bold text-slate-100">
                      {exp.role}
                    </h3>
                  </div>

                  <div className="flex flex-col sm:items-end text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1 text-[#8ab4f8]">
                      <Calendar className="w-3.5 h-3.5 text-[#4285F4]" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500 mt-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Highlights List */}
                <ul className="space-y-2 text-xs text-slate-300 font-sans">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#34A853] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.skills.map((s, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-md bg-[#202124] border border-[#3c4043] text-[10px] font-mono text-[#8ab4f8]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

ExperienceSection.displayName = 'ExperienceSection';
