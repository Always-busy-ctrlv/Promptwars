'use client';

import React, { useRef, useEffect } from 'react';
import { Zap, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';

interface IncentiveCardProps {
  title: string;
  description: string;
  reward: string;
  targetGate: string;
}

export const IncentiveCard: React.FC<IncentiveCardProps> = ({
  title,
  description,
  reward,
  targetGate,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden bg-gradient-to-br from-cyan-600 via-cyan-700 to-emerald-600 rounded-2xl p-5 text-white shadow-xl shadow-cyan-900/20"
    >
      {/* Background decoration */}
      <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-emerald-400/10 rounded-full blur-xl" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1 bg-white/20 rounded-lg">
            <Zap size={14} />
          </div>
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-200">Smart Offer</span>
        </div>

        <h2 className="text-lg font-bold mb-1.5 leading-snug" style={{ fontFamily: 'var(--font-family-header)' }}>{title}</h2>
        <p className="text-cyan-100/70 text-xs leading-relaxed mb-4">{description}</p>

        <div className="flex items-center justify-between gap-3">
          <div className="bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider">
            🎁 {reward}
          </div>
          <button className="flex items-center gap-1.5 bg-white text-cyan-800 px-3 py-1.5 rounded-lg font-bold text-xs hover:bg-cyan-50 transition-colors shadow-lg shadow-black/10">
            Go to {targetGate} <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full animate-[shimmer_4s_ease-in-out_infinite]" />
    </div>
  );
};
