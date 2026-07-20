import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Calendar, Trophy, ExternalLink } from 'lucide-react';
import { Achievement } from '../../data/portfolioData';
import { audioController } from '../../utils/AudioController';

interface AchievementModalProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export const AchievementModal: React.FC<AchievementModalProps> = ({ achievement, onClose }) => {
  if (!achievement) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-[#080d1b] border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden text-slate-100 p-6 md:p-8 space-y-6"
        >
          <button
            onClick={() => {
              audioController.playClick();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 border border-slate-700 text-slate-400 hover:text-cyan-400"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-neon-cyan">
              <Trophy className="w-8 h-8 animate-bounce" />
            </div>
            <div>
              <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                {achievement.rank}
              </span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-gradient-gold">
                {achievement.title}
              </h3>
            </div>
          </div>

          <div className="h-56 w-full rounded-2xl overflow-hidden border border-cyan-500/20 relative">
            <img
              src={achievement.image}
              alt={achievement.title}
              className="w-full h-full object-cover filter brightness-105"
            />
          </div>

          <div className="space-y-3 font-sans text-xs">
            <div className="flex flex-wrap items-center justify-between text-slate-400 border-b border-slate-800 pb-3">
              <span className="font-semibold text-slate-200">Organizer: {achievement.organizer}</span>
              <span className="flex items-center gap-1 text-cyan-400 font-mono">
                <Calendar className="w-3.5 h-3.5" />
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
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-bold text-xs shadow-neon-cyan hover:brightness-110"
            >
              <Award className="w-4 h-4" />
              <span>View Verified Certificate</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
