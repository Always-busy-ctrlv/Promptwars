import React from 'react';
import { MapPin, Bell, User, Ticket } from 'lucide-react';

const NAV_ITEMS = [
  { icon: MapPin, label: 'Map', active: true },
  { icon: Ticket, label: 'Tickets', active: false },
  { icon: Bell, label: 'Alerts', active: false },
  { icon: User, label: 'Profile', active: false },
];

/** Fixed bottom navigation bar for the attendee portal. */
export const BottomNav: React.FC = () => (
  <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-cyan-100 z-40">
    <div className="max-w-md mx-auto flex justify-around items-center py-2">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.label}
          className={`flex flex-col items-center gap-0.5 p-2 transition-colors ${
            item.active ? 'text-cyan-600' : 'text-cyan-400/60'
          }`}
        >
          <item.icon size={20} />
          <span className="text-[9px] font-bold uppercase tracking-wider">{item.label}</span>
        </button>
      ))}
    </div>
  </nav>
);
