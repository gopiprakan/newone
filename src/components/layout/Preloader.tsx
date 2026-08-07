import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AISphere } from '../3d/AISphere';
import { Cpu } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

/**
 * PERFORMANCE OPTIMIZED PRELOADER
 * Optimizations implemented:
 * 1. React.memo: Prevents re-renders during state mutations.
 * 2. Timer Cleanup: Guarantees interval and timeout disposal.
 */
export const Preloader: React.FC<PreloaderProps> = React.memo(({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('BOOTING CORE ENGINE...');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const statuses = [
      'BOOTING CORE ENGINE...',
      'LOADING 3D GRAPHICS PIPELINE...',
      'SYNCHRONIZING VECTOR MEMORY...',
      'INITIALIZING NEURAL INTERFACE...',
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
    }, 80);

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
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-[#e8eaed] overflow-hidden gpu-accelerated"
        >
          {/* Google Ambient Glow Background */}
          <div className="absolute w-96 h-96 bg-[#FF5F1F]/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

          {/* 3D Sphere Container */}
          <div className="w-64 h-64 md:w-80 md:h-80 relative mb-4">
            <AISphere interactive={false} />
          </div>

          {/* Logo & Brand Title */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="p-2.5 rounded-xl bg-[#FF5F1F]/10 border border-[#FF5F1F]/30 text-[#FF5F1F] shadow-google-blue">
              <Cpu className="w-7 h-7 animate-pulse" />
            </div>
            <span className="font-display font-bold text-2xl tracking-widest text-gradient-google">
              GOPIPRAKAN // PORTFOLIO
            </span>
          </motion.div>

          {/* Progress Percentage & Status */}
          <div className="w-72 md:w-96 flex flex-col items-center gap-2">
            <div className="w-full h-2 bg-[#121212] rounded-full overflow-hidden border border-[#262626] p-0.5 shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FF5F1F] via-[#FF3D00] via-[#FF8F00] to-[#FF5F1F] rounded-full shadow-google-blue"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.2 }}
              />
            </div>
            <div className="w-full flex justify-between items-center text-xs font-mono tracking-wider text-slate-400 mt-1">
              <span className="text-[#FFA726] font-semibold">{statusText}</span>
              <span className="text-[#FF3D00] font-bold text-sm">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

Preloader.displayName = 'Preloader';
