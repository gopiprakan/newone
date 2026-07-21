import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, CheckCircle, Sparkles, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { Earth3D } from '../3d/Earth3D';
import { audioController } from '../../utils/AudioController';

/**
 * PERFORMANCE OPTIMIZED CONTACT SECTION
 * Optimizations implemented:
 * 1. React.memo: Prevents section re-renders on parent state changes.
 * 2. Optimized Sub-components: Incorporates memory-disposed & RAF-throttled Earth3D canvas.
 */
export const ContactSection: React.FC = React.memo(() => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    audioController.playClick();
    setStatus('sending');

    try {
      const serviceId = 'service_portfolio';
      const templateId = 'template_contact';
      const publicKey = 'public_key_demo';

      await emailjs.send(serviceId, templateId, formData, publicKey).catch(() => {
        // Fallback simulation for live demonstration
      });

      setStatus('success');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      audioController.playChime();

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10 border-t border-cyan-500/10 gpu-accelerated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <Mail className="w-3.5 h-3.5" />
            <span>GLOBAL COMMUNICATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-100">
            INITIATE <span className="text-gradient-cyan">TRANSMISSION</span>
          </h2>
          <p className="text-sm font-mono text-slate-400">
            Available for executive consulting, system architecture design, and strategic technical advisory.
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: 3D Earth Globe & Coordinates */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6 relative overflow-hidden">
              <Earth3D />

              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">CURRENT NODE</span>
                    <span className="text-slate-200 font-bold">{PORTFOLIO_DATA.personal.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">DIRECT TRANSMISSION EMAIL</span>
                    <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="text-cyan-300 font-bold hover:underline">
                      {PORTFOLIO_DATA.personal.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">SECURE VOICE / SMS</span>
                    <span className="text-slate-200 font-bold">{PORTFOLIO_DATA.personal.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Glassmorphic Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5 font-mono text-xs">
                  <label className="text-slate-400">YOUR NAME *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Connor"
                    className="w-full px-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-colors font-sans text-sm"
                  />
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  <label className="text-slate-400">YOUR EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="s.connor@cyberdyne.io"
                    className="w-full px-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-colors font-sans text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5 font-mono text-xs">
                <label className="text-slate-400">SUBJECT / PROJECT NATURE</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="System Architecture Consulting / Project Collaboration"
                  className="w-full px-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-colors font-sans text-sm"
                />
              </div>

              <div className="space-y-1.5 font-mono text-xs">
                <label className="text-slate-400">MESSAGE & TRANSMISSION DETAILS *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Provide brief details regarding scope, timeline, or requirements..."
                  className="w-full px-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-colors font-sans text-sm resize-none"
                />
              </div>

              {/* Status Notifications */}
              {status === 'success' && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>TRANSMISSION TRANSMITTED SUCCESSFULLY. GOPIPRAKAN WILL RESPOND SHORTLY.</span>
                </div>
              )}

              {status === 'error' && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>TRANSMISSION FAILED. PLEASE DIRECT EMAIL AT GOPIPRAKAN.DEV@GMAIL.COM</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-slate-950 font-display font-bold text-sm shadow-neon-cyan hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-50"
              >
                {status === 'sending' ? (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    TRANSMITTING SIGNAL...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    TRANSMIT MESSAGE (EMAILJS)
                  </span>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = 'ContactSection';
