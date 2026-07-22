import React from 'react';
import { motion } from 'framer-motion';
import { User, GraduationCap, Target, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

/**
 * PERFORMANCE OPTIMIZED ABOUT SECTION
 * Optimizations implemented:
 * 1. React.memo: Prevents section re-renders when parent state updates.
 * 2. Image Optimization: Lazy loading, asynchronous decoding & explicit dimensions for sub-50ms paint times.
 */
export const AboutSection: React.FC = React.memo(() => {
  return (
    <section id="about" className="py-24 relative z-10 border-t border-[#3c4043] gpu-accelerated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4285F4]/10 border border-[#4285F4]/30 text-[#8ab4f8] text-xs font-mono">
            <User className="w-3.5 h-3.5" />
            <span>EXECUTIVE PROFILE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#e8eaed]">
            ABOUT <span className="text-gradient-google">GOPIPRAKAN</span>
          </h2>
          <p className="text-sm font-mono text-slate-400">
            AI & Data Science Student engineering intelligent AI solutions, full-stack web applications, and automation systems.
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: 3D Frame Image Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto w-72 sm:w-80 h-96 rounded-3xl p-1 bg-gradient-to-br from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853] shadow-google-blue group">
              <div className="w-full h-full rounded-[22px] bg-[#202124] overflow-hidden relative">
                <img
                  src="/profile.jpg"
                  alt="Gopiprakan Professional"
                  loading="lazy"
                  decoding="async"
                  width={320}
                  height={384}
                  className="w-full h-full object-cover filter brightness-105 contrast-105 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#202124] via-transparent to-transparent opacity-80" />

                {/* Floating CGPA Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#2d2e31]/90 backdrop-blur-md border border-[#3c4043] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-[#4285F4]" />
                    <span className="text-xs font-mono text-slate-300">AI & Data Science Student</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-gradient-google">
                    CGPA {PORTFOLIO_DATA.personal.stats.cgpa}
                  </span>
                </div>
              </div>

              {/* Decorative Frame Overlay */}
              <div className="absolute -inset-4 border border-[#4285F4]/20 rounded-[36px] pointer-events-none -z-10 animate-spin-slow" />
            </div>
          </motion.div>

          {/* Right: Content & Objectives */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 font-sans"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-display font-bold text-[#e8eaed]">
                Building AI-powered applications & intelligent automation systems.
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                I am a passionate Artificial Intelligence & Data Science student based in Tamil Nadu, India. I specialize in building AI-driven web applications, machine learning workflows, full-stack solutions, and automated tools that solve real-world problems.
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                I thrive on exploring cutting-edge AI technologies, competing in competitive hackathons, and developing production-ready software products with intuitive user experiences.
              </p>
            </div>

            {/* Career Objective Box */}
            <div className="p-5 rounded-2xl bg-[#2d2e31] border border-[#3c4043] space-y-2">
              <div className="flex items-center gap-2 text-[#EA4335] font-mono text-xs font-semibold">
                <Target className="w-4 h-4" />
                <span>CAREER VISION & OBJECTIVE</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "{PORTFOLIO_DATA.personal.careerObjective}"
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Distributed AI Systems & Intelligent Agents',
                'Interactive WebGL & 3D Web Graphics',
                'Optimized Full-Stack Microservices',
                'Clean Modular TypeScript Architecture'
              ].map((pillar, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#2d2e31]/60 border border-[#3c4043] text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#34A853] shrink-0" />
                  <span>{pillar}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';
