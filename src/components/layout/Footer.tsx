import React, { useState, useEffect } from 'react';
import { Cpu, ArrowUp, Github, Linkedin, Twitter, Youtube, Activity } from 'lucide-react';
import { audioController } from '../../utils/AudioController';

interface FooterProps {
  onSectionChange: (id: string) => void;
}

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
    <footer className="relative bg-white border-t border-[#E9E5DE] pt-16 pb-12 overflow-hidden text-[#111820]/70 gpu-accelerated">
      {/* Accent Top Border Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-[#FF5722] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722]">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl text-[#111820] tracking-tight">
                GOPI<span className="text-[#FF5722]">PRAKAN</span>
              </span>
            </div>
            <p className="text-sm text-[#111820]/70 max-w-md leading-relaxed">
              AI & Data Science Student engineering intelligent AI architectures, robust full-stack software applications, and scalable web solutions.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722] text-xs font-mono">
              <Activity className="w-3.5 h-3.5" />
              <span>SYSTEM STATUS: 100% OPERATIONAL</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-[#111820] text-sm tracking-wider uppercase">
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
                    className="hover:text-[#FF5722] transition-colors uppercase tracking-wider font-mono focus:outline-none"
                  >
                    // {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Connections & Telemetry */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-[#111820] text-sm tracking-wider uppercase">
              Connect & Telemetry
            </h4>
            <div className="flex items-center gap-2.5">
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
                    className="p-2.5 rounded-xl bg-[#F7F5F1] border border-[#E9E5DE] text-[#111820]/70 hover:text-[#FF5722] hover:border-[#FF5722]/40 transition-all duration-200"
                  >
                    <IconComp className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            <div className="p-3 rounded-2xl bg-[#F7F5F1] border border-[#E9E5DE] space-y-1">
              <span className="text-[10px] font-mono text-[#111820]/50 block uppercase">
                Cumulative Visitors
              </span>
              <span className="text-sm font-mono font-bold text-[#FF5722]">
                {visitorCount.toLocaleString()} HITS
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#E9E5DE] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#111820]/60">
          <div>
            &copy; {new Date().getFullYear()} Gopiprakan S. Engineered with React, Three.js & Tailwind.
          </div>

          <button
            onClick={handleBackToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F7F5F1] border border-[#E9E5DE] text-[#111820] hover:text-[#FF5722] hover:border-[#FF5722]/40 transition-all duration-200"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#FF5722]" />
          </button>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
