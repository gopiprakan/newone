import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const ExperienceSection: React.FC = React.memo(() => {
  return (
    <section id="experience" className="py-24 relative z-10 border-t border-[#E9E5DE] gpu-accelerated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722] text-xs font-mono">
            <Briefcase className="w-3.5 h-3.5 text-[#FF5722]" />
            <span>CAREER TRAJECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#111820]">
            WORK <span className="text-gradient-google">EXPERIENCE</span>
          </h2>
          <p className="text-sm font-mono text-[#111820]/70">
            Leadership roles, architectural contributions, and high-impact engineering milestones.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto relative pl-6 md:pl-8 border-l-2 border-[#E9E5DE] space-y-12">
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
              <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-white border-2 border-[#FF5722] shadow-sm flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-[#FF5722] animate-ping" />
              </div>

              {/* Card */}
              <div className="bg-white p-6 rounded-3xl border border-[#E9E5DE] shadow-card hover:shadow-card-hover space-y-4 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E9E5DE] pb-4">
                  <div>
                    <span className="text-xs font-mono text-[#FF5722] font-semibold uppercase tracking-wider">
                      {exp.company}
                    </span>
                    <h3 className="text-xl font-display font-bold text-[#111820]">
                      {exp.role}
                    </h3>
                  </div>

                  <div className="flex flex-col sm:items-end text-xs font-mono text-[#111820]/60">
                    <span className="flex items-center gap-1 text-[#FF5722] font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-[#FF5722]" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1 text-[#111820]/50 mt-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Highlights List */}
                <ul className="space-y-2 text-xs text-[#111820]/75 font-sans">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#FF5722] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.skills.map((s, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-md bg-[#F7F5F1] border border-[#E9E5DE] text-[10px] font-mono text-[#111820]"
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
