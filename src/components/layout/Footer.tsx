import React, { useState, useEffect } from 'react';
import { Cpu, ArrowUp, Github, Linkedin, Twitter, Youtube, Activity } from 'lucide-react';
import { audioController } from '../../utils/AudioController';

/**
 * PERFORMANCE OPTIMIZED FOOTER
 * Optimizations implemented:
 * 1. React.memo: Prevents footer re-renders when parent state updates.
 * 2. Timer Cleanup: Properly disposes visitor count update interval.
 */
interface FooterProps {
  onSectionChange: (id: string) => void;
}

/**
 * PERFORMANCE OPTIMIZED FOOTER
 * Optimizations implemented:
 * 1. React.memo: Prevents footer re-renders when parent state updates.
 * 2. Timer Cleanup: Properly disposes visitor count update interval.
 */
export const Footer: React.FC<FooterProps> = React.memo(({ onSectionChange }) => {
  const [visitorCount, setVisitorCount] = useState(142850);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount((prev) => prev + Math.floor(Math.random() * 2) + 1);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const handleBackToTop = () => {
    audioController.playClick();
    onSectionChange('home');
  };

  return (
    <footer className="relative bg-[#050505] border-t border-[#262626] pt-16 pb-12 overflow-hidden text-slate-400 gpu-accelerated">
      {/* Glow background line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#FF5F1F] to-transparent shadow-google-blue" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#FF5F1F]/10 border border-[#FF5F1F]/30 text-[#FF5F1F]">
                <Cpu className="w-6 h-6 animate-pulse" />
              </div>
              <span className="font-display font-bold text-xl text-gradient-google tracking-wider">
                GOPIPRAKAN
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              AI & Data Science Student building intelligent applications, web automation systems, and full-stack software solutions.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF5F1F]/10 border border-[#FF5F1F]/30 text-[#FF5F1F] text-xs font-mono">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>SYSTEM STATUS: 100% OPERATIONAL</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-slate-200 text-sm tracking-wider uppercase text-[#FF5F1F]">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-left">
              {['home', 'about', 'skills', 'projects', 'achievements', 'contact'].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => {
                      audioController.playClick();
                      onSectionChange(link);
                    }}
                    className="hover:text-[#FF5F1F] transition-colors uppercase tracking-wider font-mono focus:outline-none"
                  >
                    // {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Connections & Live Visitor Counter */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-slate-200 text-sm tracking-wider uppercase text-[#FF5F1F]">
              Connect & Telemetry
            </h4>
            <div className="flex items-center gap-3">
              {[
                { icon: Github, url: 'https://github.com' },
                { icon: Linkedin, url: 'https://linkedin.com' },
                { icon: Twitter, url: 'https://x.com' },
                { icon: Youtube, url: 'https://youtube.com' },
              ].map((soc, i) => {
                const IconComp = soc.icon;
                return (
                  <a
                    key={i}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-[#121212] border border-[#262626] text-slate-400 hover:text-[#FF5F1F] hover:border-[#FF5F1F]/40 hover:scale-110 transition-all duration-300"
                  >
                    <IconComp className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            {/* Live Visitor Counter Badge */}
            <div className="p-3 rounded-xl bg-[#121212]/90 border border-[#262626] flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">GLOBAL VISITORS</span>
              <span className="text-sm font-mono font-bold text-gradient-google">
                {visitorCount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright & Back to top button */}
        <div className="pt-8 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© {new Date().getFullYear()} Gopiprakan. All rights reserved.</p>

          <button
            onClick={handleBackToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#121212] border border-[#262626] text-[#FF5F1F] hover:bg-[#FF5F1F] hover:text-white transition-all duration-300 shadow-google-blue"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
