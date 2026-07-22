import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Calendar, Trophy } from 'lucide-react';
import { Achievement } from '../../data/portfolioData';
import { audioController } from '../../utils/AudioController';

interface AchievementModalProps {
  achievement: Achievement | null;
  onClose: () => void;
}

/**
 * PERFORMANCE OPTIMIZED ACHIEVEMENT MODAL
 * Optimizations implemented:
 * 1. React.memo: Prevents unnecessary modal re-renders.
 * 2. Image Loading Attributes: Lazy loading & async decoding.
 */
export const AchievementModal: React.FC<AchievementModalProps> = React.memo(({ achievement, onClose }) => {
  if (!achievement) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl gpu-accelerated">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-[#2d2e31] border border-[#3c4043] rounded-3xl shadow-2xl overflow-hidden text-[#e8eaed] p-6 md:p-8 space-y-6 gpu-accelerated"
        >
          <button
            onClick={() => {
              audioController.playClick();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#202124] border border-[#3c4043] text-slate-400 hover:text-[#4285F4]"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-[#FBBC04]/10 border border-[#FBBC04]/30 text-[#FBBC04]">
              <Trophy className="w-8 h-8 animate-bounce" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#FBBC04] font-semibold uppercase tracking-wider">
                {achievement.rank}
              </span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-gradient-gold">
                {achievement.title}
              </h3>
            </div>
          </div>

          <div className="h-56 w-full rounded-2xl overflow-hidden border border-[#3c4043] relative">
            <img
              src={achievement.image}
              alt={achievement.title}
              loading="lazy"
              decoding="async"
              width={600}
              height={224}
              className="w-full h-full object-cover filter brightness-105"
            />
          </div>

          <div className="space-y-3 font-sans text-xs">
            <div className="flex flex-wrap items-center justify-between text-slate-400 border-b border-[#3c4043] pb-3">
              <span className="font-semibold text-slate-200">Organizer: {achievement.organizer}</span>
              <span className="flex items-center gap-1 text-[#8ab4f8] font-mono">
                <Calendar className="w-3.5 h-3.5 text-[#4285F4]" />
                {achievement.date}
              </span>
            </div>

            <p className="text-slate-300 leading-relaxed">{achievement.description}</p>
          </div>

          <div className="pt-2 flex justify-end">
            <a
              href={achievement.certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4285F4] hover:bg-[#3367d6] text-white font-bold text-xs shadow-google-blue"
            >
              <Award className="w-4 h-4" />
              <span>View Verified Certificate</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
});

AchievementModal.displayName = 'AchievementModal';
