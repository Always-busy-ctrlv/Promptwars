'use client';

import React from 'react';
import { gsap } from 'gsap';
import { Lightbulb } from 'lucide-react';

export const StadiumMap: React.FC = () => {
  const mapRef = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    if (mapRef.current) {
      // Pulse animation for hot spots — scoped to this SVG ref
      const hotSpots = mapRef.current.querySelectorAll('.hot-spot');
      gsap.to(hotSpots, {
        opacity: 0.4,
        scale: 1.2,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
        ease: 'sine.inOut',
        transformOrigin: 'center center',
      });
    }
  }, []);

  return (
    <div className="glass-card p-6 overflow-hidden relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-cyan-900">Live Venue Flow</h2>
        <div className="flex gap-4 text-xs font-bold uppercase tracking-wider">
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Clear</div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500" /> Busy</div>
          <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-rose-500" /> High</div>
        </div>
      </div>

      <svg 
        ref={mapRef}
        viewBox="0 0 400 300" 
        className="w-full h-auto drop-shadow-2xl"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Basic Stadium Outline */}
        <path d="M200 20C100 20 20 100 20 150C20 200 100 280 200 280C300 280 380 200 380 150C380 100 300 20 200 20Z" fill="#F0F9FF" stroke="#0891B2" strokeWidth="2"/>
        <ellipse cx="200" cy="150" rx="140" ry="100" fill="white" stroke="#0891B2" strokeWidth="1"/>
        
        {/* Sections */}
        <path d="M200 50 L200 100" stroke="#0891B2" strokeOpacity="0.3"/>
        <path d="M200 200 L200 250" stroke="#0891B2" strokeOpacity="0.3"/>
        <path d="M100 150 L150 150" stroke="#0891B2" strokeOpacity="0.3"/>
        <path d="M250 150 L300 150" stroke="#0891B2" strokeOpacity="0.3"/>

        {/* Hot Spots (Animated) */}
        <circle className="hot-spot" cx="100" cy="100" r="15" fill="#EF4444" opacity="0.6" />
        <circle className="hot-spot" cx="280" cy="200" r="10" fill="#F59E0B" opacity="0.6" />
        <circle className="hot-spot" cx="200" cy="60" r="12" fill="#10B981" opacity="0.6" />

        {/* Labels */}
        <text x="185" y="155" className="text-[10px] font-bold fill-cyan-900">FIELD</text>
        <text x="80" y="85" className="text-[8px] font-bold fill-rose-600">Gate 4</text>
        <text x="260" y="225" className="text-[8px] font-bold fill-amber-600">Gate 7</text>
      </svg>
      
      <div className="mt-4 p-3 bg-cyan-900 text-white rounded-xl text-xs font-medium flex items-center gap-2">
        <Lightbulb size={14} className="text-amber-400 shrink-0" />
        <span><strong>Pro-tip:</strong> Gate 7 is currently 40% less crowded than Gate 4.</span>
      </div>
    </div>
  );
};
