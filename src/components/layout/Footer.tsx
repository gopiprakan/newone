import React, { useState, useEffect } from 'react';
import { Cpu, ArrowUp, Github, Linkedin, Twitter, Youtube, Activity } from 'lucide-react';
import { audioController } from '../../utils/AudioController';

/**
 * PERFORMANCE OPTIMIZED FOOTER
 * Optimizations implemented:
 * 1. React.memo: Prevents footer re-renders when parent state updates.
 * 2. Timer Cleanup: Properly disposes visitor count update interval.
 */
export const Footer: React.FC = React.memo(() => {
  const [visitorCount, setVisitorCount] = useState(142850);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount((prev) => prev + Math.floor(Math.random() * 2) + 1);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    audioController.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#202124] border-t border-[#3c4043] pt-16 pb-12 overflow-hidden text-slate-400 gpu-accelerated">
      {/* Glow background line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#4285F4] to-transparent shadow-google-blue" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#4285F4]/10 border border-[#4285F4]/30 text-[#4285F4]">
                <Cpu className="w-6 h-6 animate-pulse" />
              </div>
              <span className="font-display font-bold text-xl text-gradient-google tracking-wider">
                GOPIPRAKAN
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Google Antigravity Developer & AI Data Science Student building intelligent applications, web automation systems, and full-stack software solutions.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#34A853]/10 border border-[#34A853]/30 text-[#34A853] text-xs font-mono">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>SYSTEM STATUS: 100% OPERATIONAL</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-slate-200 text-sm tracking-wider uppercase text-[#4285F4]">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {['home', 'about', 'skills', 'projects', 'achievements', 'contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link}`}
                    className="hover:text-[#4285F4] transition-colors uppercase tracking-wider font-mono"
                  >
                    // {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Connections & Live Visitor Counter */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-slate-200 text-sm tracking-wider uppercase text-[#4285F4]">
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
                    className="p-2.5 rounded-xl bg-[#2d2e31] border border-[#3c4043] text-slate-400 hover:text-[#4285F4] hover:border-[#4285F4]/40 hover:scale-110 transition-all duration-300"
                  >
                    <IconComp className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            {/* Live Visitor Counter Badge */}
            <div className="p-3 rounded-xl bg-[#2d2e31]/90 border border-[#3c4043] flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">GLOBAL VISITORS</span>
              <span className="text-sm font-mono font-bold text-gradient-google">
                {visitorCount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright & Back to top button */}
        <div className="pt-8 border-t border-[#3c4043] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© {new Date().getFullYear()} Gopiprakan. Google Antigravity Theme.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2d2e31] border border-[#3c4043] text-[#4285F4] hover:bg-[#4285F4] hover:text-white transition-all duration-300 shadow-google-blue"
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
