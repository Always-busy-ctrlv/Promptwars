'use client';

import React from 'react';
import { DEMO_FAN_ENERGY } from '@/lib/constants';
import { Zap, ChevronRight } from 'lucide-react';

/** Gamified fan energy meter showing progress toward milestones. */
export const FanEnergyMeter: React.FC = () => {
  const { level, milestone, nextMilestone, pointsToNext } = DEMO_FAN_ENERGY;

  const getGradient = () => {
    if (level < 30) return 'from-blue-500 to-cyan-400';
    if (level < 60) return 'from-cyan-500 to-emerald-400';
    if (level < 85) return 'from-emerald-500 to-amber-400';
    return 'from-amber-500 to-rose-500';
  };

  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-amber-50 rounded-lg text-amber-600">
            <Zap size={16} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Fan Energy</p>
            <p className="text-sm font-bold text-cyan-950">{milestone}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-cyan-950 tabular-nums leading-none">{level}</p>
          <p className="text-[9px] text-cyan-500 font-semibold">/ 100</p>
        </div>
      </div>

      {/* Energy Bar */}
      <div className="h-3 bg-cyan-100 rounded-full overflow-hidden mb-2">
        <div
          className={`h-full bg-gradient-to-r ${getGradient()} rounded-full transition-all duration-1000 ease-out relative`}
          style={{ width: `${level}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px]">
        <span className="text-cyan-500 font-semibold">{pointsToNext} pts to next level</span>
        <div className="flex items-center gap-0.5 text-amber-600 font-bold">
          <span>{nextMilestone}</span>
          <ChevronRight size={10} />
        </div>
      </div>
    </div>
  );
};
