'use client';

import React from 'react';
import { Gift, ArrowRight } from 'lucide-react';
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
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
      );
    }
  }, []);

  return (
    <div 
      ref={cardRef}
      className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-2xl p-6 text-white shadow-xl"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Gift size={120} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <Gift size={18} className="text-emerald-200" />
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-100">Smart Offer</span>
        </div>
        
        <h2 className="text-2xl font-bold mb-1 leading-tight">{title}</h2>
        <p className="text-emerald-50/80 text-sm mb-4 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between gap-4 pt-2">
          <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
            Reward: {reward}
          </div>
          <button className="flex items-center gap-2 bg-white text-cyan-900 px-4 py-2 rounded-xl font-bold text-sm hover:bg-emerald-50 transition-colors shadow-lg shadow-emerald-950/20">
            Route to {targetGate} <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Animated Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
    </div>
  );
};
