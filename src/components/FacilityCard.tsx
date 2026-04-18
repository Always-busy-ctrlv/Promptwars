'use client';

import React from 'react';
import { LucideIcon, Clock, MapPin } from 'lucide-react';

interface FacilityCardProps {
  name: string;
  type: string;
  waitTime: number;
  status: 'green' | 'yellow' | 'red';
  icon: LucideIcon;
  location: string;
}

export const FacilityCard: React.FC<FacilityCardProps> = ({
  name,
  type,
  waitTime,
  status,
  icon: Icon,
  location,
}) => {
  const statusColor = {
    green: 'var(--status-green)',
    yellow: 'var(--status-yellow)',
    red: 'var(--status-red)',
  }[status];

  return (
    <div className="glass-card p-4 transition-all hover:scale-[1.02] cursor-pointer">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-100 rounded-lg text-cyan-700">
            <Icon size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold leading-none">{name}</h3>
            <span className="text-xs uppercase tracking-wider text-cyan-600 font-semibold">{type}</span>
          </div>
        </div>
        <div 
          className="w-3 h-3 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.1)]"
          style={{ backgroundColor: statusColor, boxShadow: `0 0 12px ${statusColor}` }}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-cyan-900/70">
          <Clock size={14} />
          <span>{waitTime} min wait</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-cyan-900/70">
          <MapPin size={14} />
          <span>{location}</span>
        </div>
      </div>

      <button className="w-full mt-4 py-2 text-xs font-bold uppercase tracking-widest text-cyan-700 border border-cyan-200 rounded-lg hover:bg-cyan-50 transition-colors">
        Directions
      </button>
    </div>
  );
};
