'use client';

import React from 'react';
import { FacilityCard } from '@/components/FacilityCard';
import { IncentiveCard } from '@/components/IncentiveCard';
import { AIConcierge } from '@/components/AIConcierge';
import { StadiumMap } from '@/components/StadiumMap';
import { User, Bell, MapPin, Wifi, WifiOff } from 'lucide-react';
import { useFacilities } from '@/hooks/useFacilities';
import { useIncentives } from '@/hooks/useIncentives';

export default function AttendeePortal() {
  const { facilities, isLoading: facLoading, lastUpdated, isLive, iconMap } = useFacilities();
  const { incentives, isLoading: incLoading } = useIncentives();

  return (
    <main className="min-h-screen pb-28 bg-[var(--color-background)]">
      {/* Header */}
      <header className="px-5 py-4 flex justify-between items-center bg-white/60 backdrop-blur-xl sticky top-0 z-40 border-b border-cyan-200/40">
        <div>
          <h1 className="text-xl font-black text-cyan-900 tracking-tight" style={{ fontFamily: 'var(--font-family-header)' }}>
            STADIUM<span className="text-cyan-500">GO</span>
          </h1>
          <div className="flex items-center gap-2 mt-0.5">
            {isLive ? (
              <Wifi size={10} className="text-emerald-500" />
            ) : (
              <WifiOff size={10} className="text-amber-500" />
            )}
            <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-emerald-600">
              {isLive ? 'Live' : 'Demo'} · Finals 2026
            </span>
            <span className="text-[8px] text-cyan-500/50 font-semibold">
              {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 bg-white rounded-xl shadow-sm border border-cyan-100 text-cyan-600 relative hover:bg-cyan-50 transition-colors" aria-label="Notifications">
            <Bell size={18} />
            <div className="absolute top-0.5 right-0.5 w-2 h-2 bg-rose-500 rounded-full" />
          </button>
          <button className="p-2 bg-cyan-600 rounded-xl shadow-sm text-white hover:bg-cyan-700 transition-colors" aria-label="Profile">
            <User size={18} />
          </button>
        </div>
      </header>

      <div className="px-5 py-6 space-y-7 max-w-2xl mx-auto">
        {/* Welcome */}
        <section>
          <h2 className="text-2xl font-bold text-cyan-950 leading-tight" style={{ fontFamily: 'var(--font-family-header)' }}>
            Welcome back, Alex
          </h2>
          <div className="flex items-center gap-1.5 mt-1 text-cyan-700/60">
            <MapPin size={13} />
            <span className="text-sm font-medium">Section 102 · Row G · Seat 14</span>
          </div>
        </section>

        {/* Map */}
        <section>
          <StadiumMap />
        </section>

        {/* Incentives */}
        {incentives.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-base font-bold text-cyan-950 uppercase tracking-wider" style={{ fontFamily: 'var(--font-family-header)' }}>
              Smart Offers
            </h2>
            {incentives.map(inc => (
              <IncentiveCard
                key={inc.id}
                title={inc.title}
                description={inc.description}
                reward={inc.reward}
                targetGate={inc.targetGate}
              />
            ))}
          </section>
        )}

        {/* Facilities */}
        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-cyan-950 uppercase tracking-wider" style={{ fontFamily: 'var(--font-family-header)' }}>
              Nearby Facilities
            </h2>
            <span className="text-[9px] font-bold text-cyan-500 uppercase tracking-widest">
              {facilities.length} Available
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {facilities.map(fac => (
              <FacilityCard
                key={fac.id}
                name={fac.name}
                type={fac.type}
                waitTime={fac.waitTime}
                status={fac.status}
                icon={iconMap[fac.iconType] || iconMap.utensils}
                location={fac.location}
              />
            ))}
          </div>
        </section>
      </div>

      {/* AI Concierge */}
      <AIConcierge />

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-cyan-100 z-40 safe-area-bottom">
        <div className="max-w-md mx-auto flex justify-around items-center py-2">
          <button className="flex flex-col items-center gap-0.5 p-2 text-cyan-600">
            <MapPin size={20} />
            <span className="text-[9px] font-bold uppercase tracking-wider">Map</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 p-2 text-cyan-400/60">
            <Bell size={20} />
            <span className="text-[9px] font-bold uppercase tracking-wider">Alerts</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 p-2 text-cyan-400/60">
            <User size={20} />
            <span className="text-[9px] font-bold uppercase tracking-wider">Profile</span>
          </button>
        </div>
      </nav>
    </main>
  );
}
