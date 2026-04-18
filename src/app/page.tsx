'use client';

import React from 'react';
import { FacilityCard } from '@/components/FacilityCard';
import { IncentiveCard } from '@/components/IncentiveCard';
import { AIConcierge } from '@/components/AIConcierge';
import { StadiumMap } from '@/components/StadiumMap';
import { User, Bell, RefreshCw } from 'lucide-react';
import { useFacilities } from '@/hooks/useFacilities';
import { useIncentives } from '@/hooks/useIncentives';

export default function AttendeePortal() {
  const { facilities, isLoading: facLoading, lastUpdated, iconMap } = useFacilities();
  const { incentives, isLoading: incLoading } = useIncentives();

  return (
    <main className="min-h-screen pb-24">
      {/* Header */}
      <header className="p-6 flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-40 border-b border-cyan-100">
        <div>
          <h1 className="text-2xl font-bold text-cyan-900 tracking-tight">STADIUM GO</h1>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${facLoading ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'}`} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
              {facLoading ? 'Connecting...' : 'Live: Finals 2026'}
            </span>
            {lastUpdated && (
              <span className="text-[9px] text-cyan-600/50 font-bold ml-2">
                Last Sync: {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-3">
          <button className="p-2 bg-white rounded-xl shadow-sm border border-cyan-100 text-cyan-600 relative">
            <Bell size={20} />
            <div className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
          </button>
          <button className="p-2 bg-cyan-600 rounded-xl shadow-sm text-white">
            <User size={20} />
          </button>
        </div>
      </header>

      <div className="p-6 space-y-8 max-w-2xl mx-auto">
        {/* Welcome Section */}
        <section>
          <h2 className="text-3xl font-bold text-cyan-950 mb-1 leading-none">Welcome, Alex!</h2>
          <p className="text-cyan-900/60 font-medium">Section 102, Row G, Seat 14</p>
        </section>

        {/* Dynamic Map */}
        <section>
          <StadiumMap />
        </section>

        {/* Incentive Cards */}
        <section className="space-y-4">
          {incLoading ? (
            <div className="h-40 bg-cyan-100 animate-pulse rounded-2xl" />
          ) : (
            incentives.map(inc => (
              <IncentiveCard 
                key={inc.id}
                title={inc.title}
                description={inc.description}
                reward={inc.reward}
                targetGate={inc.targetGate}
              />
            ))
          )}
        </section>

        {/* Facilities Status Grid */}
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <h2 className="text-xl font-bold text-cyan-950">Nearby Facilities</h2>
            <button className="text-xs font-bold text-cyan-600 uppercase tracking-widest flex items-center gap-1">
              <RefreshCw size={12} /> Live Updates
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {facLoading ? (
              [1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-cyan-50 animate-pulse rounded-2xl" />)
            ) : (
              facilities.map(fac => (
                <FacilityCard 
                  key={fac.id}
                  name={fac.name}
                  type={fac.type}
                  waitTime={fac.waitTime}
                  status={fac.status}
                  icon={iconMap[fac.iconType] || iconMap.utensils}
                  location={fac.location}
                />
              ))
            )}
          </div>
        </section>
      </div>

      {/* AI Concierge */}
      <AIConcierge />

      {/* Bottom Nav */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] glass-card p-2 flex justify-around items-center z-40">
        <button className="flex flex-col items-center gap-1 p-3 text-cyan-600 bg-cyan-50 rounded-xl">
          <RefreshCw size={20} />
          <span className="text-[10px] font-bold uppercase">Live</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-3 text-cyan-900/40">
          <Bell size={20} />
          <span className="text-[10px] font-bold uppercase">Alerts</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-3 text-cyan-900/40">
          <User size={20} />
          <span className="text-[10px] font-bold uppercase">Profile</span>
        </button>
      </nav>
    </main>
  );
}
