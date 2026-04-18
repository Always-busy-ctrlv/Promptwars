'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Lightbulb } from 'lucide-react';

interface HotSpot {
  cx: number;
  cy: number;
  r: number;
  color: string;
  label: string;
  labelX: number;
  labelY: number;
  labelColor: string;
}

const hotspots: HotSpot[] = [
  { cx: 100, cy: 100, r: 16, color: '#EF4444', label: 'Gate 4', labelX: 72, labelY: 82, labelColor: 'fill-rose-600' },
  { cx: 280, cy: 200, r: 11, color: '#F59E0B', label: 'Gate 7', labelX: 255, labelY: 228, labelColor: 'fill-amber-600' },
  { cx: 200, cy: 60,  r: 13, color: '#10B981', label: 'Gate 1', labelX: 184, labelY: 46,  labelColor: 'fill-emerald-600' },
  { cx: 310, cy: 120, r: 9,  color: '#10B981', label: 'Gate 5', labelX: 296, labelY: 108, labelColor: 'fill-emerald-600' },
];

export const StadiumMap: React.FC = () => {
  const mapRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      const spots = mapRef.current.querySelectorAll('.hot-spot');
      gsap.to(spots, {
        opacity: 0.35,
        scale: 1.25,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        stagger: 0.4,
        ease: 'sine.inOut',
        transformOrigin: 'center center',
      });
    }
  }, []);

  return (
    <div className="glass-card p-5 overflow-hidden relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-bold text-cyan-900" style={{ fontFamily: 'var(--font-family-header)' }}>Live Venue Flow</h2>
        <div className="flex gap-3 text-[9px] font-bold uppercase tracking-wider text-cyan-600/70">
          <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Clear</div>
          <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Busy</div>
          <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-rose-500" /> High</div>
        </div>
      </div>

      <svg
        ref={mapRef}
        viewBox="0 0 400 300"
        className="w-full h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Stadium shell */}
        <defs>
          <radialGradient id="fieldGrad" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#ECFDF5" />
            <stop offset="100%" stopColor="#F0F9FF" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer bowl */}
        <path d="M200 20C100 20 20 100 20 150C20 200 100 280 200 280C300 280 380 200 380 150C380 100 300 20 200 20Z" fill="#F0FDFA" stroke="#0891B2" strokeWidth="1.5" strokeOpacity="0.4" />

        {/* Concourse ring */}
        <ellipse cx="200" cy="150" rx="155" ry="115" fill="none" stroke="#0891B2" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="4 4" />

        {/* Inner field */}
        <ellipse cx="200" cy="150" rx="130" ry="95" fill="url(#fieldGrad)" stroke="#0891B2" strokeWidth="0.8" strokeOpacity="0.3" />

        {/* Section dividers */}
        <line x1="200" y1="55" x2="200" y2="105" stroke="#0891B2" strokeOpacity="0.15" />
        <line x1="200" y1="195" x2="200" y2="245" stroke="#0891B2" strokeOpacity="0.15" />
        <line x1="95" y1="150" x2="145" y2="150" stroke="#0891B2" strokeOpacity="0.15" />
        <line x1="255" y1="150" x2="305" y2="150" stroke="#0891B2" strokeOpacity="0.15" />

        {/* Field label */}
        <text x="200" y="153" textAnchor="middle" className="text-[9px] font-bold fill-cyan-300" style={{ letterSpacing: '0.2em' }}>FIELD</text>

        {/* Hot Spots */}
        {hotspots.map((h, i) => (
          <g key={i}>
            <circle className="hot-spot" cx={h.cx} cy={h.cy} r={h.r} fill={h.color} opacity={0.5} filter="url(#glow)" />
            <text x={h.labelX} y={h.labelY} className={`text-[7px] font-bold ${h.labelColor}`}>{h.label}</text>
          </g>
        ))}
      </svg>

      <div className="mt-3 p-2.5 bg-cyan-900 text-white rounded-lg text-[11px] font-medium flex items-center gap-2">
        <Lightbulb size={13} className="text-amber-400 shrink-0" />
        <span><strong>Pro-tip:</strong> Gate 7 is currently 40% less crowded than Gate 4.</span>
      </div>
    </div>
  );
};
