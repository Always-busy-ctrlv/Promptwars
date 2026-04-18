'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, Timer } from 'lucide-react';

interface EventTimelineProps {
  gamePeriod: string;
  initialTime: string;
}

/** Shows game clock, current period, and halftime rush warnings. */
export const EventTimeline: React.FC<EventTimelineProps> = ({ gamePeriod, initialTime }) => {
  const [time, setTime] = useState(initialTime);
  const [minutes, setMinutes] = useState(parseInt(initialTime.split(':')[0]));

  useEffect(() => {
    const interval = setInterval(() => {
      setMinutes((prev) => {
        const next = prev + 1;
        setTime(`${next}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`);
        return next;
      });
    }, 30000); // Update every 30s for demo
    return () => clearInterval(interval);
  }, []);

  const isNearBreak = minutes >= 85;
  const isHalftime = minutes >= 45 && minutes <= 48 && gamePeriod === '1st Half';

  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-50 rounded-xl text-cyan-600">
            <Timer size={18} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-cyan-500 font-bold">{gamePeriod}</p>
            <p className="text-2xl font-black text-cyan-950 tabular-nums leading-none" style={{ fontFamily: 'var(--font-family-header)' }}>
              {time}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider">Live</span>
        </div>
      </div>

      {(isNearBreak || isHalftime) && (
        <div className="mt-3 p-2.5 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-2 text-amber-800">
          <AlertTriangle size={14} className="shrink-0" />
          <span className="text-[11px] font-semibold">
            {isHalftime
              ? 'Halftime whistle imminent — restrooms will be packed! Go now.'
              : 'Full-time approaching — plan your exit via the least crowded gate.'}
          </span>
        </div>
      )}
    </div>
  );
};
