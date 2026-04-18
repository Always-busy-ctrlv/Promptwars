'use client';

import React from 'react';
import { DEMO_ACHIEVEMENTS } from '@/lib/constants';
import { Trophy } from 'lucide-react';

/** Achievement badge grid showing unlocked and locked achievements. */
export const AchievementBadges: React.FC = () => {
  const unlocked = DEMO_ACHIEVEMENTS.filter((a) => a.unlocked);

  return (
    <div className="glass-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-amber-50 rounded-lg text-amber-600">
            <Trophy size={16} />
          </div>
          <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">
            Achievements · {unlocked.length}/{DEMO_ACHIEVEMENTS.length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {DEMO_ACHIEVEMENTS.map((badge) => (
          <div
            key={badge.id}
            className={`rounded-xl p-2.5 text-center transition-all ${
              badge.unlocked
                ? 'bg-gradient-to-b from-amber-50 to-orange-50 border border-amber-200 shadow-sm'
                : 'bg-slate-100/60 border border-slate-200/50 opacity-50 grayscale'
            }`}
          >
            <div className="text-2xl mb-1">{badge.emoji}</div>
            <p className="text-[9px] font-bold text-cyan-950 leading-tight">{badge.title}</p>
            {badge.unlocked && (
              <p className="text-[8px] text-amber-600 font-semibold mt-0.5">Unlocked!</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
