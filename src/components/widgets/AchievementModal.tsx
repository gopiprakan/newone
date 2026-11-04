import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Calendar, Trophy } from 'lucide-react';
import { Achievement } from '../../data/portfolioData';
import { audioController } from '../../utils/AudioController';

interface AchievementModalProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export const AchievementModal: React.FC<AchievementModalProps> = React.memo(({ achievement, onClose }) => {
  if (!achievement) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111820]/60 backdrop-blur-md gpu-accelerated">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white border border-[#E9E5DE] rounded-3xl shadow-2xl overflow-hidden text-[#111820] p-6 md:p-8 space-y-6 gpu-accelerated"
        >
          <button
            onClick={() => {
              audioController.playClick();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#F7F5F1] border border-[#E9E5DE] text-[#111820] hover:text-[#FF5722] shadow-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722]">
              <Trophy className="w-8 h-8 animate-bounce" />
            </div>
            <div>
              <span className="text-xs font-mono text-[#FF5722] font-semibold uppercase tracking-wider">
                {achievement.rank}
              </span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-[#111820]">
                {achievement.title}
              </h3>
            </div>
          </div>

          <div className="h-56 w-full rounded-2xl overflow-hidden border border-[#E9E5DE] relative bg-[#F7F5F1]">
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
            <div className="flex flex-wrap items-center justify-between text-[#111820]/70 border-b border-[#E9E5DE] pb-3">
              <span className="font-semibold text-[#111820]">Organizer: {achievement.organizer}</span>
              <span className="flex items-center gap-1 text-[#FF5722] font-mono font-semibold">
                <Calendar className="w-3.5 h-3.5 text-[#FF5722]" />
                {achievement.date}
              </span>
            </div>

            <p className="text-[#111820]/80 leading-relaxed">{achievement.description}</p>
          </div>

          <div className="pt-2 flex justify-end">
            <a
              href={achievement.certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold text-xs shadow-sm"
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
