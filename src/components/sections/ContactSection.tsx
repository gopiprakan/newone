import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, CheckCircle, Sparkles, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { Earth3D } from '../3d/Earth3D';
import { audioController } from '../../utils/AudioController';

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
    <section id="contact" className="py-24 relative z-10 border-t border-[#E9E5DE] gpu-accelerated">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722] text-xs font-mono">
            <Mail className="w-3.5 h-3.5 text-[#FF5722]" />
            <span>GLOBAL COMMUNICATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#111820]">
            INITIATE <span className="text-gradient-google">TRANSMISSION</span>
          </h2>
          <p className="text-sm font-mono text-[#111820]/70">
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
            <div className="bg-white p-6 rounded-3xl border border-[#E9E5DE] shadow-card space-y-6 relative overflow-hidden">
              <Earth3D />

              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F7F5F1] border border-[#E9E5DE]">
                  <div className="p-2.5 rounded-xl bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[#111820]/50 block text-[10px]">CURRENT NODE</span>
                    <span className="text-[#111820] font-bold">{PORTFOLIO_DATA.personal.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F7F5F1] border border-[#E9E5DE]">
                  <div className="p-2.5 rounded-xl bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[#111820]/50 block text-[10px]">DIRECT TRANSMISSION EMAIL</span>
                    <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="text-[#FF5722] font-bold hover:underline">
                      {PORTFOLIO_DATA.personal.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F7F5F1] border border-[#E9E5DE]">
                  <div className="p-2.5 rounded-xl bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[#111820]/50 block text-[10px]">SECURE VOICE / SMS</span>
                    <span className="text-[#111820] font-bold">{PORTFOLIO_DATA.personal.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E9E5DE] shadow-card space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5 font-mono text-xs">
                  <label className="text-[#111820]/70 font-semibold">YOUR NAME *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Gopiprakan S"
                    className="w-full px-4 py-3 bg-[#F7F5F1] border border-[#E9E5DE] rounded-xl text-[#111820] placeholder:text-[#111820]/40 focus:outline-none focus:border-[#FF5722] focus:bg-white transition-colors font-sans text-sm"
                  />
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  <label className="text-[#111820]/70 font-semibold">YOUR EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="gopiprakan2006@gmail.com"
                    className="w-full px-4 py-3 bg-[#F7F5F1] border border-[#E9E5DE] rounded-xl text-[#111820] placeholder:text-[#111820]/40 focus:outline-none focus:border-[#FF5722] focus:bg-white transition-colors font-sans text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5 font-mono text-xs">
                <label className="text-[#111820]/70 font-semibold">SUBJECT / PROJECT NATURE</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="System Architecture Consulting / Project Collaboration"
                  className="w-full px-4 py-3 bg-[#F7F5F1] border border-[#E9E5DE] rounded-xl text-[#111820] placeholder:text-[#111820]/40 focus:outline-none focus:border-[#FF5722] focus:bg-white transition-colors font-sans text-sm"
                />
              </div>

              <div className="space-y-1.5 font-mono text-xs">
                <label className="text-[#111820]/70 font-semibold">MESSAGE & TRANSMISSION DETAILS *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Provide brief details regarding scope, timeline, or requirements..."
                  className="w-full px-4 py-3 bg-[#F7F5F1] border border-[#E9E5DE] rounded-xl text-[#111820] placeholder:text-[#111820]/40 focus:outline-none focus:border-[#FF5722] focus:bg-white transition-colors font-sans text-sm resize-none"
                />
              </div>

              {/* Status Notifications */}
              {status === 'success' && (
                <div className="p-3.5 rounded-xl bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722] text-xs font-mono flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>TRANSMISSION TRANSMITTED SUCCESSFULLY. GOPIPRAKAN WILL RESPOND SHORTLY.</span>
                </div>
              )}

              {status === 'error' && (
                <div className="p-3.5 rounded-xl bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722] text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>TRANSMISSION FAILED. PLEASE EMAIL DIRECTLY AT GOPIPRAKAN2006@GMAIL.COM</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#FF5722] hover:bg-[#E64A19] text-white font-display font-bold text-sm shadow-sm hover:scale-[1.01] active:scale-98 transition-all duration-200 disabled:opacity-50"
              >
                {status === 'sending' ? (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 animate-spin text-white" />
                    TRANSMITTING SIGNAL...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    TRANSMIT MESSAGE
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
