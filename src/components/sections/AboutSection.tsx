import React from 'react';
import { motion } from 'framer-motion';
import { User, GraduationCap, Target, Award, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 relative z-10 border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <User className="w-3.5 h-3.5" />
            <span>EXECUTIVE PROFILE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-100">
            ABOUT <span className="text-gradient-cyan">ALEX RIVERS</span>
          </h2>
          <p className="text-sm font-mono text-slate-400">
            Passionate software architect engineering autonomous AI systems and 3D web applications.
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
            <div className="relative mx-auto w-72 sm:w-80 h-96 rounded-3xl p-1 bg-gradient-to-br from-cyan-500 via-purple-600 to-pink-500 shadow-neon-cyan group">
              <div className="w-full h-full rounded-[22px] bg-slate-950 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                  alt="Alex Rivers Professional"
                  className="w-full h-full object-cover filter brightness-105 contrast-105 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                {/* Floating CGPA Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-cyan-400" />
                    <span className="text-xs font-mono text-slate-300">Stanford & Berkeley Alumni</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-gradient-cyan">
                    CGPA {PORTFOLIO_DATA.personal.stats.cgpa}
                  </span>
                </div>
              </div>

              {/* Decorative 3D Frame Ring Overlay */}
              <div className="absolute -inset-4 border border-cyan-500/20 rounded-[36px] pointer-events-none -z-10 animate-spin-slow" />
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
              <h3 className="text-2xl font-display font-bold text-slate-100">
                Architecting high-frequency systems with pixel-perfect design elegance.
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                With over 6+ years of specialized experience across Stanford AI Vision Lab and high-growth Silicon Valley startups, I bridge the gap between complex AI model inference and fluid 60 FPS WebGL user interfaces.
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                My work focuses on building fault-tolerant microservices, optimizing low-level 3D graphics shaders, and deploying autonomous agentic workflows that process millions of events daily.
              </p>
            </div>

            {/* Career Objective Box */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-purple-500/30 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-semibold">
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
                'Distributed AI Systems & LLM Agents',
                'Photorealistic Three.js & WebGL 3D',
                'Sub-50ms Microservice Latency',
                'Clean Modular TypeScript Architecture'
              ].map((pillar, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{pillar}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
