import React from 'react';
import { motion } from 'framer-motion';
import { User, GraduationCap, Target, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const AboutSection: React.FC = React.memo(() => {
  return (
    <section id="about" className="py-24 relative z-10 border-t border-[#E9E5DE] gpu-accelerated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722] text-xs font-mono">
            <User className="w-3.5 h-3.5" />
            <span>EXECUTIVE PROFILE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#111820]">
            ABOUT <span className="text-gradient-google">GOPIPRAKAN</span>
          </h2>
          <p className="text-sm font-mono text-[#111820]/70">
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
            <div className="relative mx-auto w-72 sm:w-80 h-96 rounded-3xl p-1 bg-gradient-to-br from-[#FF5722] via-[#FF8A50] to-[#FF5722] shadow-card-hover group">
              <div className="w-full h-full rounded-[22px] bg-white overflow-hidden relative border border-[#E9E5DE]">
                <img
                  src="/profile.jpg"
                  alt="Gopiprakan Professional"
                  loading="lazy"
                  decoding="async"
                  width={320}
                  height={384}
                  className="w-full h-full object-cover filter brightness-105 contrast-105 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111820]/60 via-transparent to-transparent opacity-80" />

                {/* Floating CGPA Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-[#E9E5DE] shadow-card flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-[#FF5722]" />
                    <span className="text-xs font-mono text-[#111820]">AI & Data Science Student</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#FF5722]">
                    CGPA {PORTFOLIO_DATA.personal.stats.cgpa}
                  </span>
                </div>
              </div>

              {/* Decorative Frame Overlay */}
              <div className="absolute -inset-4 border border-[#FF5722]/20 rounded-[36px] pointer-events-none -z-10 animate-spin-slow" />
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
              <h3 className="text-2xl font-display font-bold text-[#111820]">
                Building AI-powered applications & intelligent automation systems.
              </h3>
              <p className="text-[#111820]/75 text-sm leading-relaxed">
                I am a passionate Artificial Intelligence & Data Science student based in Tamil Nadu, India. I specialize in building AI-driven web applications, machine learning workflows, full-stack solutions, and automated tools that solve real-world problems.
              </p>
              <p className="text-[#111820]/75 text-sm leading-relaxed">
                I thrive on exploring cutting-edge AI technologies, competing in competitive hackathons, and developing production-ready software products with intuitive user experiences.
              </p>
            </div>

            {/* Career Objective Box */}
            <div className="p-5 rounded-2xl bg-white border border-[#E9E5DE] shadow-card space-y-2">
              <div className="flex items-center gap-2 text-[#FF5722] font-mono text-xs font-semibold">
                <Target className="w-4 h-4" />
                <span>CAREER VISION & OBJECTIVE</span>
              </div>
              <p className="text-xs text-[#111820]/80 leading-relaxed italic">
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
                <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#E9E5DE] text-xs text-[#111820] shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5722] shrink-0" />
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
