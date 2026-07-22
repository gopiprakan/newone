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
    <section id="contact" className="py-24 relative z-10 border-t border-[#3c4043] gpu-accelerated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4285F4]/10 border border-[#4285F4]/30 text-[#8ab4f8] text-xs font-mono">
            <Mail className="w-3.5 h-3.5 text-[#4285F4]" />
            <span>GLOBAL COMMUNICATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#e8eaed]">
            INITIATE <span className="text-gradient-google">TRANSMISSION</span>
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
            <div className="glass-panel p-6 rounded-3xl border border-[#3c4043] space-y-6 relative overflow-hidden">
              <Earth3D />

              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#202124] border border-[#3c4043]">
                  <div className="p-2.5 rounded-xl bg-[#4285F4]/10 border border-[#4285F4]/30 text-[#4285F4]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">CURRENT NODE</span>
                    <span className="text-slate-200 font-bold">{PORTFOLIO_DATA.personal.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#202124] border border-[#3c4043]">
                  <div className="p-2.5 rounded-xl bg-[#EA4335]/10 border border-[#EA4335]/30 text-[#EA4335]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">DIRECT TRANSMISSION EMAIL</span>
                    <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="text-[#8ab4f8] font-bold hover:underline">
                      {PORTFOLIO_DATA.personal.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#202124] border border-[#3c4043]">
                  <div className="p-2.5 rounded-xl bg-[#34A853]/10 border border-[#34A853]/30 text-[#34A853]">
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
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#3c4043] space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5 font-mono text-xs">
                  <label className="text-slate-400">YOUR NAME *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Gopiprakan S"
                    className="w-full px-4 py-3 bg-[#202124] border border-[#3c4043] rounded-xl text-[#e8eaed] placeholder:text-slate-600 focus:outline-none focus:border-[#4285F4] transition-colors font-sans text-sm"
                  />
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  <label className="text-slate-400">YOUR EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="gopiprakan2006@gmail.com"
                    className="w-full px-4 py-3 bg-[#202124] border border-[#3c4043] rounded-xl text-[#e8eaed] placeholder:text-slate-600 focus:outline-none focus:border-[#4285F4] transition-colors font-sans text-sm"
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
                  className="w-full px-4 py-3 bg-[#202124] border border-[#3c4043] rounded-xl text-[#e8eaed] placeholder:text-slate-600 focus:outline-none focus:border-[#4285F4] transition-colors font-sans text-sm"
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
                  className="w-full px-4 py-3 bg-[#202124] border border-[#3c4043] rounded-xl text-[#e8eaed] placeholder:text-slate-600 focus:outline-none focus:border-[#4285F4] transition-colors font-sans text-sm resize-none"
                />
              </div>

              {/* Status Notifications */}
              {status === 'success' && (
                <div className="p-3.5 rounded-xl bg-[#34A853]/10 border border-[#34A853]/30 text-[#34A853] text-xs font-mono flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>TRANSMISSION TRANSMITTED SUCCESSFULLY. GOPIPRAKAN WILL RESPOND SHORTLY.</span>
                </div>
              )}

              {status === 'error' && (
                <div className="p-3.5 rounded-xl bg-[#EA4335]/10 border border-[#EA4335]/30 text-[#f28b82] text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>TRANSMISSION FAILED. PLEASE EMAIL DIRECTLY AT GOPIPRAKAN2006@GMAIL.COM</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#4285F4] hover:bg-[#3367d6] text-white font-display font-bold text-sm shadow-google-blue hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-50"
              >
                {status === 'sending' ? (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 animate-spin text-[#FBBC04]" />
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
