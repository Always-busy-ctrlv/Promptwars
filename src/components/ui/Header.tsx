'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { User, Bell, Wifi, WifiOff, MapPin, LogOut } from 'lucide-react';

interface HeaderProps {
  isLive: boolean;
  lastUpdated: Date;
}

/** Top header bar with branding, live indicator, and user profile link. */
export const Header: React.FC<HeaderProps> = ({ isLive, lastUpdated }) => {
  const { data: session } = useSession();

  return (
    <header className="px-5 py-4 flex justify-between items-center bg-white/60 backdrop-blur-xl sticky top-0 z-40 border-b border-cyan-200/40">
      <div>
        <h1 className="text-xl font-black text-cyan-900 tracking-tight" style={{ fontFamily: 'var(--font-family-header)' }}>
          STADIUM<span className="text-cyan-500">GO</span>
        </h1>
        <div className="flex items-center gap-2 mt-0.5">
          {isLive ? <Wifi size={10} className="text-emerald-500" /> : <WifiOff size={10} className="text-amber-500" />}
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
        <Link href={session ? '/admin' : '/auth/signin'} className="p-2 bg-white rounded-xl shadow-sm border border-cyan-100 text-cyan-600 hover:bg-cyan-50 transition-colors" aria-label="Profile">
          <User size={18} />
        </Link>
        {session && (
          <button 
            onClick={() => {
              const { signOut } = require('next-auth/react');
              signOut();
            }}
            className="p-2 bg-rose-600 rounded-xl shadow-sm text-white hover:bg-rose-700 transition-colors" 
            aria-label="LogOut"
          >
            <LogOut size={18} />
          </button>
        )}
      </div>
    </header>
  );
};
