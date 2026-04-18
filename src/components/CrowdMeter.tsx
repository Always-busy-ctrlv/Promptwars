'use client';

import React from 'react';
import { Users } from 'lucide-react';
import { EVENT_CONFIG } from '@/lib/constants';

/** Shows venue-wide occupancy as a visual gauge. Gives attendees a sense of how full the venue is. */
export const CrowdMeter: React.FC = () => {
  const { currentAttendees, capacity } = EVENT_CONFIG;
  const percentage = Math.round((currentAttendees / capacity) * 100);

  const getColor = () => {
    if (percentage < 50) return { bar: 'bg-emerald-500', text: 'text-emerald-600', label: 'Comfortable' };
    if (percentage < 75) return { bar: 'bg-amber-500', text: 'text-amber-600', label: 'Moderate' };
    return { bar: 'bg-rose-500', text: 'text-rose-600', label: 'Near Capacity' };
  };

  const config = getColor();

  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-cyan-50 rounded-xl text-cyan-600">
            <Users size={18} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-cyan-500 font-bold">Venue Occupancy</p>
            <p className="text-sm font-bold text-cyan-950">
              {currentAttendees.toLocaleString()} <span className="text-cyan-400 font-medium">/ {capacity.toLocaleString()}</span>
            </p>
          </div>
        </div>
        <div className={`${config.text} text-sm font-black`}>{percentage}%</div>
      </div>

      {/* Gauge */}
      <div className="h-2 bg-cyan-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${config.bar} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between mt-1.5">
        <span className={`text-[9px] font-bold ${config.text} uppercase tracking-wider`}>{config.label}</span>
        <span className="text-[9px] text-cyan-400 font-semibold">{EVENT_CONFIG.venue}</span>
      </div>
    </div>
  );
};
