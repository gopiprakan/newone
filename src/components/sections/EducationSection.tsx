import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-24 relative z-10 border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC FOUNDATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-100">
            HIGHER <span className="text-gradient-purple">EDUCATION</span>
          </h2>
          <p className="text-sm font-mono text-slate-400">
            Graduate and undergraduate research degrees from top global CS institutions.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto relative pl-6 md:pl-8 border-l-2 border-purple-500/20 space-y-12">
          {PORTFOLIO_DATA.education.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative space-y-4"
            >
              {/* Timeline Node Dot */}
              <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-slate-950 border-2 border-purple-400 shadow-neon-purple flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              </div>

              {/* Card */}
              <div className="glass-panel glass-panel-hover p-6 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-mono text-purple-400 font-semibold uppercase tracking-wider">
                      {edu.institution}
                    </span>
                    <h3 className="text-xl font-display font-bold text-slate-100">
                      {edu.degree}
                    </h3>
                  </div>

                  <div className="flex flex-col sm:items-end text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1 text-purple-300">
                      <Calendar className="w-3.5 h-3.5" />
                      {edu.duration}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400 font-bold mt-0.5">
                      <Award className="w-3.5 h-3.5" />
                      CGPA: {edu.cgpa}
                    </span>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-2 text-xs text-slate-300 font-sans">
                  {edu.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
