'use client';

import React from 'react';
import { StadiumMap } from '@/components/StadiumMap';
import { useFacilities } from '@/hooks/useFacilities';
import { Users, TrendingUp, Clock, AlertTriangle } from 'lucide-react';

export default function AdminDashboard() {
  const { facilities, isLoading } = useFacilities();

  const stats = [
    { name: 'Total Attendees', value: '42,108', icon: Users, color: 'text-cyan-400' },
    { name: 'Flow Rate', value: '840/min', icon: TrendingUp, color: 'text-emerald-400' },
    { name: 'Avg Wait Time', value: '8.2 min', icon: Clock, color: 'text-amber-400' },
    { name: 'Active Alerts', value: '2', icon: AlertTriangle, color: 'text-rose-400' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 bg-slate-800 rounded-lg ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">{stat.name}</p>
            <h3 className="text-3xl font-black mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Live Heatmap */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Real-time Density Heatmap</h2>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">Live Feed v1.0.4</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl h-[600px] flex items-center justify-center">
            <div className="w-full max-w-lg">
              <StadiumMap />
            </div>
          </div>
        </div>

        {/* Facility Status Feed */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Facility Pulse</h2>
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 bg-slate-800/50 flex justify-between text-xs font-black uppercase tracking-widest text-slate-400">
              <span>Facility</span>
              <span>Wait Time</span>
            </div>
            <div className="divide-y divide-slate-800">
              {isLoading ? (
                <div className="p-8 text-center text-slate-500">Loading live data...</div>
              ) : (
                facilities.map((fac) => (
                  <div key={fac.id} className="p-4 flex justify-between items-center hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        fac.status === 'green' ? 'bg-emerald-500' : 
                        fac.status === 'yellow' ? 'bg-amber-500' : 'bg-rose-500'
                      }`} />
                      <div>
                        <p className="font-bold text-sm">{fac.name}</p>
                        <p className="text-[10px] text-slate-500 uppercase font-black">{fac.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-lg">{fac.waitTime}m</p>
                      <p className="text-[10px] text-slate-500 uppercase font-black">Trending Up</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
