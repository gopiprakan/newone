import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AISphere } from '../3d/AISphere';
import { Cpu } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = React.memo(({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('BOOTING CORE ENGINE...');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const statuses = [
      'BOOTING CORE ENGINE...',
      'INITIALIZING AI WORKFLOWS...',
      'SYNCHRONIZING PORTFOLIO ASSETS...',
      'RENDERING APPLICATION MATRIX...',
      'SYSTEM ONLINE.'
    ];

    let finishTimeout1: number;
    let finishTimeout2: number;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next >= 100) {
          clearInterval(timer);
          setStatusText('SYSTEM ONLINE.');
          finishTimeout1 = window.setTimeout(() => {
            setIsFinished(true);
            finishTimeout2 = window.setTimeout(onComplete, 800);
          }, 400);
          return 100;
        }

        if (next > 75) setStatusText(statuses[3]);
        else if (next > 50) setStatusText(statuses[2]);
        else if (next > 25) setStatusText(statuses[1]);

        return next;
      });
    }, 70);

    return () => {
      clearInterval(timer);
      if (finishTimeout1) clearTimeout(finishTimeout1);
      if (finishTimeout2) clearTimeout(finishTimeout2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F7F5F1] text-[#111820] overflow-hidden gpu-accelerated"
        >
          {/* Ambient Warm Glow */}
          <div className="absolute w-96 h-96 bg-[#FF8A50]/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

          {/* 3D Sphere Container */}
          <div className="w-60 h-60 md:w-72 md:h-72 relative mb-4">
            <AISphere interactive={false} />
          </div>

          {/* Logo & Brand Title */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="p-2.5 rounded-xl bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722]">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-[#111820]">
              GOPI<span className="text-[#FF5722]">PRAKAN</span>
            </span>
          </motion.div>

          {/* Progress Percentage & Status */}
          <div className="w-72 md:w-80 flex flex-col items-center gap-2.5">
            <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-[#E9E5DE] p-0.5 shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FF5722] to-[#FF8A50] rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.2 }}
              />
            </div>

            <div className="flex items-center justify-between w-full text-xs font-mono">
              <span className="text-[#111820]/70">{statusText}</span>
              <span className="text-[#FF5722] font-bold">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

Preloader.displayName = 'Preloader';
