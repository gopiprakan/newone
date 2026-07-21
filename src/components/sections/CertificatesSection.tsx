import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

/**
 * PERFORMANCE OPTIMIZED CERTIFICATES SECTION
 * Optimizations implemented:
 * 1. React.memo: Avoids re-renders on parent state updates.
 * 2. Image Loading Attributes: Lazy loading & async decoding.
 */
export const CertificatesSection: React.FC = React.memo(() => {
  return (
    <section id="certificates" className="py-24 relative z-10 border-t border-cyan-500/10 gpu-accelerated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono">
            <Award className="w-3.5 h-3.5" />
            <span>VERIFIED CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-100">
            CERTIFICATE <span className="text-gradient-purple">GALLERY</span>
          </h2>
          <p className="text-sm font-mono text-slate-400">
            Industry recognized certifications from AWS, Stanford DeepLearning.AI, and Meta.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PORTFOLIO_DATA.certificates.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-panel glass-panel-hover p-6 rounded-3xl border border-purple-500/20 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="h-44 w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 relative group">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={200}
                    className="w-full h-full object-cover filter brightness-105 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-neon-purple"
                    >
                      Verify License
                    </a>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-cyan-400 block mb-1">
                    {cert.issuer} • {cert.issueDate}
                  </span>
                  <h3 className="text-base font-display font-bold text-slate-100">
                    {cert.title}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-500 block mt-1">
                    ID: {cert.credentialId}
                  </span>
                </div>

                {/* Skills learned */}
                <div className="flex flex-wrap gap-1">
                  {cert.skillsLearned.map((s, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-purple-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-900 border border-purple-500/30 text-purple-300 font-mono text-xs font-semibold hover:bg-purple-500/20 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Verify</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

CertificatesSection.displayName = 'CertificatesSection';
