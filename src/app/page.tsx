'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { MapPin } from 'lucide-react';
import { Header } from '@/components/ui/Header';
import { BottomNav } from '@/components/ui/BottomNav';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FacilityCard } from '@/components/FacilityCard';
import { IncentiveCard } from '@/components/IncentiveCard';
import { AIConcierge } from '@/components/AIConcierge';
import { StadiumMap } from '@/components/StadiumMap';
import { EventTimeline } from '@/components/EventTimeline';
import { CrowdMeter } from '@/components/CrowdMeter';
import { LiveAlertsBanner } from '@/components/LiveAlertsBanner';
import { WayfindingCard } from '@/components/WayfindingCard';
import { useFacilities } from '@/hooks/useFacilities';
import { useIncentives } from '@/hooks/useIncentives';
import { EVENT_CONFIG } from '@/lib/constants';

export default function AttendeePortal() {
  const { data: session } = useSession();
  const { facilities, lastUpdated, isLive, iconMap } = useFacilities();
  const { incentives } = useIncentives();

  const userName = session?.user?.name?.split(' ')[0] || 'Guest';
  const seatInfo = (session?.user as any)?.section
    ? `Section ${(session?.user as any).section} · Row ${(session?.user as any).row} · Seat ${(session?.user as any).seat}`
    : 'Section 102 · Row G · Seat 14';

  return (
    <main className="min-h-screen pb-28 bg-[var(--color-background)]">
      <Header isLive={isLive} lastUpdated={lastUpdated} />

      <div className="px-5 py-6 space-y-5 max-w-2xl mx-auto">
        {/* Welcome */}
        <section>
          <h2 className="text-2xl font-bold text-cyan-950 leading-tight" style={{ fontFamily: 'var(--font-family-header)' }}>
            Welcome, {userName}
          </h2>
          <div className="flex items-center gap-1.5 mt-1 text-cyan-700/60">
            <MapPin size={13} />
            <span className="text-sm font-medium">{seatInfo}</span>
          </div>
        </section>

        {/* Live Alerts */}
        <LiveAlertsBanner />

        {/* Game Clock + Crowd Meter */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <EventTimeline gamePeriod={EVENT_CONFIG.gamePeriod} initialTime={EVENT_CONFIG.gameTime} />
          <CrowdMeter />
        </section>

        {/* Map */}
        <section>
          <StadiumMap />
        </section>

        {/* Wayfinding */}
        <section>
          <WayfindingCard
            from="Your Seat (102-G14)"
            to="Gate 7 (West)"
            walkTime={4}
            steps={[
              'Head down Aisle G toward the main concourse.',
              'Turn left at the concourse and follow signs to West Wing.',
              'Pass Section 106 restrooms on your right.',
              'Gate 7 exit will be straight ahead.',
            ]}
          />
        </section>

        {/* Incentives */}
        {incentives.length > 0 && (
          <section className="space-y-3">
            <SectionHeading title="Smart Offers" />
            {incentives.map((inc) => (
              <IncentiveCard key={inc.id} title={inc.title} description={inc.description} reward={inc.reward} targetGate={inc.targetGate} />
            ))}
          </section>
        )}

        {/* Facilities */}
        <section className="space-y-3">
          <SectionHeading title="Nearby Facilities" count={facilities.length} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {facilities.map((fac) => (
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

      <AIConcierge />
      <BottomNav />
    </main>
  );
}
