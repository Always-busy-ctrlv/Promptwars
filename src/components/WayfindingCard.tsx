'use client';

import React from 'react';
import { Navigation, Footprints, Clock } from 'lucide-react';

interface WayfindingCardProps {
  from: string;
  to: string;
  walkTime: number;
  steps: string[];
}

/** Step-by-step walking directions card. Appears when user taps "Go to" on an incentive. */
export const WayfindingCard: React.FC<WayfindingCardProps> = ({ from, to, walkTime, steps }) => (
  <div className="glass-card p-4 border-l-4 border-l-cyan-500">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <Navigation size={16} className="text-cyan-600" />
        <span className="text-sm font-bold text-cyan-950" style={{ fontFamily: 'var(--font-family-header)' }}>
          {from} → {to}
        </span>
      </div>
      <div className="flex items-center gap-1 text-cyan-500">
        <Footprints size={12} />
        <span className="text-[10px] font-bold">{walkTime} min walk</span>
      </div>
    </div>

    <ol className="space-y-2">
      {steps.map((step, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <div className="w-5 h-5 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center text-[9px] font-black shrink-0 mt-0.5">
            {i + 1}
          </div>
          <span className="text-xs text-cyan-800 leading-relaxed">{step}</span>
        </li>
      ))}
    </ol>
  </div>
);
