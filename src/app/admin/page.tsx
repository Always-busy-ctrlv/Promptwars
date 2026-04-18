'use client';

import React from 'react';
import { StadiumMap } from '@/components/StadiumMap';
import { useFacilities } from '@/hooks/useFacilities';
import { Users, TrendingUp, Clock, AlertTriangle, ArrowUp, ArrowDown } from 'lucide-react';

export default function AdminDashboard() {
  const { facilities, isLive } = useFacilities();

  const stats = [
    { name: 'Total Attendees', value: '42,108', icon: Users, color: 'text-cyan-400', bg: 'bg-cyan-500/10', trend: '+1,204', up: true },
    { name: 'Flow Rate', value: '840/min', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10', trend: '+12%', up: true },
    { name: 'Avg Wait Time', value: '8.2 min', icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10', trend: '-2.1 min', up: false },
    { name: 'Active Alerts', value: '2', icon: AlertTriangle, color: 'text-rose-400', bg: 'bg-rose-500/10', trend: '-1', up: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black" style={{ fontFamily: 'var(--font-family-header)' }}>Operations Dashboard</h1>
        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
          {isLive ? '● Connected to Firestore' : '● Demo Mode'}
        </span>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-slate-900/80 border border-slate-800/50 p-5 rounded-2xl">
            <div className={`inline-flex p-2 rounded-lg ${stat.bg} ${stat.color} mb-3`}>
              <stat.icon size={20} />
            </div>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{stat.name}</p>
            <div className="flex items-end gap-2 mt-1">
              <h3 className="text-2xl font-black leading-none">{stat.value}</h3>
              <span className={`text-[10px] font-bold flex items-center gap-0.5 ${stat.up ? 'text-emerald-400' : 'text-cyan-400'}`}>
                {stat.up ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Heatmap */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold" style={{ fontFamily: 'var(--font-family-header)' }}>Real-time Density Map</h2>
            <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">v1.0.4</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-800/50 p-6 rounded-2xl">
            <StadiumMap />
          </div>
        </div>

        {/* Facility Feed */}
        <div className="space-y-3">
          <h2 className="text-base font-bold" style={{ fontFamily: 'var(--font-family-header)' }}>Facility Pulse</h2>
          <div className="bg-slate-900/80 border border-slate-800/50 rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-800/50 flex justify-between text-[9px] font-bold uppercase tracking-widest text-slate-500">
              <span>Facility</span>
              <span>Wait</span>
            </div>
            <div className="divide-y divide-slate-800/30">
              {facilities.map((fac) => (
                <div key={fac.id} className="px-4 py-3 flex justify-between items-center hover:bg-slate-800/30 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-2 h-2 rounded-full ${
                      fac.status === 'green' ? 'bg-emerald-500' :
                      fac.status === 'yellow' ? 'bg-amber-500' : 'bg-rose-500'
                    } shadow-[0_0_6px_currentColor]`} />
                    <div>
                      <p className="font-semibold text-xs">{fac.name}</p>
                      <p className="text-[9px] text-slate-500 font-semibold">{fac.location}</p>
                    </div>
                  </div>
                  <span className="font-black text-sm tabular-nums">{fac.waitTime}m</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
