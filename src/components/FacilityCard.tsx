'use client';

import React from 'react';
import { LucideIcon, Clock, MapPin, ArrowRight } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';

interface FacilityCardProps {
  name: string;
  type: string;
  waitTime: number;
  status: 'green' | 'yellow' | 'red';
  icon: LucideIcon;
  location: string;
}

/** Displays a single venue facility with wait time, status, and location. */
export const FacilityCard: React.FC<FacilityCardProps> = ({
  name, type, waitTime, status, icon: Icon, location,
}) => (
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
      <StatusBadge status={status} />
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
