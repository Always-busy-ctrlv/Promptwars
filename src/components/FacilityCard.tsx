'use client';

import React from 'react';
import { LucideIcon, Clock, MapPin, ArrowRight } from 'lucide-react';

interface FacilityCardProps {
  name: string;
  type: string;
  waitTime: number;
  status: 'green' | 'yellow' | 'red';
  icon: LucideIcon;
  location: string;
}

const statusConfig = {
  green:  { label: 'Clear',  bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500', border: 'border-emerald-200' },
  yellow: { label: 'Busy',   bg: 'bg-amber-50',   text: 'text-amber-700',   dot: 'bg-amber-500',   border: 'border-amber-200' },
  red:    { label: 'Full',   bg: 'bg-rose-50',     text: 'text-rose-700',    dot: 'bg-rose-500',    border: 'border-rose-200' },
};

export const FacilityCard: React.FC<FacilityCardProps> = ({
  name,
  type,
  waitTime,
  status,
  icon: Icon,
  location,
}) => {
  const cfg = statusConfig[status];

  return (
    <div className="glass-card p-4 transition-all duration-200 hover:shadow-lg hover:scale-[1.01] cursor-pointer group">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyan-50 rounded-xl text-cyan-600 group-hover:bg-cyan-100 transition-colors">
            <Icon size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-cyan-950 leading-tight">{name}</h3>
            <span className="text-[10px] uppercase tracking-wider text-cyan-500 font-semibold">{type}</span>
          </div>
        </div>
        <div className={`${cfg.bg} ${cfg.border} border px-2 py-0.5 rounded-full flex items-center gap-1`}>
          <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
          <span className={`text-[9px] font-bold uppercase ${cfg.text}`}>{cfg.label}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-cyan-700/60">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span className="font-semibold">{waitTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={12} />
            <span>{location}</span>
          </div>
        </div>
        <ArrowRight size={14} className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
};
